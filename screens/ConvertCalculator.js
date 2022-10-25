import React, { useState, useEffect } from 'react'
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
import { useSelector, useDispatch } from "react-redux"
import Error from "../component/errorComponent";
import { useRoute } from "@react-navigation/native";
import CalculatorModal from "../modals/calculatorModal";
import { convertCrypto } from "../store/action/appStorage";
import Loader from '../loaders/Loader';

const ConvertCalculator = ({ navigation }) => {
    const route = useRoute();
    let [value, setValue] = useState("")
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [conversionRate, setConversionRate] = useState(10)
    const [modalVisible, setModalVisible] = useState(false);
    const [invert, setInvert] = useState(false);
    const [userAsset, setUserAsset] = useState(false);
    const [modalTopic, setModalTopic] = useState('');
    const [modalText, setModalText] = useState("")
    const [userStatus, setUserStatus] = useState("")
    const [cryptoQuantity, setCryptoQuantity] = useState(0)

    const dispatch = useDispatch()
    let { user } = useSelector(state => state.userAuth)

    let {
        fromImage,
        fromName,
        fromPrice,
        toImage,
        toName,
        toPrice,
        fromSymbol,
        toSymbol
    } = route.params
  

   

    useEffect(() => {
        let assets = user.personalAssets.filter(data => {
            if (data.id.toLowerCase() == fromName.toLowerCase()) {
                return data
            }
        })
        console.log(assets)
        if (assets.length > 0) {
            setUserAsset(assets[0])
            let cryptoQuantity = assets[0].quantity.toFixed(5)
            setCryptoQuantity(cryptoQuantity)
        }
        let rate = fromPrice / toPrice

        setConversionRate(rate)
        setIsLoading(false)
    }, []);




    //deciding where to go depending on the action
    let navigateToCard = () => {
        if (userStatus == 'pay') {
            setModalVisible(false)
            navigation.navigate('LinkToCard')
        }
        else if (userStatus == "id") {
            setModalVisible(false)
            navigation.navigate('VerifyId')
        }
        else if (userStatus == 'insufficient') {
            setModalVisible(false)
            //navigate user to topup
            
            navigation.navigate('BuyCryptoList')
            return

        }
        else if (userStatus == "error") {
            setModalVisible(false)
            navigation.navigate('ConvertCalculator')
            return
        }
        else if (userStatus == "converted") {
            setModalVisible(false)
            
            //i should be able to navigate to my asset
            return navigation.navigate("Assets")
        }
        else if (userStatus == "sell") {
            setModalVisible(false)
            //i should be able to navigate to my asset
            return navigation.navigate("Assets")
        }
    }




    //button function
    let button = (num) => {
        setValue(prev => {
            if (prev.length > 5) {
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
        setIsLoading(true)
        if (!value) {
            return
        }
        if(cryptoQuantity == 0){
            setIsLoading(false)
            setModalVisible(true)
            setUserStatus('insufficient')
            setModalTopic("You'll need to top up")
            setModalText(`Your do not have sufficient ${fromSymbol} from which covertion will be made.please buy ${fromSymbol}  to continue!!`)
            return

        }
        //if user has no payment method
        if (!user.isPayVerified) {
            setIsLoading(false)
            setModalVisible(true)
            setUserStatus('pay')
            setModalTopic("You'll need to top up")
            setModalText("You need to activate your account by adding a payment method to use available funds and top up funds later")
            return
        }
        //if user has no identity
        if (!user.isIdVerified) {
            setIsLoading(false)
            setModalVisible(true)
            setUserStatus('id')
            setModalTopic("verify your identity")
            setModalText("please you need to verify your identity before you can start trading on crypto assets")
            return

        }
        //if user doesnt have the available quantity he or she wants to convert from

        if (Number(value) > userAsset.quantity) {
            setIsLoading(false)
            setModalVisible(true)
            setUserStatus('insufficient')
            setModalTopic("You'll need to top up")
            setModalText(`Your available asset balance is not enough.topup and buy ${fromSymbol} !!`)
            return
        }
        //check if account is secure before proceeding

        

        //hence proceexd to buy
        let data = {
            fromName,
            toName,
            fromQuantity:Number(value),
            toQuantity:(conversionRate * value)

        }

        if(user.isRequiredPin){
            setIsLoading(false)
            return navigation.navigate('Authorize',
            {
               data:data,
               action:'convert' 
            })
        }

        let res = await dispatch(convertCrypto(data))

        if (!res.bool) {
            setIsLoading(false)
            setModalVisible(true)
            setUserStatus('error')
            setModalTopic("Try again later")
            setModalText("An error occured on the server")
            return

        }
        
        setIsLoading(false)
        setModalVisible(true)
        setUserStatus('converted')
        setModalTopic("sucessful")
        setModalText(`you have sucessfully converted ${Number(value)} of ${fromName} to ${(conversionRate * value)} of ${toName}`)

    }


    let changeVisibility = () => {
        setModalVisible(prev => !prev)
    }






    let fromQuantityUi = (data) => {
        if (!data) {
            return <Text style={{ ...styles.fromCoinText, fontSize: 18 }}>0 {fromSymbol} = </Text>
        }

        return <Text style={{ ...styles.fromCoinText, fontSize: 18 }}>{data} {fromSymbol} = </Text>
    }


    let toQuantityUi = (data, toName, truncate) => {
        return <Text style={{ ...styles.toCoinText, fontSize: 18 }}>{data} {toSymbol}</Text>



    }






    if (isLoading) {
        return <Loader/>
    }

    if (isError) {
        return <Error />
    }


    return (<>
        <CalculatorModal modalVisible={modalVisible} changeVisibility={changeVisibility} navigateToCard={navigateToCard} modalTopic={modalTopic} modalText={modalText} />

        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.scrollContainer} stickyHeaderIndices={[0]}>
                <View style={styles.headerOuterCon}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContainerIcon} >
                            <AntDesign name="close" size={23} />
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.headerContainerTitle} >
                            <Text style={styles.title}>Enter amount</Text>

                            <Text style={styles.balance}> {cryptoQuantity} of {fromSymbol} available </Text>


                        </TouchableOpacity>



                    </View>
                </View>


                <View style={styles.priceContainer}>
                    <View style={styles.fromCoinContainer}>
                        {fromQuantityUi(value)}

                    </View>
                    {<View style={styles.toCoinContainer}>
                        {toQuantityUi((conversionRate.toFixed(3) * value), toName)}

                    </View>}

                </View>






                <View >
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
                        <Text style={styles.buttonText}>Continue</Text>

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
    headerOuterCon:{ 
        display: 'flex', 
        width: '100%' 
    },
    headerContainer: {
        paddingTop: 40,
        display: "flex",
        flexDirection: "row",
        marginBottom: 45,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    headerContainerIcon: {
        flex: 1

    },
    headerContainerTitle: {
        flex: 5,
    },

    title: {
        fontSize: 16,
        fontFamily: 'Poppins',
        paddingLeft: 50
    },
    balance: {
        fontSize: 17,
        fontFamily: 'ABeeZee',
        paddingLeft: 8,
        color: 'rgb(100,100,100)'
    },

    /*end of modal section*/

    priceContainer: {
        paddingVertical: 50,
        marginBottom: 50,
        display: 'flex',
        flexDirection: 'row',

    },

    fromCoinContainer: {
        width: '50%',
        paddingLeft: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',



    },
    fromCoinText: {
        fontFamily: 'ABeeZee',
        fontSize: 25,

    },
    toCoinContainer: {
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '50%',

    },
    toCoinText: {
        fontFamily: 'ABeeZee',
        fontSize: 25,

    },

    dollarPrice: {
        fontFamily: 'ABeeZee',
        color: '#1652f0'

    },
    cryptoPrice: {
        fontFamily: 'ABeeZee'

    },




    numberContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    numberButton: {
        width: 40,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    number: {
        fontSize: 30,
        fontFamily: 'ABeeZee'
    },


    buttonCon: {
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '100%',
        backgroundColor: '#1652f0',
        paddingVertical: 17,
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: "ABeeZee",
        color: '#fff',

    }
})

export default ConvertCalculator;