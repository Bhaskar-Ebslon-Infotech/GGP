import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import VideoPlay from '../images/svg/videoPlay';
import Money from '../images/svg/money'
import Video from 'react-native-video';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressChart } from "react-native-chart-kit";
import Left from '../images/svg/vl1';
import Right from '../images/svg/vl2';
import { ANTDESIGN } from '../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { GetAllPlaylistVideoForKid } from '../api/UserPlaylistVideo';
import WebView from 'react-native-webview';
import { kidVideoCreate } from '../api/KidVideoCompletion';
import { getDecodedToken } from '../api/user';
import { toggleModalContext } from '../../App';

export default function VideoList() {
    const navigation = useNavigation();
    const focused = useIsFocused();
    const [videoArr, setVideoArr] = useState([]);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;



    const chartConfig = {
        backgroundGradientFrom: "#ffff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };






    const handleMarkAsDone = async (id) => {
        try {
            let decoded = await getDecodedToken()
            let obj = {
                userplaylistvideoId: id,
                kidId: decoded.userId
            }
            let { data: res } = await kidVideoCreate(obj)
            if (res.message) {
                setToggleModal(true)
                setMessage(res.message)
                GetAllVideosForKid()
                // setVideoArr(res.data)
            }
        }
        catch (error) {
            if (error?.response?.data?.message) {
                setToggleModal(true)
                setMessage(error.response.data.message)
            } else {
                setToggleModal(true)
                setMessage(error?.message)
            }
        }
    }

    const GetAllVideosForKid = async () => {
        try {
            let { data: res } = await GetAllPlaylistVideoForKid()
            if (res.data) {
                let tempArr = res.data.map((el) => {
                    if (el.videoUrl.includes('youtube') || el.videoUrl.includes('you')) {
                        if (el.videoUrl.includes("watch?v=")) {
                            let textArr = el.videoUrl.split('/')
                            let tempText = textArr[textArr.length - 1].split("watch?v=")
                            el.videoUrl = `https://www.youtube.com/embed/${tempText[tempText.length - 1]}`
                        }
                        else {
                            let textArr = el.videoUrl.split('/')
                            el.videoUrl = `https://www.youtube.com/embed/${textArr[textArr.length - 1]}`
                        }
                    }
                    return el
                })
                setVideoArr(tempArr)
                // setVideoArr(res.data)
            }
            console.log(JSON.stringify(res.data, null, 2))
        }
        catch (err) {
            if (error?.response?.data?.message) {
                setToggleModal(true)
                setMessage(error.response.data.message)
            } else {
                setToggleModal(true)
                setMessage(error?.message)
            }
        }
    }

    useEffect(() => {
        if (focused) {
            GetAllVideosForKid()
        }
    }, [focused])








    const data2 = {
        labels: ["Run"],
        data: [0.8]
    };

    const onBuffer = () => {

    }
    const videoError = () => {

    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ marginBottom: Spacing.MARGIN_10, borderColor: Colors.PRIMARY, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10 }}>
                <Text style={[styles.head]}>{item.videoHeading}</Text>
                <View style={[commonStyle.flexRow]}>
                    <TouchableOpacity style={{ backgroundColor: "red", zIndex: 150, position: "relative" }} onPress={() => navigation.navigate('WatchVideo', { data: item._id })}>
                        <View style={{
                            backgroundColor: "transparent", width: wp(40),
                            height: hp(15),
                            position: "absolute",
                            zIndex: 10
                        }} />
                        {
                            focused &&
                            <WebView
                                mediaPlaybackRequiresUserAction={true}
                                allowsInlineMediaPlayback={true}
                                allowsFullscreenVideo
                                androidLayerType="software"
                                androidHardwareAccelerationDisabled={true}
                                style={[styles.listVideo, { opacity: 0.99 }]}
                                source={{ uri: item.videoUrl }}
                            />
                        }
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', width: '45%', marginLeft: Spacing.PADDING_15 }}>
                        <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                            <View style={[commonStyle.flexRow, { width: '45%' }]}>
                                <Left height={hp(5)} width={wp(6)} />
                                <Text style={[styles.head, { fontSize: Typography.FONT_SIZE_13, marginBottom: Spacing.MARGIN_5, marginLeft: Spacing.MARGIN_5 }]}> {item?.bonus}</Text>
                            </View>
                            <View style={[commonStyle.flexRow, { width: '52%', marginLeft: Spacing.PADDING_20 }]}>
                                <Right height={hp(5)} width={wp(6)} />
                                <Text style={[styles.head, { fontSize: Typography.FONT_SIZE_13, marginBottom: Spacing.MARGIN_5, marginLeft: Spacing.MARGIN_5 }]}> {item?.reward}</Text>
                            </View>
                        </View>
                        <View style={[commonStyle.flexRow]}>
                            <View>
                                {/* <ProgressChart
                                    data={data2}
                                    width={wp(20)}
                                    height={hp(20)}
                                    strokeWidth={16}
                                    radius={80}
                                    chartConfig={chartConfig}
                                    hideLegend={false}
                                /> */}
                                <Image source={require('../images/chart.png')} resizeMode='contain' style={{ height: hp(6), width: wp(8) }} />
                            </View>


                            <Text style={[styles.inr, {}]}>{item.reward} INR</Text>
                        </View>
                        <View style={[commonStyle.flexRow]}>
                            <Pressable onPress={() => handleMarkAsDone(item._id)}>
                                <AntDesign name={ANTDESIGN.CHECK} size={Spacing.MARGIN_22} color={'#C9E165'} style={{ marginRight: Spacing.MARGIN_10, marginLeft: Spacing.PADDING_7 }} />
                            </Pressable>
                            {/* <Pressable onPress={() => alert("Close")}>
                                <AntDesign name={ANTDESIGN.CLOSE} size={Spacing.MARGIN_22} color={'red'} />
                            </Pressable> */}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            {/* <Header /> */}
            <View style={{ paddingHorizontal: Spacing.MARGIN_20 }}>

                <View>
                    <FlatList
                        data={videoArr}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <>
                                <Image source={require('../images/video.png')} resizeMode='stretch' style={[styles.topImg]} />
                                <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK }]}>Daily VideoMix</Text>
                                <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_20 }]}>
                                    <TouchableOpacity onPress={() => navigation.navigate('PlayList')} style={[styles.btnBorder, { marginRight: Spacing.MARGIN_25, borderColor: Colors.SECONDARY }]}>
                                        <View style={{ backgroundColor: '#C9E165', borderRadius: 10, }}>
                                            <VideoPlay height={hp(4)} width={wp(12)} style={{ alignSelf: 'center', marginVertical: Spacing.PADDING_3 }} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('TodayMissionEdit')} style={[styles.btnBorder, { borderColor: '#785BDF' }]}>
                                        <View style={{ backgroundColor: Colors.SECONDARY, borderRadius: 10, }}>
                                            <Money height={hp(4)} width={wp(12)} style={{ alignSelf: 'center', marginVertical: Spacing.PADDING_4 }} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </>
                        }
                        ListEmptyComponent={
                            <Text style={[commonStyle.title, { color: "grey", fontSize: 15, textAlign: "left", marginTop: 15 }]}>No Data Found</Text>
                        }
                        keyExtractor={item => item._id}
                    />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    topImg: {
        height: hp(30),
        width: '100%',
        marginTop: Spacing.MARGIN_50
    },
    btnBorder: {
        width: '46%',
        borderWidth: 2,
        borderRadius: 10,
        padding: Spacing.PADDING_3
    },
    head: {
        fontFamily: 'Cookies',
        fontSize: Typography.FONT_SIZE_22,
        color: Colors.LIGHT_BLACK,
        textAlign: 'left',
        // marginTop: Spacing.MARGIN_10,
        marginBottom: Spacing.MARGIN_10,
    },
    listVideo: {
        width: wp(40),
        height: hp(15),
        zIndex: -15
    },
    inr: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_17,
        color: Colors.PRIMARY,
        textAlign: 'left',
        marginLeft: Spacing.PADDING_10,
        marginBottom: Spacing.MARGIN_5
    }
})