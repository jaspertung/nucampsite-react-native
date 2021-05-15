import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import { CAMPSITES } from '../shared/campsites';


function RenderCampsite({campsite}) {
    // only using the property of the campsite object so can destructure (???)
    if (campsite) {
        return (
            <Card
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')} >
                <Text style={{margin:10}}>
                    {/* looks like CSS but is JS object */}
                    {campsite.description}
                </Text>
            </Card>
        )
    }
    return <View />
}

// function CampsiteInfo(props) ---convert into class component to hold state

class CampsiteInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            campsites: CAMPSITES
        }
    }

    static navigationOptions = {
        title: 'Campsite Information'
        // configure Campsite Information Navigator screen header title
    }

    render() {
        // from DirectoryComponent holding id of campsite being passed, so access id in here from navigation prop that comes automatically from being a screen
        const campsiteId = this.props.navigation.getParam('campsiteId')
        // getting parameter of campsite id
        const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0]
        return <RenderCampsite campsite={campsite} />
        // once have the id, have campsites array in local state so can filter by id to get campsite object

        // return <RenderCampsite campsite={props.campsite} />
        // from props, pull out a campsite object and send to another component RenderCampsite (???)
    }
}

export default CampsiteInfo