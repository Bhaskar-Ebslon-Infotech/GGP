import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, FlatList, Modal, TextInput, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Component/Header';
import commonStyle from '../../Styles/parentStyle';
import { images } from '../../Constant/background';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import DatePicker from 'react-native-date-picker';

import Tick from '../../images/svg/parentsvg/tick';
import Todo from '../../images/svg/parentsvg/todo';
import Approve from '../../images/svg/parentsvg/approve';
import Check from '../../images/svg/parentsvg/check';
import Cancel from '../../images/svg/parentsvg/cancel';
import Msg from '../../images/svg/parentsvg/msg';
import { ANTDESIGN } from '../../Styles/theme/Icons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createMissions, deleteMission, getMissionsCompletedByKidId, getMissionsForApprovalByKidId, getUserMissions } from '../../api/Missions';
import { kidContext } from '../../Context/CurrentKidContext';
import { KidMissionCompletionStatus } from '../../api/utils/StatusForKidMissionCompletionStatus';
import { KidMissionUpdate } from '../../api/kidMissionCompletion';
import { getCurrentTabForMissions, setCurrentTabForMissions } from '../../api/user';
import { LoaderContext, toggleModalContext } from '../../../App';
import { handleReschedule } from '../../api/UserPlaylistVideo';
import MissionTodos from './MissionTodos';

export default function MissionApproved() {
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [loading, setLoading] = useContext(LoaderContext);
    const [addVideoModal, setAddVideoModal] = useState(false);

    const [currentTab, setCurrentTab] = useState(1); ////approve = 0 , todo = 1 , done = 2
    const [approve, setApprove] = useState(false);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;

    const [todo, setTodo] = useState(true);
    const [done, setDone] = useState(false);
    const [timeAndDateObj, setTimeAndDateObj] = useState({
        stopAfter: 1,
        stopOnActive: true,
        stopOn: new Date(),
        daysArr: [
            {
                id: '1',
                day: 'SU',
                selected: false
            },
            {
                id: '2',
                day: 'Mo',
                selected: false
            },
            {
                id: '3',
                day: 'Tu',
                selected: false
            },
            {
                id: '4',
                day: 'We',
                selected: false
            },
            {
                id: '5',
                day: 'THU',
                selected: false
            },
            {
                id: '6',
                day: 'Fr',
                selected: false
            },
            {
                id: '7',
                day: 'Sa',
                selected: false
            },
        ]

    });
    const [doneArr, setDoneArr] = useState([]);
    const [todoArr, setTodoArr] = useState([]);
    const [approvalArr, setApprovalArr] = useState([]);
    const [selectedMissionId, setSelectedMission] = useState({});
    const [selectedDoneElement, setSelectedDoneElement] = useState({});
    const focused = useIsFocused()

    const approved = async () => {
        setCurrentTab(0)
        await setCurrentTabForMissions("0")
        getAllData()
    }

    const todos = async () => {
        setCurrentTab(1)
        await setCurrentTabForMissions("1")
        getAllData()
    }

    const dones = async () => {
        setCurrentTab(2)
        await setCurrentTabForMissions("2")
        getAllData()
    }


    const handleOnDateSet = (val) => {
        setTimeAndDateObj(previousState => {
            previousState.stopOn = val
            return { ...previousState }
        })
    }

    const handleAfteCountSet = (val) => {
        setTimeAndDateObj(previousState => {
            previousState.stopAfter = val
            return { ...previousState }
        })
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleDaySeletion = (index) => {
        setTimeAndDateObj(previousState => {
            previousState.daysArr[index].selected = !previousState.daysArr[index].selected
            return { ...previousState }
        })
    }


    const handleMissionDelete = async () => {
        setLoading(true)
        try {
            console.log(JSON.stringify(selectedMissionId, null, 2))
            let { data: res } = await deleteMission(selectedMissionId)
            if (res.message) {
                setToggleModal(true)
                setMessage(res.message)
                // getUserMissionData()
            }
        }
        catch (error) {
            // setToggleModal(true)
            //setMessage(error)
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


    const HandleReschedule = async () => {
        setLoading(true)
        try {
            let obj = selectedDoneElement
            let finalObj = {}
            if (obj?.isStreakActive) {
                finalObj.userId = obj?.userId
                finalObj.kidId = obj.kidId
                finalObj.categoryId = obj.categoryId
                finalObj.activityId = obj.activityId
                finalObj.isStreakActive = true
                finalObj.attributeArr = obj.attributeArr
            }
            else {
                finalObj.userId = obj.userId
                finalObj.kidId = obj.kidId
                finalObj.categoryId = obj.categoryId
                finalObj.activityId = obj.activityId
                finalObj.attributeArr = obj.attributeArr
                finalObj.timeAndDateObj = timeAndDateObj
                finalObj.timeAndDateObj = {}

                finalObj.timeAndDateObj.daysArr = timeAndDateObj.daysArr
                // console.log(selectedItem.stopOnActive, "selectedItem.stopOnActive")
                if (timeAndDateObj.stopOnActive) {
                    finalObj.timeAndDateObj.stopOn = timeAndDateObj.stopOn
                }
                else {
                    finalObj.timeAndDateObj.stopAfter = timeAndDateObj.stopAfter
                }
            }
            console.log(JSON.stringify(finalObj, null, 2), "tempSelectedElement")

            console.log("here")
            if (finalObj?.timeAndDateObj && finalObj?.timeAndDateObj?.stopAfter == 0 || finalObj?.timeAndDateObj?.daysArr.every(el => el.selected == false)) {
                setToggleModal(true)
                setMessage("Please add 'Stop On' OR 'Stop After' frequency and select at least one Day from 'Repeat On' to set Time and Date")
                setLoading(false)
                return;
            }

            // if (finalObj && finalObj?.attributesArr && finalObj?.attributesArr.length > 0 && finalObj?.attributesArr.some(el => el.name.toLowerCase() == "reward" && el.coinsAmount == "0")) {
            //     setToggleModal(true)
            //     setMessage("Please add reward")
            //     setLoading(false)
            //     return;
            // }




            // if (obj?.isStreakActive) {
            //     let temp = finalObj.attributeArr.map(el => {
            //         if (`${el?.name}`.toLowerCase() == "Streak".toLowerCase() && el.frequencyAmount == 0) {
            //             setToggleModal(true)
            //             setMessage("Please add atleast one in frequency before rescheduling a mission")
            //             setLoading(false)
            //             return;
            //         }
            //     })
            // }

            // else {

            let { data: res } = await createMissions(finalObj)
            if (res) {
                setSelectedDoneElement({})
                setTimeAndDateObj({
                    stopAfter: 1,
                    stopOn: new Date(),
                    stopOnActive: true,
                    daysArr: [
                        {
                            id: '1',
                            day: 'SU',
                            selected: false
                        },
                        {
                            id: '2',
                            day: 'Mo',
                            selected: false
                        },
                        {
                            id: '3',
                            day: 'Tu',
                            selected: false
                        },
                        {
                            id: '4',
                            day: 'We',
                            selected: false
                        },
                        {
                            id: '5',
                            day: 'THU',
                            selected: false
                        },
                        {
                            id: '6',
                            day: 'Fr',
                            selected: false
                        },
                        {
                            id: '7',
                            day: 'Sa',
                            selected: false
                        },
                    ]

                })
                // setSaveModal(true)
                // setModalValue(res.message)
                setToggleModal(true)
                setMessage(res?.message)
            }
            // }
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


    const getMissionsForApprovalByKidIdFromDb = async () => {
        setLoading(true)
        try {
            let { data: res } = await getMissionsForApprovalByKidId(currentKid._id)
            console.log(JSON.stringify(res.data, null, 3), "response ******************************************************************************************************************************************************************************************************************************************")
            if (res.data) {
                setApprovalArr(res.data)
            }
        }
        catch (error) {
            // setToggleModal(true)
            //setMessage(error)
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



    const getMissionsCompletedByKidIdFromDb = async () => {
        setLoading(true)
        try {
            let { data: res } = await getMissionsCompletedByKidId(currentKid._id)
            console.log(JSON.stringify(res.data, null, 3), "response ******************************************************************************************************************************************************************************************************************************************")
            if (res.data) {
                setDoneArr(res.data)
            }
        }
        catch (error) {
            // setToggleModal(true)
            //setMessage(error)
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


    const handleKidMissionApprove = async (id, status) => {
        setLoading(true)
        try {
            console.log(status)
            let obj = {
                status
            }
            console.log(obj)
            let { data: res } = await KidMissionUpdate(id, obj)
            if (res.message) {
                // getUserMissionData()
                getMissionsForApprovalByKidIdFromDb()
                getMissionsCompletedByKidIdFromDb()
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


    const getAllData = async () => {

        getMissionsCompletedByKidIdFromDb()
        getMissionsForApprovalByKidIdFromDb()

        let currentTabValue = await getCurrentTabForMissions()
        if (currentTabValue) {

            setCurrentTab(parseInt(currentTabValue))
        }
        else {
            setCurrentTab(0)
        }
    }



    useEffect(() => {
        if (focused) {
            getAllData()
        }
    }, [focused])

    const Approved = () => {
        const navigation = useNavigation();

        const renderItem = ({ item, index }) => {
            console.log(JSON.stringify(item, null, 2), "item")
            return (
                <View style={[styles.listBorder, index == todoArr.length - 1 && { marginBottom: Spacing.MARGIN_20, }]}>
                    <Text style={[styles.listTitle]}>{item?.userMissionObj?.activityObj?.name}</Text>
                    <Text style={[styles.listSubTitle]}>{item?.userMissionObj?.categoryObj?.name}</Text>
                    <View style={[{ justifyContent: 'space-between' }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                                <View style={{ display: "flex", flexDirection: "column" }}>
                                    {
                                        item?.userMissionObj?.attributeArr?.map((el, index) => {
                                            return (
                                                <>
                                                    <Text style={[styles.listContain,]}>{el?.attributesObj?.name}  </Text>
                                                    <Text style={[styles.listContain,]}>{el?.coinsAmount} Coins - {el?.frequencyAmount} Frequency</Text>
                                                </>
                                            )
                                        })
                                    }

                                </View>
                                <View style={{ display: "flex", flexDirection: 'column' }}>
                                    <Text style={[styles.listInr]}>{item?.userMissionObj?.attributeArr?.reduce((acc, el) => acc + el?.coinsAmount, 0)} INR</Text>
                                    <View style={[commonStyle.flexRow]}>
                                        <TouchableOpacity onPress={() => handleKidMissionApprove(item?._id, KidMissionCompletionStatus.completed)}>
                                            <Check height={hp(3)} width={wp(6)} style={{ marginRight: Spacing.PADDING_7 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => navigation.navigate('Discuss', { data: item })}><Msg height={hp(3)} width={wp(6)} style={{ marginRight: Spacing.PADDING_7 }} /></TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleKidMissionApprove(item?._id, KidMissionCompletionStatus.rejected)}>
                                            <Cancel height={hp(3)} width={wp(6)} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {
                        item?.isStreakActive == false &&
                        <View>
                            {
                                item?.timeAndDateObj?.stopAfter &&
                                <Text style={[styles.listContain,]}>Stop After {item?.timeAndDateObj?.stopAfter} Day/s</Text>
                            }
                            {
                                item?.timeAndDateObj?.stopOn &&
                                <Text style={[styles.listContain,]}>Stop On {`${new Date(item?.timeAndDateObj?.stopOn).getDate()}/${new Date(item?.timeAndDateObj?.stopOn).getMonth() + 1}/${new Date(item?.timeAndDateObj?.stopOn).getFullYear()}`}</Text>
                            }
                        </View>
                    }
                </View>


            )
        }

        return (
            <View>
                <FlatList
                    data={approvalArr}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: Spacing.SIZE_300 }}
                    keyExtractor={(item, index) => index}
                    ListEmptyComponent={
                        <Text style={{ flex: 1, textAlign: "center" }}>No Data Found</Text>
                    }

                />
            </View>
        )
    }





    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const daysRenderItem = ({ item, index }) => {
        return (
            <View style={{ marginTop: Spacing.PADDING_5 }}>
                <TouchableOpacity onPress={() => handleDaySeletion(index)} style={{ backgroundColor: item.selected ? Colors.PRIMARY : Colors.WHITE, marginHorizontal: Spacing.PADDING_5, height: hp(3), width: wp(6), justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                    <Text style={{ color: item.selected ? Colors.WHITE : Colors.LIGHT_BLACK }}>{item.day}</Text>
                </TouchableOpacity>
            </View>
        )
    }


    const Dones = () => {
        const [doneModal, setDoneModal] = useState(false);
        const [selectedItemLocal, setSelectedItemLocal] = useState({});


        const handleDoneAccept = () => {
            setSelectedDoneElement(selectedItemLocal)
            if (selectedItemLocal.isStreakActive == false) {
                setAddVideoModal(true)
            }
            else {
                HandleReschedule()
            }

        }



        const renderItem = ({ item, index }) => {
            return (
                <View style={[styles.listBorder, index == todoArr.length - 1 && { marginBottom: Spacing.MARGIN_20, }]}>
                    <Text style={[styles.listTitle]}>{item?.activityObj?.name}</Text>
                    <Text style={[styles.listSubTitle]}>{item?.categoryObj?.name}</Text>
                    <View style={[{ justifyContent: 'space-between' }]}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                                <View style={{ display: "flex", flexDirection: "column" }}>
                                    {
                                        item?.attributeArr?.map((el, index) => {
                                            return (
                                                <Text style={[styles.listContain,]}>{el?.coinsAmount} {el?.attributesObj?.name}</Text>

                                            )
                                        })
                                    }
                                </View>
                                <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={[styles.listInr]}>{item?.attributeArr.reduce((acc, el) => acc + el?.coinsAmount, 0)} INR</Text>
                                    <Pressable onPress={() => { console.log("CLICKING DONE"); setDoneModal(true); setSelectedItemLocal(item) }}>
                                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                            <View style={[styles.btnView]}>
                                                <Text style={[commonStyle.btnText, { color: Colors.WHITE, fontSize: Typography.FONT_SIZE_12, paddingVertical: Spacing.PADDING_5, }]}>Reschedule</Text>
                                            </View>
                                        </LinearGradient>
                                    </Pressable>
                                </View>
                            </View>
                            {
                                item?.isStreakActive == false &&
                                <View>
                                    {
                                        item?.timeAndDateObj?.stopAfter &&
                                        <Text style={[styles.listContain,]}>Stop After {item?.timeAndDateObj?.stopAfter} Day/s</Text>
                                    }
                                    {
                                        item?.timeAndDateObj?.stopOn &&
                                        <Text style={[styles.listContain,]}>Stop On {`${new Date(item?.timeAndDateObj?.stopOn).getDate()}/${new Date(item?.timeAndDateObj?.stopOn).getMonth() + 1}/${new Date(item?.timeAndDateObj?.stopOn).getFullYear()}`}</Text>
                                    }
                                </View>
                            }
                            <Text style={[styles.listContain, { marginTop: 0, color: item.status == KidMissionCompletionStatus.rejected ? "red" : "green" }]}>{item.status}</Text>


                        </View>
                    </View>
                </View>

            )
        }


        return (
            <View>
                <FlatList
                    data={doneArr}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: Spacing.SIZE_300 }}
                    keyExtractor={(item, index) => `${index}`}
                    ListEmptyComponent={
                        <Text style={{ flex: 1, textAlign: "center" }}>No Data Found</Text>
                    }
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={doneModal}

                >
                    <View style={[commonStyle.modalBackground]}>
                        <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                                <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                            </LinearGradient>
                            <View style={{ width: '100%' }}>
                                <Text style={[styles.listTitle, { textAlign: 'center', color: Colors.LIGHT_BLACK, width: '90%', alignSelf: 'center', marginVertical: Spacing.MARGIN_30 }]}>Do you want to list this task <Text style={{ color: Colors.PRIMARY }}>To Do</Text> again?</Text>
                                {/* <Text style={[styles.listTitle, { textAlign: 'center', color: Colors.LIGHT_BLACK, width: '90%', alignSelf: 'center', marginVertical: Spacing.MARGIN_30 }]}>{JSON.stringify(selectedDoneElement)}</Text> */}
                            </View>

                            <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_25, }]}>
                                <TouchableOpacity style={{ width: '40%' }} onPress={() => handleDoneAccept()} >
                                    {/* <TouchableOpacity style={{ width: '40%' }} onPress={() => { setAddVideoModal(true) }} > */}
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]}>
                                        <View style={[styles.btnView]}>
                                            <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Yes</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setDoneModal(false)} style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }} >
                                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                        <View style={[styles.btnView, { width: '99%' }]}>
                                            <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>No</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <TouchableOpacity onPress={() => setDoneModal(false)}>
                            <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ImageBackground source={images.backGround} resizeMode='contain' style={[commonStyle.fullSize]}>
                <Header logo={true} />
                <Text style={[commonStyle.title, { color: '#353535', marginTop: Spacing.MARGIN_20, fontSize: Typography.FONT_SIZE_30 }]}>Missions</Text>

                <View style={{ paddingHorizontal: Spacing.MARGIN_20 }}>
                    <View style={[commonStyle.flexRow, styles.topView]}>

                        <TouchableOpacity onPress={() => approved()} style={{ borderColor: currentTab == 0 ? Colors.PRIMARY : Colors.WHITE, borderWidth: 2, borderRadius: 20, }}>
                            <View style={[commonStyle.flexRow, { alignSelf: 'center', paddingHorizontal: Spacing.MARGIN_10, }]}>
                                <Text style={[styles.topText, { marginRight: Spacing.PADDING_7 }]}>Approval</Text>
                                <Approve height={hp(4)} width={wp(5)} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => todos()} style={{ borderColor: currentTab == 1 ? Colors.PRIMARY : Colors.WHITE, borderWidth: 2, borderRadius: 20, }}>
                            <View style={[commonStyle.flexRow, { alignSelf: 'center', paddingHorizontal: Spacing.MARGIN_10, }]}>
                                <Text style={[styles.topText, { marginRight: Spacing.PADDING_7 }]}>Todo</Text>
                                <Todo height={hp(4)} width={wp(5)} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dones()} style={{ borderColor: currentTab == 2 ? Colors.PRIMARY : Colors.WHITE, borderWidth: 2, borderRadius: 20, }}>
                            <View style={[commonStyle.flexRow, { alignSelf: 'center', paddingHorizontal: Spacing.MARGIN_10, }]}>
                                <Text style={[styles.topText, { marginRight: Spacing.PADDING_7 }]}>Done</Text>
                                <Tick height={hp(4)} width={wp(5)} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {currentTab == 1 && (
                        <MissionTodos />
                    )}
                    {currentTab == 0 && (
                        <Approved />
                    )}
                    {currentTab == 2 && (
                        <Dones />
                    )}


                    <Modal animationType="slide" transparent={true} visible={addVideoModal}>
                        <View style={[commonStyle.modalBackground]}>
                            <View
                                style={[
                                    commonStyle.whiteBg,
                                    { backgroundColor: Colors.OFF_YELLOW },
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
                                <View
                                    style={{
                                        paddingHorizontal: 20
                                    }}>
                                    <Text style={[styles.title, { marginTop: Spacing.MARGIN_30 }]}>
                                        Repeat On
                                    </Text>
                                    {
                                        timeAndDateObj &&
                                        <FlatList
                                            data={timeAndDateObj.daysArr}
                                            renderItem={daysRenderItem}
                                            contentContainerStyle={{ justifyContent: "space-between", display: "flex", flexDirection: "row", flex: 1, paddingRight: 20 }}
                                            horizontal={true}
                                            keyExtractor={(item, index) => index}
                                        />
                                    }
                                    <Text
                                        style={[styles.title, { marginVertical: Spacing.MARGIN_10 }]}>
                                        Ends
                                    </Text>


                                    <View style={[commonStyle.flexRow, { justifyContent: "space-between", paddingRight: 15, marginBottom: 15 }]}>

                                        <TouchableOpacity
                                            onPress={() => setTimeAndDateObj(previousState => {
                                                previousState.stopOnActive = true
                                                return { ...previousState }
                                            })}
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
                                                        { backgroundColor: timeAndDateObj.stopOnActive ? Colors.WHITE : "transparent", width: '99%', borderRadius: 27 },
                                                    ]}>
                                                    <Text
                                                        style={[commonStyle.btnText, { color: timeAndDateObj.stopOnActive ? "black" : Colors.WHITE }]}>
                                                        On
                                                    </Text>
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => setTimeAndDateObj(previousState => {
                                                previousState.stopOnActive = false
                                                return { ...previousState }
                                            })}
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
                                                        { backgroundColor: !timeAndDateObj.stopOnActive ? Colors.WHITE : "transparent", width: '99%', borderRadius: 27 },
                                                    ]}>
                                                    <Text
                                                        style={[commonStyle.btnText, { color: !timeAndDateObj.stopOnActive ? "black" : Colors.WHITE }]}>
                                                        After
                                                    </Text>
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>


                                    </View>
                                    {
                                        timeAndDateObj.stopOnActive ?
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
                                                    { width: "100%" },
                                                ]}>
                                                <View
                                                    style={[
                                                        styles.selectWhiteBtn,
                                                        { width: "100%" },
                                                    ]}>

                                                    <DatePicker
                                                        mode="date"
                                                        open={true}
                                                        date={new Date(timeAndDateObj?.stopOn)}
                                                        minimumDate={new Date()}
                                                        style={{ width: wp(55), fontSize: 15, backgroundColor: "white", borderRadius: 10, marginLeft: 15, }}
                                                        onDateChange={(date) => {
                                                            handleOnDateSet(date)
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
                                                    { marginLeft: Spacing.PADDING_7 },
                                                ]}>
                                                <TextInput
                                                    style={[
                                                        styles.selectWhiteBtn,
                                                        { justifyContent: 'space-between', width: wp(58) },
                                                    ]} value={`${timeAndDateObj?.stopAfter}`} maxLength={3} keyboardType='number-pad' onChangeText={(val) => handleAfteCountSet(val[0] == 0 ? 1 : val)} />

                                            </LinearGradient>

                                    }
                                </View>
                                <View
                                    style={[
                                        commonStyle.flexRow,
                                        { alignSelf: 'center', marginVertical: Spacing.MARGIN_25 },
                                    ]}>
                                    <TouchableOpacity
                                        onPress={() => setAddVideoModal(false)}
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
                                            // setAddVideoModal(false);
                                            //   handleDateAndTimeSave();
                                            setAddVideoModal(false)
                                            HandleReschedule()
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
                            </View>
                            <TouchableOpacity onPress={() => setAddVideoModal(false)}>
                                <AntDesign
                                    name={ANTDESIGN.CIRCEL_CLOSE}
                                    color={Colors.WHITE}
                                    size={Spacing.SIZE_40}
                                />
                            </TouchableOpacity>
                        </View>
                    </Modal>

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
    topText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.PRIMARY,
        paddingVertical: Spacing.PADDING_7,
        textAlign: 'center',
    },
    listBorder: {
        padding: Spacing.MARGIN_15,
        marginHorizontal: Spacing.PADDING_2,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: Spacing.MARGIN_15,
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
    selectWhiteBtn: {
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.PADDING_7,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
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
    listContain: {
        color: '#747474',
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '600',
        marginTop: Spacing.PADDING_3
    },
    listInr: {
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_25,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '700',
        marginRight: Spacing.MARGIN_20
    },
    btnView: {
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 1,
    },
    linearSelect: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1,
        alignSelf: 'center',
        borderRadius: 15,
    },
})