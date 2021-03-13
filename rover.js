class Rover {
    constructor(position){
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }
   receiveMessage(message){
     let results = [];
     for(let i=0;i<message.commands.length;i++){
       results.push(message.commands[i]);
     }
     for(let i=0;i<results.length;i++){
       if(results[i].commandType=='STATUS_CHECK'){
         results[i] = {completed: true, roverStatus: {mode: this.mode, generatorWatts : this.generatorWatts, position: this.position}}
       }
       else if(results[i].commandType=='MODE_CHANGE'){
         this.mode = results[i].value;
         results[i] = {completed: true};
       } else if(results[i].commandType=='MOVE'){
         if(this.mode=='LOW_POWER'){
           results[i] = {completed: false};
         } else {
           this.position = results[i].value;
           results[i] = {completed: true};
         }
       }
     }
  
  
      
    return {
      message: message.name,
      results: results
    };
   }
}

module.exports = Rover;