import React from 'react'
import './footer.css';
import footerLogo from '../../images/Footer-Logo.png';
class Footer extends React.Component {

render(){
    return (<footer className="footerSection">
        <div className="container">
        <div className="footer-logo">
            <img src={footerLogo} className="footer-logo-image"/>
        </div>
        <div className="footer-text">
            This is a section created by students for students<br></br>
            Our goal is to share remote learning resources for people to grain <br></br>
            hard skills in order to thrive in the digital and creative industry
        </div>
        </div>

    </footer>)
}
}

export default Footer;