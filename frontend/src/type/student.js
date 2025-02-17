import {format} from "date-fns"
import Levels from "../type/levels";

class Student{
    constructor()
    {
        this.id = 123
        this.dateCreated = new Date();
        this.name = "";
        this.course = "";
        this.textbook = ""
        this.attendance = 0;
        this.totalLessons = 0;
        this.feedback= "";
        this.levels = {
            "vocabulary": new Levels(),
            "pronunciation": new Levels(),
            "grammar": new Levels(),
            "listening": new Levels(),
            "conversation": new Levels()
        }
    }

}

export default Student;