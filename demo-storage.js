(function(root){
 const object=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
 function valid(value){return object(value)&&Array.isArray(value.events)&&object(value.registrations)&&typeof value.verified==='boolean'&&(value.profile===null||(object(value.profile)&&typeof value.profile.name==='string'))&&value.events.every(e=>object(e)&&Number.isSafeInteger(e.id)&&typeof e.title==='string'&&typeof e.date==='string'&&Number.isFinite(Date.parse(e.date))&&typeof e.town==='string'&&typeof e.category==='string'&&Number.isInteger(e.capacity)&&e.capacity>0&&Number.isFinite(e.count)&&e.count>=0&&(!e.roster||(Array.isArray(e.roster)&&e.roster.every(p=>object(p)&&Number.isSafeInteger(p.id)&&typeof p.name==='string'))))}
 function load(storage,key){try{const raw=storage.getItem(key);if(raw===null)return {data:null,warning:''};const data=JSON.parse(raw);if(!valid(data))throw Error();return {data,warning:''}}catch{return {data:null,warning:'Nie można odczytać zapisanej makiety. Pokazujemy dane początkowe. Poprzedni zapis nie został automatycznie usunięty.'}}}
 function save(storage,key,data){try{storage.setItem(key,JSON.stringify(data));return true}catch{return false}}
 const api={load,save};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AtlasStorage=api;
})(typeof globalThis!=='undefined'?globalThis:this);
