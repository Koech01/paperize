import css from '../Login/index.module.css';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const navigate        = useNavigate();
    const redirectToLogin = () => { navigate('/login/') };

    return(
        <div className={css.authParentDiv}> 
            <form className={css.authForm}>
                <h2>Create Account</h2>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Username" type="text"/>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Email" type="email"/>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Password" type="password"/>
                <button className={css.authFormBtn} type="submit">Sign up</button>
                <div className={css.authFormLinkDiv}><a className={css.authFormLink} onClick={redirectToLogin}>Log In</a></div>

                <div className={css.authFormErrorDiv}>
                    <p className={css.authFormErrorText}>Error</p>
                </div>
            </form> 
        </div>
    );
}

export default SignUp;