import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

class Home extends Component {
    constructor(props) {
        super(props)
       
    }



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Profile</Text>
               
               
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 10
   

    }
})

export default Home;