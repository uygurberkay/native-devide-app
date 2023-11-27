import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import OutlineButton from '../ui/OutlineButton'
// @ts-ignore
import { Colors } from '../../constants/Colors'

const LocationPicker = () => {

    const getLocationHandler = () => {

    }
    const pickOnMapHandler = () => {

    }

    return (
        <View>
            <View style={styles.mapPreiew}>

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
        borderRadius: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

export default LocationPicker