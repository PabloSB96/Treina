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
          name="calendar" size={30} color='#d32f2f' />

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
    color: '#9a0007',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderColor: '#9a0007',
    borderWidth: 1,
    borderRadius: 10
  },
  text: {
    color: '#d32f2f',
    paddingTop: 3
  },
  icon: {
    paddingBottom: 5,
    fontSize: 20,
    paddingRight: 5
  }
});

export default MyDatePickerButton;