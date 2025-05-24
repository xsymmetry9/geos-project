import {Student} from "./Student";
class User {
    name: string;
    language: string;
    SPR:Student[];
    levelCheck:[];
  constructor(name ="Guest", language = "english") {
    this.name = name;
    this.language = language;
    this.SPR = [];
    this.levelCheck = [];
  }
}

export default User;
