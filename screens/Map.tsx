import { View, Text, StyleSheet, Alert } from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import React, { useCallback, useLayoutEffect, useState } from 'react'
import IconButton from '../components/ui/IconButton';

interface MapProps {
    navigation: any
}

const Map = ({navigation}: MapProps) => {
    const [selectedLocation, setSelectedLocation] = useState<any | undefined>();
    const region = {
        latitude: 37.78,
        longitude: 27.12,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const selectLocationHandler = (event: any) => {
        console.log(event)
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({ lat: lat, lng: lng})
    }

    const savePickedLocationHandler = useCallback(( ) =>  {
        if(!selectedLocation) {
            Alert.alert(
                'No location picked',
                'You haveto pick a location first!')
            return;
        }
        /* Giving params when navigation 'AddPlace' page */
        navigation.navigate('AddPlace', { 
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng,
        });
    }, [navigation, selectedLocation])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}: any) => (
                <IconButton 
                    icon={'save'} 
                    size={24}
                    color={tintColor}
                    onPress={savePickedLocationHandler}/>)
        })
    }, [navigation, savePickedLocationHandler])

    return (
        <MapView 
            style={styles.map} 
            initialRegion={region}
            onPress={selectLocationHandler}
        >
            <Marker 
                title= 'Here'
                coordinate={{
                    latitude: (selectedLocation && selectedLocation?.lat!) || 37.850809752437996, 
                    longitude: (selectedLocation && selectedLocation?.lng!) || 27.83089239212623,
                }}
            />
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})

export default Map