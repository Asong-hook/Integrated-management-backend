import LoginForm from './components/loginForm'
import "./index.less";
import SvgIcon from '@/components/svgIcon'

const Login = () => {
    return <div className="login-container">
        <div className="login-box">
            <div className="login-form">
                <LoginForm />
            </div>
        </div>
        <SvgIcon name="bug"/>
    </div>
}

export default Login