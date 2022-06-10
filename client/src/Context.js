import React, { useState, useEffect } from 'react';
import Data from './Data';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AppContext = React.createContext();

export const Provider = (props) => {
    //state  
    const [ authUser, setAuthUser ] = useState(null);
    const [ authUserCookie, setAuthUserCookie ] = useState(Cookies.set('authUserCookie', null));
    
    useEffect( () => {
        if(authUser) {
            Cookies.set('authUserCookie', JSON.stringify(authUser), {expires: 1})
         } else {
            console.log('authUser is null. nothing to set...');
         } 
    }, [authUser])

    // instance of Data() for Provider to share with its children
    const data = new Data();

    //sign in
    const signIn = async(emailAddress, password) => {
        console.log('Context.signIn() hit');

        const user = await data.getUser(emailAddress, password)

        if (user !== null) {     
            console.log('getUser() returned...', user);   
            user.password = password;
            setAuthUser(user);           
            return authUser;
        } else {
            console.log('no user found for: ', emailAddress, password);
            return;
        }        
    }

    //sign out
    const signOut = () => {
        setAuthUser(null);
        Cookies.remove('userCookie');
    }
    

    return (
        <AppContext.Provider value={{ data, signIn, signOut, authUser }}>
            { props.children }
        </AppContext.Provider>
    );
};

