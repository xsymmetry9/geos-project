import "../styles/components/footer.scss";

const Footer = () =>{
    const date = new Date().getFullYear();
    return(
        <footer>
            <div className='footer-container'>
                <p>&copy; GEOS Online Language Academy All Rights Reserved.</p>
                <p>Created by Gary - {date}</p>
            </div>
        </footer>
    )
}

export default Footer;