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

import logoShopping from '../assets/icons/treina_undraw_shopping.png';

const baseUrl = 'http://192.168.8.102:8066';

const FoodListScreen = ({ navigation, route }) => {

  useEffect(() => {
    setLoading(true);

    setFoodList(getMyFoodListAux());
  }, []);

  //let {userToken} = route.params;
  let [loading, setLoading] = useState(false);
  let [foodList, setFoodList]= useState();
  let [showAll, setShowAll] = useState(true);

  let getMyFoodListAux = () => {
    let obj1 = {
      id: 1,
      title: 'Pollo',
      details: undefined,
      checked: false
    };
    let obj2 = {
      id: 2,
      title: 'Agua',
      details: 'Bezoya',
      checked: false
    };
    let obj3 = {
      id: 3,
      title: 'Ternera',
      details: undefined,
      checked: true
    };
    let obj4 = {
      id: 4,
      title: 'Corn Falkes',
      details: 'Marca Mercadona 0% sin azucares.',
      checked: false
    };
    var result = [];
    result.push(obj1);
    result.push(obj2);
    result.push(obj3);
    result.push(obj4);
    setLoading(false);
    return result;
  }

  let getMyFoodList = () => {}

  let listItemView = (item) => {
    return (
      <View
        key={item.producto_id}
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
            {(item.details == undefined || item.details == null || item.details == '') ? (
              <Text style={[styles.noDetailsText, {marginTop: 5}]}>No hay detalles para este producto.</Text>
            ) : (
              <Text style={[styles.baseText, {marginTop: 5}]}>{item.details}</Text>
            )}
          </View>
          <View style={{flex: 1,}}>
            {item.checked ? (
              <MyActionButton btnIcon='check-circle' iconSize={30} iconColor='#d32f2f' customClick={() => {
                let copy = JSON.parse(JSON.stringify(item));
                let foodListCopy = JSON.parse(JSON.stringify(foodList));
                copy.checked = false;
                for (let i = 0; i < foodListCopy.length; i++) {
                  if (foodListCopy[i].id == item.id) {
                    foodListCopy[i].checked = !(item.checked);
                  }
                }
                setFoodList(foodListCopy);
              }} />
            ) : (
              <MyActionButton btnIcon='check-circle' iconSize={30} iconColor='#AAA' customClick={() => {
                let copy = JSON.parse(JSON.stringify(item));
                let foodListCopy = JSON.parse(JSON.stringify(foodList));
                copy.checked = false;
                for (let i = 0; i < foodListCopy.length; i++) {
                  if (foodListCopy[i].id == item.id) {
                    foodListCopy[i].checked = !(item.checked);
                  }
                }
                setFoodList(foodListCopy);
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
                if (!item.checked || showAll) {
                  return listItemView(item);
                }
              }}
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