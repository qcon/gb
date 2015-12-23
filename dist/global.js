!function(e,t){"use strict";var n=function(e){return new r(e)},r=function(e){var n=0,r=t.querySelectorAll(e);if(0===r.length)return r=t.createElement("div"),this[0]=r,this;for(this.length=r.length,n;n<this.length;n++)this[n]=r[n];return this};n.fn=r.prototype={each:function(e){return this.map(e),this},map:function(e){for(var t=[],n=0;n<this.length;n++)t.push(e.call(this,this[n],n));return t},eachOnce:function(e){var t=this.map(e);return t.length>1?t:t[0]},_forEach:function(e){return this.each(function(t){e(t)})},html:function(e){return e?this.each(function(t){t.innerHTML=e}):this.eachOnce(function(e){return e.innerHTML})},text:function(e){return e?this.each(function(t){t.textContent=e}):this.eachOnce(function(e){return e.textContent})},on:function(e,t){return document.addEventListener?this.each(function(n){n.addEventListener(e,t,!1)}):void 0},addClass:function(e){return this.each(function(t){t.classList.add(e)})},removeClass:function(e){return this.each(function(t){t.classList.remove(e)})},css:function(e){return this.each(function(t){var n=t.getAttribute("style"),r=e;t.setAttribute("style",n+r)})},style:function(e,t){return this.each(function(n){n.style[e]=t})},value:function(){return this.eachOnce(function(e){return e.value})},disable:function(){return this.each(function(e){return e.disabled=!0})},enable:function(){return this.each(function(e){return e.disabled=!1})},scrollTo:function(){return this.eachOnce(function(e){var t=e.getBoundingClientRect(),n=document.body.scrollTop||document.documentElement.scrollTop;window.scrollTo(0,t.top+n-10)})}},e.$||(e.$=n)}(window,document),function(e,t){"use strict";var n=t.createElement("div"),r=function(e,t,n){n=n||"success";var r=$(".wrap-modal")[0],o=document.createElement("div");o.innerText=e,o.classList.add("modal"),o.classList.add("modal-"+n),setTimeout(function(){o.classList.add("modal-show")},20),r.appendChild(o),setTimeout(function(){o.classList.remove("modal-show"),setTimeout(function(){r.removeChild(o)},250)},t)},o=function(e){var t=$("#loading");e?t.style("opacity","1").style("display","block"):t.style("opacity","0").style("display","none")},a=function(e){},i=function(){$("#search_reset").on("click",function(){$("#search-input")[0].value="",$("#results-container").html(" ")}),$("#searchWrapper").style("display","block"),SimpleJekyllSearch.init({searchInput:document.getElementById("search-input"),resultsContainer:document.getElementById("results-container"),dataSource:postJSONCache,searchResultTemplate:"{card}",noResultsText:'<li>Nichts passendes dabei. Hast du eine Idee für einen Artikel? <a style="text-align:center" href="mailto:mail@glossboss.de">Kontaktiere uns!</a></li>',limit:25,fuzzy:!1})},s=function(e){var t={url:"",method:"GET",data:"",success:function(){},error:function(){},useJSON:!1};e=e||t;var n=new XMLHttpRequest;try{n.onreadystatechange=function(){if(4==n.readyState&&200==n.status){var t=e.useJSON?JSON.parse(n.responseText,"text/json"):n.responseText;e.success(t)}},n.open(e.method,e.url,!0),"POST"===e.method?(n.setRequestHeader("Content-Type","application/json;charset=UTF-8"),n.send(JSON.stringify(e.data))):"GET"===e.method&&n.send()}catch(r){console.error("AJAX Error: "+r)}};e.WebFontConfig={google:{families:["Roboto::latin"]}},function(){var e=document.createElement("script");e.src=("https:"==document.location.protocol?"https":"http")+"://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js",e.type="text/javascript",e.async="true";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}();var t=new Date,c=("0"+t.getDate()).slice(-2),u=t.getMonth()+1,l=t.getFullYear(),d=l+""+u+c;e.ajax=s,e.searchRender=i,e.markActiveLinkNavbar=a,e.loader=o,e.appendModal=r,e.DIV=n,e.getCurDate=d}(window,document),function(e,t){var n=$("#mischungInput1")[0],r=$("#mischungInput2")[0],o={},a=$("#mischungResult"),i=$("#mischung--highlight"),s="",c=$("#mischungsrechner input"),u=($("#mischung--heading"),$(".mischungenpredefined")),l=function(){var e,t,o,a,i,c,u;return u=h(),cPart1=n.value,cPart2=r.value,e=parseInt(cPart1)+parseInt(cPart2),t=parseInt(u)/e,o=Math.round(t*cPart1).toFixed(2),a=Math.round(t*cPart2).toFixed(2),i=o.slice(0,o.length-3),c=a.slice(0,a.length-3),s=""+i+"ml:"+c+"ml"},d=function(e){a.style("display","block"),i.text(e)},h=function(){var e=$('input[type="radio"]:checked')[0].value||0;return e>0?e:0},f=function(e){var t=h();return n.value>0&&r.value>0&&t>0?!0:!1},p=function(){var e=f();e&&d(l())};(function(){u.on("click",function(){var e=this.innerHTML.split(":");o={part1:e[0],part2:e[1]},n.value=o.part1,r.value=o.part2,p()}),c.on("change",p),c.on("paste",p)})()}(window,document),!function e(t,n,r){function o(i,s){if(!n[i]){if(!t[i]){var c="function"==typeof require&&require;if(!s&&c)return c(i,!0);if(a)return a(i,!0);throw new Error("Cannot find module '"+i+"'")}var u=n[i]={exports:{}};t[i][0].call(u.exports,function(e){var n=t[i][1][e];return o(n?n:e)},u,u.exports,e,t,n,r)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(e,t){t.exports=function(){function e(e){return 200==e.status&&4==e.readyState}function t(t,n){t.onreadystatechange=function(){if(e(t))try{n(null,JSON.parse(t.responseText))}catch(r){n(r,null)}}}var n=this;n.load=function(e,n){var r=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");r.open("GET",e,!0),t(r,n),r.send()}}},{}],2:[function(e,t){function n(){function e(e){return new RegExp(e.split("").join(".*?"),"gi")}var t=this;t.matches=function(t,n){return"string"!=typeof t?!1:(t=t.trim(),!!t.match(e(n)))}}t.exports=new n},{}],3:[function(e,t){function n(){function e(e,t){return e.toLowerCase().indexOf(t.toLowerCase())>=0}var t=this;t.matches=function(t,n){return"string"!=typeof t?!1:(t=t.trim(),e(t,n))}}t.exports=new n},{}],4:[function(e,t){t.exports=function(){function t(e,t,r){for(var o=e.get(),i=0;i<o.length&&a.length<s;i++)n(o[i],t,r);return a}function n(e,t,n){for(var r in e)if(n.matches(e[r],t)){a.push(e);break}}function r(){return i?c:u}var o=this,a=[],i=!1,s=10,c=e("./SearchStrategies/fuzzy"),u=e("./SearchStrategies/literal");o.setFuzzy=function(e){i=!!e},o.setLimit=function(e){s=parseInt(e,10)||s},o.search=function(e,n){return n?(a.length=0,t(e,n,r())):[]}}},{"./SearchStrategies/fuzzy":2,"./SearchStrategies/literal":3}],5:[function(e,t){t.exports=function(e){function t(e){return!!e&&"[object Object]"==Object.prototype.toString.call(e)}function n(e){return!!e&&"[object Array]"==Object.prototype.toString.call(e)}function r(e){return i.push(e),e}function o(e){for(var n=[],o=0;o<e.length;o++)t(e[o])&&n.push(r(e[o]));return n}var a=this,i=[];n(e)&&o(e),a.clear=function(){return i.length=0,i},a.get=function(){return i},a.put=function(e){return t(e)?r(e):n(e)?o(e):void 0}}},{}],6:[function(e,t){t.exports=function(){var e=this,t=/\{(.*?)\}/g;e.setTemplatePattern=function(e){t=e},e.render=function(e,n){return e.replace(t,function(e,t){return n[t]||e})}}},{}],7:[function(e){!function(t){"use strict";function n(){function e(){u.put(m.dataSource),h()}function t(e){l.load(e,function(t,r){t?n("failed to get JSON ("+e+")"):(u.put(r),h())})}function n(e){throw new Error("SimpleJekyllSearch --- "+e)}function r(e){for(var t=0;t<g.length;t++){var r=g[t];e[r]||n("You must specify a "+r)}}function o(e){for(var t in m)m[t]=e[t]||m[t]}function a(e){try{return e instanceof Object&&JSON.parse(JSON.stringify(e))}catch(t){return!1}}function i(){m.resultsContainer.innerHTML=""}function d(e){m.resultsContainer.innerHTML+=e}function h(){m.searchInput.addEventListener("keyup",function(e){return 0==e.target.value.length?void i():void f(s.search(u,e.target.value))})}function f(e){if(i(),0==e.length)return d(m.noResultsText);for(var t=0;t<e.length;t++)d(c.render(m.searchResultTemplate,e[t]))}var p=this,g=["searchInput","resultsContainer","dataSource"],m={searchInput:null,resultsContainer:null,dataSource:[],searchResultTemplate:'<li><a href="{url}" title="{desc}">{title}</a></li>',noResultsText:"No results found",limit:10,fuzzy:!1};p.init=function(n){r(n),o(n),a(m.dataSource)?e(m.dataSource):t(m.dataSource)}}var r=e("./Searcher"),o=e("./Templater"),a=e("./Store"),i=e("./JSONLoader"),s=new r,c=new o,u=new a,l=new i;t.SimpleJekyllSearch=new n}(window,document)},{"./JSONLoader":1,"./Searcher":4,"./Store":5,"./Templater":6}]},{},[7]),function(e,t){var n=$("#linklist"),r=($("#toggleMenu"),$(".hamburger li:nth-child(1)"),$(".hamburger li:nth-child(2)"),$(".hamburger li:nth-child(3)"),$("#sharecounter")),o=($("#eastereggNavbar"),$("#search_reset"),$(".post--sharing")),a=$(".scroll-top"),i=$(".showCommentsContainer"),s=($(".page-heading"),$("#header-style")),c=$(".cookies-hinweis"),u=$("#cookies_acc"),l=($(".donation-hinweis"),$("#donation_acc"),function(){$(".post--content a")._forEach(function(e){e.setAttribute("target","_blank")})}(),function(){function e(){$("li[data-author]").style("display","none")}e(),$("span[data-authorToggle]").on("click",function(){console.log("clicked on an author :)"),e();var t=this.getAttribute("data-authorToggle");$("li[data-author="+t+"]").style("display","block")})}(),function(){localStorage.getItem("GLOSSBOSS_COOKIES_ACCEPTED")||c.style("display","block"),u.on("click",function(){c.style("display","none"),localStorage.setItem("GLOSSBOSS_COOKIES_ACCEPTED","1")})}(),function(){if(o&&navigator.userAgent.match(/(iPhone)/g)){var e=$(".share--whatsapp");e.style("display","inline-block"),e[0].href="WhatsApp://send?text="+document.title+": "+location.href}}(),function(){if(randomHeader){var e=["merc-8.jpg","1mcoupe.jpg","530dteamwork.jpg","965turbo.jpg","9914s1.jpg","997cabrio.jpg","991turbos.jpg","997grau.jpg","997rot.jpg","alfagtv.jpg","audir8.jpg","audis5.jpg","bmw2002.jpg","eosschwarz.jpg","golf7gtd.jpg","lotuselise.jpg","m3csl.jpg","shelby.jpg","mclaren.jpg"];random=Math.floor(Math.random()*(e.length-1));var t="https://glossbossimages.s3.eu-central-1.amazonaws.com/headerimg/"+e[random];s.html("header {background: "+headerGradient+", url("+t+") center 50%; background-size:cover}")}}(),function(){function t(){if(c&&u){var e=a+i,t="Sei der erste Glossboss der diesen Beitrag teilt!";a===i&&(e/=2),e>1&&(t=e+" Glossbosse haben diesen Beitrag bereits geteilt!"),clearInterval(s),r.text(t)}}var n="https://graph.facebook.com/"+e.location.href,o=n.slice(0,n.length-1),a=0,i=0,s=setInterval(t,100),c=!1,u=!1;ajax({method:"GET",url:n,useJSON:!0,success:function(e){a=e.shares,c=!0}}),ajax({method:"GET",url:o,useJSON:!0,success:function(e){i=e.shares,u=!0}})}(),function(){a.on("click",function(){n.scrollTo()}),i.on("click",function(){var e="glossboss";!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="//"+e+".disqus.com/embed.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(t)}(),i.style("display","none")});(function(){var e=$("select[name=kategorie]"),t=e[0];e.on("change",function(){location.href="/"+t.options[t.selectedIndex].value})})()});l()}(window,document),function(e,t){var n,r=$(".post--list"),o=$("#post--list__container"),a=$("#page-heading"),i=$("#loadmoreajax"),s=0,c=15,u=5,l={routes:[],add:function(e,t){return this.routes.push({re:e,fn:t}),this},checkRoute:function(e){for(var t in this.routes){var n=e.match(this.routes[t].re);if(n)return n.shift(),this.routes[t].fn.apply({},n),this}try{$("#indexContainer")&&!e&&ItseMeIndex&&this.parser("index","Die neuesten Beiträge",!0)}catch(r){console.log("i dont care: "+r)}},getPosts:function(e,t,r){var l=e;n=[],s=0;for(var d=0;d<l.length;d++)if(l[d].category.toLowerCase()===t||r||"alle"===t){if(c>s){var h=$(".post--list").html();$(".post--list").html(h+l[d].card),s++}n.push(l[d].card)}$("#indexContainer li").each(function(e){var t=getCurDate-e.getAttribute("data-published");85>=t&&(e.innerHTML='<span class="post--new">NEU</span>'+e.innerHTML)}),o.removeClass("opacity-0"),a.removeClass("opacity-0"),loader(0),$(".post--list li").length<c?i.style("display","none"):i.style("display","block"),i[0].onclick=function(e){postListLI=$(".post--list li"),r&&"alle"!=location.hash&&(location.hash="alle");var t=0;showDelay=function(e,t){setTimeout(function(){$(".post--list li")[e].classList.remove("displayNone")},t)};for(var o=0;u>o;o++)if($(".post--list")[0].innerHTML+=n[s],$(".post--list li")[s].classList.add("displayNone"),t+=100,showDelay(s,t),s++,!n[s])return void i.style("display","none")}},parser:function(e,t,n){$("#toggleMenu")[0].checked=!1,$("#searchWrapper").style("display","none"),markActiveLinkNavbar(e);var s=e.charAt(0).toUpperCase()+e.slice(1,e.length);return t=t||s,loader(1),i.style("display","none"),a.addClass("opacity-0"),a.text(t),r.html(" "),o.addClass("opacity-0"),"suche"===e?(o.removeClass("opacity-0"),searchRender(),void loader(0)):void ajax({method:"GET",useJSON:!0,url:postJSONCache,success:function(t){this.getPosts(t,e,n)}.bind(this)})}};l.add("allgemein",function(){l.parser("allgemein","Allgemein")}),l.add("anleitung",function(){l.parser("anleitungen","Anleitungen")}),l.add("pflegeberichte",function(){l.parser("pflegeberichte","Pflegeberichte")}),l.add("produkttest",function(){l.parser("produkttest","Produkttests")}),l.add("suche",function(){l.parser("suche")}),l.add("test",function(){l.parser("test","TESTSEITE!")}),l.add("alle",function(){l.parser("alle","Alle Beiträge"),setTimeout(function(){$("#loadmoreajax").scrollTo(),$("#loadmoreajax")[0].click()},50)}),window.addEventListener("hashchange",function(){l.checkRoute(location.hash)}),window.addEventListener("load",function(){l.checkRoute(location.hash)})}(window,document),function(e,t){function n(e,t){if(""===e.value())return c.style("visibility",""),e.addClass("form__error"),loader(0),appendModal("Unvollständige Angabe: "+e[0].placeholder,3e3,"error"),!1;if(t){var n=/\S+@\S+\.\S+/;if(!n.test(e.value()))return l.addClass("form__error"),appendModal("eMail Adresse ungültig!",2e3,"error"),c.style("visibility",""),loader(0),!1}return!0}function r(){u.removeClass("form__error"),l.removeClass("form__error"),d.removeClass("form__error"),c.style("visibility","hidden"),loader(1)}function o(){p.style("opacity","1"),c.enable(),c.removeClass("cursor-not-allowed"),f.Mail=$(".selectGlossboss input[name=glossboss]:checked").value(),f.Name=$(".selectGlossboss input[name=glossboss]:checked")[0].getAttribute("data-boss")}function a(){p.style("opacity",".3"),c.disable(),c.addClass("cursor-not-allowed"),s()}function i(){r();var e=n(u),t=n(l,!0),o=n(d);if(e&&t&&o){var a={key:g,message:{text:d.value(),subject:"GLOSSBOSS Kontaktanfrage",from_email:l.value(),from_name:u.value(),to:[{email:f.Mail,name:f.Name,type:"to"}],bcc_address:"ntwcklng@gmail.com",headers:{"Reply-To":l.value()}},async:!1,ip_pool:"Main Pool"};ajax({method:"POST",url:"https://mandrillapp.com/api/1.0/messages/send.json",data:a,useJSON:!0,success:function(e){loader(1),"sent"===e[0].status&&(c.style("visibility","hidden"),loader(0),appendModal("Danke für deine eMail! Wir werden so schnell wie möglich darauf antworten.",4500))}})}}function s(){c.on("click",function(e){e.preventDefault(),i()},!1),h.on("change",o)}var c=$("#SENDEN"),u=($("#form_msg"),$("#name")),l=$("#xyz"),d=$("#msg"),h=$(".selectGlossboss input[name=glossboss]"),f={},p=$("#kontakt_inputs"),g="R61bXP70NEnJXC2c__cvgg";a()}(window,document);