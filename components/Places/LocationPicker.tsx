import { View, Text, StyleSheet, Alert } from 'react-native';
import OutlineButton from '../ui/OutlineButton';

// @ts-ignore
import { Colors } from '../../constants/Colors';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus  } from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation , useRoute } from '@react-navigation/native';
import { getAddress } from '../../utils/location';

interface LocationPickerProps {
    onPickLocation: (location: any) => void;
}

const LocationPicker = ({onPickLocation}: LocationPickerProps) => {
    const isFocused = useIsFocused();

    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    const [pickedLocation, setPickedLocation] = useState<any>();

    
    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = route.params && {
                latitude: route.params.pickedLat , 
                longitude: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation)
        }
    }, [route, isFocused])

    useEffect(() => {
        const handleLocation = async () => {
            if(pickedLocation) {
                const address = await getAddress(pickedLocation.latitude,pickedLocation.longitude)
                onPickLocation({...pickedLocation , address: address})
            }
        }
        handleLocation()
    }, [pickedLocation, onPickLocation])

    /* Permission */
    const verifyPermission = async () => {
        if(locationPermissionInformation?.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission()
            return permissionResponse.granted;
        } 

        if(locationPermissionInformation?.status === PermissionStatus.DENIED){
            Alert.alert(
                'Insufficient Permissions!', 
                'You need to grand camera permission to use this app')
            return false
        }
        return true
    }




    const getLocationHandler = async () => {
        const hasPermission = await requestPermission()

        if(!hasPermission){
            return;
        }

        const location = await getCurrentPositionAsync();
        setPickedLocation({
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }
    const pickOnMapHandler = () => {
        navigation.navigate('Map')
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if(pickedLocation) {
        locationPreview = (
            <MapView 
                style={styles.image}
                initialRegion={pickedLocation}
            >
                <Marker coordinate={pickedLocation} title='Here'/>
            </MapView>
        )
    }

    return (
        <View>
            <View style={styles.mapPreiew}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlineButton 
                    icon={'location'} 
                    onPress={getLocationHandler}>
                        Locate user
                </OutlineButton>
                <OutlineButton 
                    icon={'map'} 
                    onPress={pickOnMapHandler}>
                        Pick on Map
                </OutlineButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mapPreiew: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',   
        backgroundColor: Colors.primary60,
        borderRadius: 8,
        overflow: 'hidden',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
        // borderRadius:4,
    }
});

export default LocationPicker