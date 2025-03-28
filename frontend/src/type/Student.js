class Levels {
  constructor(initial = "", target = "", final = "") {
    this.initial = initial;
    this.target = target;
    this.final = final;
  }
}
class Student {
  constructor(id, dateCreated = new Date()) {
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
      listening: new Levels(),
    };
  }
}

export { Student, Levels };
