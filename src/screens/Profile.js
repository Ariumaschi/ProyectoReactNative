import React, { Component } from 'react';
import { View, FlatList, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            nombre: '',
            userName: '',
            bio: '',
            email: '',
            url: '',
            posteos: []
        }
    }

    componentDidMount() {
        const email = auth.currentUser.email;
        console.log(auth.currentUser);

        db.collection('users').where('owner', '==', email).onSnapshot(
            docs => {//todos datos de la colección
                let user;
                //CAMBIAR POR WHERE
                docs.forEach(doc => { //por cada documento, quiero un doc y la función que ejecutaré por cada doc
                    const data = doc.data();

                    if (data.owner === email) {
                        user = data
                    }
                });

                this.setState({
                    nombre: user.owner,
                    userName: user.userName,
                    bio: user.bio,
                    url: user.url
                });
            }
        )
        db.collection('posts').where('owner', '==', email).onSnapshot(
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
        this.props.navigation.navigate('Login')
    }


    render() {
        return (
            <View style={styles.container} >
                <Image
                    style={styles.img}
                    source={{ uri: this.state.url }}
                />
                <Text style={styles.text}>Nombre del usuario:{this.state.nombre}</Text>
                <Text style={styles.text} >userName:{this.state.userName}</Text>
                <Text style={styles.text} >Bio:{this.state.bio}</Text>
                <TouchableOpacity onPress={() => this.logOut()}>
                    <Text style={styles.button} >  <button>Logout</button></Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Post postData={item} navigation={this.props.navigation} id={item.id} />}
                />
            </View>

        )
    }

}

const styles = StyleSheet.create({
    
    img:{
        height:400,
        width:400,
        border: '2px solid #ddd',
        borderRadius:4 ,
        padding: 5,
        alignItems:'center'
          
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'left',
        marginLeft: 5 /*
        paddingHorizontal: 10,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',*/
    }, text: {
        fontFamily: 'Playfair Display',
        color: 'black',
        fontSize: 20
    },
    button: {
        backgroundColor: 'white',
        color: 'white',
        border: 'none',
        padding: 5
    }
})

export default Profile;