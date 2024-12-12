const Button = ({page, handler}) =>{
    return(
        <div className="container" id="buttons">
            {page === 0 ? (
                <>
                    <input type="button" onClick={handler} name="next" value="next"/>
                </>) : page != 3 ? (
                    <>
                        <input type="button" onClick = {handler} name="back" value="back" />                 
                        <input type="button" onClick = {handler} name="next" value ="next"/>
                    </> 
                ) : (
                    <>
                        <input type="button" onClick={handler} name ="back" value="back" />
                        <input type="button" onClick={handler} name ="print" value="print" />
                    </>
                )
            }
        </div>
    )
}

export default Button;