var app=function(){"use strict";function t(){}function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t,e){for(var i in e)t[i]=1;return t}function n(t){t()}function s(t,e){t.appendChild(e)}function o(t,e,i){t.insertBefore(e,i)}function r(t){t.parentNode.removeChild(t)}function c(t,e){for(var i=0;i<t.length;i+=1)t[i]&&t[i].d(e)}function u(t){return document.createElement(t)}function a(t){return document.createTextNode(t)}function l(t,e,i){t.addEventListener(e,i,!1)}function h(t,e,i){t.removeEventListener(e,i,!1)}function f(t,e){t.data=""+e}function d(t,e,i){t.style.setProperty(e,i)}function m(){return Object.create(null)}function v(t){t._lock=!0,y(t._beforecreate),y(t._oncreate),y(t._aftercreate),t._lock=!1}function p(t,e){t._handlers=m(),t._slots=m(),t._bind=e._bind,t._staged={},t.options=e,t.root=e.root||t,t.store=e.store||t.root.store,e.root||(t._beforecreate=[],t._oncreate=[],t._aftercreate=[])}function y(t){for(;t&&t.length;)t.shift()()}var g,_={destroy:function(e){this.destroy=t,this.fire("destroy"),this.set=t,this._fragment.d(!1!==e),this._fragment=null,this._state={}},get:function(){return this._state},fire:function(t,e){var i=t in this._handlers&&this._handlers[t].slice();if(i)for(var n=0;n<i.length;n+=1){var s=i[n];if(!s.__calling)try{s.__calling=!0,s.call(this,e)}finally{s.__calling=!1}}},on:function(t,e){var i=this._handlers[t]||(this._handlers[t]=[]);return i.push(e),{cancel:function(){var t=i.indexOf(e);~t&&i.splice(t,1)}}},set:function(t){this._set(e({},t)),this.root._lock||v(this.root)},_recompute:t,_set:function(t){var i=this._state,n={},s=!1;for(var o in t=e(this._staged,t),this._staged={},t)this._differs(t[o],i[o])&&(n[o]=s=!0);s&&(this._state=e(e({},i),t),this._recompute(n,this._state),this._bind&&this._bind(n,this._state),this._fragment&&(this.fire("state",{changed:n,current:this._state,previous:i}),this._fragment.p(n,this._state),this.fire("update",{changed:n,current:this._state,previous:i})))},_stage:function(t){e(this._staged,t)},_mount:function(t,e){this._fragment[this._fragment.i?"i":"m"](t,e||null)},_differs:function(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}},q=window.serverBase||"//maps.kosmosnimki.ru/",z=(g={},location.search.substr(1).split("&").forEach(function(t){var e=t.split("=");g[e[0]]=e[1]}),g);var Q={getSections:function(t){var e={};t.forEach(function(t){var i=t.properties.SECTION;e[i]||(e[i]=[]),e[i].push(t)});for(var i=Object.keys(e).sort(function(){return Math.random()>.5}),n=i.length,s={},o=0,r=n>10?10:n;o<r;o++){var c=i[o];s[c]=e[c]}this.set({sectionsList:s})},reBuildQuestions:function(t){for(var e=[],i=Object.keys(t),n=i.length,s=0;s<10;s++){var o=t[i[Math.floor(n*Math.random())]],r=o.length;e.push(o[Math.floor(r*Math.random())])}this.set({questions:e,reBuildQuestions:!1})},getQuestion:function(t){var e=this.get().layerID;this.question=null;var i="gmx_id="+t.properties.gmx_id;fetch(q+"rest/ver1/layers/"+e+"/search?sw=1&apikey=PBZU2XXPDM&query="+i,{mode:"cors",credentials:"include"}).then(function(t){return t.json()}).then(function(t){this.question=t.features[0],this.needResult&&(this.showQuestionResult(),this.needResult=!1)}.bind(this)),this._clearLayers(),this.map.setZoom(3)},getLayerGame:function(t){fetch(q+"rest/ver1/layers/"+t+"/search?apikey=PBZU2XXPDM&columns=[{%22Value%22:%22[gmx_id]%22},{%22Value%22:%22[TITLE]%22},{%22Value%22:%22SECTION%22}]",{mode:"cors",credentials:"include"}).then(function(t){return t.json()}).then(function(t){this.allData=t.features,this.getSections(this.allData)}.bind(this))},showQuestionResult:function(){var t=this.get().emotions,e=this.question,i=L.geoJSON(e.geometry).getLayers(),n=L.GeometryUtil.closestLayer(this.map,i,this._latlng),s=L.GeometryUtil.closest(this.map,n.layer,this._latlng,!1),o=n.layer,r=o.getBounds().contains(this._latlng),c=L.geodesic([[s,this._latlng]],{color:"red"}).addTo(this.map);this.map.fitBounds(c.getBounds());var u=c.toGeoJSON().geometry;this.currentLayer=o.addTo(this.map),this.polyline=c;for(var a,l,h,f=L.gmxUtil.geoJSONGetLength(u),d=Math.round(f/1e3),m=L.gmxUtil.getGeoJSONSummary(u),v={},p=0,y=t.emotion.length;p<y;p++){if((l=t.emotion[p]).error>d||p===y-1){var g=p===y-1?l:h||l;a={title:t.rank[g.rank],color:g.color,score:m};break}h=l}r?(a={title:"ВАУ, КРУТО!",score:""},this.audioStarted&&this.audio.stop(0),this.audioStart(11.74689342403628,3.82984126984127)):this.audioStart(8.50453514739229,.20950113378684806),v.question=e,v.len=r?0:f,v.strLen=r?"0":m,this.set({resultQuestion:v,emotion:a})},clickMap:function(t){this.marker&&this.map.removeLayer(this.marker),this._latlng=t.latlng,this.marker=L.marker(this._latlng,{icon:L.divIcon({className:"my-div-icon",iconSize:[4,4],iconAnchor:[10,10]})}).addTo(this.map),this.set({point:!0})},audioStart:function(t,e){this.sound&&fetch("mp3/audio.mp3",{mode:"cors",credentials:"include"}).then(function(t){return t.arrayBuffer()}).then(function(i){var n=new(window.AudioContext||window.webkitAudioContext);n.decodeAudioData(i,function(i){var s=n.createBufferSource();s.buffer=i,s.start(n.currentTime+1,t,e),s.connect(n.destination)},function(t){console.log("Error with decoding audio data"+t.err)})}.bind(this))},_clearLayers:function(){this.marker&&(this.map.removeLayer(this.marker),this.marker=null),this.polyline&&(this.map.removeLayer(this.polyline),this.polyline=null),this.currentLayer&&(this.map.removeLayer(this.currentLayer),this.currentLayer=null)},createMap:function(){var t=z,e=t.state||{},i=t.layerID||"F9728D94848F4163A19DF5B5A6BFDDF1",n=t.apiKey||"PBZU2XXPDM",s=e.map?e.map.position:{};this.sound=t.sound&&(window.AudioContext||window.webkitAudioContext);var o=1==t.base?L.tileLayer("//tilessputnik.ru/{z}/{x}/{y}.png",{attribution:'<a href="http://maps.sputnik.ru">Спутник</a> © Ростелеком | © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',maxNativeZoom:18,maxZoom:21}):L.tileLayer("//maps.kosmosnimki.ru/TileSender.ashx?sw=1&ModeKey=tile&ftc=osm&srs=3857&z={z}&x={x}&y={y}&LayerName=C9458F2DCB754CEEACC54216C7D1EB0A&apiKey="+n,{maxNativeZoom:18,maxZoom:21}),r=new L.Map("map",{attribution:'&copy; <a href="//scanex.ru/">scanex</a>',allWorld:!0,generalized:!1,layers:[o],center:new L.LatLng(s.y||26,s.x||83),zoom:s.z||7}).on("click",this.clickMap.bind(this),this);r.zoomControl.setPosition("bottomright"),i&&this.getLayerGame(i),this.quizList=!0,this.map=r}};function b(t){var e=t.changed,i=t.current;t.previous;e.selectQuiz&&i.selectQuiz?(this._clearLayers(),this.set({quizList:this.quizList})):e.layerID&&i.layerID?this.getSections(this.allData):e.question&&i.question?this.getQuestion(i.question):i.reBuildQuestions?this.reBuildQuestions(i.sectionsList):e.calc&&i.calc&&(this.question?this.showQuestionResult():this.needResult=!0)}function S(s){var c,a,l=this;p(this,s),this._state=e({quizList:null,sectionsList:null,questions:null,permalink:null,map:null},s.data),this._intro=!!s.intro,this._handlers.state=[b],b.call(this,{changed:i({},this._state),current:this._state}),this._fragment=(this._state,{c:function(){(c=u("div")).id="map"},m:function(t,e){o(t,c,e),a=!0},p:t,i:function(t,e){a||this.m(t,e)},o:n,d:function(t){t&&r(c)}}),this.root._oncreate.push(function(){(function(){var t=this.get().urlParams;this.createMap(t)}).call(l),l.fire("update",{changed:i({},l._state),current:l._state})}),s.target&&(this._fragment.c(),this._mount(s.target,s.anchor),v(this)),this._intro=!0}e(S.prototype,_),e(S.prototype,Q);function k(t){var e=t.changed,i=t.current;t.previous;if(e.resultQuestion&&i.resultQuestion){var n=this.get().currentScore;n.push(i.resultQuestion),this.set({currentScore:n})}}function j(t,e){var i;return{c:function(){(i=u("div")).className="scrim svelte-yzh5fj"},m:function(t,e){o(t,i,e)},d:function(t){t&&r(i)}}}function D(t,e){var i;function n(e){t.set({question:""})}return{c:function(){(i=u("button")).textContent="Начать игру заново",l(i,"click",n),i.className="start svelte-yzh5fj",i.disabled=e.isSectionsEmpty},m:function(t,e){o(t,i,e)},p:function(t,e){t.isSectionsEmpty&&(i.disabled=e.isSectionsEmpty)},d:function(t){t&&r(i),h(i,"click",n)}}}function x(t,e){var i;function n(e){t.set({quizList:null,layerID:"F9728D94848F4163A19DF5B5A6BFDDF1"})}return{c:function(){(i=u("button")).textContent="Давайте проверим!",l(i,"click",n),i.className="start svelte-yzh5fj",i.disabled=e.isSectionsEmpty},m:function(t,e){o(t,i,e)},p:function(t,e){t.isSectionsEmpty&&(i.disabled=e.isSectionsEmpty)},d:function(t){t&&r(i),h(i,"click",n)}}}function I(e,i){var n;function s(t){e.nextQuestion()}return{c:function(){(n=u("button")).textContent="Следующий вопрос",l(n,"click",s),n.className="start svelte-yzh5fj"},m:function(t,e){o(t,n,e)},p:t,d:function(t){t&&r(n),h(n,"click",s)}}}function N(t,e){var i,n,c,l;return{c:function(){i=u("div"),n=a("Ваш итоговый результат: "),c=u("span"),l=a(e.currentItog),c.className="red svelte-yzh5fj",i.className="itog"},m:function(t,e){o(t,i,e),s(i,n),s(i,c),s(c,l)},p:function(t,e){t.currentItog&&f(l,e.currentItog)},d:function(t){t&&r(i)}}}function B(t,e){var i,n,c,l,h,d=e.it.question.properties.TITLE,m=e.it.strLen;return{c:function(){i=u("li"),n=a(d),c=a(": "),l=u("b"),h=a(m),i.className="svelte-yzh5fj"},m:function(t,e){o(t,i,e),s(i,n),s(i,c),s(i,l),s(l,h)},p:function(t,e){t.currentScore&&d!==(d=e.it.question.properties.TITLE)&&f(n,d),t.currentScore&&m!==(m=e.it.strLen)&&f(h,m)},d:function(t){t&&r(i)}}}function E(t,e){var i,n,l,h,m,v,p,y,g,_,L,q,z,Q,b,S,k=e.emotion.title,j=e.emotion.score;function D(t){return t.questions&&t.questions.length?I:N}for(var x=D(e),E=x(t,e),C=e.currentScore,w=[],T=0;T<C.length;T+=1)w[T]=B(0,U(e,C,T));return{c:function(){i=u("div"),n=u("span"),l=a(k),h=a("\r\n\t\t\t\t\t"),m=u("span"),v=a(j),p=a("\r\n\t\t\t\t"),E.c(),y=a("\r\n\t\t\t\t"),g=u("hr"),_=a("\r\n\t\t\t\t"),L=u("div"),q=u("ul");for(var t=0;t<w.length;t+=1)w[t].c();z=a("\r\n\t\t\t\t\t"),Q=u("hr"),b=a("\r\n\t\t\t\t\tОбщий результат: "),S=a(e.currentItog),n.className="emotionTitle",d(n,"color",e.emotion.color),m.className="emotionScore svelte-yzh5fj",i.className="emotion svelte-yzh5fj",L.className="question-result svelte-yzh5fj"},m:function(t,e){o(t,i,e),s(i,n),s(n,l),s(i,h),s(i,m),s(m,v),o(t,p,e),E.m(t,e),o(t,y,e),o(t,g,e),o(t,_,e),o(t,L,e),s(L,q);for(var r=0;r<w.length;r+=1)w[r].m(q,null);s(L,z),s(L,Q),s(L,b),s(L,S)},p:function(e,i){if(e.emotion&&k!==(k=i.emotion.title)&&f(l,k),e.emotion&&d(n,"color",i.emotion.color),e.emotion&&j!==(j=i.emotion.score)&&f(v,j),x===(x=D(i))&&E?E.p(e,i):(E.d(1),(E=x(t,i)).c(),E.m(y.parentNode,y)),e.currentScore){C=i.currentScore;for(var s=0;s<C.length;s+=1){var o=U(i,C,s);w[s]?w[s].p(e,o):(w[s]=B(0,o),w[s].c(),w[s].m(q,null))}for(;s<w.length;s+=1)w[s].d(1);w.length=C.length}e.currentItog&&f(S,i.currentItog)},d:function(t){t&&(r(i),r(p)),E.d(t),t&&(r(y),r(g),r(_),r(L)),c(w,t)}}}function C(e,i){var n,s,c;function f(t){e.set({calc:!0})}return{c:function(){(n=u("p")).textContent="Вы уверены?",s=a("\r\n\t\t\t"),(c=u("button")).textContent="Подтвердить выбор",n.className="standart svelte-yzh5fj",l(c,"click",f),c.className="start svelte-yzh5fj"},m:function(t,e){o(t,n,e),o(t,s,e),o(t,c,e)},p:t,d:function(t){t&&(r(n),r(s),r(c)),h(c,"click",f)}}}function w(e,i){var n;return{c:function(){(n=u("p")).textContent="Кликните по карте в предпологаемом месте расположения объекта",n.className="standart svelte-yzh5fj"},m:function(t,e){o(t,n,e)},p:t,d:function(t){t&&r(n)}}}function T(t,e){var i,n,c,d=e.it;return{c:function(){var s,o;i=u("li"),n=u("input"),c=a(d),n._svelte={component:t,ctx:e},l(n,"change",R),s="type",o="checkbox",n.setAttribute(s,o),n.checked=!0},m:function(t,e){o(t,i,e),s(i,n),s(i,c)},p:function(t,i){e=i,n._svelte.ctx=e,(t.Object||t.sectionsList)&&d!==(d=e.it)&&f(c,d)},d:function(t){t&&r(i),h(n,"change",R)}}}function G(t,e){for(var i,n,s,f,d,m=e.Object.keys(e.sectionsList),v=[],p=0;p<m.length;p+=1)v[p]=T(t,Z(e,m,p));function y(e){t.start()}return{c:function(){(i=u("h1")).textContent="Рубрики",n=a("\r\n\t\t\t"),s=u("ul");for(var t=0;t<v.length;t+=1)v[t].c();f=a("\r\n\t\t\t"),(d=u("button")).textContent="Начать игру",i.className="section",s.className="selectSectionsList svelte-yzh5fj",l(d,"click",y),d.className="start svelte-yzh5fj",d.disabled=e.isSectionsEmpty},m:function(t,e){o(t,i,e),o(t,n,e),o(t,s,e);for(var r=0;r<v.length;r+=1)v[r].m(s,null);o(t,f,e),o(t,d,e)},p:function(e,i){if(e.Object||e.sectionsList){m=i.Object.keys(i.sectionsList);for(var n=0;n<m.length;n+=1){var o=Z(i,m,n);v[n]?v[n].p(e,o):(v[n]=T(t,o),v[n].c(),v[n].m(s,null))}for(;n<v.length;n+=1)v[n].d(1);v.length=m.length}e.isSectionsEmpty&&(d.disabled=i.isSectionsEmpty)},d:function(t){t&&(r(i),r(n),r(s)),c(v,t),t&&(r(f),r(d)),h(d,"click",y)}}}function O(e,i){var n;return{c:function(){(n=u("div")).innerHTML='<div class="lds-ellipsis svelte-yzh5fj"><div class="svelte-yzh5fj"></div><div class="svelte-yzh5fj"></div><div class="svelte-yzh5fj"></div><div class="svelte-yzh5fj"></div></div>',n.className="center svelte-yzh5fj"},m:function(t,e){o(t,n,e)},p:t,d:function(t){t&&r(n)}}}function M(t,e){var i,n,s,c,l,h=!e.isSectionsEmpty&&x(t,e);return{c:function(){(i=u("h1")).textContent="Добро пожаловать!",n=a("\r\n\t\t"),(s=u("p")).textContent="Мы рады приветствовать вас в нашем интерактивном географическом квесте!\r\n\tВ этой игре мы предлагаем выбрать рубрики, в рамках воторых вам предстоит находить места на карте, зная только их названия. Думаете просто?",c=a("\r\n\t\t"),h&&h.c(),l=document.createComment(""),i.className="title"},m:function(t,e){o(t,i,e),o(t,n,e),o(t,s,e),o(t,c,e),h&&h.m(t,e),o(t,l,e)},p:function(e,i){i.isSectionsEmpty?h&&(h.d(1),h=null):h?h.p(e,i):((h=x(t,i)).c(),h.m(l.parentNode,l))},d:function(t){t&&(r(i),r(n),r(s),r(c)),h&&h.d(t),t&&r(l)}}}function F(t,e){var i,n,c,l=e.question?e.question.properties.TITLE+" ("+e.question.properties.SECTION+")":"";function h(t){return t.resultQuestion?E:t.point?C:w}var d=h(e),m=d(t,e);return{c:function(){i=u("div"),n=a(l),c=a("?\r\n\t\t\t"),m.c(),i.className="question svelte-yzh5fj"},m:function(t,e){o(t,i,e),s(i,n),s(i,c),m.m(i,null)},p:function(e,s){e.question&&l!==(l=s.question?s.question.properties.TITLE+" ("+s.question.properties.SECTION+")":"")&&f(n,l),d===(d=h(s))&&m?m.p(e,s):(m.d(1),(m=d(t,s)).c(),m.m(i,null))},d:function(t){t&&r(i),m.d()}}}function A(e,i){var n;return{c:function(){(n=u("div")).innerHTML='<div class="lds-ellipsis svelte-yzh5fj"><div class="svelte-yzh5fj"></div><div class="svelte-yzh5fj"></div><div class="svelte-yzh5fj"></div><div class="svelte-yzh5fj"></div></div>',n.className="center svelte-yzh5fj"},m:function(t,e){o(t,n,e)},p:t,d:function(t){t&&r(n)}}}function P(t,e){var i;function n(t){return t.sectionsList?G:O}var s=n(e),c=s(t,e);return{c:function(){i=u("div"),c.c(),i.className="subcontent"},m:function(t,e){o(t,i,e),c.m(i,null)},p:function(e,o){s===(s=n(o))&&c?c.p(e,o):(c.d(1),(c=s(t,o)).c(),c.m(i,null))},d:function(t){t&&r(i),c.d()}}}function U(t,e,i){var n=Object.create(t);return n.it=e[i],n.each_value=e,n.it_index=i,n}function Z(t,e,i){var n=Object.create(t);return n.it=e[i],n.each_value_1=e,n.it_index_1=i,n}function R(t){var e=this._svelte,i=e.component,n=e.ctx;i.checkSection(n.it,this.checked)}function X(t){var n=this;p(this,t),this._state=e(e({Object:Object},{quizList:[],selectQuiz:null,sectionsList:{},layerID:"",questions:!1,question:!1,point:!1,calc:!1,emotion:!1,emotions:emotions,resultQuestion:!1,reBuildQuestions:!1,currentScore:[],score:null}),t.data),this._recompute({currentScore:1,sectionsList:1},this._state),this._intro=!!t.intro,this._handlers.state=[k],k.call(this,{changed:i({},this._state),current:this._state}),this._fragment=function(t,e){var i,n,c,l,h,f,d,m={},v={};void 0!==e.selectQuiz&&(v.selectQuiz=e.selectQuiz,m.selectQuiz=!0),void 0!==e.sectionsList&&(v.sectionsList=e.sectionsList,m.sectionsList=!0),void 0!==e.quizList&&(v.quizList=e.quizList,m.quizList=!0),void 0!==e.layerID&&(v.layerID=e.layerID,m.layerID=!0),void 0!==e.layerGame&&(v.layerGame=e.layerGame,m.layerGame=!0),void 0!==e.score&&(v.score=e.score,m.score=!0),void 0!==e.questions&&(v.questions=e.questions,m.questions=!0),void 0!==e.question&&(v.question=e.question,m.question=!0),void 0!==e.point&&(v.point=e.point,m.point=!0),void 0!==e.calc&&(v.calc=e.calc,m.calc=!0),void 0!==e.emotion&&(v.emotion=e.emotion,m.emotion=!0),void 0!==e.emotions&&(v.emotions=e.emotions,m.emotions=!0),void 0!==e.resultQuestion&&(v.resultQuestion=e.resultQuestion,m.resultQuestion=!0),void 0!==e.reBuildQuestions&&(v.reBuildQuestions=e.reBuildQuestions,m.reBuildQuestions=!0);var p=new S({root:t.root,store:t.store,data:v,_bind:function(e,i){var n={};!m.selectQuiz&&e.selectQuiz&&(n.selectQuiz=i.selectQuiz),!m.sectionsList&&e.sectionsList&&(n.sectionsList=i.sectionsList),!m.quizList&&e.quizList&&(n.quizList=i.quizList),!m.layerID&&e.layerID&&(n.layerID=i.layerID),!m.layerGame&&e.layerGame&&(n.layerGame=i.layerGame),!m.score&&e.score&&(n.score=i.score),!m.questions&&e.questions&&(n.questions=i.questions),!m.question&&e.question&&(n.question=i.question),!m.point&&e.point&&(n.point=i.point),!m.calc&&e.calc&&(n.calc=i.calc),!m.emotion&&e.emotion&&(n.emotion=i.emotion),!m.emotions&&e.emotions&&(n.emotions=i.emotions),!m.resultQuestion&&e.resultQuestion&&(n.resultQuestion=i.resultQuestion),!m.reBuildQuestions&&e.reBuildQuestions&&(n.reBuildQuestions=i.reBuildQuestions),t._set(n),m={}}});t.root._beforecreate.push(function(){p._bind({selectQuiz:1,sectionsList:1,quizList:1,layerID:1,layerGame:1,score:1,questions:1,question:1,point:1,calc:1,emotion:1,emotions:1,resultQuestion:1,reBuildQuestions:1},p.get())});var y=!e.question&&j(),g=e.question&&D(t,e);function _(t){return t.quizList?M:t.question?F:t.layerID?P:A}var L=_(e),q=L(t,e);return{c:function(){p._fragment.c(),i=a("\r\n"),y&&y.c(),n=a("\r\n"),c=u("div"),l=u("div"),g&&g.c(),h=a("\r\n\t"),f=u("div"),q.c(),l.className="title bg svelte-yzh5fj",f.className="content svelte-yzh5fj",c.className="controls svelte-yzh5fj"},m:function(t,e){p._mount(t,e),o(t,i,e),y&&y.m(t,e),o(t,n,e),o(t,c,e),s(c,l),g&&g.m(l,null),s(c,h),s(c,f),q.m(f,null),d=!0},p:function(i,s){e=s;var o={};!m.selectQuiz&&i.selectQuiz&&(o.selectQuiz=e.selectQuiz,m.selectQuiz=void 0!==e.selectQuiz),!m.sectionsList&&i.sectionsList&&(o.sectionsList=e.sectionsList,m.sectionsList=void 0!==e.sectionsList),!m.quizList&&i.quizList&&(o.quizList=e.quizList,m.quizList=void 0!==e.quizList),!m.layerID&&i.layerID&&(o.layerID=e.layerID,m.layerID=void 0!==e.layerID),!m.layerGame&&i.layerGame&&(o.layerGame=e.layerGame,m.layerGame=void 0!==e.layerGame),!m.score&&i.score&&(o.score=e.score,m.score=void 0!==e.score),!m.questions&&i.questions&&(o.questions=e.questions,m.questions=void 0!==e.questions),!m.question&&i.question&&(o.question=e.question,m.question=void 0!==e.question),!m.point&&i.point&&(o.point=e.point,m.point=void 0!==e.point),!m.calc&&i.calc&&(o.calc=e.calc,m.calc=void 0!==e.calc),!m.emotion&&i.emotion&&(o.emotion=e.emotion,m.emotion=void 0!==e.emotion),!m.emotions&&i.emotions&&(o.emotions=e.emotions,m.emotions=void 0!==e.emotions),!m.resultQuestion&&i.resultQuestion&&(o.resultQuestion=e.resultQuestion,m.resultQuestion=void 0!==e.resultQuestion),!m.reBuildQuestions&&i.reBuildQuestions&&(o.reBuildQuestions=e.reBuildQuestions,m.reBuildQuestions=void 0!==e.reBuildQuestions),p._set(o),m={},e.question?y&&(y.d(1),y=null):y||((y=j()).c(),y.m(n.parentNode,n)),e.question?g?g.p(i,e):((g=D(t,e)).c(),g.m(l,null)):g&&(g.d(1),g=null),L===(L=_(e))&&q?q.p(i,e):(q.d(1),(q=L(t,e)).c(),q.m(f,null))},i:function(t,e){d||this.m(t,e)},o:function(t){d&&(p&&p._fragment.o(t),d=!1)},d:function(t){p.destroy(t),t&&r(i),y&&y.d(t),t&&(r(n),r(c)),g&&g.d(),q.d()}}}(this,this._state),this.root._oncreate.push(function(){n.fire("update",{changed:i({},n._state),current:n._state})}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),v(this)),this._intro=!0}return e(X.prototype,_),e(X.prototype,{checkSection:function(t,e){var i=this.get().sectionsList;i[t]=e,this.set({sectionsList:i})},start:function(){this.set({reBuildQuestions:!0,quizList:null,layerID:"F9728D94848F4163A19DF5B5A6BFDDF1"}),this.nextQuestion(0,!0)},nextQuestion:function(t,e){var i=this.get(),n=i.questions,s=(i.props,i.score,i.currentScore),o=n.shift();e&&(s=[]),this.set({questions:n,question:o,point:!1,calc:!1,resultQuestion:!1,currentScore:s})}}),X.prototype._recompute=function(t,e){var i;t.currentScore&&this._differs(e.currentItog,e.currentItog=(i=e.currentScore,L.gmxUtil.prettifyDistance(i.reduce(function(t,e){return t+e.len},0))))&&(t.currentItog=!0),t.sectionsList&&this._differs(e.isSectionsEmpty,e.isSectionsEmpty=function(t){var e=t.sectionsList;return!(e&&Object.keys(e).length)}(e))&&(t.isSectionsEmpty=!0)},new X({target:document.body,data:{}})}();
//# sourceMappingURL=bundle.js.map
