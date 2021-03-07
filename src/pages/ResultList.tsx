import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../service/api';
import {useRoute, useNavigation} from '@react-navigation/native';
import {ScrollView, TouchableOpacity, FlatList} from 'react-native-gesture-handler';

interface Characters {
  created:number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: Array<string>;
  species: Array<string>;
  vehicles: Array<string>;
  starships: Array<string>;
}


export default function ResultLit() {
  const route = useRoute();
  const [page,SetPage] = useState(1)
  const [loading,SetLoading] = useState<boolean>(false)
  const [character, SetCharacter] = useState<Characters[]>([]);
  const [loadingMoreData,SetLoadingMoreData] = useState<boolean>(true)
  const navigation = useNavigation();
  useEffect(() => {
    api
      .get(`people/?page=1`)
      .then((res) => SetCharacter([...res.data.results]));
  }, []);


  async function handlePagination(){
    SetPage(page + 1)
    if(loading){
      return
    }
    SetLoading(true)
    const response = await api.get(`people/?page=${page}`)
    response.data.next ? null : SetLoadingMoreData(false)
    SetLoading(false)
    SetCharacter([...character,...response.data.results])
  }


  
  if (character.length === 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="black"/>
      </View>
    );
  }

  function footerList() {
    return (
      <>
      {loadingMoreData ? (
      <ActivityIndicator size="large" color="black"/>
      ):null}
      </>
    )
  }

  return (
    <View style={{flex:1}}>
      <FlatList 
      data={character}
      onEndReached={handlePagination}
      onEndReachedThreshold={0.2}
      ListFooterComponent={footerList}
      renderItem={({item:people})=> (
        <TouchableOpacity onPress={()=> console.log("nome do character",people.name)}>
        <View style={styles.characterContainer}>
        <Text style={styles.characterLabel}>Name:</Text>
        <Text style={styles.characterLabelText}>{people.name}</Text>
        <Text style={styles.characterLabel}>Gender:</Text>
        <Text style={styles.characterLabelText}>{people.gender}</Text>
        <Text style={styles.characterLabel}>Height:</Text>
        <Text style={styles.characterLabelText}>{people.height}</Text>
        <Text style={styles.characterLabel}>mass:</Text>
        <Text style={styles.characterLabelText}>{people.mass}</Text>
        <Text style={styles.characterLabel}>HairColor:</Text>
        <Text style={styles.characterLabelText}>{people.hair_color}</Text>
        <Text style={styles.characterLabel}>BirthYear:</Text>
        <Text style={styles.characterLabelText}>{people.birth_year}</Text>
        <Text style={styles.characterLabel}>SkinColor:</Text>
        <Text style={styles.characterLabelText}>{people.skin_color}</Text>
      </View>
      </TouchableOpacity>
      )}
      >
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  characterContainer: {
    flex:1,
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 28,
  },
  characterLabel: {
    fontSize: 20,
    marginTop: 12,
  },
  characterLabelText: {
    fontSize: 16,
    marginTop: 5,
  },
  favoriteButton: {
    width: 200,
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'silver',
  },
  BackHomeButton: {
    width: 200,
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  BackHomeButtonText: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
