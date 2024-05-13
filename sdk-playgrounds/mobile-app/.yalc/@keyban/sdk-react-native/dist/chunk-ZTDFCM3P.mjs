var te=Object.create;var et=Object.defineProperty;var ee=Object.getOwnPropertyDescriptor;var re=Object.getOwnPropertyNames;var ne=Object.getPrototypeOf,ie=Object.prototype.hasOwnProperty;var p=(r,t)=>()=>(t||r((t={exports:{}}).exports,t),t.exports);var oe=(r,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of re(t))!ie.call(r,i)&&i!==e&&et(r,i,{get:()=>t[i],enumerable:!(n=ee(t,i))||n.enumerable});return r};var ge=(r,t,e)=>(e=r!=null?te(ne(r)):{},oe(t||!r||!r.__esModule?et(e,"default",{value:r,enumerable:!0}):e,r));var nt=p((we,rt)=>{rt.exports=ue;function ue(r,t){for(var e=new Array(arguments.length-1),n=0,i=2,o=!0;i<arguments.length;)e[n++]=arguments[i++];return new Promise(function(c,u){e[n]=function(h){if(o)if(o=!1,h)u(h);else {for(var w=new Array(arguments.length-1),L=0;L<w.length;)w[L++]=arguments[L];c.apply(null,w);}};try{r.apply(t||null,e);}catch(f){o&&(o=!1,u(f));}})}});var st=p(ut=>{var R=ut;R.length=function(t){var e=t.length;if(!e)return 0;for(var n=0;--e%4>1&&t.charAt(e)==="=";)++n;return Math.ceil(t.length*3)/4-n};var k=new Array(64),ot=new Array(123);for(B=0;B<64;)ot[k[B]=B<26?B+65:B<52?B+71:B<62?B-4:B-59|43]=B++;var B;R.encode=function(t,e,n){for(var i=null,o=[],s=0,c=0,u;e<n;){var f=t[e++];switch(c){case 0:o[s++]=k[f>>2],u=(f&3)<<4,c=1;break;case 1:o[s++]=k[u|f>>4],u=(f&15)<<2,c=2;break;case 2:o[s++]=k[u|f>>6],o[s++]=k[f&63],c=0;break}s>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,o)),s=0);}return c&&(o[s++]=k[u],o[s++]=61,c===1&&(o[s++]=61)),i?(s&&i.push(String.fromCharCode.apply(String,o.slice(0,s))),i.join("")):String.fromCharCode.apply(String,o.slice(0,s))};var it="invalid encoding";R.decode=function(t,e,n){for(var i=n,o=0,s,c=0;c<t.length;){var u=t.charCodeAt(c++);if(u===61&&o>1)break;if((u=ot[u])===void 0)throw Error(it);switch(o){case 0:s=u,o=1;break;case 1:e[n++]=s<<2|(u&48)>>4,s=u,o=2;break;case 2:e[n++]=(s&15)<<4|(u&60)>>2,s=u,o=3;break;case 3:e[n++]=(s&3)<<6|u,o=0;break}}if(o===1)throw Error(it);return n-i};R.test=function(t){return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(t)};});var ct=p((be,ft)=>{ft.exports=M;function M(){this._listeners={};}M.prototype.on=function(t,e,n){return (this._listeners[t]||(this._listeners[t]=[])).push({fn:e,ctx:n||this}),this};M.prototype.off=function(t,e){if(t===void 0)this._listeners={};else if(e===void 0)this._listeners[t]=[];else for(var n=this._listeners[t],i=0;i<n.length;)n[i].fn===e?n.splice(i,1):++i;return this};M.prototype.emit=function(t){var e=this._listeners[t];if(e){for(var n=[],i=1;i<arguments.length;)n.push(arguments[i++]);for(i=0;i<e.length;)e[i].fn.apply(e[i++].ctx,n);}return this};});var gt=p((Be,yt)=>{yt.exports=lt(lt);function lt(r){return typeof Float32Array!="undefined"?function(){var t=new Float32Array([-0]),e=new Uint8Array(t.buffer),n=e[3]===128;function i(u,f,h){t[0]=u,f[h]=e[0],f[h+1]=e[1],f[h+2]=e[2],f[h+3]=e[3];}function o(u,f,h){t[0]=u,f[h]=e[3],f[h+1]=e[2],f[h+2]=e[1],f[h+3]=e[0];}r.writeFloatLE=n?i:o,r.writeFloatBE=n?o:i;function s(u,f){return e[0]=u[f],e[1]=u[f+1],e[2]=u[f+2],e[3]=u[f+3],t[0]}function c(u,f){return e[3]=u[f],e[2]=u[f+1],e[1]=u[f+2],e[0]=u[f+3],t[0]}r.readFloatLE=n?s:c,r.readFloatBE=n?c:s;}():function(){function t(n,i,o,s){var c=i<0?1:0;if(c&&(i=-i),i===0)n(1/i>0?0:2147483648,o,s);else if(isNaN(i))n(2143289344,o,s);else if(i>34028234663852886e22)n((c<<31|2139095040)>>>0,o,s);else if(i<11754943508222875e-54)n((c<<31|Math.round(i/1401298464324817e-60))>>>0,o,s);else {var u=Math.floor(Math.log(i)/Math.LN2),f=Math.round(i*Math.pow(2,-u)*8388608)&8388607;n((c<<31|u+127<<23|f)>>>0,o,s);}}r.writeFloatLE=t.bind(null,ht),r.writeFloatBE=t.bind(null,at);function e(n,i,o){var s=n(i,o),c=(s>>31)*2+1,u=s>>>23&255,f=s&8388607;return u===255?f?NaN:c*(1/0):u===0?c*1401298464324817e-60*f:c*Math.pow(2,u-150)*(f+8388608)}r.readFloatLE=e.bind(null,dt),r.readFloatBE=e.bind(null,pt);}(),typeof Float64Array!="undefined"?function(){var t=new Float64Array([-0]),e=new Uint8Array(t.buffer),n=e[7]===128;function i(u,f,h){t[0]=u,f[h]=e[0],f[h+1]=e[1],f[h+2]=e[2],f[h+3]=e[3],f[h+4]=e[4],f[h+5]=e[5],f[h+6]=e[6],f[h+7]=e[7];}function o(u,f,h){t[0]=u,f[h]=e[7],f[h+1]=e[6],f[h+2]=e[5],f[h+3]=e[4],f[h+4]=e[3],f[h+5]=e[2],f[h+6]=e[1],f[h+7]=e[0];}r.writeDoubleLE=n?i:o,r.writeDoubleBE=n?o:i;function s(u,f){return e[0]=u[f],e[1]=u[f+1],e[2]=u[f+2],e[3]=u[f+3],e[4]=u[f+4],e[5]=u[f+5],e[6]=u[f+6],e[7]=u[f+7],t[0]}function c(u,f){return e[7]=u[f],e[6]=u[f+1],e[5]=u[f+2],e[4]=u[f+3],e[3]=u[f+4],e[2]=u[f+5],e[1]=u[f+6],e[0]=u[f+7],t[0]}r.readDoubleLE=n?s:c,r.readDoubleBE=n?c:s;}():function(){function t(n,i,o,s,c,u){var f=s<0?1:0;if(f&&(s=-s),s===0)n(0,c,u+i),n(1/s>0?0:2147483648,c,u+o);else if(isNaN(s))n(0,c,u+i),n(2146959360,c,u+o);else if(s>17976931348623157e292)n(0,c,u+i),n((f<<31|2146435072)>>>0,c,u+o);else {var h;if(s<22250738585072014e-324)h=s/5e-324,n(h>>>0,c,u+i),n((f<<31|h/4294967296)>>>0,c,u+o);else {var w=Math.floor(Math.log(s)/Math.LN2);w===1024&&(w=1023),h=s*Math.pow(2,-w),n(h*4503599627370496>>>0,c,u+i),n((f<<31|w+1023<<20|h*1048576&1048575)>>>0,c,u+o);}}}r.writeDoubleLE=t.bind(null,ht,0,4),r.writeDoubleBE=t.bind(null,at,4,0);function e(n,i,o,s,c){var u=n(s,c+i),f=n(s,c+o),h=(f>>31)*2+1,w=f>>>20&2047,L=4294967296*(f&1048575)+u;return w===2047?L?NaN:h*(1/0):w===0?h*5e-324*L:h*Math.pow(2,w-1075)*(L+4503599627370496)}r.readDoubleLE=e.bind(null,dt,0,4),r.readDoubleBE=e.bind(null,pt,4,0);}(),r}function ht(r,t,e){t[e]=r&255,t[e+1]=r>>>8&255,t[e+2]=r>>>16&255,t[e+3]=r>>>24;}function at(r,t,e){t[e]=r>>>24,t[e+1]=r>>>16&255,t[e+2]=r>>>8&255,t[e+3]=r&255;}function dt(r,t){return (r[t]|r[t+1]<<8|r[t+2]<<16|r[t+3]<<24)>>>0}function pt(r,t){return (r[t]<<24|r[t+1]<<16|r[t+2]<<8|r[t+3])>>>0}});var mt=p((exports,module)=>{module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(r){}return null}});var _t=p(wt=>{var T=wt;T.length=function(t){for(var e=0,n=0,i=0;i<t.length;++i)n=t.charCodeAt(i),n<128?e+=1:n<2048?e+=2:(n&64512)===55296&&(t.charCodeAt(i+1)&64512)===56320?(++i,e+=4):e+=3;return e};T.read=function(t,e,n){var i=n-e;if(i<1)return "";for(var o=null,s=[],c=0,u;e<n;)u=t[e++],u<128?s[c++]=u:u>191&&u<224?s[c++]=(u&31)<<6|t[e++]&63:u>239&&u<365?(u=((u&7)<<18|(t[e++]&63)<<12|(t[e++]&63)<<6|t[e++]&63)-65536,s[c++]=55296+(u>>10),s[c++]=56320+(u&1023)):s[c++]=(u&15)<<12|(t[e++]&63)<<6|t[e++]&63,c>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,s)),c=0);return o?(c&&o.push(String.fromCharCode.apply(String,s.slice(0,c))),o.join("")):String.fromCharCode.apply(String,s.slice(0,c))};T.write=function(t,e,n){for(var i=n,o,s,c=0;c<t.length;++c)o=t.charCodeAt(c),o<128?e[n++]=o:o<2048?(e[n++]=o>>6|192,e[n++]=o&63|128):(o&64512)===55296&&((s=t.charCodeAt(c+1))&64512)===56320?(o=65536+((o&1023)<<10)+(s&1023),++c,e[n++]=o>>18|240,e[n++]=o>>12&63|128,e[n++]=o>>6&63|128,e[n++]=o&63|128):(e[n++]=o>>12|224,e[n++]=o>>6&63|128,e[n++]=o&63|128);return n-i};});var Bt=p((Oe,bt)=>{bt.exports=se;function se(r,t,e){var n=e||8192,i=n>>>1,o=null,s=n;return function(u){if(u<1||u>i)return r(u);s+u>n&&(o=r(n),s=0);var f=t.call(o,s,s+=u);return s&7&&(s=(s|7)+1),f}}});var Ot=p((ve,Et)=>{Et.exports=y;var I=x();function y(r,t){this.lo=r>>>0,this.hi=t>>>0;}var j=y.zero=new y(0,0);j.toNumber=function(){return 0};j.zzEncode=j.zzDecode=function(){return this};j.length=function(){return 1};var fe=y.zeroHash="\0\0\0\0\0\0\0\0";y.fromNumber=function(t){if(t===0)return j;var e=t<0;e&&(t=-t);var n=t>>>0,i=(t-n)/4294967296>>>0;return e&&(i=~i>>>0,n=~n>>>0,++n>4294967295&&(n=0,++i>4294967295&&(i=0))),new y(n,i)};y.from=function(t){if(typeof t=="number")return y.fromNumber(t);if(I.isString(t))if(I.Long)t=I.Long.fromString(t);else return y.fromNumber(parseInt(t,10));return t.low||t.high?new y(t.low>>>0,t.high>>>0):j};y.prototype.toNumber=function(t){if(!t&&this.hi>>>31){var e=~this.lo+1>>>0,n=~this.hi>>>0;return e||(n=n+1>>>0),-(e+n*4294967296)}return this.lo+this.hi*4294967296};y.prototype.toLong=function(t){return I.Long?new I.Long(this.lo|0,this.hi|0,!!t):{low:this.lo|0,high:this.hi|0,unsigned:!!t}};var S=String.prototype.charCodeAt;y.fromHash=function(t){return t===fe?j:new y((S.call(t,0)|S.call(t,1)<<8|S.call(t,2)<<16|S.call(t,3)<<24)>>>0,(S.call(t,4)|S.call(t,5)<<8|S.call(t,6)<<16|S.call(t,7)<<24)>>>0)};y.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};y.prototype.zzEncode=function(){var t=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^t)>>>0,this.lo=(this.lo<<1^t)>>>0,this};y.prototype.zzDecode=function(){var t=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^t)>>>0,this.hi=(this.hi>>>1^t)>>>0,this};y.prototype.length=function(){var t=this.lo,e=(this.lo>>>28|this.hi<<4)>>>0,n=this.hi>>>24;return n===0?e===0?t<16384?t<128?1:2:t<2097152?3:4:e<16384?e<128?5:6:e<2097152?7:8:n<128?9:10};});var x=p(H=>{var l=H;l.asPromise=nt();l.base64=st();l.EventEmitter=ct();l.float=gt();l.inquire=mt();l.utf8=_t();l.pool=Bt();l.LongBits=Ot();l.isNode=!!(typeof global!="undefined"&&global&&global.process&&global.process.versions&&global.process.versions.node);l.global=l.isNode&&global||typeof window!="undefined"&&window||typeof self!="undefined"&&self||H;l.emptyArray=Object.freeze?Object.freeze([]):[];l.emptyObject=Object.freeze?Object.freeze({}):{};l.isInteger=Number.isInteger||function(t){return typeof t=="number"&&isFinite(t)&&Math.floor(t)===t};l.isString=function(t){return typeof t=="string"||t instanceof String};l.isObject=function(t){return t&&typeof t=="object"};l.isset=l.isSet=function(t,e){var n=t[e];return n!=null&&t.hasOwnProperty(e)?typeof n!="object"||(Array.isArray(n)?n.length:Object.keys(n).length)>0:!1};l.Buffer=function(){try{var r=l.inquire("buffer").Buffer;return r.prototype.utf8Write?r:null}catch(t){return null}}();l._Buffer_from=null;l._Buffer_allocUnsafe=null;l.newBuffer=function(t){return typeof t=="number"?l.Buffer?l._Buffer_allocUnsafe(t):new l.Array(t):l.Buffer?l._Buffer_from(t):typeof Uint8Array=="undefined"?t:new Uint8Array(t)};l.Array=typeof Uint8Array!="undefined"?Uint8Array:Array;l.Long=l.global.dcodeIO&&l.global.dcodeIO.Long||l.global.Long||l.inquire("long");l.key2Re=/^true|false|0|1$/;l.key32Re=/^-?(?:0|[1-9][0-9]*)$/;l.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;l.longToHash=function(t){return t?l.LongBits.from(t).toHash():l.LongBits.zeroHash};l.longFromHash=function(t,e){var n=l.LongBits.fromHash(t);return l.Long?l.Long.fromBits(n.lo,n.hi,e):n.toNumber(!!e)};function vt(r,t,e){for(var n=Object.keys(t),i=0;i<n.length;++i)(r[n[i]]===void 0||!e)&&(r[n[i]]=t[n[i]]);return r}l.merge=vt;l.lcFirst=function(t){return t.charAt(0).toLowerCase()+t.substring(1)};function At(r){function t(e,n){if(!(this instanceof t))return new t(e,n);Object.defineProperty(this,"message",{get:function(){return e}}),Error.captureStackTrace?Error.captureStackTrace(this,t):Object.defineProperty(this,"stack",{value:new Error().stack||""}),n&&vt(this,n);}return t.prototype=Object.create(Error.prototype,{constructor:{value:t,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return r},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),t}l.newError=At;l.ProtocolError=At("ProtocolError");l.oneOfGetter=function(t){for(var e={},n=0;n<t.length;++n)e[t[n]]=1;return function(){for(var i=Object.keys(this),o=i.length-1;o>-1;--o)if(e[i[o]]===1&&this[i[o]]!==void 0&&this[i[o]]!==null)return i[o]}};l.oneOfSetter=function(t){return function(e){for(var n=0;n<t.length;++n)t[n]!==e&&delete this[t[n]];}};l.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};l._configure=function(){var r=l.Buffer;if(!r){l._Buffer_from=l._Buffer_allocUnsafe=null;return}l._Buffer_from=r.from!==Uint8Array.from&&r.from||function(e,n){return new r(e,n)},l._Buffer_allocUnsafe=r.allocUnsafe||function(e){return new r(e)};};});var Z=p((Se,qt)=>{qt.exports=a;var _=x(),W,z=_.LongBits,St=_.base64,xt=_.utf8;function N(r,t,e){this.fn=r,this.len=t,this.next=void 0,this.val=e;}function $(){}function ce(r){this.head=r.head,this.tail=r.tail,this.len=r.len,this.next=r.states;}function a(){this.len=0,this.head=new N($,0,0),this.tail=this.head,this.states=null;}var Dt=function(){return _.Buffer?function(){return (a.create=function(){return new W})()}:function(){return new a}};a.create=Dt();a.alloc=function(t){return new _.Array(t)};_.Array!==Array&&(a.alloc=_.pool(a.alloc,_.Array.prototype.subarray));a.prototype._push=function(t,e,n){return this.tail=this.tail.next=new N(t,e,n),this.len+=e,this};function G(r,t,e){t[e]=r&255;}function le(r,t,e){for(;r>127;)t[e++]=r&127|128,r>>>=7;t[e]=r;}function U(r,t){this.len=r,this.next=void 0,this.val=t;}U.prototype=Object.create(N.prototype);U.prototype.fn=le;a.prototype.uint32=function(t){return this.len+=(this.tail=this.tail.next=new U((t=t>>>0)<128?1:t<16384?2:t<2097152?3:t<268435456?4:5,t)).len,this};a.prototype.int32=function(t){return t<0?this._push(V,10,z.fromNumber(t)):this.uint32(t)};a.prototype.sint32=function(t){return this.uint32((t<<1^t>>31)>>>0)};function V(r,t,e){for(;r.hi;)t[e++]=r.lo&127|128,r.lo=(r.lo>>>7|r.hi<<25)>>>0,r.hi>>>=7;for(;r.lo>127;)t[e++]=r.lo&127|128,r.lo=r.lo>>>7;t[e++]=r.lo;}a.prototype.uint64=function(t){var e=z.from(t);return this._push(V,e.length(),e)};a.prototype.int64=a.prototype.uint64;a.prototype.sint64=function(t){var e=z.from(t).zzEncode();return this._push(V,e.length(),e)};a.prototype.bool=function(t){return this._push(G,1,t?1:0)};function J(r,t,e){t[e]=r&255,t[e+1]=r>>>8&255,t[e+2]=r>>>16&255,t[e+3]=r>>>24;}a.prototype.fixed32=function(t){return this._push(J,4,t>>>0)};a.prototype.sfixed32=a.prototype.fixed32;a.prototype.fixed64=function(t){var e=z.from(t);return this._push(J,4,e.lo)._push(J,4,e.hi)};a.prototype.sfixed64=a.prototype.fixed64;a.prototype.float=function(t){return this._push(_.float.writeFloatLE,4,t)};a.prototype.double=function(t){return this._push(_.float.writeDoubleLE,8,t)};var he=_.Array.prototype.set?function(t,e,n){e.set(t,n);}:function(t,e,n){for(var i=0;i<t.length;++i)e[n+i]=t[i];};a.prototype.bytes=function(t){var e=t.length>>>0;if(!e)return this._push(G,1,0);if(_.isString(t)){var n=a.alloc(e=St.length(t));St.decode(t,n,0),t=n;}return this.uint32(e)._push(he,e,t)};a.prototype.string=function(t){var e=xt.length(t);return e?this.uint32(e)._push(xt.write,e,t):this._push(G,1,0)};a.prototype.fork=function(){return this.states=new ce(this),this.head=this.tail=new N($,0,0),this.len=0,this};a.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new N($,0,0),this.len=0),this};a.prototype.ldelim=function(){var t=this.head,e=this.tail,n=this.len;return this.reset().uint32(n),n&&(this.tail.next=t.next,this.tail=e,this.len+=n),this};a.prototype.finish=function(){for(var t=this.head.next,e=this.constructor.alloc(this.len),n=0;t;)t.fn(t.val,e,n),n+=t.len,t=t.next;return e};a._configure=function(r){W=r,a.create=Dt(),W._configure();};});var Ft=p((xe,jt)=>{jt.exports=v;var Lt=Z();(v.prototype=Object.create(Lt.prototype)).constructor=v;var D=x();function v(){Lt.call(this);}v._configure=function(){v.alloc=D._Buffer_allocUnsafe,v.writeBytesBuffer=D.Buffer&&D.Buffer.prototype instanceof Uint8Array&&D.Buffer.prototype.set.name==="set"?function(t,e,n){e.set(t,n);}:function(t,e,n){if(t.copy)t.copy(e,n,0,t.length);else for(var i=0;i<t.length;)e[n++]=t[i++];};};v.prototype.bytes=function(t){D.isString(t)&&(t=D._Buffer_from(t,"base64"));var e=t.length>>>0;return this.uint32(e),e&&this._push(v.writeBytesBuffer,e,t),this};function ae(r,t,e){r.length<40?D.utf8.write(r,t,e):t.utf8Write?t.utf8Write(r,e):t.write(r,e);}v.prototype.string=function(t){var e=D.Buffer.byteLength(t);return this.uint32(e),e&&this._push(ae,e,t),this};v._configure();});var Q=p((De,Rt)=>{Rt.exports=d;var E=x(),K,Nt=E.LongBits,de=E.utf8;function O(r,t){return RangeError("index out of range: "+r.pos+" + "+(t||1)+" > "+r.len)}function d(r){this.buf=r,this.pos=0,this.len=r.length;}var kt=typeof Uint8Array!="undefined"?function(t){if(t instanceof Uint8Array||Array.isArray(t))return new d(t);throw Error("illegal buffer")}:function(t){if(Array.isArray(t))return new d(t);throw Error("illegal buffer")},Ct=function(){return E.Buffer?function(e){return (d.create=function(i){return E.Buffer.isBuffer(i)?new K(i):kt(i)})(e)}:kt};d.create=Ct();d.prototype._slice=E.Array.prototype.subarray||E.Array.prototype.slice;d.prototype.uint32=function(){var t=4294967295;return function(){if(t=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(t=(t|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(t=(t|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(t=(t|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(t=(t|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return t;if((this.pos+=5)>this.len)throw this.pos=this.len,O(this,10);return t}}();d.prototype.int32=function(){return this.uint32()|0};d.prototype.sint32=function(){var t=this.uint32();return t>>>1^-(t&1)|0};function X(){var r=new Nt(0,0),t=0;if(this.len-this.pos>4){for(;t<4;++t)if(r.lo=(r.lo|(this.buf[this.pos]&127)<<t*7)>>>0,this.buf[this.pos++]<128)return r;if(r.lo=(r.lo|(this.buf[this.pos]&127)<<28)>>>0,r.hi=(r.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return r;t=0;}else {for(;t<3;++t){if(this.pos>=this.len)throw O(this);if(r.lo=(r.lo|(this.buf[this.pos]&127)<<t*7)>>>0,this.buf[this.pos++]<128)return r}return r.lo=(r.lo|(this.buf[this.pos++]&127)<<t*7)>>>0,r}if(this.len-this.pos>4){for(;t<5;++t)if(r.hi=(r.hi|(this.buf[this.pos]&127)<<t*7+3)>>>0,this.buf[this.pos++]<128)return r}else for(;t<5;++t){if(this.pos>=this.len)throw O(this);if(r.hi=(r.hi|(this.buf[this.pos]&127)<<t*7+3)>>>0,this.buf[this.pos++]<128)return r}throw Error("invalid varint encoding")}d.prototype.bool=function(){return this.uint32()!==0};function P(r,t){return (r[t-4]|r[t-3]<<8|r[t-2]<<16|r[t-1]<<24)>>>0}d.prototype.fixed32=function(){if(this.pos+4>this.len)throw O(this,4);return P(this.buf,this.pos+=4)};d.prototype.sfixed32=function(){if(this.pos+4>this.len)throw O(this,4);return P(this.buf,this.pos+=4)|0};function It(){if(this.pos+8>this.len)throw O(this,8);return new Nt(P(this.buf,this.pos+=4),P(this.buf,this.pos+=4))}d.prototype.float=function(){if(this.pos+4>this.len)throw O(this,4);var t=E.float.readFloatLE(this.buf,this.pos);return this.pos+=4,t};d.prototype.double=function(){if(this.pos+8>this.len)throw O(this,4);var t=E.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,t};d.prototype.bytes=function(){var t=this.uint32(),e=this.pos,n=this.pos+t;if(n>this.len)throw O(this,t);if(this.pos+=t,Array.isArray(this.buf))return this.buf.slice(e,n);if(e===n){var i=E.Buffer;return i?i.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,e,n)};d.prototype.string=function(){var t=this.bytes();return de.read(t,0,t.length)};d.prototype.skip=function(t){if(typeof t=="number"){if(this.pos+t>this.len)throw O(this,t);this.pos+=t;}else do if(this.pos>=this.len)throw O(this);while(this.buf[this.pos++]&128);return this};d.prototype.skipType=function(r){switch(r){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(r=this.uint32()&7)!==4;)this.skipType(r);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+r+" at offset "+this.pos)}return this};d._configure=function(r){K=r,d.create=Ct(),K._configure();var t=E.Long?"toLong":"toNumber";E.merge(d.prototype,{int64:function(){return X.call(this)[t](!1)},uint64:function(){return X.call(this)[t](!0)},sint64:function(){return X.call(this).zzDecode()[t](!1)},fixed64:function(){return It.call(this)[t](!0)},sfixed64:function(){return It.call(this)[t](!1)}});};});var Tt=p((qe,Pt)=>{Pt.exports=F;var zt=Q();(F.prototype=Object.create(zt.prototype)).constructor=F;var Mt=x();function F(r){zt.call(this,r);}F._configure=function(){Mt.Buffer&&(F.prototype._slice=Mt.Buffer.prototype.slice);};F.prototype.string=function(){var t=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+t,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+t,this.len))};F._configure();});var Wt=p((Le,Ht)=>{Ht.exports=C;var Y=x();(C.prototype=Object.create(Y.EventEmitter.prototype)).constructor=C;function C(r,t,e){if(typeof r!="function")throw TypeError("rpcImpl must be a function");Y.EventEmitter.call(this),this.rpcImpl=r,this.requestDelimited=!!t,this.responseDelimited=!!e;}C.prototype.rpcCall=function r(t,e,n,i,o){if(!i)throw TypeError("request must be specified");var s=this;if(!o)return Y.asPromise(r,s,t,e,n,i);if(!s.rpcImpl){setTimeout(function(){o(Error("already ended"));},0);return}try{return s.rpcImpl(t,e[s.requestDelimited?"encodeDelimited":"encode"](i).finish(),function(u,f){if(u)return s.emit("error",u,t),o(u);if(f===null){s.end(!0);return}if(!(f instanceof n))try{f=n[s.responseDelimited?"decodeDelimited":"decode"](f);}catch(h){return s.emit("error",h,t),o(h)}return s.emit("data",f,t),o(null,f)})}catch(c){s.emit("error",c,t),setTimeout(function(){o(c);},0);return}};C.prototype.end=function(t){return this.rpcImpl&&(t||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this};});var $t=p(Jt=>{var pe=Jt;pe.Service=Wt();});var Ut=p((Fe,Gt)=>{Gt.exports={};});var Xt=p(Zt=>{var g=Zt;g.build="minimal";g.Writer=Z();g.BufferWriter=Ft();g.Reader=Q();g.BufferReader=Tt();g.util=x();g.rpc=$t();g.roots=Ut();g.configure=Vt;function Vt(){g.util._configure(),g.Writer._configure(g.BufferWriter),g.Reader._configure(g.BufferReader);}Vt();});var Qt=p((Ie,Kt)=>{Kt.exports=Xt();});var ye=p((Ne,Yt)=>{var q=Qt(),b=q.Reader,tt=q.Writer,A=q.util,m=q.roots.default||(q.roots.default={});m.EddsaAddRequest=function(){function r(t){if(t)for(var e=Object.keys(t),n=0;n<e.length;++n)t[e[n]]!=null&&(this[e[n]]=t[e[n]]);}return r.prototype.num1=0,r.prototype.num2=0,r.create=function(e){return new r(e)},r.encode=function(e,n){return n||(n=tt.create()),n.uint32(16).uint32(e.num1),n.uint32(24).uint32(e.num2),n},r.encodeDelimited=function(e,n){return this.encode(e,n).ldelim()},r.decode=function(e,n){e instanceof b||(e=b.create(e));for(var i=n===void 0?e.len:e.pos+n,o=new m.EddsaAddRequest;e.pos<i;){var s=e.uint32();switch(s>>>3){case 2:{o.num1=e.uint32();break}case 3:{o.num2=e.uint32();break}default:e.skipType(s&7);break}}if(!o.hasOwnProperty("num1"))throw A.ProtocolError("missing required 'num1'",{instance:o});if(!o.hasOwnProperty("num2"))throw A.ProtocolError("missing required 'num2'",{instance:o});return o},r.decodeDelimited=function(e){return e instanceof b||(e=new b(e)),this.decode(e,e.uint32())},r.verify=function(e){return typeof e!="object"||e===null?"object expected":A.isInteger(e.num1)?A.isInteger(e.num2)?null:"num2: integer expected":"num1: integer expected"},r.fromObject=function(e){if(e instanceof m.EddsaAddRequest)return e;var n=new m.EddsaAddRequest;return e.num1!=null&&(n.num1=e.num1>>>0),e.num2!=null&&(n.num2=e.num2>>>0),n},r.toObject=function(e,n){n||(n={});var i={};return n.defaults&&(i.num1=0,i.num2=0),e.num1!=null&&e.hasOwnProperty("num1")&&(i.num1=e.num1),e.num2!=null&&e.hasOwnProperty("num2")&&(i.num2=e.num2),i},r.prototype.toJSON=function(){return this.constructor.toObject(this,q.util.toJSONOptions)},r.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/EddsaAddRequest"},r}();m.EddsaAddResponse=function(){function r(t){if(t)for(var e=Object.keys(t),n=0;n<e.length;++n)t[e[n]]!=null&&(this[e[n]]=t[e[n]]);}return r.prototype.sum=0,r.create=function(e){return new r(e)},r.encode=function(e,n){return n||(n=tt.create()),n.uint32(16).uint32(e.sum),n},r.encodeDelimited=function(e,n){return this.encode(e,n).ldelim()},r.decode=function(e,n){e instanceof b||(e=b.create(e));for(var i=n===void 0?e.len:e.pos+n,o=new m.EddsaAddResponse;e.pos<i;){var s=e.uint32();switch(s>>>3){case 2:{o.sum=e.uint32();break}default:e.skipType(s&7);break}}if(!o.hasOwnProperty("sum"))throw A.ProtocolError("missing required 'sum'",{instance:o});return o},r.decodeDelimited=function(e){return e instanceof b||(e=new b(e)),this.decode(e,e.uint32())},r.verify=function(e){return typeof e!="object"||e===null?"object expected":A.isInteger(e.sum)?null:"sum: integer expected"},r.fromObject=function(e){if(e instanceof m.EddsaAddResponse)return e;var n=new m.EddsaAddResponse;return e.sum!=null&&(n.sum=e.sum>>>0),n},r.toObject=function(e,n){n||(n={});var i={};return n.defaults&&(i.sum=0),e.sum!=null&&e.hasOwnProperty("sum")&&(i.sum=e.sum),i},r.prototype.toJSON=function(){return this.constructor.toObject(this,q.util.toJSONOptions)},r.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/EddsaAddResponse"},r}();m.GenericMessage=function(){function r(t){if(t)for(var e=Object.keys(t),n=0;n<e.length;++n)t[e[n]]!=null&&(this[e[n]]=t[e[n]]);}return r.prototype.callId="",r.prototype.payload="",r.create=function(e){return new r(e)},r.encode=function(e,n){return n||(n=tt.create()),n.uint32(10).string(e.callId),n.uint32(18).string(e.payload),n},r.encodeDelimited=function(e,n){return this.encode(e,n).ldelim()},r.decode=function(e,n){e instanceof b||(e=b.create(e));for(var i=n===void 0?e.len:e.pos+n,o=new m.GenericMessage;e.pos<i;){var s=e.uint32();switch(s>>>3){case 1:{o.callId=e.string();break}case 2:{o.payload=e.string();break}default:e.skipType(s&7);break}}if(!o.hasOwnProperty("callId"))throw A.ProtocolError("missing required 'callId'",{instance:o});if(!o.hasOwnProperty("payload"))throw A.ProtocolError("missing required 'payload'",{instance:o});return o},r.decodeDelimited=function(e){return e instanceof b||(e=new b(e)),this.decode(e,e.uint32())},r.verify=function(e){return typeof e!="object"||e===null?"object expected":A.isString(e.callId)?A.isString(e.payload)?null:"payload: string expected":"callId: string expected"},r.fromObject=function(e){if(e instanceof m.GenericMessage)return e;var n=new m.GenericMessage;return e.callId!=null&&(n.callId=String(e.callId)),e.payload!=null&&(n.payload=String(e.payload)),n},r.toObject=function(e,n){n||(n={});var i={};return n.defaults&&(i.callId="",i.payload=""),e.callId!=null&&e.hasOwnProperty("callId")&&(i.callId=e.callId),e.payload!=null&&e.hasOwnProperty("payload")&&(i.payload=e.payload),i},r.prototype.toJSON=function(){return this.constructor.toObject(this,q.util.toJSONOptions)},r.getTypeUrl=function(e){return e===void 0&&(e="type.googleapis.com"),e+"/GenericMessage"},r}();Yt.exports=m;});

export { p as a, ge as b, ye as c };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-ZTDFCM3P.mjs.map