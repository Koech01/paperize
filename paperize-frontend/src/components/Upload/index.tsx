import css from './index.module.css';
import docIcon from '../assets/docIcon.svg';
import closeLightIcon from '../assets/closeLight.svg'; 
import folderLightIcon from '../assets/folderLightIcon.png';


const Upload = () => {

    return(
        <div className={css.uploadParentDiv}> 

            <div className={css.uploadChildDiv}>
                <div className={css.uploadInputDiv}>
                    <img className={css.uploaFolderIcon} src={folderLightIcon} alt='create-doc-icon'/>
                    <p className={css.uploadFileName}>Choose a file to upload</p>
                    <input className={css.uploadInput} type="file"/>
                </div>

                <div className={css.uploadFileItemListDiv}>

                    <div className={css.uploadFileItemDiv}>  
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
                            {/* Loading  */}
                        </div>
                    </div>

                    <div className={css.uploadFileItemDiv}>  
                        <div className={css.uploadFileItemChildDiv}>
                            <img className={css.uploadFileIcon} src={docIcon} alt='create-doc-icon' />

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

                        <div className={css.uploadFileLoadingDiv}>
                            {/* Loading  */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Upload;