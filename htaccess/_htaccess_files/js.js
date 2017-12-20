//"use strict";
var x=0, y=0;

var jtop=0;	// при открытии нового окна старое закрыть
var jto=0;	// обработчик TimeOut
var NS=(document.layers || !document.all);

var AjaxSearch='', searchTimer=0, MainUrl='';

function getObj(objID) // todo querySelector и querySelectorAll
{if(document.getElementById) {return document.getElementById(objID);}
 else if(document.all) {return document.all[objID];}
 else if(document.layers) {return document.layers[objID];}
    return null;
}

function getElementsByClass(searchClass,node,tag){
var classElements=[];
if( node == null ) node=document;
else if(typeof(node)!="object")node=document.getElementById(node); if(!node)return [];
if( tag == null ) tag='*';
var els=node.getElementsByTagName(tag);
var elsLen=els.length;
for (var i=0, j=0; i < elsLen; i++) {
    var pattern=new RegExp("(^|\\s)"+searchClass.replace('-','\-')+"(\\s|$)"); // при выносе наружу теряет каждый второй элемент
    if( pattern.test(els[i].className) ) {
        classElements[j]=els[i];
        j++;
    }
}
return classElements;
}

function getText(o)
{
if(typeof(o)!="object")o=document.getElementById(o);
if(!o)return '';
if(o.tagName=='SELECT') return (o.selectedIndex>=0?o.options[o.selectedIndex].text:'');
if (o.nodeType == 3 || o.nodeType == 4) { return o.data; }
var i; var returnValue = [];
for (i = 0; i < o.childNodes.length; i++) { if(o.childNodes[i].tagName=='BR') returnValue.push("\r\n"); else returnValue.push(getText(o.childNodes[i])); }
return returnValue.join('');
/*
if(tobj.innerText)return tobj.innerText;
if(tobj.nodeValue)return tobj.nodeValue;
if(tobj.outerText)return tobj.outerText;
if(!document.all&&tobj.textContent)return tobj.textContent;
if(tobj.text)return tobj.text;
if(tobj.innerHTML){t=tobj.innerHTML.replace(/<br[^>]*>/gm,"\r\n"); t=t.replace(/<[^>]*>/gm,""); t=t.replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&nbsp;/gm," "); return t;}
*/
}

function getValue(o,def){
    if(typeof(o)!="object")o=document.getElementById(o);
    if(def==undefined)def=0;
    if(!o)return def;
    if(o.length&&!o.tagName){
        var rl = o.length;
        if(rl == undefined) return (o.checked ? o.value : def);
        for(var i = 0; i < rl; i++) if(o[i].checked) return o[i].value;
        return def;
    }else if(o.tagName=='SELECT') return (o.selectedIndex>=0?o.options[o.selectedIndex].value:def);
    else if((o.tagName=='INPUT')&& ((o.type=='checkbox')||(o.type=='radio')))return (o.checked?o.value:def);
    else return o.value; // INPUT || TEXTAREA
}

function isVisible(o,glob){
    var pattern,c;
    do{	if(o.style){
            pattern=new RegExp("(^|\\s)hide(\\s|$)");
            if( pattern.test(o.className) )return false;
            c=window.getComputedStyle(o, null).display;
            if((c.indexOf("block")==-1)&&(c.indexOf("inline")==-1)&&(c.indexOf("table")==-1)&&(c!=""))return false;
        }
        o=o.parentNode;
    }while(glob&&o);
    return true;
}

mTimer = null;
mMenu= null;
function mclick(a){
	if(mTimer) {window.clearTimeout(mTimer); mTimer=null;}
	c=document.getElementById(a);
	c.style.display=(isVisible(c)?"none":"block");
}
/**
 *
 * @param c - class или id или object
 * @returns {boolean}
 * @constructor
 */
function ShowHide(c){
    var pattern=new RegExp("(^|\\s)hide(\\s|$)");
    var l;
    if(typeof(c)=="object")l=c;
    else l=document.getElementById(c);
    if(l){
        if( pattern.test(l.className) ){ removeClass(l,"hide"); /*console.log('removeClass(',l,',"hide")');*/}
        else{ addClass(l,"hide"); /*console.log('addClass(',l,',"hide")');*/}
    }else{
        l=getElementsByClass(c,null,null);
        for(var i=0;i<l.length;i++){
            if( pattern.test(l[i].className) ) removeClass(l[i],"hide");
            else addClass(l[i],"hide");
        }
    }
    return false;
}
var mTimer;
function mOver(a){
	if(mTimer) {window.clearTimeout(mTimer); mTimer=null;}
	mMenu=a;
	mTimer=window.setTimeout('mShow()',700);
	}
function mOut(a){
	if(mTimer) {window.clearTimeout(mTimer); mTimer=null;}
	}
function mShow(){
	if(mTimer) {window.clearTimeout(mTimer); mTimer=null;}
	c=document.getElementById(mMenu);
	if(!((c.style.display=="block")||(c.style.display==""))) c.style.display="block";
	}

function Show(pref,a,a1,a2){
for(var i=a1;i<=a2;i++)document.getElementById(pref+i).style.display='none';
document.getElementById(pref+a).style.display="block";}

function InWin(e){
var a=e;
if(a.href) a=a.href;
else{
  e = e || window.event;
  a=e.target || e.srcElement;
  if(a.href) a=a.href;
}
jtop=window.open(a,'Пример', 'height=768,width=1024,location=no,toolbar=no,directories=no,menubar=no,status=yes,scrollbars=1,resizable=yes');
jtop.focus();
jtop.name='example';
if(e && e.stopPropagation){e.stopPropagation();e.preventDefault();}       // для DOM-совместимых браузеров
else if(window.event)window.event.cancelBubble=true; //для IE
return false;
}

function IsMail(mail, EnableEmpty)
{
 if(mail.value)mail=mail.value;
 if(EnableEmpty && (mail=="") ) return true;
 if(mail=="") return false;
 if((mail.indexOf(".") == -1)||(mail.indexOf(",")>=0)||(mail.indexOf(";")>=0)) return false;
 dog = mail.indexOf("@");
 if(dog == -1) return false;
 if((dog < 1) || (dog > mail.length - 5)) return false;
 if((mail.charAt(dog - 1) == '.') || (mail.charAt(dog + 1) == '.')) return false;
// /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
 return true;
}

var old_key='';
function ShowForKeyWords(key){
    key=key.toLowerCase();
    //if(MainUrl){history.go(0);return true;}
    if(old_key){old_key.style.fontWeight='';old_key.style.fontVariant=''; old_key='';}
    hide('r336x280');
    var node=getObj('fly');
    var links=node.getElementsByTagName('A');
    for(var i=0; i<links.length; i++){	// Цикл по всем ссылкам
        var link=links[i];
        if(link.hash.length>1){
            var str=getText(link).toLowerCase();
            if(str==key){old_key=link; link.style.fontWeight='bold';link.style.fontVariant='small-caps';}
        }
    }
    node=getObj('blocka');
    links=node.getElementsByTagName('A');
    for(i=0; i<links.length; i++){	// Цикл по всем ссылкам
        link=links[i];
        if((key=='') || (link.title.toLowerCase().indexOf(key)>=0))removeClass(link,'hide');
        else addClass(link,'hide');
    }
    window.location.hash=key;
    return false;
}
/**
 * @param obj
 * @param url
 * @param defMessage
 * @param post
 * @param callback
 * @param header
 * @returns {boolean}
 */
function ajaxLoad(obj,url,defMessage,post,callback,header){
    var ajaxObj;
    if(typeof(obj)!="object"&&obj)obj=document.getElementById(obj);
    if(defMessage&&obj)updateObj(obj,defMessage+' <img src="/pic/loading.gif">');
    if(window.XMLHttpRequest){
      ajaxObj = new XMLHttpRequest();
    } else if(window.ActiveXObject){
      ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
      return false;
    }
    ajaxObj.open ((post?'POST':'GET'), url);
    if(post&&ajaxObj.setRequestHeader){
        if(post=='chat'){ajaxObj.chat=true;post='';}
        else ajaxObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=windows-1251;");
    }
    /*if(header&&ajaxObj.setRequestHeader){
        ajaxObj.setRequestHeader(header);
    }*/
    ajaxObj.onreadystatechange = ajaxCallBack(obj,ajaxObj,(callback?callback:null));
    ajaxObj.send(post);
    //if(obj.getAttribute('data-main')=='main')UpdateUrl(MainUrl=url);
    return false;
}
var oldUrl=document.location;
//alert('oldUrl='+oldUrl);

if(typeof window.addEventListener === "function"){
    setTimeout( function() {
        try{
            window.addEventListener("popstate", function(e) {
                MainUrl=e.location || document.location;
                if(oldUrl.pathname==MainUrl.pathname && oldUrl.hash.substring(1,1)!='/'){/*alert(oldUrl.pathname+'|'+MainUrl.pathname+'|'+oldUrl.hash);*/return;}
                //console.log('LoadMainUrl(',MainUrl.href,')');
                LoadMainUrl(MainUrl.href);
            }, false);
        }catch(e){}
    }, 900 );
}

/**
 * @return {string}
 */
function ShortUrl(url){
    if(url.substring(0,1)=='?') {
        return document.location.pathname + url;
    }
    var d=document.location,e=d.protocol+'//'+d.hostname;
    var i=url.indexOf(e);
    if(i>-1)url=url.substring(i+e.length);
    if(url.substring(0,1)!='/'){console.error("Ошибка в url=",url,i,e);return '';}
    return url;
}

function LoadMainUrl(url,AddHistory){
    MainUrl=url;
    url=ShortUrl(url);
    i=url.indexOf('#');
    if(i>0)url=url.substring(0,i)+(url.indexOf('?')>=0?'&':'?')+'ajax=1'+url.substring(i);
    else url=url+(url.indexOf('?')>=0?'&':'?')+'ajax=1';
    ajaxLoad('main',url,'Загрузка...');
    if(AddHistory)UpdateUrl(MainUrl);
}

function UpdateUrl(url){
    //history.pushState(null, null, MainUrl);
    url=ShortUrl(url);
    //console.log('UpdateUrl:',url);
    if(history.pushState)history.pushState(null, null, url);
    else window.location.hash='#'+url;
}

function _GET() {
    var $_GET = {};
    var __GET = window.location.search.substring(1).split("&");
    for(var i=0; i<__GET.length; i++) {
        var getVar = __GET[i].split("=");
        $_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1];
    }
    return $_GET;
}
function perpage(t,obj,api){
    var url=document.location.href; if(url.indexOf('#')>=0)url=url.substr(0,url.indexOf('#'));
    if(url.indexOf('?')>=0)url=url.replace(/[\&\?]perpage=(\w)*/gi,"");
    //console.log('url=',url);
    if(api||getElementsByClass('layer','main','DIV')){    //if(getObj('layer0')){
        // если работаю с вкладками, то очистить все вкладки и загрузить в текущую
        //var l=getElementsByClass('layer',null,'div');
        //for(var i=0;i<l.length;i++)l[i].innerHTML='';
        //определяю текущую вкладку
        //l='layer'+getlayer();
        url = url + (url.indexOf('?') >= 0 ? '&' : '?') + "perpage=" + encodeURIComponent(t.options[t.selectedIndex].value);
        UpdateUrl(url+document.location.hash);
        //ajaxLoad(l,url+'&ajax=1');
        if(!obj)obj='main';
        if(api)api=api+(api.indexOf('?')>=0?'&':'?')+url.substr(url.indexOf('?')+1);
        else api=url+'&ajax=1';
        //console.log('загружаю ',api,' в ',obj);
        ajaxLoad(obj,api);
    }else
        LoadMainUrl(url+(url.indexOf('?')>=0?'&':'?')+"perpage="+encodeURIComponent(t.options[t.selectedIndex].value),true);
    return false;
}

function Order(name,obj,api){
    var s=_GET();
    //console.log(typeof(s['desc']), s['ord']==name);
    if(typeof(s['desc'])=='undefined'){
        if(s['ord']==name)s['desc']='';
    }else{ delete s['desc'];}
    s['ord']=name;
    url='';
    for(var key in s)url+=(url?'&':'?')+key+(s[key]?'='+s[key]:'');
    location.href=url;
    /*if(api||getElementsByClass('layer','main','DIV')){
     UpdateUrl(url+document.location.hash);
     if(!obj)obj='main';
     else api=url+'&ajax=1';
     ajaxLoad(obj,api);
     }else
     location.href=url;
     //LoadMainUrl(url,true);
     return false;*/
}
function Search(name,obj,api){
    name=getValue(name);
    var s=document.location.search;
    var url=s.replace(/(^|&|\\?)q=(.*?)(?=&|$)/gi, "").replace(/(^|&|\\?)p=(.*?)(?=&|$)/gi, "").replace(/[\\&\\?]$/, '');
    url=(url?url+'&':'?')+'q='+name;
    location.href=url;
    /*if(api||getElementsByClass('layer','main','DIV')){
     UpdateUrl(url+document.location.hash);
     if(!obj)obj='main';
     else api=url+'&ajax=1';
     ajaxLoad(obj,api);
     }else
     location.href=url;
     //LoadMainUrl(url,true);
     return false;*/
}

function getParam(name){
    name=name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var r=new RegExp("[\\?&]" + name + "=([^&#]*)");
    r=r.exec(window.location.search);
    return (r == null ? "" : decodeURIComponent(r[1].replace(/\+/g, " ")));
}

/*
function perpage(t,obj,api){
    var url=document.location.href; if(url.indexOf('#')>=0)url=url.substr(0,url.indexOf('#'));
    if(url.indexOf('?')>=0)url=url.replace(/[\&\?]perpage=(\w)*//*
gi,"");
    log('url=',url);
    if(api||getElementsByClass('layer','main','DIV')){    //if(getObj('layer0')){
        // если работаю с вкладками, то очистить все вкладки и загрузить в текущую
        //var l=getElementsByClass('layer',null,'div');
        //for(var i=0;i<l.length;i++)l[i].innerHTML='';
        //определяю текущую вкладку
        //l='layer'+getlayer();
        url = url + (url.indexOf('?') >= 0 ? '&' : '?') + "perpage=" + encodeURIComponent(t.options[t.selectedIndex].value);
        UpdateUrl(url+document.location.hash);
        //ajaxLoad(l,url+'&ajax=1');
        if(!obj)obj=t.parentNode;
        if(api)api=api+(api.indexOf('?')>=0?'&':'?')+url.substr(url.indexOf('?')+1);
        else api=url+'&ajax=1';
        log('загружаю ',api,' в ',obj);
        ajaxLoad(obj,api);
    }else
        LoadMainUrl(url+(url.indexOf('?')>=0?'&':'?')+"perpage="+encodeURIComponent(t.options[t.selectedIndex].value),true);
    return false;
}
*/

function getlayer(){    //определяю текущую вкладку
    var j=location.search.match( /layer=(\w)*/g );
    return (j?j[0].substring(6):'0');
}

function updateObj(obj, data, bold, blink){
    if(bold)data=data.bold();
    if(blink)data=data.blink();

    //console.log("1:",obj,data);
    var t='',text;
    if(typeof data=='string')data=data.replace(new RegExp("<script([^>]*)>([\\s\\S]*?)<\/script>", "igm"),
        function(str, p1, p2, offset, s){
            if(p1.indexOf('src=')>0){
                var re2=new RegExp("src=[\'\"](.*?)[\'\"]","i"); var te2=re2.exec(p1);
                if(te2!=null)
                    t=t+"\r\nLoadScript('"+te2[1]+"');";
            }else{ t=t+"\r\n"+p2.replace(/<!\-\-/g,"").replace(/\/\/\-\->/g,"");}
            return "";
    });

    var re1 = new RegExp("<body\\b([^>]*)>([\\s\\S]*?)<\/body>", "img");
    if((text=re1.exec(data))!=null){
        console.error("В ответе <body>!");
        data=text[2].replace(/<!\-\-/g,"").replace(/\/\/\-\->/g,"");
    }
    //console.log("3:",obj,t,data);
    if(typeof(obj)!="object"&&obj)obj=document.getElementById(obj);
    if(!obj){
        //console.log("4:",obj,t,data);
        if(trim(data)!='')fb_win(data,t);
        else if(t)ExecScript(t);
        return;}
    var o=obj;
    do{	if(o.style){
        if(!isVisible(o)){/*log(c.display);*/show(o);/*o.style.display=(o.tagName=="DIV"?"block":"inline");*/}
	}
	o=o.parentNode;
   }while(o);
   if(obj.id=='main'/*)||(obj.getAttribute('data-main')=='main')*/){
        re1=new RegExp("<title>([^<]+)</title>","gim"); text=re1.exec(data);
        if(text!=null){tit=text[1]; document.title=tit; el=getObj('title2');if(el)el.innerHTML=tit;
	    data=data.replace(re1, "");
        }
        obj.innerHTML=data;
        if(t)ExecScript(t);
       //MainUrl='http://'+window.location.hostname+MainUrl;
       el=document.getElementsByTagName('base'); if(el)el=el[0];
       if(!el){el=document.createElement("base");
           document.getElementsByTagName('head')[0].appendChild(el);}
       el.setAttribute('href', MainUrl);
       // обновляю счетчики
       c=new Image(); c.src="//counter.yadro.ru/hit?t42.6;r"+
           escape(oldUrl)+((typeof(screen)=="undefined")?"":
           ";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
               screen.colorDepth:screen.pixelDepth))+";u"+escape(MainUrl)+
           ";h"+escape(document.title.substring(0,80))+";"+Math.random();
       LoadScript('http://counter.rambler.ru/top100.jcn?1367185');
       LoadScript(document.location.protocol+'//openstat.net/cnt.js');
       if(typeof yaCounter9489841 == 'object')yaCounter9489841.hit(MainUrl, document.title, null);
       oldUrl=MainUrl;
       window.setTimeout('oef()',200);
       // прокрутка на позицию начала блока main
       ScrollToObj(obj);
       // todo в правый блок загружаю новую рекламу, нижний банер и лайки вконтакте
       return;
   }
   ajaxEval(obj, data);
   if(t)ExecScript(t);
}

function ScrollToObj(o){
    var o1=o; var pos=0; while(o1.offsetParent){ pos+=parseInt(o1.offsetTop); o1=o1.offsetParent;}
    window.scrollTo(0,pos-10);
    //console.log('window.scrollTo(0,',pos,'-10);');
}

function ajaxEval(obj, data){
//console.log("ajaxEval(",obj,'<',obj.tagName,'>', data,'<',typeof(data),">)");
   if(obj.tagName=='INPUT'||obj.tagName=='TEXTAREA'){
       if(obj.value!=data){
            obj.value=data;
           if(obj.onchange!=null)obj.onchange(obj);
       }
//   }else if(obj.tagName=='FORM' && typeof(data)=='array'){
//	for(i in window)ajaxEval(obj[i], data[i]);
   }else if(obj.tagName=='SELECT'){
	if(typeof(data)=='number' || data.indexOf('<')<0){ // это value
	   //alert(obj.tagName+' '+data+' '+typeof(data));
	   for(i=0;i<obj.options.length;i++)
		if(obj.options[i].value==data){obj.options[i].selected=true;break;}
	}else{
	  obj.options.length=0;
	  var re=new RegExp ("<option[^<]+</option>","img");
	  data=data.match(re);
	  if(data){
	     for(i=0;i<data.length;i++){
		var re0=new RegExp ("value=[\'\"]([^\'\"]+)[\'\"]?","i"); value=re0.exec(data[i]); value= value==null? '' : value[1];
		if(!value){var re0=new RegExp ("value=([^<>]+)","i"); value=re0.exec(data[i]); value= value==null? '' : value[1];}
		var re1=new RegExp ("<option[^>]+>([^<]+)</option>","i"); text=re1.exec(data[i]); text= text==null? null : text[1];
		var re4=new RegExp ("class=[\'\"]([^\'\"]+)[\'\"]","i"); defclass=re4.exec(data[i]);
		j=obj.options.length;
		if(text !=null){
		   var re2=/selected/i; defSelected=re2.test(data[i]);
		   obj.options[j]=new Option(text, value,defSelected,defSelected);
		   var re3=/disabled/i; if(re3.test(data[i]))obj.options[j].disabled=true;
		   if(defclass!=null) obj.options[j].className=defclass[1];
		   }else obj.options[j]=new Option('ОШИБКА!', '' );
		}
	 }}
   }else if(typeof(data)=='object' && obj.tagName=='A'){
       //console.log('data=',data, ', obj=',obj);
       for(k in data){
           //console.log(obj,'[',k, '] =',data[k]);
           if(k=='innerHTML')obj.innerHTML=data[k];
           else obj.setAttribute(k, data[k]);
       }
   }else obj.innerHTML=data;
}

function ajaxJson(obj, data){
    if(!data)return;
    ajaxObj=eval("(" + data + ")");
    if(!obj){for(k in ajaxObj)if(o=getObj(k))updateObj(o,ajaxObj[k]);return;} // обновляю по id
    if(obj.tagName!="FORM"&&obj.form)obj=obj.form;// это был элемент формы
    if(obj.tagName!="FORM"){
        //console.log("obj.tagName",obj.tagName);
        ajaxEval(obj, ajaxObj);
        return;
    }
    for(key in ajaxObj){
        o=obj[key];
        //console.log("key=",key, "o=",o, "typeof(o)=",typeof(o),"ajaxObj[]=",typeof(ajaxObj[key]), ajaxObj[key]);
        if(typeof(ajaxObj[key])=='object'){
            if(typeof(o)=='object' && o.tagName=='SELECT'){
//console.log('select!');
                o.options.length=0; j=0;
                s=ajaxObj[key];
                for(k in s){
                    m=s[k];
                    if(typeof(m)=='object'){
                        if(typeof(m['selected'])=='undefined')m['selected']=false;
                        if(typeof(m['value'])=='undefined')m['value']=k;
                        o.options[j++]=new Option(m['text'], m['value'] ,m['selected'],m['selected']);
//console.log('text=',m['text'], ', value=',m['value'] ,', selected=',m['selected']);
                        for(k1 in m)if(k1!='text'&&k1!='value'&&k1!='selected')o.options[j-1].setAttribute(k1,m[k1]);
                    }else{
//console.log('m=',m, ', k=',k);
                        o.options[j++]=new Option(m, k,false,false);
                    }
                }
            }else{
                //console.log("создаю input name=",key);
                s=(typeof(o)=='undefined'?document.createElement("input"):o);
                s.setAttribute('name', key);
                s.setAttribute('type', 'hidden');/*по умолчанию скрытый*/
                if(typeof(o)=='undefined')obj.appendChild(s);
                o=ajaxObj[key];
                for(k in o)s.setAttribute(k, o[k]);
                //if(s.onchange!=null)s.onchange(s);
            }
        }else if(typeof(o)!='undefined'&&typeof(o)!='null'){
            ajaxEval(o, ajaxObj[key]);
        }else if((pos=key.indexOf('.'))>0){ // имя.атрибут=значение
            o=key.substr(0,pos);
            o=obj[o];
            if(typeof(o)!='undefined'&&typeof(o)!='null'){
                s=key.substr(pos+1);
                if(s=='disabled')o.disabled=ajaxObj[key];
                else if(s=='value'&&o.tagName=='SELECT'){
                    o.options.length=0;
                    t=ajaxObj[key]; s='';
                    //console.log("name=",o.name);
                    if(o.name.substr(o.name.length-3,3)=='_cs'){
                        s=eval('o.form.'+o.name.substr(0,o.name.length-3));
                        //console.log("s=",s,", n=",'o.form.'+o.name.substr(0,o.name.length-3));
                        if(s)t=s.value;
                    }
                    o.options[0]=new Option(t, ajaxObj[key],true,true);
                    if(s)if(o1=s.getAttribute('after'))eval(o1);
                }else o.setAttribute(s, ajaxObj[key]);
            }//else console.error("ошибка в ",key, "для ",ajaxObj[key]);
        }else if(o=getObj(key))ajaxEval(o,ajaxObj[key]);

        //else console.error("нет id=",key, "для ",ajaxObj[key]);
    }
    if(obj.style)obj.style.display='block';
}

function ajaxCallBack(obj, ajaxObj, callback){
return function(){
    if(ajaxObj.readyState==4){
       if(callback) if(!callback(obj,ajaxObj))return;
       if(ajaxObj.status==200){
           //console.log("Content-Type:",ajaxObj.getResponseHeader("Content-Type"), "responseText: ",ajaxObj.responseText);
           var ct=ajaxObj.getResponseHeader("Content-Type");
            if(ct.indexOf("application/x-javascript")>=0){
console.log("eval.JS: ",ajaxObj.responseText.replace(/\n/g,";").replace(/\r/g,""));
		        eval(ajaxObj.responseText.replace(/\n/g,";").replace(/\r/g,""));
            }else if(ct.indexOf('json')>=0){
                if(obj.tagName=='DIV')updateObj(obj, ajaxObj.responseText.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/,\"/g,", \""));
                else ajaxJson(obj,ajaxObj.responseText);
	        }else updateObj(obj, ajaxObj.responseText);
	    }else{

           updateObj(obj, (ajaxObj.responseText ? ajaxObj.responseText : ajaxObj.status+' '+ajaxObj.statusText),1,1);
       }
    }else{
        if(ajaxObj.readyState==3){
            var pattern=new RegExp("(^|\\s)chat(\\s|$)");
            if(ajaxObj.chat || (obj && pattern.test(obj.className)) ){
                obj.innerHTML=ajaxObj.responseText;
            }
        }
    }
}}

function oef(){// Цикл по всем ссылкам, описание в htmlweb.ru/other/hidden_ref.php
/*var mail="kdg"+'@'; mail=mail+window.location.hostname;
if(el=document.getElementById('mail'))if(el.nodeName=='A'){
el.appendChild( document.createTextNode( mail ) );
el.href="mai"+"lto:"+mail;
}*/
for(i=0; i<document.links.length; i++) {
var l=document.links[i];
var lp=l.pathname;
if(l.id=='mail'||l.className=='mail'){/*страница контакты*/
    //console.log(l);
    var mail="kdg"+'@'; mail=mail+window.location.hostname;
    l.appendChild( document.createTextNode( mail ) );
    if(l.href==document.location)l.href="mai"+"lto:"+mail;
}else if(l.hostname.indexOf(window.location.hostname)<0){
	l.target='_blank';
	pos=l.href.indexOf('/',10);
	if(pos>=0 && l.onclick==null){
		l.onclick=new Function('this.href="'+l.href+'";');
		l.href=l.href.slice(0,pos);
	}
}else if(lp.substring(0,3)=='/G/'){
	l.target='_blank';
	var h='http:/'+l.href.substr(l.href.indexOf('/G/')+2);
	pos=h.indexOf('/',10);
	if(pos>0 && l.onclick==null){ // прячу ref ссылку
		l.onclick=new Function('this.href="'+h+'";');
		l.href=h.substr(0,pos);
	}else l.href=h;
}else if(lp.substring(0,4)=='/Gs/'){
	l.target='_blank';
	//l.href='https:/'+l.href.substr(l.href.indexOf('/Gs/')+3);
    var h='https:/'+l.href.substr(l.href.indexOf('/Gs/')+3);
    pos=h.indexOf('/',10);
    if(pos>0 && l.onclick==null){ // прячу ref ссылку
        l.onclick=new Function('this.href="'+h+'";');
        l.href=h.substr(0,pos);
    }else l.href=h;
}else if(!document.getElementById('main')){
}else if(/*document.location.pathname.indexOf('function')>=0 &&*/
	lp.indexOf('function')>=0 && l.onclick==null ){ //	l.href.indexOf('#')<0 &&
	addEvent(l, 'click',LoadMain);// l.onclick=LoadMain;
}else if(lp.indexOf('/example/')>=0 && lp.indexOf('/index.')<0 && lp.substring(lp.length-1)!='/' && l.onclick==null ){
	addEvent(l, 'click',InWin);// l.onclick=LoadMain;
}//else //if(l.href.hostname==document.location.hostname)
//	addEvent(l, 'click',LoadMain);// l.onclick=LoadMain;
//else alert(document.links[i].href);
}
    /*подсветка кода*/
    if(getElementsByClass('language-html',null,'code')||getElementsByClass('language-php',null,'code')){
        if(!document.hljs)LoadScript('/highlight.pack.js',function(){hljs.tabReplace='    ';hljs.initHighlighting();});
    }
    if(typeof VK == "object"){
        var o=getObj('vk_comments');
        if(getObj('vk_like')||o){
            try {
                VK.init({apiId: 2055240, onlyWidgets: true});
            } catch (e) {console.error('VK:error:',e)}
            if(getObj('vk_like')){
                try {
                    VK.Widgets.Like("vk_like", {type: "full"});
                    console.log('Load vk_like');
                } catch (e) {console.error('VK:error:',e)}
            }
            if(o.innerHTML==''){
                try {
                    VK.Widgets.Comments("vk_comments",{limit:10,width:"610",attach:false,onChange:addCommentCallback});
                    console.log('Load vk_comments:',o.innerHTML);
                } catch (e) {console.error('VK:error:',e)}
            }
        }
    }
    if(document.location.hash)setTimeout(layer_,300);
}


function SendComment(){
  formComment=document.frmcomment;
  if(!formComment.comment.value){updateObj('answer', 'Пустой комментарий!',1,1); return;}
  if(!IsMail(formComment.mail.value, true)){updateObj('answer', 'Mail или пустой или корректный!',1,1); return;}
 str='';
 for (i=0; i<formComment.length; i++) if(formComment[i].name){
     str=str+encodeURIComponent(formComment[i].name)+'='+encodeURIComponent(formComment[i].value)+'&';
     }
  str=str.slice(0,-1);
  ajaxLoad('answer','/log/send.php','Отправка...', str)
}

function SendDonate(prm){
 formComment=document.frmcomment;
 if(!formComment.comment.value){updateObj('answer', 'Пустой комментарий!',1,1); return false;}
 if(!IsMail(formComment.mail.value, true)){updateObj('answer', 'Mail или пустой или корректный!',1,1); return false;}
 if(prm){
    formComment.wm.LMI_PAYEE_PURSE=formComment.wm.options[formComment.wm.selectedIndex].value;
    return true;}
 str='';
 for (i=0; i<formComment.length; i++) if(formComment[i].name){
     str=str+encodeURIComponent(formComment[i].name)+'=';
	if(formComment[i].tagName=='SELECT') str=str+encodeURIComponent(formComment[i].options[formComment[i].selectedIndex].value)+'&';
	else str=str+encodeURIComponent(formComment[i].value)+'&';
     }
 str=str.slice(0,-1);
 ajaxLoad('answer','/log/donate.php','Отправка...', str);
 return false;
}

function BuildHttp(frm, wait){
    var str='';
    if(frm.tagName=='INPUT'){/*передан input type=submit*/
        if(frm.name)str=encodeURIComponent(frm.name)+'='+encodeURIComponent(frm.value)+'&';
        frm=frm.form;
    }
    var els=frm.getElementsByTagName("INPUT");
    var elsLen=els.length, v;
    for (i=0, j=0; i < elsLen; i++)
        if( els[i].type=='submit' && wait ) {
            els[i].disabled=true;
            v=els[i].value;
            els[i].value='Ожидайте...';
            window.setTimeout(function(o,v){return function(){o.disabled=false;o.value=v;}}(els[i],v),3000);
        }
    for (var i=0; i<frm.length; i++) if(frm[i].name){
        if(frm[i].disabled)continue;
        //console.log(frm[i].tagName,frm[i].name,frm[i].selectedIndex);
        if(!frm[i].name){
        }else if(frm[i].tagName=='SELECT'&&frm[i].selectedIndex>=0){
            str=str+encodeURIComponent(frm[i].name)+'='+encodeURIComponent(frm[i].options[frm[i].selectedIndex].value)+'&';
        }else if((frm[i].tagName=='INPUT')&& ((frm[i].type=='radio')|| (frm[i].type=='checkbox'))){
            if(frm[i].checked) str+=encodeURIComponent(frm[i].name)+'='+encodeURIComponent(frm[i].value)+'&';
        }else if(frm[i].tagName=='INPUT' && frm[i].type=='submit' ){
            str=str+encodeURIComponent(frm[i].name)+(frm[i].value?'='+encodeURIComponent(frm[i].value):'')+'&';
        }else{
            if(frm.method=='GET') str=str+encodeURIComponent(frm[i].name)+(frm[i].value?'='+encodeURIComponent(frm[i].value):'')+'&';
            else str=str+encodeURIComponent(frm[i].name)+'='+(frm[i].value?encodeURIComponent(frm[i].value):'')+'&';
            }
    }
    str=str.slice(0,-1);
    return str;
}

/** универсальная отправка формы на onsubmit или на onclick
 */
function SendForm(obj,frm,msg,AddHistory){
    var str=BuildHttp(frm,!0);
    if(frm.tagName=='INPUT'){/*передан input type=submit*/
        frm=frm.form;
    }
    if(frm.method=='get'){
     ajaxLoad(obj, frm.action+(frm.action.indexOf('?')>0?'&':'?')+str, (msg ? msg : 'Отправка...'));
 }else{
     ajaxLoad(obj, frm.action, (msg ? msg : 'Отправка...'), str);
 }
 if(obj!='info')fb_close();
 if(AddHistory)UpdateUrl(MainUrl=(frm.action.indexOf('/api.php?')!==-1?frm.action.replace('/api.php?','/?'):frm.action)+(str?(frm.action.indexOf('?')!==-1?"&":"?"):'')+str);
 return false;
}

function searchNameq(obj,str){
if(str.value.length>2){
  if(AjaxSearch==str.value)return;
  if(searchTimer)clearTimeout(searchTimer);
  AjaxSearch=str.value;
  searchTimer=window.setTimeout('searchLoad("'+obj+'")',1000);  // загружаю через 1 секунду после последнего нажатия клавиши
  /*document.onkeypress=function(){
       var e=arguments[0] || window.event;
       var code=e.keyCode?e.keyCode:(e.which?e.which:e.charCode);
//       if(e.ctrlKey && code==13)
	if(code==40) // вниз
	if(code==38) // вверх
}*/
}else if(searchTimer)clearTimeout(searchTimer);
}
function searchLoad(obj){
  ajaxLoad(obj,'/log/php_search.php?q='+encodeURIComponent(AjaxSearch),'Загрузка...', '')
  timer=0;
}
function LoadMain(e0){
 e=e0||window.event;
 if(e){if(e.ctrlKey||e.shiftKey)return true;} // если нажата Ctrl или Shift, то загружать в отдельном окне

 if(e0 && e0.stopPropagation){e0.stopPropagation();e0.preventDefault();}       // для DOM-совместимых браузеров
 else window.event.cancelBubble=true; //для IE

 var url=getEventTarget(e0);
 if(url.nodeName!='A'&&url.parentNode)url=url.parentNode;

 if(url.href)url=url.href;
 LoadMainUrl(url,1);
 return false;
}

function getCookie( name ) {
	var start=document.cookie.indexOf( name + '=' );
	var len=start + name.length + 1;
	if( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) return null;
	if( start == -1 ) return null;
	var end=document.cookie.indexOf( ';', len );
	if( end == -1 ) end=document.cookie.length;
	return unescape( document.cookie.substring( len, end ) );
}

function setCookie( name, value, expires, path, domain, secure ) {
	var today=new Date();
	today.setTime( today.getTime() );
	if( expires ) expires=expires * 1000 * 60 * 60 * 24;
	var expires_date=new Date( today.getTime() + (( expires ) ? expires : 1000 * 60 * 60 * 24 ) );
	document.cookie=name+'='+escape( value ) +
		';expires='+expires_date.toGMTString() +
		( ( path ) ? ';path=' + path : '' ) +
		( ( domain ) ? ';domain=' + domain : '' ) +
		( ( secure ) ? ';secure' : '' );
}

function deleteCookie( name, path, domain ) {
	if( getCookie( name ) ) document.cookie=name + '=' +
			( ( path ) ? ';path=' + path : '') +
			( ( domain ) ? ';domain=' + domain : '' ) +
			';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

/*
function Reklama(a){
if(a=='') a='http://www.ruclicks.com/in/fh8s9e3t';
rekl=window.open(a,'rekl');
//rekl=window.open(a,'rekl','screenX=1200,screenY=1300,height=100,width=100,location=no,toolbar=no,directories=no,menubar=no,status=no,scrollbars=0,resizable=no');
rekl.blur();
window.setTimeout('rekl.close()',Math.random()*70000);
}
*/

function CopyToClipboard(text)
{if(!text)return;
text=text.replace(/Скопировать в буффер/g,"");
if(window.clipboardData)window.clipboardData.setData("Text", text);
else if(window.netscape){
try {if(netscape.security.PrivilegeManager.enablePrivilege)netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
} catch (e) {alert('Настройка безопасности браузера не позволяет обращаться к буферу обмена!\n'+e); return false;}
   var clip=Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
   if(!clip) return false;
   var trans=Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
   if(!trans) return false;
   trans.addDataFlavor('text/unicode');
   var str=new Object();
   var len=new Object();
   var str=Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
   var copytext=text;
   str.data=copytext;
   trans.setTransferData("text/unicode",str,copytext.length*2);
   var clipid=Components.interfaces.nsIClipboard;
   if(!clip) return false;
   clip.setData(trans,null,clipid.kGlobalClipboard);
}
return true;
}

function SelectAll(a){
a.onmousedown=null;
if(CopyToClipboard(getText(a))) alert("Сохранено в буфер обмена!\r\nПри копировании материалов сайта активная ссылка на HtmlWeb.ru обязательна!"); else alert("При копировании материалов сайта активная ссылка на HtmlWeb.ru обязательна!");
}

if(!document.funcDomReady)document.funcDomReady='';

function onDomReady(func) {
var oldonload=document.funcDomReady;
document.funcDomReady=function(){if(typeof oldonload == 'function')oldonload(); func();};
/*if(typeof document.funcDomReady != 'function'){
    if(document.funcDomReady)console.error('Ошибка в document.funcDomReady',document.funcDomReady);
    document.funcDomReady=func;
}else{	document.funcDomReady=function() {
	oldonload();
	func();}}
*/
}
function init() {
if(arguments.callee.done) return;
arguments.callee.done=true;
if(document.funcDomReady){document.funcDomReady();document.funcDomReady='';}	// вызываем всю цепочку обработчиков
}
if(document.addEventListener)document.addEventListener("DOMContentLoaded", init, false);

/*@cc_on @*/
/*@if(@_win32)
document.write("<script id=\"__ie_onload\" defer=\"defer\" src=\"javascript:void(0)\"><\/script>");
var script=document.getElementById("__ie_onload");
script.onreadystatechange=function(){if(this.readyState=="complete")init();};
/*@end @*/

if(/WebKit/i.test(navigator.userAgent)) { // для Safari
    var _timer=setInterval(function() {
	if(/loaded|complete/.test(document.readyState)) {
	    clearInterval(_timer);
	    init(); // вызываем обработчик для onload
	}
    }, 10);
}
var OldOnload=window.onload;
if(typeof OldOnload === "function"){
	window.onload=function() {
		OldOnload();
		init();
		};
}else
	window.onload=init; // для остальных браузеров

function LoadScript(src,f){
    var el=document.createElement('script');
    el.setAttribute('src',src);
    el.setAttribute('type','text/javascript');
    el.setAttribute('async',true);
    el.setAttribute('charset','windows-1251');
    if(typeof f == 'function')addEvent(el,'load',f);
    document.getElementsByTagName('head')[0].appendChild(el);
    //console.log('LoadScript: '+src);
return el;
}

function ExecScript(src){
    var el=document.createElement('script');
    el.setAttribute('type','text/javascript');
    try{el.appendChild(document.createTextNode(src));}catch(e){alert('Ошибка '+e+' выполнения\n'+src);}
    document.body.appendChild(el);
    if(document.funcDomReady){document.funcDomReady();document.funcDomReady='';}
return el;
}

function add_favorite(a) {
//  try {
//	if(document.all) window.external.AddFavorite(document.location.href, document.title);
	if((typeof window.external == "object") && (typeof window.external.AddFavorite == "function")) window.external.AddFavorite(document.location.href, document.title);
	else if(typeof(opera)=="object") { a.rel="sidebar"; a.title=document.title; a.url=document.location.href; return true; }
	else if((typeof window.sidebar == "object") && (typeof window.sidebar.addPanel == "function")) window.sidebar.addPanel(document.title,document.location.href,"");
//    }
//    catch (e) {
        alert('Нажмите Ctrl-D чтобы добавить страницу в закладки');
//      }
return false;
}

/*
function add_favorite(a) {
  title=document.title;
  url=document.location;
  try {
    // Internet Explorer
    window.external.AddFavorite(url, title);
  }
  catch (e) {
    try {
      // Mozilla
      window.sidebar.addPanel(title, url, "");
    }
    catch (e) {
      // Opera
      if(typeof(opera)=="object") {
        a.rel="sidebar";
        a.title=title;
        a.url=url;
        return true;
      }
      else {
        // Unknown
        alert('Нажмите Ctrl-D чтобы добавить страницу в закладки');
      }
    }
  }
  return false;
}*/


var addEvent=(function(){
	if(document.addEventListener){
        	return function(obj, type, fn, useCapture){
                    if(!obj)console.error(obj, type, fn, useCapture);
                    if(typeof(obj)!="object")obj=document.getElementById(obj);
                    //console.log("addEvent:",obj,fn);
                	if(obj)obj.addEventListener(type, fn, useCapture);
	}
	} else if(document.attachEvent){ // для Internet Explorer
	return function(obj, type, fn, useCapture){
            if(typeof(obj)!="object")obj=document.getElementById(obj);
	        obj.attachEvent("on"+type, fn);
	}
	} else {
	return function(obj, type, fn, useCapture){
            if(typeof(obj)!="object")obj=document.getElementById(obj);
	        obj["on"+type]=fn;
	}
	}
})();

function removeEvent(obj, eventType, handler)
{    if(obj&&typeof(obj)!="object")obj=document.getElementById(obj);
    return (obj.detachEvent ? obj.detachEvent("on" + eventType, handler) : ((obj.removeEventListener) ? obj.removeEventListener(eventType, handler, false) : null));
}

function getEventTarget(e,tag) {
    e = e || window.event;
    var target=e.target || e.srcElement;
    if(typeof target == "undefined"){
        target=e; // передали this, а не event
    }else{
        if (target.nodeType==3) target=target.parentNode;// боремся с Safari
    }
    if(tag!=null)while((target) && target.nodeName!=tag)target=target.parentNode;
    return target;
}

function onComments(){
try {if(typeof VK == "object")VK.Widgets.Comments('vk_comments',{limit:10,width:'610',attach:false,onChange:addCommentCallback});
} catch (e) {}
return ajaxLoad('insertComment','/log/donate.php','Загрузка...');
}

function CheckClick(e){
   t=e.previousSibling.previousSibling;
   if( (t.tagName=='INPUT')&&(t.type=='checkbox'||t.type=='radio')) t.click();
}

function getOffset(obj,f_modal) { // f_modal - xcxbnfnm относительно модального окна. если div будет внутри окна
    if(obj.getBoundingClientRect){
        var box = obj.getBoundingClientRect();
        var body = document.body;
        var docElem = document.documentElement;
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;
        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        while(obj) {
            c=window.getComputedStyle(obj, null);
            //console.log(obj,c);
            if(f_modal && (c.position=='fixed'||c.position=='absolute')){
                top-=parseInt(c.top)+parseInt(c.marginTop);
                left-= parseInt(c.left)+parseInt(c.marginLeft);
                //console.log(c.top,c.left);
                break;
            }
            obj = obj.offsetParent;
        }
        //log("getOffset:getBoundingClientRect");
        return { top: Math.round(top), left: Math.round(left) }
    }else{
        var top=0, left=0;
        while(obj) {
            var c=window.getComputedStyle(obj, null);
            if(f_modal && (c.position=='fixed'||c.position=='absolute'))break;
            top+=parseInt(obj.offsetTop);
            left+=parseInt(obj.offsetLeft);
            obj = obj.offsetParent;
        }
        //log("getOffset:calc");
        return {top: top, left: left}
    }
}

var _tt=function(){ //всплывающие подсказки
    var id='tt';
    var top=3;
    var left=3;
    var maxw=300;
    var speed=4;
    var timer=10;
    var endalpha=95;
    var alpha=0;
    var tt,t,h;
    var ie=document.all ? true : false;
    return{
        show:function(e,v,w){
            var t=getEventTarget(e);addEvent(t,'mouseout',this.hide); //t.style.cursor='help';
            if(tt==null){
                tt=document.createElement('div');
                tt.setAttribute('id',id);
                document.body.appendChild(tt);
                tt.style.opacity=0;
                if(ie)tt.style.filter='alpha(opacity=0)';
                addEvent(tt,'mouseover',this.over);
                addEvent(tt,'mouseout',this.hide);
                //addEvent(document,'mousemove',this.pos);
            }
            tt.style.display='block';
            tt.innerHTML=v;
            var dd=getOffset(t);
            if(!w){
                w=Math.min(maxw, wW()-dd.left-55);
            }
            if(w<100){
                w+=100;
                dd.left-=w+26;
                tt.style.borderRadius='10px 10px 0 10px';
            }else{
                tt.style.borderRadius='';
            }
            tt.style.width=w ? w + 'px' : 'auto';
            if(tt.offsetWidth > maxw){tt.style.width=maxw+'px'}
            h=parseInt(tt.offsetHeight) + top;
            _tt.over(e);
            tt.style.top = (dd.top-h+4) +  "px";
            tt.style.left = (dd.left+13) + "px";
        },
        pos:function(e){
            var u=ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
            var l=ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
            tt.style.top=(u - h) + 'px';
            tt.style.left=(l + left) + 'px';
        },
        fade:function(d){
            var a=alpha;
            if((a != endalpha && d == 1) || (a != 0 && d == -1)){
                var i=speed;
                if(endalpha - a < speed && d == 1){i=endalpha - a;
                }else if(alpha < speed && d == -1){i=a;}
                alpha=a + (i * d);
                tt.style.opacity=alpha * .01;
                if(ie)tt.style.filter='alpha(opacity=' + alpha + ')';
            }else{
                clearInterval(tt.timer);
                if(d == -1){tt.style.display='none'}
            }
        },
        hide:function(e){
            clearInterval(tt.timer);
            tt.timer=setInterval(function(){_tt.fade(-1)},timer);
        },
        over:function(e){
            clearInterval(tt.timer);
            tt.timer=setInterval(function(){_tt.fade(1)},timer);
        }
    };
}();


function tabs(t,p){
    var l=t.parentNode.getElementsByTagName('a');
    var j=0; var o=null;
    for(var i=0;i<l.length;i++){removeClass(l[i],'on'); if(l[i]==t)j=i;}
    addClass(t,'on');
    var u=t.href;
    if(p==null)p=t.parentNode.parentNode.nextSibling;while(p.tagName!="DIV")p= p.nextSibling; // ищу следующий блок DIV-ов
    for(i=0;i<l.length&&p!=null;i++){
        if(i==j){removeClass(p,'hide'); o=p; }
        else addClass(p,'hide');
        p=p.nextSibling;
        while(p!=null && p.tagName!="DIV")p=p.nextSibling;
        if(p==null)break;

    }
    if(o.innerHTML=='')ajaxLoad(o, u+(u.indexOf('?')>=0?'&':'?')+'ajax=1','Загрузка...'); // если div пустой запрашиваю данные для него
    return false;
}
/**
 * возвращает адрес без GET параметров. Если url не передан, то от текущего документа
 * @param url
 * @returns {*}
 */
function getUrl(url){
    if(!url)url=document.location.href;
    var i=url.indexOf('?');
    if(i>=0)url=url.substr(0,i-1);
    i=url.indexOf('#');
    if(i>=0)url=url.substr(0,url.indexOf('#'));
    if(url.indexOf(' ')>= 0)url=trim(url);
    if(url.substr(0,14)=='http://http://')url=url.substr(7);
    if(url.indexOf(' ')>0)url=url.substr(0,url.indexOf(' '));
    if(url=='http://'||url=='https://')return '';
    return url;
}

function layer(a,cl){
    if(!cl)cl='layer';
    //console.log(cl,a);
    var l=getElementsByClass(cl,null,'div');
    for(var i=0;i<l.length;i++)l[i].style.display=(i==a?'block':'none');
    if(l[a].innerHTML==''){ // если div пустой запрашиваю данные для него
        var url=getUrl();
        if((i=url.lastIndexOf('/'))>=0)url=url.substr(0,i-1);
    //console.log(url+'/api.php?layer='+a);
        //ajaxLoad(l[a],url+'/api.php?layer='+a,'Загрузка...');
    }
    l=getElementsByClass(cl,null,'span');
    for(i=0;i<l.length;i++){
        if(i==a)addClass(l[i],'act');
        else removeClass(l[i],'act');
        if(i==a)window.location.hash=getText(l[i]);}
}

function layer_(a){
if(a==null)a=/*window.location.hash;*/new String(document.location.hash).replace("#","");
var l=getElementsByClass('layer',null,'span');
for(var i=0;i<l.length;i++)
	if(encodeURIComponent(getText(l[i]))==a){/*layer(i);*/l[i].onclick();break;}
}

/** добавляет вкладку, возвращает div */
function layerAdd(tSpan,cl,url){
    if(!cl)cl='layer';
    var s=getElementsByClass(cl,null,'span');
    var ld=getElementsByClass(cl,null,'div');
    var a=s.length;
    var o=null; var d=null;
    for(var i=0;i<a;i++)if(encodeURIComponent(getText(s[i]))==tSpan){o=s[i];d=ld[i];a--;break;}
    if(!o){
        o=document.createElement('span');
        o.setAttribute('class',cl);
        o.innerHTML=tSpan;
        p=s[a-1]; pp=p.parentNode;
        pp.insertBefore(o, p.nextSibling);
        pp.insertBefore(document.createTextNode("\n"), o); // иначе вкладки сливаются

        d=document.createElement('div');
        d.setAttribute('class',cl);
        ld[0].parentNode.appendChild(d);
    }
    if(url)o.setAttribute('data-url',url);
    addEvent(o, 'click',function(a,cl){return function(){layer(a,cl)}}(a,cl));
    layer(a,cl);
    return d;
}

/** удаляет вкладку */
function layerDel(num,cl){
    if(!cl)cl='layer';
    var l=getElementsByClass(cl,null,'span');
    if(l.length>=num)l[0].parentNode.removeChild(l[num-1]);
    l=getElementsByClass(cl,null,'div');
    if(l.length>=num)l[0].parentNode.removeChild(l[num-1]);
}

////////////////////////////////

function clear(o){
if(typeof(o)=="string")o=getObj(o);
if(o)while(o.firstChild&&o.hasChildns())o.removeChild(o.firstChild);
return o;}

function show(o){
    if(typeof(o)=="string")o=getObj(o);
    if(o.style.display=="none")o.style.display=(o.tagName=="DIV"?"block":"inline");
    removeClass(o,"hide");
    return false;}

function hide(o){
    if(o)addClass(o,"hide");
    return o;}

function move(o){
    if(typeof(o)=="string")o=getObj(o);
    var pos=0; while(o.offsetParent){ pos+=parseInt(o.offsetTop); o=o.offsetParent;}
    window.scroll(0,pos-10);
}

function removeID(o){
if(typeof(o)=="string")o=getObj(o);
if(o)o.parentNode.removeChild(o);
}

function reload(){
    window.location.reload();
}

function fb_smile(n){
ajaxLoad(n.parentNode.nextSibling,'/fb/smile.htm','Загрузка...');
n.onclick=new Function('fb_ShowSmile(this);');
}

function fb_ShowSmile(a){
a=a.parentNode.nextSibling; // <img></div><div>
a.style.display=(a.style.display=="block"?"none":"block");
}

var fb_modal=0;

function fb(act,id,t){
switch(act){
case 'comment':{
	fb_win('Ваш комментарий<br><form name="'+act+'" method="post" action="/other/api.php?id='+id+'&tbl='+t+'" onsubmit="SendForm(\'answer\',this);fb_close();return false;">'+
		'<textarea name="'+act+'" cols="80" rows="2" autofocus></textarea><br><input value="Отправить" type="submit"></form>',1);
	break;}
/*
case 'del':{
	if(confirm('Удалить?'))return ajaxLoad(t,'action.php?'+act+'='+id);
	break;}
*/
}
return false;
}

var _fade=function(){
	var speed=2;
	var timer=20;
	var otimer;
	var endalpha=95;
	var alpha=0;
	var tt;
	var ie=document.all ? true : false;
	var d=-1;/*по умолчанию затухание*/
	return{

		init:function(){
			window.setTimeout(function(){_fade.start()},2000);
		},
		start:function(){
			tt=getElementsByClass('fb-win1',null,'DIV');
			if(tt)tt=tt[tt.length-1];
            if(!tt){log('fade:start'); return;}
			addEvent(tt,'mouseover',function(e){_fade.over(e)});
			addEvent(tt,'mouseout',function(e){_fade.hide(e)});
			alpha=100;
			otimer=setInterval(function(){_fade.fade()},timer);
		},
		fade:function(){
			var a=alpha;
			if((a != endalpha && d == 1) || (a != 0 && d == -1)){
				var i=speed;
				if(endalpha - a < speed && d == 1){i=endalpha - a;
				}else if(alpha < speed && d == -1){i=a;}
				alpha=a + (i * d);
                if((tt)&&tt.style){
				tt.style.opacity=alpha * .01;
				if(ie)tt.style.filter='alpha(opacity=' + alpha + ')';
                }
			}else{
				clearInterval(otimer);
				if(d == -1)fb_close();
			}
		},
		hide:function(e){
			clearInterval(otimer);
			otimer=setInterval(function(){_fade.fade()},timer);
		},
		over:function(e){
			clearInterval(otimer);
			alpha=100;
			tt.style.opacity=1;
			if(ie)tt.style.filter='alpha(opacity=100)';
		}
	};
}();


function wW(){
    var de=document.documentElement;
    return self.innerWidth || ( de && de.clientWidth ) || document.body.clientWidth;
}
function wH(){
var e=document.documentElement;
return self.innerHeight||(e&&e.clientHeight)||document.body.clientHeight;
}

/*
if(!window.getComputedStyle) { // борьба с IE
    window.getComputedStyle=function(el, pseudo) {
        this.el=el;
        this.getPropertyValue=function (prop) {
            var re=/(\-([a-z]){1})/g;
            if(prop == "float") prop="styleFloat";
            if(re.test(prop)) {
                prop=prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        };
        return this;
    }
}
*/

"getComputedStyle" in window || function() { // борьба с IE
    function c(a, b, g, e) {
        var h = b[g];
        b = parseFloat(h);
        h = h.split(/\d/)[0];
        e = null !== e ? e : /%|em/.test(h) && a.parentElement ? c(a.parentElement, a.parentElement.currentStyle, "fontSize", null) : 16;
        a = "fontSize" == g ? e : /width/i.test(g) ? a.clientWidth : a.clientHeight;
        return "em" == h ? b * e : "in" == h ? 96 * b : "pt" == h ? 96 * b / 72 : "%" == h ? b / 100 * a : b;
    }
    function a(a, c) {
        var b = "border" == c ? "Width" : "", e = c + "Top" + b, h = c + "Right" + b, l = c + "Bottom" + b, b = c + "Left" + b;
        a[c] = (a[e] == a[h] == a[l] == a[b] ? [a[e]] : a[e] == a[l] && a[b] == a[h] ? [a[e], a[h]] : a[b] == a[h] ? [a[e], a[h], a[l]] : [a[e], a[h], a[l], a[b]]).join(" ");
    }
    function b(b) {
        var d, g = b.currentStyle, e = c(b, g, "fontSize", null);
        for (d in g) {
            /width|height|margin.|padding.|border.+W/.test(d) && "auto" !== this[d] ? this[d] = c(b, g, d, e) + "px" : "styleFloat" === d ? this["float"] = g[d] : this[d] = g[d];
        }
        a(this, "margin");
        a(this, "padding");
        a(this, "border");
        this.fontSize = e + "px";
        return this;
    }
    b.prototype = {};
    window.getComputedStyle = function(a) {
        return new b(a);
    };
}();

function fb_win(html,ev){
fb_modal=document.createElement('div');
fb_modal.setAttribute('class','fb-win');
fb_modal.innerHTML=((ev==2)?'':'<div class="fb-win0" onclick="fb_close()"></div>')+'<div class="fb-win1">'+
'<a class="i_del close" onclick="fb_close();return false;" title="Закрыть" href="#"></a>'+html+
'<div class="dragbar" onmousedown="DD.start(event)" onmouseup="DD.stop(event)" oncontextmenu="return false" ondragstart="return false" ondblclick="DD.full(event)" ondragend="return DD.stop(event)"></div></div>';
document.body.appendChild(fb_modal);
if(ev){
    if(ev==1){d=document.forms;d=d[d.length-1][0].focus();}
	else if(ev==2){_fade.init();}
    else {/*console.log("eval:",ev); eval(ev);*/ExecScript(ev);}
    }
addEvent(document, "keydown", fb_close);
// todo получаю координаты курсора, и если окно в районе курсора - сдвигаю его
var t=getElementsByClass('fb-win1',null,'DIV');
if(t)t=t[t.length-1];
    var c=window.getComputedStyle(t, null);//t.currentStyle ||
    //console.log(parseInt(c.height)+'~'+wH());
    if(parseInt(c.height)>wH()*0.5){
        var e=t.style;
        if(parseInt(c.height)>wH()*0.99){
            e.top='0'; e.height=(wH()-25)+'px';e.overflowY='scroll';
            e=getElementsByClass('dragbar',fb_modal,'DIV'); if(e.length>0)e[0].style.width='450px';
        }else e.top=Math.floor((wH()-parseInt(c.height))/2-5)+'px';
}
return fb_modal;
}

function fb_close(e){// вызывается при нажатии клавиши в модальном окне и при нажатии на крестик
if(typeof(e)=='object'){
   e=e||window.event;
   if(e.type=='keydown'){
	if(e.keyCode==27)fb_close(); // Esc
	return;}
}
var a=getElementsByClass('fb-win',null,'DIV');
if(a){
   removeID(a[a.length-1]);
   if(a.length<2)removeEvent(document, "keydown", fb_close);
}
}

function fb_err(mes){
fb_win(mes);//.className="error clear";
}

function fb_mes(mes){
fb_win(mes);//.className="info clear";
}

function IsUrl(t){ //  oninput="IsUrl(this)" required
u=t.value;
if(u.substr(0,14)=='http://http://')u=u.substr(7);
if(u==''||u=='http://'){t.setCustomValidity("Укажите URL!");return;}
u=u.replace(/\,/, ".");
u=u.replace(/\.\./, ".");
if(u.indexOf(' ')>7)u=u.substr(0,u.indexOf(' '));
if(u.indexOf(' ')>=0||u.indexOf('.')<0) {t.setCustomValidity("Укажите корректный URL!");return;}
if(u.slice(0,7)!='http://'&&u.slice(0,8)!='https://')u='http://'+u;
t.value=u;
t.setCustomValidity("");
return;
}

function addClass(o, c){
    if(typeof(o)!="object")o=document.getElementById(o);if(!o)return;
    var re=new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
    if(re.test(o.className)) return;
    o.className=(o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
}

function removeClass(o, c){
    if(typeof(o)!="object")o=document.getElementById(o);if(!o)return;
    var re=new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
    o.className=o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "")
}

var DD = { //перемещение окна
    DDmove: false,
    DDobj: null,
    DDx: 0,
    DDy: 0,
    start: function (e) {
        if (DD.DDmove)return false;
        DD.DDobj = getEventTarget(e).parentNode;
        e = e || window.event;
        //DD.DDobj.style.position = 'absolute';
        var c=window.getComputedStyle(DD.DDobj, null);
        DD.DDx=parseInt(c.left) - e.clientX;
        DD.DDy=parseInt(c.top) - e.clientY;
        /*
         var xy = getOffset(DD.DDobj);
         DD.DDx = parseInt(xy.left) - (document.all ? event.clientX : e.clientX);
         DD.DDy = parseInt(xy.top) - (document.all ? event.clientY : e.clientY);
         DD.DDobj.style.marginLeft = "0px";
         */
        DD.DDobj.style.left = DD.DDx + e.clientX + "px";
        DD.DDobj.style.top = DD.DDy + e.clientY + "px";
        DD.DDmove = true;
        addEvent(document, 'mousemove', DD.drag_drop);
        //addEvent(DD.DDobj0, 'mouseup', DD.stop);
    },
    stop: function (e) {
        DD.DDmove = false;
        removeEvent(document, 'mousemove', DD.drag_drop);
        //removeEvent(DD.DDobj0, 'mouseup', DD.stop);
        return true;
    },
    drag_drop: function (e) {
        if (DD.DDmove) {
            e = e || window.event;
            DD.DDobj.style.left = DD.DDx + e.clientX + "px";
            DD.DDobj.style.top = DD.DDy + e.clientY + "px";
            return false;
        }
        return true;
    },
    full: function (e) {
        e = e || window.event;
        var s=DD.DDobj.style;
        var c=window.getComputedStyle(DD.DDobj, null);
        var d=getElementsByClass('dragbar',DD.DDobj,'DIV');
        if(DD.DDobj.getAttribute('data-left')){
            s.left = DD.DDobj.getAttribute('data-left');
            s.top = DD.DDobj.getAttribute('data-top');
            s.width=DD.DDobj.getAttribute('data-width');
            s.height=DD.DDobj.getAttribute('data-height');
            s.marginLeft=DD.DDobj.getAttribute('data-marginLeft');
            if(d.length>0)d[0].style.width=DD.DDobj.getAttribute('data-dragbar');
            DD.DDobj.setAttribute('data-left','');
            DD.DDobj.setAttribute('data-top','');
            DD.DDobj.setAttribute('data-width','');
            DD.DDobj.setAttribute('data-height','');
            DD.DDobj.setAttribute('data-marginLeft','');
            DD.DDobj.setAttribute('data-marginLeft','');
        }else{
            DD.DDobj.setAttribute('data-left',c.left);
            DD.DDobj.setAttribute('data-top',c.top);
            DD.DDobj.setAttribute('data-width',c.width);
            DD.DDobj.setAttribute('data-height',c.height);
            DD.DDobj.setAttribute('data-marginLeft',c.marginLeft);
            if(d.length>0){
                DD.DDobj.setAttribute('data-dragbar',d[0].style.width);
                d[0].style.width=(wW()-50)+'px';
            }
            s.left = "0px";
            s.top = "0px";
            s.width=(wW()-10)+'px';
            s.height=(wH()-10)+'px';
            s.marginLeft=0;
        }
        return false;
    }
};

var BannerLoader=function(id, onScroll, url){
	var cm=(document.compatMode=="CSS1Compat"),de=document.documentElement,db=document.body;
	var banner=obj=getObj(id);
	if(!obj)return;
	var code=function(){
		return (url.substr(0,1)=='<'?url:'<iframe src="'+url+'" frameborder="0" vspace="0" hspace="0" width="'+obj.style.width+'" height="'+obj.style.height+'" marginwidth="0" marginheight="0" scrolling="no" style="overflow:hidden"></iframe>');
		};
	if(!onScroll) { obj.innerHTML=code(); banner.style.visibility="visible";return;}
	var ch=banner.currentStyle || window.getComputedStyle(banner, null);
	var ar_top=parseInt(ch.height)/2;// if(!ar_top)ar_top=30;
	while(obj.offsetParent){ ar_top+=obj.offsetTop; /*log('~'+id+':',obj,', top:',obj.offsetTop);*/ obj=obj.offsetParent;}

	//если эта реклама увеличит длину страницы и под неё не выделено место - не загружать её
	var c=db.currentStyle || window.getComputedStyle(db, null);

	//log(id+':', parseInt(c.height)-150,"<",ar_top, "&&", ch.height);

	if(parseInt(c.height)-150<ar_top && parseInt(ch.height)<10 )return;

	var ar_scroll=function(){
		var ch=self.innerHeight || cm && de.clientHeight || db.clientHeight;
		var st=self.pageYOffset || cm && de.scrollTop || db.scrollTop;
		if(ar_top > st && st + ch > ar_top){
			removeEvent(window, 'scroll', ar_scroll);
			//log(id+':',st+'+'+ch,'h='+c.height,'==',st+ch+240,ar_top);
			banner.innerHTML=code();
			banner.style.visibility="visible";
		}
	};
	addEvent(window, 'scroll', ar_scroll);
	ar_scroll();
};

function Banner_Fix(id){
    var cm=(document.compatMode=="CSS1Compat"),de=document.documentElement,db=document.body;
    var o1=o=getObj(id); if(!o1||wH()<680)return;
    var pos=0; while(o1.offsetParent){ pos+=parseInt(o1.offsetTop); o1=o1.offsetParent;}// позиция банера на странице
    o.fix=0;

    var v2_scroll = function(o,pos){ return function () {
        var st = self.pageYOffset || cm && de.scrollTop || db.scrollTop; // на сколько прокрутили
        if(o.fix<0)return;
        if(st>pos){
            if(!o.fix){
                var c=window.getComputedStyle(o, null);
                o.parentNode.style.height= c.height;
                addClass(o,'fix');
                o.fix=1;
                if(c.position!='fixed'){o.fix=2;o.style.top='2px';}
            }
        }else if(st<pos){
            if(o.fix){removeClass(o,'fix');
                o.parentNode.style.height='auto';
                if(o.fix==2)o.style.top=pos+'px';
                o.fix=0;}
        }
    };
    }(o,pos);
    addEvent(window, 'scroll', v2_scroll);
    v2_scroll();
}

/**
 * @return {boolean}
 */
function Resize(v){
    //e=document.body;
    e=getObj("hypercontext");
    var c=e.currentStyle || window.getComputedStyle(e, null);
    if(v)c=Math.max(8,Math.min(20,parseInt(c.fontSize)+v))+'px';
    else c='11px';
    e.style.fontSize= c;
    setCookie( "fontSize", c);
    return false;
}
if(i=getCookie("fontSize"))onDomReady(function(o){return function(){getObj("hypercontext").style.fontSize=o;}}(i));

/*
window.onerror=function(msg, url, line) {
try {
	if(msg && url && typeof url != "undefined") if(url.indexOf(window.location.hostname)>=0){
		var data=new FormData();
		data.append('msg', msg);
		data.append('url', url);
		data.append('ref', document.location.href);
		data.append('line', line);
		var xhr=new XMLHttpRequest();
		xhr.open('POST', '/log/jserr.php', false);
		xhr.send(data);
		return true;
	}
	log(msg, url, line);
} catch (e) {
	log(e);
}
return true;
}



function updateQS(uri, key, value) {
    var re=new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
    var separator=uri.indexOf('?') !== -1 ? "&" : "?";
    if(uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

*/
if(typeof api == 'undefined')var api='api.php';

function LoadInput(t,v){
    t.onclick=null;
    var id=0, tbl='';
    var n=t;
    do{
        console.log(n);
        if(n.getAttribute('data-tbl'))tbl=n.getAttribute('data-tbl');
        if(n.nodeName=='TR'&&t.getAttribute('id')){id=n.id.slice(1);break}
        if(n.getAttribute('data-id')){id=n.getAttribute('data-id');break}
    }while((n=n.parentNode) && (n.tagName!='BODY'));
    if(!id){alert('Ошибка определения id !');return false;}
    var b=getText(t);
    b=b.replace(/^[\s\,\.]*/, "").replace(/[\s\,\.]*$/, "");
    ajaxLoad(t,api+'?loadinput='+v+'&val='+encodeURIComponent(b)+'&id='+id+(tbl?'&tbl='+tbl:''));
}

function SendInput(t){
    if(t.type=="number") t.setCustomValidity((/^[0-9]*$/.test(t.value)?'':t.ValidationMessage));
    if(!t.checkValidity())return false;
    var id=0, tbl='', url='', str;
    var n=t;
    if(typeof api == 'string')url=api;
    do{
        //console.log(n);
        if(n.getAttribute('data-api'))url=n.getAttribute('data-api');
        if(n.getAttribute('data-tbl'))tbl=n.getAttribute('data-tbl');
        if(n.nodeName=='TR'&&n.getAttribute('id')){id=n.id.slice(1);}
        if(n.getAttribute('data-id')){id=n.getAttribute('data-id');}
    }while((n=n.parentNode)&&tbl==''&& n.nodeName!='BODY');
    if(!id){alert('Ошибка определения id !');return false;}

    if(t.tagName=='SELECT') str=encodeURIComponent(t.name)+'='+encodeURIComponent(t.options[t.selectedIndex].value);
    else if((t.tagName=='INPUT')&& ((t.type=='radio')|| (t.type=='checkbox'))){str=encodeURIComponent(t.name)+'='+(t.checked?encodeURIComponent(t.value):0);}
    else str=encodeURIComponent(t.name)+'='+encodeURIComponent(t.value);

    ajaxLoad(t,api+'?ajax='+id+(tbl?'&tbl='+tbl:''),'', str);
    return false;
}

function Ok(t){
    //console.log(t);
    if(t.type=='checkbox' && t.parentNode && t.parentNode.nodeName=='LABEL')t=t.parentNode;
    addClass(t,'valid');
    setTimeout(function(){removeClass(t,'valid');},3000);
}

function trim(b){ return b.replace(/^\s*/, "").replace(/\s*$/, "")}

function addMail(t){
    var m=getObj("mail");
    if(m){
        m=m.value;
        if(IsMail(m)){ t.href=t.href+"&mail="+encodeURIComponent(m);} else {alert("Неверный email-адрес!"); return false;}
    }
    return true;
}

function addCommentCallback(num, last_comment, date, sign){
    try {
        if(num && last_comment && date && sign){
            var data=new FormData();
            data.append('num', num);
            data.append('last_comment', last_comment);
            data.append('date', date);
            data.append('sign', sign);
            data.append('ref', document.location.referrer);
            var xhr=new XMLHttpRequest();
            xhr.open('POST', '/log/jscomment.php', false);
            xhr.send(data);
            return true;
        }
        log(num, last_comment, date);
    } catch (e) {
        log(e);
    }
    return true;
}

function addSoc(a) {
    h=encodeURIComponent(window.location.href+window.location.hash);
    t=encodeURIComponent(document.title);
    if(a==1)h='vkontakte.ru/share.php?url='+h+'&title='+t;
    else if(a==2)h='odnoklassniki.ru/dk?st.cmd=addShare&st.s=1000&st._surl='+h+'&tkn=3009';
    else if(a==3)h='www.livejournal.com/update.bml?mode=full&subject='+t+'&event='+h;
    else if(a==4)h='twitter.com/timeline/home?status='+t+'%20'+h;
    else if(a==5)h='www.facebook.com/share.php?u='+h;
    //else if(a==6)h='wow.ya.ru/posts_share_link.xml?url='+h+'&title='+t;
    else if(a==7)h='connect.mail.ru/share?url='+h+'&title='+t+'&description=&imageurl=';
    else if(a==8)h='moikrug.ru/share?ie=utf-8&url='+h+'&title='+t+'&description=';
    else return true;
    window.open('http://'+h,'Soc','screenX=100,screenY=100,height=500,width=500,location=no,toolbar=no,directories=no,menubar=no,status=no');
    return false;
}


function AdbDetector(){
    var cookieName = "AdbDetector";
    var banner = getElementsByClass('adsbygoogle',document,'INS');
    if(banner.length>0 && !getCookie(cookieName)){
        banner=banner[0].firstElementChild;
        setCookie(cookieName, 1); // чтобы сообщение выдавалось не чаще одного раза в сутки
        if(banner){
            var c=window.getComputedStyle(banner, null);
            c=parseInt(c.height); // получаю реальную высоту div - блока
        }else{
            c=0;
        }
        if (isNaN(c) || (c == 0)) {
            console.log(banner, c);
            alert("В вашем браузере установлено дополнение Adblock, которое частично блокирует функционал сайта." +
                "\nНеобходимо отключить его на нашем сайте." +
                "\nДля этого нажмите на красный значек ABP и выберите 'Отключить на "+document.location.hostname+"'");
        }
    }//else console.log(banner);
}

onDomReady(function(){oef();Banner_Fix("rekl");/*setTimeout(AdbDetector(),3000);*/});

function log(e){if(typeof console!="undefined"&& typeof console.log === "function") console.log(e);}

