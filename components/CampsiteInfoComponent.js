import React, { Component } from 'react'
import { Text, View, ScrollView, FlatList } from 'react-native'
import { Card, ListItem } from 'react-native-elements'
import { CAMPSITES } from '../shared/campsites'
import { COMMENTS } from '../shared/comments'


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

function RenderComments({comments}) {
    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        )
    }
    return (
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    )
}

// function CampsiteInfo(props) ---convert into class component to hold state

class CampsiteInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS
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
        const comments = this.state.comments.filter(comment => comment.campsiteId === campsiteId)
        // filtering out comments that have matching campsiteId property to the selected campsite's campsiteId

        return (
            <ScrollView>
                <RenderCampsite campsite={campsite} />
                {/* once have the id, have campsites array in local state so can filter by id to get campsite object */}

                {/* return <RenderCampsite campsite={props.campsite} /> -----replaced-------
                from props, pull out a campsite object and send to another component RenderCampsite (???) */}

                <RenderComments comments={comments} />
            </ScrollView>
        )
    }
}

export default CampsiteInfo