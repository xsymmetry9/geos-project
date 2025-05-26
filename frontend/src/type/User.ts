import { Student } from "./Student";

class User {
  name: string;
  language: string;
  SPR: Student[];
  levelCheck: any[]; // or replace `any` with a proper type if available

  constructor(name: string = "Guest", language: string = "english") {
    this.name = name;
    this.language = language;
    this.SPR = [];
    this.levelCheck = [];
  }
}

export default User;
