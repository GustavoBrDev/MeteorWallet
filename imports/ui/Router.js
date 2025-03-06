import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { NotFound } from "./NotFound";
import { Acess } from "./Acess";
import { RoutePaths } from "./RoutePaths";
import { ForgotPassword } from "./ForgotPassword";
import { ResetPassword } from "./ResetPassword";
import { LoggedUserOnly } from "./components/LoggedUserOnly";
import { AnomynousOnly } from "./components/AnomynousOnly";

export const Router = () => {
    return (
        <Routes>
            <Route path={RoutePaths.HOME} element={
                <LoggedUserOnly><Home /></LoggedUserOnly>
            } />
            <Route path={RoutePaths.ACESS} element={
            <AnomynousOnly><Acess /></AnomynousOnly>} />
            <Route path={RoutePaths.FORGOT_PASSWORD} element={
                <AnomynousOnly><ForgotPassword /></AnomynousOnly>
            } />
            <Route path={`${RoutePaths.RESET_PASSWORD}/:token`} element={
                <AnomynousOnly><ResetPassword /></AnomynousOnly>
            } />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};