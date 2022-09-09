import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, SafeAreaView, TextInput, Text, StyleSheet, Image, KeyboardAvoidingView, Alert, ActivityIndicator, FlatList, ListViewBase, Switch, TouchableOpacity, Platform } from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import Mytext from '../components/Mytext';
import MytextinputPassword from '../components/MytextinputPassword';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MyActionButton from '../components/MyActionButton';
import { Picker } from '@react-native-picker/picker';
import Mytextinputred from '../components/Mytextinputred';

import { useIsFocused } from '@react-navigation/native';
import logoShopping from '../assets/icons/treina_undraw_shopping.png';
import noResultsLogo from '../assets/icons/treina_undraw_noresults.png';

import { configuration } from '../configuration';

const FoodListScreen = ({ navigation, route }) => {

  let isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    getShoppingList();
  }, [isFocused]);

  let [loading, setLoading] = useState(false);
  let [foodList, setFoodList]= useState();
  let [showAll, setShowAll] = useState(true);
  let [isTherePendingElements, setIsTherePendingElements] = useState(false);

  let getShoppingList = () => {
    setLoading(true);
    axios.post(`${configuration.BASE_URL}/trainee/food/shoppinglist`, {}, {
      headers: {
        token: route.params.userToken
      }
    }).then((response) => {
      setFoodList(response.data);
      setLoading(false);
      return ;
    }).catch((error) => {
      setLoading(false);
      console.log("DietTab - getMyDiet - error - 1");
      console.log(error);
      console.log("DietTab - getMyDiet - error - 2");
      Alert.alert(
        'Atención',
        'Ha ocurrido un problema. Inténtelo más tarde o póngase en contacto con nuestro Soporte Técnico.',
        [{text: 'Ok'},],
        { cancelable: false }
      );
    });
  }

  let updateShoppingListItem = (item) => {
    setLoading(true);
    axios.post(`${configuration.BASE_URL}/trainee/food/shoppinglist/` + item.id, {
      checked: (!item.checked)
    }, {
      headers: {
        token: route.params.userToken
      }
    }).then((response) => {
      let copy = JSON.parse(JSON.stringify(item));
      let foodListCopy = JSON.parse(JSON.stringify(foodList));
      copy.checked = false;
      for (let i = 0; i < foodListCopy.length; i++) {
        if (foodListCopy[i].id == item.id) {
          foodListCopy[i].checked = !(item.checked);
        }
      }
      setFoodList(foodListCopy);
      setIsTherePendingElements(false);
      setLoading(false);
      return ;
    }).catch((error) => {
      setLoading(false);
      console.log("DietTab - getMyDiet - error - 1");
      console.log(error);
      console.log("DietTab - getMyDiet - error - 2");
      Alert.alert(
        'Atención',
        'Ha ocurrido un problema. Inténtelo más tarde o póngase en contacto con nuestro Soporte Técnico.',
        [{text: 'Ok'},],
        { cancelable: false }
      );
    });
  }

  let listItemView = (item) => {
    return (
      <View
        key={item.id}
        style={[{
          backgroundColor: '#fff', 
          borderColor: '#eee', 
          borderRadius: 20, 
          borderWidth: 1, 
          marginTop: 10, 
          padding: 16, 
          paddingTop: 8, 
          borderRadius: 10, 
          flex: 3, 
          flexDirection: "row", 
          shadowOffset: {width: -2, height: 4}, 
          shadowOpacity: 0.2, 
          shadowRadius: 5, 
          elevation: 3, 
          shadowColor: '#222' }, 
          item.checked ? {borderLeftColor: '#d32f2f', borderLeftWidth: 5, ...Platform.select({android: {borderStartColor: '#d32f2f'}})} : null]}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 3}}>
            <Text style={styles.boldText}>{item.title}</Text>
            {(item.description == undefined || item.description == null || item.description == '') ? (
              <Text style={[styles.noDetailsText, {marginTop: 5}]}>No hay detalles para este producto.</Text>
            ) : (
              <Text style={[styles.baseText, {marginTop: 5}]}>{item.description}</Text>
            )}
          </View>
          <View style={{flex: 1,}}>
            {item.checked ? (
              <MyActionButton btnIcon='check-circle' iconSize={30} iconColor='#d32f2f' customClick={() => {
                updateShoppingListItem(item);
              }} />
            ) : (
              <MyActionButton btnIcon='check-circle' iconSize={30} iconColor='#AAA' customClick={() => {
                updateShoppingListItem(item);
              }} />
            )}
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
              source={logoShopping}
            />

            <View style={{flexDirection: 'row', flex: 1, marginLeft: 20, marginBottom: 10}}>
              <Switch
                style={{alignSelf: 'flex-start', marginRight: 10, transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]}}
                trackColor={{ true: '#000', false: '#999' }}
                thumbColor={showAll ? '#9a0007' : '#9a0007'}
                ios_backgroundColor="#000"
                value={showAll}
                onValueChange={(value) => {
                  setShowAll(value);
                }}
              />
              {showAll ? (
                <Text style={{fontStyle: 'normal',
                fontFamily: 'Montserrat',
                fontSize: 14,
                color: '#000',
                textAlign: 'left',
                marginTop: 8}}>Mostrar todos</Text>
              ) : (
                <Text style={{fontStyle: 'normal',
                fontFamily: 'Montserrat',
                fontSize: 14,
                color: '#000',
                textAlign: 'left',
                marginTop: 8}}>Mostrar sólo los pendientes</Text>
              )}
            </View>
            
            <FlatList
              style={{marginTop: 0, marginBottom: 20}}
              contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
              data={foodList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                if (!item.checked) {
                  setIsTherePendingElements(true);
                }
                if (!item.checked || showAll) {
                  return listItemView(item);
                }
              }}
              />

            {(showAll && foodList != undefined && foodList.length == 0) ? (
              <View style={{flex: 1}}>
                <View style={{flex: 1, height: 200, marginTop: 0}}>
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
                  text="No hay ningún elemento en la lista." 
                  estilos={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#d32f2f',
                    textAlign: 'center',
                  }}/>
              </View>
            ) : (
              <View>
                {(!showAll && !isTherePendingElements) ? (
                  <View style={{flex: 1}}>
                    <View style={{flex: 1, height: 200, marginTop: 0}}>
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
                      text="No hay ningún elemento en la lista." 
                      estilos={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#d32f2f',
                        textAlign: 'center',
                      }}/>
                  </View>
                ) : null}
              </View>
            )}

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
  },
  noDetailsText: {
    fontSize: 12,
    fontStyle: 'italic'
  },
  boldText: {
    fontWeight: 'bold',
    color: '#d32f2f',
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
});

export default FoodListScreen;