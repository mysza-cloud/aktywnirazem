// Lekka oprawa zakładek; bez zmiany danych i operacji formularzy.
const sectionLooks={
 Pulpit:['TWÓJ RYTM','Dobry plan na aktywny tydzień.','Spotkania, do których dołączasz, i pomysły, które zamieniasz w wydarzenia.','cycling','mint'],
 Kalendarz:['ZAREZERWUJ CZAS DLA SIEBIE','Więcej spotkań w Twoim kalendarzu.','Wybierz dzień i znajdź swój następny wspólny plan.','running','lavender'],
 Organizuję:['OD POMYSŁU DO SPOTKANIA','Zbierz ludzi. Zróbmy coś razem.','Mały spacer, wspólna gra albo sąsiedzki wieczór — Ty nadajesz kierunek.','football','peach'],
 Statystyki:['MAŁE KROKI, WSPÓLNE CHWILE','Zobacz, co daje Ci ruch.','Twoja aktywność ma wiele wymiarów. Każde spotkanie to nowa historia.','basketball','lavender'],
 Konto:['TWOJE MIEJSCE W SPOŁECZNOŚCI','Dobrze Cię tu widzieć.','Jeden profil, wiele możliwości spędzania czasu z ludźmi z okolicy.','tennis','mint'],
 'Katalog lokalny':['BLISKO CIEBIE','Znajdź swój następny plan.','Sport, rekreacja i spotkania — przejrzyj lokalne propozycje testowe.','swimming','peach']
};
function sectionArtwork(id){return `<div class="section-art" aria-hidden="true"><svg viewBox="0 0 400 220"><path d="M0 172Q60 30 170 98T400 30"/><path d="M10 210Q140 88 215 150T410 95"/><circle cx="70" cy="48" r="15"/><circle cx="330" cy="175" r="28"/><path d="M310 32h30m-15-15v30"/></svg><div class="section-photo">${sportPhoto(id)}</div><span class="art-spark">✳</span><span class="art-caption">RAZEM / AKTYWNIE</span></div>`}
function applySectionLooks(){
 const app=$('#app');app.dataset.view=page;
 for(const [selector,id] of [['.reference-logo','logoInk'],['.atlas-skyline svg','panoramaInk']]){const svg=document.querySelector(selector);if(svg&&!svg.querySelector('filter')){svg.insertAdjacentHTML('afterbegin',`<defs><filter id="${id}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 1 3 .3 0 -.85"/></filter></defs>`);svg.querySelector('image')?.setAttribute('filter',`url(#${id})`)}}
 if(page==='Odkrywaj'){const strip=app.querySelector('.reference-sport-strip');if(strip&&!strip.parentElement.classList.contains('reference-strip-band')){const band=document.createElement('div');band.className='reference-strip-band';strip.before(band);band.append(strip)}if(strip){strip.querySelector('.reference-strip-art')?.setAttribute('preserveAspectRatio','none');fitAtlasStrip()}}
 if(page==='Odkrywaj'){const band=app.querySelector('.reference-strip-band');if(band&&!app.querySelector('.about-activity'))band.insertAdjacentHTML('afterend',`<section class="about-activity" aria-labelledby="aboutActivityTitle"><div class="about-copy"><span class="section-eyebrow">O CO CHODZI W AKTYWNI RAZEM?</span><h2 id="aboutActivityTitle">Łatwiej zacząć,<br>gdy masz z kim.</h2><p>Aktywni Razem pomaga mieszkańcom powiatu obornickiego znaleźć ludzi do wspólnego spędzania czasu. Mecz, spacer, rowery, planszówki czy sąsiedzkie spotkanie — wybierz coś dla siebie albo zaproś innych do własnej inicjatywy.</p><p class="about-note">Nie musisz należeć do klubu ani mieć swojej drużyny. Liczy się chęć, żeby zrobić coś razem.</p><p class="cooperation-note"><span aria-hidden="true">↔</span> Aktywni Razem działa we współpracy z <strong>SKSOO</strong>.</p></div><div class="about-steps"><article><span>01</span><div><h3>Znajdź coś dla siebie</h3><p>Wybierz aktywność, miejscowość i dogodny termin.</p></div></article><article><span>02</span><div><h3>Dołącz do innych</h3><p>Poznaj szczegóły spotkania i sprawdź dostępne miejsca.</p></div></article><article><span>03</span><div><h3>Zorganizuj własne spotkanie</h3><p>Masz pomysł? Zaproś ludzi z okolicy do wspólnej aktywności.</p></div></article></div></section>`)}
 const config=sectionLooks[page];if(!config)return;
 const [eyebrow,title,copy,photo,tone]=config;
 const banner=`<section class="section-welcome tone-${tone}"><div><span class="section-eyebrow">${eyebrow}</span><h2>${title}</h2><p>${copy}</p></div>${sectionArtwork(photo)}</section>`;
 const heading=app.querySelector(':scope > .heading');if(heading)heading.insertAdjacentHTML('afterend',banner);else app.insertAdjacentHTML('afterbegin',banner);
 if(page==='Kalendarz'){
  const calendar=app.querySelector('.calendar');if(calendar){const frame=document.createElement('section');frame.className='calendar-surface';const month=calendar.previousElementSibling;calendar.before(frame);if(month?.classList.contains('section-head'))frame.append(month);frame.append(calendar)}
 }
}
function fitAtlasStrip(){
 const strip=document.querySelector('.reference-sport-strip'),hero=document.querySelector('.atlas-hero');if(!strip||!hero)return;
 strip.style.height='';strip.querySelector('.reference-strip-labels')?.remove();strip.querySelector('.strip-title h2')?.remove();
 const art=strip.querySelector('.reference-strip-art');art.setAttribute('viewBox','0 538 1309 280');art.setAttribute('preserveAspectRatio','xMidYMid meet');
 const copy=hero.querySelector('.atlas-copy');hero.style.height='';copy.style.zoom='';
 if(window.innerWidth>=900){
  const stripHeight=strip.getBoundingClientRect().width*280/1309;
  const top=hero.getBoundingClientRect().top+window.scrollY;
  const heroHeight=Math.max(310,window.innerHeight-top-stripHeight-2);
  hero.style.height=heroHeight+'px';
  const naturalCopy=copy.scrollHeight;copy.style.zoom=Math.min(1,(heroHeight-12)/naturalCopy);
 }
}
window.addEventListener('resize',fitAtlasStrip);
const sectionPriorRender=render;render=function(){sectionPriorRender();applySectionLooks()};render();





