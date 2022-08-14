import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Button, View, SafeAreaView, StyleSheet, Image, Text, FlatList, Alert, Modal, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import Mytext from '../components/Mytext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import noResultsLogo from '../assets/icons/treina_undraw_noresults.png';

import { useIsFocused } from '@react-navigation/native';
import Mytextbutton from '../components/Mytextbutton';

const TraineesTab = ({ navigation, route }) => {

  let isFocused = useIsFocused();

  let [loading, setLoading] = useState(false);
  let [trainees, setTrainees] = useState();
  let [userToken, setUserToken] = useState();
  let [detailsModalVisibility, setDetailsModalVisibility] = useState(false);
  let [detailsModalDescription, setDetailsModalDescription] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon name='question-circle' style={{right: 20, top: 3}} size={25} color='#fff' onPress={() => {
          Alert.alert(
            'Ayuda',
            'Para añadir un nuevo cliente, indícale el código de entrenador y que se registre en Treina usándolo. ¡Así de simple!',
            [{text: 'Ok'},],
            { cancelable: false }
          );
        }}  />
      )
    });
  }, [navigation]);

  useEffect(() => {
    setLoading(true);

    /*console.log(userToken);
    console.log("adfasdfajdkfljaslkñdf ---- 2");
    console.log(route.params.route.params.userToken);
    console.log("adfasdfajdkfljaslkñdf ---- 3");
    setUserToken(route.params.route.params.userToken);*/

    // TODO
    setTrainees(getMyTraineesAux());
    //getMyTrainees();

  }, [isFocused]);

  let getMyTraineesAux = () => {
    let obj1 = {
      id: 1,
      name: 'Pablo Sánchez',
      email: 'pablosanchezbello@gmail.com',
      lastMeasuresUpdate: 1646136000000
    };
    let obj2 = {
      id: 2,
      name: 'Samuel Sánchez',
      email: 'samuelsanchezbello@gmail.com',
      lastMeasuresUpdate: 1646136000000
    };
    let obj3 = {
      id: 1,
      name: 'Noelia Sopeña',
      email: 'noeliasopenha@gmail.com',
      lastMeasuresUpdate: 1646136000000
    };
    var result = [];
    result.push(obj1);
    result.push(obj2);
    result.push(obj3);
    setLoading(false);
    return result;
  }

  let getMyTrainees = () => {}

  let listItemView = (item) => {
    return (
      <View
        key={item.producto_id}
        style={{ backgroundColor: '#fff', borderColor: '#eee', borderRadius: 20, borderWidth: 1, marginTop: 10, padding: 16, borderRadius: 10, flex: 3, flexDirection: "row", shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 5, elevation: 3, shadowColor: '#222', }}>
        <View style={{flex: 3, margin: 0}}>
          <Text style={styles.boldText}>{item.name}</Text>
          <View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={[styles.labelText, {flex: 1}]}>Email</Text>
              <Text style={[styles.baseText, {flex: 2}]}>{item.email}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={[styles.labelText, {flex: 1}]}>Última revisión</Text>
              <Text style={[styles.baseText, {flex: 2}]}>{(new Date(item.lastMeasuresUpdate)).toLocaleDateString()}</Text>
            </View>
            <Mytextbutton 
              estilos={{alignSelf: 'flex-end', margin: 0, padding: 0}} 
              title="Ver"
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
        ): null}
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <KeyboardAwareScrollView nestedScrollEnabled={true}>
                {((trainees==undefined || trainees.length == 0) && loading == false ) ? (
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
                      text="Todavía no tienes ningún cliente." 
                      estilos={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#d32f2f',
                        textAlign: 'center',
                      }}/>
                  </View>
                ): (
                  <View>
                    <FlatList
                      style={{marginTop: 0, marginBottom: 20}}
                      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                      data={trainees}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => listItemView(item)}
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
    color: '#d32f2f',
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
    width: 60,
    height: 60,
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
  }
});

export default TraineesTab;