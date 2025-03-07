import css from './index.module.css'; 
import sevenzIcon from '../assets/7z.png';
import aacIcon from '../assets/aac.png';
import aviIcon from '../assets/avi.png';
import bmpIcon from '../assets/bmp.png';
import cssIcon from '../assets/css.png';
import csvIcon from '../assets/csv.png';
import datIcon from '../assets/dat.png';
import docxIcon from '../assets/docx.png';
import dxfIcon from '../assets/dxf.png';
import ebookIcon from '../assets/ebook.png';
import sepubIcon from '../assets/epub.png';
import fileIcon from '../assets/file.png';
import flacIcon from '../assets/flac.png';
import flvIcon from '../assets/flv.png';
import gifIcon from '../assets/gif.png';
import gzIcon from '../assets/gz.png';
import htmlIcon from '../assets/html.png';
import iniIcon from '../assets/ini.png';
import javaIcon from '../assets/java.png';
import jpegIcon from '../assets/jpeg.png';
import jpgIcon from '../assets/jpg.png';
import jsIcon from '../assets/js.png';
import jsonIcon from '../assets/json.png';
import logIcon from '../assets/log.png';
import mdIcon from '../assets/md.png';
import mkvIcon from '../assets/mkv.png';
import mp4Icon from '../assets/mp4.png';
import odpIcon from '../assets/odp.png';
import odsIcon from '../assets/ods.png';
import odtIcon from '../assets/odt.png';
import oggIcon from '../assets/ogg.png';
import pngIcon from '../assets/png.png';
import pptIcon from '../assets/ppt.png';
import pptxIcon from '../assets/pptx.png';
import pyIcon from '../assets/py.png';
import rarIcon from '../assets/rar.png';
import rtfIcon from '../assets/rtf.png';
import sqlIcon from '../assets/sql.png';
import svgIcon from '../assets/svg.png';
import tarIcon from '../assets/tar.png';
import tiffIcon from '../assets/tiff.png';
import txtIcon from '../assets/txt.png';
import wmvIcon from '../assets/wmv.png';
import xlsIcon from '../assets/xls.png';
import xlsxIcon from '../assets/xlsx.png';
import xmlIcon from '../assets/xml.png';
import yamlIcon from '../assets/yaml.png';
import zipIcon from '../assets/zip.png';
import { useEffect, useState } from 'react';


const Home = () => {

    const [theme, setTheme] = useState('light');


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(savedTheme); }
    }, [])


    return(
        <div className={`${css.homeParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}> 

            <div className={css.homeRecentList}>
                <div className={css.homeDocumentsItem}> 
                    <img className={css.homeDocumentTypeIcon} src={aviIcon} alt='document-icon'/>
                    <p className={css.homeDocumentName}>Sales Report</p> 
                    <p className={css.homeDocumentSize}>350 kb</p> 
                </div> 

                <div className={css.homeDocumentsItem}> 
                    <img className={css.homeDocumentTypeIcon} src={aviIcon} alt='document-icon'/>
                    <p className={css.homeDocumentName}>Sales Report</p> 
                    <p className={css.homeDocumentSize}>350 kb</p> 
                </div> 
            </div>
 

            <div className={css.homeChildDiv}>
                <div className={css.homeDocumentsList}>
                    <div className={css.homeDocumentsItem}>  
                        <p className={css.homeDocumentName}>View all</p> 
                        <p className={css.homeDocumentName}>File</p> 
                        <p className={css.homeDocumentSize}>Size</p>
                        <p className={css.homeDocumentCreated}>Date</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={sevenzIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 kb</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={aacIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 kb</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={aviIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 kb</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={bmpIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 kb</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={sevenzIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 kb</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={cssIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 kb</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={datIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 kb</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                    <div className={css.homeDocumentsItem}> 
                        <img className={css.homeDocumentTypeIcon} src={docxIcon} alt='document-icon'/>
                        <p className={css.homeDocumentName}>Sales Report</p> 
                        <p className={css.homeDocumentSize}>350 kb</p>
                        <p className={css.homeDocumentCreated}>Thursday, 6 March 2025, 13:28 PM</p>
                    </div> 

                </div> 
           </div>
        </div>
    );
}

export default Home;