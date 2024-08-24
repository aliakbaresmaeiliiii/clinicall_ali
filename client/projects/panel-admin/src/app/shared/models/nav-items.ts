export interface NavItem {
  menu_name: string;
  url: string;
  icon?: string;
  menu_id: number;
  route?: string;
  path?: string;
  role?: Role[];
  order_index?: number;
  created_at?: Date;
  updated_at?: Date;
  subMenu?: Submneu[] | null;
}
export interface Role {
  user_id: number;
  role: string;
}

export interface Submneu {
  menu_id: number;
  permission: string;
  submenu_id: number;
  submenu_name: string;
  url: string;
}
