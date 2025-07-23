import {v4 as uuidv4} from 'uuid';

class StrengthAndWeakness {
  score: number;
  level_name: string;
  strength: string[];
  weakness: string[];

  constructor(level_name = "",score: number, strength: string[] = [], weakness: string[] = []){
    this.level_name = level_name;
    this.score = score;
    this.strength = strength;
    this.weakness =  weakness;
  }
}

class LevelCheckEntry {
    id: string;
    dateCreated: string;
    student_name: string;
    feedback: string;
    speaking: StrengthAndWeakness;
    confidence: StrengthAndWeakness;
    grammar: StrengthAndWeakness;
    vocabulary: StrengthAndWeakness;
    listening: StrengthAndWeakness;
    pronunciation: StrengthAndWeakness;

    constructor(id = uuidv4()) {
      this.id = id;
      this.dateCreated = "";
      this.student_name = "";
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
  

