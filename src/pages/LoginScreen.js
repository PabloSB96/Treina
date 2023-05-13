import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, SafeAreaView, TextInput, Text, StyleSheet, Image, KeyboardAvoidingView, Alert, ActivityIndicator, Switch, Platform } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import MytextinputPassword from './components/MytextinputPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logoGymImage from './assets/login_gym.jpeg';
import logoTreina from './assets/icon.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { configuration } from './configuration';

import noResultsLogo from './assets/icons/treina_undraw_noresults.png';

import Purchases from 'react-native-purchases';

const db = DatabaseConnection.getConnection();

const LoginScreen = ({ navigation }) => {

  async function initPurchases() {
    if (Platform.OS === 'ios') {
      await Purchases.configure({apiKey: "appl_xSMnhmixZUKQTgtGGppNYkZQciO"});
    } else if (Platform.OS === 'android') {
      await Purchases.configure({apiKey: "goog_RocYJwqosMyIbsJQQggMOGURYBc"});
    }
  }

  useEffect(() => {
    checkConfig();
    //Purchases.setDebugLogsEnabled(true);
    initPurchases();
  }, []);

  let [loading, setLoading] = useState(true);
  let [isTrainer, setIsTrainer] = useState(false);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [showErrorPage, setShowErrorPage] = useState(false);
  let [errorPageText, setErrorPageText] = useState('');

  let checkConfig = () => {
    setLoading(true);
    axios.post(`${configuration.BASE_URL}/config`, {
      appVersion: configuration.APP_VERSION,
    }).then((response) => {
      checkToken();
    }).catch((error) => {
      if (error.response.data != undefined && error.response.data != undefined) {
        if(error.response.data == 'BAD_REQUEST') {
          setLoading(false);
          
          setErrorPageText("Ha ocurrido un problema. Intentalo de nuevo más tarde o ponte en contacto con nuestro soporte.");
          setShowErrorPage(true);
          
        } else if (error.response.data == 'INTERNAL_ERROR') {
          setLoading(false);    
          setErrorPageText("Ha ocurrido un problema. Por favor, comprueba que tengas la última versión de la aplicación instalada en tu dispositivo.");
          setShowErrorPage(true);
        }
      }
    });
  }

  let checkToken = async () => {
    console.log("LoginScreen - checkToken - 1");
    try {
      const tokenValue = await AsyncStorage.getItem('treina.token');
      const isTrainerAS = JSON.parse(await AsyncStorage.getItem('treina.isTrainer'));
      if (tokenValue != null && tokenValue != undefined && isTrainerAS != null && isTrainerAS != undefined) {
        console.log("LoginScreen - checkToken - 2");
        if (isTrainerAS) {
          console.log("LoginScreen - checkToken - 3");
          // check if user is in trial or needs to purchase something.
          axios.post(`${configuration.BASE_URL}/plan/check`, {}, {
            headers: {
              token: tokenValue
            }
          }).then(async (response) => {
            // check if he has a App Store valid subscription
            console.log("LoginScreen - checkToken - 4");
            if (response != undefined && response.data != undefined && response.data.message && response.data.message == 'TRIAL_ACTIVE') {
              navigation.replace('TrainerMainScreen', {userToken: tokenValue});
              return ;
            } else {
              const customerInfo = await Purchases.getCustomerInfo();
              if (customerInfo.entitlements.active[configuration.ENTITLEMENT_ID] == undefined) {
                console.log("LoginScreen - checkToken - 5");
                Alert.alert(
                  'Atención',
                  'Tu cuenta no está activada. A continuación puedes suscribirte a un plan para activarla y empezar a gestionar tus clientes.',
                  [{text: 'Ok'},],
                  { cancelable: false }
                );
                navigation.navigate('PaywallScreen', {email: email, trialAlreadyUsed: true});
                setLoading(false);
                return ;
              } else {
                console.log("LoginScreen - checkToken - 6");
                // El usuario tiene su suscripción activa, así que lo activamos a través de servicio para dejarle entrar.
                axios.post(`${configuration.BASE_URL}/plan/activate`, {
                  email: email
                }).then((response) => {
                  console.log("LoginScreen - checkToken - 7");
                  let standardProductTitle = '';
                  let standardProductPriceString = '';
                  switch (customerInfo.entitlements.active[configuration.ENTITLEMENT_ID].productIdentifier) {
                    case 'treina_10_1m_0w0':
                      standardProductTitle = 'Plan Básico (mensual)';
                      standardProductPriceString = '9,99 €/mes';
                      break;
                    case 'treina_15_1m_0w0':
                      standardProductTitle = 'Plan Premium (mensual)';
                      standardProductPriceString = '14,99 €/mes';
                      break;
                    case 'treina_30_1m_0w0':
                      standardProductTitle = 'Plan Empresarial (mensual)';
                      standardProductPriceString = '29,99 €/mes';
                      break;
                    case 'treina_100_1y_0w0':
                      standardProductTitle = 'Plan Básico (anual)';
                      standardProductPriceString = '99,99 €/mes';
                      break;
                    case 'treina_150_1y_0w0':
                      standardProductTitle = 'Plan Premium (anual)';
                      standardProductPriceString = '150,00 €/mes';
                      break;
                    case 'treina_300_1y_0w0':
                      standardProductTitle = 'Plan Empresarial (anual)';
                      standardProductPriceString = '300,00 €/mes';
                      break;
                  }
                  axios.post(`${configuration.BASE_URL}/plan/register`, {
                    email: email,
                    revenuecat: {
                      product: {
                        identifier: customerInfo.entitlements.active[configuration.ENTITLEMENT_ID].productIdentifier,
                        title: standardProductTitle,
                        priceString: standardProductPriceString,
                        customerInfoEntitlementsActivePro: customerInfo.entitlements.active[configuration.ENTITLEMENT_ID]
                      }
                    }
                  }).then((response) => {
                    // GO TO LOGIN
                    console.log("LoginScreen - checkToken - 8");
                    saveToken(response.data.token);
                    return ;
                  }).catch((error) => {
                    console.log("LoginScreen - checkToken - 9");
                    saveToken(response.data.token);
                    return ;
                  });
                }).catch((error) => {
                  console.log("LoginScreen - checkToken - 10");
                  console.log(error);
                  console.log("LoginScreen - checkToken - 11");
                  console.log(JSON.stringify(error));
                  console.log("LoginScreen - checkToken - 12");
                  Alert.alert(
                    'Atención',
                    'Ha ocurrido un problema. Inténtalo de nuevo más tarde o contáctanos en: treina.ayuda@gmail.com',
                    [{text: 'Ok'},],
                    { cancelable: false }
                  );
                });
              }
            }
          }).catch((error) => {
            console.log("LoginScreen - checkToken - 13");
            console.log(error);
            console.log("LoginScreen - checkToken - 14");
            console.log(JSON.stringify(error));
            console.log("LoginScreen - checkToken - 15");
            if (error.response.data != undefined && error.response.data.message != undefined) {
              console.log("LoginScreen - checkToken - 16");
              if(error.response.data.message == 'TRIAL_EXPIRED') {
                console.log("LoginScreen - checkToken - 17");
                Alert.alert(
                  'Atención',
                  'Su período de prueba ha expirado. Suscríbete a alguno de nuestros planes para poder iniciar sesión. En caso de que creas que ya tienes una suscripción activa, contacta con nosotros en: treina.ayuda@gmail.com',
                  [{text: 'Ok'},],
                  { cancelable: false }
                );
                navigation.navigate('PaywallScreen', {email: email, trialAlreadyUsed: true});
                setLoading(false);
                return ;
              } else {
                console.log("LoginScreen - checkToken - 18");
                // show alert
                Alert.alert(
                  'Atención',
                  'Ha ocurrido un problema. Inténtalo de nuevo más tarde o contáctanos en: treina.ayuda@gmail.com',
                  [{text: 'Ok'},],
                  { cancelable: false }
                );
                return ;
              }
            } else {
              console.log("LoginScreen - checkToken - 19");
              // show alert
              Alert.alert(
                'Atención',
                'Ha ocurrido un problema. Inténtalo de nuevo más tarde o contáctanos en: treina.ayuda@gmail.com',
                [{text: 'Ok'},],
                { cancelable: false }
              );
              return ;
            }
          });
        } else {
          console.log("LoginScreen - checkToken - 20");
          navigation.replace('TraineeMainScreen', {userToken: tokenValue});
        }
      } else {
        console.log("LoginScreen - checkToken - 21");
        setLoading(false);
      }
    } catch(e) {
      console.log("LoginScreen - checkToken - 22");
      console.log(e);
      console.log("LoginScreen - checkToken - 23");
      console.log(JSON.stringify(e));
      console.log("LoginScreen - checkToken - 24");
      setLoading(false);
    }
  }

  let saveToken = async (token) => {
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

  let doLogin = () => {
    setLoading(true);
    if (email == undefined || email.trim() == "" || 
      password == undefined || password.trim() == "") {
      setLoading(false);
      Alert.alert(
        'Atención',
        '¡Completa todos los campos!',
        [{text: 'Ok'},],
        { cancelable: false }
      );
      return;
    }

    // Call REST API Login
    axios.post(`${configuration.BASE_URL}/login`, {
      isTrainer,
      email: email.trim().toLowerCase(),
      password
    }).then(async (response) => {
      console.log("\n\n\nLoginScreen - 1");
      console.log(JSON.stringify(response));
      console.log("LoginScreen - 2\n\n\n");
      if (isTrainer) {
        let date2DaysInPastFromToday = new Date((new Date()).getTime() - 1000*60*60*24*2);
        console.log("LoginScreen - 3");
        console.log(response.data.isInTrial);
        console.log((new Date(response.data.trialStartDate)).getTime());
        console.log(date2DaysInPastFromToday.getTime());
        console.log(response.data.isInTrial == true);
        console.log((new Date(response.data.trialStartDate)).getTime() < date2DaysInPastFromToday.getTime());
        console.log("LoginScreen - 4");
        if (response != undefined && response.data != undefined && response.data.isInTrial != undefined && response.data.trialStartDate != undefined && response.data.isInTrial == true && (new Date(response.data.trialStartDate)).getTime() > date2DaysInPastFromToday.getTime()) {
          // user still in trial, so can log in
          console.log("LoginScreen - 4.1");
          saveToken(response.data.token);
          return ;
        } else {
          console.log("LoginScreen - 4.2");
          // user without plan or out of trial. Should purchase a suscription
          let customerInfo = await Purchases.getCustomerInfo();
          if (customerInfo != null && customerInfo.entitlements != null && customerInfo.entitlements.active[configuration.ENTITLEMENT_ID] != undefined) {
            let standardProductTitle = '';
            let standardProductPriceString = '';
            switch (customerInfo.entitlements.active[configuration.ENTITLEMENT_ID].productIdentifier) {
              case 'treina_10_1m_0w0':
                standardProductTitle = 'Plan Básico (mensual)';
                standardProductPriceString = '9,99 €/mes';
                break;
              case 'treina_15_1m_0w0':
                standardProductTitle = 'Plan Premium (mensual)';
                standardProductPriceString = '14,99 €/mes';
                break;
              case 'treina_30_1m_0w0':
                standardProductTitle = 'Plan Empresarial (mensual)';
                standardProductPriceString = '29,99 €/mes';
                break;
              case 'treina_100_1y_0w0':
                standardProductTitle = 'Plan Básico (anual)';
                standardProductPriceString = '99,99 €/mes';
                break;
              case 'treina_150_1y_0w0':
                standardProductTitle = 'Plan Premium (anual)';
                standardProductPriceString = '150,00 €/mes';
                break;
              case 'treina_300_1y_0w0':
                standardProductTitle = 'Plan Empresarial (anual)';
                standardProductPriceString = '300,00 €/mes';
                break;
            }
            let revenuecatDataObj = {
              product: {
                identifier: customerInfo.entitlements.active[configuration.ENTITLEMENT_ID].productIdentifier,
                title: standardProductTitle,
                priceString: standardProductPriceString,
                customerInfoEntitlementsActivePro: customerInfo.entitlements.active[configuration.ENTITLEMENT_ID]
              }
            };
            axios.post(`${configuration.BASE_URL}/plan/register`, {
              email: email,
              revenuecat: revenuecatDataObj
            }).then((response) => {
              // GO TO LOGIN
              saveToken(response.data.token);
              return ;
            }).catch((error) => {
              saveToken(response.data.token);
              return ;
            });
            
          } else {
            customerInfo = await Purchases.restorePurchases();
            if (customerInfo != null && customerInfo.entitlements != null && customerInfo.entitlements.active[configuration.ENTITLEMENT_ID] != undefined) {
              let standardProductTitle = '';
              let standardProductPriceString = '';
              switch (customerInfo.entitlements.active[configuration.ENTITLEMENT_ID].productIdentifier) {
                case 'treina_10_1m_0w0':
                  standardProductTitle = 'Plan Básico (mensual)';
                  standardProductPriceString = '9,99 €/mes';
                  break;
                case 'treina_15_1m_0w0':
                  standardProductTitle = 'Plan Premium (mensual)';
                  standardProductPriceString = '14,99 €/mes';
                  break;
                case 'treina_30_1m_0w0':
                  standardProductTitle = 'Plan Empresarial (mensual)';
                  standardProductPriceString = '29,99 €/mes';
                  break;
                case 'treina_100_1y_0w0':
                  standardProductTitle = 'Plan Básico (anual)';
                  standardProductPriceString = '99,99 €/mes';
                  break;
                case 'treina_150_1y_0w0':
                  standardProductTitle = 'Plan Premium (anual)';
                  standardProductPriceString = '150,00 €/mes';
                  break;
                case 'treina_300_1y_0w0':
                  standardProductTitle = 'Plan Empresarial (anual)';
                  standardProductPriceString = '300,00 €/mes';
                  break;
              }
              let revenuecatDataObj = {
                product: {
                  identifier: customerInfo.entitlements.active[configuration.ENTITLEMENT_ID].productIdentifier,
                  title: standardProductTitle,
                  priceString: standardProductPriceString,
                  customerInfoEntitlementsActivePro: customerInfo.entitlements.active[configuration.ENTITLEMENT_ID]
                }
              };
              axios.post(`${configuration.BASE_URL}/plan/register`, {
                email: email,
                revenuecat: revenuecatDataObj
              }).then((response) => {
                // GO TO LOGIN
                saveToken(response.data.token);
                return ;
              }).catch((error) => {
                saveToken(response.data.token);
                return ;
              });
            } else {
              Alert.alert(
                'Atención',
                'Hemos detectado que no tienes una suscripción activa. Suscríbete a alguno de nuestros planes para poder iniciar sesión. En caso de que creas que ya tienes una suscripción activa, contacta con nosotros en: treina.ayuda@gmail.com',
                [{text: 'Ok'},],
                { cancelable: false }
              );
              let trialAlreadyUsed = false;
              if (response != undefined && response.data != undefined && response.data.isInTrial != undefined) {
                trialAlreadyUsed = response.data.isInTrial;
              }
              navigation.navigate('PaywallScreen', {email: email, trialAlreadyUsed: trialAlreadyUsed});
              setLoading(false);
              return ;
            }
          }
        }
      } else {
        saveToken(response.data.token);
        return ;
      }
    }).catch(async (error) => {
      const customerInfo = await Purchases.getCustomerInfo();
      setLoading(false);
      if (error.response.data != undefined && error.response.data.message != undefined) {
        if(error.response.data.message == 'PASSWORD_INCORRECT') {
          Alert.alert(
            'Atención',
            '¡La contraseña es incorrecta!',
            [{text: 'Ok'},],
            { cancelable: false }
          );
        } else if (error.response.data.message == 'USER_NOT_EXISTS') {
          Alert.alert(
            'Atención',
            '¡El usuario no existe!',
            [{text: 'Ok'},],
            { cancelable: false }
          );          
        } else if (error.response.data.message == 'USER_NOT_ACTIVE') {
          if (typeof customerInfo.entitlements.active[configuration.ENTITLEMENT_ID] == undefined) {
            Alert.alert(
              'Atención',
              'Tu cuenta no está activada. A continuación puedes suscribirte a un plan para activarla y empezar a gestionar tus clientes.',
              [{text: 'Ok'},],
              { cancelable: false }
            );
            navigation.navigate('PaywallScreen', {email: email});
            setLoading(false);
            return ;
          } else {
            // El usuario tiene su suscripción activa, así que lo activamos a través de servicio para dejarle entrar.
            axios.post(`${configuration.BASE_URL}/plan/activate`, {
              email: email
            }).then((response) => {
              let standardProductTitle = '';
              let standardProductPriceString = '';
              switch (customerInfo.entitlements.active[configuration.ENTITLEMENT_ID].productIdentifier) {
                case 'treina_10_1m_0w0':
                  standardProductTitle = 'Plan Básico (mensual)';
                  standardProductPriceString = '9,99 €/mes';
                  break;
                case 'treina_15_1m_0w0':
                  standardProductTitle = 'Plan Premium (mensual)';
                  standardProductPriceString = '14,99 €/mes';
                  break;
                case 'treina_30_1m_0w0':
                  standardProductTitle = 'Plan Empresarial (mensual)';
                  standardProductPriceString = '29,99 €/mes';
                  break;
                case 'treina_100_1y_0w0':
                  standardProductTitle = 'Plan Básico (anual)';
                  standardProductPriceString = '99,99 €/mes';
                  break;
                case 'treina_150_1y_0w0':
                  standardProductTitle = 'Plan Premium (anual)';
                  standardProductPriceString = '150,00 €/mes';
                  break;
                case 'treina_300_1y_0w0':
                  standardProductTitle = 'Plan Empresarial (anual)';
                  standardProductPriceString = '300,00 €/mes';
                  break;
              }
              axios.post(`${configuration.BASE_URL}/plan/register`, {
                email: email,
                revenuecat: {
                  product: {
                    identifier: customerInfo.entitlements.active[configuration.ENTITLEMENT_ID].productIdentifier,
                    title: standardProductTitle,
                    priceString: standardProductPriceString,
                    customerInfoEntitlementsActivePro: customerInfo.entitlements.active[configuration.ENTITLEMENT_ID]
                  }
                }
              }).then((response) => {
                // GO TO LOGIN
                saveToken(response.data.token);
                return ;
              }).catch((error) => {
                saveToken(response.data.token);
                return ;
              });
            }).catch((error) => {
              Alert.alert(
                'Atención',
                'Ha ocurrido un problema. Inténtalo de nuevo más tarde o contáctanos en: treina.ayuda@gmail.com',
                [{text: 'Ok'},],
                { cancelable: false }
              );
            });
          }
          
        } else {
          Alert.alert(
            'Atención',
            'Ha ocurrido un problema. Inténtalo de nuevo más tarde o contáctanos en: treina.ayuda@gmail.com',
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
        { showErrorPage ? (
          <View style={{flex: 1}}>
            <View style={{flex: 1, maxHeight: 300, marginTop: 100}}>
              <Image
                source={noResultsLogo}
                style={{
                  flex: 1,
                  resizeMode: 'contain', 
                  width: '60%',
                  alignSelf: 'center'}}
              />
            </View>
            <Mytext 
              text={errorPageText} 
              estilos={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#d32f2f',
                textAlign: 'center',
              }}/>
          </View>
        ) : (
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
                  marginTop: 8, ...Platform.select({android: {marginTop: 16}})}}>Soy entrenador</Text>
                ) : (
                  <Text style={{fontStyle: 'normal',
                  fontFamily: 'Montserrat',
                  fontSize: 14,
                  color: '#fff',
                  textAlign: 'left',
                  marginTop: 8, ...Platform.select({android: {marginTop: 16}})}}>Soy cliente / deportista</Text>
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

              <Text style={styles.boldText} onPress={() => {
                navigation.navigate('ForgotPasswordScreen');
              }} >¿Has olvidado tu contraseña?</Text>

              </KeyboardAwareScrollView>
            </View>
          </View>
        )}
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