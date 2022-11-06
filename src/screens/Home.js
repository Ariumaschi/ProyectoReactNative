import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

class Home extends Component {
    constructor(props) {
        super(props)
       
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../../assets/logo.png')}/>
                <Text onClick={() => this.props.navigation.navigate('Login')}>Login</Text>
                <Text onClick={() => this.props.navigation.navigate('Register')}>Register</Text>
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
    logo: {
        width: 500,
        height: 500
    }
})

export default Home;