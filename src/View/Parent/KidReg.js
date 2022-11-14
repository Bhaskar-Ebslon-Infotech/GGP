import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, Image, TouchableOpacity, View, ActivityIndicator, Modal, FlatList } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CommonHeader from '../../Component/CommonHeader';
import Down from '../../images/svg/dropDown';
import Flag from '../../images/svg/flag';
import commonStyle from '../../Styles/commonStyle';
import CSS from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import MasterData from '../../MasterData';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { userData, generateGuestToken, registerKid, } from '../../api/user';
import LinearGradient from 'react-native-linear-gradient';
import { LoaderContext, toggleModalContext } from '../../../App';

export default function KidReg(props) {
    const [codeModal, setCodeModal] = useState(false);
    const [code, setCode] = useState('')
    const [flag, setFlag] = useState('')
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

    // console.log(props.route.params)

    const [firstName, setFirstname] = useState('');
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [regModal, setRegModal] = useState(false)
    const [age, setAge] = useState("");
    const [userDataObj, setUserDataObj] = useState({})
    const focused = useIsFocused()
    const handleClearState = () => {
        setFirstname("")
        setPin("")
        setConfirmPin("")
        setAge("")
    }

    useEffect(() => {
        if (focused)
            handleGetUserData();
    }, [focused]);

    const handleGetUserData = async () => {
        setLoading(true)
        try {
            const { data: res } = await userData();
            // console.log('this is data', JSON.stringify(res?.data?.familyObj?.kidIdArr.length, null, 2));
            if (res.success) {
                setUserDataObj(res.data);
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
    };

    const handleSubmit = async () => {
        setLoading(true)
        try {
            // if (firstName != "" && age != "" && pin != "") {
            if (age > 17) {
                setToggleModal(true)
                setMessage("only under 17 year old kid eligible")
            }
            else if (firstName == "" || firstName.trim().length == 0) {
                setToggleModal(true)
                setMessage('First name cannot contain only spaces or be empty')
                setLoading(false)
                return;
                // alert('Please enter a Valid phone Number');
            }
            else if (age == "") {
                setToggleModal(true)
                setMessage('Age cannot be empty')
                setLoading(false)
                return;
                // alert('Please enter a Valid phone Number');
            }
            else if (age < 3) {
                setToggleModal(true)
                setMessage("only above 3 year old kid eligible")
            }
            else if (pin.length < 4) {
                setToggleModal(true)
                setMessage("Please enter a four digit pin")
            }
            else if (pin != confirmPin) {
                setToggleModal(true)
                setMessage("Pin and confirm pin does not match")
            }
            else {
                let obj = {
                    firstName,
                    age,
                    pin,
                    parentId: userDataObj._id
                }
                let { data: res } = await registerKid(obj);
                if (res?.message) {
                    setToggleModal(true)
                    setMessage(res?.message)
                    handleClearState()
                }
            }
            // }
            // else {
            //     setToggleModal(true)
            //     setMessage("Please Fill all the fields")
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
    const handleAgeEnter = (val) => {

        setAge(val.replace(/[^0-9]/g, '0'))

    }



    useEffect(() => {
    })


    const navigation = useNavigation()
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <CommonHeader />
            <ScrollView>
                <ImageBackground source={require('../../images/loginBg.png')}
                    imageStyle={{
                        resizeMode: "contain",
                        alignSelf: "flex-end"
                    }}

                    style={[{
                        flex: 1, minHeight: hp(90)
                    }]}>
                    {
                        loading ?
                            <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <ActivityIndicator color="#ffffff" size="large" />
                            </View>
                            :
                            <>
                                <View style={{ marginTop: hp(15), paddingHorizontal: wp(5) }}>
                                    <Text style={[styles.heading]}>Add Kid</Text>
                                    <Text style={[styles.label]}>Nickname *</Text>
                                    <TextInput
                                        placeholder='Nickname' value={firstName} onChangeText={(val) => setFirstname(val)} style={[styles.input, styles.inputBorder, { marginRight: Spacing.MARGIN_10, width: '100%' }]}
                                    />

                                    <Text style={[styles.label]}>Age *</Text>
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <TextInput
                                            placeholder='Age' keyboardType='number-pad' maxLength={2} value={age} onChangeText={(val) => handleAgeEnter(val)} style={[styles.input, styles.inputBorder, { marginRight: Spacing.MARGIN_10, width: '100%' }]}
                                        />
                                    </View>


                                    <Text style={[styles.label]}>Kid Pin *</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TextInput
                                            placeholder='Pin' keyboardType='number-pad' secureTextEntry={true} value={pin} maxLength={4} onChangeText={(val) => setPin(val)} style={[styles.input, styles.inputBorder, { marginRight: Spacing.MARGIN_10, width: '49%' }]}
                                        />
                                        <TextInput
                                            placeholder='Confirm Pin' keyboardType='number-pad' secureTextEntry={true} maxLength={4} value={confirmPin} onChangeText={(val) => setConfirmPin(val)} style={[styles.input, styles.inputBorder, { width: '49%' }]}
                                        />
                                    </View>
                                    <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_20, alignSelf: 'center' }]}>
                                        <TouchableOpacity style={[styles.bg,]} onPress={() => handleSubmit()} >
                                            <Text style={[styles.text, { color: Colors.WHITE }]}>Add Kid</Text>
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity onPress={() => redirectToNext()} style={[styles.bg, { marginLeft: Spacing.MARGIN_10 }]}>
                                            <Text style={[styles.text, { color: Colors.WHITE }]}>Next</Text>
                                        </TouchableOpacity> */}
                                    </View>

                                </View>
                            </>
                    }
                </ImageBackground>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={codeModal}
            >
                <View style={[CSS.dopDownModal,]}>
                    <View style={[CSS.modalWhiteBg]}>
                        <FlatList
                            data={codeData}
                            renderItem={codeRenderItem}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setCodeModal(false)}>
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
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[CSS.modalTeady]} />
                        </LinearGradient>
                        <Text style={[styles.title, { textAlign: 'center', color: Colors.LIGHT_BLACK, width: '90%', marginLeft: hp(2), marginTop: Spacing.MARGIN_15 }]}>1. Kid then Added successfully</Text>
                        <Text style={[styles.title, { textAlign: 'center', color: Colors.LIGHT_BLACK, width: '90%', marginLeft: hp(2), marginTop: Spacing.MARGIN_15 }]}>2. Do you want to add more Kid</Text>
                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_25, }]}>
                            <TouchableOpacity style={{ width: '40%' }} onPress={() => setRegModal(false)}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[CSS.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[CSS.btnText, { color: Colors.WHITE }]}>Yes</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setRegModal(false) }} style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }} >
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


        </View>
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
    title: {
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_17,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
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
    }
})