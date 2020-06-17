import React, { useState, useEffect} from "react";
import { Button, View, Text , Image, StyleSheet,TextInput,ScrollView,TouchableOpacity,FlatList,TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from "react-native/Libraries/NewAppScreen";

const buscar = ({ navigation}) =>
{
const [data, setData] = useState([]);
const [buscar, setbuscar] = useState('');
const [resultado, setResult] = useState(false);

async function pegadados()
{
const response = await fetch('http://jparanhos.com.br/app/index.php?fazer=pega&valor=' +buscar);
const responseJson = await response.json();
var count = Object.keys(responseJson).length;
setData(Object.values(responseJson));

if (count == 0)
{
  console.log(count);
  setResult(false);
}

}



return(
<View>
<View style={styles.pesquisa} >

<View>
<TextInput placeholder="Pesquisar" style={styles.btlogin} onChangeText={(query) => setbuscar(query)}/>  
</View>
    


<View style={styles.btbuscar}>

<TouchableOpacity onPress={() => pegadados()}>
<Image  style={styles.pesqimg} source={require('./img/buscar.png')}/>
</TouchableOpacity>

</View>



</View>
<View>

<View>

</View>

<FlatList
        data={data}
        renderItem={({ item }) =>  <TouchableOpacity onPress = {() => navigation.navigate('Perfil', {id: item.id})}>
        <View style={styles.lista} >
        <Image  style={styles.listaimg} source={{uri:item.cam}}/>
        <View style = {{flex:3}}>
        <Text style ={styles.titulo}>{item.titulo}</Text>       
        <Text style ={styles.texto} >{item.texto}  </Text>
        <Text style ={styles.classi} > {item.classi}  </Text>
        </View>
        </View>
        </TouchableOpacity> }
        keyExtractor={item => item.codigo}
      />

<Text 
style = {{flex:1,textAlign:"center",alignItems:"center",fontSize:40}}> 
{setResult? "Pour me some milk, please!" : "Thank you!"} </Text>

</View>




</View>



)



  
}






function Lista(props)
{
  let img = props.camimage;
  return(
    <TouchableHighlight onPress={() => props.onPress}>
    <View style={styles.lista} >


      <Image  style={styles.listaimg} source={{uri:img}}/>

      <View style = {{flex:3}}>
      <Text style ={styles.titulo}>{props.titulo}</Text>       
      <Text style ={styles.texto} >{props.texto}  </Text>
      <Text style ={styles.classi} > {props.classi}  </Text>
     </View>

    </View>
    </TouchableHighlight>
  )

}





function Home({ route, navigation} ) {
  const [data, setData] = useState([]);
  const [reult, setresult] = useState(false);

navigation.setOptions({title:'Esay Service' ,headerStyle: {backgroundColor: '#1e90ff'},headerTintColor: '#fff',headerTitleStyle: {fontWeight: 'bold'},
headerRight: () => (
<TouchableOpacity onPress={() => navigation.navigate('buscar')}> 
<Image  style={styles.pesqimg} source={require('./img/buscar.png')}/>  
</TouchableOpacity>)})


async function pegadados()
{
  const response = await fetch('http://jparanhos.com.br/app/index.php?fazer=pega&valor=');
  const responseJson = await response.json();
  setData(Object.values(responseJson))

}




useEffect(() => 
{ 

  pegadados()

},[data]);




return (

<View style={styles.fundo}>
<FlatList
    data={data}
    renderItem={({ item }) => <TouchableOpacity onPress = {() => navigation.navigate('Perfil', {id: item.id})}>
    <View style={styles.lista} >
    <Image  style={styles.listaimg} source={{uri:item.cam}}/>
    <View style = {{flex:3}}>
    <Text style ={styles.titulo}>{item.titulo}</Text>       
    <Text style ={styles.texto} >{item.texto}  </Text>
    <Text style ={styles.classi} > {item.classi}  </Text>
    </View>
    </View>
    </TouchableOpacity>}
    keyExtractor={item => item.codigo}/>
</View>




)

}  


  function Login({ navigation }) {
    return (
<Logar tela = "Home"> </Logar>


    );
  }










function Perfil({route, navigation }) 
{
const [data, setdata] = useState([]);
const {id} = route.params;
const [titulo, settitulo] = useState();
const [texto, settexto] = useState();
const [classi, setclassi] = useState();
const [caminho, setcam] = useState();
const [telefone, settelefone] = useState();
const [end, setend ]= useState();
const [email, setemail] = useState();
const {otherParam} = route.params;

 navigation.setOptions({title:'Esay Service' ,headerStyle: {backgroundColor: '#1e90ff'},headerTintColor: '#fff',headerTitleStyle: {fontWeight: 'bold'},} );
async function dados()
{
  const response = await fetch('http://jparanhos.com.br/app/index.php?fazer=unico&valor=' + id);
  const responseJson = await response.json();
  var count = Object.keys(responseJson).length
  var valor = Object.values(responseJson);
  var convertida = valor.map(function(obj) {
   return Object.keys(obj).map(function(chave) {
       return obj[chave];
   });
 });
 //setdata(convertida);
 settitulo(convertida[0][1]);
 settexto(convertida[0][2]);
 setclassi(convertida[0][3]);
 setcam(convertida[0][4]);
 settelefone(convertida[0][5])
 setend(convertida[0][6])
 setemail(convertida[0][7])
}



useEffect(() => 
{ 

  dados()

},
[id]);



//console.log()
//console.log(texto)
//console.log(classi)
//console.log(caminho)
return (
<View>

  <View style={styles.perfilimgtela}>
<Image style={styles.perfilimg} source={{uri:caminho}}/>
<Text style={styles.perfiltitulo}> {titulo} </Text>
<Text style={styles.perfilclassi}> {classi} </Text>
  </View>

  <View>
<Text style={styles.perfilsubtitulo}> Descrição: </Text>
 <Text style={styles.perfiltexto}> {texto} </Text> 
  </View>

  <View style={styles.linha}>
<Text style={styles.perfilsubtitulo}> Contato: </Text>
 <Text style={styles.perfiltexto}> {telefone} </Text> 
 <Text style={styles.perfiltexto}> {email} </Text> 
  </View>


  <View style={styles.linha}>
<Text style={styles.perfilsubtitulo}> Endereço: </Text> 
<Text style={styles.perfiltexto}> {end} </Text> 
  </View>

  </View>



)

  }








const Stack = createStackNavigator();

function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false}} />
          <Stack.Screen name="buscar" component={buscar} options={{ headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }










export default App;



const styles = StyleSheet.create({
fundo:{

   },

pesquisa:{
 flexDirection: 'row',
 borderBottomWidth: 1.5,
 borderColor: 'gray',
 backgroundColor:'#1e90ff'
},

titulo:
{
fontWeight: 'bold',
fontSize: 20,

},
texto:
{
fontSize: 18,
flex:1,

},

lista:
{
backgroundColor:'#f8f8ff',
marginTop:20,
marginLeft:10,
flexDirection:'row', 
borderWidth: 0.5,
borderColor: 'gray',
width:'95%',
},

listaimg:
{
width: 70, height: 70,margin:10, 
},

classi:
{
padding:10,
fontSize:40,
color:'#ffa500',

marginLeft:100,
},

buscar:
{
  fontSize:20,
  borderWidth: 0.5,
  margin:10,
  borderColor: 'gray',
  height:40,

  

},

btbuscar:
{
  padding:20,
},


btpes:
{
  width:'85%',
  height:'10%',
},

noresultado:
{
textAlign: 'center', 
fontWeight: 'bold',
fontSize: 18,
marginTop: 0,
width: 200,
backgroundColor: 'yellow',

},


pesqimg:
{
width: 32, height:32,
},


login:
{

  backgroundColor:'#1e90ff',
  flex: 1, 
  alignItems: 'center', 
  justifyContent: 'center',
},

btlogin:
{
fontSize:25,
  borderWidth: 0.5,
  height:45,
  width:300,
  backgroundColor:'#fff',
  margin:20,
  borderColor: 'gray',
},

item: {
  backgroundColor: '#f9c2ff',
  padding: 20,
  marginVertical: 8,
  marginHorizontal: 16,
},
title: {
  fontSize: 32,
},


perfil: {

},

perfilimgtela: {
  borderWidth:1,
  padding:10,
  },

perfilimg: {
  width:100,
  height:100,
  alignSelf:"center",
  },

perfiltitulo: {
 fontSize:30,
    alignSelf:"center",
    color:'#000',
    fontWeight:'bold',
    },
  
    perfiltexto: {
      fontSize:20,
      textAlign:"justify",
         color:'#000',
         },

         perfilsubtitulo: {
          fontSize:20,
             color:'#000',
             fontWeight:'bold',
             },
perfilclassi:
{
  padding:10,
             fontSize:40,
             color:'#ffa500',
             alignSelf:"center",
             },

             linha: {
              borderWidth:1,
              },
});
