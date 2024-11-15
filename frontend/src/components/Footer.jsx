const Footer = () =>{
    const date = new Date().getFullYear();
    return(
        <footer>
            <div className="footer-content">
                <p>&copy; {date} GEOS.  All rights reserved. </p>
            </div>
        </footer>
    )
}

export default Footer;