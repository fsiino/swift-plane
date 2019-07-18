import Level from './level'; 

export default class PaperPlane {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
  }

  // This will create a new instance of Level and store that as an instance variable.
  restart() {
    
  }

  // This method will call animate on Level class
  animate () {

  }
}