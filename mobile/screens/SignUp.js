import React from "react"
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"
import {View, Text, SafeAreaView, ScrollView, Platform, StatusBar, StyleSheet, Dimensions} from "react-native"

const SignUp = (props) => {
    return (
        <SafeAreaView style={{marginTop: Platform.OS === "android" && StatusBar.currentHeight, flex: 1}}>
            <ScrollView>
                <View style={styles.SignUpMain}>
                <Text>Sign Up</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapDispatchToProps = {
    loginUser: usersActions.logInOrSignUp
}

export default connect(null, mapDispatchToProps)(SignUp)

const {height} = Dimensions.get("window")
const styles = StyleSheet.create({
    SignUpMain: {
        minHeight: height-StatusBar.currentHeight,
    },
})