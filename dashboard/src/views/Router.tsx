import * as React from "react"
import { Route, Routes, useLocation } from "react-router-dom";

import SimpleLayout from "../components/SimpleLayout";
import MainLayout from "../components/MainLayout";

export enum ROUTES {
    LOGIN = "/login",
    DASHBOARD = "/",
};

const Router = () => {
    const location = useLocation();

    // Not authorized user
    if (location.pathname === ROUTES.LOGIN) {
        return (
            <SimpleLayout>
                <Routes>
                    <Route path={ROUTES.LOGIN} element={<div>LOGIN PAGE</div>}/>
                </Routes>
            </SimpleLayout>
        )
    }

    // Only for authorized user
    return (
        <MainLayout>
            <Routes>
                <Route path={ROUTES.DASHBOARD} element={<div>DASHBOARD PAGE</div>}/>
            </Routes>
        </MainLayout>
    );
}

export default Router;
