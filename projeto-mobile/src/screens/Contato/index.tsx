import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { styles } from "./style";


export default function Contato() {
  const navigation = useNavigation ();
  
  return (
    <View style={styles.container}>
      <Text>Pagina Contato</Text>
    </View>
  )
}