import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db, } from '../firebase/config'
import Post from '../components/Post';


class Posts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posteos: [],
        }
    }
    componentDidMount() {
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
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
            <View style={styles.view}>
                <Text style={styles.title}> Lista de posteos</Text>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Post postData={item} navigation={this.props.navigation} id={item.id} />}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({

    title: {
        fontFamily: 'Playfair Display',
        color: 'black',
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    view: {
        flex: 1
    }
})

export default Posts;