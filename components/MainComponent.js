import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Icon } from 'react-native-elements'
// import { CAMPSITES } from '../shared/campsites'; deleted when added navigation
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';

// Main component creates and holds all navigators

// stack navigator for Directory component
const DirectoryNavigator = createStackNavigator(
    // createStackNavigator function that requires 1 argument called routeCanFix object
    {
        Directory: { 
            screen: Directory,
            // can set navigationOptions for individual screens
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer}
                    // pass in navigation to use toggleDrawer method
                />
            })
        },
        CampsiteInfo: { screen: CampsiteInfo }
        // in argument, set what components will be available for the stack
    },
    // optional configuration setting argument
    {
        initialRouteName: 'Directory',
        // when navigator opened, default show Directory
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
        // configure settings for header
    }
)

// stack navigator for Home component
const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }, 
            headerLeft: <Icon
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer}
            />
        })
    }
)

// stack navigator for About component
const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }, 
            headerLeft: <Icon
                name='info-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer}
            />
        })
    }
)

// stack navigator for Contact component
const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }, 
            headerLeft: <Icon
                name='address-card'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer}
            />
        })
    }
)

// drawer navigator for Home component
const MainNavigator = createDrawerNavigator(
    {
        // 1st argument: object that contains the screens that will be in the drawer
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor} //changes depending if active or not
                    />
                )
            }
        },
        Directory: {
            screen: DirectoryNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        // route through stack navigator so give HomeNavigator and DirectoryNavigator instead of Component
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                drawerLabel: 'Contact Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
)

/* // return React component that handles connecting top level navigator to React Native application environment to respond to interactions like back button on device
const AppNavigator = createAppContainer(DirectoryNavigator)
// wrap top level navigator with createAppContainer */
const AppNavigator = createAppContainer(MainNavigator)
// MainNavigator replaced DirectoryNavigator as the top level navigator

class Main extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null
            // local state to keep track of which campsite has been selected so CampsiteInfoComponent knows which one to display
        };
    }*/ // moved campsite data to DirectoryComponent when added navigation
    

    /*onCampsiteSelect(campsiteId) {
        // event handler that updates state whenever campsite is selected
        this.setState({selectedCampsite: campsiteId})
    }*/ // moved event handler routing to navigation when added navigation

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
                    // compensate for android and ios platforms
                    // if ios, then padding top is 0 else set dynamic status bar height
                }}
            >
                <AppNavigator />
                {/*<Directory
                    campsites={this.state.campsites}
                    onPress={campsiteId => this.onCampsiteSelect(campsiteId)}
                    // not calling this.onCampsiteSelect method, but passing it to the Directory component to trigger it from there
                />
                <CampsiteInfo
                    campsite={this.state.campsites
                        .filter(campsite => campsite.id === this.state.selectedCampsite)[0]}
                    // want to pass in entire campsite object (id, name, description, image)
                    // can't pass in selectedCampsite because only contains campsite id
                    // so take entire campsite array and filter to find matching campsite id
                    // filter always returns array so grab first item in array at index 0 (??)
                /> */} 
                {/* replaced with AppNavigator which is container for DirectoryNavigator which contains screens for Directory and CampsiteInfo components*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
})
// creating internal stylesheet

export default Main;