import "../../../styles/components/preview.scss";

const Preview = ({inputData, language}) =>{
    const {name,
        textbook,
        course,
        attendance,
        totalLessons, 
        levels,
        feedback
    } = inputData;

    const titles = {
        english: ["vocabulary", "grammar", "pronunciation", "listening", "conversation"],
        chinese: ["詞彙", "文法", "發音", "聽力", "會話"],
        korean: ["어휘", "문법", "발음", "듣기", "대화"],
        japanese: ["語彙", "文法", "発音", "聴解", "会話"]
    }
    const titleLanguage = {
        english: ["Initial", "Target", "Final"],
        chinese: ["初始", "目標", "結束"],
        korean: ["초기", "목표", "결과"],
        japanese: ["初期", "目標", "終了"]
    }
    return(
        <div className="preview-section">
            <div className="preview-container">
                <h2>Class Information</h2>
                <p><strong>Name:</strong> {name.length != 0 ? name : "No name"}</p>
                <p className="uppercase"><strong>textbook:</strong> {textbook.length != 0 ? textbook : "No textbook"}</p>
                <p className="uppercase"><strong>course:</strong> {course.length != 0 ? course : "No course name"}</p>
                <p className="uppercase"><strong>attendance:</strong> {attendance != 0 ? attendance : "No attendance"}</p>
                <p className="uppercase"><strong>total lessons:</strong> {totalLessons != 0 ? totalLessons : "No total lessons"}</p>
            </div>
            <div className="preview-container">
                <h2>Student Evaluation</h2>
                <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>{titleLanguage[language][0]}</th>
                        <th>{titleLanguage[language][1]}</th>
                        <th>{titleLanguage[language][2]}</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(levels).map((item) => {
                    return(
                        <tr key={item}>
                            <td>{item.toUpperCase()}</td>
                            <td>{levels[item].initial}</td>
                            <td>{levels[item].target}</td>
                            <td>{levels[item].final}</td>
                        </tr>
                    )
            })}
                </tbody>
                </table>
            </div>
            <div className="preview-container">
                <h2>Feedback</h2>            
                <p>{feedback.length != 0 ? feedback : "No comment"}</p>
            </div>
        </div>
    )
}

export default Preview;