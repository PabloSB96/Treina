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

const baseUrl = 'http://192.168.8.102:8066';

const NewHistoryScreen = ({ navigation, route }) => {

  useEffect(() => {}, []);

  //let {userToken} = route.params;
  let [loading, setLoading] = useState(false);
  let [weight, setWeight]= useState();
  let [chest, setChest]= useState();
  let [arm, setArm]= useState();
  let [waist, setWaist]= useState();
  let [hip, setHip]= useState();
  let [gluteus, setGluteus]= useState();
  let [thigh, setThigh]= useState();

  let saveData = () => {
    if (weight == undefined || 
        chest == undefined || 
        arm == undefined || 
        waist == undefined || 
        hip == undefined || 
        gluteus == undefined || 
        thigh == undefined) {
      Alert.alert(
        'Atención',
        '¡Completa todos los campos!',
        [{text: 'Ok'},],
        { cancelable: false }
      );
      return ;
    }
    let weightNumber = undefined;
    let chestNumber = undefined;
    let armNumber = undefined;
    let waistNumber = undefined;
    let hipNumber = undefined;
    let gluteusNumber = undefined;
    let thighNumber = undefined;
    try {
      weightNumber = Number(weight);
      chestNumber = Number(chest);
      armNumber = Number(arm);
      waistNumber = Number(waist);
      hipNumber = Number(hip);
      gluteusNumber = Number(gluteus);
      thighNumber = Number(thigh);
    } catch(e){
      Alert.alert(
        'Atención',
        '¡Completa todos los y revisa que sean correctos!',
        [{text: 'Ok'},],
        { cancelable: false }
      );
    }
    axios.post(`${baseUrl}/trainee/history/new`, {
      weight: weightNumber,
      chest: chestNumber,
      arm: armNumber,
      waist: waistNumber,
      hip: hipNumber,
      gluteus: gluteusNumber,
      thigh: thighNumber
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
      console.log("NewHistoryScreen - saveData - error - 1");
      console.log(error);
      console.log("NewHistoryScreen - saveData - error - 2");
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

            <View><Text style={[styles.labelDay, {flex: 1, marginTop: 5}]}>Peso (kg)</Text></View>
            <Mytextinputred
              placeholder="Peso (kg)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              estilos={{marginTop: 0, paddingTop: 0}}
              onChangeText={
                (weight) => setWeight(weight)
              }
            />
            <View><Text style={[styles.labelDay, {flex: 1, marginTop: 5}]}>Pecho (cm)</Text></View>
            <Mytextinputred
              placeholder="Pecho (cm)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              estilos={{marginTop: 0, paddingTop: 0}}
              onChangeText={
                (chest) => setChest(chest)
              }
            />
            <View><Text style={[styles.labelDay, {flex: 1, marginTop: 5}]}>Brazo (cm)</Text></View>
            <Mytextinputred
              placeholder="Brazo (cm)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              estilos={{marginTop: 0, paddingTop: 0}}
              onChangeText={
                (arm) => setArm(arm)
              }
            />
            <View><Text style={[styles.labelDay, {flex: 1, marginTop: 5}]}>Cintura (cm)</Text></View>
            <Mytextinputred
              placeholder="Cintura (cm)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              estilos={{marginTop: 0, paddingTop: 0}}
              onChangeText={
                (waist) => setWaist(waist)
              }
            />
            <View><Text style={[styles.labelDay, {flex: 1, marginTop: 5}]}>Cadera (cm)</Text></View>
            <Mytextinputred
              placeholder="Cadera (cm)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              estilos={{marginTop: 0, paddingTop: 0}}
              onChangeText={
                (hip) => setHip(hip)
              }
            />
            <View><Text style={[styles.labelDay, {flex: 1, marginTop: 5}]}>Glúteo (cm)</Text></View>
            <Mytextinputred
              placeholder="Glúteo (cm)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              estilos={{marginTop: 0, paddingTop: 0}}
              onChangeText={
                (gluteus) => setGluteus(gluteus)
              }
            />
            <View><Text style={[styles.labelDay, {flex: 1, marginTop: 5}]}>Muslo (cm)</Text></View>
            <Mytextinputred
              placeholder="Muslo (cm)"
              keyboardType="numeric"
              style={{ padding: 10 }}
              estilos={{marginTop: 0, paddingTop: 0}}
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
  labelDay: {
    marginLeft: 35,
    color: '#000',
    fontWeight: 'bold'
  },
});

export default NewHistoryScreen;