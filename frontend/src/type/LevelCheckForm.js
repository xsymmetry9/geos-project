import {v4 as uuidv4} from 'uuid';

class LevelCheck {
    constructor(id = uuidv4) {
      this.id = id;
      this.dateCreated = new Date();
      this.name = "";
      this.feedback = "";
      this.levels = {
        vocabulary: "",
        pronunciation: "",
        grammar: "",
        listening: "",
        conversation: "",
      };
    }
  }

  export default LevelCheck;
  