import"./vue-c135e1e2.js";import{d as f,B as d,D as _,E as h,b as v}from"./@vue-64154de3.js";import{c as g,a as y}from"./vue-router-c2320f31.js";import"./ant-design-vue-99ce6422.js";import{c as E}from"./pinia-8a562ed5.js";import{i as L}from"./pinia-plugin-persist-b930bd4e.js";import"./@babel-cd0b8707.js";import"./vue-types-60325680.js";import"./@ant-design-d7cff791.js";import"./@ctrl-3ef7f079.js";function $(){import("data:text/javascript,")}const b=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}};b();var O=(s,i)=>{const o=s.__vccOpts||s;for(const[t,e]of i)o[t]=e;return o};const P=f({setup(s){return(i,o)=>{const t=d("router-view");return _(),h(t)}}});var k=O(P,[["__file","/home/runner/work/blog/blog/src/App.vue"]]);const w="modulepreload",c={},x="./",a=function(i,o){return!o||o.length===0?i():Promise.all(o.map(t=>{if(t=`${x}${t}`,t in c)return;c[t]=!0;const e=t.endsWith(".css"),r=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${r}`))return;const n=document.createElement("link");if(n.rel=e?"stylesheet":w,e||(n.as="script",n.crossOrigin=""),n.href=t,document.head.appendChild(n),e)return new Promise((m,p)=>{n.addEventListener("load",m),n.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>i())},A=[{path:"/",name:"Home",meta:{title:"\u9996\u9875"},component:()=>a(()=>import("./Home-ab849284.js"),["static/js/Home-ab849284.js","static/js/vue-c135e1e2.js","static/js/@vue-64154de3.js","static/js/vue-router-c2320f31.js","static/js/ant-design-vue-99ce6422.js","static/css/ant-design-vue-727b186b.css","static/js/@babel-cd0b8707.js","static/js/vue-types-60325680.js","static/js/@ant-design-d7cff791.js","static/js/@ctrl-3ef7f079.js","static/js/pinia-8a562ed5.js","static/js/pinia-plugin-persist-b930bd4e.js"])},{path:"/login",name:"Login",meta:{title:"\u767B\u5F55"},component:()=>a(()=>import("./Login-d492b339.js"),["static/js/Login-d492b339.js","static/css/Login-5a209ee8.css","static/js/vue-c135e1e2.js","static/js/@vue-64154de3.js","static/js/axios-95009a82.js","static/js/pinia-8a562ed5.js","static/js/ant-design-vue-99ce6422.js","static/css/ant-design-vue-727b186b.css","static/js/@babel-cd0b8707.js","static/js/vue-types-60325680.js","static/js/@ant-design-d7cff791.js","static/js/@ctrl-3ef7f079.js","static/js/vue-router-c2320f31.js","static/js/pinia-plugin-persist-b930bd4e.js"])}],l=g({history:y(),routes:A});l.beforeEach((s,i,o)=>{document.title=s.meta.title,o()});const u=E();u.use(L);v(k).use(l).use(u).mount("#app");export{O as _,$ as __vite_legacy_guard};
