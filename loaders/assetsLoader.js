import React from "react"
import ContentLoader, { Rect, Circle } from "react-content-loader/native"
import { View, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Entypo,Ionicons } from '@expo/vector-icons';


let AssetsLoader = () => {

    return <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
            <View >
                <View style={{ ...styles.headerContainer }}>
                    <TouchableOpacity >
                        <Entypo name="menu" size={24} color="black" />
                    </TouchableOpacity>




                    <TouchableOpacity onPress={() => alert('notification')}>
                        <Ionicons name="notifications" size={30} color="black" />
                    </TouchableOpacity>

                </View>

            </View>


            <View style={{ flex: 1, backgroundColor: '#fff', width: Dimensions.get('window').width, height: Dimensions.get('window').height, paddingHorizontal: 17, }}>

                <ContentLoader backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb" height={50} duration={1000}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100" height="100%" />



                </ContentLoader>
                <ContentLoader backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb" height={80} duration={1000}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100" height="100%" />
                </ContentLoader>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ContentLoader height={100} width={200} duration={1000} borderRadius={40}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>

                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ContentLoader height={100} width={200} duration={1000} borderRadius={40}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                </View>



                <ContentLoader height={30} width={300} duration={1000} borderRadius={40}>

                    <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />

                    


                </ContentLoader>
                <ContentLoader height={40} width={'100%'} duration={1000} borderRadius={40}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>


                    <ContentLoader height={60} width={'100%'} duration={1000} borderRadius={40}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>

                    <ContentLoader height={120} width={'100%'} duration={1000} borderRadius={40}>

                        <Rect x="0" y="20" rx="5" ry="5" width="100%" height="100%" />


                    </ContentLoader>











            </View>
        </ScrollView>
    </SafeAreaView>

}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: "row",

    },
    screen: {
        flex: 1,
        backgroundColor: "#fff",


    },
    scrollContainer: {
        paddingBottom: 10,



    },
    headerContainer: {
        paddingTop: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#fff',
        paddingHorizontal: 15

    },
    giftContainer: {
        display: "flex",
        flexDirection: 'row',
        backgroundColor: 'rgb(240,240,240)',
        borderRadius: 10,
        alignItems: "center",
        height: 40,
        paddingHorizontal: 30,
    },
    giftText: {
        fontSize: 16,
        fontFamily: 'Poppins',
        marginLeft: 10,
        color: '#1652f0',
        alignSelf: 'center'
    }
    ,
    notification: {
        width: 20,
        height: 20,
        position: 'relative',
        padding: 10,
        marginRight: 20
    },
    notificationTextContainer: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 35,
        left: 15,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 20

    },
    notificationText: {
        color: '#fff',
        fontFamily: 'Poppins',
    },
})


export default AssetsLoader;