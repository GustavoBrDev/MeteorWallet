import React from "react";
import { useLoggedUser } from "meteor/quave:logged-user-react";
import { Loading } from "./Loading";
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePaths } from "../RoutePaths";

export const AnomynousOnly = ({ children }) => {
    
    const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
    const location = useLocation();

    if ( isLoadingLoggedUser ) {
        return <Loading/>
    }

    if ( loggedUser ) {
        return <Navigate to={RoutePaths.HOME} state={{ from: location }} replace/>
    }

    return children;
};