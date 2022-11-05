import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

class MyCamera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: '',
            showCamera: true
        }
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

                {this.state.photo === null ? <View>
                    <Camera
                        style={styles.cameraBody}
                        type={Camera.Constants.Type.back}
                        ref={reference => this.camera = reference}
                    />

                    <TouchableOpacity
                        style={styles.shootButton}
                        onPress={() => this.takePicture()}>
                        <Text>Shoot</Text>
                    </TouchableOpacity>

                    <Image
                        source={{ uri: this.state.photo }}
                    />
                </View> :
                    <View>
                        <Image style={styles.preview}
                            source={{ uri: this.state.photo }}
                        />
                        <View style={styles.buttonArea}>
                            <TouchableOpacity onPress={() => this.savePhoto()}>
                                <Text>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.clearPhoto()}>
                                <Text>Rechazar</Text>
                            </TouchableOpacity>
                        </View></View>}
            </View>



        )
    }
}

const styles = StyleSheet.create({
    cameraBody: {
        width: '50vw',
        height: '50vh',
        position: 'absolute'
    },

})


export default MyCamera;

