function x(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function E(t,n,e){return n&&x(t.prototype,n),e&&x(t,e),t}function T(){return(T=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t}).apply(this,arguments)}function N(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n}function V(t,n){if(t==null)return{};var e,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n.indexOf(e=i[r])>=0||(o[e]=t[e]);return o}function A(t){return((n=t)!=null&&typeof n=="object"&&Array.isArray(n)===!1)==1&&Object.prototype.toString.call(t)==="[object Object]";var n}var F=Object.prototype,L=F.toString,I=F.hasOwnProperty,Y=/^\s*function (\w+)/;function q(t){var n,e=(n=t==null?void 0:t.type)!==null&&n!==void 0?n:t;if(e){var r=e.toString().match(Y);return r?r[1]:""}return""}var b=function(t){var n,e;return A(t)!==!1&&typeof(n=t.constructor)=="function"&&A(e=n.prototype)!==!1&&e.hasOwnProperty("isPrototypeOf")!==!1},B=function(t){return t},l=B;{var J=typeof console!="undefined";l=J?function(t){console.warn("[VueTypes warn]: "+t)}:B}var j=function(t,n){return I.call(t,n)},M=Number.isInteger||function(t){return typeof t=="number"&&isFinite(t)&&Math.floor(t)===t},O=Array.isArray||function(t){return L.call(t)==="[object Array]"},m=function(t){return L.call(t)==="[object Function]"},w=function(t){return b(t)&&j(t,"_vueTypes_name")},D=function(t){return b(t)&&(j(t,"type")||["_vueTypes_name","validator","default","required"].some(function(n){return j(t,n)}))};function P(t,n){return Object.defineProperty(t.bind(n),"__original",{value:t})}function g(t,n,e){var r;e===void 0&&(e=!1);var o=!0,i="";r=b(t)?t:{type:t};var f=w(r)?r._vueTypes_name+" - ":"";if(D(r)&&r.type!==null){if(r.type===void 0||r.type===!0||!r.required&&n===void 0)return o;O(r.type)?(o=r.type.some(function(a){return g(a,n,!0)===!0}),i=r.type.map(function(a){return q(a)}).join(" or ")):o=(i=q(r))==="Array"?O(n):i==="Object"?b(n):i==="String"||i==="Number"||i==="Boolean"||i==="Function"?function(a){if(a==null)return"";var v=a.constructor.toString().match(Y);return v?v[1]:""}(n)===i:n instanceof r.type}if(!o){var s=f+'value "'+n+'" should be of type "'+i+'"';return e===!1?(l(s),!1):s}if(j(r,"validator")&&m(r.validator)){var u=l,c=[];if(l=function(a){c.push(a)},o=r.validator(n),l=u,!o){var p=(c.length>1?"* ":"")+c.join(`
* `);return c.length=0,e===!1?(l(p),o):p}}return o}function y(t,n){var e=Object.defineProperties(n,{_vueTypes_name:{value:t,writable:!0},isRequired:{get:function(){return this.required=!0,this}},def:{value:function(o){return o!==void 0||this.default?m(o)||g(this,o,!0)===!0?(this.default=O(o)?function(){return[].concat(o)}:b(o)?function(){return Object.assign({},o)}:o,this):(l(this._vueTypes_name+' - invalid default value: "'+o+'"'),this):this}}}),r=e.validator;return m(r)&&(e.validator=P(r,e)),e}function h(t,n){var e=y(t,n);return Object.defineProperty(e,"validate",{value:function(r){return m(this.validator)&&l(this._vueTypes_name+` - calling .validate() will overwrite the current custom validator function. Validator info:
`+JSON.stringify(this)),this.validator=P(r,this),this}})}function S(t,n,e){var r,o,i=(r=n,o={},Object.getOwnPropertyNames(r).forEach(function(a){o[a]=Object.getOwnPropertyDescriptor(r,a)}),Object.defineProperties({},o));if(i._vueTypes_name=t,!b(e))return i;var f,s,u=e.validator,c=V(e,["validator"]);if(m(u)){var p=i.validator;p&&(p=(s=(f=p).__original)!==null&&s!==void 0?s:f),i.validator=P(p?function(a){return p.call(this,a)&&u.call(this,a)}:u,i)}return Object.assign(i,c)}function k(t){return t.replace(/^(?!\s*$)/gm,"  ")}var R=function(){return h("any",{})},$=function(){return h("function",{type:Function})},z=function(){return h("boolean",{type:Boolean})},C=function(){return h("string",{type:String})},G=function(){return h("number",{type:Number})},H=function(){return h("array",{type:Array})},K=function(){return h("object",{type:Object})},Q=function(){return y("integer",{type:Number,validator:function(t){return M(t)}})},U=function(){return y("symbol",{validator:function(t){return typeof t=="symbol"}})};function W(t,n){if(n===void 0&&(n="custom validation failed"),typeof t!="function")throw new TypeError("[VueTypes error]: You must provide a function as argument");return y(t.name||"<<anonymous function>>",{validator:function(e){var r=t(e);return r||l(this._vueTypes_name+" - "+n),r}})}function X(t){if(!O(t))throw new TypeError("[VueTypes error]: You must provide an array as argument.");var n='oneOf - value should be one of "'+t.join('", "')+'".',e=t.reduce(function(r,o){if(o!=null){var i=o.constructor;r.indexOf(i)===-1&&r.push(i)}return r},[]);return y("oneOf",{type:e.length>0?e:void 0,validator:function(r){var o=t.indexOf(r)!==-1;return o||l(n),o}})}function Z(t){if(!O(t))throw new TypeError("[VueTypes error]: You must provide an array as argument");for(var n=!1,e=[],r=0;r<t.length;r+=1){var o=t[r];if(D(o)){if(w(o)&&o._vueTypes_name==="oneOf"){e=e.concat(o.type);continue}if(m(o.validator)&&(n=!0),o.type!==!0&&o.type){e=e.concat(o.type);continue}}e.push(o)}return e=e.filter(function(i,f){return e.indexOf(i)===f}),y("oneOfType",n?{type:e,validator:function(i){var f=[],s=t.some(function(u){var c=g(w(u)&&u._vueTypes_name==="oneOf"?u.type||null:u,i,!0);return typeof c=="string"&&f.push(c),c===!0});return s||l("oneOfType - provided value does not match any of the "+f.length+` passed-in validators:
`+k(f.join(`
`))),s}}:{type:e})}function tt(t){return y("arrayOf",{type:Array,validator:function(n){var e,r=n.every(function(o){return(e=g(t,o,!0))===!0});return r||l(`arrayOf - value validation error:
`+k(e)),r}})}function rt(t){return y("instanceOf",{type:t})}function nt(t){return y("objectOf",{type:Object,validator:function(n){var e,r=Object.keys(n).every(function(o){return(e=g(t,n[o],!0))===!0});return r||l(`objectOf - value validation error:
`+k(e)),r}})}function et(t){var n=Object.keys(t),e=n.filter(function(o){var i;return!!(!((i=t[o])===null||i===void 0)&&i.required)}),r=y("shape",{type:Object,validator:function(o){var i=this;if(!b(o))return!1;var f=Object.keys(o);if(e.length>0&&e.some(function(u){return f.indexOf(u)===-1})){var s=e.filter(function(u){return f.indexOf(u)===-1});return l(s.length===1?'shape - required property "'+s[0]+'" is not defined.':'shape - required properties "'+s.join('", "')+'" are not defined.'),!1}return f.every(function(u){if(n.indexOf(u)===-1)return i._vueTypes_isLoose===!0||(l('shape - shape definition does not include a "'+u+'" property. Allowed keys: "'+n.join('", "')+'".'),!1);var c=g(t[u],o[u],!0);return typeof c=="string"&&l('shape - "'+u+`" property validation error:
 `+k(c)),c===!0})}});return Object.defineProperty(r,"_vueTypes_isLoose",{writable:!0,value:!1}),Object.defineProperty(r,"loose",{get:function(){return this._vueTypes_isLoose=!0,this}}),r}var d=function(){function t(){}return t.extend=function(n){var e=this;if(O(n))return n.forEach(function(a){return e.extend(a)}),this;var r=n.name,o=n.validate,i=o!==void 0&&o,f=n.getter,s=f!==void 0&&f,u=V(n,["name","validate","getter"]);if(j(this,r))throw new TypeError('[VueTypes error]: Type "'+r+'" already defined');var c,p=u.type;return w(p)?(delete u.type,Object.defineProperty(this,r,s?{get:function(){return S(r,p,u)}}:{value:function(){var a,v=S(r,p,u);return v.validator&&(v.validator=(a=v.validator).bind.apply(a,[v].concat([].slice.call(arguments)))),v}})):(c=s?{get:function(){var a=Object.assign({},u);return i?h(r,a):y(r,a)},enumerable:!0}:{value:function(){var a,v,_=Object.assign({},u);return a=i?h(r,_):y(r,_),_.validator&&(a.validator=(v=_.validator).bind.apply(v,[a].concat([].slice.call(arguments)))),a},enumerable:!0},Object.defineProperty(this,r,c))},E(t,null,[{key:"any",get:function(){return R()}},{key:"func",get:function(){return $().def(this.defaults.func)}},{key:"bool",get:function(){return z().def(this.defaults.bool)}},{key:"string",get:function(){return C().def(this.defaults.string)}},{key:"number",get:function(){return G().def(this.defaults.number)}},{key:"array",get:function(){return H().def(this.defaults.array)}},{key:"object",get:function(){return K().def(this.defaults.object)}},{key:"integer",get:function(){return Q().def(this.defaults.integer)}},{key:"symbol",get:function(){return U()}}]),t}();function ot(t){var n;return t===void 0&&(t={func:function(){},bool:!0,string:"",number:0,array:function(){return[]},object:function(){return{}},integer:0}),(n=function(e){function r(){return e.apply(this,arguments)||this}return N(r,e),E(r,null,[{key:"sensibleDefaults",get:function(){return T({},this.defaults)},set:function(o){this.defaults=o!==!1?T({},o!==!0?o:t):{}}}]),r}(d)).defaults=T({},t),n}d.defaults={},d.custom=W,d.oneOf=X,d.instanceOf=rt,d.oneOfType=Z,d.arrayOf=tt,d.objectOf=nt,d.shape=et,d.utils={validate:function(t,n){return g(n,t,!0)===!0},toType:function(t,n,e){return e===void 0&&(e=!1),e?h(t,n):y(t,n)}};(function(t){function n(){return t.apply(this,arguments)||this}return N(n,t),n})(ot());export{ot as z};
