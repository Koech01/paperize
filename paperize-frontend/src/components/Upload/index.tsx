import css from './index.module.css';
import { useEffect, useState } from 'react';
import docIcon from '../assets/docIcon.svg';
import closeLightIcon from '../assets/closeLight.svg'; 
import cloudIcon from '../assets/cloud.png';

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


const Upload = () => {

    const [theme, setTheme]               = useState('light');
    // const [selectedFile, setSelectedFile] = useState< File | null>(null);


    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(savedTheme); }
    }, [])


    const handleFileSelection = () => {
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) { fileInput.click(); }
    }

    return(
        <div className={`${css.uploadParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}> 

            <div className={css.uploadChildDiv}>
                <div className={css.uploadInputDiv}>
                    <img className={css.uploaFolderIcon} src={cloudIcon} alt='create-doc-icon'/>
                    <div className={css.uploadFileTextDiv}>
                        <b className={css.uploadFileHeader}>Choose File to Upload</b>
                        <p className={css.uploadFileDescription}>DOCX, XLSX, PDF, TXT and JPG formats, up to 50MB.</p>
                    </div>
                    <button className={css.uploaFolderBtn} onClick={handleFileSelection}>Browse</button>
                    <input 
                        type      = "file"
                        className = {css.uploadInput} 
                        style     = {{ display : 'none' }}
                        accept    = "image/jpeg, image/png, image/gif" 
                    />
                </div>

                <div className={css.uploadFileItemListDiv}>

                    <div className={`${css.uploadFileItemDiv} ${css.uploadFileProgress}`}>  
                        <div className={css.uploadFileItemChildDiv}>
                            <img className={css.uploadFileIcon} src={docIcon} alt='create-doc-icon'/>

                            <div className={css.uploadFileItemTextDiv}> 
                                <p className={css.uploadFileName}>Using Relative Positioning</p>

                                <div className={css.uploadFileItemStatusDiv}>
                                    <p className={css.uploadFileText}>XLSX&nbsp;&nbsp;</p>
                                    <p className={css.uploadFileText}>100 MB&nbsp;&nbsp;<span className={css.uploadFileDot}>.</span></p>
                                    <p className={css.uploadFileText}>&nbsp;&nbsp;Uploading...</p>
                                </div>
                            </div>
    
                            <button className={css.uploadFileCancelBtn}>
                                <img className={css.uploadFileCancelIcon} src={closeLightIcon} alt='upload-cancel-btn-icon'/>
                            </button>
                        </div>

                        <div className={css.uploadFileLoadingDiv}> 
                            <div className={css.uploadFileProgressDiv}>
                                <div className={css.uploadFileProgressBar} style={{ width: `${45}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className={`${css.uploadFileItemDiv} ${css.uploadFileComplete}`}>  
                        <div className={css.uploadFileItemChildDiv}>
                            <img className={css.uploadFileIcon} src={docIcon} alt='create-doc-icon'/>

                            <div className={css.uploadFileItemTextDiv}> 
                                <p className={css.uploadFileName}>Using Relative Positioning</p>

                                <div className={css.uploadFileItemStatusDiv}>
                                    <p className={css.uploadFileText}>XLSX&nbsp;&nbsp;</p>
                                    <p className={css.uploadFileText}>100 MB&nbsp;&nbsp;<span className={css.uploadFileDot}>.</span></p>
                                    <p className={css.uploadFileText}>&nbsp;&nbsp;Completed</p>
                                </div>
                            </div>
    
                            <button className={css.uploadFileCancelBtn}>
                                <img className={css.uploadFileCancelIcon} src={closeLightIcon} alt='upload-cancel-btn-icon'/>
                            </button>
                        </div> 
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Upload;