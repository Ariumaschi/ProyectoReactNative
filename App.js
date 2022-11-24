import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Main from './src/screens/Main';
import Profile from './src/screens/Profile';
import Comment from './src/screens/Comment';
import OtherProfile from './src/screens/OtherProfile';
import MyCamera from './src/components/Camera';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Component } from 'react';
import { auth } from './src/firebase/config';
import EditProfile from './src/screens/EditProfile';



export default class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => { }); //si queremos acceder a auth.currentuser a veces nos tira error a pesar de que el usuario ete logueado y esto nos soluciona el error//
  }
  render() {
    const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Comment" component={Comment} options={{ headerShown: false }} />
          <Stack.Screen name="OtherProfile" component={OtherProfile} options={{ headerShown: false }} />
          <Stack.Screen name="MyCamera" component={MyCamera} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    );

  }

}
