// import { NavLink } from "react-router-dom";
import './Footer.css'

function Footer() {
    return (
        <div className='footer-container'>
            <hr></hr>
            <div className='footer-flexbox'>
                <img className='footer-profile-img' src='Andrew_Profile_Picture.jpg' />
                <div>
                    <div className='footer-title'>FitCircle</div>
                    <div>Designed by Andrew Ly</div>
                    <span className='icon' onClick={() => window.open('https://www.linkedin.com/in/andrew-ly204/')}>
                        <img src="linkedin_logo_icon.png" class="link-img" alt="linked-in"></img>
                    </span>
                    <span className='icon' onClick={() => window.open('https://github.com/enchuu205')}>
                        <img src="211904_social_github_icon.png" class="link-img" alt="github"></img>
                    </span>
                </div>
            </div>

        </div>
    )
}

export default Footer
