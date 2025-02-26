import css from './index.module.css'; 


const Home = () => {
    
    return(
        <div className={css.homeParentDiv}> 
            <div className={css.homeChildDiv}>
                <div className={css.homeNavbarDiv}> 
                    <nav className={css.homeNavbar}>
                        <ul className={css.homeUnorderList}>
                            <li className={`${css.homeNavbarItem} ${css.active}`}>Home</li>
                            <li className={css.homeNavbarItem}>Create</li>
                            <li className={css.homeNavbarItem}>Report</li>
                            <li className={css.homeNavbarItem}>Settings</li>
                        </ul>
                    </nav>
                </div>

                <div className={css.homeComponentDiv}>

                </div>
            </div> 
        </div>
    );
}

export default Home;