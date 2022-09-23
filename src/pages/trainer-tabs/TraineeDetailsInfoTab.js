import React, { useEffect, useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { View, SafeAreaView, StyleSheet, Image, Text, FlatList, Alert, Modal, Pressable, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Mytext from '../components/Mytext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import noResultsLogo from '../assets/icons/treina_undraw_noresults.png';
import logoProfile from '../assets/icons/treina_undraw_profile.png';
import logoElementHeightWeight from '../assets/icons/treina_undraw_element_heightweight.png';
import logoElementTarget from '../assets/icons/treina_undraw_profile_element_target.png';
import logoElementTargetFull from '../assets/icons/treina_undraw_profile_element_targetfull.png';
import logoSexH from '../assets/icons/treina_undraw_man.png';
import logoSexM from '../assets/icons/treina_undraw_woman.png';
import logoSexX from '../assets/icons/treina_undraw_othergender.png';

import { useIsFocused } from '@react-navigation/native';
import Mytextbutton from '../components/Mytextbutton';
import { DataTable } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { set } from 'react-native-reanimated';

import { configuration } from '../configuration';

const TraineeDetailsInfoTab = ({ navigation, route }) => {

  let isFocused = useIsFocused();

  let [loading, setLoading] = useState(false);
  let [myHistory, setMyHistory] = useState();
  let [myProfile, setMyProfile] = useState();
  let [userToken, setUserToken] = useState();
  let [detailsModalVisibility, setDetailsModalVisibility] = useState(false);
  let [detailsModalDescription, setDetailsModalDescription] = useState('');
  let [detailsModalObservation, setDetailsModalObservation] = useState('');
  let [currentDay, setCurrentDay] = useState(0);
  let [weightChartLabels, setWeightChartLabels] = useState([]);
  let [weightChartValues, setWeightChartValues] = useState([]);

  useEffect(() => {
    setLoading(true);
    getMyHistory();
  }, [isFocused]);

  let getMyHistoryAux = () => {
    let obj1 = {
      id: 1,
      height_cm: 175,
      weight_kg: 76,
      chest_cm: 109,
      arm_cm: 23,
      waist_cm: 60,
      hip_cm: 53,
      gluteus_cm: 30,
      thigh_cm: 60,
      created_at: 1646136000000
    };
    let obj2 = {
      id: 2,
      height_cm: 175,
      weight_kg: 74,
      chest_cm: 109,
      arm_cm: 23,
      waist_cm: 60,
      hip_cm: 53,
      gluteus_cm: 30,
      thigh_cm: 60,
      created_at: 1648814400000
    };
    let obj3 = {
      id: 3,
      height_cm: 175,
      weight_kg: 70,
      chest_cm: 100,
      arm_cm: 20,
      waist_cm: 55,
      hip_cm: 44,
      gluteus_cm: 29,
      thigh_cm: 59,
      created_at: 1651406400000
    };
    var result = [];
    result.push(obj1);
    result.push(obj2);
    result.push(obj3);

    updateWeightChartData(result);
  }

  let getMyHistory = () => {
    axios.post(`${configuration.BASE_URL}/trainer/trainees/` + route.params.userId + `/history`, {}, {
      headers: {
        token: route.params.userToken
      }
    }).then((response) => {
      updateWeightChartData(response.data);
      return ;
    }).catch((error) => {
      setLoading(false);
      Alert.alert(
        'Atención',
        'Ha ocurrido un problema. Inténtalo de nuevo más tarde o contáctanos en: treina.ayuda@gmail.com',
        [{text: 'Ok'},],
        { cancelable: false }
      );
    });
  }

  let getMyProfileInfoAux = () => {
    let result = {
      id: 1,
      name: 'Pablo Sánchez',
      email: 'pablosanchez@gmail.com',
      sex: 'H',
      goal: 'Perder peso',
      goalFull: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumpeso.',
      height: 180,
      weight: 74
    };
    return result;
  }

  let getMyProfileInfo = () => {
    axios.post(`${configuration.BASE_URL}/trainer/trainees/` + route.params.userId + `/profile`, {}, {
      headers: {
        token: route.params.userToken
      }
    }).then((response) => {
      setMyProfile(response.data);
      setLoading(false);
      return ;
    }).catch((error) => {
      setLoading(false);
      Alert.alert(
        'Atención',
        'Ha ocurrido un problema. Inténtalo de nuevo más tarde o contáctanos en: treina.ayuda@gmail.com',
        [{text: 'Ok'},],
        { cancelable: false }
      );
    });
  }

  let updateWeightChartData = (historyData) => {
    if (historyData != undefined) {
      var labels = [];
      var values = [];
      for (var i = 0; i < historyData.length; i++) {
        labels.unshift((new Date(historyData[i].createdAt)).toLocaleDateString());
        values.unshift(historyData[i].weightKg);
      }
      setWeightChartLabels(labels);
      setWeightChartValues(values);
      setMyHistory(historyData);
      getMyProfileInfo();
      setLoading(false);
    }
  }

  let listItemView = (item) => {
    return (
      <DataTable.Row>
        <DataTable.Cell style={{minWidth: 80, left: -20}} >{(new Date(item.createdAt)).toLocaleDateString()}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -80}} numeric>{item.weightKg}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -70}} numeric>{item.chestCm}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -80}} numeric>{item.armCm}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -60}} numeric>{item.waistCm}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -60}} numeric>{item.hipCm}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -50}} numeric>{item.gluteusCm}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -40}} numeric>{item.thighCm}</DataTable.Cell>
      </DataTable.Row>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#d32f2f" />
          </View>
        ): (
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView nestedScrollEnabled={true}>
                  <View style={{flex: 1}}>
                    {(myProfile != undefined && loading == false ) ? (
                      <View style={{padding: 20}}>
                        <Image
                          style={styles.upperLogo}
                          source={logoProfile}
                        />
                        <View><Text style={[styles.profileTitleText, {flex: 1}]}>{myProfile.name}</Text></View>
                        <View><Text style={[styles.emailText, {flex: 1}]}>{myProfile.email}</Text></View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          {myProfile.sex == 'H' ? (
                            <Image
                            style={{flex: 1, resizeMode: 'contain', width: '100%', height: 100,}}
                            source={logoSexH}
                          />
                          ) : null}
                          {myProfile.sex == 'M' ? (
                            <Image
                            style={{flex: 1, resizeMode: 'contain', width: '100%', height: 100,}}
                            source={logoSexM}
                          />
                          ) : null}
                          {myProfile.sex == 'X' ? (
                            <Image
                            style={{flex: 1, resizeMode: 'contain', width: '100%', height: 100,}}
                            source={logoSexX}
                          />
                          ) : null}
                          <View style={{flex: 3, marginTop: 'auto', marginBottom: 'auto'}}>
                            <Text style={[styles.elementTitle, {}]}>Sexo</Text>
                            {myProfile.sex == 'H' ? (
                              <Text style={[styles.elementText,]}>Hombre</Text>
                            ) : null }
                            {myProfile.sex == 'M' ? (
                              <Text style={[styles.elementText,]}>Mujer</Text>
                            ) : null }
                            {myProfile.sex == 'X' ? (
                              <Text style={[styles.elementText,]}>Otro/a</Text>
                            ) : null }
                          </View>
                        </View>
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
                            source={logoElementHeightWeight}
                          />
                          <View style={{flex: 3, marginTop: 'auto', marginBottom: 'auto'}}>
                            <Text style={[styles.elementTitle, {}]}>Peso inicial (kg)</Text>
                            <Text style={[styles.elementText,]}>{myProfile.weight}</Text>
                            <Text style={[styles.elementTitle, {}]}>Altura inicial (cm)</Text>
                            <Text style={[styles.elementText,]}>{myProfile.height}</Text>
                          </View>
                        </View>
                      </View>
                    ) : null}
                    {((myHistory==undefined || myHistory.length == 0) && loading == false ) ? (
                      <View style={{flex: 1, margin: 30}}>
                        <View><Text style={[styles.titleText, {flex: 1}]}>Información física - Actual</Text></View>
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
                          text="Todavía no hay datos de historial." 
                          estilos={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#d32f2f',
                            textAlign: 'center',
                          }}/>
                      </View>
                    ): (
                      <View style={{margin: 30, marginTop: 10}}>
                        <View><Text style={[styles.titleText, {flex: 1}]}>Información física - Actual</Text></View>
                        <View style={{flex: 1}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={[styles.labelText, {flex: 1}]}>Peso (kg)</Text>
                            <Text style={[styles.baseText, {flex: 1}]}>{myHistory[0].weightKg}</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={[styles.labelText, {flex: 1}]}>Pecho (cm)</Text>
                            <Text style={[styles.baseText, {flex: 1}]}>{myHistory[0].chestCm}</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={[styles.labelText, {flex: 1}]}>Brazo (cm)</Text>
                            <Text style={[styles.baseText, {flex: 1}]}>{myHistory[0].armCm}</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={[styles.labelText, {flex: 1}]}>Cintura (cm)</Text>
                            <Text style={[styles.baseText, {flex: 1}]}>{myHistory[0].waistCm}</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={[styles.labelText, {flex: 1}]}>Cadera (cm)</Text>
                            <Text style={[styles.baseText, {flex: 1}]}>{myHistory[0].hipCm}</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={[styles.labelText, {flex: 1}]}>Glúteo (cm)</Text>
                            <Text style={[styles.baseText, {flex: 1}]}>{myHistory[0].gluteusCm}</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={[styles.labelText, {flex: 1}]}>Muslo (cm)</Text>
                            <Text style={[styles.baseText, {flex: 1}]}>{myHistory[0].thighCm}</Text>
                          </View>
                        </View>
                        <View><Text style={[styles.titleText, {flex: 1, marginTop: 20}]}>Información física - Historial</Text></View>
                        <View>
                          <ScrollView horizontal={true}>
                            <DataTable>
                              <DataTable.Header>
                                <DataTable.Title style={{minWidth: 80}}>Fecha</DataTable.Title>
                                <DataTable.Title style={{minWidth: 100}}>Peso (kg)</DataTable.Title>
                                <DataTable.Title style={{minWidth: 100}}>Pecho (cm)</DataTable.Title>
                                <DataTable.Title style={{minWidth: 100}}>Brazo (cm)</DataTable.Title>
                                <DataTable.Title style={{minWidth: 100}}>Cintura (cm)</DataTable.Title>
                                <DataTable.Title style={{minWidth: 100}}>Cadera (cm)</DataTable.Title>
                                <DataTable.Title style={{minWidth: 100}}>Glúteo (cm)</DataTable.Title>
                                <DataTable.Title style={{minWidth: 100}}>Muslo (cm)</DataTable.Title>
                              </DataTable.Header>
                              <FlatList
                                style={{marginTop: 0, marginBottom: 20}}
                                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                                data={myHistory}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => listItemView(item)}
                                />
                            </DataTable>
                          </ScrollView>
                        </View>
                        {weightChartValues != undefined ? (
                          <View>
                            <View><Text style={[styles.titleText, {flex: 1}]}>Información física - Evolución peso</Text></View>
                            <ScrollView horizontal={true}>
                              <LineChart 
                                data={{
                                  labels: weightChartLabels,
                                  datasets: [
                                    {
                                      data: weightChartValues
                                    }
                                  ]
                                }}
                                width={Dimensions.get("window").width} // from react-native
                                height={220}
                                yAxisLabel=""
                                yAxisSuffix="kg"
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                  backgroundColor: "#e26a00",
                                  backgroundGradientFrom: "#d32f2f",
                                  backgroundGradientTo: "#d32f2f",
                                  decimalPlaces: 2, // optional, defaults to 2dp
                                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                  style: {
                                    borderRadius: 16
                                  },
                                  propsForDots: {
                                    r: "4",
                                    strokeWidth: "2",
                                    stroke: "#000000"
                                  }
                                }}
                                bezier
                                style={{
                                  marginVertical: 8,
                                  borderRadius: 16,
                                }}
                              />
                            </ScrollView>
                          </View>
                        ) : null}
                      </View>
                    )}
                  </View>
                </KeyboardAwareScrollView>
              </View>
            </View>
          </View>
        )}
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
    fontSize: 14
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    marginTop: 10
  },
  titleText: {
    color: '#d32f2f',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5
  },
  profileTitleText: {
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
  labelText: {
    marginTop: 5,
    fontSize: 14,
    fontStyle: 'italic'
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
    alignItems: 'flex-start',
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
});

export default TraineeDetailsInfoTab;