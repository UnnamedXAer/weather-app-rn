import { Coords } from '../Types/CustomeTypes'

export default class LocationModel {
    id: number;
    coords: Coords;
    city: string;
    country: string;
    countryCode: string;
    postalCode: string;
    region: string;
}