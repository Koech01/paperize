import css from './index.module.css'

const Login = () => {
    return(
        <div className={css.authParentDiv}> 
            <form className={css.authForm}>
                <h2 className={css.authFormHeader}>Log in</h2>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Email" type="email"/>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Password" type="password"/>
                <button className={css.authFormBtn} type="submit">Login</button>
                <div className={css.authFormLinkDiv}><a className={css.authFormLink}>Forgot Password ?</a></div>
            </form> 
        </div>
    );
};

export default Login;