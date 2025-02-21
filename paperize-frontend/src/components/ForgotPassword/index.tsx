import css from '../Login/index.module.css'

const ForgotPassword = () => {
    return(
        <div className={css.authParentDiv}> 
            <form className={css.authForm}> 
                <input className={css.authFormInput} required autoComplete="off" placeholder="Email" type="email"/>
                <button className={css.authFormBtn} type="submit">Submit</button>
            </form> 
        </div>
    );
}

export default ForgotPassword;