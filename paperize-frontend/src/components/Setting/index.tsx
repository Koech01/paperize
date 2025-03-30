import css from './index.module.css'; 
import { useEffect, useState } from 'react'; 


const Setting = () => {

    const [theme, setTheme] = useState('light'); 


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(theme); }
    }, [])


    return(
        <div className={`${css.settingParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}> 
            <div className={css.settingChildDiv}> 
                <h3 className={css.settingHeader}>Settings</h3>

                <div className={css.settingListDiv}> 
                    <div className={css.settingListItemDiv}>
                        <p className={css.settingLabel}>Theme</p>
                        <div className={css.settingListItemChildDiv}>
                            <p className={css.settingDescription}>Switch between light and dark mode for a comfortable viewing experience.</p>
                            <div className={css.settingListItemBtnDiv}>
                                <label className={css.settingItemSwitch}>
                                    <input type='checkbox'/>
                                    <span className={css.settingItemSlider}></span>
                                </label>
                            </div>
                        </div>
                    </div> 
 
                    <div className={css.settingListItemDiv}> 
                        <p className={css.settingLabel}>Remove Shared Access</p>
                        <div className={css.settingListItemChildDiv}>
                            <p className={css.settingDescription}>Revoke all other users' access to your documents instantly.</p>
                            <div className={css.settingListItemBtnDiv}>
                                <button className={css.settingRevokeBtn}>Revoke</button>
                            </div>
                        </div>
                    </div> 

                    <div className={css.settingListLastItemDiv}> 
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
                </div>
            </div> 
        </div>
    );
}

export default Setting;