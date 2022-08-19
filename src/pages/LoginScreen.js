import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, SafeAreaView, TextInput, Text, StyleSheet, Image, KeyboardAvoidingView, Alert, ActivityIndicator, Switch } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import MytextinputPassword from './components/MytextinputPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logoGymImage from './assets/login_gym.jpeg';
import logoTreina from './assets/icon.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const db = DatabaseConnection.getConnection();

const baseUrl = 'http://192.168.8.104:3000';

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    checkToken();
  }, []);

  let [loading, setLoading] = useState(true);
  let [isTrainer, setIsTrainer] = useState(false);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [trainerCode, setTrainerCode] = useState('');

  let checkToken = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem('treina.token');
      if (tokenValue != null && tokenValue != undefined) {
        navigation.replace('MainScreen', {userToken: tokenValue});
      } else {
        setLoading(false);
      }
    } catch(e) {
      console.log("asynstorage - 1");
      console.log(e);
      console.log("asynstorage - 2");
    }
  }

  let saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('treina.token', token);
    } catch(e){
      console.log("asynstorage - 1");
      console.log(e);
      console.log("asynstorage - 2");
    }

    setLoading(false);
    navigation.replace('MainScreen', {userToken: token});
  }

  let doLogin = () => {

    navigation.replace('TraineeMainScreen');

    // TODO quitar la siguiente linea y descomentar y completar
    //if (isTrainer) navigation.replace('TrainerMainScreen', {userToken: 'e.y.aadstdsftsdartasdrftasrdftadrftarsdtfarsdft'}); else navigation.replace('TraineeMainScreen', {userToken: 'e.y.aadstdsftsdartasdrftasrdftadrftarsdtfarsdft'}) ;
    setLoading(true);
    if (email == undefined || email.trim() == "" || 
      password == undefined || password.trim() == "" || (
        !isTrainer && (trainerCode == undefined || trainerCode.trim() == "")
      )) {
      setLoading(false);
      Alert.alert(
        'Error',
        '¡Completa todos los campos!',
        [{text: 'Ok'},],
        { cancelable: false }
      );
      return;
    }

    console.log("do login");

    // Call REST API Login
    axios.post(`${baseUrl}/login`, {
      isTrainer,
      email,
      password,
      trainerCode
    }).then((response) => {
      saveToken(response.data.token);
    }).catch((error) => {
      setLoading(false);
      if (error.response.data != undefined && error.response.data.message != undefined) {
        if(error.response.data.message == 'PASSWORD_INCORRECT') {
          Alert.alert(
            'Error',
            '¡La contraseña es incorrecta!',
            [{text: 'Ok'},],
            { cancelable: false }
          );
        }
      }
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View style={[styles.container, styles.horizontal, styles.loading]}>
          <ActivityIndicator size="large" color="#d32f2f" />
        </View>
      ): null}
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Image
              style={styles.gymImageLogo}
              source={logoGymImage}
            />
            <KeyboardAwareScrollView>
            <Image
              style={styles.upperLogo}
              source={logoTreina}
            />
            <View style={{flexDirection: 'row', flex: 1, marginLeft: 30, marginBottom: 10}}>
              <Switch
                style={{alignSelf: 'flex-start', marginRight: 10, transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]}}
                trackColor={{ false: '#000', true: '#fff' }}
                thumbColor={isTrainer ? '#9a0007' : '#000000'}
                ios_backgroundColor="#fff"
                value={isTrainer}
                onValueChange={(value) => {
                  setIsTrainer(value);
                }}
              />
              {isTrainer ? (
                <Text style={{fontStyle: 'normal',
                fontFamily: 'Montserrat',
                fontSize: 14,
                color: '#fff',
                textAlign: 'left',
                marginTop: 8}}>Soy entrenador</Text>
              ) : (
                <Text style={{fontStyle: 'normal',
                fontFamily: 'Montserrat',
                fontSize: 14,
                color: '#fff',
                textAlign: 'left',
                marginTop: 8}}>Soy cliente / deportista</Text>
              )}
            </View>
            {isTrainer ? (
              <View>
                <Mytextinput
                  placeholder="Email"
                  style={{ padding: 10, color: 'white' }}
                  onChangeText={
                    (email) => setEmail(email)
                  }
                />
                <MytextinputPassword
                  placeholder="Password"
                  style={{ padding: 10, color: 'white' }}
                  onChangeText={
                    (password) => setPassword(password)
                  }
                />
              </View>
            ) : (
              <View>
                <Mytextinput
                  placeholder="Email"
                  style={{ padding: 10, color: 'white' }}
                  onChangeText={
                    (email) => setEmail(email)
                  }
                />
                <MytextinputPassword
                  placeholder="Password"
                  style={{ padding: 10, color: 'white' }}
                  onChangeText={
                    (password) => setPassword(password)
                  }
                />
                <Mytextinput
                  placeholder="Código de entrenador"
                  style={{ padding: 10, color: 'white' }}
                  onChangeText={
                    (trainerCode) => setTrainerCode(trainerCode)
                  }
                />
              </View>
            )}

            <Mybutton
              text="Login"
              title="Login"
              customClick={doLogin}
            />

            <Text style={styles.boldText} onPress={() => {
              navigation.navigate('RegisterScreen');
            }} >¿No tienes cuenta? Regístrate</Text>

            </KeyboardAwareScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  loading: {
    backgroundColor: '#fff'
  },
  baseText: {
    fontWeight: 'bold'
  },
  boldText: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 30,
    marginRight: 36,
    color: '#fff'
  },
  upperLogo: {
    marginTop: 0,
    paddingTop: 0,
    top: 50,
    height: 150,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 90
  },
  gymImageLogo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: 0,
    padding: 0
  }
});

export default LoginScreen;