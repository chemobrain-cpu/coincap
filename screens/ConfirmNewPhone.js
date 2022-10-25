import React, { useState,useCallback } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, ScrollView, Dimensions, ActivityIndicator,KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { confirm } from "../store/action/appStorage";
import AuthModal from '../modals/authModal'

const ConfirmNewPhone = ({ navigation }) => {
    let [confirmationCode, setConfirmationCode] = useState('')
    const [isAuthError, setIsAuthError] = useState(false)
    const [authInfo, setAuthInfo] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    let dispatch = useDispatch()


    let changeConfirmationCode = (e) => {
        setConfirmationCode(e)
    }

    let gobackHandler = () => {
        navigation.goBack()
    }

    let continueHandler = async () => {
        
        if(!confirmationCode || isLoading){
            return
        }
        setIsLoading(true)
        let res = await dispatch(confirm({confirmationCode}))
        if(!res.bool){
            
            setAuthInfo(res.message)
            setIsAuthError(true)
            return

        }
        setIsLoading(false)
        navigation.navigate('ProfileSetting')
        
    }


    const updateAuthError = () => {
        setIsAuthError(prev => !prev)
    }


    return (<>
        {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}

        <SafeAreaView style={styles.screen}>

            <View style={styles.navigationHeader}>
                <Ionicons name="arrow-back" size={22} fontWeight={100} color="rgb(44, 44, 44)" />
                <Text style={styles.headerText}>
                    Confirm phone
                </Text >



            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>

                <Text style={styles.text}>Enter the 7-digit code we just texted to your phone number, +234 09071991647.</Text>

                <View style={styles.formContainer}>

                    <KeyboardAvoidingView style={styles.CodeCon}>

                        <TextInput
                            style={styles.input}
                            onChangeText={changeConfirmationCode}
                            value={confirmationCode}
                            placeholder='7-digit code from SMS'
                            keyboardType='phone-pad'
                            maxLength={7}
                        />

                    </KeyboardAvoidingView>

                </View>


                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonContinue} onPress={continueHandler}>

                        {isLoading ? <ActivityIndicator color='#fff' size='large' /> : <Text style={styles.buttonContinueText}>
                            Confirm
                        </Text>}

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonResend} onPress={gobackHandler}>
                        <Text style={styles.buttonResendText}>
                            Resend
                        </Text>

                    </TouchableOpacity>
                </View>


            </ScrollView>
        </SafeAreaView>
    </>)
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingHorizontal: '5%',
    },

    navigationHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
        borderColor: '#fff',

    },
    progress: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 40,
        justifyContent: 'space-around'

    },
    progressbar: {
        paddingLeft: 8

    },
    close: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',


    },
    body: {
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'column'
    },
    headerText: {
        fontSize: 20,
        color: 'rgb(44, 44, 44)',
        fontFamily: 'Poppins',
        marginLeft: 30

    },
    text: {
        marginBottom: 25,
        fontSize: 18,
        color: 'rgb(100,100,100)',
        fontFamily: 'ABeeZee'

    },
    CodeCon: {
        width: '90%'

    },
    input: {
        borderWidth: .5,
        borderColor: 'rgb(200,200,200)',
        height: 55,
        borderRadius: 5,
        paddingLeft: 10,
    },
    selectorContainer: {
        borderWidth: 1,
        borderColor: 'rgb(100,100,100)',
        height: 55,
        borderRadius: 2,

    },
    select: {
        borderColor: 'rgb(100,100,100)',
        borderWidth: 1


    },

    formContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        alignItems: 'center',
        marginBottom: Dimensions.get('window').height / 3

    },
    buttonContainer: {
        paddingBottom: 20

    },
    buttonContinue: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: '#1652f0',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonResend: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 30,
        backgroundColor: 'rgb(240,240,240)',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonContinueText: {
        color: '#fff',
        fontFamily: 'Poppins',
        fontSize: 15,
    },
    buttonResendText: {
        color: '#fff',
        fontFamily: 'Poppins',
        fontSize: 15,
        color: 'rgb(44, 44, 44)'
    },

});



export default ConfirmNewPhone