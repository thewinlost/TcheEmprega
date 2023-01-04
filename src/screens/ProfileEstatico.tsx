
import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

import {Usuario} from 'model/Usuario';
import { useState } from 'react';


export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  return (
    <Layout>
      <TopNav
        middleContent="Perfil Estático"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        leftAction={() => navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >


        <Text fontWeight="bold">This is the second screen</Text>
      </View>
    </Layout>
    
  );
  
}




const ProfileEstatico= function() { 
  /*const navigation =useNavigation();
  const [itemLista, setItemLista]=
  useState({...itemLista,
    id:"",
    categoria:""});
  const [usuario, setUsuario] = useState<Partial<Usuario>>({});
  // The path of the picked image
  
  const [especialidades, setEspecialidades] = useState<Partial<Categoria>[]>([{}]);

  */

 

  const [usuario, setUsuario] = useState<Partial<Usuario>>({});

  return (
    <View style={styles.screen}>
          <Text
          containerStyle={{ marginTop: 15, marginRight: 30, marginLeft:30, marginBottom: 15}}
          placeholder="Nome"
          value={usuario.nome}
          onChangeText={text => setUsuario({...usuario, nome: text})}
          keyboardType="default"
        />
        <Text
          value={usuario.telefone} 
          onChangeText={text => setUsuario({...usuario, telefone: text})}
          keyboardType="default"
        />
        <Text
          containerStyle={{ marginTop: 15, marginRight: 30, marginLeft:30, marginBottom: 15}}
          placeholder="Descrição"
          value={usuario.descricao} 
          onChangeText={text => setUsuario({...usuario, descricao: text})}
          keyboardType="default"
        />
      
 

      
      
  
    </View>
    
  );
}















const styles = StyleSheet.create({
  
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    padding: 30,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    resizeMode: "cover",
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    
},
  buttonContainer: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: '#0d4023',
  },
  loginScreenButton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#0d4023',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loginText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
  },
  
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
 
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  
//     borderWidth: 2,
//     borderRadius: 10,
 },

/*/alinhamentoLinha:{
    flexDirection:'row', 
    justifyContent: "space-between",
    
},
alinhamentoColuna:{
    flexDirection:'column', 
    justifyContent: 'flex-start',
   
   
},*/
gridView: {
  marginTop: 10,
  flex: 1,

},
itemContainer: {
  justifyContent: 'center',
  borderRadius: 50,
  padding: 3,
  height: 30,
  width: 110,
},
itemCode: {
  fontWeight: '600',
  fontSize: 5,
  color: '#fff',
},
text: {
  color: "white",
  fontSize: 9,
  lineHeight: 16,
  textAlign: "center",
},
  
});

export default ProfileEstatico;