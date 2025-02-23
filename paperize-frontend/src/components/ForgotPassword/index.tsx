import css from '../Login/index.module.css';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
    const navigate        = useNavigate();
    const redirectToLogin = () => { navigate('/login/') };

    return(
        <div className={css.authParentDiv}> 
            <form className={css.authForm}> 
                <input className={css.authFormInput} required autoComplete="off" placeholder="Email" type="email"/>
                <button className={css.authFormBtn} type="submit">Submit</button>
                <div className={css.authFormLinkDiv}><a className={css.authFormLink} onClick={redirectToLogin}>Log In</a></div>
            </form> 
        </div>
    );
}

export default ForgotPassword;