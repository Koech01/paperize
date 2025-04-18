import css from './index.module.css'; 
import { useEffect, useState } from 'react';  
import darkLightIcon from '../assets/darkThemeLightIcon.svg';
import lightLightIcon from '../assets/lightThemeLightIcon.svg';
import systemLightIcon from '../assets/systemThemeLightIcon.svg';


const Setting = () => {

    const [theme, setTheme]                     = useState<string>('light');
    const [revokeModalOpen, setRevokeModalOpen] = useState(false);
    const [editThemeMenu, setEditThemeMenu]     = useState(false);


    useEffect(() => { 
        const savedTheme  = localStorage.getItem('themePreference') as 'light' | 'dark' |'system' | null;
        const getSysTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const applyTheme  = ( selectedTheme : 'light' | 'dark' | 'system' ) => {
            const newTheme = selectedTheme === 'system' ? getSysTheme() : selectedTheme;
            setTheme(newTheme);
            document.documentElement.setAttribute('data-theme', newTheme); 
        }

        const initialTheme = savedTheme || 'system';
        applyTheme(initialTheme);

        if (initialTheme === 'system') {
            const sysThemeListener = (e: MediaQueryListEvent) => {
                const newSysTheme = e.matches ? 'dark' : 'light';
                setTheme(newSysTheme);
                document.documentElement.setAttribute('data-theme', newSysTheme); 
            }
       
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', sysThemeListener);

            return () => mediaQuery.removeEventListener('change', sysThemeListener);
        }
    }, [])


    const changeDisplayTheme = (newTheme: 'light' | 'dark' | 'system') => {
        localStorage.setItem('themePreference', newTheme);
        setTheme(newTheme);

        const updateTheme = newTheme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : newTheme;
        document.documentElement.setAttribute('data-theme', updateTheme);
    }

    
    const handleRevokeAccess = async() => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('', {
                method      : 'POST',
                headers     : { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                credentials : 'include'
            })

            if (response.ok) {
                setRevokeModalOpen(false)
            }

            else { console.error('Failed to revoke resource access for all other users: ', response.status); }
        }

        catch (error) { console.error('Error revoking resource access for all other users: ', error); }
    }


    const handleOpenRevokeModal  = () => { setRevokeModalOpen(true); }
    const handleCloseRevokeModal = () => { setRevokeModalOpen(false) }


    return(
        <div className={`${css.settingParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}> 
            <div className={css.settingChildDiv}> 
                <h3 className={css.settingHeader}>Settings</h3>

                <div className={css.settingListDiv}> 
                    <div className={css.settingListItemDiv}>
                        <p className={css.settingLabel}>Theme</p>
                        
                        <div className={css.settingListItemChildDiv}>
                            <p className={css.settingDescription}>Switch between light and dark mode for a comfortable viewing experience.</p>
                            
                            <div className={`${css.settingListItemBtnDiv} ${css.settingListItemThemeBtnDiv}`}> 
                                <div className={css.settingThemeDropdownDiv}>
                                    <div 
                                        className = {`${css.settingThemeOptionDefaultDiv} ${css.settingThemeOptionDiv}`}
                                        onClick   = {() => {setEditThemeMenu(!editThemeMenu)}}
                                    > 
                                        <img 
                                            src = {
                                                theme === 'system' ? systemLightIcon :
                                                theme === 'light' ? lightLightIcon : 
                                                theme === 'dark' ? darkLightIcon : 
                                                systemLightIcon
                                            }
                                            alt       ='setting-theme-dropdown-icon'
                                            className = {css.settingThemeOptionsIcon}  
                                        />
                                    
                                        <option 
                                            value     = 'system'
                                            onClick   = {() => {setEditThemeMenu(!editThemeMenu)}}
                                            className = {css.settingThemeOption}
                                        >  
                                            {theme}
                                        </option>
                                    </div>

                                    {editThemeMenu && ( 
                                        <div className={css.settingThemeOptionsDiv}>
                                            <div className={css.settingThemeOptionDiv}> 
                                                <img 
                                                    src       = {systemLightIcon} 
                                                    alt       ='setting-theme-option-icon'
                                                    className = {css.settingThemeOptionsIcon}  
                                                />

                                                <option 
                                                    value   = 'system'
                                                    onClick = {() => {
                                                        if (theme != 'system') { changeDisplayTheme('system'); }
                                                        setEditThemeMenu(false);
                                                    }}
                                                    className = {css.settingThemeOption}
                                                >system</option>
                                            </div>

                                            <div className={css.settingThemeOptionDiv}> 
                                                <img 
                                                    src       = {lightLightIcon} 
                                                    alt       ='setting-theme-option-icon'
                                                    className = {css.settingThemeOptionsIcon}  
                                                />

                                                <option 
                                                    value   = 'light'
                                                    onClick = {() => {
                                                        if (theme != 'light') { changeDisplayTheme('light'); }
                                                        setEditThemeMenu(false);
                                                    }}
                                                    className = {css.settingThemeOption}
                                                >light</option>
                                            </div>

                                            <div className={css.settingThemeOptionDiv}>
                                                <img 
                                                    src       = {darkLightIcon} 
                                                    alt       ='setting-theme-option-icon'
                                                    className = {css.settingThemeOptionsIcon}  
                                                />

                                                <option  
                                                    value   = 'dark'
                                                    onClick = {() => {
                                                        if (theme != 'dark') { changeDisplayTheme('dark'); }
                                                        setEditThemeMenu(false);
                                                    }}
                                                    className = {css.settingThemeOption}
                                                >dark</option> 
                                            </div>
                                        </div>
                                    )}
                                </div> 
                            </div>
                        </div>
                    </div> 
 
                    <div className={css.settingListItemDiv}>  
                        <p className={css.settingLabel}>Receive App Updates</p>
                        <div className={css.settingListItemChildDiv}>
                            <p className={css.settingDescription}>Get the latest features and improvements delivered to your email.
                            </p>
                            <div className={css.settingListItemBtnDiv}>
                                <label className={css.settingItemSwitch}>
                                    <input type='checkbox'/>
                                    <span className={css.settingItemSlider}></span>
                                </label>
                            </div>
                        </div> 
                    </div> 

                    <div className={css.settingListLastItemDiv}>  
                        <p className={css.settingLabel}>Remove Shared Access</p>
                        <div className={css.settingListItemChildDiv}>
                            <p className={css.settingDescription}>Revoke all other users' access to your documents instantly.</p>
                            <div className={css.settingListItemBtnDiv}>
                                <button className={css.settingRevokeBtn} onClick={handleOpenRevokeModal}>Revoke</button>
                            </div>
                        </div> 
                    </div> 
                </div>
            </div> 


            {revokeModalOpen && (
                <div className={`${css.settingRevokeModalParentDiv} ${css.fadeIn} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}>
                    <div className={css.settingRevokeModalDiv}>
                        <h4 className={css.settingRevokeModalHeader}>⚠️ Revoke All Access ?</h4>

                        <p className={css.settingRevokeModalText}>This action will immediately remove all shared users from your documents. This cannot be undone. Are you sure you want to proceed?</p>

                        <div className={css.settingRevokeModalBtnDiv}>
                            <button className={css.settingRevokeAcceptBtn} onClick={handleRevokeAccess}>Yes, Revoke Access</button>
                            <button className={css.settingRevokeCancelBtn} onClick={handleCloseRevokeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Setting;