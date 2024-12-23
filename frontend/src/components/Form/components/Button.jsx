import { Link } from "react-router-dom";
const Button = ({page, handler, language}) =>{
    const title = {
        "english": {next_page: "Next", back_page: "Back", print_page: "Print"},
        "chinese": {next_page: "下一個", back_page: "上一個", print_page: "列印"},
        "korean": {next_page: "다음", back_page: "이전", print_page: "인쇄"},
        "japanese": {next_page: "次へ", back_page: "前へ", print_page: "印刷"},
    }

    console.log(title[language.toLowerCase()].next_page);
    return(
        <div className="container" id="buttons">
            {page === 0 ? (
                <>
                    <input className="btn-primary" type="button" onClick={handler} name="next" value={title[language.toLowerCase()].next_page}/>
                </>) : page != 3 ? (
                    <>
                        <input className="btn-primary" type="button" onClick = {handler} name="back" value={title[language.toLowerCase()].back_page} />                 
                        <input className="btn-primary" type="button" onClick = {handler} name="next" value ={title[language.toLowerCase()].next_page}/>
                    </> 
                ) : (
                    <>
                        <input className="btn-primary" type="button" onClick={handler} name ="back" value={title[language.toLowerCase()].back_page} />
                        <Link to={`/spr/${language.toLowerCase()}/preview`}>Preview</Link>
                    </>
                )
            }
        </div>
    )
}

export default Button;