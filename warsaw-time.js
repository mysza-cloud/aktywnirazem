(function(root){
 const formatter=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Warsaw',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
 function timestamp(parts){const date=new Date(0);date.setUTCFullYear(parts.year,parts.month-1,parts.day);date.setUTCHours(parts.hour,parts.minute,parts.second||0,0);return date.getTime()}
 function partsAt(time){const parts={};for(const part of formatter.formatToParts(new Date(time)))if(part.type!=='literal')parts[part.type]=Number(part.value);return parts}
 function resolveWarsawTime(value){
  const match=typeof value==='string'&&/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if(!match)return {status:'invalid',reason:'invalid-date',choices:[]};
  const [year,month,day,hour,minute]=match.slice(1).map(Number),requested={year,month,day,hour,minute,second:0},base=timestamp(requested),date=new Date(base);
  if(!Number.isFinite(base)||year<1||date.getUTCFullYear()!==year||date.getUTCMonth()+1!==month||date.getUTCDate()!==day||date.getUTCHours()!==hour||date.getUTCMinutes()!==minute)return {status:'invalid',reason:'invalid-date',choices:[]};
  // Odczytujemy rzeczywiste przesunięcia z reguł strefy po obu stronach daty.
  const offsets=new Set();for(let hours=-36;hours<=36;hours+=6){const sample=base+hours*3600000;offsets.add(timestamp(partsAt(sample))-sample)}
  const choices=[...offsets].map(offset=>base-offset).filter(time=>{const actual=partsAt(time);return Object.keys(requested).every(key=>actual[key]===requested[key])}).sort((a,b)=>a-b).map(time=>new Date(time).toISOString());
  if(!choices.length)return {status:'invalid',reason:'nonexistent-time',choices};
  if(choices.length>1)return {status:'ambiguous',choices};
  return {status:'valid',utc:choices[0],choices};
 }
 const api=Object.freeze({resolveWarsawTime});if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AtlasTime=api;
})(typeof globalThis!=='undefined'?globalThis:this);
