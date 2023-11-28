import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import PlacesList from '../components/Places/PlacesList'
import { useIsFocused } from '@react-navigation/native'

const AllPlaces = ({route}: any) => {
    const [loadedPlaces, setLoadedPlaces] = useState<any>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused && route.params) {
            setLoadedPlaces((curPlaces: any) => [...curPlaces, route.params.place])
        }
    }, [isFocused, route.params])
    return (
        <View>
            <PlacesList places={loadedPlaces}/>
        </View>
    )
}

export default AllPlaces