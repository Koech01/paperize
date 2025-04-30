import css from './index.module.css';
import { ColumnProps } from '../types'; 
import { useEffect, useState } from 'react'; 
import { FileIcon, defaultStyles } from 'react-file-icon';
import deleteDocLightIcon from '../assets/docDeleteLightIcon.svg';
import { formatTimeAgo, formatDocumentExt, formatDocumentSize } from '../types';  
import { createColumnHelper, flexRender, getCoreRowModel, SortingState, useReactTable } from '@tanstack/react-table';


const columnHelper = createColumnHelper<ColumnProps>();
const columns = [
    columnHelper.accessor('name', {
        header : () => 'Name',
        cell : (info) => {
            const row = info.row.original;
            const extension = row.format.toLowerCase()

            return(
                <div className={css.homeDocumentIconDiv}>
                    <div className={css.homeDocumentTypeIcon}>
                        <FileIcon extension={extension} {...(defaultStyles[extension] || {})}/> 
                    </div> 
                    <span className={css.homeDocumentTableCellName}>{info.getValue()}</span>
                </div>
            )
        } 
    }),

    columnHelper.accessor('size', {
        header : () => 'Size',
        cell   : (info) => (
            <span className={css.homeDocumentTableCellSize}>{formatDocumentSize(info.getValue())}</span>
        )
    }),

    columnHelper.accessor('format', {
        header : () => 'Format',
        cell   : (info) => (
            <span className={css.homeDocumentTableCellFormat}>{formatDocumentExt(info.getValue())}</span>
        )
    }),

    columnHelper.accessor('createdFrom', {
        header : () => 'Created',
        cell   : (info) => (
            <span className={css.homeDocumentTableCellCreated}>{formatTimeAgo(info.getValue())}</span>
        )
    })
]
  
  
const Home = () => {

    const [theme, setTheme]                     = useState('light');
    const [searchQuery, setSearchQuery]         = useState('');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); 
    const [documents, setDocuments]             = useState([
        {name: 'BTC Report', size:87619, format : 'file.dat', createdFrom : '2025-04-21 15:31:44.212312'},
        {name: 'Encrypted Shadows', size:124360, format : 'folder', createdFrom : '2025-04-30 05:31:44.212312'},
        {name: 'Silent Signal Transmission', size:4768, format : 'file.acc', createdFrom : '2025-04-26 03:31:44.212312'},
        {name: 'Chrono Flux Report', size:57685, format : 'file.docx', createdFrom : '2025-04-26 00:31:44.212312'},
        {name: 'BTC Report', size:87619, format : 'file.dat', createdFrom : '2025-04-26 11:31:44.212312'},
        {name: 'Synthetic Mind Integration Notes', size:346281, format : 'file.pdf', createdFrom : '2025-04-26 20:31:44.212312'},
        {name: 'Encrypted Shadows', size:124360, format : 'folder', createdFrom : '2025-04-26 14:31:44.212312'},
        {name: 'Synthetic Mind Integration Notes', size:346281, format : 'file.pdf', createdFrom : '2025-04-26 03:31:44.212312'},
        {name: 'Encrypted Shadows', size:124360, format : 'folder', createdFrom : '2025-04-26 21:31:44.212312'},
        {name: 'Silent Signal Transmission', size:4768, format : 'file.acc', createdFrom : '2025-04-26 6:31:44.212312'},
        {name: 'Chrono Flux Report', size:57685, format : 'file.docx', createdFrom : '2025-04-26 09:31:44.212312'},
        {name: 'BTC Report', size:87619, format : 'file.dat', createdFrom : '2025-04-26 17:31:44.212312'},
        {name: 'Synthetic Mind Integration Notes', size:346281, format : 'file.pdf', createdFrom : '2025-04-12 22:31:44.212312'},
        {name: 'Encrypted Shadows', size:124360, format : 'folder', createdFrom : '2025-04-08 02:31:44.212312'},
        {name: 'Silent Signal Transmission', size:4768, format : 'file.acc', createdFrom : '2025-04-03 11:31:44.212312'},
        {name: 'Chrono Flux Report', size:57685, format : 'file.docx', createdFrom : '2025-04-11 08:31:44.212312'}
    ]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({ 
        data : documents, 
        columns, debugTable:true, 
        getCoreRowModel: getCoreRowModel(), 
        state : { sorting },
        onSortingChange: setSorting,
    })

    const recentDocuments = [
        {id: 1, name: 'BTC Report', size:87619, format : 'docx', createdFrom : '15 April, 2025'},
        {id: 2, name: 'Encrypted Shadows', size:124360, format : 'pdf', createdFrom : '15 April, 2025'},
    ]
    

    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference');
        if (savedTheme) { setTheme(savedTheme); }
    }, [])


    useEffect(() => {
        (async() => {
        const token = localStorage.getItem('token');
        const response = await fetch(``, {
            method      : 'GET',
            headers     : { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            credentials : 'include',
        })

        if (response.ok) {
            const resourceData = await response.json();
            setDocuments(resourceData);
        }

        else { console.error('Failed to fetch user documents and folders: ', response.status); }

        })();
    }, [])


    useEffect(() => {
        const fetchSearchResults = async() => {
        try {
            const token    = localStorage.getItem('');
            const response = await fetch(`api/v1/documents/search/?search=${encodeURIComponent(searchQuery)}/`, {
            method      : 'GET',
            headers     : { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            credentials : 'include',
            })

            if (response.ok) {
                const searchData = await response.json()
                setSearchQuery(searchData);
            }

            else { console.error('Failed to fetch search results : ', response.status) }
        }
        catch (error) { console.error('Error fetching search results: ', error) }
    }

        if (searchQuery) { fetchSearchResults() }
    }, [searchQuery])


    const handleDeleteDocModalOpen  = () => { setDeleteModalOpen(true); }
    const handleDeleteDocModalClose = () => { setDeleteModalOpen(false); }

    const handleDeleteDocument = async(resourceId? : number) => {
        let resourceItem: string = '';

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`api/v1/documents/${resourceId}/delete/`, {
                method      : 'DELETE',
                headers     : { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                credentials : 'include'
            })

            if (response.ok) {
                setDeleteModalOpen(false);
            }

            else {
                const resourceType = await response.json();
                resourceItem = resourceType
                console.error(`Failed to delete ${resourceType}: `, response.status);
            }
        }

        catch (error) { console.error(`Error delete ${resourceItem}`, error) }
    }


    return(
        <div className={`${css.homeParentDiv} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}>
            <div className={css.homeChildDiv}>

                <div className={css.homeDocumentsRecentDiv}> 
                    {recentDocuments?.length ? (
                        recentDocuments.map((document) => (
                            <div key={document.id} className={css.homeDocumentRecentItem}>
                                <div className={css.homeDocumentRecentIconDiv}>
                                    <FileIcon extension={document.format} {...(defaultStyles[document.format] || {})}/> 
                                </div> 

                                <div className={css.homeDocumentRecentTextDiv}>
                                    <span className={css.homeDocumentRecentName}>{document.name}</span>
                                    <span className={css.homeDocumentRecentSize}>{formatDocumentSize(document.size)}</span>
                                </div>

                                <button className={css.homeDocumentRecentDeleteBtn} onClick={handleDeleteDocModalOpen}>
                                    <img className={css.homeDocumentRecentDeleteIcon} src={deleteDocLightIcon} alt='home-doc-recent-delete-btn'/>
                                </button> 
                            </div>
                        )) 
                    ) : (
                        <div className={css.homeDocumentRecentItem}>
                            <div className={css.homeDocumentRecentIconDiv}>
                                <FileIcon extension={'file'} {...(defaultStyles['file'] || {})}/> 
                            </div> 

                            <div className={css.homeDocumentRecentTextDiv}>
                                <span className={css.homeDocumentRecentName}>Nothing Here… Yet</span>
                                <span className={css.homeDocumentRecentSize}>No recent activity. Open or upload a document to get started.</span>
                            </div>
                        </div>
                    )}
                 
                </div>
 

                <div className={css.homeDocumentsComponentDiv}>
                    <div className={css.homeDocumentsUtilityBar}>
                        <ul className={css.homeDocumentBreadcrumbs}>
                            <li><a href="#">Modular Cloud</a></li>
                            <li><a href="#">Celestia Mainnet</a></li>
                            <li><a href="#">Transactions</a></li>
                        </ul>

                        <div className={css.homeDocumentsUtilityFlexDiv}>
                            <input
                                type        = 'text'
                                placeholder = 'Search...'
                                className   = {css.homeDocumentSearchInput}
                            />
                        </div>
                    </div>

                    <table className={css.homeDocumentTable}>
                        <thead className={css.homeDocumentTableHead}>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id} className={css.homeDocumentTableHeadRow}>
                                    {headerGroup.headers.map((header) => (
                                        <th 
                                        key      = {header.id}  
                                        className = {`${css.homeDocumentTableHeadCell} ${css[`headCell_${header.column.id}`] || ''}`}
                                        >
                                            <div 
                                                {...{
                                                    className: header.column.getCanSort() ? 'cursor-pointer' : '',
                                                    onClick  : header.column.getToggleSortingHandler()
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{asc: ' ▲', desc : ' ▼'}[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            )) } 
                        </thead>

                        <tbody className={css.homeDocumentTableBody}>
                            <div className={css.homeDocumentTableList}>  
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className={css.homeDocumentTableRow}>
                                        {row.getVisibleCells().map((cell) => (
                                            <td 
                                                key       = {cell.id}  
                                                className = {`${css.homeDocumentTableCell} ${css[`tableCell_${cell.column.id}`] || ''}`}
                                            > 
                                                <div className={css.tableCellTextDiv}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </div> 
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </div>
                        </tbody>
                    </table>
                </div>
            </div>
 
            {deleteModalOpen && (
                <div className={`${css.homeDocDeleteModalParentDiv} ${css.fadeIn} ${theme === 'light' ? css.lightTheme : css.darkTheme}`}>
                    <div className={css.homeDocDeleteModalDiv}>
                        <h4 className={css.homeDocDeleteModalHeader}>Delete Document</h4>

                        <p className={css.homeDocDeleteModalText}>This operation cannot be undone. Do you wish to continue?</p>

                        <div className={css.homeDocDeleteModalBtnDiv}>
                            <button className={css.homeDocDeleteModalAcceptBtn} onClick={() => handleDeleteDocument()}>Delete</button>
                            <button className={css.homeDocDeleteModalCancelBtn} onClick={handleDeleteDocModalClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;