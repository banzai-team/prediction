import * as React from "react"
import { Route, Routes, useLocation } from "react-router-dom";

import LoginPage from "./LoginPage";
import SimpleLayout from "../components/SimpleLayout";
import MainLayout from "../components/MainLayout";
import DashboardPage from './DashboardPage';
import ObjectPage from './ObjectPage';

export enum ROUTES {
    LOGIN = "/login",
    DASHBOARD = "/",
    OBJECT = "/object/:id",
};

const Router = () => {
    const location = useLocation();

    // TODO: check autorization

    // Not authorized user
    if (location.pathname === ROUTES.LOGIN) {
        return (
            <SimpleLayout>
                <Routes>
                    <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
                </Routes>
            </SimpleLayout>
        )
    }

    // Only for authorized user
    return (
        <MainLayout>
            <Routes>
                <Route path={ROUTES.DASHBOARD} element={<DashboardPage/>}/>
                <Route path={ROUTES.OBJECT} element={<ObjectPage/>}/>
            </Routes>
        </MainLayout>
    );
}

export default Router;
