var y=Object.defineProperty;var f=(t,s,e)=>s in t?y(t,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[s]=e;var n=(t,s,e)=>f(t,typeof s!="symbol"?s+"":s,e);import"./modulepreload-polyfill-B5Qt9EMX.js";class c{constructor(){n(this,"subscribers",[])}subscribe(s){this.subscribers.includes(s)||this.subscribers.push(s)}unsubscribe(s){const e=this.subscribers.indexOf(s);e!==-1&&this.subscribers.splice(e,1)}notify(s){this.subscribers.forEach(e=>e.update(s))}}const p=6;class x extends c{constructor(s=p){super(),this.sideDice=s,this.sideDice=s}rollDice(){const{crypto:s}=window,e=new Uint8Array(1);return s.getRandomValues(e),e[0]%this.sideDice+1}notify(s){this.subscribers.forEach((e,r)=>{s===r&&e.update(this.rollDice())})}update(s){this.notify(s)}}const d=-1;class m extends c{constructor(e=2){super();n(this,"currentPlayerIndex",d);this.playerCount=e,this.playerCount=e}next(){this.currentPlayerIndex===this.playerCount-1||this.currentPlayerIndex===d?this.currentPlayerIndex=0:this.currentPlayerIndex+=1,this.notify(this.currentPlayerIndex)}}const I=21;class b extends c{constructor(){super(...arguments);n(this,"diceResults",[])}result(e){this.diceResults.push(e)}getWinStatus(){return this.diceResults.reduce((e,r)=>e+r,0)>=I}notify(e){this.subscribers.forEach(r=>{r.update(e)})}update(e){this.result(e),this.notify(e)}}class g{constructor(){n(this,"allDice",[])}update(s){this.allDice.push(s)}}const i=document.querySelector(".game__roll-the-dice"),w=document.getElementById("Player1"),D=document.getElementById("Player2"),E=document.getElementById("allResults"),h=new m,u=new x,l=new b,o=new b,a=new g;h.subscribe(u);u.subscribe(l);u.subscribe(o);l.subscribe(a);o.subscribe(a);i==null||i.addEventListener("click",()=>{function t(s,e){var r;s.getWinStatus()&&((r=e==null?void 0:e.closest(".game__item"))==null||r.setAttribute("style","background-color:red;"),i==null||i.setAttribute("disabled","true")),e.innerText=s.diceResults.join(" ")}h.next(),E.innerText=a.allDice.join(" "),t(l,w),t(o,D)});
