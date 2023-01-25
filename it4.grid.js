var ISNODE=false;if(typeof window==='undefined'){ISNODE=true}
var IT4DATACONFIG={};

/*
	{x,y,w,h}
*/
var Item=function(area,opts,_ui){this.elm=elm;this.ui=_ui;this.opts=opts||{};this.init();};Item.prototype={
	init:function(){
		if(!this.opts.x){this.opts.x=0}if(!this.opts.y){this.opts.y=0}
		if(!this.opts.w){this.opts.w=0}if(!this.opts.h){this.opts.h=0}
		this.elm=it4.ins(area.elm,this.opts.tagname);
		if(!this.opts.uiposition){this.opts.uiposition='inside'}
		//INITui
		if(!this.ui){
			if(this.opts.uiposition=='before'){
				this.ui=it4.ins(this.elm.parentElement,this.opts.uitagname,false,false,this.elm);
			}else if(this.opts.uiposition=='after'){
				this.ui=it4.ins(this.elm.parentElement,this.opts.uitagname,false,false,this.elm.nextSibling);
			}else{this.ui=it4.ins(this.elm,this.opts.uitagname);}
		}
		/*
		let header=false;let dragmode='element';
		if(this.opts.title){header=true;}
		if(this.opts.dragmode){if(this.opts.dragmode=='header'){dragmode=this.opts.dragmode;header=true;}}
		//if(header){this.header='<div></div>';
		//}
		if(this.opts.dragmode=='element'){
			
		}
		let _this=this;
		*/
	},
	//refit
	asJSON:function(){
		let JSOUT={opts:this.opts};
		return JSOUT;
	}
};
var Area=function(opts){this.opts=opts||{};this.init();};Area.prototype={
	init:function(){
		if(this.oo.draggable){this.elm.addEventListener('dragover',function(ev){_this._dragover(ev)});this.elm.addEventListener('drop',function(ev){_this._drop(ev)});}
	},
	findItem:function(elm){
		
	},
	addItem:function(opts){
		let item=new Item(opts){};
		item.area=this;
		//init drag and drop
		return item;
	},
	removeItem:function(item){
		
	},
	asJSON:function(){
		
	}
};
(function(exports){exports.Item=Item;exports.Area=Area;})(typeof exports === 'undefined'? (ISNODE?this['grid']={}:this['it4']['grid']=exports):exports);




/*
it4.data.ReportDataUI=function(report,reportdata,_tdata){this.R=report;this.RD=reportdata;this.uid=it4.uid();this.guid='g'+this.uid;this._Tdata=_tdata;this._ui_init();};
it4.data.ReportDataUI.prototype={
	destroy:function(){
		this.RD.destroy();
		it4.clearchilds(document.getElementById(this.uid));
		
		this.uid=null;
	},
	revert_groups:function(grouped,filtered){this.G=grouped;this.F=filtered;
		let bb=document.querySelectorAll('#'+this.guid+' .report-grouping .mdc-chip');
		bb.forEach(e=>{if(this.G[e.innerHTML]=='grouped'){e.classList.add('selected');}
		else{e.classList.remove('selected');}});
		for(let k in filtered){if(filtered[k]){
			if(!inoe(filtered[k])){console.log('#'+this.guid+' .filter.'+k);console.log(document.querySelector('#'+this.guid+' .filter.'+k));document.querySelector('#'+this.guid+' .filter.'+k).value=filtered[k];}
			else{document.querySelector('#'+this.guid+' .filter.'+k).value='';}
		}else{try{document.querySelector('#'+this.guid+' .filter.'+k).value='';}catch(ferr){console.log('Fiter not found:'+k);}}}
		// this._regroup();
		this._getData_regroup();
	},
	_ui_init:function(){let _this=this; console.log(JSON.parse(JSON.stringify(_this)));
		//fill output adapter and draw ui;
		this.ui=it4.ins(this.R.grouping_target,'div',['id',this.guid,'class','report-source-ui form-inline']);
		//this.ui_group_time=it4.ins(this.ui,'select',['class','form-control']);
		//this.ui_group_time.addEventListener('change',function(ev){_this._ui_group_handler(ev);});
		//it4.ins(this.ui_group_time,'option',['value',''],'ALL');
		this.ui_group_normal=it4.ins(this.ui,'div',['class','report-grouping']);
		tmp=this.oo.def.cols;let filtertemp;let has_filters=false;
		for(c=0;c<tmp.length;c++){this.out_adapter[tmp[c].name.replace(/ /g,'').toLowerCase()]=c;let _c=c;
			if(tmp[c].filterable){has_filters=true;
				this.F[tmp[c].name]=false;
				filtertemp=it4.ins(this.ui,'input',['title','filter '+tmp[c].name,'class','form-control filter '+tmp[c].name,'placeholder','filter '+tmp[c].name.toLowerCase(),'onchange','DASH.current_source.F[\''+tmp[c].name+'\']=this.value'],false,this.ui.firstChild);
			}if(tmp[c].groupable){this.G[tmp[c].name]='ungrouped';
				if(tmp[c].g_exclusive){
					//if(tmp[c].name=='week'){tmpui=it4.ins(this.ui_group_time,'option',['value',tmp[c].name,'selected','selected'],tmp[c].name);}
					//else{tmpui=it4.ins(this.ui_group_time,'option',['value',tmp[c].name],tmp[c].name);}
				}else{
					tmpui=it4.ins(this.ui_group_normal,'div',['id',this.uid+'_gbutt'+c,'class','mdc-chip'],tmp[c].name);
					tmpui.addEventListener('click',function(ev){console.log(ev,_c, _this);_this._ui_group_handler(ev,_c);});
		}	}	}
		
		let div_dateto=it4.ins(this.ui,'div',[],false,true);
		it4.ins(div_dateto,'label',['style',"font-family: Ubuntu; color: white; display: inline-block;"],'To:');
		let input_dateto=it4.ins(div_dateto,'input',['type','date','class','form-control filter date_to','onchange','DASH.current_source.F[\'date_to\']=this.value'],false);
		this.F['date_to']=false;
		let div_datefrom=it4.ins(this.ui,'div',[],false,true);
		it4.ins(div_datefrom,'label',['style',"font-family: Ubuntu; color: white; display: inline-block;"],'From:');
		let input_datefrom=it4.ins(div_datefrom,'input',['type','date','class','form-control filter date_from','onchange','DASH.current_source.F[\'date_from\']=this.value'],false);
		this.F['date_from']=false;
		// let div_caneditdate=it4.ins(this.ui,'div',[],false,true);
		// let input_caneditdate=it4.ins(div_caneditdate,'input',['name','caneditdate','type','checkbox','class','form-control filter can_edit_date','onchange','DASH.current_source.F[\'can_edit_date\']=this.value'],false);
		// it4.ins(div_caneditdate,'label',['for','caneditdate','style',"font-family: Ubuntu; color: white; display: inline-block;"],'Client can edit date');
		// this.F['can_edit_date']=false;
		
		
		if(has_filters){
			filtertemp=it4.ins(this.ui,'button',['class','btn btn-primary'],'Update filters',this.ui_group_normal);
			filtertemp.addEventListener('click',function(ev){
				_this._getData_regroup(false, function(){if(_this.R.current_gitem){_this.R.current_gitem._ui_onregroup(_this.G,_this.F);}});
				// if(_this._getData_regroup();){if(_this.R.current_gitem){_this.R.current_gitem._ui_onregroup(_this.G,_this.F);}}}
				// _this._getData_regroup(true);
				// .then(regroupbool=>{
					// if(regroupbool){if(_this.R.current_gitem){_this.R.current_gitem._ui_onregroup(_this.G,_this.F);}}
				// });
			});
		}
		it4.ins(this.ui,'input',['title','input title ','class','form-control gitem_text_parameter gitem_title','placeholder','title ','onchange','DASH.current_gitem.ghtitle=this.value; DASH.current_gitem._normal_onchange(DASH.current_gitem)', 'style', 'display:none;'],false,this.ui.firstChild);
	},
	_ui_pickupgroups:function(){this.G={};
		oo=document.querySelectorAll('#'+this.guid+' .mdc-chip');
		for(let o=0;o<oo.length;o++){this.G[oo[o].innerHTML]=oo[o].classList.contains('selected')?'grouped':'ungrouped';}
	},
	_ui_group_handler:function(ev,c,exclusive){ let _this=this;
		if(ev){it4.fix(ev);if(ev.target.classList.contains('mdc-chip')){ev.target.classList.toggle('selected');}}
		// this._regroup();if(this.R.current_gitem){this.R.current_gitem._ui_onregroup(this.G,this.F);}
		// this._getData_regroup(false, function(){if(_this.R.current_gitem){_this.R.current_gitem._ui_onregroup(_this.G,_this.F);}});
		
		this._getData_regroup(false, function(){if(_this.R.current_gitem){_this.R.current_gitem._ui_onregroup(_this.G,_this.F);}});
	},
	_getData_regroup:function(force, next){this._ui_pickupgroups(); let _this=this;  let doregroup=false; 
		let last_datefrom= this.previousF['date_from'];
		let last_dateto= this.previousF['date_to'];
		if(!this.is_same_GorF(this.previousG,this.G)){this.previousG=JSON.parse(JSON.stringify(this.G));doregroup=true;}
		if(!this.is_same_GorF(this.previousF,this.F)){this.previousF=JSON.parse(JSON.stringify(this.F));doregroup=true;}
		if(doregroup||force){
			let input_datefrom_value=this.F['date_from'];
			let input_dateto_value=this.F['date_to'];
			if(!inoe(input_datefrom_value) && !inoe(input_dateto_value)){
				// CODICE HARDCODED XINGU DA SISTEMARE 
				console.log(DASH.current_source)
				X.compressed_saver.GetDATA(DASH.current_source._Tdata.api_or_retail, DASH.current_source._Tdata.stypeG, {datefrom:input_datefrom_value, dateto:input_dateto_value}, DASH.current_source._Tdata.customer, DASH.current_source._Tdata.market, DASH.current_source._Tdata.subprofile_or_group, DASH.current_source._Tdata.stype, DASH.current_source._Tdata.rtype_comp, DASH.current_source._Tdata.spo_or_org, DASH.current_source._Tdata.is_daily)
					.then(data=>{
						if(X.advReporting.NEXT){X.advReporting.NEXT=false;}
						if(DASH.current_source._Tdata.api_or_retail=='API'){X.advReporting.ondata(data, true);}
						else{X.advReporting.onspiderdata(DASH.current_source._Tdata.rtype,data, true);}
						_this._regroup(doregroup, force);
						if(next){next();}
						return true;
					});
			}else{
					_this._regroup(doregroup, force);
					if(next){next();}
					return true;
			}
		}else{console.log('@@@@@@@@@@@@@@GET_DATA_REGROUP else@@@@@@@@@@@@@@@');return false}
	},
};

*/