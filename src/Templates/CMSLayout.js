import React from "react";

import '../Admin.css';

import LeftMenu from "../Components/Cms/Navigation/LeftMenu/LeftMenu";
import CmsRouting from "./Routing/CmsRouting";

const CMSLayout = (props) => {
    const { authorityAdmin, token } = props;

    return(
        <>
            <main className="cms">
                <LeftMenu isAdmin={authorityAdmin} />
                <CmsRouting
                    isAdmin={authorityAdmin}
                    token={token}
                />
            </main>
        </>
    )
}

export default CMSLayout;