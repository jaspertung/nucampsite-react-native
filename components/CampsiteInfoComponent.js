import React, { Component } from 'react'
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Button } from 'react-native'
import { Card, Icon, Rating, Input } from 'react-native-elements'
//import { CAMPSITES } from '../shared/campsites' ---- removed when added redux to fetch via json-server ------
//import { COMMENTS } from '../shared/comments' ---- removed when added redux to fetch via json-server ------
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavorite, postComment } from '../redux/ActionCreators'

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites,
    }
}

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId)),
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text))
}

// function RenderCampsite({campsite}) {
    // only using the property of the campsite object so can destructure
function RenderCampsite(props) {
    // using more properties (favorite) now so don't destructure and use props instead

    const {campsite} = props //destructure here instead and can still use favorite props
    if (campsite) {
        return (
            <Card
                featuredTitle={campsite.name}
                //image={require('./images/react-lake.jpg')} ----changed when redux added-----
                image={{uri: baseUrl + campsite.image}} >
                <Text style={{margin:10}}>
                    {/* looks like CSS but is JS object */}
                    {campsite.description}
                </Text>
                <View style={styles.cardRow}>
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
                    <Icon
                        name={"pencil"}
                        type="font-awesome"
                        color="#5637DD"
                        raised
                        reverse 
                        onPress={() => props.onShowModal()}
                    />
                </View>
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
                <Rating
                    startingValue={item.rating}
                    imageSize={10}
                    style={{alignItems: 'flex-start', paddingVertical: '5%'}}
                    read-only
                />
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
    //constructor(props) {
        //super(props)
        //this.state = {
            // campsites: CAMPSITES, ----removed when redux added
            // comments: COMMENTS,
            //favorite: false
            // change to redux later because rn favorite will reset every time CampsiteInfoComponent is loaded
        //}
    //}
    constructor(props) {
        super(props)
        this.state = {
            rating: 5,
            author: '',
            text: '',
            showModal: false
        }
    }
    
    toggleModal() {
        this.setState({showModal: !this.state.showModal})
    }

    handleComment(campsiteId) {
        this.props.postComment(campsiteId, this.state.rating, this.state.author, this.state.text, )
        this.toggleModal()
    }

    resetForm() {
        this.setState({
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        })
    }

    // markFavorite() {
    //     this.setState({favorite: true})
    // } ----changed when added favorite to redux -----

    markFavorite(campsiteId) { //pass in campsite id to mark
        this.props.postFavorite(campsiteId)
        //can call as props because of mapDispatchToProps object earlier in this file
    }

    static navigationOptions = {
        title: 'Campsite Information'
        // configure Campsite Information Navigator screen header title
    }

    render() {
        // from DirectoryComponent holding id of campsite being passed, so access id in here from navigation prop that comes automatically from being a screen
        const campsiteId = this.props.navigation.getParam('campsiteId')
        // getting parameter of campsite id
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0]
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId)
        // filtering out comments that have matching campsiteId property to the selected campsite's campsiteId

        return (
            <ScrollView>
                <RenderCampsite campsite={campsite}
                    favorite={this.props.favorites.includes(campsiteId)}
                    // returns true or false if array already includes the favorited campsite id then pass value to RenderCampsite component
                    markFavorite={() => this.markFavorite(campsiteId)}
                    onShowModal={() => this.toggleModal()}
                />
                {/* once have the id, have campsites array in local state so can filter by id to get campsite object */}

                {/* return <RenderCampsite campsite={props.campsite} /> -----replaced-------
                from props, pull out a campsite object and send to another component RenderCampsite (???) */}

                <RenderComments comments={comments}/>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal} 
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={rating => this.setState({rating: rating})}
                            style={{paddingVertical: 10}}
                        />
                        <Input 
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle= {{paddingRight: 10}}
                            onChangeText={author => this.setState({author: author})}
                            value={this.state.author}
                        />
                        <Input 
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            leftIconContainerStyle= {{paddingRight: 10}}
                            onChangeText={text => this.setState({text: text})}
                            value={this.state.text}
                        />
                        <View style={{margin: 10}}>
                            <Button
                                onPress={() => {
                                    this.handleComment(campsiteId)
                                    this.resetForm()
                                }}
                                color='#5637DD'
                                title='Submit'
                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button
                                onPress={() => {
                                    this.toggleModal()
                                    this.resetForm()
                                }}
                                color='#808080'
                                title='Cancel'
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo)