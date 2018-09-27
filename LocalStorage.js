/**
下面的代码是可以在外部调用的，目的是为了将一个 数据 存放在本地的 localStorage 中；
相当于 cookie 一样存放在本地浏览器中；

使用下面的功能时间，须先引入这个文件，并用 prodTools.fn 的方式来使用

**/

//申明一个对象 
let prodTools = {};

//申明一个常量
let store = window.localStorage;

//申明一个空对象，未来从localStorage中获取 （注：没有数据就是一个空对象）
//用window.localStorage.getItem()从本地localStorage中获取的prods对应的值为字符串，
//用JSON.parse将字符串转换为对象
let prods = JSON.parse(store.getItem('prods')||'{}');

//向空对象prods中增加或者追加值
prodTools.addOrUpdate = function(obj){//obj即为传的对象
	//判断localStorage的prods对象的某个值是否存在
	if(prods[obj.id]){ //id即为传的对象的键名,存在
		prods[obj.id] += obj.num; //存在追加值；
	}else{ //不存在
		prods[obj.id] = obj.num; //不存在即增加值；
	}

	//改变了prods的值，再将其存储
	this.saveVal(prods);
}

//删除对象prods中对应键的值
prodTools.delVal = function(key){
	delete prods[key];

	//删除了prods的值，同样再将其存储
	this.saveVal(prods);
}

//获取对象，并返回
prodTools.getProds = function(){
	return JSON.parse(store.getItem('prods')||'{}');
}

//获取对象prods中所有键的值总数
prodTools.getProdsAllCount = function(){
	let sum = 0;
	for(let key in prods){
		sum += prods[key];
	}
	return sum;
}

//将传送对象存储在本地的localStorage中；
prodTools.saveVal = function(obj){
	store.setItem('prods',obj);
}

//暴露接口
export default prodTools;