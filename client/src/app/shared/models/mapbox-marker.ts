import {LngLatLike} from 'mapbox-gl';


interface GeometryItem {
    lngLat: LngLatLike;
  }
  
  export interface Geometry {
    type: string;
    item: GeometryItem;
  }
  
  export interface MapboxMarkers {
    type: string;
    geometry: Array<Geometry>;
  }