import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
// @ts-ignore
import { Colors } from '../../constants/Colors';

interface ButtonProps {
    children: any ;
    onPress?: () => void;
}

const Button = ({children, onPress}: ButtonProps) => {
    return (
        <Pressable 
            onPress={onPress}
            style={({pressed}) => [ styles.button, pressed && styles.pressed ]}>
                <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.primary60,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: .15,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
        borderRadius:4,
    },
    pressed: {
        opacity: .75,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
    },
})


export default Button