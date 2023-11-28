import { useEffect, useState } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import OutlineButton from '../components/ui/OutlineButton'
// @ts-ignore
import { Colors } from '../constants/Colors';
import { fetchPlaceDetails } from '../utils/database';

type PlaceDetails = {
    route: any
    navigation: any
}

const PlaceDetails = ({ route, navigation }: PlaceDetails) =>{
const [fetchedPlace, setFetchedPlace]: any = useState();

const showOnMapHandler = () => {
    navigation.navigate('Map', {
        initialLat: fetchedPlace.location.lat,
        initialLng: fetchedPlace.location.lng,
    });
}

const selectedPlaceId = route.params.placeId;

useEffect(() => {
    async function loadPlaceData() {
    const place: any = await fetchPlaceDetails(selectedPlaceId);
    setFetchedPlace(place);
        navigation.setOptions({
            title: place.title,
        });
    }

    loadPlaceData();
}, [selectedPlaceId]);

if (!fetchedPlace) {
    return (
    <View style={styles.fallback}>
        <Text>Loading place data...</Text>
    </View>
    );
}

return (
    <ScrollView>
    <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
    <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
        <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>
        View on Map
        </OutlineButton>
    </View>
    </ScrollView>
);
}


const styles = StyleSheet.create({
    fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
},
locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
},
addressContainer: {
    padding: 20,
},
address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
},
});

export default PlaceDetails;