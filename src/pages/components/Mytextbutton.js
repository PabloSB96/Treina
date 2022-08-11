import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Mytextbutton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.estilos]}
      onPress={props.customClick}>

      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: '#d32f2f',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 5,
  },
  text: {
    color: '#d32f2f',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
});

export default Mytextbutton;