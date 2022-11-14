import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Modal, FlatList, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { generateGuestToken, getUserObjForRegister, newParent, registerKid, setAuthToken } from '../api/user';
import CommonHeader from '../Component/CommonHeader';
import Down from '../images/svg/dropDown';
import Flag from '../images/svg/flag';
import commonStyle from '../Styles/commonStyle';
import CSS from '../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import MasterData from '../MasterData';
import { ANTDESIGN } from '../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { LoaderContext, toggleModalContext } from '../../App';

export default function KidRegister(props) {
    const [codeModal, setCodeModal] = useState(false);
    const [code, setCode] = useState('');
    const [flag, setFlag] = useState('');
    const [modal, setModal] = useState(false);
    const codeData = MasterData.phone;
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [loading, setLoading] = useContext(LoaderContext);
    const codeRenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { setCode(item.code); setFlag(item.flag); setCodeModal(false); }} style={[CSS.listdownView, { justifyContent: 'flex-start', borderColor: '#DEDEDE', backgroundColor: Colors.WHITE }]}>
                <Text style={[CSS.listdownTxt, { width: '25%' }]}>{item.code}</Text>
                <Text style={[CSS.listdownTxt]}>{item.country}</Text>
            </TouchableOpacity>
        )
    }

    console.log(props.route.params)

    const [firstName, setFirstname] = useState('');
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [age, setAge] = useState("");
    const [parentObj, setParentObj] = useState({});
    const [regModal, setRegModal] = useState(false)
    const handleClearState = () => {
        setFirstname("")
        setPin("")
        setConfirmPin("")
        setAge("")
    }


    const handleSubmit = async () => {
        setLoading(true)
        try {

            if (firstName != "" && age != "" && pin != "") {
                if (age > 17) {
                    // alert("only under 17 year old eligible")
                    setToggleModal(true)
                    setMessage("only under 17 year old kid eligible")
                }
                else if (age < 3) {
                    setToggleModal(true)
                    setMessage("only above 3 year old kid eligible")
                }
                else if (pin.length < 4) {
                    // alert("Please enter a four digit pin")
                    setToggleModal(true)
                    setMessage("Please enter a four digit pin")
                }
                else if (pin != confirmPin) {
                    setToggleModal(true)
                    setMessage("Pin and confirm pin does not match")
                    //   alert("Pin and confirm pin does not match")
                }
                else {
                    let obj = {
                        firstName,
                        age,
                        pin,
                        parentId: parentObj._id
                    }
                    let { data: res } = await registerKid(obj);
                    if (res?.message) {
                        setRegModal(true)
                        handleClearState()
                    }
                }
            }
            else {
                setToggleModal(true)
                setMessage("Please Fill all the fields")
                // alert("Please Fill all the fields")
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








    const registerParent = async () => {
        setLoading(true)
        try {
            const obj = await getUserObjForRegister()
            let obj2 = JSON.parse(obj)
            let { data: response } = await newParent(obj2);
            if (response?.data) {
                await setAuthToken(response.token);
                setParentObj(response.data)
            }
        }
        catch (error) {
            navigation.navigate("Register")
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






    const redirectToNext = async () => {
        props.navigation.navigate('Plans')
    }




    useEffect(() => {
        registerParent()
    }, [])


    const navigation = useNavigation()
    return (
        <>
            <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
                <CommonHeader hideBackBtn={false} />
                <ScrollView>
                    <ImageBackground source={require('../images/loginBg.png')} resizeMode='stretch' style={[{ flex: 1, minHeight: hp(100) }]}>
                        {
                            loading ?
                                <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <ActivityIndicator color="#ffffff" size="large" />
                                </View>
                                :
                                <>
                                    <View style={{ marginTop: hp(15), paddingHorizontal: wp(5) }}>
                                        <Text style={[styles.heading]}>Kid</Text>
                                        <Text style={[styles.label]}>Nickname *</Text>
                                        <TextInput
                                            placeholder='Nickname' value={firstName} onChangeText={(val) => setFirstname(val)} style={[styles.input, styles.inputBorder, { marginRight: Spacing.MARGIN_10, width: '100%' }]}
                                        />

                                        <Text style={[styles.label]}>Age *</Text>
                                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                            <TextInput
                                                placeholder='Age' keyboardType='number-pad' value={age} onChangeText={(val) => { setAge(val.replace(/[^0-9]/g, '0')) }} maxLength={2} style={[styles.input, styles.inputBorder, { marginRight: Spacing.MARGIN_10, width: '100%' }]}
                                            />
                                        </View>


                                        <Text style={[styles.label]}>Pin *</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TextInput
                                                placeholder='Pin' keyboardType='number-pad' secureTextEntry={true} value={pin} maxLength={4} onChangeText={(val) => setPin(val)} style={[styles.input, styles.inputBorder, { marginRight: Spacing.MARGIN_10, width: '49%' }]}
                                            />
                                            <TextInput
                                                placeholder='Confirm Pin' keyboardType='number-pad' secureTextEntry={true} maxLength={4} value={confirmPin} onChangeText={(val) => setConfirmPin(val)} style={[styles.input, styles.inputBorder, { width: '49%' }]}
                                            />
                                        </View>
                                        <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_20, alignSelf: 'center' }]}>
                                            <TouchableOpacity style={[styles.bg,]} onPress={() => { handleSubmit() }}>
                                                <Text style={[styles.text, { color: Colors.WHITE }]}>Add Kid</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </>
                        }
                    </ImageBackground>
                </ScrollView>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { height: hp(35), backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearModal]} >
                            <Image source={require('../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <View style={{ width: '100%' }}>
                            <Text style={[styles.listTitle, { color: Colors.LIGHT_BLACK, width: '90%', alignSelf: 'center', marginTop: hp(7) }]}>Kid Added Successfully</Text>
                        </View>

                        {/* <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_25, marginTop: Spacing.MARGIN_70 }]}>
                            <TouchableOpacity onPress={() => { setApproveModal(false); setSuccessModal(true) }} style={{ width: '40%' }} >
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                    <View style={[styles.btnView]}>
                                        <Text style={[styles.btnText, { color: Colors.WHITE }]}>Yes</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setApproveModal(false)} style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }} >
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[styles.btnText, { color: Colors.WHITE }]}>No</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                    <TouchableOpacity onPress={() => setModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={regModal}
            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[CSS.whiteBg, { backgroundColor: Colors.OFF_YELLOW, height: hp(40) }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[CSS.linearModal]} >
                            <Image source={require('../images/modalTeady.png')} resizeMode='contain' style={[CSS.modalTeady]} />
                        </LinearGradient>
                        <Text style={[styles.title, { textAlign: 'center', color: Colors.LIGHT_BLACK, width: '90%', marginLeft: hp(2), marginTop: Spacing.MARGIN_15 }]}>Kid Added successfully</Text>
                        <Text style={[styles.title, { textAlign: 'center', color: Colors.LIGHT_BLACK, width: '90%', marginLeft: hp(2), marginTop: Spacing.MARGIN_15 }]}>Do you want to add more Kids ?</Text>
                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_25, }]}>
                            <TouchableOpacity style={{ width: '40%' }} onPress={() => setRegModal(false)}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[CSS.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[CSS.btnText, { color: Colors.WHITE }]}>Yes</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setRegModal(false); props.navigation.navigate('Plans') }} style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }} >
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[CSS.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[CSS.btnText, { color: Colors.WHITE }]}>No</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    label: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_13,
        color: 'white',
        marginBottom: Spacing.MARGIN_5,
        marginTop: Spacing.MARGIN_10,
    },
    heading: {
        fontFamily: 'Cookies',
        fontSize: Typography.FONT_SIZE_25,
        color: 'white',
        marginTop: Spacing.SIZE_150,
        lineHeight: Spacing.PADDING_30,
    },
    input: {
        height: hp(6),
        backgroundColor: "white",
        color: "black"
    },
    inputBorder: {
        borderWidth: 1,
        borderColor: '#9A9A9A',
        borderRadius: 20,
        paddingHorizontal: Spacing.PADDING_20
    },
    listTitle: {
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_20,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
        textAlign: 'center'
    },
    listSubTitle: {
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_15,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
        textAlign: 'center'
    },
    btnText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: '600',
        paddingVertical: Spacing.PADDING_7,
        fontSize: Typography.FONT_SIZE_16,
        alignSelf: 'center'
    },
    btnView: {
        //  height: "100%",
        width: "100%",
        borderRadius: 20,
        display: "flex",
        alignSelf: 'center',
        justifyContent: 'center'
    },
    bg: {
        borderWidth: 2,
        borderColor: Colors.WHITE,
        width: '49%',
        borderRadius: 20
    },
    text: {
        fontSize: Typography.FONT_SIZE_15,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        paddingVertical: Spacing.PADDING_7
    },
    linearBtn: {
        height: hp(5),
        width: '100%',
        borderRadius: 30,
        paddingVertical: Spacing.PADDING_2,
        paddingHorizontal: Spacing.PADDING_2
    },
    linearModal: {
        width: '100%',
        borderRadius: 10,
        padding: Spacing.PADDING_2,
        height: hp(16),
        justifyContent: 'flex-end'
    },
})