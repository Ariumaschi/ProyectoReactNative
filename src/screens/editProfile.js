import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, updatePassword } from "firebase/auth";
import firebase from 'firebase';



class editProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            passActual: "",
            userName: '',
            errors: '',
            bio: '',
            idUser: this.props.route.params.idUser,
            newPass: '',
        }
    }

    // Reautenticacion del usuario
    reauthenticate = (passActual) => {
        const user = firebase.auth().currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, passActual);
        return user.reauthenticateWithCredential(cred);
    }

    changePass = () => {
        this.reauthenticate(this.state.passActual)
            .then(() => {
                auth.currentUser.updatePassword(this.state.newPass)
                    .then(() => {
                        Alert.alert("Constraseña cambiada");
                    })
                    .catch((e) => { console.log(e); });
            })
            .catch((e) => { console.log(e) });
    }

/*
    // Changes user's email...
    onChangeEmailPress = () => {
        this.reauthenticate(this.state.passActual).then(() => {
            var user = firebase.auth().currentUser;
            user.updateEmail(this.state.email).then(() => {
                Alert.alert("Email was changed");
            }).catch((error) => { console.log(error.message); });
        }).catch((error) => { console.log(error.message) });
    }
*/
    editar() {

        db.collection('users')
            .doc(this.state.idUser)
            .update({
                userName: this.state.userName,
                bio: this.state.bio,

            })
            .then(() => {
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
                        style={styles.input}
                        value={this.state.passActual}
                        placeholder="Contraseña Actual" autoCapitalize="none" secureTextEntry={true}
                        onChangeText={(text) => { this.setState({ passActual: text }) }}
                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.newPassword}
                        placeholder="New Password"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={(text) => { this.setState({ newPass: text }) }}

                    />
                    <TouchableOpacity onPress={() => this.changePass()}>
                        <Text style={styles.button}>Cambiar Contraseña</Text>
                    </TouchableOpacity>



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