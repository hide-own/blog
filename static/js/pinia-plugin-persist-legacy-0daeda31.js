System.register([],(function(e){"use strict";return{execute:function(){const s=(e,s)=>{const t=e.storage||sessionStorage,i=e.key||s.$id;if(e.paths){const o=e.paths.reduce(((e,t)=>(e[t]=s.$state[t],e)),{});t.setItem(i,JSON.stringify(o))}else t.setItem(i,JSON.stringify(s.$state))};e("i",(({options:e,store:t})=>{var i,o,r,n;if(null==(i=e.persist)?void 0:i.enabled){const i=[{key:t.$id,storage:sessionStorage}],a=(null==(r=null==(o=e.persist)?void 0:o.strategies)?void 0:r.length)?null==(n=e.persist)?void 0:n.strategies:i;a.forEach((e=>{const i=e.storage||sessionStorage,o=e.key||t.$id,r=i.getItem(o);r&&(t.$patch(JSON.parse(r)),s(e,t))})),t.$subscribe((()=>{a.forEach((e=>{s(e,t)}))}))}}))}}}));
