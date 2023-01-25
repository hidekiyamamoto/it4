var ISNODE=false;if(typeof window==='undefined'){ISNODE=true}
var IT4DATACONFIG={};
if(ISNODE){
	var{GraphBase}=require('./www-public/it4/it4.data.graph.js');
}else{
	var GraphBase=it4.data.GraphBase;
}

var GraphSample=function(opts,source,target){GraphBase.call(this,'GraphSample',opts,source,target);if(!this.opts.html){this.opts.html='sample'}if(!this.opts.up_counter){this.opts.up_counter=0}};GraphSample.prototype={
	redraw:function(){
		/*Custom code to draw the graphics basic elements.*/
		this.opts.up_counter=0;
		it4.clearchilds(this.target);
		this.xobj=it4.ins(this.target,'div',false,this.opts.html);
	},
	update:function(){
		/*Custom code to update the data of the Graph.*/
		this.opts.up_counter=this.opts.up_counter+1;
		this.xobj.innerHTML=this.opts.html+' [updated('+this.opts.up_counter+')]';
	},
	refit:function(){
		/*Custom code to refix the Graph.*/
		this.xobj.innerHTML=this.opts.html+' [refitted]';
	},
	destroy:function(){
		GraphBase.prototype.destroy.call(this);
	}
};
Object.setPrototypeOf(GraphSample.prototype,GraphBase.prototype);
//(function(exports){exports.ReportData=ReportData;})(typeof exports === 'undefined'? this['ReportData']={}:exports);
(function(exports){exports.GraphSample=GraphSample;})(typeof exports === 'undefined'? (ISNODE?this['GraphSample']={}:this['it4']['data']['GraphSample']=GraphSample):exports);

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
