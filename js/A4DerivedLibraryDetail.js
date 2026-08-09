const A4_MOBILE_DATA={
  'squat-chair':{folder:'squat',title:'Squat vers chaise',category:'Renforcement',meta:'Jambes · Fessiers',details:'Débutant · Chaise',poster:'assets/posters/v2/squat-vers-chaise-a4-v2.webp'},
  'one-arm-row':{folder:'one-arm-row',title:'Tirage un bras avec appui',category:'Renforcement',meta:'Dos · Bras · Posture',details:'Débutant · Chaise · Haltère',poster:'assets/posters/v2/tirage-un-bras-appui-a4-v2.webp'}
};

function canonicalA4MovementId(id){return({squat:'squat-chair',row:'one-arm-row','tirage-1-bras':'one-arm-row','tirage-un-bras':'one-arm-row'})[id]||id;}
function isA4DerivedMovement(id){return Boolean(A4_MOBILE_DATA[canonicalA4MovementId(id)]);}
function a4RegionPath(data,name){return`assets/library-a4/v2/${data.folder}/${name}.webp`;}

function renderA4DerivedLibraryDetail(movementId,source='library'){
  const id=canonicalA4MovementId(movementId),data=A4_MOBILE_DATA[id],root=document.getElementById('libraryRoot');
  if(!data)return false;
  librarySource=source;document.querySelector('.app').hidden=true;root.hidden=false;document.body.classList.add('library-mode','a4-mobile-mode');document.title=`${data.title} — PHOENIX`;
  const regions=['objective','comment-faire','cadence','volume','a-eviter','sequence'];
  root.innerHTML=`<article class="a4m-page"><header class="a4m-app-header"><button class="a4m-back" onclick="closeExerciseLibrary()">← Retour</button><div class="a4m-brand">PHOENIX</div></header><div class="a4m-marker">LIBRARY A4 MOBILE · V0.456</div><section class="a4m-identity"><div class="a4m-category">${data.category}</div><h1>${data.title}</h1><p>${data.meta}<br>${data.details}</p></section><div class="a4m-rule"></div><button class="a4m-hero" onclick="openA4MobileFullscreen('${a4RegionPath(data,'hero-grey')}','${data.title}')"><img src="${a4RegionPath(data,'hero-grey')}" alt="Illustration pédagogique A4 V2 sur fond gris — ${data.title}"><span>Toucher pour examiner en plein écran</span></button><div class="a4m-regions">${regions.map(name=>`<section class="a4m-region a4m-${name}"><img src="${a4RegionPath(data,name)}" alt="${name} — ${data.title}"></section>`).join('')}</div><button class="a4m-poster" onclick="openPoster('${data.poster}')">VOIR LA FICHE A4</button></article>`;
  window.scrollTo(0,0);return true;
}

function openA4MobileFullscreen(src,label){
  let viewer=document.getElementById('a4MobileFull');
  if(!viewer){viewer=document.createElement('div');viewer.id='a4MobileFull';viewer.className='a4m-fullscreen';viewer.innerHTML='<button class="a4m-close" onclick="closeA4MobileFullscreen()">Fermer</button><img>';document.body.appendChild(viewer);}
  viewer.querySelector('img').src=src;viewer.querySelector('img').alt=label;viewer.hidden=false;viewer.scrollTop=0;viewer.dataset.scrollY=String(window.scrollY);document.body.classList.add('a4m-fullscreen-open');
}
function closeA4MobileFullscreen(){const viewer=document.getElementById('a4MobileFull');if(!viewer||viewer.hidden)return;const y=Number(viewer.dataset.scrollY||0);viewer.hidden=true;document.body.classList.remove('a4m-fullscreen-open');window.scrollTo(0,y);}
