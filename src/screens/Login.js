import { Component } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { auth } from '../firebase/config';

class Login extends Component {
  constructor() {
    super(),
      this.state = {
        password: '',
        email: '',
        errors: ''
      };
  }

  onSubmit() {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({errors: error.message}))
      .then(() => console.log(this.state.errors))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <Text style={styles.alert}>{this.state.errors}</Text>        
        <TextInput
          keyboardType="email-address"
          placeholder="email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
          style={styles.input}
        />
        <TextInput
          keyboardType="default"
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => this.onSubmit()}>
          <Text> Login </Text>
        </TouchableOpacity>
        <Text onPress={ () => this.props.navigation.navigate('Register')} >Ir a register</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'white'
    },
    input: {
        borderRadius: 5,
        borderColor: 'red',
        width: 500,
        height: 50
    },
    alert: {
        color: 'red'
    }
})

export default Login;