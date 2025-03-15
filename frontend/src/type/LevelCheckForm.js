import {v4 as uuidv4} from 'uuid';

class LevelCheck {
    constructor(id = uuidv4, dateCreated = new Date()) {
      this.id = id;
      this.dateCreated = dateCreated
      this.name = "";
      this.feedback = "",
      this.language_proficiency_level = "",
      this.textbook = "",
      this.language_aspects = {
        fluency: "",
        confidence: "",
        pronunciation: "",
        complete_sentence: "",
        varied_vocabulary: "",
        errors_in_form: "",
        colloquial_expressions: "",
        listening: ""
      };
    }
  }

  export default LevelCheck;
  