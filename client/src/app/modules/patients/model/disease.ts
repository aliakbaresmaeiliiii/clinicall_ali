export interface Diseases {
  disease_id: number;
  disease_name: string;
}
export interface SubCategoryDisease extends Diseases {
  subcategory_id: number;
  subcategory_name: string;
}
