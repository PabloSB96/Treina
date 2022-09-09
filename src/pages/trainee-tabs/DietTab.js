import React, { useEffect, useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { Button, View, SafeAreaView, StyleSheet, Image, Text, FlatList, Alert, Modal, Pressable, ActivityIndicator } from 'react-native';
import Mytext from '../components/Mytext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import noResultsLogo from '../assets/icons/treina_undraw_noresults.png';

import { useIsFocused } from '@react-navigation/native';
import Mytextbutton from '../components/Mytextbutton';

import { configuration } from '../configuration';

const DietTab = ({ navigation, route }) => {

  let isFocused = useIsFocused();

  let [loading, setLoading] = useState(false);
  let [myDiet, setMyDiet] = useState();
  let [userToken, setUserToken] = useState();
  let [detailsModalVisibility, setDetailsModalVisibility] = useState(false);
  let [detailsModalDescription, setDetailsModalDescription] = useState('');
  let [shopList, setShopList] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon name='list-alt' style={{right: 20, top: 3}} size={25} color='#fff' onPress={() => {
          navigation.navigate('FoodListScreen', {userToken: route.params.userToken})
        }}  />
      )
    });
  }, [navigation]);

  useEffect(() => {
    setLoading(true);
    getMyDiet();
  }, [isFocused]);

  let getMyDietAux = () => {
    let obj1 = {
      id: 1,
      title: 'Comida 3',
      description: 'Description ñalk asdklfj añsdkf aklñsdf ñalskdjf ñaklds faklñ dsfasdf.',
      amount: '300 gr',
      foodType: 'Comida',
      onMonday: true,
      onTuesday: false,
      onWednesday: true,
      onThursday: false,
      onFriday: true,
      onSaturday: false,
      onSunday: false
    };
    let obj2 = {
      id: 2,
      title: 'Desayuno 2',
      description: '',
      amount: '300 gr',
      foodType: 'Desayuno',
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
      foodType: 'Cena',
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

  let getMyDiet = () => {
    axios.post(`${configuration.BASE_URL}/trainee/food`, {}, {
      headers: {
        token: route.params.userToken
      }
    }).then((response) => {
      let food = JSON.stringify(response.data);
      food = food.replaceAll('ShoppingElementTrainerFoods', 'ShoppingElementTraineeFoods');
      let foodObj = JSON.parse(food);
      let shopListArray = [];
      for (let i = 0; i < foodObj.length; i++ ){
        for (let j = 0; j < foodObj[i].ShoppingElementTraineeFoods.length; j++) {
          shopListArray.push(foodObj[i].ShoppingElementTraineeFoods[j]);
        }
      }
      orderMyDiet(foodObj, shopListArray);
      return ;
    }).catch((error) => {
      setLoading(false);
      Alert.alert(
        'Atención',
        'Ha ocurrido un problema. Inténtelo más tarde o póngase en contacto con nuestro Soporte Técnico.',
        [{text: 'Ok'},],
        { cancelable: false }
      );
    });
  }

  let orderMyDiet = (diet, shopListArray) => {
    var result = new Map();
    for (var i = 0; i < diet.length; i++) {
      if (diet[i].onMonday) {
        var items = result.get('Monday');
        if (items == undefined) {
          items = [];
        }
        items.push(diet[i]);
        result.set('Monday', items);
      }
      if (diet[i].onTuesday) {
        var items = result.get('Tuesday');
        if (items == undefined) {
          items = [];
        }
        items.push(diet[i]);
        result.set('Tuesday', items);
      }
      if (diet[i].onWednesday) {
        var items = result.get('Wednesday');
        if (items == undefined) {
          items = [];
        }
        items.push(diet[i]);
        result.set('Wednesday', items);
      }
      if (diet[i].onThursday) {
        var items = result.get('Thursday');
        if (items == undefined) {
          items = [];
        }
        items.push(diet[i]);
        result.set('Thursday', items);
      }
      if (diet[i].onFriday) {
        var items = result.get('Friday');
        if (items == undefined) {
          items = [];
        }
        items.push(diet[i]);
        result.set('Friday', items);
      }
      if (diet[i].onSaturday) {
        var items = result.get('Saturday');
        if (items == undefined) {
          items = [];
        }
        items.push(diet[i]);
        result.set('Saturday', items);
      }
      if (diet[i].onSunday) {
        var items = result.get('Sunday');
        if (items == undefined) {
          items = [];
        }
        items.push(diet[i]);
        result.set('Sunday', items);
      }
    }
    setMyDiet(result);
    setShopList(shopListArray);
    setLoading(false);
  }

  let listItemView = (item) => {
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
              <Text style={[styles.baseText, {flex: 1}]}>{item.FoodType.title}</Text>
            </View>
            <Mytextbutton 
              estilos={{alignSelf: 'flex-end', margin: 0, padding: 0}} 
              title="Detalles"
              customClick={() => {setDetailsModalDescription(item.description); setDetailsModalVisibility(true);}}
              />
          </View>
        </View>
      </View>
    );
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
                  {((myDiet==undefined || myDiet.size == 0) && loading == false ) ? (
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
                        text="Todavía no tienes ninguna dieta asignada." 
                        estilos={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#d32f2f',
                          textAlign: 'center',
                        }}/>
                    </View>
                  ): (
                    <View>
                      <Modal
                        visible={detailsModalVisibility}
                        transparent={true}
                        >
                          <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                              <Text style={styles.modalTitle}>Detalles</Text>
                              <Text style={styles.modalSubtitle}>Descripción</Text>
                              {detailsModalDescription != '' ? (
                                <Text style={styles.modalText}>{detailsModalDescription}</Text>
                              ) : (
                                <Text style={styles.modalTextNothing}>No hay ninguna descripción todavía.</Text>
                              )}
                              <Pressable
                                style={[styles.modalButton, styles.modalButtonClose]}
                                onPress={() => setDetailsModalVisibility(false)}>
                                <Text style={styles.modalCloseText}>Cerrar</Text>
                              </Pressable>
                            </View>
                          </View>
                      </Modal>
                      {myDiet.get('Monday') != undefined ? (
                        <View>
                          <View><Text style={[styles.labelDay, {flex: 1, marginTop: 20}]}>Lunes</Text></View>
                          <FlatList
                            style={{marginTop: 0, marginBottom: 20}}
                            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                            data={myDiet.get('Monday')}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                            />
                        </View>
                      ) : null}
                      {myDiet.get('Tuesday') != undefined ? (
                        <View>
                          <View><Text style={[styles.labelDay, {flex: 1}]}>Martes</Text></View>
                          <FlatList
                            style={{marginTop: 0, marginBottom: 20}}
                            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                            data={myDiet.get('Tuesday')}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                            />
                        </View>
                      ) : null}
                      {myDiet.get('Wednesday') != undefined ? (
                        <View>
                          <View><Text style={[styles.labelDay, {flex: 1}]}>Miércoles</Text></View>
                          <FlatList
                            style={{marginTop: 0, marginBottom: 20}}
                            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                            data={myDiet.get('Wednesday')}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                            />
                        </View>
                      ) : null}
                      {myDiet.get('Thursday') != undefined ? (
                        <View>
                          <View><Text style={[styles.labelDay, {flex: 1}]}>Jueves</Text></View>
                          <FlatList
                            style={{marginTop: 0, marginBottom: 20}}
                            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                            data={myDiet.get('Thursday')}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                            />
                        </View>
                      ) : null}
                      {myDiet.get('Friday') != undefined ? (
                        <View>
                          <View><Text style={[styles.labelDay, {flex: 1}]}>Viernes</Text></View>
                          <FlatList
                            style={{marginTop: 0, marginBottom: 20}}
                            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                            data={myDiet.get('Friday')}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                            />
                        </View>
                      ) : null}
                      {myDiet.get('Saturday') != undefined ? (
                        <View>
                          <View><Text style={[styles.labelDay, {flex: 1}]}>Sábado</Text></View>
                          <FlatList
                            style={{marginTop: 0, marginBottom: 20}}
                            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                            data={myDiet.get('Saturday')}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                            />
                        </View>
                      ) : null}
                      {myDiet.get('Sunday') != undefined ? (
                        <View>
                          <View><Text style={[styles.labelDay, {flex: 1}]}>Domingo</Text></View>
                          <FlatList
                            style={{marginTop: 0, marginBottom: 20}}
                            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                            data={myDiet.get('Sunday')}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                            />
                        </View>
                      ) : null}
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
    marginTop: 10
  },
  modalCloseText: {
    color: '#d32f2f',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});

export default DietTab;