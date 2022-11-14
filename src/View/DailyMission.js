import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, FlatList, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import Mission from '../images/svg/mission'
import Money from '../images/svg/money';
import Trunk from '../images/svg/vl2';
import Clock from '../images/svg/clock';
import Left from '../images/svg/vl1';
import { ANTDESIGN } from '../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { images } from '../Constant/background';
import Daily from '../images/svg/dailyMission';
import { LoaderContext, toggleModalContext } from '../../App';
import { getAllDailyMission } from '../api/Missions';
import CountDown from 'react-native-countdown-component';
import { getDecodedToken } from '../api/user';
import { kidMissionCreate, KidMissionUpdate } from '../api/kidMissionCompletion';
import { KidMissionCompletionStatus } from '../api/utils/StatusForKidMissionCompletionStatus';
import MissionSubmit from './MissionSubmit';

export default function DailyMission(props) {
    const focused = useIsFocused();
    const navigation = useNavigation();
    const [loading, setLoading] = useContext(LoaderContext);
    const [missionArr, setMissionArr] = useState([]);
    const [missionConfirmationModal, setMissionConfirmationModal] = useState(false)
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [currentPopUpId, setCurrentPopUpId] = useState("");
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;

    const handleCreate = async (id) => {
        setLoading(true)
        try {
            setMissionConfirmationModal(false)
            let decoded = await getDecodedToken();
            let obj = {
                userMissionId: currentPopUpId,
                kidId: decoded.userId
            }
            let { data: res } = await kidMissionCreate(obj);
            
            if (res.message) {
                getAllMission()
                setToggleModal(true)
                setMessage(res.message)
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

    const handleReject = async (id) => {
        setLoading(true)
        try {

            let obj = {
                status: KidMissionCompletionStatus.rejected
            }
            let { data: res } = await KidMissionUpdate(id, obj)
            if (res.message) {
                getAllMission()
                setToggleModal(true)
                setMessage(res.message)
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

    const getAllMission = async () => {
        setLoading(true)
        try {
            let { data: res } = await getAllDailyMission();
            console.log(res.data, 'response')
            if (res.data) {

                let tempArr = res?.data?.map(el => {
                    let dayEnd = new Date();
                    dayEnd = new Date(dayEnd.getFullYear(), dayEnd.getMonth(), dayEnd.getDate() + 1, 0, 0);
                    let currenttime = new Date();
                    let dif = (currenttime.getTime() - dayEnd.getTime()) / 1000;
                    el.timeRemaining = dif;
                    console.log(dif)
                    return el
                })

                console.log(tempArr, "setMissionArr")


                setMissionArr([...tempArr])
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

    useEffect(() => {
        if (focused)
            getAllMission();
    }, [focused])


    const renderItem = ({ item }) => {

        const submitItem = (id) => {
            setCurrentPopUpId(id)
            setMissionConfirmationModal(true);
        }

        // const 
        return (
            <View style={{ marginHorizontal: Spacing.MARGIN_10, marginBottom: Spacing.MARGIN_30 }}>
                <View style={[styles.listingView]}>
                    <Text style={[commonStyle.title, { color: Colors.PRIMARY, fontSize: Typography.FONT_SIZE_20 }]}>{item?.activityObj?.name}</Text>
                    <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_10 }]}>
                        <Clock height={hp(4)} width={wp(6)} style={{ marginRight: Spacing.MARGIN_10 }} />
                        {/* <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK, fontSize: Typography.FONT_SIZE_16 }]}>gjj</Text> */}
                        <View style={{ marginLeft: -hp(1.7) }}>
                            <CountDown
                                until={Math.abs(item.timeRemaining)}
                                digitStyle={{ color: '#fff', fontFamily: 'Cookies' }}
                                digitTxtStyle={{ color: Colors.LIGHT_BLACK, margin: 0, padding: 0, fontFamily: 'Cookies', fontSize: 16, }}
                                timeToShow={['H', 'M', 'S']}
                                timeLabels={{ m: '', s: '' }}
                                size={9}
                                separatorStyle={{ color: Colors.LIGHT_BLACK }}
                                showSeparator={true}
                            />
                        </View>
                    </View>
                    <View style={[{ marginTop: Spacing.PADDING_7, justifyContent: 'space-between' }]}>
                        {item?.attributeArr.map((el) => {

                            return (
                                <View key={el._id} style={{ display: "flex", flexDirection: "column" }}>
                                    <Text>{el?.name}</Text>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        {
                                            el?.frequency == true &&
                                            <View style={[commonStyle.flexRow, { width: '35%' }]}>
                                                <Left height={hp(5)} width={wp(6)} />
                                                <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK, fontSize: Typography.FONT_SIZE_16, }]}>{el?.frequencyAmount} INR</Text>
                                            </View>
                                        }
                                        {
                                            el?.willAddCoins == true &&
                                            <View style={[commonStyle.flexRow, { width: '35%', marginRight: Spacing.MARGIN_30 }]}>
                                                <Trunk height={hp(8)} width={wp(6)} />
                                                <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK, fontSize: Typography.FONT_SIZE_16 }]}>{el?.coinsAmount} INR</Text>
                                            </View>
                                        }
                                    </View>
                                </View>
                            )
                        }
                        )}

                        {/* 
                        {item.attributeArr.map((el) => el.willAddCoins == false) && (
                            
                        )} */}
                    </View>

                    <View style={[commonStyle.flexRow, { marginTop: Spacing.SCALE_12, justifyContent: "flex-end" }]}>
                        {/* <Image source={require('../images/award.png')} resizeMode='contain' style={[styles.awardImg]} /> */}
                        <View style={{ flexDirection: 'column', alignSelf: 'center', marginLeft: Spacing.MARGIN_50 }}>
                            <Text style={[commonStyle.title, { color: Colors.PRIMARY, fontSize: Typography.FONT_SIZE_25, textAlign: 'center', }]}>{item?.attributeArr.reduce((acc, el) => acc + el?.frequencyAmount, 0) + item?.attributeArr.reduce((acc, el) => acc + el?.coinsAmount, 0)} INR</Text>
                            <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_5 }]}>
                                <TouchableOpacity onPress={() => submitItem(item?._id)}>
                                    <AntDesign name={ANTDESIGN.CHECK} size={Spacing.MARGIN_25} color={'#C9E165'} style={{ marginRight: Spacing.MARGIN_20, marginLeft: Spacing.PADDING_2 }} />
                                </TouchableOpacity>
                                {/* <TouchableOpacity onPress={() => handleReject(item?._id)}>
                                    <AntDesign name={ANTDESIGN.CLOSE} size={Spacing.MARGIN_25} color={'red'} />
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    const ConfirmationModel = ({ show }) => {
        return (
            <View style={{ paddingHorizontal: Spacing.MARGIN_20 }} >
                <Modal animationType="slide" transparent={true} visible={show}>
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
                                            source={require('../images/modalTeady.png')}
                                            resizeMode="contain"
                                            style={[commonStyle.modalTeady]}
                                        />
                                    </LinearGradient>
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
        )
    }
    return (
        <View style={[styles.container]}>
            <ImageBackground source={images.backGround} style={[commonStyle.fullSize]}>
                <ScrollView >
                    <View style={{ alignSelf: 'center', marginTop: Spacing.MARGIN_50 }}>
                        <Image source={require('../images/dailyMission.png')} resizeMode='cover' styles={[styles.img]} />
                        {/* <Daily  height={hp(30)} width={wp('100%')} strokeWidth=".5" style={{backgroundColor:'red'}}/> */}

                    </View>
                    <Text style={[commonStyle.title, { color: Colors.PRIMARY, marginTop: Spacing.MARGIN_30 }]}>Daily Missions</Text>
                    {/* Tabs */}
                    <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_20 }]}>
                        <TouchableOpacity onPress={() => navigation.navigate('MissionBonus')} style={[styles.btnBorder, { marginRight: Spacing.MARGIN_10, borderColor: Colors.SECONDARY }]}>
                            <View style={{ backgroundColor: '#C9E165', borderRadius: 10, }}>
                                <Trunk height={hp(5)} width={wp(18)} style={{ alignSelf: 'center', marginVertical: Spacing.PADDING_2 }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('MissionStreak')} style={[styles.btnBorder, { marginRight: Spacing.MARGIN_10, borderColor: Colors.PRIMARY }]}>
                            <View style={{ backgroundColor: '#A57296', borderRadius: 10, }}>
                                <Mission height={hp(4)} width={wp(14)} style={{ alignSelf: 'center', marginVertical: Spacing.MARGIN_5 }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('TodayMission')} style={[styles.btnBorder, { borderColor: '#785BDF' }]}>
                            <View style={{ backgroundColor: Colors.SECONDARY, borderRadius: 10, }}>
                                <Money height={hp(4)} width={wp(16)} style={{ alignSelf: 'center', marginVertical: Spacing.PADDING_5 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal={true}
                        data={missionArr}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        ListEmptyComponent={
                            <Text style={[commonStyle.title, { color: "grey", fontSize: 17, marginLeft: 15 }]}>No Missions Found for today</Text>
                        }
                        contentContainerStyle={{ paddingBottom: Spacing.MARGIN_10 }}
                        showsHorizontalScrollIndicator={false}
                    />
                </ScrollView>
                {/* <ConfirmationModel show={true} /> */}
                <MissionSubmit show={missionConfirmationModal} close={() => setMissionConfirmationModal(false)} confirmation={() => handleCreate()} />
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1
    },
    img: {
        height: hp(20),
        width: wp('60%'),
    },
    btnBorder: {
        width: '30%',
        borderWidth: 2,
        borderRadius: 10,
        padding: Spacing.PADDING_3
    },
    listingView: {
        borderWidth: 1,
        borderColor: '#50505040',
        borderRadius: 10,
        backgroundColor: Colors.WHITE,
        padding: Spacing.MARGIN_10,
        width: wp(70),
    },
    awardImg: {
        height: hp(12),
        width: wp(22),
    },
})