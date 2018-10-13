var app=function(){"use strict";function t(){}function e(t,e){for(var s in e)t[s]=e[s];return t}function s(t,e){for(var s in e)t[s]=1;return t}function i(t){t()}function n(t,e){t.appendChild(e)}function o(t,e,s){t.insertBefore(e,s)}function r(t){t.parentNode.removeChild(t)}function a(t,e){for(var s=0;s<t.length;s+=1)t[s]&&t[s].d(e)}function c(t){return document.createElement(t)}function u(t){return document.createTextNode(t)}function l(t,e,s){t.addEventListener(e,s,!1)}function h(t,e,s){t.removeEventListener(e,s,!1)}function m(t,e){t.data=""+e}function d(t,e,s){t.style.setProperty(e,s)}function f(){return Object.create(null)}function p(t){t._lock=!0,y(t._beforecreate),y(t._oncreate),y(t._aftercreate),t._lock=!1}function v(t,e){t._handlers=f(),t._slots=f(),t._bind=e._bind,t._staged={},t.options=e,t.root=e.root||t,t.store=e.store||t.root.store,e.root||(t._beforecreate=[],t._oncreate=[],t._aftercreate=[])}function y(t){for(;t&&t.length;)t.shift()()}var g={destroy:function(e){this.destroy=t,this.fire("destroy"),this.set=t,this._fragment.d(!1!==e),this._fragment=null,this._state={}},get:function(){return this._state},fire:function(t,e){var s=t in this._handlers&&this._handlers[t].slice();if(s)for(var i=0;i<s.length;i+=1){var n=s[i];if(!n.__calling)try{n.__calling=!0,n.call(this,e)}finally{n.__calling=!1}}},on:function(t,e){var s=this._handlers[t]||(this._handlers[t]=[]);return s.push(e),{cancel:function(){var t=s.indexOf(e);~t&&s.splice(t,1)}}},set:function(t){this._set(e({},t)),this.root._lock||p(this.root)},_recompute:t,_set:function(t){var s=this._state,i={},n=!1;for(var o in t=e(this._staged,t),this._staged={},t)this._differs(t[o],s[o])&&(i[o]=n=!0);n&&(this._state=e(e({},s),t),this._recompute(i,this._state),this._bind&&this._bind(i,this._state),this._fragment&&(this.fire("state",{changed:i,current:this._state,previous:s}),this._fragment.p(i,this._state),this.fire("update",{changed:i,current:this._state,previous:s})))},_stage:function(t){e(this._staged,t)},_mount:function(t,e){this._fragment[this._fragment.i?"i":"m"](t,e||null)},_differs:function(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}};var _=window.serverBase||"//maps.kosmosnimki.ru/";var q={getSections(t){var e={};t.forEach(function(t){var s=t.properties.SECTION;e[s]||(e[s]=[]),e[s].push(t)});var s=Object.keys(e).sort(()=>Math.random()>.5),i=s.length,n={};for(var t=0,o=i>10?10:i;t<o;t++){var i=s[t];n[i]=e[i]}this.set({sectionsList:n})},reBuildQuestions(t){var e=[],s=Object.keys(t),i=s.length;for(var n=0;n<10;n++){var n=t[s[Math.floor(i*Math.random())]],o=n.length;e.push(n[Math.floor(o*Math.random())])}this.set({questions:e,reBuildQuestions:!1})},getQuestion(t){let{layerID:e}=this.get();this.question=null;var s="gmx_id="+t.properties.gmx_id;fetch(_+"rest/ver1/layers/"+e+"/search?apikey=PBZU2XXPDM&query="+s,{mode:"cors"}).then(function(t){return t.json()}).then(function(t){this.question=t.features[0],this.needResult&&(this.showQuestionResult(),this.needResult=!1)}.bind(this)),this._clearLayers(),this.map.setZoom(3)},getLayerGame(t){fetch(_+"rest/ver1/layers/"+t+"/search?apikey=PBZU2XXPDM&columns=[{%22Value%22:%22[gmx_id]%22},{%22Value%22:%22[TITLE]%22},{%22Value%22:%22SECTION%22}]",{mode:"cors"}).then(function(t){return t.json()}).then(function(t){this.allData=t.features}.bind(this))},showQuestionResult(){let{emotions:t}=this.get(),e=this.question,s=L.geoJSON(e.geometry).getLayers(),i=L.GeometryUtil.closestLayer(this.map,s,this._latlng),n=L.GeometryUtil.closest(this.map,i.layer,this._latlng,!1),o=i.layer,r=o.getBounds().contains(this._latlng),a=L.geodesic([[n,this._latlng]],{color:"red"}).addTo(this.map);this.map.fitBounds(a.getBounds());var c=a.toGeoJSON().geometry;this.currentLayer=o.addTo(this.map),this.polyline=a;var u,l=L.gmxUtil.geoJSONGetLength(c),h=Math.round(l/1e3),m=L.gmxUtil.getGeoJSONSummary(c),d={};for(var e,s,i=0,n=t.emotion.length;i<n;i++){if((e=t.emotion[i]).error>h||i===n-1){var o=i===n-1?e:s||e;u={title:t.rank[o.rank],color:o.color,score:m};break}s=e}r?(u={title:"ВАУ, КРУТО!",score:""},this.audioStarted&&this.audio.stop(0),this.audioStart(11.74689342403628,3.82984126984127)):this.audioStart(8.50453514739229,.20950113378684806),d.question=e,d.len=r?0:l,d.strLen=r?"0":m,this.set({resultQuestion:d,emotion:u})},clickMap(t){this.marker&&this.map.removeLayer(this.marker),this._latlng=t.latlng,this.marker=L.marker(this._latlng,{icon:L.divIcon({className:"my-div-icon",iconSize:[4,4],iconAnchor:[10,10]})}).addTo(this.map),this.set({point:!0})},audioStart(t,e){if(this.sound){var s=new(window.AudioContext||window.webkitAudioContext),i=s.createBufferSource(),n=new XMLHttpRequest;n.open("GET","mp3/audio.mp3",!0),n.responseType="arraybuffer",n.onload=function(){s.decodeAudioData(n.response,function(n){i.buffer=n,i.start(s.currentTime+1,t,e),i.connect(s.destination)},function(t){console.log("Error with decoding audio data"+t.err)})},n.send()}},_clearLayers(){this.marker&&(this.map.removeLayer(this.marker),this.marker=null),this.polyline&&(this.map.removeLayer(this.polyline),this.polyline=null),this.currentLayer&&(this.map.removeLayer(this.currentLayer),this.currentLayer=null)},createMap(t){var e=t.state||{},s=(t.mapID,t.layerID||"F9728D94848F4163A19DF5B5A6BFDDF1"),i=(t.apiKey,e.map?e.map.position:{});this.sound=t.sound;var n=1==t.base?L.tileLayer("//tilessputnik.ru/{z}/{x}/{y}.png",{attribution:'<a href="http://maps.sputnik.ru">Спутник</a> © Ростелеком | © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',maxNativeZoom:18,maxZoom:21}):L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia29zbW9zbmlta2kiLCJhIjoiY2lvbW1tNXN0MDAwdnc4bHg5ZWw2YXJtYSJ9.ON9Ovi3fuHc5RAipmLb2EQ",{attribution:'&copy; <a href="//mapbox.com/">mapbox</a>',maxNativeZoom:18,maxZoom:21});var o=new L.Map("map",{attribution:'&copy; <a href="//scanex.ru/">scanex</a>',allWorld:!0,generalized:!1,layers:[n],center:new L.LatLng(i.y||26,i.x||83),zoom:i.z||7}).on("click",this.clickMap.bind(this),this);o.zoomControl.setPosition("bottomright"),s&&this.getLayerGame(s),this.quizList=!0,this.map=o}};function z({changed:t,current:e,previous:s}){t.selectQuiz&&e.selectQuiz?(this._clearLayers(),this.set({quizList:this.quizList})):t.layerID&&e.layerID?this.getSections(this.allData):t.question&&e.question?this.getQuestion(e.question):e.reBuildQuestions?this.reBuildQuestions(e.sectionsList):t.calc&&e.calc&&(this.question?this.showQuestionResult():this.needResult=!0)}function Q(n){var a,u;v(this,n),this._state=e({quizList:null,questions:null,permalink:null,map:null},n.data),this._intro=!!n.intro,this._handlers.state=[z],z.call(this,{changed:s({},this._state),current:this._state}),this._fragment=(this._state,{c(){(a=c("div")).id="map"},m(t,e){o(t,a,e),u=!0},p:t,i(t,e){u||this.m(t,e)},o:i,d(t){t&&r(a)}}),this.root._oncreate.push(()=>{(function(){let{urlParams:t}=this.get();this.createMap(t)}).call(this),this.fire("update",{changed:s({},this._state),current:this._state})}),n.target&&(this._fragment.c(),this._mount(n.target,n.anchor),p(this)),this._intro=!0}e(Q.prototype,g),e(Q.prototype,q);var b={checkSection(t,e){let{sectionsList:s}=this.get();s[t]=e,this.set({sectionsList:s})},start(){this.set({reBuildQuestions:!0,quizList:null,layerID:"F9728D94848F4163A19DF5B5A6BFDDF1"}),this.nextQuestion(0,!0)},nextQuestion(t,e){let{questions:s,props:i,score:n,currentScore:o}=this.get(),r=s.shift();e&&(o=[]),this.set({questions:s,question:r,point:!1,calc:!1,resultQuestion:!1,currentScore:o})}};function S({changed:t,current:e,previous:s}){if(t.resultQuestion&&e.resultQuestion){let{currentScore:t}=this.get();t.push(e.resultQuestion),this.set({currentScore:t})}}function k(t,e){var s;return{c(){(s=c("div")).className="scrim svelte-yzh5fj"},m(t,e){o(t,s,e)},d(t){t&&r(s)}}}function j(t,e){var s;function i(e){t.set({question:""})}return{c(){(s=c("button")).textContent="Начать игру заново",l(s,"click",i),s.className="start svelte-yzh5fj",s.disabled=e.isSectionsEmpty},m(t,e){o(t,s,e)},p(t,e){t.isSectionsEmpty&&(s.disabled=e.isSectionsEmpty)},d(t){t&&r(s),h(s,"click",i)}}}function I(e,s){var i;function n(t){e.nextQuestion()}return{c(){(i=c("button")).textContent="Следующий вопрос",l(i,"click",n),i.className="start svelte-yzh5fj"},m(t,e){o(t,i,e)},p:t,d(t){t&&r(i),h(i,"click",n)}}}function D(t,e){var s,i,a,l;return{c(){s=c("div"),i=u("Ваш итоговый результат: "),a=c("span"),l=u(e.currentItog),a.className="red svelte-yzh5fj",s.className="itog"},m(t,e){o(t,s,e),n(s,i),n(s,a),n(a,l)},p(t,e){t.currentItog&&m(l,e.currentItog)},d(t){t&&r(s)}}}function N(t,e){var s,i,a,l,h,d=e.it.question.properties.TITLE,f=e.it.strLen;return{c(){s=c("li"),i=u(d),a=u(": "),l=c("b"),h=u(f),s.className="svelte-yzh5fj"},m(t,e){o(t,s,e),n(s,i),n(s,a),n(s,l),n(l,h)},p(t,e){t.currentScore&&d!==(d=e.it.question.properties.TITLE)&&m(i,d),t.currentScore&&f!==(f=e.it.strLen)&&m(h,f)},d(t){t&&r(s)}}}function x(t,e){var s,i,l,h,f,p,v,y,g,_,L,q,z,Q,b,S,k=e.emotion.title,j=e.emotion.score;function x(t){return t.questions&&t.questions.length?I:D}for(var B=x(e),E=B(t,e),T=e.currentScore,w=[],G=0;G<T.length;G+=1)w[G]=N(0,P(e,T,G));return{c(){s=c("div"),i=c("span"),l=u(k),h=u("\r\n\t\t\t\t\t"),f=c("span"),p=u(j),v=u("\r\n\t\t\t\t"),E.c(),y=u("\r\n\t\t\t\t"),g=c("hr"),_=u("\r\n\t\t\t\t"),L=c("div"),q=c("ul");for(var t=0;t<w.length;t+=1)w[t].c();z=u("\r\n\t\t\t\t\t"),Q=c("hr"),b=u("\r\n\t\t\t\t\tОбщий результат: "),S=u(e.currentItog),i.className="emotionTitle",d(i,"color",e.emotion.color),f.className="emotionScore svelte-yzh5fj",s.className="emotion svelte-yzh5fj",L.className="question-result svelte-yzh5fj"},m(t,e){o(t,s,e),n(s,i),n(i,l),n(s,h),n(s,f),n(f,p),o(t,v,e),E.m(t,e),o(t,y,e),o(t,g,e),o(t,_,e),o(t,L,e),n(L,q);for(var r=0;r<w.length;r+=1)w[r].m(q,null);n(L,z),n(L,Q),n(L,b),n(L,S)},p(e,s){if(e.emotion&&k!==(k=s.emotion.title)&&m(l,k),e.emotion&&d(i,"color",s.emotion.color),e.emotion&&j!==(j=s.emotion.score)&&m(p,j),B===(B=x(s))&&E?E.p(e,s):(E.d(1),(E=B(t,s)).c(),E.m(y.parentNode,y)),e.currentScore){T=s.currentScore;for(var n=0;n<T.length;n+=1){var t=P(s,T,n);w[n]?w[n].p(e,t):(w[n]=N(0,t),w[n].c(),w[n].m(q,null))}for(;n<w.length;n+=1)w[n].d(1);w.length=T.length}e.currentItog&&m(S,s.currentItog)},d(t){t&&(r(s),r(v)),E.d(t),t&&(r(y),r(g),r(_),r(L)),a(w,t)}}}function B(e,s){var i,n,a;function m(t){e.set({calc:!0})}return{c(){(i=c("p")).textContent="Вы уверены?",n=u("\r\n\t\t\t"),(a=c("button")).textContent="Подтвердить выбор",i.className="standart svelte-yzh5fj",l(a,"click",m),a.className="start svelte-yzh5fj"},m(t,e){o(t,i,e),o(t,n,e),o(t,a,e)},p:t,d(t){t&&(r(i),r(n),r(a)),h(a,"click",m)}}}function E(e,s){var i;return{c(){(i=c("p")).textContent="Кликните по карте в предпологаемом месте расположения объекта",i.className="standart svelte-yzh5fj"},m(t,e){o(t,i,e)},p:t,d(t){t&&r(i)}}}function T(t,e){var s,i,a,d=e.it;return{c(){var n,o;s=c("li"),i=c("input"),a=u(d),i._svelte={component:t,ctx:e},l(i,"change",J),n="type",o="checkbox",i.setAttribute(n,o),i.checked=!0},m(t,e){o(t,s,e),n(s,i),n(s,a)},p(t,s){e=s,i._svelte.ctx=e,(t.Object||t.sectionsList)&&d!==(d=e.it)&&m(a,d)},d(t){t&&r(s),h(i,"change",J)}}}function w(t,e){for(var s,i,n,m,d,f=e.Object.keys(e.sectionsList),p=[],v=0;v<f.length;v+=1)p[v]=T(t,A(e,f,v));function y(e){t.start()}return{c(){(s=c("h1")).textContent="Рубрики",i=u("\r\n\t\t\t"),n=c("ul");for(var t=0;t<p.length;t+=1)p[t].c();m=u("\r\n\t\t\t"),(d=c("button")).textContent="Начать игру",s.className="section",n.className="selectSectionsList svelte-yzh5fj",l(d,"click",y),d.className="start svelte-yzh5fj",d.disabled=e.isSectionsEmpty},m(t,e){o(t,s,e),o(t,i,e),o(t,n,e);for(var r=0;r<p.length;r+=1)p[r].m(n,null);o(t,m,e),o(t,d,e)},p(e,s){if(e.Object||e.sectionsList){f=s.Object.keys(s.sectionsList);for(var i=0;i<f.length;i+=1){var o=A(s,f,i);p[i]?p[i].p(e,o):(p[i]=T(t,o),p[i].c(),p[i].m(n,null))}for(;i<p.length;i+=1)p[i].d(1);p.length=f.length}e.isSectionsEmpty&&(d.disabled=s.isSectionsEmpty)},d(t){t&&(r(s),r(i),r(n)),a(p,t),t&&(r(m),r(d)),h(d,"click",y)}}}function G(e,s){var i;return{c(){(i=c("div")).innerHTML='<div class="lds-ellipsis svelte-yzh5fj"><div class="svelte-yzh5fj"></div><div class="svelte-yzh5fj"></div><div class="svelte-yzh5fj"></div><div class="svelte-yzh5fj"></div></div>',i.className="center svelte-yzh5fj"},m(t,e){o(t,i,e)},p:t,d(t){t&&r(i)}}}function O(t,e){var s,i,n,a,m;function d(e){t.set({quizList:null,layerID:"F9728D94848F4163A19DF5B5A6BFDDF1"})}return{c(){(s=c("h1")).textContent="Добро пожаловать!",i=u("\r\n\t\t"),(n=c("p")).textContent="Мы рады приветствовать вас в нашем интерактивном географическом квесте!\r\n\tВ этой игре мы предлагаем выбрать рубрики, в рамках воторых вам предстоит находить места на карте, зная только их названия. Думаете просто?",a=u("\r\n\t\t"),(m=c("button")).textContent="Давайте проверим!",s.className="title",l(m,"click",d),m.className="start svelte-yzh5fj",m.disabled=e.isSectionsEmpty},m(t,e){o(t,s,e),o(t,i,e),o(t,n,e),o(t,a,e),o(t,m,e)},p(t,e){t.isSectionsEmpty&&(m.disabled=e.isSectionsEmpty)},d(t){t&&(r(s),r(i),r(n),r(a),r(m)),h(m,"click",d)}}}function C(t,e){var s,i,a,l=e.question?e.question.properties.TITLE+" ("+e.question.properties.SECTION+")":"";function h(t){return t.resultQuestion?x:t.point?B:E}var d=h(e),f=d(t,e);return{c(){s=c("div"),i=u(l),a=u("?\r\n\t\t\t"),f.c(),s.className="question svelte-yzh5fj"},m(t,e){o(t,s,e),n(s,i),n(s,a),f.m(s,null)},p(e,n){e.question&&l!==(l=n.question?n.question.properties.TITLE+" ("+n.question.properties.SECTION+")":"")&&m(i,l),d===(d=h(n))&&f?f.p(e,n):(f.d(1),(f=d(t,n)).c(),f.m(s,null))},d(t){t&&r(s),f.d()}}}function M(e,s){var i;return{c(){(i=c("div")).innerHTML='<div class="lds-ellipsis svelte-yzh5fj"><div class="svelte-yzh5fj"></div><div class="svelte-yzh5fj"></div><div class="svelte-yzh5fj"></div><div class="svelte-yzh5fj"></div></div>',i.className="center svelte-yzh5fj"},m(t,e){o(t,i,e)},p:t,d(t){t&&r(i)}}}function F(t,e){var s;function i(t){return t.sectionsList?w:G}var n=i(e),a=n(t,e);return{c(){s=c("div"),a.c(),s.className="subcontent"},m(t,e){o(t,s,e),a.m(s,null)},p(e,o){n===(n=i(o))&&a?a.p(e,o):(a.d(1),(a=n(t,o)).c(),a.m(s,null))},d(t){t&&r(s),a.d()}}}function P(t,e,s){var i=Object.create(t);return i.it=e[s],i.each_value=e,i.it_index=s,i}function A(t,e,s){var i=Object.create(t);return i.it=e[s],i.each_value_1=e,i.it_index_1=s,i}function J(t){const{component:e,ctx:s}=this._svelte;e.checkSection(s.it,this.checked)}function R(t){v(this,t),this._state=e(e({Object:Object},{urlParams:{},quizList:[],selectQuiz:null,sectionsList:null,layerID:"",questions:!1,question:!1,point:!1,calc:!1,emotion:!1,emotions:emotions,resultQuestion:!1,reBuildQuestions:!1,currentScore:[],score:null}),t.data),this._recompute({currentScore:1,sectionsList:1},this._state),this._intro=!!t.intro,this._handlers.state=[S],S.call(this,{changed:s({},this._state),current:this._state}),this._fragment=function(t,e){var s,i,a,l,h,m,d,f={},p={urlParams:e.urlParams};void 0!==e.selectQuiz&&(p.selectQuiz=e.selectQuiz,f.selectQuiz=!0),void 0!==e.sectionsList&&(p.sectionsList=e.sectionsList,f.sectionsList=!0),void 0!==e.quizList&&(p.quizList=e.quizList,f.quizList=!0),void 0!==e.layerID&&(p.layerID=e.layerID,f.layerID=!0),void 0!==e.layerGame&&(p.layerGame=e.layerGame,f.layerGame=!0),void 0!==e.score&&(p.score=e.score,f.score=!0),void 0!==e.questions&&(p.questions=e.questions,f.questions=!0),void 0!==e.question&&(p.question=e.question,f.question=!0),void 0!==e.point&&(p.point=e.point,f.point=!0),void 0!==e.calc&&(p.calc=e.calc,f.calc=!0),void 0!==e.emotion&&(p.emotion=e.emotion,f.emotion=!0),void 0!==e.emotions&&(p.emotions=e.emotions,f.emotions=!0),void 0!==e.resultQuestion&&(p.resultQuestion=e.resultQuestion,f.resultQuestion=!0),void 0!==e.reBuildQuestions&&(p.reBuildQuestions=e.reBuildQuestions,f.reBuildQuestions=!0);var v=new Q({root:t.root,store:t.store,data:p,_bind(e,s){var i={};!f.selectQuiz&&e.selectQuiz&&(i.selectQuiz=s.selectQuiz),!f.sectionsList&&e.sectionsList&&(i.sectionsList=s.sectionsList),!f.quizList&&e.quizList&&(i.quizList=s.quizList),!f.layerID&&e.layerID&&(i.layerID=s.layerID),!f.layerGame&&e.layerGame&&(i.layerGame=s.layerGame),!f.score&&e.score&&(i.score=s.score),!f.questions&&e.questions&&(i.questions=s.questions),!f.question&&e.question&&(i.question=s.question),!f.point&&e.point&&(i.point=s.point),!f.calc&&e.calc&&(i.calc=s.calc),!f.emotion&&e.emotion&&(i.emotion=s.emotion),!f.emotions&&e.emotions&&(i.emotions=s.emotions),!f.resultQuestion&&e.resultQuestion&&(i.resultQuestion=s.resultQuestion),!f.reBuildQuestions&&e.reBuildQuestions&&(i.reBuildQuestions=s.reBuildQuestions),t._set(i),f={}}});t.root._beforecreate.push(()=>{v._bind({selectQuiz:1,sectionsList:1,quizList:1,layerID:1,layerGame:1,score:1,questions:1,question:1,point:1,calc:1,emotion:1,emotions:1,resultQuestion:1,reBuildQuestions:1},v.get())});var y=!e.question&&k(),g=e.question&&j(t,e);function _(t){return t.quizList?O:t.question?C:t.layerID?F:M}var L=_(e),q=L(t,e);return{c(){v._fragment.c(),s=u("\r\n"),y&&y.c(),i=u("\r\n"),a=c("div"),l=c("div"),g&&g.c(),h=u("\r\n\t"),m=c("div"),q.c(),l.className="title bg svelte-yzh5fj",m.className="content svelte-yzh5fj",a.className="controls svelte-yzh5fj"},m(t,e){v._mount(t,e),o(t,s,e),y&&y.m(t,e),o(t,i,e),o(t,a,e),n(a,l),g&&g.m(l,null),n(a,h),n(a,m),q.m(m,null),d=!0},p(s,n){e=n;var o={};s.urlParams&&(o.urlParams=e.urlParams),!f.selectQuiz&&s.selectQuiz&&(o.selectQuiz=e.selectQuiz,f.selectQuiz=void 0!==e.selectQuiz),!f.sectionsList&&s.sectionsList&&(o.sectionsList=e.sectionsList,f.sectionsList=void 0!==e.sectionsList),!f.quizList&&s.quizList&&(o.quizList=e.quizList,f.quizList=void 0!==e.quizList),!f.layerID&&s.layerID&&(o.layerID=e.layerID,f.layerID=void 0!==e.layerID),!f.layerGame&&s.layerGame&&(o.layerGame=e.layerGame,f.layerGame=void 0!==e.layerGame),!f.score&&s.score&&(o.score=e.score,f.score=void 0!==e.score),!f.questions&&s.questions&&(o.questions=e.questions,f.questions=void 0!==e.questions),!f.question&&s.question&&(o.question=e.question,f.question=void 0!==e.question),!f.point&&s.point&&(o.point=e.point,f.point=void 0!==e.point),!f.calc&&s.calc&&(o.calc=e.calc,f.calc=void 0!==e.calc),!f.emotion&&s.emotion&&(o.emotion=e.emotion,f.emotion=void 0!==e.emotion),!f.emotions&&s.emotions&&(o.emotions=e.emotions,f.emotions=void 0!==e.emotions),!f.resultQuestion&&s.resultQuestion&&(o.resultQuestion=e.resultQuestion,f.resultQuestion=void 0!==e.resultQuestion),!f.reBuildQuestions&&s.reBuildQuestions&&(o.reBuildQuestions=e.reBuildQuestions,f.reBuildQuestions=void 0!==e.reBuildQuestions),v._set(o),f={},e.question?y&&(y.d(1),y=null):y||((y=k()).c(),y.m(i.parentNode,i)),e.question?g?g.p(s,e):((g=j(t,e)).c(),g.m(l,null)):g&&(g.d(1),g=null),L===(L=_(e))&&q?q.p(s,e):(q.d(1),(q=L(t,e)).c(),q.m(m,null))},i(t,e){d||this.m(t,e)},o(t){d&&(v&&v._fragment.o(t),d=!1)},d(t){v.destroy(t),t&&r(s),y&&y.d(t),t&&(r(i),r(a)),g&&g.d(),q.d()}}}(this,this._state),this.root._oncreate.push(()=>{this.fire("update",{changed:s({},this._state),current:this._state})}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),p(this)),this._intro=!0}e(R.prototype,g),e(R.prototype,b),R.prototype._recompute=function(t,e){t.currentScore&&this._differs(e.currentItog,e.currentItog=function({currentScore:t}){return L.gmxUtil.prettifyDistance(t.reduce((t,e)=>t+e.len,0))}(e))&&(t.currentItog=!0),t.sectionsList&&this._differs(e.isSectionsEmpty,e.isSectionsEmpty=function({sectionsList:t}){var e=!1;if(t){e=!0;for(var s in t)if(t[s]){e=!1;break}}return e}(e))&&(t.isSectionsEmpty=!0)};var Z=(()=>{var t={};return location.search.substr(1).split("&").forEach(e=>{var s=e.split("=");t[s[0]]=s[1]}),t})();return new R({target:document.body,data:{urlParams:Z,name:"world"}})}();
//# sourceMappingURL=bundle.js.map
