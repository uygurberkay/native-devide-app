import { View, Text, Alert, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
// @ts-ignore
import { Colors } from '../../constants/Colors';
import OutlineButton from '../ui/OutlineButton';

interface ImagePickerProps {
    onImageTaken: (imageUri :string) => void;
}

const ImagePicker = ({onImageTaken}: ImagePickerProps) => {
    const [pickedImage, setPicketImage] = useState<any>();
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    const verifyPermission = async () => {
        if(cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission()
            return permissionResponse.granted;
        } 

        if(cameraPermissionInformation?.status === PermissionStatus.DENIED){
            Alert.alert(
                'Insufficient Permissions!', 
                'You need to grand camera permission to use this app')
            return false
        }
        return true
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermission();

        if(!hasPermission){
            return;
        }

        const image : any = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: .5,
        });
        setPicketImage(image?.assets[0].uri)
        onImageTaken(image?.assets[0].uri)
    }

    let imagePreview = <Text>No Image</Text>

    if(pickedImage){
        imagePreview = <Image source={{uri: pickedImage}}  style={styles.image} />
    }

    return (
        <View>
            <View style={styles.imagePreiew}>{imagePreview}</View>
            <OutlineButton onPress={takeImageHandler} icon={'camera'}>Take Image</OutlineButton>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreiew: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',   
        backgroundColor: Colors.primary60,
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
})

export default ImagePicker