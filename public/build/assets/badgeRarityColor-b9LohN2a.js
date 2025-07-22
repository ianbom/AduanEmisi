import{c as f,u as V,d as F,e as L,f as $,g as T,R as D,h as G,i as m,P as q}from"./CitizenLayout-BJCqtu_4.js";import{r as l,j as c}from"./app-CEf6-TVv.js";import{P as g,c as h}from"./index-T59oawn7.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=f("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=f("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=f("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=f("MapPinned",[["path",{d:"M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0",key:"11u0oz"}],["circle",{cx:"12",cy:"8",r:"2",key:"1822b1"}],["path",{d:"M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",key:"q8zwxj"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=f("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=f("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);var y="Tabs",[z,oe]=L(y,[T]),k=T(),[H,x]=z(y),C=l.forwardRef((e,a)=>{const{__scopeTabs:t,value:o,onValueChange:s,defaultValue:d,orientation:n="horizontal",dir:u,activationMode:p="automatic",...v}=e,i=V(u),[r,b]=F({prop:o,onChange:s,defaultProp:d??"",caller:y});return c.jsx(H,{scope:t,baseId:$(),value:r,onValueChange:b,orientation:n,dir:i,activationMode:p,children:c.jsx(g.div,{dir:i,"data-orientation":n,...v,ref:a})})});C.displayName=y;var M="TabsList",w=l.forwardRef((e,a)=>{const{__scopeTabs:t,loop:o=!0,...s}=e,d=x(M,t),n=k(t);return c.jsx(D,{asChild:!0,...n,orientation:d.orientation,dir:d.dir,loop:o,children:c.jsx(g.div,{role:"tablist","aria-orientation":d.orientation,...s,ref:a})})});w.displayName=M;var N="TabsTrigger",A=l.forwardRef((e,a)=>{const{__scopeTabs:t,value:o,disabled:s=!1,...d}=e,n=x(N,t),u=k(t),p=P(n.baseId,o),v=j(n.baseId,o),i=o===n.value;return c.jsx(G,{asChild:!0,...u,focusable:!s,active:i,children:c.jsx(g.button,{type:"button",role:"tab","aria-selected":i,"aria-controls":v,"data-state":i?"active":"inactive","data-disabled":s?"":void 0,disabled:s,id:p,...d,ref:a,onMouseDown:m(e.onMouseDown,r=>{!s&&r.button===0&&r.ctrlKey===!1?n.onValueChange(o):r.preventDefault()}),onKeyDown:m(e.onKeyDown,r=>{[" ","Enter"].includes(r.key)&&n.onValueChange(o)}),onFocus:m(e.onFocus,()=>{const r=n.activationMode!=="manual";!i&&!s&&r&&n.onValueChange(o)})})})});A.displayName=N;var R="TabsContent",I=l.forwardRef((e,a)=>{const{__scopeTabs:t,value:o,forceMount:s,children:d,...n}=e,u=x(R,t),p=P(u.baseId,o),v=j(u.baseId,o),i=o===u.value,r=l.useRef(i);return l.useEffect(()=>{const b=requestAnimationFrame(()=>r.current=!1);return()=>cancelAnimationFrame(b)},[]),c.jsx(q,{present:s||i,children:({present:b})=>c.jsx(g.div,{"data-state":i?"active":"inactive","data-orientation":u.orientation,role:"tabpanel","aria-labelledby":p,hidden:!b,id:v,tabIndex:0,...n,ref:a,style:{...e.style,animationDuration:r.current?"0s":void 0},children:b&&d})})});I.displayName=R;function P(e,a){return`${e}-trigger-${a}`}function j(e,a){return`${e}-content-${a}`}var B=C,_=w,S=A,E=I;const ne=B,K=l.forwardRef(({className:e,...a},t)=>c.jsx(_,{ref:t,className:h("bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1",e),...a}));K.displayName=_.displayName;const O=l.forwardRef(({className:e,...a},t)=>c.jsx(S,{ref:t,className:h("ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",e),...a}));O.displayName=S.displayName;const Z=l.forwardRef(({className:e,...a},t)=>c.jsx(E,{ref:t,className:h("ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",e),...a}));Z.displayName=E.displayName;const re=e=>{switch(e){case"Gold":return"border-yellow-400 bg-yellow-50";case"Silver":return"border-gray-400 bg-gray-50";case"Bronze":return"border-orange-400 bg-orange-50";default:return"border-gray-200 bg-gray-50"}};export{W as A,X as C,Y as M,ae as P,te as T,ee as a,ne as b,K as c,O as d,Z as e,re as g};
