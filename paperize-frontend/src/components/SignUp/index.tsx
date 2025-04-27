import css from '../Login/index.module.css';
import { useNavigate } from 'react-router-dom';
import { SyntheticEvent, useEffect, useState } from 'react'; 
import authErrorLightIcon from '../assets/authErrorLightIcon.svg';
import authSuccessLightIcon from '../assets/authSuccessLightIcon.svg';


const serverUrl = import.meta.env.SERVER_URL;


const SignUp = () => {
       
    const [theme, setTheme]       = useState('light'); 
    const [error, setError]       = useState('');
    const [email, setEmail]       = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(''); 
    const [password, setPassword] = useState(''); 
    const navigate                = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const redirectToLogin         = () => { navigate('/login/') };


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(theme); }
    }, [])


    const submit = async(e : SyntheticEvent) => {
        e.preventDefault();

        try {

            const response = await fetch(`http://localhost:8080/api/auth/sign-up/`, {
                method      : 'POST',
                headers     : { 'Content-Type': 'application/json' },
                credentials : 'include',
                body        : JSON.stringify({ firstName, lastName, email, password })
            })

            const data = await response.json();

            if (!response.ok) { setError(data.detail); }

            return data;
        }

        catch (error) { setError('An error occurred. Please try again.') }
    }


    useEffect(() => { if (redirect) { navigate('/'); } }, [redirect]);


    return(
        
        <div className={`${css.authParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}> 
            <form className={css.authForm} onSubmit={submit}>
                <h2>Create Account</h2>
                <input  
                    required 
                    autoComplete = "off" 
                    placeholder  = "First Name" 
                    type         = "text"
                    className    = {css.authFormInput}  
                    onChange     = {(e) => setFirstName(e.target.value) }
                />

                <input  
                    required 
                    autoComplete = "off" 
                    placeholder  = "Last Name" 
                    type         = "text"
                    className    = {css.authFormInput}  
                    onChange     = {(e) => setLastName(e.target.value) }
                />

                <input  
                    required 
                    autoComplete = "off" 
                    placeholder  = "Email" 
                    type         = "email"
                    className    = {css.authFormInput} 
                    onChange     = {(e) => setEmail(e.target.value) }
                />

                <input  
                    required 
                    autoComplete = "off" 
                    placeholder  = "Password" 
                    type         = "password"
                    className    = {css.authFormInput} 
                    onChange     = {(e) => setPassword(e.target.value) }
                />

                <button className={css.authFormBtn} type='submit'>Sign up</button>
                <div className={css.authFormLinkDiv}><a className={css.authFormLink} onClick={redirectToLogin}>Log In</a></div>

                {error && ( 
                    <div className={css.authFormMessageParentDiv}> 
                        <div className={`${css.authFormMessageDiv} ${css.authSuccess}`}>
                            <img className={css.authFormSuccessIcon} src={authSuccessLightIcon} alt='auth-message-icon'/> 
                            <p className={css.authFormMessageText}>Successfully created an account.</p>
                        </div> 

                        <div className={`${css.authFormMessageDiv} ${css.authError}`}>
                            <img className={css.authFormSuccessIcon} src={authErrorLightIcon} alt='auth-message-icon'/> 
                            <p className={css.authFormMessageText}>Successfully created an account.</p>
                        </div>
                    </div>
                )}
            </form> 
        </div>
    );
}

export default SignUp;