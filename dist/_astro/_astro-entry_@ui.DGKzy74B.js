import{e as ne,s as ue,n as zv,o as Gv,l as ri,t as ie,k as Wv,c as _e,f as he,i as W,p as Ke,q as ve,d as oe,j as gc,u as Ir,v as Pe}from"./web.DRN1PlOI.js";import{I as Hv,C as Kv,a as Qv,T as Jv}from"./CanvasManager.BNS3tDv4.js";/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 1.0.8
*/const Ig=Object.freeze({left:0,top:0,width:16,height:16}),$a=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),bo=Object.freeze({...Ig,...$a}),rl=Object.freeze({...bo,body:"",hidden:!1}),Yv=Object.freeze({width:null,height:null}),wg=Object.freeze({...Yv,...$a});function Xv(n,e=0){const t=n.replace(/^-?[0-9.]*/,"");function r(i){for(;i<0;)i+=4;return i%4}if(t===""){const i=parseInt(n);return isNaN(i)?0:r(i)}else if(t!==n){let i=0;switch(t){case"%":i=25;break;case"deg":i=90}if(i){let s=parseFloat(n.slice(0,n.length-t.length));return isNaN(s)?0:(s=s/i,s%1===0?r(s):0)}}return e}const Zv=/[\s,]+/;function eE(n,e){e.split(Zv).forEach(t=>{switch(t.trim()){case"horizontal":n.hFlip=!0;break;case"vertical":n.vFlip=!0;break}})}const vg={...wg,preserveAspectRatio:""};function zf(n){const e={...vg},t=(r,i)=>n.getAttribute(r)||i;return e.width=t("width",null),e.height=t("height",null),e.rotate=Xv(t("rotate","")),eE(e,t("flip","")),e.preserveAspectRatio=t("preserveAspectRatio",t("preserveaspectratio","")),e}function tE(n,e){for(const t in vg)if(n[t]!==e[t])return!0;return!1}const xs=/^[a-z0-9]+(-[a-z0-9]+)*$/,So=(n,e,t,r="")=>{const i=n.split(":");if(n.slice(0,1)==="@"){if(i.length<2||i.length>3)return null;r=i.shift().slice(1)}if(i.length>3||!i.length)return null;if(i.length>1){const c=i.pop(),u=i.pop(),l={provider:i.length>0?i[0]:r,prefix:u,name:c};return e&&!wa(l)?null:l}const s=i[0],o=s.split("-");if(o.length>1){const c={provider:r,prefix:o.shift(),name:o.join("-")};return e&&!wa(c)?null:c}if(t&&r===""){const c={provider:r,prefix:"",name:s};return e&&!wa(c,t)?null:c}return null},wa=(n,e)=>n?!!((n.provider===""||n.provider.match(xs))&&(e&&n.prefix===""||n.prefix.match(xs))&&n.name.match(xs)):!1;function nE(n,e){const t={};!n.hFlip!=!e.hFlip&&(t.hFlip=!0),!n.vFlip!=!e.vFlip&&(t.vFlip=!0);const r=((n.rotate||0)+(e.rotate||0))%4;return r&&(t.rotate=r),t}function Gf(n,e){const t=nE(n,e);for(const r in rl)r in $a?r in n&&!(r in t)&&(t[r]=$a[r]):r in e?t[r]=e[r]:r in n&&(t[r]=n[r]);return t}function rE(n,e){const t=n.icons,r=n.aliases||Object.create(null),i=Object.create(null);function s(o){if(t[o])return i[o]=[];if(!(o in i)){i[o]=null;const c=r[o]&&r[o].parent,u=c&&s(c);u&&(i[o]=[c].concat(u))}return i[o]}return Object.keys(t).concat(Object.keys(r)).forEach(s),i}function iE(n,e,t){const r=n.icons,i=n.aliases||Object.create(null);let s={};function o(c){s=Gf(r[c]||i[c],s)}return o(e),t.forEach(o),Gf(n,s)}function Eg(n,e){const t=[];if(typeof n!="object"||typeof n.icons!="object")return t;n.not_found instanceof Array&&n.not_found.forEach(i=>{e(i,null),t.push(i)});const r=rE(n);for(const i in r){const s=r[i];s&&(e(i,iE(n,i,s)),t.push(i))}return t}const sE={provider:"",aliases:{},not_found:{},...Ig};function Vu(n,e){for(const t in e)if(t in n&&typeof n[t]!=typeof e[t])return!1;return!0}function Tg(n){if(typeof n!="object"||n===null)return null;const e=n;if(typeof e.prefix!="string"||!n.icons||typeof n.icons!="object"||!Vu(n,sE))return null;const t=e.icons;for(const i in t){const s=t[i];if(!i.match(xs)||typeof s.body!="string"||!Vu(s,rl))return null}const r=e.aliases||Object.create(null);for(const i in r){const s=r[i],o=s.parent;if(!i.match(xs)||typeof o!="string"||!t[o]&&!r[o]||!Vu(s,rl))return null}return e}const qa=Object.create(null);function oE(n,e){return{provider:n,prefix:e,icons:Object.create(null),missing:new Set}}function Dn(n,e){const t=qa[n]||(qa[n]=Object.create(null));return t[e]||(t[e]=oE(n,e))}function Zl(n,e){return Tg(e)?Eg(e,(t,r)=>{r?n.icons[t]=r:n.missing.add(t)}):[]}function aE(n,e,t){try{if(typeof t.body=="string")return n.icons[e]={...t},!0}catch{}return!1}function cE(n,e){let t=[];return(typeof n=="string"?[n]:Object.keys(qa)).forEach(i=>{(typeof i=="string"&&typeof e=="string"?[e]:Object.keys(qa[i]||{})).forEach(o=>{const c=Dn(i,o);t=t.concat(Object.keys(c.icons).map(u=>(i!==""?"@"+i+":":"")+o+":"+u))})}),t}let Xs=!1;function Ag(n){return typeof n=="boolean"&&(Xs=n),Xs}function Zs(n){const e=typeof n=="string"?So(n,!0,Xs):n;if(e){const t=Dn(e.provider,e.prefix),r=e.name;return t.icons[r]||(t.missing.has(r)?null:void 0)}}function bg(n,e){const t=So(n,!0,Xs);if(!t)return!1;const r=Dn(t.provider,t.prefix);return aE(r,t.name,e)}function Wf(n,e){if(typeof n!="object")return!1;if(typeof e!="string"&&(e=n.provider||""),Xs&&!e&&!n.prefix){let i=!1;return Tg(n)&&(n.prefix="",Eg(n,(s,o)=>{o&&bg(s,o)&&(i=!0)})),i}const t=n.prefix;if(!wa({provider:e,prefix:t,name:"a"}))return!1;const r=Dn(e,t);return!!Zl(r,n)}function uE(n){return!!Zs(n)}function lE(n){const e=Zs(n);return e?{...bo,...e}:null}function hE(n){const e={loaded:[],missing:[],pending:[]},t=Object.create(null);n.sort((i,s)=>i.provider!==s.provider?i.provider.localeCompare(s.provider):i.prefix!==s.prefix?i.prefix.localeCompare(s.prefix):i.name.localeCompare(s.name));let r={provider:"",prefix:"",name:""};return n.forEach(i=>{if(r.name===i.name&&r.prefix===i.prefix&&r.provider===i.provider)return;r=i;const s=i.provider,o=i.prefix,c=i.name,u=t[s]||(t[s]=Object.create(null)),l=u[o]||(u[o]=Dn(s,o));let d;c in l.icons?d=e.loaded:o===""||l.missing.has(c)?d=e.missing:d=e.pending;const p={provider:s,prefix:o,name:c};d.push(p)}),e}function Sg(n,e){n.forEach(t=>{const r=t.loaderCallbacks;r&&(t.loaderCallbacks=r.filter(i=>i.id!==e))})}function dE(n){n.pendingCallbacksFlag||(n.pendingCallbacksFlag=!0,setTimeout(()=>{n.pendingCallbacksFlag=!1;const e=n.loaderCallbacks?n.loaderCallbacks.slice(0):[];if(!e.length)return;let t=!1;const r=n.provider,i=n.prefix;e.forEach(s=>{const o=s.icons,c=o.pending.length;o.pending=o.pending.filter(u=>{if(u.prefix!==i)return!0;const l=u.name;if(n.icons[l])o.loaded.push({provider:r,prefix:i,name:l});else if(n.missing.has(l))o.missing.push({provider:r,prefix:i,name:l});else return t=!0,!0;return!1}),o.pending.length!==c&&(t||Sg([n],s.id),s.callback(o.loaded.slice(0),o.missing.slice(0),o.pending.slice(0),s.abort))})}))}let fE=0;function pE(n,e,t){const r=fE++,i=Sg.bind(null,t,r);if(!e.pending.length)return i;const s={id:r,icons:e,callback:n,abort:i};return t.forEach(o=>{(o.loaderCallbacks||(o.loaderCallbacks=[])).push(s)}),i}const il=Object.create(null);function Hf(n,e){il[n]=e}function sl(n){return il[n]||il[""]}function mE(n,e=!0,t=!1){const r=[];return n.forEach(i=>{const s=typeof i=="string"?So(i,e,t):i;s&&r.push(s)}),r}var gE={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function _E(n,e,t,r){const i=n.resources.length,s=n.random?Math.floor(Math.random()*i):n.index;let o;if(n.random){let B=n.resources.slice(0);for(o=[];B.length>1;){const v=Math.floor(Math.random()*B.length);o.push(B[v]),B=B.slice(0,v).concat(B.slice(v+1))}o=o.concat(B)}else o=n.resources.slice(s).concat(n.resources.slice(0,s));const c=Date.now();let u="pending",l=0,d,p=null,m=[],w=[];typeof r=="function"&&w.push(r);function C(){p&&(clearTimeout(p),p=null)}function k(){u==="pending"&&(u="aborted"),C(),m.forEach(B=>{B.status==="pending"&&(B.status="aborted")}),m=[]}function V(B,v){v&&(w=[]),typeof B=="function"&&w.push(B)}function j(){return{startTime:c,payload:e,status:u,queriesSent:l,queriesPending:m.length,subscribe:V,abort:k}}function $(){u="failed",w.forEach(B=>{B(void 0,d)})}function U(){m.forEach(B=>{B.status==="pending"&&(B.status="aborted")}),m=[]}function ee(B,v,_){const I=v!=="success";switch(m=m.filter(T=>T!==B),u){case"pending":break;case"failed":if(I||!n.dataAfterTimeout)return;break;default:return}if(v==="abort"){d=_,$();return}if(I){d=_,m.length||(o.length?J():$());return}if(C(),U(),!n.random){const T=n.resources.indexOf(B.resource);T!==-1&&T!==n.index&&(n.index=T)}u="completed",w.forEach(T=>{T(_)})}function J(){if(u!=="pending")return;C();const B=o.shift();if(B===void 0){if(m.length){p=setTimeout(()=>{C(),u==="pending"&&(U(),$())},n.timeout);return}$();return}const v={status:"pending",resource:B,callback:(_,I)=>{ee(v,_,I)}};m.push(v),l++,p=setTimeout(J,n.rotate),t(B,e,v.callback)}return setTimeout(J),j}function Rg(n){const e={...gE,...n};let t=[];function r(){t=t.filter(c=>c().status==="pending")}function i(c,u,l){const d=_E(e,c,u,(p,m)=>{r(),l&&l(p,m)});return t.push(d),d}function s(c){return t.find(u=>c(u))||null}return{query:i,find:s,setIndex:c=>{e.index=c},getIndex:()=>e.index,cleanup:r}}function eh(n){let e;if(typeof n.resources=="string")e=[n.resources];else if(e=n.resources,!(e instanceof Array)||!e.length)return null;return{resources:e,path:n.path||"/",maxURL:n.maxURL||500,rotate:n.rotate||750,timeout:n.timeout||5e3,random:n.random===!0,index:n.index||0,dataAfterTimeout:n.dataAfterTimeout!==!1}}const _c=Object.create(null),fs=["https://api.simplesvg.com","https://api.unisvg.com"],va=[];for(;fs.length>0;)fs.length===1||Math.random()>.5?va.push(fs.shift()):va.push(fs.pop());_c[""]=eh({resources:["https://api.iconify.design"].concat(va)});function Kf(n,e){const t=eh(e);return t===null?!1:(_c[n]=t,!0)}function yc(n){return _c[n]}function yE(){return Object.keys(_c)}function Qf(){}const xu=Object.create(null);function IE(n){if(!xu[n]){const e=yc(n);if(!e)return;const t=Rg(e),r={config:e,redundancy:t};xu[n]=r}return xu[n]}function Pg(n,e,t){let r,i;if(typeof n=="string"){const s=sl(n);if(!s)return t(void 0,424),Qf;i=s.send;const o=IE(n);o&&(r=o.redundancy)}else{const s=eh(n);if(s){r=Rg(s);const o=n.resources?n.resources[0]:"",c=sl(o);c&&(i=c.send)}}return!r||!i?(t(void 0,424),Qf):r.query(e,i,t)().abort}const Jf="iconify2",eo="iconify",Cg=eo+"-count",Yf=eo+"-version",kg=36e5,wE=168;function ol(n,e){try{return n.getItem(e)}catch{}}function th(n,e,t){try{return n.setItem(e,t),!0}catch{}}function Xf(n,e){try{n.removeItem(e)}catch{}}function al(n,e){return th(n,Cg,e.toString())}function cl(n){return parseInt(ol(n,Cg))||0}const mr={local:!0,session:!0},Dg={local:new Set,session:new Set};let nh=!1;function vE(n){nh=n}let la=typeof window>"u"?{}:window;function Vg(n){const e=n+"Storage";try{if(la&&la[e]&&typeof la[e].length=="number")return la[e]}catch{}mr[n]=!1}function xg(n,e){const t=Vg(n);if(!t)return;const r=ol(t,Yf);if(r!==Jf){if(r){const c=cl(t);for(let u=0;u<c;u++)Xf(t,eo+u.toString())}th(t,Yf,Jf),al(t,0);return}const i=Math.floor(Date.now()/kg)-wE,s=c=>{const u=eo+c.toString(),l=ol(t,u);if(typeof l=="string"){try{const d=JSON.parse(l);if(typeof d=="object"&&typeof d.cached=="number"&&d.cached>i&&typeof d.provider=="string"&&typeof d.data=="object"&&typeof d.data.prefix=="string"&&e(d,c))return!0}catch{}Xf(t,u)}};let o=cl(t);for(let c=o-1;c>=0;c--)s(c)||(c===o-1?(o--,al(t,o)):Dg[n].add(c))}function Ng(){if(!nh){vE(!0);for(const n in mr)xg(n,e=>{const t=e.data,r=e.provider,i=t.prefix,s=Dn(r,i);if(!Zl(s,t).length)return!1;const o=t.lastModified||-1;return s.lastModifiedCached=s.lastModifiedCached?Math.min(s.lastModifiedCached,o):o,!0})}}function EE(n,e){const t=n.lastModifiedCached;if(t&&t>=e)return t===e;if(n.lastModifiedCached=e,t)for(const r in mr)xg(r,i=>{const s=i.data;return i.provider!==n.provider||s.prefix!==n.prefix||s.lastModified===e});return!0}function TE(n,e){nh||Ng();function t(r){let i;if(!mr[r]||!(i=Vg(r)))return;const s=Dg[r];let o;if(s.size)s.delete(o=Array.from(s).shift());else if(o=cl(i),!al(i,o+1))return;const c={cached:Math.floor(Date.now()/kg),provider:n.provider,data:e};return th(i,eo+o.toString(),JSON.stringify(c))}e.lastModified&&!EE(n,e.lastModified)||Object.keys(e.icons).length&&(e.not_found&&(e=Object.assign({},e),delete e.not_found),t("local")||t("session"))}function Zf(){}function AE(n){n.iconsLoaderFlag||(n.iconsLoaderFlag=!0,setTimeout(()=>{n.iconsLoaderFlag=!1,dE(n)}))}function bE(n,e){n.iconsToLoad?n.iconsToLoad=n.iconsToLoad.concat(e).sort():n.iconsToLoad=e,n.iconsQueueFlag||(n.iconsQueueFlag=!0,setTimeout(()=>{n.iconsQueueFlag=!1;const{provider:t,prefix:r}=n,i=n.iconsToLoad;delete n.iconsToLoad;let s;if(!i||!(s=sl(t)))return;s.prepare(t,r,i).forEach(c=>{Pg(t,c,u=>{if(typeof u!="object")c.icons.forEach(l=>{n.missing.add(l)});else try{const l=Zl(n,u);if(!l.length)return;const d=n.pendingIcons;d&&l.forEach(p=>{d.delete(p)}),TE(n,u)}catch(l){console.error(l)}AE(n)})})}))}const rh=(n,e)=>{const t=mE(n,!0,Ag()),r=hE(t);if(!r.pending.length){let u=!0;return e&&setTimeout(()=>{u&&e(r.loaded,r.missing,r.pending,Zf)}),()=>{u=!1}}const i=Object.create(null),s=[];let o,c;return r.pending.forEach(u=>{const{provider:l,prefix:d}=u;if(d===c&&l===o)return;o=l,c=d,s.push(Dn(l,d));const p=i[l]||(i[l]=Object.create(null));p[d]||(p[d]=[])}),r.pending.forEach(u=>{const{provider:l,prefix:d,name:p}=u,m=Dn(l,d),w=m.pendingIcons||(m.pendingIcons=new Set);w.has(p)||(w.add(p),i[l][d].push(p))}),s.forEach(u=>{const{provider:l,prefix:d}=u;i[l][d].length&&bE(u,i[l][d])}),e?pE(e,r,s):Zf},SE=n=>new Promise((e,t)=>{const r=typeof n=="string"?So(n,!0):n;if(!r){t(n);return}rh([r||n],i=>{if(i.length&&r){const s=Zs(r);if(s){e({...bo,...s});return}}t(n)})});function RE(n){try{const e=typeof n=="string"?JSON.parse(n):n;if(typeof e.body=="string")return{...e}}catch{}}function PE(n,e){const t=typeof n=="string"?So(n,!0,!0):null;if(!t){const s=RE(n);return{value:n,data:s}}const r=Zs(t);if(r!==void 0||!t.prefix)return{value:n,name:t,data:r};const i=rh([t],()=>e(n,t,Zs(t)));return{value:n,name:t,loading:i}}function Nu(n){return n.hasAttribute("inline")}let Og=!1;try{Og=navigator.vendor.indexOf("Apple")===0}catch{}function CE(n,e){switch(e){case"svg":case"bg":case"mask":return e}return e!=="style"&&(Og||n.indexOf("<a")===-1)?"svg":n.indexOf("currentColor")===-1?"bg":"mask"}const kE=/(-?[0-9.]*[0-9]+[0-9.]*)/g,DE=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function ul(n,e,t){if(e===1)return n;if(t=t||100,typeof n=="number")return Math.ceil(n*e*t)/t;if(typeof n!="string")return n;const r=n.split(kE);if(r===null||!r.length)return n;const i=[];let s=r.shift(),o=DE.test(s);for(;;){if(o){const c=parseFloat(s);isNaN(c)?i.push(s):i.push(Math.ceil(c*e*t)/t)}else i.push(s);if(s=r.shift(),s===void 0)return i.join("");o=!o}}const VE=n=>n==="unset"||n==="undefined"||n==="none";function Mg(n,e){const t={...bo,...n},r={...wg,...e},i={left:t.left,top:t.top,width:t.width,height:t.height};let s=t.body;[t,r].forEach(C=>{const k=[],V=C.hFlip,j=C.vFlip;let $=C.rotate;V?j?$+=2:(k.push("translate("+(i.width+i.left).toString()+" "+(0-i.top).toString()+")"),k.push("scale(-1 1)"),i.top=i.left=0):j&&(k.push("translate("+(0-i.left).toString()+" "+(i.height+i.top).toString()+")"),k.push("scale(1 -1)"),i.top=i.left=0);let U;switch($<0&&($-=Math.floor($/4)*4),$=$%4,$){case 1:U=i.height/2+i.top,k.unshift("rotate(90 "+U.toString()+" "+U.toString()+")");break;case 2:k.unshift("rotate(180 "+(i.width/2+i.left).toString()+" "+(i.height/2+i.top).toString()+")");break;case 3:U=i.width/2+i.left,k.unshift("rotate(-90 "+U.toString()+" "+U.toString()+")");break}$%2===1&&(i.left!==i.top&&(U=i.left,i.left=i.top,i.top=U),i.width!==i.height&&(U=i.width,i.width=i.height,i.height=U)),k.length&&(s='<g transform="'+k.join(" ")+'">'+s+"</g>")});const o=r.width,c=r.height,u=i.width,l=i.height;let d,p;o===null?(p=c===null?"1em":c==="auto"?l:c,d=ul(p,u/l)):(d=o==="auto"?u:o,p=c===null?ul(d,l/u):c==="auto"?l:c);const m={},w=(C,k)=>{VE(k)||(m[C]=k.toString())};return w("width",d),w("height",p),m.viewBox=i.left.toString()+" "+i.top.toString()+" "+u.toString()+" "+l.toString(),{attributes:m,body:s}}const xE=()=>{let n;try{if(n=fetch,typeof n=="function")return n}catch{}};let ja=xE();function NE(n){ja=n}function OE(){return ja}function ME(n,e){const t=yc(n);if(!t)return 0;let r;if(!t.maxURL)r=0;else{let i=0;t.resources.forEach(o=>{i=Math.max(i,o.length)});const s=e+".json?icons=";r=t.maxURL-i-t.path.length-s.length}return r}function LE(n){return n===404}const FE=(n,e,t)=>{const r=[],i=ME(n,e),s="icons";let o={type:s,provider:n,prefix:e,icons:[]},c=0;return t.forEach((u,l)=>{c+=u.length+1,c>=i&&l>0&&(r.push(o),o={type:s,provider:n,prefix:e,icons:[]},c=u.length),o.icons.push(u)}),r.push(o),r};function UE(n){if(typeof n=="string"){const e=yc(n);if(e)return e.path}return"/"}const BE=(n,e,t)=>{if(!ja){t("abort",424);return}let r=UE(e.provider);switch(e.type){case"icons":{const s=e.prefix,c=e.icons.join(","),u=new URLSearchParams({icons:c});r+=s+".json?"+u.toString();break}case"custom":{const s=e.uri;r+=s.slice(0,1)==="/"?s.slice(1):s;break}default:t("abort",400);return}let i=503;ja(n+r).then(s=>{const o=s.status;if(o!==200){setTimeout(()=>{t(LE(o)?"abort":"next",o)});return}return i=501,s.json()}).then(s=>{if(typeof s!="object"||s===null){setTimeout(()=>{s===404?t("abort",s):t("next",i)});return}setTimeout(()=>{t("success",s)})}).catch(()=>{t("next",i)})},$E={prepare:FE,send:BE};function ep(n,e){switch(n){case"local":case"session":mr[n]=e;break;case"all":for(const t in mr)mr[t]=e;break}}const Ou="data-style";let Lg="";function qE(n){Lg=n}function tp(n,e){let t=Array.from(n.childNodes).find(r=>r.hasAttribute&&r.hasAttribute(Ou));t||(t=document.createElement("style"),t.setAttribute(Ou,Ou),n.appendChild(t)),t.textContent=":host{display:inline-block;vertical-align:"+(e?"-0.125em":"0")+"}span,svg{display:block}"+Lg}function Fg(){Hf("",$E),Ag(!0);let n;try{n=window}catch{}if(n){if(Ng(),n.IconifyPreload!==void 0){const t=n.IconifyPreload,r="Invalid IconifyPreload syntax.";typeof t=="object"&&t!==null&&(t instanceof Array?t:[t]).forEach(i=>{try{(typeof i!="object"||i===null||i instanceof Array||typeof i.icons!="object"||typeof i.prefix!="string"||!Wf(i))&&console.error(r)}catch{console.error(r)}})}if(n.IconifyProviders!==void 0){const t=n.IconifyProviders;if(typeof t=="object"&&t!==null)for(const r in t){const i="IconifyProviders["+r+"] is invalid.";try{const s=t[r];if(typeof s!="object"||!s||s.resources===void 0)continue;Kf(r,s)||console.error(i)}catch{console.error(i)}}}}return{enableCache:t=>ep(t,!0),disableCache:t=>ep(t,!1),iconExists:uE,getIcon:lE,listIcons:cE,addIcon:bg,addCollection:Wf,calculateSize:ul,buildIcon:Mg,loadIcons:rh,loadIcon:SE,addAPIProvider:Kf,appendCustomStyle:qE,_api:{getAPIConfig:yc,setAPIModule:Hf,sendAPIQuery:Pg,setFetch:NE,getFetch:OE,listAPIProviders:yE}}}function Ug(n,e){let t=n.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const r in e)t+=" "+r+'="'+e[r]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+t+">"+n+"</svg>"}function jE(n){return n.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function zE(n){return"data:image/svg+xml,"+jE(n)}function GE(n){return'url("'+zE(n)+'")'}const ll={"background-color":"currentColor"},Bg={"background-color":"transparent"},np={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},rp={"-webkit-mask":ll,mask:ll,background:Bg};for(const n in rp){const e=rp[n];for(const t in np)e[n+"-"+t]=np[t]}function ip(n){return n?n+(n.match(/^[-0-9.]+$/)?"px":""):"inherit"}function WE(n,e,t){const r=document.createElement("span");let i=n.body;i.indexOf("<a")!==-1&&(i+="<!-- "+Date.now()+" -->");const s=n.attributes,o=Ug(i,{...s,width:e.width+"",height:e.height+""}),c=GE(o),u=r.style,l={"--svg":c,width:ip(s.width),height:ip(s.height),...t?ll:Bg};for(const d in l)u.setProperty(d,l[d]);return r}let Ns;function HE(){try{Ns=window.trustedTypes.createPolicy("iconify",{createHTML:n=>n})}catch{Ns=null}}function KE(n){return Ns===void 0&&HE(),Ns?Ns.createHTML(n):n}function QE(n){const e=document.createElement("span"),t=n.attributes;let r="";t.width||(r="width: inherit;"),t.height||(r+="height: inherit;"),r&&(t.style=r);const i=Ug(n.body,t);return e.innerHTML=KE(i),e.firstChild}function sp(n,e){const t=e.icon.data,r=e.customisations,i=Mg(t,r);r.preserveAspectRatio&&(i.attributes.preserveAspectRatio=r.preserveAspectRatio);const s=e.renderedMode;let o;switch(s){case"svg":o=QE(i);break;default:o=WE(i,{...bo,...t},s==="mask")}const c=Array.from(n.childNodes).find(u=>{const l=u.tagName&&u.tagName.toUpperCase();return l==="SPAN"||l==="SVG"});c?o.tagName==="SPAN"&&c.tagName===o.tagName?c.setAttribute("style",o.getAttribute("style")):n.replaceChild(o,c):n.appendChild(o)}function op(n,e,t){const r=t&&(t.rendered?t:t.lastRender);return{rendered:!1,inline:e,icon:n,lastRender:r}}function JE(n="iconify-icon"){let e,t;try{e=window.customElements,t=window.HTMLElement}catch{return}if(!e||!t)return;const r=e.get(n);if(r)return r;const i=["icon","mode","inline","width","height","rotate","flip"],s=class extends t{_shadowRoot;_state;_checkQueued=!1;constructor(){super();const c=this._shadowRoot=this.attachShadow({mode:"open"}),u=Nu(this);tp(c,u),this._state=op({value:""},u),this._queueCheck()}static get observedAttributes(){return i.slice(0)}attributeChangedCallback(c){if(c==="inline"){const u=Nu(this),l=this._state;u!==l.inline&&(l.inline=u,tp(this._shadowRoot,u))}else this._queueCheck()}get icon(){const c=this.getAttribute("icon");if(c&&c.slice(0,1)==="{")try{return JSON.parse(c)}catch{}return c}set icon(c){typeof c=="object"&&(c=JSON.stringify(c)),this.setAttribute("icon",c)}get inline(){return Nu(this)}set inline(c){c?this.setAttribute("inline","true"):this.removeAttribute("inline")}restartAnimation(){const c=this._state;if(c.rendered){const u=this._shadowRoot;if(c.renderedMode==="svg")try{u.lastChild.setCurrentTime(0);return}catch{}sp(u,c)}}get status(){const c=this._state;return c.rendered?"rendered":c.icon.data===null?"failed":"loading"}_queueCheck(){this._checkQueued||(this._checkQueued=!0,setTimeout(()=>{this._check()}))}_check(){if(!this._checkQueued)return;this._checkQueued=!1;const c=this._state,u=this.getAttribute("icon");if(u!==c.icon.value){this._iconChanged(u);return}if(!c.rendered)return;const l=this.getAttribute("mode"),d=zf(this);(c.attrMode!==l||tE(c.customisations,d))&&this._renderIcon(c.icon,d,l)}_iconChanged(c){const u=PE(c,(l,d,p)=>{const m=this._state;if(m.rendered||this.getAttribute("icon")!==l)return;const w={value:l,name:d,data:p};w.data?this._gotIconData(w):m.icon=w});u.data?this._gotIconData(u):this._state=op(u,this._state.inline,this._state)}_gotIconData(c){this._checkQueued=!1,this._renderIcon(c,zf(this),this.getAttribute("mode"))}_renderIcon(c,u,l){const d=CE(c.data.body,l),p=this._state.inline;sp(this._shadowRoot,this._state={rendered:!0,icon:c,inline:p,customisations:u,attrMode:l,renderedMode:d})}};i.forEach(c=>{c in s.prototype||Object.defineProperty(s.prototype,c,{get:function(){return this.getAttribute(c)},set:function(u){u!==null?this.setAttribute(c,u):this.removeAttribute(c)}})});const o=Fg();for(const c in o)s[c]=s.prototype[c]=o[c];return e.define(n,s),s}const YE=JE()||Fg(),{enableCache:hx,disableCache:dx,iconExists:fx,getIcon:px,listIcons:mx,addIcon:gx,addCollection:_x,calculateSize:yx,buildIcon:Ix,loadIcons:wx,loadIcon:vx,addAPIProvider:Ex,_api:Tx}=YE;var XE=ie("<iconify-icon>",!0,!1,!1);function Ea(n){let{icon:e,mode:t,inline:r,rotate:i,flip:s,width:o,height:c,preserveAspectRatio:u}=n;return typeof e=="object"&&(e=JSON.stringify(e)),(()=>{var l=ne(XE);return ue(l,"icon",e),ue(l,"mode",t),ue(l,"inline",r),ue(l,"rotate",i),ue(l,"flip",s),ue(l,"width",o),ue(l,"height",c),ue(l,"preserveaspectratio",u),zv(l,n,!1),l._$owner=Gv(),ri(),l})()}const ZE={apiKey:"",authDomain:"",databaseURL:"",projectId:"",storageBucket:"",messagingSenderId:"",appId:""},eT=()=>{};var ap={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $g=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},tT=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],c=n[t++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},qg={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,c=o?n[i+1]:0,u=i+2<n.length,l=u?n[i+2]:0,d=s>>2,p=(s&3)<<4|c>>4;let m=(c&15)<<2|l>>6,w=l&63;u||(w=64,o||(m=64)),r.push(t[d],t[p],t[m],t[w])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray($g(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):tT(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const l=i<n.length?t[n.charAt(i)]:64;++i;const p=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||l==null||p==null)throw new nT;const m=s<<2|c>>4;if(r.push(m),l!==64){const w=c<<4&240|l>>2;if(r.push(w),p!==64){const C=l<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class nT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const rT=function(n){const e=$g(n);return qg.encodeByteArray(e,!0)},za=function(n){return rT(n).replace(/\./g,"")},ih=function(n){try{return qg.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Ga(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!iT(t)||(n[t]=Ga(n[t],e[t]));return n}function iT(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sT=()=>sh().__FIREBASE_DEFAULTS__,oT=()=>{if(typeof process>"u"||typeof ap>"u")return;const n=ap.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},aT=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ih(n[1]);return e&&JSON.parse(e)},Ic=()=>{try{return eT()||sT()||oT()||aT()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},jg=n=>Ic()?.emulatorHosts?.[n],cT=n=>{const e=jg(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},oh=()=>Ic()?.config,zg=n=>Ic()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uT{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Li(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Gg(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lT(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[za(JSON.stringify(t)),za(JSON.stringify(o)),""].join(".")}const Os={};function hT(){const n={prod:[],emulator:[]};for(const e of Object.keys(Os))Os[e]?n.emulator.push(e):n.prod.push(e);return n}function dT(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let cp=!1;function Wg(n,e){if(typeof window>"u"||typeof document>"u"||!Li(window.location.host)||Os[n]===e||Os[n]||cp)return;Os[n]=e;function t(m){return`__firebase__banner__${m}`}const r="__firebase__banner",s=hT().prod.length>0;function o(){const m=document.getElementById(r);m&&m.remove()}function c(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function u(m,w){m.setAttribute("width","24"),m.setAttribute("id",w),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function l(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{cp=!0,o()},m}function d(m,w){m.setAttribute("id",w),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=dT(r),w=t("text"),C=document.getElementById(w)||document.createElement("span"),k=t("learnmore"),V=document.getElementById(k)||document.createElement("a"),j=t("preprendIcon"),$=document.getElementById(j)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const U=m.element;c(U),d(V,k);const ee=l();u($,j),U.append($,C,V,ee),document.body.appendChild(U)}s?(C.innerText="Preview backend disconnected.",$.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):($.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",w)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ee(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function fT(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ee())}function wc(){const n=Ic()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function pT(){return typeof window<"u"||Hg()}function Hg(){return typeof WorkerGlobalScope<"u"&&typeof self<"u"&&self instanceof WorkerGlobalScope}function mT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Kg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function ah(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Qg(){const n=Ee();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Jg(){return!wc()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Yg(){return!wc()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function to(){try{return typeof indexedDB=="object"}catch{return!1}}function gT(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _T="FirebaseError";class st extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=_T,Object.setPrototypeOf(this,st.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Nr.prototype.create)}}class Nr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?yT(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new st(i,c,r)}}function yT(n,e){return n.replace(IT,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const IT=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function up(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function wT(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Xt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(lp(s)&&lp(o)){if(!Xt(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function lp(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ni(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function bs(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Xg(n,e){const t=new vT(n,e);return t.subscribe.bind(t)}class vT{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");ET(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Mu),i.error===void 0&&(i.error=Mu),i.complete===void 0&&(i.complete=Mu);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ET(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Mu(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(n){return n&&n._delegate?n._delegate:n}class Wt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TT{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new uT;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(bT(e))try{this.getOrInitializeService({instanceIdentifier:rr})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=rr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=rr){return this.instances.has(e)}getOptions(e=rr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&o.resolve(i)}return i}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:AT(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=rr){return this.component?this.component.multipleInstances?e:rr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function AT(n){return n===rr?void 0:n}function bT(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new TT(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ch=[];var Y;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Y||(Y={}));const e_={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},ST=Y.INFO,RT={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},PT=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=RT[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class vc{constructor(e){this.name=e,this._logLevel=ST,this._logHandler=PT,this._userLogHandler=null,ch.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?e_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}function CT(n){ch.forEach(e=>{e.setLogLevel(n)})}function kT(n,e){for(const t of ch){let r=null;e&&e.level&&(r=e_[e.level]),n===null?t.userLogHandler=null:t.userLogHandler=(i,s,...o)=>{const c=o.map(u=>{if(u==null)return null;if(typeof u=="string")return u;if(typeof u=="number"||typeof u=="boolean")return u.toString();if(u instanceof Error)return u.message;try{return JSON.stringify(u)}catch{return null}}).filter(u=>u).join(" ");s>=(r??i.logLevel)&&n({level:Y[s].toLowerCase(),message:c,args:o,type:i.name})}}}const DT=(n,e)=>e.some(t=>n instanceof t);let hp,dp;function VT(){return hp||(hp=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function xT(){return dp||(dp=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const t_=new WeakMap,hl=new WeakMap,n_=new WeakMap,Lu=new WeakMap,uh=new WeakMap;function NT(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(Sn(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&t_.set(t,n)}).catch(()=>{}),uh.set(e,n),e}function OT(n){if(hl.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});hl.set(n,e)}let dl={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return hl.get(n);if(e==="objectStoreNames")return n.objectStoreNames||n_.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Sn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function MT(n){dl=n(dl)}function LT(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Fu(this),e,...t);return n_.set(r,e.sort?e.sort():[e]),Sn(r)}:xT().includes(n)?function(...e){return n.apply(Fu(this),e),Sn(t_.get(this))}:function(...e){return Sn(n.apply(Fu(this),e))}}function FT(n){return typeof n=="function"?LT(n):(n instanceof IDBTransaction&&OT(n),DT(n,VT())?new Proxy(n,dl):n)}function Sn(n){if(n instanceof IDBRequest)return NT(n);if(Lu.has(n))return Lu.get(n);const e=FT(n);return e!==n&&(Lu.set(n,e),uh.set(e,n)),e}const Fu=n=>uh.get(n);function UT(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),c=Sn(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Sn(o.result),u.oldVersion,u.newVersion,Sn(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const BT=["get","getKey","getAll","getAllKeys","count"],$T=["put","add","delete","clear"],Uu=new Map;function fp(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Uu.get(e))return Uu.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=$T.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||BT.includes(t)))return;const s=async function(o,...c){const u=this.transaction(o,i?"readwrite":"readonly");let l=u.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),i&&u.done]))[0]};return Uu.set(e,s),s}MT(n=>({...n,get:(e,t,r)=>fp(e,t)||n.get(e,t,r),has:(e,t)=>!!fp(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qT{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(jT(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function jT(n){return n.getComponent()?.type==="VERSION"}const Wa="@firebase/app",fl="0.14.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt=new vc("@firebase/app"),zT="@firebase/app-compat",GT="@firebase/analytics-compat",WT="@firebase/analytics",HT="@firebase/app-check-compat",KT="@firebase/app-check",QT="@firebase/auth",JT="@firebase/auth-compat",YT="@firebase/database",XT="@firebase/data-connect",ZT="@firebase/database-compat",eA="@firebase/functions",tA="@firebase/functions-compat",nA="@firebase/installations",rA="@firebase/installations-compat",iA="@firebase/messaging",sA="@firebase/messaging-compat",oA="@firebase/performance",aA="@firebase/performance-compat",cA="@firebase/remote-config",uA="@firebase/remote-config-compat",lA="@firebase/storage",hA="@firebase/storage-compat",dA="@firebase/firestore",fA="@firebase/ai",pA="@firebase/firestore-compat",mA="firebase",gA="12.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn="[DEFAULT]",_A={[Wa]:"fire-core",[zT]:"fire-core-compat",[WT]:"fire-analytics",[GT]:"fire-analytics-compat",[KT]:"fire-app-check",[HT]:"fire-app-check-compat",[QT]:"fire-auth",[JT]:"fire-auth-compat",[YT]:"fire-rtdb",[XT]:"fire-data-connect",[ZT]:"fire-rtdb-compat",[eA]:"fire-fn",[tA]:"fire-fn-compat",[nA]:"fire-iid",[rA]:"fire-iid-compat",[iA]:"fire-fcm",[sA]:"fire-fcm-compat",[oA]:"fire-perf",[aA]:"fire-perf-compat",[cA]:"fire-rc",[uA]:"fire-rc-compat",[lA]:"fire-gcs",[hA]:"fire-gcs-compat",[dA]:"fire-fst",[pA]:"fire-fst-compat",[fA]:"fire-vertex","fire-js":"fire-js",[mA]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xn=new Map,hi=new Map,di=new Map;function no(n,e){try{n.container.addComponent(e)}catch(t){Zt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function r_(n,e){n.container.addOrOverwriteComponent(e)}function Nn(n){const e=n.name;if(di.has(e))return Zt.debug(`There were multiple attempts to register component ${e}.`),!1;di.set(e,n);for(const t of xn.values())no(t,n);for(const t of hi.values())no(t,n);return!0}function Ro(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function yA(n,e,t=Vn){Ro(n,e).clearInstance(t)}function lh(n){return n.options!==void 0}function i_(n){return lh(n)?!1:"authIdToken"in n||"appCheckToken"in n||"releaseOnDeref"in n||"automaticDataCollectionEnabled"in n}function ye(n){return n==null?!1:n.settings!==void 0}function IA(){di.clear()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wA={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},gt=new Nr("app","Firebase",wA);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s_=class{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Wt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw gt.create("app-deleted",{appName:this._name})}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pp(n,e){const t=ih(n.split(".")[1]);if(t===null){console.error(`FirebaseServerApp ${e} is invalid: second part could not be parsed.`);return}if(JSON.parse(t).exp===void 0){console.error(`FirebaseServerApp ${e} is invalid: expiration claim could not be parsed`);return}const i=JSON.parse(t).exp*1e3,s=new Date().getTime();i-s<=0&&console.error(`FirebaseServerApp ${e} is invalid: the token has expired.`)}class vA extends s_{constructor(e,t,r,i){const s=t.automaticDataCollectionEnabled!==void 0?t.automaticDataCollectionEnabled:!0,o={name:r,automaticDataCollectionEnabled:s};if(e.apiKey!==void 0)super(e,o,i);else{const c=e;super(c.options,o,i)}this._serverConfig={automaticDataCollectionEnabled:s,...t},this._serverConfig.authIdToken&&pp(this._serverConfig.authIdToken,"authIdToken"),this._serverConfig.appCheckToken&&pp(this._serverConfig.appCheckToken,"appCheckToken"),this._finalizationRegistry=null,typeof FinalizationRegistry<"u"&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,t.releaseOnDeref=void 0,kt(Wa,fl,"serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,e!==void 0&&this._finalizationRegistry!==null&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){fh(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw gt.create("server-app-deleted")}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jn=gA;function hh(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Vn,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw gt.create("bad-app-name",{appName:String(i)});if(t||(t=oh()),!t)throw gt.create("no-options");const s=xn.get(i);if(s){if(Xt(t,s.options)&&Xt(r,s.config))return s;throw gt.create("duplicate-app",{appName:i})}const o=new Zg(i);for(const u of di.values())o.addComponent(u);const c=new s_(t,r,o);return xn.set(i,c),c}function EA(n,e={}){if(pT()&&!Hg())throw gt.create("invalid-server-app-environment");let t,r=e||{};if(n&&(lh(n)?t=n.options:i_(n)?r=n:t=n),r.automaticDataCollectionEnabled===void 0&&(r.automaticDataCollectionEnabled=!0),t||(t=oh()),!t)throw gt.create("no-options");const i={...r,...t};i.releaseOnDeref!==void 0&&delete i.releaseOnDeref;const s=d=>[...d].reduce((p,m)=>Math.imul(31,p)+m.charCodeAt(0)|0,0);if(r.releaseOnDeref!==void 0&&typeof FinalizationRegistry>"u")throw gt.create("finalization-registry-not-supported",{});const o=""+s(JSON.stringify(i)),c=hi.get(o);if(c)return c.incRefCount(r.releaseOnDeref),c;const u=new Zg(o);for(const d of di.values())u.addComponent(d);const l=new vA(t,r,o,u);return hi.set(o,l),l}function dh(n=Vn){const e=xn.get(n);if(!e&&n===Vn&&oh())return hh();if(!e)throw gt.create("no-app",{appName:n});return e}function TA(){return Array.from(xn.values())}async function fh(n){let e=!1;const t=n.name;xn.has(t)?(e=!0,xn.delete(t)):hi.has(t)&&n.decRefCount()<=0&&(hi.delete(t),e=!0),e&&(await Promise.all(n.container.getProviders().map(r=>r.delete())),n.isDeleted=!0)}function kt(n,e,t){let r=_A[n]??n;t&&(r+=`-${t}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Zt.warn(o.join(" "));return}Nn(new Wt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}function o_(n,e){if(n!==null&&typeof n!="function")throw gt.create("invalid-log-argument");kT(n,e)}function a_(n){CT(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AA="firebase-heartbeat-database",bA=1,ro="firebase-heartbeat-store";let Bu=null;function c_(){return Bu||(Bu=UT(AA,bA,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(ro)}catch(t){console.warn(t)}}}}).catch(n=>{throw gt.create("idb-open",{originalErrorMessage:n.message})})),Bu}async function SA(n){try{const t=(await c_()).transaction(ro),r=await t.objectStore(ro).get(u_(n));return await t.done,r}catch(e){if(e instanceof st)Zt.warn(e.message);else{const t=gt.create("idb-get",{originalErrorMessage:e?.message});Zt.warn(t.message)}}}async function mp(n,e){try{const r=(await c_()).transaction(ro,"readwrite");await r.objectStore(ro).put(e,u_(n)),await r.done}catch(t){if(t instanceof st)Zt.warn(t.message);else{const r=gt.create("idb-set",{originalErrorMessage:t?.message});Zt.warn(r.message)}}}function u_(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RA=1024,PA=30;class CA{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new DA(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=gp();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>PA){const i=VA(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Zt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=gp(),{heartbeatsToSend:t,unsentEntries:r}=kA(this._heartbeatsCache.heartbeats),i=za(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return Zt.warn(e),""}}}function gp(){return new Date().toISOString().substring(0,10)}function kA(n,e=RA){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),_p(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),_p(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class DA{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return to()?gT().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await SA(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return mp(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return mp(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function _p(n){return za(JSON.stringify({version:2,heartbeats:n})).length}function VA(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xA(n){Nn(new Wt("platform-logger",e=>new qT(e),"PRIVATE")),Nn(new Wt("heartbeat",e=>new CA(e),"PRIVATE")),kt(Wa,fl,n),kt(Wa,fl,"esm2020"),kt("fire-js","")}xA("");const NA=Object.freeze(Object.defineProperty({__proto__:null,FirebaseError:st,SDK_VERSION:jn,_DEFAULT_ENTRY_NAME:Vn,_addComponent:no,_addOrOverwriteComponent:r_,_apps:xn,_clearComponents:IA,_components:di,_getProvider:Ro,_isFirebaseApp:lh,_isFirebaseServerApp:ye,_isFirebaseServerAppSettings:i_,_registerComponent:Nn,_removeServiceInstance:yA,_serverApps:hi,deleteApp:fh,getApp:dh,getApps:TA,initializeApp:hh,initializeServerApp:EA,onLog:o_,registerVersion:kt,setLogLevel:a_},Symbol.toStringTag,{value:"Module"})),ps={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",TWITTER:"twitter.com"},zr={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OA(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements.","invalid-hosting-link-domain":"The provided Hosting link domain is not configured in Firebase Hosting or is not owned by the current project. This cannot be a default Hosting domain (`web.app` or `firebaseapp.com`)."}}function l_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const MA=OA,LA=l_,h_=new Nr("auth","Firebase",l_());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ha=new vc("@firebase/auth");function FA(n,...e){Ha.logLevel<=Y.WARN&&Ha.warn(`Auth (${jn}): ${n}`,...e)}function Ta(n,...e){Ha.logLevel<=Y.ERROR&&Ha.error(`Auth (${jn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function je(n,...e){throw mh(n,...e)}function Me(n,...e){return mh(n,...e)}function ph(n,e,t){const r={...LA(),[e]:t};return new Nr("auth","Firebase",r).create(e,{appName:n.name})}function qe(n){return ph(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ui(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&je(n,"argument-error"),ph(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function mh(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return h_.create(n,...e)}function N(n,e,...t){if(!n)throw mh(e,...t)}function $t(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ta(e),new Error(e)}function Nt(n,e){n||$t(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function io(){return typeof self<"u"&&self.location?.href||""}function gh(){return yp()==="http:"||yp()==="https:"}function yp(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UA(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(gh()||Kg()||"connection"in navigator)?navigator.onLine:!0}function BA(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e,t){this.shortDelay=e,this.longDelay=t,Nt(t>e,"Short delay should be less than long delay!"),this.isMobile=fT()||ah()}get(){return UA()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _h(n,e){Nt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d_{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;$t("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;$t("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;$t("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $A={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qA=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],jA=new Po(3e4,6e4);function Se(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Re(n,e,t,r,i={}){return f_(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const c=Fi({key:n.config.apiKey,...o}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:u,...s};return mT()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&Li(n.emulatorConfig.host)&&(l.credentials="include"),d_.fetch()(await p_(n,n.config.apiHost,t,c),l)})}async function f_(n,e,t){n._canInitEmulator=!1;const r={...$A,...e};try{const i=new GA(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Ss(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const c=s.ok?o.errorMessage:o.error.message,[u,l]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ss(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Ss(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw Ss(n,"user-disabled",o);const d=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw ph(n,d,l);je(n,d)}}catch(i){if(i instanceof st)throw i;je(n,"network-request-failed",{message:String(i)})}}async function rn(n,e,t,r,i={}){const s=await Re(n,e,t,r,i);return"mfaPendingCredential"in s&&je(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function p_(n,e,t,r){const i=`${e}${t}?${r}`,s=n,o=s.config.emulator?_h(n.config,i):`${n.config.apiScheme}://${i}`;return qA.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}function zA(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class GA{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Me(this.auth,"network-request-failed")),jA.get())})}}function Ss(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Me(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ip(n){return n!==void 0&&n.getResponse!==void 0}function wp(n){return n!==void 0&&n.enterprise!==void 0}class m_{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return zA(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WA(n){return(await Re(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function g_(n,e){return Re(n,"GET","/v2/recaptchaConfig",Se(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HA(n,e){return Re(n,"POST","/v1/accounts:delete",e)}async function KA(n,e){return Re(n,"POST","/v1/accounts:update",e)}async function Ka(n,e){return Re(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ms(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function QA(n,e=!1){const t=G(n),r=await t.getIdToken(e),i=Ec(r);N(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:Ms($u(i.auth_time)),issuedAtTime:Ms($u(i.iat)),expirationTime:Ms($u(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function $u(n){return Number(n)*1e3}function Ec(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ta("JWT malformed, contained fewer than 3 sections"),null;try{const i=ih(t);return i?JSON.parse(i):(Ta("Failed to decode base64 JWT payload"),null)}catch(i){return Ta("Caught error parsing JWT payload as JSON",i?.toString()),null}}function vp(n){const e=Ec(n);return N(e,"internal-error"),N(typeof e.exp<"u","internal-error"),N(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function en(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof st&&JA(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function JA({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YA{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ms(this.lastLoginAt),this.creationTime=Ms(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function so(n){const e=n.auth,t=await n.getIdToken(),r=await en(n,Ka(e,{idToken:t}));N(r?.users.length,e,"internal-error");const i=r.users[0];n._notifyReloadListener(i);const s=i.providerUserInfo?.length?__(i.providerUserInfo):[],o=ZA(n.providerData,s),c=n.isAnonymous,u=!(n.email&&i.passwordHash)&&!o?.length,l=c?u:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new pl(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(n,d)}async function XA(n){const e=G(n);await so(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ZA(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function __(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eb(n,e){const t=await f_(n,{},async()=>{const r=Fi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=await p_(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Li(n.emulatorConfig.host)&&(u.credentials="include"),d_.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function tb(n,e){return Re(n,"POST","/v2/accounts:revokeToken",Se(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){N(e.idToken,"internal-error"),N(typeof e.idToken<"u","internal-error"),N(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):vp(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){N(e.length!==0,"internal-error");const t=vp(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(N(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await eb(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new ii;return r&&(N(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(N(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(N(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ii,this.toJSON())}_performRefresh(){return $t("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(n,e){N(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ct{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new YA(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new pl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await en(this,this.stsTokenManager.getToken(this.auth,e));return N(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return QA(this,e)}reload(){return XA(this)}_assign(e){this!==e&&(N(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ct({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){N(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await so(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ye(this.auth.app))return Promise.reject(qe(this.auth));const e=await this.getIdToken();return await en(this,HA(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,l=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:p,emailVerified:m,isAnonymous:w,providerData:C,stsTokenManager:k}=t;N(p&&k,e,"internal-error");const V=ii.fromJSON(this.name,k);N(typeof p=="string",e,"internal-error"),gn(r,e.name),gn(i,e.name),N(typeof m=="boolean",e,"internal-error"),N(typeof w=="boolean",e,"internal-error"),gn(s,e.name),gn(o,e.name),gn(c,e.name),gn(u,e.name),gn(l,e.name),gn(d,e.name);const j=new Ct({uid:p,auth:e,email:i,emailVerified:m,displayName:r,isAnonymous:w,photoURL:o,phoneNumber:s,tenantId:c,stsTokenManager:V,createdAt:l,lastLoginAt:d});return C&&Array.isArray(C)&&(j.providerData=C.map($=>({...$}))),u&&(j._redirectEventId=u),j}static async _fromIdTokenResponse(e,t,r=!1){const i=new ii;i.updateFromServerResponse(t);const s=new Ct({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await so(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];N(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?__(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!s?.length,c=new ii;c.updateFromIdToken(r);const u=new Ct({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new pl(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(u,l),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ep=new Map;function mt(n){Nt(n instanceof Function,"Expected a class definition");let e=Ep.get(n);return e?(Nt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ep.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}y_.type="NONE";const fi=y_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gr(n,e,t){return`firebase:${n}:${e}:${t}`}class si{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=gr(this.userKey,i.apiKey,s),this.fullPersistenceKey=gr("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ka(this.auth,{idToken:e}).catch(()=>{});return t?Ct._fromGetAccountInfoResponse(this.auth,t,e):null}return Ct._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new si(mt(fi),e,r);const i=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||mt(fi);const o=gr(r,e.config.apiKey,e.name);let c=null;for(const l of t)try{const d=await l._get(o);if(d){let p;if(typeof d=="string"){const m=await Ka(e,{idToken:d}).catch(()=>{});if(!m)break;p=await Ct._fromGetAccountInfoResponse(e,m,d)}else p=Ct._fromJSON(e,d);l!==s&&(c=p),s=l;break}}catch{}const u=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new si(s,e,r):(s=u[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new si(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tp(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(E_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(I_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(T_(e))return"Blackberry";if(A_(e))return"Webos";if(w_(e))return"Safari";if((e.includes("chrome/")||v_(e))&&!e.includes("edge/"))return"Chrome";if(Co(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function I_(n=Ee()){return/firefox\//i.test(n)}function w_(n=Ee()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function v_(n=Ee()){return/crios\//i.test(n)}function E_(n=Ee()){return/iemobile/i.test(n)}function Co(n=Ee()){return/android/i.test(n)}function T_(n=Ee()){return/blackberry/i.test(n)}function A_(n=Ee()){return/webos/i.test(n)}function ko(n=Ee()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function nb(n=Ee()){return/(iPad|iPhone|iPod).*OS 7_\d/i.test(n)||/(iPad|iPhone|iPod).*OS 8_\d/i.test(n)}function rb(n=Ee()){return ko(n)&&!!window.navigator?.standalone}function ib(){return Qg()&&document.documentMode===10}function b_(n=Ee()){return ko(n)||Co(n)||A_(n)||T_(n)||/windows phone/i.test(n)||E_(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S_(n,e=[]){let t;switch(n){case"Browser":t=Tp(Ee());break;case"Worker":t=`${Tp(Ee())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${jn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sb{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,c)=>{try{const u=e(s);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ob(n,e={}){return Re(n,"GET","/v2/passwordPolicy",Se(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ab=6;class cb{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??ab,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ub{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ap(this),this.idTokenSubscription=new Ap(this),this.beforeStateQueue=new sb(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=h_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=mt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await si.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ka(this,{idToken:e}),r=await Ct._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(ye(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,o=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!s||s===o)&&c?.user&&(r=c.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(s){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return N(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await so(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=BA()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ye(this.app))return Promise.reject(qe(this));const t=e?G(e):null;return t&&N(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&N(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ye(this.app)?Promise.reject(qe(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ye(this.app)?Promise.reject(qe(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(mt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ob(this),t=new cb(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Nr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await tb(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&mt(e)||this._popupRedirectResolver;N(t,this,"argument-error"),this.redirectPersistenceManager=await si.create(this,[mt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(N(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return N(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=S_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(ye(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&FA(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Te(n){return G(n)}class Ap{constructor(e){this.auth=e,this.observer=null,this.addObserver=Xg(t=>this.observer=t)}get next(){return N(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Do={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function lb(n){Do=n}function yh(n){return Do.loadJS(n)}function hb(){return Do.recaptchaV2Script}function db(){return Do.recaptchaEnterpriseScript}function fb(){return Do.gapiScript}function R_(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pb=500,mb=6e4,ha=1e12;class gb{constructor(e){this.auth=e,this.counter=ha,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new Ib(e,this.auth.name,t||{})),this.counter++,r}reset(e){const t=e||ha;this._widgets.get(t)?.delete(),this._widgets.delete(t)}getResponse(e){const t=e||ha;return this._widgets.get(t)?.getResponse()||""}async execute(e){const t=e||ha;return this._widgets.get(t)?.execute(),""}}class _b{constructor(){this.enterprise=new yb}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class yb{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Ib{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;N(i,"argument-error",{appName:t}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=wb(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},mb)},pb))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function wb(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}const vb="recaptcha-enterprise",Ls="NO_RECAPTCHA";class P_{constructor(e){this.type=vb,this.auth=Te(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,c)=>{g_(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const l=new m_(u);return s.tenantId==null?s._agentRecaptchaConfig=l:s._tenantRecaptchaConfigs[s.tenantId]=l,o(l.siteKey)}}).catch(u=>{c(u)})})}function i(s,o,c){const u=window.grecaptcha;wp(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(l=>{o(l)}).catch(()=>{o(Ls)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new _b().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{r(this.auth).then(c=>{if(!t&&wp(window.grecaptcha))i(c,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=db();u.length!==0&&(u+=c),yh(u).then(()=>{i(c,s,o)}).catch(l=>{o(l)})}}).catch(c=>{o(c)})})}}async function ms(n,e,t,r=!1,i=!1){const s=new P_(n);let o;if(i)o=Ls;else try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,l=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Rn(n,e,t,r,i){if(i==="EMAIL_PASSWORD_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await ms(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await ms(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(s)});else if(i==="PHONE_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){const s=await ms(n,e,t);return r(n,s).catch(async o=>{if(n._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")==="AUDIT"&&(o.code==="auth/missing-recaptcha-token"||o.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);const c=await ms(n,e,t,!1,!0);return r(n,c)}return Promise.reject(o)})}else{const s=await ms(n,e,t,!1,!0);return r(n,s)}else return Promise.reject(i+" provider is not supported.")}async function Eb(n){const e=Te(n),t=await g_(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new m_(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new P_(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tb(n,e){const t=Ro(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Xt(s,e??{}))return i;je(i,"already-initialized")}return t.initialize({options:e})}function Ab(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(mt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function C_(n,e,t){const r=Te(n);N(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!!t?.disableWarnings,s=k_(e),{host:o,port:c}=bb(e),u=c===null?"":`:${c}`,l={url:`${s}//${o}${u}/`},d=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){N(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),N(Xt(l,r.config.emulator)&&Xt(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Li(o)?(Gg(`${s}//${o}${u}`),Wg("Auth",!0)):i||Sb()}function k_(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function bb(n){const e=k_(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:bp(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:bp(o)}}}function bp(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Sb(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return $t("not implemented")}_getIdTokenResponse(e){return $t("not implemented")}_linkToIdToken(e,t){return $t("not implemented")}_getReauthenticationResolver(e){return $t("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function D_(n,e){return Re(n,"POST","/v1/accounts:resetPassword",Se(n,e))}async function Rb(n,e){return Re(n,"POST","/v1/accounts:update",e)}async function Pb(n,e){return Re(n,"POST","/v1/accounts:signUp",e)}async function Cb(n,e){return Re(n,"POST","/v1/accounts:update",Se(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kb(n,e){return rn(n,"POST","/v1/accounts:signInWithPassword",Se(n,e))}async function Tc(n,e){return Re(n,"POST","/v1/accounts:sendOobCode",Se(n,e))}async function Db(n,e){return Tc(n,e)}async function Vb(n,e){return Tc(n,e)}async function xb(n,e){return Tc(n,e)}async function Nb(n,e){return Tc(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ob(n,e){return rn(n,"POST","/v1/accounts:signInWithEmailLink",Se(n,e))}async function Mb(n,e){return rn(n,"POST","/v1/accounts:signInWithEmailLink",Se(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo extends Bi{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new oo(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new oo(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Rn(e,t,"signInWithPassword",kb,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Ob(e,{email:this._email,oobCode:this._password});default:je(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Rn(e,r,"signUpPassword",Pb,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Mb(e,{idToken:t,email:this._email,oobCode:this._password});default:je(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yt(n,e){return rn(n,"POST","/v1/accounts:signInWithIdp",Se(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lb="http://localhost";class Ht extends Bi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Ht(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):je("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=t;if(!r||!i)return null;const o=new Ht(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Yt(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Yt(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Yt(e,t)}buildRequest(){const e={requestUri:Lb,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Fi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sp(n,e){return Re(n,"POST","/v1/accounts:sendVerificationCode",Se(n,e))}async function Fb(n,e){return rn(n,"POST","/v1/accounts:signInWithPhoneNumber",Se(n,e))}async function Ub(n,e){const t=await rn(n,"POST","/v1/accounts:signInWithPhoneNumber",Se(n,e));if(t.temporaryProof)throw Ss(n,"account-exists-with-different-credential",t);return t}const Bb={USER_NOT_FOUND:"user-not-found"};async function $b(n,e){const t={...e,operation:"REAUTH"};return rn(n,"POST","/v1/accounts:signInWithPhoneNumber",Se(n,t),Bb)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r extends Bi{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new _r({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new _r({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Fb(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Ub(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return $b(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new _r({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qb(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function jb(n){const e=ni(bs(n)).link,t=e?ni(bs(e)).deep_link_id:null,r=ni(bs(n)).deep_link_id;return(r?ni(bs(r)).link:null)||r||t||e||n}class Ac{constructor(e){const t=ni(bs(e)),r=t.apiKey??null,i=t.oobCode??null,s=qb(t.mode??null);N(r&&i&&s,"argument-error"),this.apiKey=r,this.operation=s,this.code=i,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=jb(e);try{return new Ac(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(){this.providerId=zn.PROVIDER_ID}static credential(e,t){return oo._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Ac.parseLink(t);return N(r,"argument-error"),oo._fromEmailAndCode(e,r.code,r.tenantId)}}zn.PROVIDER_ID="password";zn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";zn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i extends sn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class oi extends $i{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return N("providerId"in t&&"signInMethod"in t,"argument-error"),Ht._fromParams(t)}credential(e){return this._credential({...e,nonce:e.rawNonce})}_credential(e){return N(e.idToken||e.accessToken,"argument-error"),Ht._fromParams({...e,providerId:this.providerId,signInMethod:this.providerId})}static credentialFromResult(e){return oi.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return oi.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:i,pendingToken:s,nonce:o,providerId:c}=e;if(!r&&!i&&!t&&!s||!c)return null;try{return new oi(c)._credential({idToken:t,accessToken:r,nonce:o,pendingToken:s})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt extends $i{constructor(){super("facebook.com")}static credential(e){return Ht._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Bt.credential(e.oauthAccessToken)}catch{return null}}}Bt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Bt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends $i{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ht._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return St.credential(t,r)}catch{return null}}}St.GOOGLE_SIGN_IN_METHOD="google.com";St.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends $i{constructor(){super("github.com")}static credential(e){return Ht._fromParams({providerId:Rt.PROVIDER_ID,signInMethod:Rt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Rt.credentialFromTaggedObject(e)}static credentialFromError(e){return Rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Rt.credential(e.oauthAccessToken)}catch{return null}}}Rt.GITHUB_SIGN_IN_METHOD="github.com";Rt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zb="http://localhost";class pi extends Bi{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){const t=this.buildRequest();return Yt(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Yt(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Yt(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,pendingToken:s}=t;return!r||!i||!s||r!==i?null:new pi(r,s)}static _create(e,t){return new pi(e,t)}buildRequest(){return{requestUri:zb,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gb="saml.";class Qa extends sn{constructor(e){N(e.startsWith(Gb),"argument-error"),super(e)}static credentialFromResult(e){return Qa.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return Qa.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=pi.fromJSON(e);return N(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:r}=e;if(!t||!r)return null;try{return pi._create(r,t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt extends $i{constructor(){super("twitter.com")}static credential(e,t){return Ht._fromParams({providerId:Pt.PROVIDER_ID,signInMethod:Pt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Pt.credentialFromTaggedObject(e)}static credentialFromError(e){return Pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Pt.credential(t,r)}catch{return null}}}Pt.TWITTER_SIGN_IN_METHOD="twitter.com";Pt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function V_(n,e){return rn(n,"POST","/v1/accounts:signUp",Se(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await Ct._fromIdTokenResponse(e,r,i),o=Rp(r);return new vt({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Rp(r);return new vt({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Rp(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wb(n){if(ye(n.app))return Promise.reject(qe(n));const e=Te(n);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new vt({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await V_(e,{returnSecureToken:!0}),r=await vt._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja extends st{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Ja.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Ja(e,t,r,i)}}function x_(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ja._fromErrorAndOperation(n,s,e,r):s})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N_(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hb(n,e){const t=G(n);await bc(!0,t,e);const{providerUserInfo:r}=await KA(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),i=N_(r||[]);return t.providerData=t.providerData.filter(s=>i.has(s.providerId)),i.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function Ih(n,e,t=!1){const r=await en(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return vt._forOperation(n,"link",r)}async function bc(n,e,t){await so(e);const r=N_(e.providerData),i=n===!1?"provider-already-linked":"no-such-provider";N(r.has(t)===n,e.auth,i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function O_(n,e,t=!1){const{auth:r}=n;if(ye(r.app))return Promise.reject(qe(r));const i="reauthenticate";try{const s=await en(n,x_(r,i,e,n),t);N(s.idToken,r,"internal-error");const o=Ec(s.idToken);N(o,r,"internal-error");const{sub:c}=o;return N(n.uid===c,r,"user-mismatch"),vt._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&je(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function M_(n,e,t=!1){if(ye(n.app))return Promise.reject(qe(n));const r="signIn",i=await x_(n,r,e),s=await vt._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Sc(n,e){return M_(Te(n),e)}async function L_(n,e){const t=G(n);return await bc(!1,t,e.providerId),Ih(t,e)}async function F_(n,e){return O_(G(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kb(n,e){return rn(n,"POST","/v1/accounts:signInWithCustomToken",Se(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qb(n,e){if(ye(n.app))return Promise.reject(qe(n));const t=Te(n),r=await Kb(t,{token:e,returnSecureToken:!0}),i=await vt._fromIdTokenResponse(t,"signIn",r);return await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?wh._fromServerResponse(e,t):"totpInfo"in t?vh._fromServerResponse(e,t):je(e,"internal-error")}}class wh extends Vo{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new wh(t)}}class vh extends Vo{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new vh(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rc(n,e,t){N(t.url?.length>0,n,"invalid-continue-uri"),N(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),N(typeof t.linkDomain>"u"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(N(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(N(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Eh(n){const e=Te(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function U_(n,e,t){const r=Te(n),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&Rc(r,i,t),await Rn(r,i,"getOobCode",Vb,"EMAIL_PASSWORD_PROVIDER")}async function Jb(n,e,t){await D_(G(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Eh(n),r})}async function Yb(n,e){await Cb(G(n),{oobCode:e})}async function B_(n,e){const t=G(n),r=await D_(t,{oobCode:e}),i=r.requestType;switch(N(i,t,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":N(r.newEmail,t,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":N(r.mfaInfo,t,"internal-error");default:N(r.email,t,"internal-error")}let s=null;return r.mfaInfo&&(s=Vo._fromServerResponse(Te(t),r.mfaInfo)),{data:{email:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.newEmail:r.email)||null,previousEmail:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.email:r.newEmail)||null,multiFactorInfo:s},operation:i}}async function Xb(n,e){const{data:t}=await B_(G(n),e);return t.email}async function $_(n,e,t){if(ye(n.app))return Promise.reject(qe(n));const r=Te(n),o=await Rn(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",V_,"EMAIL_PASSWORD_PROVIDER").catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Eh(n),u}),c=await vt._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function q_(n,e,t){return ye(n.app)?Promise.reject(qe(n)):Sc(G(n),zn.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Eh(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function j_(n,e,t){const r=Te(n),i={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function s(o,c){N(c.handleCodeInApp,r,"argument-error"),c&&Rc(r,o,c)}s(i,t),await Rn(r,i,"getOobCode",xb,"EMAIL_PASSWORD_PROVIDER")}function Zb(n,e){return Ac.parseLink(e)?.operation==="EMAIL_SIGNIN"}async function z_(n,e,t){if(ye(n.app))return Promise.reject(qe(n));const r=G(n),i=zn.credentialWithLink(e,t||io());return N(i._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),Sc(r,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eS(n,e){return Re(n,"POST","/v1/accounts:createAuthUri",Se(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tS(n,e){const t=gh()?io():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:i}=await eS(G(n),r);return i||[]}async function nS(n,e){const t=G(n),i={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&Rc(t.auth,i,e);const{email:s}=await Db(t.auth,i);s!==n.email&&await n.reload()}async function rS(n,e,t){const r=G(n),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&Rc(r.auth,s,t);const{email:o}=await Nb(r.auth,s);o!==n.email&&await n.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iS(n,e){return Re(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function G_(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=G(n),s={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await en(r,iS(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const c=r.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=r.displayName,c.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function sS(n,e){const t=G(n);return ye(t.auth.app)?Promise.reject(qe(t.auth)):W_(t,e,null)}function oS(n,e){return W_(G(n),null,e)}async function W_(n,e,t){const{auth:r}=n,s={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(s.email=e),t&&(s.password=t);const o=await en(n,Rb(r,s));await n._updateTokensIfNecessary(o,!0)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aS(n){if(!n)return null;const{providerId:e}=n,t=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},r=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!e&&n?.idToken){const i=Ec(n.idToken)?.firebase?.sign_in_provider;if(i){const s=i!=="anonymous"&&i!=="custom"?i:null;return new ai(r,s)}}if(!e)return null;switch(e){case"facebook.com":return new cS(r,t);case"github.com":return new uS(r,t);case"google.com":return new lS(r,t);case"twitter.com":return new hS(r,t,n.screenName||null);case"custom":case"anonymous":return new ai(r,null);default:return new ai(r,e,t)}}class ai{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class H_ extends ai{constructor(e,t,r,i){super(e,t,r),this.username=i}}class cS extends ai{constructor(e,t){super(e,"facebook.com",t)}}class uS extends H_{constructor(e,t){super(e,"github.com",t,typeof t?.login=="string"?t?.login:null)}}class lS extends ai{constructor(e,t){super(e,"google.com",t)}}class hS extends H_{constructor(e,t,r){super(e,"twitter.com",t,r)}}function dS(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:aS(t)}function fS(n,e,t,r){return G(n).onIdTokenChanged(e,t,r)}function pS(n,e,t){return G(n).beforeAuthStateChanged(e,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,t,r){this.type=e,this.credential=t,this.user=r}static _fromIdtoken(e,t){return new hr("enroll",e,t)}static _fromMfaPendingCredential(e){return new hr("signin",e)}toJSON(){return{multiFactorSession:{[this.type==="enroll"?"idToken":"pendingCredential"]:this.credential}}}static fromJSON(e){if(e?.multiFactorSession){if(e.multiFactorSession?.pendingCredential)return hr._fromMfaPendingCredential(e.multiFactorSession.pendingCredential);if(e.multiFactorSession?.idToken)return hr._fromIdtoken(e.multiFactorSession.idToken)}return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(e,t,r){this.session=e,this.hints=t,this.signInResolver=r}static _fromError(e,t){const r=Te(e),i=t.customData._serverResponse,s=(i.mfaInfo||[]).map(c=>Vo._fromServerResponse(r,c));N(i.mfaPendingCredential,r,"internal-error");const o=hr._fromMfaPendingCredential(i.mfaPendingCredential);return new Th(o,s,async c=>{const u=await c._process(r,o);delete i.mfaInfo,delete i.mfaPendingCredential;const l={...i,idToken:u.idToken,refreshToken:u.refreshToken};switch(t.operationType){case"signIn":const d=await vt._fromIdTokenResponse(r,t.operationType,l);return await r._updateCurrentUser(d.user),d;case"reauthenticate":return N(t.user,r,"internal-error"),vt._forOperation(t.user,t.operationType,l);default:je(r,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function mS(n,e){const t=G(n),r=e;return N(e.customData.operationType,t,"argument-error"),N(r.customData._serverResponse?.mfaPendingCredential,t,"argument-error"),Th._fromError(t,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pp(n,e){return Re(n,"POST","/v2/accounts/mfaEnrollment:start",Se(n,e))}function gS(n,e){return Re(n,"POST","/v2/accounts/mfaEnrollment:finalize",Se(n,e))}function _S(n,e){return Re(n,"POST","/v2/accounts/mfaEnrollment:withdraw",Se(n,e))}class Ah{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(r=>Vo._fromServerResponse(e.auth,r)))})}static _fromUser(e){return new Ah(e)}async getSession(){return hr._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){const r=e,i=await this.getSession(),s=await en(this.user,r._process(this.user.auth,i,t));return await this.user._updateTokensIfNecessary(s),this.user.reload()}async unenroll(e){const t=typeof e=="string"?e:e.uid,r=await this.user.getIdToken();try{const i=await en(this.user,_S(this.user.auth,{idToken:r,mfaEnrollmentId:t}));this.enrolledFactors=this.enrolledFactors.filter(({uid:s})=>s!==t),await this.user._updateTokensIfNecessary(i),await this.user.reload()}catch(i){throw i}}}const qu=new WeakMap;function yS(n){const e=G(n);return qu.has(e)||qu.set(e,Ah._fromUser(e)),qu.get(e)}const Ya="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K_{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ya,"1"),this.storage.removeItem(Ya),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IS=1e3,wS=10;class Q_ extends K_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=b_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);ib()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,wS):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},IS)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Q_.type="LOCAL";const xo=Q_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J_ extends K_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}J_.type="SESSION";const On=J_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vS(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Pc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(o).map(async l=>l(t.origin,s)),u=await vS(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Pc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function No(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ES{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,u)=>{const l=No("",20);i.port1.start();const d=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(p){const m=p;if(m.data.eventId===l)switch(m.data.status){case"ack":clearTimeout(d),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(m.data.response);break;default:clearTimeout(d),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(){return window}function TS(n){xe().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bh(){return typeof xe().WorkerGlobalScope<"u"&&typeof xe().importScripts=="function"}async function AS(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function bS(){return navigator?.serviceWorker?.controller||null}function SS(){return bh()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y_="firebaseLocalStorageDb",RS=1,Xa="firebaseLocalStorage",X_="fbase_key";class Oo{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Cc(n,e){return n.transaction([Xa],e?"readwrite":"readonly").objectStore(Xa)}function PS(){const n=indexedDB.deleteDatabase(Y_);return new Oo(n).toPromise()}function ml(){const n=indexedDB.open(Y_,RS);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Xa,{keyPath:X_})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Xa)?e(r):(r.close(),await PS(),e(await ml()))})})}async function Cp(n,e,t){const r=Cc(n,!0).put({[X_]:e,value:t});return new Oo(r).toPromise()}async function CS(n,e){const t=Cc(n,!1).get(e),r=await new Oo(t).toPromise();return r===void 0?null:r.value}function kp(n,e){const t=Cc(n,!0).delete(e);return new Oo(t).toPromise()}const kS=800,DS=3;class Z_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ml(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>DS)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return bh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Pc._getInstance(SS()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await AS(),!this.activeServiceWorker)return;this.sender=new ES(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||bS()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ml();return await Cp(e,Ya,"1"),await kp(e,Ya),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Cp(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>CS(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>kp(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Cc(i,!1).getAll();return new Oo(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),kS)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Z_.type="LOCAL";const mi=Z_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dp(n,e){return Re(n,"POST","/v2/accounts/mfaSignIn:start",Se(n,e))}function VS(n,e){return Re(n,"POST","/v2/accounts/mfaSignIn:finalize",Se(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ju=R_("rcb"),xS=new Po(3e4,6e4);class NS{constructor(){this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!xe().grecaptcha?.render}load(e,t=""){return N(OS(t),e,"argument-error"),this.shouldResolveImmediately(t)&&Ip(xe().grecaptcha)?Promise.resolve(xe().grecaptcha):new Promise((r,i)=>{const s=xe().setTimeout(()=>{i(Me(e,"network-request-failed"))},xS.get());xe()[ju]=()=>{xe().clearTimeout(s),delete xe()[ju];const c=xe().grecaptcha;if(!c||!Ip(c)){i(Me(e,"internal-error"));return}const u=c.render;c.render=(l,d)=>{const p=u(l,d);return this.counter++,p},this.hostLanguage=t,r(c)};const o=`${hb()}?${Fi({onload:ju,render:"explicit",hl:t})}`;yh(o).catch(()=>{clearTimeout(s),i(Me(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){return!!xe().grecaptcha?.render&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function OS(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class MS{async load(e){return new gb(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs="recaptcha",LS={theme:"light",type:"image"};let FS=class{constructor(e,t,r={...LS}){this.parameters=r,this.type=Fs,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=Te(e),this.isInvisible=this.parameters.size==="invisible",N(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof t=="string"?document.getElementById(t):t;N(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new MS:new NS,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(i=>{const s=o=>{o&&(this.tokenChangeListeners.delete(s),i(o))};this.tokenChangeListeners.add(s),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){N(!this.parameters.sitekey,this.auth,"argument-error"),N(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),N(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=xe()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){N(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){N(gh()&&!bh(),this.auth,"internal-error"),await US(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await WA(this.auth);N(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return N(this.recaptcha,this.auth,"internal-error"),this.recaptcha}};function US(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sh{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=_r._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function BS(n,e,t){if(ye(n.app))return Promise.reject(qe(n));const r=Te(n),i=await kc(r,e,G(t));return new Sh(i,s=>Sc(r,s))}async function $S(n,e,t){const r=G(n);await bc(!1,r,"phone");const i=await kc(r.auth,e,G(t));return new Sh(i,s=>L_(r,s))}async function qS(n,e,t){const r=G(n);if(ye(r.auth.app))return Promise.reject(qe(r.auth));const i=await kc(r.auth,e,G(t));return new Sh(i,s=>F_(r,s))}async function kc(n,e,t){if(!n._getRecaptchaConfig())try{await Eb(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){const i=r.session;if("phoneNumber"in r){N(i.type==="enroll",n,"internal-error");const s={idToken:i.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await Rn(n,s,"mfaSmsEnrollment",async(l,d)=>{if(d.phoneEnrollmentInfo.captchaResponse===Ls){N(t?.type===Fs,l,"argument-error");const p=await zu(l,d,t);return Pp(l,p)}return Pp(l,d)},"PHONE_PROVIDER").catch(l=>Promise.reject(l))).phoneSessionInfo.sessionInfo}else{N(i.type==="signin",n,"internal-error");const s=r.multiFactorHint?.uid||r.multiFactorUid;N(s,n,"missing-multi-factor-info");const o={mfaPendingCredential:i.credential,mfaEnrollmentId:s,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await Rn(n,o,"mfaSmsSignIn",async(d,p)=>{if(p.phoneSignInInfo.captchaResponse===Ls){N(t?.type===Fs,d,"argument-error");const m=await zu(d,p,t);return Dp(d,m)}return Dp(d,p)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).phoneResponseInfo.sessionInfo}}else{const i={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await Rn(n,i,"sendVerificationCode",async(u,l)=>{if(l.captchaResponse===Ls){N(t?.type===Fs,u,"argument-error");const d=await zu(u,l,t);return Sp(u,d)}return Sp(u,l)},"PHONE_PROVIDER").catch(u=>Promise.reject(u))).sessionInfo}}finally{t?._reset()}}async function jS(n,e){const t=G(n);if(ye(t.auth.app))return Promise.reject(qe(t.auth));await Ih(t,e)}async function zu(n,e,t){N(t.type===Fs,n,"argument-error");const r=await t.verify();N(typeof r=="string",n,"argument-error");const i={...e};if("phoneEnrollmentInfo"in i){const s=i.phoneEnrollmentInfo.phoneNumber,o=i.phoneEnrollmentInfo.captchaResponse,c=i.phoneEnrollmentInfo.clientType,u=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:o,clientType:c,recaptchaVersion:u}}),i}else if("phoneSignInInfo"in i){const s=i.phoneSignInInfo.captchaResponse,o=i.phoneSignInInfo.clientType,c=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:o,recaptchaVersion:c}}),i}else return Object.assign(i,{recaptchaToken:r}),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wr=class Aa{constructor(e){this.providerId=Aa.PROVIDER_ID,this.auth=Te(e)}verifyPhoneNumber(e,t){return kc(this.auth,e,G(t))}static credential(e,t){return _r._fromVerification(e,t)}static credentialFromResult(e){const t=e;return Aa.credentialFromTaggedObject(t)}static credentialFromError(e){return Aa.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:r}=e;return t&&r?_r._fromTokenResponse(t,r):null}};wr.PROVIDER_ID="phone";wr.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Or(n,e){return e?mt(e):(N(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh extends Bi{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Yt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Yt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Yt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function zS(n){return M_(n.auth,new Rh(n),n.bypassAuthState)}function GS(n){const{auth:e,user:t}=n;return N(t,e,"internal-error"),O_(t,new Rh(n),n.bypassAuthState)}async function WS(n){const{auth:e,user:t}=n;return N(t,e,"internal-error"),Ih(t,new Rh(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return zS;case"linkViaPopup":case"linkViaRedirect":return WS;case"reauthViaPopup":case"reauthViaRedirect":return GS;default:je(this.auth,"internal-error")}}resolve(e){Nt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Nt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HS=new Po(2e3,1e4);async function ba(n,e,t){if(ye(n.app))return Promise.reject(Me(n,"operation-not-supported-in-this-environment"));const r=Te(n);Ui(n,e,sn);const i=Or(r,t);return new Qt(r,"signInViaPopup",e,i).executeNotNull()}async function KS(n,e,t){const r=G(n);if(ye(r.auth.app))return Promise.reject(Me(r.auth,"operation-not-supported-in-this-environment"));Ui(r.auth,e,sn);const i=Or(r.auth,t);return new Qt(r.auth,"reauthViaPopup",e,i,r).executeNotNull()}async function QS(n,e,t){const r=G(n);Ui(r.auth,e,sn);const i=Or(r.auth,t);return new Qt(r.auth,"linkViaPopup",e,i,r).executeNotNull()}class Qt extends ey{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Qt.currentPopupAction&&Qt.currentPopupAction.cancel(),Qt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return N(e,this.auth,"internal-error"),e}async onExecution(){Nt(this.filter.length===1,"Popup operations only handle one event");const e=No();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Me(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Me(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Qt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Me(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,HS.get())};e()}}Qt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JS="pendingRedirect",Us=new Map;class YS extends ey{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Us.get(this.auth._key());if(!e){try{const r=await XS(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Us.set(this.auth._key(),e)}return this.bypassAuthState||Us.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function XS(n,e){const t=ny(e),r=ty(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}async function Ph(n,e){return ty(n)._set(ny(e),"true")}function ZS(){Us.clear()}function Ch(n,e){Us.set(n._key(),e)}function ty(n){return mt(n._redirectPersistence)}function ny(n){return gr(JS,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eR(n,e,t){return tR(n,e,t)}async function tR(n,e,t){if(ye(n.app))return Promise.reject(qe(n));const r=Te(n);Ui(n,e,sn),await r._initializationPromise;const i=Or(r,t);return await Ph(i,r),i._openRedirect(r,e,"signInViaRedirect")}function nR(n,e,t){return rR(n,e,t)}async function rR(n,e,t){const r=G(n);if(Ui(r.auth,e,sn),ye(r.auth.app))return Promise.reject(qe(r.auth));await r.auth._initializationPromise;const i=Or(r.auth,t);await Ph(i,r.auth);const s=await ry(r);return i._openRedirect(r.auth,e,"reauthViaRedirect",s)}function iR(n,e,t){return sR(n,e,t)}async function sR(n,e,t){const r=G(n);Ui(r.auth,e,sn),await r.auth._initializationPromise;const i=Or(r.auth,t);await bc(!1,r,e.providerId),await Ph(i,r.auth);const s=await ry(r);return i._openRedirect(r.auth,e,"linkViaRedirect",s)}async function oR(n,e){return await Te(n)._initializationPromise,Dc(n,e,!1)}async function Dc(n,e,t=!1){if(ye(n.app))return Promise.reject(qe(n));const r=Te(n),i=Or(r,e),o=await new YS(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}async function ry(n){const e=No(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aR=600*1e3;class iy{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cR(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!sy(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Me(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=aR&&this.cachedEventUids.clear(),this.cachedEventUids.has(Vp(e))}saveEventToCache(e){this.cachedEventUids.add(Vp(e)),this.lastProcessedEventTime=Date.now()}}function Vp(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function sy({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function cR(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return sy(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oy(n,e={}){return Re(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uR=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,lR=/^https?/;async function hR(n){if(n.config.emulator)return;const{authorizedDomains:e}=await oy(n);for(const t of e)try{if(dR(t))return}catch{}je(n,"unauthorized-domain")}function dR(n){const e=io(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!lR.test(t))return!1;if(uR.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fR=new Po(3e4,6e4);function xp(){const n=xe().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function pR(n){return new Promise((e,t)=>{function r(){xp(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{xp(),t(Me(n,"network-request-failed"))},timeout:fR.get()})}if(xe().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(xe().gapi?.load)r();else{const i=R_("iframefcb");return xe()[i]=()=>{gapi.load?r():t(Me(n,"network-request-failed"))},yh(`${fb()}?onload=${i}`).catch(s=>t(s))}}).catch(e=>{throw Sa=null,e})}let Sa=null;function mR(n){return Sa=Sa||pR(n),Sa}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gR=new Po(5e3,15e3),_R="__/auth/iframe",yR="emulator/auth/iframe",IR={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},wR=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function vR(n){const e=n.config;N(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?_h(e,yR):`https://${n.config.authDomain}/${_R}`,r={apiKey:e.apiKey,appName:n.name,v:jn},i=wR.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Fi(r).slice(1)}`}async function ER(n){const e=await mR(n),t=xe().gapi;return N(t,n,"internal-error"),e.open({where:document.body,url:vR(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:IR,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Me(n,"network-request-failed"),c=xe().setTimeout(()=>{s(o)},gR.get());function u(){xe().clearTimeout(c),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TR={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},AR=500,bR=600,SR="_blank",RR="http://localhost";class Np{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function PR(n,e,t,r=AR,i=bR){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...TR,width:r.toString(),height:i.toString(),top:s,left:o},l=Ee().toLowerCase();t&&(c=v_(l)?SR:t),I_(l)&&(e=e||RR,u.scrollbars="yes");const d=Object.entries(u).reduce((m,[w,C])=>`${m}${w}=${C},`,"");if(rb(l)&&c!=="_self")return CR(e||"",c),new Np(null);const p=window.open(e||"",c,d);N(p,n,"popup-blocked");try{p.focus()}catch{}return new Np(p)}function CR(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kR="__/auth/handler",DR="emulator/auth/handler",VR=encodeURIComponent("fac");async function gl(n,e,t,r,i,s){N(n.config.authDomain,n,"auth-domain-config-required"),N(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:jn,eventId:i};if(e instanceof sn){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",wT(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries(s||{}))o[d]=p}if(e instanceof $i){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const u=await n._getAppCheckToken(),l=u?`#${VR}=${encodeURIComponent(u)}`:"";return`${xR(n)}?${Fi(c).slice(1)}${l}`}function xR({config:n}){return n.emulator?_h(n,DR):`https://${n.authDomain}/${kR}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gu="webStorageSupport";class NR{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=On,this._completeRedirectFn=Dc,this._overrideRedirectResult=Ch}async _openPopup(e,t,r,i){Nt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await gl(e,t,r,io(),i);return PR(e,s,No())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await gl(e,t,r,io(),i);return TS(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Nt(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await ER(e),r=new iy(e);return t.register("authEvent",i=>(N(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Gu,{type:Gu},i=>{const s=i?.[0]?.[Gu];s!==void 0&&t(!!s),je(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=hR(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return b_()||w_()||ko()}}const ay=NR;class OR{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return $t("unexpected MultiFactorSessionType")}}}class kh extends OR{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new kh(e)}_finalizeEnroll(e,t,r){return gS(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return VS(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class cy{constructor(){}static assertion(e){return kh._fromCredential(e)}}cy.FACTOR_ID="phone";var Op="@firebase/auth",Mp="1.12.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MR{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){N(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LR(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function FR(n){Nn(new Wt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;N(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:S_(n)},l=new ub(r,i,s,u);return Ab(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Nn(new Wt("auth-internal",e=>{const t=Te(e.getProvider("auth").getImmediate());return(r=>new MR(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),kt(Op,Mp,LR(n)),kt(Op,Mp,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UR=300,BR=zg("authIdTokenMaxAge")||UR;let Lp=null;const $R=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>BR)return;const i=t?.token;Lp!==i&&(Lp=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function qR(n=dh()){const e=Ro(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Tb(n,{popupRedirectResolver:ay,persistence:[mi,xo,On]}),r=zg("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=$R(s.toString());pS(t,o,()=>o(t.currentUser)),fS(t,c=>o(c))}}const i=jg("auth");return i&&C_(t,`http://${i}`),t}function jR(){return document.getElementsByTagName("head")?.[0]??document}lb({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=Me("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",jR().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});FR("Browser");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zR{constructor(e,t){this._delegate=e,this.firebase=t,no(e,new Wt("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),fh(this._delegate)))}_getService(e,t=Vn){this._delegate.checkDestroyed();const r=this._delegate.container.getProvider(e);return!r.isInitialized()&&r.getComponent()?.instantiationMode==="EXPLICIT"&&r.initialize(),r.getImmediate({identifier:t})}_removeServiceInstance(e,t=Vn){this._delegate.container.getProvider(e).clearInstance(t)}_addComponent(e){no(this._delegate,e)}_addOrOverwriteComponent(e){r_(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GR={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},Fp=new Nr("app-compat","Firebase",GR);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WR(n){const e={},t={__esModule:!0,initializeApp:s,app:i,registerVersion:kt,setLogLevel:a_,onLog:o_,apps:null,SDK_VERSION:jn,INTERNAL:{registerComponent:c,removeApp:r,useAsService:u,modularAPIs:NA}};t.default=t,Object.defineProperty(t,"apps",{get:o});function r(l){delete e[l]}function i(l){if(l=l||Vn,!up(e,l))throw Fp.create("no-app",{appName:l});return e[l]}i.App=n;function s(l,d={}){const p=hh(l,d);if(up(e,p.name))return e[p.name];const m=new n(p,t);return e[p.name]=m,m}function o(){return Object.keys(e).map(l=>e[l])}function c(l){const d=l.name,p=d.replace("-compat","");if(Nn(l)&&l.type==="PUBLIC"){const m=(w=i())=>{if(typeof w[p]!="function")throw Fp.create("invalid-app-argument",{appName:d});return w[p]()};l.serviceProps!==void 0&&Ga(m,l.serviceProps),t[p]=m,n.prototype[p]=function(...w){return this._getService.bind(this,d).apply(this,l.multipleInstances?w:[])}}return l.type==="PUBLIC"?t[p]:null}function u(l,d){return d==="serverAuth"?null:d}return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uy(){const n=WR(zR);n.INTERNAL={...n.INTERNAL,createFirebaseNamespace:uy,extendNamespace:e,createSubscribe:Xg,ErrorFactory:Nr,deepExtend:Ga};function e(t){Ga(n,t)}return n}const HR=uy();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Up=new vc("@firebase/app-compat"),KR="@firebase/app-compat",QR="0.5.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JR(n){kt(KR,QR,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */try{const n=sh();if(n.firebase!==void 0){Up.warn(`
      Warning: Firebase is already defined in the global scope. Please make sure
      Firebase library is only loaded once.
    `);const e=n.firebase.SDK_VERSION;e&&e.indexOf("LITE")>=0&&Up.warn(`
        Warning: You are trying to load Firebase while using Firebase Performance standalone script.
        You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
        `)}}catch{}const vr=HR;JR();var YR="firebase",XR="12.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vr.registerVersion(YR,XR,"app-compat");/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Er(){return window}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZR=2e3;async function eP(n,e,t){const{BuildInfo:r}=Er();Nt(e.sessionId,"AuthEvent did not contain a session ID");const i=await sP(e.sessionId),s={};return ko()?s.ibi=r.packageName:Co()?s.apn=r.packageName:je(n,"operation-not-supported-in-this-environment"),r.displayName&&(s.appDisplayName=r.displayName),s.sessionId=i,gl(n,t,e.type,void 0,e.eventId??void 0,s)}async function tP(n){const{BuildInfo:e}=Er(),t={};ko()?t.iosBundleId=e.packageName:Co()?t.androidPackageName=e.packageName:je(n,"operation-not-supported-in-this-environment"),await oy(n,t)}function nP(n){const{cordova:e}=Er();return new Promise(t=>{e.plugins.browsertab.isAvailable(r=>{let i=null;r?e.plugins.browsertab.openUrl(n):i=e.InAppBrowser.open(n,nb()?"_blank":"_system","location=yes"),t(i)})})}async function rP(n,e,t){const{cordova:r}=Er();let i=()=>{};try{await new Promise((s,o)=>{let c=null;function u(){s();const p=r.plugins.browsertab?.close;typeof p=="function"&&p(),typeof t?.close=="function"&&t.close()}function l(){c||(c=window.setTimeout(()=>{o(Me(n,"redirect-cancelled-by-user"))},ZR))}function d(){document?.visibilityState==="visible"&&l()}e.addPassiveListener(u),document.addEventListener("resume",l,!1),Co()&&document.addEventListener("visibilitychange",d,!1),i=()=>{e.removePassiveListener(u),document.removeEventListener("resume",l,!1),document.removeEventListener("visibilitychange",d,!1),c&&window.clearTimeout(c)}})}finally{i()}}function iP(n){const e=Er();N(typeof e?.universalLinks?.subscribe=="function",n,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),N(typeof e?.BuildInfo?.packageName<"u",n,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),N(typeof e?.cordova?.plugins?.browsertab?.openUrl=="function",n,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),N(typeof e?.cordova?.plugins?.browsertab?.isAvailable=="function",n,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),N(typeof e?.cordova?.InAppBrowser?.open=="function",n,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}async function sP(n){const e=oP(n),t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(i=>i.toString(16).padStart(2,"0")).join("")}function oP(n){if(Nt(/[0-9a-zA-Z]+/.test(n),"Can only convert alpha-numeric strings"),typeof TextEncoder<"u")return new TextEncoder().encode(n);const e=new ArrayBuffer(n.length),t=new Uint8Array(e);for(let r=0;r<n.length;r++)t[r]=n.charCodeAt(r);return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aP=20;class cP extends iy{constructor(){super(...arguments),this.passiveListeners=new Set,this.initPromise=new Promise(e=>{this.resolveInitialized=e})}addPassiveListener(e){this.passiveListeners.add(e)}removePassiveListener(e){this.passiveListeners.delete(e)}resetRedirect(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1}onEvent(e){return this.resolveInitialized(),this.passiveListeners.forEach(t=>t(e)),super.onEvent(e)}async initialized(){await this.initPromise}}function uP(n,e,t=null){return{type:e,eventId:t,urlResponse:null,sessionId:dP(),postBody:null,tenantId:n.tenantId,error:Me(n,"no-auth-event")}}function lP(n,e){return _l()._set(yl(n),e)}async function Bp(n){const e=await _l()._get(yl(n));return e&&await _l()._remove(yl(n)),e}function hP(n,e){const t=pP(e);if(t.includes("/__/auth/callback")){const r=Ra(t),s=(r.firebaseError?fP(decodeURIComponent(r.firebaseError)):null)?.code?.split("auth/")?.[1],o=s?Me(s):null;return o?{type:n.type,eventId:n.eventId,tenantId:n.tenantId,error:o,urlResponse:null,sessionId:null,postBody:null}:{type:n.type,eventId:n.eventId,tenantId:n.tenantId,sessionId:n.sessionId,urlResponse:t,postBody:null}}return null}function dP(){const n=[],e="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let t=0;t<aP;t++){const r=Math.floor(Math.random()*e.length);n.push(e.charAt(r))}return n.join("")}function _l(){return mt(xo)}function yl(n){return gr("authEvent",n.config.apiKey,n.name)}function fP(n){try{return JSON.parse(n)}catch{return null}}function pP(n){const e=Ra(n),t=e.link?decodeURIComponent(e.link):void 0,r=Ra(t).link,i=e.deep_link_id?decodeURIComponent(e.deep_link_id):void 0;return Ra(i).link||i||r||t||n}function Ra(n){if(!n?.includes("?"))return{};const[e,...t]=n.split("?");return ni(t.join("?"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mP=500;class gP{constructor(){this._redirectPersistence=On,this._shouldInitProactively=!0,this.eventManagers=new Map,this.originValidationPromises={},this._completeRedirectFn=Dc,this._overrideRedirectResult=Ch}async _initialize(e){const t=e._key();let r=this.eventManagers.get(t);return r||(r=new cP(e),this.eventManagers.set(t,r),this.attachCallbackListeners(e,r)),r}_openPopup(e){je(e,"operation-not-supported-in-this-environment")}async _openRedirect(e,t,r,i){iP(e);const s=await this._initialize(e);await s.initialized(),s.resetRedirect(),ZS(),await this._originValidation(e);const o=uP(e,r,i);await lP(e,o);const c=await eP(e,o,t),u=await nP(c);return rP(e,s,u)}_isIframeWebStorageSupported(e,t){throw new Error("Method not implemented.")}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=tP(e)),this.originValidationPromises[t]}attachCallbackListeners(e,t){const{universalLinks:r,handleOpenURL:i,BuildInfo:s}=Er(),o=setTimeout(async()=>{await Bp(e),t.onEvent($p())},mP),c=async d=>{clearTimeout(o);const p=await Bp(e);let m=null;p&&d?.url&&(m=hP(p,d.url)),t.onEvent(m||$p())};typeof r<"u"&&typeof r.subscribe=="function"&&r.subscribe(null,c);const u=i,l=`${s.packageName.toLowerCase()}://`;Er().handleOpenURL=async d=>{if(d.toLowerCase().startsWith(l)&&c({url:d}),typeof u=="function")try{u(d)}catch(p){console.error(p)}}}}const _P=gP;function $p(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:Me("no-auth-event")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yP(n,e){Te(n)._logFramework(e)}var IP="@firebase/auth-compat",wP="0.6.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vP=1e3;function Bs(){return self?.location?.protocol||null}function EP(){return Bs()==="http:"||Bs()==="https:"}function ly(n=Ee()){return!!((Bs()==="file:"||Bs()==="ionic:"||Bs()==="capacitor:")&&n.toLowerCase().match(/iphone|ipad|ipod|android/))}function TP(){return ah()||wc()}function AP(){return Qg()&&document?.documentMode===11}function bP(n=Ee()){return/Edge\/\d+/.test(n)}function SP(n=Ee()){return AP()||bP(n)}function hy(){try{const n=self.localStorage,e=No();if(n)return n.setItem(e,"1"),n.removeItem(e),SP()?to():!0}catch{return Dh()&&to()}return!1}function Dh(){return typeof global<"u"&&"WorkerGlobalScope"in global&&"importScripts"in global}function Wu(){return(EP()||Kg()||ly())&&!TP()&&hy()&&!Dh()}function dy(){return ly()&&typeof document<"u"}async function RP(){return dy()?new Promise(n=>{const e=setTimeout(()=>{n(!1)},vP);document.addEventListener("deviceready",()=>{clearTimeout(e),n(!0)})}):!1}function PP(){return typeof window<"u"?window:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt={LOCAL:"local",NONE:"none",SESSION:"session"},gs=N,fy="persistence";function CP(n,e){if(gs(Object.values(pt).includes(e),n,"invalid-persistence-type"),ah()){gs(e!==pt.SESSION,n,"unsupported-persistence-type");return}if(wc()){gs(e===pt.NONE,n,"unsupported-persistence-type");return}if(Dh()){gs(e===pt.NONE||e===pt.LOCAL&&to(),n,"unsupported-persistence-type");return}gs(e===pt.NONE||hy(),n,"unsupported-persistence-type")}async function Il(n){await n._initializationPromise;const e=py(),t=gr(fy,n.config.apiKey,n.name);e&&e.setItem(t,n._getPersistenceType())}function kP(n,e){const t=py();if(!t)return[];const r=gr(fy,n,e);switch(t.getItem(r)){case pt.NONE:return[fi];case pt.LOCAL:return[mi,On];case pt.SESSION:return[On];default:return[]}}function py(){try{return PP()?.sessionStorage||null}catch{return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DP=N;class En{constructor(){this.browserResolver=mt(ay),this.cordovaResolver=mt(_P),this.underlyingResolver=null,this._redirectPersistence=On,this._completeRedirectFn=Dc,this._overrideRedirectResult=Ch}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,t,r,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,t,r,i)}async _openRedirect(e,t,r,i){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,t,r,i)}_isIframeWebStorageSupported(e,t){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,t)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return dy()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return DP(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;const e=await RP();this.underlyingResolver=e?this.cordovaResolver:this.browserResolver}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function my(n){return n.unwrap()}function VP(n){return n.wrapped()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xP(n){return gy(n)}function NP(n,e){const t=e.customData?._tokenResponse;if(e?.code==="auth/multi-factor-auth-required"){const r=e;r.resolver=new OP(n,mS(n,e))}else if(t){const r=gy(e),i=e;r&&(i.credential=r,i.tenantId=t.tenantId||void 0,i.email=t.email||void 0,i.phoneNumber=t.phoneNumber||void 0)}}function gy(n){const{_tokenResponse:e}=n instanceof st?n.customData:n;if(!e)return null;if(!(n instanceof st)&&"temporaryProof"in e&&"phoneNumber"in e)return wr.credentialFromResult(n);const t=e.providerId;if(!t||t===ps.PASSWORD)return null;let r;switch(t){case ps.GOOGLE:r=St;break;case ps.FACEBOOK:r=Bt;break;case ps.GITHUB:r=Rt;break;case ps.TWITTER:r=Pt;break;default:const{oauthIdToken:i,oauthAccessToken:s,oauthTokenSecret:o,pendingToken:c,nonce:u}=e;return!s&&!o&&!i&&!c?null:c?t.startsWith("saml.")?pi._create(t,c):Ht._fromParams({providerId:t,signInMethod:t,pendingToken:c,idToken:i,accessToken:s}):new oi(t).credential({idToken:i,accessToken:s,rawNonce:u})}return n instanceof st?r.credentialFromError(n):r.credentialFromResult(n)}function ct(n,e){return e.catch(t=>{throw t instanceof st&&NP(n,t),t}).then(t=>{const r=t.operationType,i=t.user;return{operationType:r,credential:xP(t),additionalUserInfo:dS(t),user:Vc.getOrCreate(i)}})}async function wl(n,e){const t=await e;return{verificationId:t.verificationId,confirm:r=>ct(n,t.confirm(r))}}class OP{constructor(e,t){this.resolver=t,this.auth=VP(e)}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return ct(my(this.auth),this.resolver.resolveSignIn(e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vc=class Rs{constructor(e){this._delegate=e,this.multiFactor=yS(e)}static getOrCreate(e){return Rs.USER_MAP.has(e)||Rs.USER_MAP.set(e,new Rs(e)),Rs.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return ct(this.auth,L_(this._delegate,e))}async linkWithPhoneNumber(e,t){return wl(this.auth,$S(this._delegate,e,t))}async linkWithPopup(e){return ct(this.auth,QS(this._delegate,e,En))}async linkWithRedirect(e){return await Il(Te(this.auth)),iR(this._delegate,e,En)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return ct(this.auth,F_(this._delegate,e))}reauthenticateWithPhoneNumber(e,t){return wl(this.auth,qS(this._delegate,e,t))}reauthenticateWithPopup(e){return ct(this.auth,KS(this._delegate,e,En))}async reauthenticateWithRedirect(e){return await Il(Te(this.auth)),nR(this._delegate,e,En)}sendEmailVerification(e){return nS(this._delegate,e)}async unlink(e){return await Hb(this._delegate,e),this}updateEmail(e){return sS(this._delegate,e)}updatePassword(e){return oS(this._delegate,e)}updatePhoneNumber(e){return jS(this._delegate,e)}updateProfile(e){return G_(this._delegate,e)}verifyBeforeUpdateEmail(e,t){return rS(this._delegate,e,t)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}};Vc.USER_MAP=new WeakMap;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s=N;class vl{constructor(e,t){if(this.app=e,t.isInitialized()){this._delegate=t.getImmediate(),this.linkUnderlyingAuth();return}const{apiKey:r}=e.options;_s(r,"invalid-api-key",{appName:e.name}),_s(r,"invalid-api-key",{appName:e.name});const i=typeof window<"u"?En:void 0;this._delegate=t.initialize({options:{persistence:MP(r,e.name),popupRedirectResolver:i}}),this._delegate._updateErrorMap(MA),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?Vc.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,t){C_(this._delegate,e,t)}applyActionCode(e){return Yb(this._delegate,e)}checkActionCode(e){return B_(this._delegate,e)}confirmPasswordReset(e,t){return Jb(this._delegate,e,t)}async createUserWithEmailAndPassword(e,t){return ct(this._delegate,$_(this._delegate,e,t))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return tS(this._delegate,e)}isSignInWithEmailLink(e){return Zb(this._delegate,e)}async getRedirectResult(){_s(Wu(),this._delegate,"operation-not-supported-in-this-environment");const e=await oR(this._delegate,En);return e?ct(this._delegate,Promise.resolve(e)):{credential:null,user:null}}addFrameworkForLogging(e){yP(this._delegate,e)}onAuthStateChanged(e,t,r){const{next:i,error:s,complete:o}=qp(e,t,r);return this._delegate.onAuthStateChanged(i,s,o)}onIdTokenChanged(e,t,r){const{next:i,error:s,complete:o}=qp(e,t,r);return this._delegate.onIdTokenChanged(i,s,o)}sendSignInLinkToEmail(e,t){return j_(this._delegate,e,t)}sendPasswordResetEmail(e,t){return U_(this._delegate,e,t||void 0)}async setPersistence(e){CP(this._delegate,e);let t;switch(e){case pt.SESSION:t=On;break;case pt.LOCAL:t=await mt(mi)._isAvailable()?mi:xo;break;case pt.NONE:t=fi;break;default:return je("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(t)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return ct(this._delegate,Wb(this._delegate))}signInWithCredential(e){return ct(this._delegate,Sc(this._delegate,e))}signInWithCustomToken(e){return ct(this._delegate,Qb(this._delegate,e))}signInWithEmailAndPassword(e,t){return ct(this._delegate,q_(this._delegate,e,t))}signInWithEmailLink(e,t){return ct(this._delegate,z_(this._delegate,e,t))}signInWithPhoneNumber(e,t){return wl(this._delegate,BS(this._delegate,e,t))}async signInWithPopup(e){return _s(Wu(),this._delegate,"operation-not-supported-in-this-environment"),ct(this._delegate,ba(this._delegate,e,En))}async signInWithRedirect(e){return _s(Wu(),this._delegate,"operation-not-supported-in-this-environment"),await Il(this._delegate),eR(this._delegate,e,En)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return Xb(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}vl.Persistence=pt;function qp(n,e,t){let r=n;typeof n!="function"&&({next:r,error:e,complete:t}=n);const i=r;return{next:o=>i(o&&Vc.getOrCreate(o)),error:e,complete:t}}function MP(n,e){const t=kP(n,e);if(typeof self<"u"&&!t.includes(mi)&&t.push(mi),typeof window<"u")for(const r of[xo,On])t.includes(r)||t.push(r);return t.includes(fi)||t.push(fi),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vh{static credential(e,t){return wr.credential(e,t)}constructor(){this.providerId="phone",this._delegate=new wr(my(vr.auth()))}verifyPhoneNumber(e,t){return this._delegate.verifyPhoneNumber(e,t)}unwrap(){return this._delegate}}Vh.PHONE_SIGN_IN_METHOD=wr.PHONE_SIGN_IN_METHOD;Vh.PROVIDER_ID=wr.PROVIDER_ID;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LP=N;class FP{constructor(e,t,r=vr.app()){LP(r.options?.apiKey,"invalid-api-key",{appName:r.name}),this._delegate=new FS(r.auth(),e,t),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UP="auth-compat";function BP(n){n.INTERNAL.registerComponent(new Wt(UP,e=>{const t=e.getProvider("app-compat").getImmediate(),r=e.getProvider("auth");return new vl(t,r)},"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:zr.EMAIL_SIGNIN,PASSWORD_RESET:zr.PASSWORD_RESET,RECOVER_EMAIL:zr.RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:zr.REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:zr.VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:zr.VERIFY_EMAIL}},EmailAuthProvider:zn,FacebookAuthProvider:Bt,GithubAuthProvider:Rt,GoogleAuthProvider:St,OAuthProvider:oi,SAMLAuthProvider:Qa,PhoneAuthProvider:Vh,PhoneMultiFactorGenerator:cy,RecaptchaVerifier:FP,TwitterAuthProvider:Pt,Auth:vl,AuthCredential:Bi,Error:st}).setInstantiationMode("LAZY").setMultipleInstances(!1)),n.registerVersion(IP,wP)}BP(vr);var jp=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Pn,_y;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,_){function I(){}I.prototype=_.prototype,v.F=_.prototype,v.prototype=new I,v.prototype.constructor=v,v.D=function(T,E,S){for(var y=Array(arguments.length-2),Fe=2;Fe<arguments.length;Fe++)y[Fe-2]=arguments[Fe];return _.prototype[E].apply(T,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,_,I){I||(I=0);const T=Array(16);if(typeof _=="string")for(var E=0;E<16;++E)T[E]=_.charCodeAt(I++)|_.charCodeAt(I++)<<8|_.charCodeAt(I++)<<16|_.charCodeAt(I++)<<24;else for(E=0;E<16;++E)T[E]=_[I++]|_[I++]<<8|_[I++]<<16|_[I++]<<24;_=v.g[0],I=v.g[1],E=v.g[2];let S=v.g[3],y;y=_+(S^I&(E^S))+T[0]+3614090360&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(E^_&(I^E))+T[1]+3905402710&4294967295,S=_+(y<<12&4294967295|y>>>20),y=E+(I^S&(_^I))+T[2]+606105819&4294967295,E=S+(y<<17&4294967295|y>>>15),y=I+(_^E&(S^_))+T[3]+3250441966&4294967295,I=E+(y<<22&4294967295|y>>>10),y=_+(S^I&(E^S))+T[4]+4118548399&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(E^_&(I^E))+T[5]+1200080426&4294967295,S=_+(y<<12&4294967295|y>>>20),y=E+(I^S&(_^I))+T[6]+2821735955&4294967295,E=S+(y<<17&4294967295|y>>>15),y=I+(_^E&(S^_))+T[7]+4249261313&4294967295,I=E+(y<<22&4294967295|y>>>10),y=_+(S^I&(E^S))+T[8]+1770035416&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(E^_&(I^E))+T[9]+2336552879&4294967295,S=_+(y<<12&4294967295|y>>>20),y=E+(I^S&(_^I))+T[10]+4294925233&4294967295,E=S+(y<<17&4294967295|y>>>15),y=I+(_^E&(S^_))+T[11]+2304563134&4294967295,I=E+(y<<22&4294967295|y>>>10),y=_+(S^I&(E^S))+T[12]+1804603682&4294967295,_=I+(y<<7&4294967295|y>>>25),y=S+(E^_&(I^E))+T[13]+4254626195&4294967295,S=_+(y<<12&4294967295|y>>>20),y=E+(I^S&(_^I))+T[14]+2792965006&4294967295,E=S+(y<<17&4294967295|y>>>15),y=I+(_^E&(S^_))+T[15]+1236535329&4294967295,I=E+(y<<22&4294967295|y>>>10),y=_+(E^S&(I^E))+T[1]+4129170786&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^E&(_^I))+T[6]+3225465664&4294967295,S=_+(y<<9&4294967295|y>>>23),y=E+(_^I&(S^_))+T[11]+643717713&4294967295,E=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(E^S))+T[0]+3921069994&4294967295,I=E+(y<<20&4294967295|y>>>12),y=_+(E^S&(I^E))+T[5]+3593408605&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^E&(_^I))+T[10]+38016083&4294967295,S=_+(y<<9&4294967295|y>>>23),y=E+(_^I&(S^_))+T[15]+3634488961&4294967295,E=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(E^S))+T[4]+3889429448&4294967295,I=E+(y<<20&4294967295|y>>>12),y=_+(E^S&(I^E))+T[9]+568446438&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^E&(_^I))+T[14]+3275163606&4294967295,S=_+(y<<9&4294967295|y>>>23),y=E+(_^I&(S^_))+T[3]+4107603335&4294967295,E=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(E^S))+T[8]+1163531501&4294967295,I=E+(y<<20&4294967295|y>>>12),y=_+(E^S&(I^E))+T[13]+2850285829&4294967295,_=I+(y<<5&4294967295|y>>>27),y=S+(I^E&(_^I))+T[2]+4243563512&4294967295,S=_+(y<<9&4294967295|y>>>23),y=E+(_^I&(S^_))+T[7]+1735328473&4294967295,E=S+(y<<14&4294967295|y>>>18),y=I+(S^_&(E^S))+T[12]+2368359562&4294967295,I=E+(y<<20&4294967295|y>>>12),y=_+(I^E^S)+T[5]+4294588738&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^E)+T[8]+2272392833&4294967295,S=_+(y<<11&4294967295|y>>>21),y=E+(S^_^I)+T[11]+1839030562&4294967295,E=S+(y<<16&4294967295|y>>>16),y=I+(E^S^_)+T[14]+4259657740&4294967295,I=E+(y<<23&4294967295|y>>>9),y=_+(I^E^S)+T[1]+2763975236&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^E)+T[4]+1272893353&4294967295,S=_+(y<<11&4294967295|y>>>21),y=E+(S^_^I)+T[7]+4139469664&4294967295,E=S+(y<<16&4294967295|y>>>16),y=I+(E^S^_)+T[10]+3200236656&4294967295,I=E+(y<<23&4294967295|y>>>9),y=_+(I^E^S)+T[13]+681279174&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^E)+T[0]+3936430074&4294967295,S=_+(y<<11&4294967295|y>>>21),y=E+(S^_^I)+T[3]+3572445317&4294967295,E=S+(y<<16&4294967295|y>>>16),y=I+(E^S^_)+T[6]+76029189&4294967295,I=E+(y<<23&4294967295|y>>>9),y=_+(I^E^S)+T[9]+3654602809&4294967295,_=I+(y<<4&4294967295|y>>>28),y=S+(_^I^E)+T[12]+3873151461&4294967295,S=_+(y<<11&4294967295|y>>>21),y=E+(S^_^I)+T[15]+530742520&4294967295,E=S+(y<<16&4294967295|y>>>16),y=I+(E^S^_)+T[2]+3299628645&4294967295,I=E+(y<<23&4294967295|y>>>9),y=_+(E^(I|~S))+T[0]+4096336452&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~E))+T[7]+1126891415&4294967295,S=_+(y<<10&4294967295|y>>>22),y=E+(_^(S|~I))+T[14]+2878612391&4294967295,E=S+(y<<15&4294967295|y>>>17),y=I+(S^(E|~_))+T[5]+4237533241&4294967295,I=E+(y<<21&4294967295|y>>>11),y=_+(E^(I|~S))+T[12]+1700485571&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~E))+T[3]+2399980690&4294967295,S=_+(y<<10&4294967295|y>>>22),y=E+(_^(S|~I))+T[10]+4293915773&4294967295,E=S+(y<<15&4294967295|y>>>17),y=I+(S^(E|~_))+T[1]+2240044497&4294967295,I=E+(y<<21&4294967295|y>>>11),y=_+(E^(I|~S))+T[8]+1873313359&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~E))+T[15]+4264355552&4294967295,S=_+(y<<10&4294967295|y>>>22),y=E+(_^(S|~I))+T[6]+2734768916&4294967295,E=S+(y<<15&4294967295|y>>>17),y=I+(S^(E|~_))+T[13]+1309151649&4294967295,I=E+(y<<21&4294967295|y>>>11),y=_+(E^(I|~S))+T[4]+4149444226&4294967295,_=I+(y<<6&4294967295|y>>>26),y=S+(I^(_|~E))+T[11]+3174756917&4294967295,S=_+(y<<10&4294967295|y>>>22),y=E+(_^(S|~I))+T[2]+718787259&4294967295,E=S+(y<<15&4294967295|y>>>17),y=I+(S^(E|~_))+T[9]+3951481745&4294967295,v.g[0]=v.g[0]+_&4294967295,v.g[1]=v.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,v.g[2]=v.g[2]+E&4294967295,v.g[3]=v.g[3]+S&4294967295}r.prototype.v=function(v,_){_===void 0&&(_=v.length);const I=_-this.blockSize,T=this.C;let E=this.h,S=0;for(;S<_;){if(E==0)for(;S<=I;)i(this,v,S),S+=this.blockSize;if(typeof v=="string"){for(;S<_;)if(T[E++]=v.charCodeAt(S++),E==this.blockSize){i(this,T),E=0;break}}else for(;S<_;)if(T[E++]=v[S++],E==this.blockSize){i(this,T),E=0;break}}this.h=E,this.o+=_},r.prototype.A=function(){var v=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);v[0]=128;for(var _=1;_<v.length-8;++_)v[_]=0;_=this.o*8;for(var I=v.length-8;I<v.length;++I)v[I]=_&255,_/=256;for(this.v(v),v=Array(16),_=0,I=0;I<4;++I)for(let T=0;T<32;T+=8)v[_++]=this.g[I]>>>T&255;return v};function s(v,_){var I=c;return Object.prototype.hasOwnProperty.call(I,v)?I[v]:I[v]=_(v)}function o(v,_){this.h=_;const I=[];let T=!0;for(let E=v.length-1;E>=0;E--){const S=v[E]|0;T&&S==_||(I[E]=S,T=!1)}this.g=I}var c={};function u(v){return-128<=v&&v<128?s(v,function(_){return new o([_|0],_<0?-1:0)}):new o([v|0],v<0?-1:0)}function l(v){if(isNaN(v)||!isFinite(v))return p;if(v<0)return V(l(-v));const _=[];let I=1;for(let T=0;v>=I;T++)_[T]=v/I|0,I*=4294967296;return new o(_,0)}function d(v,_){if(v.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(v.charAt(0)=="-")return V(d(v.substring(1),_));if(v.indexOf("-")>=0)throw Error('number format error: interior "-" character');const I=l(Math.pow(_,8));let T=p;for(let S=0;S<v.length;S+=8){var E=Math.min(8,v.length-S);const y=parseInt(v.substring(S,S+E),_);E<8?(E=l(Math.pow(_,E)),T=T.j(E).add(l(y))):(T=T.j(I),T=T.add(l(y)))}return T}var p=u(0),m=u(1),w=u(16777216);n=o.prototype,n.m=function(){if(k(this))return-V(this).m();let v=0,_=1;for(let I=0;I<this.g.length;I++){const T=this.i(I);v+=(T>=0?T:4294967296+T)*_,_*=4294967296}return v},n.toString=function(v){if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(C(this))return"0";if(k(this))return"-"+V(this).toString(v);const _=l(Math.pow(v,6));var I=this;let T="";for(;;){const E=ee(I,_).g;I=j(I,E.j(_));let S=((I.g.length>0?I.g[0]:I.h)>>>0).toString(v);if(I=E,C(I))return S+T;for(;S.length<6;)S="0"+S;T=S+T}},n.i=function(v){return v<0?0:v<this.g.length?this.g[v]:this.h};function C(v){if(v.h!=0)return!1;for(let _=0;_<v.g.length;_++)if(v.g[_]!=0)return!1;return!0}function k(v){return v.h==-1}n.l=function(v){return v=j(this,v),k(v)?-1:C(v)?0:1};function V(v){const _=v.g.length,I=[];for(let T=0;T<_;T++)I[T]=~v.g[T];return new o(I,~v.h).add(m)}n.abs=function(){return k(this)?V(this):this},n.add=function(v){const _=Math.max(this.g.length,v.g.length),I=[];let T=0;for(let E=0;E<=_;E++){let S=T+(this.i(E)&65535)+(v.i(E)&65535),y=(S>>>16)+(this.i(E)>>>16)+(v.i(E)>>>16);T=y>>>16,S&=65535,y&=65535,I[E]=y<<16|S}return new o(I,I[I.length-1]&-2147483648?-1:0)};function j(v,_){return v.add(V(_))}n.j=function(v){if(C(this)||C(v))return p;if(k(this))return k(v)?V(this).j(V(v)):V(V(this).j(v));if(k(v))return V(this.j(V(v)));if(this.l(w)<0&&v.l(w)<0)return l(this.m()*v.m());const _=this.g.length+v.g.length,I=[];for(var T=0;T<2*_;T++)I[T]=0;for(T=0;T<this.g.length;T++)for(let E=0;E<v.g.length;E++){const S=this.i(T)>>>16,y=this.i(T)&65535,Fe=v.i(E)>>>16,Et=v.i(E)&65535;I[2*T+2*E]+=y*Et,$(I,2*T+2*E),I[2*T+2*E+1]+=S*Et,$(I,2*T+2*E+1),I[2*T+2*E+1]+=y*Fe,$(I,2*T+2*E+1),I[2*T+2*E+2]+=S*Fe,$(I,2*T+2*E+2)}for(v=0;v<_;v++)I[v]=I[2*v+1]<<16|I[2*v];for(v=_;v<2*_;v++)I[v]=0;return new o(I,0)};function $(v,_){for(;(v[_]&65535)!=v[_];)v[_+1]+=v[_]>>>16,v[_]&=65535,_++}function U(v,_){this.g=v,this.h=_}function ee(v,_){if(C(_))throw Error("division by zero");if(C(v))return new U(p,p);if(k(v))return _=ee(V(v),_),new U(V(_.g),V(_.h));if(k(_))return _=ee(v,V(_)),new U(V(_.g),_.h);if(v.g.length>30){if(k(v)||k(_))throw Error("slowDivide_ only works with positive integers.");for(var I=m,T=_;T.l(v)<=0;)I=J(I),T=J(T);var E=B(I,1),S=B(T,1);for(T=B(T,2),I=B(I,2);!C(T);){var y=S.add(T);y.l(v)<=0&&(E=E.add(I),S=y),T=B(T,1),I=B(I,1)}return _=j(v,E.j(_)),new U(E,_)}for(E=p;v.l(_)>=0;){for(I=Math.max(1,Math.floor(v.m()/_.m())),T=Math.ceil(Math.log(I)/Math.LN2),T=T<=48?1:Math.pow(2,T-48),S=l(I),y=S.j(_);k(y)||y.l(v)>0;)I-=T,S=l(I),y=S.j(_);C(S)&&(S=m),E=E.add(S),v=j(v,y)}return new U(E,v)}n.B=function(v){return ee(this,v).h},n.and=function(v){const _=Math.max(this.g.length,v.g.length),I=[];for(let T=0;T<_;T++)I[T]=this.i(T)&v.i(T);return new o(I,this.h&v.h)},n.or=function(v){const _=Math.max(this.g.length,v.g.length),I=[];for(let T=0;T<_;T++)I[T]=this.i(T)|v.i(T);return new o(I,this.h|v.h)},n.xor=function(v){const _=Math.max(this.g.length,v.g.length),I=[];for(let T=0;T<_;T++)I[T]=this.i(T)^v.i(T);return new o(I,this.h^v.h)};function J(v){const _=v.g.length+1,I=[];for(let T=0;T<_;T++)I[T]=v.i(T)<<1|v.i(T-1)>>>31;return new o(I,v.h)}function B(v,_){const I=_>>5;_%=32;const T=v.g.length-I,E=[];for(let S=0;S<T;S++)E[S]=_>0?v.i(S+I)>>>_|v.i(S+I+1)<<32-_:v.i(S+I);return new o(E,v.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,_y=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=d,Pn=o}).apply(typeof jp<"u"?jp:typeof self<"u"?self:typeof window<"u"?window:{});var da=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var yy,Ps,Iy,Pa,El,wy,vy,Ey;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof da=="object"&&da];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function i(a,h){if(h)e:{var f=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var b=a[g];if(!(b in f))break e;f=f[b]}a=a[a.length-1],g=f[a],h=h(g),h!=g&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}i("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(a){return a||function(h){var f=[],g;for(g in h)Object.prototype.hasOwnProperty.call(h,g)&&f.push([g,h[g]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,f){return a.call.apply(a.bind,arguments)}function l(a,h,f){return l=u,l.apply(null,arguments)}function d(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function p(a,h){function f(){}f.prototype=h.prototype,a.Z=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Ob=function(g,b,P){for(var M=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)M[Q-2]=arguments[Q];return h.prototype[b].apply(g,M)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function w(a){const h=a.length;if(h>0){const f=Array(h);for(let g=0;g<h;g++)f[g]=a[g];return f}return[]}function C(a,h){for(let g=1;g<arguments.length;g++){const b=arguments[g];var f=typeof b;if(f=f!="object"?f:b?Array.isArray(b)?"array":f:"null",f=="array"||f=="object"&&typeof b.length=="number"){f=a.length||0;const P=b.length||0;a.length=f+P;for(let M=0;M<P;M++)a[f+M]=b[M]}else a.push(b)}}class k{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function V(a){o.setTimeout(()=>{throw a},0)}function j(){var a=v;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class ${constructor(){this.h=this.g=null}add(h,f){const g=U.get();g.set(h,f),this.h?this.h.next=g:this.g=g,this.h=g}}var U=new k(()=>new ee,a=>a.reset());class ee{constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let J,B=!1,v=new $,_=()=>{const a=Promise.resolve(void 0);J=()=>{a.then(I)}};function I(){for(var a;a=j();){try{a.h.call(a.g)}catch(f){V(f)}var h=U;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}B=!1}function T(){this.u=this.u,this.C=this.C}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var S=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};o.addEventListener("test",f,h),o.removeEventListener("test",f,h)}catch{}return a})();function y(a){return/^[\s\xa0]*$/.test(a)}function Fe(a,h){E.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}p(Fe,E),Fe.prototype.init=function(a,h){const f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&Fe.Z.h.call(this)},Fe.prototype.h=function(){Fe.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Et="closure_listenable_"+(Math.random()*1e6|0),yt=0;function ou(a,h,f,g,b){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!g,this.ha=b,this.key=++yt,this.da=this.fa=!1}function Br(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Jn(a,h,f){for(const g in a)h.call(f,a[g],g,a)}function au(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function qd(a){const h={};for(const f in a)h[f]=a[f];return h}const jd="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function zd(a,h){let f,g;for(let b=1;b<arguments.length;b++){g=arguments[b];for(f in g)a[f]=g[f];for(let P=0;P<jd.length;P++)f=jd[P],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function Yo(a){this.src=a,this.g={},this.h=0}Yo.prototype.add=function(a,h,f,g,b){const P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);const M=uu(a,h,g,b);return M>-1?(h=a[M],f||(h.fa=!1)):(h=new ou(h,this.src,P,!!g,b),h.fa=f,a.push(h)),h};function cu(a,h){const f=h.type;if(f in a.g){var g=a.g[f],b=Array.prototype.indexOf.call(g,h,void 0),P;(P=b>=0)&&Array.prototype.splice.call(g,b,1),P&&(Br(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function uu(a,h,f,g){for(let b=0;b<a.length;++b){const P=a[b];if(!P.da&&P.listener==h&&P.capture==!!f&&P.ha==g)return b}return-1}var lu="closure_lm_"+(Math.random()*1e6|0),hu={};function Gd(a,h,f,g,b){if(Array.isArray(h)){for(let P=0;P<h.length;P++)Gd(a,h[P],f,g,b);return null}return f=Kd(f),a&&a[Et]?a.J(h,f,c(g)?!!g.capture:!1,b):mv(a,h,f,!1,g,b)}function mv(a,h,f,g,b,P){if(!h)throw Error("Invalid event type");const M=c(b)?!!b.capture:!!b;let Q=fu(a);if(Q||(a[lu]=Q=new Yo(a)),f=Q.add(h,f,g,M,P),f.proxy)return f;if(g=gv(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)S||(b=M),b===void 0&&(b=!1),a.addEventListener(h.toString(),g,b);else if(a.attachEvent)a.attachEvent(Hd(h.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function gv(){function a(f){return h.call(a.src,a.listener,f)}const h=_v;return a}function Wd(a,h,f,g,b){if(Array.isArray(h))for(var P=0;P<h.length;P++)Wd(a,h[P],f,g,b);else g=c(g)?!!g.capture:!!g,f=Kd(f),a&&a[Et]?(a=a.i,P=String(h).toString(),P in a.g&&(h=a.g[P],f=uu(h,f,g,b),f>-1&&(Br(h[f]),Array.prototype.splice.call(h,f,1),h.length==0&&(delete a.g[P],a.h--)))):a&&(a=fu(a))&&(h=a.g[h.toString()],a=-1,h&&(a=uu(h,f,g,b)),(f=a>-1?h[a]:null)&&du(f))}function du(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[Et])cu(h.i,a);else{var f=a.type,g=a.proxy;h.removeEventListener?h.removeEventListener(f,g,a.capture):h.detachEvent?h.detachEvent(Hd(f),g):h.addListener&&h.removeListener&&h.removeListener(g),(f=fu(h))?(cu(f,a),f.h==0&&(f.src=null,h[lu]=null)):Br(a)}}}function Hd(a){return a in hu?hu[a]:hu[a]="on"+a}function _v(a,h){if(a.da)a=!0;else{h=new Fe(h,this);const f=a.listener,g=a.ha||a.src;a.fa&&du(a),a=f.call(g,h)}return a}function fu(a){return a=a[lu],a instanceof Yo?a:null}var pu="__closure_events_fn_"+(Math.random()*1e9>>>0);function Kd(a){return typeof a=="function"?a:(a[pu]||(a[pu]=function(h){return a.handleEvent(h)}),a[pu])}function Qe(){T.call(this),this.i=new Yo(this),this.M=this,this.G=null}p(Qe,T),Qe.prototype[Et]=!0,Qe.prototype.removeEventListener=function(a,h,f,g){Wd(this,a,h,f,g)};function tt(a,h){var f,g=a.G;if(g)for(f=[];g;g=g.G)f.push(g);if(a=a.M,g=h.type||h,typeof h=="string")h=new E(h,a);else if(h instanceof E)h.target=h.target||a;else{var b=h;h=new E(g,a),zd(h,b)}b=!0;let P,M;if(f)for(M=f.length-1;M>=0;M--)P=h.g=f[M],b=Xo(P,g,!0,h)&&b;if(P=h.g=a,b=Xo(P,g,!0,h)&&b,b=Xo(P,g,!1,h)&&b,f)for(M=0;M<f.length;M++)P=h.g=f[M],b=Xo(P,g,!1,h)&&b}Qe.prototype.N=function(){if(Qe.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const f=a.g[h];for(let g=0;g<f.length;g++)Br(f[g]);delete a.g[h],a.h--}}this.G=null},Qe.prototype.J=function(a,h,f,g){return this.i.add(String(a),h,!1,f,g)},Qe.prototype.K=function(a,h,f,g){return this.i.add(String(a),h,!0,f,g)};function Xo(a,h,f,g){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let b=!0;for(let P=0;P<h.length;++P){const M=h[P];if(M&&!M.da&&M.capture==f){const Q=M.listener,Oe=M.ha||M.src;M.fa&&cu(a.i,M),b=Q.call(Oe,g)!==!1&&b}}return b&&!g.defaultPrevented}function yv(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=l(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function Qd(a){a.g=yv(()=>{a.g=null,a.i&&(a.i=!1,Qd(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Iv extends T{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Qd(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Yi(a){T.call(this),this.h=a,this.g={}}p(Yi,T);var Jd=[];function Yd(a){Jn(a.g,function(h,f){this.g.hasOwnProperty(f)&&du(h)},a),a.g={}}Yi.prototype.N=function(){Yi.Z.N.call(this),Yd(this)},Yi.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var mu=o.JSON.stringify,wv=o.JSON.parse,vv=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Xd(){}function Zd(){}var Xi={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function gu(){E.call(this,"d")}p(gu,E);function _u(){E.call(this,"c")}p(_u,E);var Yn={},ef=null;function Zo(){return ef=ef||new Qe}Yn.Ia="serverreachability";function tf(a){E.call(this,Yn.Ia,a)}p(tf,E);function Zi(a){const h=Zo();tt(h,new tf(h))}Yn.STAT_EVENT="statevent";function nf(a,h){E.call(this,Yn.STAT_EVENT,a),this.stat=h}p(nf,E);function nt(a){const h=Zo();tt(h,new nf(h,a))}Yn.Ja="timingevent";function rf(a,h){E.call(this,Yn.Ja,a),this.size=h}p(rf,E);function es(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function ts(){this.g=!0}ts.prototype.ua=function(){this.g=!1};function Ev(a,h,f,g,b,P){a.info(function(){if(a.g)if(P){var M="",Q=P.split("&");for(let le=0;le<Q.length;le++){var Oe=Q[le].split("=");if(Oe.length>1){const Ue=Oe[0];Oe=Oe[1];const Lt=Ue.split("_");M=Lt.length>=2&&Lt[1]=="type"?M+(Ue+"="+Oe+"&"):M+(Ue+"=redacted&")}}}else M=null;else M=P;return"XMLHTTP REQ ("+g+") [attempt "+b+"]: "+h+`
`+f+`
`+M})}function Tv(a,h,f,g,b,P,M){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+b+"]: "+h+`
`+f+`
`+P+" "+M})}function $r(a,h,f,g){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+bv(a,f)+(g?" "+g:"")})}function Av(a,h){a.info(function(){return"TIMEOUT: "+h})}ts.prototype.info=function(){};function bv(a,h){if(!a.g)return h;if(!h)return null;try{const P=JSON.parse(h);if(P){for(a=0;a<P.length;a++)if(Array.isArray(P[a])){var f=P[a];if(!(f.length<2)){var g=f[1];if(Array.isArray(g)&&!(g.length<1)){var b=g[0];if(b!="noop"&&b!="stop"&&b!="close")for(let M=1;M<g.length;M++)g[M]=""}}}}return mu(P)}catch{return h}}var ea={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},sf={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},of;function yu(){}p(yu,Xd),yu.prototype.g=function(){return new XMLHttpRequest},of=new yu;function ns(a){return encodeURIComponent(String(a))}function Sv(a){var h=1;a=a.split(":");const f=[];for(;h>0&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function ln(a,h,f,g){this.j=a,this.i=h,this.l=f,this.S=g||1,this.V=new Yi(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new af}function af(){this.i=null,this.g="",this.h=!1}var cf={},Iu={};function wu(a,h,f){a.M=1,a.A=na(Mt(h)),a.u=f,a.R=!0,uf(a,null)}function uf(a,h){a.F=Date.now(),ta(a),a.B=Mt(a.A);var f=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),Ef(f.i,"t",g),a.C=0,f=a.j.L,a.h=new af,a.g=Bf(a.j,f?h:null,!a.u),a.P>0&&(a.O=new Iv(l(a.Y,a,a.g),a.P)),h=a.V,f=a.g,g=a.ba;var b="readystatechange";Array.isArray(b)||(b&&(Jd[0]=b.toString()),b=Jd);for(let P=0;P<b.length;P++){const M=Gd(f,b[P],g||h.handleEvent,!1,h.h||h);if(!M)break;h.g[M.key]=M}h=a.J?qd(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),Zi(),Ev(a.i,a.v,a.B,a.l,a.S,a.u)}ln.prototype.ba=function(a){a=a.target;const h=this.O;h&&fn(a)==3?h.j():this.Y(a)},ln.prototype.Y=function(a){try{if(a==this.g)e:{const Q=fn(this.g),Oe=this.g.ya(),le=this.g.ca();if(!(Q<3)&&(Q!=3||this.g&&(this.h.h||this.g.la()||Cf(this.g)))){this.K||Q!=4||Oe==7||(Oe==8||le<=0?Zi(3):Zi(2)),vu(this);var h=this.g.ca();this.X=h;var f=Rv(this);if(this.o=h==200,Tv(this.i,this.v,this.B,this.l,this.S,Q,h),this.o){if(this.U&&!this.L){t:{if(this.g){var g,b=this.g;if((g=b.g?b.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(g)){var P=g;break t}}P=null}if(a=P)$r(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Eu(this,a);else{this.o=!1,this.m=3,nt(12),Xn(this),rs(this);break e}}if(this.R){a=!0;let Ue;for(;!this.K&&this.C<f.length;)if(Ue=Pv(this,f),Ue==Iu){Q==4&&(this.m=4,nt(14),a=!1),$r(this.i,this.l,null,"[Incomplete Response]");break}else if(Ue==cf){this.m=4,nt(15),$r(this.i,this.l,f,"[Invalid Chunk]"),a=!1;break}else $r(this.i,this.l,Ue,null),Eu(this,Ue);if(lf(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Q!=4||f.length!=0||this.h.h||(this.m=1,nt(16),a=!1),this.o=this.o&&a,!a)$r(this.i,this.l,f,"[Invalid Chunked Response]"),Xn(this),rs(this);else if(f.length>0&&!this.W){this.W=!0;var M=this.j;M.g==this&&M.aa&&!M.P&&(M.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),ku(M),M.P=!0,nt(11))}}else $r(this.i,this.l,f,null),Eu(this,f);Q==4&&Xn(this),this.o&&!this.K&&(Q==4?Mf(this.j,this):(this.o=!1,ta(this)))}else qv(this.g),h==400&&f.indexOf("Unknown SID")>0?(this.m=3,nt(12)):(this.m=0,nt(13)),Xn(this),rs(this)}}}catch{}finally{}};function Rv(a){if(!lf(a))return a.g.la();const h=Cf(a.g);if(h==="")return"";let f="";const g=h.length,b=fn(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Xn(a),rs(a),"";a.h.i=new o.TextDecoder}for(let P=0;P<g;P++)a.h.h=!0,f+=a.h.i.decode(h[P],{stream:!(b&&P==g-1)});return h.length=0,a.h.g+=f,a.C=0,a.h.g}function lf(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Pv(a,h){var f=a.C,g=h.indexOf(`
`,f);return g==-1?Iu:(f=Number(h.substring(f,g)),isNaN(f)?cf:(g+=1,g+f>h.length?Iu:(h=h.slice(g,g+f),a.C=g+f,h)))}ln.prototype.cancel=function(){this.K=!0,Xn(this)};function ta(a){a.T=Date.now()+a.H,hf(a,a.H)}function hf(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=es(l(a.aa,a),h)}function vu(a){a.D&&(o.clearTimeout(a.D),a.D=null)}ln.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(Av(this.i,this.B),this.M!=2&&(Zi(),nt(17)),Xn(this),this.m=2,rs(this)):hf(this,this.T-a)};function rs(a){a.j.I==0||a.K||Mf(a.j,a)}function Xn(a){vu(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,Yd(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function Eu(a,h){try{var f=a.j;if(f.I!=0&&(f.g==a||Tu(f.h,a))){if(!a.L&&Tu(f.h,a)&&f.I==3){try{var g=f.Ba.g.parse(h)}catch{g=null}if(Array.isArray(g)&&g.length==3){var b=g;if(b[0]==0){e:if(!f.v){if(f.g)if(f.g.F+3e3<a.F)aa(f),sa(f);else break e;Cu(f),nt(18)}}else f.xa=b[1],0<f.xa-f.K&&b[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=es(l(f.Va,f),6e3));pf(f.h)<=1&&f.ta&&(f.ta=void 0)}else er(f,11)}else if((a.L||f.g==a)&&aa(f),!y(h))for(b=f.Ba.g.parse(h),h=0;h<b.length;h++){let le=b[h];const Ue=le[0];if(!(Ue<=f.K))if(f.K=Ue,le=le[1],f.I==2)if(le[0]=="c"){f.M=le[1],f.ba=le[2];const Lt=le[3];Lt!=null&&(f.ka=Lt,f.j.info("VER="+f.ka));const tr=le[4];tr!=null&&(f.za=tr,f.j.info("SVER="+f.za));const pn=le[5];pn!=null&&typeof pn=="number"&&pn>0&&(g=1.5*pn,f.O=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const mn=a.g;if(mn){const ua=mn.g?mn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ua){var P=g.h;P.g||ua.indexOf("spdy")==-1&&ua.indexOf("quic")==-1&&ua.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(Au(P,P.h),P.h=null))}if(g.G){const Du=mn.g?mn.g.getResponseHeader("X-HTTP-Session-Id"):null;Du&&(g.wa=Du,pe(g.J,g.G,Du))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-a.F,f.j.info("Handshake RTT: "+f.T+"ms")),g=f;var M=a;if(g.na=Uf(g,g.L?g.ba:null,g.W),M.L){mf(g.h,M);var Q=M,Oe=g.O;Oe&&(Q.H=Oe),Q.D&&(vu(Q),ta(Q)),g.g=M}else Nf(g);f.i.length>0&&oa(f)}else le[0]!="stop"&&le[0]!="close"||er(f,7);else f.I==3&&(le[0]=="stop"||le[0]=="close"?le[0]=="stop"?er(f,7):Pu(f):le[0]!="noop"&&f.l&&f.l.qa(le),f.A=0)}}Zi(4)}catch{}}var Cv=class{constructor(a,h){this.g=a,this.map=h}};function df(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function ff(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function pf(a){return a.h?1:a.g?a.g.size:0}function Tu(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Au(a,h){a.g?a.g.add(h):a.h=h}function mf(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}df.prototype.cancel=function(){if(this.i=gf(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function gf(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.G);return h}return w(a.i)}var _f=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function kv(a,h){if(a){a=a.split("&");for(let f=0;f<a.length;f++){const g=a[f].indexOf("=");let b,P=null;g>=0?(b=a[f].substring(0,g),P=a[f].substring(g+1)):b=a[f],h(b,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function hn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof hn?(this.l=a.l,is(this,a.j),this.o=a.o,this.g=a.g,ss(this,a.u),this.h=a.h,bu(this,Tf(a.i)),this.m=a.m):a&&(h=String(a).match(_f))?(this.l=!1,is(this,h[1]||"",!0),this.o=os(h[2]||""),this.g=os(h[3]||"",!0),ss(this,h[4]),this.h=os(h[5]||"",!0),bu(this,h[6]||"",!0),this.m=os(h[7]||"")):(this.l=!1,this.i=new cs(null,this.l))}hn.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(as(h,yf,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(as(h,yf,!0),"@"),a.push(ns(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&a.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(as(f,f.charAt(0)=="/"?xv:Vv,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",as(f,Ov)),a.join("")},hn.prototype.resolve=function(a){const h=Mt(this);let f=!!a.j;f?is(h,a.j):f=!!a.o,f?h.o=a.o:f=!!a.g,f?h.g=a.g:f=a.u!=null;var g=a.h;if(f)ss(h,a.u);else if(f=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var b=h.h.lastIndexOf("/");b!=-1&&(g=h.h.slice(0,b+1)+g)}if(b=g,b==".."||b==".")g="";else if(b.indexOf("./")!=-1||b.indexOf("/.")!=-1){g=b.lastIndexOf("/",0)==0,b=b.split("/");const P=[];for(let M=0;M<b.length;){const Q=b[M++];Q=="."?g&&M==b.length&&P.push(""):Q==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),g&&M==b.length&&P.push("")):(P.push(Q),g=!0)}g=P.join("/")}else g=b}return f?h.h=g:f=a.i.toString()!=="",f?bu(h,Tf(a.i)):f=!!a.m,f&&(h.m=a.m),h};function Mt(a){return new hn(a)}function is(a,h,f){a.j=f?os(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function ss(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function bu(a,h,f){h instanceof cs?(a.i=h,Mv(a.i,a.l)):(f||(h=as(h,Nv)),a.i=new cs(h,a.l))}function pe(a,h,f){a.i.set(h,f)}function na(a){return pe(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function os(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function as(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,Dv),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Dv(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var yf=/[#\/\?@]/g,Vv=/[#\?:]/g,xv=/[#\?]/g,Nv=/[#\?@]/g,Ov=/#/g;function cs(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Zn(a){a.g||(a.g=new Map,a.h=0,a.i&&kv(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}n=cs.prototype,n.add=function(a,h){Zn(this),this.i=null,a=qr(this,a);let f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function If(a,h){Zn(a),h=qr(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function wf(a,h){return Zn(a),h=qr(a,h),a.g.has(h)}n.forEach=function(a,h){Zn(this),this.g.forEach(function(f,g){f.forEach(function(b){a.call(h,b,g,this)},this)},this)};function vf(a,h){Zn(a);let f=[];if(typeof h=="string")wf(a,h)&&(f=f.concat(a.g.get(qr(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)f=f.concat(a[h]);return f}n.set=function(a,h){return Zn(this),this.i=null,a=qr(this,a),wf(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=vf(this,a),a.length>0?String(a[0]):h):h};function Ef(a,h,f){If(a,h),f.length>0&&(a.i=null,a.g.set(qr(a,h),w(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let g=0;g<h.length;g++){var f=h[g];const b=ns(f);f=vf(this,f);for(let P=0;P<f.length;P++){let M=b;f[P]!==""&&(M+="="+ns(f[P])),a.push(M)}}return this.i=a.join("&")};function Tf(a){const h=new cs;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function qr(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function Mv(a,h){h&&!a.j&&(Zn(a),a.i=null,a.g.forEach(function(f,g){const b=g.toLowerCase();g!=b&&(If(this,g),Ef(this,b,f))},a)),a.j=h}function Lv(a,h){const f=new ts;if(o.Image){const g=new Image;g.onload=d(dn,f,"TestLoadImage: loaded",!0,h,g),g.onerror=d(dn,f,"TestLoadImage: error",!1,h,g),g.onabort=d(dn,f,"TestLoadImage: abort",!1,h,g),g.ontimeout=d(dn,f,"TestLoadImage: timeout",!1,h,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else h(!1)}function Fv(a,h){const f=new ts,g=new AbortController,b=setTimeout(()=>{g.abort(),dn(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:g.signal}).then(P=>{clearTimeout(b),P.ok?dn(f,"TestPingServer: ok",!0,h):dn(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(b),dn(f,"TestPingServer: error",!1,h)})}function dn(a,h,f,g,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),g(f)}catch{}}function Uv(){this.g=new vv}function Su(a){this.i=a.Sb||null,this.h=a.ab||!1}p(Su,Xd),Su.prototype.g=function(){return new ra(this.i,this.h)};function ra(a,h){Qe.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(ra,Qe),n=ra.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,ls(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,us(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,ls(this)),this.g&&(this.readyState=3,ls(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Af(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Af(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?us(this):ls(this),this.readyState==3&&Af(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,us(this))},n.Na=function(a){this.g&&(this.response=a,us(this))},n.ga=function(){this.g&&us(this)};function us(a){a.readyState=4,a.l=null,a.j=null,a.B=null,ls(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function ls(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ra.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function bf(a){let h="";return Jn(a,function(f,g){h+=g,h+=":",h+=f,h+=`\r
`}),h}function Ru(a,h,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=bf(f),typeof a=="string"?f!=null&&ns(f):pe(a,h,f))}function Ae(a){Qe.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(Ae,Qe);var Bv=/^https?$/i,$v=["POST","PUT"];n=Ae.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():of.g(),this.g.onreadystatechange=m(l(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(P){Sf(this,P);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var b in g)f.set(b,g[b]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const P of g.keys())f.set(P,g.get(P));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(P=>P.toLowerCase()=="content-type"),b=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call($v,h,void 0)>=0)||g||b||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,M]of f)this.g.setRequestHeader(P,M);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(P){Sf(this,P)}};function Sf(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,Rf(a),ia(a)}function Rf(a){a.A||(a.A=!0,tt(a,"complete"),tt(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,tt(this,"complete"),tt(this,"abort"),ia(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ia(this,!0)),Ae.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Pf(this):this.Xa())},n.Xa=function(){Pf(this)};function Pf(a){if(a.h&&typeof s<"u"){if(a.v&&fn(a)==4)setTimeout(a.Ca.bind(a),0);else if(tt(a,"readystatechange"),fn(a)==4){a.h=!1;try{const P=a.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var g;if(g=P===0){let M=String(a.D).match(_f)[1]||null;!M&&o.self&&o.self.location&&(M=o.self.location.protocol.slice(0,-1)),g=!Bv.test(M?M.toLowerCase():"")}f=g}if(f)tt(a,"complete"),tt(a,"success");else{a.o=6;try{var b=fn(a)>2?a.g.statusText:""}catch{b=""}a.l=b+" ["+a.ca()+"]",Rf(a)}}finally{ia(a)}}}}function ia(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const f=a.g;a.g=null,h||tt(a,"ready");try{f.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function fn(a){return a.g?a.g.readyState:0}n.ca=function(){try{return fn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),wv(h)}};function Cf(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function qv(a){const h={};a=(a.g&&fn(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(y(a[g]))continue;var f=Sv(a[g]);const b=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const P=h[b]||[];h[b]=P,P.push(f)}au(h,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function hs(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function kf(a){this.za=0,this.i=[],this.j=new ts,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=hs("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=hs("baseRetryDelayMs",5e3,a),this.Za=hs("retryDelaySeedMs",1e4,a),this.Ta=hs("forwardChannelMaxRetries",2,a),this.va=hs("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new df(a&&a.concurrentRequestLimit),this.Ba=new Uv,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=kf.prototype,n.ka=8,n.I=1,n.connect=function(a,h,f,g){nt(0),this.W=a,this.H=h||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.J=Uf(this,null,this.W),oa(this)};function Pu(a){if(Df(a),a.I==3){var h=a.V++,f=Mt(a.J);if(pe(f,"SID",a.M),pe(f,"RID",h),pe(f,"TYPE","terminate"),ds(a,f),h=new ln(a,a.j,h),h.M=2,h.A=na(Mt(f)),f=!1,o.navigator&&o.navigator.sendBeacon)try{f=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!f&&o.Image&&(new Image().src=h.A,f=!0),f||(h.g=Bf(h.j,null),h.g.ea(h.A)),h.F=Date.now(),ta(h)}Ff(a)}function sa(a){a.g&&(ku(a),a.g.cancel(),a.g=null)}function Df(a){sa(a),a.v&&(o.clearTimeout(a.v),a.v=null),aa(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function oa(a){if(!ff(a.h)&&!a.m){a.m=!0;var h=a.Ea;J||_(),B||(J(),B=!0),v.add(h,a),a.D=0}}function jv(a,h){return pf(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=es(l(a.Ea,a,h),Lf(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const b=new ln(this,this.j,a);let P=this.o;if(this.U&&(P?(P=qd(P),zd(P,this.U)):P=this.U),this.u!==null||this.R||(b.J=P,P=null),this.S)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(h+=g,h>4096){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=xf(this,b,h),f=Mt(this.J),pe(f,"RID",a),pe(f,"CVER",22),this.G&&pe(f,"X-HTTP-Session-Id",this.G),ds(this,f),P&&(this.R?h="headers="+ns(bf(P))+"&"+h:this.u&&Ru(f,this.u,P)),Au(this.h,b),this.Ra&&pe(f,"TYPE","init"),this.S?(pe(f,"$req",h),pe(f,"SID","null"),b.U=!0,wu(b,f,null)):wu(b,f,h),this.I=2}}else this.I==3&&(a?Vf(this,a):this.i.length==0||ff(this.h)||Vf(this))};function Vf(a,h){var f;h?f=h.l:f=a.V++;const g=Mt(a.J);pe(g,"SID",a.M),pe(g,"RID",f),pe(g,"AID",a.K),ds(a,g),a.u&&a.o&&Ru(g,a.u,a.o),f=new ln(a,a.j,f,a.D+1),a.u===null&&(f.J=a.o),h&&(a.i=h.G.concat(a.i)),h=xf(a,f,1e3),f.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Au(a.h,f),wu(f,g,h)}function ds(a,h){a.H&&Jn(a.H,function(f,g){pe(h,g,f)}),a.l&&Jn({},function(f,g){pe(h,g,f)})}function xf(a,h,f){f=Math.min(a.i.length,f);const g=a.l?l(a.l.Ka,a.l,a):null;e:{var b=a.i;let Q=-1;for(;;){const Oe=["count="+f];Q==-1?f>0?(Q=b[0].g,Oe.push("ofs="+Q)):Q=0:Oe.push("ofs="+Q);let le=!0;for(let Ue=0;Ue<f;Ue++){var P=b[Ue].g;const Lt=b[Ue].map;if(P-=Q,P<0)Q=Math.max(0,b[Ue].g-100),le=!1;else try{P="req"+P+"_"||"";try{var M=Lt instanceof Map?Lt:Object.entries(Lt);for(const[tr,pn]of M){let mn=pn;c(pn)&&(mn=mu(pn)),Oe.push(P+tr+"="+encodeURIComponent(mn))}}catch(tr){throw Oe.push(P+"type="+encodeURIComponent("_badmap")),tr}}catch{g&&g(Lt)}}if(le){M=Oe.join("&");break e}}M=void 0}return a=a.i.splice(0,f),h.G=a,M}function Nf(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;J||_(),B||(J(),B=!0),v.add(h,a),a.A=0}}function Cu(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=es(l(a.Da,a),Lf(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Of(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=es(l(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,nt(10),sa(this),Of(this))};function ku(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Of(a){a.g=new ln(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=Mt(a.na);pe(h,"RID","rpc"),pe(h,"SID",a.M),pe(h,"AID",a.K),pe(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&pe(h,"TO",a.ia),pe(h,"TYPE","xmlhttp"),ds(a,h),a.u&&a.o&&Ru(h,a.u,a.o),a.O&&(a.g.H=a.O);var f=a.g;a=a.ba,f.M=1,f.A=na(Mt(h)),f.u=null,f.R=!0,uf(f,a)}n.Va=function(){this.C!=null&&(this.C=null,sa(this),Cu(this),nt(19))};function aa(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Mf(a,h){var f=null;if(a.g==h){aa(a),ku(a),a.g=null;var g=2}else if(Tu(a.h,h))f=h.G,mf(a.h,h),g=1;else return;if(a.I!=0){if(h.o)if(g==1){f=h.u?h.u.length:0,h=Date.now()-h.F;var b=a.D;g=Zo(),tt(g,new rf(g,f)),oa(a)}else Nf(a);else if(b=h.m,b==3||b==0&&h.X>0||!(g==1&&jv(a,h)||g==2&&Cu(a)))switch(f&&f.length>0&&(h=a.h,h.i=h.i.concat(f)),b){case 1:er(a,5);break;case 4:er(a,10);break;case 3:er(a,6);break;default:er(a,2)}}}function Lf(a,h){let f=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(f*=2),f*h}function er(a,h){if(a.j.info("Error code "+h),h==2){var f=l(a.bb,a),g=a.Ua;const b=!g;g=new hn(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||is(g,"https"),na(g),b?Lv(g.toString(),f):Fv(g.toString(),f)}else nt(2);a.I=0,a.l&&a.l.pa(h),Ff(a),Df(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),nt(2)):(this.j.info("Failed to ping google.com"),nt(1))};function Ff(a){if(a.I=0,a.ja=[],a.l){const h=gf(a.h);(h.length!=0||a.i.length!=0)&&(C(a.ja,h),C(a.ja,a.i),a.h.i.length=0,w(a.i),a.i.length=0),a.l.oa()}}function Uf(a,h,f){var g=f instanceof hn?Mt(f):new hn(f);if(g.g!="")h&&(g.g=h+"."+g.g),ss(g,g.u);else{var b=o.location;g=b.protocol,h=h?h+"."+b.hostname:b.hostname,b=+b.port;const P=new hn(null);g&&is(P,g),h&&(P.g=h),b&&ss(P,b),f&&(P.h=f),g=P}return f=a.G,h=a.wa,f&&h&&pe(g,f,h),pe(g,"VER",a.ka),ds(a,g),g}function Bf(a,h,f){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new Ae(new Su({ab:f})):new Ae(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function $f(){}n=$f.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function ca(){}ca.prototype.g=function(a,h){return new dt(a,h)};function dt(a,h){Qe.call(this),this.g=new kf(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!y(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!y(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new jr(this)}p(dt,Qe),dt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},dt.prototype.close=function(){Pu(this.g)},dt.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.v&&(f={},f.__data__=mu(a),a=f);h.i.push(new Cv(h.Ya++,a)),h.I==3&&oa(h)},dt.prototype.N=function(){this.g.l=null,delete this.j,Pu(this.g),delete this.g,dt.Z.N.call(this)};function qf(a){gu.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}p(qf,gu);function jf(){_u.call(this),this.status=1}p(jf,_u);function jr(a){this.g=a}p(jr,$f),jr.prototype.ra=function(){tt(this.g,"a")},jr.prototype.qa=function(a){tt(this.g,new qf(a))},jr.prototype.pa=function(a){tt(this.g,new jf)},jr.prototype.oa=function(){tt(this.g,"b")},ca.prototype.createWebChannel=ca.prototype.g,dt.prototype.send=dt.prototype.o,dt.prototype.open=dt.prototype.m,dt.prototype.close=dt.prototype.close,Ey=function(){return new ca},vy=function(){return Zo()},wy=Yn,El={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ea.NO_ERROR=0,ea.TIMEOUT=8,ea.HTTP_ERROR=6,Pa=ea,sf.COMPLETE="complete",Iy=sf,Zd.EventType=Xi,Xi.OPEN="a",Xi.CLOSE="b",Xi.ERROR="c",Xi.MESSAGE="d",Qe.prototype.listen=Qe.prototype.J,Ps=Zd,Ae.prototype.listenOnce=Ae.prototype.K,Ae.prototype.getLastError=Ae.prototype.Ha,Ae.prototype.getLastErrorCode=Ae.prototype.ya,Ae.prototype.getStatus=Ae.prototype.ca,Ae.prototype.getResponseJson=Ae.prototype.La,Ae.prototype.getResponseText=Ae.prototype.la,Ae.prototype.send=Ae.prototype.ea,Ae.prototype.setWithCredentials=Ae.prototype.Fa,yy=Ae}).apply(typeof da<"u"?da:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}$e.UNAUTHENTICATED=new $e(null),$e.GOOGLE_CREDENTIALS=new $e("google-credentials-uid"),$e.FIRST_PARTY=new $e("first-party-uid"),$e.MOCK_USER=new $e("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qi="12.10.0";function $P(n){qi=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn=new vc("@firebase/firestore");function Yr(){return Mn.logLevel}function qP(n){Mn.setLogLevel(n)}function x(n,...e){if(Mn.logLevel<=Y.DEBUG){const t=e.map(xh);Mn.debug(`Firestore (${qi}): ${n}`,...t)}}function Ce(n,...e){if(Mn.logLevel<=Y.ERROR){const t=e.map(xh);Mn.error(`Firestore (${qi}): ${n}`,...t)}}function Ot(n,...e){if(Mn.logLevel<=Y.WARN){const t=e.map(xh);Mn.warn(`Firestore (${qi}): ${n}`,...t)}}function xh(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Ty(n,r,t)}function Ty(n,e,t){let r=`FIRESTORE (${qi}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Ce(r),new Error(r)}function q(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||Ty(e,i,r)}function jP(n,e){n||F(57014,e)}function L(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends st{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ay{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class zP{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t($e.UNAUTHENTICATED)))}shutdown(){}}class GP{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class WP{constructor(e){this.t=e,this.currentUser=$e.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){q(this.o===void 0,42304);let r=this.i;const i=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let s=new He;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new He,e.enqueueRetryable((()=>i(this.currentUser)))};const o=()=>{const u=s;e.enqueueRetryable((async()=>{await u.promise,await i(this.currentUser)}))},c=u=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new He)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(q(typeof r.accessToken=="string",31837,{l:r}),new Ay(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return q(e===null||typeof e=="string",2055,{h:e}),new $e(e)}}class HP{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=$e.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class KP{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new HP(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t($e.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class zp{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class QP{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ye(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){q(this.o===void 0,3512);const r=s=>{s.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.m;return this.m=s.token,x("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable((()=>r(s)))};const i=s=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((s=>i(s))),setTimeout((()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new zp(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(q(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new zp(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JP(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nh{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=JP(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function H(n,e){return n<e?-1:n>e?1:0}function Tl(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const i=n.charAt(r),s=e.charAt(r);if(i!==s)return Hu(i)===Hu(s)?H(i,s):Hu(i)?1:-1}return H(n.length,e.length)}const YP=55296,XP=57343;function Hu(n){const e=n.charCodeAt(0);return e>=YP&&e<=XP}function gi(n,e,t){return n.length===e.length&&n.every(((r,i)=>t(r,e[i])))}function by(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gp="__name__";class Ft{constructor(e,t,r){t===void 0?t=0:t>e.length&&F(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&F(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ft.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ft?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=Ft.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return H(e.length,t.length)}static compareSegments(e,t){const r=Ft.isNumericId(e),i=Ft.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?Ft.extractNumericId(e).compare(Ft.extractNumericId(t)):Tl(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Pn.fromString(e.substring(4,e.length-2))}}class X extends Ft{construct(e,t,r){return new X(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new D(R.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((i=>i.length>0)))}return new X(t)}static emptyPath(){return new X([])}}const ZP=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ie extends Ft{construct(e,t,r){return new Ie(e,t,r)}static isValidIdentifier(e){return ZP.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ie.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Gp}static keyField(){return new Ie([Gp])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new D(R.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new D(R.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new D(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new D(R.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ie(t)}static emptyPath(){return new Ie([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e){this.path=e}static fromPath(e){return new O(X.fromString(e))}static fromName(e){return new O(X.fromString(e).popFirst(5))}static empty(){return new O(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&X.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return X.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new O(new X(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oh(n,e,t){if(!t)throw new D(R.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Sy(n,e,t,r){if(e===!0&&r===!0)throw new D(R.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Wp(n){if(!O.isDocumentKey(n))throw new D(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Hp(n){if(O.isDocumentKey(n))throw new D(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ry(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function xc(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":F(12329,{type:typeof n})}function re(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new D(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=xc(n);throw new D(R.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Py(n,e){if(e<=0)throw new D(R.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(n,e){const t={typeString:n};return e&&(t.value=e),t}function Mo(n,e){if(!Ry(n))throw new D(R.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(i&&typeof o!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&o!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new D(R.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kp=-62135596800,Qp=1e6;class se{static now(){return se.fromMillis(Date.now())}static fromDate(e){return se.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Qp);return new se(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Kp)throw new D(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Qp}_compareTo(e){return this.seconds===e.seconds?H(this.nanoseconds,e.nanoseconds):H(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:se._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Mo(e,se._jsonSchema))return new se(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Kp;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}se._jsonSchemaVersion="firestore/timestamp/1.0",se._jsonSchema={type:Ne("string",se._jsonSchemaVersion),seconds:Ne("number"),nanoseconds:Ne("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{static fromTimestamp(e){return new z(e)}static min(){return new z(new se(0,0))}static max(){return new z(new se(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _i=-1;class Za{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}}function Al(n){return n.fields.find((e=>e.kind===2))}function ir(n){return n.fields.filter((e=>e.kind!==2))}Za.UNKNOWN_ID=-1;class Ca{constructor(e,t){this.fieldPath=e,this.kind=t}}class ao{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new ao(0,_t.min())}}function Cy(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=z.fromTimestamp(r===1e9?new se(t+1,0):new se(t,r));return new _t(i,O.empty(),e)}function ky(n){return new _t(n.readTime,n.key,_i)}class _t{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new _t(z.min(),O.empty(),_i)}static max(){return new _t(z.max(),O.empty(),_i)}}function Mh(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=O.comparator(n.documentKey,e.documentKey),t!==0?t:H(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dy="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Vy{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gn(n){if(n.code!==R.FAILED_PRECONDITION||n.message!==Dy)throw n;x("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&F(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A(((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):A.reject(t)}static resolve(e){return new A(((t,r)=>{t(e)}))}static reject(e){return new A(((t,r)=>{r(e)}))}static waitFor(e){return new A(((t,r)=>{let i=0,s=0,o=!1;e.forEach((c=>{++i,c.next((()=>{++s,o&&s===i&&t()}),(u=>r(u)))})),o=!0,s===i&&t()}))}static or(e){let t=A.resolve(!1);for(const r of e)t=t.next((i=>i?A.resolve(i):r()));return t}static forEach(e,t){const r=[];return e.forEach(((i,s)=>{r.push(t.call(this,i,s))})),this.waitFor(r)}static mapArray(e,t){return new A(((r,i)=>{const s=e.length,o=new Array(s);let c=0;for(let u=0;u<s;u++){const l=u;t(e[l]).next((d=>{o[l]=d,++c,c===s&&r(o)}),(d=>i(d)))}}))}static doWhile(e,t){return new A(((r,i)=>{const s=()=>{e()===!0?t().next((()=>{s()}),i):r()};s()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ft="SimpleDb";class Nc{static open(e,t,r,i){try{return new Nc(t,e.transaction(i,r))}catch(s){throw new $s(t,s)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new He,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new $s(e,t.error)):this.S.resolve()},this.transaction.onerror=r=>{const i=Lh(r.target.error);this.S.reject(new $s(e,i))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(x(ft,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new tC(t)}}class zt{static delete(e){return x(ft,"Removing database:",e),or(sh().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!to())return!1;if(zt.F())return!0;const e=Ee(),t=zt.M(e),r=0<t&&t<10,i=xy(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static F(){return typeof process<"u"&&process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.N=r,this.B=null,zt.M(Ee())===12.2&&Ce("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(x(ft,"Opening database:",this.name),this.db=await new Promise(((t,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{r(new $s(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new D(R.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new D(R.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new $s(e,o))},i.onupgradeneeded=s=>{x(ft,'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.N.k(o,i.transaction,s.oldVersion,this.version).next((()=>{x(ft,"Database upgrade to version "+this.version+" complete")}))}}))),this.K&&(this.db.onversionchange=t=>this.K(t)),this.db}q(e){this.K=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=Nc.open(this.db,e,s?"readonly":"readwrite",r),u=i(c).next((l=>(c.C(),l))).catch((l=>(c.abort(l),A.reject(l)))).toPromise();return u.catch((()=>{})),await c.D,u}catch(c){const u=c,l=u.name!=="FirebaseError"&&o<3;if(x(ft,"Transaction failed with error:",u.message,"Retrying:",l),this.close(),!l)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function xy(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class eC{constructor(e){this.U=e,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(e){this.U=e}done(){this.$=!0}j(e){this.W=e}delete(){return or(this.U.delete())}}class $s extends D{constructor(e,t){super(R.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Wn(n){return n.name==="IndexedDbTransactionError"}class tC{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(x(ft,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(x(ft,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),or(r)}add(e){return x(ft,"ADD",this.store.name,e,e),or(this.store.add(e))}get(e){return or(this.store.get(e)).next((t=>(t===void 0&&(t=null),x(ft,"GET",this.store.name,e,t),t)))}delete(e){return x(ft,"DELETE",this.store.name,e),or(this.store.delete(e))}count(){return x(ft,"COUNT",this.store.name),or(this.store.count())}H(e,t){const r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new A(((o,c)=>{s.onerror=u=>{c(u.target.error)},s.onsuccess=u=>{o(u.target.result)}}))}{const s=this.cursor(r),o=[];return this.J(s,((c,u)=>{o.push(u)})).next((()=>o))}}Z(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new A(((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}}))}X(e,t){x(ft,"DELETE ALL",this.store.name);const r=this.options(e,t);r.Y=!1;const i=this.cursor(r);return this.J(i,((s,o,c)=>c.delete()))}ee(e,t){let r;t?r=e:(r={},t=e);const i=this.cursor(r);return this.J(i,t)}te(e){const t=this.cursor({});return new A(((r,i)=>{t.onerror=s=>{const o=Lh(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next((c=>{c?o.continue():r()})):r()}}))}J(e,t){const r=[];return new A(((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void i();const u=new eC(c),l=t(c.primaryKey,c.value,u);if(l instanceof A){const d=l.catch((p=>(u.done(),A.reject(p))));r.push(d)}u.isDone?i():u.G===null?c.continue():c.continue(u.G)}})).next((()=>A.waitFor(r)))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.Y?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function or(n){return new A(((e,t)=>{n.onsuccess=r=>{const i=r.target.result;e(i)},n.onerror=r=>{const i=Lh(r.target.error);t(i)}}))}let Jp=!1;function Lh(n){const e=zt.M(Ee());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Jp||(Jp=!0,setTimeout((()=>{throw r}),0)),r}}return n}const qs="IndexBackfiller";class nC{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){x(qs,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.ne.ie();x(qs,`Documents written: ${t}`)}catch(t){Wn(t)?x(qs,"Ignoring IndexedDB error during index backfill: ",t):await Gn(t)}await this.re(6e4)}))}}class rC{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.se(t,e)))}se(e,t){const r=new Set;let i=t,s=!0;return A.doWhile((()=>s===!0&&i>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!r.has(o))return x(qs,`Processing collection: ${o}`),this.oe(e,o,i).next((c=>{i-=c,r.add(o)}));s=!1})))).next((()=>t-i))}oe(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next((s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this._e(i,s))).next((c=>(x(qs,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c)))).next((()=>o.size))}))))}_e(e,t){let r=e;return t.changes.forEach(((i,s)=>{const o=ky(s);Mh(o,r)>0&&(r=o)})),new _t(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ut.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cn=-1;function Lo(n){return n==null}function co(n){return n===0&&1/n==-1/0}function Ny(n){return typeof n=="number"&&Number.isInteger(n)&&!co(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec="";function Ze(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Yp(e)),e=iC(n.get(t),e);return Yp(e)}function iC(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case ec:t+="";break;default:t+=s}}return t}function Yp(n){return n+ec+""}function qt(n){const e=n.length;if(q(e>=2,64408,{path:n}),e===2)return q(n.charAt(0)===ec&&n.charAt(1)==="",56145,{path:n}),X.emptyPath();const t=e-2,r=[];let i="";for(let s=0;s<e;){const o=n.indexOf(ec,s);switch((o<0||o>t)&&F(50515,{path:n}),n.charAt(o+1)){case"":const c=n.substring(s,o);let u;i.length===0?u=c:(i+=c,u=i,i=""),r.push(u);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:F(61167,{path:n})}s=o+2}return new X(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sr="remoteDocuments",Fo="owner",Gr="owner",uo="mutationQueues",sC="userId",bt="mutations",Xp="batchId",dr="userMutationsIndex",Zp=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ka(n,e){return[n,Ze(e)]}function Oy(n,e,t){return[n,Ze(e),t]}const oC={},yi="documentMutations",tc="remoteDocumentsV14",aC=["prefixPath","collectionGroup","readTime","documentId"],Da="documentKeyIndex",cC=["prefixPath","collectionGroup","documentId"],My="collectionGroupIndex",uC=["collectionGroup","readTime","prefixPath","documentId"],lo="remoteDocumentGlobal",bl="remoteDocumentGlobalKey",Ii="targets",Ly="queryTargetsIndex",lC=["canonicalId","targetId"],wi="targetDocuments",hC=["targetId","path"],Fh="documentTargetsIndex",dC=["path","targetId"],nc="targetGlobalKey",yr="targetGlobal",ho="collectionParents",fC=["collectionId","parent"],vi="clientMetadata",pC="clientId",Oc="bundles",mC="bundleId",Mc="namedQueries",gC="name",Uh="indexConfiguration",_C="indexId",Sl="collectionGroupIndex",yC="collectionGroup",js="indexState",IC=["indexId","uid"],Fy="sequenceNumberIndex",wC=["uid","sequenceNumber"],zs="indexEntries",vC=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Uy="documentKeyIndex",EC=["indexId","uid","orderedDocumentKey"],Lc="documentOverlays",TC=["userId","collectionPath","documentId"],Rl="collectionPathOverlayIndex",AC=["userId","collectionPath","largestBatchId"],By="collectionGroupOverlayIndex",bC=["userId","collectionGroup","largestBatchId"],Bh="globals",SC="name",$y=[uo,bt,yi,sr,Ii,Fo,yr,wi,vi,lo,ho,Oc,Mc],RC=[...$y,Lc],qy=[uo,bt,yi,tc,Ii,Fo,yr,wi,vi,lo,ho,Oc,Mc,Lc],jy=qy,$h=[...jy,Uh,js,zs],PC=$h,zy=[...$h,Bh],CC=zy;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl extends Vy{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function Le(n,e){const t=L(n);return zt.O(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function em(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Hn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Gy(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e,t){this.comparator=e,this.root=t||Ge.EMPTY}insert(e,t){return new fe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ge.BLACK,null,null))}remove(e){return new fe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ge.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new fa(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new fa(this.root,e,this.comparator,!1)}getReverseIterator(){return new fa(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new fa(this.root,e,this.comparator,!0)}}class fa{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ge{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??Ge.RED,this.left=i??Ge.EMPTY,this.right=s??Ge.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new Ge(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Ge.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Ge.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ge.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ge.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw F(43730,{key:this.key,value:this.value});if(this.right.isRed())throw F(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw F(27949);return e+(this.isRed()?0:1)}}Ge.EMPTY=null,Ge.RED=!0,Ge.BLACK=!1;Ge.EMPTY=new class{constructor(){this.size=0}get key(){throw F(57766)}get value(){throw F(16141)}get color(){throw F(16727)}get left(){throw F(29726)}get right(){throw F(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new Ge(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e){this.comparator=e,this.data=new fe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new tm(this.data.getIterator())}getIteratorFrom(e){return new tm(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof ce)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new ce(this.comparator);return t.data=e,t}}class tm{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Wr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.fields=e,e.sort(Ie.comparator)}static empty(){return new lt([])}unionWith(e){let t=new ce(Ie.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new lt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return gi(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wy extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kC(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Wy("Invalid base64 string: "+s):s}})(e);return new be(t)}static fromUint8Array(e){const t=(function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s})(e);return new be(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return H(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}be.EMPTY_BYTE_STRING=new be("");const DC=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function tn(n){if(q(!!n,39018),typeof n=="string"){let e=0;const t=DC.exec(n);if(q(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ge(n.seconds),nanos:ge(n.nanos)}}function ge(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function nn(n){return typeof n=="string"?be.fromBase64String(n):be.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hy="server_timestamp",Ky="__type__",Qy="__previous_value__",Jy="__local_write_time__";function Fc(n){return(n?.mapValue?.fields||{})[Ky]?.stringValue===Hy}function Uc(n){const e=n.mapValue.fields[Qy];return Fc(e)?Uc(e):e}function fo(n){const e=tn(n.mapValue.fields[Jy].timestampValue);return new se(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VC{constructor(e,t,r,i,s,o,c,u,l,d,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=l,this.isUsingEmulator=d,this.apiKey=p}}const rc="(default)";class Ln{constructor(e,t){this.projectId=e,this.database=t||rc}static empty(){return new Ln("","")}get isDefaultDatabase(){return this.database===rc}isEqual(e){return e instanceof Ln&&e.projectId===this.projectId&&e.database===this.database}}function xC(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new D(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ln(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qh="__type__",Yy="__max__",Tn={mapValue:{fields:{__type__:{stringValue:Yy}}}},jh="__vector__",Ei="value",Va={nullValue:"NULL_VALUE"};function Fn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Fc(n)?4:Xy(n)?9007199254740991:Bc(n)?10:11:F(28295,{value:n})}function Kt(n,e){if(n===e)return!0;const t=Fn(n);if(t!==Fn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return fo(n).isEqual(fo(e));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=tn(i.timestampValue),c=tn(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,s){return nn(i.bytesValue).isEqual(nn(s.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,s){return ge(i.geoPointValue.latitude)===ge(s.geoPointValue.latitude)&&ge(i.geoPointValue.longitude)===ge(s.geoPointValue.longitude)})(n,e);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return ge(i.integerValue)===ge(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=ge(i.doubleValue),c=ge(s.doubleValue);return o===c?co(o)===co(c):isNaN(o)&&isNaN(c)}return!1})(n,e);case 9:return gi(n.arrayValue.values||[],e.arrayValue.values||[],Kt);case 10:case 11:return(function(i,s){const o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(em(o)!==em(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!Kt(o[u],c[u])))return!1;return!0})(n,e);default:return F(52216,{left:n})}}function po(n,e){return(n.values||[]).find((t=>Kt(t,e)))!==void 0}function Un(n,e){if(n===e)return 0;const t=Fn(n),r=Fn(e);if(t!==r)return H(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return H(n.booleanValue,e.booleanValue);case 2:return(function(s,o){const c=ge(s.integerValue||s.doubleValue),u=ge(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return nm(n.timestampValue,e.timestampValue);case 4:return nm(fo(n),fo(e));case 5:return Tl(n.stringValue,e.stringValue);case 6:return(function(s,o){const c=nn(s),u=nn(o);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(s,o){const c=s.split("/"),u=o.split("/");for(let l=0;l<c.length&&l<u.length;l++){const d=H(c[l],u[l]);if(d!==0)return d}return H(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(s,o){const c=H(ge(s.latitude),ge(o.latitude));return c!==0?c:H(ge(s.longitude),ge(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return rm(n.arrayValue,e.arrayValue);case 10:return(function(s,o){const c=s.fields||{},u=o.fields||{},l=c[Ei]?.arrayValue,d=u[Ei]?.arrayValue,p=H(l?.values?.length||0,d?.values?.length||0);return p!==0?p:rm(l,d)})(n.mapValue,e.mapValue);case 11:return(function(s,o){if(s===Tn.mapValue&&o===Tn.mapValue)return 0;if(s===Tn.mapValue)return 1;if(o===Tn.mapValue)return-1;const c=s.fields||{},u=Object.keys(c),l=o.fields||{},d=Object.keys(l);u.sort(),d.sort();for(let p=0;p<u.length&&p<d.length;++p){const m=Tl(u[p],d[p]);if(m!==0)return m;const w=Un(c[u[p]],l[d[p]]);if(w!==0)return w}return H(u.length,d.length)})(n.mapValue,e.mapValue);default:throw F(23264,{he:t})}}function nm(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return H(n,e);const t=tn(n),r=tn(e),i=H(t.seconds,r.seconds);return i!==0?i:H(t.nanos,r.nanos)}function rm(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=Un(t[i],r[i]);if(s)return s}return H(t.length,r.length)}function Ti(n){return Cl(n)}function Cl(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=tn(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return nn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return O.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Cl(s);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${Cl(t.fields[o])}`;return i+"}"})(n.mapValue):F(61005,{value:n})}function xa(n){switch(Fn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Uc(n);return e?16+xa(e):16;case 5:return 2*n.stringValue.length;case 6:return nn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((i,s)=>i+xa(s)),0)})(n.arrayValue);case 10:case 11:return(function(r){let i=0;return Hn(r.fields,((s,o)=>{i+=s.length+xa(o)})),i})(n.mapValue);default:throw F(13486,{value:n})}}function Tr(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function kl(n){return!!n&&"integerValue"in n}function mo(n){return!!n&&"arrayValue"in n}function im(n){return!!n&&"nullValue"in n}function sm(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Na(n){return!!n&&"mapValue"in n}function Bc(n){return(n?.mapValue?.fields||{})[qh]?.stringValue===jh}function Gs(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Hn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Gs(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Gs(n.arrayValue.values[t]);return e}return{...n}}function Xy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Yy}const Zy={mapValue:{fields:{[qh]:{stringValue:jh},[Ei]:{arrayValue:{}}}}};function NC(n){return"nullValue"in n?Va:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Tr(Ln.empty(),O.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?Bc(n)?Zy:{mapValue:{}}:F(35942,{value:n})}function OC(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Tr(Ln.empty(),O.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?Zy:"mapValue"in n?Bc(n)?{mapValue:{}}:Tn:F(61959,{value:n})}function om(n,e){const t=Un(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function am(n,e){const t=Un(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this.value=e}static empty(){return new We({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Na(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Gs(t)}setAll(e){let t=Ie.emptyPath(),r={},i=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,i),r={},i=[],t=c.popLast()}o?r[c.lastSegment()]=Gs(o):i.push(c.lastSegment())}));const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());Na(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Kt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Na(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Hn(t,((i,s)=>e[i]=s));for(const i of r)delete e[i]}clone(){return new We(Gs(this.value))}}function eI(n){const e=[];return Hn(n.fields,((t,r)=>{const i=new Ie([t]);if(Na(r)){const s=eI(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)})),new lt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e,t,r,i,s,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new me(e,0,z.min(),z.min(),z.min(),We.empty(),0)}static newFoundDocument(e,t,r,i){return new me(e,1,t,z.min(),r,i,0)}static newNoDocument(e,t){return new me(e,2,t,z.min(),z.min(),We.empty(),0)}static newUnknownDocument(e,t){return new me(e,3,t,z.min(),z.min(),We.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=We.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=We.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(e,t){this.position=e,this.inclusive=t}}function cm(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=O.comparator(O.fromName(o.referenceValue),t.key):r=Un(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function um(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Kt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(e,t="asc"){this.field=e,this.dir=t}}function MC(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{}class Z extends tI{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new LC(e,t,r):t==="array-contains"?new BC(e,r):t==="in"?new aI(e,r):t==="not-in"?new $C(e,r):t==="array-contains-any"?new qC(e,r):new Z(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new FC(e,r):new UC(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Un(t,this.value)):t!==null&&Fn(this.value)===Fn(t)&&this.matchesComparison(Un(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return F(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ae extends tI{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ae(e,t)}matches(e){return Ai(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Ai(n){return n.op==="and"}function Dl(n){return n.op==="or"}function zh(n){return nI(n)&&Ai(n)}function nI(n){for(const e of n.filters)if(e instanceof ae)return!1;return!0}function Vl(n){if(n instanceof Z)return n.field.canonicalString()+n.op.toString()+Ti(n.value);if(zh(n))return n.filters.map((e=>Vl(e))).join(",");{const e=n.filters.map((t=>Vl(t))).join(",");return`${n.op}(${e})`}}function rI(n,e){return n instanceof Z?(function(r,i){return i instanceof Z&&r.op===i.op&&r.field.isEqual(i.field)&&Kt(r.value,i.value)})(n,e):n instanceof ae?(function(r,i){return i instanceof ae&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce(((s,o,c)=>s&&rI(o,i.filters[c])),!0):!1})(n,e):void F(19439)}function iI(n,e){const t=n.filters.concat(e);return ae.create(t,n.op)}function sI(n){return n instanceof Z?(function(t){return`${t.field.canonicalString()} ${t.op} ${Ti(t.value)}`})(n):n instanceof ae?(function(t){return t.op.toString()+" {"+t.getFilters().map(sI).join(" ,")+"}"})(n):"Filter"}class LC extends Z{constructor(e,t,r){super(e,t,r),this.key=O.fromName(r.referenceValue)}matches(e){const t=O.comparator(e.key,this.key);return this.matchesComparison(t)}}class FC extends Z{constructor(e,t){super(e,"in",t),this.keys=oI("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class UC extends Z{constructor(e,t){super(e,"not-in",t),this.keys=oI("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function oI(n,e){return(e.arrayValue?.values||[]).map((t=>O.fromName(t.referenceValue)))}class BC extends Z{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return mo(t)&&po(t.arrayValue,this.value)}}class aI extends Z{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&po(this.value.arrayValue,t)}}class $C extends Z{constructor(e,t){super(e,"not-in",t)}matches(e){if(po(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!po(this.value.arrayValue,t)}}class qC extends Z{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!mo(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>po(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jC{constructor(e,t=null,r=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.Te=null}}function xl(n,e=null,t=[],r=[],i=null,s=null,o=null){return new jC(n,e,t,r,i,s,o)}function Ar(n){const e=L(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>Vl(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(s){return s.field.canonicalString()+s.dir})(r))).join(","),Lo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Ti(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Ti(r))).join(",")),e.Te=t}return e.Te}function Uo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!MC(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!rI(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!um(n.startAt,e.startAt)&&um(n.endAt,e.endAt)}function ic(n){return O.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function sc(n,e){return n.filters.filter((t=>t instanceof Z&&t.field.isEqual(e)))}function lm(n,e,t){let r=Va,i=!0;for(const s of sc(n,e)){let o=Va,c=!0;switch(s.op){case"<":case"<=":o=NC(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,c=!1;break;case"!=":case"not-in":o=Va}om({value:r,inclusive:i},{value:o,inclusive:c})<0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];om({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function hm(n,e,t){let r=Tn,i=!0;for(const s of sc(n,e)){let o=Tn,c=!0;switch(s.op){case">=":case">":o=OC(s.value),c=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,c=!1;break;case"!=":case"not-in":o=Tn}am({value:r,inclusive:i},{value:o,inclusive:c})>0&&(r=o,i=c)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];am({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e,t=null,r=[],i=[],s=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function cI(n,e,t,r,i,s,o,c){return new on(n,e,t,r,i,s,o,c)}function ji(n){return new on(n)}function dm(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function zC(n){return O.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Gh(n){return n.collectionGroup!==null}function ci(n){const e=L(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new ce(Ie.comparator);return o.filters.forEach((u=>{u.getFlattenedFilters().forEach((l=>{l.isInequality()&&(c=c.add(l.field))}))})),c})(e).forEach((s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new go(s,r))})),t.has(Ie.keyField().canonicalString())||e.Ie.push(new go(Ie.keyField(),r))}return e.Ie}function ot(n){const e=L(n);return e.Ee||(e.Ee=GC(e,ci(n))),e.Ee}function GC(n,e){if(n.limitType==="F")return xl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new go(i.field,s)}));const t=n.endAt?new Bn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Bn(n.startAt.position,n.startAt.inclusive):null;return xl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Nl(n,e){const t=n.filters.concat([e]);return new on(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function WC(n,e){const t=n.explicitOrderBy.concat([e]);return new on(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function oc(n,e,t){return new on(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function HC(n,e){return new on(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,e,n.endAt)}function KC(n,e){return new on(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),n.limit,n.limitType,n.startAt,e)}function Bo(n,e){return Uo(ot(n),ot(e))&&n.limitType===e.limitType}function uI(n){return`${Ar(ot(n))}|lt:${n.limitType}`}function Xr(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((i=>sI(i))).join(", ")}]`),Lo(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((i=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(i))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((i=>Ti(i))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((i=>Ti(i))).join(",")),`Target(${r})`})(ot(n))}; limitType=${n.limitType})`}function $o(n,e){return e.isFoundDocument()&&(function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):O.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)})(n,e)&&(function(r,i){for(const s of ci(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0})(n,e)&&(function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0})(n,e)&&(function(r,i){return!(r.startAt&&!(function(o,c,u){const l=cm(o,c,u);return o.inclusive?l<=0:l<0})(r.startAt,ci(r),i)||r.endAt&&!(function(o,c,u){const l=cm(o,c,u);return o.inclusive?l>=0:l>0})(r.endAt,ci(r),i))})(n,e)}function lI(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function hI(n){return(e,t)=>{let r=!1;for(const i of ci(n)){const s=QC(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function QC(n,e,t){const r=n.field.isKeyField()?O.comparator(e.key,t.key):(function(s,o,c){const u=o.data.field(s),l=c.data.field(s);return u!==null&&l!==null?Un(u,l):F(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return F(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Hn(this.inner,((t,r)=>{for(const[i,s]of r)e(i,s)}))}isEmpty(){return Gy(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JC=new fe(O.comparator);function ht(){return JC}const dI=new fe(O.comparator);function Cs(...n){let e=dI;for(const t of n)e=e.insert(t.key,t);return e}function fI(n){let e=dI;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function jt(){return Ws()}function pI(){return Ws()}function Ws(){return new an((n=>n.toString()),((n,e)=>n.isEqual(e)))}const YC=new fe(O.comparator),XC=new ce(O.comparator);function K(...n){let e=XC;for(const t of n)e=e.add(t);return e}const ZC=new ce(H);function Wh(){return ZC}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hh(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:co(e)?"-0":e}}function mI(n){return{integerValue:""+n}}function gI(n,e){return Ny(e)?mI(e):Hh(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{constructor(){this._=void 0}}function e0(n,e,t){return n instanceof bi?(function(i,s){const o={fields:{[Ky]:{stringValue:Hy},[Jy]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Fc(s)&&(s=Uc(s)),s&&(o.fields[Qy]=s),{mapValue:o}})(t,e):n instanceof br?yI(n,e):n instanceof Sr?II(n,e):(function(i,s){const o=_I(i,s),c=fm(o)+fm(i.Ae);return kl(o)&&kl(i.Ae)?mI(c):Hh(i.serializer,c)})(n,e)}function t0(n,e,t){return n instanceof br?yI(n,e):n instanceof Sr?II(n,e):t}function _I(n,e){return n instanceof Si?(function(r){return kl(r)||(function(s){return!!s&&"doubleValue"in s})(r)})(e)?e:{integerValue:0}:null}class bi extends $c{}class br extends $c{constructor(e){super(),this.elements=e}}function yI(n,e){const t=wI(e);for(const r of n.elements)t.some((i=>Kt(i,r)))||t.push(r);return{arrayValue:{values:t}}}class Sr extends $c{constructor(e){super(),this.elements=e}}function II(n,e){let t=wI(e);for(const r of n.elements)t=t.filter((i=>!Kt(i,r)));return{arrayValue:{values:t}}}class Si extends $c{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function fm(n){return ge(n.integerValue||n.doubleValue)}function wI(n){return mo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo{constructor(e,t){this.field=e,this.transform=t}}function n0(n,e){return n.field.isEqual(e.field)&&(function(r,i){return r instanceof br&&i instanceof br||r instanceof Sr&&i instanceof Sr?gi(r.elements,i.elements,Kt):r instanceof Si&&i instanceof Si?Kt(r.Ae,i.Ae):r instanceof bi&&i instanceof bi})(n.transform,e.transform)}class r0{constructor(e,t){this.version=e,this.transformResults=t}}class we{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new we}static exists(e){return new we(void 0,e)}static updateTime(e){return new we(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Oa(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class qc{}function vI(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Gi(n.key,we.none()):new zi(n.key,n.data,we.none());{const t=n.data,r=We.empty();let i=new ce(Ie.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new cn(n.key,r,new lt(i.toArray()),we.none())}}function i0(n,e,t){n instanceof zi?(function(i,s,o){const c=i.value.clone(),u=mm(i.fieldTransforms,s,o.transformResults);c.setAll(u),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):n instanceof cn?(function(i,s,o){if(!Oa(i.precondition,s))return void s.convertToUnknownDocument(o.version);const c=mm(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(EI(i)),u.setAll(c),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,e,t):(function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Hs(n,e,t,r){return n instanceof zi?(function(s,o,c,u){if(!Oa(s.precondition,o))return c;const l=s.value.clone(),d=gm(s.fieldTransforms,u,o);return l.setAll(d),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null})(n,e,t,r):n instanceof cn?(function(s,o,c,u){if(!Oa(s.precondition,o))return c;const l=gm(s.fieldTransforms,u,o),d=o.data;return d.setAll(EI(s)),d.setAll(l),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(s,o,c){return Oa(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,e,t)}function s0(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=_I(r.transform,i||null);s!=null&&(t===null&&(t=We.empty()),t.set(r.field,s))}return t||null}function pm(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&gi(r,i,((s,o)=>n0(s,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class zi extends qc{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class cn extends qc{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function EI(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function mm(n,e,t){const r=new Map;q(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,c=e.data.field(s.field);r.set(s.field,t0(o,c,t[i]))}return r}function gm(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,e0(s,o,e))}return r}class Gi extends qc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Kh extends qc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qh{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&i0(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Hs(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Hs(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=pI();return this.mutations.forEach((i=>{const s=e.get(i.key),o=s.overlayedDocument;let c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;const u=vI(o,c);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(z.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),K())}isEqual(e){return this.batchId===e.batchId&&gi(this.mutations,e.mutations,((t,r)=>pm(t,r)))&&gi(this.baseMutations,e.baseMutations,((t,r)=>pm(t,r)))}}class Jh{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){q(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let i=(function(){return YC})();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new Jh(e,t,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yh{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o0{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ve,te;function TI(n){switch(n){case R.OK:return F(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return F(15467,{code:n})}}function AI(n){if(n===void 0)return Ce("GRPC error has no .code"),R.UNKNOWN;switch(n){case Ve.OK:return R.OK;case Ve.CANCELLED:return R.CANCELLED;case Ve.UNKNOWN:return R.UNKNOWN;case Ve.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case Ve.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case Ve.INTERNAL:return R.INTERNAL;case Ve.UNAVAILABLE:return R.UNAVAILABLE;case Ve.UNAUTHENTICATED:return R.UNAUTHENTICATED;case Ve.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case Ve.NOT_FOUND:return R.NOT_FOUND;case Ve.ALREADY_EXISTS:return R.ALREADY_EXISTS;case Ve.PERMISSION_DENIED:return R.PERMISSION_DENIED;case Ve.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case Ve.ABORTED:return R.ABORTED;case Ve.OUT_OF_RANGE:return R.OUT_OF_RANGE;case Ve.UNIMPLEMENTED:return R.UNIMPLEMENTED;case Ve.DATA_LOSS:return R.DATA_LOSS;default:return F(39323,{code:n})}}(te=Ve||(Ve={}))[te.OK=0]="OK",te[te.CANCELLED=1]="CANCELLED",te[te.UNKNOWN=2]="UNKNOWN",te[te.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",te[te.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",te[te.NOT_FOUND=5]="NOT_FOUND",te[te.ALREADY_EXISTS=6]="ALREADY_EXISTS",te[te.PERMISSION_DENIED=7]="PERMISSION_DENIED",te[te.UNAUTHENTICATED=16]="UNAUTHENTICATED",te[te.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",te[te.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",te[te.ABORTED=10]="ABORTED",te[te.OUT_OF_RANGE=11]="OUT_OF_RANGE",te[te.UNIMPLEMENTED=12]="UNIMPLEMENTED",te[te.INTERNAL=13]="INTERNAL",te[te.UNAVAILABLE=14]="UNAVAILABLE",te[te.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bI(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a0=new Pn([4294967295,4294967295],0);function _m(n){const e=bI().encode(n),t=new _y;return t.update(e),new Uint8Array(t.digest())}function ym(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Pn([t,r],0),new Pn([i,s],0)]}class Xh{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ks(`Invalid padding: ${t}`);if(r<0)throw new ks(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ks(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ks(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Pn.fromNumber(this.ge)}ye(e,t,r){let i=e.add(t.multiply(Pn.fromNumber(r)));return i.compare(a0)===1&&(i=new Pn([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=_m(e),[r,i]=ym(t);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);if(!this.we(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Xh(s,i,t);return r.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=_m(e),[r,i]=ym(t);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);this.be(o)}}be(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ks extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,zo.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new jo(z.min(),i,new fe(H),ht(),K())}}class zo{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new zo(r,t,K(),K(),K())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.De=i}}class SI{constructor(e,t){this.targetId=e,this.Ce=t}}class RI{constructor(e,t,r=be.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class Im{constructor(){this.ve=0,this.Fe=wm(),this.Me=be.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=K(),t=K(),r=K();return this.Fe.forEach(((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:F(38017,{changeType:s})}})),new zo(this.Me,this.xe,e,t,r)}Ke(){this.Oe=!1,this.Fe=wm()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,q(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class c0{constructor(e){this.Ge=e,this.ze=new Map,this.je=ht(),this.He=pa(),this.Je=pa(),this.Ze=new fe(H)}Xe(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.Ke(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:F(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,i)=>{this.rt(i)&&t(i)}))}st(e){const t=e.targetId,r=e.Ce.count,i=this.ot(t);if(i){const s=i.target;if(ic(s))if(r===0){const o=new O(s.path);this.et(t,o,me.newNoDocument(o,z.min()))}else q(r===1,20013,{expectedCount:r});else{const o=this._t(t);if(o!==r){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const l=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,l)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,c;try{o=nn(r).toUint8Array()}catch(u){if(u instanceof Wy)return Ot("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Xh(o,i,s)}catch(u){return Ot(u instanceof ks?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let i=0;return r.forEach((s=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.et(t,s,null),i++)})),i}Tt(e){const t=new Map;this.ze.forEach(((s,o)=>{const c=this.ot(o);if(c){if(s.current&&ic(c.target)){const u=new O(c.target.path);this.It(u).has(o)||this.Et(o,u)||this.et(o,u,me.newNoDocument(u,e))}s.Be&&(t.set(o,s.ke()),s.Ke())}}));let r=K();this.Je.forEach(((s,o)=>{let c=!0;o.forEachWhile((u=>{const l=this.ot(u);return!l||l.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(s))})),this.je.forEach(((s,o)=>o.setReadTime(e)));const i=new jo(e,t,this.Ze,this.je,r);return this.je=ht(),this.He=pa(),this.Je=pa(),this.Ze=new fe(H),i}Ye(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,r),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const i=this.nt(e);this.Et(e,t)?i.qe(t,1):i.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Im,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new ce(H),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new ce(H),this.He=this.He.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||x("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Im),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function pa(){return new fe(O.comparator)}function wm(){return new fe(O.comparator)}const u0={asc:"ASCENDING",desc:"DESCENDING"},l0={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},h0={and:"AND",or:"OR"};class d0{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ol(n,e){return n.useProto3Json||Lo(e)?e:{value:e}}function Ri(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function PI(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function f0(n,e){return Ri(n,e.toTimestamp())}function ke(n){return q(!!n,49232),z.fromTimestamp((function(t){const r=tn(t);return new se(r.seconds,r.nanos)})(n))}function Zh(n,e){return Ml(n,e).canonicalString()}function Ml(n,e){const t=(function(i){return new X(["projects",i.projectId,"databases",i.database])})(n).child("documents");return e===void 0?t:t.child(e)}function CI(n){const e=X.fromString(n);return q(UI(e),10190,{key:e.toString()}),e}function _o(n,e){return Zh(n.databaseId,e.path)}function Gt(n,e){const t=CI(e);if(t.get(1)!==n.databaseId.projectId)throw new D(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new D(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new O(VI(t))}function kI(n,e){return Zh(n.databaseId,e)}function DI(n){const e=CI(n);return e.length===4?X.emptyPath():VI(e)}function Ll(n){return new X(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function VI(n){return q(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function vm(n,e,t){return{name:_o(n,e),fields:t.value.mapValue.fields}}function xI(n,e,t){const r=Gt(n,e.name),i=ke(e.updateTime),s=e.createTime?ke(e.createTime):z.min(),o=new We({mapValue:{fields:e.fields}}),c=me.newFoundDocument(r,i,s,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function p0(n,e){return"found"in e?(function(r,i){q(!!i.found,43571),i.found.name,i.found.updateTime;const s=Gt(r,i.found.name),o=ke(i.found.updateTime),c=i.found.createTime?ke(i.found.createTime):z.min(),u=new We({mapValue:{fields:i.found.fields}});return me.newFoundDocument(s,o,c,u)})(n,e):"missing"in e?(function(r,i){q(!!i.missing,3894),q(!!i.readTime,22933);const s=Gt(r,i.missing),o=ke(i.readTime);return me.newNoDocument(s,o)})(n,e):F(7234,{result:e})}function m0(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:F(39313,{state:l})})(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=(function(l,d){return l.useProto3Json?(q(d===void 0||typeof d=="string",58123),be.fromBase64String(d||"")):(q(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),be.fromUint8Array(d||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(l){const d=l.code===void 0?R.UNKNOWN:AI(l.code);return new D(d,l.message||"")})(o);t=new RI(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Gt(n,r.document.name),s=ke(r.document.updateTime),o=r.document.createTime?ke(r.document.createTime):z.min(),c=new We({mapValue:{fields:r.document.fields}}),u=me.newFoundDocument(i,s,o,c),l=r.targetIds||[],d=r.removedTargetIds||[];t=new Ma(l,d,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Gt(n,r.document),s=r.readTime?ke(r.readTime):z.min(),o=me.newNoDocument(i,s),c=r.removedTargetIds||[];t=new Ma([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Gt(n,r.document),s=r.removedTargetIds||[];t=new Ma([],s,i,null)}else{if(!("filter"in e))return F(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new o0(i,s),c=r.targetId;t=new SI(c,o)}}return t}function yo(n,e){let t;if(e instanceof zi)t={update:vm(n,e.key,e.value)};else if(e instanceof Gi)t={delete:_o(n,e.key)};else if(e instanceof cn)t={update:vm(n,e.key,e.data),updateMask:v0(e.fieldMask)};else{if(!(e instanceof Kh))return F(16599,{dt:e.type});t={verify:_o(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(s,o){const c=o.transform;if(c instanceof bi)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof br)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Sr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Si)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw F(20930,{transform:o.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(i,s){return s.updateTime!==void 0?{updateTime:f0(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:F(27497)})(n,e.precondition)),t}function Fl(n,e){const t=e.currentDocument?(function(s){return s.updateTime!==void 0?we.updateTime(ke(s.updateTime)):s.exists!==void 0?we.exists(s.exists):we.none()})(e.currentDocument):we.none(),r=e.updateTransforms?e.updateTransforms.map((i=>(function(o,c){let u=null;if("setToServerValue"in c)q(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new bi;else if("appendMissingElements"in c){const d=c.appendMissingElements.values||[];u=new br(d)}else if("removeAllFromArray"in c){const d=c.removeAllFromArray.values||[];u=new Sr(d)}else"increment"in c?u=new Si(o,c.increment):F(16584,{proto:c});const l=Ie.fromServerFormat(c.fieldPath);return new qo(l,u)})(n,i))):[];if(e.update){e.update.name;const i=Gt(n,e.update.name),s=new We({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(u){const l=u.fieldPaths||[];return new lt(l.map((d=>Ie.fromServerFormat(d))))})(e.updateMask);return new cn(i,s,o,t,r)}return new zi(i,s,t,r)}if(e.delete){const i=Gt(n,e.delete);return new Gi(i,t)}if(e.verify){const i=Gt(n,e.verify);return new Kh(i,t)}return F(1463,{proto:e})}function g0(n,e){return n&&n.length>0?(q(e!==void 0,14353),n.map((t=>(function(i,s){let o=i.updateTime?ke(i.updateTime):ke(s);return o.isEqual(z.min())&&(o=ke(s)),new r0(o,i.transformResults||[])})(t,e)))):[]}function NI(n,e){return{documents:[kI(n,e.path)]}}function OI(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=kI(n,i);const s=(function(l){if(l.length!==0)return FI(ae.create(l,"and"))})(e.filters);s&&(t.structuredQuery.where=s);const o=(function(l){if(l.length!==0)return l.map((d=>(function(m){return{field:Zr(m.field),direction:y0(m.dir)}})(d)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Ol(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(l){return{before:l.inclusive,values:l.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(l){return{before:!l.inclusive,values:l.position}})(e.endAt)),{ft:t,parent:i}}function MI(n){let e=DI(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){q(r===1,65062);const d=t.from[0];d.allDescendants?i=d.collectionId:e=e.child(d.collectionId)}let s=[];t.where&&(s=(function(p){const m=LI(p);return m instanceof ae&&zh(m)?m.getFilters():[m]})(t.where));let o=[];t.orderBy&&(o=(function(p){return p.map((m=>(function(C){return new go(ei(C.field),(function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(m)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let m;return m=typeof p=="object"?p.value:p,Lo(m)?null:m})(t.limit));let u=null;t.startAt&&(u=(function(p){const m=!!p.before,w=p.values||[];return new Bn(w,m)})(t.startAt));let l=null;return t.endAt&&(l=(function(p){const m=!p.before,w=p.values||[];return new Bn(w,m)})(t.endAt)),cI(e,i,o,s,c,"F",u,l)}function _0(n,e){const t=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F(28987,{purpose:i})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function LI(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=ei(t.unaryFilter.field);return Z.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=ei(t.unaryFilter.field);return Z.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=ei(t.unaryFilter.field);return Z.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ei(t.unaryFilter.field);return Z.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return F(61313);default:return F(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Z.create(ei(t.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return F(58110);default:return F(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return ae.create(t.compositeFilter.filters.map((r=>LI(r))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return F(1026)}})(t.compositeFilter.op))})(n):F(30097,{filter:n})}function y0(n){return u0[n]}function I0(n){return l0[n]}function w0(n){return h0[n]}function Zr(n){return{fieldPath:n.canonicalString()}}function ei(n){return Ie.fromServerFormat(n.fieldPath)}function FI(n){return n instanceof Z?(function(t){if(t.op==="=="){if(sm(t.value))return{unaryFilter:{field:Zr(t.field),op:"IS_NAN"}};if(im(t.value))return{unaryFilter:{field:Zr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(sm(t.value))return{unaryFilter:{field:Zr(t.field),op:"IS_NOT_NAN"}};if(im(t.value))return{unaryFilter:{field:Zr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Zr(t.field),op:I0(t.op),value:t.value}}})(n):n instanceof ae?(function(t){const r=t.getFilters().map((i=>FI(i)));return r.length===1?r[0]:{compositeFilter:{op:w0(t.op),filters:r}}})(n):F(54877,{filter:n})}function v0(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function UI(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function BI(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,t,r,i,s=z.min(),o=z.min(),c=be.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Jt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $I{constructor(e){this.yt=e}}function E0(n,e){let t;if(e.document)t=xI(n.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=O.fromSegments(e.noDocument.path),i=Pr(e.noDocument.readTime);t=me.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return F(56709);{const r=O.fromSegments(e.unknownDocument.path),i=Pr(e.unknownDocument.version);t=me.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime((function(i){const s=new se(i[0],i[1]);return z.fromTimestamp(s)})(e.readTime)),t}function Em(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:ac(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=(function(s,o){return{name:_o(s,o.key),fields:o.data.value.mapValue.fields,updateTime:Ri(s,o.version.toTimestamp()),createTime:Ri(s,o.createTime.toTimestamp())}})(n.yt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:Rr(e.version)};else{if(!e.isUnknownDocument())return F(57904,{document:e});r.unknownDocument={path:t.path.toArray(),version:Rr(e.version)}}return r}function ac(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function Rr(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Pr(n){const e=new se(n.seconds,n.nanoseconds);return z.fromTimestamp(e)}function ar(n,e){const t=(e.baseMutations||[]).map((s=>Fl(n.yt,s)));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const c=e.mutations[s+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map((s=>Fl(n.yt,s))),i=se.fromMillis(e.localWriteTimeMs);return new Qh(e.batchId,i,t,r)}function Ds(n){const e=Pr(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?Pr(n.lastLimboFreeSnapshotVersion):z.min();let r;return r=(function(s){return s.documents!==void 0})(n.query)?(function(s){const o=s.documents.length;return q(o===1,1966,{count:o}),ot(ji(DI(s.documents[0])))})(n.query):(function(s){return ot(MI(s))})(n.query),new Jt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,be.fromBase64String(n.resumeToken))}function qI(n,e){const t=Rr(e.snapshotVersion),r=Rr(e.lastLimboFreeSnapshotVersion);let i;i=ic(e.target)?NI(n.yt,e.target):OI(n.yt,e.target).ft;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Ar(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function ed(n){const e=MI({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?oc(e,e.limit,"L"):e}function Ku(n,e){return new Yh(e.largestBatchId,Fl(n.yt,e.overlayMutation))}function Tm(n,e){const t=e.path.lastSegment();return[n,Ze(e.path.popLast()),t]}function Am(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:Rr(r.readTime),documentKey:Ze(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T0{getBundleMetadata(e,t){return bm(e).get(t).next((r=>{if(r)return(function(s){return{id:s.bundleId,createTime:Pr(s.createTime),version:s.version}})(r)}))}saveBundleMetadata(e,t){return bm(e).put((function(i){return{bundleId:i.id,createTime:Rr(ke(i.createTime)),version:i.version}})(t))}getNamedQuery(e,t){return Sm(e).get(t).next((r=>{if(r)return(function(s){return{name:s.name,query:ed(s.bundledQuery),readTime:Pr(s.readTime)}})(r)}))}saveNamedQuery(e,t){return Sm(e).put((function(i){return{name:i.name,readTime:Rr(ke(i.readTime)),bundledQuery:i.bundledQuery}})(t))}}function bm(n){return Le(n,Oc)}function Sm(n){return Le(n,Mc)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const r=t.uid||"";return new jc(e,r)}getOverlay(e,t){return ys(e).get(Tm(this.userId,t)).next((r=>r?Ku(this.serializer,r):null))}getOverlays(e,t){const r=jt();return A.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&r.set(i,s)})))).next((()=>r))}saveOverlays(e,t,r){const i=[];return r.forEach(((s,o)=>{const c=new Yh(t,o);i.push(this.bt(e,c))})),A.waitFor(i)}removeOverlaysForBatchId(e,t,r){const i=new Set;t.forEach((o=>i.add(Ze(o.getCollectionPath()))));const s=[];return i.forEach((o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(ys(e).X(Rl,c))})),A.waitFor(s)}getOverlaysForCollection(e,t,r){const i=jt(),s=Ze(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return ys(e).H(Rl,o).next((c=>{for(const u of c){const l=Ku(this.serializer,u);i.set(l.getKey(),l)}return i}))}getOverlaysForCollectionGroup(e,t,r,i){const s=jt();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return ys(e).ee({index:By,range:c},((u,l,d)=>{const p=Ku(this.serializer,l);s.size()<i||p.largestBatchId===o?(s.set(p.getKey(),p),o=p.largestBatchId):d.done()})).next((()=>s))}bt(e,t){return ys(e).put((function(i,s,o){const[c,u,l]=Tm(s,o.mutation.key);return{userId:s,collectionPath:u,documentId:l,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:yo(i.yt,o.mutation)}})(this.serializer,this.userId,t))}}function ys(n){return Le(n,Lc)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A0{St(e){return Le(e,Bh)}getSessionToken(e){return this.St(e).get("sessionToken").next((t=>{const r=t?.value;return r?be.fromUint8Array(r):be.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.St(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(ge(e.integerValue));else if("doubleValue"in e){const r=ge(e.doubleValue);isNaN(r)?this.Ft(t,13):(this.Ft(t,15),co(r)?t.Mt(0):t.Mt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ft(t,20),typeof r=="string"&&(r=tn(r)),t.xt(`${r.seconds||""}`),t.Mt(r.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(nn(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.Ft(t,45),t.Mt(r.latitude||0),t.Mt(r.longitude||0)}else"mapValue"in e?Xy(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):Bc(e)?this.kt(e.mapValue,t):(this.Kt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Nt(t)):F(19022,{Ut:e})}Ot(e,t){this.Ft(t,25),this.$t(e,t)}$t(e,t){t.xt(e)}Kt(e,t){const r=e.fields||{};this.Ft(t,55);for(const i of Object.keys(r))this.Ot(i,t),this.Ct(r[i],t)}kt(e,t){const r=e.fields||{};this.Ft(t,53);const i=Ei,s=r[i].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(ge(s)),this.Ot(i,t),this.Ct(r[i],t)}qt(e,t){const r=e.values||[];this.Ft(t,50);for(const i of r)this.Ct(i,t)}Lt(e,t){this.Ft(t,37),O.fromName(e).path.forEach((r=>{this.Ft(t,60),this.$t(r,t)}))}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}cr.Wt=new cr;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hr=255;function b0(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function Rm(n){const e=64-(function(r){let i=0;for(let s=0;s<8;++s){const o=b0(255&r[s]);if(i+=o,o!==8)break}return i})(n);return Math.ceil(e/8)}class S0{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Qt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Gt(r.value),r=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ht(r.value),r=t.next();this.Jt()}Zt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Gt(r);else if(r<2048)this.Gt(960|r>>>6),this.Gt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|r>>>12),this.Gt(128|63&r>>>6),this.Gt(128|63&r);else{const i=t.codePointAt(0);this.Gt(240|i>>>18),this.Gt(128|63&i>>>12),this.Gt(128|63&i>>>6),this.Gt(128|63&i)}}this.zt()}Xt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ht(r);else if(r<2048)this.Ht(960|r>>>6),this.Ht(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ht(480|r>>>12),this.Ht(128|63&r>>>6),this.Ht(128|63&r);else{const i=t.codePointAt(0);this.Ht(240|i>>>18),this.Ht(128|63&i>>>12),this.Ht(128|63&i>>>6),this.Ht(128|63&i)}}this.Jt()}Yt(e){const t=this.en(e),r=Rm(t);this.tn(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}nn(e){const t=this.en(e),r=Rm(t);this.tn(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}rn(){this.sn(Hr),this.sn(255)}_n(){this.an(Hr),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=(function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)})(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===Hr?(this.sn(Hr),this.sn(0)):this.sn(t)}Ht(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===Hr?(this.an(Hr),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Jt(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class R0{constructor(e){this.cn=e}Bt(e){this.cn.Qt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.Yt(e)}vt(){this.cn.rn()}}class P0{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Xt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class Is{constructor(){this.cn=new S0,this.ascending=new R0(this.cn),this.descending=new P0(this.cn)}seed(e){this.cn.seed(e)}ln(e){return e===0?this.ascending:this.descending}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(e,t,r,i){this.hn=e,this.Pn=t,this.Tn=r,this.In=i}En(){const e=this.In.length,t=e===0||this.In[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.In,0),t!==e?r.set([0],this.In.length):++r[r.length-1],new ur(this.hn,this.Pn,this.Tn,r)}Rn(e,t,r){return{indexId:this.hn,uid:e,arrayValue:La(this.Tn),directionalValue:La(this.In),orderedDocumentKey:La(t),documentKey:r.path.toArray()}}An(e,t,r){const i=this.Rn(e,t,r);return[i.indexId,i.uid,i.arrayValue,i.directionalValue,i.orderedDocumentKey,i.documentKey]}}function _n(n,e){let t=n.hn-e.hn;return t!==0?t:(t=Pm(n.Tn,e.Tn),t!==0?t:(t=Pm(n.In,e.In),t!==0?t:O.comparator(n.Pn,e.Pn)))}function Pm(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}function La(n){return Yg()?(function(t){let r="";for(let i=0;i<t.length;i++)r+=String.fromCharCode(t[i]);return r})(n):n}function Cm(n){return typeof n!="string"?n:(function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r})(n)}class km{constructor(e){this.Vn=new ce(((t,r)=>Ie.comparator(t.field,r.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.dn=e.orderBy,this.mn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Vn=this.Vn.add(r):this.mn.push(r)}}get fn(){return this.Vn.size>1}gn(e){if(q(e.collectionGroup===this.collectionId,49279),this.fn)return!1;const t=Al(e);if(t!==void 0&&!this.pn(t))return!1;const r=ir(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.pn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Vn.size>0){const c=this.Vn.getIterator().getNext();if(!i.has(c.field.canonicalString())){const u=r[s];if(!this.yn(c,u)||!this.wn(this.dn[o++],u))return!1}++s}for(;s<r.length;++s){const c=r[s];if(o>=this.dn.length||!this.wn(this.dn[o++],c))return!1}return!0}bn(){if(this.fn)return null;let e=new ce(Ie.comparator);const t=[];for(const r of this.mn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new Ca(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new Ca(r.field,0))}for(const r of this.dn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new Ca(r.field,r.dir==="asc"?0:1)));return new Za(Za.UNKNOWN_ID,this.collectionId,t,ao.empty())}pn(e){for(const t of this.mn)if(this.yn(t,e))return!0;return!1}yn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}wn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jI(n){if(q(n instanceof Z||n instanceof ae,20012),n instanceof Z){if(n instanceof aI){const t=n.value.arrayValue?.values?.map((r=>Z.create(n.field,"==",r)))||[];return ae.create(t,"or")}return n}const e=n.filters.map((t=>jI(t)));return ae.create(e,n.op)}function C0(n){if(n.getFilters().length===0)return[];const e=$l(jI(n));return q(zI(e),7391),Ul(e)||Bl(e)?[e]:e.getFilters()}function Ul(n){return n instanceof Z}function Bl(n){return n instanceof ae&&zh(n)}function zI(n){return Ul(n)||Bl(n)||(function(t){if(t instanceof ae&&Dl(t)){for(const r of t.getFilters())if(!Ul(r)&&!Bl(r))return!1;return!0}return!1})(n)}function $l(n){if(q(n instanceof Z||n instanceof ae,34018),n instanceof Z)return n;if(n.filters.length===1)return $l(n.filters[0]);const e=n.filters.map((r=>$l(r)));let t=ae.create(e,n.op);return t=cc(t),zI(t)?t:(q(t instanceof ae,64498),q(Ai(t),40251),q(t.filters.length>1,57927),t.filters.reduce(((r,i)=>td(r,i))))}function td(n,e){let t;return q(n instanceof Z||n instanceof ae,38388),q(e instanceof Z||e instanceof ae,25473),t=n instanceof Z?e instanceof Z?(function(i,s){return ae.create([i,s],"and")})(n,e):Dm(n,e):e instanceof Z?Dm(e,n):(function(i,s){if(q(i.filters.length>0&&s.filters.length>0,48005),Ai(i)&&Ai(s))return iI(i,s.getFilters());const o=Dl(i)?i:s,c=Dl(i)?s:i,u=o.filters.map((l=>td(l,c)));return ae.create(u,"or")})(n,e),cc(t)}function Dm(n,e){if(Ai(e))return iI(e,n.getFilters());{const t=e.filters.map((r=>td(n,r)));return ae.create(t,"or")}}function cc(n){if(q(n instanceof Z||n instanceof ae,11850),n instanceof Z)return n;const e=n.getFilters();if(e.length===1)return cc(e[0]);if(nI(n))return n;const t=e.map((i=>cc(i))),r=[];return t.forEach((i=>{i instanceof Z?r.push(i):i instanceof ae&&(i.op===n.op?r.push(...i.filters):r.push(i))})),r.length===1?r[0]:ae.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k0{constructor(){this.Sn=new nd}addToCollectionParentIndex(e,t){return this.Sn.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(_t.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(_t.min())}updateCollectionGroup(e,t,r){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class nd{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new ce(X.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new ce(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vm="IndexedDbIndexManager",ma=new Uint8Array(0);class D0{constructor(e,t){this.databaseId=t,this.Dn=new nd,this.Cn=new an((r=>Ar(r)),((r,i)=>Uo(r,i))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Dn.has(t)){const r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener((()=>{this.Dn.add(t)}));const s={collectionId:r,parent:Ze(i)};return xm(e).put(s)}return A.resolve()}getCollectionParents(e,t){const r=[],i=IDBKeyRange.bound([t,""],[by(t),""],!1,!0);return xm(e).H(i).next((s=>{for(const o of s){if(o.collectionId!==t)break;r.push(qt(o.parent))}return r}))}addFieldIndex(e,t){const r=ws(e),i=(function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map((u=>[u.fieldPath.canonicalString(),u.kind]))}})(t);delete i.indexId;const s=r.add(i);if(t.indexState){const o=Qr(e);return s.next((c=>{o.put(Am(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return s.next()}deleteFieldIndex(e,t){const r=ws(e),i=Qr(e),s=Kr(e);return r.delete(t.indexId).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=ws(e),r=Kr(e),i=Qr(e);return t.X().next((()=>r.X())).next((()=>i.X()))}createTargetIndexes(e,t){return A.forEach(this.vn(t),(r=>this.getIndexType(e,r).next((i=>{if(i===0||i===1){const s=new km(r).bn();if(s!=null)return this.addFieldIndex(e,s)}}))))}getDocumentsMatchingTarget(e,t){const r=Kr(e);let i=!0;const s=new Map;return A.forEach(this.vn(t),(o=>this.Fn(e,o).next((c=>{i&&(i=!!c),s.set(o,c)})))).next((()=>{if(i){let o=K();const c=[];return A.forEach(s,((u,l)=>{x(Vm,`Using index ${(function(U){return`id=${U.indexId}|cg=${U.collectionGroup}|f=${U.fields.map((ee=>`${ee.fieldPath}:${ee.kind}`)).join(",")}`})(u)} to execute ${Ar(t)}`);const d=(function(U,ee){const J=Al(ee);if(J===void 0)return null;for(const B of sc(U,J.fieldPath))switch(B.op){case"array-contains-any":return B.value.arrayValue.values||[];case"array-contains":return[B.value]}return null})(l,u),p=(function(U,ee){const J=new Map;for(const B of ir(ee))for(const v of sc(U,B.fieldPath))switch(v.op){case"==":case"in":J.set(B.fieldPath.canonicalString(),v.value);break;case"not-in":case"!=":return J.set(B.fieldPath.canonicalString(),v.value),Array.from(J.values())}return null})(l,u),m=(function(U,ee){const J=[];let B=!0;for(const v of ir(ee)){const _=v.kind===0?lm(U,v.fieldPath,U.startAt):hm(U,v.fieldPath,U.startAt);J.push(_.value),B&&(B=_.inclusive)}return new Bn(J,B)})(l,u),w=(function(U,ee){const J=[];let B=!0;for(const v of ir(ee)){const _=v.kind===0?hm(U,v.fieldPath,U.endAt):lm(U,v.fieldPath,U.endAt);J.push(_.value),B&&(B=_.inclusive)}return new Bn(J,B)})(l,u),C=this.Mn(u,l,m),k=this.Mn(u,l,w),V=this.xn(u,l,p),j=this.On(u.indexId,d,C,m.inclusive,k,w.inclusive,V);return A.forEach(j,($=>r.Z($,t.limit).next((U=>{U.forEach((ee=>{const J=O.fromSegments(ee.documentKey);o.has(J)||(o=o.add(J),c.push(J))}))}))))})).next((()=>c))}return A.resolve(null)}))}vn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=C0(ae.create(e.filters,"and")).map((r=>xl(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt))),this.Cn.set(e,t),t)}On(e,t,r,i,s,o,c){const u=(t!=null?t.length:1)*Math.max(r.length,s.length),l=u/(t!=null?t.length:1),d=[];for(let p=0;p<u;++p){const m=t?this.Nn(t[p/l]):ma,w=this.Bn(e,m,r[p%l],i),C=this.Ln(e,m,s[p%l],o),k=c.map((V=>this.Bn(e,m,V,!0)));d.push(...this.createRange(w,C,k))}return d}Bn(e,t,r,i){const s=new ur(e,O.empty(),t,r);return i?s:s.En()}Ln(e,t,r,i){const s=new ur(e,O.empty(),t,r);return i?s.En():s}Fn(e,t){const r=new km(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next((s=>{let o=null;for(const c of s)r.gn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o}))}getIndexType(e,t){let r=2;const i=this.vn(t);return A.forEach(i,(s=>this.Fn(e,s).next((o=>{o?r!==0&&o.fields.length<(function(u){let l=new ce(Ie.comparator),d=!1;for(const p of u.filters)for(const m of p.getFlattenedFilters())m.field.isKeyField()||(m.op==="array-contains"||m.op==="array-contains-any"?d=!0:l=l.add(m.field));for(const p of u.orderBy)p.field.isKeyField()||(l=l.add(p.field));return l.size+(d?1:0)})(s)&&(r=1):r=0})))).next((()=>(function(o){return o.limit!==null})(t)&&i.length>1&&r===2?1:r))}kn(e,t){const r=new Is;for(const i of ir(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=r.ln(i.kind);cr.Wt.Dt(s,o)}return r.un()}Nn(e){const t=new Is;return cr.Wt.Dt(e,t.ln(0)),t.un()}Kn(e,t){const r=new Is;return cr.Wt.Dt(Tr(this.databaseId,t),r.ln((function(s){const o=ir(s);return o.length===0?0:o[o.length-1].kind})(e))),r.un()}xn(e,t,r){if(r===null)return[];let i=[];i.push(new Is);let s=0;for(const o of ir(e)){const c=r[s++];for(const u of i)if(this.qn(t,o.fieldPath)&&mo(c))i=this.Un(i,o,c);else{const l=u.ln(o.kind);cr.Wt.Dt(c,l)}}return this.$n(i)}Mn(e,t,r){return this.xn(e,t,r.position)}$n(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].un();return t}Un(e,t,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const c of i){const u=new Is;u.seed(c.un()),cr.Wt.Dt(o,u.ln(t.kind)),s.push(u)}return s}qn(e,t){return!!e.filters.find((r=>r instanceof Z&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in")))}getFieldIndexes(e,t){const r=ws(e),i=Qr(e);return(t?r.H(Sl,IDBKeyRange.bound(t,t)):r.H()).next((s=>{const o=[];return A.forEach(s,(c=>i.get([c.indexId,this.uid]).next((u=>{o.push((function(d,p){const m=p?new ao(p.sequenceNumber,new _t(Pr(p.readTime),new O(qt(p.documentKey)),p.largestBatchId)):ao.empty(),w=d.fields.map((([C,k])=>new Ca(Ie.fromServerFormat(C),k)));return new Za(d.indexId,d.collectionGroup,w,m)})(c,u))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:H(r.collectionGroup,i.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,r){const i=ws(e),s=Qr(e);return this.Wn(e).next((o=>i.H(Sl,IDBKeyRange.bound(t,t)).next((c=>A.forEach(c,(u=>s.put(Am(u.indexId,this.uid,o,r))))))))}updateIndexEntries(e,t){const r=new Map;return A.forEach(t,((i,s)=>{const o=r.get(i.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next((c=>(r.set(i.collectionGroup,c),A.forEach(c,(u=>this.Qn(e,i,u).next((l=>{const d=this.Gn(s,u);return l.isEqual(d)?A.resolve():this.zn(e,s,u,l,d)})))))))}))}jn(e,t,r,i){return Kr(e).put(i.Rn(this.uid,this.Kn(r,t.key),t.key))}Hn(e,t,r,i){return Kr(e).delete(i.An(this.uid,this.Kn(r,t.key),t.key))}Qn(e,t,r){const i=Kr(e);let s=new ce(_n);return i.ee({index:Uy,range:IDBKeyRange.only([r.indexId,this.uid,La(this.Kn(r,t))])},((o,c)=>{s=s.add(new ur(r.indexId,t,Cm(c.arrayValue),Cm(c.directionalValue)))})).next((()=>s))}Gn(e,t){let r=new ce(_n);const i=this.kn(t,e);if(i==null)return r;const s=Al(t);if(s!=null){const o=e.data.field(s.fieldPath);if(mo(o))for(const c of o.arrayValue.values||[])r=r.add(new ur(t.indexId,e.key,this.Nn(c),i))}else r=r.add(new ur(t.indexId,e.key,ma,i));return r}zn(e,t,r,i,s){x(Vm,"Updating index entries for document '%s'",t.key);const o=[];return(function(u,l,d,p,m){const w=u.getIterator(),C=l.getIterator();let k=Wr(w),V=Wr(C);for(;k||V;){let j=!1,$=!1;if(k&&V){const U=d(k,V);U<0?$=!0:U>0&&(j=!0)}else k!=null?$=!0:j=!0;j?(p(V),V=Wr(C)):$?(m(k),k=Wr(w)):(k=Wr(w),V=Wr(C))}})(i,s,_n,(c=>{o.push(this.jn(e,t,r,c))}),(c=>{o.push(this.Hn(e,t,r,c))})),A.waitFor(o)}Wn(e){let t=1;return Qr(e).ee({index:Fy,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((r,i,s)=>{s.done(),t=i.sequenceNumber+1})).next((()=>t))}createRange(e,t,r){r=r.sort(((o,c)=>_n(o,c))).filter(((o,c,u)=>!c||_n(o,u[c-1])!==0));const i=[];i.push(e);for(const o of r){const c=_n(o,e),u=_n(o,t);if(c===0)i[0]=e.En();else if(c>0&&u<0)i.push(o),i.push(o.En());else if(u>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Jn(i[o],i[o+1]))return[];const c=i[o].An(this.uid,ma,O.empty()),u=i[o+1].An(this.uid,ma,O.empty());s.push(IDBKeyRange.bound(c,u))}return s}Jn(e,t){return _n(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Nm)}getMinOffset(e,t){return A.mapArray(this.vn(t),(r=>this.Fn(e,r).next((i=>i||F(44426))))).next(Nm)}}function xm(n){return Le(n,ho)}function Kr(n){return Le(n,zs)}function ws(n){return Le(n,Uh)}function Qr(n){return Le(n,js)}function Nm(n){q(n.length!==0,28825);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const i=n[r].indexState.offset;Mh(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new _t(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Om={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},GI=41943040;class Ye{static withCacheSize(e){return new Ye(e,Ye.DEFAULT_COLLECTION_PERCENTILE,Ye.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WI(n,e,t){const r=n.store(bt),i=n.store(yi),s=[],o=IDBKeyRange.only(t.batchId);let c=0;const u=r.ee({range:o},((d,p,m)=>(c++,m.delete())));s.push(u.next((()=>{q(c===1,47070,{batchId:t.batchId})})));const l=[];for(const d of t.mutations){const p=Oy(e,d.key.path,t.batchId);s.push(i.delete(p)),l.push(d.key)}return A.waitFor(s).next((()=>l))}function uc(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw F(14731);e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ye.DEFAULT_COLLECTION_PERCENTILE=10,Ye.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ye.DEFAULT=new Ye(GI,Ye.DEFAULT_COLLECTION_PERCENTILE,Ye.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ye.DISABLED=new Ye(-1,0,0);class zc{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Zn={}}static wt(e,t,r,i){q(e.uid!=="",64387);const s=e.isAuthenticated()?e.uid:"";return new zc(s,t,r,i)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return yn(e).ee({index:dr,range:r},((i,s,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,r,i){const s=ti(e),o=yn(e);return o.add({}).next((c=>{q(typeof c=="number",49019);const u=new Qh(c,t,r,i),l=(function(w,C,k){const V=k.baseMutations.map(($=>yo(w.yt,$))),j=k.mutations.map(($=>yo(w.yt,$)));return{userId:C,batchId:k.batchId,localWriteTimeMs:k.localWriteTime.toMillis(),baseMutations:V,mutations:j}})(this.serializer,this.userId,u),d=[];let p=new ce(((m,w)=>H(m.canonicalString(),w.canonicalString())));for(const m of i){const w=Oy(this.userId,m.key.path,c);p=p.add(m.key.path.popLast()),d.push(o.put(l)),d.push(s.put(w,oC))}return p.forEach((m=>{d.push(this.indexManager.addToCollectionParentIndex(e,m))})),e.addOnCommittedListener((()=>{this.Zn[c]=u.keys()})),A.waitFor(d).next((()=>u))}))}lookupMutationBatch(e,t){return yn(e).get(t).next((r=>r?(q(r.userId===this.userId,48,"Unexpected user for mutation batch",{userId:r.userId,batchId:t}),ar(this.serializer,r)):null))}Xn(e,t){return this.Zn[t]?A.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next((r=>{if(r){const i=r.keys();return this.Zn[t]=i,i}return null}))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return yn(e).ee({index:dr,range:i},((o,c,u)=>{c.userId===this.userId&&(q(c.batchId>=r,47524,{Yn:r}),s=ar(this.serializer,c)),u.done()})).next((()=>s))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=Cn;return yn(e).ee({index:dr,range:t,reverse:!0},((i,s,o)=>{r=s.batchId,o.done()})).next((()=>r))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Cn],[this.userId,Number.POSITIVE_INFINITY]);return yn(e).H(dr,t).next((r=>r.map((i=>ar(this.serializer,i)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=ka(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return ti(e).ee({range:i},((o,c,u)=>{const[l,d,p]=o,m=qt(d);if(l===this.userId&&t.path.isEqual(m))return yn(e).get(p).next((w=>{if(!w)throw F(61480,{er:o,batchId:p});q(w.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:w.userId,batchId:p}),s.push(ar(this.serializer,w))}));u.done()})).next((()=>s))}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ce(H);const i=[];return t.forEach((s=>{const o=ka(this.userId,s.path),c=IDBKeyRange.lowerBound(o),u=ti(e).ee({range:c},((l,d,p)=>{const[m,w,C]=l,k=qt(w);m===this.userId&&s.path.isEqual(k)?r=r.add(C):p.done()}));i.push(u)})),A.waitFor(i).next((()=>this.tr(e,r)))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1,s=ka(this.userId,r),o=IDBKeyRange.lowerBound(s);let c=new ce(H);return ti(e).ee({range:o},((u,l,d)=>{const[p,m,w]=u,C=qt(m);p===this.userId&&r.isPrefixOf(C)?C.length===i&&(c=c.add(w)):d.done()})).next((()=>this.tr(e,c)))}tr(e,t){const r=[],i=[];return t.forEach((s=>{i.push(yn(e).get(s).next((o=>{if(o===null)throw F(35274,{batchId:s});q(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:s}),r.push(ar(this.serializer,o))})))})),A.waitFor(i).next((()=>r))}removeMutationBatch(e,t){return WI(e.le,this.userId,t).next((r=>(e.addOnCommittedListener((()=>{this.nr(t.batchId)})),A.forEach(r,(i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))))}nr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return A.resolve();const r=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),i=[];return ti(e).ee({range:r},((s,o,c)=>{if(s[0]===this.userId){const u=qt(s[1]);i.push(u)}else c.done()})).next((()=>{q(i.length===0,56720,{rr:i.map((s=>s.canonicalString()))})}))}))}containsKey(e,t){return HI(e,this.userId,t)}ir(e){return KI(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:Cn,lastStreamToken:""}))}}function HI(n,e,t){const r=ka(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return ti(n).ee({range:s,Y:!0},((c,u,l)=>{const[d,p,m]=c;d===e&&p===i&&(o=!0),l.done()})).next((()=>o))}function yn(n){return Le(n,bt)}function ti(n){return Le(n,yi)}function KI(n){return Le(n,uo)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Cr(0)}static ar(){return new Cr(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V0{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.ur(e).next((t=>{const r=new Cr(t.highestTargetId);return t.highestTargetId=r.next(),this.cr(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.ur(e).next((t=>z.fromTimestamp(new se(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.ur(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,r){return this.ur(e).next((i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.cr(e,i))))}addTargetData(e,t){return this.lr(e,t).next((()=>this.ur(e).next((r=>(r.targetCount+=1,this.hr(t,r),this.cr(e,r))))))}updateTargetData(e,t){return this.lr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>Jr(e).delete(t.targetId))).next((()=>this.ur(e))).next((r=>(q(r.targetCount>0,8065),r.targetCount-=1,this.cr(e,r))))}removeTargets(e,t,r){let i=0;const s=[];return Jr(e).ee(((o,c)=>{const u=Ds(c);u.sequenceNumber<=t&&r.get(u.targetId)===null&&(i++,s.push(this.removeTargetData(e,u)))})).next((()=>A.waitFor(s))).next((()=>i))}forEachTarget(e,t){return Jr(e).ee(((r,i)=>{const s=Ds(i);t(s)}))}ur(e){return Mm(e).get(nc).next((t=>(q(t!==null,2888),t)))}cr(e,t){return Mm(e).put(nc,t)}lr(e,t){return Jr(e).put(qI(this.serializer,t))}hr(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.ur(e).next((t=>t.targetCount))}getTargetData(e,t){const r=Ar(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return Jr(e).ee({range:i,index:Ly},((o,c,u)=>{const l=Ds(c);Uo(t,l.target)&&(s=l,u.done())})).next((()=>s))}addMatchingKeys(e,t,r){const i=[],s=vn(e);return t.forEach((o=>{const c=Ze(o.path);i.push(s.put({targetId:r,path:c})),i.push(this.referenceDelegate.addReference(e,r,o))})),A.waitFor(i)}removeMatchingKeys(e,t,r){const i=vn(e);return A.forEach(t,(s=>{const o=Ze(s.path);return A.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])}))}removeMatchingKeysForTargetId(e,t){const r=vn(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),i=vn(e);let s=K();return i.ee({range:r,Y:!0},((o,c,u)=>{const l=qt(o[1]),d=new O(l);s=s.add(d)})).next((()=>s))}containsKey(e,t){const r=Ze(t.path),i=IDBKeyRange.bound([r],[by(r)],!1,!0);let s=0;return vn(e).ee({index:Fh,Y:!0,range:i},(([o,c],u,l)=>{o!==0&&(s++,l.done())})).next((()=>s>0))}At(e,t){return Jr(e).get(t).next((r=>r?Ds(r):null))}}function Jr(n){return Le(n,Ii)}function Mm(n){return Le(n,yr)}function vn(n){return Le(n,wi)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lm="LruGarbageCollector",x0=1048576;function Fm([n,e],[t,r]){const i=H(n,t);return i===0?H(e,r):i}class N0{constructor(e){this.Pr=e,this.buffer=new ce(Fm),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Fm(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class QI{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){x(Lm,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Wn(t)?x(Lm,"Ignoring IndexedDB error during garbage collection: ",t):await Gn(t)}await this.Ar(3e5)}))}}class O0{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return A.resolve(ut.ce);const r=new N0(t);return this.Vr.forEachTarget(e,(i=>r.Er(i.sequenceNumber))).next((()=>this.Vr.mr(e,(i=>r.Er(i))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(x("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(Om)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(x("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Om):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,i,s,o,c,u,l;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(x("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,o=Date.now(),this.nthSequenceNumber(e,i)))).next((p=>(r=p,c=Date.now(),this.removeTargets(e,r,t)))).next((p=>(s=p,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(l=Date.now(),Yr()<=Y.DEBUG&&x("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(l-u)+`ms
Total Duration: ${l-d}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p}))))}}function JI(n,e){return new O0(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M0{constructor(e,t){this.db=e,this.garbageCollector=JI(this,t)}dr(e){const t=this.pr(e);return this.db.getTargetCache().getTargetCount(e).next((r=>t.next((i=>r+i))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}mr(e,t){return this.yr(e,((r,i)=>t(i)))}addReference(e,t,r){return ga(e,r)}removeReference(e,t,r){return ga(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return ga(e,t)}wr(e,t){return(function(i,s){let o=!1;return KI(i).te((c=>HI(i,c,s).next((u=>(u&&(o=!0),A.resolve(!u)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.yr(e,((o,c)=>{if(c<=t){const u=this.wr(e,o).next((l=>{if(!l)return s++,r.getEntry(e,o).next((()=>(r.removeEntry(o,z.min()),vn(e).delete((function(p){return[0,Ze(p.path)]})(o)))))}));i.push(u)}})).next((()=>A.waitFor(i))).next((()=>r.apply(e))).next((()=>s))}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return ga(e,t)}yr(e,t){const r=vn(e);let i,s=ut.ce;return r.ee({index:Fh},(([o,c],{path:u,sequenceNumber:l})=>{o===0?(s!==ut.ce&&t(new O(qt(i)),s),s=l,i=u):s=ut.ce})).next((()=>{s!==ut.ce&&t(new O(qt(i)),s)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function ga(n,e){return vn(n).put((function(r,i){return{targetId:0,path:Ze(r.path),sequenceNumber:i}})(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YI{constructor(){this.changes=new an((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?A.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L0{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return nr(e).put(r)}removeEntry(e,t,r){return nr(e).delete((function(s,o){const c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],ac(o),c[c.length-1]]})(t,r))}updateMetadata(e,t){return this.getMetadata(e).next((r=>(r.byteSize+=t,this.br(e,r))))}getEntry(e,t){let r=me.newInvalidDocument(t);return nr(e).ee({index:Da,range:IDBKeyRange.only(vs(t))},((i,s)=>{r=this.Sr(t,s)})).next((()=>r))}Dr(e,t){let r={size:0,document:me.newInvalidDocument(t)};return nr(e).ee({index:Da,range:IDBKeyRange.only(vs(t))},((i,s)=>{r={document:this.Sr(t,s),size:uc(s)}})).next((()=>r))}getEntries(e,t){let r=ht();return this.Cr(e,t,((i,s)=>{const o=this.Sr(i,s);r=r.insert(i,o)})).next((()=>r))}vr(e,t){let r=ht(),i=new fe(O.comparator);return this.Cr(e,t,((s,o)=>{const c=this.Sr(s,o);r=r.insert(s,c),i=i.insert(s,uc(o))})).next((()=>({documents:r,Fr:i})))}Cr(e,t,r){if(t.isEmpty())return A.resolve();let i=new ce($m);t.forEach((u=>i=i.add(u)));const s=IDBKeyRange.bound(vs(i.first()),vs(i.last())),o=i.getIterator();let c=o.getNext();return nr(e).ee({index:Da,range:s},((u,l,d)=>{const p=O.fromSegments([...l.prefixPath,l.collectionGroup,l.documentId]);for(;c&&$m(c,p)<0;)r(c,null),c=o.getNext();c&&c.isEqual(p)&&(r(c,l),c=o.hasNext()?o.getNext():null),c?d.j(vs(c)):d.done()})).next((()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,r,i,s){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),ac(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return nr(e).H(IDBKeyRange.bound(c,u,!0)).next((l=>{s?.incrementDocumentReadCount(l.length);let d=ht();for(const p of l){const m=this.Sr(O.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);m.isFoundDocument()&&($o(t,m)||i.has(m.key))&&(d=d.insert(m.key,m))}return d}))}getAllFromCollectionGroup(e,t,r,i){let s=ht();const o=Bm(t,r),c=Bm(t,_t.max());return nr(e).ee({index:My,range:IDBKeyRange.bound(o,c,!0)},((u,l,d)=>{const p=this.Sr(O.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);s=s.insert(p.key,p),s.size===i&&d.done()})).next((()=>s))}newChangeBuffer(e){return new F0(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return Um(e).get(bl).next((t=>(q(!!t,20021),t)))}br(e,t){return Um(e).put(bl,t)}Sr(e,t){if(t){const r=E0(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(z.min())))return r}return me.newInvalidDocument(e)}}function XI(n){return new L0(n)}class F0 extends YI{constructor(e,t){super(),this.Mr=e,this.trackRemovals=t,this.Or=new an((r=>r.toString()),((r,i)=>r.isEqual(i)))}applyChanges(e){const t=[];let r=0,i=new ce(((s,o)=>H(s.canonicalString(),o.canonicalString())));return this.changes.forEach(((s,o)=>{const c=this.Or.get(s);if(t.push(this.Mr.removeEntry(e,s,c.readTime)),o.isValidDocument()){const u=Em(this.Mr.serializer,o);i=i.add(s.path.popLast());const l=uc(u);r+=l-c.size,t.push(this.Mr.addEntry(e,s,u))}else if(r-=c.size,this.trackRemovals){const u=Em(this.Mr.serializer,o.convertToNoDocument(z.min()));t.push(this.Mr.addEntry(e,s,u))}})),i.forEach((s=>{t.push(this.Mr.indexManager.addToCollectionParentIndex(e,s))})),t.push(this.Mr.updateMetadata(e,r)),A.waitFor(t)}getFromCache(e,t){return this.Mr.Dr(e,t).next((r=>(this.Or.set(t,{size:r.size,readTime:r.document.readTime}),r.document)))}getAllFromCache(e,t){return this.Mr.vr(e,t).next((({documents:r,Fr:i})=>(i.forEach(((s,o)=>{this.Or.set(s,{size:o,readTime:r.get(s).readTime})})),r)))}}function Um(n){return Le(n,lo)}function nr(n){return Le(n,tc)}function vs(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Bm(n,e){const t=e.documentKey.path.toArray();return[n,ac(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function $m(n,e){const t=n.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=H(t[s],r[s]),i)return i;return i=H(t.length,r.length),i||(i=H(t[t.length-2],r[r.length-2]),i||H(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U0{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZI{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((i=>(r=i,this.remoteDocumentCache.getEntry(e,t)))).next((i=>(r!==null&&Hs(r.mutation,i,lt.empty(),se.now()),i)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,K()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=K()){const i=jt();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,r).next((s=>{let o=Cs();return s.forEach(((c,u)=>{o=o.insert(c,u.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=jt();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,K())))}populateOverlays(e,t,r){const i=[];return r.forEach((s=>{t.has(s)||i.push(s)})),this.documentOverlayCache.getOverlays(e,i).next((s=>{s.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,r,i){let s=ht();const o=Ws(),c=(function(){return Ws()})();return t.forEach(((u,l)=>{const d=r.get(l.key);i.has(l.key)&&(d===void 0||d.mutation instanceof cn)?s=s.insert(l.key,l):d!==void 0?(o.set(l.key,d.mutation.getFieldMask()),Hs(d.mutation,l,d.mutation.getFieldMask(),se.now())):o.set(l.key,lt.empty())})),this.recalculateAndSaveOverlays(e,s).next((u=>(u.forEach(((l,d)=>o.set(l,d))),t.forEach(((l,d)=>c.set(l,new U0(d,o.get(l)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=Ws();let i=new fe(((o,c)=>o-c)),s=K();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((u=>{const l=t.get(u);if(l===null)return;let d=r.get(u)||lt.empty();d=c.applyToLocalView(l,d),r.set(u,d);const p=(i.get(c.batchId)||K()).add(u);i=i.insert(c.batchId,p)}))})).next((()=>{const o=[],c=i.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),l=u.key,d=u.value,p=pI();d.forEach((m=>{if(!s.has(m)){const w=vI(t.get(m),r.get(m));w!==null&&p.set(m,w),s=s.add(m)}})),o.push(this.documentOverlayCache.saveOverlays(e,l,p))}return A.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,i){return zC(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Gh(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next((s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):A.resolve(jt());let c=_i,u=s;return o.next((l=>A.forEach(l,((d,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),s.get(d)?A.resolve():this.remoteDocumentCache.getEntry(e,d).next((m=>{u=u.insert(d,m)}))))).next((()=>this.populateOverlays(e,l,s))).next((()=>this.computeViews(e,u,l,K()))).next((d=>({batchId:c,changes:fI(d)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new O(t)).next((r=>{let i=Cs();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=Cs();return this.indexManager.getCollectionParents(e,s).next((c=>A.forEach(c,(u=>{const l=(function(p,m){return new on(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,l,r,i).next((d=>{d.forEach(((p,m)=>{o=o.insert(p,m)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i)))).next((o=>{s.forEach(((u,l)=>{const d=l.getKey();o.get(d)===null&&(o=o.insert(d,me.newInvalidDocument(d)))}));let c=Cs();return o.forEach(((u,l)=>{const d=s.get(u);d!==void 0&&Hs(d.mutation,l,lt.empty(),se.now()),$o(t,l)&&(c=c.insert(u,l))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B0{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return A.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(i){return{id:i.id,version:i.version,createTime:ke(i.createTime)}})(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(i){return{name:i.name,query:ed(i.bundledQuery),readTime:ke(i.readTime)}})(t)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $0{constructor(){this.overlays=new fe(O.comparator),this.Lr=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const r=jt();return A.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&r.set(i,s)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((i,s)=>{this.bt(e,t,s)})),A.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Lr.get(r);return i!==void 0&&(i.forEach((s=>this.overlays=this.overlays.remove(s))),this.Lr.delete(r)),A.resolve()}getOverlaysForCollection(e,t,r){const i=jt(),s=t.length+1,o=new O(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,l=u.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return A.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new fe(((l,d)=>l-d));const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let d=s.get(l.largestBatchId);d===null&&(d=jt(),s=s.insert(l.largestBatchId,d)),d.set(l.getKey(),l)}}const c=jt(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((l,d)=>c.set(l,d))),!(c.size()>=i)););return A.resolve(c)}bt(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Lr.get(i.largestBatchId).delete(r.key);this.Lr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Yh(t,r));let s=this.Lr.get(t);s===void 0&&(s=K(),this.Lr.set(t,s)),this.Lr.set(t,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q0{constructor(){this.sessionToken=be.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(){this.kr=new ce(Be.Kr),this.qr=new ce(Be.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new Be(e,t);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Wr(new Be(e,t))}Qr(e,t){e.forEach((r=>this.removeReference(r,t)))}Gr(e){const t=new O(new X([])),r=new Be(t,e),i=new Be(t,e+1),s=[];return this.qr.forEachInRange([r,i],(o=>{this.Wr(o),s.push(o.key)})),s}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new O(new X([])),r=new Be(t,e),i=new Be(t,e+1);let s=K();return this.qr.forEachInRange([r,i],(o=>{s=s.add(o.key)})),s}containsKey(e){const t=new Be(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Be{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return O.comparator(e.key,t.key)||H(e.Hr,t.Hr)}static Ur(e,t){return H(e.Hr,t.Hr)||O.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j0{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new ce(Be.Kr)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Qh(s,t,r,i);this.mutationQueue.push(o);for(const c of i)this.Jr=this.Jr.add(new Be(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Xr(r),s=i<0?0:i;return A.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?Cn:this.Yn-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Be(t,0),i=new Be(t,Number.POSITIVE_INFINITY),s=[];return this.Jr.forEachInRange([r,i],(o=>{const c=this.Zr(o.Hr);s.push(c)})),A.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ce(H);return t.forEach((i=>{const s=new Be(i,0),o=new Be(i,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([s,o],(c=>{r=r.add(c.Hr)}))})),A.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;O.isDocumentKey(s)||(s=s.child(""));const o=new Be(new O(s),0);let c=new ce(H);return this.Jr.forEachWhile((u=>{const l=u.key.path;return!!r.isPrefixOf(l)&&(l.length===i&&(c=c.add(u.Hr)),!0)}),o),A.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach((r=>{const i=this.Zr(r);i!==null&&t.push(i)})),t}removeMutationBatch(e,t){q(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return A.forEach(t.mutations,(i=>{const s=new Be(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)})).next((()=>{this.Jr=r}))}nr(e){}containsKey(e,t){const r=new Be(t,0),i=this.Jr.firstAfterOrEqual(r);return A.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z0{constructor(e){this.ti=e,this.docs=(function(){return new fe(O.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return A.resolve(r?r.document.mutableCopy():me.newInvalidDocument(t))}getEntries(e,t){let r=ht();return t.forEach((i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():me.newInvalidDocument(i))})),A.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=ht();const o=t.path,c=new O(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:l,value:{document:d}}=u.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||Mh(ky(d),r)<=0||(i.has(d.key)||$o(t,d))&&(s=s.insert(d.key,d.mutableCopy()))}return A.resolve(s)}getAllFromCollectionGroup(e,t,r,i){F(9500)}ni(e,t){return A.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new G0(this)}getSize(e){return A.resolve(this.size)}}class G0 extends YI{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,i)=>{i.isValidDocument()?t.push(this.Mr.addEntry(e,i)):this.Mr.removeEntry(r)})),A.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W0{constructor(e){this.persistence=e,this.ri=new an((t=>Ar(t)),Uo),this.lastRemoteSnapshotVersion=z.min(),this.highestTargetId=0,this.ii=0,this.si=new rd,this.targetCount=0,this.oi=Cr._r()}forEachTarget(e,t){return this.ri.forEach(((r,i)=>t(i))),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),A.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Cr(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.lr(t),A.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.ri.forEach(((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ri.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)})),A.waitFor(s).next((()=>i))}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return A.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),A.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach((o=>{s.push(i.markPotentiallyOrphaned(e,o))})),A.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return A.resolve(r)}containsKey(e,t){return A.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(e,t){this._i={},this.overlays={},this.ai=new ut(0),this.ui=!1,this.ui=!0,this.ci=new q0,this.referenceDelegate=e(this),this.li=new W0(this),this.indexManager=new k0,this.remoteDocumentCache=(function(i){return new z0(i)})((r=>this.referenceDelegate.hi(r))),this.serializer=new $I(t),this.Pi=new B0(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new $0,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new j0(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){x("MemoryPersistence","Starting transaction:",e);const i=new H0(this.ai.next());return this.referenceDelegate.Ti(),r(i).next((s=>this.referenceDelegate.Ii(i).next((()=>s)))).toPromise().then((s=>(i.raiseOnCommittedEvent(),s)))}Ei(e,t){return A.or(Object.values(this._i).map((r=>()=>r.containsKey(e,t))))}}class H0 extends Vy{constructor(e){super(),this.currentSequenceNumber=e}}class Gc{constructor(e){this.persistence=e,this.Ri=new rd,this.Ai=null}static Vi(e){return new Gc(e)}get di(){if(this.Ai)return this.Ai;throw F(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),A.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),A.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((i=>this.di.add(i.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((i=>{i.forEach((s=>this.di.add(s.toString())))})).next((()=>r.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.di,(r=>{const i=O.fromPath(r);return this.mi(e,i).next((s=>{s||t.removeEntry(i,z.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return A.or([()=>A.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class lc{constructor(e,t){this.persistence=e,this.fi=new an((r=>Ze(r.path)),((r,i)=>r.isEqual(i))),this.garbageCollector=JI(this,t)}static Vi(e,t){return new lc(e,t)}Ti(){}Ii(e){return A.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((i=>r+i))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}mr(e,t){return A.forEach(this.fi,((r,i)=>this.wr(e,r,i).next((s=>s?A.resolve():t(i)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ni(e,(o=>this.wr(e,o,t).next((c=>{c||(r++,s.removeEntry(o,z.min()))})))).next((()=>s.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),A.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),A.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),A.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),A.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=xa(e.data.value)),t}wr(e,t,r){return A.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.fi.get(t);return A.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K0{constructor(e){this.serializer=e}k(e,t,r,i){const s=new Nc("createOrUpgrade",t);r<1&&i>=1&&((function(u){u.createObjectStore(Fo)})(e),(function(u){u.createObjectStore(uo,{keyPath:sC}),u.createObjectStore(bt,{keyPath:Xp,autoIncrement:!0}).createIndex(dr,Zp,{unique:!0}),u.createObjectStore(yi)})(e),qm(e),(function(u){u.createObjectStore(sr)})(e));let o=A.resolve();return r<3&&i>=3&&(r!==0&&((function(u){u.deleteObjectStore(wi),u.deleteObjectStore(Ii),u.deleteObjectStore(yr)})(e),qm(e)),o=o.next((()=>(function(u){const l=u.store(yr),d={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:z.min().toTimestamp(),targetCount:0};return l.put(nc,d)})(s)))),r<4&&i>=4&&(r!==0&&(o=o.next((()=>(function(u,l){return l.store(bt).H().next((p=>{u.deleteObjectStore(bt),u.createObjectStore(bt,{keyPath:Xp,autoIncrement:!0}).createIndex(dr,Zp,{unique:!0});const m=l.store(bt),w=p.map((C=>m.put(C)));return A.waitFor(w)}))})(e,s)))),o=o.next((()=>{(function(u){u.createObjectStore(vi,{keyPath:pC})})(e)}))),r<5&&i>=5&&(o=o.next((()=>this.gi(s)))),r<6&&i>=6&&(o=o.next((()=>((function(u){u.createObjectStore(lo)})(e),this.pi(s))))),r<7&&i>=7&&(o=o.next((()=>this.yi(s)))),r<8&&i>=8&&(o=o.next((()=>this.wi(e,s)))),r<9&&i>=9&&(o=o.next((()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)}))),r<10&&i>=10&&(o=o.next((()=>this.bi(s)))),r<11&&i>=11&&(o=o.next((()=>{(function(u){u.createObjectStore(Oc,{keyPath:mC})})(e),(function(u){u.createObjectStore(Mc,{keyPath:gC})})(e)}))),r<12&&i>=12&&(o=o.next((()=>{(function(u){const l=u.createObjectStore(Lc,{keyPath:TC});l.createIndex(Rl,AC,{unique:!1}),l.createIndex(By,bC,{unique:!1})})(e)}))),r<13&&i>=13&&(o=o.next((()=>(function(u){const l=u.createObjectStore(tc,{keyPath:aC});l.createIndex(Da,cC),l.createIndex(My,uC)})(e))).next((()=>this.Si(e,s))).next((()=>e.deleteObjectStore(sr)))),r<14&&i>=14&&(o=o.next((()=>this.Di(e,s)))),r<15&&i>=15&&(o=o.next((()=>(function(u){u.createObjectStore(Uh,{keyPath:_C,autoIncrement:!0}).createIndex(Sl,yC,{unique:!1}),u.createObjectStore(js,{keyPath:IC}).createIndex(Fy,wC,{unique:!1}),u.createObjectStore(zs,{keyPath:vC}).createIndex(Uy,EC,{unique:!1})})(e)))),r<16&&i>=16&&(o=o.next((()=>{t.objectStore(js).clear()})).next((()=>{t.objectStore(zs).clear()}))),r<17&&i>=17&&(o=o.next((()=>{(function(u){u.createObjectStore(Bh,{keyPath:SC})})(e)}))),r<18&&i>=18&&Yg()&&(o=o.next((()=>{t.objectStore(js).clear()})).next((()=>{t.objectStore(zs).clear()}))),o}pi(e){let t=0;return e.store(sr).ee(((r,i)=>{t+=uc(i)})).next((()=>{const r={byteSize:t};return e.store(lo).put(bl,r)}))}gi(e){const t=e.store(uo),r=e.store(bt);return t.H().next((i=>A.forEach(i,(s=>{const o=IDBKeyRange.bound([s.userId,Cn],[s.userId,s.lastAcknowledgedBatchId]);return r.H(dr,o).next((c=>A.forEach(c,(u=>{q(u.userId===s.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const l=ar(this.serializer,u);return WI(e,s.userId,l).next((()=>{}))}))))}))))}yi(e){const t=e.store(wi),r=e.store(sr);return e.store(yr).get(nc).next((i=>{const s=[];return r.ee(((o,c)=>{const u=new X(o),l=(function(p){return[0,Ze(p)]})(u);s.push(t.get(l).next((d=>d?A.resolve():(p=>t.put({targetId:0,path:Ze(p),sequenceNumber:i.highestListenSequenceNumber}))(u))))})).next((()=>A.waitFor(s)))}))}wi(e,t){e.createObjectStore(ho,{keyPath:fC});const r=t.store(ho),i=new nd,s=o=>{if(i.add(o)){const c=o.lastSegment(),u=o.popLast();return r.put({collectionId:c,parent:Ze(u)})}};return t.store(sr).ee({Y:!0},((o,c)=>{const u=new X(o);return s(u.popLast())})).next((()=>t.store(yi).ee({Y:!0},(([o,c,u],l)=>{const d=qt(c);return s(d.popLast())}))))}bi(e){const t=e.store(Ii);return t.ee(((r,i)=>{const s=Ds(i),o=qI(this.serializer,s);return t.put(o)}))}Si(e,t){const r=t.store(sr),i=[];return r.ee(((s,o)=>{const c=t.store(tc),u=(function(p){return p.document?new O(X.fromString(p.document.name).popFirst(5)):p.noDocument?O.fromSegments(p.noDocument.path):p.unknownDocument?O.fromSegments(p.unknownDocument.path):F(36783)})(o).path.toArray(),l={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(c.put(l))})).next((()=>A.waitFor(i)))}Di(e,t){const r=t.store(bt),i=XI(this.serializer),s=new id(Gc.Vi,this.serializer.yt);return r.H().next((o=>{const c=new Map;return o.forEach((u=>{let l=c.get(u.userId)??K();ar(this.serializer,u).keys().forEach((d=>l=l.add(d))),c.set(u.userId,l)})),A.forEach(c,((u,l)=>{const d=new $e(l),p=jc.wt(this.serializer,d),m=s.getIndexManager(d),w=zc.wt(d,this.serializer,m,s.referenceDelegate);return new ZI(i,w,p,m).recalculateAndSaveOverlaysForDocumentKeys(new Pl(t,ut.ce),u).next()}))}))}}function qm(n){n.createObjectStore(wi,{keyPath:hC}).createIndex(Fh,dC,{unique:!0}),n.createObjectStore(Ii,{keyPath:"targetId"}).createIndex(Ly,lC,{unique:!0}),n.createObjectStore(yr)}const In="IndexedDbPersistence",Qu=18e5,Ju=5e3,Yu="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",ew="main";class sd{constructor(e,t,r,i,s,o,c,u,l,d,p=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Ci=s,this.window=o,this.document=c,this.Fi=l,this.Mi=d,this.xi=p,this.ai=null,this.ui=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Oi=null,this.inForeground=!1,this.Ni=null,this.Bi=null,this.Li=Number.NEGATIVE_INFINITY,this.ki=m=>Promise.resolve(),!sd.v())throw new D(R.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new M0(this,i),this.Ki=t+ew,this.serializer=new $I(u),this.qi=new zt(this.Ki,this.xi,new K0(this.serializer)),this.ci=new A0,this.li=new V0(this.referenceDelegate,this.serializer),this.remoteDocumentCache=XI(this.serializer),this.Pi=new T0,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,d===!1&&Ce(In,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.$i().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(R.FAILED_PRECONDITION,Yu);return this.Wi(),this.Qi(),this.Gi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.li.getHighestSequenceNumber(e)))})).then((e=>{this.ai=new ut(e,this.Fi)})).then((()=>{this.ui=!0})).catch((e=>(this.qi&&this.qi.close(),Promise.reject(e))))}zi(e){return this.ki=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.qi.q((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Ci.enqueueAndForget((async()=>{this.started&&await this.$i()})))}$i(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>_a(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.ji(e).next((t=>{t||(this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))))}))})).next((()=>this.Hi(e))).next((t=>this.isPrimary&&!t?this.Ji(e).next((()=>!1)):!!t&&this.Zi(e).next((()=>!0)))))).catch((e=>{if(Wn(e))return x(In,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return x(In,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.Ci.enqueueRetryable((()=>this.ki(e))),this.isPrimary=e}))}ji(e){return Es(e).get(Gr).next((t=>A.resolve(this.Xi(t))))}Yi(e){return _a(e).delete(this.clientId)}async es(){if(this.isPrimary&&!this.ts(this.Li,Qu)){this.Li=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const r=Le(t,vi);return r.H().next((i=>{const s=this.ns(i,Qu),o=i.filter((c=>s.indexOf(c)===-1));return A.forEach(o,(c=>r.delete(c.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Ui)for(const t of e)this.Ui.removeItem(this.rs(t.clientId))}}Gi(){this.Bi=this.Ci.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.$i().then((()=>this.es())).then((()=>this.Gi()))))}Xi(e){return!!e&&e.ownerId===this.clientId}Hi(e){return this.Mi?A.resolve(!0):Es(e).get(Gr).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,Ju)&&!this.ss(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new D(R.FAILED_PRECONDITION,Yu);return!1}}return!(!this.networkEnabled||!this.inForeground)||_a(e).H().next((r=>this.ns(r,Ju).find((i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||o&&c)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&x(In,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.ui=!1,this._s(),this.Bi&&(this.Bi.cancel(),this.Bi=null),this.us(),this.cs(),await this.qi.runTransaction("shutdown","readwrite",[Fo,vi],(e=>{const t=new Pl(e,ut.ce);return this.Ji(t).next((()=>this.Yi(t)))})),this.qi.close(),this.ls()}ns(e,t){return e.filter((r=>this.ts(r.updateTimeMs,t)&&!this.ss(r.clientId)))}hs(){return this.runTransaction("getActiveClients","readonly",(e=>_a(e).H().next((t=>this.ns(t,Qu).map((r=>r.clientId))))))}get started(){return this.ui}getGlobalsCache(){return this.ci}getMutationQueue(e,t){return zc.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new D0(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return jc.wt(this.serializer,e)}getBundleCache(){return this.Pi}runTransaction(e,t,r){x(In,"Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=(function(u){return u===18?CC:u===17?zy:u===16?PC:u===15?$h:u===14?jy:u===13?qy:u===12?RC:u===11?$y:void F(60245)})(this.xi);let o;return this.qi.runTransaction(e,i,s,(c=>(o=new Pl(c,this.ai?this.ai.next():ut.ce),t==="readwrite-primary"?this.ji(o).next((u=>!!u||this.Hi(o))).next((u=>{if(!u)throw Ce(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Ci.enqueueRetryable((()=>this.ki(!1))),new D(R.FAILED_PRECONDITION,Dy);return r(o)})).next((u=>this.Zi(o).next((()=>u)))):this.Ps(o).next((()=>r(o)))))).then((c=>(o.raiseOnCommittedEvent(),c)))}Ps(e){return Es(e).get(Gr).next((t=>{if(t!==null&&this.ts(t.leaseTimestampMs,Ju)&&!this.ss(t.ownerId)&&!this.Xi(t)&&!(this.Mi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new D(R.FAILED_PRECONDITION,Yu)}))}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Es(e).put(Gr,t)}static v(){return zt.v()}Ji(e){const t=Es(e);return t.get(Gr).next((r=>this.Xi(r)?(x(In,"Releasing primary lease."),t.delete(Gr)):A.resolve()))}ts(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(Ce(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ni=()=>{this.Ci.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.$i())))},this.document.addEventListener("visibilitychange",this.Ni),this.inForeground=this.document.visibilityState==="visible")}us(){this.Ni&&(this.document.removeEventListener("visibilitychange",this.Ni),this.Ni=null)}Qi(){typeof this.window?.addEventListener=="function"&&(this.Oi=()=>{this._s();const e=/(?:Version|Mobile)\/1[456]/;Jg()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Ci.enterRestrictedMode(!0),this.Ci.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Oi))}cs(){this.Oi&&(this.window.removeEventListener("pagehide",this.Oi),this.Oi=null)}ss(e){try{const t=this.Ui?.getItem(this.rs(e))!==null;return x(In,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(t){return Ce(In,"Failed to get zombied client id.",t),!1}}_s(){if(this.Ui)try{this.Ui.setItem(this.rs(this.clientId),String(Date.now()))}catch(e){Ce("Failed to set zombie client id.",e)}}ls(){if(this.Ui)try{this.Ui.removeItem(this.rs(this.clientId))}catch{}}rs(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Es(n){return Le(n,Fo)}function _a(n){return Le(n,vi)}function od(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ad{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Ts=r,this.Is=i}static Es(e,t){let r=K(),i=K();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new ad(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q0{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tw{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return Jg()?8:xy(Ee())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.gs(e,t).next((o=>{s.result=o})).next((()=>{if(!s.result)return this.ps(e,t,i,r).next((o=>{s.result=o}))})).next((()=>{if(s.result)return;const o=new Q0;return this.ys(e,t,o).next((c=>{if(s.result=c,this.As)return this.ws(e,t,o,c.size)}))})).next((()=>s.result))}ws(e,t,r,i){return r.documentReadCount<this.Vs?(Yr()<=Y.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",Xr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),A.resolve()):(Yr()<=Y.DEBUG&&x("QueryEngine","Query:",Xr(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ds*i?(Yr()<=Y.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",Xr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ot(t))):A.resolve())}gs(e,t){if(dm(t))return A.resolve(null);let r=ot(t);return this.indexManager.getIndexType(e,r).next((i=>i===0?null:(t.limit!==null&&i===1&&(t=oc(t,null,"F"),r=ot(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((s=>{const o=K(...s);return this.fs.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,r).next((u=>{const l=this.bs(t,c);return this.Ss(t,l,o,u.readTime)?this.gs(e,oc(t,null,"F")):this.Ds(e,l,t,u)}))))})))))}ps(e,t,r,i){return dm(t)||i.isEqual(z.min())?A.resolve(null):this.fs.getDocuments(e,r).next((s=>{const o=this.bs(t,s);return this.Ss(t,o,r,i)?A.resolve(null):(Yr()<=Y.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Xr(t)),this.Ds(e,o,t,Cy(i,_i)).next((c=>c)))}))}bs(e,t){let r=new ce(hI(e));return t.forEach(((i,s)=>{$o(e,s)&&(r=r.add(s))})),r}Ss(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ys(e,t,r){return Yr()<=Y.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",Xr(t)),this.fs.getDocumentsMatchingQuery(e,t,_t.min(),r)}Ds(e,t,r,i){return this.fs.getDocumentsMatchingQuery(e,r,i).next((s=>(t.forEach((o=>{s=s.insert(o.key,o)})),s)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cd="LocalStore",J0=3e8;class Y0{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.vs=new fe(H),this.Fs=new an((s=>Ar(s)),Uo),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new ZI(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function nw(n,e,t,r){return new Y0(n,e,t,r)}async function rw(n,e){const t=L(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next((s=>(i=s,t.Os(e),t.mutationQueue.getAllMutationBatches(r)))).next((s=>{const o=[],c=[];let u=K();for(const l of i){o.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}for(const l of s){c.push(l.batchId);for(const d of l.mutations)u=u.add(d.key)}return t.localDocuments.getDocuments(r,u).next((l=>({Ns:l,removedBatchIds:o,addedBatchIds:c})))}))}))}function X0(n,e){const t=L(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const i=e.batch.keys(),s=t.xs.newChangeBuffer({trackRemovals:!0});return(function(c,u,l,d){const p=l.batch,m=p.keys();let w=A.resolve();return m.forEach((C=>{w=w.next((()=>d.getEntry(u,C))).next((k=>{const V=l.docVersions.get(C);q(V!==null,48541),k.version.compareTo(V)<0&&(p.applyToRemoteDocument(k,l),k.isValidDocument()&&(k.setReadTime(l.commitVersion),d.addEntry(k)))}))})),w.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(t,r,e,s).next((()=>s.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=K();for(let l=0;l<c.mutationResults.length;++l)c.mutationResults[l].transformResults.length>0&&(u=u.add(c.batch.mutations[l].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(r,i)))}))}function iw(n){const e=L(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function Z0(n,e){const t=L(n),r=e.snapshotVersion;let i=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(s=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});i=t.vs;const c=[];e.targetChanges.forEach(((d,p)=>{const m=i.get(p);if(!m)return;c.push(t.li.removeMatchingKeys(s,d.removedDocuments,p).next((()=>t.li.addMatchingKeys(s,d.addedDocuments,p))));let w=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?w=w.withResumeToken(be.EMPTY_BYTE_STRING,z.min()).withLastLimboFreeSnapshotVersion(z.min()):d.resumeToken.approximateByteSize()>0&&(w=w.withResumeToken(d.resumeToken,r)),i=i.insert(p,w),(function(k,V,j){return k.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=J0?!0:j.addedDocuments.size+j.modifiedDocuments.size+j.removedDocuments.size>0})(m,w,d)&&c.push(t.li.updateTargetData(s,w))}));let u=ht(),l=K();if(e.documentUpdates.forEach((d=>{e.resolvedLimboDocuments.has(d)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,d))})),c.push(sw(s,o,e.documentUpdates).next((d=>{u=d.Bs,l=d.Ls}))),!r.isEqual(z.min())){const d=t.li.getLastRemoteSnapshotVersion(s).next((p=>t.li.setTargetsMetadata(s,s.currentSequenceNumber,r)));c.push(d)}return A.waitFor(c).next((()=>o.apply(s))).next((()=>t.localDocuments.getLocalViewOfDocuments(s,u,l))).next((()=>u))})).then((s=>(t.vs=i,s)))}function sw(n,e,t){let r=K(),i=K();return t.forEach((s=>r=r.add(s))),e.getEntries(n,r).next((s=>{let o=ht();return t.forEach(((c,u)=>{const l=s.get(c);u.isFoundDocument()!==l.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual(z.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):x(cd,"Ignoring outdated watch update for ",c,". Current version:",l.version," Watch version:",u.version)})),{Bs:o,Ls:i}}))}function ek(n,e){const t=L(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Cn),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function Pi(n,e){const t=L(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let i;return t.li.getTargetData(r,e).next((s=>s?(i=s,A.resolve(i)):t.li.allocateTargetId(r).next((o=>(i=new Jt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,i).next((()=>i)))))))})).then((r=>{const i=t.vs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r}))}async function Ci(n,e,t){const r=L(n),i=r.vs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,(o=>r.persistence.referenceDelegate.removeTarget(o,i)))}catch(o){if(!Wn(o))throw o;x(cd,`Failed to update sequence numbers for target ${e}: ${o}`)}r.vs=r.vs.remove(e),r.Fs.delete(i.target)}function hc(n,e,t){const r=L(n);let i=z.min(),s=K();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(u,l,d){const p=L(u),m=p.Fs.get(d);return m!==void 0?A.resolve(p.vs.get(m)):p.li.getTargetData(l,d)})(r,o,ot(e)).next((c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(o,c.targetId).next((u=>{s=u}))})).next((()=>r.Cs.getDocumentsMatchingQuery(o,e,t?i:z.min(),t?s:K()))).next((c=>(cw(r,lI(e),c),{documents:c,ks:s})))))}function ow(n,e){const t=L(n),r=L(t.li),i=t.vs.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",(s=>r.At(s,e).next((o=>o?o.target:null))))}function aw(n,e){const t=L(n),r=t.Ms.get(e)||z.min();return t.persistence.runTransaction("Get new document changes","readonly",(i=>t.xs.getAllFromCollectionGroup(i,e,Cy(r,_i),Number.MAX_SAFE_INTEGER))).then((i=>(cw(t,e,i),i)))}function cw(n,e,t){let r=n.Ms.get(e)||z.min();t.forEach(((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)})),n.Ms.set(e,r)}async function tk(n,e,t,r){const i=L(n);let s=K(),o=ht();for(const l of t){const d=e.Ks(l.metadata.name);l.document&&(s=s.add(d));const p=e.qs(l);p.setReadTime(e.Us(l.metadata.readTime)),o=o.insert(d,p)}const c=i.xs.newChangeBuffer({trackRemovals:!0}),u=await Pi(i,(function(d){return ot(ji(X.fromString(`__bundle__/docs/${d}`)))})(r));return i.persistence.runTransaction("Apply bundle documents","readwrite",(l=>sw(l,c,o).next((d=>(c.apply(l),d))).next((d=>i.li.removeMatchingKeysForTargetId(l,u.targetId).next((()=>i.li.addMatchingKeys(l,s,u.targetId))).next((()=>i.localDocuments.getLocalViewOfDocuments(l,d.Bs,d.Ls))).next((()=>d.Bs))))))}async function nk(n,e,t=K()){const r=await Pi(n,ot(ed(e.bundledQuery))),i=L(n);return i.persistence.runTransaction("Save named query","readwrite",(s=>{const o=ke(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return i.Pi.saveNamedQuery(s,e);const c=r.withResumeToken(be.EMPTY_BYTE_STRING,o);return i.vs=i.vs.insert(c.targetId,c),i.li.updateTargetData(s,c).next((()=>i.li.removeMatchingKeysForTargetId(s,r.targetId))).next((()=>i.li.addMatchingKeys(s,t,r.targetId))).next((()=>i.Pi.saveNamedQuery(s,e)))}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uw="firestore_clients";function jm(n,e){return`${uw}_${n}_${e}`}const lw="firestore_mutations";function zm(n,e,t){let r=`${lw}_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}const hw="firestore_targets";function Xu(n,e){return`${hw}_${n}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut="SharedClientState";class dc{constructor(e,t,r,i){this.user=e,this.batchId=t,this.state=r,this.error=i}static $s(e,t,r){const i=JSON.parse(r);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new D(i.error.code,i.error.message))),o?new dc(e,t,i.state,s):(Ce(Ut,`Failed to parse mutation state for ID '${t}': ${r}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Ks{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static $s(e,t){const r=JSON.parse(t);let i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new D(r.error.code,r.error.message))),s?new Ks(e,r.state,i):(Ce(Ut,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class fc{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static $s(e,t){const r=JSON.parse(t);let i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=Wh();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=Ny(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new fc(e,s):(Ce(Ut,`Failed to parse client data for instance '${e}': ${t}`),null)}}class ud{constructor(e,t){this.clientId=e,this.onlineState=t}static $s(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new ud(t.clientId,t.onlineState):(Ce(Ut,`Failed to parse online state: ${e}`),null)}}class ql{constructor(){this.activeTargetIds=Wh()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Zu{constructor(e,t,r,i,s){this.window=e,this.Ci=t,this.persistenceKey=r,this.zs=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.js=this.Hs.bind(this),this.Js=new fe(H),this.started=!1,this.Zs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Xs=jm(this.persistenceKey,this.zs),this.Ys=(function(u){return`firestore_sequence_number_${u}`})(this.persistenceKey),this.Js=this.Js.insert(this.zs,new ql),this.eo=new RegExp(`^${uw}_${o}_([^_]*)$`),this.no=new RegExp(`^${lw}_${o}_(\\d+)(?:_(.*))?$`),this.ro=new RegExp(`^${hw}_${o}_(\\d+)$`),this.io=(function(u){return`firestore_online_state_${u}`})(this.persistenceKey),this.so=(function(u){return`firestore_bundle_loaded_v2_${u}`})(this.persistenceKey),this.window.addEventListener("storage",this.js)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.hs();for(const r of e){if(r===this.zs)continue;const i=this.getItem(jm(this.persistenceKey,r));if(i){const s=fc.$s(r,i);s&&(this.Js=this.Js.insert(s.clientId,s))}}this.oo();const t=this.storage.getItem(this.io);if(t){const r=this._o(t);r&&this.ao(r)}for(const r of this.Zs)this.Hs(r);this.Zs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.Ys,JSON.stringify(e))}getAllActiveQueryTargets(){return this.uo(this.Js)}isActiveQueryTarget(e){let t=!1;return this.Js.forEach(((r,i)=>{i.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.co(e,"pending")}updateMutationState(e,t,r){this.co(e,t,r),this.lo(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(Xu(this.persistenceKey,e));if(i){const s=Ks.$s(e,i);s&&(r=s.state)}}return t&&this.ho.Qs(e),this.oo(),r}removeLocalQueryTarget(e){this.ho.Gs(e),this.oo()}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Xu(this.persistenceKey,e))}updateQueryState(e,t,r){this.Po(e,t,r)}handleUserChange(e,t,r){t.forEach((i=>{this.lo(i)})),this.currentUser=e,r.forEach((i=>{this.addPendingMutation(i)}))}setOnlineState(e){this.To(e)}notifyBundleLoaded(e){this.Io(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return x(Ut,"READ",e,t),t}setItem(e,t){x(Ut,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){x(Ut,"REMOVE",e),this.storage.removeItem(e)}Hs(e){const t=e;if(t.storageArea===this.storage){if(x(Ut,"EVENT",t.key,t.newValue),t.key===this.Xs)return void Ce("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Ci.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.eo.test(t.key)){if(t.newValue==null){const r=this.Eo(t.key);return this.Ro(r,null)}{const r=this.Ao(t.key,t.newValue);if(r)return this.Ro(r.clientId,r)}}else if(this.no.test(t.key)){if(t.newValue!==null){const r=this.Vo(t.key,t.newValue);if(r)return this.mo(r)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const r=this.fo(t.key,t.newValue);if(r)return this.po(r)}}else if(t.key===this.io){if(t.newValue!==null){const r=this._o(t.newValue);if(r)return this.ao(r)}}else if(t.key===this.Ys){const r=(function(s){let o=ut.ce;if(s!=null)try{const c=JSON.parse(s);q(typeof c=="number",30636,{yo:s}),o=c}catch(c){Ce(Ut,"Failed to read sequence number from WebStorage",c)}return o})(t.newValue);r!==ut.ce&&this.sequenceNumberHandler(r)}else if(t.key===this.so){const r=this.wo(t.newValue);await Promise.all(r.map((i=>this.syncEngine.bo(i))))}}}else this.Zs.push(t)}))}}get ho(){return this.Js.get(this.zs)}oo(){this.setItem(this.Xs,this.ho.Ws())}co(e,t,r){const i=new dc(this.currentUser,e,t,r),s=zm(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Ws())}lo(e){const t=zm(this.persistenceKey,this.currentUser,e);this.removeItem(t)}To(e){const t={clientId:this.zs,onlineState:e};this.storage.setItem(this.io,JSON.stringify(t))}Po(e,t,r){const i=Xu(this.persistenceKey,e),s=new Ks(e,t,r);this.setItem(i,s.Ws())}Io(e){const t=JSON.stringify(Array.from(e));this.setItem(this.so,t)}Eo(e){const t=this.eo.exec(e);return t?t[1]:null}Ao(e,t){const r=this.Eo(e);return fc.$s(r,t)}Vo(e,t){const r=this.no.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return dc.$s(new $e(s),i,t)}fo(e,t){const r=this.ro.exec(e),i=Number(r[1]);return Ks.$s(i,t)}_o(e){return ud.$s(e)}wo(e){return JSON.parse(e)}async mo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.So(e.batchId,e.state,e.error);x(Ut,`Ignoring mutation for non-active user ${e.user.uid}`)}po(e){return this.syncEngine.Do(e.targetId,e.state,e.error)}Ro(e,t){const r=t?this.Js.insert(e,t):this.Js.remove(e),i=this.uo(this.Js),s=this.uo(r),o=[],c=[];return s.forEach((u=>{i.has(u)||o.push(u)})),i.forEach((u=>{s.has(u)||c.push(u)})),this.syncEngine.Co(o,c).then((()=>{this.Js=r}))}ao(e){this.Js.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}uo(e){let t=Wh();return e.forEach(((r,i)=>{t=t.unionWith(i.activeTargetIds)})),t}}class dw{constructor(){this.vo=new ql,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new ql,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rk{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gm="ConnectivityMonitor";class Wm{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){x(Gm,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){x(Gm,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ya=null;function jl(){return ya===null?ya=(function(){return 268435456+Math.round(2147483648*Math.random())})():ya++,"0x"+ya.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el="RestConnection",ik={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class sk{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.$o=this.databaseId.database===rc?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){const o=jl(),c=this.Qo(e,t.toUriEncodedString());x(el,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,i,s);const{host:l}=new URL(c),d=Li(l);return this.zo(e,c,u,r,d).then((p=>(x(el,`Received RPC '${e}' ${o}: `,p),p)),(p=>{throw Ot(el,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",r),p}))}jo(e,t,r,i,s,o){return this.Wo(e,t,r,i,s)}Go(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+qi})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((i,s)=>e[s]=i)),r&&r.headers.forEach(((i,s)=>e[s]=i))}Qo(e,t){const r=ik[e];let i=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ok{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je="WebChannelConnection",Ts=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(i){setTimeout((()=>{throw i}),0)}}))};class ui extends sk{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!ui.c_){const e=vy();Ts(e,wy.STAT_EVENT,(t=>{t.stat===El.PROXY?x(Je,"STAT_EVENT: detected buffering proxy"):t.stat===El.NOPROXY&&x(Je,"STAT_EVENT: detected no buffering proxy")})),ui.c_=!0}}zo(e,t,r,i,s){const o=jl();return new Promise(((c,u)=>{const l=new yy;l.setWithCredentials(!0),l.listenOnce(Iy.COMPLETE,(()=>{try{switch(l.getLastErrorCode()){case Pa.NO_ERROR:const p=l.getResponseJson();x(Je,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case Pa.TIMEOUT:x(Je,`RPC '${e}' ${o} timed out`),u(new D(R.DEADLINE_EXCEEDED,"Request time out"));break;case Pa.HTTP_ERROR:const m=l.getStatus();if(x(Je,`RPC '${e}' ${o} failed with status:`,m,"response text:",l.getResponseText()),m>0){let w=l.getResponseJson();Array.isArray(w)&&(w=w[0]);const C=w?.error;if(C&&C.status&&C.message){const k=(function(j){const $=j.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf($)>=0?$:R.UNKNOWN})(C.status);u(new D(k,C.message))}else u(new D(R.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new D(R.UNAVAILABLE,"Connection failed."));break;default:F(9055,{l_:e,streamId:o,h_:l.getLastErrorCode(),P_:l.getLastError()})}}finally{x(Je,`RPC '${e}' ${o} completed.`)}}));const d=JSON.stringify(i);x(Je,`RPC '${e}' ${o} sending request:`,i),l.send(t,"POST",d,r,15)}))}T_(e,t,r){const i=jl(),s=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const l=s.join("");x(Je,`Creating RPC '${e}' stream ${i}: ${l}`,c);const d=o.createWebChannel(l,c);this.I_(d);let p=!1,m=!1;const w=new ok({Ho:C=>{m?x(Je,`Not sending because RPC '${e}' stream ${i} is closed:`,C):(p||(x(Je,`Opening RPC '${e}' stream ${i} transport.`),d.open(),p=!0),x(Je,`RPC '${e}' stream ${i} sending:`,C),d.send(C))},Jo:()=>d.close()});return Ts(d,Ps.EventType.OPEN,(()=>{m||(x(Je,`RPC '${e}' stream ${i} transport opened.`),w.i_())})),Ts(d,Ps.EventType.CLOSE,(()=>{m||(m=!0,x(Je,`RPC '${e}' stream ${i} transport closed`),w.o_(),this.E_(d))})),Ts(d,Ps.EventType.ERROR,(C=>{m||(m=!0,Ot(Je,`RPC '${e}' stream ${i} transport errored. Name:`,C.name,"Message:",C.message),w.o_(new D(R.UNAVAILABLE,"The operation could not be completed")))})),Ts(d,Ps.EventType.MESSAGE,(C=>{if(!m){const k=C.data[0];q(!!k,16349);const V=k,j=V?.error||V[0]?.error;if(j){x(Je,`RPC '${e}' stream ${i} received error:`,j);const $=j.status;let U=(function(B){const v=Ve[B];if(v!==void 0)return AI(v)})($),ee=j.message;$==="NOT_FOUND"&&ee.includes("database")&&ee.includes("does not exist")&&ee.includes(this.databaseId.database)&&Ot(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),U===void 0&&(U=R.INTERNAL,ee="Unknown error status: "+$+" with message "+j.message),m=!0,w.o_(new D(U,ee)),d.close()}else x(Je,`RPC '${e}' stream ${i} received:`,k),w.__(k)}})),ui.u_(),setTimeout((()=>{w.s_()}),0),w}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Ey()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ak(n){return new ui(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fw(){return typeof window<"u"?window:null}function Fa(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Go(n){return new d0(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ui.c_=!1;class ld{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=i,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),i=Math.max(0,t-r);i>0&&x("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,i,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hm="PersistentStream";class pw{constructor(e,t,r,i,s,o,c,u){this.Ci=e,this.b_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new ld(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,(()=>this.k_())))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===R.RESOURCE_EXHAUSTED?(Ce(t.toString()),Ce("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,i])=>{this.D_===t&&this.G_(r,i)}),(r=>{e((()=>{const i=new D(R.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(i)}))}))}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((i=>{r((()=>this.z_(i)))})),this.stream.onMessage((i=>{r((()=>++this.F_==1?this.H_(i):this.onNext(i)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return x(Hm,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(x(Hm,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class ck extends pw{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=m0(this.serializer,e),r=(function(s){if(!("targetChange"in s))return z.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?z.min():o.readTime?ke(o.readTime):z.min()})(e);return this.listener.J_(t,r)}Z_(e){const t={};t.database=Ll(this.serializer),t.addTarget=(function(s,o){let c;const u=o.target;if(c=ic(u)?{documents:NI(s,u)}:{query:OI(s,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=PI(s,o.resumeToken);const l=Ol(s,o.expectedCount);l!==null&&(c.expectedCount=l)}else if(o.snapshotVersion.compareTo(z.min())>0){c.readTime=Ri(s,o.snapshotVersion.toTimestamp());const l=Ol(s,o.expectedCount);l!==null&&(c.expectedCount=l)}return c})(this.serializer,e);const r=_0(this.serializer,e);r&&(t.labels=r),this.K_(t)}X_(e){const t={};t.database=Ll(this.serializer),t.removeTarget=e,this.K_(t)}}class uk extends pw{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}H_(e){return q(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,q(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){q(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=g0(e.writeResults,e.commitTime),r=ke(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=Ll(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>yo(this.serializer,r)))};this.K_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lk{}class hk extends lk{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new D(R.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,o])=>this.connection.Wo(e,Ml(t,r),i,s,o))).catch((s=>{throw s.name==="FirebaseError"?(s.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new D(R.UNKNOWN,s.toString())}))}jo(e,t,r,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.jo(e,Ml(t,r),i,o,c,s))).catch((o=>{throw o.name==="FirebaseError"?(o.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(R.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function dk(n,e,t,r){return new hk(n,e,t,r)}class fk{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ce(t),this.aa=!1):x("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kr="RemoteStore";class pk{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo((o=>{r.enqueueAndForget((async()=>{Kn(this)&&(x(kr,"Restarting streams for network reachability change."),await(async function(u){const l=L(u);l.Ea.add(4),await Wi(l),l.Va.set("Unknown"),l.Ea.delete(4),await Wo(l)})(this))}))})),this.Va=new fk(r,i)}}async function Wo(n){if(Kn(n))for(const e of n.Ra)await e(!0)}async function Wi(n){for(const e of n.Ra)await e(!1)}function Wc(n,e){const t=L(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),fd(t)?dd(t):Ki(t).O_()&&hd(t,e))}function ki(n,e){const t=L(n),r=Ki(t);t.Ia.delete(e),r.O_()&&mw(t,e),t.Ia.size===0&&(r.O_()?r.L_():Kn(t)&&t.Va.set("Unknown"))}function hd(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(z.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ki(n).Z_(e)}function mw(n,e){n.da.$e(e),Ki(n).X_(e)}function dd(n){n.da=new c0({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Ki(n).start(),n.Va.ua()}function fd(n){return Kn(n)&&!Ki(n).x_()&&n.Ia.size>0}function Kn(n){return L(n).Ea.size===0}function gw(n){n.da=void 0}async function mk(n){n.Va.set("Online")}async function gk(n){n.Ia.forEach(((e,t)=>{hd(n,e)}))}async function _k(n,e){gw(n),fd(n)?(n.Va.ha(e),dd(n)):n.Va.set("Unknown")}async function yk(n,e,t){if(n.Va.set("Online"),e instanceof RI&&e.state===2&&e.cause)try{await(async function(i,s){const o=s.cause;for(const c of s.targetIds)i.Ia.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.Ia.delete(c),i.da.removeTarget(c))})(n,e)}catch(r){x(kr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await pc(n,r)}else if(e instanceof Ma?n.da.Xe(e):e instanceof SI?n.da.st(e):n.da.tt(e),!t.isEqual(z.min()))try{const r=await iw(n.localStore);t.compareTo(r)>=0&&await(function(s,o){const c=s.da.Tt(o);return c.targetChanges.forEach(((u,l)=>{if(u.resumeToken.approximateByteSize()>0){const d=s.Ia.get(l);d&&s.Ia.set(l,d.withResumeToken(u.resumeToken,o))}})),c.targetMismatches.forEach(((u,l)=>{const d=s.Ia.get(u);if(!d)return;s.Ia.set(u,d.withResumeToken(be.EMPTY_BYTE_STRING,d.snapshotVersion)),mw(s,u);const p=new Jt(d.target,u,l,d.sequenceNumber);hd(s,p)})),s.remoteSyncer.applyRemoteEvent(c)})(n,t)}catch(r){x(kr,"Failed to raise snapshot:",r),await pc(n,r)}}async function pc(n,e,t){if(!Wn(e))throw e;n.Ea.add(1),await Wi(n),n.Va.set("Offline"),t||(t=()=>iw(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{x(kr,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await Wo(n)}))}function _w(n,e){return e().catch((t=>pc(n,t,e)))}async function Hi(n){const e=L(n),t=$n(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Cn;for(;Ik(e);)try{const i=await ek(e.localStore,r);if(i===null){e.Ta.length===0&&t.L_();break}r=i.batchId,wk(e,i)}catch(i){await pc(e,i)}yw(e)&&Iw(e)}function Ik(n){return Kn(n)&&n.Ta.length<10}function wk(n,e){n.Ta.push(e);const t=$n(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function yw(n){return Kn(n)&&!$n(n).x_()&&n.Ta.length>0}function Iw(n){$n(n).start()}async function vk(n){$n(n).ra()}async function Ek(n){const e=$n(n);for(const t of n.Ta)e.ea(t.mutations)}async function Tk(n,e,t){const r=n.Ta.shift(),i=Jh.from(r,e,t);await _w(n,(()=>n.remoteSyncer.applySuccessfulWrite(i))),await Hi(n)}async function Ak(n,e){e&&$n(n).Y_&&await(async function(r,i){if((function(o){return TI(o)&&o!==R.ABORTED})(i.code)){const s=r.Ta.shift();$n(r).B_(),await _w(r,(()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i))),await Hi(r)}})(n,e),yw(n)&&Iw(n)}async function Km(n,e){const t=L(n);t.asyncQueue.verifyOperationInProgress(),x(kr,"RemoteStore received new credentials");const r=Kn(t);t.Ea.add(3),await Wi(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await Wo(t)}async function zl(n,e){const t=L(n);e?(t.Ea.delete(2),await Wo(t)):e||(t.Ea.add(2),await Wi(t),t.Va.set("Unknown"))}function Ki(n){return n.ma||(n.ma=(function(t,r,i){const s=L(t);return s.sa(),new ck(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Zo:mk.bind(null,n),Yo:gk.bind(null,n),t_:_k.bind(null,n),J_:yk.bind(null,n)}),n.Ra.push((async e=>{e?(n.ma.B_(),fd(n)?dd(n):n.Va.set("Unknown")):(await n.ma.stop(),gw(n))}))),n.ma}function $n(n){return n.fa||(n.fa=(function(t,r,i){const s=L(t);return s.sa(),new uk(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:vk.bind(null,n),t_:Ak.bind(null,n),ta:Ek.bind(null,n),na:Tk.bind(null,n)}),n.Ra.push((async e=>{e?(n.fa.B_(),await Hi(n)):(await n.fa.stop(),n.Ta.length>0&&(x(kr,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new He,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,c=new pd(e,t,o,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(R.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Qi(n,e){if(Ce("AsyncQueue",`${e}: ${n}`),Wn(n))return new D(R.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{static emptySet(e){return new li(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||O.comparator(t.key,r.key):(t,r)=>O.comparator(t.key,r.key),this.keyedMap=Cs(),this.sortedSet=new fe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof li)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new li;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qm{constructor(){this.ga=new fe(O.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):F(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Di{constructor(e,t,r,i,s,o,c,u,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new Di(e,t,li.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Bo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bk{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some((e=>e.Da()))}}class Sk{constructor(){this.queries=Jm(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const i=L(t),s=i.queries;i.queries=Jm(),s.forEach(((o,c)=>{for(const u of c.ba)u.onError(r)}))})(this,new D(R.ABORTED,"Firestore shutting down"))}}function Jm(){return new an((n=>uI(n)),Bo)}async function md(n,e){const t=L(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.Sa()&&e.Da()&&(r=2):(s=new bk,r=e.Da()?0:1);try{switch(r){case 0:s.wa=await t.onListen(i,!0);break;case 1:s.wa=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const c=Qi(o,`Initialization of query '${Xr(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.ba.push(e),e.va(t.onlineState),s.wa&&e.Fa(s.wa)&&_d(t)}async function gd(n,e){const t=L(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.ba.indexOf(e);o>=0&&(s.ba.splice(o,1),s.ba.length===0?i=e.Da()?0:1:!s.Sa()&&e.Da()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Rk(n,e){const t=L(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const c of o.ba)c.Fa(i)&&(r=!0);o.wa=i}}r&&_d(t)}function Pk(n,e,t){const r=L(n),i=r.queries.get(e);if(i)for(const s of i.ba)s.onError(t);r.queries.delete(e)}function _d(n){n.Ca.forEach((e=>{e.next()}))}var Gl,Ym;(Ym=Gl||(Gl={})).Ma="default",Ym.Cache="cache";class yd{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Di(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.Ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Di.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Gl.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ck{constructor(e,t){this.qa=e,this.byteLength=t}Ua(){return"metadata"in this.qa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm{constructor(e){this.serializer=e}Ks(e){return Gt(this.serializer,e)}qs(e){return e.metadata.exists?xI(this.serializer,e.document,!1):me.newNoDocument(this.Ks(e.metadata.name),this.Us(e.metadata.readTime))}Us(e){return ke(e)}}class kk{constructor(e,t){this.$a=e,this.serializer=t,this.Wa=[],this.Qa=[],this.collectionGroups=new Set,this.progress=ww(e)}get queries(){return this.Wa}get documents(){return this.Qa}Ga(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.qa.namedQuery)this.Wa.push(e.qa.namedQuery);else if(e.qa.documentMetadata){this.Qa.push({metadata:e.qa.documentMetadata}),e.qa.documentMetadata.exists||++t;const r=X.fromString(e.qa.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.qa.document&&(this.Qa[this.Qa.length-1].document=e.qa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,{...this.progress}):null}za(e){const t=new Map,r=new Xm(this.serializer);for(const i of e)if(i.metadata.queries){const s=r.Ks(i.metadata.name);for(const o of i.metadata.queries){const c=(t.get(o)||K()).add(s);t.set(o,c)}}return t}async ja(e){const t=await tk(e,new Xm(this.serializer),this.Qa,this.$a.id),r=this.za(this.documents);for(const i of this.Wa)await nk(e,i,r.get(i.name));return this.progress.taskState="Success",{progress:this.progress,Ha:this.collectionGroups,Ja:t}}}function ww(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vw{constructor(e){this.key=e}}class Ew{constructor(e){this.key=e}}class Tw{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=K(),this.mutatedKeys=K(),this.eu=hI(e),this.tu=new li(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new Qm,i=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,l=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal(((d,p)=>{const m=i.get(d),w=$o(this.query,p)?p:null,C=!!m&&this.mutatedKeys.has(m.key),k=!!w&&(w.hasLocalMutations||this.mutatedKeys.has(w.key)&&w.hasCommittedMutations);let V=!1;m&&w?m.data.isEqual(w.data)?C!==k&&(r.track({type:3,doc:w}),V=!0):this.su(m,w)||(r.track({type:2,doc:w}),V=!0,(u&&this.eu(w,u)>0||l&&this.eu(w,l)<0)&&(c=!0)):!m&&w?(r.track({type:0,doc:w}),V=!0):m&&!w&&(r.track({type:1,doc:m}),V=!0,(u||l)&&(c=!0)),V&&(w?(o=o.add(w),s=k?s.add(d):s.delete(d)):(o=o.delete(d),s=s.delete(d)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),s=s.delete(d.key),r.track({type:1,doc:d})}return{tu:o,iu:r,Ss:c,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((d,p)=>(function(w,C){const k=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F(20277,{Vt:V})}};return k(w)-k(C)})(d.type,p.type)||this.eu(d.doc,p.doc))),this.ou(r),i=i??!1;const c=t&&!i?this._u():[],u=this.Ya.size===0&&this.current&&!i?1:0,l=u!==this.Xa;return this.Xa=u,o.length!==0||l?{snapshot:new Di(this.query,e.tu,s,o,e.mutatedKeys,u===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Qm,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=K(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))}));const t=[];return e.forEach((r=>{this.Ya.has(r)||t.push(new Ew(r))})),this.Ya.forEach((r=>{e.has(r)||t.push(new vw(r))})),t}cu(e){this.Za=e.ks,this.Ya=K();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Di.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Qn="SyncEngine";class Dk{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Vk{constructor(e){this.key=e,this.hu=!1}}class xk{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new an((c=>uI(c)),Bo),this.Iu=new Map,this.Eu=new Set,this.Ru=new fe(O.comparator),this.Au=new Map,this.Vu=new rd,this.du={},this.mu=new Map,this.fu=Cr.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Nk(n,e,t=!0){const r=Hc(n);let i;const s=r.Tu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await Aw(r,e,t,!0),i}async function Ok(n,e){const t=Hc(n);await Aw(t,e,!0,!1)}async function Aw(n,e,t,r){const i=await Pi(n.localStore,ot(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let c;return r&&(c=await Id(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&Wc(n.remoteStore,i),c}async function Id(n,e,t,r,i){n.pu=(p,m,w)=>(async function(k,V,j,$){let U=V.view.ru(j);U.Ss&&(U=await hc(k.localStore,V.query,!1).then((({documents:v})=>V.view.ru(v,U))));const ee=$&&$.targetChanges.get(V.targetId),J=$&&$.targetMismatches.get(V.targetId)!=null,B=V.view.applyChanges(U,k.isPrimaryClient,ee,J);return Wl(k,V.targetId,B.au),B.snapshot})(n,p,m,w);const s=await hc(n.localStore,e,!0),o=new Tw(e,s.ks),c=o.ru(s.documents),u=zo.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),l=o.applyChanges(c,n.isPrimaryClient,u);Wl(n,t,l.au);const d=new Dk(e,t,o);return n.Tu.set(e,d),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),l.snapshot}async function Mk(n,e,t){const r=L(n),i=r.Tu.get(e),s=r.Iu.get(i.targetId);if(s.length>1)return r.Iu.set(i.targetId,s.filter((o=>!Bo(o,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Ci(r.localStore,i.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(i.targetId),t&&ki(r.remoteStore,i.targetId),Vi(r,i.targetId)})).catch(Gn)):(Vi(r,i.targetId),await Ci(r.localStore,i.targetId,!0))}async function Lk(n,e){const t=L(n),r=t.Tu.get(e),i=t.Iu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ki(t.remoteStore,r.targetId))}async function Fk(n,e,t){const r=Td(n);try{const i=await(function(o,c){const u=L(o),l=se.now(),d=c.reduce(((w,C)=>w.add(C.key)),K());let p,m;return u.persistence.runTransaction("Locally write mutations","readwrite",(w=>{let C=ht(),k=K();return u.xs.getEntries(w,d).next((V=>{C=V,C.forEach(((j,$)=>{$.isValidDocument()||(k=k.add(j))}))})).next((()=>u.localDocuments.getOverlayedDocuments(w,C))).next((V=>{p=V;const j=[];for(const $ of c){const U=s0($,p.get($.key).overlayedDocument);U!=null&&j.push(new cn($.key,U,eI(U.value.mapValue),we.exists(!0)))}return u.mutationQueue.addMutationBatch(w,l,j,c)})).next((V=>{m=V;const j=V.applyToLocalDocumentSet(p,k);return u.documentOverlayCache.saveOverlays(w,V.batchId,j)}))})).then((()=>({batchId:m.batchId,changes:fI(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),(function(o,c,u){let l=o.du[o.currentUser.toKey()];l||(l=new fe(H)),l=l.insert(c,u),o.du[o.currentUser.toKey()]=l})(r,i.batchId,t),await un(r,i.changes),await Hi(r.remoteStore)}catch(i){const s=Qi(i,"Failed to persist write");t.reject(s)}}async function bw(n,e){const t=L(n);try{const r=await Z0(t.localStore,e);e.targetChanges.forEach(((i,s)=>{const o=t.Au.get(s);o&&(q(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.hu=!0:i.modifiedDocuments.size>0?q(o.hu,14607):i.removedDocuments.size>0&&(q(o.hu,42227),o.hu=!1))})),await un(t,r,e)}catch(r){await Gn(r)}}function Zm(n,e,t){const r=L(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Tu.forEach(((s,o)=>{const c=o.view.va(e);c.snapshot&&i.push(c.snapshot)})),(function(o,c){const u=L(o);u.onlineState=c;let l=!1;u.queries.forEach(((d,p)=>{for(const m of p.ba)m.va(c)&&(l=!0)})),l&&_d(u)})(r.eventManager,e),i.length&&r.Pu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Uk(n,e,t){const r=L(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Au.get(e),s=i&&i.key;if(s){let o=new fe(O.comparator);o=o.insert(s,me.newNoDocument(s,z.min()));const c=K().add(s),u=new jo(z.min(),new Map,new fe(H),o,c);await bw(r,u),r.Ru=r.Ru.remove(s),r.Au.delete(e),Ed(r)}else await Ci(r.localStore,e,!1).then((()=>Vi(r,e,t))).catch(Gn)}async function Bk(n,e){const t=L(n),r=e.batch.batchId;try{const i=await X0(t.localStore,e);vd(t,r,null),wd(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await un(t,i)}catch(i){await Gn(i)}}async function $k(n,e,t){const r=L(n);try{const i=await(function(o,c){const u=L(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",(l=>{let d;return u.mutationQueue.lookupMutationBatch(l,c).next((p=>(q(p!==null,37113),d=p.keys(),u.mutationQueue.removeMutationBatch(l,p)))).next((()=>u.mutationQueue.performConsistencyCheck(l))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(l,d,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,d))).next((()=>u.localDocuments.getDocuments(l,d)))}))})(r.localStore,e);vd(r,e,t),wd(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await un(r,i)}catch(i){await Gn(i)}}async function qk(n,e){const t=L(n);Kn(t.remoteStore)||x(Qn,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await(function(o){const c=L(o);return c.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(u=>c.mutationQueue.getHighestUnacknowledgedBatchId(u)))})(t.localStore);if(r===Cn)return void e.resolve();const i=t.mu.get(r)||[];i.push(e),t.mu.set(r,i)}catch(r){const i=Qi(r,"Initialization of waitForPendingWrites() operation failed");e.reject(i)}}function wd(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function vd(n,e,t){const r=L(n);let i=r.du[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.du[r.currentUser.toKey()]=i}}function Vi(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach((r=>{n.Vu.containsKey(r)||Sw(n,r)}))}function Sw(n,e){n.Eu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(ki(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),Ed(n))}function Wl(n,e,t){for(const r of t)r instanceof vw?(n.Vu.addReference(r.key,e),jk(n,r)):r instanceof Ew?(x(Qn,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||Sw(n,r.key)):F(19791,{wu:r})}function jk(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Eu.has(r)||(x(Qn,"New document in limbo: "+t),n.Eu.add(r),Ed(n))}function Ed(n){for(;n.Eu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new O(X.fromString(e)),r=n.fu.next();n.Au.set(r,new Vk(t)),n.Ru=n.Ru.insert(t,r),Wc(n.remoteStore,new Jt(ot(ji(t.path)),r,"TargetPurposeLimboResolution",ut.ce))}}async function un(n,e,t){const r=L(n),i=[],s=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach(((c,u)=>{o.push(r.pu(u,e,t).then((l=>{if((l||t)&&r.isPrimaryClient){const d=l?!l.fromCache:t?.targetChanges.get(u.targetId)?.current;r.sharedClientState.updateQueryState(u.targetId,d?"current":"not-current")}if(l){i.push(l);const d=ad.Es(u.targetId,l);s.push(d)}})))})),await Promise.all(o),r.Pu.J_(i),await(async function(u,l){const d=L(u);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>A.forEach(l,(m=>A.forEach(m.Ts,(w=>d.persistence.referenceDelegate.addReference(p,m.targetId,w))).next((()=>A.forEach(m.Is,(w=>d.persistence.referenceDelegate.removeReference(p,m.targetId,w)))))))))}catch(p){if(!Wn(p))throw p;x(cd,"Failed to update sequence numbers: "+p)}for(const p of l){const m=p.targetId;if(!p.fromCache){const w=d.vs.get(m),C=w.snapshotVersion,k=w.withLastLimboFreeSnapshotVersion(C);d.vs=d.vs.insert(m,k)}}})(r.localStore,s))}async function zk(n,e){const t=L(n);if(!t.currentUser.isEqual(e)){x(Qn,"User change. New user:",e.toKey());const r=await rw(t.localStore,e);t.currentUser=e,(function(s,o){s.mu.forEach((c=>{c.forEach((u=>{u.reject(new D(R.CANCELLED,o))}))})),s.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await un(t,r.Ns)}}function Gk(n,e){const t=L(n),r=t.Au.get(e);if(r&&r.hu)return K().add(r.key);{let i=K();const s=t.Iu.get(e);if(!s)return i;for(const o of s){const c=t.Tu.get(o);i=i.unionWith(c.view.nu)}return i}}async function Wk(n,e){const t=L(n),r=await hc(t.localStore,e.query,!0),i=e.view.cu(r);return t.isPrimaryClient&&Wl(t,e.targetId,i.au),i}async function Hk(n,e){const t=L(n);return aw(t.localStore,e).then((r=>un(t,r)))}async function Kk(n,e,t,r){const i=L(n),s=await(function(c,u){const l=L(c),d=L(l.mutationQueue);return l.persistence.runTransaction("Lookup mutation documents","readonly",(p=>d.Xn(p,u).next((m=>m?l.localDocuments.getDocuments(p,m):A.resolve(null)))))})(i.localStore,e);s!==null?(t==="pending"?await Hi(i.remoteStore):t==="acknowledged"||t==="rejected"?(vd(i,e,r||null),wd(i,e),(function(c,u){L(L(c).mutationQueue).nr(u)})(i.localStore,e)):F(6720,"Unknown batchState",{bu:t}),await un(i,s)):x(Qn,"Cannot apply mutation batch with id: "+e)}async function Qk(n,e){const t=L(n);if(Hc(t),Td(t),e===!0&&t.gu!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),i=await eg(t,r.toArray());t.gu=!0,await zl(t.remoteStore,!0);for(const s of i)Wc(t.remoteStore,s)}else if(e===!1&&t.gu!==!1){const r=[];let i=Promise.resolve();t.Iu.forEach(((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then((()=>(Vi(t,o),Ci(t.localStore,o,!0)))),ki(t.remoteStore,o)})),await i,await eg(t,r),(function(o){const c=L(o);c.Au.forEach(((u,l)=>{ki(c.remoteStore,l)})),c.Vu.zr(),c.Au=new Map,c.Ru=new fe(O.comparator)})(t),t.gu=!1,await zl(t.remoteStore,!1)}}async function eg(n,e,t){const r=L(n),i=[],s=[];for(const o of e){let c;const u=r.Iu.get(o);if(u&&u.length!==0){c=await Pi(r.localStore,ot(u[0]));for(const l of u){const d=r.Tu.get(l),p=await Wk(r,d);p.snapshot&&s.push(p.snapshot)}}else{const l=await ow(r.localStore,o);c=await Pi(r.localStore,l),await Id(r,Rw(l),o,!1,c.resumeToken)}i.push(c)}return r.Pu.J_(s),i}function Rw(n){return cI(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function Jk(n){return(function(t){return L(L(t).persistence).hs()})(L(n).localStore)}async function Yk(n,e,t,r){const i=L(n);if(i.gu)return void x(Qn,"Ignoring unexpected query state notification.");const s=i.Iu.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{const o=await aw(i.localStore,lI(s[0])),c=jo.createSynthesizedRemoteEventForCurrentChange(e,t==="current",be.EMPTY_BYTE_STRING);await un(i,o,c);break}case"rejected":await Ci(i.localStore,e,!0),Vi(i,e,r);break;default:F(64155,t)}}async function Xk(n,e,t){const r=Hc(n);if(r.gu){for(const i of e){if(r.Iu.has(i)&&r.sharedClientState.isActiveQueryTarget(i)){x(Qn,"Adding an already active target "+i);continue}const s=await ow(r.localStore,i),o=await Pi(r.localStore,s);await Id(r,Rw(s),o.targetId,!1,o.resumeToken),Wc(r.remoteStore,o)}for(const i of t)r.Iu.has(i)&&await Ci(r.localStore,i,!1).then((()=>{ki(r.remoteStore,i),Vi(r,i)})).catch(Gn)}}function Hc(n){const e=L(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=bw.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Gk.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Uk.bind(null,e),e.Pu.J_=Rk.bind(null,e.eventManager),e.Pu.yu=Pk.bind(null,e.eventManager),e}function Td(n){const e=L(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Bk.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=$k.bind(null,e),e}function Zk(n,e,t){const r=L(n);(async function(s,o,c){try{const u=await o.getMetadata();if(await(function(w,C){const k=L(w),V=ke(C.createTime);return k.persistence.runTransaction("hasNewerBundle","readonly",(j=>k.Pi.getBundleMetadata(j,C.id))).then((j=>!!j&&j.createTime.compareTo(V)>=0))})(s.localStore,u))return await o.close(),c._completeWith((function(w){return{taskState:"Success",documentsLoaded:w.totalDocuments,bytesLoaded:w.totalBytes,totalDocuments:w.totalDocuments,totalBytes:w.totalBytes}})(u)),Promise.resolve(new Set);c._updateProgress(ww(u));const l=new kk(u,o.serializer);let d=await o.Su();for(;d;){const m=await l.Ga(d);m&&c._updateProgress(m),d=await o.Su()}const p=await l.ja(s.localStore);return await un(s,p.Ja,void 0),await(function(w,C){const k=L(w);return k.persistence.runTransaction("Save bundle","readwrite",(V=>k.Pi.saveBundleMetadata(V,C)))})(s.localStore,u),c._completeWith(p.progress),Promise.resolve(p.Ha)}catch(u){return Ot(Qn,`Loading bundle failed with ${u}`),c._failWith(u),Promise.resolve(new Set)}})(r,e,t).then((i=>{r.sharedClientState.notifyBundleLoaded(i)}))}class Io{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Go(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return nw(this.persistence,new tw,e.initialUser,this.serializer)}Cu(e){return new id(Gc.Vi,this.serializer)}Du(e){return new dw}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Io.provider={build:()=>new Io};class eD extends Io{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){q(this.persistence.referenceDelegate instanceof lc,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new QI(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Ye.withCacheSize(this.cacheSizeBytes):Ye.DEFAULT;return new id((r=>lc.Vi(r,t)),this.serializer)}}class Pw extends Io{constructor(e,t,r){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await Td(this.xu.syncEngine),await Hi(this.xu.remoteStore),await this.persistence.zi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}vu(e){return nw(this.persistence,new tw,e.initialUser,this.serializer)}Fu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new QI(r,e.asyncQueue,t)}Mu(e,t){const r=new rC(t,this.persistence);return new nC(e.asyncQueue,r)}Cu(e){const t=od(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?Ye.withCacheSize(this.cacheSizeBytes):Ye.DEFAULT;return new sd(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,fw(),Fa(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new dw}}class tD extends Pw{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof Zu&&(this.sharedClientState.syncEngine={So:Kk.bind(null,t),Do:Yk.bind(null,t),Co:Xk.bind(null,t),hs:Jk.bind(null,t),bo:Hk.bind(null,t)},await this.sharedClientState.start()),await this.persistence.zi((async r=>{await Qk(this.xu.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())}))}Du(e){const t=fw();if(!Zu.v(t))throw new D(R.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=od(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Zu(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class wo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Zm(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=zk.bind(null,this.syncEngine),await zl(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Sk})()}createDatastore(e){const t=Go(e.databaseInfo.databaseId),r=ak(e.databaseInfo);return dk(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,i,s,o,c){return new pk(r,i,s,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Zm(this.syncEngine,t,0)),(function(){return Wm.v()?new Wm:new rk})())}createSyncEngine(e,t){return(function(i,s,o,c,u,l,d){const p=new xk(i,s,o,c,u,l);return d&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const r=L(t);x(kr,"RemoteStore shutting down."),r.Ea.add(5),await Wi(r),r.Aa.shutdown(),r.Va.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}wo.provider={build:()=>new wo};function tg(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Ce("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nD{constructor(e,t){this.Bu=e,this.serializer=t,this.metadata=new He,this.buffer=new Uint8Array,this.Lu=(function(){return new TextDecoder("utf-8")})(),this.ku().then((r=>{r&&r.Ua()?this.metadata.resolve(r.qa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r?.qa)}`))}),(r=>this.metadata.reject(r)))}close(){return this.Bu.cancel()}async getMetadata(){return this.metadata.promise}async Su(){return await this.getMetadata(),this.ku()}async ku(){const e=await this.Ku();if(e===null)return null;const t=this.Lu.decode(e),r=Number(t);isNaN(r)&&this.qu(`length string (${t}) is not valid number`);const i=await this.Uu(r);return new Ck(JSON.parse(i),e.length+r)}$u(){return this.buffer.findIndex((e=>e===123))}async Ku(){for(;this.$u()<0&&!await this.Wu(););if(this.buffer.length===0)return null;const e=this.$u();e<0&&this.qu("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async Uu(e){for(;this.buffer.length<e;)await this.Wu()&&this.qu("Reached the end of bundle when more is expected.");const t=this.Lu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}qu(e){throw this.Bu.cancel(),new Error(`Invalid bundle format: ${e}`)}async Wu(){const e=await this.Bu.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rD=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new D(R.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(i,s){const o=L(i),c={documents:s.map((p=>_o(o.serializer,p)))},u=await o.jo("BatchGetDocuments",o.serializer.databaseId,X.emptyPath(),c,s.length),l=new Map;u.forEach((p=>{const m=p0(o.serializer,p);l.set(m.key.toString(),m)}));const d=[];return s.forEach((p=>{const m=l.get(p.toString());q(!!m,55234,{key:p}),d.push(m)})),d})(this.datastore,e);return t.forEach((r=>this.recordVersion(r))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new Gi(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,r)=>{const i=O.fromPath(r);this.mutations.push(new Kh(i,this.precondition(i)))})),await(async function(r,i){const s=L(r),o={writes:i.map((c=>yo(s.serializer,c)))};await s.Wo("Commit",s.serializer.databaseId,X.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw F(50498,{Gu:e.constructor.name});t=z.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new D(R.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(z.min())?we.exists(!1):we.updateTime(t):we.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(z.min()))throw new D(R.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return we.updateTime(t)}return we.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iD{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this.zu=r.maxAttempts,this.M_=new ld(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Hu()}Hu(){this.M_.p_((async()=>{const e=new rD(this.datastore),t=this.Ju(e);t&&t.then((r=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(r)})).catch((i=>{this.Zu(i)}))))})).catch((r=>{this.Zu(r)}))}))}Ju(e){try{const t=this.updateFunction(e);return!Lo(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget((()=>(this.Hu(),Promise.resolve())))):this.deferred.reject(e)}Xu(e){if(e?.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!TI(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qn="FirestoreClient";class sD{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=i,this.user=$e.UNAUTHENTICATED,this.clientId=Nh.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,(async o=>{x(qn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(x(qn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new He;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Qi(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function tl(n,e){n.asyncQueue.verifyOperationInProgress(),x(qn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async i=>{r.isEqual(i)||(await rw(e.localStore,i),r=i)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function ng(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Ad(n);x(qn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Km(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,i)=>Km(e.remoteStore,i))),n._onlineComponents=e}async function Ad(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){x(qn,"Using user provided OfflineComponentProvider");try{await tl(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(i){return i.name==="FirebaseError"?i.code===R.FAILED_PRECONDITION||i.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(t))throw t;Ot("Error using user provided cache. Falling back to memory cache: "+t),await tl(n,new Io)}}else x(qn,"Using default OfflineComponentProvider"),await tl(n,new eD(void 0));return n._offlineComponents}async function Qc(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(x(qn,"Using user provided OnlineComponentProvider"),await ng(n,n._uninitializedComponentsProvider._online)):(x(qn,"Using default OnlineComponentProvider"),await ng(n,new wo))),n._onlineComponents}function Cw(n){return Ad(n).then((e=>e.persistence))}function bd(n){return Ad(n).then((e=>e.localStore))}function kw(n){return Qc(n).then((e=>e.remoteStore))}function Sd(n){return Qc(n).then((e=>e.syncEngine))}function oD(n){return Qc(n).then((e=>e.datastore))}async function xi(n){const e=await Qc(n),t=e.eventManager;return t.onListen=Nk.bind(null,e.syncEngine),t.onUnlisten=Mk.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Ok.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Lk.bind(null,e.syncEngine),t}function aD(n){return n.asyncQueue.enqueue((async()=>{const e=await Cw(n),t=await kw(n);return e.setNetworkEnabled(!0),(function(i){const s=L(i);return s.Ea.delete(0),Wo(s)})(t)}))}function cD(n){return n.asyncQueue.enqueue((async()=>{const e=await Cw(n),t=await kw(n);return e.setNetworkEnabled(!1),(async function(i){const s=L(i);s.Ea.add(0),await Wi(s),s.Va.set("Offline")})(t)}))}function uD(n,e,t,r){const i=new Kc(r),s=new yd(e,i,t);return n.asyncQueue.enqueueAndForget((async()=>md(await xi(n),s))),()=>{i.Nu(),n.asyncQueue.enqueueAndForget((async()=>gd(await xi(n),s)))}}function lD(n,e){const t=new He;return n.asyncQueue.enqueueAndForget((async()=>(async function(i,s,o){try{const c=await(function(l,d){const p=L(l);return p.persistence.runTransaction("read document","readonly",(m=>p.localDocuments.getDocument(m,d)))})(i,s);c.isFoundDocument()?o.resolve(c):c.isNoDocument()?o.resolve(null):o.reject(new D(R.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(c){const u=Qi(c,`Failed to get document '${s} from cache`);o.reject(u)}})(await bd(n),e,t))),t.promise}function Dw(n,e,t={}){const r=new He;return n.asyncQueue.enqueueAndForget((async()=>(function(s,o,c,u,l){const d=new Kc({next:m=>{d.Nu(),o.enqueueAndForget((()=>gd(s,p)));const w=m.docs.has(c);!w&&m.fromCache?l.reject(new D(R.UNAVAILABLE,"Failed to get document because the client is offline.")):w&&m.fromCache&&u&&u.source==="server"?l.reject(new D(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(m)},error:m=>l.reject(m)}),p=new yd(ji(c.path),d,{includeMetadataChanges:!0,Ka:!0});return md(s,p)})(await xi(n),n.asyncQueue,e,t,r))),r.promise}function hD(n,e){const t=new He;return n.asyncQueue.enqueueAndForget((async()=>(async function(i,s,o){try{const c=await hc(i,s,!0),u=new Tw(s,c.ks),l=u.ru(c.documents),d=u.applyChanges(l,!1);o.resolve(d.snapshot)}catch(c){const u=Qi(c,`Failed to execute query '${s} against cache`);o.reject(u)}})(await bd(n),e,t))),t.promise}function Vw(n,e,t={}){const r=new He;return n.asyncQueue.enqueueAndForget((async()=>(function(s,o,c,u,l){const d=new Kc({next:m=>{d.Nu(),o.enqueueAndForget((()=>gd(s,p))),m.fromCache&&u.source==="server"?l.reject(new D(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(m)},error:m=>l.reject(m)}),p=new yd(c,d,{includeMetadataChanges:!0,Ka:!0});return md(s,p)})(await xi(n),n.asyncQueue,e,t,r))),r.promise}function dD(n,e){const t=new He;return n.asyncQueue.enqueueAndForget((async()=>Fk(await Sd(n),e,t))),t.promise}function fD(n,e){const t=new Kc(e);return n.asyncQueue.enqueueAndForget((async()=>(function(i,s){L(i).Ca.add(s),s.next()})(await xi(n),t))),()=>{t.Nu(),n.asyncQueue.enqueueAndForget((async()=>(function(i,s){L(i).Ca.delete(s)})(await xi(n),t)))}}function pD(n,e,t){const r=new He;return n.asyncQueue.enqueueAndForget((async()=>{const i=await oD(n);new iD(n.asyncQueue,i,t,e,r).ju()})),r.promise}function mD(n,e,t,r){const i=(function(o,c){let u;return u=typeof o=="string"?bI().encode(o):o,(function(d,p){return new nD(d,p)})((function(d,p){if(d instanceof Uint8Array)return tg(d,p);if(d instanceof ArrayBuffer)return tg(new Uint8Array(d),p);if(d instanceof ReadableStream)return d.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(u),c)})(t,Go(e));n.asyncQueue.enqueueAndForget((async()=>{Zk(await Sd(n),i,r)}))}function gD(n,e){return n.asyncQueue.enqueue((async()=>(function(r,i){const s=L(r);return s.persistence.runTransaction("Get named query","readonly",(o=>s.Pi.getNamedQuery(o,i)))})(await bd(n),e)))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xw(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _D="ComponentProvider",rg=new Map;function yD(n,e,t,r,i){return new VC(n,e,t,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,xw(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nw="firestore.googleapis.com",ig=!0;class sg{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new D(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Nw,this.ssl=ig}else this.host=e.host,this.ssl=e.ssl??ig;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=GI;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<x0)throw new D(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Sy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=xw(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new D(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new D(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new D(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,i){return r.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ho{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sg({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sg(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new zP;switch(r.type){case"firstParty":return new KP(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=rg.get(t);r&&(x(_D,"Removing Datastore"),rg.delete(t),r.terminate())})(this),Promise.resolve()}}function Ow(n,e,t,r={}){n=re(n,Ho);const i=Li(e),s=n._getSettings(),o={...s,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;i&&(Gg(`https://${c}`),Wg("Firestore",!0)),s.host!==Nw&&s.host!==c&&Ot("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...s,host:c,ssl:i,emulatorOptions:r};if(!Xt(u,o)&&(n._setSettings(u),r.mockUserToken)){let l,d;if(typeof r.mockUserToken=="string")l=r.mockUserToken,d=$e.MOCK_USER;else{l=lT(r.mockUserToken,n._app?.options.projectId);const p=r.mockUserToken.sub||r.mockUserToken.user_id;if(!p)throw new D(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new $e(p)}n._authCredentials=new GP(new Ay(l,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let at=class Mw{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Mw(this.firestore,e,this._query)}},de=class Vs{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new kn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Vs(this.firestore,e,this._key)}toJSON(){return{type:Vs._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Mo(t,Vs._jsonSchema))return new Vs(e,r||null,new O(X.fromString(t.referencePath)))}};de._jsonSchemaVersion="firestore/documentReference/1.0",de._jsonSchema={type:Ne("string",de._jsonSchemaVersion),referencePath:Ne("string")};let kn=class Lw extends at{constructor(e,t,r){super(e,t,ji(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new de(this.firestore,null,new O(e))}withConverter(e){return new Lw(this.firestore,e,this._path)}};function Qs(n,e,...t){if(n=G(n),Oh("collection","path",e),n instanceof Ho){const r=X.fromString(e,...t);return Hp(r),new kn(n,null,r)}{if(!(n instanceof de||n instanceof kn))throw new D(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(e,...t));return Hp(r),new kn(n.firestore,null,r)}}function ID(n,e){if(n=re(n,Ho),Oh("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new D(R.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new at(n,null,(function(r){return new on(X.emptyPath(),r)})(e))}function Ni(n,e,...t){if(n=G(n),arguments.length===1&&(e=Nh.newId()),Oh("doc","path",e),n instanceof Ho){const r=X.fromString(e,...t);return Wp(r),new de(n,null,new O(r))}{if(!(n instanceof de||n instanceof kn))throw new D(R.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(e,...t));return Wp(r),new de(n.firestore,n instanceof kn?n.converter:null,new O(r))}}function Fw(n,e){return n=G(n),e=G(e),(n instanceof de||n instanceof kn)&&(e instanceof de||e instanceof kn)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function Uw(n,e){return n=G(n),e=G(e),n instanceof at&&e instanceof at&&n.firestore===e.firestore&&Bo(n._query,e._query)&&n.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const og="AsyncQueue";class ag{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new ld(this,"async_queue_retry"),this._c=()=>{const r=Fa();r&&x(og,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=Fa();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Fa();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new He;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Wn(e))throw e;x(og,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,Ce("INTERNAL UNHANDLED ERROR: ",cg(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const i=pd.createAndSchedule(this,e,t,r,(s=>this.hc(s)));return this.tc.push(i),i}uc(){this.nc&&F(47125,{Pc:cg(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function cg(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wD{constructor(){this._progressObserver={},this._taskCompletionResolver=new He,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vD=-1;let De=class extends Ho{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new ag,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ag(e),this._firestoreClient=void 0,await e}}};function ED(n,e){const t=dh(),r=rc,i=Ro(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=cT("firestore");s&&Ow(i,...s)}return i}function et(n){if(n._terminated)throw new D(R.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Bw(n),n._firestoreClient}function Bw(n){const e=n._freezeSettings(),t=yD(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new sD(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(i){const s=i?._online.build();return{_offline:i?._offline.build(s),_online:s}})(n._componentsProvider))}function TD(n,e){Ot("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return $w(n,wo.provider,{build:r=>new Pw(r,t.cacheSizeBytes,e?.forceOwnership)}),Promise.resolve()}async function AD(n){Ot("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();$w(n,wo.provider,{build:t=>new tD(t,e.cacheSizeBytes)})}function $w(n,e,t){if((n=re(n,De))._firestoreClient||n._terminated)throw new D(R.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new D(R.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},Bw(n)}function bD(n){if(n._initialized&&!n._terminated)throw new D(R.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new He;return n._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(r){if(!zt.v())return Promise.resolve();const i=r+ew;await zt.delete(i)})(od(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}function SD(n){return(function(t){const r=new He;return t.asyncQueue.enqueueAndForget((async()=>qk(await Sd(t),r))),r.promise})(et(n=re(n,De)))}function RD(n){return aD(et(n=re(n,De)))}function PD(n){return cD(et(n=re(n,De)))}function CD(n,e){const t=et(n=re(n,De)),r=new wD;return mD(t,n._databaseId,e,r),r}function kD(n,e){return gD(et(n=re(n,De)),e).then((t=>t?new at(n,null,t.query):null))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Xe(be.fromBase64String(e))}catch(t){throw new D(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Xe(be.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Xe._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Mo(e,Xe._jsonSchema))return Xe.fromBase64String(e.bytes)}}Xe._jsonSchemaVersion="firestore/bytes/1.0",Xe._jsonSchema={type:Ne("string",Xe._jsonSchemaVersion),bytes:Ne("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Dr=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ie(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mr=class{constructor(e){this._methodName=e}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return H(this._lat,e._lat)||H(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Dt._jsonSchemaVersion}}static fromJSON(e){if(Mo(e,Dt._jsonSchema))return new Dt(e.latitude,e.longitude)}}Dt._jsonSchemaVersion="firestore/geoPoint/1.0",Dt._jsonSchema={type:Ne("string",Dt._jsonSchemaVersion),latitude:Ne("number"),longitude:Ne("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Vt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Mo(e,Vt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Vt(e.vectorValues);throw new D(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Vt._jsonSchemaVersion="firestore/vectorValue/1.0",Vt._jsonSchema={type:Ne("string",Vt._jsonSchemaVersion),vectorValues:Ne("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DD=/^__.*__$/;class VD{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new cn(e,this.data,this.fieldMask,t,this.fieldTransforms):new zi(e,this.data,t,this.fieldTransforms)}}class qw{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new cn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function jw(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F(40011,{dataSource:n})}}class Jc{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new Jc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){const t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return mc(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(jw(this.dataSource)&&DD.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class xD{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Go(e)}createContext(e,t,r,i=!1){return new Jc({dataSource:e,methodName:t,targetDoc:r,path:Ie.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Lr(n){const e=n._freezeSettings(),t=Go(n._databaseId);return new xD(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Yc(n,e,t,r,i,s={}){const o=n.createContext(s.merge||s.mergeFields?2:0,e,t,i);xd("Data must be an object, but it was:",o,r);const c=Ww(r,o);let u,l;if(s.merge)u=new lt(o.fieldMask),l=o.fieldTransforms;else if(s.mergeFields){const d=[];for(const p of s.mergeFields){const m=Vr(e,p,t);if(!o.contains(m))throw new D(R.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);Qw(d,m)||d.push(m)}u=new lt(d),l=o.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,l=o.fieldTransforms;return new VD(new We(c),u,l)}class Ko extends Mr{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ko}}function zw(n,e,t){return new Jc({dataSource:3,targetDoc:e.settings.targetDoc,methodName:n._methodName,arrayElement:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Rd extends Mr{_toFieldTransform(e){return new qo(e.path,new bi)}isEqual(e){return e instanceof Rd}}class Pd extends Mr{constructor(e,t){super(e),this.Ac=t}_toFieldTransform(e){const t=zw(this,e,!0),r=this.Ac.map((s=>Fr(s,t))),i=new br(r);return new qo(e.path,i)}isEqual(e){return e instanceof Pd&&Xt(this.Ac,e.Ac)}}class Cd extends Mr{constructor(e,t){super(e),this.Ac=t}_toFieldTransform(e){const t=zw(this,e,!0),r=this.Ac.map((s=>Fr(s,t))),i=new Sr(r);return new qo(e.path,i)}isEqual(e){return e instanceof Cd&&Xt(this.Ac,e.Ac)}}class kd extends Mr{constructor(e,t){super(e),this.Vc=t}_toFieldTransform(e){const t=new Si(e.serializer,gI(e.serializer,this.Vc));return new qo(e.path,t)}isEqual(e){return e instanceof kd&&this.Vc===e.Vc}}function Dd(n,e,t,r){const i=n.createContext(1,e,t);xd("Data must be an object, but it was:",i,r);const s=[],o=We.empty();Hn(r,((u,l)=>{const d=Kw(e,u,t);l=G(l);const p=i.childContextForFieldPath(d);if(l instanceof Ko)s.push(d);else{const m=Fr(l,p);m!=null&&(s.push(d),o.set(d,m))}}));const c=new lt(s);return new qw(o,c,i.fieldTransforms)}function Vd(n,e,t,r,i,s){const o=n.createContext(1,e,t),c=[Vr(e,r,t)],u=[i];if(s.length%2!=0)throw new D(R.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<s.length;m+=2)c.push(Vr(e,s[m])),u.push(s[m+1]);const l=[],d=We.empty();for(let m=c.length-1;m>=0;--m)if(!Qw(l,c[m])){const w=c[m];let C=u[m];C=G(C);const k=o.childContextForFieldPath(w);if(C instanceof Ko)l.push(w);else{const V=Fr(C,k);V!=null&&(l.push(w),d.set(w,V))}}const p=new lt(l);return new qw(d,p,o.fieldTransforms)}function Gw(n,e,t,r=!1){return Fr(t,n.createContext(r?4:3,e))}function Fr(n,e){if(Hw(n=G(n)))return xd("Unsupported field value:",e,n),Ww(n,e);if(n instanceof Mr)return(function(r,i){if(!jw(i.dataSource))throw i.createError(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(r,i){const s=[];let o=0;for(const c of r){let u=Fr(c,i.childContextForArray(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}})(n,e)}return(function(r,i){if((r=G(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return gI(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=se.fromDate(r);return{timestampValue:Ri(i.serializer,s)}}if(r instanceof se){const s=new se(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ri(i.serializer,s)}}if(r instanceof Dt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Xe)return{bytesValue:PI(i.serializer,r._byteString)};if(r instanceof de){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.createError(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Zh(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Vt)return(function(o,c){const u=o instanceof Vt?o.toArray():o;return{mapValue:{fields:{[qh]:{stringValue:jh},[Ei]:{arrayValue:{values:u.map((d=>{if(typeof d!="number")throw c.createError("VectorValues must only contain numeric values.");return Hh(c.serializer,d)}))}}}}}})(r,i);if(BI(r))return r._toProto(i.serializer);throw i.createError(`Unsupported field value: ${xc(r)}`)})(n,e)}function Ww(n,e){const t={};return Gy(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Hn(n,((r,i)=>{const s=Fr(i,e.childContextForField(r));s!=null&&(t[r]=s)})),{mapValue:{fields:t}}}function Hw(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof se||n instanceof Dt||n instanceof Xe||n instanceof de||n instanceof Mr||n instanceof Vt||BI(n))}function xd(n,e,t){if(!Hw(t)||!Ry(t)){const r=xc(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function Vr(n,e,t){if((e=G(e))instanceof Dr)return e._internalPath;if(typeof e=="string")return Kw(n,e);throw mc("Field path arguments must be of type string or ",n,!1,void 0,t)}const ND=new RegExp("[~\\*/\\[\\]]");function Kw(n,e,t){if(e.search(ND)>=0)throw mc(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Dr(...e.split("."))._internalPath}catch{throw mc(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function mc(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new D(R.INVALID_ARGUMENT,c+n+u)}function Qw(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd{convertValue(e,t="none"){switch(Fn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ge(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(nn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw F(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Hn(e,((i,s)=>{r[i]=this.convertValue(s,t)})),r}convertVectorValue(e){const t=e.fields?.[Ei].arrayValue?.values?.map((r=>ge(r.doubleValue)));return new Vt(t)}convertGeoPoint(e){return new Dt(ge(e.latitude),ge(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Uc(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(fo(e));default:return null}}convertTimestamp(e){const t=tn(e);return new se(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=X.fromString(e);q(UI(r),9688,{name:e});const i=new Ln(r.get(1),r.get(3)),s=new O(r.popFirst(5));return i.isEqual(t)||Ce(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur extends Nd{constructor(e){super(),this.firestore=e}convertBytes(e){return new Xe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new de(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OD(){return new Ko("deleteField")}function Jw(){return new Rd("serverTimestamp")}function MD(...n){return new Pd("arrayUnion",n)}function LD(...n){return new Cd("arrayRemove",n)}function FD(n){return new kd("increment",n)}const ug="@firebase/firestore",lg="4.12.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hl(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new de(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new UD(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(Vr("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class UD extends vo{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yw(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new D(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Od{}class Qo extends Od{}function At(n,e,...t){let r=[];e instanceof Od&&r.push(e),r=r.concat(t),(function(s){const o=s.filter((u=>u instanceof Md)).length,c=s.filter((u=>u instanceof Xc)).length;if(o>1||o>0&&c>0)throw new D(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const i of r)n=i._apply(n);return n}class Xc extends Qo{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Xc(e,t,r)}_apply(e){const t=this._parse(e);return ev(e._query,t),new at(e.firestore,e.converter,Nl(e._query,t))}_parse(e){const t=Lr(e.firestore);return(function(s,o,c,u,l,d,p){let m;if(l.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new D(R.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){dg(p,d);const C=[];for(const k of p)C.push(hg(u,s,k));m={arrayValue:{values:C}}}else m=hg(u,s,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||dg(p,d),m=Gw(c,o,p,d==="in"||d==="not-in");return Z.create(l,d,m)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Ua(n,e,t){const r=e,i=Vr("where",n);return Xc._create(i,r,t)}class Md extends Od{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Md(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:ae.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(i,s){let o=i;const c=s.getFlattenedFilters();for(const u of c)ev(o,u),o=Nl(o,u)})(e._query,t),new at(e.firestore,e.converter,Nl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ld extends Qo{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ld(e,t)}_apply(e){const t=(function(i,s,o){if(i.startAt!==null)throw new D(R.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new D(R.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new go(s,o)})(e._query,this._field,this._direction);return new at(e.firestore,e.converter,WC(e._query,t))}}function Xw(n,e="asc"){const t=e,r=Vr("orderBy",n);return Ld._create(r,t)}class Zc extends Qo{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Zc(e,t,r)}_apply(e){return new at(e.firestore,e.converter,oc(e._query,this._limit,this._limitType))}}function BD(n){return Py("limit",n),Zc._create("limit",n,"F")}function $D(n){return Py("limitToLast",n),Zc._create("limitToLast",n,"L")}class eu extends Qo{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new eu(e,t,r)}_apply(e){const t=Zw(e,this.type,this._docOrFields,this._inclusive);return new at(e.firestore,e.converter,HC(e._query,t))}}function qD(...n){return eu._create("startAt",n,!0)}function jD(...n){return eu._create("startAfter",n,!1)}class tu extends Qo{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new tu(e,t,r)}_apply(e){const t=Zw(e,this.type,this._docOrFields,this._inclusive);return new at(e.firestore,e.converter,KC(e._query,t))}}function zD(...n){return tu._create("endBefore",n,!1)}function GD(...n){return tu._create("endAt",n,!0)}function Zw(n,e,t,r){if(t[0]=G(t[0]),t[0]instanceof vo)return(function(s,o,c,u,l){if(!u)throw new D(R.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${c}().`);const d=[];for(const p of ci(s))if(p.field.isKeyField())d.push(Tr(o,u.key));else{const m=u.data.field(p.field);if(Fc(m))throw new D(R.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(m===null){const w=p.field.canonicalString();throw new D(R.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${w}' (used as the orderBy) does not exist.`)}d.push(m)}return new Bn(d,l)})(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=Lr(n.firestore);return(function(o,c,u,l,d,p){const m=o.explicitOrderBy;if(d.length>m.length)throw new D(R.INVALID_ARGUMENT,`Too many arguments provided to ${l}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const w=[];for(let C=0;C<d.length;C++){const k=d[C];if(m[C].field.isKeyField()){if(typeof k!="string")throw new D(R.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${l}(), but got a ${typeof k}`);if(!Gh(o)&&k.indexOf("/")!==-1)throw new D(R.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${l}() must be a plain document ID, but '${k}' contains a slash.`);const V=o.path.child(X.fromString(k));if(!O.isDocumentKey(V))throw new D(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${l}() must result in a valid document path, but '${V}' is not because it contains an odd number of segments.`);const j=new O(V);w.push(Tr(c,j))}else{const V=Gw(u,l,k);w.push(V)}}return new Bn(w,p)})(n._query,n.firestore._databaseId,i,e,t,r)}}function hg(n,e,t){if(typeof(t=G(t))=="string"){if(t==="")throw new D(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Gh(e)&&t.indexOf("/")!==-1)throw new D(R.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(X.fromString(t));if(!O.isDocumentKey(r))throw new D(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Tr(n,new O(r))}if(t instanceof de)return Tr(n,t._key);throw new D(R.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${xc(t)}.`)}function dg(n,e){if(!Array.isArray(n)||n.length===0)throw new D(R.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function ev(n,e){const t=(function(i,s){for(const o of i)for(const c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new D(R.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(R.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function nu(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class WD extends Nd{constructor(e){super(),this.firestore=e}convertBytes(e){return new Xe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new de(this.firestore,null,t)}}class fr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}let wt=class tv extends vo{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Js(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Vr("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=tv._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}};wt._jsonSchemaVersion="firestore/documentSnapshot/1.0",wt._jsonSchema={type:Ne("string",wt._jsonSchemaVersion),bundleSource:Ne("string","DocumentSnapshot"),bundleName:Ne("string"),bundle:Ne("string")};let Js=class extends wt{data(e={}){return super.data(e)}},xt=class nv{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new fr(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new Js(this._firestore,this._userDataWriter,r.key,r,new fr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map((c=>{const u=new Js(i._firestore,i._userDataWriter,c.doc.key,c.doc,new fr(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}}))}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((c=>s||c.type!==3)).map((c=>{const u=new Js(i._firestore,i._userDataWriter,c.doc.key,c.doc,new fr(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let l=-1,d=-1;return c.type!==0&&(l=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),d=o.indexOf(c.doc.key)),{type:HD(c.type),doc:u,oldIndex:l,newIndex:d}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=nv._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Nh.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],i=[];return this.docs.forEach((s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function HD(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F(61501,{type:n})}}function rv(n,e){return n instanceof wt&&e instanceof wt?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof xt&&e instanceof xt&&n._firestore===e._firestore&&Uw(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */xt._jsonSchemaVersion="firestore/querySnapshot/1.0",xt._jsonSchema={type:Ne("string",xt._jsonSchemaVersion),bundleSource:Ne("string","QuerySnapshot"),bundleName:Ne("string"),bundle:Ne("string")};const KD={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let QD=class{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Lr(e)}set(e,t,r){this._verifyNotCommitted();const i=An(e,this._firestore),s=nu(i.converter,t,r),o=Yc(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,we.none())),this}update(e,t,r,...i){this._verifyNotCommitted();const s=An(e,this._firestore);let o;return o=typeof(t=G(t))=="string"||t instanceof Dr?Vd(this._dataReader,"WriteBatch.update",s._key,t,r,i):Dd(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,we.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=An(e,this._firestore);return this._mutations=this._mutations.concat(new Gi(t._key,we.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(R.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}};function An(n,e){if((n=G(n)).firestore!==e)throw new D(R.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JD{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Lr(e)}get(e){const t=An(e,this._firestore),r=new WD(this._firestore);return this._transaction.lookup([t._key]).then((i=>{if(!i||i.length!==1)return F(24041);const s=i[0];if(s.isFoundDocument())return new vo(this._firestore,r,s.key,s,t.converter);if(s.isNoDocument())return new vo(this._firestore,r,t._key,null,t.converter);throw F(18433,{doc:s})}))}set(e,t,r){const i=An(e,this._firestore),s=nu(i.converter,t,r),o=Yc(this._dataReader,"Transaction.set",i._key,s,i.converter!==null,r);return this._transaction.set(i._key,o),this}update(e,t,r,...i){const s=An(e,this._firestore);let o;return o=typeof(t=G(t))=="string"||t instanceof Dr?Vd(this._dataReader,"Transaction.update",s._key,t,r,i):Dd(this._dataReader,"Transaction.update",s._key,t),this._transaction.update(s._key,o),this}delete(e){const t=An(e,this._firestore);return this._transaction.delete(t._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let YD=class extends JD{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=An(e,this._firestore),r=new Ur(this._firestore);return super.get(e).then((i=>new wt(this._firestore,r,t._key,i._document,new fr(!1,!1),t.converter)))}};function XD(n,e,t){n=re(n,De);const r={...KD,...t};(function(o){if(o.maxAttempts<1)throw new D(R.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);const i=et(n);return pD(i,(s=>e(new YD(n,s))),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZD(n){n=re(n,de);const e=re(n.firestore,De),t=et(e);return Dw(t,n._key).then((r=>Fd(e,n,r)))}function eV(n){n=re(n,de);const e=re(n.firestore,De),t=et(e),r=new Ur(e);return lD(t,n._key).then((i=>new wt(e,r,n._key,i,new fr(i!==null&&i.hasLocalMutations,!0),n.converter)))}function tV(n){n=re(n,de);const e=re(n.firestore,De),t=et(e);return Dw(t,n._key,{source:"server"}).then((r=>Fd(e,n,r)))}function Ba(n){n=re(n,at);const e=re(n.firestore,De),t=et(e),r=new Ur(e);return Yw(n._query),Vw(t,n._query).then((i=>new xt(e,r,n,i)))}function nV(n){n=re(n,at);const e=re(n.firestore,De),t=et(e),r=new Ur(e);return hD(t,n._query).then((i=>new xt(e,r,n,i)))}function rV(n){n=re(n,at);const e=re(n.firestore,De),t=et(e),r=new Ur(e);return Vw(t,n._query,{source:"server"}).then((i=>new xt(e,r,n,i)))}function Kl(n,e,t){n=re(n,de);const r=re(n.firestore,De),i=nu(n.converter,e,t),s=Lr(r);return Jo(r,[Yc(s,"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,we.none())])}function fg(n,e,t,...r){n=re(n,de);const i=re(n.firestore,De),s=Lr(i);let o;return o=typeof(e=G(e))=="string"||e instanceof Dr?Vd(s,"updateDoc",n._key,e,t,r):Dd(s,"updateDoc",n._key,e),Jo(i,[o.toMutation(n._key,we.exists(!0))])}function iv(n){return Jo(re(n.firestore,De),[new Gi(n._key,we.none())])}function iV(n,e){const t=re(n.firestore,De),r=Ni(n),i=nu(n.converter,e),s=Lr(n.firestore);return Jo(t,[Yc(s,"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,we.exists(!1))]).then((()=>r))}function sv(n,...e){n=G(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Hl(e[r])||(t=e[r++]);const i={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Hl(e[r])){const l=e[r];e[r]=l.next?.bind(l),e[r+1]=l.error?.bind(l),e[r+2]=l.complete?.bind(l)}let s,o,c;if(n instanceof de)o=re(n.firestore,De),c=ji(n._key.path),s={next:l=>{e[r]&&e[r](Fd(o,n,l))},error:e[r+1],complete:e[r+2]};else{const l=re(n,at);o=re(l.firestore,De),c=l._query;const d=new Ur(o);s={next:p=>{e[r]&&e[r](new xt(o,d,l,p))},error:e[r+1],complete:e[r+2]},Yw(n._query)}const u=et(o);return uD(u,c,i,s)}function sV(n,e){n=re(n,De);const t=et(n),r=Hl(e)?e:{next:e};return fD(t,r)}function Jo(n,e){const t=et(n);return dD(t,e)}function Fd(n,e,t){const r=t.docs.get(e._key),i=new Ur(n);return new wt(n,i,e._key,r,new fr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){$P(jn),Nn(new Wt("firestore",((r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),c=new De(new WP(r.getProvider("auth-internal")),new QP(o,r.getProvider("app-check-internal")),xC(o,i),o);return s={useFetchStreams:t,...s},c._setSettings(s),c}),"PUBLIC").setMultipleInstances(!0)),kt(ug,lg,e),kt(ug,lg,"esm2020")})();const oV="@firebase/firestore-compat",aV="0.4.6";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ud(n,e){if(e===void 0)return{merge:!1};if(e.mergeFields!==void 0&&e.merge!==void 0)throw new D("invalid-argument",`Invalid options passed to function ${n}(): You cannot specify both "merge" and "mergeFields".`);return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pg(){if(typeof Uint8Array>"u")throw new D("unimplemented","Uint8Arrays are not available in this environment.")}function mg(){if(!kC())throw new D("unimplemented","Blobs are unavailable in Firestore in this environment.")}class Eo{constructor(e){this._delegate=e}static fromBase64String(e){return mg(),new Eo(Xe.fromBase64String(e))}static fromUint8Array(e){return pg(),new Eo(Xe.fromUint8Array(e))}toBase64(){return mg(),this._delegate.toBase64()}toUint8Array(){return pg(),this._delegate.toUint8Array()}isEqual(e){return this._delegate.isEqual(e._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ql(n){return cV(n,["next","error","complete"])}function cV(n,e){if(typeof n!="object"||n===null)return!1;const t=n;for(const r of e)if(r in t&&typeof t[r]=="function")return!0;return!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uV{enableIndexedDbPersistence(e,t){return TD(e._delegate,{forceOwnership:t})}enableMultiTabIndexedDbPersistence(e){return AD(e._delegate)}clearIndexedDbPersistence(e){return bD(e._delegate)}}class ov{constructor(e,t,r){this._delegate=t,this._persistenceProvider=r,this.INTERNAL={delete:()=>this.terminate()},e instanceof Ln||(this._appCompat=e)}get _databaseId(){return this._delegate._databaseId}settings(e){const t=this._delegate._getSettings();!e.merge&&t.host!==e.host&&Ot("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."),e.merge&&(e={...t,...e},delete e.merge),this._delegate._setSettings(e)}useEmulator(e,t,r={}){Ow(this._delegate,e,t,r)}enableNetwork(){return RD(this._delegate)}disableNetwork(){return PD(this._delegate)}enablePersistence(e){let t=!1,r=!1;return e&&(t=!!e.synchronizeTabs,r=!!e.experimentalForceOwningTab,Sy("synchronizeTabs",t,"experimentalForceOwningTab",r)),t?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,r)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore-compat"),this._appCompat._removeServiceInstance("firestore")),this._delegate._delete()}waitForPendingWrites(){return SD(this._delegate)}onSnapshotsInSync(e){return sV(this._delegate,e)}get app(){if(!this._appCompat)throw new D("failed-precondition","Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(e){try{return new Oi(this,Qs(this._delegate,e))}catch(t){throw it(t,"collection()","Firestore.collection()")}}doc(e){try{return new It(this,Ni(this._delegate,e))}catch(t){throw it(t,"doc()","Firestore.doc()")}}collectionGroup(e){try{return new rt(this,ID(this._delegate,e))}catch(t){throw it(t,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(e){return XD(this._delegate,t=>e(new av(this,t)))}batch(){return et(this._delegate),new cv(new QD(this._delegate,e=>Jo(this._delegate,e)))}loadBundle(e){return CD(this._delegate,e)}namedQuery(e){return kD(this._delegate,e).then(t=>t?new rt(this,t):null)}}class ru extends Nd{constructor(e){super(),this.firestore=e}convertBytes(e){return new Eo(new Xe(e))}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return It.forKey(t,this.firestore,null)}}function lV(n){qP(n)}class av{constructor(e,t){this._firestore=e,this._delegate=t,this._userDataWriter=new ru(e)}get(e){const t=pr(e);return this._delegate.get(t).then(r=>new To(this._firestore,new wt(this._firestore._delegate,this._userDataWriter,r._key,r._document,r.metadata,t.converter)))}set(e,t,r){const i=pr(e);return r?(Ud("Transaction.set",r),this._delegate.set(i,t,r)):this._delegate.set(i,t),this}update(e,t,r,...i){const s=pr(e);return arguments.length===2?this._delegate.update(s,t):this._delegate.update(s,t,r,...i),this}delete(e){const t=pr(e);return this._delegate.delete(t),this}}class cv{constructor(e){this._delegate=e}set(e,t,r){const i=pr(e);return r?(Ud("WriteBatch.set",r),this._delegate.set(i,t,r)):this._delegate.set(i,t),this}update(e,t,r,...i){const s=pr(e);return arguments.length===2?this._delegate.update(s,t):this._delegate.update(s,t,r,...i),this}delete(e){const t=pr(e);return this._delegate.delete(t),this}commit(){return this._delegate.commit()}}class xr{constructor(e,t,r){this._firestore=e,this._userDataWriter=t,this._delegate=r}fromFirestore(e,t){const r=new Js(this._firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,null);return this._delegate.fromFirestore(new Ao(this._firestore,r),t??{})}toFirestore(e,t){return t?this._delegate.toFirestore(e,t):this._delegate.toFirestore(e)}static getInstance(e,t){const r=xr.INSTANCES;let i=r.get(e);i||(i=new WeakMap,r.set(e,i));let s=i.get(t);return s||(s=new xr(e,new ru(e),t),i.set(t,s)),s}}xr.INSTANCES=new WeakMap;class It{constructor(e,t){this.firestore=e,this._delegate=t,this._userDataWriter=new ru(e)}static forPath(e,t,r){if(e.length%2!==0)throw new D("invalid-argument",`Invalid document reference. Document references must have an even number of segments, but ${e.canonicalString()} has ${e.length}`);return new It(t,new de(t._delegate,r,new O(e)))}static forKey(e,t,r){return new It(t,new de(t._delegate,r,e))}get id(){return this._delegate.id}get parent(){return new Oi(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(e){try{return new Oi(this.firestore,Qs(this._delegate,e))}catch(t){throw it(t,"collection()","DocumentReference.collection()")}}isEqual(e){return e=G(e),e instanceof de?Fw(this._delegate,e):!1}set(e,t){t=Ud("DocumentReference.set",t);try{return t?Kl(this._delegate,e,t):Kl(this._delegate,e)}catch(r){throw it(r,"setDoc()","DocumentReference.set()")}}update(e,t,...r){try{return arguments.length===1?fg(this._delegate,e):fg(this._delegate,e,t,...r)}catch(i){throw it(i,"updateDoc()","DocumentReference.update()")}}delete(){return iv(this._delegate)}onSnapshot(...e){const t=uv(e),r=lv(e,i=>new To(this.firestore,new wt(this.firestore._delegate,this._userDataWriter,i._key,i._document,i.metadata,this._delegate.converter)));return sv(this._delegate,t,r)}get(e){let t;return e?.source==="cache"?t=eV(this._delegate):e?.source==="server"?t=tV(this._delegate):t=ZD(this._delegate),t.then(r=>new To(this.firestore,new wt(this.firestore._delegate,this._userDataWriter,r._key,r._document,r.metadata,this._delegate.converter)))}withConverter(e){return new It(this.firestore,e?this._delegate.withConverter(xr.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function it(n,e,t){return n.message=n.message.replace(e,t),n}function uv(n){for(const e of n)if(typeof e=="object"&&!Ql(e))return e;return{}}function lv(n,e){let t;return Ql(n[0])?t=n[0]:Ql(n[1])?t=n[1]:typeof n[0]=="function"?t={next:n[0],error:n[1],complete:n[2]}:t={next:n[1],error:n[2],complete:n[3]},{next:r=>{t.next&&t.next(e(r))},error:t.error?.bind(t),complete:t.complete?.bind(t)}}class To{constructor(e,t){this._firestore=e,this._delegate=t}get ref(){return new It(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(e){return this._delegate.data(e)}get(e,t){return this._delegate.get(e,t)}isEqual(e){return rv(this._delegate,e._delegate)}}class Ao extends To{data(e){const t=this._delegate.data(e);return this._delegate._converter||jP(t!==void 0,"Document in a QueryDocumentSnapshot should exist"),t}}class rt{constructor(e,t){this.firestore=e,this._delegate=t,this._userDataWriter=new ru(e)}where(e,t,r){try{return new rt(this.firestore,At(this._delegate,Ua(e,t,r)))}catch(i){throw it(i,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(e,t){try{return new rt(this.firestore,At(this._delegate,Xw(e,t)))}catch(r){throw it(r,/(orderBy|where)\(\)/,"Query.$1()")}}limit(e){try{return new rt(this.firestore,At(this._delegate,BD(e)))}catch(t){throw it(t,"limit()","Query.limit()")}}limitToLast(e){try{return new rt(this.firestore,At(this._delegate,$D(e)))}catch(t){throw it(t,"limitToLast()","Query.limitToLast()")}}startAt(...e){try{return new rt(this.firestore,At(this._delegate,qD(...e)))}catch(t){throw it(t,"startAt()","Query.startAt()")}}startAfter(...e){try{return new rt(this.firestore,At(this._delegate,jD(...e)))}catch(t){throw it(t,"startAfter()","Query.startAfter()")}}endBefore(...e){try{return new rt(this.firestore,At(this._delegate,zD(...e)))}catch(t){throw it(t,"endBefore()","Query.endBefore()")}}endAt(...e){try{return new rt(this.firestore,At(this._delegate,GD(...e)))}catch(t){throw it(t,"endAt()","Query.endAt()")}}isEqual(e){return Uw(this._delegate,e._delegate)}get(e){let t;return e?.source==="cache"?t=nV(this._delegate):e?.source==="server"?t=rV(this._delegate):t=Ba(this._delegate),t.then(r=>new Jl(this.firestore,new xt(this.firestore._delegate,this._userDataWriter,this._delegate,r._snapshot)))}onSnapshot(...e){const t=uv(e),r=lv(e,i=>new Jl(this.firestore,new xt(this.firestore._delegate,this._userDataWriter,this._delegate,i._snapshot)));return sv(this._delegate,t,r)}withConverter(e){return new rt(this.firestore,e?this._delegate.withConverter(xr.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}class hV{constructor(e,t){this._firestore=e,this._delegate=t}get type(){return this._delegate.type}get doc(){return new Ao(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class Jl{constructor(e,t){this._firestore=e,this._delegate=t}get query(){return new rt(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map(e=>new Ao(this._firestore,e))}docChanges(e){return this._delegate.docChanges(e).map(t=>new hV(this._firestore,t))}forEach(e,t){this._delegate.forEach(r=>{e.call(t,new Ao(this._firestore,r))})}isEqual(e){return rv(this._delegate,e._delegate)}}class Oi extends rt{constructor(e,t){super(e,t),this.firestore=e,this._delegate=t}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){const e=this._delegate.parent;return e?new It(this.firestore,e):null}doc(e){try{return e===void 0?new It(this.firestore,Ni(this._delegate)):new It(this.firestore,Ni(this._delegate,e))}catch(t){throw it(t,"doc()","CollectionReference.doc()")}}add(e){return iV(this._delegate,e).then(t=>new It(this.firestore,t))}isEqual(e){return Fw(this._delegate,e._delegate)}withConverter(e){return new Oi(this.firestore,e?this._delegate.withConverter(xr.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function pr(n){return re(n,de)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{constructor(...e){this._delegate=new Dr(...e)}static documentId(){return new Bd(Ie.keyField().canonicalString())}isEqual(e){return e=G(e),e instanceof Dr?this._delegate._internalPath.isEqual(e._internalPath):!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{static serverTimestamp(){const e=Jw();return e._methodName="FieldValue.serverTimestamp",new lr(e)}static delete(){const e=OD();return e._methodName="FieldValue.delete",new lr(e)}static arrayUnion(...e){const t=MD(...e);return t._methodName="FieldValue.arrayUnion",new lr(t)}static arrayRemove(...e){const t=LD(...e);return t._methodName="FieldValue.arrayRemove",new lr(t)}static increment(e){const t=FD(e);return t._methodName="FieldValue.increment",new lr(t)}constructor(e){this._delegate=e}isEqual(e){return this._delegate.isEqual(e._delegate)}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dV={Firestore:ov,GeoPoint:Dt,Timestamp:se,Blob:Eo,Transaction:av,WriteBatch:cv,DocumentReference:It,DocumentSnapshot:To,Query:rt,QueryDocumentSnapshot:Ao,QuerySnapshot:Jl,CollectionReference:Oi,FieldPath:Bd,FieldValue:lr,setLogLevel:lV,CACHE_SIZE_UNLIMITED:vD};function fV(n,e){n.INTERNAL.registerComponent(new Wt("firestore-compat",t=>{const r=t.getProvider("app-compat").getImmediate(),i=t.getProvider("firestore").getImmediate();return e(r,i)},"PUBLIC").setServiceProps({...dV}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pV(n){fV(n,(e,t)=>new ov(e,t,new uV)),n.registerVersion(oV,aV)}pV(vr);vr.apps.length||vr.initializeApp(ZE);let mV,Tt=qR(mV),As=ED(),Yl,Xl;async function gV(){wn(Tt.currentUser)}function wn(n){Yl=n,n==null?Xl=void 0:Xl=Yl.uid}function _V(){return Yl}function Ia(){return Xl}async function yV(){await Tt.setPersistence(xo).then(n=>{gV()})}yV();const IV=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function wV(n){return typeof n=="string"&&IV.test(n)}const ze=[];for(let n=0;n<256;++n)ze.push((n+256).toString(16).slice(1));function vV(n,e=0){return(ze[n[e+0]]+ze[n[e+1]]+ze[n[e+2]]+ze[n[e+3]]+"-"+ze[n[e+4]]+ze[n[e+5]]+"-"+ze[n[e+6]]+ze[n[e+7]]+"-"+ze[n[e+8]]+ze[n[e+9]]+"-"+ze[n[e+10]]+ze[n[e+11]]+ze[n[e+12]]+ze[n[e+13]]+ze[n[e+14]]+ze[n[e+15]]).toLowerCase()}function EV(n){if(!wV(n))throw TypeError("Invalid UUID");let e;const t=new Uint8Array(16);return t[0]=(e=parseInt(n.slice(0,8),16))>>>24,t[1]=e>>>16&255,t[2]=e>>>8&255,t[3]=e&255,t[4]=(e=parseInt(n.slice(9,13),16))>>>8,t[5]=e&255,t[6]=(e=parseInt(n.slice(14,18),16))>>>8,t[7]=e&255,t[8]=(e=parseInt(n.slice(19,23),16))>>>8,t[9]=e&255,t[10]=(e=parseInt(n.slice(24,36),16))/1099511627776&255,t[11]=e/4294967296&255,t[12]=e>>>24&255,t[13]=e>>>16&255,t[14]=e>>>8&255,t[15]=e&255,t}function TV(n){n=unescape(encodeURIComponent(n));const e=[];for(let t=0;t<n.length;++t)e.push(n.charCodeAt(t));return e}const AV="6ba7b810-9dad-11d1-80b4-00c04fd430c8",bV="6ba7b811-9dad-11d1-80b4-00c04fd430c8";function SV(n,e,t){function r(i,s,o,c){var u;if(typeof i=="string"&&(i=TV(i)),typeof s=="string"&&(s=EV(s)),((u=s)===null||u===void 0?void 0:u.length)!==16)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let l=new Uint8Array(16+i.length);if(l.set(s),l.set(i,s.length),l=t(l),l[6]=l[6]&15|e,l[8]=l[8]&63|128,o){c=c||0;for(let d=0;d<16;++d)o[c+d]=l[d];return o}return vV(l)}try{r.name=n}catch{}return r.DNS=AV,r.URL=bV,r}function RV(n,e,t,r){switch(n){case 0:return e&t^~e&r;case 1:return e^t^r;case 2:return e&t^e&r^t&r;case 3:return e^t^r}}function nl(n,e){return n<<e|n>>>32-e}function PV(n){const e=[1518500249,1859775393,2400959708,3395469782],t=[1732584193,4023233417,2562383102,271733878,3285377520];if(typeof n=="string"){const o=unescape(encodeURIComponent(n));n=[];for(let c=0;c<o.length;++c)n.push(o.charCodeAt(c))}else Array.isArray(n)||(n=Array.prototype.slice.call(n));n.push(128);const r=n.length/4+2,i=Math.ceil(r/16),s=new Array(i);for(let o=0;o<i;++o){const c=new Uint32Array(16);for(let u=0;u<16;++u)c[u]=n[o*64+u*4]<<24|n[o*64+u*4+1]<<16|n[o*64+u*4+2]<<8|n[o*64+u*4+3];s[o]=c}s[i-1][14]=(n.length-1)*8/Math.pow(2,32),s[i-1][14]=Math.floor(s[i-1][14]),s[i-1][15]=(n.length-1)*8&4294967295;for(let o=0;o<i;++o){const c=new Uint32Array(80);for(let w=0;w<16;++w)c[w]=s[o][w];for(let w=16;w<80;++w)c[w]=nl(c[w-3]^c[w-8]^c[w-14]^c[w-16],1);let u=t[0],l=t[1],d=t[2],p=t[3],m=t[4];for(let w=0;w<80;++w){const C=Math.floor(w/20),k=nl(u,5)+RV(C,l,d,p)+m+e[C]+c[w]>>>0;m=p,p=d,d=nl(l,30)>>>0,l=u,u=k}t[0]=t[0]+u>>>0,t[1]=t[1]+l>>>0,t[2]=t[2]+d>>>0,t[3]=t[3]+p>>>0,t[4]=t[4]+m>>>0}return[t[0]>>24&255,t[0]>>16&255,t[0]>>8&255,t[0]&255,t[1]>>24&255,t[1]>>16&255,t[1]>>8&255,t[1]&255,t[2]>>24&255,t[2]>>16&255,t[2]>>8&255,t[2]&255,t[3]>>24&255,t[3]>>16&255,t[3]>>8&255,t[3]&255,t[4]>>24&255,t[4]>>16&255,t[4]>>8&255,t[4]&255]}const gg=SV("v5",80,PV);class Ys{constructor(){if(this.fetchedData=[],Ys.instance)return Ys.instance;Ys.instance=this}async EmailSignUp(e,t,r){return new Promise(i=>{$_(Tt,e,t).then(s=>{const o=s.user;wn(o),console.log("User sign-up successful:",o),this.UpdateUsername(r),i(!0)}).catch(s=>{i(!1)})})}async EmailSignIn(e,t){return new Promise(r=>{q_(Tt,e,t).then(i=>{const s=i.user;wn(s),r(!0)}).catch(i=>{console.log("Login error:",i),r(!1)})})}async UpdateUsername(e){return new Promise(t=>{G_(_V(),{displayName:e}).then(()=>{t(!0)}).catch(r=>{t(!1)})})}async SendPasswordResetEmail(e){return new Promise(t=>{U_(Tt,e).then(()=>{t(!0)}).catch(r=>{t(!1)})})}async SignUpWithGoogle(){const e=new St;return new Promise(t=>{ba(Tt,e).then(r=>{const i=r.user;wn(i),t(!0)}).catch(r=>{t(!1)})})}async SignUpWithGitHub(){const e=new Rt;return new Promise(t=>{ba(Tt,e).then(r=>{const i=r.user;wn(i),t(!0)}).catch(r=>{t(!1)})})}async SignUpWithTwitter(){const e=new Pt;return new Promise(t=>{ba(Tt,e).then(r=>{const i=r.user;wn(i),t(!0)}).catch(r=>{t(!1)})})}async UploadNewPreset(e,t,r,i){if(e==null||e=="")return console.log("presetName is null"),!1;if(t==null||t=="")return console.log("presetData is null"),!1;if(r==null||r=="")return console.log("toyType is null"),!1;console.log("UPLOAD preset"),r=r.toLowerCase().replace(/\s/g,"");const s=Ia();if(s==null)return console.log("ERROR: User-ID is undefined"),!1;const o=this.GenerateUniquiePresetID(e,t,s),c=r+"/"+o;console.log("UPLOAD doc in: "+c),await Kl(Ni(As,c),{userID:s,presetName:e.toLowerCase(),presetData:t,publicPreset:i,uploadDate:Jw()}).then(u=>!0).catch(u=>!1)}async ReadMyPresets(e){try{const t=At(Qs(As,e),Ua("userID","==",Ia())),r=await Ba(t),i=[];return r.forEach(s=>{i.push({id:s.id,...s.data()})}),i}catch(t){return console.error("Error reading collection data:",t),[]}}async SearchPresetsByPresetName(e,t){const r=At(Qs(As,e),Ua("presetName",">=",t.toLowerCase()),Ua("presetName","<=",t.toLowerCase()+""));try{const i=await Ba(r),s=[];return i.forEach(o=>{s.push({id:o.id,...o.data()})}),s}catch(i){throw console.error("Error searching presets:",i),i}}async GetNewesPresets(e){const t=At(Qs(As,e),Xw("uploadDate"));try{const i=(await Ba(t)).docs.reverse(),s=[];return i.forEach(o=>{o.data().userID!=Ia()&&s.push({id:o.id,...o.data()})}),s}catch(r){throw console.error("Error searching presets:",r),r}}async RemoveDoc(e){try{const t=Ni(As,e);return await iv(t),console.log("Document deleted successfully."),!0}catch(t){return console.error("Error deleting document:",t),!1}}SignOut(){Tt.signOut().then(()=>{console.log("User signed out successfully"),wn(void 0)}).catch(e=>{console.error("Error signing out:",e)})}GenerateUniquiePresetID(e,t,r){const i=Ia();if(i==null||i==""||e==null||e==""||t==null||t==""||r==null||r=="")return;const s=e+t+r+i;return gg(s,gg.URL)}SendSignInLinkToEmail(e){if(typeof window>"u")return;const t={url:`${window.location.origin}`,handleCodeInApp:!0};j_(Tt,e,t).then(()=>{console.log("Sign-in link sent to:",e)}).catch(r=>{console.log("Error sending sign-in link:",r)}),window.localStorage.setItem("emailForSignIn",e)}AuthWithEmailLink(){if(console.log("REAUTH with EmailLink"),typeof window>"u")return;let e=window.localStorage.getItem("emailForSignIn");z_(Tt,e,window.location.href).then(t=>(wn(t.user),"Account created!")).catch(t=>t.message)}}var CV=ie("<details><summary></summary><br><!$><!/>"),kV=ie("<input type=range>"),DV=ie("<input type=number>"),VV=ie("<input required>"),xV=ie("<input>"),NV=ie("<input class=toggleInput type=checkbox>"),OV=ie("<div><button>"),MV=ie("<div><button><div>"),LV=ie('<div><button><div class="flex justifyCenter"><div><div class=marginRight10></div><div>'),FV=ie("<div><button><div class=flex><div><div class=marginRight10></div><div>"),hv=ie("<div><h3> MIDI Devices: <!$><!/> "),UV=ie('<div><h3 class=textAlignCenter>Sign In with Email</h3><div><!$><!/><!$><!/></div><div class="marginTop10 width100 justifyEnd"><div class="flex justifyEnd"><!$><!/><!$><!/></div><!$><!/></div><div class="textAlignCenter marginTop10"> <!$><!/> '),BV=ie('<div class><h3 class=textAlignCenter>Create new Account</h3><!$><!/><!$><!/><br><!$><!/><!$><!/><br><div class=textAlignRight></div><br><div class="justifyEnd flex">'),$V=ie('<div><h3 class=textAlignCenter>Change Username</h3><!$><!/><div class="justifyEnd flex"><div class="textAlignRight width40 marginAuto"></div><!$><!/>'),qV=ie('<div><h3 class=textAlignCenter>Recover Account</h3><!$><!/><br><div class="flex justifyEnd"></div><div class=textAlignRight>'),jV=ie('<div><div class=marginAuto></div><div class="marginAuto paddingLeftRight10"></div><!$><!/>'),zV=ie("<div><a>"),GV=ie("<div>"),WV=ie('<div class="flexContainer justifyEnd widthAuto"><!$><!/><div class=marginLeft10>'),HV=ie("<div><div class=flexList><div class=sliderContainer></div><!$><!/>Cool Text"),KV=ie("<div class=flexContainer><div></div><!$><!/>"),QV=ie("<div class=flexContainer><div class=textAlignRight></div><!$><!/>"),JV=ie("<div class=flexContainer><div class=width50></div><!$><!/>"),YV=ie("<div><label for=file-input class=file-input-button>select file(s) to upload</label><input type=file accept=.json multiple id=file-input style=display:none>"),_g=ie("<option value>No MIDI devices found"),XV=ie("<option>"),ZV=ie("<div><div><h3 class=textAlignCenter></h3><!$><!/></div><select class=dropdown>"),ex=ie("<h2>BPM: <!$><!/>"),tx=ie("<h1 class=noSelect>"),nx=ie("<h3>Channel <!$><!/>: <!$><!/>");const Mi=new Hv,Ji=new Kv,rx=new Qv,dv=new Jv,iu=new Ys;function Nx(n){const e=Ke({summeryName:"",content:[],detailClass:"marginAuto width95",summeryClass:"textAlignCenter marginAuto"},n);return(()=>{var t=ne(CV),r=t.firstChild,i=r.nextSibling,s=i.nextSibling,[o,c]=he(s.nextSibling);return W(r,()=>e.summeryName),W(t,()=>e.content,o,c),ve(u=>{var l=e.detailClass,d=e.summeryClass;return l!==u.e&&Pe(t,u.e=l),d!==u.t&&Pe(r,u.t=d),u},{e:void 0,t:void 0}),t})()}function fv(n){const e=Ke({class:"sliderInput "},n),[t,r]=_e(e.value);var i=e.factor;i==null&&(i=1),gc(()=>{r(e.value)});const s=o=>{const c=parseInt(o.target.value);r(c),e.onChange(c/i)};return(()=>{var o=ne(kV);return o.addEventListener("change",s),ve(c=>{var u=e.class,l=e.minMaxStep[0],d=e.minMaxStep[1],p=e.minMaxStep[2];return u!==c.e&&Pe(o,c.e=u),l!==c.t&&ue(o,"min",c.t=l),d!==c.a&&ue(o,"max",c.a=d),p!==c.o&&ue(o,"step",c.o=p),c},{e:void 0,t:void 0,a:void 0,o:void 0}),ve(()=>Ir(o,"value",t()*i)),o})()}function pv(n){const e=Ke({class:"numberInput"},n),[t,r]=_e(e.value);var i=e.factor;i==null&&(i=1),gc(()=>{r(e.value)});const s=o=>{const c=parseInt(o.target.value);r(c),e.onChange(c/i)};return(()=>{var o=ne(DV);return o.addEventListener("change",s),ve(c=>{var u=e.class,l=e.minMaxStep[0],d=e.minMaxStep[1],p=e.minMaxStep[2];return u!==c.e&&Pe(o,c.e=u),l!==c.t&&ue(o,"min",c.t=l),d!==c.a&&ue(o,"max",c.a=d),p!==c.o&&ue(o,"step",c.o=p),c},{e:void 0,t:void 0,a:void 0,o:void 0}),ve(()=>Ir(o,"value",t()*i)),o})()}function ix(n){const e=Ke({placeholder:"Cool Placeholder",id:"",class:"textInput",type:"",required:!1,value:""},n);function t(r){e.onChange!==void 0&&e.onChange(r.target.value)}return e.required?(()=>{var r=ne(VV);return r.addEventListener("change",t),ve(i=>{var s=e.type,o=e.class,c=e.id,u=e.placeholder;return s!==i.e&&ue(r,"type",i.e=s),o!==i.t&&Pe(r,i.t=o),c!==i.a&&ue(r,"id",i.a=c),u!==i.o&&ue(r,"placeholder",i.o=u),i},{e:void 0,t:void 0,a:void 0,o:void 0}),ve(()=>Ir(r,"value",e.value)),r})():(()=>{var r=ne(xV);return r.addEventListener("change",t),ve(i=>{var s=e.type,o=e.class,c=e.id,u=e.placeholder;return s!==i.e&&ue(r,"type",i.e=s),o!==i.t&&Pe(r,i.t=o),c!==i.a&&ue(r,"id",i.a=c),u!==i.o&&ue(r,"placeholder",i.o=u),i},{e:void 0,t:void 0,a:void 0,o:void 0}),ve(()=>Ir(r,"value",e.value)),r})()}function sx(n){const[e,t]=_e(n.checked);gc(()=>{t(n.checked)});const r=()=>{t(!e()),n.onChange(e())};return(()=>{var i=ne(NV);return i.addEventListener("change",r),ve(()=>Ir(i,"checked",e())),i})()}function su(n){const e=Ke({class:"thinButton",label:"Please Set Label",id:""},n),t=()=>e.divClass??e.class,r=()=>{e.onClick()};return(()=>{var i=ne(OV),s=i.firstChild;return s.$$click=r,W(s,()=>e.label),ve(o=>{var c=t(),u=e.class,l=e.id;return c!==o.e&&Pe(i,o.e=c),u!==o.t&&Pe(s,o.t=u),l!==o.a&&ue(s,"id",o.a=l),o},{e:void 0,t:void 0,a:void 0}),ri(),i})()}function $d(n){const e=Ke({class:"iconButton",label:"",id:"",icon:"mdi-light:alert",iconFirst:!0,width:"20",hFlip:!1,vFlip:!1},n),t=()=>e.divClass??e.class;function r(){e.onClick!=null&&e.onClick()}return e.label==""?(()=>{var i=ne(MV),s=i.firstChild,o=s.firstChild;return s.$$click=r,W(o,oe(Ea,{get icon(){return e.icon},class:"marginAuto",get width(){return e.width},get hFlip(){return e.hFlip},get vFlip(){return e.vFlip}})),ve(c=>{var u=t(),l=e.id,d=e.class;return u!==c.e&&Pe(i,c.e=u),l!==c.t&&ue(s,"id",c.t=l),d!==c.a&&Pe(s,c.a=d),c},{e:void 0,t:void 0,a:void 0}),ri(),i})():e.iconFirst?(()=>{var i=ne(LV),s=i.firstChild,o=s.firstChild,c=o.firstChild,u=c.firstChild,l=u.nextSibling;return s.$$click=r,W(u,oe(Ea,{get icon(){return e.icon},get width(){return e.width},get hFlip(){return e.hFlip},get vFlip(){return e.vFlip}})),W(l,()=>e.label),ve(d=>{var p=t(),m=e.id,w=e.class,C=e.class;return p!==d.e&&Pe(i,d.e=p),m!==d.t&&ue(s,"id",d.t=m),w!==d.a&&Pe(s,d.a=w),C!==d.o&&Pe(c,d.o=C),d},{e:void 0,t:void 0,a:void 0,o:void 0}),ri(),i})():(()=>{var i=ne(FV),s=i.firstChild,o=s.firstChild,c=o.firstChild,u=c.firstChild,l=u.nextSibling;return s.$$click=r,W(u,()=>e.label),W(l,oe(Ea,{get icon(){return e.icon},get width(){return e.width},get hFlip(){return e.hFlip},get vFlip(){return e.vFlip}})),ve(d=>{var p=t(),m=e.id,w=e.class,C=e.class;return p!==d.e&&Pe(i,d.e=p),m!==d.t&&ue(s,"id",d.t=m),w!==d.a&&Pe(s,d.a=w),C!==d.o&&Pe(c,d.o=C),d},{e:void 0,t:void 0,a:void 0,o:void 0}),ri(),i})()}function ox(n){const e=Ke({label:"Reload",class:"",id:"midiReloadBtn",width:"20",hFlip:!1,vFlip:!1},n);function t(){rx.LoadMIDIDevices()}return oe($d,{icon:"mdi:reload",get label(){return e.label},onClick:()=>t,get width(){return e.width},get hFlip(){return e.hFlip},get vFlip(){return e.vFlip}})}function Ox(n){const[e,t]=_e("");function r(){const s=Mi.GetMIDIDevices().map((o,c)=>[o]+" ");t(s)}return Ji.SubscribeHalfFramerate(r),(()=>{var i=ne(hv),s=i.firstChild,o=s.firstChild,c=o.nextSibling,[u,l]=he(c.nextSibling);return u.nextSibling,W(s,e,u,l),i})()}function Mx(n){const e=Ke({class:"",id:"emailLogin",width:"30",hFlip:!1,vFlip:!1},n),[t]=_e(""),[r,i]=_e(""),[s,o]=_e("");function c(){console.log("HANDLE email login"),iu.EmailSignIn(r(),s()),e.onLogin!=null&&e.onLogin()}function u(){e.onRegister!=null&&e.onRegister()}function l(){e.onPasswordForgot!=null&&e.onPasswordForgot()}function d(m){i(m.target.value)}function p(m){o(m.target.value)}return(()=>{var m=ne(UV),w=m.firstChild,C=w.nextSibling,k=C.firstChild,[V,j]=he(k.nextSibling),$=V.nextSibling,[U,ee]=he($.nextSibling),J=C.nextSibling,B=J.firstChild,v=B.firstChild,[_,I]=he(v.nextSibling),T=_.nextSibling,[E,S]=he(T.nextSibling),y=B.nextSibling,[Fe,Et]=he(y.nextSibling),yt=J.nextSibling,ou=yt.firstChild,Br=ou.nextSibling,[Jn,au]=he(Br.nextSibling);return Jn.nextSibling,W(C,oe(bn,{icon:"fontisto:email",required:!0,type:"email",placeholder:"E-Mail",get onChange(){return d(event)}}),V,j),W(C,oe(bn,{icon:"bi:key",required:!0,type:"password",placeholder:"Password",get onChange(){return p(event)}}),U,ee),W(B,oe(yg,{class:" textAlignRight justifyEnd paddingTop10 clickableText",onClick:u,label:"register"}),_,I),W(B,oe(su,{class:"width40 thinButton",label:"Login",onClick:c}),E,S),W(J,oe(yg,{class:" textAlignRight justifyEnd paddingTop10 clickableText",onClick:l,label:"Forgot password?"}),Fe,Et),W(yt,t,Jn,au),ve(()=>ue(m,"id",e.id)),m})()}function Lx(n){const[e,t]=_e(""),[r,i]=_e(""),[s,o]=_e(""),[c,u]=_e(""),[l,d]=_e("");function p(){m(r(),c(),l())}async function m(){if(c()==l()&&r().includes("@"))if(c().length>=6)if(s().length>=3){var w=await iu.EmailSignUp(r(),c(),s());w?(t("Created account!"),n.onClick!=null&&n.onClick()):t("Something went wrong...")}else t("Please choose a longer username");else t("Password must be at least 6 characters long");else t("Please check your email and password")}return(()=>{var w=ne(BV),C=w.firstChild,k=C.nextSibling,[V,j]=he(k.nextSibling),$=V.nextSibling,[U,ee]=he($.nextSibling),J=U.nextSibling,B=J.nextSibling,[v,_]=he(B.nextSibling),I=v.nextSibling,[T,E]=he(I.nextSibling),S=T.nextSibling,y=S.nextSibling,Fe=y.nextSibling,Et=Fe.nextSibling;return W(w,oe(bn,{icon:"fontisto:email",placeholder:"E-Mail",type:"email",onChange:yt=>i(yt)}),V,j),W(w,oe(bn,{icon:"mdi:account-outline",placeholder:"Username",type:"username",onChange:yt=>o(yt)}),U,ee),W(w,oe(bn,{icon:"bi:key-fill",placeholder:"Password",type:"password",onChange:yt=>u(yt)}),v,_),W(w,oe(bn,{icon:"bi:key",placeholder:"Repeat Password",type:"password",onChange:yt=>d(yt)}),T,E),W(y,e),W(Et,oe(su,{class:"thinButton width50",label:"Submit",onClick:p})),w})()}function Fx(n){const[e,t]=_e(""),[r,i]=_e("");function s(){e().length>3?iu.UpdateUsername(e()):i("Please choose a longer username")}return(()=>{var o=ne($V),c=o.firstChild,u=c.nextSibling,[l,d]=he(u.nextSibling),p=l.nextSibling,m=p.firstChild,w=m.nextSibling,[C,k]=he(w.nextSibling);return W(o,oe(bn,{icon:"mdi:account-outline",placeholder:"Username",type:"username",onChange:V=>t(V)}),l,d),W(m,r),W(p,oe(su,{class:"thinButton width50",label:"Change",onClick:s}),C,k),o})()}function Ux(n){const[e,t]=_e(""),[r,i]=_e("");async function s(){if(e().includes("@")){var o=await iu.SendPasswordResetEmail(e());o==!0?i("Sent Recovery E-Mail"):i("Error: Please check your E-Mail")}else i("Please check your E-Mail");n.onClick!=null&&n.onClick()}return(()=>{var o=ne(qV),c=o.firstChild,u=c.nextSibling,[l,d]=he(u.nextSibling),p=l.nextSibling,m=p.nextSibling,w=m.nextSibling;return W(o,oe(bn,{icon:"fontisto:email",placeholder:"E-Mail",onChange:C=>t(C)}),l,d),W(m,oe(su,{class:"thinButton width50",label:"Submit",onClick:s})),W(w,r),o})()}function bn(n){const e=Ke({class:"flex justifySpace",id:"textInput",icon:"ep:warn-triangle-filled",iconFirst:!1,width:"30",hFlip:!1,vFlip:!1,required:!1,type:"",placeholder:"My cool Placeholder",label:""},n);function t(r){e.onChange!=null&&e.onChange(r.target.value)}return(()=>{var r=ne(jV),i=r.firstChild,s=i.nextSibling,o=s.nextSibling,[c,u]=he(o.nextSibling);return W(i,oe(Ea,{get icon(){return e.icon},get width(){return e.width},get hFlip(){return e.hFlip},get vFlip(){return e.vFlip}})),W(s,()=>e.label),W(r,oe(ix,{get required(){return e.required},get id(){return e.id},get type(){return e.type},get placeholder(){return e.placeholder},onChange:t}),c,u),ve(()=>Pe(r,e.class)),r})()}function yg(n){const e=Ke({label:"Click on me!",href:"",class:"clickableText textAlignCenter"},n);function t(){e.onClick!=null?e.onClick():console.log("NO ON CLICK FUNCTION DEFINED")}return(()=>{var r=ne(zV),i=r.firstChild;return r.$$click=t,W(i,()=>e.label),ve(()=>Pe(r,e.class)),ri(),r})()}function Bx(n){const e=Ke({class:"iconButton justifyCenter",label:"Sign in with",id:"myCoolService",icon:"zondicons:key",width:"30",hFlip:!1,vFlip:!1},n);function t(){e.onClick!=null?e.onClick():console.log("NO SERVICE FUNCTION")}return(()=>{var r=ne(GV);return W(r,oe($d,{get class(){return e.class},get icon(){return e.icon},get width(){return e.width},get hFlip(){return e.hFlip},get vFlip(){return e.vFlip},get label(){return e.label},onClick:t})),ve(()=>ue(r,"id",e.id)),r})()}function $x(n){const[e,t]=_e("");function r(){t(Mi.GetSelectedMIDIDevice())}return Ji.SubscribeHalfFramerate(r),(()=>{var i=ne(hv),s=i.firstChild,o=s.firstChild,c=o.nextSibling,[u,l]=he(c.nextSibling);return u.nextSibling,W(s,e,u,l),i})()}function ax(n){return(()=>{var e=ne(WV),t=e.firstChild,[r,i]=he(t.nextSibling),s=r.nextSibling;return W(e,oe(pv,{get factor(){return n.factor},get minMaxStep(){return n.minMaxStep},get value(){return n.value},get onChange(){return n.onChange}}),r,i),W(s,oe(fv,{get factor(){return n.factor},get minMaxStep(){return n.minMaxStep},get value(){return n.value},get onChange(){return n.onChange}})),e})()}function cx(n){return(()=>{var e=ne(HV),t=e.firstChild,r=t.firstChild,i=r.nextSibling,[s,o]=he(i.nextSibling);return s.nextSibling,W(r,oe(fv,{class:"verticalSlider",get factor(){return n.factor},get minMaxStep(){return n.minMaxStep},get value(){return n.value},get onChange(){return n.onChange}})),W(t,oe(pv,{get factor(){return n.factor},get minMaxStep(){return n.minMaxStep},get value(){return n.value},get onChange(){return n.onChange}}),s,o),e})()}function qx(n){return(()=>{var e=ne(KV),t=e.firstChild,r=t.nextSibling,[i,s]=he(r.nextSibling);return W(t,()=>n.name),W(e,oe(sx,{get checked(){return n.checked},get onChange(){return n.onChange}}),i,s),e})()}function jx(n){const e=Ke({name:"define props.name pls",vertical:!1},n);return e.vertical?(()=>{var t=ne(QV),r=t.firstChild,i=r.nextSibling,[s,o]=he(i.nextSibling);return W(r,()=>e.name),W(t,oe(cx,{get factor(){return e.factor},get minMaxStep(){return e.minMaxStep},get value(){return e.value},get onChange(){return e.onChange}}),s,o),t})():(()=>{var t=ne(JV),r=t.firstChild,i=r.nextSibling,[s,o]=he(i.nextSibling);return W(r,()=>e.name),W(t,oe(ax,{get factor(){return e.factor},get minMaxStep(){return e.minMaxStep},get value(){return e.value},get onChange(){return e.onChange}}),s,o),t})()}function zx(n){const e=t=>{const r=t.target.files;r.length>0&&Array.from(r).forEach(i=>{const s=new FileReader;s.onload=()=>{const o=JSON.parse(s.result);n.onFileUpload(i.name,o)},s.readAsText(i)})};return(()=>{var t=ne(YV),r=t.firstChild,i=r.nextSibling;return i.addEventListener("change",e),t})()}function Gx(n){const e=Ke({divClass:"flex",class:"dropdown",label:"MIDI Devices"},n),[t]=_e(""),[r,i]=_e(["",""]),[s,o]=_e(ne(_g)),c=async()=>{const d=await Mi.GetMIDIDevices();d!=null&&d!==r()&&(i(d),l(d))};function u(d){Mi.SetTargetMIDIDevice(d)}function l(d){var p=null;d.length>0?p=d.map((m,w)=>(()=>{var C=ne(XV);return ue(C,"key",w),Ir(C,"value",m),W(C,m),C})()):p=ne(_g),o(p)}return(()=>{var d=ne(ZV),p=d.firstChild,m=p.firstChild,w=m.nextSibling,[C,k]=he(w.nextSibling),V=p.nextSibling;return W(m,()=>e.label),W(p,oe(ox,{}),C,k),V.addEventListener("change",j=>u(j.target.value)),V.addEventListener("focus",()=>c()),W(V,s),ve(()=>Pe(d,e.divClass)),ve(()=>Ir(V,"value",t())),d})()}function Wx(n){const e=Ke({class:"textAlignCenter"},n),[t,r]=_e(0);function i(){r(Mi.GetBPM())}return Ji.SubscribeFullFramerate(i),(()=>{var s=ne(ex),o=s.firstChild,c=o.nextSibling,[u,l]=he(c.nextSibling);return W(s,t,u,l),ve(()=>Pe(s,e.class)),s})()}function Hx(n){const e=Ke({width:"35",icon:"ic:baseline-arrow-forward-ios"},n);var t;const[r]=_e(!1);gc(()=>{r()?s():o()});function i(){var l=document.getElementById("settingsPanel");l!=null&&(l.style.display="block",s())}function s(){var l=document.getElementById("openSettingsButton");l!=null&&(l.style.display="none")}function o(){var l=document.getElementById("openSettingsButton");l!=null&&(l.style.display="block")}function c(d){var d=dv.GetToys(),p=!0;if(d!=null)return d.forEach(m=>{if(!m.toyType.includes("Empty")){p=!1;return}}),!!p}typeof window<"u"&&document.addEventListener("mousemove",l=>{t!=null&&t.style.display!="block"&&(c()||l.clientY<window.innerHeight/4&&l.clientX<window.innerHeight/4?o():s())});function u(){typeof window<"u"&&(t=document.getElementById("settingsPanel"))}return Ji.SubscribeOneFPS(u),oe($d,{id:"openSettingsButton",get icon(){return e.icon},get width(){return e.width},onClick:()=>i()})}function Kx(n){const e=Ke({label:"No MIDI toy loaded, add a toy to start",id:"startText"},n),[t,r]=_e(e.label);function i(){var o=dv.GetToys(),c=!0;if(o!=null)return o.forEach(u=>{if(!u.toyType.includes("Empty")){c=!1;return}}),!!c}function s(){i()?r(e.label):r("")}return Ji.SubscribeOneFPS(s),(()=>{var o=ne(tx);return W(o,t),ve(()=>ue(o,"id",e.id)),o})()}function Qx(n){const e=Ke({channel:1,class:"width20"},n),[t,r]=_e([]);function i(){r(Mi.GetHoldingKeys(e.channel).toString())}return Ji.SubscribeHalfFramerate(i),(()=>{var s=ne(nx),o=s.firstChild,c=o.nextSibling,[u,l]=he(c.nextSibling),d=u.nextSibling,p=d.nextSibling,[m,w]=he(p.nextSibling);return W(s,()=>e.channel,u,l),W(s,t,m,w),ve(()=>Pe(s,e.class)),s})()}Wv(["click"]);export{Ox as A,su as B,qx as C,Nx as D,Lx as E,Ys as F,_V as G,zx as J,Gx as M,jx as N,Hx as O,Bx as S,ix as T,Fx as U,$d as a,Wx as b,Ux as c,Mx as d,Qx as e,ox as f,$x as g,Kx as h};
