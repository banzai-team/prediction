import * as React from "react"
import { Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./LoginPage";
import SimpleLayout from "../components/SimpleLayout";
import MainLayout from "../components/MainLayout";
import CreatePage from './CreatePage';
import DashboardPage from './DashboardPage';
import ObjectPage from './ObjectPage';
import {useAuthContext} from '../context/AuthContext';

export enum ROUTES {
    LOGIN = "/login",
    DASHBOARD = "/",
    OBJECT = "/object/:id",
    CREATE = "/create",
};

const Router = () => {
    const {isAuth} = useAuthContext();

    return isAuth ? (
            <MainLayout>
                <Routes>
                    <Route path={ROUTES.DASHBOARD} element={<DashboardPage/>}/>
                    <Route path={ROUTES.CREATE} element={<CreatePage/>}/>
                    <Route path={ROUTES.OBJECT} element={<ObjectPage/>}/>
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </MainLayout>
        )
        : (
            <SimpleLayout>
                <Routes>
                    <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
                </Routes>
            </SimpleLayout>
        );
};

export default Router;
