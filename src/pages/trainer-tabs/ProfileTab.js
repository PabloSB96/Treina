import React, { useEffect, useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { View, SafeAreaView, StyleSheet, Image, Text, FlatList, Alert, Modal, Pressable, ActivityIndicator } from 'react-native';
import Mytext from '../components/Mytext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Clipboard from 'expo-clipboard';
import Icon from 'react-native-vector-icons/FontAwesome';

import noResultsLogo from '../assets/icons/treina_undraw_noresults.png';
import logoProfile from '../assets/icons/treina_undraw_personaltraining.png';
import logoElementLogo from '../assets/icons/treina_undraw_profile_element_logo.png';
import logoElementCode from '../assets/icons/treina_undraw_profile_element_code.png';
import logoElementPhisical from '../assets/icons/treina_undraw_profile_element_phisical.png';

import { useIsFocused } from '@react-navigation/native';
import Mytextbutton from '../components/Mytextbutton';
import Mybutton from '../components/Mybutton';
import MyActionButton from '../components/MyActionButton';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { configuration } from '../configuration';
import Purchases from 'react-native-purchases';

const ProfileTab = ({ navigation, route }) => {

  let isFocused = useIsFocused();

  let [loading, setLoading] = useState(false);
  let [myProfile, setMyProfile] = useState();
  let [userToken, setUserToken] = useState();
  let [purchasesEnabled, setPurchasesEnabled] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon name='info-circle' style={{right: 20, top: 3}} size={25} color='#fff' onPress={() => {
          navigation.navigate('AboutScreen');
        }}  />
      )
    });
  }, [navigation]);

  useEffect(() => {
    setLoading(true);
    getMyProfileInfo();
    getConfig();
  }, [isFocused]);

  let getConfig = async () => {
    let purchases = await AsyncStorage.getItem(configuration.PURCHASES_ENABLED);
    setPurchasesEnabled(purchases);
  }

  let getMyProfileInfoAux = () => {
    let result = {
      id: 1,
      name: 'Pablo Sánchez',
      email: 'pablosancheztrainer@gmail.com',
      trainerCode: 'ABC1234',
      traineeNumber: 3,
      plan: 'BASICO'
    };
    setLoading(false);
    return result;
  }

  let getMyProfileInfo = async () => {
    const customerInfo = await Purchases.getCustomerInfo();
    let customerPurchase = null;
    if (customerInfo.entitlements.active[configuration.ENTITLEMENT_ID] != undefined) {
      customerPurchase = customerInfo.entitlements.active[configuration.ENTITLEMENT_ID];
    }
    axios.post(`${configuration.BASE_URL}/trainer/profile`, {
      revenuecat: customerPurchase
    }, {
      headers: {
        token: route.params.userToken
      }
    }).then((response) => {
      setLoading(false);
      setMyProfile(response.data);
      return ;
    }).catch((error) => {
      setLoading(false);
      Alert.alert(
        'Atención',
        'Ha ocurrido un problema. Inténtalo de nuevo más tarde o contáctanos en: treina.ayuda@gmail.com',
        [{text: 'Ok'},],
        { cancelable: false }
      );
    });
  }

  let deleteAccount = () => {
    axios.post(`${configuration.BASE_URL}/account/delete`, {}, {
      headers: {
        token: route.params.userToken
      }
    }).then(async (response) => {
      try {
        await AsyncStorage.removeItem('treina.token');
        await AsyncStorage.removeItem('treina.isTrainer');
      } catch(e){}
      navigation.replace('LoginScreen');
      return ;
    }).catch((error) => {
      setLoading(false);
      Alert.alert(
        'Atención',
        'Ha ocurrido un problema. Inténtalo de nuevo más tarde o contáctanos en: treina.ayuda@gmail.com',
        [{text: 'Ok'},],
        { cancelable: false }
      );
    });
  }

  let changeAccountPlan = () => {
    navigation.navigate('PaywallScreen', {email: myProfile.email, trialAlreadyUsed: true, changePlanAction: true});
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#d32f2f" />
          </View>
        ): (
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView nestedScrollEnabled={true}>
                  {(myProfile==undefined && loading == false ) ? (
                    <View style={{flex: 1}}>
                      <View style={{flex: 1, height: 300, marginTop: 40}}>
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
                        text="Todavía no tienes información de perfil." 
                        estilos={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#d32f2f',
                          textAlign: 'center',
                        }}/>
                    </View>
                  ): (
                    <View style={{padding: 20}}>
                      <Image
                        style={styles.upperLogo}
                        source={logoProfile}
                      />
                      <View><Text style={[styles.titleText, {flex: 1}]}>{myProfile.name}</Text></View>
                      <View><Text style={[styles.emailText, {flex: 1}]}>{myProfile.email}</Text></View>
                      <View style={{flex: 1, flexDirection: 'row', marginTop: 30}}>
                        <Image
                          style={{flex: 1, resizeMode: 'contain', width: '100%', height: 100,}}
                          source={logoElementCode}
                        />
                        <View style={{flex: 3, marginTop: 'auto', marginBottom: 'auto',}}>
                          <Text style={[styles.elementTitle, {}]}>Código de entrenador</Text>
                          <View style={{flexDirection: 'row', }}>
                            <Text style={[styles.elementText,{}]}>{myProfile.trainerCode}</Text>
                            <MyActionButton
                              iconColor='#d32f2f'
                              btnIcon="copy"
                              estilos={[styles.elementText, styles.actionMiniButton]}
                              iconSize={18}
                              customClick={() => {
                                Clipboard.setStringAsync(myProfile.trainerCode);
                              }}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Image
                          style={{flex: 1, resizeMode: 'contain', width: '100%', height: 100,}}
                          source={logoElementPhisical}
                        />
                        <View style={{flex: 3, marginTop: 'auto', marginBottom: 'auto'}}>
                          <Text style={[styles.elementTitle, {}]}>Número de clientes</Text>
                          <Text style={[styles.elementText,]}>{myProfile.traineeNumber}</Text>
                        </View>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row', marginBottom: 40}}>
                        <Image
                          style={{flex: 1, resizeMode: 'contain', width: '100%', height: 100,}}
                          source={logoElementLogo}
                        />
                        <View style={{flex: 3, marginTop: 'auto', marginBottom: 'auto'}}>
                          <Text style={[styles.elementTitle, {}]}>Plan de la cuenta</Text>
                          {myProfile.plan == undefined ? (
                            <View>
                              {myProfile.isInTrial ? (
                                <Text style={[styles.elementText,]}>Plan de prueba</Text>
                              ) : <View>
                                    {purchasesEnabled == 'false' ? (
                                      <Text style={[styles.elementText,]}>Plan gratuíto</Text>
                                    ) : null}
                                  </View>}
                            </View>
                          ) : (
                            <Text style={[styles.elementText,]}>{myProfile.plan.title}</Text>
                          )}
                        </View>
                      </View>

                      {purchasesEnabled != 'false' ? (
                        <Mybutton
                          text="Cambiar plan de la cuenta"
                          title="Cambiar plan de la cuenta"
                          estilos={{
                              marginBottom: 20
                          }}
                          customClick={async () => {
                            Alert.alert(
                              'Atención',
                              '¿Está seguro que deseas cambiar el plan de tu cuenta?',
                              [{text: 'Confirmar', onPress: () => {
                                changeAccountPlan();
                              }}, {text: 'Cancelar'}],
                              { cancelable: false }
                            );
                          }}
                        />
                      ) : null}

                      <Mybutton
                        text="Eliminar cuenta"
                        title="Eliminar cuenta"
                        estilos={{
                            marginTop: 10,
                            marginBottom: 20
                        }}
                        customClick={async () => {
                          Alert.alert(
                            'Atención',
                            '¿Está seguro que desea eliminar su cuenta? Se borrarán de forma permanente sus datos.',
                            [{text: 'Confirmar', onPress: () => {
                              deleteAccount();
                            }}, {text: 'Cancelar'}],
                            { cancelable: false }
                          );
                        }}
                      />

                      <Mybutton
                        text="Cerrar sesión"
                        title="Cerrar sesión"
                        estilos={{
                            marginTop: 10,
                            marginBottom: 50
                        }}
                        customClick={async () => {
                          try {
                            await AsyncStorage.removeItem('treina.token');
                            await AsyncStorage.removeItem('treina.isTrainer');
                          } catch(e){}
                          navigation.replace('LoginScreen');
                        }}
                      />
                    </View>
                  )}
                </KeyboardAwareScrollView>
              </View>
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
    backgroundColor: '#ffffff00',
    color: '#000'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  labelDay: {
    marginLeft: 20,
    color: '#d32f2f',
    fontWeight: 'bold'
  },
  baseText: {
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
    fontSize: 12
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    marginTop: 10
  },
  labelText: {
    color: '#000',
    textAlign: 'left',
    marginTop: 5,
    fontStyle: 'italic',
    fontSize: 12
  },
  upperLogo: {
    marginTop: 5,
    paddingTop: 0,
    height: 150,
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 10
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'center',
    height: 200,
    ...Platform.select({
      ios: {
        resizeMode: 'contain',
      }
    })
  },
  actionButton: {
    alignSelf: 'center'
  },
  actionMiniButton: {
    marginLeft: 10,
    alignItems: 'flex-start',
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
  selectorView: {
    alignItems: 'flex-start',
    color: '#ffa726',
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderColor: '#ffa726',
    borderWidth: 1,
    borderRadius: 10,
  },
  selector: {
    alignItems: 'flex-start',
    color: '#ffa726',
    width: '100%',
    padding: 0,
    margin: 0
  },
  textContainer: {
    fontSize: 18,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    paddingBottom: 20,
    alignItems: 'flex-start',
    shadowOffset: {width: -2, height: 5}, 
    shadowOpacity: 1, 
    shadowRadius: 150, 
    elevation: 10, 
    shadowColor: '#000'
  },
  modalTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
    minWidth: '95%'
  },
  modalSubtitle: {
    color: '#d32f2f',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5
  },
  modalText: {
    color: '#000',
    fontSize: 12
  },
  modalTextNothing: {
    color: '#000',
    fontSize: 12,
    fontStyle: 'italic'
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  modalButtonClose: {
    alignSelf: 'flex-end',
    marginTop: 10
  },
  modalCloseText: {
    color: '#d32f2f',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  itemListTitle : {
    color: '#d32f2f',
    fontWeight: 'bold'
  },
  titleText: {
    color: '#d32f2f',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 20
  },
  emailText: {
    color: '#d32f2f',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 12
  },
  elementTitle: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12
  },
  elementText: {
    color: '#aaa',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14
  },
});

export default ProfileTab;