import {useState} from 'react'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch'


import styles from './popularjobs.style'

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error} = useFetch(
    'search', {
    query: 'React developer',
    num_pages: 1
  })
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popularjobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (<ActivityIndicator size="large" colors={COLORS.primary}/>
        ) : error ? ( 
          <Text>Something went wrong</Text>
        ) : (
          <FlatList 
          data = {data}
          renderItem={({item}) => (
            <PopularJobCard item={item}/>
          )}
          keyExtractor={item => item?.job_id}
          contentContainerStyle={{columnGap: SIZES.medium}}
          horizontal
          />

        )}

      </View>

    </View>
  )
}

export default Popularjobs