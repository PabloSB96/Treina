import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/pages/LoginScreen';
import RegisterScreen from './src/pages/RegisterScreen';

import { useFonts } from 'expo-font'; 
import { LogBox } from 'react-native';
import TrainerMainScreen from './src/pages/TrainerMainScreen';
import TraineeMainScreen from './src/pages/TraineeMainScreen';
import NewHistoryScreen from './src/pages/trainee-tabs/NewHistoryScreen';
import FoodListScreen from './src/pages/trainee-tabs/FoodListScreen';
import NewExerciceFoodScreen from './src/pages/trainer-tabs/NewExerciceFoodScreen';
import AboutScreen from './src/pages/AboutScreen';
import TraineeDetailsMainScreen from './src/pages/trainer-tabs/TraineeDetailsMainScreen';

const Stack = createStackNavigator();

// Color palette
// Primary: #d32f2f
// Light: #000000
// Dark: #9a0007
// <color name="colorPrimary">#d32f2f</color>
// <color name="colorPrimaryDark">#9a0007</color>
// <color name="colorAccent">#000000</color>
// <color name="white">#FFFFFF</color>
// <color name="black">#000000</color>
// <color name="red">#d32f2f</color>

const App = () => {

  // TODO uncomment this line
  LogBox.ignoreAllLogs();

  const [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat.ttf'), 
  });

  if (!loaded) {
    console.log("Fonts did not loaded!!");
    return null;
  }

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: 'Login',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: 'Registro',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#d32f2f',
            },
            headerTintColor: '#ffffff'
          }}
        />
        <Stack.Screen
          name="TrainerMainScreen"
          component={TrainerMainScreen}
          options={{
            headerShown: false,
            detachPreviousScreen: true,
            headerStyle: {
              backgroundColor: '#ffa726',
            },
            headerTintColor: '#ffffff'
          }}
        />
        <Stack.Screen
          name="TraineeMainScreen"
          component={TraineeMainScreen}
          options={{
            headerShown: false,
            detachPreviousScreen: true,
            headerStyle: {
              backgroundColor: '#ffa726',
            },
            headerTintColor: '#ffffff'
          }}
        />
        <Stack.Screen
          name="NewHistoryScreen"
          component={NewHistoryScreen}
          options={{
            headerShown: true,
            title: 'Nuevas medidas',
            detachPreviousScreen: false,
            headerStyle: {
              backgroundColor: '#d32f2f',
            },
            headerTintColor: '#ffffff'
          }}
        />
        <Stack.Screen
          name="FoodListScreen"
          component={FoodListScreen}
          options={{
            headerShown: true,
            title: 'Lista de la compra',
            detachPreviousScreen: false,
            headerStyle: {
              backgroundColor: '#d32f2f',
            },
            headerTintColor: '#ffffff'
          }}
        />
        <Stack.Screen
          name="NewExerciceFoodScreen"
          component={NewExerciceFoodScreen}
          options={{
            headerShown: true,
            title: 'Administrar datos',
            detachPreviousScreen: false,
            headerStyle: {
              backgroundColor: '#d32f2f',
            },
            headerTintColor: '#ffffff'
          }}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{
            headerShown: true,
            title: 'Acerca de',
            detachPreviousScreen: false,
            headerStyle: {
              backgroundColor: '#d32f2f',
            },
            headerTintColor: '#ffffff'
          }}
        />
        <Stack.Screen
          name="TraineeDetailsMainScreen"
          component={TraineeDetailsMainScreen}
          options={{
            headerShown: true,
            headerTitle: 'Detalles del cliente',
            detachPreviousScreen: false,
            headerStyle: {
              backgroundColor: '#d32f2f',
            },
            headerTintColor: '#ffffff'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;