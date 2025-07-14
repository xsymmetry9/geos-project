import {v4 as uuidv4} from 'uuid';

class StrengthAndWeakness {
  level_name: string;
  strength: string;
  weakness: string;

  constructor(level_name = "", strength = "", weakness =""){
    this.level_name = level_name;
    this.strength = strength;
    this.weakness =  weakness;
  }
}

class LevelCheckEntry {
    id: string;
    dateCreated: Date;
    student_name: string;
    teacher_name: string;
    feedback: string;
    speaking: StrengthAndWeakness;
    confidence: StrengthAndWeakness;
    grammar: StrengthAndWeakness;
    vocabulary: StrengthAndWeakness;
    listening: StrengthAndWeakness;
    pronunciation: StrengthAndWeakness;

    constructor(id = uuidv4(), dateCreated = new Date()) {
      this.id = id;
      this.dateCreated = dateCreated;
      this.student_name = "";
      this.teacher_name = "";
      this.feedback = "";
      this.speaking = new StrengthAndWeakness();
      this.confidence = new StrengthAndWeakness();
      this.grammar = new StrengthAndWeakness();
      this.vocabulary = new StrengthAndWeakness();
      this.listening = new StrengthAndWeakness();
      this. pronunciation = new StrengthAndWeakness();

    }
  }

  export {LevelCheckEntry, StrengthAndWeakness};
  

