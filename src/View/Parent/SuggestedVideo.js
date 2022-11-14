import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WebView from 'react-native-webview';
import { kidContext } from '../../Context/CurrentKidContext';
import { getAllPlaylistVideosByKidAndPlaylistId } from '../../api/AdminPlaylistVideo';
import Header from '../../Component/Header';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import { LoaderContext, toggleModalContext } from '../../../App';
import Add from '../../images/svg/parentsvg/add';
import Minus from '../../images/svg/parentsvg/minus';
import DatePicker from 'react-native-date-picker';
import { getDecodedToken } from '../../api/user';
export default function SuggestedVideo(props) {
    const navigation = useNavigation();
    const [videoModal, setVideoModal] = useState(false);
    const [stopAfter, setStopAfter] = useState(1);
    const [stopOn, setStopOn] = useState(new Date());
    const [moveVideoModal, setMoveVideoModal] = useState(false);
    const [timeAdDateModal, setTimeAdDateModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState({});
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [stopOnActive, setStopOnActive] = useState(true);

    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [rewardcount, setRewardCount] = useState("1");
    const [bonuscount, setBonusCount] = useState("0");
    const [videosArr, setVideosArr] = useState([]);
    const focused = useIsFocused()
    const getPlaylistVideos = async () => {
        setLoading(true)
        try {
            let { data: res } = await getAllPlaylistVideosByKidAndPlaylistId(currentKid._id, props.route.params.data)
            if (res.data) {
                let tempArr = res.data.map((el) => {
                    if (el.videoUrl.includes('youtube') || el.videoUrl.includes('you')) {
                        let textArr = el.videoUrl.split('/')
                        if (textArr[textArr.length - 1].includes("watch?v")) {
                            let tempTextArr = textArr[textArr.length - 1].split("=")
                            console.log(tempTextArr)
                            el.videoUrl = `https://www.youtube.com/embed/${tempTextArr[tempTextArr.length - 1]}`
                        }
                        else {
                            console.log("el", [textArr[textArr.length - 1]])
                            el.videoUrl = `https://www.youtube.com/embed/${textArr[textArr.length - 1]}`
                        }
                    }
                    return el
                })


                setVideosArr(tempArr)
                console.log(JSON.stringify(tempArr, null, 2), "tempArr")
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
        setLoading(false)
    }


    const redirectToNextPage = () => {

    }



    const onBuffer = () => {

    }
    const videoError = () => {

    }
    const renderItem = ({ item }) => {
        return (
            <Pressable onPress={() => { setVideoModal(true); setSelectedVideo(item) }} style={{ paddingHorizontal: Spacing.MARGIN_20, position: "relative" }}>
                <View style={{ position: "absolute", top: -10, left: 0, height: hp(27), backgroundColor: "red", zIndex: 12 }}></View>
                <View pointerEvents='none' style={[styles.listView, { zIndex: -10 }]}>
                    <WebView
                        style={styles.video}
                        mediaPlaybackRequiresUserAction={true}
                        allowsInlineMediaPlayback={true}
                        javaScriptEnabled={true}
                        allowsFullscreenVideo={true}
                        domStorageEnabled={true}
                        injectedJavaScript={`
                                 document.getElementsByTagName("video")[0].removeAttribute("autoplay"); // this one was the key for me!
                        `}
                        scrollEnabled={false}
                        source={{ uri: item.videoUrl }}
                    />
                    <View style={{ paddingHorizontal: Spacing.MARGIN_20, paddingVertical: Spacing.PADDING_7 }}>
                        <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.listTitle]}>{item.videoHeading}</Text>
                                {/* <Text style={[styles.listContain]}>{item.duration}</Text> */}
                            </View>


                        </View>
                    </View>
                </View>
            </Pressable>
        )
    }



    const handleVideoMixAddToUserFromAdminVideoMix = async () => {
        let decoded = await getDecodedToken()
        let rewardCount = () => {
            if(rewardcount == ''){
                return 1;
            }else{
                return Number(rewardcount)
            }
    } 
        let obj = {
            kidId: currentKid._id,
            userId: decoded.userId,
            playlistId: props.route.params.data,
            videoId: selectedVideo._id,
            reward: parseInt(rewardCount()),
            bonus: parseInt(Number(bonuscount)),
            timeAndDateObj: {
                daysArr: data
            }
        }

        if (stopOnActive) {
            obj.timeAndDateObj.stopOn = stopOn
        }
        else {
            obj.timeAndDateObj.stopAfter = stopAfter
        }

        // if (!disableChecked) {
        // if (stopOnActive && new Date(obj.timeAndDateObj.stopOn) == new Date()) {
        //     setToggleModal(true)
        //     setMessage("Please add stop on before adding a Video")
        // }
        // else

        if (!stopOnActive && obj.timeAndDateObj.stopAfter == 0) {
            setToggleModal(true)
            setMessage("Please add stop after before adding a Video")
        }
        else {
            console.log(JSON.stringify(obj, null, 2))
            navigation.navigate('MissionVideoStack', { screen: 'VideoMixList', params: { data: obj } })
        }
    }


    useEffect(() => {
        if (focused) {
            getPlaylistVideos()
        }
    }, [focused])

    const handleDaySeletion = (index) => {
        let tempData = data.map((el, i) => {
            if (i == index) {
                el.selected = !el.selected
            }
            return el
        })
        setData(tempData)
    }

    const [data, setData] = useState([
        {
            id: '1',
            day: 'SU',
            selected: false
        },
        {
            id: '2',
            day: 'MO',
            selected: false
        },
        {
            id: '3',
            day: 'TU',
            selected: false
        },
        {
            id: '4',
            day: 'WE',
            selected: false
        },
        {
            id: '5',
            day: 'TH',
            selected: false
        },
        {
            id: '6',
            day: 'FR',
            selected: false
        },
        {
            id: '7',
            day: 'SA',
            selected: false
        },
    ]);



    const handleCheckInput = () => {
        if (data.every(el => el.selected == false)) {
            setToggleModal(true)
            setMessage("Please select alteast one day")
        }
        else if (rewardcount == '0') {
            setToggleModal(true)
            setMessage("Please set reward")
        }
        // else if (bonuscount == '0') {
        //     setToggleModal(true)
        //     setMessage("Please set bonus")
        // }
        else {
            setMoveVideoModal(true)
        }
    }


    const rewardAdd = () => {
        let tempCount = parseInt(Number(rewardcount)) + 1
        setRewardCount(`${tempCount}`)
    }
    const rewardMinus = () => {
        if (rewardcount > 1) {
            let tempCount = parseInt(Number(rewardcount)) - 1
            setRewardCount(`${tempCount}`)
        }
    }


    const bonusAdd = () => {
        let tempCount = parseInt(Number(bonuscount)) + 1
        setBonusCount(`${tempCount}`)
    }
    const bonusMinus = () => {
        if (bonuscount > 0) {
            let tempCount = parseInt(Number(bonuscount)) - 1
            setBonusCount(`${tempCount}`)
        }
    }
    const daysRenderItem = ({ item, index }) => {
        return (
            <View style={{ marginTop: Spacing.PADDING_5 }}>
                <TouchableOpacity onPress={() => handleDaySeletion(index)} style={{ backgroundColor: item.selected ? Colors.PRIMARY : Colors.WHITE, marginHorizontal: Spacing.PADDING_5, height: hp(3), width: wp(6), justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                    <Text style={{ color: item.selected ? Colors.WHITE : Colors.LIGHT_BLACK }}>{item.day}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true} />

            <FlatList
                data={videosArr}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: Spacing.MARGIN_20 }}
                ListHeaderComponent={
                    <>
                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.MARGIN_15, marginBottom: Spacing.MARGIN_10 }]}>
                            <Text style={[styles.title1]}>{props?.route?.params?.name}</Text>
                        </View>
                        {/* <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_28, color: Colors.LIGHT_BLACK, }]}>Educational</Text> */}

                    </>
                }
                keyExtractor={item => item._id}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={videoModal}
            >
                <View style={[styles.modalBg,]}>
                    <TouchableOpacity onPress={() => setVideoModal(false)} style={{ alignSelf: 'flex-end', margin: Spacing.MARGIN_10 }}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>
                    <View style={{ height: hp(30) }}>
                        <WebView
                            style={styles.video}
                            allowsFullscreenVideo
                            allowsInlineMediaPlayback
                            scrollEnabled={false}
                            mediaPlaybackRequiresUserAction
                            source={{ uri: selectedVideo.videoUrl }}
                        />
                    </View>
                    <View style={[commonStyle.flexRow, { justifyContent: 'space-between', paddingHorizontal: Spacing.MARGIN_10, marginTop: Spacing.PADDING_7 }]}>
                        <View style={{ flexDirection: 'column', maxWidth: "60%", minWidth: "60%", }}>
                            <Text style={[styles.modalText]}>{selectedVideo.videoHeading}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            setVideoModal(false),
                                setTimeAdDateModal(true)
                            //  setMoveVideoModal(true)
                        }}>
                            <Text style={[styles.modalText, styles.modalRightBtn]}>Move to a VideoMix</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={moveVideoModal}
            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <Text style={[commonStyle.modalText, { marginVertical: Spacing.MARGIN_50 }]}>Do you want to move this video to your desired videomix?</Text>

                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginBottom: Spacing.MARGIN_30 }]}>
                            <TouchableOpacity style={{ width: '40%' }} onPress={() => { handleVideoMixAddToUserFromAdminVideoMix(); setMoveVideoModal(false) }}>
                                {/* <TouchableOpacity style={{ width: '40%' }} onPress={() => {navigation.navigate('KidsVideoList');setMoveVideoModal(false)}}> */}
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Yes</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }} onPress={() => setMoveVideoModal(false)}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, {}]}>No</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => setMoveVideoModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>




                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={timeAdDateModal}

            >
                <View style={[commonStyle.modalBackground]}>
                    <View
                        style={[
                            commonStyle.whiteBg,
                            { backgroundColor: Colors.OFF_YELLOW, height: hp(80) },
                        ]}>
                        <LinearGradient
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 2 }}
                            colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]}
                            style={[commonStyle.linearModal]}>
                            <Image
                                source={require('../../images/modalTeady.png')}
                                resizeMode="contain"
                                style={[commonStyle.modalTeady]}
                            />
                        </LinearGradient>
                        <ScrollView >


                            <View
                                style={{
                                    paddingLeft: Spacing.MARGIN_50,
                                    paddingRight: Spacing.MARGIN_20,
                                }}>
                                <Text style={[styles.title, { marginTop: Spacing.MARGIN_30 }]}>
                                    Repeat On
                                </Text>
                                <FlatList
                                    data={data}
                                    renderItem={daysRenderItem}
                                    contentContainerStyle={{ justifyContent: "space-between", display: "flex", flexDirection: "row", flex: 1, paddingRight: 20 }}
                                    horizontal={true}
                                    keyExtractor={(item, index) => index}
                                />
                                <Text
                                    style={[styles.title, { marginVertical: Spacing.MARGIN_10 }]}>
                                    Ends
                                </Text>




                                <View style={[styles.flexRow, { justifyContent: "space-between", paddingRight: 15, marginBottom: 15 }]}>

                                    <TouchableOpacity
                                        onPress={() => setStopOnActive(true)}
                                        style={{ width: '45%' }}>
                                        <LinearGradient
                                            start={{ x: 1, y: 0 }}
                                            end={{ x: 0, y: 2 }}
                                            colors={[
                                                Colors.GRADIENT1,
                                                Colors.GRADIENT2,
                                                Colors.GRADIENT1,
                                            ]}
                                            style={[commonStyle.linearBtn]}>
                                            <View
                                                style={[
                                                    styles.btnView,
                                                    { backgroundColor: stopOnActive ? Colors.WHITE : "transparent", width: '99%', borderRadius: 27 },
                                                ]}>
                                                <Text
                                                    style={[commonStyle.btnText, { color: stopOnActive ? "black" : Colors.WHITE }]}>
                                                    On
                                                </Text>
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setStopOnActive(false)}
                                        style={{ width: '45%' }}>
                                        <LinearGradient
                                            start={{ x: 1, y: 0 }}
                                            end={{ x: 0, y: 2 }}
                                            colors={[
                                                Colors.GRADIENT1,
                                                Colors.GRADIENT2,
                                                Colors.GRADIENT1,
                                            ]}
                                            style={[commonStyle.linearBtn,
                                            ]}>
                                            <View
                                                style={[
                                                    styles.btnView,
                                                    { backgroundColor: !stopOnActive ? Colors.WHITE : "transparent", width: '99%', borderRadius: 27 },
                                                ]}>
                                                <Text
                                                    style={[commonStyle.btnText, { color: !stopOnActive ? "black" : Colors.WHITE }]}>
                                                    After
                                                </Text>
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>


                                </View>
                                {
                                    stopOnActive ?
                                        <LinearGradient
                                            start={{ x: 1, y: 0 }}
                                            end={{ x: 0, y: 2 }}
                                            colors={[
                                                Colors.GRADIENT1,
                                                Colors.GRADIENT2,
                                                Colors.GRADIENT1,
                                            ]}
                                            style={[
                                                styles.linearSelect,
                                                {
                                                    marginRight: 15
                                                },
                                            ]}>
                                            <View
                                                style={[
                                                    styles.selectWhiteBtn,
                                                    {
                                                        width: "90%",
                                                        paddingHorizontal: 0,
                                                        paddingVertical: 10
                                                    }
                                                ]}>

                                                <DatePicker
                                                    mode="date"
                                                    open={true}
                                                    minimumDate={new Date()}
                                                    style={{ flex: 1, fontSize: 15, backgroundColor: "white", borderRadius: 10, marginLeft: 15, }}
                                                    date={stopOn}
                                                    onDateChange={(date) => {
                                                        setStopOn(date)
                                                    }}
                                                />
                                            </View>
                                        </LinearGradient>
                                        :

                                        <LinearGradient
                                            start={{ x: 1, y: 0 }}
                                            end={{ x: 0, y: 2 }}
                                            colors={[
                                                Colors.GRADIENT1,
                                                Colors.GRADIENT2,
                                                Colors.GRADIENT1,
                                            ]}
                                            style={[
                                                styles.linearSelect,
                                                { width: '93%', marginRight: 2 },
                                            ]}>
                                            <TextInput
                                                style={[
                                                    styles.selectWhiteBtn,
                                                    { justifyContent: 'space-between', width: wp(78) },
                                                ]} value={`${stopAfter}`} maxLength={3} keyboardType='number-pad' onChangeText={(val) => setStopAfter(val[0] == 0 ? 1 : val)} />

                                        </LinearGradient>
                                }




                                <View style={[styles.flexRow, { alignItems: "center", flexDirection: "row", justifyContent: "space-between", paddingRight: 15 }]}>
                                    <View>
                                        <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_20 }]}>
                                            <Text style={[styles.title,]}>Reward</Text>
                                        </View>
                                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearAdd]} >
                                            <TouchableOpacity onPress={() => rewardAdd()} style={[styles.whiteBtn, { borderTopLeftRadius: 7, borderBottomLeftRadius: 7 }]}>
                                                <Add height={hp(4)} width={wp(5)} />
                                            </TouchableOpacity>
                                            <View style={[styles.whiteBtn, { marginHorizontal: Spacing.PADDING_2, width: wp(12) }]}>
                                                {/* <Text style={{ fontSize: Typography.FONT_SIZE_17, fontFamily: 'Montserrat-SemiBold', color: '#747474' }}>{rewardcount}</Text> */}
                                                <TextInput
                                                    value={`${rewardcount}`}
                                                    onChangeText={e => setRewardCount(e == `0` ? `1` : e)}
                                                    maxLength={4}
                                                    keyboardType="number-pad"
                                                    style={{
                                                        fontSize: Typography.FONT_SIZE_17,
                                                        fontFamily: 'Montserrat-SemiBold',
                                                        color: '#747474',
                                                    }}
                                                />
                                            </View>
                                            <TouchableOpacity onPress={() => rewardMinus()} style={[styles.whiteBtn, { borderBottomRightRadius: 7, borderTopRightRadius: 7 }]}>
                                                <Minus height={hp(4)} width={wp(5)} />
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                    <View>
                                        <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_20 }]}>
                                            <Text style={[styles.title,]}>Bonus</Text>
                                        </View>
                                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearAdd]} >
                                            <TouchableOpacity onPress={() => bonusAdd()} style={[styles.whiteBtn, { borderTopLeftRadius: 7, borderBottomLeftRadius: 7 }]}>
                                                <Add height={hp(4)} width={wp(5)} />
                                            </TouchableOpacity>
                                            <View style={[styles.whiteBtn, { marginHorizontal: Spacing.PADDING_2, width: wp(12) }]}>
                                                <TextInput
                                                    value={bonuscount}
                                                    onChangeText={e => setBonusCount(e)}
                                                    maxLength={4}
                                                    keyboardType="number-pad"
                                                    style={{
                                                        fontSize: Typography.FONT_SIZE_17,
                                                        fontFamily: 'Montserrat-SemiBold',
                                                        color: '#747474',
                                                    }}
                                                />
                                            </View>
                                            <TouchableOpacity onPress={() => bonusMinus()} style={[styles.whiteBtn, { borderBottomRightRadius: 7, borderTopRightRadius: 7 }]}>
                                                <Minus height={hp(4)} width={wp(5)} />
                                            </TouchableOpacity>
                                        </LinearGradient>

                                    </View>
                                </View>

                            </View>
                            <View
                                style={[
                                    commonStyle.flexRow,
                                    { alignSelf: 'center', marginVertical: Spacing.MARGIN_25 },
                                ]}>
                                <TouchableOpacity
                                    onPress={() => setTimeAdDateModal(false)}
                                    style={{ width: '40%' }}>
                                    <LinearGradient
                                        start={{ x: 1, y: 0 }}
                                        end={{ x: 0, y: 2 }}
                                        colors={[
                                            Colors.GRADIENT1,
                                            Colors.GRADIENT2,
                                            Colors.GRADIENT1,
                                        ]}
                                        style={[commonStyle.linearBtn]}>
                                        <View
                                            style={[
                                                styles.btnView,
                                                //  { backgroundColor: Colors.WHITE, width: '99%' },
                                            ]}>
                                            <Text
                                                style={[commonStyle.btnText, { color: Colors.WHITE }]}>
                                                Back
                                            </Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        setTimeAdDateModal(false);
                                        handleCheckInput()
                                        // navigation.navigate('MissionSummary');
                                    }}
                                    style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }}>
                                    <LinearGradient
                                        start={{ x: 1, y: 0 }}
                                        end={{ x: 0, y: 2 }}
                                        colors={[
                                            Colors.GRADIENT1,
                                            Colors.GRADIENT2,
                                            Colors.GRADIENT1,
                                        ]}
                                        style={[commonStyle.linearBtn]}>
                                        <View style={[styles.btnView, { width: '99%' }]}>
                                            <Text
                                                style={[commonStyle.btnText, { color: Colors.WHITE }]}>
                                                Save
                                            </Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                    <TouchableOpacity onPress={() => setTimeAdDateModal(false)}>
                        <AntDesign
                            name={ANTDESIGN.CIRCEL_CLOSE}
                            color={Colors.WHITE}
                            size={Spacing.SIZE_40}
                        />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    title1: {
        marginRight: Spacing.MARGIN_5,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_18,
        color: '#9A9A9A'
    },
    flexRow: {
        display: "flex",
        flexDirection: "row"
    },
    listTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_15,
        color: Colors.LIGHT_BLACK
    },
    listContain: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_13,
        color: Colors.LIGHT_BLACK
    },
    head: {
        color: Colors.PRIMARY,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_14,
    },
    whiteBtn: {
        height: hp(6.1),
        width: wp(7),
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    video: {
        width: '100%',
        height: hp(27),
        overflow: "hidden",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    linearAdd: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1,
        width: wp(27.7),
        marginTop: Spacing.PADDING_4,
        borderRadius: 7,
    },
    listView: {
        marginTop: Spacing.MARGIN_20,
        backgroundColor: '#fff',
        shadowColor: "#000",
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 2.84,
        elevation: 3,
        zIndex: 10
    },
    modalVideo: {
        width: wp(100),
        height: hp(30),
    },
    modalText: {
        color: Colors.WHITE,
        width: '100%',
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: 'Montserrat-SemiBold'

    },
    linearSelect: {
        flexDirection: 'row',
        padding: 1,
        borderRadius: 15,

    },
    selectWhiteBtn: {
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.PADDING_7,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    modalBg: {
        position: "relative",
        height: hp(100),
        width: wp(100),
        backgroundColor: "rgba(0,0,0,0.75)",
        justifyContent: "center"
    },
    modalRightBtn: {
        fontSize: Typography.FONT_SIZE_10,
        backgroundColor: Colors.WHITE,
        color: Colors.PRIMARY,
        paddingHorizontal: Spacing.MARGIN_10,
        paddingVertical: Spacing.PADDING_4,
        borderRadius: 15
    },
    btnView: {
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 1,
    },
})