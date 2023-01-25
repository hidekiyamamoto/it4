import {it4} from "./it4.js";
var data={charts:{},
	is_dbnull:function(v){if(v==undefined){return true}if(v==null){return true}
		if(v==0){return true}if(v=='0'){return true}if(v=='-'){return true}
		if(v=='NA'){return true}return false},
	
};
var charts=['it4.charts.basic_highcharts.js'];
const to_implement=function(a,b,c,d){return new Promise(async function(resolve,reject){let x=resolve;
	setTimeout(function(){x(a+' '+c||' Must be implemented in the storage engine driver '+b)},250);
});};
var load_graphs=async function(){
	for(let c=0;c<charts.length;c++;){
		_this.addons[config.addons[k]]=(await import('./addons/'+config.addons[k]+'/'+config.addons[k]+'.js')).addon;
		let aa=(await import ('./addons/'+config.addons[k]+'/'+config.addons[k]+'.js'));
		for(let a in aa){data.charts[a]=aa[a];}
	}
};load_graphs();
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
data.Source=function(name){this.name=name;this.args=[];};
data.Source.prototype={
	get_data:function(args){return to_implement('get_data(model_name,doc_id)',this.name)},
	get_def:function(args){return to_implement('get_def(model_name,doc_id)',this.name)},
};
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
data.Set=function(){this._set_args=null;this._source=null;this.G={};this.F={};
	this.D=null;this.O=[];};
data.Set.prototype={
	from_data:function(def,data){},
	from_source:function(){},
	set_data_args:function(args,value){this._set_args=args;if(this._source){
		this.D=this._source.get_data(this._set_args);
	}else{console.error('It\'s odd to set args for a set that's doens't have a dynamic datasource.');}},
	regroup:function(G,F,force){let doregroup=false;
		if(!this.is_same_GorF(this.G,G)){this.G=JSON.parse(JSON.stringify(G));doregroup=true;}
		if(!this.is_same_GorF(this.F,F)){this.F=JSON.parse(JSON.stringify(F));doregroup=true;}
		if(doregroup||force){

	}else{return false}},
	_make_idx:function(db_row,j_row,j_adapter,G){var k;var xx=[];for(k in G){if(G[k]=='grouped'){let kmin=k.toLowerCase();if(this.db_row[k]){xx.push(db_row[k]);}
		else if(j_adapter[k]||j_adapter[k]==0){xx.push((j_row[j_adapter[k]])||'');}}}return xx.join('-');},
	_is_same_GorF:function(G1,G2){for(let g in G2){if(G1[g]===undefined){return false}if((G1[g]===false)&&(G2[g]===false)){continue}if(G1[g]!=G2[g]){return false}}return true;},
};
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
/*BROWSER ONLY*/
data.SetUI=function(){};
data.SetUI.prototype={};
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
data.grid_static=false;
data.Chart=function(ghtype,_options,_next){this.ghtype=ghtype;
	this.gitem=null;this.xobj=null;this.source=null;this.grouped={};this.filtered={};
	if(_options){
		this.source=_options.source||false;this.ghtitle=_options.title||ghtype;
		this.grouped=_options.grouped||{};this.filtered=_options._filtered||{};
		this.tabletotals=_revertdata.tabletotals||false;
		this.currentsearch=_revertdata.currentsearch||'';
		this.gactive=true;
		if(_revertdata.coords){_revertdata.coords.static=it4.data.grid_static;}
		this.page=this.source.R.current_page
		this.gitem=this.page.grid.addItem(_revertdata.coords||{"x":0,"y":0,"w":12,"h":14,static:it4.data.grid_static});
		this.gitem.gobj=this;
		if(this.source){
			this.uid=it3.uid('g-panel');this.ui=it3.ins(document.body,'div',['id',this.uid,'class','g-panel']);
			if(this.source.dynamic){if(!(this.source.use_source_filter===false)){this.source.use_source_filter=true}
				this.ui=it3.ins(this.source.ui,'div',['class','gp-source'],false);
				//todo:fill source dynamic ui
			}
		}
	}
	it3.data.sleep(250).then(()=>{
		this.element=document.getElementById(this.gitem.id);
		this.xobj=this.create(tgt,_revertdata,false,_next);
	});
	
};
data.Chart.prototype={
	create:function(tgt,_revertdata,_redraw,_next){return to_implement('create(model_name,doc_id)',this.ghtype)},
	reflow:function(){return to_implement('reflow()',this.ghtype)},
	destroy:function(removegitem){if(this.xobj){if(this.xobj.destroy){this.xobj.destroy();}}it3.clearchilds(this.gitem.id);if(removegitem){this.page.grid.removeItem(this.gitem);}},
	_add_select_in_ui:function(sel_uid,opts,_select,_onchange){if(this[sel_uid]){console.log('Select '+sel_uid+'already existing - skipped creation');}
		else{var _this=this;let c=0;
			this[sel_uid]=it4.ins(this.ui,'select',['class','gitem-metric sel-ctr','name',sel_uid.replace('_sel',''), 'style', 'right:0px;position:inherit;', 'title', 'Change '+sel_uid.replace('_sel','')],'');
			for(c=0;c<opts.length;c++){
				if(opts[c].name==_select){it4.ins(this[sel_uid],'option',['value',opts[c].name,'selected','selected'],opts[c].name);}
				else{it4.ins(this[sel_uid],'option',['value',opts[c].name],opts[c].name);}
			}
			this[sel_uid].addEventListener('click',function(ev){ev.cancelBubble=true;});
			this[sel_uid].addEventListener('change',function(ev){_onchange(_this,sel_uid)});
	}	},
	_add_metric_in_panel:function(m_elm_nm,_select){
		if(!_select){if(m_elm_nm.indexOf('1')>-1){_select='Impression'}else if(m_elm_nm.indexOf('2')>-1){_select='Clicks'}else if(m_elm_nm.indexOf('3')>-1){_select='CTR'}}
		if(this[m_elm_nm]){console.log('existing ok');}else{
		let opts=this.source.oo.def.cols;
		// /*Next line should not be here - START*/
		for(let c=0;c<opts.length;c++){this.source.out_adapter[opts[c].name.replace(/ /g,'').toLowerCase()]=c;}
		/*Previous line should not be here - END*/
		opts=opts.filter(function(e){if(!e.axis){return false}if((e.axis!='date')&&(e.axis!='string')){return true}else{return false}});
		this._add_select_in_ui(m_elm_nm,opts,_select,this._normal_onchange);
	}	},
	_add_g_metric_in_panel:function(select_elm_name,_select){let G=this.source.G;let opts=this.source.oo.def.cols;
		opts=opts.filter(function(e){return G[e.name]=='grouped'});if(opts.length==1){opts.push({name:''});}
		this._add_select_in_ui(select_elm_name,opts,_select,this._gtype_onchange);},
	_normal_onchange:function(_this){_this._ui_onregroup(_this.source.G,_this.source.F);},
	_gtype_onchange:function(_this,select_elm_name){let other_g_metric='';
		if(select_elm_name=='gmetric1_sel'){other_g_metric='gmetric2_sel';}else{other_g_metric='gmetric1_sel';}
		if(_this[other_g_metric].options[_this[other_g_metric].selectedIndex]){
			if(_this[select_elm_name].options[_this[select_elm_name].selectedIndex].value==_this[other_g_metric].options[_this[other_g_metric].selectedIndex].value){
				for(let i=0;i<_this[select_elm_name].length;i++){
					if(_this[other_g_metric].options[i].value!=_this[select_elm_name].options[_this[select_elm_name].selectedIndex].value){_this[other_g_metric].options[i].selected='selected';break;}
		}	}	}_this._ui_onregroup(_this.source.G,_this.source.F);},
	_orientamento_onchange:function(_this){_this.xobj.inverted=!_this.xobj.inverted;_this.xobj.xAxis[0].update({},false);
		_this.xobj.yAxis[0].update({},false);_this._ui_onregroup(_this.source.G,_this.source.F);},
	_add_orientamento_metric_in_panel:function(select_elm_name,_select){this._add_select_in_ui(select_elm_name,[{name:'bar'},{name:'column'}],_select,this._orientamento_onchange);},
	_ui_onregroup:function(G,F){this.grouped=G;this.filtered=F;if(this.xobj){if(this.ghtype=='tinymce'){console.log('Should never be here, but no problem.');}
		else{let revert_to=this.get_revert_data();let elm=document.getElementById(this.gitem.id);
			if(this.ghtype=='table'||this.ghtype=='sunburst-graph'){this.xobj.destroy();it3.clearchilds(elm);
				this.xobj=this['_as_'+this.ghtype](elm,revert_to,true);}
			else{this.xobj=this['_as_'+this.ghtype](elm,revert_to,true);}}}},
};
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
data.charts['table']=function(source,_options,_next){Chart.call(this,['table',source,_options,_next]);};
data.charts['table'].prototype=new Chart('table');
data.charts['table'].prototype.create=function(){
	//this.tabletotals=false;
	//this.currentsearch='';
};
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
/* ######################################################################################################################################## */
data.Report=function(target,_menutarget){this.uid=it3.uid('report');this.element=it4.ins(target,'div',['id',this.uid]);
	this.sources=[];this.gitems=[];this.pages=[];
	this.barid='bar'+this.uid;
	this.ui=null;this.content=null;
	this.current_page=false;this.current_source=false;this.current_gitem=false;
	this.init(_menutarget);
data.Report.prototype={
	create:function(tgt,_revertdata,_redraw,_next){},
	destroy:function(){},
	reflow:function(){},
};
data.utils={
	q_selector:function(odate){let d=new Date(odate);var m=d.getMonth()+1;return 'Q'+(Math.ceil(m/3));},
	pad:function(num,size){var s=num+"";while(s.length<size){s="0"+s;}return s;},
	formatLocal:function(num){let s=num.toLocaleString('IT-it');let x=s.indexOf(',');if((x==s.length-2)&&(x>-1)){s=s+'0'}return s;},
	formatLocalInt:function(num){num=Math.round(num);return num.toLocaleString('IT-it');},
	formatLocalFloat:function(num){if(typeof num=='string'){num=parseFloat(num)}return num.toLocaleString('IT-it', {minimumFractionDigits: 2});},
	formatPerc:function(num){return parseFloat(num).toLocaleString('IT-it')+'%';},
	formatVal:function(num,mrk){let symb='€';if(!mrk){symb='';}
		if((mrk=='IT')||(mrk=='ITA')||(mrk=='ES')||(mrk=='ESP')||(mrk=='FR')||(mrk=='FRA')||(mrk=='DE')||(mrk=='DEU')){symb='€'}
		else if((mrk=='UK')||(mrk=='GBR')){symb='£'}else if((mrk=='US')||(mrk=='USA')){symb='$'}
		if(typeof num=='string'){num=parseFloat(num);}return num.toLocaleString('IT-it', {minimumFractionDigits: 2})+symb;
	},
	removeFormat:function(v){if(typeof v==='string'){return (v.replace('%','').replace('€','').replace(/£/g,'').replace(/\$/g,'').replace(/\./g,'').replace(',','.')*1);}
		else if(typeof v==='number'){return v}else{return 0;}
	}
};
export {data}



