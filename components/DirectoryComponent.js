import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { Tile } from 'react-native-elements'
//import { ListItem } from 'react-native-elements' ----changed when redux added-----
//import { CAMPSITES } from '../shared/campsites';
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import Loading  from './LoadingComponent'

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
    }
}

// function Directory(props) //changed from function to class to store state data when added navigation
class Directory extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         campsites: CAMPSITES
    //     }
    // } ----changed when redux added-----

    static navigationOptions = {
        title: 'Directory'
        // static: JS keyword that sets a method on the class itself rather than the object it is from
        // configure Directory Navigator screen header title
    }


    render() {
        const { navigate } = this.props.navigation
        // each screen component automatically gets the navigation prop which allows functions like navigate, goBack, getParams, etc
        // only need navigate right now so can destructure

        const renderDirectoryItem = ({item}) => {
            // item: object that gets passed into function parameter by default from FlatList (destructured)
            // like .map, FlatList iterates over every item in the array given to the "data" prop and then runs the function given in "renderItem" prop on every item then in renderDirectoryItem function, can access the current iteration as "item"

            return (
                // <ListItem
                //     title={item.name}
                //     subtitle={item.description}
                //     onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                //     // 1st argument: screen to navigate to, 2nd argument: adds extra parameters to the route (passes the id of the pressed campsite to navigate)

                //     //onPress={() => props.onPress(item.id)} ---changed b/c no more onCampsiteSelect in Main
                //     // built in onPress prop
                //     // trigger onCampsiteSelect event handler passed in from MainComponent via props
                //     // have access to the id of the pressed campsite so give the value to onCampsiteSelect event handler here to update selectedCampsite property in Main component with this id
                //     leftAvatar={{ source: require('./images/react-lake.jpg') }}
                //     /* requires object so 2 sets of {{}} */
                //     /* takes property of source and value is function provided by NodeJS (require) */
                //     /* hard coding 1 image for every item for now */
                // /> ----changed when redux added-----
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                    imageSrc={{uri: baseUrl + item.image}}
                />
            )
        }

        if (this.props.campsites.isLoading) {
            return <Loading />
        }

        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{props.campsites.errMess}</Text>
                </View>
            )
        }
        return (
            <FlatList
            // need to pass props into component
                data={this.props.campsites.campsites}
                //data={props.campsites} ---moved campsites data to this component so not passed as props anymore
                // where data is coming from
                // expecting data in the form of array
                renderItem={renderDirectoryItem}
                // specifies how to render each item in the list 
                keyExtractor={item => item.id.toString()}
                // provides unique key (using id) and expecting string so convert 
            />
        )
    }
}

export default connect(mapStateToProps)(Directory)