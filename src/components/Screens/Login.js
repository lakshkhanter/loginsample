import React, { Component } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    AsyncStorage,
    Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { withNavigation } from 'react-navigation';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        var value = await AsyncStorage.getItem('token');
        if (value !== null) {
            this.props.navigation.navigate('Main');
        }
    }

    render() {
        
        return(
            <View style={styles.container}>

                <StatusBar
                    backgroundColor='#3F51B5'
                    barStyle="light-content"
                />

                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../logo/2.png')}/>
                </View>
                
                <TextInput
                    placeholder="Email"
                    placeholderTextColor = 'rgba(255,255,255,0.7)'
                    onChangeText = { (email) => this.setState({email})}
                    returnKeyType="next"  
                    onSubmitEditing={() => this.passwordInput.focus()} 
                    keyboardType='email-address' 
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.input}
                    underlineColorAndroid='transparent'
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor = 'rgba(255,255,255,0.7)'
                    onChangeText = { (password) => this.setState({password})}
                    returnKeyType="go"
                    secureTextEntry
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.input}
                    ref={(input) => this.passwordInput = input}
                    underlineColorAndroid='transparent'
                />

                <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={this.login}>
                        <Text style={styles.buttonText}>
                            LOGIN
                        </Text>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account yet?</Text>
                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={styles.signupButton}>  Signup</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    login = () => {

        fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })

        .then((response) => response.json())
        .then((res) => { console.log(JSON.stringify(res, undefined, 2))
            if (res.token)  {
                AsyncStorage.setItem('token', res.token);
                this.props.navigation.navigate('Main');
            }

            else {
                alert(res.error);
            }
        })
        .done();
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3F51B5',
        paddingHorizontal: 40,
    },
    logoContainer: {
        alignItems: 'center',
        flex: 6,
        justifyContent: 'center'
    },
    input: {
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: 'white',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    buttonContainer: {
        backgroundColor: '#303F9F',
        padding: 10,
        marginTop: 15,
        borderRadius: 25,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700'
    },
    signupContainer: {
        flex: 1,
        marginBottom: 50,
        marginTop: 15,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    signupText: {
        color: 'white'
    },
    signupButton: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center'
    }
});

export default withNavigation(Login);