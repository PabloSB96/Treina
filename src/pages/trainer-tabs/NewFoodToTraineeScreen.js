import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, SafeAreaView, TextInput, Text, StyleSheet, Image, KeyboardAvoidingView, Alert, ActivityIndicator, FlatList, ListViewBase, Switch, TouchableOpacity, Modal, Pressable } from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import Mytext from '../components/Mytext';
import Mytextbutton from '../components/Mytextbutton';
import MytextinputPassword from '../components/MytextinputPassword';
import { Platform } from 'expo-modules-core';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MyActionButton from '../components/MyActionButton';
import { Picker } from '@react-native-picker/picker';
import Mytextinputred from '../components/Mytextinputred';
import Checkbox from 'expo-checkbox';

import logoFood from '../assets/icons/treina_undraw_food.png';
import logoGym from '../assets/icons/treina_undraw_gym.png';

const baseUrl = 'http://192.168.8.102:8066';

const NewFoodToTraineeScreen = ({ navigation, route }) => {

  //let {userToken} = route.params;
  let [loading, setLoading] = useState(false);
  let [isEdition, setIsEdition] = useState(false);
  let [title, setTitle] = useState();
  let [description, setDescription] = useState();
  let [onMonday, setOnMonday] = useState(false);
  let [onTuesday, setOnTuesday] = useState(false);
  let [onWednesday, setOnWednesday] = useState(false);
  let [onThursday, setOnThursday] = useState(false);
  let [onFriday, setOnFriday] = useState(false);
  let [onSaturday, setOnSaturday] = useState(false);
  let [onSunday, setOnSunday] = useState(false);
  let [amount, setAmount] = useState();
  let [foodType, setFoodType] = useState();
  let [pickModalVisibility, setPickModalVisibility] = useState(false);
  let [foodList, setFoodList] = useState();
  let [foodListName, setFoodListName] = useState();

  useEffect(() => {
    setLoading(true);
    //setFoodList(getMyFoodListAux());
    getMyFoodList();
    if (route != undefined && route.params != undefined && route.params.food != undefined) {
      setIsEdition(true);
      selectFoodFromModal(route.params.food);
    }
  }, []);

  let getMyFoodListAux = () => {
    let obj1 = {
      id: 1,
      title: 'Comida 3',
      description: 'Description ñalk asdklfj añsdkf aklñsdf ñalskdjf ñaklds faklñ dsfasdf.',
      amount: '300 gr',
      foodType: 'comida',
      onMonday: true,
      onTuesday: true,
      onWednesday: true,
      onThursday: true,
      onFriday: true,
      onSaturday: true,
      onSunday: true
      // TODO
      // y luego implementar el layout de cada card, el dialogo con los detalles
    };
    let obj2 = {
      id: 2,
      title: 'Desayuno 2',
      description: '',
      amount: '300 gr',
      foodType: 'desayuno',
      onMonday: true,
      onTuesday: true,
      onWednesday: true,
      onThursday: true,
      onFriday: true,
      onSaturday: false,
      onSunday: false
    };
    let obj3 = {
      id: 3,
      title: 'Cena 3',
      description: '',
      amount: '300 gr',
      foodType: 'cena',
      onMonday: false,
      onTuesday: true,
      onWednesday: true,
      onThursday: false,
      onFriday: false,
      onSaturday: false,
      onSunday: true
    };
    var result = [];
    result.push(obj1);
    result.push(obj2);
    result.push(obj3);
    setLoading(false);
    return result;
  }

  let getMyFoodList = () => {
    axios.post(`${baseUrl}/trainer/data/food`, {}, {
      headers: {
        token: route.params.userToken
      }
    }).then((response) => {
      console.log("\n\n\nNewFoodToTraineeScreen - getMyFoodList - 1");
      console.log(response.data);
      console.log("NewFoodToTraineeScreen - getMyFoodList - 1\n\n\n");
      setFoodList(response.data);
      setLoading(false);
      return ;
    }).catch((error) => {
      setLoading(false);
      console.log("trainer - getMyTrainees - error - 1");
      console.log(error);
      console.log("trainer - getMyTrainees - error - 2");
      Alert.alert(
        'Atención',
        'Ha ocurrido un problema. Inténtelo más tarde o póngase en contacto con nuestro Soporte Técnico.',
        [{text: 'Ok'},],
        { cancelable: false }
      );
    });
  }

  let selectFoodFromModal = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setAmount(item.amount)
    setFoodType(item.FoodType.code);
    setOnMonday(item.onMonday);
    setOnTuesday(item.onTuesday);
    setOnWednesday(item.onWednesday);
    setOnThursday(item.onThursday);
    setOnFriday(item.onFriday);
    setOnSaturday(item.onSaturday);
    setOnSunday(item.onSunday);
  }

  let saveFood = () => {

    let url = undefined;
    let data = undefined;
    if (isEdition) {
      url = `${baseUrl}/trainer/trainees/` + route.params.userId + `/food/edit`;
      data = {
        id: route.params.food.id,
        title,
        description,
        onMonday,
        onTuesday,
        onWednesday,
        onThursday,
        onFriday,
        onSaturday,
        onSunday,
        foodType,
        amount
      };
    } else {
      url = `${baseUrl}/trainer/trainees/` + route.params.userId + `/food/new`;
      data = {
        title,
        description,
        onMonday,
        onTuesday,
        onWednesday,
        onThursday,
        onFriday,
        onSaturday,
        onSunday,
        foodType,
        amount
      };
    }

    axios.post(url, data, {
      headers: {
        token: route.params.userToken
      }
    }).then((response) => {
      setLoading(false);
      navigation.goBack(null);
      return ;
    }).catch((error) => {
      setLoading(false);
      console.log("trainer - getMyExerciceList - error - 1");
      console.log(error);
      console.log("trainer - getMyExerciceList - error - 2");
      Alert.alert(
        'Atención',
        'Ha ocurrido un problema. Inténtelo más tarde o póngase en contacto con nuestro Soporte Técnico.',
        [{text: 'Ok'},],
        { cancelable: false }
      );
    });
  }

  let foodListItemView = (item) => {
    return (
      <View
        key={item.id}
        style={{ backgroundColor: '#fff', borderColor: '#eee', borderRadius: 20, borderWidth: 1, marginTop: 10, padding: 16, borderRadius: 10, flex: 1, flexDirection: "row", shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 5, elevation: 3, shadowColor: '#222', }}>
        <View style={{flex: 1, margin: 0}}>
          <Text style={styles.boldText}>{item.title}</Text>
          <View style={{flex: 1}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={[styles.labelText, {flex: 1}]}>Cantidad</Text>
              <Text style={[styles.baseText, {flex: 1}]}>{item.amount}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={[styles.labelText, {flex: 1}]}>Tipo</Text>
              <Text style={[styles.baseText, {flex: 1}]}>{item.foodType}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={[styles.labelText, {flex: 1}]}>Días</Text>
              <Text style={[styles.baseText, {flex: 1}]}>
                <Text style={[styles.baseText, item.onMonday ? {color: '#d32f2f'} : {color: '#aaa'}]}>L </Text>
                <Text style={[styles.baseText, item.onTuesday ? {color: '#d32f2f'} : {color: '#aaa'}]}>M </Text>
                <Text style={[styles.baseText, item.onWednesday ? {color: '#d32f2f'} : {color: '#aaa'}]}>X </Text>
                <Text style={[styles.baseText, item.onThursday ? {color: '#d32f2f'} : {color: '#aaa'}]}>J </Text>
                <Text style={[styles.baseText, item.onFriday ? {color: '#d32f2f'} : {color: '#aaa'}]}>V </Text>
                <Text style={[styles.baseText, item.onSaturday ? {color: '#d32f2f'} : {color: '#aaa'}]}>S </Text>
                <Text style={[styles.baseText, item.onSunday ? {color: '#d32f2f'} : {color: '#aaa'}]}>D </Text>
              </Text>
            </View>
            <Mytextbutton
              estilos={{alignSelf: 'flex-end', margin: 0, padding: 0}} 
              title="Seleccionar"
              customClick={() => {selectFoodFromModal(item); setPickModalVisibility(false); setFoodListName('');}}
              />
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#d32f2f" />
        </View>
      ): null}
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView>
              <Image
                style={styles.upperLogo}
                source={logoGym}
              />
              
              <Mybutton
                text="Seleccionar de Datos"
                title="Seleccionar de Datos"
                estilos={{
                  marginTop: 10,
                  marginBottom: 10,
                }}
                customClick={() => setPickModalVisibility(true)}
              />

              <Modal
                visible={pickModalVisibility}
                transparent={true}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Mytextinputred
                        placeholder="Nombre de la comida"
                        style={{ padding: 10, minWidth: '100%' }}
                        estilos={{marginLeft: 10, marginRight: 10}}
                        onChangeText={
                          (foodListName) => setFoodListName(foodListName)
                        }
                      />
                      <FlatList
                        style={{marginTop: 0, marginBottom: 5,}}
                        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20, minWidth: '100%' }}
                        data={foodList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                          if (foodListName==undefined || item.title.toLowerCase().includes(foodListName.trim().toLowerCase())) {
                            return foodListItemView(item);
                          }
                          return null;
                        }}
                        />
                      <Pressable
                        style={[styles.modalButton, styles.modalButtonClose]}
                        onPress={() => {setPickModalVisibility(false); setFoodListName('');}}>
                        <Text style={styles.modalCloseText}>Cancelar</Text>
                      </Pressable>
                    </View>
                  </View>
              </Modal>

              <View><Text style={[styles.labelDay, {flex: 1, marginTop: 20}]}>Título</Text></View>
              <Mytextinputred
                placeholder="Título"
                style={{ padding: 10 }}
                estilos={{marginTop: 0, paddingTop: 0}}
                value={title}
                onChangeText={
                  (title) => setTitle(title)
                }
              />
              <View><Text style={[styles.labelDay, {flex: 1, marginTop: 5}]}>Descripción</Text></View>
              <Mytextinputred
                placeholder="Descripción"
                style={{ padding: 10 }}
                estilos={{marginTop: 0, paddingTop: 0}}
                multiline={true}
                value={description}
                onChangeText={
                  (description) => setDescription(description)
                }
              />
              <View><Text style={[styles.labelDay, {flex: 1, marginTop: 5}]}>Cantidad</Text></View>
              <Mytextinputred
                placeholder="Cantidad"
                style={{ padding: 10 }}
                estilos={{marginTop: 0, paddingTop: 0}}
                value={amount}
                onChangeText={
                  (amount) => setAmount(amount)
                }
              />
              <View><Text style={[styles.labelDay, {flex: 1, marginTop: 5}]}>Tipo de comida</Text></View>
              <View style={styles.selectorView}>
                <Picker
                  style={styles.selector}
                  selectedValue={foodType}
                  value={foodType}
                  onValueChange={(itemValue, itemIndex) =>
                    setFoodType(itemValue)
                  }
                  itemStyle={{color: '#000', backgroundColor: '#fff', borderRadius: 8}} >
                  <Picker.Item label="Selecciona el tipo de comida..." value="-" />
                  <Picker.Item label="Desayuno" value="desayuno" />
                  <Picker.Item label="Almuerzo" value="almuerzo" />
                  <Picker.Item label="Comida" value="comida" />
                  <Picker.Item label="Merienda" value="merienda" />
                  <Picker.Item label="Cena" value="cena" />
                  <Picker.Item label="Suplemento / Otros" value="suplemento" />
                </Picker>
              </View>
              <View><Text style={[styles.labelDay, {flex: 1, marginTop: 20}]}>Días</Text></View>
              <View 
                style={{flex: 1, flexDirection: 'row', margin: 5, marginLeft: 35, alignItems: 'center',}} 
                onTouchEnd={() => {setOnMonday(!onMonday)}}>
                <Checkbox
                  style={{backgroundColor: '#f00'}}
                  value={{onMonday}}
                  onValueChange={(value) => {
                    setOnMonday(!onMonday)
                  }}
                  color={onMonday ? '#d32f2f' : '#aaa'}
                />
                <Text 
                  style={{marginLeft: 10}}>Lunes</Text>
              </View>
              <View 
                style={{flex: 1, flexDirection: 'row', margin: 5, marginLeft: 35, alignItems: 'center',}} 
                onTouchEnd={() => {setOnTuesday(!onTuesday)}}>
                <Checkbox
                  style={{backgroundColor: '#f00'}}
                  value={{onTuesday}}
                  onValueChange={(value) => {
                    setOnTuesday(!onTuesday)
                  }}
                  color={onTuesday ? '#d32f2f' : '#aaa'}
                />
                <Text 
                  style={{marginLeft: 10}}>Martes</Text>
              </View>
              <View 
                style={{flex: 1, flexDirection: 'row', margin: 5, marginLeft: 35, alignItems: 'center',}} 
                onTouchEnd={() => {setOnWednesday(!onWednesday)}}>
                <Checkbox
                  style={{backgroundColor: '#f00'}}
                  value={{onWednesday}}
                  onValueChange={(value) => {
                    setOnWednesday(!onWednesday)
                  }}
                  color={onWednesday ? '#d32f2f' : '#aaa'}
                />
                <Text 
                  style={{marginLeft: 10}}>Miércoles</Text>
              </View>
              <View 
                style={{flex: 1, flexDirection: 'row', margin: 5, marginLeft: 35, alignItems: 'center',}} 
                onTouchEnd={() => {setOnThursday(!onThursday)}}>
                <Checkbox
                  style={{backgroundColor: '#f00'}}
                  value={{onThursday}}
                  onValueChange={(value) => {
                    setOnThursday(!onThursday)
                  }}
                  color={onThursday ? '#d32f2f' : '#aaa'}
                />
                <Text 
                  style={{marginLeft: 10}}>Jueves</Text>
              </View>
              <View 
                style={{flex: 1, flexDirection: 'row', margin: 5, marginLeft: 35, alignItems: 'center',}} 
                onTouchEnd={() => {setOnFriday(!onFriday)}}>
                <Checkbox
                  style={{backgroundColor: '#f00'}}
                  value={{onFriday}}
                  onValueChange={(value) => {
                    setOnFriday(!onFriday)
                  }}
                  color={onFriday ? '#d32f2f' : '#aaa'}
                />
                <Text 
                  style={{marginLeft: 10}}>Viernes</Text>
              </View>
              <View 
                style={{flex: 1, flexDirection: 'row', margin: 5, marginLeft: 35, alignItems: 'center',}} 
                onTouchEnd={() => {setOnSaturday(!onSaturday)}}>
                <Checkbox
                  style={{backgroundColor: '#f00'}}
                  value={{onSaturday}}
                  onValueChange={(value) => {
                    setOnSaturday(!onSaturday)
                  }}
                  color={onSaturday ? '#d32f2f' : '#aaa'}
                />
                <Text 
                  style={{marginLeft: 10}}>Sábado</Text>
              </View>
              <View 
                style={{flex: 1, flexDirection: 'row', margin: 5, marginLeft: 35, alignItems: 'center',}} 
                onTouchEnd={() => {setOnSunday(!onSunday)}}>
                <Checkbox
                  style={{backgroundColor: '#f00'}}
                  value={{onSunday}}
                  onValueChange={(value) => {
                    setOnSunday(!onSunday)
                  }}
                  color={onSunday ? '#d32f2f' : '#aaa'}
                />
                <Text 
                  style={{marginLeft: 10}}>Domingo</Text>
              </View>

              <Mybutton
                text="Guardar"
                title="Guardar"
                estilos={{
                  marginTop: 40,
                  marginBottom: 50
                }}
                customClick={() => saveFood()}
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
    color: '#000',
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
    marginTop: 20,
    paddingTop: 0,
    height: 150,
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 10
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
        marginTop: 0,
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
  labelDay: {
    marginLeft: 35,
    color: '#000',
    fontWeight: 'bold'
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
    padding: 10,
    paddingTop: 15,
    paddingBottom: 5,
    alignItems: 'flex-start',
    shadowOffset: {width: -2, height: 5}, 
    shadowOpacity: 1, 
    shadowRadius: 150, 
    elevation: 10, 
    shadowColor: '#000',
    ...Platform.select({
      android: {
        elevation: 50
      }
    })
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
    ...Platform.select({
      android: {
        elevation: 0
      }
    })
  },
  modalButtonClose: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 5
  },
  modalCloseText: {
    color: '#d32f2f',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
});

export default NewFoodToTraineeScreen;