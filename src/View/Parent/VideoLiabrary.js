import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import { kidContext } from '../../Context/CurrentKidContext';
import { getAllPlaylistsByKidId } from '../../api/AdminPlaylist';
import Header from '../../Component/Header';
import Play from '../../images/svg/parentsvg/circlePlay';
import Clicked from '../../images/svg/parentsvg/clicked';
import Info from '../../images/svg/parentsvg/info';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import { LoaderContext, toggleModalContext } from '../../../App';
import WebView from 'react-native-webview';
import CheckBox from 'react-native-check-box';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function VideoLiabrary(props) {
    const navigation = useNavigation();
    const focused = useIsFocused()
    const [videoModal, setVideoModal] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [playlistArr, setPlaylistArr] = useState([]);
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [isFirstTimeUserVideo, setIsFirstTimeUserVideo] = useState(false);

    const onBuffer = () => {

    }
    const videoError = () => {

    }
    const data = [
        {
            id: '1',
            url: require('../../images/sampleVideo.mp4'),
        },
        {
            id: '2',
            url: require('../../images/sampleVideo.mp4'),
        },
        {
            id: '3',
            url: require('../../images/sampleVideo.mp4'),
        },
        {
            id: '4',
            url: require('../../images/sampleVideo.mp4'),
        },
    ]

    const getAdminPlatylistArr = async () => {
        setLoading(true)
        try {
            let { data: res } = await getAllPlaylistsByKidId(currentKid._id)
            if (res.data) {
                setPlaylistArr([...res.data])
                console.log(JSON.stringify(res.data, null, 2), "response")
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
    // getAllPlaylistsByKidId



    const getIsFirstTimeUser = async () => {
        let isFirstTimeUserVideo = await EncryptedStorage.getItem("isFirstTimeUserVideo");
        if (isFirstTimeUserVideo) {
            setIsFirstTimeUserVideo(isFirstTimeUserVideo)
        }
        else {
            setVideoModal(true)
            setIsFirstTimeUserVideo(false)
        }
    }


    const setIsFirstTimeUser = async () => {
        setIsFirstTimeUserVideo(previousValue => {
            previousValue = !previousValue
            return previousValue
        })
        let isFirstTimeUser = await EncryptedStorage.setItem("isFirstTimeUserVideo", `${isFirstTimeUserVideo}`);
    }


    useEffect(() => {
        if (focused) {
            getIsFirstTimeUser()
        }
    }, [focused])




    useEffect(() => {
        if (focused) {
            getAdminPlatylistArr()
            // console.log(JSON.stringify(currentKid, null, 2), "assaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        }
    }, [focused, currentKid])


    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate("SuggestedVideo", { data: item._id, name: item.name })}>
                <ImageBackground imageStyle={{ borderRadius: 15, }} style={styles.video} resizeMethod="scale" resizeMode='cover' source={item.playlistImage ? { uri: item.playlistImage } : require('../../images/dashboardCard.png')} >
                    <Text style={{ color: "white" }}>{item.name}</Text>
                </ImageBackground>
            </TouchableOpacity >
        )
    }
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true} />
            <View>
                <FlatList
                    data={playlistArr}
                    renderItem={renderItem}
                    numColumns={2}
                    contentContainerStyle={{ paddingBottom: hp(12) }}
                    ListHeaderComponent={
                        <View style={{ padding: Spacing.MARGIN_15 }}>
                            <TouchableOpacity onPress={() => setVideoModal(true)} style={{ height: hp(3), width: hp(3), alignSelf: 'flex-end' }}>
                                <Info height={hp(3)} width={hp(3)} />
                            </TouchableOpacity>
                            <View style={[commonStyle.flexRow, { alignSelf: 'center' }]}>
                                <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30 }]}>Video Garage</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('MissionVideoStack', { screen: 'VideoApproved' })} style={{ backgroundColor: Colors.PRIMARY, padding: Spacing.MARGIN_5, marginLeft: Spacing.PADDING_2, marginTop: -Spacing.PADDING_10, borderRadius: 20 }}>
                                    <FontAwesome name='bell' size={Spacing.SCALE_12} color={Colors.WHITE} />
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={[commonStyle.flexRow, { marginVertical: Spacing.MARGIN_10, paddingVertical: Spacing.PADDING_7 }]}>
                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: wp(90), alignSelf: "center" }}>
                                    <TouchableOpacity style={[styles.topBtn]} onPress={() => navigation.navigate('MissionVideoStack', { screen: 'KidsVideoList' })}>
                                        <Text style={[styles.topBtnTxt]}>My Kid’s VideoMix</Text>
                                        <Play height={hp(3)} width={wp(5)} style={{ marginLeft: Spacing.PADDING_4 }} />
                                    </TouchableOpacity>
                                </View>
                                {/* <TouchableOpacity style={[styles.topBtn, { marginLeft: Spacing.PADDING_7 }]} onPress={() => navigation.navigate('BottomTabBar', { screen: 'MissionVideoStack', params: { screen: 'AddVideo', } })}>
                                    <Text style={[styles.topBtnTxt]}>Add Video</Text>
                                    <Add height={hp(3)} width={wp(5)} style={{ marginLeft: Spacing.PADDING_4 }} />
                                </TouchableOpacity> */}
                            </ScrollView>
                            <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_20, textAlign: 'left' }]}>Recommended VideoMix</Text>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={videoModal}

            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg,]}>
                        <View style={styles.video2}>
                            <WebView
                                mediaPlaybackRequiresUserAction={true}
                                allowsInlineMediaPlayback={true}
                                javaScriptEnabled={true}
                                allowsFullscreenVideo={true}
                                domStorageEnabled={true}
                                injectedJavaScript={`
                                                       document.getElementsByTagName("video")[0].removeAttribute("autoplay"); // this one was the key for me!
                                              `}
                                scrollEnabled={false}
                                style={{ width: "99.4%", height: "100%" }}
                                source={{ uri: "https://www.youtube.com/embed/BDyq4B36-UY" }}
                            />
                        </View>
                        {/* <Video source={require('../../images/sampleVideo.mp4')}
                            onBuffer={onBuffer}
                            onError={videoError}
                            resizeMode="cover"
                            style={styles.modalVideo}
                            paused={false}
                        /> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginTop: 15 }} >
                            <CheckBox
                                style={{ marginRight: hp(0.5), }}
                                onClick={() => setIsFirstTimeUser()}
                                isChecked={typeof (isFirstTimeUserVideo) == "String" ? isFirstTimeUserVideo == 'true' ? true : false : isFirstTimeUserVideo}
                            />
                            <Text style={{ color: Colors.GRADIENT1 }}>Don't Show again</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setVideoModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>

                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    video: {
        borderWidth: 1,
        marginTop: Spacing.MARGIN_15,
        borderColor: Colors.WHITE,
        borderRadius: 15,
        width: wp(46),
        height: hp(25),
        marginHorizontal: Spacing.PADDING_7,
        justifyContent: 'flex-end',
        paddingBottom: 15,
        alignItems: 'center',
        backgroundColor: Colors.WHITE
    },
    video2: {
        width: '100.5%',
        height: hp(32),
    },
    topBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: "center",
        paddingHorizontal: 10,
        paddingVertical: Spacing.MARGIN_5,
        borderRadius: 20,
        justifyContent: "center",
        shadowColor: "#000",
        backgroundColor: Colors.WHITE,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    topBtnTxt: {
        fontSize: Typography.FONT_SIZE_11,
        fontFamily: 'Montserrat-SemiBold',
        color: '#747474',
    },
    modalVideo: {
        width: '100%',
        height: hp(25),
        borderColor: Colors.WHITE,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    box: {
        height: hp(2.5),
        width: hp(2.5),
        borderWidth: 1,
        marginRight: Spacing.MARGIN_10,
        marginStart: Spacing.MARGIN_10
    },
    modalText: {
        position: 'absolute',
        left: hp(6)
    }
})