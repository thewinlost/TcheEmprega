import React, { useState, useEffect } from "react";
import {useNavigation} from "@react-navigation/core";
import { View, Text, StyleSheet, Image, Button, Pressable, AlertButton, Alert, Modal, FlatList} from "react-native";
import {TextInput} from "react-native-rapi-ui";
// import firebaseConfig from "./firebase";
// import firebase from "firebase/compat/app";
// import "firebase/compat/storage";
// const app = firebase.initializeApp(firebaseConfig);
import { storage, auth, firestore } from "../navigation/firebase";
import { getStorage, uploadBytes } from "firebase/storage"; //access the storage databaSse
import * as ImagePicker from "expo-image-picker";
import {Categoria} from '../model/Categoria';
import {Usuario} from '../model/Usuario';
import ListarCategoria from './ListarCategoria';

const Profile= function() { //antes era só function profile
  const navigation =useNavigation();
  const [modalListaVisible, setModalListaVisible] = useState(false);
  const [itemLista, setItemLista]=
  useState({...itemLista,
    id:"",
    categoria:""});
  const [usuario, setUsuario] = useState<Partial<Usuario>>({});
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [especialidades, setEspecialidades] = useState<Partial<Categoria>[]>([{}]);

  const escolhefoto = ()=>{

  Alert.alert(
    "Alert Title",
    "My Alert Msg",
    [
      {
        text: "Camera",
        onPress: () => openCamera(),
        style: "default",
      },
    
      {
        text: "Abrir galeria",
        onPress: () => showImagePicker(),
        style: "cancel",
      },

    ],
    {
      cancelable: true,
      onDismiss: () => {}
    }
  );
  
  }
  useEffect(() => {
    const subscriber = firestore
      .collection('Usuario')
      .doc(auth.currentUser.uid)
      .onSnapshot(documentSnapshot => {
        setUsuario(documentSnapshot.data());
        if (usuario.urlfoto==null){
          setPickedImagePath("")
        }else {
          setPickedImagePath(usuario.urlfoto)
        }
      });
    return () => subscriber();
  }, [usuario.urlfoto]);
  
  useEffect(() => {
    const subscriber = firestore.collection('Usuario')
    .doc(auth.currentUser.uid).collection('Especialidade')
      .onSnapshot(querySnapshot => {
        const especialidades = [];
        querySnapshot.forEach(documentSnapshot => {
          especialidades.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setEspecialidades(especialidades);
      
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const salvar= ()=>{
    const reference = firestore.collection("Usuario").doc(auth.currentUser.uid);
    reference.update({
       id: reference.id,
       nome: usuario.nome,
       telefone: usuario.telefone,
       descricao: usuario.descricao,
       urlfoto:usuario.urlfoto,
     }).then(()=>{alert('Salvo com sucesso')}).catch(error=>alert(error.message))
  }


  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
     // const storage = app.storage();
      const ref = storage.ref(`imagens/profile/IMAGE-${auth.currentUser.uid}.jpg`);
    //  const ref = storage.ref(`imagens/IMAGE-${Date.now()}.jpg`);

      const img = await fetch(result.uri);
      const bytes = await img.blob();
      const fbResult = await uploadBytes(ref, bytes);

      const paraDonwload= await storage.ref(fbResult.metadata.fullPath).getDownloadURL();

      console.log(result.uri);
      console.log("firebase url :", fbResult.metadata.fullPath);
      const reference = firestore.collection("Usuario").doc(auth.currentUser.uid);
      reference.update({ urlfoto: paraDonwload});
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      //const storage = storage.storage();
      const ref = storage.ref(`imagens/profile/IMAGE-${auth.currentUser.uid}.jpg`);
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      const fbResult = await uploadBytes(ref, bytes);
      console.log(result.uri);

      const paraDonwload= await storage.ref(fbResult.metadata.fullPath).getDownloadURL();

      console.log("firebase url :", fbResult.metadata.fullPath);
      const reference = firestore.collection("Usuario").doc(auth.currentUser.uid);
      reference.update({ urlfoto: paraDonwload});
    }
      
  };
  const LongClick=async (item)=>{
    const reference = await firestore.collection("Usuario").doc(auth.currentUser.uid).collection('Especialidade').doc(item.id).delete();
    
}

const ShortClick=(item)=>{
alert('Para excluir a categoria pressione por 3 segundos');

}
  const renderItem = ({ item })=> {
    return <View style={styles.item} key={item.id}>
    <Pressable
    style={({ pressed }) => [{ backgroundColor: pressed ? '#f1f1f1' : 'transparent' }, styles.title]}
    // chama uma função chamada LongClick
    onLongPress={() => { LongClick(item) }}
    // chama uma função chamada ShortClick
    onPress={() => { ShortClick(item) }}
    >
    <View>
    <Text style={styles.title}>{item.categoria}</Text>
    </View>
    </Pressable>
    </View>
    }

  return (
    <View style={styles.screen}>
      <View style={styles.centeredView}></View>
      <View style={styles.buttonContainer}></View>

        {/* MODAL DA LISTA */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalListaVisible}
        onRequestClose={() => {
          Alert.alert('Modal Fechado.');
          setModalListaVisible(!modalListaVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          {/*<Lista
            setModalListaVisible={setModalListaVisible}
            setItemLista={setItemLista}
            >
      </Lista>*/}
        <ListarCategoria setModalListaVisible={setModalListaVisible}
            setItemLista={setItemLista}>
          
        </ListarCategoria>
          </View>
        </View>
      </Modal>


    
      <Pressable onPress={()=> escolhefoto()}>

      <View style={styles.imageContainer}>
          {pickedImagePath !== "" && (
          
              <Image source={{ uri: pickedImagePath }} style={styles.image} />
           )}
          {pickedImagePath === "" && (
          
              <Image source={require("../../assets/camera.png")}
              style={styles.image} />
            )}
      </View>
      </Pressable>
          <TextInput 
          containerStyle={{ marginTop: 15, marginRight: 30, marginLeft:30, marginBottom: 15}}
          placeholder="Nome"
          value={usuario.nome}
          onChangeText={text => setUsuario({...usuario, nome: text})}
          keyboardType="default"
        />
        <TextInput 
          containerStyle={{ marginTop: 15, marginRight: 30, marginLeft:30, marginBottom: 15}}
          placeholder="Telefone"
          value={usuario.telefone} 
          onChangeText={text => setUsuario({...usuario, telefone: text})}
          keyboardType="default"
        />
        <TextInput 
          containerStyle={{ marginTop: 15, marginRight: 30, marginLeft:30, marginBottom: 15}}
          placeholder="Descrição"
          value={usuario.descricao} 
          onChangeText={text => setUsuario({...usuario, descricao: text})}
          keyboardType="default"
        />
      
      <Pressable style={[styles.button, styles.buttonOpen]} 
      onPress={() => setModalListaVisible(true)}>
        <Text style={styles.textStyle}>Abrir Lista</Text>
      </Pressable>
      <FlatList 
      data={especialidades} 
      renderItem={renderItem} 
      keyExtractor={item => item.id} 
      />
      <Button title= "Salvar alterações"
          onPress={() => {
              salvar();
          }}
          style={{
              marginTop: 10,
          }}
      />
    </View>
  );
}

// Kindacode.com
// Just some styles
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
  buttonContainer: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-around",
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
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
alinhamentoLinha:{
    flexDirection:'row', 
    justifyContent: 'flex-start'
},
alinhamentoColuna:{
    flexDirection:'column', 
    justifyContent: 'flex-start'
},
  
});

export default Profile;