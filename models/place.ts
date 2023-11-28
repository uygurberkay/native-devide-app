interface PlaceProps {
    title: string;
    imageUri: string;
    address: any;
    location: any
}

export class Place implements PlaceProps {
    title: string;
    imageUri: string;
    address: any;
    location: any;
    id: string;

    constructor(title: string, imageUri: string, location: any) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = location.address;
        this.location = { latitude: location.latitude, longitude: location.longitude }; // It could be wrong
        this.id = new Date().toString() + Math.random().toString();
    }
}