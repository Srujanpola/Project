import React from 'react';
import { TextInput } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const InputAtom = ({ placeholder, value, onChangeText }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={'#000'}
      value={value}
      onChangeText={onChangeText}
      style={{
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        backgroundColor: '#fff',
        width: wp(90),
        color: '#000',
        marginVertical: hp(2),
      }}
    />
  );
};

export default InputAtom;
