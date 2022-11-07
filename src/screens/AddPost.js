import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import MyCamera from "../components/Camera";




class AddPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Description: '',
            showCamera: true,
            url: ''
        }
    }


    onSubmit() {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            Description: this.state.Description,
            url: this.state.url,
            createdAt: Date.now(),
            likes: [],
        })
            .then(this.props.navigation.navigate('Posts'))
            .catch(e => console.log(e))

    }

    onImageUpload(url) {
        console.log(url)
        this.setState({
            showCamera: false,
            url: url
        });
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


                <MyCamera onImageUpload={(url) => this.onImageUpload(url)} />

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

export default AddPost;
