import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Pressable, StyleSheet, Image, Dimensions, Share } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { Card } from "react-native-shadow-cards";
import AuthModal from '../modals/authModal';
import Loader from '../loaders/Loader'
import { useSelector } from "react-redux";

const LearnEarn = ({ navigation }) => {
     let { user } = useSelector(state => state.userAuth)
    const [header, setHeader] = useState(false);
    const [link, setLink] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let url = 'coincap.cloud'
        let username = user.lastName
        let fullUrl = `${url}/${username}`
        setLink(fullUrl)
        setTimeout(()=>{
            setIsLoading(false)
        },4000)
        
      }, []);

    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 5) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }

    const share = async () => {
        await Share.share({
            message: `${link}`,
            //the url that user will click to the app
            url: 'kkk',
            title: `${link}`
        })


    }
    let updateVisibility = () => {
        setIsAuthError(false)
        setAuthInfo('')
        setModalVisible(false)
    }

    let learnMore = () => {
        setIsAuthError(true)
        setAuthInfo('This feature is not available for your account yet')

    }

    if(isLoading){
        return <Loader/>
    }

    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateVisibility} message={authInfo} />}
        <SafeAreaView style={styles.screen}>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewContainer} onScroll={scrollHandler} stickyHeaderIndices={[0]}>
                <View style={{ ...styles.navigationHeader, borderBottomWidth: header ? 1 : 0, }}>

                    <Pressable onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                        <Feather name="arrow-left" size={23} color="rgb(44, 44, 44)" />
                        <Text style={{ ...styles.headerName, display: header ? 'flex' : 'none' }}>Learn and earn</Text>
                    </Pressable>


                </View>



                <Text style={styles.username}>Learn and Earn</Text>

                <Text style={{ ...styles.email }}>Start lessons,complete simple tasks and earn crypto in minutes.</Text>

                <Card style=
                    {styles.card}>
                    <Image
                        source={require('../assets/icons/box.jpeg')}
                        style={{ width: 90, height: 90, marginBottom: 30, marginLeft: 5 }} />

                    <View style={styles.textContainer}>
                        <Text style={styles.headerText}>Invite friends</Text>
                        <Text style={styles.contentText}>You'll both get free Bitcoin when a friend buys or sells $100 of crypto</Text>

                    </View>

                    <View style={styles.rewardContainer}>
                        <View>
                            <Text style={styles.rewardText}>Reward</Text>
                            <Text style={{ ...styles.rewardCash, color: 'green' }}>$10 in BTC</Text>
                        </View>
                        <View>
                            <Text style={{ ...styles.rewardText }}>Rewards earned </Text>
                            <Text style={styles.rewardCash}>$0 in BTC</Text>

                        </View>

                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.button} onPress={share}>
                            <Text style={styles.buttonText}>Invite friends</Text>
                        </Pressable>

                    </View>

                </Card>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        Limited while supplies last and amounts offered for each quiz may vary.Must verify ID to be eligible and complete quiz to earn.Customers may only earn once per quiz.Coincap  reserves the right to cancel the Earn offer at anytime.Coincap receives fees from assets issuers in connection with creating and distributing asset and/or protocol specific Earn content
                    </Text>
                    <Text style={styles.learnMoreText} onPress={learnMore}>Learn more</Text>
                </View>
            </ScrollView>

        </SafeAreaView></>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff"
    },
    navigationHeader: {
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 10,
        width: '100%',
        borderBottomColor: 'rgb(197, 197, 197)',
        paddingTop: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        
        paddingHorizontal: '5%',


    },
    headerName: {
        fontFamily: 'ABeeZee',
        fontSize: 20,
        marginLeft: '20%'

    },
    goback: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'


    },
    scrollviewContainer: {
        flex: 1,
        width: '100%',

    },

    email: {
        color: 'rgb(105, 105, 105)',
        fontFamily: 'ABeeZee',
        fontSize: 16,
        marginBottom: 30,
        paddingHorizontal: '5%',
    },
    username: {
        color: "black",
        fontSize: 25,
        fontFamily: 'ABeeZee',
        
        paddingHorizontal: '5%',

    },
    card: {
        width: '90%',
        borderRadius: 8,
        height: Dimensions.get('window').height / 1.4,
        borderWidth: 1,
        borderBottomWidth: 2,
        borderColor: 'rgb(223, 223, 223)',
        paddingTop: 50,
        marginBottom: 40,
        
        marginHorizontal: '5%',
    },
    cardText: {
        fontSize: 20,
        width: '60%',
        fontFamily: 'ABeeZee',
        fontWeight: '100',
        color: 'rgb(27, 27, 27)'
    },
    textContainer: {
        paddingHorizontal: 18,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 18,
        alignSelf: "flex-start",
        fontFamily: 'Poppins',
        marginBottom: 10,
        color: 'rgb(50,50,50)',
    },
    contentText: {
        fontSize: 16,
        alignSelf: "flex-start",
        fontFamily: 'ABeeZee',
        marginBottom: 25,
        color: 'rgb(100,100,100)'
    },
    rewardContainer: {
        paddingHorizontal: 18,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,

    },
    rewardText: {
        fontSize: 17,
        alignSelf: "flex-start",
        fontFamily: 'ABeeZee',
        color: 'rgb(100,100,100)',
        marginBottom: 10,

    },
    rewardCash: {
        fontSize: 18,
        alignSelf: "flex-start",
        fontFamily: 'ABeeZee',

    },
    buttonContainer: {
        paddingHorizontal: 18,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
        justifyContent: 'center'

    },
    button: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: 'rgb(240,240,240)',
        marginHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'black',
        fontSize: 15,
        fontFamily: 'Poppins'
    },
    footerContainer: {
        marginBottom: 60,
        paddingHorizontal: '5%',

    },
    footerText: {
        fontSize: 16,
        fontFamily: 'ABeeZee',
        color: 'rgb(100,100,100)',
        lineHeight: 20
    },
    learnMoreText: {
        fontSize: 15,
        color: '#0000FF'
    }
})

export default LearnEarn