import css from './index.module.css';
import { useEffect, useState } from 'react'; 
import userIcon from '../assets/usericon.jpg';
import { useNavigate } from 'react-router-dom'; 
import logoutLightIcon from '../assets/logoutLightIcon.svg';
import settingLightIcon from '../assets/settingLightIcon.svg';
import profileNameLightIcon from '../assets/profileNameLightIcon.svg';  
import profileCompanyLightIcon from '../assets/profileCompanyLightIcon.svg'; 
import profileEditMailLightIcon from '../assets/profileEditMailLightIcon.svg'; 


const Profile = () => {
 
    const navigate                            = useNavigate();
    const [theme, setTheme]                   = useState('light'); 
    const [editMode, setEditMode]             = useState(false);
    const [toolTipHovered, setToolTipHovered] = useState(false); 
    const [logoutModal, setLogoutModal]       = useState(false);
    const [logoutRedirect, setLogoutRedirect] = useState(false);
    const [selectUserIcon, setSelectUserIcon] = useState<File | null>(null);


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(theme); }
    }, [])


    const toggleEditMode = () => { setEditMode(!editMode); }


    const handleProfileIconChange = () => {
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) { fileInput.click(); }
    }


    const handleProfileUpdate        = () => { setEditMode(false); }

    const handleProfileUpdateDiscard = () => { setEditMode(false); }

    const displayLogoutModal         = () => { setLogoutModal(!logoutModal); }

    const handleCloseLogoutModal     = () => { setLogoutModal(false); }

    const handleLogoutRedirect = () => { setLogoutRedirect(false); }


    useEffect(() => { if (logoutRedirect) { navigate('/api/auth/sign-out/') } }, [logoutRedirect])


    return(
        <div className={`${css.profileParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}>
            <div className={css.profileChildDiv}>
                {editMode ? (  
                    <div className={css.profileEditParentDiv}> 
                        <div className={css.profileEditUserIconDiv}> 
                            <img  
                                src       = {userIcon} 
                                alt       = 'profile-edit-user-icon'
                                className = {css.profileEditUserIcon} 
                            />
 
                            <span className={css.profileEditUserChangeBtn} onClick={handleProfileIconChange}>
                                Choose file
                            </span>

                            <input
                                type     = "file"
                                accept   = "image/jpeg, image/png, image/gif"
                                style    = {{ display: 'none' }}
                                onChange = {(e) => {
                                const selectedIcon = e.target.files?.[0];
                                if (selectedIcon) { setSelectUserIcon(selectedIcon); }
                                }}
                            />
                        </div>

                        <div className={css.profileEditInputDiv}> 
                            <div className={css.profileEditInputIconDiv}>
                                <img  
                                    src       = {profileNameLightIcon} 
                                    alt       = 'profile-edit-name-icon'
                                    className = {css.profileEditInputIcon} 
                                />
                                <p className={css.profileEditInputText}>First Name</p>
                            </div>

                            <input type='text' placeholder='First Name' className={css.profileEditInput}/> 
                        </div>

                        <div className={css.profileEditInputDiv}> 
                            <div className={css.profileEditInputIconDiv}>
                                <img  
                                    src       = {profileNameLightIcon} 
                                    alt       = 'profile-edit-name-icon'
                                    className = {css.profileEditInputIcon} 
                                />
                                <p className={css.profileEditInputText}>Last Name</p>
                            </div>
                            
                            <input type='text' placeholder='Last Name' className={css.profileEditInput}/> 
                        </div>

                        <div className={css.profileEditInputDiv}> 
                            <div className={css.profileEditInputIconDiv}>
                                <img
                                    alt       = 'profile-edit-mail-icon'
                                    src       = {profileEditMailLightIcon}  
                                    className = {css.profileEditInputIcon}   
                                />
                                <p className={css.profileEditInputText}>Email</p>
                            </div>
                            
                            <input type='email' placeholder='Email' className={css.profileEditInput}/> 
                        </div>

                        <div className={css.profileEditInputDiv}> 
                            <div className={css.profileEditInputIconDiv}>
                                <img 
                                    src       = {profileCompanyLightIcon} 
                                    className = {css.profileEditInputIcon}  
                                    alt       = 'profile-edit-company-icon'
                                />

                                <p className={css.profileEditInputText}>Company</p>
                            </div>
                            
                            <input type='text' placeholder='Company' className={css.profileEditInput}/> 
                        </div>

                        <div className={css.profileEditBtnDiv}> 
                            <button className={css.profileEditDiscardBtn} onClick={handleProfileUpdateDiscard}>Cancel</button>
                            <button className={css.profileEditUpdateBtn} type='submit' onClick={handleProfileUpdate}>Update</button>
                        </div>
                    </div>
                ):(
                    <>
                        <div className={css.profileIconNameDiv}> 
                            <div className={css.profileUserFlexDiv}>
                                <img className={css.profileUserIcon} src={userIcon} alt='profile-user-icon'/>
                                <h2 className={css.profileUserName}>Kevin Durant</h2>
                                <div className={css.profileBtnDiv}>
                                    <button className={css.profileEditBtn} onClick={toggleEditMode}>
                                        <img className={css.profileEditBtnIcon} src={settingLightIcon} alt="profile-edit-light-icon"/>
                                        Edit Profile
                                    </button>
                                </div>
                            </div>

                            <div className={css.profileUserFlexDiv}>
                                <div className={css.profileEntityTag}> 
                                    <p className={css.profileEntityName}>Nvidia</p>
                                </div> 

                                <div className={css.profileBtnDiv}> 
                                    <button className={css.profileLogoutBtn} onClick={displayLogoutModal}>
                                        <img className={css.profileLogoutIcon} src={logoutLightIcon} alt="profile-logout-light-icon"/>
                                        Sign Out
                                    </button>
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
                    </> 
                )}

            </div>


            {logoutModal && ( 
                <div className={`${css.profileLogoutModalParentDiv} ${css.fadeIn} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}>
                    <div className={css.profileLogoutModalDiv}>
                        <div className={css.profileLogoutUserIconDiv}>
                            <img className={css.profileLogoutUserIcon} src={userIcon} alt='profile-logout-user-icon'/>
                            <h4 className={css.profileLogoutHeader}>Before You Go</h4>
                        </div> 
                        <p className={css.profileLogoutText}>Are you sure you want to log out? You will need to sign in again to continue.</p>

                        <div className={css.profileLogoutBtnDiv}>
                            <button className={css.profileLogoutCancelBtn} onClick={handleCloseLogoutModal}>Back</button>
                            <button className={css.profileLogoutProceedBtn} onClick={handleLogoutRedirect}>Proceed</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;