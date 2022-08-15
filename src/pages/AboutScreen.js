import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, SafeAreaView, TextInput, Text, StyleSheet, Image, KeyboardAvoidingView, Alert, ActivityIndicator, FlatList, ListViewBase, Switch, TouchableOpacity } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import MytextinputPassword from './components/MytextinputPassword';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MyActionButton from './components/MyActionButton';
import { Picker } from '@react-native-picker/picker';
import Mytextinputred from './components/Mytextinputred';

import logoTreina from './assets/icons/treina_undraw_profile_element_logo.png';

const baseUrl = 'http://192.168.8.104:3000';

const AboutScreen = ({ navigation, route }) => {

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView style={{padding: 40}}>

            <Image
              style={styles.upperLogo}
              source={logoTreina}
            />

            <View><Text style={[styles.label, {flex: 1, marginTop: 30}]}>Versión actual</Text></View>
            <View><Text style={{flex: 1, marginTop: 5, fontWeight: 'bold', fontSize: 14}}>1.0.0</Text></View>
            <View><Text style={{flex: 1, marginTop: 5, fontSize: 12}}>Versión inicial de la aplicación</Text></View>

            <View><Text style={[styles.label, {flex: 1, marginTop: 40}]}>Contacto</Text></View>
            <View><Text style={{flex: 1, marginTop: 5, fontWeight: 'bold', fontSize: 12}}>treina@treinaapp.com</Text></View>

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
  label: {
    color: '#d32f2f',
    fontWeight: 'bold'
  },
});

export default AboutScreen;