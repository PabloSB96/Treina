import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text } from 'react-native';
import Mytext from './../components/Mytext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import logo from './../assets/wave-general.png';
import appImage from './../assets/icons/atopame_undraw_app.png';
import myCurrentLocationImage from './../assets/icons/atopame_undraw_mycurrentlocation.png';

const InformationTab = () => {

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <KeyboardAwareScrollView>
          <Image
            style={styles.upperLogo}
            source={logo}
            />
          <Image
            style={styles.image}
            source={appImage}
            />
          <Text style={styles.textContainer}>
          <Mytext text="Atopame" estilos={{color: '#ffa726', fontWeight: 'bold'}} />
          <Mytext 
            text=" es una plataforma con la que queremos dar una solución a la hora de compartir tu ubicación con otras personas de forma controlada. Tú eres quién decide cuándo y cómo compartes tu ubicación, y haciéndolo le das la oportunidad a tus seres queridos de saber dónde te encuentras y que estás bien." />
          </Text>

          <Mytext 
            text="Eso sí, es muy importante que compartas tus códigos SÓLO con tus personas de confianza, y que si en algún momento alguién te está obligando a compartir un código, lo hables con alguién de tu entorno, sobre todo si crees que puedes estar en una situación de control o maltrato." />
          
          <Image
            style={styles.image}
            source={myCurrentLocationImage}
            />

          <Mytext
            text="El objectivo de Atopame es ser una solución; no un medio de control. Defendemos la TOLERANCIA 0 ante situaciones de control o maltrato."
            estilos={{marginBottom: 20}} />
        </KeyboardAwareScrollView>
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
});

export default InformationTab;