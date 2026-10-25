(function(root){
 const themes=[
 {id:'atlas',name:'Obecny — granat i błękit',accent:'#26daf3',nav:'#062c40',hero:'#073247',bg:'#f4f8fa',surface:'#ffffff',ink:'#082d43',muted:'#607a89',soft:'#e8f3f3',line:'#dbe7ed',on:'#04283b'},
 {id:'orange',name:'Pomarańczowy',accent:'#ffab59',nav:'#392516',hero:'#49301c',bg:'#fff7ef',surface:'#ffffff',ink:'#3b291c',muted:'#80644e',soft:'#ffead6',line:'#ead8c7',on:'#3f2204'},
 {id:'green',name:'Zielony',accent:'#55d7a0',nav:'#102f27',hero:'#173e33',bg:'#f1f8f3',surface:'#ffffff',ink:'#183e30',muted:'#577568',soft:'#dff1e5',line:'#cee2d5',on:'#082e1b'},
 {id:'violet',name:'Fioletowy',accent:'#b4a0ff',nav:'#29213f',hero:'#352b50',bg:'#f7f4fc',surface:'#ffffff',ink:'#302443',muted:'#736582',soft:'#ece4f7',line:'#ded3ee',on:'#261344'},
 {id:'red',name:'Czerwony',accent:'#ff8585',nav:'#3c1d22',hero:'#4c282d',bg:'#fff5f3',surface:'#ffffff',ink:'#48272a',muted:'#876366',soft:'#fae5e2',line:'#ebd1ce',on:'#330d0d'},
 {id:'cherry',name:'Wiśniowy',accent:'#eda0b2',nav:'#351423',hero:'#4c1f32',bg:'#fcf3f6',surface:'#ffffff',ink:'#482537',muted:'#826172',soft:'#f1dfe7',line:'#e8cdd8',on:'#390d18'},
 {id:'yellow',name:'Żółty',accent:'#f5d548',nav:'#302c16',hero:'#423c1f',bg:'#fffcee',surface:'#ffffff',ink:'#40391e',muted:'#7c7350',soft:'#f6efcf',line:'#e7dfbb',on:'#302a08'},
 {id:'black',name:'Czarny',accent:'#f0f2f4',nav:'#090b0e',hero:'#15191f',bg:'#101419',surface:'#1d242b',ink:'#eef4f6',muted:'#b9c5ce',soft:'#252e37',line:'#3a444d',on:'#14181e'},
 {id:'coffee',name:'Kawowy',accent:'#d9b08b',nav:'#30231e',hero:'#443229',bg:'#f6f0e9',surface:'#fffdf9',ink:'#3e2b23',muted:'#816c5f',soft:'#eaddce',line:'#dfcfbf',on:'#2d1b10'}
 ];
 const key='aktywni-atlas-theme';
 function find(id){return themes.find(t=>t.id===id)||themes[0]}
 function read(storage){try{return find(storage.getItem(key)).id}catch{return 'atlas'}}
 function save(storage,id){if(!themes.some(t=>t.id===id))return false;try{storage.setItem(key,id);return true}catch{return false}}
 const api={themes,find,read,save};if(typeof module!=='undefined'&&module.exports){module.exports=api;return}
 root.AtlasThemes=api;
 let current=read({getItem:k=>localStorage.getItem(k)});
 function apply(id,persist=false){const theme=find(id);current=theme.id;document.documentElement.dataset.theme=current;for(const [name,value]of Object.entries(theme))if(!['id','name'].includes(name))document.documentElement.style.setProperty('--theme-'+name,value);if(persist&&!save({setItem:(k,v)=>localStorage.setItem(k,v)},current))document.querySelector('#themeSaveStatus').textContent='Motyw działa, ale przeglądarka nie pozwoliła zapisać wyboru.';document.querySelectorAll('[data-theme-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.themeChoice===current)))}
 function open(){let dialog=document.querySelector('#themeDialog');if(!dialog){dialog=document.createElement('dialog');dialog.id='themeDialog';dialog.className='theme-dialog';dialog.setAttribute('aria-labelledby','themeTitle');dialog.innerHTML='<div class="dialog-head"><div><h2 id="themeTitle">Wybierz swój motyw</h2><p>Kolory zmieniają się od razu. Wybór zapamiętamy w tej przeglądarce.</p></div><button aria-label="Zamknij wybór motywu" data-close-theme>×</button></div><div class="theme-choices">'+themes.map(t=>`<button type="button" data-theme-choice="${t.id}" aria-pressed="${t.id===current}"><span class="theme-preview" style="--sample-nav:${t.nav};--sample-bg:${t.bg};--sample-accent:${t.accent}"><i></i><b></b><em></em></span><span>${t.name}</span><span class="theme-check" aria-hidden="true">✓</span></button>`).join('')+'</div><p id="themeSaveStatus" role="status" class="helper">Mapa i oprawa pasa dopasowują się do motywu. Zdjęcia zachowują naturalne kolory.</p><button class="primary" data-close-theme>Gotowe</button>';document.body.append(dialog);dialog.querySelectorAll('[data-close-theme]').forEach(b=>b.onclick=()=>dialog.close());dialog.querySelectorAll('[data-theme-choice]').forEach(b=>b.onclick=()=>apply(b.dataset.themeChoice,true))}dialog.showModal();dialog.querySelector(`[data-theme-choice="${current}"]`).focus()}
 apply(current);const button=document.createElement('button');button.type='button';button.className='theme-toggle';button.innerHTML='<span aria-hidden="true">◐</span> Motyw';button.setAttribute('aria-haspopup','dialog');button.onclick=open;document.querySelector('aside').append(button);if(typeof fitAtlasStrip==='function')requestAnimationFrame(fitAtlasStrip);
})(typeof globalThis!=='undefined'?globalThis:this);


