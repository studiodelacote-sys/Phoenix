function canonicalPilotMovementId(id){return({squat:'squat-chair',row:'one-arm-row','tirage-1-bras':'one-arm-row','tirage-un-bras':'one-arm-row'})[id]||id;}
function isA4DerivedMovement(id){return isPilotMovement(canonicalPilotMovementId(id));}
function movementMeta(movement){return`${movement.muscleGroups.join(' · ')}<br>${movement.level} · ${movement.equipment.join(' · ')}`;}
function cadenceRows(movement){return movement.cadence.map(phase=>`<li><strong>${phase.duration} s</strong><span>${phase.action}</span></li>`).join('');}
function numberedRows(items){return items.map((item,index)=>`<li><span>${index+1}</span><p>${item}</p></li>`).join('');}

function renderA4DerivedLibraryDetail(movementId,source='library'){
  const id=canonicalPilotMovementId(movementId),movement=getMovement(id),root=document.getElementById('libraryRoot');
  if(!movement)return false;
  librarySource=source;document.querySelector('.app').hidden=true;root.hidden=false;document.body.classList.add('library-mode','a4-mobile-mode');document.title=`${movement.name} — PHOENIX`;
  root.innerHTML=`<article class="a4m-page"><header class="a4m-app-header"><button class="a4m-back" onclick="closeExerciseLibrary()">← Retour</button><div class="a4m-brand">PHOENIX</div></header><div class="a4m-marker">MOVEMENT MODEL · V0.458</div><section class="a4m-identity"><div class="a4m-category">${movement.category}</div><h1>${movement.name}</h1><p>${movementMeta(movement)}</p></section><div class="a4m-rule"></div><button class="a4m-hero" onclick="openA4MobileFullscreen('${movement.assets.hero}','${movement.name}')"><img src="${movement.assets.hero}" alt="Illustration pédagogique sur fond gris — ${movement.name}"><span>Toucher pour examiner en plein écran</span></button><div class="a4m-data-sections"><section class="a4m-data-panel"><h2><span>◎</span> Objectif</h2><p>${movement.objective}</p></section><section class="a4m-data-panel a4m-instructions"><h2><span>▣</span> Comment faire</h2><ol>${numberedRows(movement.instructions)}</ol></section><section class="a4m-data-panel a4m-cadence-data"><h2><span class="phoenix-metronome"><i></i></span> Cadence</h2><ul>${cadenceRows(movement)}</ul></section><section class="a4m-data-panel"><h2><span>◷</span> Départ</h2><p>${movement.volume}</p></section><section class="a4m-data-panel a4m-avoid-data"><h2><span>!</span> À éviter</h2><ul>${movement.avoid.map(item=>`<li>${item}</li>`).join('')}</ul></section><section class="a4m-sequence-data"><img src="${movement.assets.sequence}" alt="Séquence — ${movement.name}"></section></div><button class="a4m-poster" onclick="openPhoenixA4Poster('${movement.id}')">VOIR LA FICHE A4</button></article>`;
  window.scrollTo(0,0);return true;
}

function openA4MobileFullscreen(src,label){
  let viewer=document.getElementById('a4MobileFull');
  if(!viewer){viewer=document.createElement('div');viewer.id='a4MobileFull';viewer.className='a4m-fullscreen';viewer.innerHTML='<button class="a4m-close" onclick="closeA4MobileFullscreen()">Fermer</button><img>';document.body.appendChild(viewer);}
  viewer.querySelector('img').src=src;viewer.querySelector('img').alt=label;viewer.hidden=false;viewer.scrollTop=0;viewer.dataset.scrollY=String(window.scrollY);document.body.classList.add('a4m-fullscreen-open');
}
function closeA4MobileFullscreen(){const viewer=document.getElementById('a4MobileFull');if(!viewer||viewer.hidden)return;const y=Number(viewer.dataset.scrollY||0);viewer.hidden=true;document.body.classList.remove('a4m-fullscreen-open');window.scrollTo(0,y);}
