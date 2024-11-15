const Header = ({language}) =>{
    const title = 
    {
        "english": ["English", "Chinese", "Korean", "Japanese"],
        "chinese": ["英語", "中文", "韓語", "日語"],
        "korean": ["영어", "중국어", "한국어", "일본어"],
        "japanese": ["えいご", "ちゅうごくご", "かんこくご", "にほんご"]
    }
    

    return(
        <>
            <header>
                <h1>GEOS</h1>
                <nav>
                    <ul>
                        <li><a href="/">{title[language.toLowerCase()][0]}</a></li>
                        <li><a href="/ch">{title[language.toLowerCase()][1]}</a></li>
                        <li><a href="/kor">{title[language.toLowerCase()][2]}</a></li>
                        <li><a href="/jp">{title[language.toLowerCase()][3]}</a></li>
                    </ul>
                </nav>

            </header>
        </>
    )
}

export default Header;