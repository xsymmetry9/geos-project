class Levels {
    constructor(initial= 0, target = 0, final = 0){
        this.initial = initial;
        this.target = target;
        this.final = final;
    }
}
class Student{
    constructor(id)
    {
        this.id = id;
        this.dateCreated = new Date();
        this.name = "";
        this.course = "";
        this.textbook = ""
        this.attendance = 0;
        this.totalLessons = 0;
        this.feedback= "";
        this.levels = {
            vocabulary: new Levels(),
            pronunciation: new Levels(),
            grammar: new Levels(),
            listening: new Levels(),
            conversation: new Levels()
        }
    }

}

export {Student, Levels};