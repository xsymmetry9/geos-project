import {format} from "date-fns"

class Student{
    constructor(
        name,
        course,
        textbook, 
        attendance, 
        totalLessons,
        levels, //It's an object
        comment)
    {
        this.name = name;
        this.course = course;
        this.textbook = textbook;
        this.attendance = attendance;
        this.totalLessons = totalLessons;
        this.levels = levels;
        this.comment= comment;
        this.average = this.getAverage();
    }

    getPercentage = () =>{
        this.average = Math.round((this.attendance / this.totalLessons) * 100);
        return this.average;
    }

    getDate = () =>{
        return format(new Date(), "MM/dd/yyyy");
    }

    getTotal = (category) =>{
        let sum = 0;
        this.levels.forEach((item) =>{
            sum += item[category]
        })
        return sum;
    }
    getAverage =(category) =>{
        return this.getTotal(category) / this.levels.length;
    }


}

export default Student;