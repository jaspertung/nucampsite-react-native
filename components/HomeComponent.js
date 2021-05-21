import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native'
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
    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <ScrollView>
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
            </ScrollView>
            // ScrollView: loads all child components at once
            // FlatList: lazy loading: loads only what is on-screen (better performance, better for longer lists)
        )
    }
}

export default connect(mapStateToProps)(Home)