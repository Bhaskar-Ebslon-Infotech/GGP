import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WebView from 'react-native-webview';
import { LoaderContext, toggleModalContext } from '../../../App';
import { handleUpdateVideoCompletionStatus } from '../../api/KidVideoCompletion';
import { addVideosInPlaylist, deleteVideoInPlaylist, getAllVideoByKidId } from '../../api/UserPlaylist';
import { getAllCompletedVideoByKidId, getAllVideoByKidIdForApproval, getAllVideoByKidIdForTodo } from '../../api/UserPlaylistVideo';
import { KidMissionCompletionStatus } from '../../api/utils/StatusForKidMissionCompletionStatus';
import Header from '../../Component/Header';
import { images } from '../../Constant/background';
import { kidContext } from '../../Context/CurrentKidContext';
import Approve from '../../images/svg/parentsvg/approve';
import Cancel from '../../images/svg/parentsvg/cancel';
import Check from '../../images/svg/parentsvg/check';
import Msg from '../../images/svg/parentsvg/msg';
import Tick from '../../images/svg/parentsvg/tick';
import Todo from '../../images/svg/parentsvg/todo';
import MasterData from '../../MasterData';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { ANTDESIGN } from '../../Styles/theme/Icons';



export default function VideoApproved(props) {
    const [loading, setLoading] = useContext(LoaderContext);

    const [currentTabVideo, setCurrentTabVideo] = useState(0);//////////approved = 0 , todo == 1 , done == 2
    const approved = async () => {
        setCurrentTabVideo(0)
        await setCurrentTabVideo("0")
        handleOnint()
    }
    const todos = async () => {
        setCurrentTabVideo(1)
        await setCurrentTabVideo("1")
        handleOnint()
    }
    const dones = async () => {
        setCurrentTabVideo(2)
        await setCurrentTabVideo("2")
        handleOnint()
        // setaddVideoModal(false)
    }

    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [approvalVideosArr, setApprovalVideosArr] = useState([]);
    const [todoModal, setTodoModal] = useState(false);
    const focused = useIsFocused()
    const [videoArr, setVideoArr] = useState([]);
    const [completedVideosArr, setCompletedVideosArr] = useState([]);
    const [selectedVideoId, setSelectedVideoId] = useState('');
    const [currentKid, setCurrentKid] = useContext(kidContext);


    const handleAcceptApproval = async (id, status) => {
        setLoading(true)
        try {
            console.log(status)
            let obj = {
                status
            }

            let { data: res } = await handleUpdateVideoCompletionStatus(id, obj)
            if (res.message) {
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





    const getAllforApproval = async () => {
        setLoading(true)
        try {
            let { data: res } = await getAllVideoByKidIdForApproval(currentKid._id)
            if (res.data) {
                let tempArr = res.data.map((el) => {
                    if (el?.userVideoObj?.videoUrl.includes('youtube') || el?.userVideoObj?.videoUrl.includes('you')) {
                        if (el.userVideoObj.videoUrl.includes("watch?v=")) {
                            let textArr = el?.userVideoObj?.videoUrl.split('/')
                            let tempText = textArr[textArr.length - 1].split("watch?v=")
                            el.userVideoObj.videoUrl = `https://www.youtube.com/embed/${tempText[tempText.length - 1]}`
                        }
                        else {
                            let textArr = el?.userVideoObj?.videoUrl.split('/')
                            el.userVideoObj.videoUrl = `https://www.youtube.com/embed/${textArr[textArr.length - 1]}`
                        }
                    }
                    return el
                })

                setApprovalVideosArr([...tempArr])
                // console.log(JSON.stringify(res.data, null, 2), "response")
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
        }
        setLoading(false)
    }


    const getAllCompleted = async () => {
        setLoading(true)
        try {
            console.log(currentKid._id)
            let { data: res } = await getAllCompletedVideoByKidId(currentKid._id)
            console.log(JSON.stringify(res, null, 2), "completed")
            if (res.data) {
                let tempArr = res.data.map((el) => {
                    if (el?.userVideoObj?.videoUrl.includes('youtube') || el?.userVideoObj?.videoUrl.includes('you')) {
                        if (el.userVideoObj.videoUrl.includes("watch?v=")) {
                            let textArr = el?.userVideoObj?.videoUrl.split('/')
                            let tempText = textArr[textArr.length - 1].split("watch?v=")
                            el.userVideoObj.videoUrl = `https://www.youtube.com/embed/${tempText[tempText.length - 1]}`
                        }
                        else {
                            let textArr = el?.userVideoObj?.videoUrl.split('/')
                            el.userVideoObj.videoUrl = `https://www.youtube.com/embed/${textArr[textArr.length - 1]}`
                        }
                    }
                    return el
                })
                console.log(JSON.stringify(tempArr, null, 2), "completed")
                setCompletedVideosArr([...tempArr])
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
        }
        setLoading(false)
    }


    const getPlaylist = async () => {
        setLoading(true)
        try {
            let { data: res } = await getAllVideoByKidIdForTodo(currentKid._id)
            if (res.data) {
                let tempArr = res.data.map((el) => {
                    if (el?.videoUrl?.includes('youtube') || el?.videoUrl?.includes('you')) {
                        if (el?.videoUrl.includes("watch?v=")) {
                            let textArr = el?.videoUrl.split('/')
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
                setVideoArr([...tempArr])
                // console.log(JSON.stringify(res.data, null, 2), "response")
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
        }
        setLoading(false)
    }

    const handleVideoDelete = async () => {
        setLoading(true)
        try {
            const { data: res } = await deleteVideoInPlaylist(selectedVideoId)
            if (res.success) {
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
        // if (currentTabVideo == 0) {
        getAllforApproval()
        // }
        // else if (currentTabVideo == 1) {
        getPlaylist()
        // }
        // else {
        getAllCompleted()
        // }
    }

    useEffect(() => {
        if (focused) {
            handleOnint()
        }
    }, [focused])




    const Approved = () => {
        const navigation = useNavigation();
        const [loading, setLoading] = useContext(LoaderContext);
        const { toggleObj, messageObj } = useContext(toggleModalContext)
        const [toggleModal, setToggleModal] = toggleObj;
        const [message, setMessage] = messageObj;

        const data = [
            {
                id: '1',
                img: require('../../images/product.png'),
                inr: '500',
                title: 'Title',
                contain: 'Duration',
                status: 'Finished',
                date: 'Nov 12, 2021',
                reward: '5',
                bonus: '0',
            },
            {
                id: '2',
                img: require('../../images/product.png'),
                inr: '500',
                title: 'Title',
                contain: 'Duration',
                status: 'Finished',
                date: 'Nov 12, 2021',
                reward: '5',
                bonus: '0',
            },


        ]
        const renderItem = ({ item, index }) => {
            return (
                <View style={[styles.imgView, index == approvalVideosArr.length - 1 && { marginBottom: 250 }]}>
                    <TouchableOpacity style={{ height: "100%", zIndex: 150, position: "relative" }}>
                        <View style={{
                            backgroundColor: "transparent", width: wp(40),
                            height: hp(15),
                            position: "absolute",
                            zIndex: 10
                        }} />
                        {
                            focused && currentTabVideo == 0 &&
                            <WebView
                                mediaPlaybackRequiresUserAction={true}
                                allowsInlineMediaPlayback={true}
                                allowsFullscreenVideo
                                androidLayerType="software"
                                androidHardwareAccelerationDisabled={true}
                                style={[{ width: wp(50), opacity: 0.99 }]}
                                source={{ uri: item?.userVideoObj?.videoUrl }}
                            />
                        }
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'column', marginLeft: Spacing.MARGIN_15 }}>
                        <Text style={[styles.title, { color: Colors.PRIMARY, fontSize: Typography.FONT_SIZE_25 }]}>{item?.userVideoObj?.videoHeading}</Text>
                        <Text style={[styles.listContain]}>{item.contain}</Text>
                        <Text style={[styles.listContain, { fontSize: Typography.FONT_SIZE_12, color: '#747474' }]}>{item.status}{' '}{new Date(item?.userVideoObj?.createdAt).toDateString()}</Text>
                        <View style={[commonStyle.flexRow, { marginTop: Spacing.PADDING_7 }]}>
                            <Text style={[styles.listContain, { fontFamily: 'Montserrat-SemiBold' }]}>Reward</Text>
                            <Text style={[styles.listContain, { marginLeft: Spacing.MARGIN_5 }]}>{item?.userVideoObj?.reward} INR</Text></View>
                        <View style={[commonStyle.flexRow]}>
                            <Text style={[styles.listContain, { fontFamily: 'Montserrat-SemiBold' }]}>Bonus</Text>
                            <Text style={[styles.listContain, { marginLeft: Spacing.MARGIN_5 }]}>{item?.userVideoObj?.bonus}  INR</Text>
                        </View>
                        <Text style={[styles.title, { color: Colors.PRIMARY, fontSize: Typography.FONT_SIZE_18 }]}>{item?.userVideoObj?.reward + item?.userVideoObj?.bonus} INR</Text>
                        <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_10 }]}>
                            <TouchableOpacity onPress={() => handleAcceptApproval(item._id, KidMissionCompletionStatus.completed)}>
                                <Check height={hp(4)} width={wp(6)} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('DiscussVideo', { data: item })}>
                                <Msg height={hp(4)} width={wp(6)} style={{ marginLeft: Spacing.PADDING_7 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleAcceptApproval(item._id, KidMissionCompletionStatus.rejected)}>
                                <Cancel height={hp(4)} width={wp(6)} style={{ marginLeft: Spacing.PADDING_7 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    data={approvalVideosArr}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    ListEmptyComponent={
                        <Text style={{ flex: 1, textAlign: "center" }}>No Data found</Text>
                    }
                />
            </View>
        )
    }

    const Todos = () => {

        const renderItem = ({ item, index }) => {
            return (
                <View style={[styles.imgView, index == videoArr?.length - 1 && { marginBottom: Spacing.MARGIN_20 }]}>
                    <TouchableOpacity style={{ flex: 1, zIndex: 150, position: "relative" }}>
                        <View style={{
                            backgroundColor: "transparent", width: wp(45),
                            height: "100%",
                            position: "absolute",
                            zIndex: 10
                        }} />
                        {
                            focused && currentTabVideo == 1 &&
                            <WebView
                                mediaPlaybackRequiresUserAction={true}
                                allowsInlineMediaPlayback={true}
                                allowsFullscreenVideo
                                androidLayerType="software"
                                androidHardwareAccelerationDisabled={true}
                                style={[{ width: wp(50), opacity: 0.99 }]}
                                source={{ uri: item?.videoUrl }}
                            />
                        }
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', flex: 0.7, marginLeft: Spacing.MARGIN_15 }}>
                        <Text style={[styles.title, { color: Colors.PRIMARY, fontSize: Typography.FONT_SIZE_25, maxWidth: wp(35) }]}>{item.videoHeading}</Text>
                        <View style={[commonStyle.flexRow, { marginTop: Spacing.PADDING_7 }]}>
                            <Text style={[styles.listContain, { fontFamily: 'Montserrat-SemiBold' }]}>Reward</Text>
                            <Text style={[styles.listContain, { marginLeft: Spacing.MARGIN_5 }]}>{item?.reward} INR</Text></View>
                        <View style={[commonStyle.flexRow]}>
                            <Text style={[styles.listContain, { fontFamily: 'Montserrat-SemiBold' }]}>Bonus</Text>
                            <Text style={[styles.listContain, { marginLeft: Spacing.MARGIN_5 }]}>{item?.bonus} INR</Text>
                        </View>
                        {/* <Text style={[styles.title,{color:Colors.PRIMARY,fontSize:Typography.FONT_SIZE_18}]}>{item.inr} INR</Text> */}
                        <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_10 }]}>
                            <TouchableOpacity onPress={() => { setTodoModal(true); setSelectedVideoId(item._id) }}>
                                <Cancel height={hp(4)} width={wp(6)} style={{ marginLeft: Spacing.PADDING_7 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    contentContainerStyle={{ paddingBottom: hp(25) }}
                    data={videoArr}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    ListEmptyComponent={
                        <Text style={{ flex: 1, textAlign: "center" }}>No Data found</Text>
                    }
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={todoModal}

                >
                    <View style={[commonStyle.modalBackground]}>
                        <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                                <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                            </LinearGradient>
                            <View style={{ width: '100%' }}>
                                <Text style={[styles.listTitle, { textAlign: 'center', color: Colors.LIGHT_BLACK, width: '90%', alignSelf: 'center', marginTop: Spacing.MARGIN_15 }]}>Do you want to remove video <Text style={{ color: Colors.PRIMARY }}>To Do?</Text></Text>
                                <Text style={[styles.listSubTitle, { textAlign: 'center', color: Colors.LIGHT_BLACK, width: '95%', alignSelf: 'center', marginTop: Spacing.MARGIN_15, fontSize: Typography.FONT_SIZE_15 }]}>Once removed, Video will not be available for a kid too and you need to add again from Videos.</Text>
                            </View>

                            <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_25, }]}>
                                <TouchableOpacity style={{ width: '40%' }} onPress={() => { setTodoModal(false); handleVideoDelete() }} >
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                        <View style={[styles.btnView, { width: '99%' }]}>
                                            <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Yes</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setTodoModal(false)} style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }} >
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                        <View style={[styles.btnView, { width: '99%' }]}>
                                            <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>No</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <TouchableOpacity onPress={() => setTodoModal(false)}>
                            <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }

    const Dones = () => {
        const [stopAfter, setStopAfter] = useState(1);
        const [addVideoModal, setaddVideoModal] = useState(false);
        const [stopOn, setStopOn] = useState(new Date());
        const [selectedItem, setSelectedItem] = useState({});
        const [stopOnActive, setStopOnActive] = useState(true);



        const handleReschedule = async (id, status) => {
            setLoading(true)
            try {
                console.log(status)
                let obj = {
                    kidId: currentKid._id,
                    playlistGroupId: selectedItem.userVideoObj.playlistGroupId,
                    videoHeading: selectedItem.userVideoObj.videoHeading,
                    videoUrl: selectedItem.userVideoObj.videoUrl,
                    timeAndDateObj: {
                        daysArr: data
                    },
                    reward: parseInt(selectedItem.userVideoObj.reward),
                    bonus: parseInt(selectedItem.userVideoObj.bonus)
                }

                if (stopOnActive) {
                    obj.timeAndDateObj.stopOn = stopOn
                }
                else {
                    obj.timeAndDateObj.stopAfter = stopAfter
                }

                if (data.every(el => el.selected == false)) {
                    setToggleModal(true)
                    setMessage("Please select at least one Day from 'Repeat On' to set Time and Date")
                    setLoading(false)
                    return;
                }
                // if (stopOnActive && new Date(new Date(obj.timeAndDateObj.stopOn).getFullYear(), new Date(obj.timeAndDateObj.stopOn).getMonth() + 1, new Date(obj.timeAndDateObj.stopOn).getDate(), 0, 0).getTime() == new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), 0, 0)) {
                //     setToggleModal(true)
                //     setMessage("Please add 'Stop On' to set Time and Date")
                //     setLoading(false)
                //     return;
                // }
                // else

                if (!stopOnActive && obj.timeAndDateObj.stopAfter == 0) {
                    setToggleModal(true)
                    setMessage("Please add 'Stop After' frequency to set Time and Date")
                    setLoading(false)
                    return;
                }
                else {
                    console.log(JSON.stringify(selectedItem, null, 2))
                    console.log(JSON.stringify(obj, null, 2))
                    let { data: res } = await addVideosInPlaylist(obj)
                    if (res.message) {
                        setLoading(false)
                        setaddVideoModal(false)
                        setToggleModal(true)
                        setMessage(res.message)
                        handleOnint()
                    }
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




        const daysRenderItem = ({ item, index }) => {
            return (
                <View style={{ marginTop: Spacing.PADDING_5 }}>
                    <TouchableOpacity onPress={() => handleDaySeletion(index)} style={{ backgroundColor: item.selected ? Colors.PRIMARY : Colors.WHITE, marginHorizontal: Spacing.PADDING_5, height: hp(3), width: wp(6), justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                        <Text style={{ color: item.selected ? Colors.WHITE : Colors.LIGHT_BLACK }}>{item.day}</Text>
                    </TouchableOpacity>
                </View>
            )
        }


        const [data, setData] = useState([
            {
                id: '1',
                day: 'SU',
                selected: false
            },
            {
                id: '2',
                day: 'M',
                selected: false
            },
            {
                id: '3',
                day: 'T',
                selected: false
            },
            {
                id: '4',
                day: 'W',
                selected: false
            },
            {
                id: '5',
                day: 'THU',
                selected: false
            },
            {
                id: '6',
                day: 'F',
                selected: false
            },
            {
                id: '7',
                day: 'S',
                selected: false
            },
        ]);


        const modalData = MasterData.days;

        const handleDaySeletion = (index) => {
            let tempData = data.map((el, i) => {
                if (i == index) {
                    el.selected = !el.selected
                }
                return el
            })
            setData(tempData)
        }

        const renderItem = ({ item, index }) => {
            return (
                <View style={[styles.imgView, index == data.length - 1 && { marginBottom: Spacing.MARGIN_20 }]}>
                    <TouchableOpacity style={{ flex: 1, zIndex: 150, position: "relative" }}>
                        <View style={{
                            backgroundColor: "transparent", width: wp(40),
                            height: hp(15),
                            position: "absolute",
                            zIndex: 10
                        }} />
                        {
                            focused && currentTabVideo == 2 &&
                            <WebView
                                mediaPlaybackRequiresUserAction={true}
                                allowsInlineMediaPlayback={true}
                                allowsFullscreenVideo
                                androidLayerType="software"
                                androidHardwareAccelerationDisabled={true}
                                style={[{ width: wp(40), height: hp(50), opacity: 0.99 }]}
                                source={{ uri: item?.userVideoObj?.videoUrl }}
                            />
                        }
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', marginLeft: Spacing.MARGIN_15, flex: 1 }}>
                        <Text style={[styles.title, { color: Colors.PRIMARY, fontSize: Typography.FONT_SIZE_25 }]}>{item?.userVideoObj?.videoHeading}</Text>
                        <Text style={[styles.listContain]}>{item.contain}</Text>
                        <Text style={[styles.listContain, { fontSize: Typography.FONT_SIZE_12, color: '#747474' }]}>{item?.status}</Text>
                        <View style={[commonStyle.flexRow, { marginTop: Spacing.PADDING_7 }]}>
                            <Text style={[styles.listContain, { fontFamily: 'Montserrat-SemiBold' }]}>Reward</Text>
                            <Text style={[styles.listContain, { marginLeft: Spacing.MARGIN_5 }]}>{item?.userVideoObj?.reward} INR</Text></View>
                        <View style={[commonStyle.flexRow]}>
                            <Text style={[styles.listContain, { fontFamily: 'Montserrat-SemiBold' }]}>Bonus</Text>
                            <Text style={[styles.listContain, { marginLeft: Spacing.MARGIN_5 }]}>{item?.userVideoObj?.bonus} INR</Text>
                        </View>
                        <Text style={[styles.title, { color: Colors.PRIMARY, fontSize: Typography.FONT_SIZE_18 }]}>{item?.userVideoObj?.bonus + item?.userVideoObj?.reward} INR</Text>
                        <TouchableOpacity onPress={() => { setaddVideoModal(true); setSelectedItem(item); }}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn, { width: wp(30), marginTop: Spacing.MARGIN_5 }]} >
                                <View style={[styles.btnView]}>
                                    <Text style={[commonStyle.btnText, { color: Colors.WHITE, paddingHorizontal: 10, paddingTop: 7, fontSize: Typography.FONT_SIZE_12, paddingVertical: Spacing.PADDING_2, }]}>Reschedule</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    data={completedVideosArr}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{ paddingBottom: hp(32) }}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={addVideoModal}

                >
                    <View style={[commonStyle.modalBackground]}>
                        <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                                <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                            </LinearGradient>
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
                                                    style={{ flex: 1, fontSize: 15, backgroundColor: "white", borderRadius: 10, marginLeft: 15, }}
                                                    minimumDate={new Date()}
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
                                                { width: '93%', marginRight: 2, borderRadius: 27 },
                                            ]}>
                                            <TextInput
                                                style={[
                                                    styles.selectWhiteBtn,
                                                    { justifyContent: 'space-between', width: "100%", borderRadius: 27 },
                                                ]} value={`${stopAfter}`} maxLength={3} keyboardType='number-pad' onChangeText={(val) => setStopAfter(val[0]==0 ? 1 : val)} />

                                        </LinearGradient>
                                }




                            </View>
                            <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_25, }]}>
                                <TouchableOpacity onPress={() => setaddVideoModal(false)} style={{ width: '40%' }} >
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                        <View style={[styles.btnView, { width: '99%' }]}>
                                            <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Back</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { handleReschedule(); }} style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }} >
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                        <View style={[styles.btnView, { width: '99%' }]}>
                                            <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Save</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <TouchableOpacity onPress={() => setaddVideoModal(false)}>
                            <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                >
                    <View style={[commonStyle.dopDownModal,]}>
                        <View style={[commonStyle.modalWhiteBg]}>
                            <FlatList
                                data={afterData}
                                renderItem={afterRenderItem}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                        <TouchableOpacity onPress={() => setModal(false)}>
                            <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                        </TouchableOpacity>
                    </View>
                </Modal> */}
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1, paddingBottom: Spacing.SIZE_200 }}>
            <ImageBackground source={images.backGround} resizeMode='contain' style={[commonStyle.fullSize]}>
                <Header logo={true} />
                <Text style={[commonStyle.title, { color: '#353535', marginTop: Spacing.MARGIN_20, fontSize: Typography.FONT_SIZE_30 }]}>Video Garage</Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <View style={[commonStyle.flexRow, styles.topView]}>

                        <TouchableOpacity onPress={() => approved()} style={{ borderColor: currentTabVideo == 0 ? Colors.PRIMARY : Colors.WHITE, borderWidth: 2, borderRadius: 20, }}>
                            <View style={[commonStyle.flexRow, { alignSelf: 'center', paddingHorizontal: Spacing.MARGIN_10, }]}>
                                <Text style={[styles.topText, { marginRight: Spacing.PADDING_7 }]}>Approval</Text>
                                <Approve height={hp(4)} width={wp(5)} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => todos()} style={{ borderColor: currentTabVideo == 1 ? Colors.PRIMARY : Colors.WHITE, borderWidth: 2, borderRadius: 20, }}>
                            <View style={[commonStyle.flexRow, { alignSelf: 'center', paddingHorizontal: Spacing.MARGIN_10, }]}>
                                <Text style={[styles.topText, { marginRight: Spacing.PADDING_7 }]}>Todo</Text>
                                <Todo height={hp(4)} width={wp(5)} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dones()} style={{ borderColor: currentTabVideo == 2 ? Colors.PRIMARY : Colors.WHITE, borderWidth: 2, borderRadius: 20, }}>
                            <View style={[commonStyle.flexRow, { alignSelf: 'center', paddingHorizontal: Spacing.MARGIN_10, }]}>
                                <Text style={[styles.topText, { marginRight: Spacing.PADDING_7 }]}>Done</Text>
                                <Tick height={hp(4)} width={wp(5)} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {currentTabVideo == 0 && (
                        <Approved />
                    )}
                    {currentTabVideo == 1 && (
                        <Todos />
                    )}
                    {currentTabVideo == 2 && (
                        <Dones />
                    )}



                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    topView: {
        justifyContent: 'space-between',
        borderWidth: 1,
        alignSelf: 'center',
        width: wp(92),
        borderRadius: 20,
        marginTop: Spacing.MARGIN_15,
        borderColor: '#DEDEDE',
        backgroundColor: Colors.WHITE
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    topText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY,
        paddingVertical: Spacing.PADDING_7,
        textAlign: 'center',
    },
    head: {
        color: Colors.PRIMARY,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_14,
    },
    img: {
        height: hp(32),
        width: wp(45),
        borderRadius: 20,
    },
    title: {
        fontSize: Typography.FONT_SIZE_17,
        width: '70%',
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.PRIMARY
    },
    inr: {
        fontSize: Typography.FONT_SIZE_15,
        color: '#9A9A9A',
        fontFamily: 'Montserrat-Regular',
        marginTop: Spacing.PADDING_4
    },
    imgView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.MARGIN_15,
        width: '99%',
        minHeight: hp(32),
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
    listContain: {
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_13,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '600',
    },
    btnView: {
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        //  margin: Spacing.PADDING_2,
    },
    listTitle: {
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_22,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
    },
    listSubTitle: {
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_18,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '600',
    },
    linearSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.PADDING_2,
        alignSelf: 'center',
        borderRadius: 25,

    },
    selectWhiteBtn: {
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.PADDING_7,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.LIGHT_BLACK,
        marginTop: Spacing.MARGIN_10
    },
})