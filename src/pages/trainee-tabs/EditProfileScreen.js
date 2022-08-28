import React, { useEffect, useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { View, SafeAreaView, StyleSheet, Image, Text, FlatList, Alert, Modal, Pressable, ActivityIndicator } from 'react-native';
import Mytext from '../components/Mytext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';

import noResultsLogo from '../assets/icons/treina_undraw_noresults.png';
import logoProfile from '../assets/icons/treina_undraw_profile.png';
import logoElementTarget from '../assets/icons/treina_undraw_profile_element_target.png';
import logoElementTargetFull from '../assets/icons/treina_undraw_profile_element_targetfull.png';
import logoElementPhisical from '../assets/icons/treina_undraw_profile_element_phisical.png';

import { useIsFocused } from '@react-navigation/native';
import Mytextbutton from '../components/Mytextbutton';
import Mybutton from '../components/Mybutton';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mytextinputred from '../components/Mytextinputred';

const baseUrl = 'http://192.168.8.102:8066';

const EditProfileScreen = ({ navigation, route }) => {

  let isFocused = useIsFocused();

  let [loading, setLoading] = useState(false);
  let [myProfile, setMyProfile] = useState();
  let [name, setName] = useState();
  let [sex, setSex] = useState();
  let [goal, setGoal] = useState();
  let [goalFull, setGoalFull] = useState();
  let [height, setHeight] = useState();
  let [weight, setWeight] = useState();
  let [userToken, setUserToken] = useState();

  useEffect(() => {
    setLoading(true);
    getMyProfileInfo();

  }, [isFocused]);

  let getMyProfileInfoAux = () => {
    let result = {
      id: 1,
      name: 'Pablo Sánchez',
      email: 'pablosanchez@gmail.com',
      sex: 'H',
      goal: 'Perder peso',
      goalFull: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumpeso.',
      height: 180,
      weight: 74
    };
    return result;
  }

  let getMyProfileInfo = () => {
    axios.post(`${baseUrl}/trainee/profile`, {}, {
      headers: {
        token: route.params.userToken
      }
    }).then((response) => {
      initProfileInfo(response.data);
      return ;
    }).catch((error) => {
      setLoading(false);
      console.log("ProfileTab - getMyProfileInfo - error - 1");
      console.log(error);
      console.log("ProfileTab - getMyProfileInfo - error - 2");
      Alert.alert(
        'Atención',
        'Ha ocurrido un problema. Inténtelo más tarde o póngase en contacto con nuestro Soporte Técnico.',
        [{text: 'Ok'},],
        { cancelable: false }
      );
    });
  }

  let initProfileInfo = (item) => {
    setName(item.name);
    setSex(item.sex);
    setGoal(item.goal);
    setGoalFull(item.goalFull);
    setHeight(item.height.toString());
    setWeight(item.weight.toString());
    setMyProfile(item);
    setLoading(false);
  }

  let saveProfile = () => {
    if (name == undefined || name.trim() == '' ||
        sex == undefined || sex.trim() == '' || (sex.trim() != 'X' && sex.trim() != 'M' && sex.trim() != 'H') ||
        goal == undefined || goal.trim() == '' ||
        goalFull == undefined || goalFull.trim() == '' ||
        height == undefined ||
        weight == undefined) {
      Alert.alert(
        'Atención',
        '¡Completa todos los campos!',
        [{text: 'Ok'},],
        { cancelable: false }
      );
      return ;
    }
    let heightNumber = undefined;
    let weightNumber = undefined;
    try {
      heightNumber = Number(height);
      weightNumber = Number(weight);
    } catch(e){
      Alert.alert(
        'Atención',
        '¡Completa todos los y revisa que sean correctos!',
        [{text: 'Ok'},],
        { cancelable: false }
      );
    }
    axios.post(`${baseUrl}/trainee/profile/edit`, {
      name,
      sex,
      goal,
      goalFull,
      height: heightNumber,
      weight: weightNumber
    }, {
      headers: {
        token: route.params.userToken
      }
    }).then((response) => {
      setLoading(false);
      navigation.goBack(null);
      return ;
    }).catch((error) => {
      setLoading(false);
      console.log("EditProfileScreen - saveExercice - error - 1");
      console.log(error);
      console.log("trainer - saveExercice - error - 2");
      Alert.alert(
        'Atención',
        'Ha ocurrido un problema. Inténtelo más tarde o póngase en contacto con nuestro Soporte Técnico.',
        [{text: 'Ok'},],
        { cancelable: false }
      );
    });
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
                  {((myProfile==undefined || myProfile.length == 0) && loading == false ) ? (
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
                        text="Todavía no tienes ningún ejercicio asignado." 
                        estilos={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#d32f2f',
                          textAlign: 'center',
                        }}/>
                    </View>
                  ): (
                    <View style={{paddingTop: 20}}>
                      <Image
                        style={styles.upperLogo}
                        source={logoProfile}
                      />
                      <View><Text style={[styles.emailText, {flex: 1}]}>{myProfile.email}</Text></View>
                      <View><Text style={[styles.labelDay, {flex: 1, marginTop: 10}]}>Nombre</Text></View>
                      <Mytextinputred
                        placeholder="Nombre"
                        style={{ padding: 10 }}
                        estilos={{marginTop: 0, paddingTop: 0}}
                        value={name}
                        onChangeText={
                          (name) => setName(name)
                        }
                      />
                      <View><Text style={[styles.labelDay, {flex: 1, marginTop: 10}]}>Sexo</Text></View>
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
                      <View><Text style={[styles.labelDay, {flex: 1, marginTop: 5}]}>Objetivo (resumen)</Text></View>
                      <Mytextinputred
                        placeholder="Objetivo (resumen)"
                        style={{ padding: 10 }}
                        estilos={{marginTop: 0, paddingTop: 0}}
                        multiline={true}
                        value={goal}
                        onChangeText={
                          (goal) => setGoal(goal)
                        }
                      />
                      <View><Text style={[styles.labelDay, {flex: 1, marginTop: 10}]}>Objectivo (completo)</Text></View>
                      <Mytextinputred
                        placeholder="Objetivo (completo)"
                        style={{ padding: 10 }}
                        estilos={{marginTop: 0, paddingTop: 0}}
                        multiline={true}
                        value={goalFull}
                        onChangeText={
                          (goalFull) => setGoalFull(goalFull)
                        }
                      />
                      <View><Text style={[styles.labelDay, {flex: 1, marginTop: 10}]}>Altura (cm)</Text></View>
                      <Mytextinputred
                        placeholder="Altura (cm)"
                        style={{ padding: 10 }}
                        estilos={{marginTop: 0, paddingTop: 0}}
                        keyboardType='numeric'
                        value={height}
                        onChangeText={
                          (height) => setHeight(height)
                        }
                      />
                      <View><Text style={[styles.labelDay, {flex: 1, marginTop: 10}]}>Peso (kg)</Text></View>
                      <Mytextinputred
                        placeholder="Peso (kg)"
                        style={{ padding: 10 }}
                        estilos={{marginTop: 0, paddingTop: 0}}
                        keyboardType="numeric"
                        value={weight}
                        onChangeText={
                          (weight) => setWeight(weight)
                        }
                      />
                      <Mybutton
                        text="Guardar"
                        title="Guardar"
                        estilos={{
                            marginTop: 40,
                            marginBottom: 50
                        }}
                        customClick={() => saveProfile()}
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
    marginLeft: 35,
    color: '#000',
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
    fontSize: 14
  },
  elementText: {
    color: '#aaa',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10
  },
});

export default EditProfileScreen;