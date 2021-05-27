import React, { Component } from 'react';
import { Text, FlatList, ScrollView } from 'react-native'
import { Card, ListItem } from 'react-native-elements'
// import { PARTNERS } from '../shared/partners'; ---- removed when added redux to fetch via json-server ------
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import Loading  from './LoadingComponent' // don't need curly braces because it is the default import
import * as Animatable from 'react-native-animatable'

const mapStateToProps = state => {
// receive state as a prop and returns partners data from the state
    return {
        partners: state.partners
    }
    // tells redux which part of the state we're interested in so don't need to grab the whole thing
}

function Mission(){
    return(
        <Card title="Our Mission">
            <Text style={{margin: 10}}>
            We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
            </Text>
        </Card>
    )
}

class About extends Component {
    /* constructor(props) {
        super(props)
        this.state = {
            partners: PARTNERS
        }
    } ----removed when added redux, don't need local state anymore-----*/

    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        const renderPartner = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    // leftAvatar={{ source: require('./images/bootstrap-logo.png') }} ----changed when redux added
                    // now look for baseUrl plus relative image path
                    leftAvatar={{ source: {uri: baseUrl + item.image} }}
                />
            )
        }

        if (this.props.partners.isLoading) {//holds partners data from redux store so can access the isLoading property
            return (
                <ScrollView>
                    <Mission />
                    <Card title="Community Partners">
                        <Loading />
                    </Card>
                </ScrollView>
            )
        }

        if (this.props.partners.errMess) {
            return (
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <Mission />
                        <Card title="Community Partners">
                            <Text>{this.props.partners.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            )
        }
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Mission />
                    <Card title="Community Partners">
                        <FlatList
                            // data={this.state.partners} ---change when added redux, because not data being passed as prop now----
                            data={this.props.partners.partners}
                            // 1st partners referring to entire part of the state, 2nd partners referring to the partners data array inside the partners state
                            renderItem={renderPartner}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}

// connecting component to redux store -- AboutComponent now receives the partners props from the redux store
export default connect(mapStateToProps)(About)