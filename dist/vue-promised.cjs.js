/*!
  * vue-promised v2.1.0
  * (c) 2021 Eduardo San Martin Morote
  * @license MIT
  */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vueDemi = require('vue-demi');

/**
 * Returns the state of a Promise and observes the Promise if it's a Ref to
 * automatically update the state
 *
 * @param promise Ref of a Promise or raw Promise
 * @param pendingDelay optional delay to wait before displaying pending
 */
function usePromise(promise, pendingDelay = 200) {
    const isRejected = vueDemi.ref(false);
    const isResolved = vueDemi.ref(false);
    const isPending = vueDemi.computed(() => !isRejected.value && !isResolved.value);
    const isDelayElapsed = vueDemi.ref(false);
    const error = vueDemi.ref();
    const data = vueDemi.ref();
    let timerId;
    vueDemi.watch(() => vueDemi.unref(promise), (newPromise) => {
        isRejected.value = false;
        isResolved.value = false;
        error.value = null;
        if (!newPromise) {
            data.value = null;
            if (timerId)
                clearTimeout(timerId);
            timerId = null;
            return;
        }
        if (vueDemi.unref(pendingDelay) > 0) {
            isDelayElapsed.value = false;
            if (timerId)
                clearTimeout(timerId);
            timerId = setTimeout(() => {
                isDelayElapsed.value = true;
            }, Number(vueDemi.unref(pendingDelay)));
        }
        else {
            isDelayElapsed.value = true;
        }
        newPromise
            .then((newData) => {
            // ensure we are dealing with the same promise
            if (newPromise === vueDemi.unref(promise)) {
                data.value = newData;
                isResolved.value = true;
            }
        })
            .catch((err) => {
            // ensure we are dealing with the same promise
            if (newPromise === vueDemi.unref(promise)) {
                error.value = err;
                isRejected.value = true;
            }
        });
    }, { immediate: true });
    return { isPending, isRejected, isResolved, isDelayElapsed, error, data };
}

const PromisedImpl = /*#__PURE__*/ vueDemi.defineComponent({
    name: 'Promised',
    props: {
        promise: {},
        // validator: p =>
        //   p && typeof (p as any).then === 'function' && typeof (p as any).catch === 'function',
        pendingDelay: {
            type: [Number, String],
            default: 200,
        },
    },
    setup(props, { slots }) {
        const propsAsRefs = vueDemi.toRefs(props);
        const promiseState = vueDemi.reactive(usePromise(propsAsRefs.promise, propsAsRefs.pendingDelay));
        return () => {
            if ('combined' in slots) {
                return slots.combined(promiseState);
            }
            const [slotName, slotData] = promiseState.isRejected
                ? ['rejected', promiseState.error]
                : !promiseState.isPending
                    ? ['default', promiseState.data]
                    : promiseState.isDelayElapsed
                        ? ['pending', promiseState.data]
                        : [null];
            if (slotName && !slots[slotName]) {
                (vueDemi.isVue3 ? vueDemi.warn : console.warn)(`(vue-promised) Missing slot "${slotName}" in Promised component. Pass an empty "${slotName}" slot or use the "combined" slot to remove this warning. This will fail in production.`);
                return null;
            }
            return slotName && slots[slotName](slotData);
        };
    },
});
const Promised = PromisedImpl;

exports.Promised = Promised;
exports.usePromise = usePromise;
