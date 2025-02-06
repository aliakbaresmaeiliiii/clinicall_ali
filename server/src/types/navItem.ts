export interface Menu {
    id: number;
    icon: string;
    name: string;
    path: string;
    submenus: Submenu[];
  }
  
  export interface Submenu {
    id: number;
    name: string;
    path: string;
    icon:string
  }