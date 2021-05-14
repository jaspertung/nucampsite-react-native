import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { CAMPSITES } from '../shared/campsites';
import { View } from 'react-native'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            selectedCampsite: null
            // local state to keep track of which campsite has been selected so CampsiteInfoComponent knows which one to display
        };
    }

    onCampsiteSelect(campsiteId) {
        // event handler that updates state whenever campsite is selected
        this.setState({selectedCampsite: campsiteId})
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Directory
                    campsites={this.state.campsites}
                    onPress={campsiteId => this.onCampsiteSelect(campsiteId)}
                    // not calling this.onCampsiteSelect method, but passing it to the Directory component to trigger it from there
                />
                <CampsiteInfo
                    campsite={this.state.campsites
                        .filter(campsite => campsite.id === this.state.selectedCampsite)[0]}
                    // want to pass in entire campsite object (id, name, description, image)
                    // can't pass in selectedCampsite because only contains campsite id
                    // so take entire campsite array and filter to find matching campsite id
                    // filter always returns array so grab first item in array at index 0 (??)
                />
            </View>
        )
    }
}

export default Main;