System.register([],(function(e){"use strict";return{execute:function(){function a(e,a){(function(e){return"string"==typeof e&&-1!==e.indexOf(".")&&1===parseFloat(e)})(e)&&(e="100%");var f=function(e){return"string"==typeof e&&-1!==e.indexOf("%")}(e);return e=360===a?e:Math.min(a,Math.max(0,parseFloat(e))),f&&(e=parseInt(String(e*a),10)/100),Math.abs(e-a)<1e-6?1:e=360===a?(e<0?e%a+a:e%a)/parseFloat(String(a)):e%a/parseFloat(String(a))}function f(e){return e<=1?"".concat(100*Number(e),"%"):e}function r(e){return 1===e.length?"0"+e:String(e)}function t(e,a,f){return f<0&&(f+=1),f>1&&(f-=1),f<1/6?e+6*f*(a-e):f<.5?a:f<2/3?e+(a-e)*(2/3-f)*6:e}function n(e){return l(e)/255}function l(e){return parseInt(e,16)}e({a:function(e,f,r){e=a(e,255),f=a(f,255),r=a(r,255);var t=Math.max(e,f,r),n=Math.min(e,f,r),l=0,i=t,o=t-n,c=0===t?0:o/t;if(t===n)l=0;else{switch(t){case e:l=(f-r)/o+(f<r?6:0);break;case f:l=(r-e)/o+2;break;case r:l=(e-f)/o+4}l/=6}return{h:l,s:c,v:i}},i:function(e){var r,o,c,d={r:0,g:0,b:0},g=1,h=null,u=null,m=null,p=!1,y=!1;return"string"==typeof e&&(e=function(e){if(0===(e=e.trim().toLowerCase()).length)return!1;var a=!1;if(i[e])e=i[e],a=!0;else if("transparent"===e)return{r:0,g:0,b:0,a:0,format:"name"};var f=s.rgb.exec(e);return f?{r:f[1],g:f[2],b:f[3]}:(f=s.rgba.exec(e))?{r:f[1],g:f[2],b:f[3],a:f[4]}:(f=s.hsl.exec(e))?{h:f[1],s:f[2],l:f[3]}:(f=s.hsla.exec(e))?{h:f[1],s:f[2],l:f[3],a:f[4]}:(f=s.hsv.exec(e))?{h:f[1],s:f[2],v:f[3]}:(f=s.hsva.exec(e))?{h:f[1],s:f[2],v:f[3],a:f[4]}:(f=s.hex8.exec(e))?{r:l(f[1]),g:l(f[2]),b:l(f[3]),a:n(f[4]),format:a?"name":"hex8"}:(f=s.hex6.exec(e))?{r:l(f[1]),g:l(f[2]),b:l(f[3]),format:a?"name":"hex"}:(f=s.hex4.exec(e))?{r:l(f[1]+f[1]),g:l(f[2]+f[2]),b:l(f[3]+f[3]),a:n(f[4]+f[4]),format:a?"name":"hex8"}:!!(f=s.hex3.exec(e))&&{r:l(f[1]+f[1]),g:l(f[2]+f[2]),b:l(f[3]+f[3]),format:a?"name":"hex"}}(e)),"object"==typeof e&&(b(e.r)&&b(e.g)&&b(e.b)?(r=e.r,o=e.g,c=e.b,d={r:255*a(r,255),g:255*a(o,255),b:255*a(c,255)},p=!0,y="%"===String(e.r).substr(-1)?"prgb":"rgb"):b(e.h)&&b(e.s)&&b(e.v)?(h=f(e.s),u=f(e.v),d=function(e,f,r){e=6*a(e,360),f=a(f,100),r=a(r,100);var t=Math.floor(e),n=e-t,l=r*(1-f),i=r*(1-n*f),o=r*(1-(1-n)*f),c=t%6;return{r:255*[r,i,l,l,o,r][c],g:255*[o,r,r,i,l,l][c],b:255*[l,l,o,r,r,i][c]}}(e.h,h,u),p=!0,y="hsv"):b(e.h)&&b(e.s)&&b(e.l)&&(h=f(e.s),m=f(e.l),d=function(e,f,r){var n,l,i;if(e=a(e,360),f=a(f,100),r=a(r,100),0===f)l=r,i=r,n=r;else{var o=r<.5?r*(1+f):r+f-r*f,c=2*r-o;n=t(c,o,e+1/3),l=t(c,o,e),i=t(c,o,e-1/3)}return{r:255*n,g:255*l,b:255*i}}(e.h,h,m),p=!0,y="hsl"),Object.prototype.hasOwnProperty.call(e,"a")&&(g=e.a)),g=function(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}(g),{ok:p,format:e.format||y,r:Math.min(255,Math.max(d.r,0)),g:Math.min(255,Math.max(d.g,0)),b:Math.min(255,Math.max(d.b,0)),a:g}},r:function(e,a,f,t){var n=[r(Math.round(e).toString(16)),r(Math.round(a).toString(16)),r(Math.round(f).toString(16))];return t&&n[0].startsWith(n[0].charAt(1))&&n[1].startsWith(n[1].charAt(1))&&n[2].startsWith(n[2].charAt(1))?n[0].charAt(0)+n[1].charAt(0)+n[2].charAt(0):n.join("")}});var i={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},o="(?:".concat("[-\\+]?\\d*\\.\\d+%?",")|(?:").concat("[-\\+]?\\d+%?",")"),c="[\\s|\\(]+(".concat(o,")[,|\\s]+(").concat(o,")[,|\\s]+(").concat(o,")\\s*\\)?"),d="[\\s|\\(]+(".concat(o,")[,|\\s]+(").concat(o,")[,|\\s]+(").concat(o,")[,|\\s]+(").concat(o,")\\s*\\)?"),s={CSS_UNIT:new RegExp(o),rgb:new RegExp("rgb"+c),rgba:new RegExp("rgba"+d),hsl:new RegExp("hsl"+c),hsla:new RegExp("hsla"+d),hsv:new RegExp("hsv"+c),hsva:new RegExp("hsva"+d),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function b(e){return Boolean(s.CSS_UNIT.exec(String(e)))}}}}));
