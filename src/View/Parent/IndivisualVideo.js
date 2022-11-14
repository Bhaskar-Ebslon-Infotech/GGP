import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Header from '../../Component/Header';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import Settings from '../../images/svg/parentsvg/settings';
import Plus from '../../images/svg/parentsvg/circlePlus';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import { useIsFocused } from '@react-navigation/native';
import { deleteVideoInPlaylist, getVideoByPlaylistId } from '../../api/UserPlaylist';
import WebView from 'react-native-webview';
import Remove from '../../images/svg/parentsvg/remove';
import LinearGradient from 'react-native-linear-gradient';

import { ANTDESIGN } from '../../Styles/theme/Icons';
import { LoaderContext, toggleModalContext } from '../../../App';

export default function IndivisualVideo(props) {


    const [toggleDelete, setToggleDelete] = useState(false);
    const [loading, setLoading] = useContext(LoaderContext);
    const [videoArr, setVideoArr] = useState([]);
    const focused = useIsFocused()
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [deleteVideoModal, setDeleteVideoModal] = useState(false)
    console.log(props.route)
    const [selectedVideoId, setSelectedVideoId] = useState('');
    const getPlaylistVideos = async () => {
        setLoading(true)
        try {
            const { data: res } = await getVideoByPlaylistId(props.route.params.data)
            if (res.success) {
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
                console.log(JSON.stringify(tempArr, null, 2), "tempArr")
                setVideoArr(tempArr)
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
    const handleVideoDelete = async () => {
        setLoading(true)
        try {
            setDeleteVideoModal(false)
            const { data: res } = await deleteVideoInPlaylist(selectedVideoId)
            if (res.success) {
                setToggleModal(true)
                setMessage(res.message)
                handleOnint()
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
    const handleOnint = () => {
        getPlaylistVideos()
    }
    useEffect(() => {
        if (focused) {
            handleOnint()
        }
    }, [focused])




    const handleToggleDelete = () => {
        if (videoArr.length <= 0) {
            setToggleModal(true)
            setMessage("No video found to delete")
            return;
        }

        setToggleDelete(!toggleDelete)
    }


    const renderItem = ({ item }) => {
        return (
            <View style={{ paddingHorizontal: Spacing.MARGIN_20, }}>
                <View style={[styles.listView]}>
                    {
                        toggleDelete &&
                        <Pressable onPress={() => { setDeleteVideoModal(true); setSelectedVideoId(item._id) }} style={{ zIndex: 10, position: 'absolute', top: Spacing.MARGIN_10, right: Spacing.PADDING_3 }}>
                            <Remove height={hp(4)} width={wp(5)} />
                        </Pressable>
                    }
                    <WebView
                        allowsFullscreenVideo
                        style={styles.video}
                        source={{ uri: item.videoUrl }}
                    />
                    <View style={{ paddingHorizontal: Spacing.MARGIN_20, paddingVertical: Spacing.PADDING_7 }}>
                        <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                            <View style={{ flexDirection: 'column', maxWidth: "60%", }}>
                                <Text style={[styles.listTitle]}>{item?.videoHeading}</Text>
                                <Text style={[styles.listContain]}>{item?.duration}</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={[commonStyle.flexRow]}>
                                    <Text style={[styles.listTitle]}>Reward</Text>
                                    <Text style={[styles.head, { marginLeft: Spacing.PADDING_7 }]}>{item?.reward} INR</Text>
                                </View>
                                <View style={[commonStyle.flexRow]}>
                                    <Text style={[styles.listTitle]}>Bonus</Text>
                                    <Text style={[styles.head, { marginLeft: Spacing.PADDING_7 }]}>{item?.bonus} INR</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            {
                                item?.timeAndDateObj?.daysArr.length > 0 &&
                                <View style={[commonStyle.flexRow]}>
                                    <Text style={[styles.listTitle]}>Days</Text>
                                    <Text style={[styles.head, { marginLeft: Spacing.PADDING_7 }]}>{item?.timeAndDateObj?.daysArr?.map(el => {
                                        if (el.selected) {
                                            return `${el?.day} `
                                        }
                                    })}</Text>
                                </View>
                            }
                            {
                                item?.timeAndDateObj?.stopOn &&
                                <View style={[commonStyle.flexRow]}>
                                    <Text style={[styles.listTitle]}>Stop On</Text>
                                    <Text style={[styles.head, { marginLeft: Spacing.PADDING_7 }]}>{new Date(item?.timeAndDateObj?.stopOn).toDateString()}</Text>
                                </View>
                            }
                            {
                                item?.timeAndDateObj?.stopAfter &&
                                <View style={[commonStyle.flexRow]}>
                                    <Text style={[styles.listTitle]}>Stop After</Text>
                                    <Text style={[styles.head, { marginLeft: Spacing.PADDING_7 }]}>{item?.timeAndDateObj?.stopAfter}</Text>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true} />

            <FlatList
                data={videoArr}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={{ flex: 1, textAlign: "center" }}>No Data found</Text>
                }
                contentContainerStyle={{ paddingBottom: Spacing.PADDING_20 }}
                ListHeaderComponent={
                    <>
                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.PADDING_15, marginBottom: Spacing.PADDING_10 }]}>
                            <Text style={[styles.title1]}>My Kid’s VideoMix</Text>
                            <Pressable onPress={() => handleToggleDelete()}>
                                <Settings height={hp(3)} width={wp(5)} />
                            </Pressable>
                        </View>
                        <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, color: Colors.LIGHT_BLACK, }]}>{props?.route?.params?.playlistName}</Text>
                        <Pressable onPress={() => props.navigation.navigate('MissionVideoStack', { screen: 'AddVideo', params: { data: props?.route?.params?.data } })} style={[commonStyle.flexRow, { alignSelf: 'center', marginTop: Spacing.PADDING_5, marginBottom: Spacing.PADDING_5 }]}>
                            <Text style={[styles.head, { marginRight: Spacing.PADDING_5 }]}>{videoArr.length} Videos</Text>
                            <Plus height={hp(3)} width={wp(5)} />
                        </Pressable>
                    </>
                }
                keyExtractor={(item, index) => index}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteVideoModal}
            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <Text style={[commonStyle.modalText, { marginVertical: Spacing.MARGIN_50 }]}>Are you sure you want to Delete Video?</Text>

                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginBottom: Spacing.MARGIN_30 }]}>
                            <TouchableOpacity style={{ width: '40%' }} onPress={() => handleVideoDelete()}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Yes</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: '40%', marginLeft: 10 }} onPress={() => setDeleteVideoModal(false)}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, {}]}>No</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => setDeleteVideoModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>

                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    title1: {
        marginRight: Spacing.PADDING_5,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_18,
        color: '#9A9A9A'
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
    video: {
        width: '100%',
        height: hp(27),
    },
    listView: {
        marginTop: Spacing.MARGIN_20,
        shadowColor: "#000",
        borderRadius: 20,
        backgroundColor: Colors.WHITE,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 2.84,
        elevation: 3,
    }
})