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

const baseUrl = 'http://192.168.8.104:3000';

const NewExerciceFoodScreen = ({ navigation, route }) => {

  useEffect(() => {}, []);

  //let {userToken} = route.params;
  let [loading, setLoading] = useState(false);
  let [isFood, setIsFood] = useState(false);
  let [title, setTitle] = useState();
  let [description, setDescription] = useState();
  let [observation, setObservation] = useState();
  let [onMonday, setOnMonday] = useState();
  let [onTuesday, setOnTuesday] = useState();
  let [onWednesday, setOnWednesday] = useState();
  let [onThursday, setOnThursday] = useState();
  let [onFriday, setOnFriday] = useState();
  let [onSaturday, setOnSaturday] = useState();
  let [onSunday, setOnSunday] = useState();
  let [foodType, setFoodType] = useState();
  let [amount, setAmount] = useState();
  let [repetitions, setRepetitions] = useState();
  let [rest, setRest] = useState();
  let [series, setSeries] = useState();

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

            <Mytextinputred
              placeholder="Titulo"
              style={{ padding: 10 }}
              onChangeText={
                (title) => setTitle(title)
              }
            />
            <Mytextinputred
              placeholder="Descripción"
              style={{ padding: 10 }}
              onChangeText={
                (description) => setDescription(description)
              }
            />
            {!isFood ? (
              <Mytextinputred
                placeholder="Observación"
                style={{ padding: 10 }}
                onChangeText={
                  (observation) => setObservation(observation)
                }
              />
            ) : null}
            {!isFood ? (
              <Mytextinputred
                placeholder="Repeticiones"
                style={{ padding: 10 }}
                onChangeText={
                  (repetitions) => setRepetitions(repetitions)
                }
              />
            ) : null}
            {!isFood ? (
              <Mytextinputred
                placeholder="Descanso"
                style={{ padding: 10 }}
                onChangeText={
                  (rest) => setRest(rest)
                }
              />
            ) : null}
            {!isFood ? (
              <Mytextinputred
                placeholder="Nº de series"
                style={{ padding: 10 }}
                onChangeText={
                  (series) => setSeries(series)
                }
              />
            ) : null}
            {isFood ? (
              <Mytextinputred
                placeholder="Cantidad"
                style={{ padding: 10 }}
                onChangeText={
                  (amount) => setAmount(amount)
                }
              />
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
              customClick={() => console.log("Guardar")}
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
    color: '#fff',
    ...Platform.select({
      android: {
        alignItems: 'flex-start',
        color: '#fff',
        width: '10%',
        padding: 0,
        margin: 0
      }
    })
  },
  labelDay: {
    marginLeft: 35,
    color: '#d32f2f',
    fontWeight: 'bold'
  },
});

export default NewExerciceFoodScreen;