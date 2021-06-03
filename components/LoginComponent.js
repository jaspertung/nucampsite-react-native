import React, { Component } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { Input, CheckBox } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }
    static navigationOptions = {
        title: 'Login'
    }
    handleLogin() {
        console.log(JSON.stringify(this.state))
        if (this.state.remember) {
            // if checkbox is checked, save username and pass to store
            SecureStore.setItemAsync('userinfo', JSON.stringify(
                {username: this.state.username, password: this.state.password}))
                // key: userinfo, value: username and password converted to JSON string
                .catch(error => console.log('Could not save user info', error))
                // SecureStore returns promise that rejects if there is an error so can check for rejected promise
        } else { //if checkbox id not checked, then delete info from SecureStore
            SecureStore.deleteItemAsync('userinfo')
            //if no info stored under userinfo key, won't do anything
                .catch(error => console.log('Could not delete user info', error))
                //if info under key, but error in deleting
        }
    }
    // ensure userinfo is retrieved from SecureStore when component mounts
    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
        // looks to see if there is a value under userinfo key, if so will return the key's values
            .then(userdata => {
                const userinfo = JSON.parse(userdata)
                // converting JSON back to string
                if (userinfo) {
                    this.setState({username: userinfo.username})
                    this.setState({password: userinfo.password})
                    this.setState({remember: true})
                }
                // only have userinfo values if checkbox is checked so can deduce that it is
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder='Username'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={username => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={{type: 'font-awesome', name: 'key'}}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.handleLogin()}
                        title='Login'
                        color='#5637DD'
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
});

export default Login;