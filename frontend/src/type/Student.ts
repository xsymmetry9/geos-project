class Levels {
  initial: string;
  target: string;
  final: string;

  constructor(initial = "", target = "", final = "") {
    this.initial = initial;
    this.target = target;
    this.final = final;
  }
}

class Student {
  id: string;
  dateCreated: Date;
  name: string;
  course: string;
  textbook: string;
  attendance: string;
  totalLessons: string;
  feedback: string;
  levels: {
    vocabulary: Levels;
    pronunciation: Levels;
    grammar: Levels;
    conversation: Levels;
    listening: Levels;
  };

  constructor(id: string, dateCreated = new Date()) {
    this.id = id;
    this.dateCreated = dateCreated;
    this.name = "";
    this.course = "";
    this.textbook = "";
    this.attendance = "";
    this.totalLessons = "";
    this.feedback = "";
    this.levels = {
      vocabulary: new Levels(),
      pronunciation: new Levels(),
      grammar: new Levels(),
      conversation: new Levels(),
      listening: new Levels()
    };
  }
}

export { Student, Levels };