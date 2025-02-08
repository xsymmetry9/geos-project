const Preview = ({data, language}) =>{
    const {name,
        textbook,
        course,
        attendance,
        totalLessons, 
        levels,
        comment
    } = data;

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
        <>
            <h1>{name}</h1>
            <p className="uppercase">textbook: {textbook}</p>
            <p className="uppercase">course: {course}</p>
            <p className="uppercase">attendance: {attendance}</p>
            <p className="uppercase">total lessons: {totalLessons}</p>
            <br />
            {levels.map((item, index) => {
                return(
                    <div key={index}>
                        <h3 className="uppercase">{titles[language][index]}</h3>
                        <p className="uppercase">{titleLanguage[language][0]}: {item.initial}</p>
                        <p className="uppercase" >{titleLanguage[language][1]} {item.target}</p>
                        <p className="uppercase">{titleLanguage[language][2]} {item.final}</p>
                    </div>
                )
            })}
            <br />
            <p>{comment}</p>
        </>
    )
}

export default Preview;