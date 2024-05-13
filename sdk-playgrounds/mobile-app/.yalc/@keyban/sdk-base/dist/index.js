'use strict';

function o(x,r){return x+r}function s(x,r){return x-r}var n=class{wasmApi;storageProvider;clientKeyShare=null;constructor(r,t){this.wasmApi=r,this.storageProvider=t;}async initialize(){let r=await this.storageProvider.get("keyban-key");return r?(this.clientKeyShare=r,"initialized-with-key"):"initialized-empty"}async sign(r){if(!this.clientKeyShare)throw new Error("cannot sign without key");let t=this.prepareWasmPayload(r);return await this.wasmApi.signMessage(this.clientKeyShare,t)}prepareWasmPayload(r){return JSON.stringify(r)}async createKeypair(){}add(r,t){return this.wasmApi.add(r,t)}};var i=async()=>Uint8Array.from([0,97,115,109,1,0,0,0,1,135,128,128,128,0,1,96,2,127,127,1,127,3,130,128,128,128,0,1,0,7,135,128,128,128,0,1,3,97,100,100,0,0,10,141,128,128,128,0,1,135,128,128,128,0,0,32,0,32,1,106,11]),m=async()=>await i();function p(){return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(x){let r=Math.random()*16|0;return (x=="x"?r:r&3|8).toString(16)})}var g=x=>{if(x.length%2!==0)throw new Error("Invalid hex string");let r=x.length/2,t=new Uint8Array(r);for(let e=0;e<r;e++){let a=Number.parseInt(x.slice(e*2,e*2+2),16);t[e]=a;}return t},d=x=>x.reduce((r,t)=>r+t.toString(16).padStart(2,"0"),"");

exports.EddsaClient = n;
exports.add = o;
exports.generateUUID = p;
exports.getWasmBuffer = m;
exports.hexToU8a = g;
exports.subtract = s;
exports.u8aToHex = d;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map