import React, { Component } from 'react'
import { Text, View, ScrollView, FlatList } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { CAMPSITES } from '../shared/campsites'
import { COMMENTS } from '../shared/comments'


// function RenderCampsite({campsite}) {
    // only using the property of the campsite object so can destructure
function RenderCampsite(props) {
    // using more properties (favorite) now so don't destructure and use props instead

    const {campsite} = props //destructure here instead and can still use favorite props
    if (campsite) {
        return (
            <Card
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')} >
                <Text style={{margin:10}}>
                    {/* looks like CSS but is JS object */}
                    {campsite.description}
                </Text>
                <Icon
                    name={props.favorite ? "heart" : "heart-o"}
                    // if favorite is true, display solid heart, else outline heart
                    type="font-awesome"
                    color="#f50"
                    raised //shadow effect
                    reverse //reverse color scheme
                    onPress={() => props.favorite ? console.log(`Already set as a favorite`) : props.markFavorite()}
                    // if already set as favorite, won't mark again and just console log
                />
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
            comments: COMMENTS,
            favorite: false
            // change to redux later because rn favorite will reset every time CampsiteInfoComponent is loaded
        }
    }

    markFavorite() {
        this.setState({favorite: true})
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
                <RenderCampsite campsite={campsite}
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                />
                {/* once have the id, have campsites array in local state so can filter by id to get campsite object */}

                {/* return <RenderCampsite campsite={props.campsite} /> -----replaced-------
                from props, pull out a campsite object and send to another component RenderCampsite (???) */}

                <RenderComments comments={comments} />
            </ScrollView>
        )
    }
}

export default CampsiteInfo