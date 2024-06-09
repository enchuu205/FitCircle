import './LandingPage.css'
import { useState } from 'react'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import SignupFormModal from '../SignupFormModal'

function LandingPage() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    const closeMenu = () => setShowMenu(false);

    return (
        <div id='landing-page-container'>
            <img id='lp-logo' src='https://res.cloudinary.com/dztk9g8ji/image/upload/v1717806130/Untitled_design_njfhcq.png' alt="FitCircle Logo" />
            <h1>FitCircle</h1>
            <div id='sub-heading'>Your Fitness Journey, Shared</div>
            <OpenModalMenuItem
                itemText="Start Now"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />} />
            <img src='https://img.freepik.com/free-photo/people-working-out-indoors-together-with-dumbbells_23-2149175410.jpg' alt='fit-circle landing page image' />

        </div>
    )
}

export default LandingPage
