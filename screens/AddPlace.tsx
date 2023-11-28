import { View, Text } from 'react-native'
import React from 'react'
import PlaceForm from '../components/Places/PlaceForm'

const AddPlace = ({navigation}: any) => {
    /* With this function we get all the params filled on 'PlaceForm' component and insert it to place variable */
    const createPlaceHandler = (place: any) => {
        navigation.navigate('AllPlaces', {
            place: place,  //Throwing params to other pages in this example 'AllPlaces'
        })
    }

    return (
        <>
            <PlaceForm onCreatePlace={createPlaceHandler} />
        </>
    )
}

export default AddPlace