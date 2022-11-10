import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posteos: [],
            input: ''
        }
    }

    searchUserPost(){
        db.collection('posts').where('owner', '===', this.state.input).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posteos: posts,
                })
            })
    }

    render() {
        return (
            <View>
                <TextInput onChangeText={ text => this.setState({ input: text }) }/>
                <Text onPress={() => this.searchUserPost()}>Buscar</Text>
                <FlatList 
                    data={this.state.posteos}
                    keyExtractor={ item => item.id.toString()}
                    renderItem={ ({item}) => <Post postData={item} navigation={this.props.navigation} id={item.id}/>}
                />
            </View>
        )
    }
}

export default Search;