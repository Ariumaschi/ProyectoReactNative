import React, { Component } from 'react';
import { View,FlatList, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nombre: '',
            dni: '',
            edad: '',
            posteos:[]
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
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })

                })
                this.setState({
                    posteos: posts,
                })

            })
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
                <FlatList style={styles.posts}
                data={this.state.posteos}//flatlist=map que permite scrollear
                renderItem={({ item }) => <View>
                    <ul>
                        <li> Descripción: {item.data.Description} </li>
                        <TouchableOpacity onPress={() => this.Like(item)}>
                            <Text>{this.state.text}</Text>
                            
                        </TouchableOpacity>
                    </ul>
                    <Image style={styles.preview} source={ {uri: item.data.url}}/>
                </View>}
                keyExtractor={item => item.id.toString()} />

               
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    posts:{

    },
    preview: {
        width: '20vw',
        height: '40vh',
        position: 'absolute'
    }
})

export default Profile;