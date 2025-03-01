import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { NotFound } from "./NotFound";
import { Acess } from "./Acess";
import { RoutePaths } from "./RoutePaths";
import { ForgotPassword } from "./ForgotPassword";
import { ResetPassword } from "./ResetPassword";

export const Router = () => {
    return (
        <Routes>
            <Route path={RoutePaths.HOME} element={<Home />} />
            <Route path={RoutePaths.ACESS} element={<Acess />} />
            <Route path={RoutePaths.FORGOT_PASSWORD} element={<ForgotPassword/>} />
            <Route path={`${RoutePaths.RESET_PASSWORD}/:token`} element={<ResetPassword/>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};