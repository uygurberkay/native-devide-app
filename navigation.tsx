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


import { useCallback, useEffect, useState } from 'react';
import { init } from './utils/database';
import * as SplashScreen from 'expo-splash-screen';


type NativeStackParamList = {
    AllPlaces: any | undefined;
    AddPlace: any | undefined;
    Map: any | undefined;
    PlaceDetails: any | undefined;
};

const Stack = createNativeStackNavigator<NativeStackParamList>();

const Navigation = () => {
    const [dbInitialized, setDBInitialized] = useState(false);

    useEffect(() => {
        const prepare = async () => {
            try {
                await SplashScreen.preventAutoHideAsync();
                init();
            } catch (e) {
                console.warn(e);
            } finally {
                setDBInitialized(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (dbInitialized) {
            await SplashScreen.hideAsync();
        }
    }, [dbInitialized]);
    
    if (!dbInitialized) return null;
    
    return (
        <NavigationContainer onReady={onLayoutRootView}>
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
                        title: 'Map'
                    }}/>    
                <Stack.Screen 
                    name='PlaceDetails' 
                    component={PlaceDetails} 
                    options={{
                        title: 'Loading Place...'
                    }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;