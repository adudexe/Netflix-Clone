import { useContext } from "react";
import type { AuthContextType } from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext";


export const useAuth = ():AuthContextType => {
    const user = useContext(AuthContext);
    if(user == undefined) {
        throw "Please provide the necessary things in the AuthContext Provider";
    }
    return user;
}