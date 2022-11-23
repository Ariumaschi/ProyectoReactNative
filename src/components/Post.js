import React, {Component} from 'react'
import { Text, View,TextInput, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native'
import {auth, db} from '../firebase/config';
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons';

class Post extends Component {
    constructor (props){
        super (props)
        this.state={
            likes: 0,
            myLike: false,
            comment: ''
           
        }
    }
componentDidMount() {
    if (this.props.postData.data.likes) {
        this.setState({
            likes: this.props.postData.data.likes.length,
            myLike: this.props.postData.data.likes.includes(auth.currentUser.email),
        })
    }
}

like(){
    db.collection('posts')
    .doc(this.props.postData.id)
    .update({
        likes: firebase.firestore.FieldValue.arrayUnion (auth.currentUser.email)
    })
    .then(()=> this.setState({
        likes: this.props.postData.data.likes.length,
        myLike: true
    })
    )
    .catch(e=>console.log(e))
}

unLike(){
    db.collection('posts')
    .doc(this.props.postData.id)
    .update({
        likes: firebase.firestore.FieldValue.arrayRemove (auth.currentUser.email)
    })
    .then(()=> this.setState({
        likes: this.props.postData.data.likes.length,
        myLike: false
    })
    )
    .catch(e=>console.log(e))
}
publicarComentario() {
    let oneComment = {
        author: auth.currentUser.email,
        createdAt: Date.now(),
        commentText: this.state.comment
    }
    db.collection('posts').doc(this.props.postData.id).update({
        comments: firebase.firestore.FieldValue.arrayUnion(oneComment)
    })
        .then(() => {
            this.setState({
                comment:''
            })
        })
        .catch(e => console.log(e))
}

render(){
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile', {email: this.props.postData.data.owner})}>
            <Text  style={styles.user}>Subido por: {this.props.postData.data.owner} </Text>
            </TouchableOpacity>
            <Image
                style={styles.img}
                source={{uri: this.props.postData.data.url}} 
            />
            {
                this.state.myLike ?
                
            <TouchableOpacity style={styles.like} onPress={()=> this.unLike()} >
                <FontAwesome name='heart' color='red' size={28} />
            </TouchableOpacity>
                :
             <TouchableOpacity style={styles.like} onPress={()=> this.like()} >
                <FontAwesome name='heart-o' color='red' size={28} />
             </TouchableOpacity>
            } 
            <Text style={styles.text}> {this.state.likes} likes</Text>
            <Text style={styles.text}> Descripción: {this.props.postData.data.Description} </Text>
            {
                this.props.postData.data.comments ?
                    <React.Fragment>
                        <FlatList
                            data={this.props.postData.data.comments.slice(-4)}
                            keyExtractor={post => post.createdAt.toString()}
                            renderItem={({ item }) => <Text> {item.author}: {item.commentText}</Text>}
                        /> 
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', {id: this.props.id})}>Más comentarios</TouchableOpacity>
                    </React.Fragment>
                        :
                        <Text>No hay comentarios</Text>
            }
                    <TextInput keyboardType='default'
                        placeholder='Escribí tu comentario'
                        onChangeText={(text) => { this.setState({ comment: text }) }}
                        value={this.state.comment}
                    />
                    <TouchableOpacity onPress={() => this.publicarComentario()}>
                        <Text style={styles.button} >Comentar</Text>
                    </TouchableOpacity>       
        </View>
    )
}
}
const styles= StyleSheet.create ({

    img:{
        height:400,
        width:400,
        border: '2px solid #ddd',
        borderRadius:4 ,
        padding: 5,
        alignItems:'center'
          
    },
    container:{
     alignItems:'center',
    },
    text:{
    marginTop: 0,
    fontFamily: 'Sans Serif',
    fontSize:18,
    color:'black', 
    marginLeft:'0'   
    },
    user:{
        fontFamily: 'Sans Serif',
        color:'black',
        fontSize:20,
    
        marginRight:'40%',
        width:"100%",
        borderRadius:4
    },
    like:{
        marginRight:'25%',
        marginTop: 2,
    },button:{
        backgroundColor: 'grey',
        color: 'black',
        border: 'none',
        padding: 5 
    }


    

})
export default Post;