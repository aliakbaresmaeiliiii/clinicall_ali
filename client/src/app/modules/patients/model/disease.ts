export interface Diseases {
  disease_id: number;
  name: string;
}
export interface SubCategoryDisease extends Diseases {
  subcategory_id: number;
  name: string;
}
