interface PlaceProps {
    title: string;
    imageUri: string;
    address: any;
    location: any
}

class Place implements PlaceProps {
    title: string;
    imageUri: string;
    address: any;
    location: any;
    id: string;

    constructor(title: string, imageUri: string, address: any, location: any) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location;
        this.id = new Date().toString() + Math.random().toString();
    }
}