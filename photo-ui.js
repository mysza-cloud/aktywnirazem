// Dziesięć fotografii w jednym zasobie; widoki SVG kadrują poszczególne komórki.
function sportPhoto(id){const index=featuredDisciplineIds.indexOf(id);if(index<0)return '';const x=(index%5)*362,y=Math.floor(index/5)*434.5;return `<svg class="sport-photo" viewBox="${x} ${y} 362 434.5" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><image href="assets/sport-photo-atlas-v1.png" width="1810" height="869"/></svg>`}
function applySportPhotos(){if(page!=='Odkrywaj')return;document.querySelectorAll('.sport-tile').forEach((tile,i)=>{if(!tile.querySelector('.sport-photo'))tile.insertAdjacentHTML('afterbegin',sportPhoto(featuredDisciplineIds[i]));tile.querySelector('.sport-symbol')?.remove()});const visible=matches();document.querySelectorAll('.cards .picture').forEach((picture,i)=>{const e=visible[i];if(!e||!featuredDisciplineIds.includes(e.discipline))return;if(!picture.querySelector('.sport-photo'))picture.insertAdjacentHTML('afterbegin',sportPhoto(e.discipline));const emoji=picture.querySelector('span[aria-hidden]');if(emoji)emoji.remove()})}
const photoPriorRender=render,photoPriorRefresh=refreshCards;
render=function(){photoPriorRender();applySportPhotos()};
refreshCards=function(){photoPriorRefresh();applySportPhotos()};
render();

