import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, FlatList, Alert, Modal, Pressable, ActivityIndicator } from 'react-native';
import Mytext from '../components/Mytext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import noResultsLogo from '../assets/icons/treina_undraw_noresults.png';
import logoProfile from '../assets/icons/treina_undraw_profile.png';
import logoElementTarget from '../assets/icons/treina_undraw_profile_element_target.png';
import logoElementTargetFull from '../assets/icons/treina_undraw_profile_element_targetfull.png';
import logoElementPhisical from '../assets/icons/treina_undraw_profile_element_phisical.png';

import { useIsFocused } from '@react-navigation/native';
import Mytextbutton from '../components/Mytextbutton';
import Mybutton from '../components/Mybutton';

const ProfileTab = ({ navigation, route }) => {

  let isFocused = useIsFocused();

  let [loading, setLoading] = useState(false);
  let [myProfile, setMyProfile] = useState();
  let [userToken, setUserToken] = useState();
  let [detailsModalVisibility, setDetailsModalVisibility] = useState(false);
  let [detailsModalDescription, setDetailsModalDescription] = useState('');
  let [detailsModalObservation, setDetailsModalObservation] = useState('');
  let [currentDay, setCurrentDay] = useState(0);

  useEffect(() => {
    setLoading(true);

    /*console.log(userToken);
    console.log("adfasdfajdkfljaslkñdf ---- 2");
    console.log(route.params.route.params.userToken);
    console.log("adfasdfajdkfljaslkñdf ---- 3");
    setUserToken(route.params.route.params.userToken);*/

    // TODO
    setMyProfile(getMyProfileInfoAux());
    //getMyProfileInfo();

  }, [isFocused]);

  let getMyProfileInfoAux = () => {
    let result = {
      id: 1,
      name: 'Noelia Sopeña',
      email: 'lamejornoviaqueexiste@gmail.com',
      goal: 'Perder peso',
      goalFull: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumpeso.',
      height: 180,
      weight: 74
    };
    setLoading(false);
    return result;
  }

  let getMyProfileInfo = () => {
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#d32f2f" />
          </View>
        ): null}
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <KeyboardAwareScrollView nestedScrollEnabled={true}>
                {((myProfile==undefined || myProfile.length == 0) && loading == false ) ? (
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
                      text="Todavía no tienes ningún ejercicio asignado." 
                      estilos={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#d32f2f',
                        textAlign: 'center',
                      }}/>
                  </View>
                ): (
                  <View style={{padding: 20}}>
                    <Image
                      style={styles.upperLogo}
                      source={logoProfile}
                    />
                    <View><Text style={[styles.titleText, {flex: 1}]}>{myProfile.name}</Text></View>
                    <View><Text style={[styles.emailText, {flex: 1}]}>{myProfile.email}</Text></View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Image
                        style={{flex: 1, resizeMode: 'contain', width: '100%', height: 100,}}
                        source={logoElementTarget}
                      />
                      <View style={{flex: 3, marginTop: 'auto', marginBottom: 'auto'}}>
                        <Text style={[styles.elementTitle, {}]}>Objetivo (resumen)</Text>
                        <Text style={[styles.elementText,]}>{myProfile.goal}</Text>
                      </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Image
                        style={{flex: 1, resizeMode: 'contain', width: '100%', height: 100,}}
                        source={logoElementTargetFull}
                      />
                      <View style={{flex: 3, marginTop: 'auto', marginBottom: 'auto'}}>
                        <Text style={[styles.elementTitle, {}]}>Objetivo (completo)</Text>
                        <Text style={[styles.elementText,]}>{myProfile.goalFull}</Text>
                      </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Image
                        style={{flex: 1, resizeMode: 'contain', width: '100%', height: 100,}}
                        source={logoElementPhisical}
                      />
                      <View style={{flex: 3, marginTop: 'auto', marginBottom: 'auto'}}>
                        <Text style={[styles.elementTitle, {}]}>Altura</Text>
                        <Text style={[styles.elementText,]}>{myProfile.height} cm</Text>
                      </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Image
                        style={{flex: 1, resizeMode: 'contain', width: '100%', height: 100,}}
                        source={logoElementPhisical}
                      />
                      <View style={{flex: 3, marginTop: 'auto', marginBottom: 'auto'}}>
                        <Text style={[styles.elementTitle, {}]}>Peso</Text>
                        <Text style={[styles.elementText,]}>{myProfile.weight} Kg</Text>
                      </View>
                    </View>
                    <Mybutton
                      text="Cerrar sesión"
                      title="Cerrar sesión"
                      estilos={{
                          marginTop: 40,
                          marginBottom: 50
                      }}
                      customClick={() => console.log("Close session")}
                    />
                  </View>
                )}
              </KeyboardAwareScrollView>
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
    marginTop: 5,
    paddingTop: 0,
    height: 150,
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 10
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
    alignItems: 'left',
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
  },
  itemListTitle : {
    color: '#d32f2f',
    fontWeight: 'bold'
  },
  titleText: {
    color: '#d32f2f',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 20
  },
  emailText: {
    color: '#d32f2f',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 12
  },
  elementTitle: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14
  },
  elementText: {
    color: '#aaa',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10
  },
});

export default ProfileTab;