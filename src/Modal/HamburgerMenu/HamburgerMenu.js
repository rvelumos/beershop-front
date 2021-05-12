import React,{useState} from 'react';
import './HamburgerMenu.css';
import TopNavigationMenuItem
    from "../../Components/Website/Navigation/TopNavigation/TopNavigationItems/TopNavigationMenuItem/TopNavigationMenuItem";

function HamburgerMenu() {
    const [openHamburgerModal, setOpenHamburgerModal] = useState(false);

    const toggleHamburgerModal = () => {
        setOpenHamburgerModal(!openHamburgerModal);
    }

    let className;
    if(openHamburgerModal)
        className = "open";
    else
        className = "closed";

    return (
        <>
            <div className="hamburgerMenuContainer" onClick={(e) => toggleHamburgerModal()}>
                <div id="hamburgerMenu" className={className}>
                    <div className="line"></div>
                </div>
            </div>

        {openHamburgerModal &&
        <div className="hamburgerModal">
            <div className="modalContainer">
                <div className="hamburgerMenuItems">
                    <h1>Navigatie</h1>
                    <TopNavigationMenuItem url="/alle-bieren" name="bieren" handler={toggleHamburgerModal} />
                    <TopNavigationMenuItem url="/pakketten" name="pakketten" handler={toggleHamburgerModal} />
                    <TopNavigationMenuItem url="/cadeaubonnen" name="cadeaubon" handler={toggleHamburgerModal} />
                    <TopNavigationMenuItem url="/aanbiedingen" name="aanbiedingen" handler={toggleHamburgerModal} />
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default HamburgerMenu;