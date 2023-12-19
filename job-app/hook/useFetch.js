import {useState, useEffect} from 'react';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
// import { RAPID_API_KEY } from '@env';

import { Logs } from 'expo'

Logs.enableExpoCliLogging()

//const rapidApiKey = RAPID_API_KEY
const uri_test = '../example_data.json'


const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: { ...query},
        headers: {
          'X-RapidAPI-Key': 'bc75412757msh4a96b1875e568d3p108a91jsna0e5814be80f',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };
    
    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await require(uri_test);
            setData(response.data);
            setIsLoading(false);

            // const response = await axios.request(options);
            // setData(response.data.data);
            // setIsLoading(false);
        } catch (error) {
            setError(error);
            alert('There is an error')
        } finally {
            setIsLoading(false);
        }

        }
    
    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}

export default useFetch;



// params: {
//     query: 'Python developer in Texas, USA',
//     page: '1',
//     num_pages: '1'
//   },