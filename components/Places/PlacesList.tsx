import { View, Text, FlatList, StyleSheet } from 'react-native'

// @ts-ignore
import { Colors } from '../../constants/Colors';
import PlaceItem from './PlaceItem';

interface PlacesListProps {
    places?: any;
}

const PlacesList = ({ places }: PlacesListProps) => {
    if (!places || places === null || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>
                No places added yet - start adding some!
            </Text>
            </View>
        );
    }

    return (
        <FlatList
            style={styles.list}
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PlaceItem place={item} onSelect={() => null}/>}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        margin: 12,
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200,
    },
});

export default PlacesList;