import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from '../firebase/config'

class Posts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posteos: [],
            text: 'Like',
        }
    }
    //el estado es inmutable, hay que pisarlo con algo nuevo. Por eos hacemos un nuevo array de posts
    // en el estado guardamos todo lo que queremos rendrizar porque cualq variable q no este ahi no va a se identificada por react
    //react solo lee los cambios de las props
    componentDidMount() {
        db.collection('posts').onSnapshot(
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

    Like(item) {
        db.collection('posts')
            .doc(item.id)
            .update({
                likes: firebase.firestore.fieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => {
                this.setState({ liked: true, text: 'Dislike' })
            })
    }
    render() {
        return (
            /*<View>
                {this.state.posteos.map(post => <li>{post.data.product}</li>)}

            </View >*/
            <FlatList
                data={this.state.posteos}
                renderItem={({ item }) => 
                <View>
                    <Image style={styles.preview} source={ {uri: item.data.url}}/>
                    <ul>
                        <li> Descripción: {item.data.Description} </li>
                        <TouchableOpacity onPress={() => this.Like(item)}>
                            <Text>{this.state.text}</Text>
                        </TouchableOpacity>
                    </ul>
                </View>}
            keyExtractor={item => item.id.toString()} />
        )
    }
}
const styles = StyleSheet.create({
    
    preview: {
        width: '30vw',
        height: '70vh',
        position: 'absolute'
    }
})

export default Posts;