function hydratePilotMovementsForRitual(){
  for(const movement of movementCatalogue.values()){
    const imageKey=movement.ritual.imageKey;
    const media=exerciseMedia[imageKey];
    if(!media)continue;
    Object.assign(media,{
      id:movement.id,
      libraryTitle:movement.name,
      category:movement.category,
      muscleGroups:movement.muscleGroups,
      equipment:movement.equipment,
      level:movement.level,
      objective:movement.objective,
      volume:movement.volume,
      sequence:movement.sequence,
      libraryCadence:movement.cadence.map(phase=>`${phase.duration} s — ${phase.action}`),
      technique:movement.instructions,
      avoid:movement.avoid,
      alternateViews:movement.assets.alternateView?[movement.assets.alternateViewLabel]:[],
      ritualImage:movement.assets.ritualImage,
      fullscreenImage:movement.assets.fullscreenImage,
      libraryPoster:movement.assets.posterFallback
    });
  }
  steps.filter(step=>step.kind==='exercise'&&isPilotMovement(step.movementId)).forEach(step=>{
    const movement=getMovement(step.movementId);
    step.title=movement.ritual.sideTitles?.[step.side]||movement.ritual.title||movement.name;
    step.cue=movement.ritual.cues?.[step.side]||movement.ritual.cue;
    step.phases=movement.cadence.map(phase=>[phase.action,phase.duration]);
  });
}
