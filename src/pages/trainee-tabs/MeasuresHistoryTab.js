import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, FlatList, Alert, Modal, Pressable, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Mytext from '../components/Mytext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import noResultsLogo from '../assets/icons/treina_undraw_noresults.png';

import { useIsFocused } from '@react-navigation/native';
import Mytextbutton from '../components/Mytextbutton';
import { DataTable } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { set } from 'react-native-reanimated';

const MeasuresHistoryTab = ({ navigation, route }) => {

  let isFocused = useIsFocused();

  let [loading, setLoading] = useState(false);
  let [myHistory, setMyHistory] = useState();
  let [userToken, setUserToken] = useState();
  let [detailsModalVisibility, setDetailsModalVisibility] = useState(false);
  let [detailsModalDescription, setDetailsModalDescription] = useState('');
  let [detailsModalObservation, setDetailsModalObservation] = useState('');
  let [currentDay, setCurrentDay] = useState(0);
  let [weightChartLabels, setWeightChartLabels] = useState([]);
  let [weightChartValues, setWeightChartValues] = useState([]);

  useEffect(() => {
    setLoading(true);

    /*console.log(userToken);
    console.log("adfasdfajdkfljaslkñdf ---- 2");
    console.log(route.params.route.params.userToken);
    console.log("adfasdfajdkfljaslkñdf ---- 3");
    setUserToken(route.params.route.params.userToken);*/

    // TODO
    getMyHistoryAux();
    //getMyHistory();

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

    setMyHistory(result);
    updateWeightChartData();
    setLoading(false);
  }

  let getMyHistory = () => {
  }

  let updateWeightChartData = () => {
    if (myHistory != undefined) {
      var labels = [];
      var values = [];
      for (var i = 0; i < myHistory.length; i++) {
        labels.push((new Date(myHistory[i].created_at)).toLocaleDateString());
        values.push(myHistory[i].weight_kg);
      }
      setWeightChartLabels(labels);
      setWeightChartValues(values);
    }
  }

  let listItemView = (item) => {
    return (
      <DataTable.Row>
        <DataTable.Cell style={{minWidth: 80, left: -20}} >{(new Date(item.created_at)).toLocaleDateString()}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -70}} numeric>{item.height_cm}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -80}} numeric>{item.weight_kg}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -70}} numeric>{item.chest_cm}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -80}} numeric>{item.arm_cm}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -60}} numeric>{item.waist_cm}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -60}} numeric>{item.hip_cm}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -50}} numeric>{item.gluteus_cm}</DataTable.Cell>
        <DataTable.Cell style={{minWidth: 100, left: -40}} numeric>{item.thigh_cm}</DataTable.Cell>
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
        ): null}
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <KeyboardAwareScrollView nestedScrollEnabled={true}>
                {((myHistory==undefined || myHistory.length == 0) && loading == false ) ? (
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
                      text="Todavía no tienes datos de historial." 
                      estilos={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#d32f2f',
                        textAlign: 'center',
                      }}/>
                  </View>
                ): (
                  <View style={{margin: 30}}>
                    <View><Text style={[styles.titleText, {flex: 1}]}>Información física - Actual</Text></View>
                    <View style={{flex: 1}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={[styles.labelText, {flex: 1}]}>Altura (cm)</Text>
                        <Text style={[styles.baseText, {flex: 1}]}>{myHistory[myHistory.length - 1].height_cm}</Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={[styles.labelText, {flex: 1}]}>Peso (kg)</Text>
                        <Text style={[styles.baseText, {flex: 1}]}>{myHistory[myHistory.length - 1].weight_kg}</Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={[styles.labelText, {flex: 1}]}>Pecho (cm)</Text>
                        <Text style={[styles.baseText, {flex: 1}]}>{myHistory[myHistory.length - 1].chest_cm}</Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={[styles.labelText, {flex: 1}]}>Brazo (cm)</Text>
                        <Text style={[styles.baseText, {flex: 1}]}>{myHistory[myHistory.length - 1].arm_cm}</Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={[styles.labelText, {flex: 1}]}>Cintura (cm)</Text>
                        <Text style={[styles.baseText, {flex: 1}]}>{myHistory[myHistory.length - 1].waist_cm}</Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={[styles.labelText, {flex: 1}]}>Cadera (cm)</Text>
                        <Text style={[styles.baseText, {flex: 1}]}>{myHistory[myHistory.length - 1].hip_cm}</Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={[styles.labelText, {flex: 1}]}>Glúteo (cm)</Text>
                        <Text style={[styles.baseText, {flex: 1}]}>{myHistory[myHistory.length - 1].gluteus_cm}</Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={[styles.labelText, {flex: 1}]}>Muslo (cm)</Text>
                        <Text style={[styles.baseText, {flex: 1}]}>{myHistory[myHistory.length - 1].thigh_cm}</Text>
                      </View>
                    </View>
                    <View><Text style={[styles.titleText, {flex: 1, marginTop: 20}]}>Información física - Historial</Text></View>
                    <View>
                      <ScrollView horizontal={true}>
                        <DataTable>
                          <DataTable.Header>
                            <DataTable.Title style={{minWidth: 80}}>Fecha</DataTable.Title>
                            <DataTable.Title style={{minWidth: 100}}>Altura (cm)</DataTable.Title>
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
                    {myHistory != undefined ? (
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
              </KeyboardAwareScrollView>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {navigation.navigate('NewHistoryScreen')}}
                style={styles.touchableOpacityStyle}>
                <View style={{flex: 1}}>
                  <Icon style={{top: 0}} name='circle' size={60} color='#fff'  />
                  <Icon style={{top: -60}} name='plus-circle' size={60} color='#d32f2f'  />
                </View>
              </TouchableOpacity>
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
  labelText: {
    marginTop: 5,
    fontSize: 14,
    fontStyle: 'italic'
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
  },
  itemListTitle : {
    color: '#d32f2f',
    fontWeight: 'bold'
  },
});

export default MeasuresHistoryTab;