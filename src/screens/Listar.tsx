
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
import {Usuario} from "model/Usuario"
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
  <View style={MeuEstilo.alinhamentoLinha}>        
  <Image style={MeuEstilo.image} source={{uri: item.urlfoto}} />
  
  {/* // coloca alinhamento em coluna justificado flex-start */}
  <View style={MeuEstilo.alinhamentoColuna}>                            
  <Text style={MeuEstilo.title}>{item.nome} </Text>  
  <Text style={MeuEstilo.describe}>{item.descricao}</Text>             
 {/* fecha alinhamento colunas */}
 </View>
 {/* fecha alinhamento linhas */}
 </View>
);
const ItemSeparatorView = () => {
  return (
      // Flat List Item Separator
      <View style={MeuEstilo.separador}/>
  );
};

 

  const renderItem = ({ item }) => <Item item={item} />;
  
  return (
    <SafeAreaView style={MeuEstilo.containerlistar}>
      <FlatList 
      data={usuarios} 
      renderItem={renderItem} 
      keyExtractor={item => item.id} 
      ItemSeparatorComponent={ItemSeparatorView}

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
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10, //tela branca do fundo
    padding: 30,
    marginvertical: 8,
    marginhorizontal: 16,
  },
  item: {
     backgroundColor: 'white',
     padding: 50,
     marginVertical: 8,
     marginHorizontal: 16,
    borderColor: 'pink',
//     borderWidth: 2,
//     borderRadius: 10,
  },
  title: {
    fontSize: 20,
    color: '#0d4023',
    fontWeight: '500',
   
 
 },
 describe: {
  fontSize: 12,
  color: '#0d4023',
  fontWeight: '500',
  textAlign: 'center',
},
 image:{
  width: 85,
  height: 85,
  borderRadius: 85,
 
 },
 alinhamentoLinha:{
  flexDirection: 'row',
  justifyContent: 'flex-start',
  padding: 10,
  //backgroundColor: '#4e8264',
  backgroundColor: '#9ab4a0',
  borderRadius: 10,
 
},
alinhamentoColuna:{
  flexDirection:'column', 
  justifyContent: 'center',


},
separador:{
  height: 20,
  width: '100%',
  backgroundColor: "white"
  //backgroundColor: '#C8C8C8',
}
 });

export default Listar;