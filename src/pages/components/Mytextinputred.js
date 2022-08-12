import React from 'react';
import { View, TextInput } from 'react-native';

const Mytextinputred = (props) => {
  return (
    <View
      style={{
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        borderColor: '#d32f2f',
        borderWidth: 1,
        borderRadius: 10
      }}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#d32f2f"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
      />
    </View>
  );
};

export default Mytextinputred;