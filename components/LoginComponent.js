import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Image } from 'react-native'
import { Input, CheckBox, Button, Icon } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { baseUrl } from '../shared/baseUrl'
import * as ImageManipulator from 'expo-image-manipulator'
import * as MediaLibrary from 'expo-media-library'


class LoginTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }
    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({tintColor}) => ( //automatically gets arg from bottom tab navigator
            <Icon
                name='sign-in'
                type='font-awesome'
                iconStyle={{color: tintColor}}
            />
        )
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
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                color= '#fff'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        buttonStyle={{backgroundColor:'#5637DD'}}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.props.navigation.navigate('Register')} //destructured navigation previously
                        title='Register'
                        type='clear'
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                color= 'blue'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        titleStyle={{color:'blue'}}
                    />
                </View>
            </View>
        )
    }
}

class RegisterTab extends Component { // controlled form so data is stored in component state --> need constructor

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name='user-plus'
                type='font-awesome'
                iconStyle={{color: tintColor}}
            />
        )
    }

    getImageFromCamera = async () => {
        //need to get permissions to use device camera
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
        //permissions to read from and write to camera roll
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        
        //only continue if get permissions
        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            //value when promise from imagepicker is resolved
            const capturedImage = await ImagePicker.launchCameraAsync({
                //object with config options
                allowsEditing: true,
                aspect: [1, 1] //aspect ratio of 1:1
            })
            if(!capturedImage.cancelled) {
                console.log(capturedImage)
                // this.setState({imageUrl: capturedImage.uri})
                this.processImage(capturedImage.uri)
                MediaLibrary.saveToLibraryAsync(capturedImage.uri)
            }
        }
    }

    processImage = async (imgUri) => {
        const processedImage = await ImageManipulator.manipulateAsync(
            imgUri,
            [{ resize: {width: 400}}],
            { format: 'png' }
        )
        console.log(processedImage)
        this.setState({imageUrl: processedImage.uri})
    }

    getImageFromGallery = async () => {
        const cameraRollPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (cameraRollPermissions.status === 'granted') {
            const capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            })
            if(!capturedImage.cancelled) {
                console.log(capturedImage)
                this.processImage(capturedImage.uri)
            }
        }
    }

    handleRegister() {
        console.log(JSON.stringify(this.state))
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify(
                {username: this.state.username, password: this.state.password}))
                .catch(error => console.log('Could not save user info', error))
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .catch(error => console.log('Could not delete user info', error))
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: this.state.imageUrl}} //initialized to get local image from JSON server
                            loadingIndicatorSource={require('./images/logo.png')} //local loading pic when waiting for JSON server (same as default pic)
                            style={styles.image}
                        />
                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera} //no function calling and not providing params
                            //not passing args to event handler (improved way) will need to use bind on method or use arrow function
                        />
                        <Button
                            title='Gallery'
                            onPress={this.getImageFromGallery}
                        />
                    </View>
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
                    <Input
                        placeholder='First Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={firstname => this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Last Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={lastname => this.setState({lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Email'
                        leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
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
                            onPress={() => this.handleRegister()}
                            title='Register'
                            icon={
                                <Icon
                                    name='user-plus'
                                    type='font-awesome'
                                    color='#fff'
                                    iconStyle={{marginRight: 10}}
                                />
                            }
                            buttonStyle={{backgroundColor: '#5637DD'}}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const Login = createBottomTabNavigator(
    { // 1st object arg: list of tabs
        Login: LoginTab,
        Register: RegisterTab
    },
    {// 2nd object arg: config options
        tabBarOptions: {
            activeBackgroundColor: '#5637DD',
            inactiveBackgroundColor: '#CEC8FF',
            activeTintColor: '#fff',
            inactiveTintColor: '#808080',
            labelStyle: {fontSize: 16}
        }
    }
)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 0
    },
    formCheckbox: {
        margin: 0,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    image: {
        width: 60,
        height: 60
    }
});

export default Login;