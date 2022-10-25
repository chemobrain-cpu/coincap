import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from "react-native";

import { Feather, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux"
import Error from "../component/errorComponent";
import { useRoute } from "@react-navigation/native";
import { Withdrawal } from "../store/action/appStorage";
import Loader from '../loaders/Loader';
import AuthModal from '../modals/authModal'


const Withdraw = ({ navigation }) => {
    const route = useRoute();
    let [value, setValue] = useState("")
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    const [userStatus, setUserStatus] = useState("")
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [modalVisible, setModalVisible] = useState("")
    const [url, setUrl] = useState("")
    let { user } = useSelector(state => state.userAuth)

    const dispatch = useDispatch()

    let dollarPriceUi = (data) => {
        if (data.length <= 8) {
            return <Text style={{ ...styles.dollarPrice, fontSize: 30 }}>${data}</Text>

        }
        return <Text style={{ ...styles.dollarPrice, fontSize: 25 }}>${data}</Text>



    }

    //deciding where to go depending on the action
    let navigateToCard = () => {
        if (userStatus == 'pay') {
            navigation.navigate('CardForm')
        }
        else if (userStatus == "id") {
            navigation.navigate('VerifyId')
        }
        else if (userStatus == 'insufficient') {
            //navigate user to Withdrawal
            return

        }
        else if (userStatus == "error") {
            return
        }
        else if (userStatus == "bought") {
            //i should be able to navigate to my asset
            return navigation.navigate("Assets")
        }
    }

    /*
        let modalHandler = () => {
            setModalVisible(prev => !prev)
        }*/

    //button function
    let button = (num) => {
        setValue(prev => {
            if (prev.length > 10) {
                return prev
            }
            return prev + num
        })
    }

    //dot fun
    let point = () => {

        setValue(prev => {
            //check if it already contains decimal point 
            let pointExist = prev.includes(".")
            if (!pointExist) {
                let num = Number(prev)
                let decimalNum = num.toFixed(1)
                let numChar = decimalNum.toString()
                return numChar.slice(0, -1)

            }
            return prev


        })
    }

    //deleting algorithm
    let deleteHandler = () => {
        //get the value string and remove the last element
        setValue(prev => prev.slice(0, -1))

    }



    let proceedHandler = async () => {
        //check if user has that amount

        if (Number(user.accountBalance) < Number(value)) {
            setIsAuthError(true)
            setAuthInfo('insufficient fund')
            setIsLoading(false)
            setUrl('WithdrawFund')
            return

        }
        setIsLoading(true)
        let res = await dispatch(Withdrawal({ amount: value }))
        if (!res.bool) {
            setIsAuthError(true)
            setAuthInfo(res.message)
            setIsLoading(false)
            setUrl(res.url)

            return
        }
        setIsAuthError(true)
        setIsAuthError(true)
        setAuthInfo("Transaction is being processed")
        setIsLoading(false)

    }


    let changeVisibility = () => {
        setIsAuthError(prev => !prev)
        if (url) {
            navigation.navigate(url)

        }
        return
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<>
        {/* modal for proceeding*/}
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={changeVisibility} message={authInfo} />}

        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
                <View style={{ display: 'flex', width: '100%' }}>
                    <View style={{ ...styles.headerContainer, }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContainerIcon} >
                            <AntDesign name="close" size={23} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.headerContainerTitle} >
                            <Text style={styles.title}>${Number(user.accountBalance).toFixed(2)} available !</Text>

                        </TouchableOpacity>





                    </View>
                </View>



                <View style={styles.priceContainer}>
                    <View style={styles.valueCon}>
                        {value == '' ? <View style={styles.moneyCon}>
                            <Text style={styles.money}>$ 0</Text>

                        </View> : <View style={styles.twoPriceColumn}>

                            <View style={styles.dollarPriceCon}>

                                {dollarPriceUi(Number(value))}

                            </View>




                        </View>}

                    </View>
                </View>








                <View style={styles.calculatorCon}>
                    <View style={styles.numberContainer}>
                        <TouchableOpacity style={styles.numberButton} onPress={() => button('1')}>
                            <Text style={styles.number}>1</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.numberButton} onPress={() => button('2')}>
                            <Text style={styles.number}>2</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.numberButton} onPress={() => button('3')}>
                            <Text style={styles.number}>3</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.numberContainer}>
                        <TouchableOpacity style={styles.numberButton} onPress={() => button('4')}>
                            <Text style={styles.number}>4</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.numberButton} onPress={() => button('5')}>
                            <Text style={styles.number}>5</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.numberButton} onPress={() => button('6')}>
                            <Text style={styles.number}>6</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.numberContainer}>
                        <TouchableOpacity style={styles.numberButton} onPress={() => button('7')}>
                            <Text style={styles.number}>7</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.numberButton} onPress={() => button('8')}>
                            <Text style={styles.number}>8</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.numberButton} onPress={() => button('9')}>
                            <Text style={styles.number}>9</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.numberContainer}>
                        <TouchableOpacity style={styles.numberButton} onPress={() => point(".")}>
                            <Text style={styles.number}>.</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.numberButton} onPress={() => button('0')}>
                            <Text style={styles.number}>0</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.numberButton} onPress={() => deleteHandler()}>
                            <Feather name="arrow-left" size={22} color="rgb(44, 44, 44)" />
                        </TouchableOpacity>

                    </View>

                </View>

                <View style={styles.buttonCon}>
                    <TouchableOpacity style={{ ...styles.button }} onPress={proceedHandler}>
                        <Text style={styles.buttonText}>Withdraw fund</Text>

                    </TouchableOpacity>

                </View>



            </ScrollView>

        </SafeAreaView>
    </>);
};

const styles = StyleSheet.create({

    scrollContainer: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
    },
    headerContainer: {
        paddingTop: 60,
        display: "flex",
        flexDirection: "row",
        marginBottom: 45,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerContainerTitle: {
        paddingLeft: 30

    },



    title: {
        fontSize: 22,
        fontFamily: 'Poppins',

        textAlign: 'center'
    },
    balance: {
        fontSize: 17,
        fontFamily: 'ABeeZee',
        paddingLeft: 8,
        color: 'rgb(100,100,100)'
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 45,
        marginBottom: 80,
        width: '100%'
    },
    valueCon: {
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    twoPriceColumn: {
        justifyContent: 'center',
        alignItems: 'center'

    },
    dollarPriceCon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dollarPrice: {
        fontFamily: 'ABeeZee',
        color: '#1652f0',

    },
    cryptoPrice: {
        fontFamily: 'ABeeZee'

    },
    moneyCon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },
    money: {
        fontSize: 40,
        color: '#1652f0',
        fontFamily: 'Poppins'

    },
    maxButtonCon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    maxText: {
        fontSize: 16,
        fontFamily: 'Poppins',

    },
    invertButtonCon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    card: {
        height: 80,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 35
    },
    cryptoCon: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cryptoWorth: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: 15,
        justifyContent: 'center'
    },
    cryptoWorthCash: {
        fontSize: 17,
        fontFamily: 'ABeeZee'

    },
    cryptoWorthText: {
        fontSize: 17,
        fontFamily: 'ABeeZee'

    },
    image: {
        width: 30,
        height: 30

    },
    cryptoNameCon: {
        marginLeft: 10

    },
    cryptoName: {
        fontSize: 17,
        fontFamily: 'Poppins'
    },
    calculatorCon: {
        width: '100%',
        height: 250
    },
    numberContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    numberButton: {
        width: 30,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    number: {
        fontSize: 28,
        fontFamily: 'Poppins'
    },


    buttonCon: {
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: '95%',
        backgroundColor: '#1652f0',
        paddingVertical: 17,
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 15,
        fontFamily: "ABeeZee",
        color: '#fff',

    }
})

export default Withdraw;