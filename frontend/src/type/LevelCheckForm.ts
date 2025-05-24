import {v4 as uuidv4} from 'uuid';

class LevelCheck {
    id: string;
    dateCreated: Date;
    name: string;
    feedback: string;
    language_proficiency_level: string;
    textbook: string;
    constructor(id = uuidv4(), dateCreated = new Date()) {
      this.id = id;
      this.dateCreated = dateCreated;
      this.name = "";
      this.feedback = "";
      this.language_proficiency_level = "";
      this.textbook = "";

    }
  }

  export default LevelCheck;
  