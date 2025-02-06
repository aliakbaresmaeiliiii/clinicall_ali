export interface Submenu {
  id: number;
  name: string;
  path: string;
  icon: string;
}

export interface Menu {
  id: number;
  name: string;
  path: string;
  icon: string | null;
  submenus: Submenu[];
}


