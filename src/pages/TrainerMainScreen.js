import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileTab from './trainer-tabs/ProfileTab';
import TraineesTab from './trainer-tabs/TraineesTab';
import DataTab from './trainer-tabs/DataTab';

function TrainerMainScreen({ navigation, route }) {

  const Tab = createBottomTabNavigator();

  useEffect(() => {}, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size }) => {
          let iconName;
          if (route.name == 'Deportistas') {
            iconName = 'users';
          } else if (route.name == 'Datos') {
            iconName = 'database';
          } else {
            iconName = 'user';
          }
          let iconColor = '#aaa';
          if (focused) {
            iconColor = '#d32f2f';
          }
          return <Icon style={styles.iconDrawer} name={iconName} size={20} color={iconColor}  />
        },
        tabBarLabelStyle: {
          fontSize: 14
        },
        tabBarActiveTintColor: '#d32f2f',
        tabBarInactiveTintColor: '#aaa',
        headerShown: false
      })}
      >
      <Tab.Screen 
        name="Deportistas" 
        component={TraineesTab} 
        options={{
          headerTitle: 'Mis deportistas',
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#d32f2f',
          }
        }}
        initialParams={{userToken: route.params.userToken}}
        />
      <Tab.Screen 
        name="Datos" 
        component={DataTab} 
        options={{
          headerTitle: 'Datos',
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#d32f2f',
          }
        }}
        initialParams={{userToken: route.params.userToken}}
        />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileTab} 
        options={{
          headerTitle: 'Perfil',
          headerShown: true,
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#d32f2f',
          }
        }}
        initialParams={{userToken: route.params.userToken}}
        />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 2,
    backgroundColor: '#ffffff00'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  baseText: {
    fontWeight: 'bold'
  },
  boldText: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    marginTop: 10
  },
  acompanhameText: {
    fontStyle: 'normal',
    fontFamily: 'Montserrat',
    fontSize: 20,
    color: '#fff',
    textAlign: 'left',
    marginTop: 10
  },
  upperLogo: {
    marginTop: -30,
    paddingTop: 0,
    top: 0,
    width: '100%',
    marginBottom: 0
  },
  actionButton: {
    alignSelf: 'center'
  },
  actionMiniButton: {
    top: 10,
    left: 8,
    alignItems: 'flex-start',
    width: 100,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
});

export default TrainerMainScreen;