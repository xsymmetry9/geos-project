import { StudentProgressReportEntry } from "./StudentProgressReportEntry";
import { Language } from "@/utils/common";

class User {
  name: string;
  language: Language;
  SPR: StudentProgressReportEntry[];
  levelCheck: any[]; // or replace `any` with a proper type if available

  constructor(name: string = "Guest", language: Language = "english") {
    this.name = name;
    this.language = language;
    this.SPR = [];
    this.levelCheck = [];
  }
}

export default User;
