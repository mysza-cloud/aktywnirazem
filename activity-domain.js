(function(root){
 const normalizeSearch=value=>String(value??'').toLocaleLowerCase('pl').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/g,'l').trim();
 function suggestedEventDate(now=new Date()){const date=new Date(now);if(!Number.isFinite(date.getTime()))return '';date.setDate(date.getDate()+7);date.setHours(18,0,0,0);return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}T18:00`}
 const eventTextLimits=Object.freeze({title:100,place:240,description:5000,rules:3000,cost:500});
 function validateEventDraft(input,{currentConfirmed=0,knownDisciplines=[]}={}){
  const errors={};const text=(name,label)=>{if(!String(input[name]??'').trim())errors[name]=`${label}: wpisz treść, nie same spacje.`};
  text('title','Nazwa');text('place','Miejsce zbiórki');text('description','Opis');text('rules','Zasady');text('cost','Koszty');
  for(const [field,limit] of Object.entries(eventTextLimits))if(String(input[field]??'').trim().length>limit)errors[field]=`${({title:'Nazwa',place:'Miejsce zbiórki',description:'Opis',rules:'Zasady',cost:'Koszty'})[field]}: maksymalnie ${limit} znaków.`;
  const capacity=Number(input.capacity);if(!Number.isInteger(capacity)||capacity<1||capacity>1000)errors.capacity='Limit: podaj liczbę całkowitą od 1 do 1000.';else if(capacity<currentConfirmed)errors.capacity='Limit nie może być mniejszy od liczby potwierdzonych osób.';
  const dateMatch=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(input.date||'');
  const parsed=dateMatch?new Date(input.date):null;
  if(!parsed||!Number.isFinite(parsed.getTime())||[parsed.getFullYear(),parsed.getMonth()+1,parsed.getDate(),parsed.getHours(),parsed.getMinutes()].some((part,i)=>part!==Number(dateMatch[i+1])))errors.date='Termin: podaj poprawną datę i godzinę.';
  if(!knownDisciplines.includes(input.discipline))errors.discipline='Wybierz aktywność z katalogu.';
  if(!['public','private','invitation'].includes(input.visibility))errors.visibility='Wybierz poprawną widoczność.';
  return errors;
 }
 const api=Object.freeze({normalizeSearch,validateEventDraft,eventTextLimits,suggestedEventDate});if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AtlasDomain=api;
})(typeof globalThis!=='undefined'?globalThis:this);
