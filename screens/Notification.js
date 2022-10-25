import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Dimensions } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons';
import { useDispatch} from "react-redux";
import GiftNotification from '../component/giftnotification';
import Error from '../component/errorComponent'
import Loader from '../loaders/Loader'
import { getNotifications } from "../store/action/appStorage";


const Notification = ({ navigation }) => {
    let [header, setHeader] = useState(false)
    const [isError, setIsError] = useState(false)
    let [isLoading, setIsLoading] = useState(true)
    let [notifications, setNotifications] = useState(true)
    let dispatch = useDispatch()


    useEffect(() => {
        fetchNotification()
    }, [])

    let fetchNotification = async()=>{
        setIsLoading(true)
        let res = await dispatch(getNotifications())
        if(!res){
            return
        }
        if(!res.bool){
            setIsError(true)
            setIsLoading(false)
            return
        }
        
        setNotifications(res.message.arr)
        setIsLoading(false)

    }


    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 5) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }

    const trade = () => {
        navigation.navigate('TradeList')
    }

    const setting = () => {
        navigation.navigate('ProfileSetting')
    }

    if (isError) {
        //navigate to error
        return <Error
            tryAgain={fetchNotification}

        />
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewContainer} onScroll={scrollHandler} stickyHeaderIndices={[0]}>

                <View style={styles.navigationHeader}>
                    <Pressable style={{ ...styles.goback }} >
                        <Pressable onPress={() => navigation.goBack()}>
                            <Feather name="arrow-left" size={24} color="rgb(44, 44, 44)" />

                        </Pressable>

                        <Text style={{ ...styles.headerName }}>Notifications</Text>
                        <Pressable onPress={setting}>
                            <Ionicons name="settings" size={24} color="black" />

                        </Pressable>

                    </Pressable>
                </View>
                {notifications.map(data => {
                    return <GiftNotification
                        key={data._id}
                        topic={data.topic}
                        date={data.date}
                        text={data.text}
                        price={data.price}
                        trade={trade} />

                })}

            </ScrollView>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        paddingBottom: 100,
        width: Dimensions.get('window').width,


    },
    navigationHeader: {
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 10,
        width: '100%',
        borderBottomColor: 'rgb(240, 240, 240)',
        borderBottomWidth: 2,
        paddingTop: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between'

    },
    headerName: {
        fontSize: 20,
        fontFamily: 'Poppins'

    },
    goback: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10

    }



})

export default Notification