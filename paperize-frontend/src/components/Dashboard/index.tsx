import Home from '../Home';
import Create from '../Create';
import Setting from '../Setting';
import Profile from '../Profile';
import css from './index.module.css'; 
import { useEffect, useState } from 'react';
import userIcon from '../assets/usericon.jpg';
import homeLightIcon from '../assets/homeLightIcon.svg';
import createLightIcon from '../assets/createLightIcon.svg';
import settingLightIcon from '../assets/settingLightIcon.svg';



const Dashboard = () => {

    const [theme, setTheme]                     = useState('light');
    const [activeComponent, setActiveComponent] = useState('Home');


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(savedTheme); }
    }, []);


    const handleHomeClick     = () => { setActiveComponent('Home') };
    const handleCreateClick   = () => { setActiveComponent('Create') };
    const handleProfileClick  = () => { setActiveComponent('Profile') };
    const handleSettingsClick = () => { setActiveComponent('Settings') };


    return( 
        <div className={`${css.dashboardParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}> 
            <div className={css.dashboardParentDiv}> 
                <div className={css.dashboardChildDiv}>
                    <div className={css.dashboardNavDiv}> 
                        <nav className={css.dashboardNav}>
                            <ul className={css.homeUnorderList}> 
                                <li 
                                    className = {`${css.dashboardNavItem} ${activeComponent === 'Home' ? css.active : ''}`}
                                    onClick   = {handleHomeClick}
                                > 
                                    <img className={css.dashboardNavIcon} src={homeLightIcon} alt="home-light-icon"/>
                                    Home 
                                </li>

                                <li 
                                  className = {`${css.dashboardNavItem} ${activeComponent === 'Create' ? css.active : ''}`}
                                  onClick   = {handleCreateClick}
                                >
                                    <img className={css.dashboardNavIcon} src={createLightIcon} alt="create-light-icon"/>
                                    Create 
                                </li>

                                <li 
                                    className = {`${css.dashboardNavItem} ${activeComponent === 'Settings' ? css.active : ''}`}
                                    onClick   = {handleSettingsClick}
                                >
                                    <img className={css.dashboardNavIcon} src={settingLightIcon} alt="setting-light-icon"/>
                                    Settings 
                                </li>
                            </ul>
                            
                            <div className={css.dashboardNavUserDiv}> 
                                <img 
                                    className = {css.dashboardNavUserIcon} 
                                    src       = {userIcon} 
                                    alt       = 'home-user-icon'
                                    onClick   = {handleProfileClick}
                                />
                                <p className={css.dashboardNavUsername} onClick={handleProfileClick}>Paperize</p>
                            </div>
                        </nav>
                    </div>

                    <div className={css.componentContentDiv}>
                        {activeComponent === 'Home' && <Home/>}
                        {activeComponent === 'Create' && <Create/>}
                        {activeComponent === 'Settings' && <Setting/>}
                        {activeComponent === 'Profile' && <Profile/>}
                    </div>
                </div> 
            </div>  
        </div> 
    );
}

export default Dashboard;