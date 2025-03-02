import css from './index.module.css';
import docIcon from '../assets/docIcon.svg';

const Upload = () => {

    return(
        <div className={css.uploadParentDiv}> 

            <div>
                <input type="file"/>

                <div className={css.uploadFileItemListDiv}>

                    <div className={css.uploadFileItemDiv}>  
                        <div className={css.uploadFileItemChildDiv}>
                            <img className={css.uploadFileIcon} src={docIcon} alt='create-doc-icon' />

                            <div className={css.uploadFileItemTextDiv}> 
                                <p>my-cv.docx</p>

                                <div className={css.uploadFileItemStatusDiv}>
                                    <p>100 MB &nbsp;.</p>
                                    <p>&nbsp;Uploading...</p>
                                </div>
                            </div>
    
                            <button>cancel</button>
                        </div>

                        <div className={css.uploadFileItemChildDiv}>
                            {/* Loading  */}
                        </div>
                    </div>

                    <div className={css.uploadFileItemDiv}>  
                        <div className={css.uploadFileItemChildDiv}>
                            <img className={css.uploadFileIcon} src={docIcon} alt='create-doc-icon' />

                            <div className={css.uploadFileItemTextDiv}> 
                                <p>my-cv.docx</p>

                                <div className={css.uploadFileItemStatusDiv}>
                                    <p>100 MB &nbsp;.</p>
                                    <p>&nbsp;Completed</p>
                                </div>
                            </div>
    
                            <button>cancel</button>
                        </div>

                        <div className={css.uploadFileItemChildDiv}>
                            {/* Loading  */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Upload;