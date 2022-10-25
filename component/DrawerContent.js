import React from 'react';
import {
    DrawerContentScrollView,
} from '@react-navigation/drawer';

import * as WebBrowser from 'expo-web-browser';
import { View, Text, TouchableOpacity, StyleSheet,Image } from "react-native";
import { MaterialIcons, Ionicons, Octicons,} from '@expo/vector-icons';
import {truncate} from "../utils/util"


function CustomDrawerContent({ navigation, user }) {

    let navigateToBrowser = async (data) => {


        if (data == 'cooincap') {
            //navigate to password reset page
            await WebBrowser.openBrowserAsync('http://192.168.42.182:8080')
        } else {
            //navigate to policy page
            await WebBrowser.openBrowserAsync('http://192.168.42.182:8080/policy')
        }

    }




    return (
        <DrawerContentScrollView >
            <View style={styles.drawerContainer}>

                <TouchableOpacity style={styles.profileContainer}>
                    {user.identity?<Image source={{uri:user.identity}} style={{ width:100,height:100,borderRadius:100}} /> :<Ionicons name="person" size={80} color="#fff" style={{ paddingTop: 10 }} />}

                </TouchableOpacity>

                <TouchableOpacity style={styles.usernameCon}>
                    <Text style={styles.username}>{truncate(user.firstName, 8)} {truncate(user.lastName, 8)}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileSetting')}>
                    <Text style={styles.buttonText}>Profile & Settings</Text>
                </TouchableOpacity>




                <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('LearnEarn')}>

                    <MaterialIcons name="add-task" size={21} style={{ paddingTop: 10 }} />

                    <Text style={styles.text}>Learn and Earn
                    </Text>
                </TouchableOpacity>



                <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('InviteFriend')}>

                    <MaterialIcons name="person-add-alt" size={21} style={{ paddingTop: 10 }} />

                    <Text style={styles.text}>invite friends</Text>
                </TouchableOpacity>



                <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('Send')}>
                    <Octicons name="gift" size={21} style={{ paddingTop: 10 }} />

                    <Text style={styles.text}>send a gift</Text>
                </TouchableOpacity>



                





                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => navigateToBrowser('coincap')}>
                        <Text style={{ fontSize: 16, color: 'black', paddingLeft: 12, paddingTop: 10 }}>Coincap .</Text>

                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => navigateToBrowser('privacy')}>
                        <Text style={{ fontSize: 16, color: 'black', paddingLeft: 12, paddingTop: 10, textDecorationLine: 'underline' }}>Legal & Privacy</Text>

                    </TouchableOpacity>


                </View>








            </View>

        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        display: 'flex',
        paddingTop: 10,
        marginHorizontal: 20
    },
    profileContainer: {
        width: 100,
        height: 100,
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgb(192, 192, 192)',
        alignSelf: 'center',
        marginBottom: 20,
        overflow:'hidden'
    },
    camera:{
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    usernameCon: {
        alignSelf: 'center',
        marginBottom: 15,
        fontFamily: 'Poppins'
    },
    username: {
        fontSize: 22,
        fontFamily: 'Poppins'
    },
    button: {
        alignSelf: 'center',
        marginBottom: 10,
        width: '100%',
        borderRadius: 50,
        paddingVertical: 17,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(240,240,240)'
    },
    buttonText: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'Poppins'
    },
    content: {
        alignSelf: 'center',
        width: '100%',
        borderRadius: 50,
        paddingVertical: 13,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 16,
        fontFamily: 'Poppins',
        color: 'black',
        paddingLeft: 12,
        paddingTop: 10
    },
    footer: {
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }



})






export default CustomDrawerContent;