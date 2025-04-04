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