import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'

interface PlaceItemProps {
    place: any;
    onSelect: () => void ;
}

const PlaceItem = ({place, onSelect}: PlaceItemProps) => {
    return (
        <Pressable onPress={onSelect}>
            <Image source={{uri: place.imageUri}}/>
            <View>
                <Text>{place.title}</Text>
                <Text>{place.address}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    
})

export default PlaceItem