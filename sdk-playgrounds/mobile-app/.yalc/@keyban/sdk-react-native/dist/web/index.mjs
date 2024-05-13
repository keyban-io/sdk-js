import { a, b, c } from '../chunk-ZTDFCM3P.mjs';
import { useNativeMessage, emit } from 'react-native-react-bridge/lib/web';
import { useState, useCallback, useEffect } from 'react';
import { getWasmBuffer, hexToU8a, u8aToHex } from '@keyban/sdk-base';
import { jsxs, jsx } from 'react/jsx-runtime';

var z=a(T=>{T.byteLength=yr;T.toByteArray=Er;T.fromByteArray=Br;var m=[],x=[],wr=typeof Uint8Array!="undefined"?Uint8Array:Array,L="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(A=0,q=L.length;A<q;++A)m[A]=L[A],x[L.charCodeAt(A)]=A;var A,q;x[45]=62;x[95]=63;function X(i){var r=i.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var t=i.indexOf("=");t===-1&&(t=r);var e=t===r?0:4-t%4;return [t,e]}function yr(i){var r=X(i),t=r[0],e=r[1];return (t+e)*3/4-e}function xr(i,r,t){return (r+t)*3/4-t}function Er(i){var r,t=X(i),e=t[0],n=t[1],o=new wr(xr(i,e,n)),u=0,h=n>0?e-4:e,f;for(f=0;f<h;f+=4)r=x[i.charCodeAt(f)]<<18|x[i.charCodeAt(f+1)]<<12|x[i.charCodeAt(f+2)]<<6|x[i.charCodeAt(f+3)],o[u++]=r>>16&255,o[u++]=r>>8&255,o[u++]=r&255;return n===2&&(r=x[i.charCodeAt(f)]<<2|x[i.charCodeAt(f+1)]>>4,o[u++]=r&255),n===1&&(r=x[i.charCodeAt(f)]<<10|x[i.charCodeAt(f+1)]<<4|x[i.charCodeAt(f+2)]>>2,o[u++]=r>>8&255,o[u++]=r&255),o}function mr(i){return m[i>>18&63]+m[i>>12&63]+m[i>>6&63]+m[i&63]}function Fr(i,r,t){for(var e,n=[],o=r;o<t;o+=3)e=(i[o]<<16&16711680)+(i[o+1]<<8&65280)+(i[o+2]&255),n.push(mr(e));return n.join("")}function Br(i){for(var r,t=i.length,e=t%3,n=[],o=16383,u=0,h=t-e;u<h;u+=o)n.push(Fr(i,u,u+o>h?h:u+o));return e===1?(r=i[t-1],n.push(m[r>>2]+m[r<<4&63]+"==")):e===2&&(r=(i[t-2]<<8)+i[t-1],n.push(m[r>>10]+m[r>>4&63]+m[r<<2&63]+"=")),n.join("")}});var V=a(k=>{k.read=function(i,r,t,e,n){var o,u,h=n*8-e-1,f=(1<<h)-1,c=f>>1,s=-7,p=t?n-1:0,E=t?-1:1,y=i[r+p];for(p+=E,o=y&(1<<-s)-1,y>>=-s,s+=h;s>0;o=o*256+i[r+p],p+=E,s-=8);for(u=o&(1<<-s)-1,o>>=-s,s+=e;s>0;u=u*256+i[r+p],p+=E,s-=8);if(o===0)o=1-c;else {if(o===f)return u?NaN:(y?-1:1)*(1/0);u=u+Math.pow(2,e),o=o-c;}return (y?-1:1)*u*Math.pow(2,o-e)};k.write=function(i,r,t,e,n,o){var u,h,f,c=o*8-n-1,s=(1<<c)-1,p=s>>1,E=n===23?Math.pow(2,-24)-Math.pow(2,-77):0,y=e?0:o-1,d=e?1:-1,sr=r<0||r===0&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(h=isNaN(r)?1:0,u=s):(u=Math.floor(Math.log(r)/Math.LN2),r*(f=Math.pow(2,-u))<1&&(u--,f*=2),u+p>=1?r+=E/f:r+=E*Math.pow(2,1-p),r*f>=2&&(u++,f/=2),u+p>=s?(h=0,u=s):u+p>=1?(h=(r*f-1)*Math.pow(2,n),u=u+p):(h=r*Math.pow(2,p-1)*Math.pow(2,n),u=0));n>=8;i[t+y]=h&255,y+=d,h/=256,n-=8);for(u=u<<n|h,c+=n;c>0;i[t+y]=u&255,y+=d,u/=256,c-=8);i[t+y-d]|=sr*128;};});var nr=a(I=>{var D=z(),v=V(),J=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;I.Buffer=a;I.SlowBuffer=Ir;I.INSPECT_MAX_BYTES=50;var C=2147483647;I.kMaxLength=C;a.TYPED_ARRAY_SUPPORT=Ar();!a.TYPED_ARRAY_SUPPORT&&typeof console!="undefined"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function Ar(){try{var i=new Uint8Array(1),r={foo:function(){return 42}};return Object.setPrototypeOf(r,Uint8Array.prototype),Object.setPrototypeOf(i,r),i.foo()===42}catch(t){return !1}}Object.defineProperty(a.prototype,"parent",{enumerable:!0,get:function(){if(a.isBuffer(this))return this.buffer}});Object.defineProperty(a.prototype,"offset",{enumerable:!0,get:function(){if(a.isBuffer(this))return this.byteOffset}});function B(i){if(i>C)throw new RangeError('The value "'+i+'" is invalid for option "size"');var r=new Uint8Array(i);return Object.setPrototypeOf(r,a.prototype),r}function a(i,r,t){if(typeof i=="number"){if(typeof r=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return W(i)}return Z(i,r,t)}a.poolSize=8192;function Z(i,r,t){if(typeof i=="string")return Ur(i,r);if(ArrayBuffer.isView(i))return dr(i);if(i==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof i);if(F(i,ArrayBuffer)||i&&F(i.buffer,ArrayBuffer)||typeof SharedArrayBuffer!="undefined"&&(F(i,SharedArrayBuffer)||i&&F(i.buffer,SharedArrayBuffer)))return b(i,r,t);if(typeof i=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');var e=i.valueOf&&i.valueOf();if(e!=null&&e!==i)return a.from(e,r,t);var n=vr(i);if(n)return n;if(typeof Symbol!="undefined"&&Symbol.toPrimitive!=null&&typeof i[Symbol.toPrimitive]=="function")return a.from(i[Symbol.toPrimitive]("string"),r,t);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof i)}a.from=function(i,r,t){return Z(i,r,t)};Object.setPrototypeOf(a.prototype,Uint8Array.prototype);Object.setPrototypeOf(a,Uint8Array);function Q(i){if(typeof i!="number")throw new TypeError('"size" argument must be of type number');if(i<0)throw new RangeError('The value "'+i+'" is invalid for option "size"')}function gr(i,r,t){return Q(i),i<=0?B(i):r!==void 0?typeof t=="string"?B(i).fill(r,t):B(i).fill(r):B(i)}a.alloc=function(i,r,t){return gr(i,r,t)};function W(i){return Q(i),B(i<0?0:G(i)|0)}a.allocUnsafe=function(i){return W(i)};a.allocUnsafeSlow=function(i){return W(i)};function Ur(i,r){if((typeof r!="string"||r==="")&&(r="utf8"),!a.isEncoding(r))throw new TypeError("Unknown encoding: "+r);var t=$(i,r)|0,e=B(t),n=e.write(i,r);return n!==t&&(e=e.slice(0,n)),e}function N(i){for(var r=i.length<0?0:G(i.length)|0,t=B(r),e=0;e<r;e+=1)t[e]=i[e]&255;return t}function dr(i){if(F(i,Uint8Array)){var r=new Uint8Array(i);return b(r.buffer,r.byteOffset,r.byteLength)}return N(i)}function b(i,r,t){if(r<0||i.byteLength<r)throw new RangeError('"offset" is outside of buffer bounds');if(i.byteLength<r+(t||0))throw new RangeError('"length" is outside of buffer bounds');var e;return r===void 0&&t===void 0?e=new Uint8Array(i):t===void 0?e=new Uint8Array(i,r):e=new Uint8Array(i,r,t),Object.setPrototypeOf(e,a.prototype),e}function vr(i){if(a.isBuffer(i)){var r=G(i.length)|0,t=B(r);return t.length===0||i.copy(t,0,0,r),t}if(i.length!==void 0)return typeof i.length!="number"||Y(i.length)?B(0):N(i);if(i.type==="Buffer"&&Array.isArray(i.data))return N(i.data)}function G(i){if(i>=C)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+C.toString(16)+" bytes");return i|0}function Ir(i){return +i!=i&&(i=0),a.alloc(+i)}a.isBuffer=function(r){return r!=null&&r._isBuffer===!0&&r!==a.prototype};a.compare=function(r,t){if(F(r,Uint8Array)&&(r=a.from(r,r.offset,r.byteLength)),F(t,Uint8Array)&&(t=a.from(t,t.offset,t.byteLength)),!a.isBuffer(r)||!a.isBuffer(t))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(r===t)return 0;for(var e=r.length,n=t.length,o=0,u=Math.min(e,n);o<u;++o)if(r[o]!==t[o]){e=r[o],n=t[o];break}return e<n?-1:n<e?1:0};a.isEncoding=function(r){switch(String(r).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return !0;default:return !1}};a.concat=function(r,t){if(!Array.isArray(r))throw new TypeError('"list" argument must be an Array of Buffers');if(r.length===0)return a.alloc(0);var e;if(t===void 0)for(t=0,e=0;e<r.length;++e)t+=r[e].length;var n=a.allocUnsafe(t),o=0;for(e=0;e<r.length;++e){var u=r[e];if(F(u,Uint8Array))o+u.length>n.length?a.from(u).copy(n,o):Uint8Array.prototype.set.call(n,u,o);else if(a.isBuffer(u))u.copy(n,o);else throw new TypeError('"list" argument must be an Array of Buffers');o+=u.length;}return n};function $(i,r){if(a.isBuffer(i))return i.length;if(ArrayBuffer.isView(i)||F(i,ArrayBuffer))return i.byteLength;if(typeof i!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof i);var t=i.length,e=arguments.length>2&&arguments[2]===!0;if(!e&&t===0)return 0;for(var n=!1;;)switch(r){case"ascii":case"latin1":case"binary":return t;case"utf8":case"utf-8":return _(i).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return t*2;case"hex":return t>>>1;case"base64":return er(i).length;default:if(n)return e?-1:_(i).length;r=(""+r).toLowerCase(),n=!0;}}a.byteLength=$;function Tr(i,r,t){var e=!1;if((r===void 0||r<0)&&(r=0),r>this.length||((t===void 0||t>this.length)&&(t=this.length),t<=0)||(t>>>=0,r>>>=0,t<=r))return "";for(i||(i="utf8");;)switch(i){case"hex":return _r(this,r,t);case"utf8":case"utf-8":return j(this,r,t);case"ascii":return Nr(this,r,t);case"latin1":case"binary":return br(this,r,t);case"base64":return kr(this,r,t);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Wr(this,r,t);default:if(e)throw new TypeError("Unknown encoding: "+i);i=(i+"").toLowerCase(),e=!0;}}a.prototype._isBuffer=!0;function g(i,r,t){var e=i[r];i[r]=i[t],i[t]=e;}a.prototype.swap16=function(){var r=this.length;if(r%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<r;t+=2)g(this,t,t+1);return this};a.prototype.swap32=function(){var r=this.length;if(r%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<r;t+=4)g(this,t,t+3),g(this,t+1,t+2);return this};a.prototype.swap64=function(){var r=this.length;if(r%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<r;t+=8)g(this,t,t+7),g(this,t+1,t+6),g(this,t+2,t+5),g(this,t+3,t+4);return this};a.prototype.toString=function(){var r=this.length;return r===0?"":arguments.length===0?j(this,0,r):Tr.apply(this,arguments)};a.prototype.toLocaleString=a.prototype.toString;a.prototype.equals=function(r){if(!a.isBuffer(r))throw new TypeError("Argument must be a Buffer");return this===r?!0:a.compare(this,r)===0};a.prototype.inspect=function(){var r="",t=I.INSPECT_MAX_BYTES;return r=this.toString("hex",0,t).replace(/(.{2})/g,"$1 ").trim(),this.length>t&&(r+=" ... "),"<Buffer "+r+">"};J&&(a.prototype[J]=a.prototype.inspect);a.prototype.compare=function(r,t,e,n,o){if(F(r,Uint8Array)&&(r=a.from(r,r.offset,r.byteLength)),!a.isBuffer(r))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof r);if(t===void 0&&(t=0),e===void 0&&(e=r?r.length:0),n===void 0&&(n=0),o===void 0&&(o=this.length),t<0||e>r.length||n<0||o>this.length)throw new RangeError("out of range index");if(n>=o&&t>=e)return 0;if(n>=o)return -1;if(t>=e)return 1;if(t>>>=0,e>>>=0,n>>>=0,o>>>=0,this===r)return 0;for(var u=o-n,h=e-t,f=Math.min(u,h),c=this.slice(n,o),s=r.slice(t,e),p=0;p<f;++p)if(c[p]!==s[p]){u=c[p],h=s[p];break}return u<h?-1:h<u?1:0};function P(i,r,t,e,n){if(i.length===0)return -1;if(typeof t=="string"?(e=t,t=0):t>2147483647?t=2147483647:t<-2147483648&&(t=-2147483648),t=+t,Y(t)&&(t=n?0:i.length-1),t<0&&(t=i.length+t),t>=i.length){if(n)return -1;t=i.length-1;}else if(t<0)if(n)t=0;else return -1;if(typeof r=="string"&&(r=a.from(r,e)),a.isBuffer(r))return r.length===0?-1:K(i,r,t,e,n);if(typeof r=="number")return r=r&255,typeof Uint8Array.prototype.indexOf=="function"?n?Uint8Array.prototype.indexOf.call(i,r,t):Uint8Array.prototype.lastIndexOf.call(i,r,t):K(i,[r],t,e,n);throw new TypeError("val must be string, number or Buffer")}function K(i,r,t,e,n){var o=1,u=i.length,h=r.length;if(e!==void 0&&(e=String(e).toLowerCase(),e==="ucs2"||e==="ucs-2"||e==="utf16le"||e==="utf-16le")){if(i.length<2||r.length<2)return -1;o=2,u/=2,h/=2,t/=2;}function f(y,d){return o===1?y[d]:y.readUInt16BE(d*o)}var c;if(n){var s=-1;for(c=t;c<u;c++)if(f(i,c)===f(r,s===-1?0:c-s)){if(s===-1&&(s=c),c-s+1===h)return s*o}else s!==-1&&(c-=c-s),s=-1;}else for(t+h>u&&(t=u-h),c=t;c>=0;c--){for(var p=!0,E=0;E<h;E++)if(f(i,c+E)!==f(r,E)){p=!1;break}if(p)return c}return -1}a.prototype.includes=function(r,t,e){return this.indexOf(r,t,e)!==-1};a.prototype.indexOf=function(r,t,e){return P(this,r,t,e,!0)};a.prototype.lastIndexOf=function(r,t,e){return P(this,r,t,e,!1)};function Cr(i,r,t,e){t=Number(t)||0;var n=i.length-t;e?(e=Number(e),e>n&&(e=n)):e=n;var o=r.length;e>o/2&&(e=o/2);for(var u=0;u<e;++u){var h=parseInt(r.substr(u*2,2),16);if(Y(h))return u;i[t+u]=h;}return u}function Sr(i,r,t,e){return S(_(r,i.length-t),i,t,e)}function Mr(i,r,t,e){return S(Hr(r),i,t,e)}function Rr(i,r,t,e){return S(er(r),i,t,e)}function Lr(i,r,t,e){return S(qr(r,i.length-t),i,t,e)}a.prototype.write=function(r,t,e,n){if(t===void 0)n="utf8",e=this.length,t=0;else if(e===void 0&&typeof t=="string")n=t,e=this.length,t=0;else if(isFinite(t))t=t>>>0,isFinite(e)?(e=e>>>0,n===void 0&&(n="utf8")):(n=e,e=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");var o=this.length-t;if((e===void 0||e>o)&&(e=o),r.length>0&&(e<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var u=!1;;)switch(n){case"hex":return Cr(this,r,t,e);case"utf8":case"utf-8":return Sr(this,r,t,e);case"ascii":case"latin1":case"binary":return Mr(this,r,t,e);case"base64":return Rr(this,r,t,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Lr(this,r,t,e);default:if(u)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),u=!0;}};a.prototype.toJSON=function(){return {type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function kr(i,r,t){return r===0&&t===i.length?D.fromByteArray(i):D.fromByteArray(i.slice(r,t))}function j(i,r,t){t=Math.min(i.length,t);for(var e=[],n=r;n<t;){var o=i[n],u=null,h=o>239?4:o>223?3:o>191?2:1;if(n+h<=t){var f,c,s,p;switch(h){case 1:o<128&&(u=o);break;case 2:f=i[n+1],(f&192)===128&&(p=(o&31)<<6|f&63,p>127&&(u=p));break;case 3:f=i[n+1],c=i[n+2],(f&192)===128&&(c&192)===128&&(p=(o&15)<<12|(f&63)<<6|c&63,p>2047&&(p<55296||p>57343)&&(u=p));break;case 4:f=i[n+1],c=i[n+2],s=i[n+3],(f&192)===128&&(c&192)===128&&(s&192)===128&&(p=(o&15)<<18|(f&63)<<12|(c&63)<<6|s&63,p>65535&&p<1114112&&(u=p));}}u===null?(u=65533,h=1):u>65535&&(u-=65536,e.push(u>>>10&1023|55296),u=56320|u&1023),e.push(u),n+=h;}return Dr(e)}var O=4096;function Dr(i){var r=i.length;if(r<=O)return String.fromCharCode.apply(String,i);for(var t="",e=0;e<r;)t+=String.fromCharCode.apply(String,i.slice(e,e+=O));return t}function Nr(i,r,t){var e="";t=Math.min(i.length,t);for(var n=r;n<t;++n)e+=String.fromCharCode(i[n]&127);return e}function br(i,r,t){var e="";t=Math.min(i.length,t);for(var n=r;n<t;++n)e+=String.fromCharCode(i[n]);return e}function _r(i,r,t){var e=i.length;(!r||r<0)&&(r=0),(!t||t<0||t>e)&&(t=e);for(var n="",o=r;o<t;++o)n+=Xr[i[o]];return n}function Wr(i,r,t){for(var e=i.slice(r,t),n="",o=0;o<e.length-1;o+=2)n+=String.fromCharCode(e[o]+e[o+1]*256);return n}a.prototype.slice=function(r,t){var e=this.length;r=~~r,t=t===void 0?e:~~t,r<0?(r+=e,r<0&&(r=0)):r>e&&(r=e),t<0?(t+=e,t<0&&(t=0)):t>e&&(t=e),t<r&&(t=r);var n=this.subarray(r,t);return Object.setPrototypeOf(n,a.prototype),n};function l(i,r,t){if(i%1!==0||i<0)throw new RangeError("offset is not uint");if(i+r>t)throw new RangeError("Trying to access beyond buffer length")}a.prototype.readUintLE=a.prototype.readUIntLE=function(r,t,e){r=r>>>0,t=t>>>0,e||l(r,t,this.length);for(var n=this[r],o=1,u=0;++u<t&&(o*=256);)n+=this[r+u]*o;return n};a.prototype.readUintBE=a.prototype.readUIntBE=function(r,t,e){r=r>>>0,t=t>>>0,e||l(r,t,this.length);for(var n=this[r+--t],o=1;t>0&&(o*=256);)n+=this[r+--t]*o;return n};a.prototype.readUint8=a.prototype.readUInt8=function(r,t){return r=r>>>0,t||l(r,1,this.length),this[r]};a.prototype.readUint16LE=a.prototype.readUInt16LE=function(r,t){return r=r>>>0,t||l(r,2,this.length),this[r]|this[r+1]<<8};a.prototype.readUint16BE=a.prototype.readUInt16BE=function(r,t){return r=r>>>0,t||l(r,2,this.length),this[r]<<8|this[r+1]};a.prototype.readUint32LE=a.prototype.readUInt32LE=function(r,t){return r=r>>>0,t||l(r,4,this.length),(this[r]|this[r+1]<<8|this[r+2]<<16)+this[r+3]*16777216};a.prototype.readUint32BE=a.prototype.readUInt32BE=function(r,t){return r=r>>>0,t||l(r,4,this.length),this[r]*16777216+(this[r+1]<<16|this[r+2]<<8|this[r+3])};a.prototype.readIntLE=function(r,t,e){r=r>>>0,t=t>>>0,e||l(r,t,this.length);for(var n=this[r],o=1,u=0;++u<t&&(o*=256);)n+=this[r+u]*o;return o*=128,n>=o&&(n-=Math.pow(2,8*t)),n};a.prototype.readIntBE=function(r,t,e){r=r>>>0,t=t>>>0,e||l(r,t,this.length);for(var n=t,o=1,u=this[r+--n];n>0&&(o*=256);)u+=this[r+--n]*o;return o*=128,u>=o&&(u-=Math.pow(2,8*t)),u};a.prototype.readInt8=function(r,t){return r=r>>>0,t||l(r,1,this.length),this[r]&128?(255-this[r]+1)*-1:this[r]};a.prototype.readInt16LE=function(r,t){r=r>>>0,t||l(r,2,this.length);var e=this[r]|this[r+1]<<8;return e&32768?e|4294901760:e};a.prototype.readInt16BE=function(r,t){r=r>>>0,t||l(r,2,this.length);var e=this[r+1]|this[r]<<8;return e&32768?e|4294901760:e};a.prototype.readInt32LE=function(r,t){return r=r>>>0,t||l(r,4,this.length),this[r]|this[r+1]<<8|this[r+2]<<16|this[r+3]<<24};a.prototype.readInt32BE=function(r,t){return r=r>>>0,t||l(r,4,this.length),this[r]<<24|this[r+1]<<16|this[r+2]<<8|this[r+3]};a.prototype.readFloatLE=function(r,t){return r=r>>>0,t||l(r,4,this.length),v.read(this,r,!0,23,4)};a.prototype.readFloatBE=function(r,t){return r=r>>>0,t||l(r,4,this.length),v.read(this,r,!1,23,4)};a.prototype.readDoubleLE=function(r,t){return r=r>>>0,t||l(r,8,this.length),v.read(this,r,!0,52,8)};a.prototype.readDoubleBE=function(r,t){return r=r>>>0,t||l(r,8,this.length),v.read(this,r,!1,52,8)};function w(i,r,t,e,n,o){if(!a.isBuffer(i))throw new TypeError('"buffer" argument must be a Buffer instance');if(r>n||r<o)throw new RangeError('"value" argument is out of bounds');if(t+e>i.length)throw new RangeError("Index out of range")}a.prototype.writeUintLE=a.prototype.writeUIntLE=function(r,t,e,n){if(r=+r,t=t>>>0,e=e>>>0,!n){var o=Math.pow(2,8*e)-1;w(this,r,t,e,o,0);}var u=1,h=0;for(this[t]=r&255;++h<e&&(u*=256);)this[t+h]=r/u&255;return t+e};a.prototype.writeUintBE=a.prototype.writeUIntBE=function(r,t,e,n){if(r=+r,t=t>>>0,e=e>>>0,!n){var o=Math.pow(2,8*e)-1;w(this,r,t,e,o,0);}var u=e-1,h=1;for(this[t+u]=r&255;--u>=0&&(h*=256);)this[t+u]=r/h&255;return t+e};a.prototype.writeUint8=a.prototype.writeUInt8=function(r,t,e){return r=+r,t=t>>>0,e||w(this,r,t,1,255,0),this[t]=r&255,t+1};a.prototype.writeUint16LE=a.prototype.writeUInt16LE=function(r,t,e){return r=+r,t=t>>>0,e||w(this,r,t,2,65535,0),this[t]=r&255,this[t+1]=r>>>8,t+2};a.prototype.writeUint16BE=a.prototype.writeUInt16BE=function(r,t,e){return r=+r,t=t>>>0,e||w(this,r,t,2,65535,0),this[t]=r>>>8,this[t+1]=r&255,t+2};a.prototype.writeUint32LE=a.prototype.writeUInt32LE=function(r,t,e){return r=+r,t=t>>>0,e||w(this,r,t,4,4294967295,0),this[t+3]=r>>>24,this[t+2]=r>>>16,this[t+1]=r>>>8,this[t]=r&255,t+4};a.prototype.writeUint32BE=a.prototype.writeUInt32BE=function(r,t,e){return r=+r,t=t>>>0,e||w(this,r,t,4,4294967295,0),this[t]=r>>>24,this[t+1]=r>>>16,this[t+2]=r>>>8,this[t+3]=r&255,t+4};a.prototype.writeIntLE=function(r,t,e,n){if(r=+r,t=t>>>0,!n){var o=Math.pow(2,8*e-1);w(this,r,t,e,o-1,-o);}var u=0,h=1,f=0;for(this[t]=r&255;++u<e&&(h*=256);)r<0&&f===0&&this[t+u-1]!==0&&(f=1),this[t+u]=(r/h>>0)-f&255;return t+e};a.prototype.writeIntBE=function(r,t,e,n){if(r=+r,t=t>>>0,!n){var o=Math.pow(2,8*e-1);w(this,r,t,e,o-1,-o);}var u=e-1,h=1,f=0;for(this[t+u]=r&255;--u>=0&&(h*=256);)r<0&&f===0&&this[t+u+1]!==0&&(f=1),this[t+u]=(r/h>>0)-f&255;return t+e};a.prototype.writeInt8=function(r,t,e){return r=+r,t=t>>>0,e||w(this,r,t,1,127,-128),r<0&&(r=255+r+1),this[t]=r&255,t+1};a.prototype.writeInt16LE=function(r,t,e){return r=+r,t=t>>>0,e||w(this,r,t,2,32767,-32768),this[t]=r&255,this[t+1]=r>>>8,t+2};a.prototype.writeInt16BE=function(r,t,e){return r=+r,t=t>>>0,e||w(this,r,t,2,32767,-32768),this[t]=r>>>8,this[t+1]=r&255,t+2};a.prototype.writeInt32LE=function(r,t,e){return r=+r,t=t>>>0,e||w(this,r,t,4,2147483647,-2147483648),this[t]=r&255,this[t+1]=r>>>8,this[t+2]=r>>>16,this[t+3]=r>>>24,t+4};a.prototype.writeInt32BE=function(r,t,e){return r=+r,t=t>>>0,e||w(this,r,t,4,2147483647,-2147483648),r<0&&(r=4294967295+r+1),this[t]=r>>>24,this[t+1]=r>>>16,this[t+2]=r>>>8,this[t+3]=r&255,t+4};function rr(i,r,t,e,n,o){if(t+e>i.length)throw new RangeError("Index out of range");if(t<0)throw new RangeError("Index out of range")}function tr(i,r,t,e,n){return r=+r,t=t>>>0,n||rr(i,r,t,4),v.write(i,r,t,e,23,4),t+4}a.prototype.writeFloatLE=function(r,t,e){return tr(this,r,t,!0,e)};a.prototype.writeFloatBE=function(r,t,e){return tr(this,r,t,!1,e)};function ir(i,r,t,e,n){return r=+r,t=t>>>0,n||rr(i,r,t,8),v.write(i,r,t,e,52,8),t+8}a.prototype.writeDoubleLE=function(r,t,e){return ir(this,r,t,!0,e)};a.prototype.writeDoubleBE=function(r,t,e){return ir(this,r,t,!1,e)};a.prototype.copy=function(r,t,e,n){if(!a.isBuffer(r))throw new TypeError("argument should be a Buffer");if(e||(e=0),!n&&n!==0&&(n=this.length),t>=r.length&&(t=r.length),t||(t=0),n>0&&n<e&&(n=e),n===e||r.length===0||this.length===0)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),r.length-t<n-e&&(n=r.length-t+e);var o=n-e;return this===r&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(t,e,n):Uint8Array.prototype.set.call(r,this.subarray(e,n),t),o};a.prototype.fill=function(r,t,e,n){if(typeof r=="string"){if(typeof t=="string"?(n=t,t=0,e=this.length):typeof e=="string"&&(n=e,e=this.length),n!==void 0&&typeof n!="string")throw new TypeError("encoding must be a string");if(typeof n=="string"&&!a.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(r.length===1){var o=r.charCodeAt(0);(n==="utf8"&&o<128||n==="latin1")&&(r=o);}}else typeof r=="number"?r=r&255:typeof r=="boolean"&&(r=Number(r));if(t<0||this.length<t||this.length<e)throw new RangeError("Out of range index");if(e<=t)return this;t=t>>>0,e=e===void 0?this.length:e>>>0,r||(r=0);var u;if(typeof r=="number")for(u=t;u<e;++u)this[u]=r;else {var h=a.isBuffer(r)?r:a.from(r,n),f=h.length;if(f===0)throw new TypeError('The value "'+r+'" is invalid for argument "value"');for(u=0;u<e-t;++u)this[u+t]=h[u%f];}return this};var Gr=/[^+/0-9A-Za-z-_]/g;function Yr(i){if(i=i.split("=")[0],i=i.trim().replace(Gr,""),i.length<2)return "";for(;i.length%4!==0;)i=i+"=";return i}function _(i,r){r=r||1/0;for(var t,e=i.length,n=null,o=[],u=0;u<e;++u){if(t=i.charCodeAt(u),t>55295&&t<57344){if(!n){if(t>56319){(r-=3)>-1&&o.push(239,191,189);continue}else if(u+1===e){(r-=3)>-1&&o.push(239,191,189);continue}n=t;continue}if(t<56320){(r-=3)>-1&&o.push(239,191,189),n=t;continue}t=(n-55296<<10|t-56320)+65536;}else n&&(r-=3)>-1&&o.push(239,191,189);if(n=null,t<128){if((r-=1)<0)break;o.push(t);}else if(t<2048){if((r-=2)<0)break;o.push(t>>6|192,t&63|128);}else if(t<65536){if((r-=3)<0)break;o.push(t>>12|224,t>>6&63|128,t&63|128);}else if(t<1114112){if((r-=4)<0)break;o.push(t>>18|240,t>>12&63|128,t>>6&63|128,t&63|128);}else throw new Error("Invalid code point")}return o}function Hr(i){for(var r=[],t=0;t<i.length;++t)r.push(i.charCodeAt(t)&255);return r}function qr(i,r){for(var t,e,n,o=[],u=0;u<i.length&&!((r-=2)<0);++u)t=i.charCodeAt(u),e=t>>8,n=t%256,o.push(n),o.push(e);return o}function er(i){return D.toByteArray(Yr(i))}function S(i,r,t,e){for(var n=0;n<e&&!(n+t>=r.length||n>=i.length);++n)r[n+t]=i[n];return n}function F(i,r){return i instanceof r||i!=null&&i.constructor!=null&&i.constructor.name!=null&&i.constructor.name===r.name}function Y(i){return i!==i}var Xr=function(){for(var i="0123456789abcdef",r=new Array(256),t=0;t<16;++t)for(var e=t*16,n=0;n<16;++n)r[e+n]=i[t]+i[n];return r}();});var U=b(c()),ar=b(nr());global.Buffer||(global.Buffer=ar.Buffer);var M=class{constructor(r){this.wasmApi=r;}async add(r){let{callId:t,payload:e}=U.GenericMessage.decode(hexToU8a(r)),{num1:n,num2:o}=U.EddsaAddRequest.decode(hexToU8a(e)),u=await this.wasmApi.add(n,o),h=U.EddsaAddResponse.encode({sum:u}).finish();return this.prepareGenericMessage(t,u8aToHex(h))}prepareGenericMessage(r,t){let e=U.GenericMessage.encode({callId:r,payload:t}).finish();return u8aToHex(e)}};var et=()=>{let[i,r]=useState(null),[t,e]=useState([]),n=useCallback(o=>e(u=>[...u,[o,new Date]]),[]);return useNativeMessage(async o=>{if(i&&o.type==="add"){n("received add");let u=await i.add(o.data);emit({type:"add",data:u});}}),useEffect(()=>{(async()=>{let u=await getWasmBuffer(),h=await WebAssembly.instantiate(u);r(new M(h.instance.exports)),n("after buffer"),emit({type:"initialized",data:""});})();},[n]),jsxs("div",{children:["shut",t.map(([o,u])=>jsxs("div",{style:{display:"flex",gap:6},children:[jsx("p",{children:u.toLocaleDateString()}),jsx("p",{children:o})]},u.getTime()))]})};/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/

export { et as WebViewRoot };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map