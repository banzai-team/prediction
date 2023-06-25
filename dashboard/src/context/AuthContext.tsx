import React from 'react';

import once from 'lodash/once';

interface AuthContext {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
}

export const createAuthContext = once(() => React.createContext<AuthContext>({
    isAuth: false,
    setIsAuth: () => {}
}));

export const useAuthContext: () => AuthContext = () => React.useContext(createAuthContext());

export const AuthContextProvider: React.FC<{children?: any}> = ({children}) => {
    const AuthContext = createAuthContext();

    const [isAuth, setIsAuth] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true);
        }
    }, []);

    const value = {
        isAuth,
        setIsAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};