import React, { useState, useRef } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, StatusBar, Keyboard} from 'react-native';

import api from './src/Services/api'

export default function App() {

  const[dados, setDados] = useState(null); 
  const[cep, setCep] = useState('');
  const InputRef = useRef(null)

  function limpar(){
    setCep('');
    setDados(null)
    InputRef.current.focus(); //Texto fica piscando e abre o teclado novamente
  }

  async function buscar(){
    if (cep == '' || cep.length != 8){
      alert('Insira um CEP válido!')
      return;
    }
    try{

      const response = await api.get(`/${cep}/json`) //Await indica a espera da resposta do servidor para o valor enfim ser passado para  a variável
      console.log(response.data);
      setDados(response.data);
      Keyboard.dismiss();

    }catch(error){
      setDados(null);
      console.log('ERROR: ' + error);
      alert('CEP não encontrado')
    }
  
    }

 return (
   <SafeAreaView style={styles.container}>
      <StatusBar/>

      <Text style={styles.txtTitulo}>Buscador CEP</Text>

      <TextInput style={styles.input} 
      placeholder='Insira um CEP' 
      value={cep} 
      onChangeText={(item) => setCep(item)} 
      keyboardType='numeric'
      ref={InputRef}
      >
      
      </TextInput>

      <View style = {styles.viewBtn}>

        <TouchableOpacity style={[styles.btn, {backgroundColor: '#3CB0DE'}]} onPress={buscar}>

          <Text style={styles.txtBtn}>BUSCAR</Text>

        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, {backgroundColor: '#ED4773'}]} onPress={limpar}>

          <Text style={styles.txtBtn}>LIMPAR</Text>

        </TouchableOpacity>

      </View>
      { dados && //Serve para a view só aprecer quando os dados da api chegarem
      <View style={styles.viewRes}>

        <Text style={styles.itemApi}> {dados.cep != ''? `CEP: ${dados.cep}`:''} </Text>
        <Text style={styles.itemApi}>{dados.logradouro != ''? `Logradouro: ${dados.logradouro}`:''}</Text>
        <Text style={styles.itemApi}> {dados.bairro != '' ? `Bairro: ${dados.bairro}` : ''}</Text>
        <Text style={styles.itemApi}> {dados.cidade != '' ? `Cidade: ${dados.localidade}` : ''}</Text>
        <Text style={styles.itemApi}> {dados.uf != '' ? `Estado: ${dados.uf}` : ''}</Text>
        <Text style={styles.itemApi}> {dados.ddd != '' ? `DDD: (${dados.ddd})` : ''}</Text>

      </View>
      }


   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212'
  },
  txtTitulo:{
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -80,
    color: '#3CB0DE',
  },
  input:{
    width: '90%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: '3%',
    marginTop: '5%'
  },
  viewBtn:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    margin: '6%'
  },
  btn:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    borderRadius: 20
  },
  viewRes:{
    width: '100%',
    height: '20%',
    alignItems:'center',
    justifyContent: 'center',
    marginTop: '3 %'
  },
  itemApi:{
    color: '#fff',
    fontSize: 17,
    marginTop: '2%'
  }



})
