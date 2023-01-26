var ISNODE=false;if(typeof window==='undefined'){ISNODE=true}
const week_selector=function(d){
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
	var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
	var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
	var weekNoStr=''+weekNo;
	if(weekNoStr.length==1){weekNoStr='0'+weekNoStr}
	return d.getUTCFullYear()+'/W'+weekNoStr;
};
const q_selector=function(d){d = d || new Date();
	var m=Math.floor(d.getMonth()/3) + 2;
	return d.getUTCFullYear()+'/Q'+(m > 4? m - 4 : m);
};
try{const inoe=function(){if(!v){return true}return (v==null||v==='');};}catch(ex){console.log('ok')}
//q_selector:function(odate){var out='';let date=new Date(odate);var m=date.getMonth()+1;out='Q'+(Math.ceil(m / 3));return out;},
const string_match=function(s,s1){s1=s1.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');let rx=new RegExp(s1);return s.match(rx);};
const numpad=function(num,size){var s=num+"";while(s.length<size){s="0"+s;}return s;};
var Source=function(name,data,oo){this.D=data;this.name=name;this.oo=oo;
	this.O=[];this.G={};this.previousG={};this.F={};this.previousF={};this.ui=null;this.out_adapter={};this.init();};Source.prototype={
	init:function(){let tmp=null;let tmpui=null;let c=0;
		if(!this.oo.json_data_prop){this.oo.json_data_prop='json_file'}
		if(this.oo.add_date_segments_from_col){
			//todo:add columns to cols def
			for(c=0;c<this.D.length;c++){tmp=this.D[c];
				d_date=new Date(tmp[this.oo.add_date_segments_from_col]);
				d_date.setMinutes(Math.abs(d_date.getTimezoneOffset()));
				this.D[c]['year']=d_date.getFullYear();this.D[c]['month']=this.D[c]['year']+'-'+numpad(d_date.getMonth()+1,2);
				this.D[c]['quarter']=q_selector(d_date);
				this.D[c]['week']=week_selector(d_date);
				this.D[c]['day']=d_date.getFullYear()+'-'+numpad(d_date.getMonth()+1,2)+'-'+numpad(d_date.getDate(),2);
		}	}
		for(let i=0;i<this.D.length;i++){
			if(!this.D[i].j_adapter){
				
				if(typeof this.D[i].jdata=='string'){this.D[i].jdata=JSON.parse(this.D[i].jdata);}
				let jidx={};for(let c=0;c<this.D[i].jdata.columns.length;c++){
					jidx[this.D[i].jdata.columns[c].title]=c;
				}this.D[i].j_adapter=jidx;
		}	}
		let COLS=this.oo.def.cols;this.oo.def.empty=[];
		for(let c=0;c<COLS.length;c++){
			COL=this.oo.def.cols[c];
			if(!COL.name){this.oo.def.cols[c].name=COL.source_col||COL.fn||'unknown-'+c;COL=this.oo.def.cols[c];}
			this.out_adapter[COL.name]=c;
			if(COL.source_col){
				if(COL.op=='dbnormal'){if(!this.dbidx_tuplets[COL.name]){this.dbidx_tuplets[COL.name]=COL.source_col}}
				else{if(!this.tuplets[COL.name]){this.tuplets[COL.name]=COL.source_col}}
			}
			this.oo.def.empty.push(0);
		}
	},
	_prefilter_db_row:function(db_row,checks,vals){let v=''; 
		for(let c=0;c<checks.length;c++){v=db_row[checks[c]];if(v){if(v.toLowerCase){let m=true;v=v.toLowerCase();
			for(let vx=0;vx<vals[c].length;vx++){if(v.indexOf(vals[c][vx])>-1){m=false;break;}}
			//for(let vx=0;vx<vals[c].length;vx++){if(v.indexOf(vals[c][vx])>-1){if(string_match(vals[c][vx],v)){m=false;break;}}}
			if(m){return false;}
		}}}return true;},
	_prefilter_j_row:function(db_row,j_row,checks,vals){let v='';
		for(let c=0;c<checks.length;c++){v=j_row[db_row.j_adapter[this.tuplets[checks[c]]]];
			if(v){if(v.toLowerCase){let m=true;v=v.toLowerCase();
					for(let vx=0;vx<vals[c].length;vx++){
						//if statement added to filter the brand litteralli with string matching
						if(v.indexOf(vals[c][vx])>-1){
							if(checks[c]=='brand'){if(string_match(vals[c][vx], v)){m=false;break;}}
							else{m=false;break;}
						}
					}
				if(m){return false;}
		}}}return true;},
	is_same_GorF:function(G1,G2){for(let g in G2){if(G1[g]===undefined){return false}if((G1[g]===false)&&(G2[g]===false)){continue}if(G1[g]!=G2[g]){return false}}return true;},
	regroup:function(G,F,force){
		let doregroup=force;
		if(!doregroup){if(this.O.length==0){doregroup=true}}
		if(G){if(!this.is_same_GorF(G,this.G)){doregroup=true;this.G=G;}}
		if(F){if(!this.is_same_GorF(F,this.F)){doregroup=true;this.F=F;}}
		if(doregroup){this._regroup();return true;}
		else{console.log('@@@@@@@@@@@@@@ REGROUP SKIPPED BECAUSE SAME @@@@@@@@@@@@@@@');return false}
	},
	_regroup:function(){
			let COLS=this.oo.def.cols;
			let j_cols_that_must_be_prefiltered=[];let j_cols_that_must_be_prefiltered_values=[];
			let db_cols_that_must_be_prefiltered=[];let db_cols_that_must_be_prefiltered_values=[];
			let db_r=0;let c=0;let r=0;
			for(c=0;c<COLS.length;c++){if(COLS[c].filterable){if(!inoe(this.F[COLS[c].name])){
				let vv=this.F[COLS[c].name];
				if(vv.indexOf('#')<0){vv=[vv]}else{vv=vv.split('#');}
				for(let vx=0;vx<vv.length;vx++){vv[vx]=vv[vx].trim();if(vv[vx].indexOf('js:')==0){
					vv[vx]=(eval(vv[vx].replace('js:',''))+'')}vv[vx]=vv[vx].trim().toLowerCase();
				}
				if(COLS[c].type){
					if(COLS[c].type=='js'){j_cols_that_must_be_prefiltered.push(COLS[c].name);j_cols_that_must_be_prefiltered_values.push(vv);}
			   else if(COLS[c].type=='db'){db_cols_that_must_be_prefiltered.push(COLS[c].source_col);db_cols_that_must_be_prefiltered_values.push(vv);}
				}else{
					/*it3 def compatibility*/
					if(COLS[c].op=='normal'){j_cols_that_must_be_prefiltered.push(COLS[c].name);j_cols_that_must_be_prefiltered_values.push(vv);}
					else if(COLS[c].op=='dbnormal'){db_cols_that_must_be_prefiltered.push(COLS[c].source_col);db_cols_that_must_be_prefiltered_values.push(vv);}
				}
				
			}}}
			this.OUTIDX={};this.O=[];let out_ridx=null;this.AVG_COUNT={};
			var db_row=null;var json_data=null;var j_row=null;
			for(db_r=0;db_r<this.D.length;db_r++){db_row=this.D[db_r]; json_data=db_row[this.oo.json_data_prop];
				if(this._prefilter_db_row(db_row,db_cols_that_must_be_prefiltered,db_cols_that_must_be_prefiltered_values)){
					for(r=0;r<json_data.rows.length;r++){
						j_row=json_data.rows[r];
						if(this._prefilter_j_row(db_row,j_row,j_cols_that_must_be_prefiltered,j_cols_that_must_be_prefiltered_values)){
							//Get out_row_index for this json line
							out_ridx=this._make_idx(db_row,j_row,db_row.j_adapter,this.G);
							//Create line if not exists
							if(this.OUTIDX[out_ridx]==undefined){this.OUTIDX[out_ridx]=this.O.length;this.O[this.OUTIDX[out_ridx]]=JSON.parse(JSON.stringify(this.oo.def.empty));}
							//Fill columns with op or fn
							for(c=0;c<COLS.length;c++){
								// this.OPS[COLS[c].op].call(this,db_row,j_row,this.OUTIDX[out_ridx],db_row.j_adapter,COLS[c],c,this.G,COLS[c].field1,COLS[c].field2);
								     if(this.OPS[COLS[c].op]){this.OPS[COLS[c].op].call(this,db_row,j_row,this.OUTIDX[out_ridx],db_row.j_adapter,COLS[c],c,this.G);}
								else if(this.OPS[COLS[c].type]){this.OPS[COLS[c].type].call(this,db_row,j_row,this.OUTIDX[out_ridx],db_row.j_adapter,COLS[c],c,this.G);}
								else if(this.oo.custom_fns[COLS[c].type]){this.oo.custom_fns[COLS[c].type].call(this,db_row,j_row,this.OUTIDX[out_ridx],db_row.j_adapter,COLS[c],c,this.G);}
								else{console.log('Pickup function not found '+COLS[c].name);}
			}	}	}	}	}
			let rem=[];
			for(r=0;r<this.O.length;r++){
				for(c=0;c<COLS.length;c++){
					if(COLS[c].fn){this.O[r][c]=this.oo.custom_fns[COLS[c].fn].call(this,this.O[r],COLS[c]);}
					/* 20230104 - tolto supporto x_fn
					if(COLS[c].x_fn){
						if((typeof COLS[c].x_fn)=='function'){this.O[r][c]=COLS[c].x_fn(this.O[r]);}
						else{this.O[r][c]='todo fn '+COLS[c].x_fn}
					}
					*/
					/*non si sa xche commentaton :(
					if(COLS[c].filterable){if(this.G[COLS[c].name]=='grouped'){
						if(!inoe(this.F[COLS[c].name])){
							if(this.O[r][c].toLowerCase().indexOf(this.F[COLS[c].name].toLowerCase())<0){
								this.O[r]=null;
								for(db_r in this.OUTIDX){if(this.OUTIDX[db_r]==r){delete this.OUTIDX[db_r];rem.push(r)}}
								c=10000;
							}
						}
					}}*/
				}
				if(this.O[r]!=null){
					if(this.oo.def.final_accept){
						if(!this.oo.def.final_accept(this.O[r],this.OH)){
							this.O[r]=null;for(db_r in this.OUTIDX){if(this.OUTIDX[db_r]==r){delete this.OUTIDX[db_r];rem.push(r)}}
				}	}	}
			}
			this.O=this.O.filter(function(value,index,arr){return value != null;});
			rem=rem.sort(function(a,b){return b-a});
			for(db_r in this.OUTIDX){for(r=0;r<rem.length;r++){
				if(this.OUTIDX[db_r]>=rem[r]){this.OUTIDX[db_r]=this.OUTIDX[db_r]-1;}
			}	}
			//Insert titles
			this.O.unshift([]);for(c=0;c<COLS.length;c++){this.O[0].push(COLS[c].name)}
			//Clean grouped columns (they make no sense)
			let col=null;for(r=0;r<this.O.length;r++){
				for(col in this.G){if(this.G[col]=='ungrouped'){this.O[r][this.out_adapter[col.replace(/ /g,'').toLowerCase()]]='#--hide';}}
				this.O[r]=this.O[r].filter(function(value,index,arr){return value != '#--hide';});}
			this.OH=this.O.shift();
			return true;
	},
	dbidx_tuplets:{},tuplets:{},
	_make_idx:function(db_row,j_row,j_adapter,G){var c;var k;var xx=[];
		for(k in G){if(G[k]=='grouped'){let kmin=k.toLowerCase();
				if(this.dbidx_tuplets[kmin]){xx.push(db_row[this.dbidx_tuplets[kmin]]);}
				else if(db_row[kmin]){xx.push(db_row[kmin]);}
				else if(j_adapter[this.tuplets[k]]||j_adapter[this.tuplets[k]]==0){xx.push((j_row[j_adapter[this.tuplets[k]]])||'');}
		}	}return xx.join('-');},
	OPS:{formula:function(){return null},
		js:function(db_row,j_row,out_r_idx,j_adapter,C,c_idx){let v=j_row[j_adapter[C.source_col||C.name.replace(/ /g,'')]];
			if(v||v==0){this.O[out_r_idx][c_idx]=v;}},
		db:function(db_row,j_row,out_r_idx,j_adapter,C,c_idx){let v=db_row[C.source_col||C.name.replace(/ /g,'')];
			if(v){this.O[out_r_idx][c_idx]=v}},
		fn:function(db_row,j_row,out_r_idx,j_adapter,C,c_idx){
			
		},
		sum:function(db_row,j_row,out_r_idx,j_adapter,C,c_idx){let v=j_row[j_adapter[C.source_col]]||'0';
			if(!this.O[out_r_idx][c_idx]){this.O[out_r_idx][c_idx]=0;}
			if(j_adapter[C.source_col]>=0){if(v||v=='0'){this.O[out_r_idx][c_idx]=this.O[out_r_idx][c_idx]+parseFloat(v);}}},
		avg:function(db_row,j_row,out_r_idx,j_adapter,C,c_idx){
			if(!this.AVG_COUNT[c_idx+'#'+out_r_idx]){this.AVG_COUNT[c_idx+'#'+out_r_idx]=1;this.O[out_r_idx][c_idx]=0}
			else{this.AVG_COUNT[c_idx+'#'+out_r_idx]++}
			this.O[out_r_idx][c_idx]=this.O[out_r_idx][c_idx] * (this.AVG_COUNT[c_idx+'#'+out_r_idx]-1);
			let c_idx2=j_adapter[C.source_col||C.name];
			if(c_idx2||c_idx2==0){let v=j_row[c_idx2];
				if(v){
					let f=0;try{f=parseFloat(v);}catch(ex){f=0}
					if(f==NaN){f=0;}
					this.O[out_r_idx][c_idx]=this.O[out_r_idx][c_idx]+f;
				}
			}
			this.O[out_r_idx][c_idx]=this.O[out_r_idx][c_idx]/this.AVG_COUNT[c_idx+'#'+out_r_idx];
		}
	},
	/* ------------------------------------------------------------------------------------------------------------------- */
	/* ------------------------------------------------------------------------------------------------------------------- */
	O_formatted:false,
	get_formatted:function(){if(this.O_formatted){return this.O_formatted}else{
		this.O_formatted=[];
		let FIX=[];
		for(let c=0;c<this.OH.length;c++){
			let C=this.oo.def.cols[this.out_adapter[this.OH[c]]];
			if(C.decorator){FIX.push(C.decorator);}
			else{FIX.push(function(v){return v.toString();});}
		}
		for(let r=0;r<this.O.length;r++){this.O_formatted.push([]);
			for(let f=0;f<FIX.length;f++){
				this.O_formatted[r].push(FIX[f](this.O[r][f]));
		}	}
		return this.O_formatted;
	}},
	/* ------------------------------------------------------------------------------------------------------------------- */
	/* ------------------------------------------------------------------------------------------------------------------- */
	destroy:function(ev){this.O=null;this.OH=null;this.G=null;this.D=null;this.source_option=null;
		this.out_adapter=null;this.emptyline=null;this.name=null;
		delete this.O;delete this.OH;delete this.G;delete this.D;
	}
};
//(function(exports){exports.ReportData=ReportData;})(typeof exports === 'undefined'? this['ReportData']={}:exports);
(function(exports){exports.Source=Source;})(typeof exports === 'undefined'? (ISNODE?this['Source']={}:this['it4']['data']['Source']=Source):exports);

