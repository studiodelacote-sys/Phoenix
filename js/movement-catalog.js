const MOVEMENT_DATA_URLS=[
  './data/movements/squat-chair.json',
  './data/movements/one-arm-row.json'
];
const movementCatalogue=new Map();
const movementCatalogueReady=Promise.all(MOVEMENT_DATA_URLS.map(async url=>{
  const response=await fetch(url);
  if(!response.ok)throw new Error(`Movement data unavailable: ${url}`);
  const movement=await response.json();
  movementCatalogue.set(movement.id,Object.freeze(movement));
  return movement;
}));
function getMovement(movementId){return movementCatalogue.get(movementId)||null;}
function isPilotMovement(movementId){return movementCatalogue.has(movementId);}
