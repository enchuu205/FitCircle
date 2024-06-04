import { NavLink } from "react-router-dom";
import './Footer.css'

function Footer() {
    return (
        <>
            <div>FitCircle</div>
            <div>Designed by Andrew Ly</div>
            <div className='icon' onClick={() => window.open('https://www.linkedin.com/in/andrew-ly204/')}>
                LinkedIn
            </div>
        </>
    )
}

export default Footer
