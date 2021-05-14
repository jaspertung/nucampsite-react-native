import React from 'react'
import { FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'

function Directory(props) {
    const renderDirectoryItem = ({item}) => {
        // item: object that gets passed into function parameter by default from FlatList (destructured)
        // like .map, FlatList iterates over every item in the array given to the "data" prop and then runs the function given in "renderItem" prop on every item then in renderDirectoryItem function, can access the current iteration as "item"

        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                onPress={() => props.onPress(item.id)}
                // built in onPress prop
                // trigger onCampsiteSelect event handler passed in via props
                // have access to the id of the pressed campsite so give the value to onCampsiteSelect event handler here to update selectedCampsite property in Main component with this id
                leftAvatar={{ source: require('./images/react-lake.jpg') }}
                /* requires object so 2 sets of {{}} */
                /* takes property of source and value is function provided by NodeJS (require) */
                /* hard coding 1 image for every item for now */
            />
        )
    }
    return (
        <FlatList
        /* need to pass props into component */
            data={props.campsites}
            /* where data is coming from */
            /* expecting data in the form of array */
            renderItem={renderDirectoryItem}
            /* specifies how to render each item in the list */
            keyExtractor={item => item.id.toString()}
            /* provides unique key (using id) and expecting string so convert */
        />
    )
}

export default Directory