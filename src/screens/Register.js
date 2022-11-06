import React, { Component } from 'react';
import { auth } from '../firebase/config';
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
                this.props.navigation.navigate('Main');
                console.log(this.state.email);
            })
            .catch(error => this.setState({errors: error.message}))
            .then(() => console.log(this.state.errors))
    }

    render(){
        return(
            <View style={styles.container}> 
                <Text>Registro</Text>
                <View>
                    <Text style={styles.alert}>{this.state.errors}</Text>
                    <TextInput  
                        placeholder='email'
                        keyboardType='email-address'
                        onChangeText={ text => this.setState({email:text}) }
                        value={this.state.email}
                    /> 
                    <TextInput  
                        placeholder='password'
                        keyboardType='default'
                        onChangeText={ text => this.setState({pass:text}) }
                        value={this.state.pass}
                    />  

                    <TouchableOpacity onPress={() => this.registerUser(this.state.email, this.state.pass)}>
                        <Text>Registrarme</Text>
                    </TouchableOpacity>

                    <Text onPress={ () => this.props.navigation.navigate('Login')} > Ir a login </Text>
                </View>
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
        backgroundColor: 'white'
    },
    alert: {
        color: 'red'
    }
})

export default Register;