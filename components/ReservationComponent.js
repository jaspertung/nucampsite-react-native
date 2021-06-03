import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Switch, Button, Picker, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import * as Animatable from 'react-native-animatable'
import * as Notifications from 'expo-notifications'
// import Picker from '@react-native-community/picker'

// controlled form where data is stored in and controlled by the component itself rather than by redux
class Reservation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalendar: false
            //showModal: false ----replaced with alert----
        }
    }

    static navigationOptions = {
        title: `Reserve Campsite`
    }

    // toggleModal() {
    //     this.setState({showModal: !this.state.showModal})
    // } ----replaced with alert----

    handleReservation() {
        console.log(JSON.stringify(this.state))
        const message = `Number of Campers: ${this.state.campers}\n
                        Hike-In? ${this.state.hikeIn}\n
                        Date: ${this.state.date.toLocaleDateString('en-US')}`
        Alert.alert(
            'Begin Search?',
            message,
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        console.log('Reservation Search Canceled')
                        this.resetForm()
                    },
                    style: 'cancel'
                },
                {
                    text: 'OK', //call notification when OK button pressed
                    onPress: () => {
                        this.presentLocalNotification(this.state.date.toLocaleDateString('en-US'))
                        this.resetForm()
                    }
                }
            ],
            { cancelable: false }
        )
    }

    resetForm() {
        this.setState({
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalendar: false,
            //showModal: false
            // resets state
        })
    }

    // requesting permissions from device and waiting for permissions to return before continuing
    async presentLocalNotification(date) { // async function: special function that always returns a promise
    // don't want to send notification immediately because need to get permission first
        function sendNotification() {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true
                    // override default no show notification
                })
            })
            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Your Campsite Reservation Search',
                    body: `Search for ${date} requested`
                },
                trigger: null //causes notification to fire immediately (can be used to schedule)
            })
        }
        //check if have permissions
        let permissions = await Notifications.getPermissionsAsync() //await can only be used inside async function (similar to then method)
        // .getPermissionsAsync checks if app already have notifications permissions from device
        // returns promise with results of the check
        // await makes function wait until promise is fulfilled, then assign promise result to permissions variable
        if (!permissions.granted) { //if unable to verify existing permissions
            //make explicit request for permission
            permissions = await Notifications.requestPermissionsAsync()
        }
        if (permissions.granted) { //already had permission or just got them
            sendNotification()
        }
    }

    render() {
        return (
            <Animatable.View
                animation='zoomIn'
                duration={2000}
                delay={1000}>
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
                    {/* <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.showModal} //if showModal false, then visible is false and won't show modal
                        onRequestClose={() => this.toggleModal()} //triggered if user uses hardware back button
                    >
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>Search Campsite Reservations</Text>
                            <Text style={styles.modalText}>
                                Number of Campers: {this.state.campers}
                            </Text>
                            <Text style={styles.modalText}>
                                Hike-In?: {this.state.hikeIn ? 'Yes' : 'No'}
                            </Text>
                            <Text style={styles.modalText}>
                                Date: {this.state.date.toLocaleDateString('en-US')}
                            </Text>
                            <Button
                                onPress={() => {
                                    // this.toggleModal()
                                    
                                color='#5637DD'
                                title='Close'
                            />
                        </View>
                    </Modal> */}
                </ScrollView>
            </Animatable.View>
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