import React, { useState, useContext } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, FlatList, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Down from '../../images/svg/parentsvg/dropDown';
import Flag from '../../images/svg/parentsvg/flag';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import Header from '../../Component/Header';
import { useNavigation } from '@react-navigation/native';
import MasterData from '../../MasterData';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { editAddress, updateaddress } from '../../api/Address';
import PhoneInput from "react-native-phone-number-input";
import { LoaderContext, toggleModalContext } from '../../../App';
export default function EditNewAddress(props) {
    const navigation = useNavigation();
    const codeData = MasterData.phone;
    console.log(props.route.params.data.pincode)
    const [propData, setPropData] = useState(props.route.params.data);
    const [address_name, setAddress_name] = useState(props.route.params.data.address_name);
    const [mobile, setMobile] = useState(props.route.params.data.mobile);
    const [address_line_1, setAddress_line_1] = useState(props.route.params.data.address_line_1);
    const [address_line_2, setAddress_line_2] = useState(props.route.params.data.address_line_2);
    const [state, setState] = useState(props.route.params.data.state);
    const [city, setCity] = useState(props.route.params.data.city);
    const [landmark, setLandmark] = useState(props.route.params.data.landmark);
    const [pincode, setPincode] = useState(`${props.route.params.data.pincode}`);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [loading, setLoading] = useContext(LoaderContext);
    const [codeModal, setCodeModal] = useState(false);
    const [code, setCode] = useState('')

    const codeRenderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { setCode(item.code); setFlag(item.flag); setCodeModal(false); }} style={[commonStyle.listdownView, { justifyContent: 'flex-start', borderColor: '#DEDEDE', backgroundColor: Colors.WHITE }]}>
                <Text style={[commonStyle.listdownTxt, { width: '25%' }]}>{item.code}</Text>
                <Text style={[commonStyle.listdownTxt]}>{item.country}</Text>
            </TouchableOpacity>
        )
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {

            if (address_name == '') {
                setToggleModal(true)
                setMessage('Please Fill name')

            }
            else if (mobile == '' || mobile.length < 10) {
                setToggleModal(true)
                setMessage('Enter a valid Mobile Number')
            }
            else if (address_line_1 == '') {
                setToggleModal(true)
                setMessage('Please Fillflat')
            }
            else if (address_line_2 == '') {
                setToggleModal(true)
                setMessage('Please Fill street')
            }
            else if (city == '') {
                setToggleModal(true)
                setMessage('Please Fill city')
            }
            else if (state == '') {
                setToggleModal(true)
                setMessage('Please Fill State')
            }
            else if (landmark == '') {
                setToggleModal(true)
                setMessage('Please Fill landmark')
            }
            else if (pincode == '') {
                setToggleModal(true)
                setMessage('Please Fill Pincode')
            }
            else {
                let obj = {
                    address_name,
                    address_line_1,
                    address_line_2,
                    country: "india",
                    state,
                    city,
                    pincode,
                    landmark,
                    mobile,
                    is_default: 0,
                }
                console.log(obj)
                // let res = await editAddress(obj,props?.route?.params?.id)
                let res = await updateaddress(propData.id, obj)
                if (res.data.message) {
                    setToggleModal(true)
                    setMessage(res.data.message)
                    navigation.goBack()
                }
                console.log(res.data, "response1")
                // console.log(res.data.address_name)
                // navigation.navigate('BottomTabBar', { screen: 'ShopStack', params: { screen: 'VoucherSelection', } })
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
        <ScrollView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>

            <Header logo={true} />
            <View style={{ padding: Spacing.PADDING_20 }}>
                <Text style={[styles.heading]}>Edit Address</Text>
                <Text style={[styles.label]}>Full Name:</Text>
                <TextInput placeholder='enter name' value={address_name} onChangeText={(val) => setAddress_name(val)} style={[styles.input]} />
                <Text style={[styles.label]}>Phone:</Text>
                <View style={[styles.input, styles.inputBorder, { paddingHorizontal: 0 }]}>
                    <View style={[commonStyle.flexRow]}>

                        <PhoneInput
                            defaultValue='IND'
                            layout="first"
                            textContainerStyle={{ borderRadius: 30, height: hp(5) }}
                            containerStyle={{ borderRadius: 30, width: '100%', height: hp(5), width: wp(43.1), backgroundColor: 'white' }}
                            codeTextStyle={{ height: 20, }}
                            flagButtonStyle={{ height: hp(5) }}

                        />

                        <TextInput
                            keyboardType="numeric"
                            onChangeText={val => setMobile(val)}
                            value={mobile}
                            maxLength={10}
                            style={{ flex: 1, paddingHorizontal: Spacing.MARGIN_5 }}
                            placeholder="Enter Mobile"
                        />
                    </View>
                </View>
                {/* <View style={[commonStyle.flexRow, styles.input]}> */}


                {/* {code == '' && (
                        <Flag height={hp(3)} width={wp(5)} />
                    )}

                    <TouchableOpacity onPress={() => setCodeModal(true)}>
                        <Down height={hp(3)} width={wp(5)} style={{ marginHorizontal: Spacing.PADDING_5 }} />
                    </TouchableOpacity>
                    {code == '' && (
                        <Text style={{ fontSize: Typography.FONT_SIZE_13, color: Colors.LIGHT_BLACK, fontFamily: 'Montserrat-Regular' }}>91</Text>
                    )}
                    <Text style={{ fontSize: Typography.FONT_SIZE_13, color: Colors.LIGHT_BLACK, fontFamily: 'Montserrat-Regular' }}>{code}</Text> */}
                {/* <TextInput value={mobile} keyboardType="number-pad" onChangeText={(val) => setMobile(val)} style={{ width: '70%' }} /> */}
                {/* </View> */}
                <Text style={[styles.label]}>Flat, House No.:</Text>
                <TextInput placeholder='' value={address_line_1} onChangeText={(val) => setAddress_line_1(val)} style={[styles.input]} />

                <Text style={[styles.label]}>Street, Sector, Village:</Text>
                <TextInput placeholder='' value={address_line_2} onChangeText={(val) => setAddress_line_2(val)} style={[styles.input]} />

                <Text style={[styles.label]}>State:</Text>
                <TextInput placeholder='' value={state} onChangeText={(val) => setState(val)} style={[styles.input]} />


                <Text style={[styles.label]}>City:</Text>
                <TextInput placeholder='' value={city} onChangeText={(val) => setCity(val)} style={[styles.input]} />

                <Text style={[styles.label]}>Landmark:</Text>
                <TextInput placeholder='Eg. Behind Regal Cinema' value={landmark} onChangeText={(val) => setLandmark(val)} style={[styles.input]} />

                <Text style={[styles.label]}>Postal Code:</Text>
                <TextInput placeholder='Eg. 110044' value={pincode} keyboardType='numeric' onChangeText={(val) => setPincode(val)} style={[styles.input]} />
                <TouchableOpacity style={{ marginTop: Spacing.MARGIN_30, paddingBottom: Spacing.MARGIN_50 }} onPress={() => handleSubmit()}>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                        <Text style={[commonStyle.btnText]}>Update</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={codeModal}
            >
                <View style={[commonStyle.dopDownModal,]}>
                    <View style={[commonStyle.modalWhiteBg]}>
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

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    heading: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_22,
        color: Colors.LIGHT_BLACK,
        marginTop: Spacing.MARGIN_15
    },
    label: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_12,
        color: '#747474',
        marginTop: Spacing.MARGIN_10,
        marginBottom: Spacing.PADDING_4
    },
    input: {
        borderWidth: 1,
        height: hp(5.5),
        borderRadius: 30,
        borderColor: '#9A9A9A',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: Spacing.MARGIN_15
    },
    inputBorder: {
        borderWidth: 1,
        borderColor: '#9A9A9A',
        borderRadius: 20,
        paddingHorizontal: Spacing.PADDING_20,
    },
    text: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_13,
        color: Colors.PRIMARY,
        marginTop: Spacing.PADDING_4,
    },
    listTitle1: {
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_20,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
        textAlign: 'center'
    },
})