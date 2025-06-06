import {createContext, useEffect, useState, ReactNode} from "react";

export type User = {
    id: string,
    name: string,
    email: string,
    language: string
}

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
});

type Props = {
    children: ReactNode;
}

export const UserProvider = ({children}: Props) => {
    const [user, setUser] = useState<User | null> (null);

    useEffect(() => {
        const storedUser= localStorage.getItem("user");
        if(storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem("user");
            }
        }
    }, []);

    useEffect(() =>{
        if(user){
            localStorage.setItem("user", JSON.stringify(user));

        } else {
            localStorage.removeItem("user");
        }
    }, [user])

    return (
        <UserContext.Provider value = {{user, setUser}}>
        {children}
        </UserContext.Provider>
    );
};