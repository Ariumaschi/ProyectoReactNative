import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nombre: '',
            dni: '',
            edad: '',
        }
    }
    componentDidMount() {
        const email = auth.currentUser.email;
        
        db.collection('datosUsuario').onSnapshot(
            docs => {//todos datos de la colección
                let user;
                
                docs.forEach(doc => { //por cada documento, quiero un doc y la función que ejecutaré por cada doc
                    const data = doc.data();
                    
                    if (data.owner === email) {
                        user = data
                    }
                });

                this.setState({
                    nombre: user.owner,
                    userName: user.userName
                });
            }
        )
    }
    
    logOut() {
        auth.signOut();
        this.props.navigation.navigate('Main')
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Profile</Text>
            
                <Text>Nombre del usuario:{this.state.nombre}</Text>
              
                <Text>userName:{this.state.userName}</Text>
                
                <TouchableOpacity onPress={() => this.logOut()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
               
               
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 10
   

    }
})

export default Profile;