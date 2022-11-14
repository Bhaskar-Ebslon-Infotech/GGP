import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import WebView from 'react-native-webview';
import { LoaderContext, toggleModalContext } from '../../../App';
import { getAllCompletedVideoByKidIdForReport } from '../../api/UserPlaylistVideo';
import Header from '../../Component/Header';
import { images } from '../../Constant/background';
import { kidContext } from '../../Context/CurrentKidContext';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
export default function VideoComplete() {
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [completedVideosArr, setCompletedVideosArr] = useState([]);
    const focused = useIsFocused()
    const data = [
        {
            id: '1',
            img: require('../../images/img1.png'),
            title: 'Title asa',
            duration: 'Duration',
            reward: '5',
            bonus: '0',
            inr: '55',
        },
        {
            id: '2',
            img: require('../../images/img2.png'),
            title: 'Title',
            duration: 'Duration',
            reward: '5',
            bonus: '0',
            inr: '55',
        }
    ]



    const getAllCompleted = async () => {
        setLoading(true)
        try {
            // console.log(currentKid._id)
            let { data: res } = await getAllCompletedVideoByKidIdForReport(currentKid._id)
            console.log(JSON.stringify(res.data, null, 2))
            if (res.data) {
                console.log(res.data, "asdad")
                let tempArr = res.data.map((el) => {
                    if (el?.videoUrl && el?.videoUrl.includes('youtube') || el?.videoUrl.includes('you')) {
                        if (el.videoUrl.includes("watch?v=")) {
                            let textArr = el?.videoUrl.split('/')
                            let tempText = textArr[textArr.length - 1].split("watch?v=")
                            el.videoUrl = `https://www.youtube.com/embed/${tempText[tempText.length - 1]}`
                        }
                        else {
                            let textArr = el?.videoUrl.split('/')
                            el.videoUrl = `https://www.youtube.com/embed/${textArr[textArr.length - 1]}`
                        }
                    }
                    return el
                })
                console.log(tempArr, "tempArr")
                setCompletedVideosArr([...tempArr])
                setLoading(false)
            }
        }
        catch (error) {
            if (error?.response?.data?.message) {
                // setToggleModal(true)
                // setMessage(error.response.data.message)
            } else {
                // setToggleModal(true)
                // setMessage(error?.message)
            }
            setLoading(false)
        }
    }
    const handleOnint = () => {
        getAllCompleted()
    }


    useEffect(() => {
        if (focused) {
            handleOnint()
        }
    }, [focused])
    const renderItem = ({ item, index }) => {
        return (
            <View style={[styles.imgView, index == data.length - 1 && { marginBottom: Spacing.MARGIN_20 }]}>
                <TouchableOpacity style={{ flex: 1, zIndex: 150, position: "relative" }}>
                    <View style={{
                        backgroundColor: "transparent", width: wp(40),
                        height: "100%",
                        position: "absolute",
                        zIndex: 10
                    }} />
                    {
                        focused && item?.videoUrl &&
                        <WebView
                            mediaPlaybackRequiresUserAction={true}
                            allowsInlineMediaPlayback={true}
                            allowsFullscreenVideo
                            androidLayerType="software"
                            androidHardwareAccelerationDisabled={true}
                            style={[{ width: wp(40), height: "100%", opacity: 0.99 }]}
                            source={{ uri: item?.videoUrl }}
                        />
                    }
                </TouchableOpacity>
                <View style={{ flexDirection: 'column', marginLeft: Spacing.MARGIN_15, flex: 1 }}>
                    <Text style={[styles.title, { color: Colors.PRIMARY, fontSize: Typography.FONT_SIZE_25 }]}>{item?.videoHeading}</Text>
                    <Text style={[styles.listContain]}>{item.contain}</Text>
                    <Text style={[styles.listContain, { fontSize: Typography.FONT_SIZE_12, color: '#747474' }]}>{item?.status}</Text>
                    <View style={[commonStyle.flexRow, { marginTop: Spacing.PADDING_7 }]}>
                        <Text style={[styles.listContain, { fontFamily: 'Montserrat-SemiBold' }]}>Reward</Text>
                        <Text style={[styles.listContain, { marginLeft: Spacing.MARGIN_5 }]}>{item?.reward} INR</Text></View>
                    <View style={[commonStyle.flexRow]}>
                        <Text style={[styles.listContain, { fontFamily: 'Montserrat-SemiBold' }]}>Bonus</Text>
                        <Text style={[styles.listContain, { marginLeft: Spacing.MARGIN_5 }]}>{item?.bonus} INR</Text>
                    </View>
                    <Text style={[styles.title, { color: Colors.PRIMARY, fontSize: Typography.FONT_SIZE_18 }]}>{item?.bonus + item?.reward} INR</Text>

                </View>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true} />
            <ImageBackground source={images.backGround} style={[commonStyle.fullSize]}>
                <View style={{ padding: Spacing.MARGIN_15, }}>
                    <FlatList
                        data={completedVideosArr}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: hp(10) }}
                        ListHeaderComponent={
                            <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK, fontSize: Typography.FONT_SIZE_27, marginBottom: Spacing.MARGIN_10 }]}>Completed</Text>
                        }
                        ListEmptyComponent={
                            <Text style={[commonStyle.title, { color: "black", fontSize: 14, marginBottom: Spacing.MARGIN_10 }]}>No data found</Text>
                        }
                        keyExtractor={item => item._id}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    listImg: {
        height: '100%',
        width: wp(40),
        borderRadius: 20,
    },
    imgView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.MARGIN_15,
        width: '99%',
        height: hp(32),
        backgroundColor: Colors.WHITE,
        shadowColor: "#000",
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    listBorder: {
        width: '100%',
        borderRadius: 20,
        backgroundColor: Colors.WHITE,
        marginTop: Spacing.MARGIN_15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    listTitle: {
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_22,
        fontWeight: '600'
    },
    contain: {
        fontFamily: 'Montserrat-Regular',
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_15,
        fontWeight: '600'
    }
})