var ISNODE=false;if(typeof window==='undefined'){ISNODE=true}
var IT4DATACONFIG={};
if(ISNODE){
	var{GraphBase}=require('./www-public/it4/it4.data.graph.js');
}else{
	var GraphBase=it4.data.GraphBase;
}

var GraphTableBase=function(opts,source,target){GraphBase.call(this,'TableBase',opts,source,target);};GraphTableBase.prototype={
	redraw:function(){
		let ts=null;let tl=null;let cnum=this.source.OH.length;
		if(this.xobj){it4.clearchilds(this.xobj);}
		else{this.xobj=it4.ins(this.target,'table');}
		ts=it4.ins(this.xobj,'thead');tl=it4.ins(ts,'tr');
		for(let h=0;h<cnum;h++){it4.ins(tl,'th',false,this.source.OH[h]);}
		ts=it4.ins(this.xobj,'tbody');
		let FO=this.source.get_formatted();
		for(let r=0;r<FO.length;r++){
			tl=it4.ins(ts,'tr');
			for(let h=0;h<cnum;h++){
				it4.ins(tl,'td',false,FO[r][h]);
	}	}	},
	update:function(){
		this.redraw();
	},
	refit:function(){
		this.redraw();
	},
	destroy:function(){
		GraphBase.prototype.destroy.call(this);
	},
	footer_recalc:function(){
		
	}
};
Object.setPrototypeOf(GraphTableBase.prototype,GraphBase.prototype);
//(function(exports){exports.ReportData=ReportData;})(typeof exports === 'undefined'? this['ReportData']={}:exports);
(function(exports){exports.GraphTableBase=GraphTableBase;})(typeof exports === 'undefined'? (ISNODE?this['GraphTableBase']={}:this['it4']['data']['GraphTableBase']=GraphTableBase):exports);


/*

_as_table:function(tgt,_revertdata,_redraw,_next,ui){let HH='';let FF='';let ts='';let coldsdef=[];let _this=this;
		let numorder=[];let nameorder=[];
		if(!_redraw){nameorder=JSON.parse(JSON.stringify(this.source.OH));let b=it3.ins(this.element.parentElement,'button',['class','chart_times fa fa-download sel-ctr','style','top:40px;']);b.addEventListener('click',(ev)=>{_this.download_table();});}
		if(_revertdata.tabletotals){this.element.classList.add('withtotals');}
		let cellsIDX={};let SORTCOL='nonono';
		if(_revertdata.order){nameorder=_revertdata.order;}
		for(let i=0;i<nameorder.length;i++){if(this.source.OH.indexOf(nameorder[i])<0){nameorder.splice(i,1);i--;}}
		for(let cidx=0;cidx<this.source.OH.length;cidx++){
			if(nameorder.indexOf(this.source.OH[cidx])<0){nameorder.unshift(this.source.OH[cidx])}
			let cnamesmall=this.source.OH[cidx].replace(/ /g,'').toLowerCase();
			let cnamesmallIDX=this.source.out_adapter[cnamesmall];
			if(this.source.oo.def.cols[cnamesmallIDX].groupable){
				if(this.source.oo.def.cols[cnamesmallIDX].gmode=='select'){HH=HH+'<th name="'+this.source.OH[cidx]+'"><select class="tablehfilter"><option value="all">'+this.source.OH[cidx]+'</option></select></th>';}
				else if(this.source.oo.def.cols[cnamesmallIDX].gmode=='text'){HH=HH+'<th name="'+this.source.OH[cidx]+'"><input type="text" class="tablehfilter"/></th>';}
				else{HH=HH+'<th name="'+this.source.OH[cidx]+'"><select class="tablehfilter"><option value="all">'+this.source.OH[cidx]+'</option></select></th>';}
			}else{HH=HH+'<th name="'+this.source.OH[cidx]+'" title="'+this.source.OH[cidx]+'">&nbsp;<span class="thtrick">'+this.source.OH[cidx]+'</span></th>';}
			if(STATIC_CONFIG[this.source.OH[cidx]]){cellsIDX[this.source.OH[cidx]]=coldsdef.push({"orderDataType":"unified-ordering","type":'num-fmt'});}
			else{
				if(this.source.OH[cidx].replace(/1|5|0/g,'')=='top'){SORTCOL=cidx;
					 cellsIDX[this.source.OH[cidx]]=coldsdef.push({"orderDataType":"tops-ordering",type:'string'});}
				else{cellsIDX[this.source.OH[cidx]]=coldsdef.push({"orderDataType":"string-ordering",type:'string'});}
			}
			cellsIDX[this.source.OH[cidx]]=cellsIDX[this.source.OH[cidx]]-1;
			FF=FF+'<td></td>';
		}
		for(let i=0;i<nameorder.length;i++){numorder.push(this.source.OH.indexOf(nameorder[i]));}
		if(_revertdata.invisibles){for(let inv in _revertdata.invisibles){if(!cellsIDX[inv]){inv=inv.trim()}if(cellsIDX[inv]||cellsIDX[inv]==0){coldsdef[cellsIDX[inv]].visible=false;}}}
		//BACK-COMPATIBILITY
		else if(_revertdata.visibles){for(let v=0;v<_revertdata.visibles.length;v++){coldsdef[v].visible=_revertdata.visibles[v];}}
		let t=it3.ins(tgt,'table',['class','report-table','style','width:100%'],'<thead><tr>'+HH+'</tr></thead><tbody></tbody><tfoot><tr>'+FF+'</tr></tfoot>');
		//Prepare data (apply formats) and extract filtering options
		var Fdata=this.source.O;var fixfn;var FILTEROPTIONS=[];
		//let mrkidx=0;
		//START ----- ADDED TO HAVE THE GOOD CURRENCY NEAR THE VALUES
		let mrkidx=false;let mrk=false;
		for(let h=0;h<this.source.OH.length;h++){if(this.source.OH[h]=='mrk'){mrkidx=h}}
		if(!mrkidx){
			if(this.source._Tdata){if(this.source._Tdata.market!='ALL'){mrk=this.source._Tdata.market;}
			}else if(this.source.F.mrk){
				mrk=this.source.F.mrk.split('#')[0].toUpperCase();
			}else{
				mrkidx=0;
			}
		}
		//END ----- ADDED TO HAVE THE GOOD CURRENCY NEAR THE VALUES
		
		for(let h=0;h<this.source.OH.length;h++){
			if(STATIC_CONFIG[this.source.OH[h]]){fixfn=STATIC_CONFIG[this.source.OH[h]];}
			else{fixfn=false;}
			let cnamesmall=this.source.OH[h].replace(/ /g,'').toLowerCase();
			let cnamesmallIDX=this.source.out_adapter[cnamesmall];
			if(this.source.oo.def.cols[cnamesmallIDX].groupable){let hh=nameorder.indexOf(this.source.OH[h]);
				FILTEROPTIONS[hh]={};
				for(let x=0;x<Fdata.length;x++){
					// if(fixfn){Fdata[x][h]=fixfn(Fdata[x][h],Fdata[x][mrkidx]);}
					//START ----- ADDED TO HAVE THE GOOD CURRENCY NEAR THE VALUES
					let mrkStr='';if(!mrk){mrkStr=Fdata[x][mrkidx]}else{mrkStr=mrk;}if(fixfn){Fdata[x][h]=fixfn(Fdata[x][h],mrkStr);}
					//END ----- ADDED TO HAVE THE GOOD CURRENCY NEAR THE VALUES
				FILTEROPTIONS[hh][Fdata[x][h]]=true}
			}else{if(fixfn){for(let x=0;x<Fdata.length;x++){
				// Fdata[x][h]=fixfn(Fdata[x][h],Fdata[x][mrkidx]);
				//START ----- ADDED TO HAVE THE GOOD CURRENCY NEAR THE VALUES
				let mrkStr='';if(!mrk){mrkStr=Fdata[x][mrkidx]}else{mrkStr=mrk;}Fdata[x][h]=fixfn(Fdata[x][h],mrkStr);
				//END ----- ADDED TO HAVE THE GOOD CURRENCY NEAR THE VALUES
			}}}
		}
		//Create real datatables instance
		let TOPTIONS={data:Fdata,"paging":false,dom:'Birtp',colReorder:true,columns:coldsdef,
			"footerCallback":function(row,data,start,end,display){let api=this.api();_this.footer_recalc(api,row,data,start,end,display);},
				colReorder:{order: numorder},
			"buttons":[{extend: 'copy', text: '<i class="fa fa-copy"></i>'},{extend: 'excel', text: '<i class="fa fa-file-excel"></i>'},{extend: 'colvis', text: '<i class="fa fa-eye"></i>'}],
			"language":it3.data.T.table_language
			}
		if(SORTCOL!='nonono'){TOPTIONS.order=[[SORTCOL,'asc']];}
		console.log(TOPTIONS);
		let xobj=$(t).DataTable(TOPTIONS);
		this.xobj=xobj;
		//Move close button
		tgt.insertBefore(xobj.buttons().container()[0],tgt.firstChild);
		//Insert TOTALS Button and setup event
		let xbuttons=xobj.buttons().container();
		this.ui.appendChild(xobj.buttons().container()[0]);
		var totbutt=it3.ins(xobj.buttons().container()[0],'button',['class','btn btn-secondary', 'title', 'Show total row'],'tot');totbutt.addEventListener('click',function(ev){_this.toggletot(ev)});
		//Fill FILTER options and setup event
		let FILTERS=document.querySelectorAll('# .tablehfilter'.replace('#','#'+this.gitem.id));
		FILTEROPTIONS=FILTEROPTIONS.filter((el)=>{return el});
		for(let FFidx=0;FFidx<FILTERS.length;FFidx++){
			for(let k in FILTEROPTIONS[FFidx]){it3.ins(FILTERS[FFidx],'option',['value',k],k);}
			FILTERS[FFidx].addEventListener('click',function(ev){_this.tableColFilter(ev,FFidx)});
			FILTERS[FFidx].addEventListener('keyup',function(ev){_this.tableColFilter(ev,FFidx)});
		}		
		if(_next){_next(xobj);}return xobj;},

*/


/*

footer_recalc:function(api,row,data,start,end,display){var HHlen=api.columns()[0].length;window.AAAPI=api;
		for(let totF=0;totF<HHlen;totF++){
			let coldef=null;
			let hcolname=api.column(totF).header().innerHTML.match(/[^>]*>([^<]*)</);
			if(hcolname){hcolname=hcolname[1]}else{hcolname=api.column(totF).header().innerHTML}
			if(hcolname){
				coldef=this.source.oo.def.cols[this.source.out_adapter[hcolname.toLowerCase().replace(/ /g,'')]];
				if(coldef){
					if(coldef.op=='formula'){
						let outputfn;
						if(coldef.tot_op){outputfn=X.advReporting.X_OPS[coldef.tot_op];}
						else{outputfn=X.advReporting.X_OPS[coldef.x_op];}
						let footelm=api.table().footer().firstChild;
						let footdata=JSON.parse(JSON.stringify(this.source.oo.def.empty));
						let invisibles=0;let C=null;
						for(let td=0;td<HHlen;td++){C=api.column(td);if(!C.visible()){invisibles=invisibles+1}
							let currcolname=C.header().innerHTML.match(/[^>]*>([^<]*)</);
							if(currcolname){currcolname=currcolname[1]}else{currcolname=C.header().innerHTML}
							if(currcolname){try{
								let footdata_idx=this.source.out_adapter[currcolname.toLowerCase().replace(/ /g,'')];
								footdata[footdata_idx]=it3.data.removeFormat(footelm.childNodes[td-invisibles].innerHTML);}
								catch(ex){
									console.log('Error calculating footer col '+td);
									console.log(ex.message);
									console.log(invisibles);
									
						}	}	}
						// console.log(this.source,footdata);
						let x_op_result=outputfn.call(this.source,footdata);
						// console.log(hcolname+': '+x_op_result, outputfn);
						if(STATIC_CONFIG[hcolname]){x_op_result=STATIC_CONFIG[hcolname](x_op_result);}
						$(api.column(totF).footer()).html(x_op_result);
					}else{
						let MYitems=0;
						total = api.column(totF,{ page: 'current'}).data().reduce(function(a,b){MYitems++;let r=it3.data.removeFormat(a) + it3.data.removeFormat(b);
							if(r){return r}else{return ''}},0);
						if(coldef.tot_op){if(coldef.tot_op=='avg'){total=total/MYitems}else if(coldef.tot_op=='fixed_integer' && typeof total != "string"){total=total.toFixed(0)}else if(coldef.tot_op=='empty'){total=''}}
						
						// console.log(coldef.name,total);
						if(total.toString()=='NaN'){console.log('still necessary');$(api.column(totF).footer()).html('NaN');}
						else{
							if(coldef.tot_op !='empty'){
								if(STATIC_CONFIG[hcolname]){$(api.column(totF).footer()).html(STATIC_CONFIG[hcolname](total));}
								else{$(api.column(totF).footer()).html(total);}
							}else{
								$(api.column(totF).footer()).html(total);
							}
	}	}	}	}	}	},

*/