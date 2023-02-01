import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import Purchases from 'react-native-purchases';
import { useNavigation } from '@react-navigation/native';

import { configuration } from '../configuration';

const PackageItem = ({purchasePackage, setIsPurchasing}) => {
  const {
    product: { title, description, priceString },
  } = purchasePackage;

  const navigation = useNavigation();

  const onSelection = async () => {
    setIsPurchasing(true);

    const customerInfo = await Purchases.getCustomerInfo();
    console.log("paywall - customerInfo - 1");
    console.log(customerInfo);
    console.log("paywall - customerInfo - 2");
    // customerInfo.entitlements.active[0].productIdentifier

    console.log("paywall - 1");
    console.log(purchasePackage);
    console.log("paywall - 2");

    try {
      const { purchaserInfo } = await Purchases.purchasePackage(purchasePackage);

      if (typeof purchaserInfo.entitlements.active[configuration.ENTITLEMENT_ID] !== 'undefined') {
        navigation.goBack();
      }
    } catch (e) {
      if (!e.userCancelled) {
        Alert.alert('Error purchasing package', e.message);
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
      <View style={{flex: 1, flexDirection: 'row'}}>
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