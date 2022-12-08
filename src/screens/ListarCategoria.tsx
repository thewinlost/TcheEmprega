
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
import {Categoria} from "../model/Categoria"
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const ListarCategoria = (props) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [categorias, setCategorias] = useState<Partial<Categoria>[]>([{}]); // Initial empty array of users


  useEffect(() => {
    const subscriber = firestore.collection('Categoria')
      .onSnapshot(querySnapshot => {
        const categorias = [];
        querySnapshot.forEach(documentSnapshot => {
          categorias.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setCategorias(categorias);
        setLoading(false);
      
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

    const closeModal=(bool, item)=>{
        firestore.collection ('Usuario').doc(auth.currentUser.uid).collection ('Especialidade').doc(item.id).set({
          id: item.id,
          categoria: item.categoria,
        })
        props.setModalListaVisible(bool);
        props.setItemLista(item);
  }
    const LongClick=(item)=>{
        alert('voce pressionou longo e '+ item.categoria);
        closeModal(false,item);
    }
    
    const ShortClick=(item)=>{
    alert('voce pressionou curto e '+ item.categoria);
    closeModal(false,item);
    }
    
    //vou usar depois na lista de usuarios
    const renderItem = ({ item })=> {
    return <View style={MeuEstilo.item} key={item.id}>
    <Pressable
    style={({ pressed }) => [{ backgroundColor: pressed ? '#f1f1f1' : 'transparent' }, MeuEstilo.title]}
    // chama uma função chamada LongClick
    onLongPress={() => { LongClick(item) }}
    // chama uma função chamada ShortClick
    onPress={() => { ShortClick(item) }}
    >
    <View>
    <Text style={MeuEstilo.id}>Id: {item.id}</Text>
    <Text style={MeuEstilo.title}>Nome: {item.categoria}</Text>
    </View>
    </Pressable>
    </View>
    }
 

  
  return (
    <SafeAreaView style={MeuEstilo.containerlistar}>
      <FlatList 
      data={categorias} 
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

export default ListarCategoria;