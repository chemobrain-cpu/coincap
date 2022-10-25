import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import { checkIfIsLoggedIn, loadCoins } from "../store/action/appStorage";
import { useDispatch } from "react-redux"
import ErrorModal from '../modals/errorModal'

let Splash = ({ navigation }) => {
    let dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    const visibilityHandler = () => {
        setModalVisible(false)
    }

    useEffect(() => {
        async function fetchData() {
            // You can await here
            let response = await dispatch(checkIfIsLoggedIn())
                if (!response.bool) {
                    return navigation.navigate('Splash_2')
                }
        }
        fetchData()

    }, [dispatch, checkIfIsLoggedIn, navigation, loadCoins])
    //on this screen loads,check the sync storage for 
   

    return (
        <SafeAreaView style={styles.screen}>
            <ErrorModal
                modalVisible={modalVisible}
                updateVisibility={visibilityHandler}
            />
            <View style={{ ...styles.container, opacity: modalVisible ? 0.3 : 1 }}>
                <Text style={styles.text}>coincap</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#1652f0",
        zIndex: 10
    },
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 35,
        fontFamily: 'ABeeZee'

    }
})


export default Splash