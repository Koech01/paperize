import css from './index.module.css'

const Login = () => {
    return(
        <div className={css.authParentDiv}> 
            <form className={css.authForm}>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Email" type="email"/>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Password" type="password"/>
            </form> 
        </div>
    );
};

export default Login;