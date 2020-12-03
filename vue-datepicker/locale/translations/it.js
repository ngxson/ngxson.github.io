!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t="undefined"!=typeof globalThis?globalThis:t||self).it=n()}(this,(function(){"use strict";var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function n(t,n,e){return t(e={path:n,exports:{},require:function(t,n){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==n&&e.path)}},e.exports),e.exports}var e=function(t){return t&&t.Math==Math&&t},r=e("object"==typeof globalThis&&globalThis)||e("object"==typeof window&&window)||e("object"==typeof self&&self)||e("object"==typeof t&&t)||function(){return this}()||Function("return this")(),o=function(t){try{return!!t()}catch(t){return!0}},i=!o((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),u={}.propertyIsEnumerable,c=Object.getOwnPropertyDescriptor,a={f:c&&!u.call({1:2},1)?function(t){var n=c(this,t);return!!n&&n.enumerable}:u},f=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}},l={}.toString,s=function(t){return l.call(t).slice(8,-1)},p="".split,h=o((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==s(t)?p.call(t,""):Object(t)}:Object,y=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},g=function(t){return h(y(t))},d=function(t){return"object"==typeof t?null!==t:"function"==typeof t},v=function(t,n){if(!d(t))return t;var e,r;if(n&&"function"==typeof(e=t.toString)&&!d(r=e.call(t)))return r;if("function"==typeof(e=t.valueOf)&&!d(r=e.call(t)))return r;if(!n&&"function"==typeof(e=t.toString)&&!d(r=e.call(t)))return r;throw TypeError("Can't convert object to primitive value")},b={}.hasOwnProperty,m=function(t,n){return b.call(t,n)},w=r.document,S=d(w)&&d(w.createElement),O=function(t){return S?w.createElement(t):{}},j=!i&&!o((function(){return 7!=Object.defineProperty(O("div"),"a",{get:function(){return 7}}).a})),A=Object.getOwnPropertyDescriptor,E={f:i?A:function(t,n){if(t=g(t),n=v(n,!0),j)try{return A(t,n)}catch(t){}if(m(t,n))return f(!a.f.call(t,n),t[n])}},T=function(t){if(!d(t))throw TypeError(String(t)+" is not an object");return t},x=Object.defineProperty,M={f:i?x:function(t,n,e){if(T(t),n=v(n,!0),T(e),j)try{return x(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported");return"value"in e&&(t[n]=e.value),t}},_=i?function(t,n,e){return M.f(t,n,f(1,e))}:function(t,n,e){return t[n]=e,t},P=function(t,n){try{_(r,t,n)}catch(e){r[t]=n}return n},k="__core-js_shared__",I=r[k]||P(k,{}),C=Function.toString;"function"!=typeof I.inspectSource&&(I.inspectSource=function(t){return C.call(t)});var F,L,N,D=I.inspectSource,R=r.WeakMap,G="function"==typeof R&&/native code/.test(D(R)),z=n((function(t){(t.exports=function(t,n){return I[t]||(I[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.7.0",mode:"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})})),W=0,q=Math.random(),B=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++W+q).toString(36)},V=z("keys"),K=function(t){return V[t]||(V[t]=B(t))},X={},Y=r.WeakMap;if(G){var H=I.state||(I.state=new Y),J=H.get,Q=H.has,U=H.set;F=function(t,n){return n.facade=t,U.call(H,t,n),n},L=function(t){return J.call(H,t)||{}},N=function(t){return Q.call(H,t)}}else{var Z=K("state");X[Z]=!0,F=function(t,n){return n.facade=t,_(t,Z,n),n},L=function(t){return m(t,Z)?t[Z]:{}},N=function(t){return m(t,Z)}}var $,tt,nt={set:F,get:L,has:N,enforce:function(t){return N(t)?L(t):F(t,{})},getterFor:function(t){return function(n){var e;if(!d(n)||(e=L(n)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return e}}},et=n((function(t){var n=nt.get,e=nt.enforce,o=String(String).split("String");(t.exports=function(t,n,i,u){var c,a=!!u&&!!u.unsafe,f=!!u&&!!u.enumerable,l=!!u&&!!u.noTargetGet;"function"==typeof i&&("string"!=typeof n||m(i,"name")||_(i,"name",n),(c=e(i)).source||(c.source=o.join("string"==typeof n?n:""))),t!==r?(a?!l&&t[n]&&(f=!0):delete t[n],f?t[n]=i:_(t,n,i)):f?t[n]=i:P(n,i)})(Function.prototype,"toString",(function(){return"function"==typeof this&&n(this).source||D(this)}))})),rt=r,ot=function(t){return"function"==typeof t?t:void 0},it=function(t,n){return arguments.length<2?ot(rt[t])||ot(r[t]):rt[t]&&rt[t][n]||r[t]&&r[t][n]},ut=Math.ceil,ct=Math.floor,at=function(t){return isNaN(t=+t)?0:(t>0?ct:ut)(t)},ft=Math.min,lt=function(t){return t>0?ft(at(t),9007199254740991):0},st=Math.max,pt=Math.min,ht=function(t,n){var e=at(t);return e<0?st(e+n,0):pt(e,n)},yt=function(t){return function(n,e,r){var o,i=g(n),u=lt(i.length),c=ht(r,u);if(t&&e!=e){for(;u>c;)if((o=i[c++])!=o)return!0}else for(;u>c;c++)if((t||c in i)&&i[c]===e)return t||c||0;return!t&&-1}},gt={includes:yt(!0),indexOf:yt(!1)}.indexOf,dt=function(t,n){var e,r=g(t),o=0,i=[];for(e in r)!m(X,e)&&m(r,e)&&i.push(e);for(;n.length>o;)m(r,e=n[o++])&&(~gt(i,e)||i.push(e));return i},vt=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],bt=vt.concat("length","prototype"),mt={f:Object.getOwnPropertyNames||function(t){return dt(t,bt)}},wt={f:Object.getOwnPropertySymbols},St=it("Reflect","ownKeys")||function(t){var n=mt.f(T(t)),e=wt.f;return e?n.concat(e(t)):n},Ot=function(t,n){for(var e=St(n),r=M.f,o=E.f,i=0;i<e.length;i++){var u=e[i];m(t,u)||r(t,u,o(n,u))}},jt=/#|\.prototype\./,At=function(t,n){var e=Tt[Et(t)];return e==Mt||e!=xt&&("function"==typeof n?o(n):!!n)},Et=At.normalize=function(t){return String(t).replace(jt,".").toLowerCase()},Tt=At.data={},xt=At.NATIVE="N",Mt=At.POLYFILL="P",_t=At,Pt=E.f,kt=function(t,n){var e,o,i,u,c,a=t.target,f=t.global,l=t.stat;if(e=f?r:l?r[a]||P(a,{}):(r[a]||{}).prototype)for(o in n){if(u=n[o],i=t.noTargetGet?(c=Pt(e,o))&&c.value:e[o],!_t(f?o:a+(l?".":"#")+o,t.forced)&&void 0!==i){if(typeof u==typeof i)continue;Ot(u,i)}(t.sham||i&&i.sham)&&_(u,"sham",!0),et(e,o,u,t)}},It=Array.isArray||function(t){return"Array"==s(t)},Ct=function(t){return Object(y(t))},Ft=function(t,n,e){var r=v(n);r in t?M.f(t,r,f(0,e)):t[r]=e},Lt=!!Object.getOwnPropertySymbols&&!o((function(){return!String(Symbol())})),Nt=Lt&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,Dt=z("wks"),Rt=r.Symbol,Gt=Nt?Rt:Rt&&Rt.withoutSetter||B,zt=function(t){return m(Dt,t)||(Lt&&m(Rt,t)?Dt[t]=Rt[t]:Dt[t]=Gt("Symbol."+t)),Dt[t]},Wt=zt("species"),qt=function(t,n){var e;return It(t)&&("function"!=typeof(e=t.constructor)||e!==Array&&!It(e.prototype)?d(e)&&null===(e=e[Wt])&&(e=void 0):e=void 0),new(void 0===e?Array:e)(0===n?0:n)},Bt=it("navigator","userAgent")||"",Vt=r.process,Kt=Vt&&Vt.versions,Xt=Kt&&Kt.v8;Xt?tt=($=Xt.split("."))[0]+$[1]:Bt&&(!($=Bt.match(/Edge\/(\d+)/))||$[1]>=74)&&($=Bt.match(/Chrome\/(\d+)/))&&(tt=$[1]);var Yt=tt&&+tt,Ht=zt("species"),Jt=function(t){return Yt>=51||!o((function(){var n=[];return(n.constructor={})[Ht]=function(){return{foo:1}},1!==n[t](Boolean).foo}))},Qt=zt("isConcatSpreadable"),Ut=9007199254740991,Zt="Maximum allowed index exceeded",$t=Yt>=51||!o((function(){var t=[];return t[Qt]=!1,t.concat()[0]!==t})),tn=Jt("concat"),nn=function(t){if(!d(t))return!1;var n=t[Qt];return void 0!==n?!!n:It(t)};kt({target:"Array",proto:!0,forced:!$t||!tn},{concat:function(t){var n,e,r,o,i,u=Ct(this),c=qt(u,0),a=0;for(n=-1,r=arguments.length;n<r;n++)if(nn(i=-1===n?u:arguments[n])){if(a+(o=lt(i.length))>Ut)throw TypeError(Zt);for(e=0;e<o;e++,a++)e in i&&Ft(c,a,i[e])}else{if(a>=Ut)throw TypeError(Zt);Ft(c,a++,i)}return c.length=a,c}});var en,rn=function(t,n,e){if(function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function")}(t),void 0===n)return t;switch(e){case 0:return function(){return t.call(n)};case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,o){return t.call(n,e,r,o)}}return function(){return t.apply(n,arguments)}},on=[].push,un=function(t){var n=1==t,e=2==t,r=3==t,o=4==t,i=6==t,u=5==t||i;return function(c,a,f,l){for(var s,p,y=Ct(c),g=h(y),d=rn(a,f,3),v=lt(g.length),b=0,m=l||qt,w=n?m(c,v):e?m(c,0):void 0;v>b;b++)if((u||b in g)&&(p=d(s=g[b],b,y),t))if(n)w[b]=p;else if(p)switch(t){case 3:return!0;case 5:return s;case 6:return b;case 2:on.call(w,s)}else if(o)return!1;return i?-1:r||o?o:w}},cn={forEach:un(0),map:un(1),filter:un(2),some:un(3),every:un(4),find:un(5),findIndex:un(6)},an=Object.keys||function(t){return dt(t,vt)},fn=i?Object.defineProperties:function(t,n){T(t);for(var e,r=an(n),o=r.length,i=0;o>i;)M.f(t,e=r[i++],n[e]);return t},ln=it("document","documentElement"),sn=K("IE_PROTO"),pn=function(){},hn=function(t){return"<script>"+t+"</"+"script>"},yn=function(){try{en=document.domain&&new ActiveXObject("htmlfile")}catch(t){}var t,n;yn=en?function(t){t.write(hn("")),t.close();var n=t.parentWindow.Object;return t=null,n}(en):((n=O("iframe")).style.display="none",ln.appendChild(n),n.src=String("javascript:"),(t=n.contentWindow.document).open(),t.write(hn("document.F=Object")),t.close(),t.F);for(var e=vt.length;e--;)delete yn.prototype[vt[e]];return yn()};X[sn]=!0;var gn=Object.create||function(t,n){var e;return null!==t?(pn.prototype=T(t),e=new pn,pn.prototype=null,e[sn]=t):e=yn(),void 0===n?e:fn(e,n)},dn=zt("unscopables"),vn=Array.prototype;null==vn[dn]&&M.f(vn,dn,{configurable:!0,value:gn(null)});var bn,mn=Object.defineProperty,wn={},Sn=function(t){throw t},On=function(t,n){if(m(wn,t))return wn[t];n||(n={});var e=[][t],r=!!m(n,"ACCESSORS")&&n.ACCESSORS,u=m(n,0)?n[0]:Sn,c=m(n,1)?n[1]:void 0;return wn[t]=!!e&&!o((function(){if(r&&!i)return!0;var t={length:-1};r?mn(t,1,{enumerable:!0,get:Sn}):t[1]=1,e.call(t,u,c)}))},jn=cn.findIndex,An="findIndex",En=!0,Tn=On(An);An in[]&&Array(1).findIndex((function(){En=!1})),kt({target:"Array",proto:!0,forced:En||!Tn},{findIndex:function(t){return jn(this,t,arguments.length>1?arguments[1]:void 0)}}),bn=An,vn[dn][bn]=!0;var xn=Jt("slice"),Mn=On("slice",{ACCESSORS:!0,0:0,1:2}),_n=zt("species"),Pn=[].slice,kn=Math.max;function In(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function Cn(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return kt({target:"Array",proto:!0,forced:!xn||!Mn},{slice:function(t,n){var e,r,o,i=g(this),u=lt(i.length),c=ht(t,u),a=ht(void 0===n?u:n,u);if(It(i)&&("function"!=typeof(e=i.constructor)||e!==Array&&!It(e.prototype)?d(e)&&null===(e=e[_n])&&(e=void 0):e=void 0,e===Array||void 0===e))return Pn.call(i,c,a);for(r=new(void 0===e?Array:e)(kn(a-c,0)),o=0;c<a;c++,o++)c in i&&Ft(r,o,i[c]);return r.length=o,r}}),new(function(){function t(n,e,r,o){var i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],u=arguments.length>5&&void 0!==arguments[5]&&arguments[5],c=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"";In(this,t),this.language=n,this.months=e,this.monthsAbbr=r,this.days=o,this.rtl=i,this.ymd=u,this.yearSuffix=c}var n,e,r;return n=t,(e=[{key:"getDaysStartingOn",value:function(t){var n=this._days.slice(t),e=this._days.slice(0,t);return n.concat(e)}},{key:"getMonthByAbbrName",value:function(t){var n=this._monthsAbbr.findIndex((function(n){return n===t}))+1;return n<10?"0".concat(n):"".concat(n)}},{key:"getMonthByName",value:function(t){var n=this._months.findIndex((function(n){return n===t}))+1;return n<10?"0".concat(n):"".concat(n)}},{key:"language",get:function(){return this._language},set:function(t){if("string"!=typeof t)throw new TypeError("Language must be a string");this._language=t}},{key:"months",get:function(){return this._months},set:function(t){if(12!==t.length)throw new RangeError("There must be 12 months for ".concat(this.language," language"));this._months=t}},{key:"monthsAbbr",get:function(){return this._monthsAbbr},set:function(t){if(12!==t.length)throw new RangeError("There must be 12 abbreviated months for ".concat(this.language," language"));this._monthsAbbr=t}},{key:"days",get:function(){return this._days},set:function(t){if(7!==t.length)throw new RangeError("There must be 7 days for ".concat(this.language," language"));this._days=t}}])&&Cn(n.prototype,e),r&&Cn(n,r),t}())("Italian",["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],["Dom","Lun","Mar","Mer","Gio","Ven","Sab"])}));
