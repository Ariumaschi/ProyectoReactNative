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

  componentDidMount() {
    if (auth.currentUser) {
        auth.onAuthStateChanged(user => {
        })
        this.props.navigation.navigate('Main')
    }
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
            <View style={styles.box}>
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
                <Text style={styles.button}> Login </Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: 'white',
        height: '100%'
    },
    box: {
        backgroundColor: '#FF1493',
        height: '35%',
        width: '80%',
        borderRadius: '5%',
        justifyContent: 'center',
        alignItems:'center',
        margin: '8%'
    },
    input: {
        borderRadius: 5,
        backgroundColor: 'white',
        width: '80%',
        height: '5%',
        padding: '5%',
        margin: '8%'
    },
    alert: {
        color: 'white'
    },
    button: {
        backgroundColor: 'white',
        borderRadius: '5%'
    }
})

export default Login;