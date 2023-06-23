import React from 'react';
import {useParams} from "react-router-dom";

import PageTitle from "../components/PageTitle";
import BackButton from "../components/BackButton";
import {ROUTES} from "./Router";

const ObjectPage: React.FC = () => {
    const { id } = useParams();

    return (
        <>
            <PageTitle>
                Object #{id}
            </PageTitle>
            <BackButton backRoute={ROUTES.DASHBOARD}>Back to dashboard</BackButton>
        </>
    )
};

export default ObjectPage;