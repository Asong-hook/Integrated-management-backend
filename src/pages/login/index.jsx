import LoginForm from './components/loginForm'
import "./index.less";

const Login = () => {
    return <div className="login-container">
        <div className="login-box">
            <div className="login-form">
                <LoginForm />
            </div>
        </div>
    </div>
}

export default Login