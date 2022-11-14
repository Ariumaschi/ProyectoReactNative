import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from 'firebase';

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
    db.collection("posts").doc(this.state.id).onSnapshot((doc) => {
        this.setState({
          data: doc.data(),
        });
      });
  }

  publicarComentario() {
    //Armar el comentario.
    let oneComment = {
        author: auth.currentUser.email,
        createdAt: Date.now(),
        commentText: this.state.comment
    }
    //Actualizar comentario en la base. Puntualmente en este documento.
    //Saber cual es el post que queremos actualizar
    db.collection('posts').doc(this.state.id).update({
        comments: firebase.firestore.FieldValue.arrayUnion(oneComment)
    })
        .then(() => {
            //Cambiar un estado para limpiar el form
            this.setState({
                comment:''
            })
        })
        .catch(e => console.log(e))
}

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.data.Description}</Text>
        <FlatList data={this.state.data.comments} keyExtractor={(post) => post.createdAt.toString()} renderItem={({ item }) => (
        <Text> {" "} {item.author}: {item.commentText} </Text>)}/>
        <TextInput keyboardType='default' placeholder='Escribí tu comentario' onChangeText={(text) => { this.setState({ comment: text }) }} value={this.state.comment}/>
        <TouchableOpacity onPress={() => this.publicarComentario()}>
            <Text style={styles.button} >Comentar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
  },
  logo: {
    width: 500,
    height: 500,
  },
});

export default Comment;