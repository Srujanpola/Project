import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextAtom from '../Atoms/textAtom';
import ButtonAtom from '../Atoms/buttonAtom';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const MatchCard = ({ match, handleFavourite }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  return (
    <View style={styles.container}>
      <TextAtom
        text={`${match.team1} vs ${match.team2}`}
        textStyle={styles.header}
      />
      <TextAtom text={`venue: ${match.venue}`} />
      <TextAtom text={match.dateTime.split('T')[0]} />
      <TextAtom text={match.score1} />
      <TextAtom text={match.score2} />
      <TextAtom text={match.team2Overs} />
      <TextAtom text={match.status} />
      <TextAtom text={match.toss} />
      <TextAtom text={match.result} />
      <ButtonAtom
        _onPress={() => {
          handleFavourite(match, isFavourite);
          setIsFavourite(!isFavourite);
        }}
        buttonStyle={[
          styles.button,
          isFavourite ? styles.unFavouriteButton : styles.favouriteButton,
        ]}
      >
        <TextAtom text={isFavourite ? 'unFavorite' : 'Favourite'} />
      </ButtonAtom>
    </View>
  );
};

export default MatchCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp(90),
    marginVertical: hp(2),
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    borderRadius: wp(2),
    padding: wp(5),
    gap: wp(2),
  },
  teamContainer: {
    flexDirection: 'row',
  },
  header: {
    fontSize: wp(5),
    fontWeight: 'bold',
  },
  unFavouriteButton: {
    backgroundColor: 'red',
  },
  favouriteButton: {
    backgroundColor: 'green',
  },
  button: {
    width: wp(25),
    borderWidth: 2,
    padding: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
  },
});
