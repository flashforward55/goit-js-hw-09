var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},i=e.parcelRequire7bc7;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in n){var i=n[e];delete n[e];var t={id:e,exports:{}};return o[e]=t,i.call(t.exports,t,t.exports),t.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,o){n[e]=o},e.parcelRequire7bc7=i);var t=i("iQIUW");function r(e,o){return new Promise(((n,i)=>{const t=Math.random()>.3;setTimeout((()=>{t?n({position:e,delay:o}):i({position:e,delay:o})}),o)}))}const l=document.querySelector(".form");l.addEventListener("submit",(function(e){e.preventDefault();const{elements:{delay:o,step:n,amount:i}}=e.currentTarget,s=Number(o.value),u=Number(n.value),a=Number(i.value);t.Notify.info(`Creating ${a} promises...`);for(let e=0;e<a;e++){r(e+1,s+e*u).then((({position:e,delay:o})=>{console.log(`✅ Fulfilled promise ${e} in ${o}ms`),t.Notify.success(`✅ Fulfilled promise ${e} in ${o}ms`)})).catch((({position:e,delay:o})=>{console.log(`❌ Rejected promise ${e} in ${o}ms`),t.Notify.failure(`❌ Rejected promise ${e} in ${o}ms`)})).finally((()=>l.reset()))}}));
//# sourceMappingURL=03-promises.bfed8faf.js.map
