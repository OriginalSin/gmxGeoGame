var app=function(){"use strict";function t(){}function e(t,e){for(var s in e)t[s]=e[s];return t}function s(t,e){for(var s in e)t[s]=1;return t}function i(t){t()}function n(t,e){t.appendChild(e)}function o(t,e,s){t.insertBefore(e,s)}function r(t){t.parentNode.removeChild(t)}function c(t,e){for(var s=0;s<t.length;s+=1)t[s]&&t[s].d(e)}function a(t){return document.createElement(t)}function l(t){return document.createTextNode(t)}function u(t,e,s){t.addEventListener(e,s,!1)}function h(t,e,s){t.removeEventListener(e,s,!1)}function m(t,e){t.data=""+e}function d(t,e,s){t.style.setProperty(e,s)}function p(){return Object.create(null)}function v(t){t._lock=!0,y(t._beforecreate),y(t._oncreate),y(t._aftercreate),t._lock=!1}function f(t,e){t._handlers=p(),t._slots=p(),t._bind=e._bind,t._staged={},t.options=e,t.root=e.root||t,t.store=e.store||t.root.store,e.root||(t._beforecreate=[],t._oncreate=[],t._aftercreate=[])}function y(t){for(;t&&t.length;)t.shift()()}var _={destroy:function(e){this.destroy=t,this.fire("destroy"),this.set=t,this._fragment.d(!1!==e),this._fragment=null,this._state={}},get:function(){return this._state},fire:function(t,e){var s=t in this._handlers&&this._handlers[t].slice();if(s)for(var i=0;i<s.length;i+=1){var n=s[i];if(!n.__calling)try{n.__calling=!0,n.call(this,e)}finally{n.__calling=!1}}},on:function(t,e){var s=this._handlers[t]||(this._handlers[t]=[]);return s.push(e),{cancel:function(){var t=s.indexOf(e);~t&&s.splice(t,1)}}},set:function(t){this._set(e({},t)),this.root._lock||v(this.root)},_recompute:t,_set:function(t){var s=this._state,i={},n=!1;for(var o in t=e(this._staged,t),this._staged={},t)this._differs(t[o],s[o])&&(i[o]=n=!0);n&&(this._state=e(e({},s),t),this._recompute(i,this._state),this._bind&&this._bind(i,this._state),this._fragment&&(this.fire("state",{changed:i,current:this._state,previous:s}),this._fragment.p(i,this._state),this.fire("update",{changed:i,current:this._state,previous:s})))},_stage:function(t){e(this._staged,t)},_mount:function(t,e){this._fragment[this._fragment.i?"i":"m"](t,e||null)},_differs:function(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}};const g=window.serverBase||"//maps.kosmosnimki.ru/";var q={getSections(t){let e={};t.forEach(function(t){e[t.properties.SECTION]=!0});let s=Object.keys(e).sort(()=>Math.random()>.5),i=s.length;e={};for(let t=0,n=i>10?10:i;t<n;t++)e[s[t]]=!0;this.set({sectionsList:e})},reBuildQuestions(t){let e=[],s={};this.allData.sort(()=>Math.random()>.5).forEach(function(i){let n=i.properties,o=n.gmx_id,r=n.SECTION;!s[o]&&t[r]&&(e.push(i),s[o]=!0)}),this.set({questions:e.slice(0,10),reBuildQuestions:!1})},getQuestion(t){let{layerID:e}=this.get();this.question=null;let s="gmx_id="+t.properties.gmx_id;fetch(g+"rest/ver1/layers/"+e+"/search?apikey=PBZU2XXPDM&query="+s,{mode:"cors"}).then(function(t){return t.json()}).then(function(t){this.question=t.features[0],this.needResult&&(this.showQuestionResult(),this.needResult=!1)}.bind(this)),this._clearLayers(),this.map.setZoom(3)},getLayerGame(t){fetch(g+"rest/ver1/layers/"+t+"/search?apikey=PBZU2XXPDM&columns=[{%22Value%22:%22[gmx_id]%22},{%22Value%22:%22[TITLE]%22},{%22Value%22:%22SECTION%22}]",{mode:"cors"}).then(function(t){return t.json()}).then(function(t){this.allData=t.features}.bind(this))},showQuestionResult(){let{emotions:t}=this.get(),e=this.question,s=L.geoJSON(e.geometry).getLayers(),i=L.GeometryUtil.closestLayer(this.map,s,this._latlng),n=L.GeometryUtil.closest(this.map,i.layer,this._latlng,!1),o=i.layer,r=o.getBounds().contains(this._latlng),c=L.geodesic([[n,this._latlng]],{color:"red"}).addTo(this.map);this.map.fitBounds(c.getBounds());let a=c.toGeoJSON().geometry;this.currentLayer=o.addTo(this.map),this.polyline=c;let l,u=L.gmxUtil.geoJSONGetLength(a),h=Math.round(u/1e3),m=L.gmxUtil.getGeoJSONSummary(a),d={};for(let e,s,i=0,n=t.emotion.length;i<n;i++){if((e=t.emotion[i]).error>h||i===n-1){let o=i===n-1?e:s||e;l={title:t.rank[o.rank],color:o.color,score:m};break}s=e}r?(l={title:"ВАУ, КРУТО!",score:""},this.audioStarted&&this.audio.stop(0),this.audioStart(11.74689342403628,3.82984126984127)):this.audioStart(8.50453514739229,.20950113378684806),d.question=e,d.len=r?0:u,d.strLen=r?"0":m,this.set({resultQuestion:d,emotion:l})},clickMap(t){this.marker&&this.map.removeLayer(this.marker),this._latlng=t.latlng,this.marker=L.marker(this._latlng,{icon:L.divIcon({className:"my-div-icon",iconSize:[4,4],iconAnchor:[10,10]})}).addTo(this.map),this.set({point:!0})},audioStart(t,e){if(this.sound){let s=new(window.AudioContext||window.webkitAudioContext),i=s.createBufferSource(),n=new XMLHttpRequest;n.open("GET","mp3/audio.mp3",!0),n.responseType="arraybuffer",n.onload=function(){s.decodeAudioData(n.response,function(n){i.buffer=n,i.start(s.currentTime+1,t,e),i.connect(s.destination)},function(t){console.log("Error with decoding audio data"+t.err)})},n.send()}},_clearLayers(){this.marker&&(this.map.removeLayer(this.marker),this.marker=null),this.polyline&&(this.map.removeLayer(this.polyline),this.polyline=null),this.currentLayer&&(this.map.removeLayer(this.currentLayer),this.currentLayer=null)},createMap(t){let e=t.state||{},s=(t.mapID,t.layerID||"F9728D94848F4163A19DF5B5A6BFDDF1"),i=(t.apiKey,e.map?e.map.position:{});this.sound=t.sound;var n=1==t.base?L.tileLayer("//tilessputnik.ru/{z}/{x}/{y}.png",{attribution:'<a href="http://maps.sputnik.ru">Спутник</a> © Ростелеком | © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',maxNativeZoom:18,maxZoom:21}):L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia29zbW9zbmlta2kiLCJhIjoiY2lvbW1tNXN0MDAwdnc4bHg5ZWw2YXJtYSJ9.ON9Ovi3fuHc5RAipmLb2EQ",{attribution:'&copy; <a href="//mapbox.com/">mapbox</a>',maxNativeZoom:18,maxZoom:21});let o=new L.Map("map",{attribution:'&copy; <a href="//scanex.ru/">scanex</a>',allWorld:!0,generalized:!1,layers:[n],center:new L.LatLng(i.y||26,i.x||83),zoom:i.z||7}).on("click",this.clickMap.bind(this),this);o.zoomControl.setPosition("bottomright"),s&&this.getLayerGame(s),this.quizList=!0,this.map=o}};function z({changed:t,current:e,previous:s}){t.selectQuiz&&e.selectQuiz?(this._clearLayers(),this.set({quizList:this.quizList})):t.layerID&&e.layerID?this.getSections(this.allData):t.question&&e.question?this.getQuestion(e.question):e.reBuildQuestions?this.reBuildQuestions(e.sectionsList):t.calc&&e.calc&&(this.question?this.showQuestionResult():this.needResult=!0)}function x(n){var c,l;f(this,n),this._state=e({quizList:null,questions:null,permalink:null,map:null},n.data),this._intro=!!n.intro,this._handlers.state=[z],z.call(this,{changed:s({},this._state),current:this._state}),this._fragment=(this._state,{c(){(c=a("div")).id="map"},m(t,e){o(t,c,e),l=!0},p:t,i(t,e){l||this.m(t,e)},o:i,d(t){t&&r(c)}}),this.root._oncreate.push(()=>{(function(){let{urlParams:t}=this.get();this.createMap(t)}).call(this),this.fire("update",{changed:s({},this._state),current:this._state})}),n.target&&(this._fragment.c(),this._mount(n.target,n.anchor),v(this)),this._intro=!0}e(x.prototype,_),e(x.prototype,q);var Q={checkSection(t,e){let{sectionsList:s}=this.get();s[t]=e,this.set({sectionsList:s})},start(){this.set({reBuildQuestions:!0,quizList:null,layerID:"F9728D94848F4163A19DF5B5A6BFDDF1"}),this.nextQuestion(0,!0)},nextQuestion(t,e){let{questions:s,props:i,score:n,currentScore:o}=this.get(),r=s.shift();if(this.sc=this.sc||0,this.sc+=t||0,!r){n=n||{};let t=i.name,e=n[t]||[];e.push(this.sc);let s=e.length;n[t]=e.slice(s-5,s),window.localStorage.setItem("_gameQuiz_",JSON.stringify(n))}e&&(o=[]),this.set({questions:s,question:r,point:!1,calc:!1,resultQuestion:!1,currentScore:o})}};function b({changed:t,current:e,previous:s}){if(t.resultQuestion&&e.resultQuestion){let{currentScore:t}=this.get();t.push(e.resultQuestion),this.set({currentScore:t})}}function S(t,e){var s;return{c(){(s=a("div")).className="scrim svelte-c95xz5"},m(t,e){o(t,s,e)},d(t){t&&r(s)}}}function k(t,e){var s;function i(e){t.set({question:""})}return{c(){(s=a("button")).textContent="Начать игру заново",u(s,"click",i),s.className="start svelte-c95xz5",s.disabled=e.isSectionsEmpty},m(t,e){o(t,s,e)},p(t,e){t.isSectionsEmpty&&(s.disabled=e.isSectionsEmpty)},d(t){t&&r(s),h(s,"click",i)}}}function D(t,e){var s,i,c,u,h,d=e.it.question.properties.TITLE,p=e.it.strLen;return{c(){s=a("li"),i=l(d),c=l(": "),u=a("b"),h=l(p),s.className="svelte-c95xz5"},m(t,e){o(t,s,e),n(s,i),n(s,c),n(s,u),n(u,h)},p(t,e){t.currentScore&&d!==(d=e.it.question.properties.TITLE)&&m(i,d),t.currentScore&&p!==(p=e.it.strLen)&&m(h,p)},d(t){t&&r(s)}}}function I(t,e){var s,i,p,v,f,y,_,g,L,q,z,x,Q,b,S,k,I,N=e.emotion.title,B=e.emotion.score;function E(e){t.nextQuestion()}for(var w=e.currentScore,T=[],O=0;O<w.length;O+=1)T[O]=D(0,F(e,w,O));return{c(){s=a("div"),i=a("span"),p=l(N),v=l("\r\n\t\t\t\t\t"),f=a("span"),y=l(B),_=l("\r\n\t\t\t\t"),(g=a("button")).textContent="Следующий вопрос",L=l("\r\n\t\t\t\t"),q=a("hr"),z=l("\r\n\t\t\t\t"),x=a("div"),Q=a("ul");for(var t=0;t<T.length;t+=1)T[t].c();b=l("\r\n\t\t\t\t\t"),S=a("hr"),k=l("\r\n\t\t\t\t\tОбщий результат: "),I=l(e.currentItog),i.className="emotionTitle",d(i,"color",e.emotion.color),f.className="emotionScore svelte-c95xz5",s.className="emotion svelte-c95xz5",u(g,"click",E),g.className="start svelte-c95xz5",x.className="question-result svelte-c95xz5"},m(t,e){o(t,s,e),n(s,i),n(i,p),n(s,v),n(s,f),n(f,y),o(t,_,e),o(t,g,e),o(t,L,e),o(t,q,e),o(t,z,e),o(t,x,e),n(x,Q);for(var r=0;r<T.length;r+=1)T[r].m(Q,null);n(x,b),n(x,S),n(x,k),n(x,I)},p(t,e){if(t.emotion&&N!==(N=e.emotion.title)&&m(p,N),t.emotion&&d(i,"color",e.emotion.color),t.emotion&&B!==(B=e.emotion.score)&&m(y,B),t.currentScore){w=e.currentScore;for(var s=0;s<w.length;s+=1){const i=F(e,w,s);T[s]?T[s].p(t,i):(T[s]=D(0,i),T[s].c(),T[s].m(Q,null))}for(;s<T.length;s+=1)T[s].d(1);T.length=w.length}t.currentItog&&m(I,e.currentItog)},d(t){t&&(r(s),r(_),r(g)),h(g,"click",E),t&&(r(L),r(q),r(z),r(x)),c(T,t)}}}function N(e,s){var i,n,c;function m(t){e.set({calc:!0})}return{c(){(i=a("p")).textContent="Вы уверены?",n=l("\r\n\t\t\t"),(c=a("button")).textContent="Подтвердить выбор",i.className="standart svelte-c95xz5",u(c,"click",m),c.className="start svelte-c95xz5"},m(t,e){o(t,i,e),o(t,n,e),o(t,c,e)},p:t,d(t){t&&(r(i),r(n),r(c)),h(c,"click",m)}}}function B(e,s){var i;return{c(){(i=a("p")).textContent="Кликните по карте в предпологаемом месте расположения объекта",i.className="standart svelte-c95xz5"},m(t,e){o(t,i,e)},p:t,d(t){t&&r(i)}}}function E(t,e){var s,i,c,d=e.it;return{c(){var n,o;s=a("li"),i=a("input"),c=l(d),i._svelte={component:t,ctx:e},u(i,"change",P),n="type",o="checkbox",i.setAttribute(n,o),i.checked=!0},m(t,e){o(t,s,e),n(s,i),n(s,c)},p(t,s){e=s,i._svelte.ctx=e,(t.Object||t.sectionsList)&&d!==(d=e.it)&&m(c,d)},d(t){t&&r(s),h(i,"change",P)}}}function w(t,e){for(var s,i,n,m,d,p=e.Object.keys(e.sectionsList),v=[],f=0;f<p.length;f+=1)v[f]=E(t,M(e,p,f));function y(e){t.start()}return{c(){(s=a("h1")).textContent="Рубрики",i=l("\r\n\t\t\t"),n=a("ul");for(var t=0;t<v.length;t+=1)v[t].c();m=l("\r\n\t\t\t"),(d=a("button")).textContent="Начать игру",s.className="section",n.className="selectSectionsList svelte-c95xz5",u(d,"click",y),d.className="start svelte-c95xz5",d.disabled=e.isSectionsEmpty},m(t,e){o(t,s,e),o(t,i,e),o(t,n,e);for(var r=0;r<v.length;r+=1)v[r].m(n,null);o(t,m,e),o(t,d,e)},p(e,s){if(e.Object||e.sectionsList){p=s.Object.keys(s.sectionsList);for(var i=0;i<p.length;i+=1){const o=M(s,p,i);v[i]?v[i].p(e,o):(v[i]=E(t,o),v[i].c(),v[i].m(n,null))}for(;i<v.length;i+=1)v[i].d(1);v.length=p.length}e.isSectionsEmpty&&(d.disabled=s.isSectionsEmpty)},d(t){t&&(r(s),r(i),r(n)),c(v,t),t&&(r(m),r(d)),h(d,"click",y)}}}function T(e,s){var i;return{c(){(i=a("div")).innerHTML='<div class="lds-ellipsis svelte-c95xz5"><div class="svelte-c95xz5"></div><div class="svelte-c95xz5"></div><div class="svelte-c95xz5"></div><div class="svelte-c95xz5"></div></div>',i.className="center svelte-c95xz5"},m(t,e){o(t,i,e)},p:t,d(t){t&&r(i)}}}function O(t,e){var s,i,n,c,m;function d(e){t.set({quizList:null,layerID:"F9728D94848F4163A19DF5B5A6BFDDF1"})}return{c(){(s=a("h1")).textContent="Добро пожаловать!",i=l("\r\n\t\t"),(n=a("p")).textContent="Мы рады приветствовать вас в нашем интерактивном географическом квесте!\r\n\tВ этой игре мы предлагаем выбрать рубрики, в рамках воторых вам предстоит находить места на карте, зная только их названия. Думаете просто?",c=l("\r\n\t\t"),(m=a("button")).textContent="Давайте проверим!",s.className="title",u(m,"click",d),m.className="start svelte-c95xz5",m.disabled=e.isSectionsEmpty},m(t,e){o(t,s,e),o(t,i,e),o(t,n,e),o(t,c,e),o(t,m,e)},p(t,e){t.isSectionsEmpty&&(m.disabled=e.isSectionsEmpty)},d(t){t&&(r(s),r(i),r(n),r(c),r(m)),h(m,"click",d)}}}function G(t,e){var s,i,c,u=e.question?e.question.properties.TITLE+" ("+e.question.properties.SECTION+")":"";function h(t){return t.resultQuestion?I:t.point?N:B}var d=h(e),p=d(t,e);return{c(){s=a("div"),i=l(u),c=l("?\r\n\t\t\t"),p.c(),s.className="question svelte-c95xz5"},m(t,e){o(t,s,e),n(s,i),n(s,c),p.m(s,null)},p(e,n){e.question&&u!==(u=n.question?n.question.properties.TITLE+" ("+n.question.properties.SECTION+")":"")&&m(i,u),d===(d=h(n))&&p?p.p(e,n):(p.d(1),(p=d(t,n)).c(),p.m(s,null))},d(t){t&&r(s),p.d()}}}function C(e,s){var i;return{c(){(i=a("div")).innerHTML='<div class="lds-ellipsis svelte-c95xz5"><div class="svelte-c95xz5"></div><div class="svelte-c95xz5"></div><div class="svelte-c95xz5"></div><div class="svelte-c95xz5"></div></div>',i.className="center svelte-c95xz5"},m(t,e){o(t,i,e)},p:t,d(t){t&&r(i)}}}function j(t,e){var s;function i(t){return t.sectionsList?w:T}var n=i(e),c=n(t,e);return{c(){s=a("div"),c.c(),s.className="subcontent"},m(t,e){o(t,s,e),c.m(s,null)},p(e,o){n===(n=i(o))&&c?c.p(e,o):(c.d(1),(c=n(t,o)).c(),c.m(s,null))},d(t){t&&r(s),c.d()}}}function F(t,e,s){const i=Object.create(t);return i.it=e[s],i.each_value=e,i.it_index=s,i}function M(t,e,s){const i=Object.create(t);return i.it=e[s],i.each_value_1=e,i.it_index_1=s,i}function P(t){const{component:e,ctx:s}=this._svelte;e.checkSection(s.it,this.checked)}function A(t){f(this,t),this._state=e(e({Object:Object},{urlParams:{},quizList:[],selectQuiz:null,sectionsList:null,layerID:"",questions:!1,question:!1,point:!1,calc:!1,emotion:!1,emotions:emotions,resultQuestion:!1,reBuildQuestions:!1,currentScore:[],score:null}),t.data),this._recompute({currentScore:1,sectionsList:1},this._state),this._intro=!!t.intro,this._handlers.state=[b],b.call(this,{changed:s({},this._state),current:this._state}),this._fragment=function(t,e){var s,i,c,u,h,m,d,p={},v={urlParams:e.urlParams};void 0!==e.selectQuiz&&(v.selectQuiz=e.selectQuiz,p.selectQuiz=!0),void 0!==e.sectionsList&&(v.sectionsList=e.sectionsList,p.sectionsList=!0),void 0!==e.quizList&&(v.quizList=e.quizList,p.quizList=!0),void 0!==e.layerID&&(v.layerID=e.layerID,p.layerID=!0),void 0!==e.layerGame&&(v.layerGame=e.layerGame,p.layerGame=!0),void 0!==e.score&&(v.score=e.score,p.score=!0),void 0!==e.questions&&(v.questions=e.questions,p.questions=!0),void 0!==e.question&&(v.question=e.question,p.question=!0),void 0!==e.point&&(v.point=e.point,p.point=!0),void 0!==e.calc&&(v.calc=e.calc,p.calc=!0),void 0!==e.emotion&&(v.emotion=e.emotion,p.emotion=!0),void 0!==e.emotions&&(v.emotions=e.emotions,p.emotions=!0),void 0!==e.resultQuestion&&(v.resultQuestion=e.resultQuestion,p.resultQuestion=!0),void 0!==e.reBuildQuestions&&(v.reBuildQuestions=e.reBuildQuestions,p.reBuildQuestions=!0);var f=new x({root:t.root,store:t.store,data:v,_bind(e,s){var i={};!p.selectQuiz&&e.selectQuiz&&(i.selectQuiz=s.selectQuiz),!p.sectionsList&&e.sectionsList&&(i.sectionsList=s.sectionsList),!p.quizList&&e.quizList&&(i.quizList=s.quizList),!p.layerID&&e.layerID&&(i.layerID=s.layerID),!p.layerGame&&e.layerGame&&(i.layerGame=s.layerGame),!p.score&&e.score&&(i.score=s.score),!p.questions&&e.questions&&(i.questions=s.questions),!p.question&&e.question&&(i.question=s.question),!p.point&&e.point&&(i.point=s.point),!p.calc&&e.calc&&(i.calc=s.calc),!p.emotion&&e.emotion&&(i.emotion=s.emotion),!p.emotions&&e.emotions&&(i.emotions=s.emotions),!p.resultQuestion&&e.resultQuestion&&(i.resultQuestion=s.resultQuestion),!p.reBuildQuestions&&e.reBuildQuestions&&(i.reBuildQuestions=s.reBuildQuestions),t._set(i),p={}}});t.root._beforecreate.push(()=>{f._bind({selectQuiz:1,sectionsList:1,quizList:1,layerID:1,layerGame:1,score:1,questions:1,question:1,point:1,calc:1,emotion:1,emotions:1,resultQuestion:1,reBuildQuestions:1},f.get())});var y=!e.question&&S(),_=e.question&&k(t,e);function g(t){return t.quizList?O:t.question?G:t.layerID?j:C}var L=g(e),q=L(t,e);return{c(){f._fragment.c(),s=l("\r\n"),y&&y.c(),i=l("\r\n"),c=a("div"),u=a("div"),_&&_.c(),h=l("\r\n\t"),m=a("div"),q.c(),u.className="title bg svelte-c95xz5",m.className="content svelte-c95xz5",c.className="controls svelte-c95xz5"},m(t,e){f._mount(t,e),o(t,s,e),y&&y.m(t,e),o(t,i,e),o(t,c,e),n(c,u),_&&_.m(u,null),n(c,h),n(c,m),q.m(m,null),d=!0},p(s,n){e=n;var o={};s.urlParams&&(o.urlParams=e.urlParams),!p.selectQuiz&&s.selectQuiz&&(o.selectQuiz=e.selectQuiz,p.selectQuiz=void 0!==e.selectQuiz),!p.sectionsList&&s.sectionsList&&(o.sectionsList=e.sectionsList,p.sectionsList=void 0!==e.sectionsList),!p.quizList&&s.quizList&&(o.quizList=e.quizList,p.quizList=void 0!==e.quizList),!p.layerID&&s.layerID&&(o.layerID=e.layerID,p.layerID=void 0!==e.layerID),!p.layerGame&&s.layerGame&&(o.layerGame=e.layerGame,p.layerGame=void 0!==e.layerGame),!p.score&&s.score&&(o.score=e.score,p.score=void 0!==e.score),!p.questions&&s.questions&&(o.questions=e.questions,p.questions=void 0!==e.questions),!p.question&&s.question&&(o.question=e.question,p.question=void 0!==e.question),!p.point&&s.point&&(o.point=e.point,p.point=void 0!==e.point),!p.calc&&s.calc&&(o.calc=e.calc,p.calc=void 0!==e.calc),!p.emotion&&s.emotion&&(o.emotion=e.emotion,p.emotion=void 0!==e.emotion),!p.emotions&&s.emotions&&(o.emotions=e.emotions,p.emotions=void 0!==e.emotions),!p.resultQuestion&&s.resultQuestion&&(o.resultQuestion=e.resultQuestion,p.resultQuestion=void 0!==e.resultQuestion),!p.reBuildQuestions&&s.reBuildQuestions&&(o.reBuildQuestions=e.reBuildQuestions,p.reBuildQuestions=void 0!==e.reBuildQuestions),f._set(o),p={},e.question?y&&(y.d(1),y=null):y||((y=S()).c(),y.m(i.parentNode,i)),e.question?_?_.p(s,e):((_=k(t,e)).c(),_.m(u,null)):_&&(_.d(1),_=null),L===(L=g(e))&&q?q.p(s,e):(q.d(1),(q=L(t,e)).c(),q.m(m,null))},i(t,e){d||this.m(t,e)},o(t){d&&(f&&f._fragment.o(t),d=!1)},d(t){f.destroy(t),t&&r(s),y&&y.d(t),t&&(r(i),r(c)),_&&_.d(),q.d()}}}(this,this._state),this.root._oncreate.push(()=>{this.fire("update",{changed:s({},this._state),current:this._state})}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),v(this)),this._intro=!0}e(A.prototype,_),e(A.prototype,Q),A.prototype._recompute=function(t,e){t.currentScore&&this._differs(e.currentItog,e.currentItog=function({currentScore:t}){return L.gmxUtil.prettifyDistance(t.reduce((t,e)=>t+e.len,0))}(e))&&(t.currentItog=!0),t.sectionsList&&this._differs(e.isSectionsEmpty,e.isSectionsEmpty=function({sectionsList:t}){let e=!1;if(t){e=!0;for(let s in t)if(t[s]){e=!1;break}}return e}(e))&&(t.isSectionsEmpty=!0)};let J=(()=>{let t={};return location.search.substr(1).split("&").forEach(e=>{let s=e.split("=");t[s[0]]=s[1]}),t})();return new A({target:document.body,data:{urlParams:J,name:"world"}})}();
//# sourceMappingURL=bundle.js.map
