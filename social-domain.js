(function(root){
 const people=[
  {id:'alex',name:'Alex Nowak — demo',town:'Oborniki',activity:'Rowery',avatar:'🚲'},
  {id:'maja',name:'Maja Lis — demo',town:'Rogoźno',activity:'Bieganie',avatar:'👟'},
  {id:'kuba',name:'Kuba Las — demo',town:'Ryczywół',activity:'Piłka nożna',avatar:'⚽'},
  {id:'ola',name:'Ola Brzeg — demo',town:'Oborniki',activity:'Basen',avatar:'🏊'},
  {id:'jan',name:'Jan Polny — demo',town:'Rogoźno',activity:'Nordic walking',avatar:'🌿'},
  {id:'iga',name:'Iga Kort — demo',town:'Ryczywół',activity:'Tenis',avatar:'🎾'}
 ];
 const known=id=>people.some(p=>p.id===id),empty=()=>({relations:{},conversations:[],invitations:[]});
 const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/ł/g,'l').trim();
 function search(q='',town=''){q=normalize(q);return people.filter(p=>(!town||p.town===town)&&normalize(`${p.name} ${p.activity} ${p.town}`).includes(q))}
 function friendIds(s){return people.filter(p=>s.relations[p.id]==='accepted').map(p=>p.id)}
 function request(s,id){if(!known(id))throw Error('Nieznana osoba.');if(s.relations[id]==='blocked')throw Error('Najpierw odblokuj tę osobę.');if(!s.relations[id])s.relations[id]='pending'}
 function accept(s,id){if(s.relations[id]!=='pending')throw Error('Brak prośby do zaakceptowania.');s.relations[id]='accepted'}
 function remove(s,id){delete s.relations[id]}
 function createConversation(s,{id,members,title=''}){members=[...new Set(members)];title=String(title).trim();if(!members.length||members.length>10||members.some(p=>!known(p)||s.relations[p]!=='accepted'))throw Error('Wybierz osoby z listy znajomych.');if(members.length>1&&(!title||title.length>60))throw Error('Nazwa grupy powinna mieć od 1 do 60 znaków.');if(members.length===1){const existing=s.conversations.find(c=>c.members.length===1&&c.members[0]===members[0]);if(existing)return existing}if(s.conversations.length>=30)throw Error('Makieta mieści maksymalnie 30 rozmów.');if(typeof id!=='string'||!/^c-[a-z0-9-]{1,70}$/.test(id)||s.conversations.some(c=>c.id===id))throw Error('Nieprawidłowy identyfikator rozmowy.');const c={id,members,title:members.length>1?title:'',messages:[]};s.conversations.push(c);return c}
 function addMessage(s,id,text,at){const c=s.conversations.find(c=>c.id===id);if(!c||c.members.some(p=>s.relations[p]!=='accepted'))throw Error('Rozmowa jest niedostępna. Sprawdź listę znajomych.');text=String(text).trim();if(!text||text.length>2000)throw Error('Wpisz wiadomość od 1 do 2000 znaków.');if(c.messages.length>=100)throw Error('Limit pokazu: 100 wiadomości w rozmowie.');if(!Number.isFinite(at))throw Error('Nieprawidłowy czas.');c.messages.push({text,at})}
 function invite(s,{personId,eventId},events){const e=events.find(e=>e.id===eventId);if(s.relations[personId]!=='accepted'||!e?.owner||e.cancelled||e.completed)throw Error('Wybierz znajomego i własne aktywne wydarzenie.');if(s.invitations.some(i=>i.personId===personId&&i.eventId===eventId))throw Error('Takie zaproszenie demo już istnieje.');if(s.invitations.length>=100)throw Error('Osiągnięto limit 100 zaproszeń demo.');s.invitations.push({personId,eventId})}
 function load(raw){const s=empty();try{const x=JSON.parse(raw);if(!x||typeof x!=='object')return s;for(const p of people)if(['pending','accepted','blocked'].includes(x.relations?.[p.id]))s.relations[p.id]=x.relations[p.id];if(Array.isArray(x.conversations))for(const c of x.conversations.slice(0,30)){if(!c||typeof c.id!=='string'||!/^c-[a-z0-9-]{1,70}$/.test(c.id)||s.conversations.some(y=>y.id===c.id)||!Array.isArray(c.members)||!c.members.length||c.members.length>10||c.members.some(id=>!known(id))||new Set(c.members).size!==c.members.length)continue;const title=typeof c.title==='string'?c.title.trim().slice(0,60):'';if(c.members.length>1&&!title)continue;s.conversations.push({id:c.id,members:c.members,title,messages:Array.isArray(c.messages)?c.messages.filter(m=>m&&typeof m.text==='string'&&m.text.trim()&&m.text.length<=2000&&Number.isFinite(m.at)).slice(-100).map(m=>({text:m.text,at:m.at})):[]})}if(Array.isArray(x.invitations))s.invitations=x.invitations.filter(i=>i&&known(i.personId)&&Number.isSafeInteger(i.eventId)&&i.eventId>0).slice(0,100).map(i=>({personId:i.personId,eventId:i.eventId}));return s}catch{return s}}
 const api={people,empty,search,friendIds,request,accept,remove,createConversation,addMessage,invite,load};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AtlasSocial=api;
})(typeof window!=='undefined'?window:globalThis);


