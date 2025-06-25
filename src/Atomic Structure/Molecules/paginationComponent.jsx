import React, { forwardRef } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ButtonAtom from '../Atoms/buttonAtom';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const PaginationComponent = ({
  divs,
  setpaginationCount,
  paginationCount,
  startIndex,
  setStartIndex,
}) => {
  const data = Array.from({ length: divs }, (_, i) => i + 1);
  console.log('PaginationComponent Rendered', paginationCount * 10);
  return (
    <View style={styles.container}>
      <View style={styles.paginationContainer}>
        <ButtonAtom
          buttonStyle={[styles.buttonStyle, { backgroundColor: 'green' }]}
          _onPress={() => {
            if (paginationCount > 1) {
              const newPaginationCount = paginationCount - 1;
              setpaginationCount(newPaginationCount);
              if (newPaginationCount <= startIndex) {
                setStartIndex(newPaginationCount - 1);
              }
            }
          }}
        >
          <Text style={{ color: '#fff' }}>{'<'}</Text>
        </ButtonAtom>
        {data.slice(startIndex, startIndex + 3).map((item, index) => (
          <ButtonAtom
            key={index}
            _onPress={() => {
              console.log('Pagination Count:', item);
              setpaginationCount(parseInt(item));
            }}
            buttonStyle={[
              styles.buttonStyle,
              item === paginationCount
                ? { backgroundColor: '#007BFF' }
                : { backgroundColor: 'gray' },
            ]}
          >
            <Text style={{ color: '#fff' }}>{item}</Text>
          </ButtonAtom>
        ))}
        <ButtonAtom
          _onPress={() => {
            if (paginationCount < divs) {
              const newPaginationCount = paginationCount + 1;
              setpaginationCount(newPaginationCount);
              if (newPaginationCount > startIndex + 3) {
                setStartIndex(newPaginationCount - 3);
              }
            }
          }}
          buttonStyle={[styles.buttonStyle, { backgroundColor: 'green' }]}
        >
          <Text style={{ color: '#fff' }}>{'>'}</Text>
        </ButtonAtom>
      </View>
    </View>
  );
};

export default PaginationComponent;

const styles = StyleSheet.create({
  container: {
    height: hp(5),
    width: wp(80),
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(3.5),
    width: '100%',
  },
  buttonStyle: {
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    marginHorizontal: wp(1.5),
  },
});
