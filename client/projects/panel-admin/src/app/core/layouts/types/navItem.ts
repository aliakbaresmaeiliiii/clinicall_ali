export interface Menu {
    menu_id: number;
    icon: string;
    menu_name: string;
    path: string;
    submenus: Submenu[];
  }
  
  export interface Submenu {
    submenu_id: number;
    submenu_name: string;
    url: string;
  }