export interface MapModel {
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    latitude?: number;
    address?: string;
    longitude?: number;
    postalCode?: number;
  }
  
  export interface FeatureModel {
    "id": string;
    "type": string;
    "place_type": [string];
    "relevance": number;
    "properties": {
      "mapbox_id": string;
    };
    "text": string;
    "place_name": string;
    "matching_text": string;
    "matching_place_name": string;
    "center": [number, number];
    "geometry": {
      "type": string;
      "coordinates": [number, number];
    };
    "context": [
      {
        "id": string;
        "mapbox_id": string;
        "wikidata": string;
        "text": string;
      }
    ]
  }
  
  export interface MapFeatureModel {
    "type": string;
    "features": Array<FeatureModel>;
  }
  