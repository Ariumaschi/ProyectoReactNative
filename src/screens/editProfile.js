import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

class editProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pass: '',
            userName: '',
            errors: '',
            bio: '',
            id: this.props.route.params.id
        }
    }


    editar() {
        db.collection('users')
            .doc(this.state.id)
            .update({
                email: this.state.email,
                userName: this.state.userName,
                bio: this.state.bio,
            })
            .then(() => {
                console.lod(editado)
                this.props.navigation.navigate('Profile');
            })

    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Editar datos</Text>
                <View style={styles.box}>
                    <Text style={styles.alert}>{this.state.errors}</Text>
                    <TextInput
                        placeholder='email'
                        keyboardType='email-address'
                        onChangeText={text => this.setState({ email: text })}
                        value={this.state.email}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder='username'
                        keyboardType='default'
                        onChangeText={text => this.setState({ userName: text })}
                        value={this.state.userName}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='bio'
                        keyboardType='default'
                        onChangeText={text => this.setState({ bio: text })}
                        value={this.state.bio}
                        style={styles.input}
                    />

                    <TouchableOpacity onPress={() => this.editar()}>
                        <Text style={styles.button}>Finalizar Edición</Text>
                    </TouchableOpacity>


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
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%'
    },
    box: {
        backgroundColor: '#FF1493',
        width: '80%',
        borderRadius: '5%',
        justifyContent: 'center',
        alignItems: 'center',
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

export default editProfile;