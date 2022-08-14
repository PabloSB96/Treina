import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const MyActionButton = (props) => {

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: props.btnColor }, props.estilos]}
      onPress={props.customClick}>

      <Icon style={styles.icon}
        name={props.btnIcon} size={props.iconSize} color={props.iconColor} />

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    color: '#ffffff',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  text: {
    color: '#ffffff',
  },
  icon: {
    textAlign: 'center'
  }
});

export default MyActionButton;