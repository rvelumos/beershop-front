import React from 'react';
import LeftMenu from "../../Components/Website/UserProfile/LeftMenu/LeftMenu";

const UserProfilePage = () => {

    return (
        <>
            <div className="userContentContainer" >
                <LeftMenu />

                <div className="textContentContainer" >
                    <h1>Welkom op jouw profiel</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias blanditiis, commodi dolore ducimus est facere illo pariatur quas voluptatem voluptatibus.</p>
                </div>
            </div>
        </>
    )
}

export default UserProfilePage;