import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const MyActionButton = (props) => {

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: props.btnColor }, props.estilos]}
      onPress={props.customClick}>

      <Icon style={styles.icon}
        name={props.btnIcon} size={props.iconSize} color='white' />

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-end',
    color: '#ffffff',
    width: 50
  },
  text: {
    color: '#ffffff',
  },
  icon: {
    paddingBottom: 5,
  }
});

export default MyActionButton;