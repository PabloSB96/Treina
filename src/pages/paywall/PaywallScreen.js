import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Alert, FlatList } from 'react-native';
import PackageItem from '../components/PackageItem';

import Purchases from 'react-native-purchases';

const PaywallScreen = ({ navigation, route }) => {

  // - State for all available package
  const [packages, setPackages] = useState([]);

  // - State for displaying an overlay view
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    // Get current available packages
    const getPackages = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
          setPackages(offerings.current.availablePackages);
        }
      } catch (e) {
        Alert.alert('Error getting offers', e.message);
      }
    };

    getPackages();
  }, []);

  const header = () => {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.text}>Selecciona la subscripción que deseas realizar. Te explicamos las diferencias a continuación:</Text>
        <Text style={[styles.text, {fontSize: 12}]}><Text style={{fontWeight: 'bold'}}>Planes Básico de Treina</Text>. Tendrás acceso a todas las funcionalides de Treina, pero sólo podrás gestionar 5 clientes como máximo. ¡Empieza a gestionar tus deportistas! Además, en versiones futuras de Treina, con esta cuenta sólo trendrás acceso a funcionalidades que pasen a ser «básicas» para todos los tipos de cuenta.</Text>
        <Text style={[styles.text, {fontSize: 12}]}><Text style={{fontWeight: 'bold'}}>Planes Premium de Treina</Text>. Tendrás acceso a todas las funcionalides de Treina, y podrás gestionar hasta 10 clientes. ¡Gestionar, gestionar y gestionar tus deportistas! En versiones futuras de Treina, con esta cuenta tendrás acceso a algunas funcionalides premium que haya disponibles (ojo, pero no a todas, para eso está el plan Empresarial).</Text>
        <Text style={[styles.text, {fontSize: 12}]}><Text style={{fontWeight: 'bold'}}>Planes Empresarial de Treina</Text>. Tendrás acceso a todas las funcionalides de Treina y un número ilimitado de deportistas. ¡Gestiona sin parar! Además, en versiones futuras de Treina, con esta cuenta tendrás acceso a todas las funcionalidades que haya disponibles.</Text>
      </View>
    );
  };

  const footer = () => {
    return (
      <Text style={[styles.text, {fontSize: 12}]}>
        Términos y condiciones: https://treina.app/privacy-policy/
      </Text>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.page}>
        {/* The paywall flat list displaying each package */}
        <FlatList
          data={packages}
          renderItem={({ item }) => <PackageItem purchasePackage={item} setIsPurchasing={setIsPurchasing} />}
          keyExtractor={(item) => item.identifier}
          ListHeaderComponent={header}
          ListHeaderComponentStyle={styles.headerFooterContainer}
          ListFooterComponent={footer}
          ListFooterComponentStyle={styles.headerFooterContainer}
        />

        {isPurchasing && <View style={styles.overlay} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  /*container: {
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
  },*/
  page: {
    padding: 16,
    backgroundColor: '#ffffff00'
  },
  text: {
    color: 'black',
  },
  headerFooterContainer: {
    marginVertical: 10,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
});

export default PaywallScreen;