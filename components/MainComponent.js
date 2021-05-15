import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
// import { CAMPSITES } from '../shared/campsites'; deleted when added navigation

// Main component creates and holds all navigators
const DirectoryNavigator = createStackNavigator(
    // createStackNavigator function that requires 1 argument called routeCanFix object
    {
        Directory: { screen: Directory },
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

// return React component that handles connecting top level navigator to React Native application environment to respond to interactions like back button on device
const AppNavigator = createAppContainer(DirectoryNavigator)
// wrap top level navigator with createAppContainer

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

export default Main;