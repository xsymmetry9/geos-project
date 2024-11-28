import React from 'react';
import textbooks from "../../../resource/textbooks.json";

const Index = ({props, handleData}) =>{
    return(
        <>
            <h2 className="form-title">Personal Information</h2>
            <div className='personal-information-input'>
                <label htmlFor="name">
                    <div className='input-wrapper'>
                        <p className="input-title">Name</p>
                        <input type="text" name="name" value={props.name} onChange={handleData} placeholder="Student's name"/>
                    </div>
                </label>
                <label htmlFor="course">
                    <div className="input-wrapper">
                        <p className="input-title">Course</p>
                        <select className="spacing-sm" id="course" name="course" value={props.course} onChange={handleData}>
                            <option value="">Select course</option>
                            <option value="ONLINE">ONLINE</option>
                            <option value="PL">PL</option>
                            <option value="GL">GL</option>
                            <option value="SGL">SGL</option>
                            <option value="FLEX">FLEX</option>
                        </select>
                    </div>
                    
                </label>
                <label htmlFor= "textbook">
                    <div className="input-wrapper">
                        <p className="input-title">Textbook</p>
                        <select className="spacing-sm" name="textbook" id="textbook" value={props.textbook} onChange={handleData}>
                            <option value="DEFAULT">Textbook name</option>
                            {textbooks.English.map((item, index) => <option key={index} value={item}>{item}</option>)}
                        </select>
                    </div>
                </label>
                <label htmlFor= "attendance">
                    <div className="input-wrapper">
                        <p className="input-title">Attendance</p>
                        <input className="spacing-sm" type="number" name="attendance" id="attendance" value={props.attendance} onChange={handleData}/>
                    </div>
                </label>                             
                <label htmlFor="totalLessons">
                    <div className='input-wrapper'>
                        <p className="input-title">Total Lessons</p>
                        <input className="spacing-sm" type="number" name="totalLessons" id="total-lesson" value={props.totalLessons} onChange={handleData}/>
                    </div>  
                </label>
            </div>
        </>
    )
}

export default Index;