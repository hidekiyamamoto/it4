var ISNODE=false;if(typeof window==='undefined'){ISNODE=true}
var IT4DATACONFIG={};
var GraphBase=function(gtype,opts,source,target){this.gtype=gtype;this.opts=opts;this.source=source;this.target=target;this.xobj=null;this.init();};GraphBase.prototype={
	init:function(){if(!this.opts){this.opts={}}
		if(!this.opts.grouped){if(this.source.G){this.grouped=JSON.parse(JSON.stringify(this.source.G));}}
		if(!this.opts.filtered){if(this.source.F){this.filtered=JSON.parse(JSON.stringify(this.source.F));}}
		if(!this.target){
			this.target=it4.ins(document.body,'div',['style','position:absolute;z-index:999999;top:0;left:0;width:50vw;height:50vh;background-color:white'])
		}
		//if opts.
	},
	redraw:function(){console.log('This must be overridden in the prototype of the graph of type '+this.gtype);},
	update:function(){console.log('This is highly suggested to be overridden in the prototype of the graph of type '+this.gtype);redraw();},
	refit:function(){console.log('This can optionally be overridden in the prototype of the graph of type '+this.gtype);},
	default_options:function(){return this.opts},
	/**/
	set_options:function(opts){it4.extend(this.opts,opts);},
	asJSON:function(){return {gtype:this.gtype,opts:this.opts}},
	destroy:function(){
		
	}
};
(function(exports){exports.GraphBase=GraphBase;})(typeof exports === 'undefined'? (ISNODE?this['GraphBase']={}:this['it4']['data']['GraphBase']=GraphBase):exports);

/*
let Parent=function(n){this.n=n};
Parent.prototype={greet:function(){console.log('-!YES!'+this.n)}};
let Child=function(n,k){Parent.call(this,n);this.k=k;};
Child.prototype={update:function(){console.log(this.k)},greet:function(){console.log(this.k);Parent.prototype.greet.call(this)}};
Object.setPrototypeOf(Child.prototype,Parent.prototype);
let c=new Child('ok','ok');
c.update();
c.greet();
*/




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