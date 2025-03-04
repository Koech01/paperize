import css from './index.module.css';
import docIcon from '../assets/docIcon.svg';
import closeLightIcon from '../assets/closeLight.svg'; 
import folderLightIcon from '../assets/folderLightIcon.png';
import { useEffect, useState } from 'react';


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
                    <img className={css.uploaFolderIcon} src={folderLightIcon} alt='create-doc-icon'/>
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