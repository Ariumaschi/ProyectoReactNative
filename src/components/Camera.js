import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

class MyCamera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: '',
            showCamera: true,
            permission: false,
            metodosDeCamara: ''
        }
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(() => {
                this.setState({
                    permission: true,
                })
            })
            .catch(e => console.log(e))
    }

    takePicture() {
        this.metodosDeCamera.takePictureAsync()
            .then(photo => {
                this.setState({
                    photo: photo.uri, //Es una uri interna temporal de la foto.
                    showCamera: false
                })
            })
    }



    render() {
        return (
            <View>
                <Camera
                    style={styles.cameraBody}
                    type={Camera.Constants.Type.back}
                    ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                />

                <TouchableOpacity
                    style={styles.shootButton}
                    onPress={() => this.takePicture()}>
                    <Text>Shoot</Text>
                </TouchableOpacity>

                <Image
                    source={{ uri: this.state.photo }}
                />



            </View >
        )
    }
}

const styles = StyleSheet.create({
    cameraBody: {
        width: '30vw',
        height: '70vh',
        position: 'absolute'
    },

    preview: {
        width: '30vw',
        height: '70vh',
        position: 'absolute'
    }
})

export default MyCamera;