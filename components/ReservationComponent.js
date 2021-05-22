import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Switch, Button, Picker } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
// import Picker from '@react-native-community/picker'

// controlled form where data is stored in and controlled by the component itself rather than by redux
class Reservation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            campers: 1,
            hikeIn: false,
            date: new Date()
        }
    }

    static navigationOptions = {
        title: `Reserve Campsite`
    }

    handleReservation() {
        console.log(JSON.stringify(this.state))
        this.setState({
            campers: 1,
            hikeIn: false,
            date: new Date()
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Campers</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.campers} /* updated to match current state for selectedValue to display selected value */
                        onValueChange={itemValue => this.setState({campers: itemValue})} /* when user selects a picker.item, triggers onValueChange prop to update component's state with the item's value */
                    > 
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Hike-In?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.hikeIn}
                        trackColor={{true: '#5637DD', false: null}}
                        onValueChange={value => this.setState({hikeIn: value})} /* updates Reservation component state when user selects */
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date</Text>
                    <Button
                        onPress={() =>
                            this.setState({showCalendar: !this.state.showCalendar}) /* changes showCalendar state */
                        }
                        title={this.state.date.toLocaleDateString('en-US')} /* shows current date formatted in US convention */
                        color='#5637DD'
                        accessibilityLabel= 'Tap me to select a reservation date'
                    />
                </View>
                {/* only show calendar options when button is pressed */}
                {/* logical and: false && true (if left side false, right side not operated at all) */}
                {this.state.showCalendar && (
                /* if this.state.showCalendar is false, then && will stop evaluating and not show DateTimePicker */
                    <DateTimePicker
                        style={styles.formLabel}
                        value={this.state.date}
                        mode={'date'}
                        display='default'
                        onChange={(event, selectedDate) => { //saves selected date to the state
                            selectedDate && this.setState({date: selectedDate, showCalendar: false})
                            // when user selectes a date, set showCalendar to false to hide it again
                            // if user doesn't select a date and exits, set selectedDate to undefined so will exit out of calendar
                        }}
                    />
                )}
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title='Search'
                        color='#5637DD'
                        accessibilityLabel='Tap me to search for available campsites to reserve'
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
})

export default Reservation