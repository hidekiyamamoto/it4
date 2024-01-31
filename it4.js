var locales={'ita':'it-IT','deu':'de-DE','eng':'en-EN','fra':'fr-FR','spa':'es-ES'};
var d_to_s=function(d,ll){if(!d){d=new Date();}else{d=new Date(d);}console.log(ll);let oo={year:'numeric',month:'short',day:'numeric'};
return d.toLocaleDateString(locales[ll], oo);};
const all_htmlentities={/*"&":"&amp;"," ":"&nbsp;"*/
	"'":"&apos;","<":"&lt;",">":"&gt;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;",
	"¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;",
	"´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;",
	"¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;",
	"È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;",
	"Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;",
	"Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;",
	"æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;",
	"ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;",
	"ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;",
	"Ÿ":"&Yuml;","ƒ":"&fnof;","ˆ":"&circ;","˜":"&tilde;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;",
	"Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;",
	"Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;",
	"ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;",
	"ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&Upsih;",
	"ϖ":"&piv;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;",
	"•":"&bull;","…":"&hellip;","‰":"&permil;","′":"&prime;","″":"&Prime;","‹":"&lsaquo;","›":"&rsaquo;","‾":"&oline;","⁄":"&frasl;","€":"&euro;",
	"™":"&trade;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","⇒":"&rArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∇":"&nabla;",
	"∏":"&prod;","∑":"&sum;","−":"&minus;","√":"&radic;","∞":"&infin;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;",
	"≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊥":"&perp;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"
};const inoe=function(v){/*{R:'boolean',DESC:'returns true if value Is Null Or Empty, false otherwise',v:{T:'string',DESC:'the value to test'}}*/
		if(!v){return true}return (v==null||v==='');};
(function(exports){
	exports.inoe=inoe;
	exports.$$=function(e){if(typeof e=='string'){e=document.getElementById(e);}return e;};
	exports.att=function(e,a,_v){/*{R:'value',DESC:'gets or sets an attribute in any document node',e:{T:'node',DESC:'The element from to read or set the attribute'},a:{T:'string',DESC:'the name of the attribute'},_v:{T:'value',DESC:'If provided, the element\'s attribute will be set to this value'}}*/
		if(e){if(_v){e.setAttribute(a,_v);}else{return e.getAttribute(a)}}return false};
	exports.ins=function(p,tag,aa,_html,b){var i;var elm=document.createElement(tag);if(_html){elm.innerHTML=_html;}p=this.$$(p);if(aa){for(i=0;i<aa.length;i+=2){this.att(elm,aa[i],aa[i+1]);}}if(p){if(b==true){return p.insertBefore(elm,p.firstChild);}else if(b){return p.insertBefore(elm,b);}else{return p.appendChild(elm);}}else{return elm}};
	exports.unhtmlentities=function(s){if(s){if(s.replace){for(let k in all_htmlentities){s=s.replace(new RegExp(all_htmlentities[k],'g'),k);}}}return s};
	exports.htmlentities=function(s){for(let k in all_htmlentities){s=s.replace(new RegExp(k,'g'),all_htmlentities[k]);}return s};
	exports.clearchilds=function(elm){/*{R:'void'}*/
		elm=this.$$(elm);if(elm&&elm.hasChildNodes&&elm.removeChild){while(elm.hasChildNodes()){elm.removeChild(elm.firstChild);}}};
	exports._uid=0;
	exports.uid=function(_pfx){/*{R:'string'}*/this._uid++;if(!_pfx){_pfx='uid'}return _pfx+'-'+this._uid};
	//fix=function(ev){ev.stopPropagation();ev.preventDefault();};
	exports.extend=function(initial,extend){for(k in extend){initial[k]=extend[k]||(initial[k]||null);}},
	exports.sleep=function(milliseconds){return new Promise(resolve => setTimeout(resolve, milliseconds));};
	exports.RenderEngine=function(prefix){this.preloaded={};this.prefix=prefix;
		this.xXX_S='<!--'+prefix+'@';this.xXX_E='@'+prefix+'-->';
		this.rrgx1_S='<!--'+prefix+'{';this.rrgx1_E='}'+prefix+'-->';
		this.rrgx2=new RegExp(prefix+'-([^=]+)="([^"]*)"'),
		this.rrgxLAST=new RegExp('<!--LOAD{([^>]*)}LOAD-->'),
		this.rrgx0=new RegExp('<!--PRE{([^>]*)}PRE-->'),
		this.rrgxSCRIPT=/<script\b[^>]*>([\s\S]*?)<\/script>/gm;
	};
	exports.RenderEngine.prototype={
		string:function(t,d,_context,_norun){/*{R:'string',DESC:'performs evaluation of specially marked string templates, using an object instance as data',t:{T:'string',DESC:'the starting template string'},d:{T:'object','the object onto wich evaluate template expression against (referred as this in the template)'}}*/
			let ridx;
			if(!t){return ['',[]]}
			if(!t.replace){if(!t){return ['',[]]}}
			if(typeof t.replace!='function'){return ['',[]];}
			var rnd=Math.floor(Math.random()*1000000000).toString();t=t.replace(/%UNIQUEID/g,rnd);
			var tmp='';var rr=null;var jj=[];d.tmpfn=function(j){try{return eval(j)}catch(ex){return ex.message}};
			rr=this.next_token(t,this.xXX_S,this.xXX_E);while(rr){tmp='';
				ridx=rr[1].substr(0,rr[1].indexOf('{'));rr[1]=rr[1].substring(ridx.length+1);rr[1]=rr[1].substring(0,rr[1].length-(ridx.length+1));
				let F=false;if(inoe(ridx)){F=d;ridx='';}else{F=d[ridx];ridx='.'+ridx;}
				for(let f=0;f<F.length;f++){tmp=tmp+this.string(rr[1],F[f])[0];}
				t=t.replace(rr[0],tmp);rr=this.next_token(t,this.xXX_S,this.xXX_E);
			}
			rr=this.next_token(t,this.rrgx1_S,this.rrgx1_E);while(rr){tmp=d.tmpfn(rr[1]);t=t.replace(rr[0],tmp);rr=this.next_token(t,this.rrgx1_S,this.rrgx1_E);}
			rr=this.rrgx2.exec(t);while(rr!=null){tmp=d.tmpfn(rr[2]);t=t.replace(rr[0],rr[1]+'="'+tmp+'"');rr=this.rrgx2.exec(t);}
			rr=this.rrgxLAST.exec(t);while(rr!=null){t=t.replace(rr[0],'');jj[jj.length]=rr[1];rr=this.rrgxLAST.exec(t);}
			if(!_norun){this.run_scripts(t);}
			delete d.tmpfn;return [t,jj]
		},
		run_scripts:function(t,keep){let rr=this.rrgxSCRIPT.exec(t);while(rr!=null){if(!keep){t=t.replace(rr[0],'');}try{eval(rr[1])}catch(ex){console.log('ERROR evaluating:'+ex.message)}rr=this.rrgxSCRIPT.exec(t);}return t;},
		to:function(tgt,tpl,data,_mode,_norun){if(!_mode){_mode='normal'}var out=this.string(tpl,data,false,_norun);this._renderfill(tgt,out[0],_mode,out[1]);},
		_renderfill:function(tgt,s,m,jj){if(tgt.get){tgt=tgt.get(0)}{}if(tgt.nodeName.toLowerCase()=='table'){console.log('todo:target is table')}
			else{if(m=='normal'){tgt.innerHTML=s;}else{var n=document.createElement('div');n.innerHTML=s;
				if(m=='append'){tgt.appendChild(n);}else if(m=='insert'){tgt.insertBefore(n,tgt.firstChild);}else{console.log('unsupported mode')}
			}}if(jj.length>0){var $this=this;var post=function(){$this._renderpost(jj);};setTimeout(post,100);}},
		_renderpost:function(jj){for(var j=0;j<jj.length;j++){try{eval(jj[j])}catch(ex){console.log('Error postloading render: '+ex.message);}}},
		next_token:function(value,start,end,_generalstart){if(!_generalstart){_generalstart=start}
			let s=value.indexOf(start);if(s<0){return false}let e=value.indexOf(end,s+1);let ps=value.indexOf(_generalstart,s+1);let te=0;
			while((e>ps)&&(ps>0)){ps=value.indexOf(_generalstart,ps+1);te=value.indexOf(end,e+1);if(te>-1){e=te}}
			return [value.substring(s,e+end.length),value.substring(s+start.length,e),{s:s,e:e,ps:ps,te:te}];
	}	};
	exports.render=new exports.RenderEngine('JS');
	
	exports.compress=function(string,encoding) {
		const byteArray = new TextEncoder().encode(string);
		const cs = new CompressionStream(encoding);
		const writer = cs.writable.getWriter();
		writer.write(byteArray);writer.close();
		return new Response(cs.readable).arrayBuffer();
	};
	exports.decompress=function(byteArray, encoding) {
		const cs = new DecompressionStream(encoding);
		const writer = cs.writable.getWriter();
		writer.write(byteArray);writer.close();
			return new Response(cs.readable).arrayBuffer().then(function (arrayBuffer) {
			return new TextDecoder().decode(arrayBuffer);
	});};
	exports.arrayBufferToBase64=function( buffer ) {
		var binary = '';
		var bytes = new Uint8Array( buffer );
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode( bytes[ i ] );
		}
		return window.btoa( binary );
	};
	exports.base64ToArrayBuffer=function(base64) {
		var binaryString = atob(base64);
		var bytes = new Uint8Array(binaryString.length);
		for (var i = 0; i < binaryString.length; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		return bytes.buffer;
	};
	exports.format={
		seconds:function(num){
			let h=Math.floor(num/60/60);
			let m=Math.floor((num % (60*60))/60);
			let s=Math.floor(num % 60);
			let o='';
			if(h>0){o=o+h+'h'}
			if(m>0){o=o+m+'m'}
			o=o+s+'s';
			return o;
		},
		millimeters:function(num){
			if(num>1000){let m=num/1000;return m.toLocaleString('IT-it', {minimumFractionDigits:2,maximumFractionDigits:2})+'m';}
			else if(num>10){let c=num/10;return c.toLocaleString('IT-it',{minimumFractionDigits:2,maximumFractionDigits:2})+'cm';}
			else{return num.toLocaleString('IT-it', {minimumFractionDigits:2,maximumFractionDigits:2})+'mm';}
		},
		sqmillimeters:function(num){
			if(num>1000){let m=num/1000;return m.toLocaleString('IT-it', {minimumFractionDigits:2,maximumFractionDigits:2})+'mq';}
			else if(num>10){let c=num/10;return c.toLocaleString('IT-it',{minimumFractionDigits:2,maximumFractionDigits:2})+'cmq';}
			else{return num.toLocaleString('IT-it', {minimumFractionDigits:2,maximumFractionDigits:2})+'mmq';}
		},
		local:function(num){let s=num.toLocaleString('IT-it');let x=s.indexOf(',');if((x==s.length-2)&&(x>-1)){s=s+'0'}return s;},
		localInt:function(num){num=Math.round(num);return num.toLocaleString('IT-it');},
		localFloat:function(num){if(typeof num=='string'){num=parseFloat(num)}
			return num.toLocaleString('IT-it', {minimumFractionDigits:2,maximumFractionDigits:2});},
		perc:function(num){return parseFloat(num).toLocaleString('IT-it')+'%';},
		currency:function(num,mrk){let symb='€';if(!mrk){symb='';}
			if((mrk=='IT')||(mrk=='ITA')||(mrk=='ES')||(mrk=='ESP')||(mrk=='FR')||(mrk=='FRA')||(mrk=='DE')||(mrk=='DEU')){symb='€'}
			else if((mrk=='UK')||(mrk=='GBR')){symb='£'}
			else if((mrk=='US')||(mrk=='USA')||(mrk=='MX')||(mrk=='CA')){symb='$'}
			if(typeof num=='string'){num=parseFloat(num);}
			// return num.toFixed(2).toLocaleString('IT-it', {minimumFractionDigits: 2})+symb;
			return num.toLocaleString('IT-it', {minimumFractionDigits:2,maximumFractionDigits:2})+symb;
		},
		currency_int:function(num,mrk){let symb='€';if(!mrk){symb='';}
			if((mrk=='IT')||(mrk=='ITA')||(mrk=='ES')||(mrk=='ESP')||(mrk=='FR')||(mrk=='FRA')||(mrk=='DE')||(mrk=='DEU')){symb='€'}
			else if((mrk=='UK')||(mrk=='GBR')){symb='£'}
			else if((mrk=='US')||(mrk=='USA')||(mrk=='MX')||(mrk=='CA')){symb='$'}
			if(typeof num=='string'){num=parseFloat(num);}
			// return num.toFixed(2).toLocaleString('IT-it', {minimumFractionDigits: 2})+symb;
			// return num.toLocaleString('IT-it', {minimumFractionDigits:2,maximumFractionDigits:2})+symb;
			num=Math.round(num);return num.toLocaleString('IT-it')+symb;
		},
		remove:function(v){if(typeof v==='string'){return (v.replace('%','').replace('€','').replace(/£/g,'').replace(/\$/g,'').replace(/\./g,'').replace(',','.')*1);}
			else if(typeof v==='number'){return v}else{return 0;}
		}
	};
	exports.time={default_weekstart:1,
		monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],

		parseYear:function(v,_defaultyear){
			
		},
		parseMonth:function(v,_defaultyear){
			
		},
		parseDay:function(v,_defaultyear,_defaultmonth){
			if(typeof v=='object'){
				if(a instanceof Date){
					
				}
			}else if(typeof v=='string'){
				
			}else if(typeof v=='number'){
				
			}
		},
		setzero:function(d){d.setHours(0);d.setMinutes(0);d.setSeconds(1);},
		setfull:function(d){d.setHours(23);d.setMinutes(59);d.setSeconds(59);},
		monthstarter:function(d){while(d.getDate()!=1){d.setDate(d.getDate()-1);}},
		weekstarter:function(d,f){while(d.getDay()!=parseInt(f)){d.setTime(it3.time.backtime(d,-1));}},
		backtime:function(a,b){var day=(24*3600*1000);return (a.getTime()-day*b);},
		get:function(sel){let flag=sel.indexOf(':')>-1;
			let a=flag?sel.split(':')[0]:sel[0];let b=flag?sel.split(':')[1]:sel[1];
			var st=new Date();var ed=new Date()
			if(this.op[a]){sel=sel.substr(1);
				if(typeof this.op[a]=='function'){this.op[a](b,st,ed)}
				else if(this.op[a][b]){sel=sel.substr(1);this.op[a][b](sel,st,ed);}}
			else{console.log('No sane function')}
			this.setzero(st);this.setfull(ed);return {s:st,e:ed};},
		_setdmdm:function(ds,Ds,Ms,de,De,Me){ds.setMonth(Ms,Ds);de.setMonth(Me,De);},
		op:{'-':{'d':function(c,s,e){s.setDate(s.getDate()-parseInt(c))},
				'w':function(c,s,e){
					s.setTime(it3.time.backtime(s,7*(parseInt(c)+1)));it3.time.weekstarter(s,it3.data.weekstart);
					e.setTime(it3.time.backtime(e,7));it3.time.weekstarter(e,it3.data.weekstart);e.setDate(e.getDate()-1)},
				'W':function(c,s,e){
					s.setTime(it3.time.backtime(s,7*(parseInt(c)+1)));it3.time.weekstarter(s,it3.data.weekstart);
					e.setTime(it3.time.backtime(e,7*(parseInt(c)+1)));it3.time.weekstarter(e,it3.data.weekstart);e.setDate(e.getDate()+6)},
				'm':function(c,s,e){s.setMonth(s.getMonth()-(parseInt(c)%12));s.setFullYear(s.getFullYear()-(Math.trunc(parseInt(c)/12)));it3.time.monthstarter(s);
					it3.time.monthstarter(e);e.setDate(e.getDate()-1)},
				'M':function(c,s,e){s.setMonth(s.getMonth()-(parseInt(c)%12));s.setFullYear(s.getFullYear()-(Math.trunc(parseInt(c)/12)));it3.time.monthstarter(s);
									e.setMonth(e.getMonth()-(parseInt(c)%12)+1);e.setFullYear(e.getFullYear()-(Math.trunc(parseInt(c)/12)));it3.time.monthstarter(e);
									e.setDate(e.getDate()-1);},
				'y':function(c,s,e){it3.time._setdmdm(s,1,0,e,31,11);s.setFullYear(s.getFullYear()-parseInt(c));e.setFullYear(s.getFullYear());},
				't':function(c,s,e){s.setMonth(s.getMonth()-((parseInt(c)*3)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*3)/12)));},
				'q':function(c,s,e){s.setMonth(s.getMonth()-((parseInt(c)*4)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*4)/12)));},
				's':function(c,s,e){s.setMonth(s.getMonth()-((parseInt(c)*6)%12));s.setFullYear(s.getFullYear()-(Math.trunc((parseInt(c)*6)/12)));},},
			'c':{
				'q':function(c,s,e){let t;if(!c){c=1}it3.time._setdmdm(s,1,3*(c-1),e,1,3*(c-1)+3);e.setDate(e.getDate()-1);},
			},p:{
				'q':function(c,s,e){let t;s.setFullYear(s.getFullYear()-1);e.setFullYear(e.getFullYear()-1);if(!c){c=1}it3.time._setdmdm(s,1,3*(c-1),e,1,3*(c-1)+3);e.setDate(e.getDate()-1);},
			}
			,'d':function(c,s,e){s.setDate(1);s.setMonth(0);s.setTime(it3.time.backtime(s,-parseInt(c)+1));e.setTime(it3.time.backtime(s,-1));},
			'w':function(c,s,e){it3.time._setdmdm(s,1,0,e,1,0);it3.time.weekstarter(s,it3.data.weekstart);
					s.setTime(it3.time.backtime(s,(1-parseInt(c))*7));e.setTime(it3.time.backtime(s,-7));},
			'm':function(c,s,e){it3.time._setdmdm(s,1,parseInt(c)-1,e,1,parseInt(c));},
			't':function(c,s,e){c=parseInt(c);if(c==1){it3.time._setdmdm(s,1,0,e,1,3);}
					else if(c==2){it3.time._setdmdm(s,1,3,e,1,6);}
					else if(c==3){it3.time._setdmdm(s,1,6,e,1,9);}
					else if(c==4){it3.time._setdmdm(s,1,9,e,1,0);e.setFullYear(e.getFullYear()+1);}},
			'q':function(c,s,e){c=parseInt(c);if(c==1){it3.time._setdmdm(s,1,0,e,1,4);}
					else if(c==2){it3.time._setdmdm(s,1,4,e,1,8);}
					else if(c==3){it3.time._setdmdm(s,1,8,e,1,0);e.setFullYear(e.getFullYear()+1);}},
			'fw':function(arg,s,e){},
			's':function(arg,s,e){
				if(arg[0]=='1'){it3.time._setdmdm(s,1,0,e,1,6);}
				else{it3.time._setdmdm(s,1,6,e,1,0);e.setFullYear(s.getFullYear()+1);}},
			'x':function(arg,s,e){
				if(arg=='n'){
					s.setFullYear(2019);
					e.setFullYear(2019);
					it3.time._setdmdm(s,1,10,e,1,12);
			}	},
		},
		week_selector:function(d){
			// Copy date so don't modify original
			d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
			// Set to nearest Thursday: current date + 4 - current day number
			// Make Sunday's day number 7
			d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
			// Get first day of year
			var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
			// Calculate full weeks to nearest Thursday
			var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
			// Return array of year and week number
			
			var weekNoStr=''+weekNo;
			if(weekNoStr.length==1){weekNoStr='0'+weekNoStr}
			return d.getUTCFullYear()+'/W'+weekNoStr;
		},
		week2day:function(w){
			w=w.split('/W');
			let year=parseFloat(w[0]);
			let dd=parseFloat(w[1]);
			return new Date(year,0,(7*dd)-3);
			
		},
		quarter_selector:function(d){
			d = d || new Date();
			var m = Math.floor(d.getMonth()/3) + 2;
			return 'Q'+(m > 4? m - 4 : m);
		}
	};
	exports.data={v:'0.1'};
})(typeof exports === 'undefined'? this['it4']={}: exports);


