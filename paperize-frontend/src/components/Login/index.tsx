import css from './index.module.css';
import userIcon from '../assets/usericon.jpg';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate             = useNavigate();
    const redirectToForgotPass = () => {  navigate('/forgot/')  };

    return(
        <div className={css.authParentDiv}> 
            <form className={css.authForm}>
                <h2 className={css.authFormHeader}>Log in</h2>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Email" type="email"/>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Password" type="password"/>
                <button className={css.authFormBtn} type="submit">Login</button>
                <div className={css.authFormLinkDiv}><a className={css.authFormLink} onClick={redirectToForgotPass}>Forgot Password ?</a></div>

                <div className={css.authFormErrorDiv}>
                    <p className={css.authFormErrorText}>Error</p>
                </div> 
            </form> 

            <div className={css.authFooterDiv}>
                <div className={css.authFooterChildDiv}>
                    <p className={css.authFooterText}>koech</p>
                    <img className={css.authFooterUserIcon} src={userIcon} alt='auth-user-icon'/> 
                </div>

                <div className={css.authFooterChildDiv}>
                    <p className={css.authFooterText}>Robbie</p>
                    <img className={css.authFooterUserIcon} src={userIcon} alt='auth-user-icon'/> 
                </div> 
            </div>
        </div>
    );
};

export default Login;