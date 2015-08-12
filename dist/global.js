document.addEventListener("DOMContentLoaded",function(){(function(){var e=true,t=localStorage,n,r,s,a,o;r={maxPostReload:5,maxIndexPosts:10},slice=Array.prototype.slice;$=function(e,t){var n=typeof e==="string"?(t||document).querySelector(e):e||null;return n||document.createElement("div")};$$=function(e,t){return slice.call((t||document).querySelectorAll(e))};appendModal=function(e,t,n){n=n||"success";var r=$(".wrap-modal"),s=document.createElement("div");s.innerText=e;s.classList.add("modal");s.classList.add("modal-"+n);setTimeout(function(){s.classList.add("modal-show")},20);r.appendChild(s);setTimeout(function(){s.classList.remove("modal-show");setTimeout(function(){r.removeChild(s)},250)},t)};Element.prototype.addClass=function(e){_addClass=function(t){if(t.classList){t.classList.add(e)}else{t.className+=" "+e}};return _addClass(this)};Element.prototype.removeClass=function(e){_removeClass=function(t){if(t.classList){t.classList.remove(e)}else{t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")}};return _removeClass(this)};Element.prototype.hide=function(){_hide=function(e){e.style.display="none"};return _hide(this)};loader=function(e){_self=$("#loading");if(e){_self.style.opacity="1";_self.style.display="block"}else{_self.style.opacity="0";_self.style.display="none"}};jumpTo=function(e){theOffset=e.getBoundingClientRect();scrolltopfix=document.body.scrollTop||document.documentElement.scrollTop;window.scrollTo(0,theOffset.top+scrolltopfix-10)};log=function(t){if(e){console.log(t)}};markActiveLinklist=function(e){$$(".linklistloop a").forEach(function(t){if(t.getAttribute("data-kat")===e){t.addClass("cat--active");setTimeout(function(){jumpTo(t)},50)}else{t.removeClass("cat--active")}})};ajax=function(e,t,n,r,s){xmlxhr=new XMLHttpRequest;try{xmlxhr.onreadystatechange=function(){if(xmlxhr.readyState==4&&xmlxhr.status==200){o=s?JSON.parse(xmlxhr.responseText):xmlxhr.responseText;r(o)}};if(t==="POST"){xmlxhr.open(t,e);xmlxhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");xmlxhr.send(JSON.stringify(n))}else{xmlxhr.open(t,e);xmlxhr.send()}}catch(a){console.log("AJAX ERROR:"+a)}};checkRead=function(e,n){if(t.getItem(e)){n.addClass("is-viewed")}};router={routes:[],add:function(e,t){this.routes.push({re:e,func:t});return this},checker:function(e){for(var t in this.routes){var n=e.match(this.routes[t].re);if(n){n.shift();this.routes[t].func.apply({},n);return this}}loader(false);if($("#indexContainer")&&!e){this.parser("index","Die neuesten Beiträge",true)}},parser:function(e,t,n){$("#searchWrapper").style.display="none";markActiveLinklist(e);hashNice=e.charAt(0).toUpperCase()+e.slice(1,e.length);t=t||hashNice;loader(true);postList=$(".post--list");postContainer=$("#post--list__container");O=$("#page-heading");loadmoreButton=$("#loadmoreajax");loadmoreButton.style.display="none";O.addClass("opacity-0");O.textContent=t;postList.innerHTML="";postContainer.addClass("opacity-0");if(e==="suche"){postContainer.removeClass("opacity-0");searchRender();return}xhr=new XMLHttpRequest;xhr.onreadystatechange=function(t){if(xhr.readyState==4&&xhr.status==200){post=JSON.parse(xhr.responseText,"text/json");numCat=0;s=[];postLoopFinished=false;for(var a=0;a<post.length;a++){if(post[a].category===e||n||e==="alle"){if(numCat<r.maxIndexPosts){$(".post--list").innerHTML+=post[a].card;numCat++}s.push(post[a].card)}}$$(".post--list li").forEach(function(e,t){checkRead(e.getAttribute("data-read"),e)});loader(false);O.removeClass("opacity-0");postContainer.removeClass("opacity-0");if($$(".post--list li").length<r.maxIndexPosts){loadmoreButton.style.display="none"}else{loadmoreButton.style.display="block"}}};loadmoreButton.onclick=function(e){e.preventDefault();e.stopPropagation();postListLI=$$(".post--list li");if(n&&location.hash!="alle"){location.hash="alle"}var t=0;showDelay=function(e,t){setTimeout(function(){$$(".post--list li")[e].removeClass("displayNone")},t)};for(var a=0;a<r.maxPostReload;a++){$(".post--list").innerHTML+=s[numCat];$$(".post--list li")[numCat].addClass("displayNone");t+=100;showDelay(numCat,t);numCat++;if(!s[numCat]){loadmoreButton.style.display="none";return}}return};progressBar.style.display="block";progressBar.style.width="5%";xhr.addEventListener("progress",function(e){var t=$("#progressBar");if(e.lengthComputable){var n=Math.floor(e.loaded/e.total*100);t.style.width=n+"%";if(n===100){setTimeout(function(){t.style.display="none"},350)}}});xhr.open("GET",postJSONCache,true);xhr.send()}}})();var e=$("#SENDEN"),t=$("#form_msg"),n=$(".kontakt__form"),r=$("#loading"),s=$("#name"),a=$("#xyz"),o=$("#msg"),i=$$(".selectGlossboss input[name=glossboss]"),l={},c=$("#kontakt_inputs"),u="R61bXP70NEnJXC2c__cvgg";kontaktSubmit=function(){s.removeClass("form__error");a.removeClass("form__error");o.removeClass("form__error");e.style.visibility="hidden";t.innerHTML="";loader(1);[s,o,a].forEach(function(t){if(t.value===""){e.style.visibility="";t.addClass("form__error");appendModal("Unvollständige Angabe: "+t.placeholder,3e3,"error");loader(0)}});if(o.value&&s.value&&a.value){re=/\S+@\S+\.\S+/;if(!re.test(a.value)){appendModal("eMail Adresse ungültig!",2e3,"error");e.style.visibility="";loader(0);return}mail={key:u,message:{text:o.value,subject:"GLOSSBOSS Kontaktanfrage",from_email:a.value,from_name:s.value,to:[{email:l.Mail,name:l.Name,type:"to"}],headers:{"Reply-To":a.value}},async:false,ip_pool:"Main Pool"};ajax("https://mandrillapp.com/api/1.0/messages/send.json","POST",mail,function(t){loader(1);if(t[0].status==="sent"){e.style.visibility="hidden";appendModal("Danke für deine eMail! Wir werden so schnell wie möglich darauf antworten.",4500);loader(0)}else{appendModal("Es gab ein Problem mit unseren eMail-Server. Bitte versuch es später nochmal oder schreibe direkt an mail@glossboss.de",4e3,"error");loader(0)}},true)}};c.style.opacity=".3";e.disabled=true;i.forEach(function(t){t.addEventListener("change",function(t){c.style.opacity="1";e.disabled=false;l.Mail=$(".selectGlossboss input[name=glossboss]:checked").value;l.Name=$(".selectGlossboss input[name=glossboss]:checked").getAttribute("data-boss")})});e.addEventListener("click",function(e){e.preventDefault();kontaktSubmit()});var d=$("#linklist"),f=$$("#linklist a"),h=$("#toggleMenu"),p=window.innerHeight,m=window.innerWidth,g=$$(".post--content p img"),v=$(".hamburger li:nth-child(1)"),y=$(".hamburger li:nth-child(2)"),x=$(".hamburger li:nth-child(3)"),S="230px",b=$$(".post--list li"),C=$(".dellocalStorage"),w=$(".localStorageContainer"),k=$("#sharecounter"),T=$(".showCommentsContainer"),E=$("#eastereggNavbar"),L=$("#search_reset"),j=$(".open_search"),M=$("#header-style"),F=$(".scroll-top"),N=$(".post--sharing"),O=$(".page-heading"),_=false;if(N&&navigator.userAgent.match(/(iPhone)/g)){var H=$(".share--whatsapp");H.style.display="inline-block";H.href="WhatsApp://send?text="+document.title+": "+location.href}F.addEventListener("click",function(){jumpTo(d)});(function(e,t){if(t){var n;t.addEventListener("mouseup",function(){clearTimeout(n);return false});t.addEventListener("mousedown",function(){n=window.setTimeout(function(){$$(".post--list li").forEach(function(e){e.addClass("eastereggNavbar")})},2e3)})}if(e){augenkrebs=["#ff00ff","#00ffff","#00ff00","#ffff00","#ff0000","#0000ff","#7920FF","#FD0987","#FF3300","#FF6EC7","#00FF66","#4D4DFF","#67C8FF","#7BFB2D","#AAFF00","#FF00AA","#AA00FF","#FF7F00","#228DFF","#ff6d38","#f90000","#fd8b25","#25d7fb","#7920ff","#fe51c3","#ff9072","#ff63a2","#e3e641"];E.addEventListener("click",function(){setInterval(function(){$$("*").forEach(function(e){e.style.backgroundColor=augenkrebs[Math.floor(Math.random()*(augenkrebs.length+1))]})},150)})}})(E,O);(function(e){if(e){var t=["merc-8.jpg","1mcoupe.jpg","530dteamwork.jpg","965turbo.jpg","9914s1.jpg","997cabrio.jpg","991turbos.jpg","997grau.jpg","997rot.jpg","alfagtv.jpg","audir8.jpg","audis5.jpg","bmw2002.jpg","eosschwarz.jpg","golf7gtd.jpg","lotuselise.jpg","m3csl.jpg","shelby.jpg","mclaren.jpg"];random=Math.floor(Math.random()*(t.length-1));headerImagesUrl="https://glossbossimages.s3.eu-central-1.amazonaws.com/headerimg/"+t[random];M.innerHTML="header {background: "+headerGradient+", url("+headerImagesUrl+") center 50%; background-size:cover}"}})(randomHeader);(function(){if(location.href.indexOf("/preview/")!==-1){postContent=$(".post--content");postContent.hide();pw=prompt("Passwortgeschützter Bereich");if(pw!=="marvin"){alert("Falsches Passwort.")}else{postContent.style.display="block"}}})();T.addEventListener("click",function(){var e="glossboss";(function(){var t=document.createElement("script");t.type="text/javascript";t.async=true;t.src="//"+e+".disqus.com/embed.js";(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(t)})();T.style.display="none"});d.style.maxHeight=S;function R(){if(h.checked){d.style.maxHeight=S;x.addClass("hidden");v.addClass("rot45deg");y.addClass("rot-45deg")}else{d.style.maxHeight="0";x.removeClass("hidden");v.removeClass("rot45deg");y.removeClass("rot-45deg")}}function A(){content=$("#CONTENT");q=$("header");headerHeight=q.offsetHeight-5;scrolled=window.scrollY;content.style.margin=headerHeight+"px 0 0 0"}function B(){p=window.innerHeight;m=window.innerWidth;if(m>=750){d.style.maxHeight=S}else{R()}}B();f.forEach(function(e){anchor=e.getAttribute("href");e.setAttribute("href","/#"+anchor.slice(1,anchor.length));e.addEventListener("click",function(){h.click()})});searchRender=function(){(function(e){if(e){L.addEventListener("click",function(){$("#search-input").value="";$("#results-container").innerHTML=""})}})(L);$("#searchWrapper").style.display="block";SimpleJekyllSearch.init({searchInput:document.getElementById("search-input"),resultsContainer:document.getElementById("results-container"),dataSource:postJSONCache,searchResultTemplate:"{card}",noResultsText:'<li>Nichts passendes dabei. Hast du eine Idee für einen Artikel? <a style="text-align:center" href="mailto:mail@glossboss.de">Kontaktiere uns!</a></li>',limit:25,fuzzy:false});loader(false)};h.addEventListener("click",function(e){B()});window.addEventListener("resize",function(){B()});(function(e){if(e){try{xhr=new XMLHttpRequest;xhrSliced=new XMLHttpRequest;getSharesUrl="https://graph.facebook.com/"+window.location.href;getSharesUrlSliced=getSharesUrl.slice(0,getSharesUrl.length-1);sharesOutput="";var t=0;xhr.onreadystatechange=function(e){if(xhr.readyState==4&&xhr.status==200){getShares=JSON.parse(xhr.responseText)}};xhrSliced.onreadystatechange=function(e){if(xhrSliced.readyState==4&&xhrSliced.status==200){getSharesSliced=JSON.parse(xhrSliced.responseText)}};var n=setInterval(r,100);function r(){try{if(xhrSliced.readyState==4&&xhrSliced.status==200&&(xhr.readyState==4&&xhr.status==200)&&(getShares&&getSharesSliced)){sharesOutput="Sei der erste Glossboss der diesen Beitrag teilt!";t=(getSharesSliced.shares||0)+(getShares.shares||0);if(getSharesSliced.shares===getShares.shares)t/=2;if(t>1){sharesOutput=t+" Glossbosse haben diesen Beitrag bereits geteilt"}if(t==1){sharesOutput="Erst 1 Glossboss hat diesen Beitrag geteilt"}clearInterval(n);k.innerText=sharesOutput}}catch(e){console.log("Share Error: "+e)}}xhr.open("GET",getSharesUrl);xhr.send();xhrSliced.open("GET",getSharesUrlSliced);xhrSliced.send()}catch(s){console.error("Shares Error: "+s)}}})(k);WebFontConfig={google:{families:["Roboto::latin"]}};(function(){var e=document.createElement("script");e.src=("https:"==document.location.protocol?"https":"http")+"://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";e.type="text/javascript";e.async="true";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();var I=$("#mischungInput1"),J=$("#mischungInput2"),D=$("#mischungResult"),z=$("#mischung--highlight"),P=$$("#mischungsrechner input"),q=$("#mischung--heading"),G=$$(".mischungenpredefined");updateMischung=function(e){flascheVal=$('input[type="radio"]:checked');if(e){I.value=e.teil1;J.value=e.teil2}if(I.value&&J.value&&flascheVal.value){if(D.style.display!=="block")jumpTo(q);gesamt=parseInt(I.value)+parseInt(J.value);step=flascheVal.value/gesamt;result1=Math.round(step*I.value).toFixed(2);result2=Math.round(step*J.value).toFixed(2);result1Finish=result1.slice(0,result1.length-3);result2Finish=result2.slice(0,result2.length-3);D.style.display="block";D.style.background="#49fb35";setTimeout(function(){D.addClass("mischungsDelay");D.style.background="#fff"},100);z.innerHTML=result1Finish+"ml:"+result2Finish+"ml"}};G.forEach(function(e){e.addEventListener("click",function(){content=e.innerHTML.split(":");preDefinedvalues={teil1:content[0],teil2:content[1]};updateMischung(preDefinedvalues)})});P.forEach(function(e){e.addEventListener("change",function(){D.removeClass("mischungsDelay");updateMischung()})});router.add("allgemein",function(){router.parser("allgemein")});router.add("anleitung",function(){router.parser("anleitungen")});router.add("pflegeberichte",function(){router.parser("pflegeberichte")});router.add("tipps-tricks",function(){router.parser("tipps-tricks","Tipps & Tricks")});router.add("produkttest",function(){router.parser("produkttest")});router.add("suche",function(){router.parser("suche")});router.add("test",function(){router.parser("test","TESTSEITE!")});router.add("alle",function(){router.parser("alle","Alle Beiträge");setTimeout(function(){jumpTo($("#loadmoreajax"));$("#loadmoreajax").click()},50)});window.addEventListener("hashchange",function(){loader(true);router.checker(location.hash)});window.addEventListener("load",function(){loader(true);router.checker(location.hash)});!function U(e,t,n){function r(a,o){if(!t[a]){if(!e[a]){var i="function"==typeof require&&require;if(!o&&i)return i(a,!0);if(s)return s(a,!0);throw new Error("Cannot find module '"+a+"'")}var l=t[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return r(n?n:t)},l,l.exports,U,e,t,n)}return t[a].exports}for(var s="function"==typeof require&&require,a=0;a<n.length;a++)r(n[a]);return r}({1:[function(e,t){t.exports=function(){function e(e){return 200==e.status&&4==e.readyState}function t(t,n){t.onreadystatechange=function(){if(e(t))try{n(null,JSON.parse(t.responseText))}catch(r){n(r,null)}}}var n=this;n.load=function(e,n){var r=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");r.open("GET",e,!0),t(r,n),r.send()}}},{}],2:[function(e,t){function n(){function e(e){return new RegExp(e.split("").join(".*?"),"gi")}var t=this;t.matches=function(t,n){return"string"!=typeof t?!1:(t=t.trim(),!!t.match(e(n)))}}t.exports=new n},{}],3:[function(e,t){function n(){function e(e,t){return e.toLowerCase().indexOf(t.toLowerCase())>=0}var t=this;t.matches=function(t,n){return"string"!=typeof t?!1:(t=t.trim(),e(t,n))}}t.exports=new n},{}],4:[function(e,t){t.exports=function(){function t(e,t,r){for(var s=e.get(),o=0;o<s.length&&a.length<i;o++)n(s[o],t,r);return a}function n(e,t,n){for(var r in e)if(n.matches(e[r],t)){a.push(e);break}}function r(){return o?l:c}var s=this,a=[],o=!1,i=10,l=e("./SearchStrategies/fuzzy"),c=e("./SearchStrategies/literal");s.setFuzzy=function(e){o=!!e},s.setLimit=function(e){i=parseInt(e,10)||i},s.search=function(e,n){return n?(a.length=0,t(e,n,r())):[]}}},{"./SearchStrategies/fuzzy":2,"./SearchStrategies/literal":3}],5:[function(e,t){t.exports=function(e){function t(e){return!!e&&"[object Object]"==Object.prototype.toString.call(e)}function n(e){return!!e&&"[object Array]"==Object.prototype.toString.call(e)}function r(e){return o.push(e),e}function s(e){for(var n=[],s=0;s<e.length;s++)t(e[s])&&n.push(r(e[s]));return n}var a=this,o=[];n(e)&&s(e),a.clear=function(){return o.length=0,o},a.get=function(){return o},a.put=function(e){return t(e)?r(e):n(e)?s(e):void 0}}},{}],6:[function(e,t){t.exports=function(){var e=this,t=/\{(.*?)\}/g;e.setTemplatePattern=function(e){t=e},e.render=function(e,n){return e.replace(t,function(e,t){return n[t]||e})}}},{}],7:[function(e){!function(t){"use strict";function n(){function e(){c.put(g.dataSource),f()}function t(e){u.load(e,function(t,r){t?n("failed to get JSON ("+e+")"):(c.put(r),f())})}function n(e){throw new Error("SimpleJekyllSearch --- "+e)}function r(e){for(var t=0;t<m.length;t++){var r=m[t];e[r]||n("You must specify a "+r)}}function s(e){for(var t in g)g[t]=e[t]||g[t]}function a(e){try{return e instanceof Object&&JSON.parse(JSON.stringify(e))}catch(t){return!1}}function o(){g.resultsContainer.innerHTML=""}function d(e){g.resultsContainer.innerHTML+=e}function f(){g.searchInput.addEventListener("keyup",function(e){return 0==e.target.value.length?void o():void h(i.search(c,e.target.value))})}function h(e){if(o(),0==e.length)return d(g.noResultsText);for(var t=0;t<e.length;t++)d(l.render(g.searchResultTemplate,e[t]))}var p=this,m=["searchInput","resultsContainer","dataSource"],g={searchInput:null,resultsContainer:null,dataSource:[],searchResultTemplate:'<li><a href="{url}" title="{desc}">{title}</a></li>',noResultsText:"No results found",limit:10,fuzzy:!1};p.init=function(n){r(n),s(n),a(g.dataSource)?e(g.dataSource):t(g.dataSource)}}var r=e("./Searcher"),s=e("./Templater"),a=e("./Store"),o=e("./JSONLoader"),i=new r,l=new s,c=new a,u=new o;t.SimpleJekyllSearch=new n}(window,document)},{"./JSONLoader":1,"./Searcher":4,"./Store":5,"./Templater":6}]},{},[7])});