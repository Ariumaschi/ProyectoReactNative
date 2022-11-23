import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            search: false,
            users: [],
            filteredUsers: [],
        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(
            docs => {
                let info = [];

                docs.forEach(doc => {
                    info.push({ id: doc.id, data: doc.data() })
                })
                this.setState({ users: info })
            }
        )
    }

   search() {
       
        let textToFilter = this.state.value.toLowerCase();

        if (this.state.value === '') {
            this.setState({ requiredField: 'form vacio!' },)
        } else {
            this.setState({ requiredField: '' })
     
        const filteredUsers = this.state.users?.filter((user) => user.data.userName.toLowerCase().includes(textToFilter));
        this.setState({ 
            filteredUsers: filteredUsers, 
            search: true })
    }
    }



    clear() {
        this.setState({
            dataSearch: [],
            search: false,
            value: '',
        })
    };


    render() {
        return (
            <View>
                <Text style={styles.title}> BUSCADOR </Text>
              
                <TextInput 
                keyboardType='default'
                placeholder='Buscate algoooooo...'
                onChangeText={text => this.setState({ value: text })}
                value={this.state.value}
                style={styles.input}
                    
                />
                <TouchableOpacity onPress={() => this.search()}>
                    <Text style={styles.button}> Enviar </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.clear()}>
                    <Text style={styles.button}> Limpiar búsqueda </Text>
                </TouchableOpacity>
               
                {
                    this.state.filteredUsers.length == 0 && this.state.search == true ?
                        <Text style={styles.users}>Usuario inexistente</Text> :
                <FlatList 
                    data={this.state.filteredUsers}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => 
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile', { email: item.data.owner })}>
                    <Text style={styles.users} >{item.data.userName}</Text>
                </TouchableOpacity>}
                />
                }
                

            </View>
        )
    }
}

const styles = StyleSheet.create({
  
    title: {
        fontFamily: 'Oswald, sans-serif',
        color:'black',
        fontWeight: 'bold',
        fontSize: 35,
        textAlign:'center',
        marginBottom: 70,
    },
    users:{
        color:'black',
        marginTop: 0,
        fontFamily: 'Raleway, sans-serif;',
        fontSize: 24,
        marginLeft:'0',
        fontWeight: 'bold',
        flexDirecion: 'wrap',
        textAlign: 'center',
    },
    input:{
        color:'black',
        marginTop: 0,
        fontFamily: 'Raleway, sans-serif;',
        fontSize: 20,
        margin: 5,
        fontStyle: 'italic', 
        border: '2px solid #FF1493',
        borderRadius: 4 , 

    },
    button: {
        fontFamily: 'Oswald, sans-serif',
        color:'black',
        fontWeight: 'bold',
        fontSize: 35,
        textAlign:'center',
        marginBottom: 20,
        backgroundColor: '#FF1493',
        borderRadius: '15px',
        margin: '2%',
        padding: '1%',
        textAlign: 'center',
        fontSize: 15,
        color: 'black',
    },
    
})



export default Search;