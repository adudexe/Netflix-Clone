import type { ReactNode } from 'react';
import { useAuth } from '../context'
import { Navigate,  } from 'react-router-dom';

const Protected:React.FC<{children:ReactNode}> = ({children}) => {

    const { user } = useAuth();
    
    if(!user){
        return <Navigate to="/login"/>
    }

    return children
}


export default Protected