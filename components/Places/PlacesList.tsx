import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'

interface PlacesListProps {
    places: any;
}

const PlacesList = ({places}: PlacesListProps) => {

    const renderHandler : any = () => {

    }

    return (
        <>
            <FlatList data={places} keyExtractor={(item) => item.id} renderItem={renderHandler}/>
        </>
    )
}

const styles = StyleSheet.create({

})

export default PlacesList