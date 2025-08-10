var ct=Object.defineProperty,pt=Object.defineProperties;var ut=Object.getOwnPropertyDescriptors;var ii=Object.getOwnPropertySymbols;var xt=Object.prototype.hasOwnProperty,gt=Object.prototype.propertyIsEnumerable;var ti=(e,o,t)=>o in e?ct(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t,H=(e,o)=>{for(var t in o||(o={}))xt.call(o,t)&&ti(e,t,o[t]);if(ii)for(var t of ii(o))gt.call(o,t)&&ti(e,t,o[t]);return e},W=(e,o)=>pt(e,ut(o));var mt=(e,o)=>()=>(o||e((o={exports:{}}).exports,o),o.exports);var pe=(e,o,t)=>new Promise((n,r)=>{var a=c=>{try{d(t.next(c))}catch(p){r(p)}},l=c=>{try{d(t.throw(c))}catch(p){r(p)}},d=c=>c.done?n(c.value):Promise.resolve(c.value).then(a,l);d((t=t.apply(e,o)).next())});import{r as g,b as ft,a as J}from"./vendor-ff82005c.js";import{u as U,B as ht,R as bt,a as V}from"./router-d0aa0b1d.js";import{m as vt,d as s,a as h,A as L}from"./ui-8fbed0d0.js";var zl=mt(we=>{(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();var Hi={exports:{}},ye={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wt=g,yt=Symbol.for("react.element"),jt=Symbol.for("react.fragment"),kt=Object.prototype.hasOwnProperty,Ct=wt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,St={key:!0,ref:!0,__self:!0,__source:!0};function Wi(e,o,t){var n,r={},a=null,l=null;t!==void 0&&(a=""+t),o.key!==void 0&&(a=""+o.key),o.ref!==void 0&&(l=o.ref);for(n in o)kt.call(o,n)&&!St.hasOwnProperty(n)&&(r[n]=o[n]);if(e&&e.defaultProps)for(n in o=e.defaultProps,o)r[n]===void 0&&(r[n]=o[n]);return{$$typeof:yt,type:e,key:a,ref:l,props:r,_owner:Ct.current}}ye.Fragment=jt;ye.jsx=Wi;ye.jsxs=Wi;Hi.exports=ye;var i=Hi.exports,_e={},ni=ft;_e.createRoot=ni.createRoot,_e.hydrateRoot=ni.hydrateRoot;const Ki=g.createContext(void 0),zt=()=>{const e=g.useContext(Ki);if(e===void 0)throw new Error("useMusic must be used within a MusicProvider");return e},Tt=[{id:"summer-pockets",name:"Summer Pockets",artist:"水月陵",src:"/audio/水月陵 - Summer Pockets.mp3",album:"Summer Pockets OST",track_number:1},{id:"sea-you-me",name:"Sea, You & Me",artist:"麻枝准",src:"/audio/麻枝准 - Sea, You & Me.mp3",album:"Summer Pockets OST",track_number:2},{id:"alcatale",name:"アルカテイル",artist:"鈴木このみ",src:"/audio/鈴木このみ,VISUAL ARTS  Key - アルカテイル.mp3",album:"Summer Pockets OST",track_number:3},{id:"yoru-wa-mijikaku",name:"夜は短く、空は遠くて…",artist:"水月陵",src:"/audio/水月陵 - 夜は短く、空は遠くて….wav",album:"Summer Pockets OST",track_number:4},{id:"hiyoku-no-chou",name:"比翼の蝶たち",artist:"高森奈津美",src:"/audio/5-高森奈津美 - 比翼の蝶たち.flac",album:"Summer Pockets OST",track_number:5},{id:"departure",name:"Departure!",artist:"嶺内ともみ",src:"/audio/6-嶺内ともみ - Departure!.flac",album:"Summer Pockets OST",track_number:6},{id:"with",name:"with",artist:"嶺内ともみ",src:"/audio/7-嶺内ともみ - with.flac",album:"Summer Pockets OST",track_number:7},{id:"natsu-ni-kimi-wo",name:"夏に君を待ちながら",artist:"小原好美",src:"/audio/8-小原好美 - 夏に君を待ちながら.flac",album:"Summer Pockets OST",track_number:8},{id:"tsumugi-no-natsuyasumi",name:"紬の夏休み",artist:"岩井映美里",src:"/audio/9-岩井映美里,VISUAL ARTS  Key - 紬の夏休み.flac",album:"Summer Pockets OST",track_number:9}],Pt=({children:e})=>{const o=g.useRef(null),t=g.useRef("list"),n=g.useRef(!1),r=g.useRef(!1),[a,l]=g.useState(!1),[d,c]=g.useState(!1),[p,x]=g.useState(0),[f,v]=g.useState(0),[w,C]=g.useState(.7),[j,y]=g.useState(Tt),[k,E]=g.useState(0),[b,B]=g.useState("list"),[F,P]=g.useState(!1),m=j[k]||null,z=g.useCallback(()=>pe(we,null,function*(){try{const u=yield fetch("http://localhost:8000/api/music/playlist");if(u.ok){const $=yield u.json();$.tracks&&$.tracks.length>0&&y($.tracks)}}catch(u){}}),[]);g.useEffect(()=>{t.current=b},[b]),g.useEffect(()=>{const u=o.current;!u||!m||(!n.current||u.src!==location.origin+m.src)&&(u.src=m.src,u.volume=w,u.load(),n.current=!0)},[m]),g.useEffect(()=>{const u=o.current;u&&(u.volume=w)},[w]);const T=g.useCallback(()=>pe(we,null,function*(){const u=o.current;if(!(!u||!m))try{const $=decodeURI(u.src),M=location.origin+m.src;$.endsWith(m.src)||(u.src=m.src,u.load(),yield new Promise(A=>{const X=()=>{u.removeEventListener("canplay",X),A(void 0)};u.addEventListener("canplay",X)})),yield u.play(),l(!0),c(!1)}catch($){$.name==="NotAllowedError"||(l(!1),c(!0))}}),[m]),O=g.useCallback(()=>{const u=o.current;u&&(u.pause(),l(!1),c(!0))},[]),N=g.useCallback(()=>{var $;const u=o.current;u&&(a?O():d&&decodeURI(u.src).endsWith(($=m==null?void 0:m.src)!=null?$:"")?u.play().then(()=>{l(!0),c(!1)}).catch(M=>{M.name==="NotAllowedError"||T()}):T())},[a,d,O,T,m]),_=g.useCallback(()=>{let u;b==="single"?u=k:u=(k+1)%j.length,E(u),n.current=!1,r.current=!0},[k,j.length,b]),Q=g.useCallback(()=>{let u;b==="single"?u=k:u=k===0?j.length-1:k-1,E(u),n.current=!1,r.current=!0},[k,j.length,b]),ie=g.useCallback(u=>{const $=o.current;$&&($.currentTime=u,x(u))},[]),te=g.useCallback(u=>{C(u);const $=o.current;$&&($.volume=u)},[]),S=g.useCallback(u=>{u>=0&&u<j.length&&u!==k&&(E(u),n.current=!1,r.current=!0)},[j.length,k]);g.useEffect(()=>{r.current&&m&&n.current&&(r.current=!1,setTimeout(()=>{T()},100))},[m,T]),g.useEffect(()=>{const u=o.current;if(!u)return;const $=()=>{v(u.duration||0)},M=()=>{x(u.currentTime||0)},A=()=>{l(!1),c(!1),t.current==="single"?(u.currentTime=0,T()):_()},X=()=>{l(!0),c(!1)},I=()=>{l(!1),c(!0)},oe=Se=>{l(!1),c(!0)};return u.addEventListener("loadedmetadata",$),u.addEventListener("timeupdate",M),u.addEventListener("ended",A),u.addEventListener("play",X),u.addEventListener("pause",I),u.addEventListener("error",oe),()=>{u.removeEventListener("loadedmetadata",$),u.removeEventListener("timeupdate",M),u.removeEventListener("ended",A),u.removeEventListener("play",X),u.removeEventListener("pause",I),u.removeEventListener("error",oe)}},[T,_]),g.useEffect(()=>{z()},[z]);const R={isPlaying:a,isPaused:d,currentTime:p,duration:f,volume:w,playlist:j,currentTrack:m,currentIndex:k,playMode:b,play:T,pause:O,togglePlay:N,next:_,prev:Q,seek:ie,setVolume:te,selectTrack:S,setPlayMode:B,audioRef:o,isPlayerOpen:F,setPlayerOpen:P};return i.jsxs(Ki.Provider,{value:R,children:[e,i.jsx("audio",{ref:o,style:{display:"none"},preload:"metadata"})]})},Et=vt`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`,$t=s.div`
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
`,Bt=s.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`,Ft=s.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: ${Et} ${e=>e.duration}s infinite;
  
  &:nth-child(odd) {
    animation-delay: ${e=>e.delay}s;
  }
`,Mt=s.div`
  position: relative;
  width: 600px;
  height: 800px;
  perspective: 1000px;
`,Ot=s(h.div)`
  width: 600px;
  height: 800px;
  position: relative;
  cursor: pointer;
`,Dt=s.div`
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
`,At=s(h.div)`
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
`,Yt=s.div`
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
`,Rt=s.h1`
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
`,Xt=s.div`
  position: relative;
  margin-bottom: 30px;
`,Lt=s.img`
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
`,Nt=s(h.div)`
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
`,_t=s.img`
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 18px;
  box-shadow: 0 0 40px rgba(0,0,0,0.7);
  border: 3px solid #FFD700;
  background: #fff;
`,Ht=s.button`
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
`,Wt=s(h.div)`
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
`,Kt=s.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* 🔧 保持图片完整性，不裁剪 */
  object-position: center center; /* 🔧 图片居中对齐 */
  transition: none; /* 🔧 移除过渡效果，图片直接切换 */
  display: block;
`,It=s(h.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  z-index: 100;
  pointer-events: none;
`,Vt=()=>{const e=U(),[o,t]=g.useState(!1),[n,r]=g.useState(!1),[a,l]=g.useState([]),[d,c]=g.useState(!1);g.useEffect(()=>{(()=>{const v=[];for(let w=0;w<100;w++)v.push({id:w,left:Math.random()*100,top:Math.random()*100,size:Math.random()*3+1,duration:Math.random()*3+2,delay:Math.random()*2});l(v)})()},[]);const p=()=>{t(!0)},x=()=>{o&&e("/contents")};return i.jsxs($t,{children:[i.jsx(Bt,{children:a.map(f=>i.jsx(Ft,{style:{left:`${f.left}%`,top:`${f.top}%`,width:`${f.size}px`,height:`${f.size}px`},duration:f.duration,delay:f.delay},f.id))}),i.jsx(Mt,{children:i.jsxs(Ot,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:1,ease:"easeOut"},children:[i.jsx(Dt,{}),i.jsx(At,{animate:o?{rotateY:-180}:{rotateY:0},transition:{duration:2,ease:"easeInOut"},style:{transformStyle:"preserve-3d"},onAnimationComplete:x,children:i.jsxs(Yt,{children:[i.jsx(Rt,{children:"Summer Pockets巡礼日记"}),i.jsx(Xt,{children:i.jsx(Lt,{src:"images/webps/sprb封面图.webp",alt:"Summer Pockets 封面",onClick:()=>c(!0)})})]})}),i.jsx(Wt,{onClick:p,onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),initial:{y:"-50%"},whileHover:{scale:1.1,y:"-50%",filter:"brightness(1.1) drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))"},whileTap:{scale:.95,y:"-50%"},animate:o?{opacity:0,y:"-50%"}:{opacity:1,y:"-50%"},transition:{duration:.2},children:i.jsx(Kt,{src:n?"/images/webps/七影蝶-3.webp":"/images/webps/七影蝶-4.webp",alt:"蝴蝶锁图标"})})]})}),i.jsx(L,{children:d&&i.jsxs(Nt,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>c(!1),children:[i.jsx(Ht,{onClick:f=>{f.stopPropagation(),c(!1)},title:"关闭",children:"×"}),i.jsx(_t,{src:"images/webps/sprb封面图.webp",alt:"Summer Pockets 封面大图",onClick:f=>f.stopPropagation()})]})}),i.jsx(L,{children:o&&i.jsx(It,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.8,delay:1.2}})})]})},Zt=s(h.div)`
  position: absolute;
  /* 🦋 蝴蝶图片尺寸设置：容器宽高由size参数控制 */
  width: ${e=>e.size}px;
  height: ${e=>e.size}px;
  right: -${e=>e.size/2}px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  pointer-events: none;
`,Ut=s(h.img)`
  /* 🦋 蝴蝶图片尺寸设置：图片实际显示尺寸由size参数控制 */
  width: ${e=>e.size}px;
  height: ${e=>e.size}px;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
`,ze=({isHovered:e,size:o=150})=>{const[t,n]=g.useState(1),r=g.useRef(null),a=["images/webps/七影蝶-3.webp","images/webps/七影蝶-4.webp"];return g.useEffect(()=>(e?r.current=setInterval(()=>{n(l=>(l+1)%a.length)},400):(r.current&&(clearInterval(r.current),r.current=null),n(1)),()=>{r.current&&clearInterval(r.current)}),[e]),i.jsx(Zt,{size:o,initial:{opacity:0,scale:.5,x:-20},animate:{opacity:1,scale:1,x:0},exit:{opacity:0,scale:.5,x:-20},transition:{duration:.3,ease:"easeOut"},children:i.jsx(Ut,{src:a[t],alt:"蝴蝶动画",size:o})})},Qt=h(s.div`
  position: absolute;
  left: ${e=>e.x}vw;
  top: ${e=>e.y}vh;
  width: ${e=>e.size}px;
  height: ${e=>e.size}px;
  background: rgba(255,255,255,${e=>e.opacity});
  border-radius: 50%;
  pointer-events: none;
  filter: blur(0.5px);
`),Te=({isVisible:e=!0})=>{const[o]=g.useState(()=>{const t=[];for(let n=0;n<80;n++)t.push({x:Math.random()*100,y:Math.random()*100,size:Math.random()*1.8+.7,opacity:Math.random()*.5+.5,float:Math.random()*6+2,duration:Math.random()*3+2});return t});return e?i.jsx(i.Fragment,{children:o.map((t,n)=>i.jsx(Qt,{x:t.x,y:t.y,size:t.size,opacity:t.opacity,animate:{y:[0,-t.float,0,t.float,0]},transition:{duration:t.duration,repeat:1/0,repeatType:"loop",ease:"easeInOut",delay:Math.random()*3}},n))}):null},qt=s.div`
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
`,Gt=s(h.div)`
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
`,Jt=s.div`
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
`,en=s.div`
  width: 50%;
  padding: 60px 40px;
  background: #FFFEF7;
  border-radius: 0 20px 20px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,tn=s.h1`
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
`,nn=s.p`
  color: #FF8C00;
  font-size: 18px;
  text-align: center;
  margin-bottom: 50px;
  font-style: italic;
  font-family: 'KaiTi', 'SimKai', serif;
`,on=s.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 20px;
`,Pe=s(h.div)`
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
    background: ${e=>e.isActive?"linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(135, 206, 235, 0.9), rgba(255, 255, 255, 0.8))":"transparent"};
    transform: scaleX(${e=>e.isActive?1:0});
    transition: transform 0.3s ease;
    z-index: 10;
  }
`,Ee=s.div`
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
`,$e=s.h3`
  color: ${e=>e.isActive?"#FFFFFF":"#2E8B57"};
  font-size: 32px;
  margin: 0;
  flex: 1;
  font-weight: 700;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  transition: all 0.3s ease;
  text-shadow: ${e=>e.isActive?"2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(135, 206, 235, 0.6)":"1px 1px 2px rgba(46, 139, 87, 0.2)"};
  position: relative;
  z-index: 10;
`,oi=s(h.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`,an=s(h.div)`
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
`,rn=s.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
  border: 3px solid #FFB6C1;
`,sn=s.p`
  font-size: 20px;
  color: #FF6B35;
  font-weight: 600;
  line-height: 1.6;
  font-family: 'KaiTi', 'SimKai', serif;
  text-shadow: 1px 1px 2px rgba(255, 107, 53, 0.2);
`,ln=s(h.div)`
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
`,dn=s(h.button)`
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
`,ai={traffic:{image:"/images/webps/交通篇摘要图.webp",text:"🚌 国内各地到高松的完整交通攻略"},checkin:{image:"/images/webps/打卡篇摘要图.webp",text:"📍 女木岛、男木岛、直岛圣地巡礼"},other:{image:"/images/webps/神域摘要图.webp",text:"记得来神域寄存和领取自己的七影碟哦！🦋"}},cn=()=>{const e=U(),[o,t]=g.useState(null),[n,r]=g.useState(null),a=d=>{d==="traffic"?e("/traffic"):d==="checkin"?e("/checkin"):d==="other"&&e("/divine-realm")},l=()=>{e("/")};return i.jsx(qt,{children:i.jsxs(Gt,{initial:{scale:.7,opacity:0,rotateY:-15},animate:{scale:1,opacity:1,rotateY:0},transition:{duration:1,ease:"easeOut"},children:[i.jsxs(Jt,{children:[i.jsx(tn,{children:"目录"}),i.jsx(nn,{children:"Summer Pockets 圣地巡礼日记"}),i.jsxs(on,{children:[i.jsxs(Pe,{isActive:o==="traffic",onMouseEnter:()=>{t("traffic"),r("traffic")},onMouseLeave:()=>{t(null),r(null)},onClick:()=>a("traffic"),whileHover:{scale:1.02},whileTap:{scale:.98},children:[i.jsx(Te,{isVisible:o==="traffic"}),i.jsx(Ee,{children:"🚌"}),i.jsxs($e,{isActive:o==="traffic",children:["交通篇",i.jsx(ze,{isHovered:n==="traffic",size:40})]})]}),i.jsxs(Pe,{isActive:o==="checkin",onMouseEnter:()=>{t("checkin"),r("checkin")},onMouseLeave:()=>{t(null),r(null)},onClick:()=>a("checkin"),whileHover:{scale:1.02},whileTap:{scale:.98},children:[i.jsx(Te,{isVisible:o==="checkin"}),i.jsx(Ee,{children:"📍"}),i.jsxs($e,{isActive:o==="checkin",children:["打卡篇",i.jsx(ze,{isHovered:n==="checkin",size:40})]})]}),i.jsxs(Pe,{isActive:o==="other",onMouseEnter:()=>{t("other"),r("other")},onMouseLeave:()=>{t(null),r(null)},onClick:()=>a("other"),whileHover:{scale:1.02},whileTap:{scale:.98},children:[i.jsx(Te,{isVisible:o==="other"}),i.jsx(Ee,{children:"🦋"}),i.jsxs($e,{isActive:o==="other",children:["神域",i.jsx(ze,{isHovered:n==="other",size:40})]})]})]}),i.jsx(dn,{onClick:l,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.5,delay:.8},children:"🏠 返回首页"})]}),i.jsx(en,{children:i.jsx(L,{mode:"wait",children:o&&o!==null?i.jsx(oi,{initial:{opacity:0,y:30,scale:.9},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:-30,scale:.9},transition:{duration:.4,ease:"easeOut"},children:i.jsxs(an,{initial:{opacity:0,rotateX:-20},animate:{opacity:1,rotateX:0},transition:{duration:.5,delay:.1},children:[i.jsx(rn,{src:ai[o].image,alt:`${o} 摘要图`,onError:d=>{d.target.style.display="none"}}),i.jsx(sn,{children:ai[o].text})]})},o):i.jsx(oi,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:i.jsxs(ln,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:["悬停章节标题查看摘要信息",i.jsx("br",{}),i.jsx("span",{style:{color:"#FF6B35",fontWeight:"bold"},children:"让我们一起重回那个夏天吧！"})]})},"placeholder")})})]})})},pn=s.div`
  background: #ffffff;
  padding: 40px 20px;
  border-radius: 20px;
  margin: 20px 0;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  border: 1px solid #e0e0e0;
`,un=s.h2`
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
  font-weight: 700;
  position: relative;
  z-index: 1;
`,xn=s.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`,gn=s(h.div)`
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
`,mn=s.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 12px;
`,fn=s.div`
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
`,hn=s.h3`
  font-size: 20px;
  color: #333;
  margin: 0;
  font-weight: 600;
  flex: 1;
`,bn=s.div`
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
`,vn=({cards:e,title:o="交通攻略指南"})=>{const t=r=>{const a=r.split(`
`);let l="",d=!1;for(const c of a)c.trim().startsWith("•")?(d||(l+=`
`,d=!0),l+=c+`
`):(d&&(l+=`
`,d=!1),l+=c+`
`);return l.trim()},n={hidden:{opacity:0,y:50},visible:r=>({opacity:1,y:0,transition:{delay:r*.1,duration:.5,ease:"easeOut"}})};return i.jsxs(pn,{children:[i.jsx(un,{children:o}),i.jsx(xn,{children:e.map((r,a)=>i.jsxs(gn,{custom:a,initial:"hidden",animate:"visible",variants:n,whileHover:{scale:1.02},transition:{type:"spring",stiffness:300,damping:20},children:[i.jsxs(mn,{children:[i.jsx(fn,{children:r.icon}),i.jsx(hn,{children:r.title})]}),i.jsx(bn,{children:t(r.content)})]},r.id))})]})},wn=s.div`
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
`,yn=s.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`,jn=s(h.button)`
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
`,kn=s.h1`
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
`,Cn=s.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  border-bottom: 2px solid #e0e0e0;
`,Be=s(h.button)`
  background: ${e=>e.active?"#FF6B35":"transparent"};
  color: ${e=>e.active?"white":"#FF6B35"};
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
    background: ${e=>e.active?"#FF6B35":"rgba(255, 107, 53, 0.1)"};
    transform: translateY(-2px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#FF6B35":"transparent"};
  }
`,ri=s.div`
  display: flex;
  justify-content: center;
  background: #f8f9fa;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`,ue=s(h.button)`
  background: ${e=>e.active?"#FFB347":"transparent"};
  color: ${e=>e.active?"white":"#666"};
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
  margin: 0 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${e=>e.active?"#FFB347":"rgba(255, 179, 71, 0.2)"};
  }
`,Fe=s.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`,Me=s(h.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`,Oe=s.h2`
  color: #FF6B35;
  font-size: 28px;
  margin-bottom: 20px;
  border-bottom: 3px solid #FFB347;
  padding-bottom: 10px;
  display: inline-block;
`,Sn=s.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
`,zn=s(h.div)`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  border-left: 5px solid #FFB347;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`,Tn=s.h3`
  color: #FF6B35;
  font-size: 22px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`,Pn=s.div`
  color: #666;
  line-height: 1.6;
  font-size: 16px;
`,En=s(h.button)`
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
`,si=s.div`
  background: #FFB347;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  margin-left: 10px;
`,$n=s.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 30px;
`,Bn=s(h.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(255, 165, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 165, 0, 0.1);
`,Fn=s.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #FFB347;
`,Mn=s.div`
  font-size: 24px;
`,On=s.h2`
  font-size: 22px;
  color: #FF6B35;
  margin: 0;
  font-weight: 700;
`,Dn=s.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 10px;
  background: ${e=>e.checked?"rgba(255, 179, 71, 0.1)":"transparent"};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 179, 71, 0.1);
  }
`,An=s.div`
  width: 20px;
  height: 20px;
  border: 2px solid #FFB347;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${e=>e.checked?"#FFB347":"white"};
  color: white;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
  
  &:hover {
    background: ${e=>e.checked?"#FF6B35":"#FFB347"};
    transform: scale(1.1);
  }
`,Yn=s.div`
  font-size: 16px;
  color: ${e=>e.checked?"#999":"#555"};
  text-decoration: ${e=>e.checked?"line-through":"none"};
  line-height: 1.5;
  transition: all 0.3s ease;
`,Rn=s.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(255, 165, 0, 0.2);
`,Xn=s.div`
  font-size: 18px;
  color: #FF6B35;
  font-weight: 600;
  margin-bottom: 10px;
`,Ln=s.div`
  background: #e0e0e0;
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
  position: relative;
`,Nn=s.div`
  background: linear-gradient(45deg, #FF6B35, #FFB347);
  height: 100%;
  width: ${e=>e.percentage}%;
  transition: width 0.5s ease;
  border-radius: 10px;
`,li=[{id:"pre-departure",title:"出行前准备",icon:"✈️",items:["护照/签证办理","机票预订","住宿预订","旅行保险购买","日元兑换/银行卡准备","手机卡/随身WiFi准备","行李打包（衣物、药品、充电器等）","重要文件复印/电子备份"]},{id:"flight-transport",title:"机票与交通",icon:"🚌",items:["选择出发城市及航班","机票购买平台比价","了解行李托运规定","熟悉值机与登机流程","了解日本入境流程","准备交通卡购买","查询机场换乘信息"]},{id:"japan-itinerary",title:"日本国内行程",icon:"🎌",items:["确定机场到高松的交通方式","查询详细换乘流程","学习购票机使用方法","规划景点交通路线","准备各种路线方案","下载相关交通APP","收藏实用网站链接"]},{id:"schedule-budget",title:"行程安排与预算",icon:"📅",items:["制定每日行程计划","预算分配（交通、住宿、餐饮等）","预订热门景点门票","安排购物时间和地点","制定应急预案","准备离境相关安排"]},{id:"useful-tools",title:"实用工具推荐",icon:"🛠️",items:["Google Maps （路线规划）","Yahoo!乘换案内 （换乘查询）","Google Translate （语言翻译）","日本旅游APP下载","天气预报查询","汇率查询工具","紧急联系方式记录"]},{id:"pilgrimage-specific",title:"圣地巡礼专项",icon:"🌟",items:["女木岛交通及景点信息","男木岛交通及景点信息","直岛交通及景点信息","拍照地点标记","开放时间确认","门票或预约信息","特殊交通工具安排"]}],_n=()=>{const e=U(),[o,t]=g.useState("international"),[n,r]=g.useState("guangzhou"),[a,l]=g.useState("kansai-takamatsu"),[d,c]=g.useState(new Set),[p,x]=g.useState(!1),[f,v]=g.useState([]);g.useEffect(()=>{fetch("/trafficdata/InDeparture/traffic_cards.json").then(P=>P.json()).then(P=>v(P)).catch(()=>v([]))},[]);const w=()=>{e("/contents")},C=(P,m)=>{const z=`${P}-${m}`;c(T=>{const O=new Set(T);return O.has(z)?O.delete(z):O.add(z),O})},j=()=>pe(we,null,function*(){x(!0);try{const P=yield fetch("/files/鸟白岛巡礼list.pdf");if(!P.ok)throw new Error("下载失败");const m=yield P.blob(),z=window.URL.createObjectURL(m),T=document.createElement("a");T.style.display="none",T.href=z,T.download="鸟白岛巡礼list.pdf",document.body.appendChild(T),T.click(),window.URL.revokeObjectURL(z),document.body.removeChild(T)}catch(P){alert("下载失败，请稍后再试")}finally{x(!1)}}),y=()=>li.reduce((P,m)=>P+m.items.length,0),k=()=>d.size,E=()=>{const P=y(),m=k();return P>0?m/P*100:0},b=()=>{const P=n==="guangzhou"?f.filter(m=>m.category==="international"&&m.subcategory==="guangzhou"):[];return i.jsx(L,{mode:"wait",children:i.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:[i.jsxs(ri,{children:[i.jsx(ue,{active:n==="guangzhou",onClick:()=>r("guangzhou"),children:"广州-春秋航空"}),i.jsxs(ue,{active:n==="other",onClick:()=>r("other"),children:["其他城市",i.jsx(si,{children:"即将开放"})]})]}),i.jsxs(Fe,{children:[n==="guangzhou"&&P.length>0?i.jsx(vn,{cards:P,title:"国际出行攻略 - 广州春秋航空"}):n==="guangzhou"&&i.jsx("div",{style:{textAlign:"center",padding:"40px",color:"#666"},children:"暂无攻略数据"}),n==="other"&&i.jsxs(Me,{children:[i.jsx(Oe,{children:"其他城市攻略"}),i.jsxs("div",{style:{textAlign:"center",padding:"60px 0"},children:[i.jsx("div",{style:{fontSize:"48px",marginBottom:"20px"},children:"🚧"}),i.jsx("h3",{style:{color:"#FF6B35",marginBottom:"15px"},children:"内容准备中"}),i.jsxs("p",{style:{color:"#666",fontSize:"18px"},children:["我们正在整理更多城市的交通攻略，包括：",i.jsx("br",{}),"北京、上海、深圳、成都、杭州等主要城市"]})]})]})]})]},"international")})},B=()=>{const P=f.filter(m=>m.category==="domestic"&&m.subcategory==="kansai-takamatsu");return i.jsx(L,{mode:"wait",children:i.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:[i.jsxs(ri,{children:[i.jsx(ue,{active:a==="kansai-takamatsu",onClick:()=>l("kansai-takamatsu"),children:"关西机场→高松（电车）"}),i.jsxs(ue,{active:a==="other",onClick:()=>l("other"),children:["其他路线",i.jsx(si,{children:"即将开放"})]})]}),i.jsxs(Fe,{children:[a==="kansai-takamatsu"&&i.jsx(Sn,{children:P.sort((m,z)=>m.order_index-z.order_index).map(m=>i.jsxs(zn,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1*m.order_index},children:[i.jsxs(Tn,{children:[i.jsx("span",{children:m.icon}),m.title]}),i.jsx(Pn,{children:m.content.split(`
`).map((z,T)=>i.jsx("div",{children:z},T))})]},m.id))}),a==="other"&&i.jsxs(Me,{children:[i.jsx(Oe,{children:"其他路线攻略"}),i.jsxs("div",{style:{textAlign:"center",padding:"60px 0"},children:[i.jsx("div",{style:{fontSize:"48px",marginBottom:"20px"},children:"🚧"}),i.jsx("h3",{style:{color:"#FF6B35",marginBottom:"15px"},children:"内容准备中"}),i.jsxs("p",{style:{color:"#666",fontSize:"18px"},children:["我们正在整理更多交通方式，包括：",i.jsx("br",{}),"大巴路线、轮船路线、租车自驾等"]})]})]})]})]},"domestic")})},F=()=>i.jsx(L,{mode:"wait",children:i.jsx(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:i.jsx(Fe,{children:i.jsxs(Me,{children:[i.jsx(Oe,{children:"巡礼任务清单"}),i.jsxs("div",{style:{textAlign:"center",marginBottom:"40px"},children:[i.jsxs("p",{style:{fontSize:"18px",color:"#666",marginBottom:"30px"},children:["为帮助零经验网友顺利完成圣地巡礼计划，我们特别制作了详细的任务清单。",i.jsx("br",{}),"建议下载PDF版本并打印，逐项打勾确保每一步都不遗漏。"]}),i.jsx(En,{onClick:j,disabled:p,whileHover:{scale:1.05},whileTap:{scale:.95},children:p?"📄 下载中...":"📄 下载巡礼清单"})]}),i.jsxs(Rn,{children:[i.jsxs(Xn,{children:["完成进度：",k()," / ",y()," 项 (",Math.round(E()),"%)"]}),i.jsx(Ln,{children:i.jsx(Nn,{percentage:E()})})]}),i.jsx($n,{children:li.map(P=>i.jsxs(Bn,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.6},children:[i.jsxs(Fn,{children:[i.jsx(Mn,{children:P.icon}),i.jsx(On,{children:P.title})]}),P.items.map((m,z)=>{const T=`${P.id}-${z}`,O=d.has(T);return i.jsxs(Dn,{checked:O,children:[i.jsx(An,{checked:O,onClick:()=>C(P.id,z),children:O&&"✓"}),i.jsx(Yn,{checked:O,children:m})]},z)})]},P.id))})]})})},"checklist")});return i.jsxs(wn,{children:[i.jsxs(yn,{children:[i.jsxs("div",{style:{position:"relative"},children:[i.jsx(jn,{onClick:w,whileHover:{scale:1.05},whileTap:{scale:.95},children:"🏠 返回目录"}),i.jsx(kn,{children:"Summer Pockets 交通攻略"})]}),i.jsxs(Cn,{children:[i.jsx(Be,{active:o==="international",onClick:()=>t("international"),children:"国际出发"}),i.jsx(Be,{active:o==="domestic",onClick:()=>t("domestic"),children:"日本国内出发"}),i.jsx(Be,{active:o==="checklist",onClick:()=>t("checklist"),children:"巡礼任务清单"})]})]}),o==="international"&&b(),o==="domestic"&&B(),o==="checklist"&&F()]})},Hn=s.div`
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
`,Wn=s.div`
  text-align: center;
  margin-bottom: 30px;
`,Kn=s.h1`
  font-size: 48px;
  color: #5d4037;
  margin-bottom: 10px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
`,In=s.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`,Vn=s(h.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px 30px;
  margin: 20px auto 30px auto;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`,Zn=s.p`
  font-size: 16px;
  color: #5d4037;
  line-height: 1.6;
  margin: 0;
  text-align: center;
  font-weight: 500;
`,Un=s(h.div)`
  text-align: center;
  margin: 20px auto;
  max-width: 800px;
  width: 90%;
`,Qn=s(h.button)`
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
`,qn=s(h.div)`
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
`,Gn=s(h.div)`
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
`,Jn=s.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`,eo=s.h3`
  font-size: 20px;
  color: #5d4037;
  margin-bottom: 10px;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`,io=s.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
`,to=s.a`
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
`,no=s.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 95%;
  margin: 0 auto 30px auto;
`,oo=s(h.div)`
  background: rgba(255, 255, 255, ${e=>e.selected?"1":"0.95"});
  border-radius: 20px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: ${e=>e.selected?"0 10px 30px rgba(255, 165, 0, 0.4)":"0 8px 25px rgba(0, 0, 0, 0.15)"};
  backdrop-filter: blur(20px);
  width: 250px;
  cursor: pointer;
  border: ${e=>e.selected?"3px solid #FFA500":"none"};
`,ao=s.div`
  font-size: ${e=>e.iconSize||60}px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: ${e=>e.iconSize||60}px;
    height: ${e=>e.iconSize||60}px;
    object-fit: contain;
  }
`,ro=s.h3`
  font-size: 24px;
  color: #5d4037;
  margin-bottom: 10px;
  font-weight: 700;
`,so=s.p`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 15px;
`,lo=s.div`
  background: linear-gradient(45deg, #87ceeb, #add8e6);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
`,co=s.div`
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
`,po=s.div`
  width: fit-content;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`,uo=s.img`
  width: 800px;
  max-width: 100vw;
  height: auto;
  border-radius: 20px;
  display: block;
`,xo=s.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`,De=s(h.div)`
  position: absolute;
  font-size: 30px;
  cursor: pointer;
  left: ${e=>e.x}%;
  top: ${e=>e.y}%;
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
`,di=s.div`
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
`,go=s.div`
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
`,Ae=s.div`
  font-size: 16px;
  font-weight: 700;
  color: #5d4037;
  margin-bottom: 4px;
  text-align: center;
`,ci=s.div`
  font-size: 14px;
  color: #666;
  text-align: center;
`,mo=s.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`,fo=s(h.button)`
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
`,ho=s(h.button)`
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
`,pi=s(h.div)`
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
`,ui=s(h.div)`
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
`,bo=s.button`
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
`,xi=s.img`
  width: 100%;
  height: auto;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`,gi=s.p`
  font-size: 16px;
  color: #5d4037;
  text-align: center;
  margin: 0;
  font-weight: 500;
  line-height: 1.6;
`,mi=[{id:"megijima",name:"女木岛",icon:"👹",description:"以鬼岛传说而闻名的小岛，欧线的重要巡礼点",position:{x:76,y:70}},{id:"ogijima",name:"男木岛",icon:"images/webps/男木岛/男木岛-灯塔图标.webp",iconType:"image",iconSize:80,description:"宁静的渔村小岛，与主角团相遇的主要地点。",position:{x:75,y:45}},{id:"naoshima",name:"直岛",icon:"🎨",description:"现代艺术的圣地，汇集了众多知名艺术家的作品和美术馆。",position:{x:12,y:20}}],vo=()=>{const e=U(),[o,t]=g.useState(null),[n,r]=g.useState(!1),[a,l]=g.useState(!1),[d,c]=g.useState(!1),[p,x]=g.useState(null),f=b=>{t(b.id),e(`/${b.id}`)},v=()=>{r(!0)},w=()=>{r(!1)},C=()=>{c(!1)},j=()=>{e("/contents")},y=()=>{e("/other-pilgrimage")},k=()=>{l(!0)},E=()=>{l(!1)};return i.jsxs(Hn,{children:[i.jsx(Wn,{children:i.jsxs(h.div,{initial:{opacity:0,y:-30},animate:{opacity:1,y:0},transition:{duration:.8},children:[i.jsx(Kn,{children:"打卡篇"}),i.jsx(In,{children:"唯有那片炫目，始终无法忘却"})]})}),i.jsx(Vn,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.3},children:i.jsxs(Zn,{children:[i.jsx("strong",{style:{fontSize:"18px",color:"#ff6b35",display:"block",marginBottom:"8px"},children:"小建议"}),"正式打卡前，建议先把打卡点的游戏CG照片洗出来，到地点后一一比对拍照即可。",i.jsx("span",{style:{display:"block",marginTop:"8px"},children:"避免手机频繁切换页面影响体验，让手机专注于拍照。"}),i.jsx("span",{style:{display:"block",marginTop:"8px"},children:"各岛屿页面可右键下载需要的游戏CG。"})]})}),i.jsx(no,{children:mi.map((b,B)=>i.jsxs(oo,{selected:o===b.id,initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.6,delay:B*.15},whileHover:{scale:1.05,y:-5},whileTap:{scale:.95},onClick:()=>f(b),children:[i.jsx(ao,{iconSize:b.iconSize,children:b.iconType==="image"?i.jsx("img",{src:b.icon,alt:b.name}):b.icon}),i.jsx(ro,{children:b.name}),i.jsx(so,{children:b.description}),i.jsx(lo,{children:"点击前往"})]},b.name))}),i.jsx(Un,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.4},children:i.jsx(Qn,{onClick:k,whileHover:{scale:1.05},whileTap:{scale:.95},children:"📱 打卡地点合集"})}),i.jsx(h.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.5},children:i.jsx(co,{children:i.jsxs(po,{children:[i.jsx(uo,{src:"images/webps/打卡篇地图-航线版.webp",alt:"瀬戸内海地图"}),i.jsxs(xo,{children:[i.jsxs(De,{x:76,y:90,initial:{scale:0},animate:{scale:1},transition:{delay:1,duration:.5},whileHover:{scale:1.2},onClick:()=>c(!0),onMouseEnter:()=>{x({x:76,y:90,title:"高松港",desc:"前往各岛屿的起点港口，点击查看时刻表"})},onMouseLeave:()=>x(null),children:["🚢",p&&p.title==="高松港"&&i.jsxs(di,{children:[i.jsx(Ae,{children:p.title}),i.jsx(ci,{children:p.desc})]})]}),i.jsxs(De,{x:91,y:60,initial:{scale:0},animate:{scale:1},transition:{delay:1.5,duration:.5},whileHover:{scale:1.2},onClick:v,title:"鸟白岛",onMouseEnter:()=>{x({x:91,y:60,title:"鸟白岛",desc:"只能在航行过程中拍摄的神秘岛屿"})},onMouseLeave:()=>x(null),children:["❗❗❗",p&&p.title==="鸟白岛"&&i.jsx(go,{children:i.jsx(Ae,{children:p.title})})]}),mi.map((b,B)=>i.jsxs(De,{x:b.position.x,y:b.position.y,initial:{scale:0},animate:{scale:1},transition:{delay:1.2+B*.2,duration:.5},whileHover:{scale:1.2},onClick:()=>f(b),onMouseEnter:()=>{x({x:b.position.x,y:b.position.y,title:b.name,desc:b.description})},onMouseLeave:()=>x(null),children:[b.iconType==="image"?i.jsx("img",{src:b.icon,alt:b.name}):b.icon,p&&p.title===b.name&&i.jsxs(di,{children:[i.jsx(Ae,{children:p.title}),i.jsx(ci,{children:p.desc})]})]},b.id))]})]})})}),i.jsxs(mo,{children:[i.jsx(fo,{onClick:j,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,x:-30},animate:{opacity:1,x:0},transition:{delay:1},children:"返回目录"}),i.jsx(ho,{onClick:y,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,x:30},animate:{opacity:1,x:0},transition:{delay:1.2},children:"其他巡礼"})]}),i.jsx(L,{children:n&&i.jsx(pi,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:w,children:i.jsxs(ui,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{duration:.3},onClick:b=>b.stopPropagation(),children:[i.jsx(xi,{src:"images/webps/鸟白岛总览.webp",alt:"鸟白岛总览",onError:b=>{}}),i.jsx(gi,{children:"只能在航行过程中拍摄"})]})})}),i.jsx(L,{children:a&&i.jsx(qn,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:E,children:i.jsxs(Gn,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{duration:.3},onClick:b=>b.stopPropagation(),children:[i.jsx(Jn,{src:"images/webps/打卡地点合集.webp",alt:"打卡地点合集二维码",onError:b=>{}}),i.jsx(eo,{children:"打卡地点合集"}),i.jsx(io,{children:"扫描二维码获取完整的打卡地点图片合集"}),i.jsx(to,{href:"https://pan.baidu.com/s/1BdmKigMJMb4y1q6RNLO2oA?pwd=sprb",target:"_blank",rel:"noopener noreferrer",children:"📥 直接下载打卡地点合集"})]})})}),i.jsx(L,{children:d&&i.jsx(pi,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:C,children:i.jsxs(ui,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{duration:.3},onClick:b=>b.stopPropagation(),children:[i.jsx(bo,{onClick:C,children:"×"}),i.jsx(xi,{src:"images/webps/高松发船时刻表.webp",alt:"高松发船时刻表",onError:b=>{}}),i.jsx(gi,{children:"高松港发船时刻表"})]})})})]})},wo=s.div`
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
`,yo=s(h.button)`
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
`,jo=s.h1`
  font-size: 48px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: 700;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 3px 3px 12px rgba(0,0,0,0.45);
  text-align: center;
`,ko=s.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  max-width: 600px;
  backdrop-filter: blur(10px);
`,Ye=s.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  line-height: 1.6;
  margin: 0 0 20px 0;
`,Co=s.div`
  background: linear-gradient(45deg, #533483, #7209b7);
  color: #fff;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  display: inline-block;
  box-shadow: 0 4px 16px rgba(123, 9, 183, 0.3);
  margin-top: 20px;
`,So=()=>{const e=U(),o=()=>{e("/contents")};return i.jsxs(wo,{children:[i.jsx(jo,{children:"神域"}),i.jsxs(ko,{children:[i.jsx(Ye,{children:"🌙 神域功能正在开发中..."}),i.jsx(Ye,{children:"这里将是一个神秘的夜晚世界，充满了七影蝶的魔法与奇迹。"}),i.jsx(Ye,{children:"敬请期待即将到来的神域体验！"}),i.jsx(Co,{children:"✨ Coming Soon ✨"})]}),i.jsx(yo,{onClick:o,whileHover:{scale:1.05},whileTap:{scale:.95},children:"🏠 返回目录"})]})},zo=s.div`
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
`,To=s.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 10;
`,Po=s(h.button)`
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
`,Eo=s.h1`
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
`,$o=s(h.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 15px 40px rgba(255, 165, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 165, 0, 0.2);
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`,Bo=s.div`
  font-size: 120px;
  margin-bottom: 30px;
  opacity: 0.8;
`,Fo=s.h2`
  font-size: 32px;
  color: #FF6B35;
  margin-bottom: 20px;
  font-weight: 600;
  font-family: 'KaiTi', 'SimKai', serif;
`,Mo=s.p`
  font-size: 20px;
  color: #666;
  line-height: 1.8;
  font-family: 'KaiTi', 'SimKai', serif;
  margin-bottom: 30px;
`,Oo=s.div`
  text-align: left;
  max-width: 500px;
  margin: 0 auto;
`,se=s.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  font-size: 18px;
  color: #555;
  border-bottom: 1px solid rgba(255, 165, 0, 0.2);
`,le=s.span`
  font-size: 24px;
  width: 30px;
  text-align: center;
`,Re=s(h.div)`
  position: absolute;
  font-size: 60px;
  opacity: 0.6;
  z-index: 5;
`,Do=()=>{const e=U(),o=()=>{e("/checkin")};return i.jsxs(zo,{children:[i.jsx(Re,{style:{top:"10%",left:"10%"},animate:{y:[0,-30,0],rotate:[0,10,-10,0],scale:[1,1.1,1]},transition:{duration:8,repeat:1/0},children:"🌸"}),i.jsx(Re,{style:{top:"20%",right:"15%"},animate:{y:[0,25,0],rotate:[0,-15,15,0],scale:[1,.9,1]},transition:{duration:6,repeat:1/0},children:"🎪"}),i.jsx(Re,{style:{bottom:"15%",left:"20%"},animate:{y:[0,-20,0],rotate:[0,8,-8,0]},transition:{duration:7,repeat:1/0},children:"🎭"}),i.jsx(Po,{onClick:o,whileHover:{scale:1.05},whileTap:{scale:.95},children:"🏠 返回打卡篇"}),i.jsx(To,{children:i.jsx(Eo,{children:"其他巡礼"})}),i.jsxs($o,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8},children:[i.jsx(Bo,{children:"🚧"}),i.jsx(Fo,{children:"页面开发中..."}),i.jsxs(Mo,{children:["正在为您精心准备更多精彩的圣地巡礼内容！",i.jsx("br",{}),"敬请期待即将到来的全新体验。"]}),i.jsxs(Oo,{children:[i.jsxs(se,{children:[i.jsx(le,{children:"🏛️"}),i.jsx("span",{children:"特色建筑巡礼"})]}),i.jsxs(se,{children:[i.jsx(le,{children:"🍜"}),i.jsx("span",{children:"美食探索地图"})]}),i.jsxs(se,{children:[i.jsx(le,{children:"🎨"}),i.jsx("span",{children:"文化体验活动"})]}),i.jsxs(se,{children:[i.jsx(le,{children:"📸"}),i.jsx("span",{children:"摄影打卡指南"})]}),i.jsxs(se,{children:[i.jsx(le,{children:"🛍️"}),i.jsx("span",{children:"购物推荐清单"})]})]})]})]})},fi=s.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`,Ao=s.div`
  position: relative;
  width: 100%;
  height: 100%;
`,Yo=s(h.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  cursor: none !important; /* 🦋 使用蝴蝶鼠标 */
  transition: none; /* 🔧 移除CSS transition，避免与framer-motion冲突 */
`,Ro=s.div`
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
`,Xo=s(h.div)`
  position: absolute;
  bottom: 10px;
  left: 15px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  z-index: 10;
`,Lo=s.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 10;
`,No=s(h.button)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${e=>e.active?"rgba(255, 255, 255, 0.9)":"rgba(255, 255, 255, 0.4)"};
  cursor: none !important; /* 🦋 使用蝴蝶鼠标 */
  transition: none; /* 🔧 移除CSS transition，避免与framer-motion冲突 */
`,Ve=({images:e,title:o,autoPlay:t=!0,interval:n=3e3,onImageClick:r,isPlaying:a,onPlayPauseChange:l})=>{const[d,c]=g.useState(0),[p,x]=g.useState(t),f=a!==void 0?a:p;g.useEffect(()=>{if(!f||e.length<=1)return;const w=setInterval(()=>{c(C=>(C+1)%e.length)},n);return()=>clearInterval(w)},[f,e.length,n]);const v=()=>{r&&r(d)};return e.length===0?i.jsx(fi,{children:i.jsx("div",{style:{width:"100%",height:"100%",background:"#f0f0f0",display:"flex",alignItems:"center",justifyContent:"center",color:"#666",fontSize:"14px"},children:"暂无图片"})}):i.jsx(fi,{children:i.jsxs(Ao,{children:[i.jsx(L,{mode:"wait",children:i.jsx(Yo,{src:e[d].src,alt:`${o} - ${e[d].label}`,clickable:!!r,onClick:v,initial:{opacity:0,x:50},animate:{opacity:1,x:0},exit:{opacity:0,x:-50},whileHover:r?{scale:1.02}:{},transition:{duration:.5,ease:"easeInOut",scale:{type:"spring",stiffness:400,damping:25,duration:.15}}},d)}),i.jsx(Ro,{}),i.jsx(Xo,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.3},children:e[d].label},`label-${d}`),e.length>1&&i.jsx(Lo,{children:e.map((w,C)=>i.jsx(No,{active:C===d,onClick:()=>c(C),whileHover:{scale:1.1,background:"rgba(255, 255, 255, 0.7)"},whileTap:{scale:.95},transition:{type:"spring",stiffness:400,damping:25,duration:.15}},C))})]})})},_o=s.div`
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
`,Ho=s.div`
  text-align: center;
  margin-bottom: 40px;
`,Wo=s.h1`
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
`,hi=s.span`
  font-size: 60px;
`,Ko=s.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`,Io=s.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`,bi=s(h.div)`
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
`,Vo=s.h3`
  font-size: 28px;
  color: #5d4037;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
`,ne=s.p`
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
`,Zo=s.div`
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
`,Uo=s.div`
  width: fit-content;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`,Qo=s.img`
  width: ${e=>e.scale*800}px;
  max-width: 100vw;
  height: auto;
  border-radius: 20px;
  display: block;
`,qo=s.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  pointer-events: none;
`,xe=s(h.div)`
  position: absolute;
  font-size: ${e=>e.iconSize}px;
  cursor: pointer;
  left: ${e=>e.x}%;
  top: ${e=>e.y}%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: auto;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
`,ge=s.div`
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
`,me=s.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
`,fe=s.div`
  font-size: 16px;
  font-weight: 700;
  color: #5d4037;
  margin-bottom: 4px;
  text-align: center;
`,he=s.div`
  font-size: 14px;
  color: #666;
  text-align: center;
`,Xe={mountainUP:{image:"images/webps/女木岛/女木岛-秘密基地山路.webp",desc:"通往秘密基地的山路"},mountainDOWN:{image:"images/webps/女木岛/女木岛-山道.webp",desc:"和苍引导七影碟的山道"},cave:{image:"images/webps/女木岛/女木岛-采石场入口.webp",desc:"与鸥冒险的采石场入口"}},Go=s.div`
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
`,Jo=s(h.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`,ea=s.h4`
  padding: 15px 15px 5px 15px;
  font-size: 18px;
  color: #5d4037;
  text-align: center;
  margin: 0;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
`,ia=s.p`
  padding: 5px 15px 15px 15px;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`,ta=s.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`,na=s(h.button)`
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
`,oa=s(h.button)`
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
`,aa=s(h.div)`
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
`,ra=s(h.div)`
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
`,sa=s.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`,la=s.div`
  text-align: center;
  color: #333;
`,da=s.h3`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #5d4037;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`,ca=s.p`
  font-size: 18px;
  margin: 0;
  color: #666;
  font-weight: 500;
`,vi=s(h.button)`
  position: absolute;
  top: 50%;
  ${e=>e.direction==="prev"?"left: -60px;":"right: -60px;"}
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
    ${e=>e.direction==="prev"?"left: 10px;":"right: 10px;"}
    top: auto;
    bottom: 20px;
  }
`,pa=s.div`
  display: flex;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  backdrop-filter: blur(10px);
`,wi=s(h.button)`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  background: ${e=>e.active?e.tabType==="intro"?"linear-gradient(135deg, #ff6b35, #ffa500)":"linear-gradient(135deg, #87ceeb, #98e4d6)":"transparent"};
  color: ${e=>e.active?e.tabType==="intro"?"white":"#2e8b57":"#8d6e63"};
  font-size: 18px;
  font-weight: 600;
  font-family: 'KaiTi', 'SimKai', serif;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${e=>e.active?e.tabType==="intro"?"0 6px 20px rgba(255, 107, 53, 0.3)":"0 6px 20px rgba(135, 206, 235, 0.3)":"none"};
  
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
    background: ${e=>e.tabType==="intro"?"linear-gradient(135deg, #ff8a50, #ffb347)":"linear-gradient(135deg, #98d8eb, #a8e6d2)"};
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 10px;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${e=>e.tabType==="intro"?"0 8px 25px rgba(255, 107, 53, 0.4)":"0 8px 25px rgba(135, 206, 235, 0.4)"};
    
    &::before {
      left: 100%;
    }
    
    &::after {
      opacity: ${e=>e.active?0:.6};
    }
  }
  
  &:active {
    transform: translateY(0);
    transition: transform 0.1s ease;
  }
`,yi=s(h.div)`
  width: 100%;
`,ua=({isOpen:e,onClose:o,images:t,currentIndex:n,onPrevious:r,onNext:a,title:l})=>{var d,c,p;return!e||t.length===0?null:i.jsx(L,{children:i.jsx(aa,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:o,children:i.jsxs(ra,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},onClick:x=>x.stopPropagation(),children:[t.length>1&&i.jsxs(i.Fragment,{children:[i.jsx(vi,{direction:"prev",onClick:r,whileHover:{scale:1.05,background:"rgba(255, 255, 255, 0.2)",borderColor:"rgba(255, 255, 255, 0.5)"},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:25,duration:.15},style:{transformOrigin:"center"},children:"‹"}),i.jsx(vi,{direction:"next",onClick:a,whileHover:{scale:1.05,background:"rgba(255, 255, 255, 0.2)",borderColor:"rgba(255, 255, 255, 0.5)"},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:25,duration:.15},style:{transformOrigin:"center"},children:"›"})]}),i.jsx(sa,{src:(d=t[n])==null?void 0:d.src,alt:`${l} - ${(c=t[n])==null?void 0:c.label}`}),i.jsxs(la,{children:[i.jsx(da,{children:l}),i.jsx(ca,{children:(p=t[n])==null?void 0:p.label})]})]})})})},xa=()=>{const e=U(),[o,t]=g.useState({isOpen:!1,images:[],currentIndex:0,title:""}),[n,r]=g.useState("intro"),[a,l]=g.useState(null),[d,c]=g.useState(!0),p={scale:.6,icons:{cave:{x:66,y:38},bus:{x:73,y:66},mountainUP:{x:65,y:33},mountainDOWN:{x:70,y:43}},sizes:{cave:30,mountainUP:35,bus:35,mountainDOWN:35}},x=g.useRef(null),[f,v]=g.useState(0);g.useEffect(()=>{const m=x.current;if(!m)return;const z=new ResizeObserver(T=>{for(const O of T){const N=O.contentRect.width;v(N)}});return z.observe(m),v(m.getBoundingClientRect().width),()=>z.disconnect()},[]);const w=p.scale*800,C=f>0?f/w:1,j=Math.max(.5,Math.min(C,1.2)),y=[{title:"秘密基地山路",description:"通往秘密基地的山路",images:[{src:"images/webps/女木岛/女木岛-秘密基地山路.webp",label:"白天"},{src:"images/webps/女木岛/女木岛-秘密基地山路-黄昏.webp",label:"黄昏"},{src:"images/webps/女木岛/女木岛-秘密基地山路-夜晚.webp",label:"夜晚"},{src:"images/webps/女木岛/女木岛-秘密基地山路-深夜.webp",label:"深夜"}]},{title:"山道",description:"苍捕捉七影碟的地点",images:[{src:"images/webps/女木岛/女木岛-山道.webp",label:"白天"},{src:"images/webps/女木岛/女木岛-山道-黄昏.webp",label:"黄昏"},{src:"images/webps/女木岛/女木岛-山道-夜晚.webp",label:"夜晚"},{src:"images/webps/女木岛/女木岛-山道-深夜.webp",label:"深夜"}]},{title:"采石场入口",description:"欧线的重要场所",images:[{src:"images/webps/女木岛/女木岛-采石场入口.webp",label:"白天"},{src:"images/webps/女木岛/女木岛-采石场入口-黄昏.webp",label:"黄昏"},{src:"images/webps/女木岛/女木岛-采石场入口-夜晚.webp",label:"夜晚"}]},{title:"采石场分岔路",description:"采石场内部第一站",images:[{src:"images/webps/女木岛/女木岛-采石场-分岔路-有光.webp",label:"有光"},{src:"images/webps/女木岛/女木岛-采石场-分岔路-无光.webp",label:"无光"}]},{title:"窄路",description:"采石场的一条窄路",images:[{src:"images/webps/女木岛/女木岛-窄路-有光.webp",label:"有光"},{src:"images/webps/女木岛/女木岛-窄路-无光.webp",label:"无光"}]}],k=()=>{e("/checkin")},E=(m,z,T)=>{t({isOpen:!0,images:m,currentIndex:z,title:T})},b=()=>{t(m=>W(H({},m),{isOpen:!1}))},B=()=>{t(m=>W(H({},m),{currentIndex:(m.currentIndex-1+m.images.length)%m.images.length}))},F=()=>{t(m=>W(H({},m),{currentIndex:(m.currentIndex+1)%m.images.length}))},P=m=>{let z="",T=[];switch(m){case"cave":z="采石场入口",T=[{src:"images/webps/女木岛/女木岛-采石场入口.webp",label:"与鸥冒险的采石场入口"}];break;case"mountainUP":z="秘密基地山路",T=[{src:"images/webps/女木岛/女木岛-秘密基地山路.webp",label:"通往秘密基地的山路"}];break;case"mountainDOWN":z="山道",T=[{src:"images/webps/女木岛/女木岛-山道.webp",label:"苍引导七影碟的山道"}];break;case"bus":z="公交时刻表",T=[{src:"images/webps/女木岛/女木岛-公交时间表.webp",label:"女木岛公交时刻表"}];break}z&&T.length>0&&E(T,0,z)};return i.jsxs(_o,{children:[i.jsx(Ho,{children:i.jsxs(h.div,{initial:{opacity:0,y:-30},animate:{opacity:1,y:0},transition:{duration:.8},children:[i.jsxs(Wo,{children:[i.jsx(hi,{children:"👹"}),"女木岛",i.jsx(hi,{children:"👹"})]}),i.jsx(Ko,{children:"神秘的传说鬼岛"})]})}),i.jsxs(Io,{children:[i.jsxs(bi,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.2},children:[i.jsxs(pa,{children:[i.jsx(wi,{active:n==="intro",tabType:"intro",onClick:()=>r("intro"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🏝️ 岛屿介绍"}),i.jsx(wi,{active:n==="guide",tabType:"guide",onClick:()=>r("guide"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🗺️ 巡礼说明"})]}),i.jsx(L,{mode:"wait",children:n==="intro"?i.jsx(yi,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:i.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[i.jsx(ne,{children:"拥有鬼岛大洞窟和桃太郎传说的观光岛屿"}),i.jsxs(ne,{children:["女木岛坐落于高松市北部，从高松港乘坐渡轮大约20分钟即可到达。",i.jsx("br",{})]}),i.jsx(ne,{children:"岛中央为“阿利比克峰”，传说鬼族曾在此隐居，女木岛因此又称“鬼岛”。"}),i.jsx(ne,{children:"女木岛有一个名为“鬼岛大洞窟”的采石场遗迹，这里是鸥探险的原型。从港口到鬼岛大洞窟可以乘坐接送巴士。"})]})},"intro"):i.jsx(yi,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:i.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[i.jsx(ne,{children:"女木岛的巡礼场景集中在鬼岛大洞窟及其附近，可在女木港搭乘公交快速到达巡礼地点，步行会在路上耗费过多时间和体力。"}),i.jsx(ne,{children:"女木岛共有五个巡礼点，分别是，秘密基地山路，山道，采石场入口，采石场分岔路，窄路。"}),i.jsx(ne,{children:"其他说明：海边钢琴属于海盗船原型。"})]})},"guide")})]}),i.jsx(h.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.4},children:i.jsx(Zo,{children:i.jsxs(Uo,{ref:x,children:[i.jsx(Qo,{scale:p.scale,src:"images/webps/女木岛/女木岛地图-线路版.webp",alt:"女木岛地图"}),i.jsxs(qo,{children:[i.jsxs(xe,{x:p.icons.cave.x,y:p.icons.cave.y,iconSize:p.sizes.cave*j,initial:{scale:0},animate:{scale:1},transition:{delay:1,duration:.5},whileHover:{scale:1.2},title:"山洞",onMouseEnter:()=>{const m=Xe.cave;m&&l({x:p.icons.cave.x,y:p.icons.cave.y,title:"山洞",image:m.image,desc:m.desc})},onMouseLeave:()=>l(null),onClick:()=>P("cave"),style:{zIndex:15,cursor:"pointer"},children:[i.jsx("img",{src:"images/webps/女木岛/女木岛-山洞.webp",alt:"山洞",style:{width:`${Math.max(18,p.sizes.cave*j)}px`,height:`${Math.max(18,p.sizes.cave*j)}px`,borderRadius:"50%",objectFit:"cover"}}),a&&a.title==="山洞"&&i.jsxs(ge,{children:[i.jsx(me,{src:a.image,alt:a.title}),i.jsx(fe,{children:a.title}),i.jsx(he,{children:a.desc})]})]}),i.jsxs(xe,{x:p.icons.bus.x,y:p.icons.bus.y,iconSize:p.sizes.bus*j,initial:{scale:0},animate:{scale:1},transition:{delay:1.2,duration:.5},whileHover:{scale:1.2},title:"公交/渡轮站",onMouseEnter:()=>{l({x:p.icons.bus.x,y:p.icons.bus.y,title:"公交/渡轮站",image:"images/webps/女木岛/女木岛-公交时间表.webp",desc:"前往女木岛的交通枢纽"})},onMouseLeave:()=>l(null),onClick:()=>P("bus"),style:{zIndex:25,cursor:"pointer"},children:["🚌",a&&a.title==="公交/渡轮站"&&i.jsxs(ge,{children:[i.jsx(me,{src:a.image,alt:a.title}),i.jsx(fe,{children:a.title}),i.jsx(he,{children:a.desc})]})]}),i.jsxs(xe,{x:p.icons.mountainUP.x,y:p.icons.mountainUP.y,iconSize:p.sizes.mountainUP*j,initial:{scale:0},animate:{scale:1},transition:{delay:1.4,duration:.5},whileHover:{scale:1.2},title:"秘密基地山路",onMouseEnter:()=>{const m=Xe.mountainUP;m&&l({x:p.icons.mountainUP.x,y:p.icons.mountainUP.y,title:"秘密基地山路",image:m.image,desc:m.desc})},onMouseLeave:()=>l(null),onClick:()=>P("mountainUP"),style:{zIndex:10,cursor:"pointer"},children:[i.jsx("img",{src:"images/webps/女木岛/女木岛-山路地标.webp",alt:"秘密基地山路",style:{width:`${Math.max(18,p.sizes.mountainUP*j)}px`,height:`${Math.max(18,p.sizes.mountainUP*j)}px`,borderRadius:"50%",objectFit:"cover"}}),a&&a.title==="秘密基地山路"&&i.jsxs(ge,{children:[i.jsx(me,{src:a.image,alt:a.title}),i.jsx(fe,{children:a.title}),i.jsx(he,{children:a.desc})]})]}),i.jsxs(xe,{x:p.icons.mountainDOWN.x,y:p.icons.mountainDOWN.y,iconSize:p.sizes.mountainDOWN*j,initial:{scale:0},animate:{scale:1},transition:{delay:1.6,duration:.5},whileHover:{scale:1.2},title:"山道",onMouseEnter:()=>{const m=Xe.mountainDOWN;m&&l({x:p.icons.mountainDOWN.x,y:p.icons.mountainDOWN.y,title:"山道",image:m.image,desc:m.desc})},onMouseLeave:()=>l(null),onClick:()=>P("mountainDOWN"),style:{zIndex:20},children:[i.jsx("img",{src:"images/webps/女木岛/女木岛-山路地标.webp",alt:"山道",style:{width:`${Math.max(18,p.sizes.mountainDOWN*j)}px`,height:`${Math.max(18,p.sizes.mountainDOWN*j)}px`,borderRadius:"50%",objectFit:"cover"}}),a&&a.title==="山道"&&i.jsxs(ge,{children:[i.jsx(me,{src:a.image,alt:a.title}),i.jsx(fe,{children:a.title}),i.jsx(he,{children:a.desc})]})]})]})]})})}),i.jsxs(bi,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.6},children:[i.jsx(Vo,{children:"打卡地点"}),i.jsx(Go,{children:y.map(m=>i.jsxs(Jo,{whileHover:{scale:1.02},transition:{duration:.3},initial:{opacity:0,y:30},animate:{opacity:1,y:0},onClick:()=>E(m.images,0,m.title),style:{cursor:"pointer"},children:[i.jsx(Ve,{images:m.images,title:m.title,autoPlay:!0,interval:4e3,isPlaying:d,onImageClick:z=>E(m.images,z,m.title)}),i.jsx(ea,{children:m.title}),i.jsx(ia,{children:m.description})]},m.title))})]})]}),i.jsxs(ta,{children:[i.jsx(oa,{onClick:()=>c(!d),whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.6},children:d?"⏸ 停止轮播":"▶ 开始轮播"}),i.jsx(na,{onClick:k,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.8},children:"返回打卡篇"})]}),i.jsx(ua,{isOpen:o.isOpen,onClose:b,images:o.images,currentIndex:o.currentIndex,onPrevious:B,onNext:F,title:o.title})]})};var K=function(e,o){return Number(e.toFixed(o))},ga=function(e,o){return typeof e=="number"?e:o},Y=function(e,o,t){t&&typeof t=="function"&&t(e,o)},ma=function(e){return-Math.cos(e*Math.PI)/2+.5},fa=function(e){return e},ha=function(e){return e*e},ba=function(e){return e*(2-e)},va=function(e){return e<.5?2*e*e:-1+(4-2*e)*e},wa=function(e){return e*e*e},ya=function(e){return--e*e*e+1},ja=function(e){return e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1},ka=function(e){return e*e*e*e},Ca=function(e){return 1- --e*e*e*e},Sa=function(e){return e<.5?8*e*e*e*e:1-8*--e*e*e*e},za=function(e){return e*e*e*e*e},Ta=function(e){return 1+--e*e*e*e*e},Pa=function(e){return e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e},Ii={easeOut:ma,linear:fa,easeInQuad:ha,easeOutQuad:ba,easeInOutQuad:va,easeInCubic:wa,easeOutCubic:ya,easeInOutCubic:ja,easeInQuart:ka,easeOutQuart:Ca,easeInOutQuart:Sa,easeInQuint:za,easeOutQuint:Ta,easeInOutQuint:Pa},Vi=function(e){typeof e=="number"&&cancelAnimationFrame(e)},Z=function(e){e.mounted&&(Vi(e.animation),e.animate=!1,e.animation=null,e.velocity=null)};function Zi(e,o,t,n){if(e.mounted){var r=new Date().getTime(),a=1;Z(e),e.animation=function(){if(!e.mounted)return Vi(e.animation);var l=new Date().getTime()-r,d=l/t,c=Ii[o],p=c(d);l>=t?(n(a),e.animation=null):e.animation&&(n(p),requestAnimationFrame(e.animation))},requestAnimationFrame(e.animation)}}function Ea(e){var o=e.scale,t=e.positionX,n=e.positionY;return!(Number.isNaN(o)||Number.isNaN(t)||Number.isNaN(n))}function ee(e,o,t,n){var r=Ea(o);if(!(!e.mounted||!r)){var a=e.setTransformState,l=e.transformState,d=l.scale,c=l.positionX,p=l.positionY,x=o.scale-d,f=o.positionX-c,v=o.positionY-p;t===0?a(o.scale,o.positionX,o.positionY):Zi(e,n,t,function(w){var C=d+x*w,j=c+f*w,y=p+v*w;a(C,j,y)})}}function $a(e,o,t){var n=e.offsetWidth,r=e.offsetHeight,a=o.offsetWidth,l=o.offsetHeight,d=a*t,c=l*t,p=n-d,x=r-c;return{wrapperWidth:n,wrapperHeight:r,newContentWidth:d,newDiffWidth:p,newContentHeight:c,newDiffHeight:x}}var Ba=function(e,o,t,n,r,a,l){var d=e>o?t*(l?1:.5):0,c=n>r?a*(l?1:.5):0,p=e-o-d,x=d,f=n-r-c,v=c;return{minPositionX:p,maxPositionX:x,minPositionY:f,maxPositionY:v}},Ze=function(e,o){var t=e.wrapperComponent,n=e.contentComponent,r=e.setup.centerZoomedOut;if(!t||!n)throw new Error("Components are not mounted");var a=$a(t,n,o),l=a.wrapperWidth,d=a.wrapperHeight,c=a.newContentWidth,p=a.newDiffWidth,x=a.newContentHeight,f=a.newDiffHeight,v=Ba(l,c,p,d,x,f,!!r);return v},He=function(e,o,t,n){return n?e<o?K(o,2):e>t?K(t,2):K(e,2):K(e,2)},re=function(e,o){var t=Ze(e,o);return e.bounds=t,t};function je(e,o,t,n,r,a,l){var d=t.minPositionX,c=t.minPositionY,p=t.maxPositionX,x=t.maxPositionY,f=0,v=0;l&&(f=r,v=a);var w=He(e,d-f,p+f,n),C=He(o,c-v,x+v,n);return{x:w,y:C}}function ke(e,o,t,n,r,a){var l=e.transformState,d=l.scale,c=l.positionX,p=l.positionY,x=n-d;if(typeof o!="number"||typeof t!="number")return{x:c,y:p};var f=c-o*x,v=p-t*x,w=je(f,v,r,a,0,0,null);return w}function ce(e,o,t,n,r){var a=r?n:0,l=o-a;return!Number.isNaN(t)&&e>=t?t:!Number.isNaN(o)&&e<=l?l:e}var ji=function(e,o){var t=e.setup.panning.excluded,n=e.isInitialized,r=e.wrapperComponent,a=o.target,l=r==null?void 0:r.contains(a),d=n&&a&&l;if(!d)return!1;var c=Ce(a,t);return!c},ki=function(e){var o=e.isInitialized,t=e.isPanning,n=e.setup,r=n.panning.disabled,a=o&&t&&!r;return!!a},Fa=function(e,o){var t=e.transformState,n=t.positionX,r=t.positionY;e.isPanning=!0;var a=o.clientX,l=o.clientY;e.startCoords={x:a-n,y:l-r}},Ma=function(e,o){var t=o.touches,n=e.transformState,r=n.positionX,a=n.positionY;e.isPanning=!0;var l=t.length===1;if(l){var d=t[0].clientX,c=t[0].clientY;e.startCoords={x:d-r,y:c-a}}};function Oa(e){var o=e.transformState,t=o.positionX,n=o.positionY,r=o.scale,a=e.setup,l=a.disabled,d=a.limitToBounds,c=a.centerZoomedOut,p=e.wrapperComponent;if(!(l||!p||!e.bounds)){var x=e.bounds,f=x.maxPositionX,v=x.minPositionX,w=x.maxPositionY,C=x.minPositionY,j=t>f||t<v,y=n>w||n<C,k=t>f?p.offsetWidth:e.setup.minPositionX||0,E=n>w?p.offsetHeight:e.setup.minPositionY||0,b=ke(e,k,E,r,e.bounds,d||c),B=b.x,F=b.y;return{scale:r,positionX:j?B:t,positionY:y?F:n}}}function Da(e,o,t,n,r){var a=e.setup.limitToBounds,l=e.wrapperComponent,d=e.bounds,c=e.transformState,p=c.scale,x=c.positionX,f=c.positionY;if(!(l===null||d===null||o===x&&t===f)){var v=je(o,t,d,a,n,r,l),w=v.x,C=v.y;e.setTransformState(p,w,C)}}var Aa=function(e,o,t){var n=e.startCoords,r=e.transformState,a=e.setup.panning,l=a.lockAxisX,d=a.lockAxisY,c=r.positionX,p=r.positionY;if(!n)return{x:c,y:p};var x=o-n.x,f=t-n.y,v=l?c:x,w=d?p:f;return{x:v,y:w}},ve=function(e,o){var t=e.setup,n=e.transformState,r=n.scale,a=t.minScale,l=t.disablePadding;return o>0&&r>=a&&!l?o:0},Ya=function(e){var o=e.mounted,t=e.setup,n=t.disabled,r=t.velocityAnimation,a=e.transformState.scale,l=r.disabled,d=!l||a>1||!n||o;return!!d},Ra=function(e){var o=e.mounted,t=e.velocity,n=e.bounds,r=e.setup,a=r.disabled,l=r.velocityAnimation,d=e.transformState.scale,c=l.disabled,p=!c||d>1||!a||o;return!(!p||!t||!n)};function Xa(e,o){var t=e.setup.velocityAnimation,n=t.equalToMove,r=t.animationTime,a=t.sensitivity;return n?r*o*a:r}function Ci(e,o,t,n,r,a,l,d,c,p){if(r){if(o>l&&t>l){var x=l+(e-l)*p;return x>c?c:x<l?l:x}if(o<a&&t<a){var x=a+(e-a)*p;return x<d?d:x>a?a:x}}return n?o:He(e,a,l,r)}function La(e,o){var t=1;return o?Math.min(t,e.offsetWidth/window.innerWidth):t}function Na(e,o){var t=Ya(e);if(t){var n=e.lastMousePosition,r=e.velocityTime,a=e.setup,l=e.wrapperComponent,d=a.velocityAnimation.equalToMove,c=Date.now();if(n&&r&&l){var p=La(l,d),x=o.x-n.x,f=o.y-n.y,v=x/p,w=f/p,C=c-r,j=x*x+f*f,y=Math.sqrt(j)/C;e.velocity={velocityX:v,velocityY:w,total:y}}e.lastMousePosition=o,e.velocityTime=c}}function _a(e){var o=e.velocity,t=e.bounds,n=e.setup,r=e.wrapperComponent,a=Ra(e);if(!(!a||!o||!t||!r)){var l=o.velocityX,d=o.velocityY,c=o.total,p=t.maxPositionX,x=t.minPositionX,f=t.maxPositionY,v=t.minPositionY,w=n.limitToBounds,C=n.alignmentAnimation,j=n.zoomAnimation,y=n.panning,k=y.lockAxisY,E=y.lockAxisX,b=j.animationType,B=C.sizeX,F=C.sizeY,P=C.velocityAlignmentTime,m=P,z=Xa(e,c),T=Math.max(z,m),O=ve(e,B),N=ve(e,F),_=O*r.offsetWidth/100,Q=N*r.offsetHeight/100,ie=p+_,te=x-_,S=f+Q,R=v-Q,u=e.transformState,$=new Date().getTime();Zi(e,b,T,function(M){var A=e.transformState,X=A.scale,I=A.positionX,oe=A.positionY,Se=new Date().getTime()-$,rt=Se/m,st=Ii[C.animationType],qe=1-st(Math.min(1,rt)),Ge=1-M,Je=I+l*Ge,ei=oe+d*Ge,lt=Ci(Je,u.positionX,I,E,w,x,p,te,ie,qe),dt=Ci(ei,u.positionY,oe,k,w,v,f,R,S,qe);(I!==Je||oe!==ei)&&e.setTransformState(X,lt,dt)})}}function Si(e,o){var t=e.transformState.scale;Z(e),re(e,t),window.TouchEvent!==void 0&&o instanceof TouchEvent?Ma(e,o):Fa(e,o)}function Ui(e){var o=e.transformState.scale,t=e.setup,n=t.minScale,r=t.alignmentAnimation,a=r.disabled,l=r.sizeX,d=r.sizeY,c=r.animationTime,p=r.animationType,x=a||o<n||!l&&!d;if(!x){var f=Oa(e);f&&ee(e,f,c,p)}}function zi(e,o,t){var n=e.startCoords,r=e.setup,a=r.alignmentAnimation,l=a.sizeX,d=a.sizeY;if(n){var c=Aa(e,o,t),p=c.x,x=c.y,f=ve(e,l),v=ve(e,d);Na(e,{x:p,y:x}),Da(e,p,x,f,v)}}function Ha(e){if(e.isPanning){var o=e.setup.panning.velocityDisabled,t=e.velocity,n=e.wrapperComponent,r=e.contentComponent;e.isPanning=!1,e.animate=!1,e.animation=null;var a=n==null?void 0:n.getBoundingClientRect(),l=r==null?void 0:r.getBoundingClientRect(),d=(a==null?void 0:a.width)||0,c=(a==null?void 0:a.height)||0,p=(l==null?void 0:l.width)||0,x=(l==null?void 0:l.height)||0,f=d<p||c<x,v=!o&&t&&(t==null?void 0:t.total)>.1&&f;v?_a(e):Ui(e)}}function Ue(e,o,t,n){var r=e.setup,a=r.minScale,l=r.maxScale,d=r.limitToBounds,c=ce(K(o,2),a,l,0,!1),p=re(e,c),x=ke(e,t,n,c,p,d),f=x.x,v=x.y;return{scale:c,positionX:f,positionY:v}}function Qi(e,o,t){var n=e.transformState.scale,r=e.wrapperComponent,a=e.setup,l=a.minScale,d=a.limitToBounds,c=a.zoomAnimation,p=c.disabled,x=c.animationTime,f=c.animationType,v=p||n>=l;if((n>=1||d)&&Ui(e),!(v||!r||!e.mounted)){var w=o||r.offsetWidth/2,C=t||r.offsetHeight/2,j=Ue(e,l,w,C);j&&ee(e,j,x,f)}}var G=function(){return G=Object.assign||function(o){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(o[a]=t[a])}return o},G.apply(this,arguments)};function Ti(e,o,t){if(t||arguments.length===2)for(var n=0,r=o.length,a;n<r;n++)(a||!(n in o))&&(a||(a=Array.prototype.slice.call(o,0,n)),a[n]=o[n]);return e.concat(a||Array.prototype.slice.call(o))}var be={previousScale:1,scale:1,positionX:0,positionY:0},de={disabled:!1,minPositionX:null,maxPositionX:null,minPositionY:null,maxPositionY:null,minScale:1,maxScale:8,limitToBounds:!0,centerZoomedOut:!1,centerOnInit:!1,disablePadding:!1,smooth:!0,wheel:{step:.2,disabled:!1,smoothStep:.001,wheelDisabled:!1,touchPadDisabled:!1,activationKeys:[],excluded:[]},panning:{disabled:!1,velocityDisabled:!1,lockAxisX:!1,lockAxisY:!1,activationKeys:[],excluded:[]},pinch:{step:5,disabled:!1,excluded:[]},doubleClick:{disabled:!1,step:.7,mode:"zoomIn",animationType:"easeOut",animationTime:200,excluded:[]},zoomAnimation:{disabled:!1,size:.4,animationTime:200,animationType:"easeOut"},alignmentAnimation:{disabled:!1,sizeX:100,sizeY:100,animationTime:200,velocityAlignmentTime:400,animationType:"easeOut"},velocityAnimation:{disabled:!1,sensitivity:1,animationTime:400,animationType:"easeOut",equalToMove:!0}},qi=function(e){var o,t,n,r;return{previousScale:(o=e.initialScale)!==null&&o!==void 0?o:be.scale,scale:(t=e.initialScale)!==null&&t!==void 0?t:be.scale,positionX:(n=e.initialPositionX)!==null&&n!==void 0?n:be.positionX,positionY:(r=e.initialPositionY)!==null&&r!==void 0?r:be.positionY}},Pi=function(e){var o=G({},de);return Object.keys(e).forEach(function(t){var n=typeof e[t]!="undefined",r=typeof de[t]!="undefined";if(r&&n){var a=Object.prototype.toString.call(de[t]),l=a==="[object Object]",d=a==="[object Array]";l?o[t]=G(G({},de[t]),e[t]):d?o[t]=Ti(Ti([],de[t],!0),e[t],!0):o[t]=e[t]}}),o},Gi=function(e,o,t){var n=e.transformState.scale,r=e.wrapperComponent,a=e.setup,l=a.maxScale,d=a.minScale,c=a.zoomAnimation,p=a.smooth,x=c.size;if(!r)throw new Error("Wrapper is not mounted");var f=p?n*Math.exp(o*t):n+o*t,v=ce(K(f,3),d,l,x,!1);return v};function Ji(e,o,t,n,r){var a=e.wrapperComponent,l=e.transformState,d=l.scale,c=l.positionX,p=l.positionY;if(a){var x=a.offsetWidth,f=a.offsetHeight,v=(x/2-c)/d,w=(f/2-p)/d,C=Gi(e,o,t),j=Ue(e,C,v,w);j&&ee(e,j,n,r)}}function et(e,o,t,n){var r=e.setup,a=e.wrapperComponent,l=r.limitToBounds,d=qi(e.props),c=e.transformState,p=c.scale,x=c.positionX,f=c.positionY;if(a){var v=Ze(e,d.scale),w=je(d.positionX,d.positionY,v,l,0,0,a),C={scale:d.scale,positionX:w.x,positionY:w.y};p===d.scale&&x===d.positionX&&f===d.positionY||(n==null||n(),ee(e,C,o,t))}}function Wa(e,o,t,n){var r=e.getBoundingClientRect(),a=o.getBoundingClientRect(),l=t.getBoundingClientRect(),d=a.x*n.scale,c=a.y*n.scale;return{x:(r.x-l.x+d)/n.scale,y:(r.y-l.y+c)/n.scale}}function Ka(e,o,t){var n=e.wrapperComponent,r=e.contentComponent,a=e.transformState,l=e.setup,d=l.limitToBounds,c=l.minScale,p=l.maxScale;if(!n||!r)return a;var x=n.getBoundingClientRect(),f=o.getBoundingClientRect(),v=Wa(o,n,r,a),w=v.x,C=v.y,j=f.width/a.scale,y=f.height/a.scale,k=n.offsetWidth/j,E=n.offsetHeight/y,b=ce(t||Math.min(k,E),c,p,0,!1),B=(x.width-j*b)/2,F=(x.height-y*b)/2,P=(x.left-w)*b+B,m=(x.top-C)*b+F,z=Ze(e,b),T=je(P,m,z,d,0,0,n),O=T.x,N=T.y;return{positionX:O,positionY:N,scale:b}}var Ia=function(e){return function(o,t,n){o===void 0&&(o=.5),t===void 0&&(t=300),n===void 0&&(n="easeOut"),Ji(e,1,o,t,n)}},Va=function(e){return function(o,t,n){o===void 0&&(o=.5),t===void 0&&(t=300),n===void 0&&(n="easeOut"),Ji(e,-1,o,t,n)}},Za=function(e){return function(o,t,n,r,a){r===void 0&&(r=300),a===void 0&&(a="easeOut");var l=e.transformState,d=l.positionX,c=l.positionY,p=l.scale,x=e.wrapperComponent,f=e.contentComponent,v=e.setup.disabled;if(!(v||!x||!f)){var w={positionX:Number.isNaN(o)?d:o,positionY:Number.isNaN(t)?c:t,scale:Number.isNaN(n)?p:n};ee(e,w,r,a)}}},Ua=function(e){return function(o,t){o===void 0&&(o=200),t===void 0&&(t="easeOut"),et(e,o,t)}},Qa=function(e){return function(o,t,n){t===void 0&&(t=200),n===void 0&&(n="easeOut");var r=e.transformState,a=e.wrapperComponent,l=e.contentComponent;if(a&&l){var d=it(o||r.scale,a,l);ee(e,d,t,n)}}},qa=function(e){return function(o,t,n,r){n===void 0&&(n=600),r===void 0&&(r="easeOut"),Z(e);var a=e.wrapperComponent,l=typeof o=="string"?document.getElementById(o):o;if(a&&l&&a.contains(l)){var d=Ka(e,l,t);ee(e,d,n,r)}}},We=function(e){return{instance:e,zoomIn:Ia(e),zoomOut:Va(e),setTransform:Za(e),resetTransform:Ua(e),centerView:Qa(e),zoomToElement:qa(e)}},Ga=function(e){return{instance:e,state:e.transformState}},D=function(e){var o={};return Object.assign(o,Ga(e)),Object.assign(o,We(e)),o},Le=!1;function Ne(){try{var e={get passive(){return Le=!0,!1}};return e}catch(o){return Le=!1,Le}}var Ce=function(e,o){var t=e.tagName.toUpperCase(),n=o.find(function(a){return a.toUpperCase()===t});if(n)return!0;var r=o.find(function(a){return e.classList.contains(a)});return!!r},Ke=function(e){e&&clearTimeout(e)},Ja=function(e,o,t){return"translate(".concat(e,"px, ").concat(o,"px) scale(").concat(t,")")},it=function(e,o,t){var n=t.offsetWidth*e,r=t.offsetHeight*e,a=(o.offsetWidth-n)/2,l=(o.offsetHeight-r)/2;return{scale:e,positionX:a,positionY:l}};function er(e){return function(o){e.forEach(function(t){typeof t=="function"?t(o):t!=null&&(t.current=o)})}}var ir=function(e,o){var t=e.setup.wheel,n=t.disabled,r=t.wheelDisabled,a=t.touchPadDisabled,l=t.excluded,d=e.isInitialized,c=e.isPanning,p=o.target,x=d&&!c&&!n&&p;if(!x||r&&!o.ctrlKey||a&&o.ctrlKey)return!1;var f=Ce(p,l);return!f},tr=function(e){return e?e.deltaY<0?1:-1:0};function nr(e,o){var t=tr(e),n=ga(o,t);return n}function tt(e,o,t){var n=o.getBoundingClientRect(),r=0,a=0;if("clientX"in e)r=(e.clientX-n.left)/t,a=(e.clientY-n.top)/t;else{var l=e.touches[0];r=(l.clientX-n.left)/t,a=(l.clientY-n.top)/t}return Number.isNaN(r)||Number.isNaN(a),{x:r,y:a}}var or=function(e,o,t,n,r){var a=e.transformState.scale,l=e.wrapperComponent,d=e.setup,c=d.maxScale,p=d.minScale,x=d.zoomAnimation,f=d.disablePadding,v=x.size,w=x.disabled;if(!l)throw new Error("Wrapper is not mounted");var C=a+o*t;if(r)return C;var j=n?!1:!w,y=ce(K(C,3),p,c,v,j&&!f);return y},ar=function(e,o){var t=e.previousWheelEvent,n=e.transformState.scale,r=e.setup,a=r.maxScale,l=r.minScale;return t?n<a||n>l||Math.sign(t.deltaY)!==Math.sign(o.deltaY)||t.deltaY>0&&t.deltaY<o.deltaY||t.deltaY<0&&t.deltaY>o.deltaY||Math.sign(t.deltaY)!==Math.sign(o.deltaY):!1},rr=function(e,o){var t=e.setup.pinch,n=t.disabled,r=t.excluded,a=e.isInitialized,l=o.target,d=a&&!n&&l;if(!d)return!1;var c=Ce(l,r);return!c},sr=function(e){var o=e.setup.pinch.disabled,t=e.isInitialized,n=e.pinchStartDistance,r=t&&!o&&n;return!!r},lr=function(e,o,t){var n=t.getBoundingClientRect(),r=e.touches,a=K(r[0].clientX-n.left,5),l=K(r[0].clientY-n.top,5),d=K(r[1].clientX-n.left,5),c=K(r[1].clientY-n.top,5);return{x:(a+d)/2/o,y:(l+c)/2/o}},nt=function(e){return Math.sqrt(Math.pow(e.touches[0].pageX-e.touches[1].pageX,2)+Math.pow(e.touches[0].pageY-e.touches[1].pageY,2))},dr=function(e,o){var t=e.pinchStartScale,n=e.pinchStartDistance,r=e.setup,a=r.maxScale,l=r.minScale,d=r.zoomAnimation,c=r.disablePadding,p=d.size,x=d.disabled;if(!t||n===null||!o)throw new Error("Pinch touches distance was not provided");if(o<0)return e.transformState.scale;var f=o/n,v=f*t;return ce(K(v,2),l,a,p,!x&&!c)},cr=160,pr=100,ur=function(e,o){var t=e.props,n=t.onWheelStart,r=t.onZoomStart;e.wheelStopEventTimer||(Z(e),Y(D(e),o,n),Y(D(e),o,r))},xr=function(e,o){var t=e.props,n=t.onWheel,r=t.onZoom,a=e.contentComponent,l=e.setup,d=e.transformState,c=d.scale,p=l.limitToBounds,x=l.centerZoomedOut,f=l.zoomAnimation,v=l.wheel,w=l.disablePadding,C=l.smooth,j=f.size,y=f.disabled,k=v.step,E=v.smoothStep;if(!a)throw new Error("Component not mounted");o.preventDefault(),o.stopPropagation();var b=nr(o,null),B=C?E*Math.abs(o.deltaY):k,F=or(e,b,B,!o.ctrlKey);if(c!==F){var P=re(e,F),m=tt(o,a,c),z=y||j===0||x||w,T=p&&z,O=ke(e,m.x,m.y,F,P,T),N=O.x,_=O.y;e.previousWheelEvent=o,e.setTransformState(F,N,_),Y(D(e),o,n),Y(D(e),o,r)}},gr=function(e,o){var t=e.props,n=t.onWheelStop,r=t.onZoomStop;Ke(e.wheelAnimationTimer),e.wheelAnimationTimer=setTimeout(function(){e.mounted&&(Qi(e,o.x,o.y),e.wheelAnimationTimer=null)},pr);var a=ar(e,o);a&&(Ke(e.wheelStopEventTimer),e.wheelStopEventTimer=setTimeout(function(){e.mounted&&(e.wheelStopEventTimer=null,Y(D(e),o,n),Y(D(e),o,r))},cr))},mr=function(e,o){var t=nt(o);e.pinchStartDistance=t,e.lastDistance=t,e.pinchStartScale=e.transformState.scale,e.isPanning=!1,Z(e)},fr=function(e,o){var t=e.contentComponent,n=e.pinchStartDistance,r=e.transformState.scale,a=e.setup,l=a.limitToBounds,d=a.centerZoomedOut,c=a.zoomAnimation,p=c.disabled,x=c.size;if(!(n===null||!t)){var f=lr(o,r,t);if(!(!Number.isFinite(f.x)||!Number.isFinite(f.y))){var v=nt(o),w=dr(e,v);if(w!==r){var C=re(e,w),j=p||x===0||d,y=l&&j,k=ke(e,f.x,f.y,w,C,y),E=k.x,b=k.y;e.pinchMidpoint=f,e.lastDistance=v,e.setTransformState(w,E,b)}}}},hr=function(e){var o=e.pinchMidpoint;e.velocity=null,e.lastDistance=null,e.pinchMidpoint=null,e.pinchStartScale=null,e.pinchStartDistance=null,Qi(e,o==null?void 0:o.x,o==null?void 0:o.y)},ot=function(e,o){var t=e.props.onZoomStop,n=e.setup.doubleClick.animationTime;Ke(e.doubleClickStopEventTimer),e.doubleClickStopEventTimer=setTimeout(function(){e.doubleClickStopEventTimer=null,Y(D(e),o,t)},n)},br=function(e,o){var t=e.props,n=t.onZoomStart,r=t.onZoom,a=e.setup.doubleClick,l=a.animationTime,d=a.animationType;Y(D(e),o,n),et(e,l,d,function(){return Y(D(e),o,r)}),ot(e,o)};function vr(e,o){var t=e.setup,n=e.doubleClickStopEventTimer,r=e.transformState,a=e.contentComponent,l=r.scale,d=e.props,c=d.onZoomStart,p=d.onZoom,x=t.doubleClick,f=x.disabled,v=x.mode,w=x.step,C=x.animationTime,j=x.animationType;if(!f&&!n){if(v==="reset")return br(e,o);if(a){var y=v==="zoomOut"?-1:1,k=Gi(e,y,w);if(l!==k){Y(D(e),o,c);var E=tt(o,a,l),b=Ue(e,k,E.x,E.y);b&&(Y(D(e),o,p),ee(e,b,C,j),ot(e,o))}}}}var wr=function(e,o){var t=e.isInitialized,n=e.setup,r=e.wrapperComponent,a=n.doubleClick,l=a.disabled,d=a.excluded,c=o.target,p=r==null?void 0:r.contains(c),x=t&&c&&p&&!l;if(!x)return!1;var f=Ce(c,d);return!f},yr=function(){function e(o){var t=this;this.mounted=!0,this.onChangeCallbacks=new Set,this.onInitCallbacks=new Set,this.wrapperComponent=null,this.contentComponent=null,this.isInitialized=!1,this.bounds=null,this.previousWheelEvent=null,this.wheelStopEventTimer=null,this.wheelAnimationTimer=null,this.isPanning=!1,this.startCoords=null,this.lastTouch=null,this.distance=null,this.lastDistance=null,this.pinchStartDistance=null,this.pinchStartScale=null,this.pinchMidpoint=null,this.doubleClickStopEventTimer=null,this.velocity=null,this.velocityTime=null,this.lastMousePosition=null,this.animate=!1,this.animation=null,this.maxBounds=null,this.pressedKeys={},this.mount=function(){t.initializeWindowEvents()},this.unmount=function(){t.cleanupWindowEvents()},this.update=function(n){re(t,t.transformState.scale),t.setup=Pi(n)},this.initializeWindowEvents=function(){var n,r=Ne(),a=(n=t.wrapperComponent)===null||n===void 0?void 0:n.ownerDocument,l=a==null?void 0:a.defaultView;l==null||l.addEventListener("mousedown",t.onPanningStart,r),l==null||l.addEventListener("mousemove",t.onPanning,r),l==null||l.addEventListener("mouseup",t.onPanningStop,r),a==null||a.addEventListener("mouseleave",t.clearPanning,r),l==null||l.addEventListener("keyup",t.setKeyUnPressed,r),l==null||l.addEventListener("keydown",t.setKeyPressed,r)},this.cleanupWindowEvents=function(){var n,r,a=Ne(),l=(n=t.wrapperComponent)===null||n===void 0?void 0:n.ownerDocument,d=l==null?void 0:l.defaultView;d==null||d.removeEventListener("mousedown",t.onPanningStart,a),d==null||d.removeEventListener("mousemove",t.onPanning,a),d==null||d.removeEventListener("mouseup",t.onPanningStop,a),l==null||l.removeEventListener("mouseleave",t.clearPanning,a),d==null||d.removeEventListener("keyup",t.setKeyUnPressed,a),d==null||d.removeEventListener("keydown",t.setKeyPressed,a),document.removeEventListener("mouseleave",t.clearPanning,a),Z(t),(r=t.observer)===null||r===void 0||r.disconnect()},this.handleInitializeWrapperEvents=function(n){var r=Ne();n.addEventListener("wheel",t.onWheelZoom,r),n.addEventListener("dblclick",t.onDoubleClick,r),n.addEventListener("touchstart",t.onTouchPanningStart,r),n.addEventListener("touchmove",t.onTouchPanning,r),n.addEventListener("touchend",t.onTouchPanningStop,r)},this.handleInitialize=function(n){var r=t.setup.centerOnInit;t.applyTransformation(),t.onInitCallbacks.forEach(function(a){return a(D(t))}),r&&(t.setCenter(),t.observer=new ResizeObserver(function(){var a;t.onInitCallbacks.forEach(function(l){return l(D(t))}),t.setCenter(),(a=t.observer)===null||a===void 0||a.disconnect()}),t.observer.observe(n))},this.onWheelZoom=function(n){var r=t.setup.disabled;if(!r){var a=ir(t,n);if(a){var l=t.isPressingKeys(t.setup.wheel.activationKeys);l&&(ur(t,n),xr(t,n),gr(t,n))}}},this.onPanningStart=function(n){var r=t.setup.disabled,a=t.props.onPanningStart;if(!r){var l=ji(t,n);if(l){var d=t.isPressingKeys(t.setup.panning.activationKeys);d&&(n.preventDefault(),n.stopPropagation(),Z(t),Si(t,n),Y(D(t),n,a))}}},this.onPanning=function(n){var r=t.setup.disabled,a=t.props.onPanning;if(!r){var l=ki(t);if(l){var d=t.isPressingKeys(t.setup.panning.activationKeys);d&&(n.preventDefault(),n.stopPropagation(),zi(t,n.clientX,n.clientY),Y(D(t),n,a))}}},this.onPanningStop=function(n){var r=t.props.onPanningStop;t.isPanning&&(Ha(t),Y(D(t),n,r))},this.onPinchStart=function(n){var r=t.setup.disabled,a=t.props,l=a.onPinchingStart,d=a.onZoomStart;if(!r){var c=rr(t,n);c&&(mr(t,n),Z(t),Y(D(t),n,l),Y(D(t),n,d))}},this.onPinch=function(n){var r=t.setup.disabled,a=t.props,l=a.onPinching,d=a.onZoom;if(!r){var c=sr(t);c&&(n.preventDefault(),n.stopPropagation(),fr(t,n),Y(D(t),n,l),Y(D(t),n,d))}},this.onPinchStop=function(n){var r=t.props,a=r.onPinchingStop,l=r.onZoomStop;t.pinchStartScale&&(hr(t),Y(D(t),n,a),Y(D(t),n,l))},this.onTouchPanningStart=function(n){var r=t.setup.disabled,a=t.props.onPanningStart;if(!r){var l=ji(t,n);if(l){var d=t.lastTouch&&+new Date-t.lastTouch<200;if(d&&n.touches.length===1)t.onDoubleClick(n);else{t.lastTouch=+new Date,Z(t);var c=n.touches,p=c.length===1,x=c.length===2;p&&(Z(t),Si(t,n),Y(D(t),n,a)),x&&t.onPinchStart(n)}}}},this.onTouchPanning=function(n){var r=t.setup.disabled,a=t.props.onPanning;if(t.isPanning&&n.touches.length===1){if(r)return;var l=ki(t);if(!l)return;n.preventDefault(),n.stopPropagation();var d=n.touches[0];zi(t,d.clientX,d.clientY),Y(D(t),n,a)}else n.touches.length>1&&t.onPinch(n)},this.onTouchPanningStop=function(n){t.onPanningStop(n),t.onPinchStop(n)},this.onDoubleClick=function(n){var r=t.setup.disabled;if(!r){var a=wr(t,n);a&&vr(t,n)}},this.clearPanning=function(n){t.isPanning&&t.onPanningStop(n)},this.setKeyPressed=function(n){t.pressedKeys[n.key]=!0},this.setKeyUnPressed=function(n){t.pressedKeys[n.key]=!1},this.isPressingKeys=function(n){return n.length?!!n.find(function(r){return t.pressedKeys[r]}):!0},this.setTransformState=function(n,r,a){var l=t.props.onTransformed;if(!Number.isNaN(n)&&!Number.isNaN(r)&&!Number.isNaN(a)){n!==t.transformState.scale&&(t.transformState.previousScale=t.transformState.scale,t.transformState.scale=n),t.transformState.positionX=r,t.transformState.positionY=a,t.applyTransformation();var d=D(t);t.onChangeCallbacks.forEach(function(c){return c(d)}),Y(d,{scale:n,positionX:r,positionY:a},l)}},this.setCenter=function(){if(t.wrapperComponent&&t.contentComponent){var n=it(t.transformState.scale,t.wrapperComponent,t.contentComponent);t.setTransformState(n.scale,n.positionX,n.positionY)}},this.handleTransformStyles=function(n,r,a){return t.props.customTransform?t.props.customTransform(n,r,a):Ja(n,r,a)},this.applyTransformation=function(){if(!(!t.mounted||!t.contentComponent)){var n=t.transformState,r=n.scale,a=n.positionX,l=n.positionY,d=t.handleTransformStyles(a,l,r);t.contentComponent.style.transform=d}},this.getContext=function(){return D(t)},this.onChange=function(n){return t.onChangeCallbacks.has(n)||t.onChangeCallbacks.add(n),function(){t.onChangeCallbacks.delete(n)}},this.onInit=function(n){return t.onInitCallbacks.has(n)||t.onInitCallbacks.add(n),function(){t.onInitCallbacks.delete(n)}},this.init=function(n,r){t.cleanupWindowEvents(),t.wrapperComponent=n,t.contentComponent=r,re(t,t.transformState.scale),t.handleInitializeWrapperEvents(n),t.handleInitialize(r),t.initializeWindowEvents(),t.isInitialized=!0;var a=D(t);Y(a,void 0,t.props.onInit)},this.props=o,this.setup=Pi(this.props),this.transformState=qi(this.props)}return e}(),Qe=J.createContext(null),jr=function(e,o){return typeof e=="function"?e(o):e},kr=J.forwardRef(function(e,o){var t=g.useRef(new yr(e)).current,n=jr(e.children,We(t));return g.useImperativeHandle(o,function(){return We(t)},[t]),g.useEffect(function(){t.update(e)},[t,e]),J.createElement(Qe.Provider,{value:t},n)});J.forwardRef(function(e,o){var t=g.useRef(null),n=g.useContext(Qe);return g.useEffect(function(){return n.onChange(function(r){if(t.current){var a=0,l=0;t.current.style.transform=n.handleTransformStyles(a,l,1/r.instance.transformState.scale)}})},[n]),J.createElement("div",G({},e,{ref:er([t,o])}))});function Cr(e,o){o===void 0&&(o={});var t=o.insertAt;if(!(!e||typeof document=="undefined")){var n=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css",t==="top"&&n.firstChild?n.insertBefore(r,n.firstChild):n.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e))}}var Sr=`.transform-component-module_wrapper__SPB86 {
  position: relative;
  width: -moz-fit-content;
  width: fit-content;
  height: -moz-fit-content;
  height: fit-content;
  overflow: hidden;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  margin: 0;
  padding: 0;
}
.transform-component-module_content__FBWxo {
  display: flex;
  flex-wrap: wrap;
  width: -moz-fit-content;
  width: fit-content;
  height: -moz-fit-content;
  height: fit-content;
  margin: 0;
  padding: 0;
  transform-origin: 0% 0%;
}
.transform-component-module_content__FBWxo img {
  pointer-events: none;
}
`,Ei={wrapper:"transform-component-module_wrapper__SPB86",content:"transform-component-module_content__FBWxo"};Cr(Sr);var zr=function(e){var o=e.children,t=e.wrapperClass,n=t===void 0?"":t,r=e.contentClass,a=r===void 0?"":r,l=e.wrapperStyle,d=e.contentStyle,c=e.wrapperProps,p=c===void 0?{}:c,x=e.contentProps,f=x===void 0?{}:x,v=g.useContext(Qe).init,w=g.useRef(null),C=g.useRef(null);return g.useEffect(function(){var j=w.current,y=C.current;j!==null&&y!==null&&v&&v(j,y)},[]),J.createElement("div",G({},p,{ref:w,className:"react-transform-wrapper ".concat(Ei.wrapper," ").concat(n),style:l}),J.createElement("div",G({},f,{ref:C,className:"react-transform-component ".concat(Ei.content," ").concat(a),style:d}),o))};const Tr=s(h.div)`
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
`,Pr=s(h.div)`
  background: white;
  border-radius: 20px;
  max-width: ${e=>e.small?"350px":"95vw"};
  max-height: ${e=>e.small?"180px":"95vh"};
  min-width: ${e=>e.small?"260px":"unset"};
  min-height: ${e=>e.small?"120px":"unset"};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: ${e=>e.small?"24px 20px":"20px"};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  /* 允许在移动端滚动浏览更多内容，避免信息一次性挤满屏幕 */
  overflow: auto;
  justify-content: flex-start;
`,Er=s.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`,$r=s.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 15px;
`,Br=s(h.div)`
  position: absolute;
  font-size: ${e=>e.size||30}px;
  left: ${e=>e.leftPx}px;
  top: ${e=>e.topPx}px;
  transform: translate(-50%, -50%);
  z-index: 5;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`,Fr=s.img`
  width: ${e=>e.size||30}px;
  height: ${e=>e.size||30}px;
  object-fit: contain;
  max-width: 40vw;
  max-height: 40vw;
`,Mr=s.div`
  text-align: center;
  max-width: 600px;
`,$i=s.h3`
  font-size: 28px;
  color: #5d4037;
  margin: 0 0 10px 0;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
`,Bi=s.p`
  font-size: 18px;
  color: #666;
  margin: 0;
  line-height: 1.6;
  text-align: center;
`,at=({isOpen:e,onClose:o,mapImage:t,title:n,description:r,iconEmoji:a="🤭",iconPositions:l,mode:d})=>{if(!e)return null;const c=l&&l.length>0?l:[],p=g.useRef(null),x=g.useRef(null),[f,v]=g.useState(1),[w,C]=g.useState({width:0,height:0,offsetLeft:0,offsetTop:0});return g.useEffect(()=>{const j=()=>{const k=p.current,E=x.current;if(!k||!E)return;const b=k.getBoundingClientRect().width,B=E.getBoundingClientRect().width,F=k.getBoundingClientRect(),P=E.getBoundingClientRect();if(C({width:P.width,height:P.height,offsetLeft:P.left-F.left,offsetTop:P.top-F.top}),b>0){const z=Math.min(b/1e3,1),T=B/b;v(z*T)}};j();const y=new ResizeObserver(()=>j());return p.current&&y.observe(p.current),x.current&&y.observe(x.current),()=>y.disconnect()},[]),i.jsx(L,{children:i.jsx(Tr,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:o,children:i.jsx(Pr,{small:d==="desc",initial:{scale:.8,opacity:0,y:50},animate:{scale:1,opacity:1,y:0},exit:{scale:.8,opacity:0,y:50},onClick:j=>j.stopPropagation(),transition:{type:"spring",stiffness:300,damping:30},children:d==="desc"?i.jsxs(i.Fragment,{children:[i.jsx($i,{children:n}),i.jsx(Bi,{children:r})]}):i.jsxs(i.Fragment,{children:[i.jsx("div",{style:{width:"100%",height:"75vh"},children:i.jsx(kr,{minScale:1,maxScale:4,doubleClick:{disabled:!0},pinch:{step:5},wheel:{step:.1},children:i.jsx(zr,{wrapperStyle:{width:"100%",height:"100%"},contentStyle:{width:"100%",height:"100%"},children:i.jsxs(Er,{ref:p,children:[i.jsx($r,{ref:x,src:t,alt:n,onLoad:()=>{const j=p.current,y=x.current;if(!j||!y)return;const k=j.getBoundingClientRect(),E=y.getBoundingClientRect();C({width:E.width,height:E.height,offsetLeft:E.left-k.left,offsetTop:E.top-k.top})}}),w.width>0&&c.map((j,y)=>{const k=w.offsetLeft+j.x/100*w.width,E=w.offsetTop+j.y/100*w.height;return i.jsx(Br,{leftPx:k,topPx:E,size:Math.max(18,(j.size||30)*f),initial:{scale:0,rotate:-180},animate:{scale:1,rotate:0},transition:{delay:.3+y*.1,type:"spring",stiffness:300,damping:20},children:j.icon?i.jsx(Fr,{src:j.icon,alt:"icon",size:Math.max(18,(j.size||30)*f)}):i.jsx("span",{style:{fontSize:`${Math.max(18,(j.size||30)*f)}px`},children:j.emoji||a})},y)})]})})})}),i.jsxs(Mr,{children:[i.jsx($i,{children:n}),i.jsx(Bi,{children:r})]})]})})})})},Or=s.div`
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
`,Dr=s.div`
  text-align: center;
  margin-bottom: 40px;
`,Ar=s.h1`
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
`,Fi=s.span`
  font-size: 60px;
  display: inline-flex;
  align-items: center;
  
  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
`,Yr=s.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`,Rr=s.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`,Mi=s(h.div)`
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
`,Xr=s.h3`
  font-size: 28px;
  color: #5d4037;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
`,q=s.p`
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
`,Lr=s.div`
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
`,Nr=s.div`
  width: fit-content;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`,_r=s.img`
  width: ${e=>e.scale*800}px;
  max-width: 100vw;
  height: auto;
  border-radius: 20px;
  display: block;
`,Hr=s.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  pointer-events: none;
`,Wr=s(h.div)`
  position: absolute;
  font-size: ${e=>e.iconSize}px;
  cursor: pointer;
  left: ${e=>e.leftPx}px;
  top: ${e=>e.topPx}px;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: auto;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
`,Kr=s.div`
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
  
  ${e=>{switch(e.position){case"top":return`
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
`,Ir=s.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
`,Vr=s.div`
  font-size: 16px;
  font-weight: 700;
  color: #5d4037;
  margin-bottom: 4px;
  text-align: center;
`,Zr=s.div`
  font-size: 14px;
  color: #666;
  text-align: center;
`,Ur=s.div`
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
`,Qr=s(h.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`,qr=s.h4`
  padding: 15px 15px 5px 15px;
  font-size: 18px;
  color: #5d4037;
  text-align: center;
  margin: 0;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
`,Gr=s.p`
  padding: 5px 15px 15px 15px;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`,Jr=s.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`,es=s(h.button)`
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
`,is=s(h.button)`
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
`,ts=s(h.div)`
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
`,ns=s(h.div)`
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
`,os=s.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`,as=s.div`
  text-align: center;
  color: #333;
`,rs=s.h3`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #5d4037;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`,ss=s.p`
  font-size: 18px;
  margin: 0;
  color: #666;
  font-weight: 500;
`,Oi=s(h.button)`
  position: absolute;
  top: 50%;
  ${e=>e.direction==="prev"?"left: -70px;":"right: -70px;"}
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
    ${e=>e.direction==="prev"?"left: 10px;":"right: 10px;"}
    top: auto;
    bottom: 20px;
  }
`,ls=s.div`
  display: flex;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  backdrop-filter: blur(10px);
`,Di=s(h.button)`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  background: ${e=>e.active?e.tabType==="intro"?"linear-gradient(135deg, #ff6b35, #ffa500)":"linear-gradient(135deg, #87ceeb, #98e4d6)":"transparent"};
  color: ${e=>e.active?e.tabType==="intro"?"white":"#2e8b57":"#8d6e63"};
  font-size: 18px;
  font-weight: 600;
  font-family: 'KaiTi', 'SimKai', serif;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${e=>e.active?e.tabType==="intro"?"0 6px 20px rgba(255, 107, 53, 0.3)":"0 6px 20px rgba(135, 206, 235, 0.3)":"none"};
  
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
    background: ${e=>e.tabType==="intro"?"linear-gradient(135deg, #ff8a50, #ffb347)":"linear-gradient(135deg, #98d8eb, #a8e6d2)"};
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 10px;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${e=>e.tabType==="intro"?"0 8px 25px rgba(255, 107, 53, 0.4)":"0 8px 25px rgba(135, 206, 235, 0.4)"};
    
    &::before {
      left: 100%;
    }
    
    &::after {
      opacity: ${e=>e.active?0:.6};
    }
  }
  
  &:active {
    transform: translateY(0);
    transition: transform 0.1s ease;
  }
`,Ai=s(h.div)`
  width: 100%;
`,ds=({isOpen:e,onClose:o,images:t,currentIndex:n,onPrevious:r,onNext:a,title:l})=>{var d,c,p;return!e||t.length===0?null:i.jsx(L,{children:i.jsx(ts,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:o,children:i.jsxs(ns,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},onClick:x=>x.stopPropagation(),children:[t.length>1&&i.jsxs(i.Fragment,{children:[i.jsx(Oi,{direction:"prev",onClick:r,whileHover:{scale:1.05,background:"rgba(255, 255, 255, 0.2)",borderColor:"rgba(255, 255, 255, 0.5)"},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:25,duration:.15},style:{transformOrigin:"center"},children:"‹"}),i.jsx(Oi,{direction:"next",onClick:a,whileHover:{scale:1.05,background:"rgba(255, 255, 255, 0.2)",borderColor:"rgba(255, 255, 255, 0.5)"},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:25,duration:.15},style:{transformOrigin:"center"},children:"›"})]}),i.jsx(os,{src:(d=t[n])==null?void 0:d.src,alt:`${l} - ${(c=t[n])==null?void 0:c.label}`}),i.jsxs(as,{children:[i.jsx(rs,{children:l}),i.jsx(ss,{children:(p=t[n])==null?void 0:p.label})]})]})})})},cs=()=>{const e=U(),[o,t]=g.useState({isOpen:!1,images:[],currentIndex:0,title:""}),[n,r]=g.useState("intro"),[a,l]=g.useState(null),[d,c]=g.useState({isOpen:!1,mapImage:"",title:"",description:"",iconPositions:[]}),[p,x]=g.useState(!0),f=1,v=g.useRef(null),w=g.useRef(null),[C,j]=g.useState(0),[y,k]=g.useState({width:0,height:0,offsetLeft:0,offsetTop:0});g.useEffect(()=>{const u=v.current;if(!u)return;const $=()=>{j(u.getBoundingClientRect().width);const A=w.current;if(A){const X=u.getBoundingClientRect(),I=A.getBoundingClientRect();k({width:I.width,height:I.height,offsetLeft:I.left-X.left,offsetTop:I.top-X.top})}};$();const M=new ResizeObserver(()=>$());return M.observe(u),w.current&&M.observe(w.current),()=>M.disconnect()},[]);const E=f*800,b=C>0?C/E:1,B=Math.max(.5,Math.min(b,1.2)),F={紬的灯塔:30,苍睡觉的小道:30,白羽主视角:30,鸥相遇小道:50},P=[{x:61,y:2,emoji:"🗺️",title:"紬的灯塔",iconType:"emoji",size:F.紬的灯塔},{x:28,y:53,emoji:"🗺️",title:"苍睡觉的小道",iconType:"emoji",size:F.苍睡觉的小道},{x:23,y:74,emoji:"🗺️",title:"白羽主视角",iconType:"emoji",size:F.白羽主视角},{x:49,y:78,icon:"images/webps/男木岛/男木岛-鸥相遇小道图标.webp",title:"鸥相遇小道",iconType:"image",size:F.鸥相遇小道}],m={紬的灯塔:{image:"images/webps/男木岛/男木岛-灯塔.webp",desc:"与小紬相遇的地点"},苍睡觉的小道:{image:"images/webps/男木岛/男木岛-苍睡觉小道.webp",desc:"与苍相遇的地点"},白羽主视角:{image:"images/webps/男木岛/男木岛-防波堤.webp",desc:"第一次见白羽的地点"},鸥相遇小道:{image:"images/webps/男木岛/男木岛-鸥相遇小道.webp",desc:"与鸥相遇的地点"}},z={紬的灯塔:{mapImage:"images/webps/男木岛/男木岛-灯塔地图-线路版.webp",description:"我正在找东西，找自己想要做的事情",iconPositions:[{x:29,y:52,icon:"images/webps/男木岛/男木岛-鬼姬神山识之墓.webp",size:200},{x:91,y:47,icon:"images/webps/男木岛/男木岛-紬的灯塔.webp",size:200}]},苍睡觉的小道:{mapImage:"images/webps/男木岛/男木岛-苍睡觉小道地图-线路版.webp",description:"总之，就算我在睡觉也不必管啦",iconPositions:[{x:47,y:100,icon:"images/webps/男木岛/男木岛-放送塔.webp",size:200},{x:80,y:29,icon:"images/webps/男木岛/男木岛-苍睡觉小道.webp",size:200},{x:95,y:83,icon:"images/webps/男木岛/男木岛-静久神社.webp",size:200}]},白羽主视角:{mapImage:"images/webps/男木岛/男木岛-鸟白岛役场地图-线路版.webp",description:"不用在意我就好",iconPositions:[{x:40,y:2,icon:"images/webps/男木岛/男木岛-放送塔.webp",size:150},{x:7,y:70,icon:"images/webps/男木岛/男木岛-防波堤.webp",size:200},{x:51,y:80,icon:"images/webps/男木岛/男木岛-鸟白岛役场.webp",size:150},{x:85,y:88,icon:"images/webps/男木岛/男木岛-秘密基地.webp",size:100},{x:85,y:95,icon:"images/webps/男木岛/男木岛-泳池.webp",size:100}]},鸥相遇小道:{mapImage:"images/webps/男木岛/男木岛-鸥相遇小道.webp",description:"出发吧~再一次，向着那有海盗船的地方",iconPositions:[]}},T=[{title:"放送塔",description:"美希等爸爸妈妈的地点",images:[{src:"images/webps/男木岛/男木岛-放送塔.webp",label:"放送塔"}]},{title:"苍睡觉的小道",description:"与苍相遇的地点",images:[{src:"images/webps/男木岛/男木岛-苍睡觉小道.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-苍睡觉小道-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-苍睡觉小道-夜晚.webp",label:"夜晚"}]},{title:"鬼姬神山识之墓",description:"与小识。。。",images:[{src:"images/webps/男木岛/男木岛-鬼姬神山识之墓.webp",label:"鬼姬神山识之墓"}]},{title:"紬的灯塔",description:"与小紬相遇的地点",images:[{src:"images/webps/男木岛/男木岛-灯塔.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-灯塔-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-灯塔-夜晚-亮灯.webp",label:"夜晚-亮灯"},{src:"images/webps/男木岛/男木岛-灯塔-夜晚-熄灯.webp",label:"夜晚-熄灯"}]},{title:"静久神社",description:"与静久路过的鸟居",images:[{src:"images/webps/男木岛/男木岛-静久神社.webp",label:"静久神社"}]},{title:"鸟白岛役场",description:"岛上重要的行政场所",images:[{src:"images/webps/男木岛/男木岛-鸟白岛役场.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-鸟白岛役场-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-鸟白岛役场-夜晚.webp",label:"夜晚"}]},{title:"防波堤",description:"白羽主视觉",images:[{src:"images/webps/男木岛/男木岛-防波堤.webp",label:"防波堤"}]},{title:"秘密基地",description:"与天善打乒乓球的地点",images:[{src:"images/webps/男木岛/男木岛-秘密基地.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-秘密基地-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-秘密基地-夜晚.webp",label:"夜晚"}]},{title:"泳池",description:"与白羽相遇的地点",images:[{src:"images/webps/男木岛/男木岛-泳池.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-泳池-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-泳池-夜晚.webp",label:"夜晚"}]},{title:"缺口栏杆",description:"与鸥相遇的地点",images:[{src:"images/webps/男木岛/男木岛-鸥相遇小道.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-鸥相遇小道-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-鸥相遇小道-夜晚.webp",label:"夜晚"}]}],O=()=>{e("/checkin")},N=(u,$,M)=>{t({isOpen:!0,images:u,currentIndex:$,title:M})},_=()=>{t(u=>W(H({},u),{isOpen:!1}))},Q=()=>{t(u=>W(H({},u),{currentIndex:(u.currentIndex-1+u.images.length)%u.images.length}))},ie=()=>{t(u=>W(H({},u),{currentIndex:(u.currentIndex+1)%u.images.length}))},te=(u,$,M,A)=>{c({isOpen:!0,mapImage:$,title:u,description:M,iconPositions:A})},S=()=>{c(u=>W(H({},u),{isOpen:!1}))},R=(u,$)=>$<20?"bottom":$>80?"top":u<20?"right":u>80?"left":"top";return i.jsxs(Or,{children:[i.jsx(Dr,{children:i.jsxs(h.div,{initial:{opacity:0,y:-30},animate:{opacity:1,y:0},transition:{duration:.8},children:[i.jsxs(Ar,{children:[i.jsx(Fi,{children:i.jsx("img",{src:"images/webps/男木岛/男木岛-灯塔图标.webp",alt:"灯塔"})}),"男木岛",i.jsx(Fi,{children:i.jsx("img",{src:"images/webps/男木岛/男木岛-灯塔图标.webp",alt:"灯塔"})})]}),i.jsx(Yr,{children:"宁静的猫岛渔村"})]})}),i.jsxs(Rr,{children:[i.jsxs(Mi,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.2},children:[i.jsxs(ls,{children:[i.jsx(Di,{active:n==="intro",tabType:"intro",onClick:()=>r("intro"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🏝️ 岛屿介绍"}),i.jsx(Di,{active:n==="guide",tabType:"guide",onClick:()=>r("guide"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🗺️ 巡礼说明"})]}),i.jsx(L,{mode:"wait",children:n==="intro"?i.jsx(Ai,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:i.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[i.jsx(q,{children:"男木岛是一个在斜坡上有梯田村庄和历史灯塔的岛屿。"}),i.jsx(q,{children:'男木岛的猫咪特别多，被称为"猫岛"，巡礼之余可以去撸一下猫猫。'})]})},"intro"):i.jsx(Ai,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:i.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[i.jsx(q,{children:"男木岛的巡礼路线主要分为南北两个方向，北边最远的位置是灯塔，南边最远的位置是和鸥相遇的海岸小路。"}),i.jsx(q,{children:"男木岛共有10个巡礼点，巡礼推荐路线如下，点击🗺️可查看详情："}),i.jsx(q,{children:"北边：放送塔 → 苍睡觉的小道 → 鬼姬神山识之墓 → 小紬的灯塔"}),i.jsx(q,{children:"中部：放送塔 → 静久神社"}),i.jsx(q,{children:"南边：放送塔 → 鸟白岛役场 →  防波堤 → 秘密基地（泳池） → 鸥相遇的小路"}),i.jsxs(q,{children:["其他说明：",i.jsx("div",{style:{textIndent:"2em"},children:"1. 男木岛的巡礼方式为步行，灯塔距离较远，请安排好时间。"}),i.jsx("div",{style:{textIndent:"2em"},children:"2. 放送塔上岛即可看见，适合作为男木岛巡礼的起点。"}),i.jsx("div",{style:{textIndent:"2em"},children:"3. 秘密基地由丰爷自建，泳池有人时不要拍照。"}),i.jsx("div",{style:{textIndent:"2em"},children:"4. 有时间可以和丰爷聊天，丰爷人很好，一来就给你放bgm。"})]})]})},"guide")})]}),i.jsx(h.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.4},children:i.jsx(Lr,{children:i.jsxs(Nr,{ref:v,children:[i.jsx(_r,{ref:w,scale:f,src:"images/webps/男木岛/男木岛地图-线路版.webp",alt:"男木岛地图",onLoad:()=>{const u=v.current,$=w.current;if(!u||!$)return;const M=u.getBoundingClientRect(),A=$.getBoundingClientRect();k({width:A.width,height:A.height,offsetLeft:A.left-M.left,offsetTop:A.top-M.top})}}),i.jsx(Hr,{children:y.width>0&&P.map((u,$)=>{const M=y.offsetLeft+u.x/100*y.width,A=y.offsetTop+u.y/100*y.height;return i.jsxs(Wr,{leftPx:M,topPx:A,iconSize:u.size*B,initial:{scale:0},animate:{scale:1},transition:{delay:1+$*.1,duration:.5},whileHover:{scale:1.2},title:u.title,onClick:()=>{const X=z[u.title];X&&te(u.title,X.mapImage,X.description,X.iconPositions||[])},onMouseEnter:()=>{const X=m[u.title];X&&l({x:u.x,y:u.y,title:u.title,image:X.image,desc:X.desc})},onMouseLeave:()=>l(null),children:[u.iconType==="emoji"?i.jsx("span",{style:{fontSize:`${Math.max(18,u.size*B)}px`},children:u.emoji}):i.jsx("img",{src:u.icon,alt:u.title,style:{width:`${Math.max(18,u.size*B)}px`,height:`${Math.max(18,u.size*B)}px`,borderRadius:"50%",objectFit:"cover"}}),a&&a.title===u.title&&i.jsxs(Kr,{position:R(u.x,u.y),children:[i.jsx(Ir,{src:a.image,alt:a.title}),i.jsx(Vr,{children:a.title}),i.jsx(Zr,{children:a.desc})]})]},u.title)})})]})})}),i.jsxs(Mi,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.6},children:[i.jsx(Xr,{children:"打卡地点"}),i.jsx(Ur,{children:T.map(u=>i.jsxs(Qr,{whileHover:{scale:1.02},transition:{duration:.3},initial:{opacity:0,y:30},animate:{opacity:1,y:0},onClick:()=>N(u.images,0,u.title),style:{cursor:"pointer"},children:[i.jsx(Ve,{images:u.images,title:u.title,autoPlay:!0,interval:4e3,isPlaying:p,onImageClick:$=>N(u.images,$,u.title)}),i.jsx(qr,{children:u.title}),i.jsx(Gr,{children:u.description})]},u.title))})]})]}),i.jsxs(Jr,{children:[i.jsx(is,{onClick:()=>x(!p),whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.6},children:p?"⏸ 停止轮播":"▶ 开始轮播"}),i.jsx(es,{onClick:O,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.8},children:"返回打卡篇"})]}),i.jsx(ds,{isOpen:o.isOpen,onClose:_,images:o.images,currentIndex:o.currentIndex,onPrevious:Q,onNext:ie,title:o.title}),i.jsx(at,{isOpen:d.isOpen,onClose:S,mapImage:d.mapImage,title:d.title,description:d.description,iconPositions:d.iconPositions,mode:"full"})]})},ps=s.div`
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
`,us=s.div`
  text-align: center;
  margin-bottom: 40px;
`,xs=s.h1`
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
`,Yi=s.span`
  font-size: 60px;
  display: inline-flex;
  align-items: center;
`,gs=s.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`,ms=s.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`,Ri=s(h.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
`,fs=s.h3`
  font-size: 28px;
  color: #5d4037;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
`,ae=s.p`
  font-size: 18px;
  color: #444;
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: left;
  text-indent: 2em;
  position: relative;
`,hs=s.div`
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
`,bs=s.div`
  width: fit-content;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`,vs=s.img`
  width: ${e=>e.scale*800}px;
  max-width: 100vw;
  height: auto;
  border-radius: 20px;
  display: block;
`,ws=s.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  pointer-events: none;
`,ys=s(h.div)`
  position: absolute;
  font-size: ${e=>e.iconSize}px;
  cursor: pointer;
  left: ${e=>e.leftPx}px;
  top: ${e=>e.topPx}px;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: auto;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
`,js=s.div`
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
`,ks=s(h.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`,Cs=s.h4`
  padding: 15px 15px 5px 15px;
  font-size: 18px;
  color: #5d4037;
  text-align: center;
  margin: 0;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
`,Ss=s.p`
  padding: 5px 15px 15px 15px;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`,zs=s.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`,Ts=s(h.button)`
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
`,Ps=s(h.button)`
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
`,Es=s.div`
  display: flex;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  backdrop-filter: blur(10px);
`,Xi=s(h.button)`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  background: ${e=>e.active?e.tabType==="intro"?"linear-gradient(135deg, #ff6b35, #ffa500)":"linear-gradient(135deg, #87ceeb, #98e4d6)":"transparent"};
  color: ${e=>e.active?e.tabType==="intro"?"white":"#2e8b57":"#8d6e63"};
  font-size: 18px;
  font-weight: 600;
  font-family: 'KaiTi', 'SimKai', serif;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${e=>e.active?e.tabType==="intro"?"0 6px 20px rgba(255, 107, 53, 0.3)":"0 6px 20px rgba(135, 206, 235, 0.3)":"none"};
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
    background: ${e=>e.tabType==="intro"?"linear-gradient(135deg, #ff8a50, #ffb347)":"linear-gradient(135deg, #98d8eb, #a8e6d2)"};
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 10px;
    z-index: -1;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${e=>e.tabType==="intro"?"0 8px 25px rgba(255, 107, 53, 0.4)":"0 8px 25px rgba(135, 206, 235, 0.4)"};
    &::before {
      left: 100%;
    }
    &::after {
      opacity: ${e=>e.active?0:.6};
    }
  }
  &:active {
    transform: translateY(0);
    transition: transform 0.1s ease;
  }
`,Li=s(h.div)`
  width: 100%;
`,$s=s(h.div)`
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
`,Bs=s(h.div)`
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
`,Fs=s.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`,Ms=s.div`
  text-align: center;
  color: #333;
`,Os=s.h3`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #5d4037;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`,Ds=s.p`
  font-size: 18px;
  margin: 0;
  color: #666;
  font-weight: 500;
`,Ni=s(h.button)`
  position: absolute;
  top: 50%;
  ${e=>e.direction==="prev"?"left: -70px;":"right: -70px;"}
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
    ${e=>e.direction==="prev"?"left: 10px;":"right: 10px;"}
    top: auto;
    bottom: 20px;
  }
`,As=s.div`
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
`,Ys=s.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
`,Rs=s.div`
  font-size: 16px;
  font-weight: 700;
  color: #5d4037;
  margin-bottom: 4px;
  text-align: center;
`,Xs=s.div`
  font-size: 14px;
  color: #666;
  text-align: center;
`,Ls={小卖部:{image:"images/webps/直岛/直岛-小卖部.webp",desc:"苍打工的地点"},海狸家:{image:"images/webps/直岛/直岛-海狸家院子.webp",desc:"加藤家的住所"},白羽钓点:{image:"images/webps/直岛/直岛-白羽钓鱼.webp",desc:"白羽钓鱼的地方"},蔷薇庄:{image:"images/webps/直岛/直岛-蔷薇庄.webp",desc:"静久的饭店"},鸣濑神社:{image:"images/webps/直岛/直岛-神社.webp",desc:"白羽家的神社"}},Ns=()=>{const e=U(),[o,t]=g.useState("intro"),[n,r]=g.useState({isOpen:!1,images:[],currentIndex:0,title:""}),[a,l]=g.useState(null),[d,c]=g.useState({isOpen:!1,mapImage:"",title:"",description:"",iconPositions:[]}),[p,x]=g.useState(!0),f=1,v=g.useRef(null),w=g.useRef(null),[C,j]=g.useState(0),[y,k]=g.useState({width:0,height:0,offsetLeft:0,offsetTop:0});g.useEffect(()=>{const S=v.current;if(!S)return;const R=()=>{j(S.getBoundingClientRect().width);const $=w.current;if($){const M=S.getBoundingClientRect(),A=$.getBoundingClientRect();k({width:A.width,height:A.height,offsetLeft:A.left-M.left,offsetTop:A.top-M.top})}};R();const u=new ResizeObserver(()=>R());return u.observe(S),w.current&&u.observe(w.current),()=>u.disconnect()},[]);const E=f*800,b=C>0?C/E:1,B=Math.max(.5,Math.min(b,1.2)),F={小卖部:30,海狸家:30,白羽钓点:30,蔷薇庄:30,鸣濑神社:25},P=[{x:18,y:54,emoji:"🗺️",title:"小卖部",iconType:"emoji",size:F.小卖部},{x:58,y:49,emoji:"🗺️",title:"海狸家",iconType:"emoji",size:F.海狸家},{x:75,y:64,emoji:"🗺️",title:"白羽钓点",iconType:"emoji",size:F.白羽钓点},{x:67,y:88,emoji:"🗺️",title:"蔷薇庄",iconType:"emoji",size:F.蔷薇庄},{x:21,y:32,emoji:"⛩️",title:"鸣濑神社",iconType:"emoji",size:F.鸣濑神社}],m={小卖部:{mapImage:"images/webps/直岛/直岛地图-小卖部-路线版.webp",description:"苍打工的零食店，已歇业。",iconPositions:[{x:20,y:0,icon:"images/webps/直岛/直岛-小卖部.webp",size:200},{x:26,y:70,icon:"images/webps/直岛/直岛-sprb租车店.webp",size:200}]},海狸家:{mapImage:"images/webps/直岛/直岛地图-水塘海狸家-路线版.webp",description:"加藤家的住所，休憩之地。",iconPositions:[{x:11,y:82,icon:"images/webps/直岛/直岛-灵弹.webp",size:200},{x:98,y:3,icon:"images/webps/直岛/直岛-海狸家院子.webp",size:150},{x:94,y:50,icon:"images/webps/直岛/直岛-八幡神社石阶.webp",size:180}]},白羽钓点:{mapImage:"images/webps/直岛/直岛地图-白羽钓点-路线版.webp",description:"白羽钓鱼的地方，海风徐徐。",iconPositions:[{x:5,y:88,icon:"images/webps/直岛/直岛-积浦海岸.webp",size:200},{x:100,y:42,icon:"images/webps/直岛/直岛-白羽钓鱼.webp",size:200},{x:70,y:-1,icon:"images/webps/直岛/直岛-白羽钓点.webp",size:200}]},蔷薇庄:{mapImage:"images/webps/直岛/直岛地图-蔷薇庄-路线版.webp",description:"充满回忆的住宿地，温馨舒适。",iconPositions:[{x:113,y:75,icon:"images/webps/直岛/直岛-蔷薇庄图标.webp",size:50},{x:88,y:71,icon:"images/webps/直岛/直岛-惠美须神社鸟居.webp",size:100},{x:105,y:100,icon:"images/webps/直岛/直岛-海水浴场.webp",size:150},{x:15,y:-5,icon:"images/webps/直岛/直岛-游戏主界面图标.webp",size:300}]},鸣濑神社:{mapImage:"images/webps/直岛/直岛-神社.webp",description:"白羽出嫁的地点。",iconPositions:[]}},z=[{title:"港口",description:"直岛的主要交通枢纽，旅程的起点。",images:[{src:"images/webps/直岛/直岛-港口-无船.webp",label:"白天-无船"},{src:"images/webps/直岛/直岛-港口-无船-黄昏.webp",label:"黄昏-无船"},{src:"images/webps/直岛/直岛-港口-无船-夜晚.webp",label:"夜晚-无船"},{src:"images/webps/直岛/直岛-港口-有船.webp",label:"白天-有船"},{src:"images/webps/直岛/直岛-港口-有船-黄昏.webp",label:"黄昏-有船"},{src:"images/webps/直岛/直岛-港口-有船-夜晚.webp",label:"夜晚-有船"},{src:"images/webps/直岛/直岛-港口-下雨.webp",label:"下雨"}]},{title:"小卖部",description:"苍打工的零食店。",images:[{src:"images/webps/直岛/直岛-小卖部.webp",label:"白天"},{src:"images/webps/直岛/直岛-小卖部-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-小卖部-夜晚.webp",label:"夜晚"}]},{title:"鸣濑神社",description:"白羽出嫁的地点。",images:[{src:"images/webps/直岛/直岛-神社.webp",label:"白天"},{src:"images/webps/直岛/直岛-神社-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-神社-夜晚.webp",label:"夜晚"}]},{title:"灵弹",description:"灵弹~灵弹~。",images:[{src:"images/webps/直岛/直岛-灵弹.webp",label:"白天"},{src:"images/webps/直岛/直岛-灵弹-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-灵弹-夜晚.webp",label:"夜晚"}]},{title:"海狸家门前",description:"加藤家门口。",images:[{src:"images/webps/直岛/直岛-海狸家门前.webp",label:"白天"},{src:"images/webps/直岛/直岛-海狸家门前-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-海狸家门前-夜晚.webp",label:"夜晚"}]},{title:"海狸家院子",description:"加藤家院子。",images:[{src:"images/webps/直岛/直岛-海狸家院子.webp",label:"白天"},{src:"images/webps/直岛/直岛-海狸家院子-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-海狸家院子-夜晚.webp",label:"夜晚"}]},{title:"海狸家客厅",description:"加藤家客厅。",images:[{src:"images/webps/直岛/直岛-海狸家客厅.webp",label:"白天"},{src:"images/webps/直岛/直岛-海狸家客厅-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-海狸家客厅-夜晚.webp",label:"夜晚"}]},{title:"海狸家厨房",description:"加藤家厨房。",images:[{src:"images/webps/直岛/直岛-海狸家厨房.webp",label:"白天"},{src:"images/webps/直岛/直岛-海狸家厨房-中午.webp",label:"中午"},{src:"images/webps/直岛/直岛-海狸家厨房-夜晚.webp",label:"夜晚"}]},{title:"海狸家卧室",description:"加藤家卧室。",images:[{src:"images/webps/直岛/直岛-海狸家卧室-无床.webp",label:"白天-无床"},{src:"images/webps/直岛/直岛-海狸家卧室-无床-黄昏.webp",label:"黄昏-无床"},{src:"images/webps/直岛/直岛-海狸家卧室-无床-开灯-夜晚.webp",label:"夜晚-无床-开灯"},{src:"images/webps/直岛/直岛-海狸家卧室-无床-关灯-夜晚.webp",label:"夜晚-无床-关灯"},{src:"images/webps/直岛/直岛-海狸家卧室-有床.webp",label:"白天-有床"},{src:"images/webps/直岛/直岛-海狸家卧室-有床-黄昏.webp",label:"黄昏-有床"},{src:"images/webps/直岛/直岛-海狸家卧室-有床-开灯-夜晚.webp",label:"夜晚-有床-开灯"},{src:"images/webps/直岛/直岛-海狸家卧室-有床-关灯-夜晚.webp",label:"夜晚-有床-关灯"}]},{title:"食堂",description:"白羽家的食堂。",images:[{src:"images/webps/直岛/直岛-食堂.webp",label:"白天"},{src:"images/webps/直岛/直岛-食堂-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-食堂-夜晚.webp",label:"夜晚"}]},{title:"役场通路",description:"通往鸟白岛役场",images:[{src:"images/webps/直岛/直岛-役场通路.webp",label:"役场通路"}]},{title:"八幡神社石阶",description:"美希穿和服。",images:[{src:"images/webps/直岛/直岛-八幡神社石阶.webp",label:"八幡神社石阶"}]},{title:"积浦海岸",description:"羽未的日出打卡点",images:[{src:"images/webps/直岛/直岛-积浦海岸.webp",label:"积浦海岸"}]},{title:"白羽钓鱼点",description:"白羽钓鱼的地方",images:[{src:"images/webps/直岛/直岛-白羽钓鱼.webp",label:"白天"},{src:"images/webps/直岛/直岛-白羽钓点.webp",label:"白天"},{src:"images/webps/直岛/直岛-白羽钓点-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-白羽钓点-夜晚.webp",label:"夜晚"}]},{title:"惠美须神社鸟居",description:"独特的鸟居景观。",images:[{src:"images/webps/直岛/直岛-惠美须神社鸟居.webp",label:"惠美须神社鸟居"}]},{title:"蔷薇庄",description:"静久加饭的地方。",images:[{src:"images/webps/直岛/直岛-蔷薇庄.webp",label:"蔷薇庄"}]},{title:"海水浴场",description:"良一脱衣服的地方。",images:[{src:"images/webps/直岛/直岛-海水浴场.webp",label:"白天"},{src:"images/webps/直岛/直岛-海水浴场-夜晚.webp",label:"夜晚"},{src:"images/webps/直岛/直岛-海水浴场-黄昏.webp",label:"黄昏"}]},{title:"游戏主界面",description:"全部女主的合照",images:[{src:"images/webps/直岛/直岛-游戏主界面.webp",label:"游戏主界面"}]}],T=(S,R,u)=>{r({isOpen:!0,images:S,currentIndex:R,title:u})},O=()=>{r(S=>W(H({},S),{isOpen:!1}))},N=()=>{r(S=>W(H({},S),{currentIndex:(S.currentIndex-1+S.images.length)%S.images.length}))},_=()=>{r(S=>W(H({},S),{currentIndex:(S.currentIndex+1)%S.images.length}))},Q=(S,R,u,$)=>{c({isOpen:!0,mapImage:R,title:S,description:u,iconPositions:$})},ie=()=>{c(S=>W(H({},S),{isOpen:!1}))},te=()=>{e("/checkin")};return i.jsxs(ps,{children:[i.jsx(us,{children:i.jsxs(h.div,{initial:{opacity:0,y:-30},animate:{opacity:1,y:0},transition:{duration:.8},children:[i.jsxs(xs,{children:[i.jsx(Yi,{children:"🎨"}),"直岛",i.jsx(Yi,{children:"🎨"})]}),i.jsx(gs,{children:"现代艺术的圣地"})]})}),i.jsxs(ms,{children:[i.jsxs(Ri,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.2},children:[i.jsxs(Es,{children:[i.jsx(Xi,{active:o==="intro",tabType:"intro",onClick:()=>t("intro"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🏝️ 岛屿介绍"}),i.jsx(Xi,{active:o==="guide",tabType:"guide",onClick:()=>t("guide"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🗺️ 巡礼说明"})]}),i.jsx(L,{mode:"wait",children:o==="intro"?i.jsx(Li,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:i.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[i.jsx(ae,{children:"直岛是瀬户内海中著名的艺术岛屿，拥有丰富的自然与人文景观，是现代艺术与传统生活完美融合的代表。"}),i.jsx(ae,{children:"岛上巡礼点较为分散，建议租自行车前往。"})]})},"intro"):i.jsx(Li,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:i.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[i.jsx(ae,{children:"直岛的建议巡礼方式为自行车，上岛后可以在Summer Pocket租车店租一辆胡子🐱自行车。"}),i.jsxs(ae,{children:["直岛巡礼主要分为4个区域，点击地图上的🗺️图标可查看详情。",i.jsx("br",{})]}),i.jsxs(ae,{children:["直岛共有15个打卡点，具体如下：",i.jsx("br",{}),i.jsx("div",{style:{textIndent:"2em"},children:"港口往北：苍打工的小卖部 → 鸣濑神社"}),i.jsx("div",{style:{textIndent:"2em"},children:"正东方：小水塘 → 海狸家 → 八幡神社"}),i.jsx("div",{style:{textIndent:"2em"},children:"八幡神社往南：羽未日出点 → 白羽钓鱼点"}),i.jsx("div",{style:{textIndent:"2em"},children:"羽未日出点往南："}),i.jsx("div",{style:{textIndent:"4em"},children:"惠美须神社鸟居 → 往东，蔷薇庄，海水浴场"}),i.jsx("div",{style:{textIndent:"4em"},children:"惠美须神社鸟居 → 往西，游戏主界面拍摄点"})]}),i.jsxs(ae,{children:["其他说明：",i.jsx("br",{}),i.jsx("div",{style:{textIndent:"2em"},children:"1. 小卖部和食堂已停业，只能在门口拍照；"}),i.jsx("div",{style:{textIndent:"2em"},children:"2. 海狸家附近点位较多；"}),i.jsx("div",{style:{textIndent:"2em"},children:"3. 海狸家客厅和卧室需要预定石井商店民宿才可拍照；"}),i.jsx("div",{style:{textIndent:"2em"},children:"4. 白羽钓鱼点涨潮时无法到达；"})]})]})},"guide")})]}),i.jsx(h.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.4},children:i.jsx(hs,{children:i.jsxs(bs,{ref:v,children:[i.jsx(vs,{ref:w,scale:f,src:"images/webps/直岛/直岛地图-路线版.webp",alt:"直岛地图",onLoad:()=>{const S=v.current,R=w.current;if(!S||!R)return;const u=S.getBoundingClientRect(),$=R.getBoundingClientRect();k({width:$.width,height:$.height,offsetLeft:$.left-u.left,offsetTop:$.top-u.top})}}),i.jsx(ws,{children:y.width>0&&P.map((S,R)=>{const u=y.offsetLeft+S.x/100*y.width,$=y.offsetTop+S.y/100*y.height;return i.jsxs(ys,{leftPx:u,topPx:$,iconSize:S.size*B,initial:{scale:0},animate:{scale:1},transition:{delay:1+R*.1,duration:.5},whileHover:{scale:1.2},title:S.title,onClick:()=>{const M=m[S.title];M&&Q(S.title,M.mapImage,M.description,M.iconPositions||[])},onMouseEnter:()=>{const M=Ls[S.title];M&&l({x:S.x,y:S.y,title:S.title,image:M.image,desc:M.desc})},onMouseLeave:()=>l(null),children:[S.iconType==="emoji"?i.jsx("span",{style:{fontSize:`${Math.max(18,S.size*B)}px`},children:S.emoji}):i.jsx("img",{src:S.icon,alt:S.title,style:{width:`${Math.max(18,S.size*B)}px`,height:`${Math.max(18,S.size*B)}px`,objectFit:"contain"}}),a&&a.title===S.title&&i.jsxs(As,{children:[i.jsx(Ys,{src:a.image,alt:a.title}),i.jsx(Rs,{children:a.title}),i.jsx(Xs,{children:a.desc})]})]},S.title)})})]})})}),i.jsxs(Ri,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.6},children:[i.jsx(fs,{children:"打卡地点"}),i.jsx(js,{children:z.map(S=>i.jsxs(ks,{whileHover:{scale:1.02},transition:{duration:.3},initial:{opacity:0,y:30},animate:{opacity:1,y:0},onClick:()=>T(S.images,0,S.title),style:{cursor:"pointer"},children:[i.jsx(Ve,{images:S.images,title:S.title,autoPlay:!0,interval:4e3,isPlaying:p,onImageClick:R=>T(S.images,R,S.title)}),i.jsx(Cs,{children:S.title}),i.jsx(Ss,{children:S.description})]},S.title))})]})]}),i.jsxs(zs,{children:[i.jsx(Ps,{onClick:()=>x(!p),whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.6},children:p?"⏸ 停止轮播":"▶ 开始轮播"}),i.jsx(Ts,{onClick:te,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.8},children:"返回打卡篇"})]}),i.jsx(_s,{isOpen:n.isOpen,onClose:O,images:n.images,currentIndex:n.currentIndex,onPrevious:N,onNext:_,title:n.title}),i.jsx(at,{isOpen:d.isOpen,onClose:ie,mapImage:d.mapImage,title:d.title,description:d.description,iconPositions:d.iconPositions,mode:"full"})]})},_s=({isOpen:e,onClose:o,images:t,currentIndex:n,onPrevious:r,onNext:a,title:l})=>{var d,c,p;return!e||t.length===0?null:i.jsx(L,{children:i.jsx($s,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:o,children:i.jsxs(Bs,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},onClick:x=>x.stopPropagation(),children:[t.length>1&&i.jsxs(i.Fragment,{children:[i.jsx(Ni,{direction:"prev",onClick:r,whileHover:{scale:1.05,background:"rgba(255, 255, 255, 0.2)",borderColor:"rgba(255, 255, 255, 0.5)"},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:25,duration:.15},style:{transformOrigin:"center"},children:"‹"}),i.jsx(Ni,{direction:"next",onClick:a,whileHover:{scale:1.05,background:"rgba(255, 255, 255, 0.2)",borderColor:"rgba(255, 255, 255, 0.5)"},whileTap:{scale:.98},transition:{type:"spring",stiffness:400,damping:25,duration:.15},style:{transformOrigin:"center"},children:"›"})]}),i.jsx(Fs,{src:(d=t[n])==null?void 0:d.src,alt:`${l} - ${(c=t[n])==null?void 0:c.label}`}),i.jsxs(Ms,{children:[i.jsx(Os,{children:l}),i.jsx(Ds,{children:(p=t[n])==null?void 0:p.label})]})]})})})},Hs=s.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'Arial', sans-serif;
  padding: 20px;
`,Ws=s.div`
  text-align: center;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`,Ks=s.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`,Is=s.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #f0f0f0;
  line-height: 1.6;
`,Vs=s.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 3px;
  margin: 20px 0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`,Zs=s.div`
  height: 30px;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  border-radius: 25px;
  width: ${e=>e.progress}%;
  transition: width 1s ease-in-out;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`,Us=s.div`
  font-size: 1.1rem;
  margin-top: 15px;
  color: #ffffff;
  font-weight: bold;
`,Qs=s.p`
  font-size: 1rem;
  margin-top: 20px;
  color: #e0e0e0;
  line-height: 1.5;
`,qs=()=>i.jsx(Hs,{children:i.jsxs(Ws,{children:[i.jsx(Ks,{children:"SPRB 网站开发进度"}),i.jsx(Is,{children:"感谢您的关注！我们正在努力开发SPRB网站，为您提供更好的服务体验。"}),i.jsx(Vs,{children:i.jsx(Zs,{progress:50})}),i.jsxs(Us,{children:[50,"% 完成"]}),i.jsxs(Qs,{children:["目前我们正在开发核心功能模块，包括用户界面优化、后端服务集成等。",i.jsx("br",{}),"预计将在不久的将来完成全部开发工作，敬请期待！"]})]})}),Gs=s.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
`,Js=s(h.button)`
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
`,el=s(h.div)`
  position: absolute;
  bottom: 90px;
  right: 0;
  width: 400px;
  background: #ffffff; /* 纯白背景，移除毛玻璃效果 */
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
`,il=s.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`,tl=s.div`
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
`,nl=s.div`
  flex: 1;
`,ol=s.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,al=s.div`
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,rl=s.button`
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
`,sl=s.div`
  margin-bottom: 20px;
`,ll=s.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
`,dl=s.div`
  width: 100%;
  height: 4px;
  background: #e9e9e9;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
`,cl=s(h.div)`
  height: 100%;
  background: linear-gradient(90deg, #ff4757, #ff6b7a);
  border-radius: 2px;
  width: ${e=>e.progress}%;
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
`,pl=s.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px; /* 增大间距，使播放按钮居中明显 */
  margin-bottom: 20px;
`,Ie=s(h.button)`
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
`,ul=s(Ie)`
  font-size: 24px;
  background: linear-gradient(135deg, #ff4757, #ff6b7a);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #ff6b7a, #ff4757);
    transform: scale(1.05);
  }
`,xl=s.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`,gl=s.div`
  font-size: 16px;
  color: #666;
  min-width: 20px;
`,ml=s.input`
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
`,fl=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`,hl=s.div`
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
`,bl=s(h.div)`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.isActive?"rgba(255, 71, 87, 0.1)":"transparent"};
  
  &:hover {
    background: rgba(255, 71, 87, 0.05);
  }
`,vl=s.div`
  width: 30px;
  font-size: 12px;
  color: ${e=>e.isActive?"#ff4757":"#999"};
  font-weight: ${e=>e.isActive?"600":"400"};
`,wl=s.div`
  flex: 1;
`,yl=s.div`
  font-size: 14px;
  color: ${e=>e.isActive?"#ff4757":"#333"};
  font-weight: ${e=>e.isActive?"600":"400"};
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,jl=s.div`
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,_i=e=>{const o=Math.floor(e/60),t=Math.floor(e%60);return`${o}:${t.toString().padStart(2,"0")}`},kl=()=>{const{isPlaying:e,currentTime:o,duration:t,volume:n,playlist:r,currentTrack:a,currentIndex:l,playMode:d,togglePlay:c,next:p,prev:x,seek:f,setVolume:v,selectTrack:w,setPlayMode:C,isPlayerOpen:j,setPlayerOpen:y}=zt(),k=g.useRef(null),E=m=>{const z=m.currentTarget.getBoundingClientRect(),O=(m.clientX-z.left)/z.width*t;f(O)},b=()=>{switch(d){case"single":return"🔂";case"list":return"🔁";default:return"🔁"}},B=()=>{switch(d){case"single":return"单曲循环";case"list":return"列表循环";default:return"列表循环"}},F=()=>{const m=["list","single"],T=(m.indexOf(d)+1)%m.length;C(m[T])},P=t>0?o/t*100:0;return g.useEffect(()=>{if(k.current&&l>=0){const m=k.current,T=m.children[l];if(T){const O=m.getBoundingClientRect(),N=T.getBoundingClientRect();N.top>=O.top&&N.bottom<=O.bottom||T.scrollIntoView({behavior:"smooth",block:"nearest"})}}},[l]),i.jsxs(Gs,{"data-music-player":"true",children:[i.jsx(Js,{isPlaying:e,onClick:()=>y(!j),whileHover:{scale:1.1},whileTap:{scale:.95},"data-music-player":"true"}),i.jsx(L,{children:j&&i.jsxs(el,{initial:{opacity:0,scale:.8,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.8,y:20},transition:{duration:.3,ease:"easeOut"},children:[i.jsxs(il,{children:[i.jsx(tl,{children:"🎵"}),i.jsxs(nl,{children:[i.jsx(ol,{children:(a==null?void 0:a.name)||"暂无歌曲"}),i.jsx(al,{children:(a==null?void 0:a.artist)||"未知艺术家"})]}),i.jsx(rl,{onClick:()=>y(!1),children:"✕"})]}),a&&i.jsxs(sl,{children:[i.jsxs(ll,{children:[i.jsx("span",{children:_i(o)}),i.jsx("span",{children:_i(t)})]}),i.jsx(dl,{onClick:E,children:i.jsx(cl,{progress:P})})]}),i.jsxs(pl,{children:[i.jsx(Ie,{onClick:x,whileHover:{scale:1.1},whileTap:{scale:.9},children:"⏮️"}),i.jsx(ul,{onClick:c,whileHover:{scale:1.05},whileTap:{scale:.95},"data-music-player":"true",children:e?"⏸️":"▶️"}),i.jsx(Ie,{onClick:p,whileHover:{scale:1.1},whileTap:{scale:.9},children:"⏭️"})]}),i.jsxs(xl,{children:[i.jsx(gl,{children:"🔊"}),i.jsx(ml,{type:"range",min:"0",max:"1",step:"0.01",value:n,onChange:m=>v(parseFloat(m.target.value))})]}),i.jsxs(fl,{children:[i.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:i.jsxs("span",{style:{fontSize:"14px",fontWeight:"600",color:"#333"},children:["播放列表 (",r.length,")"]})}),i.jsxs(h.button,{onClick:F,style:{background:"none",border:"none",cursor:"pointer",fontSize:"12px",color:"#ff4757",display:"flex",alignItems:"center",gap:"4px",padding:"4px 8px",borderRadius:"4px",transition:"all 0.2s"},whileHover:{scale:1.05,backgroundColor:"rgba(255, 71, 87, 0.1)"},whileTap:{scale:.95},children:[b()," ",B()]})]}),i.jsx(hl,{ref:k,children:r.map((m,z)=>i.jsxs(bl,{isActive:z===l,onClick:()=>w(z),whileHover:{x:5},children:[i.jsx(vl,{isActive:z===l,children:z===l&&e?"🎵":m.track_number||z+1}),i.jsxs(wl,{children:[i.jsx(yl,{isActive:z===l,children:m.name}),i.jsx(jl,{children:m.artist})]})]},m.id))})]})})]})},Cl=()=>{const[e,o]=g.useState({x:0,y:0}),[t,n]=g.useState(!1),[r,a]=g.useState(0),l=g.useRef(null),d=g.useRef(),c=g.useRef(0),p=g.useRef(!1),x=["images/webps/七影蝶-3.webp","images/webps/七影蝶-4.webp"],f=g.useCallback(()=>{p.current||(x.forEach(y=>{const k=new Image;k.src=y}),p.current=!0)},[x]),v=g.useCallback((y,k)=>{const E=Date.now();if(E-c.current<100)return;c.current=E;const b=document.elementFromPoint(y,k),B=b&&(b.tagName==="A"||b.tagName==="BUTTON"||b.tagName==="INPUT"||b.tagName==="SELECT"||b.tagName==="TEXTAREA"||b.getAttribute("role")==="button"||b.classList.contains("clickable")||b instanceof HTMLElement&&b.style.cursor==="pointer"||b.closest('a, button, [role="button"], .clickable'));n(!!B)},[]),w=g.useCallback((y,k)=>{d.current&&cancelAnimationFrame(d.current),d.current=requestAnimationFrame(()=>{o({x:y,y:k}),v(y,k)})},[v]),C=g.useCallback(y=>{y.style&&y.style.cursor&&y.style.cursor!=="none"&&(y.dataset.originalCursor||(y.dataset.originalCursor=y.style.cursor),y.style.cursor="none")},[]),j=g.useCallback(()=>{document.querySelectorAll("*").forEach(k=>C(k))},[C]);return g.useEffect(()=>{f();const y=E=>{w(E.clientX,E.clientY)};document.addEventListener("mousemove",y,{passive:!0}),j();const k=new MutationObserver(E=>{E.forEach(b=>{if(b.addedNodes.forEach(B=>{if(B.nodeType===Node.ELEMENT_NODE){const F=B;C(F),F.querySelectorAll("*").forEach(m=>C(m))}}),b.type==="attributes"&&b.attributeName==="style"){const B=b.target;C(B)}})});return k.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["style","class"]}),()=>{document.removeEventListener("mousemove",y),k.disconnect(),d.current&&cancelAnimationFrame(d.current)}},[w,f,j,C]),g.useEffect(()=>{const y=setInterval(()=>{a(k=>(k+1)%x.length)},t?200:300);return()=>clearInterval(y)},[t,x.length]),g.useEffect(()=>{const y=()=>{l.current&&(l.current.style.opacity="0")},k=()=>{l.current&&(l.current.style.opacity="1")};return document.addEventListener("mouseleave",y),document.addEventListener("mouseenter",k),()=>{document.removeEventListener("mouseleave",y),document.removeEventListener("mouseenter",k)}},[]),i.jsx("div",{ref:l,className:`butterfly-cursor ${t?"on-clickable":""}`,style:{transform:`translate3d(${e.x-20}px, ${e.y-20}px, 0)`,willChange:"transform",pointerEvents:"none",border:"none",outline:"none",boxShadow:"none",background:"transparent"},children:i.jsx("img",{src:x[r],alt:"蝴蝶鼠标",className:"butterfly-wing",draggable:!1,style:{userSelect:"none",transform:t?"scale(1.1)":"scale(1)",transition:"transform 0.2s ease-out",willChange:"transform",pointerEvents:"none",border:"none",outline:"none",boxShadow:"none",background:"transparent"}})})};function Sl(){return i.jsx(Pt,{children:i.jsx(ht,{children:i.jsxs("div",{style:{position:"relative",width:"100vw",height:"100vh"},children:[i.jsxs(bt,{children:[i.jsx(V,{path:"/",element:i.jsx(Vt,{})}),i.jsx(V,{path:"/contents",element:i.jsx(cn,{})}),i.jsx(V,{path:"/traffic",element:i.jsx(_n,{})}),i.jsx(V,{path:"/checkin",element:i.jsx(vo,{})}),i.jsx(V,{path:"/divine-realm",element:i.jsx(So,{})}),i.jsx(V,{path:"/other-pilgrimage",element:i.jsx(Do,{})}),i.jsx(V,{path:"/megijima",element:i.jsx(xa,{})}),i.jsx(V,{path:"/ogijima",element:i.jsx(cs,{})}),i.jsx(V,{path:"/naoshima",element:i.jsx(Ns,{})}),i.jsx(V,{path:"/progress",element:i.jsx(qs,{})})]}),i.jsx(kl,{}),i.jsx(Cl,{})]})})})}_e.createRoot(document.getElementById("root")).render(i.jsx(J.StrictMode,{children:i.jsx(Sl,{})}))});export default zl();
