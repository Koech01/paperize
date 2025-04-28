import dayjs from 'dayjs'; 
import relativeTime from 'dayjs/plugin/relativeTime';


export interface UserProps {
  id           : string;
  username     : string;
  firstName    : string;
  lastName     : string;
  email        : string;
  userIcon     : string;
  created      : string;
}


export interface FolderProps {
  id         : string;
  user       : UserProps;
  folderName : string;
  folderSize : string; 
  timestamp  : string;
}


export interface DocumentProps {
  id        : string;
  user      : UserProps;
  fileName  : string;
  fileType  : string;
  fileSize  : string; 
  timestamp : string;
}


export interface ColumnProps {
  name        : string;
  size        : number;
  format      : string; 
  createdFrom : string;
}


//Format Time
dayjs.extend(relativeTime);
export const formatTimeAgo = (timestamp : string) => { return dayjs(timestamp).fromNow(); };
 

//Format Document Extension
export const formatDocumentExt = (format : string) => {
  if (format.toLocaleLowerCase() === 'folder') {
    return 'folder';
  }

  const parts = format.split('.');
  return parts.length > 1 ? parts.pop()!.toLocaleLowerCase() : format.toLocaleLowerCase();
}


export const formatDocumentSize = (bytes : number) => {
  if (bytes === 0) { return '0 Byte' };
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  return `${size.toFixed(1)} ${sizes[i]}`;
}