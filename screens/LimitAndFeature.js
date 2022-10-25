import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons';
import { Card } from "react-native-shadow-cards"



const LimitFeature = ({ navigation }) => {
    

    const continueHandler = () => {
        navigation.navigate('VerifyId')


    }

    return (<SafeAreaView style={styles.screen}>
        <View style={styles.container}>


            <View style={styles.navigationHeader}>

                <Pressable onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                    <Feather name="arrow-left" size={23} color="rgb(44, 44, 44)" />
                    <Text style={styles.headerName}>Limits and Features</Text>
                </Pressable>


            </View>

           


            <View style={styles.listContainer}>
                <View style={styles.actionCon}>
                    <View style={{ ...styles.numberCon }}>
                        <Feather name="credit-card" size={20} />
                    </View>
                    <View style={styles.actionTextCon}>
                        <Text style={styles.actionText}>3D Secure purchases</Text>

                    </View>

                </View>
                <View style={styles.durationCon}>
                    <Text style={styles.durationText}>$40/week</Text>

                </View>


            </View>

            <View style={styles.listContainer}>
                <View style={styles.actionCon}>
                    <View style={{ ...styles.numberCon }}>
                        <Ionicons name="send-sharp" size={24} color="black" />
                    </View>
                    <View style={styles.actionTextCon}>
                        <Text style={styles.actionText}>Send cryptocurrency</Text>

                    </View>

                </View>
                <View style={styles.durationCon}>
                    <Text style={styles.durationText}>Enabled</Text>

                </View>


            </View>

            <View style={styles.listContainer}>
                <View style={styles.actionCon}>
                    <View style={{ ...styles.numberCon }}>
                        <Ionicons name="qr-code-sharp" size={24} color="black" />
                    </View>
                    <View style={styles.actionTextCon}>
                        <Text style={styles.actionText}>Receive cryptocurrency</Text>

                    </View>

                </View>
                <View style={styles.durationCon}>
                    <Text style={styles.durationText}>Enabled</Text>

                </View>


            </View>





            <Card style={styles.photoCard}>
                <Text style={styles.headingText}>
                        Feature upgrade available
                    </Text>
                    <Text style={styles.text}>
                        Buy digital currency
                    </Text>
                <TouchableOpacity style={styles.button} onPress={continueHandler}>
                    <Text style={styles.buttonText}>
                        Verify photo ID
                    </Text>

                </TouchableOpacity>
            </Card>









        </View>

    </SafeAreaView>
    )




}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: '5%',
        paddingTop: 60
    },
    /* styling header */
    navigationHeader: {
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 10,
        width: '100%',
        borderBottomColor: 'rgb(197, 197, 197)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',


    },
    headerName: {
        fontFamily: 'Poppins',
        fontSize: 20,
        marginLeft: '10%'

    },
    goback: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'


    },




    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 20,
        alignItems: 'center',
        width: '100%',
        gap: '1rem'
    },
    numberCon: {
        height: 30,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionCon: {
        width: '80%',
        flexDirection: "row",
        paddingRight: '5%'


    },
    durationCon: {
        flexDirection: "row",
        alignItems: 'center',
        width: '15%',
        justifyContent: 'flex-end'

    },

    durationText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: 'rgb(44, 44, 44)',
    },
    actionTextCon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 10,
        justifyContent: 'flex-start'

    },
    actionText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: 'rgb(44, 44, 44)',
    },
    durationText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: 'rgb(44, 44, 44)',
    },

    /* styling the photo card */
    photoCard: {
        marginTop:20,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent:"flex-start",
        padding:10

    },
    headingText:{
        fontSize: 17,
        fontFamily: 'Poppins',
        marginBottom:10

    },
    text:{
        fontSize: 16,
        fontFamily: 'ABeeZee',
        color: 'rgb(44, 44, 44)',
        marginBottom:15

    },

    button: {
        width: '90%',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        marginBottom: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins',
        fontSize: 15,
    }

});

export default LimitFeature