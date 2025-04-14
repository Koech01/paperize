import css from './index.module.css';
import { useEffect, useState } from 'react';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { DocumentProps, FolderProps, ColumnProps } from '../types'; 
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
            <span className={css.homeDocumentTableCellSize}>{info.getValue()} MB</span>
        )
    }),

    columnHelper.accessor('format', {
        header : () => 'Format',
        cell   : (info) => (
            <span className={css.homeDocumentTableCellFormat}>{info.getValue()}</span>
        )
    }),

    columnHelper.accessor('createdFrom', {
        header : () => 'Created',
        cell   : (info) => (
            <span className={css.homeDocumentTableCellCreated}>{info.getValue()}</span>
        )
    })
]

  
const Home = () => {

    const [theme, setTheme]                     = useState('light');
    const [searchQuery, setSearchQuery]         = useState('');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [resourceItem, setResourceItem]       = useState<(DocumentProps | FolderProps)[]>([]);
    const [documents, setDocuments]             = useState([
        {name: 'BTC Report', size:87619, format : 'dat', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'Encrypted Shadows', size:124360, format : 'folder', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'Silent Signal Transmission', size:4768, format : 'acc', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'Chrono Flux Report', size:57685, format : 'docx', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'BTC Report', size:87619, format : 'dat', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'Synthetic Mind Integration Notes', size:346281, format : 'pdf', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'Encrypted Shadows', size:124360, format : 'folder', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'Synthetic Mind Integration Notes', size:346281, format : 'pdf', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'Encrypted Shadows', size:124360, format : 'folder', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'Silent Signal Transmission', size:4768, format : 'acc', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'Chrono Flux Report', size:57685, format : 'docx', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'BTC Report', size:87619, format : 'dat', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'Synthetic Mind Integration Notes', size:346281, format : 'pdf', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'Encrypted Shadows', size:124360, format : 'folder', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'Silent Signal Transmission', size:4768, format : 'acc', createdFrom : '2025-04-10 14:30:00.123456'},
        {name: 'Chrono Flux Report', size:57685, format : 'docx', createdFrom : '2025-04-10 14:30:00.123456'}
    ]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({ 
        data : documents, 
        columns, debugTable:true, 
        getCoreRowModel: getCoreRowModel(), 
        state : { sorting },
        onSortingChange: setSorting,
    })
    

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
            setResourceItem(resourceData);
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
                                        <th key={header.id} className={css.homeDocumentTableHeadCell}>
                                            <div 
                                                {...{
                                                    className: header.column.getCanSort() ? 'cursor-pointer' : '',
                                                    onClick : header.column.getToggleSortingHandler()
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
                                    <tr className={css.homeDocumentTableRow} key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <td className={css.homeDocumentTableCell} key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </div>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;