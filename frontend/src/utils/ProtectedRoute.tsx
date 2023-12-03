import { Navigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import { useContext } from 'react';

type Props = {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const authContext = useContext(AuthContext);

    if (!authContext.auth) {
        return <Navigate to="/" />
    }
    
    return (
        <>
            {children}
        </>
    );
}

export default ProtectedRoute;