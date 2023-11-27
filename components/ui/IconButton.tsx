import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
// @ts-ignore
import { Colors } from '../../constants/Colors';

interface IconButtonProps {
    icon: any ;
    size?: number;
    color?: string;
    onPress?: () => void;
}

const IconButton = ({icon, size, color, onPress}: IconButtonProps) => {
    return (
        <Pressable 
            onPress={onPress}
            style={({pressed}) => [ styles.button, pressed && styles.pressed ]}>
                <View>
                    <Ionicons name={icon} size={size} color={color} />
                </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed: {
        opacity: .75,
        backgroundColor: Colors.primary100,
    },
})


export default IconButton