import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native'

import { Feather, MaterialIcons } from '@expo/vector-icons';
import { validateText, validatePhoneNumber } from "../utils/util";
import AuthModal from '../modals/authModal'
import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod } from "../store/action/appStorage";
import Loader from '../loaders/Loader';


const Card = ({ navigation }) => {
    let { user } = useSelector(state => state.userAuth)
    const dispatch = useDispatch()
    const [header, setHeader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [cardName, setCardName] = useState('')
    const [cardNameError, setCardNameError] = useState('')

    const [cardNumber, setCardNumber] = useState('')
    const [cardNumberError, setCardNumberError] = useState('')

    const [cardExpiration, setCardExpiration] = useState('')
    const [cardExpirationError, setCardExpirationError] = useState('')

    const [cardCvc, setCardCvc] = useState('')
    const [cardCvcError, setCardCvcError] = useState('')

    const [postalCode, setPostalCode] = useState('')
    const [postalCodeError, setPostalCodeError] = useState('')


    const [bankName, setBankName] = useState('')
    const [bankNameError, setBankNameError] = useState('')

    const [bankAccount, setBankAccount] = useState('')
    const [bankAccountError, setBankAccountError] = useState('')


    const [bankAddress, setBankAddress] = useState('')
    const [bankAddressError, setBankAddressError] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [isScreenLoading, setIsScreenLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsScreenLoading(false)
        }, 5000)

    }, [])


    const updateAuthError = () => {
        setIsAuthError(prev => !prev)
    }

    let addCardHandler = async () => {


        setIsLoading(true)

        let res = await dispatch(addPaymentMethod({
            bankAddress,
            bankAccount,
            bankName,
            postalCode,
            cardCvc,
            cardExpiration,
            cardNumber,
            cardName,
            user
        }))
        if (!res.bool) {
            setIsAuthError(true)
            setAuthInfo(res.message)
            setIsLoading(false)
            return
        }
        setIsAuthError(true)
        setAuthInfo('Payment method was sucessfully added')
        setIsLoading(false)
        //go to verification page passing the email as a parameter
        setTimeout(() => {
            setIsAuthError(false)
            setAuthInfo('')
            setIsLoading(false)
            navigation.navigate('BuyCryptoList')
        }, 3000)


    }

    const scrollHandler = (e) => {
        if (e.nativeEvent.contentOffset.y > 5) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }

    let changeCardName = (e) => {
        setCardName(e)
        let error = validateText(e)
        if (error) {
            return setCardNameError(error)
        }
        return setCardNameError('')


    }

    let changeCardNumber = (e) => {
        setCardNumber(e)
        let error = validatePhoneNumber(e)
        if (error) {
            return setCardNumberError(error)
        }
        return setCardNumberError('')


    }
    let changeCardExpiration = (e) => {
        setCardExpiration(e)
        let error = validatePhoneNumber(e)
        if (error) {
            return setCardExpirationError(error)
        }
        return setCardExpirationError('')

    }

    let changeCardCvc = (e) => {
        setCardCvc(e)
        let error = validatePhoneNumber(e)
        if (error) {
            return setCardCvcError(error)
        }
        return setCardCvcError('')

    }
    let changePostalcode = (e) => {
        setPostalCode(e)
        let error = validatePhoneNumber(e)
        if (error) {
            return setPostalCodeError(error)
        }
        return setPostalCodeError('')

    }

    let changeBankName = (e) => {
        setBankName(e)
        let error = validateText(e)
        if (error) {
            return setBankNameError(error)
        }
        return setBankNameError('')

    }

    let changeAccountNumber = (e) => {
        setBankAccount(e)
        let error = validatePhoneNumber(e)
        if (error) {
            return setBankAccountError(error)
        }
        return setBankAccountError('')

    }



    let changeAddressOne = (e) => {
        setBankAddress(e)
        let error = validateText(e)
        if (error) {
            return setBankAddressError(error)
        }
        return setBankAddressError('')

    }

    if (isScreenLoading) {
        return <Loader />
    }

    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SafeAreaView style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewContainer} onScroll={scrollHandler} stickyHeaderIndices={[0]}>
                <View style={{ ...styles.navigationHeader }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ ...styles.goback }} >
                        <Feather name="arrow-left" size={24} color="rgb(44, 44, 44)" />
                    </TouchableOpacity>
                </View>


                <View style={styles.title}>
                    <Text style={styles.titleText}>Card Information</Text>


                </View>

                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={styles.label}>Name on Card</Text>

                    <TextInput
                        style={styles.input} placeholder='Harry John'
                        onChangeText={changeCardName}
                    />
                    <Text style={styles.errorText}>{cardNameError ? cardNameError : ""}</Text>

                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={styles.label}> Card number</Text>
                    <View style={styles.NumberinputContainer}>
                        <TextInput style={styles.numberinput} placeholder='XXXX XXXX XXXX XXXX'
                        keyboardType='numeric'
                            onChangeText={changeCardNumber} />


                    </View>
                    <Text style={styles.errorText}>{cardNumberError ? cardNumberError : ""}</Text>


                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={{ ...styles.formCon, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View style={styles.innerInputContainer}>
                        <Text style={styles.label}> Expiration</Text>
                        <TextInput style={styles.input} placeholder="MM/YY"
                            onChangeText={changeCardExpiration}
                             keyboardType='numeric' />
                        <Text style={styles.errorText}>{cardExpirationError ? cardExpirationError : ""}</Text>

                    </View>
                    <View style={styles.innerInputContainer}>
                        <Text style={styles.label}> CVC</Text>
                        <TextInput style={styles.input} placeholder="123"
                            onChangeText={changeCardCvc}
                             keyboardType='numeric' />
                        <Text style={styles.errorText}>{cardCvcError ? cardCvcError : ""}</Text>

                    </View>


                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={styles.label}>Postal code</Text>
                    <TextInput style={styles.input}
                        onChangeText={changePostalcode} 
                         keyboardType='numeric'/>
                    <Text style={styles.errorText}>{postalCodeError ? postalCodeError : ""}</Text>

                </KeyboardAvoidingView>

                <View style={styles.title}>
                    <Text style={styles.titleText}>Account Information</Text>


                </View>


                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={styles.label}>Name of bank</Text>
                    <TextInput style={styles.input}
                        onChangeText={changeBankName} />

                    <Text style={styles.errorText}>{bankNameError ? bankNameError : ""}</Text>

                </KeyboardAvoidingView>


                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={styles.label}>Account Number</Text>
                    <TextInput style={styles.input}
                     keyboardType='numeric'
                        onChangeText={changeAccountNumber} />

                    <Text style={styles.errorText}>{bankAccountError ? bankAccountError : ""}</Text>

                </KeyboardAvoidingView>

                <KeyboardAvoidingView style={styles.formCon}>
                    <Text style={styles.label}>Address 1</Text>
                    <TextInput style={styles.input}
                        onChangeText={changeAddressOne} />

                    <Text style={styles.errorText}>{bankAddressError ? bankAddressError : ""}</Text>

                </KeyboardAvoidingView>

                <View style={styles.footer}>
                    <View style={styles.footerTopSection}>
                        <Text style={styles.statement}>By adding a new card,you agree to the <Text style={styles.statementCard}>credit/debit card terms.</Text></Text>

                        <TouchableOpacity style={styles.buttonCon} onPress={addCardHandler}>
                            {isLoading ? <ActivityIndicator color='#fff' size='small' /> : <Text style={styles.button}>Add Card</Text>}
                        </TouchableOpacity>
                    </View>



                    <View style={styles.footerBottomSection}>
                        <View>

                        </View>
                        <View style={styles.footerTextCon}>
                            <MaterialIcons name="lock" size={24} color="black" />
                            <Text style={styles.footerText}>
                                Processed by <Text style={styles.coinbaseText}>coincap</Text>
                            </Text>

                        </View>


                    </View>


                </View>





            </ScrollView>


        </SafeAreaView>
    </>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        width: Dimensions.get('window').width,
        paddingTop: 55,
    },
    scrollviewContainer: {

    },
    navigationHeader: {
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 21,



    },
    headerName: {
        fontFamily: 'ABeeZee',
        fontSize: 20,
        marginLeft: '20%',
        fontFamily: 'Poppins'

    },
    goback: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    title: {
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 21,

    },
    titleText: {
        fontSize: 21,
        fontFamily: 'Poppins',


    },
    formCon: {
        marginBottom: 38,
        paddingHorizontal: 21,


    },
    label: {
        marginBottom: 10,
        fontWeight: '100',
        color: 'rgb(100,100,100)',
        fontFamily: 'ABeeZee',
        fontSize: 15,

    },
    input: {
        width: '100%',
        borderWidth: .5,
        borderColor: 'rgb(200,200,200)',
        height: 52,
        borderRadius: 5,
        paddingLeft: 30,
        fontSize: 18,

    },
    errorText: {
        color: 'red',
        marginVertical: 1,

    },
    NumberinputContainer: {
        width: '100%',
        borderColor: 'rgb(200,200,200)',
        borderWidth: .5,
        height: 55,
        borderRadius: 5,
        paddingLeft: 30,
        fontSize: 18,
        color: 'black',
        display: 'flex',
        flexDirection: 'column'


    },
    numberinput: {
        alignSelf: 'stretch',
        width: '70%',
        fontSize: 15,

    },
    innerInputContainer: {
        width: '45%'
    },
    footer: {
        height: 220
    },
    footerTopSection: {
        paddingHorizontal: 21,

    },
    statement: {
        fontSize: 15,
        fontFamily: 'ABeeZee',
        marginBottom: 30

    },
    statementCard: {
        fontSize: 15,
        fontFamily: 'ABeeZee',
        color: '#1652f0'

    },
    buttonCon: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    button: {
        fontSize: 15,
        fontFamily: 'Poppins',
        color: '#fff'
    },
    footerBottomSection: {
        height: 85,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: 'rgb(100,100,100)',
        borderTopWidth: .5,
        backgroundColor: 'rgb(240,240,240)'
    },
    footerTextCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerText: {
        marginLeft: 5
    },
    coinbaseText: {
        color: '#1652f0'
    }




})

export default Card