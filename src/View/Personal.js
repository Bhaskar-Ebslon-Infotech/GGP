import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, TextInput, Modal, FlatList, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommonStyle from '../Styles/commonStyle';
import CSS from '../Styles/parentStyle';
import { ANTDESIGN, ENTYPO, } from '../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors, Spacing, Typography } from '../Styles/theme/index';
import Boy from '../images/svg/boy'
import Check from '../images/svg/check';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { images } from '../Constant/background';
import Teady from '../images/svg/teady';
import MasterData from '../MasterData';
import { toggleModalContext } from '../../App';
import { updateUserData, userData } from '../api/user';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Home from '../images/svg/homeBtn';
import Back from '../images/svg/parentsvg/back';
export default function PersonalKid() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('')
    const [gen, setGen] = useState('');
    const [genModal, setGenModal] = useState(false);
    const genData = MasterData.personal;
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [userDataObj, setUserDataObj] = useState({});
    const focused = useIsFocused()
    const navigation = useNavigation()
    const handleSubmit = async () => {
        try {
            setLoading(true)
            if (name == '') {
                // alert('Please Fill name')
                setToggleModal(true)
                setMessage('Please Fill name')
            }
            else {
                let obj = {
                    firstName: name,
                    // gender: gen
                }
                let { data: res } = await updateUserData(obj, userDataObj._id);
                {
                    setToggleModal(true)
                    setMessage(res.message)
                    console.log(res.message, "res.message");
                }
                // console.log(obj)
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
    }



    const getUserData = async () => {
        try {
            let { data: res } = await userData()
            if (res.data) {
                setUserDataObj(res.data)
                setName(res.data.firstName)
                // setGen(res.data.gender ? res.data.gender : "Please Select a gender")
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
    }


    useEffect(() => {
        if (focused) {
            getUserData()
        }
    }, [focused])

    const genRenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { setGen(item.gen); setGenModal(false); }} style={[CSS.listdownView, { borderColor: '#DEDEDE', backgroundColor: Colors.WHITE }]}>
                <Text style={[CSS.listdownTxt]}>{item.gen}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <>
            <Teady height={hp(40)} width={wp(60)} style={[styles.teady]} />
            {/* <Image source={require('../images/teady.png')} resizeMode='contain' style={[styles.teady]} /> */}
            <ScrollView>
                <ImageBackground source={require('../images/personal.png')} resizeMode='stretch' style={[styles.bottomImg]}>
                    <ImageBackground source={images.backGround} style={[CommonStyle.fullSize]}>
                        <KeyboardAvoidingView>
                            <View style={[styles.View]}>
                                <Text style={[CommonStyle.title]}>Personal</Text>
                                <Text style={[styles.label]}>Nickname:</Text>
                                <TextInput placeholder='Name Here' value={name} onChangeText={(val) => setName(val)} placeholderTextColor='#BFBFBF' style={[styles.TextInput]} />
                                {/* <Text style={[styles.label, { marginTop: Spacing.PADDING_7 }]}>Icon:</Text>
                                <View style={[styles.select]}>
                                    <TouchableOpacity onPress={() => setGenModal(true)} style={[CommonStyle.flexRow, { paddingHorizontal: Spacing.MARGIN_18, paddingVertical: Spacing.PADDING_4 }]}>
                                        <Boy height={hp(5)} width={wp(10)} style={{ borderRadius: 20 }} />
                                        <Text style={[styles.text]}>{gen}</Text>
                                         <Text style={[styles.text]}>{gen}</Text> 
                                        <>
                                        <AntDesign name={ANTDESIGN.DOWN} size={Spacing.SIZE_20} color={'#9A9A9A'} />
                                        </TouchableOpacity>

                                    </TouchableOpacity>
                                </View> */}

                                <TouchableOpacity onPress={() => handleSubmit()} style={{ backgroundColor: Colors.WHITE, paddingVertical: Spacing.PADDING_5, borderRadius: 20, marginTop: Spacing.MARGIN_15, }}>
                                    <Text style={[styles.btnText]}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>


                    </ImageBackground>
                </ImageBackground>
                <View style={[styles.bottomView]}>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}><Home height={hp(4)} width={wp(7)} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()}><Back height={hp(4)} width={wp(7)} /></TouchableOpacity>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={genModal}
            >
                <View style={[CSS.dopDownModal,]}>
                    <View style={[CSS.modalWhiteBg]}>
                        <FlatList
                            data={genData}
                            renderItem={genRenderItem}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setGenModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>
                </View>
            </Modal>





        </>
    )
}

const styles = StyleSheet.create({
    bottomImg: {
        // height: "70%",
        width: '100%',
        position: 'relative',
        top: hp(30),
        // left: 0
        // marginTop: hp(30)
    },
    teady: {
        // height: hp(35),
        // width: wp(50),
        position: 'absolute',
        right: hp(6),
        top: hp(5),
    },
    View: {
        marginTop: hp(20),
        paddingHorizontal: Spacing.PADDING_20
    },
    btnText: {
        textAlign: 'center',
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_18,
        paddingVertical: Spacing.PADDING_5,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold'
    },
    bottomView: {
        backgroundColor: Colors.WHITE,
        position: "absolute",
        bottom: 0,
        left: 0,
        width: wp(100),
        borderTopWidth: 1,
        borderColor: '#EAEAEA',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    label: {
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_14,
        paddingVertical: Spacing.PADDING_5,
        fontWeight: '500',
        fontFamily: 'Montserrat-Regular'
    },
    TextInput: {
        backgroundColor: Colors.WHITE,
        borderRadius: 25,
        paddingHorizontal: Spacing.PADDING_20
    },
    select: {
        backgroundColor: Colors.WHITE,
        width: '100%',
        borderRadius: 25,
    },
    text: {
        color: '#BFBFBF',
        fontSize: Typography.FONT_SIZE_14,
        paddingVertical: Spacing.PADDING_5,
        fontWeight: '500',
        fontFamily: 'Montserrat-Regular',
        marginLeft: Spacing.PADDING_15,
        flex: 1
    }
})