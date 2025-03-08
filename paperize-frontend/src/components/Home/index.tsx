import css from './index.module.css'; 
import sevenzIcon from '../assets/7z.png';
import aacIcon from '../assets/aac.png';
import aviIcon from '../assets/avi.png';
import bmpIcon from '../assets/bmp.png';
import cssIcon from '../assets/css.png';
import datIcon from '../assets/dat.png';
import docxIcon from '../assets/docx.png';
import { useEffect, useState } from 'react';


const Home = () => {

    const [theme, setTheme] = useState('light');


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(savedTheme); }
    }, [])


    return(
        <div className={`${css.homeParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}> 
            <div className={css.homeChildDiv}>
 
                <div className={css.homeDocumentsUtilityBar}>  
                    <ul className={css.homeDocumentBreadcrumbs}>
                        <li><a href="#">Modular Cloud</a></li>
                        <li><a href="#">Celestia Mainnet</a></li>
                        <li><a href="#">Transactions</a></li> 
                    </ul>

                    <div className={css.homeDocumentsUtilityFlexDiv}>
                        <input className={css.homeDocumentsUtilitySearchBar} type="text"/>
                        <button className={css.homeDocumentsUtilityFilterBtn}>Filter</button>
                    </div>
                </div> 

                <div className={css.homeDocumentsItemLabel}>  
                    <p className={css.homeDocumentLabelName}>File Name</p> 
                    <p className={css.homeDocumentLabelSize}>Size</p>
                    <p className={css.homeDocumentLabelDate}>Date</p>
                </div> 

                <div className={css.homeDocumentsList}>
                     
                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={sevenzIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 KB</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={aacIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 KB</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={aviIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 KB</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={bmpIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 KB</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={sevenzIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 KB</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={cssIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 KB</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={datIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 KB</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={docxIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 KB</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                </div> 
           </div>
        </div>
    );
}

export default Home;