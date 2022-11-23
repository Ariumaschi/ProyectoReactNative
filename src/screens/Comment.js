import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: '',
      id: this.props.route.params.id,
      data: '',
      comment: ''
    };
  }

  componentDidMount() {
    db.collection("posts")
    .doc(this.state.id)
    .onSnapshot((doc) => {
        this.setState({
          data: doc.data(),
        });
      });
  }

  publicarComentario() {

    let oneComment = {
        author: auth.currentUser.email,
        createdAt: Date.now(),
        commentText: this.state.comment
    }

    db.collection('posts')
    .doc(this.state.id)
    .update({
        comments: firebase.firestore.FieldValue.arrayUnion(oneComment)
    })
        .then(() => {
            this.setState({
                comment:''
            })
        })
        .catch(e => console.log(e))
}

  render() {
    return (
      <View style={styles.container}>
        <AntDesign name="left" size={24} color="black" onPress={() => this.props.navigation.navigate('Home')} style={styles.back}/>
        <Text style={styles.description}>{this.state.data.Description}</Text>
        <FlatList 
        data={this.state.data.comments} 
        keyExtractor={(post) => post.createdAt.toString()} 
        renderItem={({ item }) => (<Text> {item.author}: {item.commentText} </Text>)}/>

        <TextInput keyboardType='default' placeholder='Escribí tu comentario' onChangeText={(text) => { this.setState({ comment: text }) }} value={this.state.comment} style={styles.input}/>
        <TouchableOpacity onPress={() => this.publicarComentario()}>
            <Text style={styles.button}>Comentar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "white"
  },
  button: {
    backgroundColor: 'pink',
    borderRadius: '5%'
  },
  input: {
    borderRadius: 5,
    backgroundColor: 'white',
    width: '80%',
    height: '5%',
    padding: '5%',
    margin: '8%'
  },
  back: {
    margin: '4%'
  },
  description: {
      fontWeight: 'bold',
      margin: '4%'
  }
});

export default Comment;