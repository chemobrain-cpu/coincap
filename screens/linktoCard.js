import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Pressable, Dimensions } from 'react-native';

//importing modals
import { Feather} from '@expo/vector-icons'
import Loader from '../loaders/Loader';



const LinkToCard = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 4000)

    }, [])


    if (isLoading) {
        return <Loader />

    }




    return (<SafeAreaView style={styles.screen}>

    <Pressable onPress={() => navigation.goBack()} style={styles.assetsheaderCon}>
            <Feather name="arrow-left" size={25} color={"rgb(44, 44, 44)"} />
            <Text style={styles.assetsText}>Add a payment method</Text>

    </Pressable>

        <Pressable style={styles.info} onPress={() => navigation.navigate('CardForm')}>
            <View style={styles.infoLeft}>
                <Feather name="credit-card" size={24} color='#1652f0' />

            </View>
            <View style={styles.infoRight}>
                <Text style={styles.firstheaderText}> Credit/Debit Card</Text>
                <Text style={styles.secondheaderText}>Buy and cash out </Text>
                <Text style={styles.text}>Use any debit or credit card(Visa or Mastercard) to buy Crypto</Text>
            </View>

        </Pressable>



    </SafeAreaView>

    )




}

const styles = StyleSheet.create({
    screen: {
        paddingTop: 50,
        paddingHorizontal: 20,
        width: Dimensions.get('window').width
    },


    assetsheaderCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 20
    },
    assetsText: {
        fontSize: 18,
        fontFamily: 'Poppins',
        marginLeft: 12,
        textAlign: 'center',

    },
    info: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: '5%'

    },
    infoLeft: {
        width: '10%'

    },
    infoRight: {
        width: '80%'

    },
    firstheaderText: {
        fontSize: 18,
        fontFamily: 'Poppins',

    },
    secondheaderText: {
        color: 'rgb(100,100,100)',
        fontSize: 16,
        fontFamily: 'ABeeZee',
        marginBottom: 5

    },
    text: {
        color: 'rgb(100,100,100)',
        fontFamily: 'ABeeZee',
        fontSize: 18,

    }


});




export default LinkToCard 