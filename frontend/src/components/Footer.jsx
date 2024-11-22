import "../styles/components/footer.scss";

const Footer = () =>{
    const date = new Date().getFullYear();
    return(
        <footer>
            <div className='footer-container'>
                <p>&copy; 2024 GEOS property</p>
                <p>Created by Gary</p>
            </div>
        </footer>
    )
}

export default Footer;