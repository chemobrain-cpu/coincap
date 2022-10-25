import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import { FontAwesome, } from '@expo/vector-icons'
import { useDispatch, } from "react-redux"
import CryptoCard from '../component/currencyContainer'
import { loadCoins } from "../store/action/appStorage";
import Error from '../component/errorComponent'
import SplashLoader from '../loaders/splashLoader'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'


let Welcome = ({ navigation }) => {
    //getting crypto data from coinmarcap
    let dispatch = useDispatch()
    let [coins, setCoins] = useState([{}, {}])
    let [isLoading, setIsLoading] = useState(true)
    let [error, setError] = useState(false)
    const [tradable, setTradable] = useState(true)


    useEffect(() => {
        fetchData()
    }, [fetchData]);

    useEffect(() => {
        let focus = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        });
        return focus
    }, [navigation]);




    let navigationHandler = (coin) => {
        navigation.navigate('PriceChart', { price: coin.current_price, percentage: parseFloat(coin.price_change_percentage_24h).toFixed(3), name: coin.id, market_cap: coin.market_cap, total_volume: coin.total_volume, circulating_supply: coin.circulating_supply, market_cap_rank: coin.market_cap_rank })
    }


    let fetchData = async (pageNumber) => {
        // You can await here
        setError(false)
        setIsLoading(true)
        let response = await dispatch(loadCoins(pageNumber))
        //handling error
        if (!response.bool) {
            setIsLoading(false)
            setError(true)
            return
        }
        //removing duplicate
        //removing duplicate
        let arr = [...coins, ...response.message]
        let uniqueIds = []
        const unique = arr.filter(element => {
            const isDuplicate = uniqueIds.includes(element.id)
            if (!isDuplicate) {
                uniqueIds.push(element)
                return true
            }
            return false
        })
        let selectedCoin = unique.filter((data,index)=>{
            if(index < 30){
                return data
            }
        })
        setCoins(selectedCoin);
        setTimeout(() => {
            setIsLoading(false)

        }, 10000)



    }
    let onEndFetch = async (pageNumber) => {
        // You can await here
        return


    }



    const changeTradable = (data) => {
        setIsLoading(true)
        setTradable(data)
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }


    if (isLoading) {
        return <SplashLoader />
    }

    if (error) {
        return <Error tryAgain={fetchData} />
    }

    const renderUi = ({ item, index }) => {
        if (index == 0) {
            return <View style={styles.top}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Over 89 million people trust us to trade crypto</Text>
                    <Text style={styles.terms}>*Terms Apply</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/icons/starter.jpg')}
                        style={{ width: 250, height: 250, }} />




                </View>

            </View>

        }
        if (index == 1) {
            return <View style={styles.headerContainer}>
                <View style={styles.assetsheaderCon}>
                    <TouchableOpacity style={{
                        padding: tradable ? 0 : 10,
                        borderRadius: tradable ? 0 : 8,
                        backgroundColor: tradable ? "" : 'rgb(240,240,240)'
                    }} onPress={() => changeTradable(false)} >
                        <Text style={{ ...styles.tradableText }}>Tradable </Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        padding: tradable ? 10 : 0,
                        borderRadius: tradable ? 8 : 0,
                        backgroundColor: tradable ? 'rgb(240,240,240)' : ''
                    }} onPress={() => changeTradable(true)}>
                        <Text style={{ ...styles.assetText, color: 'black' }}>
                            All Assets
                        </Text>


                    </TouchableOpacity>

                    <TouchableOpacity style={styles.searchIconContainer} onPress={() => {
                        navigation.navigate('SearchSplash')
                    }}>
                        <FontAwesome name="search" size={18} color="rgb(44, 44, 44)" />
                    </TouchableOpacity>
                </View>
            </View>
        }

        return <CryptoCard coin={item}
            navigationHandler={() => navigationHandler(item)}
        />

    }





    return <SafeAreaView style={styles.screen}>
        <OptimizedFlatList
            stickyHeaderIndices={[1]}
            data={coins}
            initialNumToRender={50}
            keyExtractor={(item, index) => Math.random().toFixed(10)}
            renderItem={renderUi}
            onEndReached={() => onEndFetch(coins.length / 50 + 1)}


        />

        <View style={styles.bottomsection} >
            <TouchableOpacity style={styles.bottombuttonsignup} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.bottombuttonsignupText}>Sign up</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.bottombuttonsignin} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.bottombuttonsigninText}>Sign in</Text>

            </TouchableOpacity>


        </View>
    </SafeAreaView>

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "rgb(249,249,249)"

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

    },





    header: {
        paddingVertical: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',


    },
    headerText: {
        fontFamily: 'ABeeZee',
        fontSize: 25,
        fontWeight: '600',
        width: '80%',
        textAlign: 'center'
    },
    terms: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Poppins',
        color: '#1652f0'
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    middlesection: {
        backgroundColor: '#fff',
        paddingBottom: 200
    },
    headerContainer: {
        paddingTop: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 10,
        paddingVertical: 20,
        paddingTop: 30,
        paddingHorizontal: 15

    },
    searchIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'rgb(240,240,240)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',


    },
    assetsheaderCon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',

    },
    tradableContainer: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'rgb(240,240,240)'

    },
    assetText: {
        fontSize: 16,
        fontFamily: 'Poppins',
    },
    tradableText: {
        fontSize: 16,
        fontFamily: 'Poppins',
    },
    /*
    styling crypto info

    */
    cryptoInfoCon: {
        paddingTop: 25,
        flexDirection: "row",
        alignItems: "center",
    }







    ,
    /* styling bottom section */
    bottomsection: {
        position: 'absolute',
        top: '85%',
        width: '100%',
        height: '15%',
        borderTopWidth: 1,
        borderTopColor: 'rgb(240,240,240)',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'

    },
    bottombuttonsignin: {
        paddingVertical: 17,
        borderRadius: 25,
        backgroundColor: 'rgb(240,240,240)',
        width: '42%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'ABeeZee',
        fontSize: 20

    },
    bottombuttonsignup: {
        paddingVertical: 17,
        borderRadius: 25,
        backgroundColor: '#1652f0',
        width: '42%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'ABeeZee',
        fontSize: 20

    },
    bottombuttonsignupText: {
        fontFamily: 'ABeeZee',
        fontSize: 20,
        color: '#fff'

    },
    bottombuttonsigninText: {
        fontFamily: 'ABeeZee',
        fontSize: 20

    },


})



export default Welcome