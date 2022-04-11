/// <reference types="jest" />

import { AllowedComponentProps } from 'vue-demi';
import { ComponentCustomProps } from 'vue-demi';
import { ComputedRef } from 'vue-demi';
import { Ref } from 'vue-demi';
import { VNode } from 'vue-demi';
import { VNodeProps } from 'vue-demi';

export declare const Promised: {
    new (): {
        $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & {
            promise: Promise<unknown>;
        };
    };
    $slots: {
        default: (data: unknown) => VNode[];
        rejected: (error: Error) => VNode[];
        pending: (error: unknown) => VNode[];
        combined: (arg: UsePromiseResult) => VNode[];
    };
};

declare type Refable<T> = Ref<T> | T;

/**
 * Returns the state of a Promise and observes the Promise if it's a Ref to
 * automatically update the state
 *
 * @param promise Ref of a Promise or raw Promise
 * @param pendingDelay optional delay to wait before displaying pending
 */
export declare function usePromise<T = unknown>(promise: Refable<Promise<T> | null | undefined>, pendingDelay?: Refable<number | string>): UsePromiseResult<T>;

/**
 * Return type of `usePromise()`
 */
export declare interface UsePromiseResult<T = unknown> {
    isPending: ComputedRef<boolean>;
    isResolved: Ref<boolean>;
    isRejected: Ref<boolean>;
    isDelayElapsed: Ref<boolean>;
    error: Ref<Error | undefined | null>;
    data: Ref<T | undefined | null>;
}

export { }
