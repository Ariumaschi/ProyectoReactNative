import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';



class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Description: '',


        }
    }

    onSubmit() {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            Description: this.state.Description,
            createdAt: Date.now(),
        })
            .then(this.props.navigation.navigate('Profile'))
            .catch(e => console.log(e))

    }


    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.field}
                    keyboardType='text'
                    placeholder='Description'
                    onChangeText={text => this.setState({ Description: text })}
                    value={this.state.Product}
                />

                <TouchableOpacity onPress={() => this.onSubmit()}>
                    <Text>Publicar</Text>
                </TouchableOpacity>

            </View >

        )


    }

}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 10
    },
    title: {
        marginBottom: 20
    },
    field: {
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding: 3,
        marginBottom: 8

    }
})

export default Post;
