import User from "@/type/User";
import { Language } from "@/utils/common";
import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";

type Ctx = {
    user: User | null;
    isHydrated: boolean;
    isNewUser: boolean;
    setUser: (u: User | null) => void;
    setLanguage: (language: Language) => void;
    resetUser: () => void;
}

const STORAGE_KEY = "GEOS_app";

const UserContext = createContext<Ctx | null>(null);

export function UserProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<User | null>((null));
    const [isHydrated, setIsHydrated] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);

    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);

        if(!raw) {
            const fresh= new User();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
            setUser(fresh);
            setIsNewUser(true);
            setIsHydrated(true);
            return;
        }

        try{
            const parsed = JSON.parse(raw) as User;
            const hydrated = Object.assign(new User(), parsed);

            if(!hydrated.language) hydrated.language= new User().language;
            setUser(hydrated);
        } catch {
            const fresh = new User();
            localStorage.set(STORAGE_KEY, JSON.stringify(fresh));
            setUser(fresh);
            setIsNewUser(true)
        } finally {
            setIsHydrated(true);
        }
    }, []);

    useEffect(() => {
        if(!isHydrated) return;
        if(user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        else localStorage.removeItem(STORAGE_KEY);
    }, [user, isHydrated]);

    const setLanguage = (lang: Language) => {
        setUser((prev) => {
            if(!prev) return new User("Guest", lang);
            const next = new User(prev.name, lang);
            next.SPR = prev.SPR;
            next.levelCheck = prev.levelCheck
            return next;

        } );
    }
    const resetUser = () => setUser(new User());

    const value = useMemo<Ctx>(
        () => ({user, isHydrated, isNewUser, setUser, setLanguage, resetUser}), [user, isHydrated, isNewUser]
    )

    return (
        <UserContext.Provider value= {value}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    const ctx = useContext(UserContext);
    if(!ctx ) throw new Error("User must use UserProvider");
    return ctx;
}