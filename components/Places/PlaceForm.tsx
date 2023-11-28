import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import React, { useCallback, useState } from 'react'
// @ts-ignore
import { Colors } from '../../constants/Colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../ui/Button';
import { Place } from '../../models/place';

interface PlaceFormProps {
    onCreatePlace: (place: any) => void;
}

const PlaceForm = ({onCreatePlace}: PlaceFormProps) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [pickedLocation, setPickedLocation] = useState();

    const changeTitleHandler = (enteredText: string) => {
        setEnteredTitle(enteredText);
    };

    const takeImageHandler = (imageUri: string) => {
        setSelectedImage(imageUri)
    }

    const pickLocationHandler = useCallback((location: any) => {
        setPickedLocation(location)
    }, [])

    const savePlaceHandler = () => {
        /* Forwarding data to parent via function variables */
        const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
        onCreatePlace(placeData);  // Stored all the props that filled on AddPlace page [title, image, location...]
    }
    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
            </View>
                <ImagePicker onImageTaken={takeImageHandler} />
                <LocationPicker onPickLocation={pickLocationHandler}/>
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form : {
        flex:1,
        paddingHorizontal: 24,
        paddingTop: 12,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary700,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary0,
        borderBottomWidth: 2,
        backgroundColor: Colors. primary60,
        borderRadius: 10,
    },
})

export default PlaceForm