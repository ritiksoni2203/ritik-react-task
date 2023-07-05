import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }: any) => {
    const navigate = useNavigate()
    const accessToken = localStorage.getItem('access') ? true : false;

    useEffect(() => {
        !accessToken && navigate('/login')
    }, [])

    return (
        accessToken &&
        <div>
            <Component />
        </div>
    );
};

export default ProtectedRoute;