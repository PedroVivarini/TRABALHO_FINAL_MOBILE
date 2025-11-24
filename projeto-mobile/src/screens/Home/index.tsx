import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { styles } from "./style";


export default function Home() {
  const navigation = useNavigation ();
  
  return (
    <View style={styles.container}>
      <Text>Pagina Home</Text>
    </View>
  )
}