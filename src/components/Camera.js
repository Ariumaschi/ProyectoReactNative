import React, { Component, ReactFragment } from 'react';
import { Camera } from 'expo-camera';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { storage } from '../firebase/config';

class MyCamera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: '',
            showCamera: true,
            permission: false,
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

    savePhoto() {
        fetch(this.state.photo)
            .then(res => res.blob())
            .then(image => {
                const ref = storage.ref(`photos/${Date.now()}.jpg`)
                ref.put(image)
                    .then(() => {
                        ref.getDownloadURL()
                            .then(url => {
                                console.log(url)
                                this.props.onImageUpload(url);
                            })
                    })
            })
            .catch(e => console.log(e))
    }





    render() {
        return (
            <View>

                {this.state.showCamera === false ?


                    <View>
                        <Image style={styles.preview}
                            source={{ uri: this.state.photo }}
                        />
                        <TouchableOpacity
                            style={styles.shootButton}
                            onPress={() => this.savePhoto()}>
                            <Text>Aceptar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.shootButton}
                            onClick={() => this.props.navigation.navigate('Home')}>
                            <Text>Rechazar</Text>
                        </TouchableOpacity>
                    </View> :
                    <View>

                        <Camera
                            style={styles.cameraBody}
                            type={Camera.Constants.Type.back}
                            ref={metodosDeCamera => this.metodosDeCamera = metodosDeCamera}
                        />

                        <TouchableOpacity
                            style={styles.shootButton}
                            onPress={() => this.takePicture()}>
                            <Text>Shoot</Text>
                        </TouchableOpacity>
                    </View>

                }



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