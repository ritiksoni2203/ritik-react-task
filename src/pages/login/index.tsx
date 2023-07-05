import GitHubLogin from 'react-github-login';
import { GitHub } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const onSuccess = (response: any) => {
        navigate('/repos');
        localStorage.setItem('access', response.code);
    };
    const token = localStorage.getItem('access') ? true : false;

    const onFailure = (response: any) => {
        console.error(response);
    };

    useEffect(() => {
        token && navigate('/repos')
    }, [])

    return (
        !token && <div className="login-screen">
            <div className="login-container">
                <GitHubLogin
                    redirectUri=""
                    clientId="857963afac1fd284c227"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    className="github-button"
                >
                    <span className="button-icon">
                        <GitHub size={20} className="github-icon" />
                    </span>
                    <span className="button-text">Sign in with GitHub</span>
                </GitHubLogin>
            </div>
        </div>
    )
}

export default Login