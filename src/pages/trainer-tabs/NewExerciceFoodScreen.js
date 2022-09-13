import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, SafeAreaView, TextInput, Text, StyleSheet, Image, KeyboardAvoidingView, Alert, ActivityIndicator, FlatList, ListViewBase, Switch, TouchableOpacity } from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import Mytext from '../components/Mytext';
import MytextinputPassword from '../components/MytextinputPassword';
import { Platform } from 'expo-modules-core';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MyActionButton from '../components/MyActionButton';
import { Picker } from '@react-native-picker/picker';
import Mytextinputred from '../components/Mytextinputred';
import Checkbox from 'expo-checkbox';

import logoFood from '../assets/icons/treina_undraw_food.png';
import logoGym from '../assets/icons/treina_undraw_gym.png';

import { configuration } from '../configuration';

const NewExerciceFoodScreen = ({ navigation, route }) => {

  useEffect(() => {
    if (route != undefined && route.params != undefined && route.params.food != undefined) {
      setIsEdition(true);
      initializeFood(route.params.food);
    }
    if (route != undefined && route.params != undefined && route.params.exercice != undefined) {
      setIsEdition(true);
      initializeExercice(route.params.exercice);
    }
  }, []);

  //let {userToken} = route.params;
  let [loading, setLoading] = useState(false);
  let [isFood, setIsFood] = useState(false);
  let [isEdition, setIsEdition] = useState(false);
  let [title, setTitle] = useState();
  let [description, setDescription] = useState();
  let [observations, setObservations] = useState();
  let [onMonday, setOnMonday] = useState(false);
  let [onTuesday, setOnTuesday] = useState(false);
  let [onWednesday, setOnWednesday] = useState(false);
  let [onThursday, setOnThursday] = useState(false);
  let [onFriday, setOnFriday] = useState(false);
  let [onSaturday, setOnSaturday] = useState(false);
  let [onSunday, setOnSunday] = useState(false);
  let [foodType, setFoodType] = useState('-');
  let [amount, setAmount] = useState();
  let [repetitions, setRepetitions] = useState();
  let [rest, setRest] = useState();
  let [series, setSeries] = useState();
  let [shoppingList, setShoppingList] = useState([]);
  let [shoppingListIndex, setShoppingListIndex] = useState(0);

  let initializeFood = (item) => {
    setIsFood(true);
    setTitle(item.title);
    setDescription(item.description);
    setAmount(item.amount);
    setFoodType(item.FoodType.code);
    setOnMonday(item.onMonday);
    setOnTuesday(item.onTuesday);
    setOnWednesday(item.onWednesday);
    setOnThursday(item.onThursday);
    setOnFriday(item.onFriday);
    setOnSaturday(item.onSaturday);
    setOnSunday(item.onSunday);
    let shopList = [];
    
    if (item.ShoppingElementTrainerFoods != undefined) {
      for (let i = 0; i < item.ShoppingElementTrainerFoods.length; i++) {
        let elem = item.ShoppingElementTrainerFoods[i];
        elem.delete = false;
        elem.new = false;
        shopList.push(elem);
        if (elem.id >= shoppingListIndex) {
          setShoppingListIndex(elem.id);
        }
      }
      setShoppingList(shopList);
    }
  }
  let initializeExercice = (item) => {
    setIsFood(false);
    setTitle(item.title);
    setDescription(item.description);
    setObservations(item.observations);
    setRepetitions(item.repetitions);
    setRest(item.rest);
    setSeries(item.series);
    setOnMonday(item.onMonday);
    setOnTuesday(item.onTuesday);
    setOnWednesday(item.onWednesday);
    setOnThursday(item.onThursday);
    setOnFriday(item.onFriday);
    setOnSaturday(item.onSaturday);
    setOnSunday(item.onSunday);
  }

  let saveFood = () => {
    setLoading(true);

    if (title == undefined || title.trim() == "" || 
        description == undefined || description.trim() == "" || 
        foodType == undefined || foodType.trim() == "-" || 
        amount == undefined || amount.trim() == "" ) {
      setLoading(false);
      Alert.alert(
        'Atención',
        '¡Completa los campos y revisa que sean correctos!',
        [{text: 'Ok'},],
        { cancelable: false }
      );
      return;
    }

    let url = undefined;
    let data = undefined;
    if (isEdition) {
      url = `${configuration.BASE_URL}/trainer/data/food/edit`;
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
        amount,
        shoppingList
      }
    } else {
      url = `${configuration.BASE_URL}/trainer/data/food/new`;
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
        amount,
        shoppingList
      }
    }
    axios.post(url, data, {
      headers: {
        token: route.params.userToken
      }
    }).then((response) => {
      setLoading(false);
      navigation.goBack(null);
    }).catch((error) => {
      setLoading(false);
      if (error.response.data != undefined && error.response.data.message != undefined) {
        if(error.response.data.message == 'BAD_INFORMATION') {
          Alert.alert(
            'Atención',
            'La información es incorrecta. Comprueba que todos los campos estén cubiertos y son correctos.',
            [{text: 'Ok'},],
            { cancelable: false }
          );
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

  let saveExercice = () => {
    setLoading(true);
    if (title == undefined || title.trim() == "" || 
        description == undefined || description.trim() == "" || 
        observations == undefined || observations.trim() == "" || 
        repetitions == undefined || repetitions.trim() == "-" || 
        rest == undefined || rest.trim() == "" || 
        series == undefined || series.trim() == "" ) {
      setLoading(false);
      Alert.alert(
        'Atención',
        '¡Completa todos los campos y revisa que sean correctos!',
        [{text: 'Ok'},],
        { cancelable: false }
      );
      return;
    }

    let url = undefined;
    let data = undefined;
    if (isEdition) {
      url = `${configuration.BASE_URL}/trainer/data/exercices/edit`;
      data = {
        id: route.params.exercice.id,
        title,
        description,
        observations,
        onMonday,
        onTuesday,
        onWednesday,
        onThursday,
        onFriday,
        onSaturday,
        onSunday,
        repetitions,
        rest,
        series
      }
    } else {
      url = `${configuration.BASE_URL}/trainer/data/exercices/new`;
      data = {
        title,
        description,
        observations,
        onMonday,
        onTuesday,
        onWednesday,
        onThursday,
        onFriday,
        onSaturday,
        onSunday,
        repetitions,
        rest,
        series
      }
    }
    axios.post(url, data, {
      headers: {
        token: route.params.userToken
      }
    }).then((response) => {
      setLoading(false);
      navigation.goBack(null);
    }).catch((error) => {
      setLoading(false);
      if (error.response.data != undefined && error.response.data.message != undefined) {
        if(error.response.data.message == 'BAD_INFORMATION') {
          Alert.alert(
            'Atención',
            'La información es incorrecta. Comprueba que todos los campos estén cubiertos y son correctos.',
            [{text: 'Ok'},],
            { cancelable: false }
          );
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

  let saveData = () => {
    if (isFood) {
      saveFood();
    } else {
      saveExercice();
    }
  }

  let addShoppingListElement = () => {
    let shoppingListCopy = JSON.parse(JSON.stringify(shoppingList));
    shoppingListCopy.push({
      id: shoppingListIndex + 1,
      title: undefined,
      description: undefined,
      delete: false,
      new: true
    });
    setShoppingListIndex(shoppingListIndex + 1);
    setShoppingList(shoppingListCopy);
  }

  let removeShoppingListElement = (item) => {
    let index = -1;
    let shoppingListCopy = JSON.parse(JSON.stringify(shoppingList));
    for (let i = 0; i < shoppingListCopy.length; i++) {
      if (shoppingListCopy[i].id == item.id) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      shoppingListCopy[index].delete = true;
      setShoppingList(shoppingListCopy);
    }
  }

  let shoppingListItemView = (item) => {
    return (
      <View>
        {item.delete ? null : (
          <View
            key={item.id}
            style={{}}>
            <View style={{flex: 3, margin: 0}}>
              <View>
                <View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={[styles.labelDayShoppingList, {flex: 1, marginTop: 10}]}>Título</Text>
                    <MyActionButton 
                      btnIcon="minus"
                      iconSize={14}
                      iconColor="#d32f2f"
                      estilos={{
                        margin: 50,
                        marginTop: 20
                      }}
                      customClick={() => {
                        removeShoppingListElement(item)
                      }}
                      />
                  </View>
                  <Mytextinputred
                    placeholder="Título"
                    style={{ padding: 10 }}
                    estilos={{marginTop: 5, marginLeft: 15}}
                    multiline={true}
                    value={item.title}
                    onChangeText={
                      (title) => {
                        let shoppingListCopy = JSON.parse(JSON.stringify(shoppingList));
                        for (let i = 0; i < shoppingListCopy.length; i++) {
                          if (shoppingListCopy[i].id == item.id) {
                            shoppingListCopy[i].title = title;
                          }
                        }
                        setShoppingList(shoppingListCopy);
                      }
                    }
                  />
                </View>
                <View>
                  <View><Text style={[styles.labelDayShoppingList, {flex: 1, marginTop: 10}]}>Descripción</Text></View>
                  <Mytextinputred
                    placeholder="Descripción"
                    style={{ padding: 10 }}
                    estilos={{marginTop: 5, marginLeft: 15}}
                    multiline={true}
                    value={item.description}
                    onChangeText={
                      (description) => {
                        let shoppingListCopy = JSON.parse(JSON.stringify(shoppingList));
                        for (let i = 0; i < shoppingListCopy.length; i++) {
                          if (shoppingListCopy[i].id == item.id) {
                            shoppingListCopy[i].description = description;
                          }
                        }
                        setShoppingList(shoppingListCopy);
                      }
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        )}
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

            {isFood ? (
              <Image
                style={styles.upperLogo}
                source={logoFood}
              />
            ) : (
              <Image
                style={styles.upperLogo}
                source={logoGym}
              />
            )}

            {isEdition ? null : (
              <View style={{flexDirection: 'row', flex: 1, marginLeft: 30, marginBottom: 10, marginTop: 20}}>
                <Switch
                  style={{alignSelf: 'flex-start', marginRight: 10, transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]}}
                  trackColor={{ true: '#000', false: '#999' }}
                  thumbColor={isFood ? '#9a0007' : '#9a0007'}
                  ios_backgroundColor="#000"
                  value={isFood}
                  onValueChange={(value) => {
                    setIsFood(value);
                  }}
                />
                {isFood ? (
                  <Text style={{fontStyle: 'normal',
                  fontFamily: 'Montserrat',
                  fontSize: 14,
                  color: '#000',
                  textAlign: 'left',
                  marginTop: 8}}>Comida</Text>
                ) : (
                  <Text style={{fontStyle: 'normal',
                  fontFamily: 'Montserrat',
                  fontSize: 14,
                  color: '#000',
                  textAlign: 'left',
                  marginTop: 8}}>Ejercicio</Text>
                )}
              </View>
            )}

            <View><Text style={[styles.labelDay, {flex: 1, marginTop: 10}]}>Título</Text></View>
            <Mytextinputred
              placeholder="Título"
              style={{ padding: 10 }}
              estilos={{marginTop: 5}}
              value={title}
              onChangeText={
                (title) => setTitle(title)
              }
            />
            <View><Text style={[styles.labelDay, {flex: 1, marginTop: 10}]}>Descripción</Text></View>
            <Mytextinputred
              placeholder="Descripción"
              style={{ padding: 10 }}
              estilos={{marginTop: 5}}
              multiline={true}
              value={description}
              onChangeText={
                (description) => setDescription(description)
              }
            />
            {!isFood ? (
              <View>
                <View><Text style={[styles.labelDay, {flex: 1, marginTop: 10}]}>Observación</Text></View>
                <Mytextinputred
                  placeholder="Observación"
                  style={{ padding: 10 }}
                  estilos={{marginTop: 5}}
                  multiline={true}
                  value={observations}
                  onChangeText={
                    (observations) => setObservations(observations)
                  }
                />
              </View>
            ) : null}
            {!isFood ? (
              <View>
                <View><Text style={[styles.labelDay, {flex: 1, marginTop: 10}]}>Repeticiones</Text></View>
                <Mytextinputred
                  placeholder="Repeticiones"
                  style={{ padding: 10 }}
                  estilos={{marginTop: 5}}
                  value={repetitions}
                  onChangeText={
                    (repetitions) => setRepetitions(repetitions)
                  }
                />
              </View>
            ) : null}
            {!isFood ? (
              <View>
                <View><Text style={[styles.labelDay, {flex: 1, marginTop: 10}]}>Descanso</Text></View>
                <Mytextinputred
                  placeholder="Descanso"
                  style={{ padding: 10 }}
                  estilos={{marginTop: 5}}
                  value={rest}
                  onChangeText={
                    (rest) => setRest(rest)
                  }
                />
              </View>
            ) : null}
            {!isFood ? (
              <View>
                <View><Text style={[styles.labelDay, {flex: 1, marginTop: 10}]}>Nº de series</Text></View>
                <Mytextinputred
                  placeholder="Nº de series"
                  style={{ padding: 10 }}
                  estilos={{marginTop: 5}}
                  value={series}
                  onChangeText={
                    (series) => setSeries(series)
                  }
                />
              </View>
            ) : null}
            {isFood ? (
              <View>
                <View><Text style={[styles.labelDay, {flex: 1, marginTop: 10}]}>Cantidad</Text></View>
                <Mytextinputred
                  placeholder="Cantidad"
                  style={{ padding: 10 }}
                  estilos={{marginTop: 5}}
                  value={amount}
                  onChangeText={
                    (amount) => setAmount(amount)
                  }
                />
              </View>
            ) : null}
            {isFood ? (
              <View>
                <View><Text style={[styles.labelDay, {flex: 1, marginTop: 20}]}>Tipo de comida</Text></View>
                { Platform.OS == 'ios' ? (
                  <Mytext
                    text="Tipo de comida"
                    estilos={{fontSize: 14, marginBottom: -16, color: '#fff'}}
                  />
                )  : null}
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
              </View>
            ) : null}
            <View><Text style={[styles.labelDay, {flex: 1, marginTop: 20}]}>Días</Text></View>
            <View 
              style={{flex: 1, flexDirection: 'row', margin: 5, marginLeft: 35, alignItems: 'center',}}>
              <Checkbox
                style={{backgroundColor: '#f00'}}
                value={{onMonday}}
                onValueChange={(value) => {
                  setOnMonday(!onMonday)
                }}
                color={onMonday ? '#d32f2f' : '#aaa'}
              />
              <Text 
                style={{marginLeft: 10}} onPress={() => {setOnMonday(!onMonday)}}>Lunes</Text>
            </View>
            <View 
              style={{flex: 1, flexDirection: 'row', margin: 5, marginLeft: 35, alignItems: 'center',}} >
              <Checkbox
                style={{backgroundColor: '#f00'}}
                value={{onTuesday}}
                onValueChange={(value) => {
                  setOnTuesday(!onTuesday)
                }}
                color={onTuesday ? '#d32f2f' : '#aaa'}
              />
              <Text 
                style={{marginLeft: 10}} onPress={() => {setOnTuesday(!onTuesday)}}>Martes</Text>
            </View>
            <View 
              style={{flex: 1, flexDirection: 'row', margin: 5, marginLeft: 35, alignItems: 'center',}} >
              <Checkbox
                style={{backgroundColor: '#f00'}}
                value={{onWednesday}}
                onValueChange={(value) => {
                  setOnWednesday(!onWednesday)
                }}
                color={onWednesday ? '#d32f2f' : '#aaa'}
              />
              <Text 
                style={{marginLeft: 10}} onPress={() => {setOnWednesday(!onWednesday)}}>Miércoles</Text>
            </View>
            <View 
              style={{flex: 1, flexDirection: 'row', margin: 5, marginLeft: 35, alignItems: 'center',}} >
              <Checkbox
                style={{backgroundColor: '#f00'}}
                value={{onThursday}}
                onValueChange={(value) => {
                  setOnThursday(!onThursday)
                }}
                color={onThursday ? '#d32f2f' : '#aaa'}
              />
              <Text 
                style={{marginLeft: 10}} onPress={() => {setOnThursday(!onThursday)}}>Jueves</Text>
            </View>
            <View 
              style={{flex: 1, flexDirection: 'row', margin: 5, marginLeft: 35, alignItems: 'center',}} >
              <Checkbox
                style={{backgroundColor: '#f00'}}
                value={{onFriday}}
                onValueChange={(value) => {
                  setOnFriday(!onFriday)
                }}
                color={onFriday ? '#d32f2f' : '#aaa'}
              />
              <Text 
                style={{marginLeft: 10}} onPress={() => {setOnFriday(!onFriday)}}>Viernes</Text>
            </View>
            <View 
              style={{flex: 1, flexDirection: 'row', margin: 5, marginLeft: 35, alignItems: 'center',}} >
              <Checkbox
                style={{backgroundColor: '#f00'}}
                value={{onSaturday}}
                onValueChange={(value) => {
                  setOnSaturday(!onSaturday)
                }}
                color={onSaturday ? '#d32f2f' : '#aaa'}
              />
              <Text 
                style={{marginLeft: 10}} onPress={() => {setOnSaturday(!onSaturday)}}>Sábado</Text>
            </View>
            <View 
              style={{flex: 1, flexDirection: 'row', margin: 5, marginLeft: 35, alignItems: 'center',}} >
              <Checkbox
                style={{backgroundColor: '#f00'}}
                value={{onSunday}}
                onValueChange={(value) => {
                  setOnSunday(!onSunday)
                }}
                color={onSunday ? '#d32f2f' : '#aaa'}
              />
              <Text 
                style={{marginLeft: 10}} onPress={() => {setOnSunday(!onSunday)}}>Domingo</Text>
            </View>

            {isFood ? (
              <View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={[styles.labelDay, {flex: 1, marginTop: 20}]}>Lista de la compra</Text>
                  <MyActionButton 
                    btnIcon="plus"
                    iconSize={20}
                    iconColor="#d32f2f"
                    estilos={{
                      margin: 50,
                      marginTop: 20
                    }}
                    customClick={addShoppingListElement}
                    />
                </View>
                {(shoppingList != undefined && shoppingList.length > 0) ? (
                  <FlatList
                    style={{marginTop: 0, marginBottom: 20}}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                    data={shoppingList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => shoppingListItemView(item)}
                    />
                ) : (
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={[styles.labelNoElements, {flex: 1, marginTop: 20}]}>Todavía no hay ningún elemento.</Text>
                  </View>
                )}
              </View>
            ) : null}

            <Mybutton
              text="Guardar"
              title="Guardar"
              estilos={{
                marginTop: 40,
                marginBottom: 50
              }}
              customClick={() => saveData()}
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
    color: '#fff',
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
        marginTop: -10,
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
  labelDayShoppingList: {
    marginLeft: 15,
    color: '#000',
    fontWeight: 'bold'
  },
  labelNoElements: {
    color: '#000',
    fontSize: 14,
    fontStyle: 'italic',
    marginLeft: 35
  }
});

export default NewExerciceFoodScreen;