// Recolor only blue illustration ink; original photographs remain underneath protected masks.
(function(){
 let serial=0;
 const svgNS='http://www.w3.org/2000/svg';
 function tint(svg,kind,theme){
  if(!svg)return;
  let group=svg.querySelector('[data-theme-ink]');
  if(!group){
   const source=svg.querySelector(':scope > image');if(!source)return;
   const id='themeArt'+(++serial),mask=id+'Mask';
   const protectedAreas=kind==='map'?'<circle cx="850" cy="120" r="51" fill="black"/><circle cx="1110" cy="147" r="51" fill="black"/><circle cx="940" cy="315" r="56" fill="black"/>':kind==='strip'?'<path d="M220 541H1304L1270 733H184Z" fill="black"/>':'';
   svg.insertAdjacentHTML('afterbegin',`<defs><mask id="${mask}" maskUnits="userSpaceOnUse" x="0" y="0" width="1309" height="1201"><rect width="1309" height="1201" fill="white"/>${protectedAreas}</mask><filter id="${id}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 -5 0 5 0 -.18" result="blueMask"/><feColorMatrix in="SourceGraphic" type="saturate" values="0" result="gray"/><feComponentTransfer in="gray" result="tinted"><feFuncR type="table" tableValues="0 1"/><feFuncG type="table" tableValues="0 1"/><feFuncB type="table" tableValues="0 1"/></feComponentTransfer><feComposite in="tinted" in2="blueMask" operator="in"/></filter></defs>`);
   group=document.createElementNS(svgNS,'g');group.dataset.themeInk='';group.setAttribute('filter',`url(#${id})`);group.setAttribute('mask',`url(#${mask})`);group.style.pointerEvents='none';group.append(source.cloneNode(true));svg.append(group);
  }
  group.style.display=theme.id==='atlas'?'none':'';
  const rgb=hex=>hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255);
  const low=rgb(theme.hero),high=rgb(theme.accent);
  ['R','G','B'].forEach((channel,i)=>svg.querySelector('feFunc'+channel).setAttribute('tableValues',`${low[i]} ${high[i]}`));
 }
 function applyArtwork(){const theme=AtlasThemes.find(document.documentElement.dataset.theme);tint(document.querySelector('.atlas-original-art'),'map',theme);tint(document.querySelector('.reference-strip-art'),'strip',theme);tint(document.querySelector('.reference-logo'),'logo',theme);tint(document.querySelector('.atlas-skyline svg'),'skyline',theme)}
 const prior=render;render=function(){prior();applyArtwork()};
 new MutationObserver(applyArtwork).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});applyArtwork();
})();

