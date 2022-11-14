import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, Modal, TextInput, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../../Component/Header';
import Add from '../../images/svg/parentsvg/add';
import Down from '../../images/svg/parentsvg/down';
import Minus from '../../images/svg/parentsvg/minus';
import Time from '../../images/svg/parentsvg/screenTime';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import MasterData from '../../MasterData';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import { LoaderContext, toggleModalContext } from '../../../App';
import { kidContext } from '../../Context/CurrentKidContext';
import { getDecodedToken } from '../../api/user';
import { setTimeOut } from '../../api/timeOut';
import { PRIMARY, WHITE } from '../../Styles/theme/Colors';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../images/svg/logo';
import Back from '../../images/svg/parentsvg/back';

export default function ScreenTime() {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [time, setTime] = useState('');
    const [timeModal, setTimeModal] = useState(false);
    const timeData = MasterData.time;
    const [count, setCount] = useState('0');

    const [loading, setLoading] = useContext(LoaderContext);

    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [currentKid, setCurrentKid] = useContext(kidContext);


    const add = () => {
        let tempCount = parseInt(count) + 1
        setCount(`${tempCount}`)
    }
    const minus = () => {
        if (count > 0) {
            let tempCount = parseInt(count) - 1
            setCount(`${tempCount}`)
        }
    }


    const handleSubmit = async () => {
        setLoading(true)
        try {
            parentId = await getDecodedToken()
            let obj = {
                time: count,
                parentId: parentId.userId,
                kidId: currentKid._id,
                isActive: isEnabled,
            }

            // console.log(JSON.stringify(obj, null, 2), 'obj')
            let res = await setTimeOut(obj)
            // console.log(res.data.message, 'response')
            if (res.data) {
                setToggleModal(true)
                setMessage(res?.data?.message)
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

    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            {/* <Header logo={true} /> */}
            <View style={[styles.topView]}>
                <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Back height={hp(5)} width={wp(8)} />
                    </TouchableOpacity>
                    <Logo height={hp(6)} width={wp(10)} />
                </View>
            </View>

            <ScrollView>
                <Switch
                    trackColor={{ false: "#767577", true: PRIMARY }}
                    thumbColor={isEnabled ? WHITE : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ marginTop: hp(3), marginBottom: -hp(7) }}
                />
                <Time height={hp(24)} width={wp(24)} style={{ alignSelf: 'center', marginTop: Spacing.MARGIN_50 }} />
                <Text style={[styles.head]}>Screen Time</Text>
                <Text style={[styles.contain]}>We care  for your kid's digital well-being. Screen Time will help your kid to move around after the default screen time. Change it anytime.</Text>
                <Text style={[styles.redTxt]}>Default Screen Time</Text>
                <View style={[commonStyle.flexRow, { alignSelf: 'center' }]}>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearAdd]} >

                        <TouchableOpacity onPress={() => add()} style={[styles.whiteBtn, { borderTopLeftRadius: 7, borderBottomLeftRadius: 7 }]}>
                            <Add height={hp(4)} width={wp(5)} />
                        </TouchableOpacity>
                        <View style={[styles.whiteBtn, { marginHorizontal: Spacing.PADDING_2, width: wp(15) }]}>

                            {/* <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: 'Montserrat-SemiBold', color: '#747474' }}>{count}</Text> */}

                            <TextInput
                                value={count}
                                onChangeText={e => setCount(e)}
                                maxLength={3}
                                keyboardType="number-pad"
                                style={{
                                    fontSize: Typography.FONT_SIZE_17,
                                    fontFamily: 'Montserrat-SemiBold',
                                    color: '#747474',
                                }}
                            />

                        </View>

                        <TouchableOpacity onPress={() => minus()} style={[styles.whiteBtn, { borderBottomRightRadius: 7, borderTopRightRadius: 7 }]}>
                            <Minus height={hp(4)} width={wp(5)} />
                        </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearAdd, { marginLeft: Spacing.MARGIN_20 }]} >


                        <View style={[styles.whiteBtn, { width: wp(20), borderRadius: 7, flexDirection: 'row', alignItems: 'center' }]}>

                            {/* {time == '' && ( */}
                            <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: 'Montserrat-SemiBold', color: '#747474' }}>Mins</Text>

                            {/* <Text style={{ fontSize: Typography.FONT_SIZE_14, fontFamily: 'Montserrat-SemiBold', color: '#747474' }}>{time}</Text>
                            <TouchableOpacity onPress={() => setTimeModal(true)}>
                                <Down height={hp(4)} width={wp(4)} style={{ marginLeft: Spacing.MARGIN_10 }} />
                            </TouchableOpacity> */}
                        </View>
                    </LinearGradient>
                </View>

                <TouchableOpacity style={{ marginTop: Spacing.MARGIN_20, marginHorizontal: Spacing.MARGIN_15 }} onPress={() => handleSubmit()}>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                        <Text style={[commonStyle.btnText]}>Save</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={timeModal}
            >
                <View style={[commonStyle.dopDownModal,]}>
                    <View style={[commonStyle.modalWhiteBg]}>
                        <FlatList
                            data={timeData}
                            renderItem={timeRenderItem}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setTimeModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>
                </View>
            </Modal> */}
        </View>
    )
}
const styles = StyleSheet.create({
    head: {
        textAlign: 'center',
        marginTop: Spacing.MARGIN_20,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_20,
        color: Colors.LIGHT_BLACK
    },
    contain: {
        width: '95%',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: Typography.FONT_SIZE_18,
        marginTop: Spacing.MARGIN_20,
        fontFamily: 'Montserrat-Regular',
    },
    redTxt: {
        color: Colors.PRIMARY,
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_14,
        marginTop: Spacing.MARGIN_20
    },
    linearAdd: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        alignSelf: 'center',
        borderRadius: 7,
        marginTop: Spacing.MARGIN_20
    },
    whiteBtn: {
        height: hp(6.1),
        width: wp(10),
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topView: {
        backgroundColor: Colors.WHITE,
        padding: Spacing.MARGIN_5,
        paddingHorizontal: Spacing.MARGIN_15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    }
})