import css from '../Login/index.module.css'

const SignUp = () => {
    return(
        <div className={css.authParentDiv}> 
            <form className={css.authForm}>
                <h2>Create Account</h2>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Username" type="text"/>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Email" type="email"/>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Password" type="password"/>
                <button className={css.authFormBtn} type="submit">Sign up</button>
            </form> 
        </div>
    );
}

export default SignUp;