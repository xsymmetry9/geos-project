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

class StudentProgressReportEntry {
  formId: string;
  studentId: string;
  teacherEmail: string;
  dateCreated: Date;
  name: string;
  language: string;
  course: string;
  textbook: string;
  attendance: number;
  totalLessons: number;
  feedback: string;
  levels: {
    vocabulary: Levels;
    pronunciation: Levels;
    grammar: Levels;
    conversation: Levels;
    listening: Levels;
  };

  constructor() {
    this.formId= "";
    this.dateCreated = new Date();
    this.name = "";
    this.teacherEmail = "";
    this.studentId = "";
    this.course = "";
    this.language = "";
    this.textbook = "";
    this.attendance = 0;
    this.totalLessons = 0;
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

class StudentProgressReportBackend {
  id: string;
  
  constructor() {
    this.id=""
  }
}

export { StudentProgressReportEntry, Levels, StudentProgressReportBackend };
