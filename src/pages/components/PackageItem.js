import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet, Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import { useNavigation } from '@react-navigation/native';

import { configuration } from '../configuration';
import axios from 'axios';

const PackageItem = ({purchasePackage, setIsPurchasing, email}) => {
  const {
    product: { title, description, priceString },
  } = purchasePackage;

  const navigation = useNavigation();

  const onSelection = async () => {
    setIsPurchasing(true);

    const customerInfo = await Purchases.getCustomerInfo();

    try {
      const { purchaserInfo } = await Purchases.purchasePackage(purchasePackage);

      if (typeof purchaserInfo.entitlements.active[configuration.ENTITLEMENT_ID] !== 'undefined') {
        navigation.goBack();
      } else {
        // Update treina-service with the information about the purchasePackage (package that was purchased)
        // TODO: call service /plan/register
        axios.post(`${configuration.BASE_URL}/plan/register`, {
          email: email,
          revenuecat: purchasePackage
        }).then((response) => {
          // GO TO LOGIN
          Alert.alert('Cuenta registrada correctamente', 'Su cuenta ha sido activada correctamente. A continuación inicia sesión y ¡empieza a gestionar tus clientes!');
          navigation.replace('LoginScreen');
          return ;
        }).catch((error) => {
          Alert.alert('Cuenta registrada', 'Su cuenta ha sido activada. A continuación inicia sesión y ¡empieza a gestionar tus clientes!');
          navigation.replace('LoginScreen');
          return ;
        });
      }
    } catch (e) {
      if (!e.userCancelled) {
        //Alert.alert('Error purchasing package', e.message);
        // CÓDIGO PROVISIONAL PARA SIMULAR COMPORTAMIENTO CORRECTO
        axios.post(`${configuration.BASE_URL}/registerPurchaseError`, {
          email: email,
          revenuecat: purchasePackage,
          message: JSON.stringify(e.message)
        }).then((response) => {
          // GO TO LOGIN
          Alert.alert('Ha ocurrido un problema', 'Su cuenta no ha sido activada porque no te has podido suscribir a ningún plan. Inicia sesión e intenta volver a suscribirte. En caso de que este problema se repita, contacta con nosotros en: treina.ayuda@gmail.com');
          navigation.replace('LoginScreen');
          return ;
        }).catch((error) => {
          Alert.alert('Ha ocurrido un problema', 'Su cuenta no ha sido activada porque no te has podido suscribir a ningún plan. Inicia sesión e intenta volver a suscribirte. En caso de que este problema se repita, contacta con nosotros en: treina.ayuda@gmail.com');
          navigation.replace('LoginScreen');
          return ;
        });
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <Pressable onPress={onSelection} style={[{
      backgroundColor: '#fff', 
      borderColor: '#eee', 
      borderRadius: 20, 
      borderWidth: 1, 
      marginTop: 10, 
      padding: 16, 
      paddingTop: 8, 
      borderRadius: 10, 
      flex: 3, 
      flexDirection: "row", 
      shadowOffset: {width: -2, height: 4}, 
      shadowOpacity: 0.2, 
      shadowRadius: 5, 
      elevation: 3, 
      shadowColor: '#222' }]}>
      <View style={{flex: 1, flexDirection: 'row', ...Platform.select({ios: {flexDirection: 'column'}})}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.terms}>{description}</Text>
      </View>
      <Text style={styles.title}>{priceString}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#242424',
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  terms: {
    color: 'black',
  },
});

export default PackageItem;