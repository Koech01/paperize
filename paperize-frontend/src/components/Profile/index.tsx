import css from './index.module.css';
import { useEffect, useState } from 'react'; 
import userIcon from '../assets/usericon.jpg';
import settingLightIcon from '../assets/settingLightIcon.svg';


const Profile = () => {

    const [theme, setTheme]                   = useState('light'); 
    const [toolTipHovered, setToolTipHovered] = useState(false); 


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(theme); }
    }, [])


    return(
        <div className={`${css.profileParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}>
            <div className={css.profileChildDiv}>

                <div className={css.profileIconNameDiv}> 
                    <div className={css.profileUserFlexDiv}>
                        <img className={css.profileUserIcon} src={userIcon} alt='profile-user-icon'/>
                        <h2 className={css.profileUserName}>Kevin Durant</h2>
                        <div className={css.profileEditBtnDiv}>
                            <button className={css.profileEditBtn}>
                                <img className={css.profileEditBtnIcon} src={settingLightIcon} alt="profile-edit-light-icon"/>
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    <div className={css.profileUserFlexDiv}>
                        <div className={css.profileEntityTag}> 
                            <p className={css.profileEntityName}>Nvidia</p>
                        </div> 
                    </div>
                </div>
 
                <div className={css.profileDocumentStatsDiv}> 
                    <h4 className={css.profileDocumentHeader}>Files Statistics</h4>

                    <div className={css.profileDocumentStatsBar}> 
                        <div 
                            className    = {css.profileDocumentStatItem}
                            onMouseEnter = {() => setToolTipHovered(true)}
                            onMouseLeave = {() => setToolTipHovered(false)}
                        >
                            {toolTipHovered && (
                                <div className={`${css.profileDocumentStatTooltop} ${css.fadeIn}`}>
                                    <div className={css.profileTooltopIndicator}></div>
                                    <p className={css.profileTooltopFileType}>PDFs</p>
                                    <p className={css.profileTooltopFileSize}>12.8 GB</p>
                                    <p className={css.profileTooltopFilePcnt}>9.8%</p>
                                </div>
                            )}
                        </div>
                        <div className={css.profileDocumentStatItem1}></div>
                    </div>

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
    );
}

export default Profile;