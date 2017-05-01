const STORE_KSY = 'todolist-data';
export default{
	setLocalStorage (items){
		window.localStorage.setItem(STORE_KSY,JSON.stringify(items));
	},
	getLocalStorage (){
		return JSON.parse(window.localStorage.getItem(STORE_KSY) || '[]');
	},
	clear (){
		window.localStorage.clear();
	} 
}
