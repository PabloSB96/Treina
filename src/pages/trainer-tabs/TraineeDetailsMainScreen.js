import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileTab from '../trainer-tabs/ProfileTab';
import TraineesTab from '../trainer-tabs/TraineesTab';
import DataTab from '../trainer-tabs/DataTab';
import TraineeDetailsInfoTab from './TraineeDetailsInfoTab';
import TraineeDetailsRutinasTab from './TraineeDetailsRutinasTab';
import TraineeDetailsDietTab from './TraineeDetailsDietTab';

const baseUrl = 'http://192.168.8.102:8066';

function TraineeDetailsMainScreen({ navigation, route }) {

  const Tab = createBottomTabNavigator();

  useEffect(() => {
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size }) => {
          let iconName;
          if (route.name == 'Detalles') {
            iconName = 'user';
          } else if (route.name == 'Rutinas') {
            iconName = 'bicycle';
          } else {
            iconName = 'coffee';
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
        name="Detalles" 
        component={TraineeDetailsInfoTab}
        initialParams={{userToken: route.params.userToken, userId: route.params.userId}}
        />
      <Tab.Screen 
        name="Rutinas" 
        component={TraineeDetailsRutinasTab} 
        initialParams={{userToken: route.params.userToken, userId: route.params.userId}}
        />
      <Tab.Screen 
        name="Dieta" 
        component={TraineeDetailsDietTab} 
        initialParams={{userToken: route.params.userToken, userId: route.params.userId}}
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

export default TraineeDetailsMainScreen;