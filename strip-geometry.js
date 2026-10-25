// Granice paneli w oryginalnej grafice 20 (współrzędne źródła, nie piksele ekranu).
(function(root){
 const width=1309,height=280,top=[219,326,433,540,647,758,864,971,1076,1188,1305],bottom=[169,276,383,490,597,708,814,921,1026,1138,1255];
 function panel(index){if(!Number.isInteger(index)||index<0||index>=10)throw new RangeError('Nieznany panel');const points=[[top[index],0],[top[index+1],0],[bottom[index+1],height],[bottom[index],height]];return {points:points.map(p=>p.join(',')).join(' '),clip:'polygon('+points.map(([x,y])=>`${x/width*100}% ${y/height*100}%`).join(',')+')'}}
 const api={width,height,panel};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AtlasStripGeometry=api;
})(typeof globalThis!=='undefined'?globalThis:this);
