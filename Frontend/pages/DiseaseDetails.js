import React from 'react';
import { useState,useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import {uri} from './components/info';

export default function DiseaseDetails ({ route}) {
 
    const [diseases, setDiseases] = useState([]);

    const { disease } = route.params;
    const diseaseId = parseInt(disease);
  

    
    useEffect(function () {
        
         fetch(`http://${uri}:8000/diseases/${diseaseId}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            setDiseases(data)
        });
      }, [])
    
    
    
    return (<View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: `http://${uri}:8000/images/${diseases.image_url}` }} style={styles.image} />
        <Text style={styles.title}> {diseases.name} </Text>
        <Text style={styles.bold}> Symptoms <Text>:  {diseases.symptom}</Text></Text>
        <Text style={styles.bold}> Remedy <Text>:  {diseases.remedy}</Text></Text>

        </View>)

}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
        borderRadius: 200,
        textAlign: 'center',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginVertical: 20
    },

    bold: {
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10
    }
})
