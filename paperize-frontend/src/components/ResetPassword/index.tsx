import css from '../Login/index.module.css'

const ResetPassword = () => {
    return(
        <div className={css.authParentDiv}> 
            <form className={css.authForm}> 
                <input className={css.authFormInput} required autoComplete="off" placeholder="Enter Password" type="password"/>
                <input className={css.authFormInput} required autoComplete="off" placeholder="Confirm Password" type="password"/>
                <button className={css.authFormBtn} type="submit">Reset</button>
            </form> 
        </div>
    );
}

export default ResetPassword;