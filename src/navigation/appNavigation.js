import React, { useState, useEffect } from 'react';
import { useAppBaseContext, UserType } from '../context/AppBaseContext'
import AuthNavigation from './authNavigation';
import ProfileNavigation from './profileNavigation';

function AppNavigation() {

    const { state } = useAppBaseContext();
    const { userType } = state
    const [currnetUserType, setUserType] = useState(userType);


    useEffect(() => {
        console.log("getting useeffect changes", userType)
        setUserType(userType);
    }, [state.userType]);

    const getAuthNavigation = () => {
        if (currnetUserType === UserType.NewUser || currnetUserType === UserType.LoggedOutUser) {
            return <AuthNavigation />
        }
    }

    // const getHomeNavigation = () => {
    //     if (currnetUserType === UserType.HomeUser || currnetUserType === UserType.LoggedInUser) {
    //         return <TabbarNavigation />
    //     }
    // }
    const getAllStackNavigation = () => {
        if (currnetUserType === UserType.HomeUser || currnetUserType === UserType.LoggedInUser) {
            return <ProfileNavigation />
        }
    }

    return (
        <>
            {getAuthNavigation()}
            {/* {getHomeNavigation()} */}
            {getAllStackNavigation()}
        </>
    )

}

export default AppNavigation;