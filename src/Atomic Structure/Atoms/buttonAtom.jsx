import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ButtonAtom = ({ buttonStyle,children,_onPress }) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={_onPress}>
     {children}
    </TouchableOpacity>
  )
};

export default ButtonAtom;
