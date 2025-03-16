import css from './index.module.css';
import { useEffect, useState } from 'react'; 
import userIcon from '../assets/usericon.jpg';


const Profile = () => {

    const [theme, setTheme] = useState('light'); 


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(theme); }
    }, [])


    return(
        <div className={`${css.profileParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}>
            <div className={css.profileChildDiv}>

                <div className={css.profileUserFlexDiv}>
                    <img className={css.profileUserIcon} src={userIcon} alt='profile-user-icon'/>
                    <h2>Kevin Durant</h2>
                </div>

                <div className={css.profileUserFlexDiv}>
                    <div className={css.profileEntityTag}> 
                        <p className={css.profileEntityName}>Nvidia</p>
                    </div> 
                </div>

                <div className={css.profileUserFlexDiv}>
                    <div className={css.profileDocumentStatsDiv}> 
                        <h4 className={css.profileDocumentHeader}>Files Statistics</h4>

                        <div className={css.profileDocumentTable}>
                            <div className={css.profileDocumentFirstRow}>
                                <p className={css.profileDocumentLabel}>Total Documents Uploaded</p>
                                <p className={css.profileDocumentFigure}>345 Files</p>
                            </div>

                            <div className={css.profileDocumentRow}>
                                <p className={css.profileDocumentLabel}>Total Storage Used</p>
                                <p className={css.profileDocumentFigure}>76.89%</p>
                            </div>

                            <div className={css.profileDocumentRow}>
                                <p className={css.profileDocumentLabel}>Largest File Uploaded</p>
                                <p className={css.profileDocumentFigure}>Report.pdf &nbsp;&nbsp;|&nbsp;&nbsp; 50MB</p>
                            </div>

                            <div className={css.profileDocumentLastRow}>
                                <p className={css.profileDocumentLabel}>Shared Files Count Shared</p>
                                <p className={css.profileDocumentFigure}>45 Files</p>
                            </div> 
                        </div>
                    </div> 
                </div>

            </div>
            
        </div>
    );
}

export default Profile;