import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
// @ts-ignore
import { Colors } from '../../constants/Colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

interface PlaceFormProps {
    
}

const PlaceForm = () => {

    const [enteredTitle, setEnteredTitle] = useState('');

    const changeTitleHandler = (enteredText: string) => {
        setEnteredTitle(enteredText);
    };


    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>PlaceForm</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
            </View>
            <View>
                <ImagePicker />
            </View>
            <View>
                <LocationPicker/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form : {
        flex:1,
        padding: 24,
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
        backgroundColor: Colors. primary250,
        borderRadius: 10,
    },
})

export default PlaceForm