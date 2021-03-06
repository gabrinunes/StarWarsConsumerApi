import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
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

interface Planet {
  name: string;
}

export default function ResultLit() {
  const route = useRoute();
  //const {goBack} = useNavigation();
  const [page,SetPage] = useState(1)
  const [loading,SetLoading] = useState<boolean>(false)
  const [character, SetCharacter] = useState<Characters[]>([]);
  const [planets, SetPlanets] = useState<Planet | undefined>();
  //const searchText = route.params.search;
  const navigation = useNavigation();
  useEffect(() => {
    api
      .get(`people/?page=1`)
      .then((res) => SetCharacter([...res.data.results]));
  }, []);

  function handleSelected(payload: string) {
    navigation.navigate('Detail', {payload});
  }

  async function handlePagination(){
    SetPage(page + 1)
    if(loading){
      return
    }
    SetLoading(true)
    const response = await api.get(`people/?page=${page}`)
    SetLoading(false)
    SetCharacter([...character,...response.data.results])
    console.log("chamando quantas vez",page,character)
  }


  if (!character) {
    return <Text>Carregando...</Text>;
  }

  if (character.length === 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 16}}>
          Não foi possível encontrar o personagem buscado :(
        </Text>
         {/* <TouchableOpacity style={styles.BackHomeButton} onPress={()=> navigation.goBack()}>
          <Text style={styles.BackHomeButtonText}>Home</Text>
        </TouchableOpacity>  */}
      </View>
    );
  }

  return (
    <View style={{flex:1}}>
      <FlatList 
      data={character}
      keyExtractor = {people => String(people.created)}
      onEndReached={handlePagination}
      onEndReachedThreshold={0.2}
      renderItem={({item:people})=> (
        <TouchableOpacity onPress={()=> console.log("nome do character",people.name)}>
        <View style={styles.characterContainer}>
        <Text style={styles.characterLabel}>Name:</Text>
        <Text style={styles.characterLabelText}>{people.name}</Text>
        <Text style={styles.characterLabel}>Gender:</Text>
        <Text style={styles.characterLabelText}>{people.gender}</Text>
        <Text style={styles.characterLabel}>Height:</Text>
        <Text style={styles.characterLabelText}>{people.height}</Text>
        <Text style={styles.characterLabel}>HomeWorld:</Text>
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
    borderRadius: 8,
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
