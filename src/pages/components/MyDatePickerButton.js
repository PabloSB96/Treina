import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const MyDatePickerButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.customClick}>

      <View style={{flexDirection: 'row'}}>
        <Icon style={styles.icon}
          name="calendar" size={30} color='#ffa726' />

        <Text style={styles.text}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    color: '#ffa726',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderColor: '#ffa726',
    borderWidth: 1,
    borderRadius: 10
  },
  text: {
    color: '#ffa726'
  },
  icon: {
    paddingBottom: 5,
    fontSize: 20,
    paddingRight: 5
  }
});

export default MyDatePickerButton;