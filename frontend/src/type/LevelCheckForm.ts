import {v4 as uuidv4} from 'uuid';

type LanguageAspects = {
  fluency: string;
  confidence: string;
  pronunciation: string;
  complete_sentence: string;
  varied_vocabulary: string,
  errors_in_form: string,
  colloquial_expressions: string,
  listening: string
}
class LevelCheck {
  id: string;
  dateCreated: Date;
  name: string;
  feedback: string;
  language_proficiency_level: string;
  textbook: string;
  language_aspects: LanguageAspects;
  constructor(id: string = uuidv4(), dateCreated = new Date()) {
    this.id = id;
    this.dateCreated = dateCreated;
    this.name = "name";
    this.feedback = "";
    this.language_proficiency_level = "";
    this.textbook = "";
    this.language_aspects = {
      fluency: "",
      confidence: "",
      pronunciation: "",
      complete_sentence: "",
      varied_vocabulary: "",
      errors_in_form: "",
      colloquial_expressions: "",
      listening: ""
    }
  };
}
  

  export default LevelCheck;
  