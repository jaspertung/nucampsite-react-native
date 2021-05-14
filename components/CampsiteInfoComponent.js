import React from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'

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

function CampsiteInfo(props) {
    return <RenderCampsite campsite={props.campsite} />
    // from props, pull out a campsite object and send to another component RenderCampsite (???)
}

export default CampsiteInfo