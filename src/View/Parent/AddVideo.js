import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LoaderContext, toggleModalContext } from '../../../App';
import { getDecodedToken } from '../../api/user';
import { addVideosInPlaylist } from '../../api/UserPlaylist';
import Header from '../../Component/Header';
import { kidContext } from '../../Context/CurrentKidContext';
import Add from '../../images/svg/parentsvg/add';
import Minus from '../../images/svg/parentsvg/minus';
import Down from '../../images/svg/parentsvg/down';
import MasterData from '../../MasterData';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { ANTDESIGN } from '../../Styles/theme/Icons';

export default function AddVideo(props) {
    const navigation = useNavigation();
    const [addVideoModal, setAddVideoModal] = useState(false);
    const [rewardcount, setRewardCount] = useState("1");
    const [bonuscount, setBonusCount] = useState("0");
    const [stopAfter, setStopAfter] = useState(1);
    const [stopOn, setStopOn] = useState(new Date());
    const [daysArr, setDaysArr] = useState([]);
    const [videoHeading, setVideoHeading] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [stopOnActive, setStopOnActive] = useState(true);

    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [loading, setLoading] = useContext(LoaderContext);


    // const [modalValue, setModalValue] = useState('');
    //  const [alertModal, setAlertModal] = useState(false)
    // const [mValue, setmValue] = useContext(modalValueContext);
    // const [mFunction, setmFunction] = useContext(modalFunctionContext);
    const rewardAdd = () => {
        let tempCount = parseInt(rewardcount) + 1
        tempCount = tempCount ? tempCount : 1
        setRewardCount(`${tempCount}`)
    }
    const rewardMinus = () => {
        if (rewardcount > 1) {

            let tempCount = parseInt(rewardcount) - 1
            tempCount = tempCount ? tempCount : 2
            setRewardCount(`${tempCount}`)
        }
    }


    const bonusAdd = () => {
        let tempCount = parseInt(bonuscount) + 1
        tempCount = tempCount ? tempCount : 1
        setBonusCount(`${tempCount}`)
    }
    const bonusMinus = () => {
        if (bonuscount > 0) {
            let tempCount = parseInt(bonuscount) - 1
            tempCount = tempCount ? tempCount : 0
            setBonusCount(`${tempCount}`)
        }
    }


    const onBuffer = () => {

    }
    const videoError = () => {

    }


    const handleDaySeletion = (index) => {
        let tempData = data.map((el, i) => {
            if (i == index) {
                el.selected = !el.selected
            }
            return el
        })
        setData(tempData)
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

    const [disableChecked, setDisableChecked] = useState(false);
    const disableCheck = () => {
        setDisableChecked(!disableChecked)
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


    const renderItem = ({ item }) => {
        return (
            <View style={{ marginTop: Spacing.PADDING_5, }}>
                <TouchableOpacity style={{ backgroundColor: Colors.WHITE, marginHorizontal: Spacing.PADDING_5, height: hp(3), width: wp(6), justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                    <Text>{item.day}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const [modal, setModal] = useState(false);
    const [after, setAfter] = useState('');
    const afterData = MasterData.frequency

    const afterRenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { setAfter(item.name); setModal(false); setAddVideoModal(true) }} style={[commonStyle.listdownView, { borderColor: '#DEDEDE', backgroundColor: Colors.WHITE }]}>
                <Text style={[commonStyle.listdownTxt]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }


    const addNewVideo = async () => {
        setLoading(true)
        let decoded = await getDecodedToken()
        try {
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
                playlistGroupId: props.route.params.data,
                videoHeading,
                videoUrl,
                timeAndDateObj: {
                    daysArr: [...data]
                },
                reward: parseInt(rewardCount()),
                bonus: parseInt(Number(bonuscount))
            }
            // console.log(selectedItem.stopOnActive, "selectedItem.stopOnActive")
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
            if (bonuscount > 9999) {
                setToggleModal(true)
                setMessage("Maximum 9999 is possible as bonus")
                setLoading(false)
                return;
            }
            if (rewardcount > 9999) {
                setToggleModal(true)
                setMessage("Maximum 9999 is possible as reward")
                setLoading(false)
                return;
            }
            if (rewardcount <= 0) {
                setToggleModal(true)
                setMessage("Please add reward")
                setLoading(false)
                return;
            }

            // if (!disableChecked) {
            // if (stopOnActive && new Date(new Date(obj.timeAndDateObj.stopOn).getFullYear(), new Date(obj.timeAndDateObj.stopOn).getMonth() + 1, new Date(obj.timeAndDateObj.stopOn).getDate(), 0, 0).getTime() == new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), 0, 0)) {
            //     setToggleModal(true)
            //     setMessage("Please add 'Stop On' to set Time and Date")
            //     setLoading(false)
            //     return;

            // }
            else if (!stopOnActive && obj.timeAndDateObj.stopAfter == 0) {
                setToggleModal(true)
                setMessage("Please add 'Stop After' frequency to set Time and Date")
                setLoading(false)
                return;

            }
            else if (videoHeading == "") {
                setToggleModal(true)
                setMessage("Please add video heading before adding a Video")
                setLoading(false)
                return;

            }
            else if (videoUrl == "") {
                setToggleModal(true)
                setMessage("Please add video url before adding a Video")
                setLoading(false)
                return;

            }
            else {
                const { data: res } = await addVideosInPlaylist(obj);
                console.log(res)
                if (res.success) {
                    setLoading(false)
                    setToggleModal(true)
                    setMessage(res.message)
                    navigation.goBack()
                }
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
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true} />
            <ScrollView contentContainerStyle={{ padding: Spacing.PADDING_15 }}>
                <View style={[commonStyle.flexRow, { alignSelf: 'center' }]}>
                    <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_25, color: '#353535' }]}>Add Video</Text>
                </View>
                <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_25 }]}>
                    <TextInput placeholder='Enter Heading' onChangeText={(val) => setVideoHeading(val)} style={[styles.input]} />
                    {/* <Plus height={hp(4)} width={wp(7)} style={{ marginLeft: Spacing.PADDING_7 }} /> */}
                </View>
                <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_25 }]}>
                    <TextInput placeholder='Enter Video link' onChangeText={(val) => setVideoUrl(val)} style={[styles.input]} />
                    {/* <Plus height={hp(4)} width={wp(7)} style={{ marginLeft: Spacing.PADDING_7 }} /> */}
                </View>
                {/* <Video source={require('../../images/sampleVideo.mp4')}
                    onBuffer={onBuffer}
                    onError={videoError}
                    resizeMode="cover"
                    style={styles.video}
                    paused={false}
                /> */}

                {/* <Text style={[styles.title, { marginTop: Spacing.MARGIN_5 }]}>Video Title</Text>
                <Text style={[styles.contain]}>Duration</Text>
 */}

                <Text style={[styles.title, { marginTop: Spacing.MARGIN_20 }]}>Reminder Time</Text>
                <View style={[commonStyle.flexRow, { justifyContent: 'flex-start' }]}>
                    {/* <View style={[commonStyle.flexRow]}>
                        <Text style={[styles.contain]}>Disable Date</Text>
                        <CheckBox
                            onClick={() => disableCheck()}
                            isChecked={disableChecked}
                        />
                    </View> */}
                    {/* <View style={[commonStyle.flexRow]}> */}
                    {/* <Text style={[styles.contain]}>Time and Date</Text> */}
                    <TouchableOpacity onPress={() => setAddVideoModal(true)}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearSelect, { minWidth: wp(59) }]} >
                            <View style={[styles.selectWhiteBtn,]}>
                                <Text style={{ fontSize: Typography.FONT_SIZE_10, fontFamily: 'Montserrat-SemiBold', color: '#9A9A9A' }}>Select Time and Date</Text>
                                <Down height={hp(4)} width={wp(4)} style={{ marginLeft: Spacing.PADDING_7 }} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    {/* </View> */}
                </View>
                <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_20 }]}>
                    <Text style={[styles.title,]}>Reward</Text>
                    <Text style={[styles.redTxt]}>(Upon Completion)</Text>
                </View>
                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearAdd]} >
                    <TouchableOpacity onPress={() => rewardAdd()} style={[styles.whiteBtn, { borderTopLeftRadius: 7, borderBottomLeftRadius: 7 }]}>
                        <Add height={hp(4)} width={wp(5)} />
                    </TouchableOpacity>
                    <View style={[styles.whiteBtn, { marginHorizontal: Spacing.PADDING_2, width: wp(12) }]}>
                        {/* <Text style={{ fontSize: Typography.FONT_SIZE_17, fontFamily: 'Montserrat-SemiBold', color: '#747474' }}>{rewardcount}</Text> */}
                        <TextInput
                            value={`${rewardcount}`}
                            onChangeText={e => setRewardCount(e ? e == `0` ? `1` : e : "1")}
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

                <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_20 }]}>
                    <Text style={[styles.title,]}>Bonus</Text>
                    <Text style={[styles.redTxt]}>(Did it reflect in your kid's learning?)</Text>
                </View>
                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearAdd]} >
                    <TouchableOpacity onPress={() => bonusAdd()} style={[styles.whiteBtn, { borderTopLeftRadius: 7, borderBottomLeftRadius: 7 }]}>
                        <Add height={hp(4)} width={wp(5)} />
                    </TouchableOpacity>
                    <View style={[styles.whiteBtn, { marginHorizontal: Spacing.PADDING_2, width: wp(12) }]}>
                        <TextInput
                            value={bonuscount}
                            onChangeText={e => setBonusCount(e ? e : "0")}
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
                <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_30 }]}>
                    <TouchableOpacity style={{ width: '50%', marginLeft: Spacing.MARGIN_10 }} onPress={() => addNewVideo()}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn, { padding: 1 }]} >
                            <View style={[styles.btnView, { width: '99%' }]}>
                                <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Save</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={addVideoModal}

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
                                    paddingHorizontal: 20
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
                                            ]}>
                                            <View
                                                style={[
                                                    styles.selectWhiteBtn,
                                                    {
                                                        width: "100%",
                                                        paddingHorizontal: 0,
                                                        paddingVertical: 10
                                                    }
                                                ]}>

                                                <DatePicker
                                                    mode="date"
                                                    open={true}
                                                    date={stopOn}
                                                    minimumDate={new Date()}
                                                    style={{ flex: 1, fontSize: 15, backgroundColor: "white", borderRadius: 10, marginLeft: 15, }}
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
                                                ]} value={`${stopAfter}`} maxLength={3} keyboardType='number-pad' onChangeText={(val) => { setStopAfter(val[0] == 0 ? 1 : val) }} />

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
                                        setAddVideoModal(false);
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
                    <TouchableOpacity onPress={() => setAddVideoModal(false)}>
                        <AntDesign
                            name={ANTDESIGN.CIRCEL_CLOSE}
                            color={Colors.WHITE}
                            size={Spacing.SIZE_40}
                        />
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
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
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        paddingHorizontal: Spacing.PADDING_15,
        width: '90%',
        height: hp(6),
        borderRadius: 20,
        borderRadius: 30,
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
    flexRow: {
        display: "flex",
        flexDirection: "row"
    },
    video: {
        borderWidth: 1,
        marginTop: Spacing.PADDING_15,
        borderColor: Colors.WHITE,
        borderRadius: 5,
        width: '100%',
        height: hp(27),
        alignItems: 'center',
        backgroundColor: Colors.WHITE
    },
    title: {
        fontSize: Typography.FONT_SIZE_18,
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.LIGHT_BLACK,
    },
    contain: {
        fontSize: Typography.FONT_SIZE_13,
        color: Colors.LIGHT_BLACK,
        fontFamily: 'Montserrat-Regular',
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
    redTxt: {
        color: Colors.PRIMARY,
        marginLeft: Spacing.PADDING_7,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_10,
    },
    linearAdd: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1,
        width: wp(27.7),
        marginTop: Spacing.PADDING_4,
        borderRadius: 7,
    },
    whiteBtn: {
        height: hp(6.1),
        width: wp(7),
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnView: {
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
    },
})