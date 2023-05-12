import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet, Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import { useNavigation } from '@react-navigation/native';

import { configuration } from '../configuration';
import axios from 'axios';

const PackageItem = ({purchasePackage, setIsPurchasing, email}) => {
  const {
    product: { title, description, priceString, identifier },
  } = purchasePackage;

  const navigation = useNavigation();

  const onSelection = async () => {
    setIsPurchasing(true);

    console.log("\n\n\nPackageItem - 1");
    console.log("identifier: " + identifier);
    console.log("description: " + description);
    console.log("priceString: " + priceString);
    console.log("email: " + email);
    console.log("PackageItem - 2\n\n\n");
    if (identifier == configuration.TRIAL_ID) {
      // user purchased trial package
      // just register the trial with specific end point
      console.log("\n\n\nPackageItem - register /plan/trial\n\n\n");
      axios.post(`${configuration.BASE_URL}/plan/trial`, {
        email: email
      }).then((response) => {
        // GO TO LOGIN
        Alert.alert('Cuenta registrada correctamente', 'Su cuenta ha sido activada correctamente. A continuación inicia sesión y ¡empieza a probar Treina! Recuérda que tienes ' + configuration.TRIAL_NUMBER_DAYS + ' días de prueba. Luego podrás suscribirte a uno de los planes y continuar usando la misma información que ya hayas introducido en Treina.');
        navigation.replace('LoginScreen');
        return ;
      }).catch((error) => {
        Alert.alert('Ha ocurrido un problema', 'Su cuenta no ha sido activada porque no hemos podido registrar su plan de prueba. Inicia sesión e intenta volver a suscribirte. En caso de que este problema se repita, contacta con nosotros en: treina.ayuda@gmail.com');
        navigation.replace('LoginScreen');
        return ;
      });
    } else {
      const customerInfo = await Purchases.getCustomerInfo();
      try {
        const { purchaserInfo } = await Purchases.purchasePackage(purchasePackage);

        let customerInfo = await Purchases.getCustomerInfo();

        if (typeof customerInfo.entitlements.active[configuration.ENTITLEMENT_ID] == undefined) {
          axios.post(`${configuration.BASE_URL}/registerPurchaseError`, {
            email: email,
            revenuecat: purchasePackage,
            message: 'Error: developm8.com.treina: Error in PackageItem, typeof customerInfo.entitlments.active[configuration.ENTITLMENT_ID] == undefined, it seems that an error ocurred. purchasePackage object attached as revenueCat object.'
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
        } else {
          // Update treina-service with the information about the purchasePackage (package that was purchased)
          // TODO: call service /plan/register
          axios.post(`${configuration.BASE_URL}/plan/register`, {
            email: email,
            revenuecat: customerInfo
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
        {title != '' ? <Text style={styles.title}>{title}</Text> : null}
        {title == '' && identifier == 'treina_10_1m_0w0' ? <Text style={styles.title}>Plan Básico (mensual)</Text> : null}
        {title == '' && identifier == 'treina_15_1m_0w0' ? <Text style={styles.title}>Plan Premium (mensual)</Text> : null}
        {title == '' && identifier == 'treina_30_1m_0w0' ? <Text style={styles.title}>Plan Empresarial (mensual)</Text> : null}
        {title == '' && identifier == 'treina_100_1y_0w0' ? <Text style={styles.title}>Plan Básico (anual)</Text> : null}
        {title == '' && identifier == 'treina_150_1y_0w0' ? <Text style={styles.title}>Plan Premium (anual)</Text> : null}
        {title == '' && identifier == 'treina_300_1y_0w0' ? <Text style={styles.title}>Plan Empresarial (anual)</Text> : null}
        {description != '' ? <Text style={styles.terms}>{description}</Text> : null}
        {description == '' && identifier == 'treina_10_1m_0w0' ? <Text style={styles.terms}>Plan Básico - Renovación mensual</Text> : null}
        {description == '' && identifier == 'treina_15_1m_0w0' ? <Text style={styles.terms}>Plan Premium - Renovación mensual</Text> : null}
        {description == '' && identifier == 'treina_30_1m_0w0' ? <Text style={styles.terms}>Plan Empresarial - Renovación mensual</Text> : null}
        {description == '' && identifier == 'treina_100_1y_0w0' ? <Text style={styles.terms}>Plan Básico - Renovación anual</Text> : null}
        {description == '' && identifier == 'treina_150_1y_0w0' ? <Text style={styles.terms}>Plan Premium - Renovación anual</Text> : null}
        {description == '' && identifier == 'treina_300_1y_0w0' ? <Text style={styles.terms}>Plan Empresarial - Renovación anual</Text> : null}
      </View>
      {identifier == configuration.TRIAL_ID ? (
        <View style={styles.labelFree}><Text style={styles.titleFree}>Gratis</Text></View>
      ) : (
        <Text style={styles.title}>{priceString}</Text>
      )}
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
  labelFree: {
    backgroundColor: '#cc0000',
    fontWeight: 'bold',
    height: 30,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  titleFree: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  terms: {
    color: 'black',
  },
});

export default PackageItem;