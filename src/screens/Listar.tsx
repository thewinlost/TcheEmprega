
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,  
  View,
  Image,
} from 'react-native';
import { storage, auth, firestore } from "../navigation/firebase";
import {Usuario} from "../model/Usuario"
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const Listar = () => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [usuarios, setUsuarios] = useState<Partial<Usuario>[]>([{}]); // Initial empty array of users


  useEffect(() => {
    const subscriber = firestore.collection('Usuario')
      .onSnapshot(querySnapshot => {
        const usuarios = [];
        querySnapshot.forEach(documentSnapshot => {
          usuarios.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setUsuarios(usuarios);
        setLoading(false);
      
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);



const Item = ({ item }) => (
  <View style={MeuEstilo.item}>
    <Text style={MeuEstilo.title}>{item.nome}</Text>
   <Image source={{ uri: item.urlfoto}} style={MeuEstilo.image} /> 

  </View>
);

 

  const renderItem = ({ item }) => <Item item={item} />;
  
  return (
    <SafeAreaView style={MeuEstilo.containerlistar}>
      <FlatList 
      data={usuarios} 
      renderItem={renderItem} 
      keyExtractor={item => item.id} 
      // refreshing={true}
      // onRefresh={() => {
      //   getGatos();
      // }}
      />
    </SafeAreaView>
  );
};

 const MeuEstilo = StyleSheet.create({
 containerlistar: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
     backgroundColor: 'white',
     padding: 20,
     marginVertical: 8,
     marginHorizontal: 16,
    borderColor: '#0782F9',
//     borderWidth: 2,
//     borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: '#0782F9',
    fontWeight: '700',
 },
 image:{
  width: 80,
  height: 80,
  borderRadius: 80,
 }
 });

export default Listar;