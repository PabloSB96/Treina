import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, SafeAreaView, TextInput, Text, StyleSheet, Image, KeyboardAvoidingView, Alert, ActivityIndicator, FlatList, ListViewBase, Switch, TouchableOpacity, RefreshControl, Button } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import MytextinputPassword from './components/MytextinputPassword';

import logo from './assets/wave-general.png';
import noResultsLogo from './assets/icons/atopame_undraw_noresults.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MyActionButton from './components/MyActionButton';
import * as Clipboard from 'expo-clipboard';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InformationTab from './general-information-tabs/InformationTab';
import PhoneNumbersTab from './general-information-tabs/PhoneNumbersTab';
import AboutTab from './general-information-tabs/AboutTab';

const Drawer = createDrawerNavigator();

const db = DatabaseConnection.getConnection();

const baseUrl = 'http://192.168.8.104:3000';

function GeneralInformationFrame({ navigation, route }) {

  const Tab = createBottomTabNavigator();

  useEffect(() => {
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size }) => {
            let iconName;
            if (route.name == 'Info') {
              iconName = 'info';
            } else if (route.name == 'Teléfonos') {
              iconName = 'phone';
            } else {
              iconName = 'mobile';
            }
            let iconColor = '#aaa';
            if (focused) {
              iconColor = '#ffa726';
            }
            return <Icon style={styles.iconDrawer} name={iconName} size={20} color={iconColor}  />
          },
          tabBarLabelStyle: {
            fontSize: 14
          },
          tabBarActiveTintColor: '#ffa726',
          tabBarInactiveTintColor: '#aaa',
          headerShown: false
        })}
        >
        <Tab.Screen 
          name="Info" 
          component={InformationTab} 
          options={{
            headerTitle: 'Información'
          }}
          />
        <Tab.Screen 
          name="Teléfonos" 
          component={PhoneNumbersTab} />
        <Tab.Screen 
          name="Acerca de" 
          component={AboutTab} 
          options={{
            headerTitle: 'Acerca de'
          }}
          />
      </Tab.Navigator>
    </NavigationContainer>
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

export default GeneralInformationFrame;