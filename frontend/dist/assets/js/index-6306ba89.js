var xt=Object.defineProperty,gt=Object.defineProperties;var bt=Object.getOwnPropertyDescriptors;var Ce=Object.getOwnPropertySymbols;var ht=Object.prototype.hasOwnProperty,mt=Object.prototype.propertyIsEnumerable;var ze=(i,n,a)=>n in i?xt(i,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[n]=a,O=(i,n)=>{for(var a in n||(n={}))ht.call(n,a)&&ze(i,a,n[a]);if(Ce)for(var a of Ce(n))mt.call(n,a)&&ze(i,a,n[a]);return i},D=(i,n)=>gt(i,bt(n));var ut=(i,n)=>()=>(n||i((n={exports:{}}).exports,n),n.exports);var Q=(i,n,a)=>new Promise((d,l)=>{var o=f=>{try{m(a.next(f))}catch(b){l(b)}},h=f=>{try{m(a.throw(f))}catch(b){l(b)}},m=f=>f.done?d(f.value):Promise.resolve(f.value).then(o,h);m((a=a.apply(i,n)).next())});import{r as c,b as ft,a as wt}from"./vendor-ff82005c.js";import{u as H,B as yt,R as vt,a as L}from"./router-d0aa0b1d.js";import{m as jt,d as t,a as s,A as P}from"./ui-8fbed0d0.js";var lr=ut(ie=>{(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))d(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&d(h)}).observe(document,{childList:!0,subtree:!0});function a(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(l){if(l.ep)return;l.ep=!0;const o=a(l);fetch(l.href,o)}})();var ot={exports:{}},ne={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kt=c,Ct=Symbol.for("react.element"),zt=Symbol.for("react.fragment"),$t=Object.prototype.hasOwnProperty,Tt=kt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,St={key:!0,ref:!0,__self:!0,__source:!0};function at(i,n,a){var d,l={},o=null,h=null;a!==void 0&&(o=""+a),n.key!==void 0&&(o=""+n.key),n.ref!==void 0&&(h=n.ref);for(d in n)$t.call(n,d)&&!St.hasOwnProperty(d)&&(l[d]=n[d]);if(i&&i.defaultProps)for(d in n=i.defaultProps,n)l[d]===void 0&&(l[d]=n[d]);return{$$typeof:Ct,type:i,key:o,ref:h,props:l,_owner:Tt.current}}ne.Fragment=zt;ne.jsx=at;ne.jsxs=at;ot.exports=ne;var e=ot.exports,fe={},$e=ft;fe.createRoot=$e.createRoot,fe.hydrateRoot=$e.hydrateRoot;const rt=c.createContext(void 0),It=()=>{const i=c.useContext(rt);if(i===void 0)throw new Error("useMusic must be used within a MusicProvider");return i},Et=[{id:"summer-pockets",name:"Summer Pockets",artist:"水月陵",src:"/audio/水月陵 - Summer Pockets.mp3",album:"Summer Pockets OST"},{id:"sea-you-me",name:"Sea, You & Me",artist:"麻枝准",src:"/audio/麻枝准 - Sea, You & Me.mp3",album:"Summer Pockets OST"},{id:"alcatale",name:"アルカテイル",artist:"鈴木このみ",src:"/audio/鈴木このみ,VISUAL ARTS  Key - アルカテイル.mp3",album:"Summer Pockets OST"},{id:"yoru-wa-mijikaku",name:"夜は短く、空は遠くて…",artist:"水月陵",src:"/audio/水月陵 - 夜は短く、空は遠くて….wav",album:"Summer Pockets OST"},{id:"departure",name:"Departure!",artist:"嶺内ともみ",src:"/audio/嶺内ともみ - Departure!.flac",album:"Summer Pockets OST"},{id:"with",name:"with",artist:"嶺内ともみ",src:"/audio/嶺内ともみ - with.flac",album:"Summer Pockets OST"},{id:"hiyoku-no-chou",name:"比翼の蝶たち",artist:"高森奈津美",src:"/audio/高森奈津美 - 比翼の蝶たち.flac",album:"Summer Pockets OST"},{id:"natsu-ni-kimi-wo",name:"夏に君を待ちながら",artist:"小原好美",src:"/audio/小原好美 - 夏に君を待ちながら.flac",album:"Summer Pockets OST"},{id:"tsumugi-no-natsuyasumi",name:"紬の夏休み",artist:"岩井映美里",src:"/audio/岩井映美里,VISUAL ARTS  Key - 紬の夏休み.flac",album:"Summer Pockets OST"}],Ft=({children:i})=>{const n=c.useRef(null),a=c.useRef("list"),d=c.useRef(!1),l=c.useRef(!1),[o,h]=c.useState(!1),[m,f]=c.useState(!1),[b,y]=c.useState(0),[k,$]=c.useState(0),[S,T]=c.useState(.7),[I,v]=c.useState(Et),[p,C]=c.useState(0),[x,F]=c.useState("list"),[M,g]=c.useState(!1),w=I[p]||null,z=c.useCallback(()=>Q(ie,null,function*(){try{const u=yield fetch("http://localhost:8000/api/music/playlist");if(u.ok){const B=yield u.json();B.tracks&&B.tracks.length>0&&v(B.tracks)}}catch(u){}}),[]);c.useEffect(()=>{a.current=x},[x]),c.useEffect(()=>{const u=n.current;!u||!w||(!d.current||u.src!==location.origin+w.src)&&(u.src=w.src,u.volume=S,u.load(),d.current=!0)},[w]),c.useEffect(()=>{const u=n.current;u&&(u.volume=S)},[S]);const r=c.useCallback(()=>Q(ie,null,function*(){const u=n.current;if(!(!u||!w))try{const B=decodeURI(u.src),Y=location.origin+w.src;B.endsWith(w.src)||(u.src=w.src,u.load(),yield new Promise(W=>{const V=()=>{u.removeEventListener("canplay",V),W(void 0)};u.addEventListener("canplay",V)})),yield u.play(),h(!0),f(!1)}catch(B){B.name==="NotAllowedError"||(h(!1),f(!0))}}),[w]),j=c.useCallback(()=>{const u=n.current;u&&(u.pause(),h(!1),f(!0))},[]),E=c.useCallback(()=>{var B;const u=n.current;u&&(o?j():m&&decodeURI(u.src).endsWith((B=w==null?void 0:w.src)!=null?B:"")?u.play().then(()=>{h(!0),f(!1)}).catch(Y=>{Y.name==="NotAllowedError"||r()}):r())},[o,m,j,r,w]),A=c.useCallback(()=>{let u;x==="single"?u=p:u=(p+1)%I.length,C(u),d.current=!1,l.current=!0},[p,I.length,x]),X=c.useCallback(()=>{let u;x==="single"?u=p:u=p===0?I.length-1:p-1,C(u),d.current=!1,l.current=!0},[p,I.length,x]),ve=c.useCallback(u=>{const B=n.current;B&&(B.currentTime=u,y(u))},[]),lt=c.useCallback(u=>{T(u);const B=n.current;B&&(B.volume=u)},[]),ct=c.useCallback(u=>{u>=0&&u<I.length&&u!==p&&(C(u),d.current=!1,l.current=!0)},[I.length,p]);c.useEffect(()=>{l.current&&w&&d.current&&(l.current=!1,setTimeout(()=>{r()},100))},[w,r]),c.useEffect(()=>{const u=n.current;if(!u)return;const B=()=>{$(u.duration||0)},Y=()=>{y(u.currentTime||0)},W=()=>{h(!1),f(!1),a.current==="single"?(u.currentTime=0,r()):A()},V=()=>{h(!0),f(!1)},je=()=>{h(!1),f(!0)},ke=pt=>{h(!1),f(!0)};return u.addEventListener("loadedmetadata",B),u.addEventListener("timeupdate",Y),u.addEventListener("ended",W),u.addEventListener("play",V),u.addEventListener("pause",je),u.addEventListener("error",ke),()=>{u.removeEventListener("loadedmetadata",B),u.removeEventListener("timeupdate",Y),u.removeEventListener("ended",W),u.removeEventListener("play",V),u.removeEventListener("pause",je),u.removeEventListener("error",ke)}},[r,A]),c.useEffect(()=>{z()},[z]);const dt={isPlaying:o,isPaused:m,currentTime:b,duration:k,volume:S,playlist:I,currentTrack:w,currentIndex:p,playMode:x,play:r,pause:j,togglePlay:E,next:A,prev:X,seek:ve,setVolume:lt,selectTrack:ct,setPlayMode:F,audioRef:n,isPlayerOpen:M,setPlayerOpen:g};return e.jsxs(rt.Provider,{value:dt,children:[i,e.jsx("audio",{ref:n,style:{display:"none"},preload:"metadata"})]})},Bt=jt`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`,Pt=t.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    135deg, 
    #87CEEB 0%,    /* 天蓝色 */
    #98E4D6 20%,   /* 薄荷绿 */
    #F4E285 40%,   /* 浅黄色 */
    #FFB347 60%,   /* 金橙色 */
    #FF8C69 80%,   /* 珊瑚色 */
    #FFA07A 100%   /* 浅橙色 */
  );
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`,Mt=t.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`,Ot=t.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: ${Bt} ${i=>i.duration}s infinite;
  
  &:nth-child(odd) {
    animation-delay: ${i=>i.delay}s;
  }
`,Dt=t.div`
  position: relative;
  width: 600px;
  height: 800px;
  perspective: 1000px;
`,At=t(s.div)`
  width: 600px;
  height: 800px;
  position: relative;
  cursor: pointer;
`,Lt=t.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  border-radius: 0 15px 15px 0;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.6),
    inset -5px 0 10px rgba(0, 0, 0, 0.1);
  border: 3px solid #ddd;
  border-left: none;
  
  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 20px;
    bottom: 20px;
    width: 2px;
    background: linear-gradient(
      to bottom, 
      #FFB347 0%,
      #FF8C00 50%,
      #FFB347 100%
    );
  }
`,Ht=t(s.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #8B4513, #A0522D, #CD853F);
  border-radius: 15px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.6),
    inset 0 2px 10px rgba(255, 255, 255, 0.2),
    inset 0 -2px 10px rgba(0, 0, 0, 0.3);
  transform-origin: left center;
  border: 3px solid #654321;
  z-index: 2;
`,Rt=t.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,Kt=t.h1`
  font-size: 34px;
  color: #2C3E50;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 400;
  text-shadow: 
    2px 2px 4px rgba(255, 255, 255, 0.8),
    0 0 10px rgba(255, 165, 0, 0.3);
  font-family: 'Ma Shan Zheng', '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  letter-spacing: 2px;
  transform: rotate(-1deg);
  position: relative;
  
  &::before {
    content: '📔 ';
    font-size: 0.8em;
  }
  
  &::after {
    content: ' ✍️';
    font-size: 0.8em;
  }
`,Nt=t.div`
  position: relative;
  margin-bottom: 30px;
`,Yt=t.img`
  width: 400px;
  height: 500px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 
    0 0 20px rgba(255, 215, 0, 0.3),
    inset 0 2px 10px rgba(255, 255, 255, 0.2);
  border: 2px solid #FFD700;
  cursor: pointer; /* 新增：可点击 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      transparent 0%, 
      rgba(255, 215, 0, 0.2) 50%, 
      transparent 100%
    );
    border-radius: 15px;
    pointer-events: none;
  }
`,Vt=t(s.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
`,Ut=t.img`
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 18px;
  box-shadow: 0 0 40px rgba(0,0,0,0.7);
  border: 3px solid #FFD700;
  background: #fff;
`,_t=t.button`
  position: absolute;
  top: 30px;
  right: 40px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 201;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover {
    background: rgba(0,0,0,0.8);
  }
`,Xt=t(s.div)`
  position: absolute;
  top: 50%;
  
  /* 🦋 ====== 蝴蝶水平位置控制区域 ====== */
  right: -70px; /* 
    🔧 蝴蝶图标水平位置调整参数
    
    📏 调整说明：
    - 负值(-15px)：蝴蝶向右移动，超出书本边缘
    - 正值(15px)：蝴蝶向左移动，靠近书本内部
    - 0px：蝴蝶位于书本右边缘
    
    💡 推荐调整范围：
    - 向右移动更多：-20px ~ -30px
    - 向左移动到书本内：0px ~ 20px
    - 贴近书本边缘：-5px ~ 5px
    
    🎯 当前值 -15px = 蝴蝶图标向右突出书本边缘15像素
  */
  /* ======================================= */
  
  /* 🔧 移除CSS transform，完全由Framer Motion管理 */
  transform-origin: center center; /* 🔧 保持中心点为变换原点 */
  width: 100px; /* 图片容器宽度 */
  height: 100px; /* 图片容器高度 */
  cursor: pointer;
  z-index: 10;
  
  /* 🔧 确保悬停时位置稳定 */
  will-change: transform, filter;
`,Wt=t.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* 🔧 保持图片完整性，不裁剪 */
  object-position: center center; /* 🔧 图片居中对齐 */
  transition: none; /* 🔧 移除过渡效果，图片直接切换 */
  display: block;
`,Qt=t(s.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  z-index: 100;
  pointer-events: none;
`,Gt=()=>{const i=H(),[n,a]=c.useState(!1),[d,l]=c.useState(!1),[o,h]=c.useState([]),[m,f]=c.useState(!1);c.useEffect(()=>{(()=>{const $=[];for(let S=0;S<100;S++)$.push({id:S,left:Math.random()*100,top:Math.random()*100,size:Math.random()*3+1,duration:Math.random()*3+2,delay:Math.random()*2});h($)})()},[]);const b=()=>{a(!0)},y=()=>{n&&i("/contents")};return e.jsxs(Pt,{children:[e.jsx(Mt,{children:o.map(k=>e.jsx(Ot,{style:{left:`${k.left}%`,top:`${k.top}%`,width:`${k.size}px`,height:`${k.size}px`},duration:k.duration,delay:k.delay},k.id))}),e.jsx(Dt,{children:e.jsxs(At,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:1,ease:"easeOut"},children:[e.jsx(Lt,{}),e.jsx(Ht,{animate:n?{rotateY:-180}:{rotateY:0},transition:{duration:2,ease:"easeInOut"},style:{transformStyle:"preserve-3d"},onAnimationComplete:y,children:e.jsxs(Rt,{children:[e.jsx(Kt,{children:"Summer Pockets巡礼日记"}),e.jsx(Nt,{children:e.jsx(Yt,{src:"images/webps/sprb封面图.webp",alt:"Summer Pockets 封面",onClick:()=>f(!0)})})]})}),e.jsx(Xt,{onClick:b,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),initial:{y:"-50%"},whileHover:{scale:1.1,y:"-50%",filter:"brightness(1.1) drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))"},whileTap:{scale:.95,y:"-50%"},animate:n?{opacity:0,y:"-50%"}:{opacity:1,y:"-50%"},transition:{duration:.2},children:e.jsx(Wt,{src:d?"/images/webps/七影蝶-3.webp":"/images/webps/七影蝶-4.webp",alt:"蝴蝶锁图标"})})]})}),e.jsx(P,{children:m&&e.jsxs(Vt,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>f(!1),children:[e.jsx(_t,{onClick:k=>{k.stopPropagation(),f(!1)},title:"关闭",children:"×"}),e.jsx(Ut,{src:"images/webps/sprb封面图.webp",alt:"Summer Pockets 封面大图",onClick:k=>k.stopPropagation()})]})}),e.jsx(P,{children:n&&e.jsx(Qt,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.8,delay:1.2}})})]})},qt=t(s.div)`
  position: absolute;
  /* 🦋 蝴蝶图片尺寸设置：容器宽高由size参数控制 */
  width: ${i=>i.size}px;
  height: ${i=>i.size}px;
  right: -${i=>i.size/2}px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  pointer-events: none;
`,Jt=t(s.img)`
  /* 🦋 蝴蝶图片尺寸设置：图片实际显示尺寸由size参数控制 */
  width: ${i=>i.size}px;
  height: ${i=>i.size}px;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
`,oe=({isHovered:i,size:n=150})=>{const[a,d]=c.useState(1),l=c.useRef(null),o=["images/webps/七影蝶-3.webp","images/webps/七影蝶-4.webp"];return c.useEffect(()=>(i?l.current=setInterval(()=>{d(h=>(h+1)%o.length)},400):(l.current&&(clearInterval(l.current),l.current=null),d(1)),()=>{l.current&&clearInterval(l.current)}),[i]),e.jsx(qt,{size:n,initial:{opacity:0,scale:.5,x:-20},animate:{opacity:1,scale:1,x:0},exit:{opacity:0,scale:.5,x:-20},transition:{duration:.3,ease:"easeOut"},children:e.jsx(Jt,{src:o[a],alt:"蝴蝶动画",size:n})})},Zt=s(t.div`
  position: absolute;
  left: ${i=>i.x}vw;
  top: ${i=>i.y}vh;
  width: ${i=>i.size}px;
  height: ${i=>i.size}px;
  background: rgba(255,255,255,${i=>i.opacity});
  border-radius: 50%;
  pointer-events: none;
  filter: blur(0.5px);
`),ae=({isVisible:i=!0})=>{const[n]=c.useState(()=>{const a=[];for(let d=0;d<80;d++)a.push({x:Math.random()*100,y:Math.random()*100,size:Math.random()*1.8+.7,opacity:Math.random()*.5+.5,float:Math.random()*6+2,duration:Math.random()*3+2});return a});return i?e.jsx(e.Fragment,{children:n.map((a,d)=>e.jsx(Zt,{x:a.x,y:a.y,size:a.size,opacity:a.opacity,animate:{y:[0,-a.float,0,a.float,0]},transition:{duration:a.duration,repeat:1/0,repeatType:"loop",ease:"easeInOut",delay:Math.random()*3}},d))}):null},ei=t.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    135deg, 
    #87CEEB 0%,    /* 天蓝色 */
    #98E4D6 20%,   /* 薄荷绿 */
    #F4E285 40%,   /* 浅黄色 */
    #FFB347 60%,   /* 金橙色 */
    #FF8C69 80%,   /* 珊瑚色 */
    #FFA07A 100%   /* 浅橙色 */
  );
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`,ti=t(s.div)`
  width: 1200px;
  height: 800px;
  background: linear-gradient(
    to right,
    #FFF8DC 0%,    /* 米色 */
    #FFFAF0 50%,   /* 花白色 */
    #FFF8DC 100%   /* 米色 */
  );
  border-radius: 20px;
  box-shadow: 
    0 20px 60px rgba(255, 165, 0, 0.3),
    inset 0 0 30px rgba(255, 215, 0, 0.1);
  display: flex;
  position: relative;
  z-index: 2;
  
  /* 日记本中间的装订线 */
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 60px;
    bottom: 60px;
    width: 6px;
    background: linear-gradient(
      to bottom, 
      #FFB347 0%,
      #FF8C00 50%,
      #FFB347 100%
    );
    transform: translateX(-50%);
    z-index: 10;
    border-radius: 3px;
  }
  
  /* 装订孔 */
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 15px,
      #DDD 15px,
      #DDD 17px
    );
    transform: translateX(-50%);
    z-index: 11;
  }
`,ii=t.div`
  width: 50%;
  padding: 60px 40px;
  background: #FFFEF7;
  border-radius: 20px 0 0 20px;
  position: relative;
  
  /* 页面边距线 */
  &::before {
    content: '';
    position: absolute;
    left: 80px;
    top: 60px;
    bottom: 60px;
    width: 2px;
    background: #FFB6C1;
    opacity: 0.5;
  }
`,ni=t.div`
  width: 50%;
  padding: 60px 40px;
  background: #FFFEF7;
  border-radius: 0 20px 20px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,oi=t.h1`
  color: #FF6B35;
  font-size: 42px;
  text-align: center;
  margin-bottom: 20px;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 3px 3px 6px rgba(255, 165, 0, 0.3);
  font-weight: 700;
  
  &::before {
    content: '🌻 ';
  }
  
  &::after {
    content: ' 🌻';
  }
`,ai=t.p`
  color: #FF8C00;
  font-size: 18px;
  text-align: center;
  margin-bottom: 50px;
  font-style: italic;
  font-family: 'KaiTi', 'SimKai', serif;
`,ri=t.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 20px;
`,re=t(s.div)`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  background: transparent;
  transition: all 0.4s ease;
  overflow: hidden;
  
  &:hover {
    /* 🌃 悬停时的变换效果 */
    transform: translateX(15px) scale(1.02);
    box-shadow: 0 8px 25px rgba(10, 25, 50, 0.8);
    
    /* 🌙 参考夜晚山路图片的颜色渐变：从左到右由浅入深 */
    background: linear-gradient(
      to right,
      rgba(70, 130, 180, 0.3) 0%,    /* 浅蓝灰色 */
      rgba(47, 79, 79, 0.5) 25%,     /* 深蓝灰色 */
      rgba(25, 25, 112, 0.7) 50%,    /* 午夜蓝 */
      rgba(13, 15, 25, 0.85) 75%,    /* 深夜蓝 */
      rgba(8, 8, 16, 0.95) 100%      /* 最深黑夜色 */
    );
    
    /* 悬停时图标也变成夜空主题 */
    & > div:first-child {
      background: linear-gradient(45deg, 
        rgba(100, 149, 237, 0.9), 
        rgba(135, 206, 235, 0.8)
      );
      box-shadow: 
        0 8px 25px rgba(30, 70, 123, 0.6),
        inset 0 2px 5px rgba(255, 255, 255, 0.4);
    }
  }
  
  /* 星空下划线效果 */
  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 20px;
    right: 20px;
    height: 2px;
    background: ${i=>i.isActive?"linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(135, 206, 235, 0.9), rgba(255, 255, 255, 0.8))":"transparent"};
    transform: scaleX(${i=>i.isActive?1:0});
    transition: transform 0.3s ease;
    z-index: 10;
  }
`,se=t.div`
  font-size: 36px;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #FF6B35, #FFB347);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 6px 20px rgba(255, 107, 53, 0.4),
    inset 0 2px 5px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;
  
  &:hover {
    transform: rotateY(15deg) rotateX(5deg);
    box-shadow: 
      0 8px 25px rgba(255, 107, 53, 0.5),
      inset 0 2px 5px rgba(255, 255, 255, 0.4);
  }
`,le=t.h3`
  color: ${i=>i.isActive?"#FFFFFF":"#2E8B57"};
  font-size: 32px;
  margin: 0;
  flex: 1;
  font-weight: 700;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  transition: all 0.3s ease;
  text-shadow: ${i=>i.isActive?"2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(135, 206, 235, 0.6)":"1px 1px 2px rgba(46, 139, 87, 0.2)"};
  position: relative;
  z-index: 10;
`,Te=t(s.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`,si=t(s.div)`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 248, 220, 0.9) 100%
  );
  border-radius: 25px;
  padding: 40px;
  text-align: center;
  box-shadow: 
    0 15px 40px rgba(255, 165, 0, 0.3),
    inset 0 0 20px rgba(255, 215, 0, 0.1);
  max-width: 400px;
  width: 100%;
  border: 3px solid rgba(255, 182, 193, 0.3);
`,li=t.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
  border: 3px solid #FFB6C1;
`,ci=t.p`
  font-size: 20px;
  color: #FF6B35;
  font-weight: 600;
  line-height: 1.6;
  font-family: 'KaiTi', 'SimKai', serif;
  text-shadow: 1px 1px 2px rgba(255, 107, 53, 0.2);
`,di=t(s.div)`
  color: #2E8B57;
  font-size: 20px;
  text-align: center;
  font-style: italic;
  line-height: 1.8;
  font-family: 'KaiTi', 'SimKai', serif;
  background: rgba(255, 255, 255, 0.7);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(46, 139, 87, 0.2);
  
  &::before {
    content: '🌞';
    display: block;
    font-size: 48px;
    margin-bottom: 15px;
  }
`,pi=t(s.button)`
  position: relative;
  margin-top: 30px;
  margin-left: 20px;
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 15px 25px;
  font-size: 18px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`,Se={traffic:{image:"/images/webps/交通篇摘要图.webp",text:"🚌 国内各地到高松的完整交通攻略"},checkin:{image:"/images/webps/打卡篇摘要图.webp",text:"📍 女木岛、男木岛、直岛圣地巡礼"},other:{image:"/images/webps/神域摘要图.webp",text:"记得来神域寄存和领取自己的七影碟哦！🦋"}},xi=()=>{const i=H(),[n,a]=c.useState(null),[d,l]=c.useState(null),o=m=>{m==="traffic"?i("/traffic"):m==="checkin"?i("/checkin"):m==="other"&&i("/divine-realm")},h=()=>{i("/")};return e.jsx(ei,{children:e.jsxs(ti,{initial:{scale:.7,opacity:0,rotateY:-15},animate:{scale:1,opacity:1,rotateY:0},transition:{duration:1,ease:"easeOut"},children:[e.jsxs(ii,{children:[e.jsx(oi,{children:"目录"}),e.jsx(ai,{children:"Summer Pockets 圣地巡礼日记"}),e.jsxs(ri,{children:[e.jsxs(re,{isActive:n==="traffic",onMouseEnter:()=>{a("traffic"),l("traffic")},onMouseLeave:()=>{a(null),l(null)},onClick:()=>o("traffic"),whileHover:{scale:1.02},whileTap:{scale:.98},children:[e.jsx(ae,{isVisible:n==="traffic"}),e.jsx(se,{children:"🚌"}),e.jsxs(le,{isActive:n==="traffic",children:["交通篇",e.jsx(oe,{isHovered:d==="traffic",size:40})]})]}),e.jsxs(re,{isActive:n==="checkin",onMouseEnter:()=>{a("checkin"),l("checkin")},onMouseLeave:()=>{a(null),l(null)},onClick:()=>o("checkin"),whileHover:{scale:1.02},whileTap:{scale:.98},children:[e.jsx(ae,{isVisible:n==="checkin"}),e.jsx(se,{children:"📍"}),e.jsxs(le,{isActive:n==="checkin",children:["打卡篇",e.jsx(oe,{isHovered:d==="checkin",size:40})]})]}),e.jsxs(re,{isActive:n==="other",onMouseEnter:()=>{a("other"),l("other")},onMouseLeave:()=>{a(null),l(null)},onClick:()=>o("other"),whileHover:{scale:1.02},whileTap:{scale:.98},children:[e.jsx(ae,{isVisible:n==="other"}),e.jsx(se,{children:"🦋"}),e.jsxs(le,{isActive:n==="other",children:["神域",e.jsx(oe,{isHovered:d==="other",size:40})]})]})]}),e.jsx(pi,{onClick:h,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.5,delay:.8},children:"🏠 返回首页"})]}),e.jsx(ni,{children:e.jsx(P,{mode:"wait",children:n&&n!==null?e.jsx(Te,{initial:{opacity:0,y:30,scale:.9},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:-30,scale:.9},transition:{duration:.4,ease:"easeOut"},children:e.jsxs(si,{initial:{opacity:0,rotateX:-20},animate:{opacity:1,rotateX:0},transition:{duration:.5,delay:.1},children:[e.jsx(li,{src:Se[n].image,alt:`${n} 摘要图`,onError:m=>{m.target.style.display="none"}}),e.jsx(ci,{children:Se[n].text})]})},n):e.jsx(Te,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:e.jsxs(di,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:["悬停章节标题查看摘要信息",e.jsx("br",{}),e.jsx("span",{style:{color:"#FF6B35",fontWeight:"bold"},children:"让我们一起重回那个夏天吧！"})]})},"placeholder")})})]})})},gi=t.div`
  background: #ffffff;
  padding: 40px 20px;
  border-radius: 20px;
  margin: 20px 0;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  border: 1px solid #e0e0e0;
`,bi=t.h2`
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
  font-weight: 700;
  position: relative;
  z-index: 1;
`,hi=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`,mi=t(s.div)`
  background: #ffffff;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #FF6B35, #FFB347);
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`,ui=t.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 12px;
`,fi=t.div`
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #FF6B35, #FFB347);
  border-radius: 50%;
  color: white;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
`,wi=t.h3`
  font-size: 20px;
  color: #333;
  margin: 0;
  font-weight: 600;
  flex: 1;
`,yi=t.div`
  color: #333;
  line-height: 1.6;
  font-size: 14px;
  white-space: pre-line;
  
  ul {
    margin: 10px 0;
    padding-left: 20px;
  }
  
  li {
    margin: 5px 0;
    color: #333;
  }
  
  strong {
    color: #FF6B35;
    font-weight: 600;
  }
`,vi=({cards:i,title:n="交通攻略指南"})=>{const a=l=>{const o=l.split(`
`);let h="",m=!1;for(const f of o)f.trim().startsWith("•")?(m||(h+=`
`,m=!0),h+=f+`
`):(m&&(h+=`
`,m=!1),h+=f+`
`);return h.trim()},d={hidden:{opacity:0,y:50},visible:l=>({opacity:1,y:0,transition:{delay:l*.1,duration:.5,ease:"easeOut"}})};return e.jsxs(gi,{children:[e.jsx(bi,{children:n}),e.jsx(hi,{children:i.map((l,o)=>e.jsxs(mi,{custom:o,initial:"hidden",animate:"visible",variants:d,whileHover:{scale:1.02},transition:{type:"spring",stiffness:300,damping:20},children:[e.jsxs(ui,{children:[e.jsx(fi,{children:l.icon}),e.jsx(wi,{children:l.title})]}),e.jsx(yi,{children:a(l.content)})]},l.id))})]})},ji=t.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg, 
    #87CEEB 0%,    /* 天蓝色 */
    #98E4D6 20%,   /* 薄荷绿 */
    #F4E285 40%,   /* 浅黄色 */
    #FFB347 60%,   /* 金橙色 */
    #FF8C69 80%,   /* 珊瑚色 */
    #FFA07A 100%   /* 浅橙色 */
  );
  position: relative;
  overflow-x: hidden;
`,ki=t.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`,Ci=t(s.button)`
  position: absolute;
  top: 10px;
  left: 20px;
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 30px;
  padding: 12px 20px;
  font-size: 16px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  z-index: 1000;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`,zi=t.h1`
  text-align: center;
  font-size: 36px;
  color: #FF6B35;
  margin: 20px 0;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 2px 2px 4px rgba(255, 107, 53, 0.3);
  
  &::before {
    content: '🚌 ';
  }
  
  &::after {
    content: ' ✈️';
  }
`,$i=t.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  border-bottom: 2px solid #e0e0e0;
`,ce=t(s.button)`
  background: ${i=>i.active?"#FF6B35":"transparent"};
  color: ${i=>i.active?"white":"#FF6B35"};
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 25px 25px 0 0;
  transition: all 0.3s ease;
  position: relative;
  margin: 0 5px;
  
  &:hover {
    background: ${i=>i.active?"#FF6B35":"rgba(255, 107, 53, 0.1)"};
    transform: translateY(-2px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${i=>i.active?"#FF6B35":"transparent"};
  }
`,Ie=t.div`
  display: flex;
  justify-content: center;
  background: #f8f9fa;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`,G=t(s.button)`
  background: ${i=>i.active?"#FFB347":"transparent"};
  color: ${i=>i.active?"white":"#666"};
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
  margin: 0 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${i=>i.active?"#FFB347":"rgba(255, 179, 71, 0.2)"};
  }
`,de=t.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`,pe=t(s.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`,xe=t.h2`
  color: #FF6B35;
  font-size: 28px;
  margin-bottom: 20px;
  border-bottom: 3px solid #FFB347;
  padding-bottom: 10px;
  display: inline-block;
`,Ti=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
`,Si=t(s.div)`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  border-left: 5px solid #FFB347;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`,Ii=t.h3`
  color: #FF6B35;
  font-size: 22px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`,Ei=t.div`
  color: #666;
  line-height: 1.6;
  font-size: 16px;
`,Fi=t(s.button)`
  background: linear-gradient(45deg, #FF6B35, #FFB347);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
  }
`,Ee=t.div`
  background: #FFB347;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  margin-left: 10px;
`,Bi=t.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 30px;
`,Pi=t(s.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(255, 165, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 165, 0, 0.1);
`,Mi=t.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #FFB347;
`,Oi=t.div`
  font-size: 24px;
`,Di=t.h2`
  font-size: 22px;
  color: #FF6B35;
  margin: 0;
  font-weight: 700;
`,Ai=t.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 10px;
  background: ${i=>i.checked?"rgba(255, 179, 71, 0.1)":"transparent"};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 179, 71, 0.1);
  }
`,Li=t.div`
  width: 20px;
  height: 20px;
  border: 2px solid #FFB347;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${i=>i.checked?"#FFB347":"white"};
  color: white;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
  
  &:hover {
    background: ${i=>i.checked?"#FF6B35":"#FFB347"};
    transform: scale(1.1);
  }
`,Hi=t.div`
  font-size: 16px;
  color: ${i=>i.checked?"#999":"#555"};
  text-decoration: ${i=>i.checked?"line-through":"none"};
  line-height: 1.5;
  transition: all 0.3s ease;
`,Ri=t.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(255, 165, 0, 0.2);
`,Ki=t.div`
  font-size: 18px;
  color: #FF6B35;
  font-weight: 600;
  margin-bottom: 10px;
`,Ni=t.div`
  background: #e0e0e0;
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
  position: relative;
`,Yi=t.div`
  background: linear-gradient(45deg, #FF6B35, #FFB347);
  height: 100%;
  width: ${i=>i.percentage}%;
  transition: width 0.5s ease;
  border-radius: 10px;
`,Fe=[{id:"pre-departure",title:"出行前准备",icon:"✈️",items:["护照/签证办理","机票预订","住宿预订","旅行保险购买","日元兑换/银行卡准备","手机卡/随身WiFi准备","行李打包（衣物、药品、充电器等）","重要文件复印/电子备份"]},{id:"flight-transport",title:"机票与交通",icon:"🚌",items:["选择出发城市及航班","机票购买平台比价","了解行李托运规定","熟悉值机与登机流程","了解日本入境流程","准备交通卡购买","查询机场换乘信息"]},{id:"japan-itinerary",title:"日本国内行程",icon:"🎌",items:["确定机场到高松的交通方式","查询详细换乘流程","学习购票机使用方法","规划景点交通路线","准备各种路线方案","下载相关交通APP","收藏实用网站链接"]},{id:"schedule-budget",title:"行程安排与预算",icon:"📅",items:["制定每日行程计划","预算分配（交通、住宿、餐饮等）","预订热门景点门票","安排购物时间和地点","制定应急预案","准备离境相关安排"]},{id:"useful-tools",title:"实用工具推荐",icon:"🛠️",items:["Google Maps （路线规划）","Yahoo!乘换案内 （换乘查询）","Google Translate （语言翻译）","日本旅游APP下载","天气预报查询","汇率查询工具","紧急联系方式记录"]},{id:"pilgrimage-specific",title:"圣地巡礼专项",icon:"🌟",items:["女木岛交通及景点信息","男木岛交通及景点信息","直岛交通及景点信息","拍照地点标记","开放时间确认","门票或预约信息","特殊交通工具安排"]}],Vi=()=>{const i=H(),[n,a]=c.useState("international"),[d,l]=c.useState("guangzhou"),[o,h]=c.useState("kansai-takamatsu"),[m,f]=c.useState(new Set),[b,y]=c.useState(!1),[k,$]=c.useState([]);c.useEffect(()=>{fetch("/trafficdata/InDeparture/traffic_cards.json").then(g=>g.json()).then(g=>$(g)).catch(()=>$([]))},[]);const S=()=>{i("/contents")},T=(g,w)=>{const z=`${g}-${w}`;f(r=>{const j=new Set(r);return j.has(z)?j.delete(z):j.add(z),j})},I=()=>Q(ie,null,function*(){y(!0);try{const g=yield fetch("/files/鸟白岛巡礼list.pdf");if(!g.ok)throw new Error("下载失败");const w=yield g.blob(),z=window.URL.createObjectURL(w),r=document.createElement("a");r.style.display="none",r.href=z,r.download="鸟白岛巡礼list.pdf",document.body.appendChild(r),r.click(),window.URL.revokeObjectURL(z),document.body.removeChild(r)}catch(g){alert("下载失败，请稍后再试")}finally{y(!1)}}),v=()=>Fe.reduce((g,w)=>g+w.items.length,0),p=()=>m.size,C=()=>{const g=v(),w=p();return g>0?w/g*100:0},x=()=>{const g=d==="guangzhou"?k.filter(w=>w.category==="international"&&w.subcategory==="guangzhou"):[];return e.jsx(P,{mode:"wait",children:e.jsxs(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:[e.jsxs(Ie,{children:[e.jsx(G,{active:d==="guangzhou",onClick:()=>l("guangzhou"),children:"广州-春秋航空"}),e.jsxs(G,{active:d==="other",onClick:()=>l("other"),children:["其他城市",e.jsx(Ee,{children:"即将开放"})]})]}),e.jsxs(de,{children:[d==="guangzhou"&&g.length>0?e.jsx(vi,{cards:g,title:"国际出行攻略 - 广州春秋航空"}):d==="guangzhou"&&e.jsx("div",{style:{textAlign:"center",padding:"40px",color:"#666"},children:"暂无攻略数据"}),d==="other"&&e.jsxs(pe,{children:[e.jsx(xe,{children:"其他城市攻略"}),e.jsxs("div",{style:{textAlign:"center",padding:"60px 0"},children:[e.jsx("div",{style:{fontSize:"48px",marginBottom:"20px"},children:"🚧"}),e.jsx("h3",{style:{color:"#FF6B35",marginBottom:"15px"},children:"内容准备中"}),e.jsxs("p",{style:{color:"#666",fontSize:"18px"},children:["我们正在整理更多城市的交通攻略，包括：",e.jsx("br",{}),"北京、上海、深圳、成都、杭州等主要城市"]})]})]})]})]},"international")})},F=()=>{const g=k.filter(w=>w.category==="domestic"&&w.subcategory==="kansai-takamatsu");return e.jsx(P,{mode:"wait",children:e.jsxs(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:[e.jsxs(Ie,{children:[e.jsx(G,{active:o==="kansai-takamatsu",onClick:()=>h("kansai-takamatsu"),children:"关西机场→高松（电车）"}),e.jsxs(G,{active:o==="other",onClick:()=>h("other"),children:["其他路线",e.jsx(Ee,{children:"即将开放"})]})]}),e.jsxs(de,{children:[o==="kansai-takamatsu"&&e.jsx(Ti,{children:g.sort((w,z)=>w.order_index-z.order_index).map(w=>e.jsxs(Si,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1*w.order_index},children:[e.jsxs(Ii,{children:[e.jsx("span",{children:w.icon}),w.title]}),e.jsx(Ei,{children:w.content.split(`
`).map((z,r)=>e.jsx("div",{children:z},r))})]},w.id))}),o==="other"&&e.jsxs(pe,{children:[e.jsx(xe,{children:"其他路线攻略"}),e.jsxs("div",{style:{textAlign:"center",padding:"60px 0"},children:[e.jsx("div",{style:{fontSize:"48px",marginBottom:"20px"},children:"🚧"}),e.jsx("h3",{style:{color:"#FF6B35",marginBottom:"15px"},children:"内容准备中"}),e.jsxs("p",{style:{color:"#666",fontSize:"18px"},children:["我们正在整理更多交通方式，包括：",e.jsx("br",{}),"大巴路线、轮船路线、租车自驾等"]})]})]})]})]},"domestic")})},M=()=>e.jsx(P,{mode:"wait",children:e.jsx(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:e.jsx(de,{children:e.jsxs(pe,{children:[e.jsx(xe,{children:"巡礼任务清单"}),e.jsxs("div",{style:{textAlign:"center",marginBottom:"40px"},children:[e.jsxs("p",{style:{fontSize:"18px",color:"#666",marginBottom:"30px"},children:["为帮助零经验网友顺利完成圣地巡礼计划，我们特别制作了详细的任务清单。",e.jsx("br",{}),"建议下载PDF版本并打印，逐项打勾确保每一步都不遗漏。"]}),e.jsx(Fi,{onClick:I,disabled:b,whileHover:{scale:1.05},whileTap:{scale:.95},children:b?"📄 下载中...":"📄 下载巡礼清单"})]}),e.jsxs(Ri,{children:[e.jsxs(Ki,{children:["完成进度：",p()," / ",v()," 项 (",Math.round(C()),"%)"]}),e.jsx(Ni,{children:e.jsx(Yi,{percentage:C()})})]}),e.jsx(Bi,{children:Fe.map(g=>e.jsxs(Pi,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.6},children:[e.jsxs(Mi,{children:[e.jsx(Oi,{children:g.icon}),e.jsx(Di,{children:g.title})]}),g.items.map((w,z)=>{const r=`${g.id}-${z}`,j=m.has(r);return e.jsxs(Ai,{checked:j,children:[e.jsx(Li,{checked:j,onClick:()=>T(g.id,z),children:j&&"✓"}),e.jsx(Hi,{checked:j,children:w})]},z)})]},g.id))})]})})},"checklist")});return e.jsxs(ji,{children:[e.jsxs(ki,{children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx(Ci,{onClick:S,whileHover:{scale:1.05},whileTap:{scale:.95},children:"🏠 返回目录"}),e.jsx(zi,{children:"Summer Pockets 交通攻略"})]}),e.jsxs($i,{children:[e.jsx(ce,{active:n==="international",onClick:()=>a("international"),children:"国际出发"}),e.jsx(ce,{active:n==="domestic",onClick:()=>a("domestic"),children:"日本国内出发"}),e.jsx(ce,{active:n==="checklist",onClick:()=>a("checklist"),children:"巡礼任务清单"})]})]}),n==="international"&&x(),n==="domestic"&&F(),n==="checklist"&&M()]})},Ui=t.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(
    135deg, 
    #87CEEB 0%,    /* 天蓝色 */
    #98E4D6 20%,   /* 薄荷绿 */
    #F4E285 40%,   /* 浅黄色 */
    #FFB347 60%,   /* 金橙色 */
    #FF8C69 80%,   /* 珊瑚色 */
    #FFA07A 100%   /* 浅橙色 */
  );
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  padding-top: 30px;
  padding-bottom: 40px;
`,_i=t.div`
  text-align: center;
  margin-bottom: 30px;
`,Xi=t.h1`
  font-size: 48px;
  color: #5d4037;
  margin-bottom: 10px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
`,Wi=t.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`,Qi=t(s.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px 30px;
  margin: 20px auto 30px auto;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`,Gi=t.p`
  font-size: 16px;
  color: #5d4037;
  line-height: 1.6;
  margin: 0;
  text-align: center;
  font-weight: 500;
`,qi=t(s.div)`
  text-align: center;
  margin: 20px auto;
  max-width: 800px;
  width: 90%;
`,Ji=t(s.button)`
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 15px;
  padding: 15px 25px;
  font-size: 18px;
  color: #5d4037;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  font-weight: 600;
  font-family: 'KaiTi', 'SimKai', serif;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`,Zi=t(s.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 20px;
`,en=t(s.div)`
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
`,tn=t.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`,nn=t.h3`
  font-size: 20px;
  color: #5d4037;
  margin-bottom: 10px;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`,on=t.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
`,an=t.a`
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  color: #2E8B57;
  text-decoration: none;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(135, 206, 235, 0.3);
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
    color: #2E8B57;
  }
`,rn=t.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 95%;
  margin: 0 auto 30px auto;
`,sn=t(s.div)`
  background: rgba(255, 255, 255, ${i=>i.selected?"1":"0.95"});
  border-radius: 20px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: ${i=>i.selected?"0 10px 30px rgba(255, 165, 0, 0.4)":"0 8px 25px rgba(0, 0, 0, 0.15)"};
  backdrop-filter: blur(20px);
  width: 250px;
  cursor: pointer;
  border: ${i=>i.selected?"3px solid #FFA500":"none"};
`,ln=t.div`
  font-size: ${i=>i.iconSize||60}px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: ${i=>i.iconSize||60}px;
    height: ${i=>i.iconSize||60}px;
    object-fit: contain;
  }
`,cn=t.h3`
  font-size: 24px;
  color: #5d4037;
  margin-bottom: 10px;
  font-weight: 700;
`,dn=t.p`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 15px;
`,pn=t.div`
  background: linear-gradient(45deg, #87ceeb, #add8e6);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
`,xn=t.div`
  width: 95%;
  max-width: 1200px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`,gn=t.div`
  width: 100%;
  height: 900px;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`,bn=t.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`,hn=t.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`,ge=t(s.div)`
  position: absolute;
  font-size: 30px;
  cursor: pointer;
  left: ${i=>i.x}%;
  top: ${i=>i.y}%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
`,Be=t.div`
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translate(-50%, -100%);
  background: #fff;
  color: #333;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 12px 16px;
  min-width: 180px;
  max-width: 280px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  opacity: 0.98;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -14px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top: 14px solid #fff;
  }
`,mn=t.div`
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translate(-50%, -100%);
  background: #fff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  padding: 8px 12px;
  min-width: 80px;
  max-width: 120px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  opacity: 0.98;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #fff;
  }
`,be=t.div`
  font-size: 16px;
  font-weight: 700;
  color: #5d4037;
  margin-bottom: 4px;
  text-align: center;
`,Pe=t.div`
  font-size: 14px;
  color: #666;
  text-align: center;
`,un=t.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`,fn=t(s.button)`
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 15px 25px;
  font-size: 18px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`,wn=t(s.button)`
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 15px 25px;
  font-size: 18px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`,Me=t(s.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`,Oe=t(s.div)`
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
`,yn=t.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`,De=t.img`
  width: 100%;
  height: auto;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`,Ae=t.p`
  font-size: 16px;
  color: #5d4037;
  text-align: center;
  margin: 0;
  font-weight: 500;
  line-height: 1.6;
`,Le=[{id:"megijima",name:"女木岛",icon:"👹",description:"以鬼岛传说而闻名的小岛，欧线的重要巡礼点",position:{x:76,y:70}},{id:"ogijima",name:"男木岛",icon:"images/webps/男木岛/男木岛-灯塔图标.webp",iconType:"image",iconSize:80,description:"宁静的渔村小岛，与主角团相遇的主要地点。",position:{x:75,y:45}},{id:"naoshima",name:"直岛",icon:"🎨",description:"现代艺术的圣地，汇集了众多知名艺术家的作品和美术馆。",position:{x:12,y:20}}],vn=()=>{const i=H(),[n,a]=c.useState(null),[d,l]=c.useState(!1),[o,h]=c.useState(!1),[m,f]=c.useState(!1),[b,y]=c.useState(null),k=x=>{a(x.id),i(`/${x.id}`)},$=()=>{l(!0)},S=()=>{l(!1)},T=()=>{f(!1)},I=()=>{i("/contents")},v=()=>{i("/other-pilgrimage")},p=()=>{h(!0)},C=()=>{h(!1)};return e.jsxs(Ui,{children:[e.jsx(_i,{children:e.jsxs(s.div,{initial:{opacity:0,y:-30},animate:{opacity:1,y:0},transition:{duration:.8},children:[e.jsx(Xi,{children:"打卡篇"}),e.jsx(Wi,{children:"唯有那片炫目，始终无法忘却"})]})}),e.jsx(Qi,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.3},children:e.jsxs(Gi,{children:[e.jsx("strong",{style:{fontSize:"18px",color:"#ff6b35",display:"block",marginBottom:"8px"},children:"小建议"}),"正式打卡前，建议先把打卡点的游戏CG照片洗出来，到地点后一一比对拍照即可。",e.jsx("span",{style:{display:"block",marginTop:"8px"},children:"避免手机频繁切换页面影响体验，让手机专注于拍照。"}),e.jsx("span",{style:{display:"block",marginTop:"8px"},children:"各岛屿页面可右键下载需要的游戏CG。"})]})}),e.jsx(rn,{children:Le.map((x,F)=>e.jsxs(sn,{selected:n===x.id,initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.6,delay:F*.15},whileHover:{scale:1.05,y:-5},whileTap:{scale:.95},onClick:()=>k(x),children:[e.jsx(ln,{iconSize:x.iconSize,children:x.iconType==="image"?e.jsx("img",{src:x.icon,alt:x.name}):x.icon}),e.jsx(cn,{children:x.name}),e.jsx(dn,{children:x.description}),e.jsx(pn,{children:"点击前往"})]},x.name))}),e.jsx(qi,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.4},children:e.jsx(Ji,{onClick:p,whileHover:{scale:1.05},whileTap:{scale:.95},children:"📱 打卡地点合集"})}),e.jsx(s.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.5},children:e.jsx(xn,{children:e.jsxs(gn,{children:[e.jsx(bn,{src:"images/webps/打卡篇地图-航线版.webp",alt:"瀬戸内海地图"}),e.jsxs(hn,{children:[e.jsxs(ge,{x:76,y:90,initial:{scale:0},animate:{scale:1},transition:{delay:1,duration:.5},whileHover:{scale:1.2},onClick:()=>f(!0),onMouseEnter:()=>{y({x:76,y:90,title:"高松港",desc:"前往各岛屿的起点港口，点击查看时刻表"})},onMouseLeave:()=>y(null),children:["🚢",b&&b.title==="高松港"&&e.jsxs(Be,{children:[e.jsx(be,{children:b.title}),e.jsx(Pe,{children:b.desc})]})]}),e.jsxs(ge,{x:91,y:60,initial:{scale:0},animate:{scale:1},transition:{delay:1.5,duration:.5},whileHover:{scale:1.2},onClick:$,title:"鸟白岛",onMouseEnter:()=>{y({x:91,y:60,title:"鸟白岛",desc:"只能在航行过程中拍摄的神秘岛屿"})},onMouseLeave:()=>y(null),children:["❗❗❗",b&&b.title==="鸟白岛"&&e.jsx(mn,{children:e.jsx(be,{children:b.title})})]}),Le.map((x,F)=>e.jsxs(ge,{x:x.position.x,y:x.position.y,initial:{scale:0},animate:{scale:1},transition:{delay:1.2+F*.2,duration:.5},whileHover:{scale:1.2},onClick:()=>k(x),onMouseEnter:()=>{y({x:x.position.x,y:x.position.y,title:x.name,desc:x.description})},onMouseLeave:()=>y(null),children:[x.iconType==="image"?e.jsx("img",{src:x.icon,alt:x.name}):x.icon,b&&b.title===x.name&&e.jsxs(Be,{children:[e.jsx(be,{children:b.title}),e.jsx(Pe,{children:b.desc})]})]},x.id))]})]})})}),e.jsxs(un,{children:[e.jsx(fn,{onClick:I,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,x:-30},animate:{opacity:1,x:0},transition:{delay:1},children:"返回目录"}),e.jsx(wn,{onClick:v,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,x:30},animate:{opacity:1,x:0},transition:{delay:1.2},children:"其他巡礼"})]}),e.jsx(P,{children:d&&e.jsx(Me,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:S,children:e.jsxs(Oe,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{duration:.3},onClick:x=>x.stopPropagation(),children:[e.jsx(De,{src:"images/webps/鸟白岛总览.webp",alt:"鸟白岛总览",onError:x=>{}}),e.jsx(Ae,{children:"只能在航行过程中拍摄"})]})})}),e.jsx(P,{children:o&&e.jsx(Zi,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:C,children:e.jsxs(en,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{duration:.3},onClick:x=>x.stopPropagation(),children:[e.jsx(tn,{src:"images/webps/打卡地点合集.webp",alt:"打卡地点合集二维码",onError:x=>{}}),e.jsx(nn,{children:"打卡地点合集"}),e.jsx(on,{children:"扫描二维码获取完整的打卡地点图片合集"}),e.jsx(an,{href:"https://pan.baidu.com/s/1BdmKigMJMb4y1q6RNLO2oA?pwd=sprb",target:"_blank",rel:"noopener noreferrer",children:"📥 直接下载打卡地点合集"})]})})}),e.jsx(P,{children:m&&e.jsx(Me,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:T,children:e.jsxs(Oe,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{duration:.3},onClick:x=>x.stopPropagation(),children:[e.jsx(yn,{onClick:T,children:"×"}),e.jsx(De,{src:"images/webps/高松发船时刻表.webp",alt:"高松发船时刻表",onError:x=>{}}),e.jsx(Ae,{children:"高松港发船时刻表"})]})})})]})},jn=t.div`
  min-height: 100vh;
  background: linear-gradient(
    160deg,
    #223a5c 0%,         /* 深蓝 */
    #0a192f 40%,        /* 黑蓝 */
    #0c1446 70%,        /* 藏青 */
    #050a1f 100%        /* 纯黑蓝 */
  );
  padding: 20px;
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,kn=t(s.button)`
  position: fixed;
  top: 30px;
  left: 30px;
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 15px 25px;
  font-size: 18px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`,Cn=t.h1`
  font-size: 48px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: 700;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 3px 3px 12px rgba(0,0,0,0.45);
  text-align: center;
`,zn=t.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  max-width: 600px;
  backdrop-filter: blur(10px);
`,he=t.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  line-height: 1.6;
  margin: 0 0 20px 0;
`,$n=t.div`
  background: linear-gradient(45deg, #533483, #7209b7);
  color: #fff;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  display: inline-block;
  box-shadow: 0 4px 16px rgba(123, 9, 183, 0.3);
  margin-top: 20px;
`,Tn=()=>{const i=H(),n=()=>{i("/contents")};return e.jsxs(jn,{children:[e.jsx(Cn,{children:"神域"}),e.jsxs(zn,{children:[e.jsx(he,{children:"🌙 神域功能正在开发中..."}),e.jsx(he,{children:"这里将是一个神秘的夜晚世界，充满了七影蝶的魔法与奇迹。"}),e.jsx(he,{children:"敬请期待即将到来的神域体验！"}),e.jsx($n,{children:"✨ Coming Soon ✨"})]}),e.jsx(kn,{onClick:n,whileHover:{scale:1.05},whileTap:{scale:.95},children:"🏠 返回目录"})]})},Sn=t.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg, 
    #87CEEB 0%,    /* 天蓝色 */
    #98E4D6 20%,   /* 薄荷绿 */
    #F4E285 40%,   /* 浅黄色 */
    #FFB347 60%,   /* 金橙色 */
    #FF8C69 80%,   /* 珊瑚色 */
    #FFA07A 100%   /* 浅橙色 */
  );
  padding: 20px;
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,In=t.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 10;
`,En=t(s.button)`
  position: fixed;
  top: 30px;
  left: 30px;
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 15px 25px;
  font-size: 18px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`,Fn=t.h1`
  font-size: 48px;
  color: #FF6B35;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 3px 3px 6px rgba(255, 107, 53, 0.3);
  
  &::before {
    content: '🌸 ';
  }
  
  &::after {
    content: ' 🌸';
  }
`,Bn=t(s.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 15px 40px rgba(255, 165, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 165, 0, 0.2);
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`,Pn=t.div`
  font-size: 120px;
  margin-bottom: 30px;
  opacity: 0.8;
`,Mn=t.h2`
  font-size: 32px;
  color: #FF6B35;
  margin-bottom: 20px;
  font-weight: 600;
  font-family: 'KaiTi', 'SimKai', serif;
`,On=t.p`
  font-size: 20px;
  color: #666;
  line-height: 1.8;
  font-family: 'KaiTi', 'SimKai', serif;
  margin-bottom: 30px;
`,Dn=t.div`
  text-align: left;
  max-width: 500px;
  margin: 0 auto;
`,U=t.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  font-size: 18px;
  color: #555;
  border-bottom: 1px solid rgba(255, 165, 0, 0.2);
`,_=t.span`
  font-size: 24px;
  width: 30px;
  text-align: center;
`,me=t(s.div)`
  position: absolute;
  font-size: 60px;
  opacity: 0.6;
  z-index: 5;
`,An=()=>{const i=H(),n=()=>{i("/checkin")};return e.jsxs(Sn,{children:[e.jsx(me,{style:{top:"10%",left:"10%"},animate:{y:[0,-30,0],rotate:[0,10,-10,0],scale:[1,1.1,1]},transition:{duration:8,repeat:1/0},children:"🌸"}),e.jsx(me,{style:{top:"20%",right:"15%"},animate:{y:[0,25,0],rotate:[0,-15,15,0],scale:[1,.9,1]},transition:{duration:6,repeat:1/0},children:"🎪"}),e.jsx(me,{style:{bottom:"15%",left:"20%"},animate:{y:[0,-20,0],rotate:[0,8,-8,0]},transition:{duration:7,repeat:1/0},children:"🎭"}),e.jsx(En,{onClick:n,whileHover:{scale:1.05},whileTap:{scale:.95},children:"🏠 返回打卡篇"}),e.jsx(In,{children:e.jsx(Fn,{children:"其他巡礼"})}),e.jsxs(Bn,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8},children:[e.jsx(Pn,{children:"🚧"}),e.jsx(Mn,{children:"页面开发中..."}),e.jsxs(On,{children:["正在为您精心准备更多精彩的圣地巡礼内容！",e.jsx("br",{}),"敬请期待即将到来的全新体验。"]}),e.jsxs(Dn,{children:[e.jsxs(U,{children:[e.jsx(_,{children:"🏛️"}),e.jsx("span",{children:"特色建筑巡礼"})]}),e.jsxs(U,{children:[e.jsx(_,{children:"🍜"}),e.jsx("span",{children:"美食探索地图"})]}),e.jsxs(U,{children:[e.jsx(_,{children:"🎨"}),e.jsx("span",{children:"文化体验活动"})]}),e.jsxs(U,{children:[e.jsx(_,{children:"📸"}),e.jsx("span",{children:"摄影打卡指南"})]}),e.jsxs(U,{children:[e.jsx(_,{children:"🛍️"}),e.jsx("span",{children:"购物推荐清单"})]})]})]})]})},He=t.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`,Ln=t.div`
  position: relative;
  width: 100%;
  height: 100%;
`,Hn=t(s.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  cursor: none !important; /* 🦋 使用蝴蝶鼠标 */
  transition: none; /* 🔧 移除CSS transition，避免与framer-motion冲突 */
`,Rn=t.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.6) 100%
  );
  pointer-events: none;
`,Kn=t(s.div)`
  position: absolute;
  bottom: 10px;
  left: 15px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  z-index: 10;
`,Nn=t.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 10;
`,Yn=t(s.button)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${i=>i.active?"rgba(255, 255, 255, 0.9)":"rgba(255, 255, 255, 0.4)"};
  cursor: none !important; /* 🦋 使用蝴蝶鼠标 */
  transition: none; /* 🔧 移除CSS transition，避免与framer-motion冲突 */
`,ye=({images:i,title:n,autoPlay:a=!0,interval:d=3e3,onImageClick:l,isPlaying:o,onPlayPauseChange:h})=>{const[m,f]=c.useState(0),[b,y]=c.useState(a),k=o!==void 0?o:b;c.useEffect(()=>{if(!k||i.length<=1)return;const S=setInterval(()=>{f(T=>(T+1)%i.length)},d);return()=>clearInterval(S)},[k,i.length,d]);const $=()=>{l&&l(m)};return i.length===0?e.jsx(He,{children:e.jsx("div",{style:{width:"100%",height:"100%",background:"#f0f0f0",display:"flex",alignItems:"center",justifyContent:"center",color:"#666",fontSize:"14px"},children:"暂无图片"})}):e.jsx(He,{children:e.jsxs(Ln,{children:[e.jsx(P,{mode:"wait",children:e.jsx(Hn,{src:i[m].src,alt:`${n} - ${i[m].label}`,clickable:!!l,onClick:$,initial:{opacity:0,x:50},animate:{opacity:1,x:0},exit:{opacity:0,x:-50},whileHover:l?{scale:1.02}:{},transition:{duration:.5,ease:"easeInOut",scale:{type:"spring",stiffness:400,damping:25,duration:.15}}},m)}),e.jsx(Rn,{}),e.jsx(Kn,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.3},children:i[m].label},`label-${m}`),i.length>1&&e.jsx(Nn,{children:i.map((S,T)=>e.jsx(Yn,{active:T===m,onClick:()=>f(T),whileHover:{scale:1.1,background:"rgba(255, 255, 255, 0.7)"},whileTap:{scale:.95},transition:{type:"spring",stiffness:400,damping:25,duration:.15}},T))})]})})},Vn=t.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    135deg, 
    #87CEEB 0%,    /* 天蓝色 */
    #98E4D6 20%,   /* 薄荷绿 */
    #F4E285 40%,   /* 浅黄色 */
    #FFB347 60%,   /* 金橙色 */
    #FF8C69 80%,   /* 珊瑚色 */
    #FFA07A 100%   /* 浅橙色 */
  );
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  padding-top: 30px;
  padding-bottom: 40px;
`,Un=t.div`
  text-align: center;
  margin-bottom: 40px;
`,_n=t.h1`
  font-size: 48px;
  color: #5d4037;
  margin-bottom: 10px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`,Re=t.span`
  font-size: 60px;
`,Xn=t.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`,Wn=t.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`,Ke=t(s.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 107, 53, 0.05) 0%,
      rgba(135, 206, 235, 0.05) 50%,
      rgba(152, 228, 214, 0.05) 100%
    );
    z-index: -1;
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`,Qn=t.h3`
  font-size: 28px;
  color: #5d4037;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
`,K=t.p`
  font-size: 18px;
  color: #444;
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: left;
  text-indent: 2em;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(180deg, #ff6b35, #ffa500);
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`,Gn=t.div`
  width: fit-content;
  max-width: 95%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`,qn=t.div`
  width: fit-content;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`,Jn=t.img`
  width: ${i=>i.scale*800}px;
  max-width: 100vw;
  height: auto;
  border-radius: 20px;
  display: block;
`,Zn=t.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  pointer-events: none;
`,q=t(s.div)`
  position: absolute;
  font-size: ${i=>i.iconSize}px;
  cursor: pointer;
  left: ${i=>i.x}%;
  top: ${i=>i.y}%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: auto;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
`,J=t.div`
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translate(-50%, -100%);
  background: #fff;
  color: #333;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 16px 10px 12px 10px; /* 减小左右padding */
  min-width: 220px;
  max-width: 320px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  opacity: 0.98;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -14px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top: 14px solid #fff;
  }
`,Z=t.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
`,ee=t.div`
  font-size: 16px;
  font-weight: 700;
  color: #5d4037;
  margin-bottom: 4px;
  text-align: center;
`,te=t.div`
  font-size: 14px;
  color: #666;
  text-align: center;
`,ue={mountainUP:{image:"images/webps/女木岛/女木岛-秘密基地山路.webp",desc:"通往秘密基地的山路"},mountainDOWN:{image:"images/webps/女木岛/女木岛-山道.webp",desc:"和苍引导七影碟的山道"},cave:{image:"images/webps/女木岛/女木岛-采石场入口.webp",desc:"与鸥冒险的采石场入口"}},eo=t.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
  max-height: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
  
  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-height: 600px;
  }
  
  @media (max-width: 1024px) and (min-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
    max-height: 400px;
  }
`,to=t(s.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`,io=t.h4`
  padding: 15px 15px 5px 15px;
  font-size: 18px;
  color: #5d4037;
  text-align: center;
  margin: 0;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
`,no=t.p`
  padding: 5px 15px 15px 15px;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`,oo=t.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`,ao=t(s.button)`
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 15px 25px;
  font-size: 18px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`,ro=t(s.button)`
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  font-size: 16px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`,so=t(s.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,lo=t(s.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`,co=t.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`,po=t.div`
  text-align: center;
  color: #333;
`,xo=t.h3`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #5d4037;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`,go=t.p`
  font-size: 18px;
  margin: 0;
  color: #666;
  font-weight: 500;
`,Ne=t(s.button)`
  position: absolute;
  top: 50%;
  ${i=>i.direction==="prev"?"left: -60px;":"right: -60px;"}
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 24px;
  cursor: none !important; /* 🦋 使用蝴蝶鼠标 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: none; /* 🔧 移除CSS transition，避免与framer-motion冲突 */
  
  @media (max-width: 768px) {
    ${i=>i.direction==="prev"?"left: 10px;":"right: 10px;"}
    top: auto;
    bottom: 20px;
  }
`,bo=t.div`
  display: flex;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  backdrop-filter: blur(10px);
`,Ye=t(s.button)`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  background: ${i=>i.active?i.tabType==="intro"?"linear-gradient(135deg, #ff6b35, #ffa500)":"linear-gradient(135deg, #87ceeb, #98e4d6)":"transparent"};
  color: ${i=>i.active?i.tabType==="intro"?"white":"#2e8b57":"#8d6e63"};
  font-size: 18px;
  font-weight: 600;
  font-family: 'KaiTi', 'SimKai', serif;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${i=>i.active?i.tabType==="intro"?"0 6px 20px rgba(255, 107, 53, 0.3)":"0 6px 20px rgba(135, 206, 235, 0.3)":"none"};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.3), 
      transparent
    );
    transition: left 0.8s ease;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${i=>i.tabType==="intro"?"linear-gradient(135deg, #ff8a50, #ffb347)":"linear-gradient(135deg, #98d8eb, #a8e6d2)"};
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 10px;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${i=>i.tabType==="intro"?"0 8px 25px rgba(255, 107, 53, 0.4)":"0 8px 25px rgba(135, 206, 235, 0.4)"};
    
    &::before {
      left: 100%;
    }
    
    &::after {
      opacity: ${i=>i.active?0:.6};
    }
  }
  
  &:active {
    transform: translateY(0);
    transition: transform 0.1s ease;
  }
`,Ve=t(s.div)`
  width: 100%;
`,ho=({isOpen:i,onClose:n,images:a,currentIndex:d,onPrevious:l,onNext:o,title:h})=>{var m,f,b;return!i||a.length===0?null:e.jsx(P,{children:e.jsx(so,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:n,children:e.jsxs(lo,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},onClick:y=>y.stopPropagation(),children:[a.length>1&&e.jsxs(e.Fragment,{children:[e.jsx(Ne,{direction:"prev",onClick:l,whileHover:{scale:1.05,background:"rgba(255, 255, 255, 0.2)",borderColor:"rgba(255, 255, 255, 0.5)"},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:25,duration:.15},style:{transformOrigin:"center"},children:"‹"}),e.jsx(Ne,{direction:"next",onClick:o,whileHover:{scale:1.05,background:"rgba(255, 255, 255, 0.2)",borderColor:"rgba(255, 255, 255, 0.5)"},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:25,duration:.15},style:{transformOrigin:"center"},children:"›"})]}),e.jsx(co,{src:(m=a[d])==null?void 0:m.src,alt:`${h} - ${(f=a[d])==null?void 0:f.label}`}),e.jsxs(po,{children:[e.jsx(xo,{children:h}),e.jsx(go,{children:(b=a[d])==null?void 0:b.label})]})]})})})},mo=()=>{const i=H(),[n,a]=c.useState({isOpen:!1,images:[],currentIndex:0,title:""}),[d,l]=c.useState("intro"),[o,h]=c.useState(null),[m,f]=c.useState(!0),b={scale:.6,icons:{cave:{x:66,y:38},bus:{x:73,y:66},mountainUP:{x:65,y:33},mountainDOWN:{x:70,y:43}},sizes:{cave:30,mountainUP:35,bus:35,mountainDOWN:35}},y=[{title:"秘密基地山路",description:"通往秘密基地的山路",images:[{src:"images/webps/女木岛/女木岛-秘密基地山路.webp",label:"白天"},{src:"images/webps/女木岛/女木岛-秘密基地山路-黄昏.webp",label:"黄昏"},{src:"images/webps/女木岛/女木岛-秘密基地山路-夜晚.webp",label:"夜晚"},{src:"images/webps/女木岛/女木岛-秘密基地山路-深夜.webp",label:"深夜"}]},{title:"山道",description:"苍捕捉七影碟的地点",images:[{src:"images/webps/女木岛/女木岛-山道.webp",label:"白天"},{src:"images/webps/女木岛/女木岛-山道-黄昏.webp",label:"黄昏"},{src:"images/webps/女木岛/女木岛-山道-夜晚.webp",label:"夜晚"},{src:"images/webps/女木岛/女木岛-山道-深夜.webp",label:"深夜"}]},{title:"采石场入口",description:"欧线的重要场所",images:[{src:"images/webps/女木岛/女木岛-采石场入口.webp",label:"白天"},{src:"images/webps/女木岛/女木岛-采石场入口-黄昏.webp",label:"黄昏"},{src:"images/webps/女木岛/女木岛-采石场入口-夜晚.webp",label:"夜晚"}]},{title:"采石场分岔路",description:"采石场内部第一站",images:[{src:"images/webps/女木岛/女木岛-采石场-分岔路-有光.webp",label:"有光"},{src:"images/webps/女木岛/女木岛-采石场-分岔路-无光.webp",label:"无光"}]},{title:"窄路",description:"采石场的一条窄路",images:[{src:"images/webps/女木岛/女木岛-窄路-有光.webp",label:"有光"},{src:"images/webps/女木岛/女木岛-窄路-无光.webp",label:"无光"}]}],k=()=>{i("/checkin")},$=(p,C,x)=>{a({isOpen:!0,images:p,currentIndex:C,title:x})},S=()=>{a(p=>D(O({},p),{isOpen:!1}))},T=()=>{a(p=>D(O({},p),{currentIndex:(p.currentIndex-1+p.images.length)%p.images.length}))},I=()=>{a(p=>D(O({},p),{currentIndex:(p.currentIndex+1)%p.images.length}))},v=p=>{let C="",x=[];switch(p){case"cave":C="采石场入口",x=[{src:"images/webps/女木岛/女木岛-采石场入口.webp",label:"与鸥冒险的采石场入口"}];break;case"mountainUP":C="秘密基地山路",x=[{src:"images/webps/女木岛/女木岛-秘密基地山路.webp",label:"通往秘密基地的山路"}];break;case"mountainDOWN":C="山道",x=[{src:"images/webps/女木岛/女木岛-山道.webp",label:"苍引导七影碟的山道"}];break;case"bus":C="公交时刻表",x=[{src:"images/webps/女木岛/女木岛-公交时间表.webp",label:"女木岛公交时刻表"}];break}C&&x.length>0&&$(x,0,C)};return e.jsxs(Vn,{children:[e.jsx(Un,{children:e.jsxs(s.div,{initial:{opacity:0,y:-30},animate:{opacity:1,y:0},transition:{duration:.8},children:[e.jsxs(_n,{children:[e.jsx(Re,{children:"👹"}),"女木岛",e.jsx(Re,{children:"👹"})]}),e.jsx(Xn,{children:"神秘的传说鬼岛"})]})}),e.jsxs(Wn,{children:[e.jsxs(Ke,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.2},children:[e.jsxs(bo,{children:[e.jsx(Ye,{active:d==="intro",tabType:"intro",onClick:()=>l("intro"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🏝️ 岛屿介绍"}),e.jsx(Ye,{active:d==="guide",tabType:"guide",onClick:()=>l("guide"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🗺️ 巡礼说明"})]}),e.jsx(P,{mode:"wait",children:d==="intro"?e.jsx(Ve,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:e.jsxs(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[e.jsx(K,{children:"拥有鬼岛大洞窟和桃太郎传说的观光岛屿"}),e.jsxs(K,{children:["女木岛坐落于高松市北部，从高松港乘坐渡轮大约20分钟即可到达。",e.jsx("br",{})]}),e.jsx(K,{children:"岛中央为“阿利比克峰”，传说鬼族曾在此隐居，女木岛因此又称“鬼岛”。"}),e.jsx(K,{children:"女木岛有一个名为“鬼岛大洞窟”的采石场遗迹，这里是鸥探险的原型。从港口到鬼岛大洞窟可以乘坐接送巴士。"})]})},"intro"):e.jsx(Ve,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:e.jsxs(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[e.jsx(K,{children:"女木岛的巡礼场景集中在鬼岛大洞窟及其附近，可在女木港搭乘公交快速到达巡礼地点，步行会在路上耗费过多时间和体力。"}),e.jsx(K,{children:"女木岛共有五个巡礼点，分别是，秘密基地山路，山道，采石场入口，采石场分岔路，窄路。"}),e.jsx(K,{children:"其他说明：海边钢琴属于海盗船原型。"})]})},"guide")})]}),e.jsx(s.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.4},children:e.jsx(Gn,{children:e.jsxs(qn,{children:[e.jsx(Jn,{scale:b.scale,src:"images/webps/女木岛/女木岛地图-线路版.webp",alt:"女木岛地图"}),e.jsxs(Zn,{children:[e.jsxs(q,{x:b.icons.cave.x,y:b.icons.cave.y,iconSize:b.sizes.cave,initial:{scale:0},animate:{scale:1},transition:{delay:1,duration:.5},whileHover:{scale:1.2},title:"山洞",onMouseEnter:()=>{const p=ue.cave;p&&h({x:b.icons.cave.x,y:b.icons.cave.y,title:"山洞",image:p.image,desc:p.desc})},onMouseLeave:()=>h(null),onClick:()=>v("cave"),style:{zIndex:15,cursor:"pointer"},children:[e.jsx("img",{src:"images/webps/女木岛/女木岛-山洞.webp",alt:"山洞",style:{width:`${b.sizes.cave}px`,height:`${b.sizes.cave}px`,borderRadius:"50%",objectFit:"cover"}}),o&&o.title==="山洞"&&e.jsxs(J,{children:[e.jsx(Z,{src:o.image,alt:o.title}),e.jsx(ee,{children:o.title}),e.jsx(te,{children:o.desc})]})]}),e.jsxs(q,{x:b.icons.bus.x,y:b.icons.bus.y,iconSize:b.sizes.bus,initial:{scale:0},animate:{scale:1},transition:{delay:1.2,duration:.5},whileHover:{scale:1.2},title:"公交/渡轮站",onMouseEnter:()=>{h({x:b.icons.bus.x,y:b.icons.bus.y,title:"公交/渡轮站",image:"images/webps/女木岛/女木岛-公交时间表.webp",desc:"前往女木岛的交通枢纽"})},onMouseLeave:()=>h(null),onClick:()=>v("bus"),style:{zIndex:25,cursor:"pointer"},children:["🚌",o&&o.title==="公交/渡轮站"&&e.jsxs(J,{children:[e.jsx(Z,{src:o.image,alt:o.title}),e.jsx(ee,{children:o.title}),e.jsx(te,{children:o.desc})]})]}),e.jsxs(q,{x:b.icons.mountainUP.x,y:b.icons.mountainUP.y,iconSize:b.sizes.mountainUP,initial:{scale:0},animate:{scale:1},transition:{delay:1.4,duration:.5},whileHover:{scale:1.2},title:"秘密基地山路",onMouseEnter:()=>{const p=ue.mountainUP;p&&h({x:b.icons.mountainUP.x,y:b.icons.mountainUP.y,title:"秘密基地山路",image:p.image,desc:p.desc})},onMouseLeave:()=>h(null),onClick:()=>v("mountainUP"),style:{zIndex:10,cursor:"pointer"},children:[e.jsx("img",{src:"images/webps/女木岛/女木岛-山路地标.webp",alt:"秘密基地山路",style:{width:`${b.sizes.mountainUP}px`,height:`${b.sizes.mountainUP}px`,borderRadius:"50%",objectFit:"cover"}}),o&&o.title==="秘密基地山路"&&e.jsxs(J,{children:[e.jsx(Z,{src:o.image,alt:o.title}),e.jsx(ee,{children:o.title}),e.jsx(te,{children:o.desc})]})]}),e.jsxs(q,{x:b.icons.mountainDOWN.x,y:b.icons.mountainDOWN.y,iconSize:b.sizes.mountainDOWN,initial:{scale:0},animate:{scale:1},transition:{delay:1.6,duration:.5},whileHover:{scale:1.2},title:"山道",onMouseEnter:()=>{const p=ue.mountainDOWN;p&&h({x:b.icons.mountainDOWN.x,y:b.icons.mountainDOWN.y,title:"山道",image:p.image,desc:p.desc})},onMouseLeave:()=>h(null),onClick:()=>v("mountainDOWN"),style:{zIndex:20},children:[e.jsx("img",{src:"images/webps/女木岛/女木岛-山路地标.webp",alt:"山道",style:{width:`${b.sizes.mountainDOWN}px`,height:`${b.sizes.mountainDOWN}px`,borderRadius:"50%",objectFit:"cover"}}),o&&o.title==="山道"&&e.jsxs(J,{children:[e.jsx(Z,{src:o.image,alt:o.title}),e.jsx(ee,{children:o.title}),e.jsx(te,{children:o.desc})]})]})]})]})})}),e.jsxs(Ke,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.6},children:[e.jsx(Qn,{children:"打卡地点"}),e.jsx(eo,{children:y.map(p=>e.jsxs(to,{whileHover:{scale:1.02},transition:{duration:.3},initial:{opacity:0,y:30},animate:{opacity:1,y:0},onClick:()=>$(p.images,0,p.title),style:{cursor:"pointer"},children:[e.jsx(ye,{images:p.images,title:p.title,autoPlay:!0,interval:4e3,isPlaying:m,onImageClick:C=>$(p.images,C,p.title)}),e.jsx(io,{children:p.title}),e.jsx(no,{children:p.description})]},p.title))})]})]}),e.jsxs(oo,{children:[e.jsx(ro,{onClick:()=>f(!m),whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.6},children:m?"⏸ 停止轮播":"▶ 开始轮播"}),e.jsx(ao,{onClick:k,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.8},children:"返回打卡篇"})]}),e.jsx(ho,{isOpen:n.isOpen,onClose:S,images:n.images,currentIndex:n.currentIndex,onPrevious:T,onNext:I,title:n.title})]})},uo=t(s.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,fo=t(s.div)`
  background: white;
  border-radius: 20px;
  max-width: ${i=>i.small?"350px":"95vw"};
  max-height: ${i=>i.small?"180px":"95vh"};
  min-width: ${i=>i.small?"260px":"unset"};
  min-height: ${i=>i.small?"120px":"unset"};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: ${i=>i.small?"24px 20px":"20px"};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  justify-content: center;
`,wo=t.div`
  position: relative;
  width: 100%;
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`,yo=t.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 15px;
`,vo=t(s.div)`
  position: absolute;
  font-size: ${i=>i.size||30}px;
  left: ${i=>i.x}%;
  top: ${i=>i.y}%;
  transform: translate(-50%, -50%);
  z-index: 5;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`,jo=t.img`
  width: ${i=>i.size||30}px;
  height: ${i=>i.size||30}px;
  object-fit: contain;
`,ko=t.div`
  text-align: center;
  max-width: 600px;
`,Ue=t.h3`
  font-size: 28px;
  color: #5d4037;
  margin: 0 0 10px 0;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
`,_e=t.p`
  font-size: 18px;
  color: #666;
  margin: 0;
  line-height: 1.6;
  text-align: center;
`,st=({isOpen:i,onClose:n,mapImage:a,title:d,description:l,iconEmoji:o="🤭",iconPosition:h={x:50,y:50},iconPositions:m,mode:f})=>{if(!i)return null;const b=m&&m.length>0?m:[];return e.jsx(P,{children:e.jsx(uo,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:n,children:e.jsx(fo,{small:f==="desc",initial:{scale:.8,opacity:0,y:50},animate:{scale:1,opacity:1,y:0},exit:{scale:.8,opacity:0,y:50},onClick:y=>y.stopPropagation(),transition:{type:"spring",stiffness:300,damping:30},children:f==="desc"?e.jsxs(e.Fragment,{children:[e.jsx(Ue,{children:d}),e.jsx(_e,{children:l})]}):e.jsxs(e.Fragment,{children:[e.jsxs(wo,{children:[e.jsx(yo,{src:a,alt:d}),b.map((y,k)=>e.jsx(vo,{x:y.x,y:y.y,size:y.size,initial:{scale:0,rotate:-180},animate:{scale:1,rotate:0},transition:{delay:.3+k*.1,type:"spring",stiffness:300,damping:20},children:y.icon?e.jsx(jo,{src:y.icon,alt:"icon",size:y.size}):y.emoji||o},k))]}),e.jsxs(ko,{children:[e.jsx(Ue,{children:d}),e.jsx(_e,{children:l})]})]})})})})},Co=t.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    135deg, 
    #87CEEB 0%,    /* 天蓝色 */
    #98E4D6 20%,   /* 薄荷绿 */
    #F4E285 40%,   /* 浅黄色 */
    #FFB347 60%,   /* 金橙色 */
    #FF8C69 80%,   /* 珊瑚色 */
    #FFA07A 100%   /* 浅橙色 */
  );
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  padding-top: 30px;
  padding-bottom: 40px;
`,zo=t.div`
  text-align: center;
  margin-bottom: 40px;
`,$o=t.h1`
  font-size: 48px;
  color: #5d4037;
  margin-bottom: 10px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`,Xe=t.span`
  font-size: 60px;
  display: inline-flex;
  align-items: center;
  
  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
`,To=t.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`,So=t.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`,We=t(s.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 107, 53, 0.05) 0%,
      rgba(135, 206, 235, 0.05) 50%,
      rgba(152, 228, 214, 0.05) 100%
    );
    z-index: -1;
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`,Io=t.h3`
  font-size: 28px;
  color: #5d4037;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
`,R=t.p`
  font-size: 18px;
  color: #444;
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: left;
  text-indent: 2em;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(180deg, #ff6b35, #ffa500);
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`,Eo=t.div`
  width: fit-content;
  max-width: 95%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`,Fo=t.div`
  width: fit-content;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`,Bo=t.img`
  width: ${i=>i.scale*800}px;
  max-width: 100vw;
  height: auto;
  border-radius: 20px;
  display: block;
`,Po=t.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  pointer-events: none;
`,Mo=t(s.div)`
  position: absolute;
  font-size: ${i=>i.iconSize}px;
  cursor: pointer;
  left: ${i=>i.x}%;
  top: ${i=>i.y}%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: auto;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
`,Oo=t.div`
  position: absolute;
  background: #fff;
  color: #333;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 16px 10px 12px 10px;
  min-width: 220px;
  max-width: 320px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  opacity: 0.98;
  
  ${i=>{switch(i.position){case"top":return`
          left: 50%;
          top: -10px;
          transform: translate(-50%, -100%);
  &::after {
    content: '';
    position: absolute;
            left: 50%;
            bottom: -14px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
            border-left: 14px solid transparent;
            border-right: 14px solid transparent;
            border-top: 14px solid #fff;
          }
        `;case"bottom":return`
          left: 50%;
          bottom: -10px;
          transform: translate(-50%, 100%);
          &::after {
            content: '';
            position: absolute;
            left: 50%;
            top: -14px;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 14px solid transparent;
            border-right: 14px solid transparent;
            border-bottom: 14px solid #fff;
          }
        `;case"left":return`
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          &::after {
            content: '';
            position: absolute;
            right: -14px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 14px solid #fff;
          }
        `;case"right":return`
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          &::after {
            content: '';
            position: absolute;
            left: -14px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-right: 14px solid #fff;
          }
        `;default:return""}}}
`,Do=t.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
`,Ao=t.div`
  font-size: 16px;
  font-weight: 700;
  color: #5d4037;
  margin-bottom: 4px;
  text-align: center;
`,Lo=t.div`
  font-size: 14px;
  color: #666;
  text-align: center;
`,Ho=t.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
  max-height: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
  
  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-height: 600px;
  }
  
  @media (max-width: 1024px) and (min-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
    max-height: 400px;
  }
`,Ro=t(s.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`,Ko=t.h4`
  padding: 15px 15px 5px 15px;
  font-size: 18px;
  color: #5d4037;
  text-align: center;
  margin: 0;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
`,No=t.p`
  padding: 5px 15px 15px 15px;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`,Yo=t.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`,Vo=t(s.button)`
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 15px 25px;
  font-size: 18px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`,Uo=t(s.button)`
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  font-size: 16px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`,_o=t(s.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,Xo=t(s.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
`,Wo=t.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`,Qo=t.div`
  text-align: center;
  color: #333;
`,Go=t.h3`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #5d4037;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`,qo=t.p`
  font-size: 18px;
  margin: 0;
  color: #666;
  font-weight: 500;
`,Qe=t(s.button)`
  position: absolute;
  top: 50%;
  ${i=>i.direction==="prev"?"left: -70px;":"right: -70px;"}
  transform: translateY(-50%);
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: none; /* 🔧 移除CSS transition，避免与framer-motion冲突 */
  
  @media (max-width: 768px) {
    ${i=>i.direction==="prev"?"left: 10px;":"right: 10px;"}
    top: auto;
    bottom: 20px;
  }
`,Jo=t.div`
  display: flex;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  backdrop-filter: blur(10px);
`,Ge=t(s.button)`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  background: ${i=>i.active?i.tabType==="intro"?"linear-gradient(135deg, #ff6b35, #ffa500)":"linear-gradient(135deg, #87ceeb, #98e4d6)":"transparent"};
  color: ${i=>i.active?i.tabType==="intro"?"white":"#2e8b57":"#8d6e63"};
  font-size: 18px;
  font-weight: 600;
  font-family: 'KaiTi', 'SimKai', serif;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${i=>i.active?i.tabType==="intro"?"0 6px 20px rgba(255, 107, 53, 0.3)":"0 6px 20px rgba(135, 206, 235, 0.3)":"none"};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.3), 
      transparent
    );
    transition: left 0.8s ease;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${i=>i.tabType==="intro"?"linear-gradient(135deg, #ff8a50, #ffb347)":"linear-gradient(135deg, #98d8eb, #a8e6d2)"};
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 10px;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${i=>i.tabType==="intro"?"0 8px 25px rgba(255, 107, 53, 0.4)":"0 8px 25px rgba(135, 206, 235, 0.4)"};
    
    &::before {
      left: 100%;
    }
    
    &::after {
      opacity: ${i=>i.active?0:.6};
    }
  }
  
  &:active {
    transform: translateY(0);
    transition: transform 0.1s ease;
  }
`,qe=t(s.div)`
  width: 100%;
`,Zo=({isOpen:i,onClose:n,images:a,currentIndex:d,onPrevious:l,onNext:o,title:h})=>{var m,f,b;return!i||a.length===0?null:e.jsx(P,{children:e.jsx(_o,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:n,children:e.jsxs(Xo,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},onClick:y=>y.stopPropagation(),children:[a.length>1&&e.jsxs(e.Fragment,{children:[e.jsx(Qe,{direction:"prev",onClick:l,whileHover:{scale:1.05,background:"rgba(255, 255, 255, 0.2)",borderColor:"rgba(255, 255, 255, 0.5)"},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:25,duration:.15},style:{transformOrigin:"center"},children:"‹"}),e.jsx(Qe,{direction:"next",onClick:o,whileHover:{scale:1.05,background:"rgba(255, 255, 255, 0.2)",borderColor:"rgba(255, 255, 255, 0.5)"},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:25,duration:.15},style:{transformOrigin:"center"},children:"›"})]}),e.jsx(Wo,{src:(m=a[d])==null?void 0:m.src,alt:`${h} - ${(f=a[d])==null?void 0:f.label}`}),e.jsxs(Qo,{children:[e.jsx(Go,{children:h}),e.jsx(qo,{children:(b=a[d])==null?void 0:b.label})]})]})})})},ea=()=>{const i=H(),[n,a]=c.useState({isOpen:!1,images:[],currentIndex:0,title:""}),[d,l]=c.useState("intro"),[o,h]=c.useState(null),[m,f]=c.useState({isOpen:!1,mapImage:"",title:"",description:"",iconPositions:[]}),[b,y]=c.useState(!0),k=1,$={紬的灯塔:30,苍睡觉的小道:30,白羽主视角:30,鸥相遇小道:50},S=[{x:61,y:2,emoji:"🗺️",title:"紬的灯塔",iconType:"emoji",size:$.紬的灯塔},{x:28,y:53,emoji:"🗺️",title:"苍睡觉的小道",iconType:"emoji",size:$.苍睡觉的小道},{x:23,y:74,emoji:"🗺️",title:"白羽主视角",iconType:"emoji",size:$.白羽主视角},{x:49,y:78,icon:"images/webps/男木岛/男木岛-鸥相遇小道图标.webp",title:"鸥相遇小道",iconType:"image",size:$.鸥相遇小道}],T={紬的灯塔:{image:"images/webps/男木岛/男木岛-灯塔.webp",desc:"与小紬相遇的地点"},苍睡觉的小道:{image:"images/webps/男木岛/男木岛-苍睡觉小道.webp",desc:"与苍相遇的地点"},白羽主视角:{image:"images/webps/男木岛/男木岛-防波堤.webp",desc:"第一次见白羽的地点"},鸥相遇小道:{image:"images/webps/男木岛/男木岛-鸥相遇小道.webp",desc:"与鸥相遇的地点"}},I={紬的灯塔:{mapImage:"images/webps/男木岛/男木岛-灯塔地图-线路版.webp",description:"我正在找东西，找自己想要做的事情",iconPositions:[{x:23,y:36,icon:"images/webps/男木岛/男木岛-鬼姬神山识之墓.webp",size:200},{x:74,y:35,icon:"images/webps/男木岛/男木岛-紬的灯塔.webp",size:200}]},苍睡觉的小道:{mapImage:"images/webps/男木岛/男木岛-苍睡觉小道地图-线路版.webp",description:"总之，就算我在睡觉也不必管啦",iconPositions:[{x:37,y:76,icon:"images/webps/男木岛/男木岛-放送塔.webp",size:200},{x:65,y:22,icon:"images/webps/男木岛/男木岛-苍睡觉小道.webp",size:200},{x:76,y:66,icon:"images/webps/男木岛/男木岛-静久神社.webp",size:200}]},白羽主视角:{mapImage:"images/webps/男木岛/男木岛-鸟白岛役场地图-线路版.webp",description:"不用在意我就好",iconPositions:[{x:33,y:2,icon:"images/webps/男木岛/男木岛-放送塔.webp",size:150},{x:4,y:53,icon:"images/webps/男木岛/男木岛-防波堤.webp",size:200},{x:42,y:64,icon:"images/webps/男木岛/男木岛-鸟白岛役场.webp",size:150},{x:65,y:70,icon:"images/webps/男木岛/男木岛-秘密基地.webp",size:100},{x:65,y:76,icon:"images/webps/男木岛/男木岛-泳池.webp",size:100}]},鸥相遇小道:{mapImage:"images/webps/男木岛/男木岛-鸥相遇小道.webp",description:"出发吧~再一次，向着那有海盗船的地方",iconPositions:[]}},v=[{title:"放送塔",description:"美希等爸爸妈妈的地点",images:[{src:"images/webps/男木岛/男木岛-放送塔.webp",label:"放送塔"}]},{title:"苍睡觉的小道",description:"与苍相遇的地点",images:[{src:"images/webps/男木岛/男木岛-苍睡觉小道.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-苍睡觉小道-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-苍睡觉小道-夜晚.webp",label:"夜晚"}]},{title:"鬼姬神山识之墓",description:"与小识。。。",images:[{src:"images/webps/男木岛/男木岛-鬼姬神山识之墓.webp",label:"鬼姬神山识之墓"}]},{title:"紬的灯塔",description:"与小紬相遇的地点",images:[{src:"images/webps/男木岛/男木岛-灯塔.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-灯塔-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-灯塔-夜晚-亮灯.webp",label:"夜晚-亮灯"},{src:"images/webps/男木岛/男木岛-灯塔-夜晚-熄灯.webp",label:"夜晚-熄灯"}]},{title:"静久神社",description:"与静久路过的鸟居",images:[{src:"images/webps/男木岛/男木岛-静久神社.webp",label:"静久神社"}]},{title:"鸟白岛役场",description:"岛上重要的行政场所",images:[{src:"images/webps/男木岛/男木岛-鸟白岛役场.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-鸟白岛役场-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-鸟白岛役场-夜晚.webp",label:"夜晚"}]},{title:"防波堤",description:"白羽主视觉",images:[{src:"images/webps/男木岛/男木岛-防波堤.webp",label:"防波堤"}]},{title:"秘密基地",description:"与天善打乒乓球的地点",images:[{src:"images/webps/男木岛/男木岛-秘密基地.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-秘密基地-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-秘密基地-夜晚.webp",label:"夜晚"}]},{title:"泳池",description:"与白羽相遇的地点",images:[{src:"images/webps/男木岛/男木岛-泳池.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-泳池-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-泳池-夜晚.webp",label:"夜晚"}]},{title:"缺口栏杆",description:"与鸥相遇的地点",images:[{src:"images/webps/男木岛/男木岛-鸥相遇小道.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-鸥相遇小道-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-鸥相遇小道-夜晚.webp",label:"夜晚"}]}],p=()=>{i("/checkin")},C=(r,j,E)=>{a({isOpen:!0,images:r,currentIndex:j,title:E})},x=()=>{a(r=>D(O({},r),{isOpen:!1}))},F=()=>{a(r=>D(O({},r),{currentIndex:(r.currentIndex-1+r.images.length)%r.images.length}))},M=()=>{a(r=>D(O({},r),{currentIndex:(r.currentIndex+1)%r.images.length}))},g=(r,j,E,A)=>{f({isOpen:!0,mapImage:j,title:r,description:E,iconPositions:A})},w=()=>{f(r=>D(O({},r),{isOpen:!1}))},z=(r,j)=>j<20?"bottom":j>80?"top":r<20?"right":r>80?"left":"top";return e.jsxs(Co,{children:[e.jsx(zo,{children:e.jsxs(s.div,{initial:{opacity:0,y:-30},animate:{opacity:1,y:0},transition:{duration:.8},children:[e.jsxs($o,{children:[e.jsx(Xe,{children:e.jsx("img",{src:"images/webps/男木岛/男木岛-灯塔图标.webp",alt:"灯塔"})}),"男木岛",e.jsx(Xe,{children:e.jsx("img",{src:"images/webps/男木岛/男木岛-灯塔图标.webp",alt:"灯塔"})})]}),e.jsx(To,{children:"宁静的猫岛渔村"})]})}),e.jsxs(So,{children:[e.jsxs(We,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.2},children:[e.jsxs(Jo,{children:[e.jsx(Ge,{active:d==="intro",tabType:"intro",onClick:()=>l("intro"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🏝️ 岛屿介绍"}),e.jsx(Ge,{active:d==="guide",tabType:"guide",onClick:()=>l("guide"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🗺️ 巡礼说明"})]}),e.jsx(P,{mode:"wait",children:d==="intro"?e.jsx(qe,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:e.jsxs(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[e.jsx(R,{children:"男木岛是一个在斜坡上有梯田村庄和历史灯塔的岛屿。"}),e.jsx(R,{children:'男木岛的猫咪特别多，被称为"猫岛"，巡礼之余可以去撸一下猫猫。'})]})},"intro"):e.jsx(qe,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:e.jsxs(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[e.jsx(R,{children:"男木岛的巡礼路线主要分为南北两个方向，北边最远的位置是灯塔，南边最远的位置是和鸥相遇的海岸小路。"}),e.jsx(R,{children:"男木岛共有10个巡礼点，巡礼推荐路线如下，点击🗺️可查看详情："}),e.jsx(R,{children:"北边：放送塔 → 苍睡觉的小道 → 鬼姬神山识之墓 → 小紬的灯塔"}),e.jsx(R,{children:"中部：放送塔 → 静久神社"}),e.jsx(R,{children:"南边：放送塔 → 鸟白岛役场 →  防波堤 → 秘密基地（泳池） → 鸥相遇的小路"}),e.jsxs(R,{children:["其他说明：",e.jsx("div",{style:{textIndent:"2em"},children:"1. 男木岛的巡礼方式为步行，灯塔距离较远，请安排好时间。"}),e.jsx("div",{style:{textIndent:"2em"},children:"2. 放送塔上岛即可看见，适合作为男木岛巡礼的起点。"}),e.jsx("div",{style:{textIndent:"2em"},children:"3. 秘密基地由丰爷自建，泳池有人时不要拍照。"}),e.jsx("div",{style:{textIndent:"2em"},children:"4. 有时间可以和丰爷聊天，丰爷人很好，一来就给你放bgm。"})]})]})},"guide")})]}),e.jsx(s.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.4},children:e.jsx(Eo,{children:e.jsxs(Fo,{children:[e.jsx(Bo,{scale:k,src:"images/webps/男木岛/男木岛地图-线路版.webp",alt:"男木岛地图"}),e.jsx(Po,{children:S.map((r,j)=>e.jsxs(Mo,{x:r.x,y:r.y,iconSize:r.size,initial:{scale:0},animate:{scale:1},transition:{delay:1+j*.1,duration:.5},whileHover:{scale:1.2},title:r.title,onClick:()=>{const E=I[r.title];E&&g(r.title,E.mapImage,E.description,E.iconPositions||[])},onMouseEnter:()=>{const E=T[r.title];E&&h({x:r.x,y:r.y,title:r.title,image:E.image,desc:E.desc})},onMouseLeave:()=>h(null),children:[r.iconType==="emoji"?e.jsx("span",{style:{fontSize:`${r.size}px`},children:r.emoji}):e.jsx("img",{src:r.icon,alt:r.title,style:{width:`${r.size}px`,height:`${r.size}px`,borderRadius:"50%",objectFit:"cover"}}),o&&o.title===r.title&&e.jsxs(Oo,{position:z(r.x,r.y),children:[e.jsx(Do,{src:o.image,alt:o.title}),e.jsx(Ao,{children:o.title}),e.jsx(Lo,{children:o.desc})]})]},r.title))})]})})}),e.jsxs(We,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.6},children:[e.jsx(Io,{children:"打卡地点"}),e.jsx(Ho,{children:v.map(r=>e.jsxs(Ro,{whileHover:{scale:1.02},transition:{duration:.3},initial:{opacity:0,y:30},animate:{opacity:1,y:0},onClick:()=>C(r.images,0,r.title),style:{cursor:"pointer"},children:[e.jsx(ye,{images:r.images,title:r.title,autoPlay:!0,interval:4e3,isPlaying:b,onImageClick:j=>C(r.images,j,r.title)}),e.jsx(Ko,{children:r.title}),e.jsx(No,{children:r.description})]},r.title))})]})]}),e.jsxs(Yo,{children:[e.jsx(Uo,{onClick:()=>y(!b),whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.6},children:b?"⏸ 停止轮播":"▶ 开始轮播"}),e.jsx(Vo,{onClick:p,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.8},children:"返回打卡篇"})]}),e.jsx(Zo,{isOpen:n.isOpen,onClose:x,images:n.images,currentIndex:n.currentIndex,onPrevious:F,onNext:M,title:n.title}),e.jsx(st,{isOpen:m.isOpen,onClose:w,mapImage:m.mapImage,title:m.title,description:m.description,iconPositions:m.iconPositions,mode:"full"})]})},ta=t.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    135deg, 
    #87CEEB 0%,    /* 天蓝色 */
    #98E4D6 20%,   /* 薄荷绿 */
    #F4E285 40%,   /* 浅黄色 */
    #FFB347 60%,   /* 金橙色 */
    #FF8C69 80%,   /* 珊瑚色 */
    #FFA07A 100%   /* 浅橙色 */
  );
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  padding-top: 30px;
  padding-bottom: 40px;
`,ia=t.div`
  text-align: center;
  margin-bottom: 40px;
`,na=t.h1`
  font-size: 48px;
  color: #5d4037;
  margin-bottom: 10px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`,Je=t.span`
  font-size: 60px;
  display: inline-flex;
  align-items: center;
`,oa=t.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`,aa=t.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`,Ze=t(s.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
`,ra=t.h3`
  font-size: 28px;
  color: #5d4037;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
`,N=t.p`
  font-size: 18px;
  color: #444;
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: left;
  text-indent: 2em;
  position: relative;
`,sa=t.div`
  width: fit-content;
  max-width: 95%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`,la=t.div`
  width: fit-content;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`,ca=t.img`
  width: ${i=>i.scale*800}px;
  max-width: 100vw;
  height: auto;
  border-radius: 20px;
  display: block;
`,da=t.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  pointer-events: none;
`,pa=t(s.div)`
  position: absolute;
  font-size: ${i=>i.iconSize}px;
  cursor: pointer;
  left: ${i=>i.x}%;
  top: ${i=>i.y}%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: auto;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
`,xa=t.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
  max-height: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-height: 600px;
  }
  @media (max-width: 1024px) and (min-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
    max-height: 400px;
  }
`,ga=t(s.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`,ba=t.h4`
  padding: 15px 15px 5px 15px;
  font-size: 18px;
  color: #5d4037;
  text-align: center;
  margin: 0;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
`,ha=t.p`
  padding: 5px 15px 15px 15px;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`,ma=t.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`,ua=t(s.button)`
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 15px 25px;
  font-size: 18px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  z-index: 100;
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`,fa=t(s.button)`
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  font-size: 16px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`,wa=t.div`
  display: flex;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  backdrop-filter: blur(10px);
`,et=t(s.button)`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  background: ${i=>i.active?i.tabType==="intro"?"linear-gradient(135deg, #ff6b35, #ffa500)":"linear-gradient(135deg, #87ceeb, #98e4d6)":"transparent"};
  color: ${i=>i.active?i.tabType==="intro"?"white":"#2e8b57":"#8d6e63"};
  font-size: 18px;
  font-weight: 600;
  font-family: 'KaiTi', 'SimKai', serif;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${i=>i.active?i.tabType==="intro"?"0 6px 20px rgba(255, 107, 53, 0.3)":"0 6px 20px rgba(135, 206, 235, 0.3)":"none"};
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.3), 
      transparent
    );
    transition: left 0.8s ease;
    z-index: 1;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${i=>i.tabType==="intro"?"linear-gradient(135deg, #ff8a50, #ffb347)":"linear-gradient(135deg, #98d8eb, #a8e6d2)"};
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 10px;
    z-index: -1;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${i=>i.tabType==="intro"?"0 8px 25px rgba(255, 107, 53, 0.4)":"0 8px 25px rgba(135, 206, 235, 0.4)"};
    &::before {
      left: 100%;
    }
    &::after {
      opacity: ${i=>i.active?0:.6};
    }
  }
  &:active {
    transform: translateY(0);
    transition: transform 0.1s ease;
  }
`,tt=t(s.div)`
  width: 100%;
`,ya=t(s.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,va=t(s.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
`,ja=t.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`,ka=t.div`
  text-align: center;
  color: #333;
`,Ca=t.h3`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #5d4037;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`,za=t.p`
  font-size: 18px;
  margin: 0;
  color: #666;
  font-weight: 500;
`,it=t(s.button)`
  position: absolute;
  top: 50%;
  ${i=>i.direction==="prev"?"left: -70px;":"right: -70px;"}
  transform: translateY(-50%);
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: none; /* 🔧 移除CSS transition，避免与framer-motion冲突 */
  @media (max-width: 768px) {
    ${i=>i.direction==="prev"?"left: 10px;":"right: 10px;"}
    top: auto;
    bottom: 20px;
  }
`,$a=t.div`
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translate(-50%, -100%);
  background: #fff;
  color: #333;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 16px 10px 12px 10px; /* 减小左右padding */
  min-width: 220px;
  max-width: 320px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  opacity: 0.98;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -14px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top: 14px solid #fff;
  }
`,Ta=t.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
`,Sa=t.div`
  font-size: 16px;
  font-weight: 700;
  color: #5d4037;
  margin-bottom: 4px;
  text-align: center;
`,Ia=t.div`
  font-size: 14px;
  color: #666;
  text-align: center;
`,Ea={小卖部:{image:"images/webps/直岛/直岛-小卖部.webp",desc:"苍打工的地点"},海狸家:{image:"images/webps/直岛/直岛-海狸家院子.webp",desc:"加藤家的住所"},白羽钓点:{image:"images/webps/直岛/直岛-白羽钓鱼.webp",desc:"白羽钓鱼的地方"},蔷薇庄:{image:"images/webps/直岛/直岛-蔷薇庄.webp",desc:"静久的饭店"},鸣濑神社:{image:"images/webps/直岛/直岛-神社.webp",desc:"白羽家的神社"}},Fa=()=>{const i=H(),[n,a]=c.useState("intro"),[d,l]=c.useState({isOpen:!1,images:[],currentIndex:0,title:""}),[o,h]=c.useState(null),[m,f]=c.useState({isOpen:!1,mapImage:"",title:"",description:"",iconPositions:[]}),[b,y]=c.useState(!0),k=1.5,$=[{x:18,y:54,emoji:"🗺️",title:"小卖部",iconType:"emoji",size:30},{x:58,y:50,emoji:"🗺️",title:"海狸家",iconType:"emoji",size:30},{x:75,y:64,emoji:"🗺️",title:"白羽钓点",iconType:"emoji",size:30},{x:67,y:88,emoji:"🗺️",title:"蔷薇庄",iconType:"emoji",size:30},{x:21,y:32,emoji:"⛩️",title:"鸣濑神社",iconType:"emoji",size:25}],S={小卖部:{mapImage:"images/webps/直岛/直岛地图-小卖部-路线版.webp",description:"苍打工的零食店，已歇业。",iconPositions:[{x:24,y:0,emoji:"🍧",size:30},{x:28,y:69,emoji:"🚲",size:30},{x:10,y:0,icon:"images/webps/直岛/直岛-小卖部.webp",size:200},{x:20,y:50,icon:"images/webps/直岛/直岛-sprb租车店.webp",size:200}]},海狸家:{mapImage:"images/webps/直岛/直岛地图-水塘海狸家-路线版.webp",description:"加藤家的住所，休憩之地。",iconPositions:[{x:11,y:72,icon:"images/webps/直岛/直岛-灵弹.webp",size:200},{x:80,y:3,icon:"images/webps/直岛/直岛-海狸家院子.webp",size:150},{x:74,y:40,icon:"images/webps/直岛/直岛-八幡神社石阶.webp",size:200}]},白羽钓点:{mapImage:"images/webps/直岛/直岛地图-白羽钓点-路线版.webp",description:"白羽钓鱼的地方，海风徐徐。",iconPositions:[{x:5,y:75,icon:"images/webps/直岛/直岛-积浦海岸.webp",size:200},{x:82,y:35,icon:"images/webps/直岛/直岛-白羽钓鱼.webp",size:200},{x:57,y:0,icon:"images/webps/直岛/直岛-白羽钓点.webp",size:200}]},蔷薇庄:{mapImage:"images/webps/直岛/直岛地图-蔷薇庄-路线版.webp",description:"充满回忆的住宿地，温馨舒适。",iconPositions:[{x:92,y:58,icon:"images/webps/直岛/直岛-蔷薇庄图标.webp",size:50},{x:71,y:53,icon:"images/webps/直岛/直岛-惠美须神社鸟居.webp",size:100},{x:85,y:74,icon:"images/webps/直岛/直岛-海水浴场.webp",size:150},{x:12,y:-2,icon:"images/webps/直岛/直岛-游戏主界面图标.webp",size:400}]},鸣濑神社:{mapImage:"images/webps/直岛/直岛-神社.webp",description:"白羽出嫁的地点。",iconPositions:[]}},T=[{title:"港口",description:"直岛的主要交通枢纽，旅程的起点。",images:[{src:"images/webps/直岛/直岛-港口-无船.webp",label:"白天-无船"},{src:"images/webps/直岛/直岛-港口-无船-黄昏.webp",label:"黄昏-无船"},{src:"images/webps/直岛/直岛-港口-无船-夜晚.webp",label:"夜晚-无船"},{src:"images/webps/直岛/直岛-港口-有船.webp",label:"白天-有船"},{src:"images/webps/直岛/直岛-港口-有船-黄昏.webp",label:"黄昏-有船"},{src:"images/webps/直岛/直岛-港口-有船-夜晚.webp",label:"夜晚-有船"},{src:"images/webps/直岛/直岛-港口-下雨.webp",label:"下雨"}]},{title:"小卖部",description:"苍打工的零食店。",images:[{src:"images/webps/直岛/直岛-小卖部.webp",label:"白天"},{src:"images/webps/直岛/直岛-小卖部-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-小卖部-夜晚.webp",label:"夜晚"}]},{title:"鸣濑神社",description:"白羽出嫁的地点。",images:[{src:"images/webps/直岛/直岛-神社.webp",label:"白天"},{src:"images/webps/直岛/直岛-神社-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-神社-夜晚.webp",label:"夜晚"}]},{title:"灵弹",description:"灵弹~灵弹~。",images:[{src:"images/webps/直岛/直岛-灵弹.webp",label:"白天"},{src:"images/webps/直岛/直岛-灵弹-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-灵弹-夜晚.webp",label:"夜晚"}]},{title:"海狸家门前",description:"加藤家门口。",images:[{src:"images/webps/直岛/直岛-海狸家门前.webp",label:"白天"},{src:"images/webps/直岛/直岛-海狸家门前-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-海狸家门前-夜晚.webp",label:"夜晚"}]},{title:"海狸家院子",description:"加藤家院子。",images:[{src:"images/webps/直岛/直岛-海狸家院子.webp",label:"白天"},{src:"images/webps/直岛/直岛-海狸家院子-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-海狸家院子-夜晚.webp",label:"夜晚"}]},{title:"海狸家客厅",description:"加藤家客厅。",images:[{src:"images/webps/直岛/直岛-海狸家客厅.webp",label:"白天"},{src:"images/webps/直岛/直岛-海狸家客厅-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-海狸家客厅-夜晚.webp",label:"夜晚"}]},{title:"海狸家厨房",description:"加藤家厨房。",images:[{src:"images/webps/直岛/直岛-海狸家厨房.webp",label:"白天"},{src:"images/webps/直岛/直岛-海狸家厨房-中午.webp",label:"中午"},{src:"images/webps/直岛/直岛-海狸家厨房-夜晚.webp",label:"夜晚"}]},{title:"海狸家卧室",description:"加藤家卧室。",images:[{src:"images/webps/直岛/直岛-海狸家卧室-无床.webp",label:"白天-无床"},{src:"images/webps/直岛/直岛-海狸家卧室-无床-黄昏.webp",label:"黄昏-无床"},{src:"images/webps/直岛/直岛-海狸家卧室-无床-开灯-夜晚.webp",label:"夜晚-无床-开灯"},{src:"images/webps/直岛/直岛-海狸家卧室-无床-关灯-夜晚.webp",label:"夜晚-无床-关灯"},{src:"images/webps/直岛/直岛-海狸家卧室-有床.webp",label:"白天-有床"},{src:"images/webps/直岛/直岛-海狸家卧室-有床-黄昏.webp",label:"黄昏-有床"},{src:"images/webps/直岛/直岛-海狸家卧室-有床-开灯-夜晚.webp",label:"夜晚-有床-开灯"},{src:"images/webps/直岛/直岛-海狸家卧室-有床-关灯-夜晚.webp",label:"夜晚-有床-关灯"}]},{title:"食堂",description:"白羽家的食堂。",images:[{src:"images/webps/直岛/直岛-食堂.webp",label:"白天"},{src:"images/webps/直岛/直岛-食堂-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-食堂-夜晚.webp",label:"夜晚"}]},{title:"役场通路",description:"通往鸟白岛役场",images:[{src:"images/webps/直岛/直岛-役场通路.webp",label:"役场通路"}]},{title:"八幡神社石阶",description:"美希穿和服。",images:[{src:"images/webps/直岛/直岛-八幡神社石阶.webp",label:"八幡神社石阶"}]},{title:"积浦海岸",description:"羽未的日出打卡点",images:[{src:"images/webps/直岛/直岛-积浦海岸.webp",label:"积浦海岸"}]},{title:"白羽钓鱼点",description:"白羽钓鱼的地方",images:[{src:"images/webps/直岛/直岛-白羽钓鱼.webp",label:"白天"},{src:"images/webps/直岛/直岛-白羽钓点.webp",label:"白天"},{src:"images/webps/直岛/直岛-白羽钓点-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-白羽钓点-夜晚.webp",label:"夜晚"}]},{title:"惠美须神社鸟居",description:"独特的鸟居景观。",images:[{src:"images/webps/直岛/直岛-惠美须神社鸟居.webp",label:"惠美须神社鸟居"}]},{title:"蔷薇庄",description:"静久加饭的地方。",images:[{src:"images/webps/直岛/直岛-蔷薇庄.webp",label:"蔷薇庄"}]},{title:"海水浴场",description:"良一脱衣服的地方。",images:[{src:"images/webps/直岛/直岛-海水浴场.webp",label:"白天"},{src:"images/webps/直岛/直岛-海水浴场-夜晚.webp",label:"夜晚"},{src:"images/webps/直岛/直岛-海水浴场-黄昏.webp",label:"黄昏"}]},{title:"游戏主界面",description:"全部女主的合照",images:[{src:"images/webps/直岛/直岛-游戏主界面.webp",label:"游戏主界面"}]}],I=(g,w,z)=>{l({isOpen:!0,images:g,currentIndex:w,title:z})},v=()=>{l(g=>D(O({},g),{isOpen:!1}))},p=()=>{l(g=>D(O({},g),{currentIndex:(g.currentIndex-1+g.images.length)%g.images.length}))},C=()=>{l(g=>D(O({},g),{currentIndex:(g.currentIndex+1)%g.images.length}))},x=(g,w,z,r)=>{f({isOpen:!0,mapImage:w,title:g,description:z,iconPositions:r})},F=()=>{f(g=>D(O({},g),{isOpen:!1}))},M=()=>{i("/checkin")};return e.jsxs(ta,{children:[e.jsx(ia,{children:e.jsxs(s.div,{initial:{opacity:0,y:-30},animate:{opacity:1,y:0},transition:{duration:.8},children:[e.jsxs(na,{children:[e.jsx(Je,{children:"🎨"}),"直岛",e.jsx(Je,{children:"🎨"})]}),e.jsx(oa,{children:"现代艺术的圣地"})]})}),e.jsxs(aa,{children:[e.jsxs(Ze,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.2},children:[e.jsxs(wa,{children:[e.jsx(et,{active:n==="intro",tabType:"intro",onClick:()=>a("intro"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🏝️ 岛屿介绍"}),e.jsx(et,{active:n==="guide",tabType:"guide",onClick:()=>a("guide"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🗺️ 巡礼说明"})]}),e.jsx(P,{mode:"wait",children:n==="intro"?e.jsx(tt,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:e.jsxs(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[e.jsx(N,{children:"直岛是瀬户内海中著名的艺术岛屿，拥有丰富的自然与人文景观，是现代艺术与传统生活完美融合的代表。"}),e.jsx(N,{children:"岛上巡礼点较为分散，建议租自行车前往。"})]})},"intro"):e.jsx(tt,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:e.jsxs(s.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[e.jsx(N,{children:"直岛的建议巡礼方式为自行车，上岛后可以在Summer Pocket租车店租一辆胡子🐱自行车。"}),e.jsxs(N,{children:["直岛巡礼主要分为4个区域，点击地图上的🗺️图标可查看详情。",e.jsx("br",{})]}),e.jsxs(N,{children:["直岛共有15个打卡点，具体如下：",e.jsx("br",{}),e.jsx("div",{style:{textIndent:"2em"},children:"港口往北：苍打工的小卖部 → 鸣濑神社"}),e.jsx("div",{style:{textIndent:"2em"},children:"正东方：小水塘 → 海狸家 → 八幡神社"}),e.jsx("div",{style:{textIndent:"2em"},children:"八幡神社往南：羽未日出点 → 白羽钓鱼点"}),e.jsx("div",{style:{textIndent:"2em"},children:"羽未日出点往南："}),e.jsx("div",{style:{textIndent:"4em"},children:"惠美须神社鸟居 → 往东，蔷薇庄，海水浴场"}),e.jsx("div",{style:{textIndent:"4em"},children:"惠美须神社鸟居 → 往西，游戏主界面拍摄点"})]}),e.jsxs(N,{children:["其他说明：",e.jsx("br",{}),e.jsx("div",{style:{textIndent:"2em"},children:"1. 小卖部和食堂已停业，只能在门口拍照；"}),e.jsx("div",{style:{textIndent:"2em"},children:"2. 海狸家附近点位较多；"}),e.jsx("div",{style:{textIndent:"2em"},children:"3. 海狸家客厅和卧室需要预定石井商店民宿才可拍照；"}),e.jsx("div",{style:{textIndent:"2em"},children:"4. 白羽钓鱼点涨潮时无法到达；"})]})]})},"guide")})]}),e.jsx(s.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.4},children:e.jsx(sa,{children:e.jsxs(la,{children:[e.jsx(ca,{scale:k,src:"images/webps/直岛/直岛地图-路线版.webp",alt:"直岛地图"}),e.jsx(da,{children:$.map((g,w)=>e.jsxs(pa,{x:g.x,y:g.y,iconSize:g.size,initial:{scale:0},animate:{scale:1},transition:{delay:1+w*.1,duration:.5},whileHover:{scale:1.2},title:g.title,onClick:()=>{const z=S[g.title];z&&x(g.title,z.mapImage,z.description,z.iconPositions||[])},onMouseEnter:()=>{const z=Ea[g.title];z&&h({x:g.x,y:g.y,title:g.title,image:z.image,desc:z.desc})},onMouseLeave:()=>h(null),children:[g.iconType==="emoji"?e.jsx("span",{style:{fontSize:`${g.size}px`},children:g.emoji}):e.jsx("img",{src:g.icon,alt:g.title}),o&&o.title===g.title&&e.jsxs($a,{children:[e.jsx(Ta,{src:o.image,alt:o.title}),e.jsx(Sa,{children:o.title}),e.jsx(Ia,{children:o.desc})]})]},g.title))})]})})}),e.jsxs(Ze,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.6},children:[e.jsx(ra,{children:"打卡地点"}),e.jsx(xa,{children:T.map(g=>e.jsxs(ga,{whileHover:{scale:1.02},transition:{duration:.3},initial:{opacity:0,y:30},animate:{opacity:1,y:0},onClick:()=>I(g.images,0,g.title),style:{cursor:"pointer"},children:[e.jsx(ye,{images:g.images,title:g.title,autoPlay:!0,interval:4e3,isPlaying:b,onImageClick:w=>I(g.images,w,g.title)}),e.jsx(ba,{children:g.title}),e.jsx(ha,{children:g.description})]},g.title))})]})]}),e.jsxs(ma,{children:[e.jsx(fa,{onClick:()=>y(!b),whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.6},children:b?"⏸ 停止轮播":"▶ 开始轮播"}),e.jsx(ua,{onClick:M,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.8},children:"返回打卡篇"})]}),e.jsx(Ba,{isOpen:d.isOpen,onClose:v,images:d.images,currentIndex:d.currentIndex,onPrevious:p,onNext:C,title:d.title}),e.jsx(st,{isOpen:m.isOpen,onClose:F,mapImage:m.mapImage,title:m.title,description:m.description,iconPositions:m.iconPositions,mode:"full"})]})},Ba=({isOpen:i,onClose:n,images:a,currentIndex:d,onPrevious:l,onNext:o,title:h})=>{var m,f,b;return!i||a.length===0?null:e.jsx(P,{children:e.jsx(ya,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:n,children:e.jsxs(va,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},onClick:y=>y.stopPropagation(),children:[a.length>1&&e.jsxs(e.Fragment,{children:[e.jsx(it,{direction:"prev",onClick:l,whileHover:{scale:1.05,background:"rgba(255, 255, 255, 0.2)",borderColor:"rgba(255, 255, 255, 0.5)"},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:25,duration:.15},style:{transformOrigin:"center"},children:"‹"}),e.jsx(it,{direction:"next",onClick:o,whileHover:{scale:1.05,background:"rgba(255, 255, 255, 0.2)",borderColor:"rgba(255, 255, 255, 0.5)"},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:25,duration:.15},style:{transformOrigin:"center"},children:"›"})]}),e.jsx(ja,{src:(m=a[d])==null?void 0:m.src,alt:`${h} - ${(f=a[d])==null?void 0:f.label}`}),e.jsxs(ka,{children:[e.jsx(Ca,{children:h}),e.jsx(za,{children:(b=a[d])==null?void 0:b.label})]})]})})})},Pa=t.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
`,Ma=t(s.button)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #ff4757 0%, #ff6b7a 50%, #ff4757 100%);
  box-shadow: 
    0 8px 25px rgba(255, 71, 87, 0.4),
    0 0 0 3px rgba(255, 255, 255, 0.2),
    inset 0 -2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  /* 音乐图标 */
  &::after {
    content: '🎵';
    font-size: 32px;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  &:hover {
    transform: scale(1.1) translateY(-3px);
    box-shadow: 
      0 15px 35px rgba(255, 71, 87, 0.6),
      0 0 0 5px rgba(255, 255, 255, 0.3),
      inset 0 -2px 15px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #ff6b7a 0%, #ff4757 50%, #ff6b7a 100%);
  }
  
  &:active {
    transform: scale(1.05) translateY(-1px);
  }
`,Oa=t(s.div)`
  position: absolute;
  bottom: 90px;
  right: 0;
  width: 400px;
  background: #ffffff; /* 纯白背景，移除毛玻璃效果 */
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
`,Da=t.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`,Aa=t.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background: linear-gradient(135deg, #ff4757, #ff6b7a);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin-right: 15px;
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
`,La=t.div`
  flex: 1;
`,Ha=t.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Ra=t.div`
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Ka=t.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #666;
  }
`,Na=t.div`
  margin-bottom: 20px;
`,Ya=t.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
`,Va=t.div`
  width: 100%;
  height: 4px;
  background: #e9e9e9;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
`,Ua=t(s.div)`
  height: 100%;
  background: linear-gradient(90deg, #ff4757, #ff6b7a);
  border-radius: 2px;
  width: ${i=>i.progress}%;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: #ff4757;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
  }
`,_a=t.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px; /* 增大间距，使播放按钮居中明显 */
  margin-bottom: 20px;
`,we=t(s.button)`
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 71, 87, 0.1);
    color: #ff4757;
  }
`,Xa=t(we)`
  font-size: 24px;
  background: linear-gradient(135deg, #ff4757, #ff6b7a);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #ff6b7a, #ff4757);
    transform: scale(1.05);
  }
`,Wa=t.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`,Qa=t.div`
  font-size: 16px;
  color: #666;
  min-width: 20px;
`,Ga=t.input`
  flex: 1;
  height: 4px;
  background: #e9e9e9;
  border-radius: 2px;
  outline: none;
  appearance: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: #ff4757;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
  }
`,qa=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`,Ja=t.div`
  max-height: 200px; /* 固定高度，显示约4首歌曲 */
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 5px;
  position: relative;
  
  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 71, 87, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(255, 71, 87, 0.5);
    }
  }
  
  /* Firefox 滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 71, 87, 0.3) rgba(0, 0, 0, 0.05);
`,Za=t(s.div)`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${i=>i.isActive?"rgba(255, 71, 87, 0.1)":"transparent"};
  
  &:hover {
    background: rgba(255, 71, 87, 0.05);
  }
`,er=t.div`
  width: 30px;
  font-size: 12px;
  color: ${i=>i.isActive?"#ff4757":"#999"};
  font-weight: ${i=>i.isActive?"600":"400"};
`,tr=t.div`
  flex: 1;
`,ir=t.div`
  font-size: 14px;
  color: ${i=>i.isActive?"#ff4757":"#333"};
  font-weight: ${i=>i.isActive?"600":"400"};
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,nr=t.div`
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,or=t.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(transparent, rgba(255, 255, 255, 0.8));
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #999;
`,nt=i=>{const n=Math.floor(i/60),a=Math.floor(i%60);return`${n}:${a.toString().padStart(2,"0")}`},ar=()=>{const{isPlaying:i,currentTime:n,duration:a,volume:d,playlist:l,currentTrack:o,currentIndex:h,playMode:m,togglePlay:f,next:b,prev:y,seek:k,setVolume:$,selectTrack:S,setPlayMode:T,isPlayerOpen:I,setPlayerOpen:v}=It(),p=c.useRef(null),[C,x]=c.useState(!1),F=r=>{const j=r.currentTarget.getBoundingClientRect(),A=(r.clientX-j.left)/j.width*a;k(A)},M=()=>{switch(m){case"single":return"🔂";case"list":return"🔁";default:return"🔁"}},g=()=>{switch(m){case"single":return"单曲循环";case"list":return"列表循环";default:return"列表循环"}},w=()=>{const r=["list","single"],E=(r.indexOf(m)+1)%r.length;T(r[E])},z=a>0?n/a*100:0;return c.useEffect(()=>{if(p.current&&h>=0){const r=p.current,E=r.children[h];if(E){const A=r.getBoundingClientRect(),X=E.getBoundingClientRect();X.top>=A.top&&X.bottom<=A.bottom||E.scrollIntoView({behavior:"smooth",block:"nearest"})}}},[h]),c.useEffect(()=>{const r=p.current;if(!r)return;const j=()=>{const{scrollTop:E}=r;x(E>10)};return r.addEventListener("scroll",j),()=>r.removeEventListener("scroll",j)},[]),e.jsxs(Pa,{"data-music-player":"true",children:[e.jsx(Ma,{isPlaying:i,onClick:()=>v(!I),whileHover:{scale:1.1},whileTap:{scale:.95},"data-music-player":"true"}),e.jsx(P,{children:I&&e.jsxs(Oa,{initial:{opacity:0,scale:.8,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.8,y:20},transition:{duration:.3,ease:"easeOut"},children:[e.jsxs(Da,{children:[e.jsx(Aa,{children:"🎵"}),e.jsxs(La,{children:[e.jsx(Ha,{children:(o==null?void 0:o.name)||"暂无歌曲"}),e.jsx(Ra,{children:(o==null?void 0:o.artist)||"未知艺术家"})]}),e.jsx(Ka,{onClick:()=>v(!1),children:"✕"})]}),o&&e.jsxs(Na,{children:[e.jsxs(Ya,{children:[e.jsx("span",{children:nt(n)}),e.jsx("span",{children:nt(a)})]}),e.jsx(Va,{onClick:F,children:e.jsx(Ua,{progress:z})})]}),e.jsxs(_a,{children:[e.jsx(we,{onClick:y,whileHover:{scale:1.1},whileTap:{scale:.9},children:"⏮️"}),e.jsx(Xa,{onClick:f,whileHover:{scale:1.05},whileTap:{scale:.95},"data-music-player":"true",children:i?"⏸️":"▶️"}),e.jsx(we,{onClick:b,whileHover:{scale:1.1},whileTap:{scale:.9},children:"⏭️"})]}),e.jsxs(Wa,{children:[e.jsx(Qa,{children:"🔊"}),e.jsx(Ga,{type:"range",min:"0",max:"1",step:"0.01",value:d,onChange:r=>$(parseFloat(r.target.value))})]}),e.jsxs(qa,{children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[e.jsxs("span",{style:{fontSize:"14px",fontWeight:"600",color:"#333"},children:["播放列表 (",l.length,")"]}),l.length>4&&e.jsx("span",{style:{fontSize:"11px",color:"#999"},children:"显示前4首，滚动查看更多"})]}),e.jsxs(s.button,{onClick:w,style:{background:"none",border:"none",cursor:"pointer",fontSize:"12px",color:"#ff4757",display:"flex",alignItems:"center",gap:"4px",padding:"4px 8px",borderRadius:"4px",transition:"all 0.2s"},whileHover:{scale:1.05,backgroundColor:"rgba(255, 71, 87, 0.1)"},whileTap:{scale:.95},children:[M()," ",g()]})]}),e.jsxs(Ja,{ref:p,children:[l.map((r,j)=>e.jsxs(Za,{isActive:j===h,onClick:()=>S(j),whileHover:{x:5},children:[e.jsx(er,{isActive:j===h,children:j===h&&i?"🎵":j+1}),e.jsxs(tr,{children:[e.jsx(ir,{isActive:j===h,children:r.name}),e.jsx(nr,{children:r.artist})]})]},r.id)),l.length>4&&!C&&e.jsx(or,{children:"↓ 滚动查看更多"})]})]})})]})},rr=()=>{const[i,n]=c.useState({x:0,y:0}),[a,d]=c.useState(!1),[l,o]=c.useState(0),h=c.useRef(null),m=c.useRef(),f=c.useRef(0),b=c.useRef(!1),y=["images/webps/七影蝶-3.webp","images/webps/七影蝶-4.webp"],k=c.useCallback(()=>{b.current||(y.forEach(v=>{const p=new Image;p.src=v}),b.current=!0)},[y]),$=c.useCallback((v,p)=>{const C=Date.now();if(C-f.current<100)return;f.current=C;const x=document.elementFromPoint(v,p),F=x&&(x.tagName==="A"||x.tagName==="BUTTON"||x.tagName==="INPUT"||x.tagName==="SELECT"||x.tagName==="TEXTAREA"||x.getAttribute("role")==="button"||x.classList.contains("clickable")||x instanceof HTMLElement&&x.style.cursor==="pointer"||x.closest('a, button, [role="button"], .clickable'));d(!!F)},[]),S=c.useCallback((v,p)=>{m.current&&cancelAnimationFrame(m.current),m.current=requestAnimationFrame(()=>{n({x:v,y:p}),$(v,p)})},[$]),T=c.useCallback(v=>{v.style&&v.style.cursor&&v.style.cursor!=="none"&&(v.dataset.originalCursor||(v.dataset.originalCursor=v.style.cursor),v.style.cursor="none")},[]),I=c.useCallback(()=>{document.querySelectorAll("*").forEach(p=>T(p))},[T]);return c.useEffect(()=>{k();const v=C=>{S(C.clientX,C.clientY)};document.addEventListener("mousemove",v,{passive:!0}),I();const p=new MutationObserver(C=>{C.forEach(x=>{if(x.addedNodes.forEach(F=>{if(F.nodeType===Node.ELEMENT_NODE){const M=F;T(M),M.querySelectorAll("*").forEach(w=>T(w))}}),x.type==="attributes"&&x.attributeName==="style"){const F=x.target;T(F)}})});return p.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["style","class"]}),()=>{document.removeEventListener("mousemove",v),p.disconnect(),m.current&&cancelAnimationFrame(m.current)}},[S,k,I,T]),c.useEffect(()=>{const v=setInterval(()=>{o(p=>(p+1)%y.length)},a?200:300);return()=>clearInterval(v)},[a,y.length]),c.useEffect(()=>{const v=()=>{h.current&&(h.current.style.opacity="0")},p=()=>{h.current&&(h.current.style.opacity="1")};return document.addEventListener("mouseleave",v),document.addEventListener("mouseenter",p),()=>{document.removeEventListener("mouseleave",v),document.removeEventListener("mouseenter",p)}},[]),e.jsx("div",{ref:h,className:`butterfly-cursor ${a?"on-clickable":""}`,style:{transform:`translate3d(${i.x-20}px, ${i.y-20}px, 0)`,willChange:"transform",pointerEvents:"none",border:"none",outline:"none",boxShadow:"none",background:"transparent"},children:e.jsx("img",{src:y[l],alt:"蝴蝶鼠标",className:"butterfly-wing",draggable:!1,style:{userSelect:"none",transform:a?"scale(1.1)":"scale(1)",transition:"transform 0.2s ease-out",willChange:"transform",pointerEvents:"none",border:"none",outline:"none",boxShadow:"none",background:"transparent"}})})};function sr(){return e.jsx(Ft,{children:e.jsx(yt,{children:e.jsxs("div",{style:{position:"relative",width:"100vw",height:"100vh"},children:[e.jsxs(vt,{children:[e.jsx(L,{path:"/",element:e.jsx(Gt,{})}),e.jsx(L,{path:"/contents",element:e.jsx(xi,{})}),e.jsx(L,{path:"/traffic",element:e.jsx(Vi,{})}),e.jsx(L,{path:"/checkin",element:e.jsx(vn,{})}),e.jsx(L,{path:"/divine-realm",element:e.jsx(Tn,{})}),e.jsx(L,{path:"/other-pilgrimage",element:e.jsx(An,{})}),e.jsx(L,{path:"/megijima",element:e.jsx(mo,{})}),e.jsx(L,{path:"/ogijima",element:e.jsx(ea,{})}),e.jsx(L,{path:"/naoshima",element:e.jsx(Fa,{})})]}),e.jsx(ar,{}),e.jsx(rr,{})]})})})}fe.createRoot(document.getElementById("root")).render(e.jsx(wt.StrictMode,{children:e.jsx(sr,{})}))});export default lr();
