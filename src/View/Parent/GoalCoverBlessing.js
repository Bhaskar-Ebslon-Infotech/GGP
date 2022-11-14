import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, ScrollView, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import CommonHeader from '../../Component/Header';
import Add from '../../images/svg/parentsvg/add';
import Minus from '../../images/svg/parentsvg/minus';
import { kidContext } from '../../Context/CurrentKidContext';
import { LoaderContext, toggleModalContext } from '../../../App';
import { addMoneyTokidWallet } from '../../api/wallet';
import { getKidWalletDataFromParent } from '../../api/user';
export default function GoalCoverBlessing() {
    const focused = useIsFocused()
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const navigation = useNavigation();
    const [kidObj, setKidObj] = useState({});
    const [count, setCount] = useState('0');

    const add = () => {
        let tempCount = parseInt(count) + 1
        setCount(`${tempCount}`)
    }
    const minus = () => {
        if (parseInt(count) - 1 > 0) {
            let tempCount = parseInt(count) - 1
            setCount(`${tempCount}`)
        }
    }


    const HandleSendMoneyToChild = async () => {
        setLoading(true)
        try {
            if (count == "0") {
                alert("Please Add amount more than 0")
            }
            else {
                let obj = { amount: count }
                let { data: res } = await addMoneyTokidWallet(currentKid._id, obj);
                if (res.message) {
                    setToggleModal(true)
                    setMessage(res.message)
                    getUserData()
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



    const getUserData = async () => {
        setLoading(true)
        try {
            let { data: res } = await getKidWalletDataFromParent(currentKid._id);
            if (res.data) {
                setKidObj(res.data)
                console.log(JSON.stringify(res.data, null, 2), "user Obj")
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
        if (focused) {
            getUserData()
        }
    }, [focused])

    const handleValueEnter = (e) => {
        console.log(e)
        let value = `${e}`.replace("-", "1")
        value = `${value}`.replace(',', '1')
        value = `${value}`.replace('.', '1')
        value = `${value}`.replace(' ', '1')
        setCount(value)
    }

    return (

        <View style={{ backgroundColor: Colors.WHITE, flex: 1, }}>
            <CommonHeader logo={true} />
            <ScrollView>
                <ImageBackground source={require('../../images/bg2.png')} resizeMode='cover' style={[commonStyle.fullSize, { height: hp(86) }]}>
                    <View style={{ paddingHorizontal: Spacing.MARGIN_20 }}>

                        <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_30, color: Colors.LIGHT_BLACK, marginTop: Spacing.MARGIN_40 }]}>Blessings</Text>
                        <Text style={[styles.subTitle]}>Enter Amount</Text>


                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearAdd]} >
                            <TouchableOpacity onPress={() => add()} style={[styles.whiteBtn, { borderTopLeftRadius: 7, borderBottomLeftRadius: 7 }]}>
                                <Add height={hp(4)} width={wp(5)} />
                            </TouchableOpacity>
                            <View style={[styles.whiteBtn, { marginHorizontal: Spacing.PADDING_2, width: wp(17) }]}>
                                {/* <Text style={{ fontSize: Typography.FONT_SIZE_17, fontFamily: 'Montserrat-SemiBold', color: '#747474' }}>{count}</Text> */}

                                <TextInput
                                    value={count}

                                    onChangeText={e => handleValueEnter(e)}
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
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn, { borderRadius: 17, marginTop: Spacing.MARGIN_50 }]} >
                            <View style={[styles.btnView1, { width: '99%', borderRadius: 16 }]}>
                                <TextInput placeholder={`INR ${kidObj?.walletObj?.amount}`} editable={false} style={[styles.input]} />
                                <Text style={{ color: '#747474', fontSize: 13, fontFamily: 'Montserrat-Regular' }}>My Wallet</Text>
                            </View>
                        </LinearGradient>
                        <TouchableOpacity onPress={() => HandleSendMoneyToChild()} style={{ marginTop: Spacing.MARGIN_20 }} >
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                <Text style={[commonStyle.btnText]}>Confirm</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../../images/bonusTeady.png')} resizeMode='contain' style={[styles.bottonPg]} />
                </ImageBackground>
            </ScrollView>
        </View>

    )
}
const styles = StyleSheet.create({
    btnView: {
        width: wp(87.5),
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: Spacing.PADDING_2,

    },
    btnText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: '600',
        paddingVertical: Spacing.PADDING_10,
    },
    linearBtn: {
        width: '100%',
        borderRadius: 7,
        marginVertical: Spacing.PADDING_10,
    },
    whiteBackground: {
        marginHorizontal: Spacing.MARGIN_40,
        marginVertical: Spacing.MARGIN_50,
        backgroundColor: 'white',
        borderRadius: 30,
        paddingHorizontal: Spacing.MARGIN_30,
        paddingVertical: Spacing.MARGIN_10
    },
    modalText: {
        marginTop: Spacing.MARGIN_10,
        marginBottom: Spacing.MARGIN_5,
        fontSize: Typography.FONT_SIZE_13,
        color: Colors.LIGHT_BLACK,
        fontFamily: 'Montserrat-Regular'
    },
    bottonPg: {
        position: 'absolute',
        bottom: 37,
        right: 20,
        zIndex: -10,
        height: hp(20),
        width: wp(36),
    },
    linearAdd: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1,
        width: wp(32.7),
        marginTop: Spacing.PADDING_4,
        borderRadius: 7,
        alignSelf: 'center',
        height: hp(6.5)
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
    btnView1: {
        backgroundColor: Colors.WHITE,
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: Spacing.PADDING_2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.MARGIN_15,
        justifyContent: 'space-between',
        height: hp(8)
    },
    input: {
        fontSize: Typography.FONT_SIZE_22,
        color: Colors.LIGHT_BLACK,
        fontFamily: 'Montserrat-SemiBold',
        width: '70%'
    },
    subTitle: {
        textAlign: 'center',
        color: '#747474',
        fontFamily: 'Montserrat-Regular',
        marginBottom: Spacing.MARGIN_10,
        fontSize: Typography.FONT_SIZE_13
    }
})