import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import { withNavigation } from 'react-navigation';

class Main extends Component {
    render() {
        return (
            <View style={styles.container}>
                
                 <Text style={styles.titleContainer}>
                    Welcome
                </Text>

                <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={this.logout}>
                        <Text style={styles.buttonText}>
                            LOGOUT
                        </Text>
                </TouchableOpacity>

                
            </View>
        );
    }

    logout = () => {
        AsyncStorage.removeItem('token');
        this.props.navigation.navigate('Login');
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3F51B5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        flex: 1,
        color: 'white',
        fontSize: 60,
        marginTop: 100,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        width: 300,
        backgroundColor: '#303F9F',
        padding: 10,
        marginBottom: 50,
        borderRadius: 25,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700'
    },
});

export default withNavigation(Main);