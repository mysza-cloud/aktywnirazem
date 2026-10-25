// Katalog aktywności — sauna i rekreacja nie są sportami w ścisłym znaczeniu.
const activityGroups={
 'Zespołowe':[['football','Piłka nożna'],['futsal','Futsal'],['basketball','Koszykówka'],['basketball3','Koszykówka 3×3'],['volleyball','Siatkówka'],['beachvolley','Siatkówka plażowa'],['handball','Piłka ręczna'],['floorball','Unihokej'],['rugby','Rugby'],['ultimate','Ultimate frisbee']],
 'Bieganie i teren':[['running','Bieganie'],['trailrunning','Biegi terenowe'],['walking','Nordic walking'],['hiking','Wędrówki i trekking'],['orienteering','Bieg na orientację'],['strolling','Spacery']],
 'Rowery i rolki':[['cycling','Rowery'],['roadcycling','Kolarstwo szosowe'],['mtb','MTB'],['gravel','Gravel'],['rollers','Rolki'],['skateboard','Deskorolka']],
 'Rakietowe':[['tennis','Tenis'],['tabletennis','Tenis stołowy'],['badminton','Badminton'],['squash','Squash'],['padel','Padel']],
 'Wodne':[['swimming','Basen'],['openwater','Pływanie na wodach otwartych'],['kayaking','Kajakarstwo'],['sup','SUP'],['rowing','Wioślarstwo'],['sailing','Żeglarstwo'],['windsurf','Windsurfing']],
 'Siła i sprawność':[['gym','Siłownia'],['functional','Trening funkcjonalny'],['calisthenics','Kalistenika'],['fitness','Fitness'],['yoga','Joga'],['pilates','Pilates'],['stretching','Stretching'],['dance','Taniec']],
 'Sporty walki':[['boxing','Boks'],['kickboxing','Kickboxing'],['judo','Judo'],['karate','Karate'],['bjj','Brazylijskie jiu-jitsu'],['wrestling','Zapasy']],
 'Zimowe':[['skiing','Narciarstwo'],['crosscountry','Biegi narciarskie'],['snowboard','Snowboard'],['iceskating','Łyżwy'],['hockey','Hokej']],
 'Celność i rekreacja':[['bowling','Kręgle'],['billiards','Bilard'],['darts','Dart'],['archery','Łucznictwo'],['petanque','Bule'],['golf','Golf'],['minigolf','Minigolf'],['climbing','Wspinaczka'],['bouldering','Bouldering'],['horseriding','Jeździectwo']],
 'Regeneracja':[['sauna','Sauna'],['winterbathing','Morsowanie']],
 'Pozostałe':[['other','Inna aktywność']]
};
const allDisciplines=Object.entries(activityGroups).flatMap(([group,items])=>items.map(([id,name])=>({id,name,group,symbol:({football:'⚽',basketball:'◉',volleyball:'◈',swimming:'≈',sauna:'♨',bowling:'●'})[id]||'↗'})));
const featuredDisciplineIds=['football','running','cycling','walking','basketball','volleyball','tennis','bowling','swimming','sauna'];
function suggestedCategory(id){if(id==='other')return null;if(['sauna','winterbathing'].includes(id))return 'Spotkania i integracja';if(['walking','hiking','strolling','cycling','kayaking','sailing'].includes(id))return 'Turystyka';return allDisciplines.some(d=>d.id===id)?'Sport':null}
if(typeof module!=='undefined'&&module.exports)module.exports={allDisciplines,featuredDisciplineIds,activityGroups,suggestedCategory};
