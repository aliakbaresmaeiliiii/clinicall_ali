import { MapboxMarkers } from '../models/mapbox-marker';

export interface AddressInfo{
    userId?: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    id: number;
  }
  
export class MapboxAction {
  public static startMap(): void {
    // if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
    //   mapboxgl.setRTLTextPlugin('/assets/js/mapbox-persian.js', null);
    // }
  }

  public static fillGeometry(addressArray: Array<AddressInfo>, markersArray: MapboxMarkers): void {
    for (const addressInfo of addressArray) {
      markersArray.geometry.push(
        {
          type: 'Point',
          item: {
            // info: addressInfo,
            lngLat: [addressInfo.longitude, addressInfo.latitude],
          }
        }
      );
    }
  }
}
