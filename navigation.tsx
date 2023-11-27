/* Navigations */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// @ts-ignore
import { Colors } from './constants/Colors';

/* Screens */
import Map from './screens/Map';
import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import PlaceDetails from './screens/PlaceDetails';
import IconButton from './components/ui/IconButton';



type NativeStackParamList = {
    AllPlaces: any | undefined;
    AddPlace: any | undefined;
    Map: any | undefined;
    PlaceDetails: any | undefined;
};

const Stack = createNativeStackNavigator<NativeStackParamList>();


const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: { backgroundColor: Colors.primary150 },
                headerTintColor: Colors.gray700,
                contentStyle: {backgroundColor: Colors.primary50},
            }}>
                <Stack.Screen 
                    name='AllPlaces' 
                    component={AllPlaces}
                    options={({navigation}) => ({
                        title: 'Your Favorute Places',
                        headerRight: ({tintColor}) =>  (
                            <IconButton 
                                icon={'add'} 
                                color={tintColor} 
                                size={24}
                                onPress={() => navigation.navigate('AddPlace') }
                            />
                        )
                    })}/>
                <Stack.Screen 
                    name='AddPlace' 
                    component={AddPlace} 
                    options={{
                        title: 'Add a new Place',
                    }}/>
                <Stack.Screen 
                    name='Map' 
                    component={Map} 
                    options={{

                    }}/>
                <Stack.Screen 
                    name='PlaceDetails' 
                    component={PlaceDetails} 
                    options={{

                    }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;