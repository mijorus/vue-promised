/*!
  * vue-promised v2.1.0
  * (c) 2021 Eduardo San Martin Morote
  * @license MIT
  */
var VuePromised=function(e,r){"use strict";function u(e,u=200){const n=r.ref(!1),t=r.ref(!1),i=r.computed((()=>!n.value&&!t.value)),a=r.ref(!1),l=r.ref(),s=r.ref();let o;return r.watch((()=>r.unref(e)),(i=>{if(n.value=!1,t.value=!1,l.value=null,!i)return s.value=null,o&&clearTimeout(o),void(o=null);r.unref(u)>0?(a.value=!1,o&&clearTimeout(o),o=setTimeout((()=>{a.value=!0}),Number(r.unref(u)))):a.value=!0,i.then((u=>{i===r.unref(e)&&(s.value=u,t.value=!0)})).catch((u=>{i===r.unref(e)&&(l.value=u,n.value=!0)}))}),{immediate:!0}),{isPending:i,isRejected:n,isResolved:t,isDelayElapsed:a,error:l,data:s}}return e.Promised=r.defineComponent({name:"Promised",props:{promise:{},pendingDelay:{type:[Number,String],default:200}},setup(e,{slots:n}){const t=r.toRefs(e),i=r.reactive(u(t.promise,t.pendingDelay));return()=>{if("combined"in n)return n.combined(i);const[e,r]=i.isRejected?["rejected",i.error]:i.isPending?i.isDelayElapsed?["pending",i.data]:[null]:["default",i.data];return e&&n[e](r)}}}),e.usePromise=u,Object.defineProperty(e,"__esModule",{value:!0}),e}({},VueDemi);
