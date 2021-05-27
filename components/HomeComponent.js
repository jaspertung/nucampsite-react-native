import React, { Component } from 'react';
import { Text, View, Animated } from 'react-native'
import { Card } from 'react-native-elements'
// import { CAMPSITES } from '../shared/campsites';
// import { PROMOTIONS } from '../shared/promotions';
// import { PARTNERS } from '../shared/partners';
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import Loading  from './LoadingComponent'

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners
    }
}

// function RenderItem({item}) ----was destructuring before, but need isLoading and errMess props now----
function RenderItem(props) {
    const {item} = props

    if (props.isLoading) {
        return <Loading />
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}} 
            >
                <Text
                    style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        )
    }
    return <View />
}
// item destructures from prop object

class Home extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         campsites: CAMPSITES,
    //         promotions: PROMOTIONS,
    //         partners: PARTNERS
    //     }
    // }
    
    constructor(props) {
        // storing animated value in local component state
        super(props)
        this.state = {
            scaleValue: new Animated.Value(0)
            // 0 is initial scale value
        }
    }

    // custom method
    animate() {
        Animated.timing(
            // 1st argument: name of animated value we want to change over time
            this.state.scaleValue,
            // 2nd argument: object with 3 properties
            {
                toValue: 1, //value we want to change to
                duration: 1500, //time it takes to animate from 0 to 1
                useNativeDriver: true //improves animation in library
            }
        ).start() //runs animation
    }

    // when home component mounts, will auto start animation
    componentDidMount() {
        this.animate()
    }
    
    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <Animated.ScrollView style={{transform: [{scale: this.state.scaleValue}]}}>
                <RenderItem
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]} //only passing in featured campsite
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess} //now passing in isloading and errmess
                />
                <RenderItem
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                    />
                <RenderItem
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    isLoading={this.props.partners.isLoading}
                    errMess={this.props.partners.errMess}
                    />
            </Animated.ScrollView>
            // ScrollView: loads all child components at once
            // FlatList: lazy loading: loads only what is on-screen (better performance, better for longer lists)
        )
    }
}

export default connect(mapStateToProps)(Home)