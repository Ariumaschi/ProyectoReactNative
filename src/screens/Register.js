import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

class Register extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            pass:'',
            userName:'',
            errors:''
        }
    }

    registerUser(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( res => {
                db.collection('datosUsuario').add({
                    owner: this.state.email,
                    userName: this.state.userName,
                    createdAt: Date.now()
                })
                this.props.navigation.navigate('Main');
            })
            .catch(error => this.setState({errors: error.message}))
            .then(() => console.log(this.state.errors))
    }

    render(){
        return(
            <View style={styles.container}> 
                <Text>Registro</Text>
                <View style={styles.box}>
                    <Text style={styles.alert}>{this.state.errors}</Text>
                    <TextInput  
                        placeholder='email'
                        keyboardType='email-address'
                        onChangeText={ text => this.setState({email:text}) }
                        value={this.state.email}
                        style={styles.input}
                    /> 
                    <TextInput  
                        placeholder='password'
                        keyboardType='default'
                        onChangeText={ text => this.setState({pass:text}) }
                        value={this.state.pass}
                        style={styles.input} 
                    />  

                    <TouchableOpacity onPress={() => this.registerUser(this.state.email, this.state.pass)}>
                        <Text style={styles.button}>Registrarme</Text>
                    </TouchableOpacity>

                </View>
                    <Text onPress={ () => this.props.navigation.navigate('Login')} > Ir a login </Text>
            </View>
        )
    }   
}

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'white',
        height: '100%'
    },
    box: {
        backgroundColor: '#FF1493',
        height: '35%',
        width: '80%',
        borderRadius: '5%',
        justifyContent: 'center',
        alignItems:'center',
        margin: '8%'
    },
    input: {
        borderRadius: 5,
        backgroundColor: 'white',
        width: '80%',
        height: '5%',
        padding: '5%',
        margin: '8%'
    },
    alert: {
        color: 'white'
    },
    button: {
        backgroundColor: 'white',
        borderRadius: '5%'
    }
})

export default Register;