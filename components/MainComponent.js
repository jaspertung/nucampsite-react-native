import React, { Component } from 'react';
import { View, Platform, StyleSheet, Text, ScrollView, Image, Alert, ToastAndroid } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { Icon } from 'react-native-elements'
import SafeAreaView from 'react-native-safe-area-view'
// import { CAMPSITES } from '../shared/campsites'; deleted when added navigation
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';
import Login from './LoginComponent';
import { connect } from 'react-redux'
import { fetchCampsites, fetchComments, fetchPromotions, fetchPartners } from '../redux/ActionCreators' //thunked ActionCreators
import NetInfo from '@react-native-community/netinfo'

const mapDispatchToProps = {
    // allows access to action creators as props
    fetchCampsites,
    fetchComments,
    fetchPromotions,
    fetchPartners
} //perform async fetch calls to get data from server

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
                    onPress={() => navigation.toggleDrawer()}
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
                onPress={() => navigation.toggleDrawer()}
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
                onPress={() => navigation.toggleDrawer()}
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
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
)

// stack navigator for Reservation component
const ReservationNavigator = createStackNavigator(
    {
        Reservation: { screen: Reservation }
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
                name='tree'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
)

// stack navigator for Favorites component
const FavoritesNavigator = createStackNavigator(
    {
        Favorites: { screen: Favorites }
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
                name='heart'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
)

// stack navigator for Login component
const LoginNavigator = createStackNavigator(
    {
        Login: { screen: Login }
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
                name='sign-in'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

// customizing drawer component
const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView /* for iphone X */
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}
        >
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image
                        source={require('./images/logo.png')}
                        style={styles.drawerImage}
                    />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>NuCamp</Text>
                </View>
            </View>
            <DrawerItems {...props} />
            {/* ??? */}
        </SafeAreaView>
    </ScrollView>
)

// drawer navigator for Home component
const MainNavigator = createDrawerNavigator(
    {
        // 1st argument: object that contains the screens that will be in the drawer
        Login: {
            screen: LoginNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='sign-in'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
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
        Reservation: {
            screen: ReservationNavigator,
            navigationOptions: {
                drawerLabel: 'Reserve Campsite',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='tree'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Favorites: {
            screen: FavoritesNavigator,
            navigationOptions: {
                drawerLabel: 'My Favorites',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='heart'
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
        initialRouteName: 'Home',
        drawerBackgroundColor: '#CEC8FF',
        contentComponent: CustomDrawerContentComponent
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

    // making main component call action creators after the component has been created
    componentDidMount() {
        this.props.fetchCampsites()
        this.props.fetchComments()
        this.props.fetchPromotions()
        this.props.fetchPartners()
        this.showNetInfo()
        // NetInfo libraries's fetch method returns a promise that resolves to a NetInfoState object
        // access NetInfoState object with .then and named connectionInfo)
        /*NetInfo.fetch().then(connectionInfo => {
            (Platform.OS === 'ios')
                ? Alert.alert('Initial Network Connectivity Type: ', connectionInfo.type)
                // Toast- brief message that pops up and then fades away
                //.LONG- length of time shown (3.5 sec)
                : ToastAndroid.show('Initial Network Connectivity Type: ' + connectionInfo.type, ToastAndroid.LONG)
        }) ---changed to async method---*/
        // subscribe to network changes as soon as application loads
        this.unsubscribeNetInfo = NetInfo.addEventListener(connectionInfo => {
            this.handleConnectivityChange(connectionInfo)
        })
    }

    async showNetInfo() {
        const connectionInfo = await NetInfo.fetch()
        (Platform.OS === 'ios')
                ? Alert.alert('Initial Network Connectivity Type: ', connectionInfo.type)
                : ToastAndroid.show('Initial Network Connectivity Type: ' + connectionInfo.type, ToastAndroid.LONG)
    }

    componentWillUnmount() {
        this.unsubscribeNetInfo()
    }

    handleConnectivityChange = connectionInfo => {
        let connectionMsg = 'You are now connected to an active network.'
        switch (connectionInfo.type) {
            case 'none':
                connectionMsg = 'No network connection is active.'
                break
            case 'unknown':
                connectionMsg = 'The network connection state is now unknown.'
                break
            case 'cellular':
                connectionMsg = 'You are now connected to a cellular network.'
                break
            case 'wifi':
                connectionMsg = 'You are now connected to a WiFi network.'
                break
        }
        (Platform.OS === 'ios')
            ? Alert.alert('Connection change:', connectionMsg)
            : ToastAndroid.show(connectionMsg, ToastAndroid.LONG)
    }

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

// internal stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
})

// no mapStateToProps so use null as first argument so can access action creators as props inside main component
export default connect(null, mapDispatchToProps)(Main);