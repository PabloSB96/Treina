import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, SafeAreaView, TextInput, Text, StyleSheet, Image, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import Mytextinput from './components/Mytextinput';
import Mytext from './components/Mytext';
import Mybutton from './components/Mybutton';
import MytextinputPassword from './components/MytextinputPassword';

import logo from './assets/wave-login.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MyDatePickerButton from './components/MyDatePickerButton';
import { Picker } from '@react-native-picker/picker';

import * as Application from 'expo-application';
import { Platform } from 'expo-modules-core';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = DatabaseConnection.getConnection();

const baseUrl = 'http://192.168.8.104:3000';

const RegisterScreen = ({ navigation }) => {
  let [loading, setLoading] = useState(false);
  let birthDateTitleInit = "Fecha de nacimiento: ";

  useEffect(() => {}, []);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("handleConfirm - 1");
    birthDate = (new Date(date)).getTime()
    setBirthDate(birthDate);
    console.log("handleConfirm - 2");
    console.log(birthDate);
    console.log("handleConfirm - 3");
    setBirthDateTitle(birthDateTitleInit + (new Date(birthDate)).toLocaleDateString());
    console.log("handleConfirm - 4");
    hideDatePicker();
    console.log("handleConfirm - 5");
  };

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [repeatPassword, setRepeatPassword] = useState('');
  let [sex, setSex] = useState('');
  let [birthDate, setBirthDate] = useState(null);
  let [birthDateTitle, setBirthDateTitle] = useState('Fecha de nacimiento');
  let [name, setName] = useState('');

  const getDeviceId = async () => {
    if (Platform.OS === 'android') {
      return Application.androidId;
    } else {
      let deviceId = await SecureStore.getItemAsync('deviceId');
  
      if (!deviceId) {
        deviceId = Constants.deviceId; //or generate uuid
        if (deviceId != undefined) {
          await SecureStore.setItemAsync('deviceId', deviceId.toString());
        } else {
          deviceId = "0000-0000-0000-0000";
        }
      }
  
      return deviceId;
    }
  }

  let saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('atopame.token', token);
    } catch(e){
      console.log("asynstorage - 1");
      console.log(e);
      console.log("asynstorage - 2");
    }

    setLoading(false);
    navigation.replace('MainScreen', {userToken: token});
  }

  let doRegister = () => {

    setLoading(true);

    // Check device ID
    let deviceId = null;

    getDeviceId().then((result) => {
      deviceId = result;

      // Check if values are correct
      if (email == undefined || email.trim() == "" || 
        password == undefined || password.trim() == "" || 
        repeatPassword == undefined || repeatPassword.trim() == "" || 
        sex == undefined || sex.trim() == "" || sex.trim() == "-" ||
        birthDate == undefined ||
        name == undefined || name.trim() == "") {
        
        setLoading(false);
        Alert.alert(
          'Error',
          '¡Completa todos los campos!',
          [{text: 'Ok'},],
          { cancelable: false }
        );
        return;
      }
      if (password.trim() != repeatPassword.trim()) {
        setLoading(false);
        Alert.alert(
          'Error',
          '¡Las contraseñas no coinciden!',
          [{text: 'Ok'},],
          { cancelable: false }
        );
      }
      if (birthDate < (new Date).getDate()) {
        setLoading(false);
        Alert.alert(
          'Error',
          '¡Fecha de nacimiento incorrecta!',
          [{text: 'Ok'},],
          { cancelable: false }
        );
      }

      console.log("go-to-post - 1");
      console.log(birthDate);
      console.log("go-to-post - 2");

      // Call REST API Register
      axios.post(`${baseUrl}/register`, {
        email,
        password,
        repeatPassword,
        sex,
        birthDate,
        name,
        deviceId
      }).then((response) => {
        saveToken(response.data.token);
      }).catch((error) => {
        setLoading(false);
        console.log("Register - App - 1");
        console.log(error);
        console.log("Register - App - 2");
        console.log(JSON.stringify(error));
        console.log("Register - App - 3");
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
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
      
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ffa726" />
        </View>
      ): null}
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView>
            <Image
              style={styles.upperLogo}
              source={logo}
            />
            <Mytextinput
              placeholder="Email"
              style={{ padding: 10 }}
              onChangeText={
                (email) => setEmail(email)
              }
            />
            <MytextinputPassword
              placeholder="Password"
              style={{ padding: 10 }}
              onChangeText={
                (password) => setPassword(password)
              }
            />
            <MytextinputPassword
              placeholder="Repeat password"
              style={{ padding: 10 }}
              onChangeText={
                (repeatPassword) => setRepeatPassword(repeatPassword)
              }
            />
            <MyDatePickerButton customClick={showDatePicker} title={birthDateTitle}
            />            
            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              accentColor='#ffa726'
              locale='es_ES'
            />
            { Platform.OS == 'ios' ? (
              <Mytext
                text="Sexo"
                estilos={{fontSize: 14, marginBottom: -16, color: '#ffa726'}}
               />
            )  : null}
            <View style={styles.selectorView}>
              <Picker
                style={styles.selector}
                selectedValue={sex}
                onValueChange={(itemValue, itemIndex) =>
                  setSex(itemValue)
                }>
                <Picker.Item label="Selecciona tu sexo..." value="-" />
                <Picker.Item label="Hombre" value="H" />
                <Picker.Item label="Mujer" value="M" />
                <Picker.Item label="Otro/a" value="X" />
              </Picker>
            </View>
            <Mytextinput
              placeholder="Nombre"
              style={{ padding: 10 }}
              onChangeText={
                (name) => setName(name)
              }
            />

            <Mybutton 
              estilos={{marginBottom: 30}}
              text="Registrarse"
              title="Registrarse"
              customClick={doRegister}
            />

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
  baseText: {
    fontWeight: 'bold'
  },
  boldText: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 30,
    marginRight: 36
  },
  upperLogo: {
    marginTop: -40,
    paddingTop: 0,
    top: 0,
    width: '100%',
    marginBottom: 30
  },
  selectorView: {
    ...Platform.select({
      ios: {
        color: '#ffa726',
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        borderColor: '#ffa726',
        borderWidth: 1,
        borderRadius: 10,
      },
      android: {
        alignItems: 'flex-start',
        color: '#ffa726',
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        borderColor: '#ffa726',
        borderWidth: 1,
        borderRadius: 10,
      }
    })
  },
  selector: {
    ...Platform.select({
      android: {
        alignItems: 'flex-start',
        color: '#ffa726',
        width: '10%',
        padding: 0,
        margin: 0
      }
    })
  },
});

export default RegisterScreen;