var dt=Object.defineProperty,pt=Object.defineProperties;var xt=Object.getOwnPropertyDescriptors;var ze=Object.getOwnPropertySymbols;var gt=Object.prototype.hasOwnProperty,bt=Object.prototype.propertyIsEnumerable;var Se=(i,n,p)=>n in i?dt(i,n,{enumerable:!0,configurable:!0,writable:!0,value:p}):i[n]=p,D=(i,n)=>{for(var p in n||(n={}))gt.call(n,p)&&Se(i,p,n[p]);if(ze)for(var p of ze(n))bt.call(n,p)&&Se(i,p,n[p]);return i},O=(i,n)=>pt(i,xt(n));var ht=(i,n)=>()=>(n||i((n={exports:{}}).exports,n),n.exports);var G=(i,n,p)=>new Promise((x,d)=>{var o=w=>{try{f(p.next(w))}catch(h){d(h)}},b=w=>{try{f(p.throw(w))}catch(h){d(h)}},f=w=>w.done?x(w.value):Promise.resolve(w.value).then(o,b);f((p=p.apply(i,n)).next())});import{r as l,b as mt,a as ut}from"./vendor-ff82005c.js";import{u as R,B as ft,R as wt,a as L}from"./router-d0aa0b1d.js";import{m as yt,d as t,a as c,A as M}from"./ui-8fbed0d0.js";var ir=ht(ie=>{(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))x(d);new MutationObserver(d=>{for(const o of d)if(o.type==="childList")for(const b of o.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&x(b)}).observe(document,{childList:!0,subtree:!0});function p(d){const o={};return d.integrity&&(o.integrity=d.integrity),d.referrerPolicy&&(o.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?o.credentials="include":d.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function x(d){if(d.ep)return;d.ep=!0;const o=p(d);fetch(d.href,o)}})();var it={exports:{}},ne={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vt=l,jt=Symbol.for("react.element"),kt=Symbol.for("react.fragment"),Ct=Object.prototype.hasOwnProperty,zt=vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,St={key:!0,ref:!0,__self:!0,__source:!0};function nt(i,n,p){var x,d={},o=null,b=null;p!==void 0&&(o=""+p),n.key!==void 0&&(o=""+n.key),n.ref!==void 0&&(b=n.ref);for(x in n)Ct.call(n,x)&&!St.hasOwnProperty(x)&&(d[x]=n[x]);if(i&&i.defaultProps)for(x in n=i.defaultProps,n)d[x]===void 0&&(d[x]=n[x]);return{$$typeof:jt,type:i,key:o,ref:b,props:d,_owner:zt.current}}ne.Fragment=kt;ne.jsx=nt;ne.jsxs=nt;it.exports=ne;var e=it.exports,fe={},Ie=mt;fe.createRoot=Ie.createRoot,fe.hydrateRoot=Ie.hydrateRoot;const ot=l.createContext(void 0),It=()=>{const i=l.useContext(ot);if(i===void 0)throw new Error("useMusic must be used within a MusicProvider");return i},$t=[{id:"summer-pockets",name:"Summer Pockets",artist:"水月陵",src:"/audio/1-水月陵 - Summer Pockets.mp3",album:"Summer Pockets OST",cover:"images/covers/1-summerpockets.webp"},{id:"sea-you-me",name:"Sea, You & Me",artist:"麻枝准",src:"/audio/2-麻枝准 - Sea, You & Me.mp3",album:"Summer Pockets OST",cover:"images/covers/2-sea-you-me.webp"},{id:"alcatale",name:"アルカテイル",artist:"鈴木このみ",src:"/audio/3-鈴木このみ,VISUAL ARTS  Key - アルカテイル.mp3",album:"Summer Pockets OST",cover:"images/covers/3-op.webp"},{id:"yoru-wa-mijikaku",name:"夜は短く、空は遠くて…",artist:"水月陵",src:"/audio/4-水月陵 - 夜は短く、空は遠くて….wav",album:"Summer Pockets OST",cover:"images/covers/4-saikai.webp"},{id:"hiyoku-no-chou",name:"比翼の蝶たち",artist:"高森奈津美",src:"/audio/5-高森奈津美 - 比翼の蝶たち.flac",album:"Summer Pockets OST",cover:"images/covers/5-solagado-ao.webp"},{id:"departure",name:"Departure!",artist:"嶺内ともみ",src:"/audio/6-嶺内ともみ - Departure!.flac",album:"Summer Pockets OST",cover:"images/covers/6-kushima-kamome.webp"},{id:"with",name:"with",artist:"嶺内ともみ",src:"/audio/7-嶺内ともみ - with.flac",album:"Summer Pockets OST",cover:"images/covers/7-with.webp"},{id:"natsu-ni-kimi-wo",name:"夏に君を待ちながら",artist:"小原好美",src:"/audio/8-小原好美 - 夏に君を待ちながら.flac",album:"Summer Pockets OST",cover:"images/covers/8-shiroha.webp"},{id:"tsumugi-no-natsuyasumi",name:"紬の夏休み",artist:"岩井映美里",src:"/audio/9-岩井映美里,VISUAL ARTS  Key - 紬の夏休み.flac",album:"Summer Pockets OST",cover:"images/covers/9-tsumugi-no-natsuyasumi.webp"},{id:"golden-hours",name:"Golden Hours",artist:"岩井映美里",src:"/audio/10-岩井映美里 - Golden Hours.flac",album:"Summer Pockets OST",cover:"images/covers/10-golden-hours.webp"}],Tt=({children:i})=>{const n=l.useRef(null),p=l.useRef("list"),x=l.useRef(!1),d=l.useRef(!1),[o,b]=l.useState(!1),[f,w]=l.useState(!1),[h,C]=l.useState(0),[k,I]=l.useState(0),[T,F]=l.useState(.7),[$,v]=l.useState($t),[a,y]=l.useState(0),[r,z]=l.useState("list"),[P,g]=l.useState(!1),m=$[a]||null,S=l.useCallback(()=>G(ie,null,function*(){try{const u=yield fetch("http://localhost:8000/api/music/playlist");if(u.ok){const B=yield u.json();B.tracks&&B.tracks.length>0&&v(B.tracks)}}catch(u){}}),[]);l.useEffect(()=>{p.current=r},[r]),l.useEffect(()=>{const u=n.current;!u||!m||(!x.current||u.src!==location.origin+m.src)&&(u.src=m.src,u.volume=T,u.load(),x.current=!0)},[m]),l.useEffect(()=>{const u=n.current;u&&(u.volume=T)},[T]);const s=l.useCallback(()=>G(ie,null,function*(){const u=n.current;if(!(!u||!m))try{const B=decodeURI(u.src),Y=location.origin+m.src;B.endsWith(m.src)||(u.src=m.src,u.load(),yield new Promise(W=>{const V=()=>{u.removeEventListener("canplay",V),W(void 0)};u.addEventListener("canplay",V)})),yield u.play(),b(!0),w(!1)}catch(B){B.name==="NotAllowedError"||(b(!1),w(!0))}}),[m]),j=l.useCallback(()=>{const u=n.current;u&&(u.pause(),b(!1),w(!0))},[]),E=l.useCallback(()=>{var B;const u=n.current;u&&(o?j():f&&decodeURI(u.src).endsWith((B=m==null?void 0:m.src)!=null?B:"")?u.play().then(()=>{b(!0),w(!1)}).catch(Y=>{Y.name==="NotAllowedError"||s()}):s())},[o,f,j,s,m]),A=l.useCallback(()=>{let u;r==="single"?u=a:u=(a+1)%$.length,y(u),x.current=!1,d.current=!0},[a,$.length,r]),_=l.useCallback(()=>{let u;r==="single"?u=a:u=a===0?$.length-1:a-1,y(u),x.current=!1,d.current=!0},[a,$.length,r]),je=l.useCallback(u=>{const B=n.current;B&&(B.currentTime=u,C(u))},[]),rt=l.useCallback(u=>{F(u);const B=n.current;B&&(B.volume=u)},[]),st=l.useCallback(u=>{u>=0&&u<$.length&&u!==a&&(y(u),x.current=!1,d.current=!0)},[$.length,a]);l.useEffect(()=>{d.current&&m&&x.current&&(d.current=!1,setTimeout(()=>{s()},100))},[m,s]),l.useEffect(()=>{const u=n.current;if(!u)return;const B=()=>{I(u.duration||0)},Y=()=>{C(u.currentTime||0)},W=()=>{b(!1),w(!1),p.current==="single"?(u.currentTime=0,s()):A()},V=()=>{b(!0),w(!1)},ke=()=>{b(!1),w(!0)},Ce=ct=>{b(!1),w(!0)};return u.addEventListener("loadedmetadata",B),u.addEventListener("timeupdate",Y),u.addEventListener("ended",W),u.addEventListener("play",V),u.addEventListener("pause",ke),u.addEventListener("error",Ce),()=>{u.removeEventListener("loadedmetadata",B),u.removeEventListener("timeupdate",Y),u.removeEventListener("ended",W),u.removeEventListener("play",V),u.removeEventListener("pause",ke),u.removeEventListener("error",Ce)}},[s,A]),l.useEffect(()=>{S()},[S]);const lt={isPlaying:o,isPaused:f,currentTime:h,duration:k,volume:T,playlist:$,currentTrack:m,currentIndex:a,playMode:r,play:s,pause:j,togglePlay:E,next:A,prev:_,seek:je,setVolume:rt,selectTrack:st,setPlayMode:z,audioRef:n,isPlayerOpen:P,setPlayerOpen:g};return e.jsxs(ot.Provider,{value:lt,children:[i,e.jsx("audio",{ref:n,style:{display:"none"},preload:"metadata"})]})},Et=yt`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`,Ft=t.div`
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
`,Bt=t.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`,Pt=t.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: ${Et} ${i=>i.duration}s infinite;
  
  &:nth-child(odd) {
    animation-delay: ${i=>i.delay}s;
  }
`,Mt=t.div`
  position: relative;
  width: 600px;
  height: 800px;
  perspective: 1000px;
`,Dt=t(c.div)`
  width: 600px;
  height: 800px;
  position: relative;
  cursor: pointer;
`,Ot=t.div`
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
`,At=t(c.div)`
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
`,Lt=t.div`
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
`,Rt=t.h1`
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
`,Ht=t.div`
  position: relative;
  margin-bottom: 30px;
`,Kt=t.img`
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
`,Nt=t(c.div)`
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
`,Yt=t.img`
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 18px;
  box-shadow: 0 0 40px rgba(0,0,0,0.7);
  border: 3px solid #FFD700;
  background: #fff;
`,Vt=t.button`
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
`,Xt=t(c.div)`
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
`,Ut=t.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* 🔧 保持图片完整性，不裁剪 */
  object-position: center center; /* 🔧 图片居中对齐 */
  transition: none; /* 🔧 移除过渡效果，图片直接切换 */
  display: block;
`,_t=t(c.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  z-index: 100;
  pointer-events: none;
`,Wt=()=>{const i=R(),[n,p]=l.useState(!1),[x,d]=l.useState(!1),[o,b]=l.useState([]),[f,w]=l.useState(!1);l.useEffect(()=>{(()=>{const I=[];for(let T=0;T<100;T++)I.push({id:T,left:Math.random()*100,top:Math.random()*100,size:Math.random()*3+1,duration:Math.random()*3+2,delay:Math.random()*2});b(I)})()},[]);const h=()=>{p(!0)},C=()=>{n&&i("/contents")};return e.jsxs(Ft,{children:[e.jsx(Bt,{children:o.map(k=>e.jsx(Pt,{style:{left:`${k.left}%`,top:`${k.top}%`,width:`${k.size}px`,height:`${k.size}px`},duration:k.duration,delay:k.delay},k.id))}),e.jsx(Mt,{children:e.jsxs(Dt,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:1,ease:"easeOut"},children:[e.jsx(Ot,{}),e.jsx(At,{animate:n?{rotateY:-180}:{rotateY:0},transition:{duration:2,ease:"easeInOut"},style:{transformStyle:"preserve-3d"},onAnimationComplete:C,children:e.jsxs(Lt,{children:[e.jsx(Rt,{children:"Summer Pockets巡礼日记"}),e.jsx(Ht,{children:e.jsx(Kt,{src:"images/webps/sprb封面图.webp",alt:"Summer Pockets 封面",onClick:()=>w(!0)})})]})}),e.jsx(Xt,{onClick:h,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),initial:{y:"-50%"},whileHover:{scale:1.1,y:"-50%",filter:"brightness(1.1) drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))"},whileTap:{scale:.95,y:"-50%"},animate:n?{opacity:0,y:"-50%"}:{opacity:1,y:"-50%"},transition:{duration:.2},children:e.jsx(Ut,{src:x?"/images/webps/七影蝶-3.webp":"/images/webps/七影蝶-4.webp",alt:"蝴蝶锁图标"})})]})}),e.jsx(M,{children:f&&e.jsxs(Nt,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>w(!1),children:[e.jsx(Vt,{onClick:k=>{k.stopPropagation(),w(!1)},title:"关闭",children:"×"}),e.jsx(Yt,{src:"images/webps/sprb封面图.webp",alt:"Summer Pockets 封面大图",onClick:k=>k.stopPropagation()})]})}),e.jsx(M,{children:n&&e.jsx(_t,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.8,delay:1.2}})})]})},Gt=t(c.div)`
  position: absolute;
  /* 🦋 蝴蝶图片尺寸设置：容器宽高由size参数控制 */
  width: ${i=>i.size}px;
  height: ${i=>i.size}px;
  right: -${i=>i.size/2}px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  pointer-events: none;
`,Qt=t(c.img)`
  /* 🦋 蝴蝶图片尺寸设置：图片实际显示尺寸由size参数控制 */
  width: ${i=>i.size}px;
  height: ${i=>i.size}px;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
`,oe=({isHovered:i,size:n=150})=>{const[p,x]=l.useState(1),d=l.useRef(null),o=["images/webps/七影蝶-3.webp","images/webps/七影蝶-4.webp"];return l.useEffect(()=>(i?d.current=setInterval(()=>{x(b=>(b+1)%o.length)},400):(d.current&&(clearInterval(d.current),d.current=null),x(1)),()=>{d.current&&clearInterval(d.current)}),[i]),e.jsx(Gt,{size:n,initial:{opacity:0,scale:.5,x:-20},animate:{opacity:1,scale:1,x:0},exit:{opacity:0,scale:.5,x:-20},transition:{duration:.3,ease:"easeOut"},children:e.jsx(Qt,{src:o[p],alt:"蝴蝶动画",size:n})})},qt=c(t.div`
  position: absolute;
  left: ${i=>i.x}vw;
  top: ${i=>i.y}vh;
  width: ${i=>i.size}px;
  height: ${i=>i.size}px;
  background: rgba(255,255,255,${i=>i.opacity});
  border-radius: 50%;
  pointer-events: none;
  filter: blur(0.5px);
`),ae=({isVisible:i=!0})=>{const[n]=l.useState(()=>{const p=[];for(let x=0;x<80;x++)p.push({x:Math.random()*100,y:Math.random()*100,size:Math.random()*1.8+.7,opacity:Math.random()*.5+.5,float:Math.random()*6+2,duration:Math.random()*3+2});return p});return i?e.jsx(e.Fragment,{children:n.map((p,x)=>e.jsx(qt,{x:p.x,y:p.y,size:p.size,opacity:p.opacity,animate:{y:[0,-p.float,0,p.float,0]},transition:{duration:p.duration,repeat:1/0,repeatType:"loop",ease:"easeInOut",delay:Math.random()*3}},x))}):null},Jt=t.div`
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
`,Zt=t(c.div)`
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
`,ei=t.div`
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
`,ti=t.div`
  width: 50%;
  padding: 60px 40px;
  background: #FFFEF7;
  border-radius: 0 20px 20px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,ii=t.h1`
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
`,ni=t.p`
  color: #FF8C00;
  font-size: 18px;
  text-align: center;
  margin-bottom: 50px;
  font-style: italic;
  font-family: 'KaiTi', 'SimKai', serif;
`,oi=t.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 20px;
`,re=t(c.div)`
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
`,$e=t(c.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`,ai=t(c.div)`
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
`,ri=t.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
  border: 3px solid #FFB6C1;
`,si=t.p`
  font-size: 20px;
  color: #FF6B35;
  font-weight: 600;
  line-height: 1.6;
  font-family: 'KaiTi', 'SimKai', serif;
  text-shadow: 1px 1px 2px rgba(255, 107, 53, 0.2);
`,li=t(c.div)`
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
`,ci=t(c.button)`
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
`,Te={traffic:{image:"/images/webps/交通篇摘要图.webp",text:"🚌 国内各地到高松的完整交通攻略"},checkin:{image:"/images/webps/打卡篇摘要图.webp",text:"📍 女木岛、男木岛、直岛圣地巡礼"},other:{image:"/images/webps/神域摘要图.webp",text:"记得来神域寄存和领取自己的七影碟哦！🦋"}},di=()=>{const i=R(),[n,p]=l.useState(null),[x,d]=l.useState(null),o=f=>{f==="traffic"?i("/traffic"):f==="checkin"?i("/checkin"):f==="other"&&i("/divine-realm")},b=()=>{i("/")};return e.jsx(Jt,{children:e.jsxs(Zt,{initial:{scale:.7,opacity:0,rotateY:-15},animate:{scale:1,opacity:1,rotateY:0},transition:{duration:1,ease:"easeOut"},children:[e.jsxs(ei,{children:[e.jsx(ii,{children:"目录"}),e.jsx(ni,{children:"Summer Pockets 圣地巡礼日记"}),e.jsxs(oi,{children:[e.jsxs(re,{isActive:n==="traffic",onMouseEnter:()=>{p("traffic"),d("traffic")},onMouseLeave:()=>{p(null),d(null)},onClick:()=>o("traffic"),whileHover:{scale:1.02},whileTap:{scale:.98},children:[e.jsx(ae,{isVisible:n==="traffic"}),e.jsx(se,{children:"🚌"}),e.jsxs(le,{isActive:n==="traffic",children:["交通篇",e.jsx(oe,{isHovered:x==="traffic",size:40})]})]}),e.jsxs(re,{isActive:n==="checkin",onMouseEnter:()=>{p("checkin"),d("checkin")},onMouseLeave:()=>{p(null),d(null)},onClick:()=>o("checkin"),whileHover:{scale:1.02},whileTap:{scale:.98},children:[e.jsx(ae,{isVisible:n==="checkin"}),e.jsx(se,{children:"📍"}),e.jsxs(le,{isActive:n==="checkin",children:["打卡篇",e.jsx(oe,{isHovered:x==="checkin",size:40})]})]}),e.jsxs(re,{isActive:n==="other",onMouseEnter:()=>{p("other"),d("other")},onMouseLeave:()=>{p(null),d(null)},onClick:()=>o("other"),whileHover:{scale:1.02},whileTap:{scale:.98},children:[e.jsx(ae,{isVisible:n==="other"}),e.jsx(se,{children:"🦋"}),e.jsxs(le,{isActive:n==="other",children:["神域",e.jsx(oe,{isHovered:x==="other",size:40})]})]})]}),e.jsx(ci,{onClick:b,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.5,delay:.8},children:"🏠 返回首页"})]}),e.jsx(ti,{children:e.jsx(M,{mode:"wait",children:n&&n!==null?e.jsx($e,{initial:{opacity:0,y:30,scale:.9},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:-30,scale:.9},transition:{duration:.4,ease:"easeOut"},children:e.jsxs(ai,{initial:{opacity:0,rotateX:-20},animate:{opacity:1,rotateX:0},transition:{duration:.5,delay:.1},children:[e.jsx(ri,{src:Te[n].image,alt:`${n} 摘要图`,onError:f=>{f.target.style.display="none"}}),e.jsx(si,{children:Te[n].text})]})},n):e.jsx($e,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:e.jsxs(li,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:["悬停章节标题查看摘要信息",e.jsx("br",{}),e.jsx("span",{style:{color:"#FF6B35",fontWeight:"bold"},children:"让我们一起重回那个夏天吧！"})]})},"placeholder")})})]})})},pi=t.div`
  background: #ffffff;
  padding: 40px 20px;
  border-radius: 20px;
  margin: 20px 0;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  border: 1px solid #e0e0e0;
`,xi=t.h2`
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
  font-weight: 700;
  position: relative;
  z-index: 1;
`,gi=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`,bi=t(c.div)`
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
`,hi=t.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 12px;
`,mi=t.div`
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
`,ui=t.h3`
  font-size: 20px;
  color: #333;
  margin: 0;
  font-weight: 600;
  flex: 1;
`,fi=t.div`
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
`,wi=({cards:i,title:n="交通攻略指南"})=>{const p=d=>{const o=d.split(`
`);let b="",f=!1;for(const w of o)w.trim().startsWith("•")?(f||(b+=`
`,f=!0),b+=w+`
`):(f&&(b+=`
`,f=!1),b+=w+`
`);return b.trim()},x={hidden:{opacity:0,y:50},visible:d=>({opacity:1,y:0,transition:{delay:d*.1,duration:.5,ease:"easeOut"}})};return e.jsxs(pi,{children:[e.jsx(xi,{children:n}),e.jsx(gi,{children:i.map((d,o)=>e.jsxs(bi,{custom:o,initial:"hidden",animate:"visible",variants:x,whileHover:{scale:1.02},transition:{type:"spring",stiffness:300,damping:20},children:[e.jsxs(hi,{children:[e.jsx(mi,{children:d.icon}),e.jsx(ui,{children:d.title})]}),e.jsx(fi,{children:p(d.content)})]},d.id))})]})},yi=t.div`
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
`,vi=t.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`,ji=t(c.button)`
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
`,ki=t.h1`
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
`,Ci=t.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  border-bottom: 2px solid #e0e0e0;
`,ce=t(c.button)`
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
`,Ee=t.div`
  display: flex;
  justify-content: center;
  background: #f8f9fa;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`,Q=t(c.button)`
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
`,pe=t(c.div)`
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
`,zi=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
`,Si=t(c.div)`
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
`,$i=t.div`
  color: #666;
  line-height: 1.6;
  font-size: 16px;
`,Ti=t(c.button)`
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
`,Fe=t.div`
  background: #FFB347;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  margin-left: 10px;
`,Ei=t.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 30px;
`,Fi=t(c.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(255, 165, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 165, 0, 0.1);
`,Bi=t.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #FFB347;
`,Pi=t.div`
  font-size: 24px;
`,Mi=t.h2`
  font-size: 22px;
  color: #FF6B35;
  margin: 0;
  font-weight: 700;
`,Di=t.div`
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
`,Oi=t.div`
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
`,Ai=t.div`
  font-size: 16px;
  color: ${i=>i.checked?"#999":"#555"};
  text-decoration: ${i=>i.checked?"line-through":"none"};
  line-height: 1.5;
  transition: all 0.3s ease;
`,Li=t.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(255, 165, 0, 0.2);
`,Ri=t.div`
  font-size: 18px;
  color: #FF6B35;
  font-weight: 600;
  margin-bottom: 10px;
`,Hi=t.div`
  background: #e0e0e0;
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
  position: relative;
`,Ki=t.div`
  background: linear-gradient(45deg, #FF6B35, #FFB347);
  height: 100%;
  width: ${i=>i.percentage}%;
  transition: width 0.5s ease;
  border-radius: 10px;
`,Be=[{id:"pre-departure",title:"出行前准备",icon:"✈️",items:["护照/签证办理","机票预订","住宿预订","旅行保险购买","日元兑换/银行卡准备","手机卡/随身WiFi准备","行李打包（衣物、药品、充电器等）","重要文件复印/电子备份"]},{id:"flight-transport",title:"机票与交通",icon:"🚌",items:["选择出发城市及航班","机票购买平台比价","了解行李托运规定","熟悉值机与登机流程","了解日本入境流程","准备交通卡购买","查询机场换乘信息"]},{id:"japan-itinerary",title:"日本国内行程",icon:"🎌",items:["确定机场到高松的交通方式","查询详细换乘流程","学习购票机使用方法","规划景点交通路线","准备各种路线方案","下载相关交通APP","收藏实用网站链接"]},{id:"schedule-budget",title:"行程安排与预算",icon:"📅",items:["制定每日行程计划","预算分配（交通、住宿、餐饮等）","预订热门景点门票","安排购物时间和地点","制定应急预案","准备离境相关安排"]},{id:"useful-tools",title:"实用工具推荐",icon:"🛠️",items:["Google Maps （路线规划）","Yahoo!乘换案内 （换乘查询）","Google Translate （语言翻译）","日本旅游APP下载","天气预报查询","汇率查询工具","紧急联系方式记录"]},{id:"pilgrimage-specific",title:"圣地巡礼专项",icon:"🌟",items:["女木岛交通及景点信息","男木岛交通及景点信息","直岛交通及景点信息","拍照地点标记","开放时间确认","门票或预约信息","特殊交通工具安排"]}],Ni=()=>{const i=R(),[n,p]=l.useState("international"),[x,d]=l.useState("guangzhou"),[o,b]=l.useState("kansai-takamatsu"),[f,w]=l.useState(new Set),[h,C]=l.useState(!1),[k,I]=l.useState([]);l.useEffect(()=>{fetch("/trafficdata/InDeparture/traffic_cards.json").then(g=>g.json()).then(g=>I(g)).catch(()=>I([]))},[]);const T=()=>{i("/contents")},F=(g,m)=>{const S=`${g}-${m}`;w(s=>{const j=new Set(s);return j.has(S)?j.delete(S):j.add(S),j})},$=()=>G(ie,null,function*(){C(!0);try{const g=yield fetch("/files/鸟白岛巡礼list.pdf");if(!g.ok)throw new Error("下载失败");const m=yield g.blob(),S=window.URL.createObjectURL(m),s=document.createElement("a");s.style.display="none",s.href=S,s.download="鸟白岛巡礼list.pdf",document.body.appendChild(s),s.click(),window.URL.revokeObjectURL(S),document.body.removeChild(s)}catch(g){alert("下载失败，请稍后再试")}finally{C(!1)}}),v=()=>Be.reduce((g,m)=>g+m.items.length,0),a=()=>f.size,y=()=>{const g=v(),m=a();return g>0?m/g*100:0},r=()=>{const g=x==="guangzhou"?k.filter(m=>m.category==="international"&&m.subcategory==="guangzhou"):[];return e.jsx(M,{mode:"wait",children:e.jsxs(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:[e.jsxs(Ee,{children:[e.jsx(Q,{active:x==="guangzhou",onClick:()=>d("guangzhou"),children:"广州-春秋航空"}),e.jsxs(Q,{active:x==="other",onClick:()=>d("other"),children:["其他城市",e.jsx(Fe,{children:"即将开放"})]})]}),e.jsxs(de,{children:[x==="guangzhou"&&g.length>0?e.jsx(wi,{cards:g,title:"国际出行攻略 - 广州春秋航空"}):x==="guangzhou"&&e.jsx("div",{style:{textAlign:"center",padding:"40px",color:"#666"},children:"暂无攻略数据"}),x==="other"&&e.jsxs(pe,{children:[e.jsx(xe,{children:"其他城市攻略"}),e.jsxs("div",{style:{textAlign:"center",padding:"60px 0"},children:[e.jsx("div",{style:{fontSize:"48px",marginBottom:"20px"},children:"🚧"}),e.jsx("h3",{style:{color:"#FF6B35",marginBottom:"15px"},children:"内容准备中"}),e.jsxs("p",{style:{color:"#666",fontSize:"18px"},children:["我们正在整理更多城市的交通攻略，包括：",e.jsx("br",{}),"北京、上海、深圳、成都、杭州等主要城市"]})]})]})]})]},"international")})},z=()=>{const g=k.filter(m=>m.category==="domestic"&&m.subcategory==="kansai-takamatsu");return e.jsx(M,{mode:"wait",children:e.jsxs(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:[e.jsxs(Ee,{children:[e.jsx(Q,{active:o==="kansai-takamatsu",onClick:()=>b("kansai-takamatsu"),children:"关西机场→高松（电车）"}),e.jsxs(Q,{active:o==="other",onClick:()=>b("other"),children:["其他路线",e.jsx(Fe,{children:"即将开放"})]})]}),e.jsxs(de,{children:[o==="kansai-takamatsu"&&e.jsx(zi,{children:g.sort((m,S)=>m.order_index-S.order_index).map(m=>e.jsxs(Si,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.1*m.order_index},children:[e.jsxs(Ii,{children:[e.jsx("span",{children:m.icon}),m.title]}),e.jsx($i,{children:m.content.split(`
`).map((S,s)=>e.jsx("div",{children:S},s))})]},m.id))}),o==="other"&&e.jsxs(pe,{children:[e.jsx(xe,{children:"其他路线攻略"}),e.jsxs("div",{style:{textAlign:"center",padding:"60px 0"},children:[e.jsx("div",{style:{fontSize:"48px",marginBottom:"20px"},children:"🚧"}),e.jsx("h3",{style:{color:"#FF6B35",marginBottom:"15px"},children:"内容准备中"}),e.jsxs("p",{style:{color:"#666",fontSize:"18px"},children:["我们正在整理更多交通方式，包括：",e.jsx("br",{}),"大巴路线、轮船路线、租车自驾等"]})]})]})]})]},"domestic")})},P=()=>e.jsx(M,{mode:"wait",children:e.jsx(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:e.jsx(de,{children:e.jsxs(pe,{children:[e.jsx(xe,{children:"巡礼任务清单"}),e.jsxs("div",{style:{textAlign:"center",marginBottom:"40px"},children:[e.jsxs("p",{style:{fontSize:"18px",color:"#666",marginBottom:"30px"},children:["为帮助零经验网友顺利完成圣地巡礼计划，我们特别制作了详细的任务清单。",e.jsx("br",{}),"建议下载PDF版本并打印，逐项打勾确保每一步都不遗漏。"]}),e.jsx(Ti,{onClick:$,disabled:h,whileHover:{scale:1.05},whileTap:{scale:.95},children:h?"📄 下载中...":"📄 下载巡礼清单"})]}),e.jsxs(Li,{children:[e.jsxs(Ri,{children:["完成进度：",a()," / ",v()," 项 (",Math.round(y()),"%)"]}),e.jsx(Hi,{children:e.jsx(Ki,{percentage:y()})})]}),e.jsx(Ei,{children:Be.map(g=>e.jsxs(Fi,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.6},children:[e.jsxs(Bi,{children:[e.jsx(Pi,{children:g.icon}),e.jsx(Mi,{children:g.title})]}),g.items.map((m,S)=>{const s=`${g.id}-${S}`,j=f.has(s);return e.jsxs(Di,{checked:j,children:[e.jsx(Oi,{checked:j,onClick:()=>F(g.id,S),children:j&&"✓"}),e.jsx(Ai,{checked:j,children:m})]},S)})]},g.id))})]})})},"checklist")});return e.jsxs(yi,{children:[e.jsxs(vi,{children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx(ji,{onClick:T,whileHover:{scale:1.05},whileTap:{scale:.95},children:"🏠 返回目录"}),e.jsx(ki,{children:"Summer Pockets 交通攻略"})]}),e.jsxs(Ci,{children:[e.jsx(ce,{active:n==="international",onClick:()=>p("international"),children:"国际出发"}),e.jsx(ce,{active:n==="domestic",onClick:()=>p("domestic"),children:"日本国内出发"}),e.jsx(ce,{active:n==="checklist",onClick:()=>p("checklist"),children:"巡礼任务清单"})]})]}),n==="international"&&r(),n==="domestic"&&z(),n==="checklist"&&P()]})},Yi=t.div`
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
`,Vi=t.div`
  text-align: center;
  margin-bottom: 30px;
`,Xi=t.h1`
  font-size: 48px;
  color: #5d4037;
  margin-bottom: 10px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
`,Ui=t.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`,_i=t(c.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px 30px;
  margin: 20px auto 30px auto;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`,Wi=t.p`
  font-size: 16px;
  color: #5d4037;
  line-height: 1.6;
  margin: 0;
  text-align: center;
  font-weight: 500;
`,Gi=t(c.div)`
  text-align: center;
  margin: 20px auto;
  max-width: 800px;
  width: 90%;
`,Qi=t(c.button)`
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
`,qi=t(c.div)`
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
`,Ji=t(c.div)`
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
`,Zi=t.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`,en=t.h3`
  font-size: 20px;
  color: #5d4037;
  margin-bottom: 10px;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`,tn=t.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
`,nn=t.a`
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
`,on=t.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 95%;
  margin: 0 auto 30px auto;
`,an=t(c.div)`
  background: rgba(255, 255, 255, ${i=>i.selected?"1":"0.95"});
  border-radius: 20px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: ${i=>i.selected?"0 10px 30px rgba(255, 165, 0, 0.4)":"0 8px 25px rgba(0, 0, 0, 0.15)"};
  backdrop-filter: blur(20px);
  width: 250px;
  cursor: pointer;
  border: ${i=>i.selected?"3px solid #FFA500":"none"};
`,rn=t.div`
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
`,sn=t.h3`
  font-size: 24px;
  color: #5d4037;
  margin-bottom: 10px;
  font-weight: 700;
`,ln=t.p`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 15px;
`,cn=t.div`
  background: linear-gradient(45deg, #87ceeb, #add8e6);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
`,dn=t.div`
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
`,pn=t.div`
  width: 100%;
  height: 900px;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`,xn=t.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`,gn=t.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`,ge=t(c.div)`
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
`,Pe=t.div`
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
`,bn=t.div`
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
`,Me=t.div`
  font-size: 14px;
  color: #666;
  text-align: center;
`,hn=t.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`,mn=t(c.button)`
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
`,un=t(c.button)`
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
`,De=t(c.div)`
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
`,Oe=t(c.div)`
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
`,fn=t.button`
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
`,Ae=t.img`
  width: 100%;
  height: auto;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`,Le=t.p`
  font-size: 16px;
  color: #5d4037;
  text-align: center;
  margin: 0;
  font-weight: 500;
  line-height: 1.6;
`,Re=[{id:"megijima",name:"女木岛",icon:"👹",description:"以鬼岛传说而闻名的小岛，欧线的重要巡礼点",position:{x:76,y:70}},{id:"ogijima",name:"男木岛",icon:"images/webps/男木岛/男木岛-灯塔图标.webp",iconType:"image",iconSize:80,description:"宁静的渔村小岛，与主角团相遇的主要地点。",position:{x:75,y:45}},{id:"naoshima",name:"直岛",icon:"🎨",description:"现代艺术的圣地，汇集了众多知名艺术家的作品和美术馆。",position:{x:12,y:20}}],wn=()=>{const i=R(),[n,p]=l.useState(null),[x,d]=l.useState(!1),[o,b]=l.useState(!1),[f,w]=l.useState(!1),[h,C]=l.useState(null),k=r=>{p(r.id),i(`/${r.id}`)},I=()=>{d(!0)},T=()=>{d(!1)},F=()=>{w(!1)},$=()=>{i("/contents")},v=()=>{i("/other-pilgrimage")},a=()=>{b(!0)},y=()=>{b(!1)};return e.jsxs(Yi,{children:[e.jsx(Vi,{children:e.jsxs(c.div,{initial:{opacity:0,y:-30},animate:{opacity:1,y:0},transition:{duration:.8},children:[e.jsx(Xi,{children:"打卡篇"}),e.jsx(Ui,{children:"唯有那片炫目，始终无法忘却"})]})}),e.jsx(_i,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.3},children:e.jsxs(Wi,{children:[e.jsx("strong",{style:{fontSize:"18px",color:"#ff6b35",display:"block",marginBottom:"8px"},children:"小建议"}),"正式打卡前，建议先把打卡点的游戏CG照片洗出来，到地点后一一比对拍照即可。",e.jsx("span",{style:{display:"block",marginTop:"8px"},children:"避免手机频繁切换页面影响体验，让手机专注于拍照。"}),e.jsx("span",{style:{display:"block",marginTop:"8px"},children:"各岛屿页面可右键下载需要的游戏CG。"})]})}),e.jsx(on,{children:Re.map((r,z)=>e.jsxs(an,{selected:n===r.id,initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.6,delay:z*.15},whileHover:{scale:1.05,y:-5},whileTap:{scale:.95},onClick:()=>k(r),children:[e.jsx(rn,{iconSize:r.iconSize,children:r.iconType==="image"?e.jsx("img",{src:r.icon,alt:r.name}):r.icon}),e.jsx(sn,{children:r.name}),e.jsx(ln,{children:r.description}),e.jsx(cn,{children:"点击前往"})]},r.name))}),e.jsx(Gi,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.4},children:e.jsx(Qi,{onClick:a,whileHover:{scale:1.05},whileTap:{scale:.95},children:"📱 打卡地点合集"})}),e.jsx(c.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.5},children:e.jsx(dn,{children:e.jsxs(pn,{children:[e.jsx(xn,{src:"images/webps/打卡篇地图-航线版.webp",alt:"瀬戸内海地图"}),e.jsxs(gn,{children:[e.jsxs(ge,{x:76,y:90,initial:{scale:0},animate:{scale:1},transition:{delay:1,duration:.5},whileHover:{scale:1.2},onClick:()=>w(!0),onMouseEnter:()=>{C({x:76,y:90,title:"高松港",desc:"前往各岛屿的起点港口，点击查看时刻表"})},onMouseLeave:()=>C(null),children:["🚢",h&&h.title==="高松港"&&e.jsxs(Pe,{children:[e.jsx(be,{children:h.title}),e.jsx(Me,{children:h.desc})]})]}),e.jsxs(ge,{x:91,y:60,initial:{scale:0},animate:{scale:1},transition:{delay:1.5,duration:.5},whileHover:{scale:1.2},onClick:I,title:"鸟白岛",onMouseEnter:()=>{C({x:91,y:60,title:"鸟白岛",desc:"只能在航行过程中拍摄的神秘岛屿"})},onMouseLeave:()=>C(null),children:["❗❗❗",h&&h.title==="鸟白岛"&&e.jsx(bn,{children:e.jsx(be,{children:h.title})})]}),Re.map((r,z)=>e.jsxs(ge,{x:r.position.x,y:r.position.y,initial:{scale:0},animate:{scale:1},transition:{delay:1.2+z*.2,duration:.5},whileHover:{scale:1.2},onClick:()=>k(r),onMouseEnter:()=>{C({x:r.position.x,y:r.position.y,title:r.name,desc:r.description})},onMouseLeave:()=>C(null),children:[r.iconType==="image"?e.jsx("img",{src:r.icon,alt:r.name}):r.icon,h&&h.title===r.name&&e.jsxs(Pe,{children:[e.jsx(be,{children:h.title}),e.jsx(Me,{children:h.desc})]})]},r.id))]})]})})}),e.jsxs(hn,{children:[e.jsx(mn,{onClick:$,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,x:-30},animate:{opacity:1,x:0},transition:{delay:1},children:"返回目录"}),e.jsx(un,{onClick:v,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,x:30},animate:{opacity:1,x:0},transition:{delay:1.2},children:"其他巡礼"})]}),e.jsx(M,{children:x&&e.jsx(De,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:T,children:e.jsxs(Oe,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{duration:.3},onClick:r=>r.stopPropagation(),children:[e.jsx(Ae,{src:"images/webps/鸟白岛总览.webp",alt:"鸟白岛总览",onError:r=>{}}),e.jsx(Le,{children:"只能在航行过程中拍摄"})]})})}),e.jsx(M,{children:o&&e.jsx(qi,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:y,children:e.jsxs(Ji,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{duration:.3},onClick:r=>r.stopPropagation(),children:[e.jsx(Zi,{src:"images/webps/打卡地点合集.webp",alt:"打卡地点合集二维码",onError:r=>{}}),e.jsx(en,{children:"打卡地点合集"}),e.jsx(tn,{children:"扫描二维码获取完整的打卡地点图片合集"}),e.jsx(nn,{href:"https://pan.baidu.com/s/1BdmKigMJMb4y1q6RNLO2oA?pwd=sprb",target:"_blank",rel:"noopener noreferrer",children:"📥 直接下载打卡地点合集"})]})})}),e.jsx(M,{children:f&&e.jsx(De,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:F,children:e.jsxs(Oe,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.8,opacity:0},transition:{duration:.3},onClick:r=>r.stopPropagation(),children:[e.jsx(fn,{onClick:F,children:"×"}),e.jsx(Ae,{src:"images/webps/高松发船时刻表.webp",alt:"高松发船时刻表",onError:r=>{}}),e.jsx(Le,{children:"高松港发船时刻表"})]})})})]})},yn=t.div`
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
`,vn=t(c.button)`
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
`,jn=t.h1`
  font-size: 48px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: 700;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 3px 3px 12px rgba(0,0,0,0.45);
  text-align: center;
`,kn=t.div`
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
`,Cn=t.div`
  background: linear-gradient(45deg, #533483, #7209b7);
  color: #fff;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  display: inline-block;
  box-shadow: 0 4px 16px rgba(123, 9, 183, 0.3);
  margin-top: 20px;
`,zn=()=>{const i=R(),n=()=>{i("/contents")};return e.jsxs(yn,{children:[e.jsx(jn,{children:"神域"}),e.jsxs(kn,{children:[e.jsx(he,{children:"🌙 神域功能正在开发中..."}),e.jsx(he,{children:"这里将是一个神秘的夜晚世界，充满了七影蝶的魔法与奇迹。"}),e.jsx(he,{children:"敬请期待即将到来的神域体验！"}),e.jsx(Cn,{children:"✨ Coming Soon ✨"})]}),e.jsx(vn,{onClick:n,whileHover:{scale:1.05},whileTap:{scale:.95},children:"🏠 返回目录"})]})},Sn=t.div`
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
`,$n=t(c.button)`
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
`,Tn=t.h1`
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
`,En=t(c.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 15px 40px rgba(255, 165, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 165, 0, 0.2);
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`,Fn=t.div`
  font-size: 120px;
  margin-bottom: 30px;
  opacity: 0.8;
`,Bn=t.h2`
  font-size: 32px;
  color: #FF6B35;
  margin-bottom: 20px;
  font-weight: 600;
  font-family: 'KaiTi', 'SimKai', serif;
`,Pn=t.p`
  font-size: 20px;
  color: #666;
  line-height: 1.8;
  font-family: 'KaiTi', 'SimKai', serif;
  margin-bottom: 30px;
`,Mn=t.div`
  text-align: left;
  max-width: 500px;
  margin: 0 auto;
`,X=t.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  font-size: 18px;
  color: #555;
  border-bottom: 1px solid rgba(255, 165, 0, 0.2);
`,U=t.span`
  font-size: 24px;
  width: 30px;
  text-align: center;
`,me=t(c.div)`
  position: absolute;
  font-size: 60px;
  opacity: 0.6;
  z-index: 5;
`,Dn=()=>{const i=R(),n=()=>{i("/checkin")};return e.jsxs(Sn,{children:[e.jsx(me,{style:{top:"10%",left:"10%"},animate:{y:[0,-30,0],rotate:[0,10,-10,0],scale:[1,1.1,1]},transition:{duration:8,repeat:1/0},children:"🌸"}),e.jsx(me,{style:{top:"20%",right:"15%"},animate:{y:[0,25,0],rotate:[0,-15,15,0],scale:[1,.9,1]},transition:{duration:6,repeat:1/0},children:"🎪"}),e.jsx(me,{style:{bottom:"15%",left:"20%"},animate:{y:[0,-20,0],rotate:[0,8,-8,0]},transition:{duration:7,repeat:1/0},children:"🎭"}),e.jsx($n,{onClick:n,whileHover:{scale:1.05},whileTap:{scale:.95},children:"🏠 返回打卡篇"}),e.jsx(In,{children:e.jsx(Tn,{children:"其他巡礼"})}),e.jsxs(En,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8},children:[e.jsx(Fn,{children:"🚧"}),e.jsx(Bn,{children:"页面开发中..."}),e.jsxs(Pn,{children:["正在为您精心准备更多精彩的圣地巡礼内容！",e.jsx("br",{}),"敬请期待即将到来的全新体验。"]}),e.jsxs(Mn,{children:[e.jsxs(X,{children:[e.jsx(U,{children:"🏛️"}),e.jsx("span",{children:"特色建筑巡礼"})]}),e.jsxs(X,{children:[e.jsx(U,{children:"🍜"}),e.jsx("span",{children:"美食探索地图"})]}),e.jsxs(X,{children:[e.jsx(U,{children:"🎨"}),e.jsx("span",{children:"文化体验活动"})]}),e.jsxs(X,{children:[e.jsx(U,{children:"📸"}),e.jsx("span",{children:"摄影打卡指南"})]}),e.jsxs(X,{children:[e.jsx(U,{children:"🛍️"}),e.jsx("span",{children:"购物推荐清单"})]})]})]})]})},He=t.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`,On=t.div`
  position: relative;
  width: 100%;
  height: 100%;
`,An=t(c.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  cursor: none !important; /* 🦋 使用蝴蝶鼠标 */
  transition: none; /* 🔧 移除CSS transition，避免与framer-motion冲突 */
`,Ln=t.div`
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
`,Rn=t(c.div)`
  position: absolute;
  bottom: 10px;
  left: 15px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  z-index: 10;
`,Hn=t.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 10;
`,Kn=t(c.button)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${i=>i.active?"rgba(255, 255, 255, 0.9)":"rgba(255, 255, 255, 0.4)"};
  cursor: none !important; /* 🦋 使用蝴蝶鼠标 */
  transition: none; /* 🔧 移除CSS transition，避免与framer-motion冲突 */
`,ye=({images:i,title:n,autoPlay:p=!0,interval:x=3e3,onImageClick:d,isPlaying:o})=>{const[b,f]=l.useState(0),w=o!==void 0?o:p;l.useEffect(()=>{if(!w||i.length<=1)return;const C=setInterval(()=>{f(k=>(k+1)%i.length)},x);return()=>clearInterval(C)},[w,i.length,x]);const h=()=>{d&&d(b)};return i.length===0?e.jsx(He,{children:e.jsx("div",{style:{width:"100%",height:"100%",background:"#f0f0f0",display:"flex",alignItems:"center",justifyContent:"center",color:"#666",fontSize:"14px"},children:"暂无图片"})}):e.jsx(He,{children:e.jsxs(On,{children:[e.jsx(M,{mode:"wait",children:e.jsx(An,{src:i[b].src,alt:`${n} - ${i[b].label}`,clickable:!!d,onClick:h,initial:{opacity:0,x:50},animate:{opacity:1,x:0},exit:{opacity:0,x:-50},whileHover:d?{scale:1.02}:{},transition:{duration:.5,ease:"easeInOut",scale:{type:"spring",stiffness:400,damping:25,duration:.15}}},b)}),e.jsx(Ln,{}),e.jsx(Rn,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.3},children:i[b].label},`label-${b}`),i.length>1&&e.jsx(Hn,{children:i.map((C,k)=>e.jsx(Kn,{active:k===b,onClick:()=>f(k),whileHover:{scale:1.1,background:"rgba(255, 255, 255, 0.7)"},whileTap:{scale:.95},transition:{type:"spring",stiffness:400,damping:25,duration:.15}},k))})]})})},Nn=t(c.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,Yn=t(c.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
`,Vn=t.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`,Xn=t.div`
  text-align: center;
  color: #333;
`,Un=t.h3`
  font-size: 22px;
  margin: 0 0 4px 0;
  color: #5d4037;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`,_n=t.p`
  font-size: 16px;
  margin: 0;
  color: #666;
  font-weight: 500;
`,Wn=t.div`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
  font-weight: 500;
`,Gn=t.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`,Qn=t(c.button)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${i=>i.active?"#5d4037":"#ccc"};
  cursor: pointer;
`;function ve(i){var v,a,y;const{isOpen:n,onClose:p,images:x,currentIndex:d,title:o,onPrevious:b,onNext:f,onIndexChange:w}=i,h=l.useRef(null),C=l.useCallback(r=>{if(!x.length)return;const z=(d+r+x.length)%x.length;w?w(z):r<0&&b?b():r>0&&f&&f()},[d,x.length,w,b,f]),k=l.useCallback(r=>{!n||x.length<=1||(r.preventDefault(),C(r.deltaY>0?1:-1))},[n,x.length,C]),I=l.useRef(null),T=l.useCallback(r=>{I.current=r.targetTouches[0].clientX},[]),F=l.useCallback(r=>{if(I.current==null)return;const z=I.current-r.targetTouches[0].clientX;Math.abs(z)>50&&(C(z>0?1:-1),I.current=null)},[C]),$=l.useCallback(()=>{I.current=null},[]);return l.useEffect(()=>{const r=z=>{if(n)switch(z.key){case"ArrowLeft":z.preventDefault(),C(-1);break;case"ArrowRight":z.preventDefault(),C(1);break;case"Escape":z.preventDefault(),p();break}};return document.addEventListener("keydown",r),()=>document.removeEventListener("keydown",r)},[n,C,p]),l.useEffect(()=>{const r=h.current;if(!(!r||x.length<=1))return r.addEventListener("wheel",k,{passive:!1}),()=>r.removeEventListener("wheel",k)},[k,x.length]),!n||x.length===0?null:e.jsx(M,{children:e.jsx(Nn,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:p,children:e.jsxs(Yn,{ref:h,initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},onClick:r=>r.stopPropagation(),onTouchStart:T,onTouchMove:F,onTouchEnd:$,children:[e.jsx(Vn,{src:(v=x[d])==null?void 0:v.src,alt:`${o} - ${(a=x[d])==null?void 0:a.label}`}),e.jsxs(Xn,{children:[e.jsx(Un,{children:o}),e.jsx(_n,{children:(y=x[d])==null?void 0:y.label}),x.length>1&&e.jsxs(Wn,{children:[d+1," / ",x.length]})]}),x.length>1&&e.jsx(Gn,{children:x.map((r,z)=>e.jsx(Qn,{active:z===d,whileHover:{scale:1.1},whileTap:{scale:.95},onClick:()=>{w?w(z):z!==d&&C(z>d?1:-1)}},z))})]})})})}const qn=t.div`
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
`,Jn=t.div`
  text-align: center;
  margin-bottom: 40px;
`,Zn=t.h1`
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
`,Ke=t.span`
  font-size: 60px;
`,eo=t.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`,to=t.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`,Ne=t(c.div)`
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
`,io=t.h3`
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
`,no=t.div`
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
`,oo=t.div`
  width: fit-content;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`,ao=t.img`
  width: ${i=>i.scale*800}px;
  max-width: 100vw;
  height: auto;
  border-radius: 20px;
  display: block;
`,ro=t.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  pointer-events: none;
`,q=t(c.div)`
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
`,ue={mountainUP:{image:"images/webps/女木岛/女木岛-秘密基地山路.webp",desc:"通往秘密基地的山路"},mountainDOWN:{image:"images/webps/女木岛/女木岛-山道.webp",desc:"和苍引导七影碟的山道"},cave:{image:"images/webps/女木岛/女木岛-采石场入口.webp",desc:"与鸥冒险的采石场入口"}},so=t.div`
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
`,lo=t(c.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`,co=t.h4`
  padding: 15px 15px 5px 15px;
  font-size: 18px;
  color: #5d4037;
  text-align: center;
  margin: 0;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
`,po=t.p`
  padding: 5px 15px 15px 15px;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`,xo=t.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`,go=t(c.button)`
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
`,bo=t(c.button)`
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
`;t(c.div)`
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
`;t(c.div)`
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
`;t.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;t.div`
  text-align: center;
  color: #333;
`;t.h3`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #5d4037;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`;t.p`
  font-size: 18px;
  margin: 0;
  color: #666;
  font-weight: 500;
`;t(c.button)`
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
`;const ho=t.div`
  display: flex;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  backdrop-filter: blur(10px);
`,Ye=t(c.button)`
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
`,Ve=t(c.div)`
  width: 100%;
`,mo=()=>{const i=R(),[n,p]=l.useState({isOpen:!1,images:[],currentIndex:0,title:""}),[x,d]=l.useState("intro"),[o,b]=l.useState(null),[f,w]=l.useState(!0),h={scale:.6,icons:{cave:{x:66,y:38},bus:{x:73,y:66},mountainUP:{x:65,y:33},mountainDOWN:{x:70,y:43}},sizes:{cave:30,mountainUP:35,bus:35,mountainDOWN:35}},C=[{title:"秘密基地山路",description:"通往秘密基地的山路",images:[{src:"images/webps/女木岛/女木岛-秘密基地山路.webp",label:"白天"},{src:"images/webps/女木岛/女木岛-秘密基地山路-黄昏.webp",label:"黄昏"},{src:"images/webps/女木岛/女木岛-秘密基地山路-夜晚.webp",label:"夜晚"},{src:"images/webps/女木岛/女木岛-秘密基地山路-深夜.webp",label:"深夜"}]},{title:"山道",description:"苍捕捉七影碟的地点",images:[{src:"images/webps/女木岛/女木岛-山道.webp",label:"白天"},{src:"images/webps/女木岛/女木岛-山道-黄昏.webp",label:"黄昏"},{src:"images/webps/女木岛/女木岛-山道-夜晚.webp",label:"夜晚"},{src:"images/webps/女木岛/女木岛-山道-深夜.webp",label:"深夜"}]},{title:"采石场入口",description:"欧线的重要场所",images:[{src:"images/webps/女木岛/女木岛-采石场入口.webp",label:"白天"},{src:"images/webps/女木岛/女木岛-采石场入口-黄昏.webp",label:"黄昏"},{src:"images/webps/女木岛/女木岛-采石场入口-夜晚.webp",label:"夜晚"}]},{title:"采石场分岔路",description:"采石场内部第一站",images:[{src:"images/webps/女木岛/女木岛-采石场-分岔路-有光.webp",label:"有光"},{src:"images/webps/女木岛/女木岛-采石场-分岔路-无光.webp",label:"无光"}]},{title:"窄路",description:"采石场的一条窄路",images:[{src:"images/webps/女木岛/女木岛-窄路-有光.webp",label:"有光"},{src:"images/webps/女木岛/女木岛-窄路-无光.webp",label:"无光"}]}],k=()=>{i("/checkin")},I=(a,y,r)=>{p({isOpen:!0,images:a,currentIndex:y,title:r})},T=()=>{p(a=>O(D({},a),{isOpen:!1}))},F=()=>{p(a=>O(D({},a),{currentIndex:(a.currentIndex-1+a.images.length)%a.images.length}))},$=()=>{p(a=>O(D({},a),{currentIndex:(a.currentIndex+1)%a.images.length}))},v=a=>{let y="",r=[];switch(a){case"cave":y="采石场入口",r=[{src:"images/webps/女木岛/女木岛-采石场入口.webp",label:"与鸥冒险的采石场入口"}];break;case"mountainUP":y="秘密基地山路",r=[{src:"images/webps/女木岛/女木岛-秘密基地山路.webp",label:"通往秘密基地的山路"}];break;case"mountainDOWN":y="山道",r=[{src:"images/webps/女木岛/女木岛-山道.webp",label:"苍引导七影碟的山道"}];break;case"bus":y="公交时刻表",r=[{src:"images/webps/女木岛/女木岛-公交时间表.webp",label:"女木岛公交时刻表"}];break}y&&r.length>0&&I(r,0,y)};return e.jsxs(qn,{children:[e.jsx(Jn,{children:e.jsxs(c.div,{initial:{opacity:0,y:-30},animate:{opacity:1,y:0},transition:{duration:.8},children:[e.jsxs(Zn,{children:[e.jsx(Ke,{children:"👹"}),"女木岛",e.jsx(Ke,{children:"👹"})]}),e.jsx(eo,{children:"神秘的传说鬼岛"})]})}),e.jsxs(to,{children:[e.jsxs(Ne,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.2},children:[e.jsxs(ho,{children:[e.jsx(Ye,{active:x==="intro",tabType:"intro",onClick:()=>d("intro"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🏝️ 岛屿介绍"}),e.jsx(Ye,{active:x==="guide",tabType:"guide",onClick:()=>d("guide"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🗺️ 巡礼说明"})]}),e.jsx(M,{mode:"wait",children:x==="intro"?e.jsx(Ve,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:e.jsxs(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[e.jsx(K,{children:"拥有鬼岛大洞窟和桃太郎传说的观光岛屿"}),e.jsxs(K,{children:["女木岛坐落于高松市北部，从高松港乘坐渡轮大约20分钟即可到达。",e.jsx("br",{})]}),e.jsx(K,{children:"岛中央为“阿利比克峰”，传说鬼族曾在此隐居，女木岛因此又称“鬼岛”。"}),e.jsx(K,{children:"女木岛有一个名为“鬼岛大洞窟”的采石场遗迹，这里是鸥探险的原型。从港口到鬼岛大洞窟可以乘坐接送巴士。"})]})},"intro"):e.jsx(Ve,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:e.jsxs(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[e.jsx(K,{children:"女木岛的巡礼场景集中在鬼岛大洞窟及其附近，可在女木港搭乘公交快速到达巡礼地点，步行会在路上耗费过多时间和体力。"}),e.jsx(K,{children:"女木岛共有五个巡礼点，分别是，秘密基地山路，山道，采石场入口，采石场分岔路，窄路。"}),e.jsx(K,{children:"其他说明：海边钢琴属于海盗船原型。"})]})},"guide")})]}),e.jsx(c.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.4},children:e.jsx(no,{children:e.jsxs(oo,{children:[e.jsx(ao,{scale:h.scale,src:"images/webps/女木岛/女木岛地图-线路版.webp",alt:"女木岛地图"}),e.jsxs(ro,{children:[e.jsxs(q,{x:h.icons.cave.x,y:h.icons.cave.y,iconSize:h.sizes.cave,initial:{scale:0},animate:{scale:1},transition:{delay:1,duration:.5},whileHover:{scale:1.2},title:"山洞",onMouseEnter:()=>{const a=ue.cave;a&&b({x:h.icons.cave.x,y:h.icons.cave.y,title:"山洞",image:a.image,desc:a.desc})},onMouseLeave:()=>b(null),onClick:()=>v("cave"),style:{zIndex:15,cursor:"pointer"},children:[e.jsx("img",{src:"images/webps/女木岛/女木岛-山洞.webp",alt:"山洞",style:{width:`${h.sizes.cave}px`,height:`${h.sizes.cave}px`,borderRadius:"50%",objectFit:"cover"}}),o&&o.title==="山洞"&&e.jsxs(J,{children:[e.jsx(Z,{src:o.image,alt:o.title}),e.jsx(ee,{children:o.title}),e.jsx(te,{children:o.desc})]})]}),e.jsxs(q,{x:h.icons.bus.x,y:h.icons.bus.y,iconSize:h.sizes.bus,initial:{scale:0},animate:{scale:1},transition:{delay:1.2,duration:.5},whileHover:{scale:1.2},title:"公交/渡轮站",onMouseEnter:()=>{b({x:h.icons.bus.x,y:h.icons.bus.y,title:"公交/渡轮站",image:"images/webps/女木岛/女木岛-公交时间表.webp",desc:"前往女木岛的交通枢纽"})},onMouseLeave:()=>b(null),onClick:()=>v("bus"),style:{zIndex:25,cursor:"pointer"},children:["🚌",o&&o.title==="公交/渡轮站"&&e.jsxs(J,{children:[e.jsx(Z,{src:o.image,alt:o.title}),e.jsx(ee,{children:o.title}),e.jsx(te,{children:o.desc})]})]}),e.jsxs(q,{x:h.icons.mountainUP.x,y:h.icons.mountainUP.y,iconSize:h.sizes.mountainUP,initial:{scale:0},animate:{scale:1},transition:{delay:1.4,duration:.5},whileHover:{scale:1.2},title:"秘密基地山路",onMouseEnter:()=>{const a=ue.mountainUP;a&&b({x:h.icons.mountainUP.x,y:h.icons.mountainUP.y,title:"秘密基地山路",image:a.image,desc:a.desc})},onMouseLeave:()=>b(null),onClick:()=>v("mountainUP"),style:{zIndex:10,cursor:"pointer"},children:[e.jsx("img",{src:"images/webps/女木岛/女木岛-山路地标.webp",alt:"秘密基地山路",style:{width:`${h.sizes.mountainUP}px`,height:`${h.sizes.mountainUP}px`,borderRadius:"50%",objectFit:"cover"}}),o&&o.title==="秘密基地山路"&&e.jsxs(J,{children:[e.jsx(Z,{src:o.image,alt:o.title}),e.jsx(ee,{children:o.title}),e.jsx(te,{children:o.desc})]})]}),e.jsxs(q,{x:h.icons.mountainDOWN.x,y:h.icons.mountainDOWN.y,iconSize:h.sizes.mountainDOWN,initial:{scale:0},animate:{scale:1},transition:{delay:1.6,duration:.5},whileHover:{scale:1.2},title:"山道",onMouseEnter:()=>{const a=ue.mountainDOWN;a&&b({x:h.icons.mountainDOWN.x,y:h.icons.mountainDOWN.y,title:"山道",image:a.image,desc:a.desc})},onMouseLeave:()=>b(null),onClick:()=>v("mountainDOWN"),style:{zIndex:20},children:[e.jsx("img",{src:"images/webps/女木岛/女木岛-山路地标.webp",alt:"山道",style:{width:`${h.sizes.mountainDOWN}px`,height:`${h.sizes.mountainDOWN}px`,borderRadius:"50%",objectFit:"cover"}}),o&&o.title==="山道"&&e.jsxs(J,{children:[e.jsx(Z,{src:o.image,alt:o.title}),e.jsx(ee,{children:o.title}),e.jsx(te,{children:o.desc})]})]})]})]})})}),e.jsxs(Ne,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.6},children:[e.jsx(io,{children:"打卡地点"}),e.jsx(so,{children:C.map(a=>e.jsxs(lo,{whileHover:{scale:1.02},transition:{duration:.3},initial:{opacity:0,y:30},animate:{opacity:1,y:0},onClick:()=>I(a.images,0,a.title),style:{cursor:"pointer"},children:[e.jsx(ye,{images:a.images,title:a.title,autoPlay:!0,interval:4e3,isPlaying:f,onImageClick:y=>I(a.images,y,a.title)}),e.jsx(co,{children:a.title}),e.jsx(po,{children:a.description})]},a.title))})]})]}),e.jsxs(xo,{children:[e.jsx(bo,{onClick:()=>w(!f),whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.6},children:f?"⏸ 停止轮播":"▶ 开始轮播"}),e.jsx(go,{onClick:k,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.8},children:"返回打卡篇"})]}),e.jsx(ve,{isOpen:n.isOpen,onClose:T,images:n.images,currentIndex:n.currentIndex,title:n.title,onPrevious:F,onNext:$,onIndexChange:a=>p(y=>O(D({},y),{currentIndex:a}))})]})},uo=t(c.div)`
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
`,fo=t(c.div)`
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
`,vo=t(c.div)`
  position: absolute;
  font-size: ${i=>i.size||30}px;
  left: ${i=>i.x}px;
  top: ${i=>i.y}px;
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
`,Xe=t.h3`
  font-size: 28px;
  color: #5d4037;
  margin: 0 0 10px 0;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
`,Ue=t.p`
  font-size: 18px;
  color: #666;
  margin: 0;
  line-height: 1.6;
  text-align: center;
`,at=({isOpen:i,onClose:n,mapImage:p,title:x,description:d,iconEmoji:o="🤭",iconPositions:b,mode:f})=>{if(!i)return null;const w=b&&b.length>0?b:[],h=l.useRef(null),C=l.useRef(null),[k,I]=l.useState({w:0,h:0}),[T,F]=l.useState({w:0,h:0}),$=()=>{const a=h.current;a&&F({w:a.clientWidth,h:a.clientHeight});const y=C.current;y&&y.naturalWidth&&y.naturalHeight&&I({w:y.naturalWidth,h:y.naturalHeight})};l.useEffect(()=>{$();const a=()=>$();return window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)},[]);const v=l.useMemo(()=>{const a=T.w,y=T.h,r=k.w,z=k.h;if(!a||!y||!r||!z)return{left:0,top:0,width:0,height:0,scale:1};const P=a/y,g=r/z;let m=0,S=0,s=0,j=0;g>P?(m=a,S=a/g,s=0,j=(y-S)/2):(S=y,m=y*g,s=(a-m)/2,j=0);const E=1e3,A=m>0?m/E:1;return{left:s,top:j,width:m,height:S,scale:A}},[T,k]);return e.jsx(M,{children:e.jsx(uo,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:n,children:e.jsx(fo,{small:f==="desc",initial:{scale:.8,opacity:0,y:50},animate:{scale:1,opacity:1,y:0},exit:{scale:.8,opacity:0,y:50},onClick:a=>a.stopPropagation(),transition:{type:"spring",stiffness:300,damping:30},children:f==="desc"?e.jsxs(e.Fragment,{children:[e.jsx(Xe,{children:x}),e.jsx(Ue,{children:d})]}):e.jsxs(e.Fragment,{children:[e.jsxs(wo,{ref:h,children:[e.jsx(yo,{ref:C,src:p,alt:x,onLoad:$}),w.map((a,y)=>{var m;const r=v.left+v.width*(a.x/100),z=v.top+v.height*(a.y/100),P=(m=a.size)!=null?m:30,g=Math.max(16,Math.round(P*(v.scale||1)));return e.jsx(vo,{x:r,y:z,size:g,initial:{scale:0,rotate:-180},animate:{scale:1,rotate:0},transition:{delay:.3+y*.1,type:"spring",stiffness:300,damping:20},children:a.icon?e.jsx(jo,{src:a.icon,alt:"icon",size:g}):a.emoji||o},y)})]}),e.jsxs(ko,{children:[e.jsx(Xe,{children:x}),e.jsx(Ue,{children:d})]})]})})})})},Co=t.div`
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
`,So=t.h1`
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
`,_e=t.span`
  font-size: 60px;
  display: inline-flex;
  align-items: center;
  
  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
`,Io=t.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`,$o=t.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`,We=t(c.div)`
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
`,To=t.h3`
  font-size: 28px;
  color: #5d4037;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
`,H=t.p`
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
`,Mo=t(c.div)`
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
`,Do=t.div`
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
`,Oo=t.img`
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
`,Ro=t.div`
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
`,Ho=t(c.div)`
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
`,Vo=t(c.button)`
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
`,Xo=t(c.button)`
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
`;t(c.div)`
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
`;t(c.div)`
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
`;t.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`;t.div`
  text-align: center;
  color: #333;
`;t.h3`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #5d4037;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`;t.p`
  font-size: 18px;
  margin: 0;
  color: #666;
  font-weight: 500;
`;const Uo=t.div`
  display: flex;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  backdrop-filter: blur(10px);
`,Ge=t(c.button)`
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
`,Qe=t(c.div)`
  width: 100%;
`,_o=()=>{const i=R(),[n,p]=l.useState({isOpen:!1,images:[],currentIndex:0,title:""}),[x,d]=l.useState("intro"),[o,b]=l.useState(null),[f,w]=l.useState({isOpen:!1,mapImage:"",title:"",description:"",iconPositions:[]}),[h,C]=l.useState(!0),k=1,I={紬的灯塔:30,苍睡觉的小道:30,白羽主视角:30,鸥相遇小道:50},T=[{x:61,y:2,emoji:"🗺️",title:"紬的灯塔",iconType:"emoji",size:I.紬的灯塔},{x:28,y:53,emoji:"🗺️",title:"苍睡觉的小道",iconType:"emoji",size:I.苍睡觉的小道},{x:23,y:74,emoji:"🗺️",title:"白羽主视角",iconType:"emoji",size:I.白羽主视角},{x:49,y:78,icon:"images/webps/男木岛/男木岛-鸥相遇小道图标.webp",title:"鸥相遇小道",iconType:"image",size:I.鸥相遇小道}],F={紬的灯塔:{image:"images/webps/男木岛/男木岛-灯塔.webp",desc:"与小紬相遇的地点"},苍睡觉的小道:{image:"images/webps/男木岛/男木岛-苍睡觉小道.webp",desc:"与苍相遇的地点"},白羽主视角:{image:"images/webps/男木岛/男木岛-防波堤.webp",desc:"第一次见白羽的地点"},鸥相遇小道:{image:"images/webps/男木岛/男木岛-鸥相遇小道.webp",desc:"与鸥相遇的地点"}},$={紬的灯塔:{mapImage:"images/webps/男木岛/男木岛-灯塔地图-线路版.webp",description:"我正在找东西，找自己想要做的事情",iconPositions:[{x:21,y:37,icon:"images/webps/男木岛/男木岛-鬼姬神山识之墓.webp",size:200},{x:74,y:35,icon:"images/webps/男木岛/男木岛-紬的灯塔.webp",size:200}]},苍睡觉的小道:{mapImage:"images/webps/男木岛/男木岛-苍睡觉小道地图-线路版.webp",description:"总之，就算我在睡觉也不必管啦",iconPositions:[{x:38,y:82,icon:"images/webps/男木岛/男木岛-放送塔.webp",size:150},{x:63,y:22,icon:"images/webps/男木岛/男木岛-苍睡觉小道.webp",size:200},{x:76,y:62,icon:"images/webps/男木岛/男木岛-静久神社.webp",size:200}]},白羽主视角:{mapImage:"images/webps/男木岛/男木岛-鸟白岛役场地图-线路版.webp",description:"不用在意我就好",iconPositions:[{x:33,y:2,icon:"images/webps/男木岛/男木岛-放送塔.webp",size:150},{x:5,y:55,icon:"images/webps/男木岛/男木岛-防波堤.webp",size:180},{x:42,y:64,icon:"images/webps/男木岛/男木岛-鸟白岛役场.webp",size:150},{x:65,y:70,icon:"images/webps/男木岛/男木岛-秘密基地.webp",size:100},{x:65,y:76,icon:"images/webps/男木岛/男木岛-泳池.webp",size:100}]},鸥相遇小道:{mapImage:"images/webps/男木岛/男木岛-鸥相遇小道.webp",description:"出发吧~再一次，向着那有海盗船的地方",iconPositions:[]}},v=[{title:"放送塔",description:"美希等爸爸妈妈的地点",images:[{src:"images/webps/男木岛/男木岛-放送塔.webp",label:"放送塔"}]},{title:"苍睡觉的小道",description:"与苍相遇的地点",images:[{src:"images/webps/男木岛/男木岛-苍睡觉小道.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-苍睡觉小道-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-苍睡觉小道-夜晚.webp",label:"夜晚"}]},{title:"鬼姬神山识之墓",description:"与小识。。。",images:[{src:"images/webps/男木岛/男木岛-鬼姬神山识之墓.webp",label:"鬼姬神山识之墓"}]},{title:"紬的灯塔",description:"与小紬相遇的地点",images:[{src:"images/webps/男木岛/男木岛-灯塔.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-灯塔-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-灯塔-夜晚-亮灯.webp",label:"夜晚-亮灯"},{src:"images/webps/男木岛/男木岛-灯塔-夜晚-熄灯.webp",label:"夜晚-熄灯"}]},{title:"静久神社",description:"与静久路过的鸟居",images:[{src:"images/webps/男木岛/男木岛-静久神社.webp",label:"静久神社"}]},{title:"鸟白岛役场",description:"岛上重要的行政场所",images:[{src:"images/webps/男木岛/男木岛-鸟白岛役场.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-鸟白岛役场-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-鸟白岛役场-夜晚.webp",label:"夜晚"}]},{title:"防波堤",description:"白羽主视觉",images:[{src:"images/webps/男木岛/男木岛-防波堤.webp",label:"防波堤"}]},{title:"秘密基地",description:"与天善打乒乓球的地点",images:[{src:"images/webps/男木岛/男木岛-秘密基地.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-秘密基地-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-秘密基地-夜晚.webp",label:"夜晚"}]},{title:"泳池",description:"与白羽相遇的地点",images:[{src:"images/webps/男木岛/男木岛-泳池.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-泳池-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-泳池-夜晚.webp",label:"夜晚"}]},{title:"缺口栏杆",description:"与鸥相遇的地点",images:[{src:"images/webps/男木岛/男木岛-鸥相遇小道.webp",label:"白天"},{src:"images/webps/男木岛/男木岛-鸥相遇小道-黄昏.webp",label:"黄昏"},{src:"images/webps/男木岛/男木岛-鸥相遇小道-夜晚.webp",label:"夜晚"}]}],a=()=>{i("/checkin")},y=(s,j,E)=>{p({isOpen:!0,images:s,currentIndex:j,title:E})},r=()=>{p(s=>O(D({},s),{isOpen:!1}))},z=()=>{p(s=>O(D({},s),{currentIndex:(s.currentIndex-1+s.images.length)%s.images.length}))},P=()=>{p(s=>O(D({},s),{currentIndex:(s.currentIndex+1)%s.images.length}))},g=(s,j,E,A)=>{w({isOpen:!0,mapImage:j,title:s,description:E,iconPositions:A})},m=()=>{w(s=>O(D({},s),{isOpen:!1}))},S=(s,j)=>j<20?"bottom":j>80?"top":s<20?"right":s>80?"left":"top";return e.jsxs(Co,{children:[e.jsx(zo,{children:e.jsxs(c.div,{initial:{opacity:0,y:-30},animate:{opacity:1,y:0},transition:{duration:.8},children:[e.jsxs(So,{children:[e.jsx(_e,{children:e.jsx("img",{src:"images/webps/男木岛/男木岛-灯塔图标.webp",alt:"灯塔"})}),"男木岛",e.jsx(_e,{children:e.jsx("img",{src:"images/webps/男木岛/男木岛-灯塔图标.webp",alt:"灯塔"})})]}),e.jsx(Io,{children:"宁静的猫岛渔村"})]})}),e.jsxs($o,{children:[e.jsxs(We,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.2},children:[e.jsxs(Uo,{children:[e.jsx(Ge,{active:x==="intro",tabType:"intro",onClick:()=>d("intro"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🏝️ 岛屿介绍"}),e.jsx(Ge,{active:x==="guide",tabType:"guide",onClick:()=>d("guide"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🗺️ 巡礼说明"})]}),e.jsx(M,{mode:"wait",children:x==="intro"?e.jsx(Qe,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:e.jsxs(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[e.jsx(H,{children:"男木岛是一个在斜坡上有梯田村庄和历史灯塔的岛屿。"}),e.jsx(H,{children:'男木岛的猫咪特别多，被称为"猫岛"，巡礼之余可以去撸一下猫猫。'})]})},"intro"):e.jsx(Qe,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:e.jsxs(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[e.jsx(H,{children:"男木岛的巡礼路线主要分为南北两个方向，北边最远的位置是灯塔，南边最远的位置是和鸥相遇的海岸小路。"}),e.jsx(H,{children:"男木岛共有10个巡礼点，巡礼推荐路线如下，点击🗺️可查看详情："}),e.jsx(H,{children:"北边：放送塔 → 苍睡觉的小道 → 鬼姬神山识之墓 → 小紬的灯塔"}),e.jsx(H,{children:"中部：放送塔 → 静久神社"}),e.jsx(H,{children:"南边：放送塔 → 鸟白岛役场 →  防波堤 → 秘密基地（泳池） → 鸥相遇的小路"}),e.jsxs(H,{children:["其他说明：",e.jsx("div",{style:{textIndent:"2em"},children:"1. 男木岛的巡礼方式为步行，灯塔距离较远，请安排好时间。"}),e.jsx("div",{style:{textIndent:"2em"},children:"2. 放送塔上岛即可看见，适合作为男木岛巡礼的起点。"}),e.jsx("div",{style:{textIndent:"2em"},children:"3. 秘密基地由丰爷自建，泳池有人时不要拍照。"}),e.jsx("div",{style:{textIndent:"2em"},children:"4. 有时间可以和丰爷聊天，丰爷人很好，一来就给你放bgm。"})]})]})},"guide")})]}),e.jsx(c.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.4},children:e.jsx(Eo,{children:e.jsxs(Fo,{children:[e.jsx(Bo,{scale:k,src:"images/webps/男木岛/男木岛地图-线路版.webp",alt:"男木岛地图"}),e.jsx(Po,{children:T.map((s,j)=>e.jsxs(Mo,{x:s.x,y:s.y,iconSize:s.size,initial:{scale:0},animate:{scale:1},transition:{delay:1+j*.1,duration:.5},whileHover:{scale:1.2},title:s.title,onClick:()=>{const E=$[s.title];E&&g(s.title,E.mapImage,E.description,E.iconPositions||[])},onMouseEnter:()=>{const E=F[s.title];E&&b({x:s.x,y:s.y,title:s.title,image:E.image,desc:E.desc})},onMouseLeave:()=>b(null),children:[s.iconType==="emoji"?e.jsx("span",{style:{fontSize:`${s.size}px`},children:s.emoji}):e.jsx("img",{src:s.icon,alt:s.title,style:{width:`${s.size}px`,height:`${s.size}px`,borderRadius:"50%",objectFit:"cover"}}),o&&o.title===s.title&&e.jsxs(Do,{position:S(s.x,s.y),children:[e.jsx(Oo,{src:o.image,alt:o.title}),e.jsx(Ao,{children:o.title}),e.jsx(Lo,{children:o.desc})]})]},s.title))})]})})}),e.jsxs(We,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.6},children:[e.jsx(To,{children:"打卡地点"}),e.jsx(Ro,{children:v.map(s=>e.jsxs(Ho,{whileHover:{scale:1.02},transition:{duration:.3},initial:{opacity:0,y:30},animate:{opacity:1,y:0},onClick:()=>y(s.images,0,s.title),style:{cursor:"pointer"},children:[e.jsx(ye,{images:s.images,title:s.title,autoPlay:!0,interval:4e3,isPlaying:h,onImageClick:j=>y(s.images,j,s.title)}),e.jsx(Ko,{children:s.title}),e.jsx(No,{children:s.description})]},s.title))})]})]}),e.jsxs(Yo,{children:[e.jsx(Xo,{onClick:()=>C(!h),whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.6},children:h?"⏸ 停止轮播":"▶ 开始轮播"}),e.jsx(Vo,{onClick:a,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.8},children:"返回打卡篇"})]}),e.jsx(ve,{isOpen:n.isOpen,onClose:r,images:n.images,currentIndex:n.currentIndex,title:n.title,onPrevious:z,onNext:P,onIndexChange:s=>p(j=>O(D({},j),{currentIndex:s}))}),e.jsx(at,{isOpen:f.isOpen,onClose:m,mapImage:f.mapImage,title:f.title,description:f.description,iconPositions:f.iconPositions,mode:"full"})]})},Wo=t.div`
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
`,Go=t.div`
  text-align: center;
  margin-bottom: 40px;
`,Qo=t.h1`
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
`,qe=t.span`
  font-size: 60px;
  display: inline-flex;
  align-items: center;
`,qo=t.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`,Jo=t.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`,Je=t(c.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
`,Zo=t.h3`
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
`,ea=t.div`
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
`,ta=t.div`
  width: fit-content;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`,ia=t.img`
  width: ${i=>i.scale*800}px;
  max-width: 100vw;
  height: auto;
  border-radius: 20px;
  display: block;
`,na=t.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  pointer-events: none;
`,oa=t(c.div)`
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
`,aa=t.div`
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
`,ra=t(c.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`,sa=t.h4`
  padding: 15px 15px 5px 15px;
  font-size: 18px;
  color: #5d4037;
  text-align: center;
  margin: 0;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
`,la=t.p`
  padding: 5px 15px 15px 15px;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`,ca=t.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`,da=t(c.button)`
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
`,pa=t(c.button)`
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
`,xa=t.div`
  display: flex;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  backdrop-filter: blur(10px);
`,Ze=t(c.button)`
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
`,et=t(c.div)`
  width: 100%;
`;t(c.div)`
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
`;t(c.div)`
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
`;t.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`;t.div`
  text-align: center;
  color: #333;
`;t.h3`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #5d4037;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`;t.p`
  font-size: 18px;
  margin: 0;
  color: #666;
  font-weight: 500;
`;t(c.button)`
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
`;const ga=t.div`
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
`,ba=t.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
`,ha=t.div`
  font-size: 16px;
  font-weight: 700;
  color: #5d4037;
  margin-bottom: 4px;
  text-align: center;
`,ma=t.div`
  font-size: 14px;
  color: #666;
  text-align: center;
`,ua={小卖部:{image:"images/webps/直岛/直岛-小卖部.webp",desc:"苍打工的地点"},海狸家:{image:"images/webps/直岛/直岛-海狸家院子.webp",desc:"加藤家的住所"},白羽钓点:{image:"images/webps/直岛/直岛-白羽钓鱼.webp",desc:"白羽钓鱼的地方"},蔷薇庄:{image:"images/webps/直岛/直岛-蔷薇庄.webp",desc:"静久的饭店"},鸣濑神社:{image:"images/webps/直岛/直岛-神社.webp",desc:"白羽家的神社"}},fa=()=>{const i=R(),[n,p]=l.useState("intro"),[x,d]=l.useState({isOpen:!1,images:[],currentIndex:0,title:""}),[o,b]=l.useState(null),[f,w]=l.useState({isOpen:!1,mapImage:"",title:"",description:"",iconPositions:[]}),[h,C]=l.useState(!0),k=1.5,I=[{x:18,y:54,emoji:"🗺️",title:"小卖部",iconType:"emoji",size:30},{x:58,y:50,emoji:"🗺️",title:"海狸家",iconType:"emoji",size:30},{x:75,y:64,emoji:"🗺️",title:"白羽钓点",iconType:"emoji",size:30},{x:67,y:88,emoji:"🗺️",title:"蔷薇庄",iconType:"emoji",size:30},{x:21,y:32,emoji:"⛩️",title:"鸣濑神社",iconType:"emoji",size:25}],T={小卖部:{mapImage:"images/webps/直岛/直岛地图-小卖部-路线版.webp",description:"苍打工的零食店，已歇业。",iconPositions:[{x:10,y:0,icon:"images/webps/直岛/直岛-小卖部.webp",size:200},{x:20,y:50,icon:"images/webps/直岛/直岛-sprb租车店.webp",size:200}]},海狸家:{mapImage:"images/webps/直岛/直岛地图-水塘海狸家-路线版.webp",description:"加藤家的住所，休憩之地。",iconPositions:[{x:11,y:72,icon:"images/webps/直岛/直岛-灵弹.webp",size:150},{x:77,y:-2,icon:"images/webps/直岛/直岛-海狸家院子.webp",size:150},{x:74,y:40,icon:"images/webps/直岛/直岛-八幡神社石阶.webp",size:150}]},白羽钓点:{mapImage:"images/webps/直岛/直岛地图-白羽钓点-路线版.webp",description:"白羽钓鱼的地方，海风徐徐。",iconPositions:[{x:5,y:75,icon:"images/webps/直岛/直岛-积浦海岸.webp",size:180},{x:80,y:35,icon:"images/webps/直岛/直岛-白羽钓鱼.webp",size:180},{x:57,y:0,icon:"images/webps/直岛/直岛-白羽钓点.webp",size:150}]},蔷薇庄:{mapImage:"images/webps/直岛/直岛地图-蔷薇庄-路线版.webp",description:"充满回忆的住宿地，温馨舒适。",iconPositions:[{x:90,y:58,icon:"images/webps/直岛/直岛-蔷薇庄图标.webp",size:50},{x:70,y:53,icon:"images/webps/直岛/直岛-惠美须神社鸟居.webp",size:100},{x:77,y:76,icon:"images/webps/直岛/直岛-海水浴场.webp",size:150},{x:12,y:-5,icon:"images/webps/直岛/直岛-游戏主界面图标.webp",size:250}]},鸣濑神社:{mapImage:"images/webps/直岛/直岛-神社.webp",description:"白羽出嫁的地点。",iconPositions:[]}},F=[{title:"港口",description:"直岛的主要交通枢纽，旅程的起点。",images:[{src:"images/webps/直岛/直岛-港口-无船.webp",label:"白天-无船"},{src:"images/webps/直岛/直岛-港口-无船-黄昏.webp",label:"黄昏-无船"},{src:"images/webps/直岛/直岛-港口-无船-夜晚.webp",label:"夜晚-无船"},{src:"images/webps/直岛/直岛-港口-有船.webp",label:"白天-有船"},{src:"images/webps/直岛/直岛-港口-有船-黄昏.webp",label:"黄昏-有船"},{src:"images/webps/直岛/直岛-港口-有船-夜晚.webp",label:"夜晚-有船"},{src:"images/webps/直岛/直岛-港口-下雨.webp",label:"下雨"}]},{title:"小卖部",description:"苍打工的零食店。",images:[{src:"images/webps/直岛/直岛-小卖部.webp",label:"白天"},{src:"images/webps/直岛/直岛-小卖部-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-小卖部-夜晚.webp",label:"夜晚"}]},{title:"鸣濑神社",description:"白羽出嫁的地点。",images:[{src:"images/webps/直岛/直岛-神社.webp",label:"白天"},{src:"images/webps/直岛/直岛-神社-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-神社-夜晚.webp",label:"夜晚"}]},{title:"灵弹",description:"灵弹~灵弹~。",images:[{src:"images/webps/直岛/直岛-灵弹.webp",label:"白天"},{src:"images/webps/直岛/直岛-灵弹-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-灵弹-夜晚.webp",label:"夜晚"}]},{title:"海狸家门前",description:"加藤家门口。",images:[{src:"images/webps/直岛/直岛-海狸家门前.webp",label:"白天"},{src:"images/webps/直岛/直岛-海狸家门前-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-海狸家门前-夜晚.webp",label:"夜晚"}]},{title:"海狸家院子",description:"加藤家院子。",images:[{src:"images/webps/直岛/直岛-海狸家院子.webp",label:"白天"},{src:"images/webps/直岛/直岛-海狸家院子-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-海狸家院子-夜晚.webp",label:"夜晚"}]},{title:"海狸家客厅",description:"加藤家客厅。",images:[{src:"images/webps/直岛/直岛-海狸家客厅.webp",label:"白天"},{src:"images/webps/直岛/直岛-海狸家客厅-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-海狸家客厅-夜晚.webp",label:"夜晚"}]},{title:"海狸家厨房",description:"加藤家厨房。",images:[{src:"images/webps/直岛/直岛-海狸家厨房.webp",label:"白天"},{src:"images/webps/直岛/直岛-海狸家厨房-中午.webp",label:"中午"},{src:"images/webps/直岛/直岛-海狸家厨房-夜晚.webp",label:"夜晚"}]},{title:"海狸家卧室",description:"加藤家卧室。",images:[{src:"images/webps/直岛/直岛-海狸家卧室-无床.webp",label:"白天-无床"},{src:"images/webps/直岛/直岛-海狸家卧室-无床-黄昏.webp",label:"黄昏-无床"},{src:"images/webps/直岛/直岛-海狸家卧室-无床-开灯-夜晚.webp",label:"夜晚-无床-开灯"},{src:"images/webps/直岛/直岛-海狸家卧室-无床-关灯-夜晚.webp",label:"夜晚-无床-关灯"},{src:"images/webps/直岛/直岛-海狸家卧室-有床.webp",label:"白天-有床"},{src:"images/webps/直岛/直岛-海狸家卧室-有床-黄昏.webp",label:"黄昏-有床"},{src:"images/webps/直岛/直岛-海狸家卧室-有床-开灯-夜晚.webp",label:"夜晚-有床-开灯"},{src:"images/webps/直岛/直岛-海狸家卧室-有床-关灯-夜晚.webp",label:"夜晚-有床-关灯"}]},{title:"食堂",description:"白羽家的食堂。",images:[{src:"images/webps/直岛/直岛-食堂.webp",label:"白天"},{src:"images/webps/直岛/直岛-食堂-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-食堂-夜晚.webp",label:"夜晚"}]},{title:"役场通路",description:"通往鸟白岛役场",images:[{src:"images/webps/直岛/直岛-役场通路.webp",label:"役场通路"}]},{title:"八幡神社石阶",description:"美希穿和服。",images:[{src:"images/webps/直岛/直岛-八幡神社石阶.webp",label:"八幡神社石阶"}]},{title:"积浦海岸",description:"羽未的日出打卡点",images:[{src:"images/webps/直岛/直岛-积浦海岸.webp",label:"积浦海岸"}]},{title:"白羽钓鱼点",description:"白羽钓鱼的地方",images:[{src:"images/webps/直岛/直岛-白羽钓鱼.webp",label:"白天"},{src:"images/webps/直岛/直岛-白羽钓点.webp",label:"白天"},{src:"images/webps/直岛/直岛-白羽钓点-黄昏.webp",label:"黄昏"},{src:"images/webps/直岛/直岛-白羽钓点-夜晚.webp",label:"夜晚"}]},{title:"惠美须神社鸟居",description:"独特的鸟居景观。",images:[{src:"images/webps/直岛/直岛-惠美须神社鸟居.webp",label:"惠美须神社鸟居"}]},{title:"蔷薇庄",description:"静久加饭的地方。",images:[{src:"images/webps/直岛/直岛-蔷薇庄.webp",label:"蔷薇庄"}]},{title:"海水浴场",description:"良一脱衣服的地方。",images:[{src:"images/webps/直岛/直岛-海水浴场.webp",label:"白天"},{src:"images/webps/直岛/直岛-海水浴场-夜晚.webp",label:"夜晚"},{src:"images/webps/直岛/直岛-海水浴场-黄昏.webp",label:"黄昏"}]},{title:"游戏主界面",description:"全部女主的合照",images:[{src:"images/webps/直岛/直岛-游戏主界面.webp",label:"游戏主界面"}]}],$=(g,m,S)=>{d({isOpen:!0,images:g,currentIndex:m,title:S})},v=()=>{d(g=>O(D({},g),{isOpen:!1}))},a=()=>{d(g=>O(D({},g),{currentIndex:(g.currentIndex-1+g.images.length)%g.images.length}))},y=()=>{d(g=>O(D({},g),{currentIndex:(g.currentIndex+1)%g.images.length}))},r=(g,m,S,s)=>{w({isOpen:!0,mapImage:m,title:g,description:S,iconPositions:s})},z=()=>{w(g=>O(D({},g),{isOpen:!1}))},P=()=>{i("/checkin")};return e.jsxs(Wo,{children:[e.jsx(Go,{children:e.jsxs(c.div,{initial:{opacity:0,y:-30},animate:{opacity:1,y:0},transition:{duration:.8},children:[e.jsxs(Qo,{children:[e.jsx(qe,{children:"🎨"}),"直岛",e.jsx(qe,{children:"🎨"})]}),e.jsx(qo,{children:"现代艺术的圣地"})]})}),e.jsxs(Jo,{children:[e.jsxs(Je,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.2},children:[e.jsxs(xa,{children:[e.jsx(Ze,{active:n==="intro",tabType:"intro",onClick:()=>p("intro"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🏝️ 岛屿介绍"}),e.jsx(Ze,{active:n==="guide",tabType:"guide",onClick:()=>p("guide"),whileHover:{scale:1.02},whileTap:{scale:.98},children:"🗺️ 巡礼说明"})]}),e.jsx(M,{mode:"wait",children:n==="intro"?e.jsx(et,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:e.jsxs(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[e.jsx(N,{children:"直岛是瀬户内海中著名的艺术岛屿，拥有丰富的自然与人文景观，是现代艺术与传统生活完美融合的代表。"}),e.jsx(N,{children:"岛上巡礼点较为分散，建议租自行车前往。"})]})},"intro"):e.jsx(et,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{duration:.3},children:e.jsxs(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[e.jsx(N,{children:"直岛的建议巡礼方式为自行车，上岛后可以在Summer Pocket租车店租一辆胡子🐱自行车。"}),e.jsxs(N,{children:["直岛巡礼主要分为4个区域，点击地图上的🗺️图标可查看详情。",e.jsx("br",{})]}),e.jsxs(N,{children:["直岛共有15个打卡点，具体如下：",e.jsx("br",{}),e.jsx("div",{style:{textIndent:"2em"},children:"港口往北：苍打工的小卖部 → 鸣濑神社"}),e.jsx("div",{style:{textIndent:"2em"},children:"正东方：小水塘 → 海狸家 → 八幡神社"}),e.jsx("div",{style:{textIndent:"2em"},children:"八幡神社往南：羽未日出点 → 白羽钓鱼点"}),e.jsx("div",{style:{textIndent:"2em"},children:"羽未日出点往南："}),e.jsx("div",{style:{textIndent:"4em"},children:"惠美须神社鸟居 → 往东，蔷薇庄，海水浴场"}),e.jsx("div",{style:{textIndent:"4em"},children:"惠美须神社鸟居 → 往西，游戏主界面拍摄点"})]}),e.jsxs(N,{children:["其他说明：",e.jsx("br",{}),e.jsx("div",{style:{textIndent:"2em"},children:"1. 小卖部和食堂已停业，只能在门口拍照；"}),e.jsx("div",{style:{textIndent:"2em"},children:"2. 海狸家附近点位较多；"}),e.jsx("div",{style:{textIndent:"2em"},children:"3. 海狸家客厅和卧室需要预定石井商店民宿才可拍照；"}),e.jsx("div",{style:{textIndent:"2em"},children:"4. 白羽钓鱼点涨潮时无法到达；"})]})]})},"guide")})]}),e.jsx(c.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.8,delay:.4},children:e.jsx(ea,{children:e.jsxs(ta,{children:[e.jsx(ia,{scale:k,src:"images/webps/直岛/直岛地图-路线版.webp",alt:"直岛地图"}),e.jsx(na,{children:I.map((g,m)=>e.jsxs(oa,{x:g.x,y:g.y,iconSize:g.size,initial:{scale:0},animate:{scale:1},transition:{delay:1+m*.1,duration:.5},whileHover:{scale:1.2},title:g.title,onClick:()=>{const S=T[g.title];S&&r(g.title,S.mapImage,S.description,S.iconPositions||[])},onMouseEnter:()=>{const S=ua[g.title];S&&b({x:g.x,y:g.y,title:g.title,image:S.image,desc:S.desc})},onMouseLeave:()=>b(null),children:[g.iconType==="emoji"?e.jsx("span",{style:{fontSize:`${g.size}px`},children:g.emoji}):e.jsx("img",{src:g.icon,alt:g.title}),o&&o.title===g.title&&e.jsxs(ga,{children:[e.jsx(ba,{src:o.image,alt:o.title}),e.jsx(ha,{children:o.title}),e.jsx(ma,{children:o.desc})]})]},g.title))})]})})}),e.jsxs(Je,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.6},children:[e.jsx(Zo,{children:"打卡地点"}),e.jsx(aa,{children:F.map(g=>e.jsxs(ra,{whileHover:{scale:1.02},transition:{duration:.3},initial:{opacity:0,y:30},animate:{opacity:1,y:0},onClick:()=>$(g.images,0,g.title),style:{cursor:"pointer"},children:[e.jsx(ye,{images:g.images,title:g.title,autoPlay:!0,interval:4e3,isPlaying:h,onImageClick:m=>$(g.images,m,g.title)}),e.jsx(sa,{children:g.title}),e.jsx(la,{children:g.description})]},g.title))})]})]}),e.jsxs(ca,{children:[e.jsx(pa,{onClick:()=>C(!h),whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.6},children:h?"⏸ 停止轮播":"▶ 开始轮播"}),e.jsx(da,{onClick:P,whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.8},children:"返回打卡篇"})]}),e.jsx(ve,{isOpen:x.isOpen,onClose:v,images:x.images,currentIndex:x.currentIndex,title:x.title,onPrevious:a,onNext:y,onIndexChange:g=>d(m=>O(D({},m),{currentIndex:g}))}),e.jsx(at,{isOpen:f.isOpen,onClose:z,mapImage:f.mapImage,title:f.title,description:f.description,iconPositions:f.iconPositions,mode:"full"})]})},wa=t.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'Arial', sans-serif;
  padding: 20px;
`,ya=t.div`
  text-align: center;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`,va=t.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`,ja=t.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #f0f0f0;
  line-height: 1.6;
`,ka=t.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 3px;
  margin: 20px 0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`,Ca=t.div`
  height: 30px;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  border-radius: 25px;
  width: ${i=>i.progress}%;
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
`,za=t.div`
  font-size: 1.1rem;
  margin-top: 15px;
  color: #ffffff;
  font-weight: bold;
`,Sa=t.p`
  font-size: 1rem;
  margin-top: 20px;
  color: #e0e0e0;
  line-height: 1.5;
`,Ia=()=>e.jsx(wa,{children:e.jsxs(ya,{children:[e.jsx(va,{children:"SPRB 网站开发进度"}),e.jsx(ja,{children:"感谢您的关注！我们正在努力开发SPRB网站，为您提供更好的服务体验。"}),e.jsx(ka,{children:e.jsx(Ca,{progress:50})}),e.jsxs(za,{children:[50,"% 完成"]}),e.jsxs(Sa,{children:["目前我们正在开发核心功能模块，包括用户界面优化、后端服务集成等。",e.jsx("br",{}),"预计将在不久的将来完成全部开发工作，敬请期待！"]})]})}),$a=t.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
`,Ta=t(c.button)`
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
`,Ea=t(c.div)`
  position: absolute;
  bottom: 90px;
  right: 0;
  width: 400px;
  background: #ffffff; /* 纯白背景，移除毛玻璃效果 */
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
`,Fa=t.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`,Ba=t.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background: ${i=>i.hasCover?"transparent":"linear-gradient(135deg, #ff4757, #ff6b7a)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin-right: 15px;
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .music-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    opacity: 0.8;
    z-index: 1;
  }
`,Pa=t.div`
  flex: 1;
`,Ma=t.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Da=t.div`
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Oa=t.button`
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
`,Aa=t.div`
  margin-bottom: 20px;
`,La=t.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
`,Ra=t.div`
  width: 100%;
  height: 4px;
  background: #e9e9e9;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
`,Ha=t(c.div)`
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
`,Ka=t.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px; /* 增大间距，使播放按钮居中明显 */
  margin-bottom: 20px;
`,we=t(c.button)`
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
`,Na=t(we)`
  font-size: 24px;
  background: linear-gradient(135deg, #ff4757, #ff6b7a);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #ff6b7a, #ff4757);
    transform: scale(1.05);
  }
`,Ya=t.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`,Va=t.div`
  font-size: 16px;
  color: #666;
  min-width: 20px;
`,Xa=t.input`
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
`,Ua=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`,_a=t.div`
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
`,Wa=t(c.div)`
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
`,Ga=t.div`
  width: 30px;
  font-size: 12px;
  color: ${i=>i.isActive?"#ff4757":"#999"};
  font-weight: ${i=>i.isActive?"600":"400"};
`,Qa=t.div`
  flex: 1;
`,qa=t.div`
  font-size: 14px;
  color: ${i=>i.isActive?"#ff4757":"#333"};
  font-weight: ${i=>i.isActive?"600":"400"};
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Ja=t.div`
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,tt=i=>{const n=Math.floor(i/60),p=Math.floor(i%60);return`${n}:${p.toString().padStart(2,"0")}`},Za=()=>{const{isPlaying:i,currentTime:n,duration:p,volume:x,playlist:d,currentTrack:o,currentIndex:b,playMode:f,togglePlay:w,next:h,prev:C,seek:k,setVolume:I,selectTrack:T,setPlayMode:F,isPlayerOpen:$,setPlayerOpen:v}=It(),a=l.useRef(null),[y,r]=l.useState(!1),z=s=>{const j=s.currentTarget.getBoundingClientRect(),A=(s.clientX-j.left)/j.width*p;k(A)},P=()=>{switch(f){case"single":return"🔂";case"list":return"🔁";default:return"🔁"}},g=()=>{switch(f){case"single":return"单曲循环";case"list":return"列表循环";default:return"列表循环"}},m=()=>{const s=["list","single"],E=(s.indexOf(f)+1)%s.length;F(s[E])},S=p>0?n/p*100:0;return l.useEffect(()=>{if(a.current&&b>=0){const s=a.current,E=s.children[b];if(E){const A=s.getBoundingClientRect(),_=E.getBoundingClientRect();_.top>=A.top&&_.bottom<=A.bottom||E.scrollIntoView({behavior:"smooth",block:"nearest"})}}},[b]),l.useEffect(()=>{const s=a.current;if(!s)return;const j=()=>{const{scrollTop:E}=s;r(E>10)};return s.addEventListener("scroll",j),()=>s.removeEventListener("scroll",j)},[]),e.jsxs($a,{"data-music-player":"true",children:[e.jsx(Ta,{isPlaying:i,onClick:()=>v(!$),whileHover:{scale:1.1},whileTap:{scale:.95},"data-music-player":"true"}),e.jsx(M,{children:$&&e.jsxs(Ea,{initial:{opacity:0,scale:.8,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.8,y:20},transition:{duration:.3,ease:"easeOut"},children:[e.jsxs(Fa,{children:[e.jsx(Ba,{hasCover:!!(o!=null&&o.cover),children:o!=null&&o.cover?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:o.cover,alt:`${o.name} 封面`,onError:s=>{const j=s.target;j.style.display="none";const E=j.nextElementSibling;E&&(E.style.display="block")}}),e.jsx("span",{className:"music-icon",style:{display:"none"},children:"🎵"})]}):"🎵"}),e.jsxs(Pa,{children:[e.jsx(Ma,{children:(o==null?void 0:o.name)||"暂无歌曲"}),e.jsx(Da,{children:(o==null?void 0:o.artist)||"未知艺术家"})]}),e.jsx(Oa,{onClick:()=>v(!1),children:"✕"})]}),o&&e.jsxs(Aa,{children:[e.jsxs(La,{children:[e.jsx("span",{children:tt(n)}),e.jsx("span",{children:tt(p)})]}),e.jsx(Ra,{onClick:z,children:e.jsx(Ha,{progress:S})})]}),e.jsxs(Ka,{children:[e.jsx(we,{onClick:C,whileHover:{scale:1.1},whileTap:{scale:.9},children:"⏮️"}),e.jsx(Na,{onClick:w,whileHover:{scale:1.05},whileTap:{scale:.95},"data-music-player":"true",children:i?"⏸️":"▶️"}),e.jsx(we,{onClick:h,whileHover:{scale:1.1},whileTap:{scale:.9},children:"⏭️"})]}),e.jsxs(Ya,{children:[e.jsx(Va,{children:"🔊"}),e.jsx(Xa,{type:"range",min:"0",max:"1",step:"0.01",value:x,onChange:s=>I(parseFloat(s.target.value))})]}),e.jsxs(Ua,{children:[e.jsxs("span",{style:{fontSize:"14px",fontWeight:"600",color:"#333"},children:["播放列表 (",d.length,")"]}),e.jsxs(c.button,{onClick:m,style:{background:"none",border:"none",cursor:"pointer",fontSize:"12px",color:"#ff4757",display:"flex",alignItems:"center",gap:"4px",padding:"4px 8px",borderRadius:"4px",transition:"all 0.2s"},whileHover:{scale:1.05,backgroundColor:"rgba(255, 71, 87, 0.1)"},whileTap:{scale:.95},children:[P()," ",g()]})]}),e.jsx(_a,{ref:a,children:d.map((s,j)=>e.jsxs(Wa,{isActive:j===b,onClick:()=>T(j),whileHover:{x:5},children:[e.jsx(Ga,{isActive:j===b,children:j===b&&i?"🎵":j+1}),e.jsxs(Qa,{children:[e.jsx(qa,{isActive:j===b,children:s.name}),e.jsx(Ja,{children:s.artist})]})]},s.id))})]})})]})},er=()=>{const[i,n]=l.useState({x:0,y:0}),[p,x]=l.useState(!1),[d,o]=l.useState(0),b=l.useRef(null),f=l.useRef(),w=l.useRef(0),h=l.useRef(!1),C=["images/webps/七影蝶-3.webp","images/webps/七影蝶-4.webp"],k=l.useCallback(()=>{h.current||(C.forEach(v=>{const a=new Image;a.src=v}),h.current=!0)},[C]),I=l.useCallback((v,a)=>{const y=Date.now();if(y-w.current<100)return;w.current=y;const r=document.elementFromPoint(v,a),z=r&&(r.tagName==="A"||r.tagName==="BUTTON"||r.tagName==="INPUT"||r.tagName==="SELECT"||r.tagName==="TEXTAREA"||r.getAttribute("role")==="button"||r.classList.contains("clickable")||r instanceof HTMLElement&&r.style.cursor==="pointer"||r.closest('a, button, [role="button"], .clickable'));x(!!z)},[]),T=l.useCallback((v,a)=>{f.current&&cancelAnimationFrame(f.current),f.current=requestAnimationFrame(()=>{n({x:v,y:a}),I(v,a)})},[I]),F=l.useCallback(v=>{v.style&&v.style.cursor&&v.style.cursor!=="none"&&(v.dataset.originalCursor||(v.dataset.originalCursor=v.style.cursor),v.style.cursor="none")},[]),$=l.useCallback(()=>{document.querySelectorAll("*").forEach(a=>F(a))},[F]);return l.useEffect(()=>{k();const v=y=>{T(y.clientX,y.clientY)};document.addEventListener("mousemove",v,{passive:!0}),$();const a=new MutationObserver(y=>{y.forEach(r=>{if(r.addedNodes.forEach(z=>{if(z.nodeType===Node.ELEMENT_NODE){const P=z;F(P),P.querySelectorAll("*").forEach(m=>F(m))}}),r.type==="attributes"&&r.attributeName==="style"){const z=r.target;F(z)}})});return a.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["style","class"]}),()=>{document.removeEventListener("mousemove",v),a.disconnect(),f.current&&cancelAnimationFrame(f.current)}},[T,k,$,F]),l.useEffect(()=>{const v=setInterval(()=>{o(a=>(a+1)%C.length)},p?200:300);return()=>clearInterval(v)},[p,C.length]),l.useEffect(()=>{const v=()=>{b.current&&(b.current.style.opacity="0")},a=()=>{b.current&&(b.current.style.opacity="1")};return document.addEventListener("mouseleave",v),document.addEventListener("mouseenter",a),()=>{document.removeEventListener("mouseleave",v),document.removeEventListener("mouseenter",a)}},[]),e.jsx("div",{ref:b,className:`butterfly-cursor ${p?"on-clickable":""}`,style:{transform:`translate3d(${i.x-20}px, ${i.y-20}px, 0)`,willChange:"transform",pointerEvents:"none",border:"none",outline:"none",boxShadow:"none",background:"transparent"},children:e.jsx("img",{src:C[d],alt:"蝴蝶鼠标",className:"butterfly-wing",draggable:!1,style:{userSelect:"none",transform:p?"scale(1.1)":"scale(1)",transition:"transform 0.2s ease-out",willChange:"transform",pointerEvents:"none",border:"none",outline:"none",boxShadow:"none",background:"transparent"}})})};function tr(){return e.jsx(Tt,{children:e.jsx(ft,{children:e.jsxs("div",{style:{position:"relative",width:"100vw",height:"100vh"},children:[e.jsxs(wt,{children:[e.jsx(L,{path:"/",element:e.jsx(Wt,{})}),e.jsx(L,{path:"/contents",element:e.jsx(di,{})}),e.jsx(L,{path:"/traffic",element:e.jsx(Ni,{})}),e.jsx(L,{path:"/checkin",element:e.jsx(wn,{})}),e.jsx(L,{path:"/divine-realm",element:e.jsx(zn,{})}),e.jsx(L,{path:"/other-pilgrimage",element:e.jsx(Dn,{})}),e.jsx(L,{path:"/megijima",element:e.jsx(mo,{})}),e.jsx(L,{path:"/ogijima",element:e.jsx(_o,{})}),e.jsx(L,{path:"/naoshima",element:e.jsx(fa,{})}),e.jsx(L,{path:"/progress",element:e.jsx(Ia,{})})]}),e.jsx(Za,{}),e.jsx(er,{})]})})})}fe.createRoot(document.getElementById("root")).render(e.jsx(ut.StrictMode,{children:e.jsx(tr,{})}))});export default ir();
