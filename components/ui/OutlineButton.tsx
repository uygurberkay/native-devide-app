import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
// @ts-ignore
import { Colors } from '../../constants/Colors';

interface OutlineButtonProps {
    icon: any ;
    onPress?: () => void;
    children: any;
}

const OutlineButton = ({onPress, icon, children}: OutlineButtonProps) => {
    return (
        <Pressable 
            onPress={onPress}
            style={({pressed}) => [ styles.button, pressed && styles.pressed ]}>
                <Ionicons 
                    style={styles.icon} 
                    name={icon} 
                    size={18} 
                    color={Colors.primary100} />
                <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary150,
        borderRadius: 12,
        backgroundColor: Colors.primary150
    },
    pressed: {
        opacity: .75,
    },
    icon: {
        marginRight: 6,
        color: Colors.primary250,
    },
    text: {
        color: Colors.gray700
    },
})

export default OutlineButton