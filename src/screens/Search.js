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
            usersError: ''
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
                placeholder='Search'
                onChangeText={text => this.setState({ value: text })}
                value={this.state.value}
                    
                />
                <TouchableOpacity onPress={() => this.search()}>
                    <Text styles={styles.button}> Enviar </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.clear()}>
                    <Text styles={styles.button}> Limpiar búsqueda </Text>
                </TouchableOpacity>
               
                {
                    this.state.filteredUsers.length == 0 && this.state.search == true ?
                        <Text style={styles.users}>Usuario inexistente</Text> :
                    
                <FlatList 
                    data={this.state.filteredUsers}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Text style={styles.users} >{item.data.userName}</Text>}
                />
                }
                

            </View>
        )
    }
}

const styles = StyleSheet.create({
  
    field: {
        fontSize: 15,
        backgroundColor: 'rgb(230, 230, 230)',
        margin: '1%',
        borderRadius: '30px',
        padding: '1%',
        color: 'rgb(153, 153, 153)'
    }, 
    title: {
        fontFamily: 'Oswald, sans-serif',
        color:'black',
        fontWeight: 'bold',
        fontSize: 35,
        textAlign:'center',
        marginBottom: 70,
    },
    users:{
        color:'#926F5B',
        marginTop: 0,
        fontFamily: 'Raleway, sans-serif;',
        fontSize: 24,
        marginLeft:'0',
        fontWeight: 'bold',
        flexDirecion: 'wrap',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    button: {
        fontFamily: 'Oswald, sans-serif',
        color:'black',
        fontWeight: 'bold',
        fontSize: 35,
        textAlign:'center',
        marginBottom: 70,

        backgroundColor: '#FF1493',
        borderRadius: '15px',
        marginTop: '5%',
        margin: '2%',
        padding: '1%',
        textAlign: 'center',
        fontSize: 15,
        color: 'black',
    },
    text: {
        fontSize: 50,
        color: '#FF1493',
        height: 100,
        margin: 5,
    },
    error: {
        color: 'red',
        marginTop: '1%',
        textAlign: 'center',
        fontSize: 12,
    },
})



export default Search;