import React, { useEffect, useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { Button, View, SafeAreaView, StyleSheet, Image, Text, FlatList, Alert, Modal, Pressable, ActivityIndicator, TouchableOpacity, Switch } from 'react-native';
import Mytext from '../components/Mytext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import noResultsLogo from '../assets/icons/treina_undraw_noresults.png';

import { useIsFocused } from '@react-navigation/native';
import Mytextbutton from '../components/Mytextbutton';

import { configuration } from '../configuration';

const TraineeDetailsDietTab = ({ navigation, route }) => {

  let isFocused = useIsFocused();

  let [loading, setLoading] = useState(false);
  let [showFood, setShowFood] = useState(false);
  let [foodList, setFoodList] = useState();
  let [userToken, setUserToken] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon name='question-circle' style={{right: 20, top: 3}} size={25} color='#fff' onPress={() => {
          Alert.alert(
            'Ayuda',
            'En esta pantalla puedes crear o editar tus ejercicios y comidas de los que dispondrás a la hora de asignarselos a uno de tus clientes. Pulsa en el botón + para añadir un nuevo ejercicio o comida.',
            [{text: 'Ok'},],
            { cancelable: false }
          );
        }}  />
      )
    });
  }, [navigation]);

  useEffect(() => {
    setLoading(true);
    getMyFoodList();
  }, [isFocused]);

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
    axios.post(`${configuration.BASE_URL}/trainer/trainees/` + route.params.userId + `/food`, {}, {
      headers: {
        token: route.params.userToken
      }
    }).then((response) => {
      setFoodList(response.data);
      setLoading(false);
      return ;
    }).catch((error) => {
      setLoading(false);
      console.log("trainer - getMyFoodList - error - 1");
      console.log(error);
      console.log("trainer - getMyFoodList - error - 2");
      Alert.alert(
        'Atención',
        'Ha ocurrido un problema. Inténtelo más tarde o póngase en contacto con nuestro Soporte Técnico.',
        [{text: 'Ok'},],
        { cancelable: false }
      );
    });
  }

  let deleteFood = (item) => {
    axios.post(`${configuration.BASE_URL}/trainer/trainees/` + route.params.userId + `/food/delete`, {
      id: item.id
    }, {
      headers: {
        token: route.params.userToken
      }
    }).then((response) => {
      const indexOfObject = foodList.findIndex((object) => {
        return object.id === item.id;
      });
      let foodListCopy = JSON.parse(JSON.stringify(foodList));
      foodListCopy.splice(indexOfObject, 1);
      setFoodList(foodListCopy);
      setLoading(false);
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
        key={item.producto_id}
        style={{ backgroundColor: '#fff', borderColor: '#eee', borderRadius: 20, borderWidth: 1, marginTop: 10, padding: 16, borderRadius: 10, flex: 3, flexDirection: "row", shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 5, elevation: 3, shadowColor: '#222', }}>
        <View style={{flex: 3, margin: 0}}>
          <Text style={styles.boldText}>{item.title}</Text>
          <View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={[styles.labelText, {flex: 1}]}>Cantidad</Text>
              <Text style={[styles.baseText, {flex: 1}]}>{item.amount}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={[styles.labelText, {flex: 1}]}>Tipo</Text>
              {item.FoodType.code == 'desayuno' ? (
                <Text style={[styles.baseText, {flex: 1}]}>Desayuno</Text>
              ) : null}
              {item.FoodType.code == 'almuerzo' ? (
                <Text style={[styles.baseText, {flex: 1}]}>Almuerzo</Text>
              ) : null}
              {item.FoodType.code == 'comida' ? (
                <Text style={[styles.baseText, {flex: 1}]}>Comida</Text>
              ) : null}
              {item.FoodType.code == 'merienda' ? (
                <Text style={[styles.baseText, {flex: 1}]}>Merienda</Text>
              ) : null}
              {item.FoodType.code == 'cena' ? (
                <Text style={[styles.baseText, {flex: 1}]}>Cena</Text>
              ) : null}
              {item.FoodType.code == 'suplemento' ? (
                <Text style={[styles.baseText, {flex: 1}]}>Suplemento / Otros</Text>
              ) : null}
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
            <View style={{flex: 1, flexDirection: 'row', alignSelf: 'flex-end'}}>
              <Mytextbutton 
                estilos={{alignSelf: 'flex-end', margin: 0, padding: 0}} 
                title="Eliminar"
                customClick={() => {
                  Alert.alert(
                    '¡Atención!',
                    'Va a eliminar la siguiente comida: ' + item.title + '. ¿Está seguro?',
                    [{text: 'Confirmar', onPress: () => {
                      deleteFood(item);
                    }}, {text: 'Cancelar'}],
                    { cancelable: false }
                  );
                }}
                />
              <Mytextbutton 
                estilos={{alignSelf: 'flex-end', margin: 0, padding: 0}} 
                title="Editar"
                customClick={() => {navigation.navigate('NewFoodToTraineeScreen', {food: item, userToken: route.params.userToken, userId: route.params.userId});}}
                />
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={[styles.container, styles.horizontal, {backgroundColor: '#fff'}]}>
            <ActivityIndicator size="large" color="#d32f2f" />
          </View>
        ): null}
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <KeyboardAwareScrollView nestedScrollEnabled={true}>
                {((foodList==undefined || foodList.length == 0) && loading == false ) ? (
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
                      text="Todavía no tienes ejercicios asignados a este cliente. Pulsa el botón '+' para añadir uno nuevo." 
                      estilos={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#d32f2f',
                        textAlign: 'center',
                      }}/>
                  </View>
                ): (
                  <FlatList
                    style={{marginTop: 0, marginBottom: 20}}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                    data={foodList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => foodListItemView(item)}
                    />
                )}
              </KeyboardAwareScrollView>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {navigation.navigate('NewFoodToTraineeScreen', {userToken: route.params.userToken, userId: route.params.userId})}}
                style={styles.touchableOpacityStyle}>
                <View style={{flex: 1}}>
                  <Icon style={{top: 0}} name='circle' size={60} color='#fff'  />
                  <Icon style={{top: -60}} name='plus-circle' size={60} color='#d32f2f'  />
                </View>
              </TouchableOpacity>
            </View>
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
    color: '#d32f2f',
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
    marginTop: -30,
    paddingTop: 0,
    top: 0,
    width: '100%',
    marginBottom: 0
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
    width: 60,
    height: 60,
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
  }
});

export default TraineeDetailsDietTab;