import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { db } from "../firebase/config";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: "",
      id: this.props.route.params.id,
      data: "",
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
    console.log(this.state.data);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data.comments}
          keyExtractor={(post) => post.createdAt.toString()}
          renderItem={({ item }) => (
            <Text>
              {" "}
              {item.author}: {item.commentText}
            </Text>
          )}
        />
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
