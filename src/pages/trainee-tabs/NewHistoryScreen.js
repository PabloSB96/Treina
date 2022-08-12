import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, SafeAreaView, TextInput, Text, StyleSheet, Image, KeyboardAvoidingView, Alert, ActivityIndicator, FlatList, ListViewBase, Switch, TouchableOpacity } from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import Mytext from '../components/Mytext';
import MytextinputPassword from '../components/MytextinputPassword';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MyActionButton from '../components/MyActionButton';
import { Picker } from '@react-native-picker/picker';
import Mytextinputred from '../components/Mytextinputred';

import logoData from '../assets/treina_data.png';

const baseUrl = 'http://192.168.8.104:3000';

const NewHistoryScreen = ({ navigation, route }) => {

  useEffect(() => {}, []);

  //let {userToken} = route.params;
  let [loading, setLoading] = useState(false);
  let [height, setHeight]= useState();
  let [weight, setWeight]= useState();
  let [chest, setChest]= useState();
  let [arm, setArm]= useState();
  let [waist, setWaist]= useState();
  let [hip, setHip]= useState();
  let [gluteus, setGluteus]= useState();
  let [thigh, setThigh]= useState();

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
              source={logoData}
            />

            <Mytextinputred
              placeholder="Altura (cm)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              onChangeText={
                (height) => setHeight(height)
              }
            />
            <Mytextinputred
              placeholder="Peso (kg)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              onChangeText={
                (weight) => setWeight(weight)
              }
            />
            <Mytextinputred
              placeholder="Pecho (cm)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              onChangeText={
                (chest) => setChest(chest)
              }
            />
            <Mytextinputred
              placeholder="Brazo (cm)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              onChangeText={
                (arm) => setArm(arm)
              }
            />
            <Mytextinputred
              placeholder="Cintura (cm)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              onChangeText={
                (waist) => setWaist(waist)
              }
            />
            <Mytextinputred
              placeholder="Cadera (cm)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              onChangeText={
                (hip) => setHip(hip)
              }
            />
            <Mytextinputred
              placeholder="Glúteo (cm)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              onChangeText={
                (gluteus) => setGluteus(gluteus)
              }
            />
            <Mytextinputred
              placeholder="Muslo (cm)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              onChangeText={
                (thigh) => setThigh(thigh)
              }
            />

            <Mybutton
              text="Enviar datos"
              title="Enviar datos"
              estilos={{
                  marginBottom: 50
              }}
              customClick={() => console.log("Enviar datos")}
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

export default NewHistoryScreen;