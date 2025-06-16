import { createContext, useEffect, useState  } from "react";
import type { ReactNode } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"
import { auth,db } from "../firebase";
import type { User } from "firebase/auth";
import { doc,setDoc } from "firebase/firestore";

export interface AuthContextType {
    user:User | null;
    signUp:(email:string ,password:string) => Promise<any>;
    logIn:(email:string,password:string) => Promise<any>;
    logOut: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children:ReactNode;
}

export function AuthContextProvider({children}:AuthProviderProps) {

    const [user,setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
        });

        return () => unsubscribe();
    },[]);

    async function signUp(email:string,password:string){
        await setDoc(doc(db,"users",email),{
            favShows:[],
            createdAt:Date.now(),
        })
        return createUserWithEmailAndPassword(auth,email,password);
    };

    function logIn(email:string,password:string){
        return signInWithEmailAndPassword(auth,email,password);
    };

    function logOut(){
        return signOut(auth);
    }


    return (
        <AuthContext.Provider value={{user,signUp,logIn,logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

