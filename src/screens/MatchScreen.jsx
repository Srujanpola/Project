//I added Inline Styles in the project as I didn't got time to explicilty add all  styles in the StyleSheet

import React, { useEffect, useState, useRef, use } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { matches } from '../data/data';
import InputAtom from '../Atomic Structure/Atoms/InputAtom';
import MatchCard from '../Atomic Structure/Molecules/MatchCard';
import { Button } from 'react-native/types_generated/index';
import ButtonAtom from '../Atomic Structure/Atoms/buttonAtom';
import TextAtom from '../Atomic Structure/Atoms/textAtom';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PaginationComponent from '../Atomic Structure/Molecules/paginationComponent';
const MatchScreen = () => {
  const [favouties, setFavorites] = useState([]);
  const [startIndex, setStartIndex] = React.useState(0);
  const [search, setSearch] = useState('');
  const [showFavouties, setShowFavouties] = useState(false);
  const [matchesList, setMatchesList] = useState(matches);
  const [paginationCount, setPaginationCount] = useState(1);
  const flatListRef = useRef();
  const isFetchingRef = useRef(false);
  const ScrollCountRef = useRef(0);
  const doesNewMatchesAdded = useRef(false);
  const handleFavourite = (match, isFavourite) => {
    if (isFavourite) {
      setFavorites(favouties.filter(item => item.id !== match.id));
    } else {
      setFavorites([...favouties, match]);
    }
  };
  const handleSearch = text => {
    setSearch(text);
    if (text.length > 0) {
      const pagesToRender = 10 * (paginationCount - 1) + 1;
      console.log('pagesToRender', pagesToRender);
      setMatchesList(
        matchesList.filter(item => {
          const bothtext =
            item.team1.toLowerCase() + 'vs' + item.team2.toLowerCase();
          return (
            item.team1
              .toLowerCase()
              .includes(text.toLowerCase().split('vs')[0].trim()) ||
            item.team2
              .toLowerCase()
              .includes(text.toLowerCase().split('vs')[1]?.trim()) ||
            bothtext.includes(text.toLowerCase())
          );
        }),
      );
    } else {
      setMatchesList(matches);
    }
  };

  useEffect(() => {
    console.log('startIndex', startIndex);
  }, [startIndex]);
  useEffect(() => {
    console.log('Added new list');
  }, [matchesList]);
  const handleMatches = () => {
    const teams = ['ind', 'aus', 'pak', 'zim', 'eng'];
    const status = ['live', 'finished'];
    const newMatches = [];
    for (let i = matches.length; i <= 50000; i++) {
      const newMatch = {
        id: i + 2,
        dateTime: '2025-06-15T19:30:00Z',
        venue: 'Wankhede Stadium, Mumbai',
        team1: teams[Math.floor(Math.random() * teams.length)],
        team2: teams[Math.floor(Math.random() * teams.length)],
        score1: `${Math.floor(Math.random() * 200)}/${Math.floor(
          Math.random() * 10,
        )}`,
        team1Overs: `${(Math.random() * 20).toFixed(1)}`,
        score2: `${Math.floor(Math.random() * 200)}/${Math.floor(
          Math.random() * 10,
        )}`,
        team2Overs: `${(Math.random() * 20).toFixed(1)}`,
        status: status[Math.floor(Math.random() * status.length)],
        toss: `${
          Math.random() < 0.5 ? 'team1' : 'team2'
        } won the toss and chose to bat`,
        result:
          status === 'finished'
            ? `${Math.random() < 0.5 ? 'team1' : 'team2'} won the Match`
            : 'Match ongoing',
      };
      newMatches.push(newMatch);
    }
    setMatchesList([...matchesList, ...newMatches]);
    matches.push(...newMatches);
    doesNewMatchesAdded.current = true;
  };
  const renderMatchCard = ({ item }) => {
    return (
      <>
        <MatchCard match={item} handleFavourite={handleFavourite} />
      </>
    );
  };

  useEffect(() => {
    if (ScrollCountRef.current < 1) return;
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    ScrollCountRef.current = 0;
  }, [paginationCount]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: wp(90),
        }}
      >
        <ButtonAtom
          _onPress={() => {
            setShowFavouties(!showFavouties);
          }}
          buttonStyle={{
            borderwidth: 1,
            borderColor: '#000',
            borderColor: 'black',
            backgroundColor: '#fff',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 2 },
            shadowRadius: 2,
            borderRadius: wp(2),
            padding: wp(2),
          }}
        >
          <TextAtom
            text={showFavouties ? 'Hide Favourites' : 'Show Favourites'}
          ></TextAtom>
        </ButtonAtom>
        <ButtonAtom
          _onPress={() => {
            handleMatches();
          }}
          buttonStyle={{
            borderwidth: 1,
            borderColor: '#000',
            borderColor: 'black',
            backgroundColor: '#fff',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 2 },
            shadowRadius: 2,
            borderRadius: wp(2),
            padding: wp(2),
          }}
        >
          <TextAtom text={'Add 50000 Matches'}></TextAtom>
        </ButtonAtom>
      </View>
      <InputAtom
        placeholder={'Search'}
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        ref={flatListRef}
        data={
          showFavouties
            ? favouties
            : matchesList.slice(paginationCount * 10 - 10, 10 * paginationCount)
        }
        renderItem={renderMatchCard}
        keyExtractor={(item, index) => index}
        // onScroll={event => {
        //   const offsetY = event.nativeEvent.contentOffset.y;
        //   if (offsetY <= 0) {
        //     console.log('Top reached!');
        //     if (paginationCount > 1) {
        //       const newPaginationCount = paginationCount - 1;
        //       setPaginationCount(newPaginationCount);
        //       if (newPaginationCount <= startIndex) {
        //         setStartIndex(newPaginationCount - 1);
        //       }
        //     }
        //   }
        // }}
        onEndReached={() => {
          if (isFetchingRef.current) {
            return;
          }
          if (doesNewMatchesAdded.current && ScrollCountRef.current >= 1) {
            const newPaginationCount = paginationCount + 1;
            setPaginationCount(newPaginationCount);
            if (newPaginationCount > startIndex + 3) {
              setStartIndex(newPaginationCount - 3);
            }
            isFetchingRef.current = true;
            setTimeout(() => {
              isFetchingRef.current = false;
            }, 1000);
          }
          ScrollCountRef.current += 1;
        }}
      />
      <PaginationComponent
        divs={Math.round(matchesList.length / 10)}
        setpaginationCount={setPaginationCount}
        paginationCount={paginationCount}
        startIndex={startIndex}
        setStartIndex={setStartIndex}
      />
    </View>
  );
};

export default MatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp(5),
    paddingVertical: hp(2),
    gap: wp(2),
  },
});
