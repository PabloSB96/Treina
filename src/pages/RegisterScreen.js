import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, SafeAreaView, TextInput, Text, StyleSheet, Image, KeyboardAvoidingView, Alert, ActivityIndicator, Switch } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import Mytextinputred from './components/Mytextinputred';
import Mytext from './components/Mytext';
import Mybutton from './components/Mybutton';
import MytextinputredPassword from './components/MytextinputredPassword';

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
import Purchases from 'react-native-purchases';

import logoTreina from './assets/icon.png';
import logoGymImage from './assets/login_gym.jpeg';

import { configuration } from './configuration';

const db = DatabaseConnection.getConnection();

const RegisterScreen = ({ navigation }) => {
  let [loading, setLoading] = useState(false);
  let birthDateTitleInit = "Fecha de nacimiento: ";

  useEffect(() => {}, []);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  async function initPurchases() {
    setLoading(false);
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      if (customerInfo.entitlements.active[configuration.ENTITLEMENT_ID] != undefined) {
        Alert.alert('Detalles de su cuenta', 'Su cuenta está activada correctamente. A continuación inicia sesión y ¡empieza a gestionar tus clientes!');
        navigation.replace('LoginScreen');
        return ;
      } else {
        navigation.navigate('PaywallScreen', {email: email});
      }
    } catch (e) {
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    birthDate = (new Date(date)).getTime();
    setBirthDate(birthDate);
    setBirthDateTitle(birthDateTitleInit + (new Date(birthDate)).toLocaleDateString());
    hideDatePicker();
  };

  let [isTrainer, setIsTrainer] = useState(false);
  let [trainerCode, setTrainerCode] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [repeatPassword, setRepeatPassword] = useState('');
  let [sex, setSex] = useState('');
  let [birthDate, setBirthDate] = useState(null);
  let [birthDateTitle, setBirthDateTitle] = useState('Fecha de nacimiento');
  let [name, setName] = useState('');
  let [height, setHeight] = useState();
  let [weight, setWeight] = useState();
  let [goal, setGoal] = useState();
  let [goalFull, setGoalFull] = useState();

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

  let saveToken = async (token, isTrainer) => {
    try {
      await AsyncStorage.setItem('treina.token', token);
      await AsyncStorage.setItem('treina.isTrainer', JSON.stringify(isTrainer));
    } catch(e){ }

    setLoading(false);
    if (isTrainer) {
      navigation.replace('TrainerMainScreen', {userToken: token});
    } else {
      navigation.replace('TraineeMainScreen', {userToken: token});
    }
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
        name == undefined || name.trim() == "" ||
        isTrainer == undefined || 
        (!isTrainer && (
          sex == undefined || sex.trim() == "" || sex.trim() == "-" ||
          birthDate == undefined || 
          goal == undefined || goal.trim() == "" ||
          goalFull == undefined || goalFull.trim() == "" ||
          height == undefined ||
          weight == undefined || 
          trainerCode == undefined
        ))
        ) {
        setLoading(false);
        Alert.alert(
          'Atención',
          '¡Completa todos los campos!',
          [{text: 'Ok'},],
          { cancelable: false }
        );
        return;
      }
      if (password.trim() != repeatPassword.trim()) {
        setLoading(false);
        Alert.alert(
          'Atención',
          '¡Las contraseñas no coinciden!',
          [{text: 'Ok'},],
          { cancelable: false }
        );
        return ;
      }

      if (!isTrainer && birthDate > ((new Date()).getTime())) {
        setLoading(false);
        Alert.alert(
          'Atención',
          '¡Fecha de nacimiento incorrecta!',
          [{text: 'Ok'},],
          { cancelable: false }
        );
        return ;
      }

      let heightNumber = undefined;
      let weightNumber = undefined;
      if (!isTrainer) {
        try {
          heightNumber = Number(height.replace(',', '.'));
          weightNumber = Number(weight.replace(',', '.'));
        } catch(e){
          Alert.alert(
            'Atención',
            '¡Completa todos los y revisa que sean correctos!',
            [{text: 'Ok'},],
            { cancelable: false }
          );
        }
      }
      console.log("\n\n\nRegisterScreen - 1");
      // Call REST API Register
      axios.post(`${configuration.BASE_URL}/register`, {
        isTrainer,
        email: email.trim().toLowerCase(),
        password,
        repeatPassword,
        name,
        deviceId,
        sex,
        birthDate,
        goal,
        goalFull,
        height: heightNumber,
        weight: weightNumber,
        trainerCode
      }).then((response) => {
        console.log("RegisterScreen - 2");
        if (isTrainer) {
          initPurchases();
        } else {
          saveToken(response.data.token, isTrainer);
        }
      }).catch((error) => {
        console.log("RegisterScreen - 3");
        console.log(JSON.stringify(error));
        console.log("RegisterScreen - 4");
        setLoading(false);
        if (error.response.data != undefined && error.response.data.message != undefined) {
          if (error.response.data.message == 'TRAINER_CODE_NOT_EXISTS') {
            Alert.alert(
              'Atención',
              'El código de entrenador no es correcto.',
              [{text: 'Ok'},],
              { cancelable: false }
            );
            return ;
          } else if (error.response.data.message == 'USER_NOT_ACTIVE') {
            /*Alert.alert(
              'Atención',
              'Te has registrado como entrenador/a correctamente. Recuerda que para activar tu cuenta debes ponerte en contacto con nosotros en: treina.ayuda@gmail.com',
              [{text: 'Ok'},],
              { cancelable: false }
            );
            navigation.goBack(null);*/
            setLoading(false);
            initPurchases();
            return ;
          } else if (error.response.data.message == 'NOT_ABLE_TO_GENERATE_CODE') { 
            Alert.alert(
              'Atención',
              'No hemos podido generar un código de entrenador para ti. Por favor, espera unos minutos e inténtalo de nuevo. En caso de que el problema persista, ponte en contacto con nuestro soporte técnico en: treina.ayuda@gmail.com',
              [{text: 'Ok'},],
              { cancelable: false }
            );
            return ;
          } else if (error.response.data.message == 'USER_ALREADY_EXISTS') {
            setLoading(false);
            Alert.alert('Atención', '¡Este email ya está en uso! Comprueba que es correcto o ve atrás e inicia sesión');
            return ;
          } else {
            Alert.alert(
              'Atención',
              'Comprueba de nuevo todos los campos o inténtalo más tarde. Si el problema persiste contáctanos en: treina.ayuda@gmail.com',
              [{text: 'Ok'},],
              { cancelable: false }
            );
            return ;
          }
        }
      });
    });
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
            <View style={{flexDirection: 'row', flex: 1, marginLeft: 30, marginBottom: 10}}>
              <Switch
                style={{alignSelf: 'flex-start', marginRight: 10, transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]}}
                trackColor={{ false: '#000', true: '#ccc' }}
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
                color: '#000',
                textAlign: 'left',
                marginTop: 8, ...Platform.select({android: {marginTop: 14}})}}>Soy entrenador</Text>
              ) : (
                <Text style={{fontStyle: 'normal',
                fontFamily: 'Montserrat',
                fontSize: 14,
                color: '#000',
                textAlign: 'left',
                marginTop: 8, ...Platform.select({android: {marginTop: 14}})}}>Soy cliente / deportista</Text>
              )}
            </View>
            {isTrainer ? (
              <View>
                <Mytextinputred
                  placeholder="Email"
                  style={{ padding: 10 }}
                  onChangeText={
                    (email) => setEmail(email)
                  }
                />
                <MytextinputredPassword
                  placeholder="Password"
                  style={{ padding: 10 }}
                  onChangeText={
                    (password) => setPassword(password)
                  }
                />
                <MytextinputredPassword
                  placeholder="Repeat password"
                  style={{ padding: 10 }}
                  onChangeText={
                    (repeatPassword) => setRepeatPassword(repeatPassword)
                  }
                />
                <Mytextinputred
                  placeholder="Nombre"
                  style={{ padding: 10 }}
                  onChangeText={
                    (name) => setName(name)
                  }
                />
              </View>
            ) : (
              <View>
                <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Email</Text></View>
                <Mytextinputred
                  placeholder="Email"
                  style={{ padding: 10 }}
                  estilos={{marginTop: 0, paddingTop: 0}}
                  onChangeText={
                    (email) => setEmail(email)
                  }
                />
                <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Contraseña</Text></View>
                <MytextinputredPassword
                  placeholder="Contraseña"
                  style={{ padding: 10 }}
                  estilos={{marginTop: 0, paddingTop: 0}}
                  onChangeText={
                    (password) => setPassword(password)
                  }
                />
                <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Repetir contraseña</Text></View>
                <MytextinputredPassword
                  placeholder="Repetir contraseña"
                  style={{ padding: 10 }}
                  estilos={{marginTop: 0, paddingTop: 0}}
                  onChangeText={
                    (repeatPassword) => setRepeatPassword(repeatPassword)
                  }
                />
                <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Fecha de nacimiento</Text></View>
                <MyDatePickerButton customClick={showDatePicker} title={birthDateTitle}
                  estilos={{marginTop: 0, paddingTop: 0}}
                />            
                <DateTimePicker
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  accentColor='#fff'
                  locale='es_ES'
                />
                <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Sexo</Text></View>
                <View style={styles.selectorView}>
                  <Picker
                    style={styles.selector}
                    selectedValue={sex}
                    onValueChange={(itemValue, itemIndex) =>
                      setSex(itemValue)
                    }
                    itemStyle={{color: '#000', backgroundColor: '#fff', borderRadius: 8}} >
                    <Picker.Item label="Selecciona tu sexo..." value="-" />
                    <Picker.Item label="Hombre" value="H" />
                    <Picker.Item label="Mujer" value="M" />
                    <Picker.Item label="Otro/a" value="X" />
                  </Picker>
                </View>
                <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Nombre</Text></View>
                <Mytextinputred
                  placeholder="Nombre"
                  style={{ padding: 10 }}
                  estilos={{marginTop: 0, paddingTop: 0}}
                  onChangeText={
                    (name) => setName(name)
                  }
                />
                <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Altura (cm)</Text></View>
                <Mytextinputred
                  placeholder="Altura (cm)"
                  style={{ padding: 10 }}
                  estilos={{marginTop: 0, paddingTop: 0}}
                  keyboardType="numeric"
                  onChangeText={
                    (height) => setHeight(height)
                  }
                />
                <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Peso (kg)</Text></View>
                <Mytextinputred
                  placeholder="Peso (kg)"
                  style={{ padding: 10 }}
                  estilos={{marginTop: 0, paddingTop: 0}}
                  keyboardType="numeric"
                  onChangeText={
                    (weight) => setWeight(weight)
                  }
                />
                <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Objetivo (resumen)</Text></View>
                <Mytextinputred
                  placeholder="Objetivo (resumen)"
                  style={{ padding: 10 }}
                  estilos={{marginTop: 0, paddingTop: 0}}
                  multiline={true}
                  onChangeText={
                    (goal) => setGoal(goal)
                  }
                />
                <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Objetivo (completo)</Text></View>
                <Mytextinputred
                  placeholder="Objetivo (completo)"
                  style={{ padding: 10 }}
                  estilos={{marginTop: 0, paddingTop: 0}}
                  multiline={true}
                  onChangeText={
                    (goalFull) => setGoalFull(goalFull)
                  }
                />
                <View><Text style={[styles.labelInput, {flex: 1, marginTop: 10}]}>Código de entrenador</Text></View>
                <Mytextinputred
                  placeholder="Código de entrenador"
                  style={{ padding: 10 }}
                  estilos={{marginTop: 0, paddingTop: 0}}
                  onChangeText={
                    (trainerCode) => setTrainerCode(trainerCode)
                  }
                />
              </View>
            )}

            <Mybutton 
              text="Registrarse"
              title="Registrarse"
              estilos={{marginBottom: 50}}
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

export default RegisterScreen;