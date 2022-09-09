import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, SafeAreaView, Text, StyleSheet, Image, Alert, ActivityIndicator, Switch } from 'react-native';
import Mytextinputred from './components/Mytextinputred';
import Mybutton from './components/Mybutton';
import MytextinputredPassword from './components/MytextinputredPassword';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MyDatePickerButton from './components/MyDatePickerButton';
import { Picker } from '@react-native-picker/picker';

import * as Application from 'expo-application';
import { Platform } from 'expo-modules-core';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logoTreina from './assets/icon.png';

import { configuration } from './configuration';

const ForgotPasswordScreen = ({ navigation }) => {
  let [loading, setLoading] = useState(false);
  let birthDateTitleInit = "Fecha de nacimiento: ";

  useEffect(() => {}, []);

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [repeatPassword, setRepeatPassword] = useState('');
  let [code, setCode] = useState('');
  let [step, setStep] = useState('step1-email');

  let doSend = () => {
    setLoading(true);
    if (step == 'step1-email') {
      if (email != undefined && email.trim() != '' ) {
        axios.post(`${configuration.BASE_URL}/forgotpassword/code`, {
          email: email.trim().toLowerCase()
        }).then((response) => {
          setLoading(false);
          setStep('step2-codeandpassword');
        }).catch((error) => {
          setLoading(false);
          if (error.response.data != undefined) {
            if(error.response.data == 'BAD_REQUEST') {
              Alert.alert(
                'Atención',
                'Asegurate de que el campo del email está cubierto.',
                [{text: 'Ok'},],
                { cancelable: false }
              );
            } else if (error.response.data == 'EMAIL_NOT_EXISTS') {
              Alert.alert(
                'Atención',
                'El email es incorrecto o no existe.',
                [{text: 'Ok'},],
                { cancelable: false }
              );          
            }
          }
        });
      } else {
        Alert.alert(
          'Atención',
          '¡Completa el campo del email!',
          [{text: 'Ok'},],
          { cancelable: false }
        );
        setLoading(false);
        return;
      }
    } else {
      if (code != undefined && code.trim() != '' && 
          password != undefined && password.trim() != '' && 
          repeatPassword != undefined && repeatPassword.trim() != '' ) {
        if (password.trim() == repeatPassword.trim()) {
          axios.post(`${configuration.BASE_URL}/forgotpassword/newpassword`, {
            email: email.trim().toLowerCase(),
            code,
            password,
            repeatPassword
          }).then((response) => {
            setLoading(false);
            Alert.alert(
              'Éxito',
              '¡Su contraseña ha sido modificada correctamente!',
              [{text: 'Ok'},],
              { cancelable: false }
            );
            navigation.goBack(null);
          }).catch((error) => {
            setLoading(false);
            if (error.response.data != undefined) {
              if(error.response.data == 'BAD_REQUEST') {
                Alert.alert(
                  'Atención',
                  'Asegurate de que los campos son correctos.',
                  [{text: 'Ok'},],
                  { cancelable: false }
                );
              } else if (error.response.data == 'EMAIL_NOT_EXISTS') {
                Alert.alert(
                  'Atención',
                  'El email es incorrecto o no existe.',
                  [{text: 'Ok'},],
                  { cancelable: false }
                );          
              } else if (error.response.data == 'CODE_NOT_VALID') {
                Alert.alert(
                  'Atención',
                  'El código no es válido o ha caducado.',
                  [{text: 'Ok'},],
                  { cancelable: false }
                );          
              }
            }
          });
        } else {
          Alert.alert(
            'Atención',
            '¡Las contraseñas deben ser iguales!',
            [{text: 'Ok'},],
            { cancelable: false }
          );
          setLoading(false);
          return;
        }
      } else {
        Alert.alert(
          'Atención',
          '¡Completa todos los campos!',
          [{text: 'Ok'},],
          { cancelable: false }
        );
        setLoading(false);
        return;
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#d32f2f" />
        </View>
      ): null}
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            
            <KeyboardAwareScrollView>
            <Image
              style={styles.upperLogo}
              source={logoTreina}
            />
            <View>
              {step == 'step1-email' ? (
                <View>
                  <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Email</Text></View>
                  <Mytextinputred
                    placeholder="Email"
                    style={{ padding: 10 }}
                    estilos={{marginTop: 0, paddingTop: 0}}
                    value={email}
                    onChangeText={
                      (email) => setEmail(email)
                    }
                  />
                  <Text style={styles.boldText}>Se enviará a este correo electrónico un código de seguridad a usar en el siguiente paso.</Text>
                </View>
              ) : (
                <View>
                  <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Email</Text></View>
                  <Mytextinputred
                    placeholder="Email"
                    style={{ padding: 10 }}
                    estilos={{marginTop: 0, paddingTop: 0}}
                    value={email}
                    editable={false}
                  />
                  <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Código de validación</Text></View>
                  <Mytextinputred
                    placeholder="Código de validación"
                    style={{ padding: 10 }}
                    estilos={{marginTop: 0, paddingTop: 0}}
                    value={code}
                    onChangeText={
                      (code) => setCode(code)
                    }
                  />
                  <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Nueva contraseña</Text></View>
                  <MytextinputredPassword
                    placeholder="Nueva contraseña"
                    style={{ padding: 10 }}
                    estilos={{marginTop: 0, paddingTop: 0}}
                    value={password}
                    onChangeText={
                      (password) => setPassword(password)
                    }
                  />
                  <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Repetir contraseña</Text></View>
                  <MytextinputredPassword
                    placeholder="Repetir contraseña"
                    style={{ padding: 10 }}
                    estilos={{marginTop: 0, paddingTop: 0}}
                    value={repeatPassword}
                    onChangeText={
                      (repeatPassword) => setRepeatPassword(repeatPassword)
                    }
                  />
                </View>
              )}
            </View>

            <Mybutton 
              text="Enviar"
              title="Enviar"
              estilos={{marginBottom: 50}}
              customClick={doSend}
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
  loading: {
    backgroundColor: '#fff'
  },
  baseText: {
    fontWeight: 'bold'
  },
  boldText: {
    fontSize: 12,
    marginTop: 10,
    padding: 40,
    paddingTop: 0,
    color: '#000'
  },
  labelInput: {
    marginLeft: 35,
    color: '#000',
    fontWeight: 'bold'
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
  },
  selectorView: {
    ...Platform.select({
      ios: {
        color: '#fff',
        marginTop: 0,
        marginLeft: 35,
        marginRight: 35,
        borderColor: '#d32f2f',
        borderWidth: 1,
        borderRadius: 10,
      },
      android: {
        alignItems: 'flex-start',
        color: '#fff',
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        borderColor: '#d32f2f',
        borderWidth: 1,
        borderRadius: 10,
      }
    })
  },
  selector: {
    color: '#000',
    ...Platform.select({
      android: {
        alignItems: 'flex-start',
        color: '#000',
        width: '100%',
        padding: 0,
        margin: 0
      }
    })
  },
});

export default ForgotPasswordScreen;