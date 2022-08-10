import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Image, FlatList, Text } from 'react-native';
import Mytext from './../components/Mytext';
import MyActionButton from './../components/MyActionButton';
import logo from './../assets/wave-general.png';
import callImage from './../assets/icons/atopame_undraw_calling.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const PhoneNumbersTab = () => {

  let [phoneContacts, setPhoneContacts] = useState();

  useEffect(() => {
    setPhoneContacts(getPhoneContacts());
  }, []);

  let getPhoneContacts = () => {
    let phoneContact1 = {
      phoneNumber: '100000000',
      phoneName: 'LOREM IPSUM LOREM IPSUM',
      phoneDescription: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
    };
    let phoneContact2 = {
      phoneNumber: '200000000',
      phoneName: 'LOREM IPSUM LOREM IPSUM',
      phoneDescription: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
    };
    let phoneContact3 = {
      phoneNumber: '300000000',
      phoneName: 'LOREM IPSUM LOREM IPSUM',
      phoneDescription: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
    };
    let phoneContact4 = {
      phoneNumber: '400000000',
      phoneName: 'LOREM IPSUM LOREM IPSUM',
      phoneDescription: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
    };
    let phoneContact5 = {
      phoneNumber: '500000000',
      phoneName: 'LOREM IPSUM LOREM IPSUM',
      phoneDescription: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
    };
    let phoneContact6 = {
      phoneNumber: '600000000',
      phoneName: 'LOREM IPSUM LOREM IPSUM',
      phoneDescription: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
    };
    let result = [];
    result.push(phoneContact1);
    result.push(phoneContact2);
    result.push(phoneContact3);
    result.push(phoneContact4);
    result.push(phoneContact5);
    result.push(phoneContact6);
    return result;
  }

  let listItemView = (item) => {
    return (
      <View
        key={item.email}
        style={{ backgroundColor: '#ffa726', borderColor: '#ffa726', borderRadius: 20, borderWidth: 1, marginTop: 10, padding: 16, borderRadius: 10, flex: 3, flexDirection: "row", shadowOffset: {width: -2, height: 4}, shadowOpacity: 0.2, shadowRadius: 20, elevation: 10, shadowColor: '#52006A', }}>
        <View style={{flex: 3, margin: 0}}>
          <Text style={styles.boldText}>{item.phoneNumber}</Text>  
          <Text style={styles.textbottom}>{item.phoneName}</Text>
          <Text style={styles.descriptionbottom}>{item.phoneDescription}</Text>
        </View>

        <View style={{flex: 1, margin: 0, alignSelf: 'center'}}>
          <MyActionButton
            btnColor='#ffa726'
            btnIcon="phone"
            estilos={styles.actionButton}
            iconSize={24}
          />
        </View>

      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <KeyboardAwareScrollView>
          <Image
            style={styles.upperLogo}
            source={logo}
            />
          <FlatList
            scrollEnabled={false}
            style={{marginTop: 0, marginBottom: 20}}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
            data={phoneContacts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
            />
          <Image
            style={styles.image}
            source={callImage}
            />
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
  textbottom: {
    color: '#FFF'
  },
  descriptionbottom: {
    color: '#FFF',
    fontSize: 12
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
    marginBottom: 30,
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
});

export default PhoneNumbersTab;