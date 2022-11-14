import React, { useEffect, useState, useContext } from 'react'
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, Image, Pressable } from 'react-native';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../Component/Header';
import parentStyle from '../../Styles/parentStyle';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { updateUserData, userData } from '../../api/user';
import { useIsFocused } from '@react-navigation/native';
import { LoaderContext, toggleModalContext } from '../../../App';

export default function KidChangePin() {
    const [changePinModal, SetChangePinModal] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [pin, setPin] = useState('');
    const [oldPin, setOldPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [seletecedKid, setSeletecedKid] = useState({});
    const [kidArr, setKidArr] = useState([])
    const [activeItem, setActiveItem] = useState(0)
    const focused = useIsFocused()
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [loading, setLoading] = useContext(LoaderContext);

    const getUserData = async () => {
        setLoading(true)
        try {
            let { data: res } = await userData()
            if (res.data) {
                setKidArr(res?.data?.familyObj?.kidIdArr)
                setSeletecedKid(res?.data?.familyObj?.kidIdArr[0])
                setName(res?.data?.familyObj?.kidIdArr[0]?.kidData?.firstName)
                setAge(res?.data?.familyObj?.kidIdArr[0]?.kidData?.age)
                console.log(res?.data?.familyObj?.kidIdArr[0]?.kidData?.age, "age")
                setActiveItem(2)
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


    const handleKidUpdate = async () => {
        setLoading(true)
        try {
            if (age == '') {
                setToggleModal(true)
                setLoading(false)
                setMessage('Age cannot be empty')
                return;
            }
            else if (name == "" || name.trim().length == 0) {
                setToggleModal(true)
                setMessage('First name cannot contain only spaces or be empty')
                setLoading(false)
                return;
                // alert('Please enter a Valid phone Number');
            }
            else if (age == 0 || age < 3) {
                setToggleModal(true)
                setMessage("Please enter valid age")
                setLoading(false)
                return;
            }
            else if (age > 17) {
                setToggleModal(true)
                setMessage("Only under 17 year old eligible")
                setLoading(false)
                return;
            }
            else {
                let finalObject = {
                    firstName: name,
                    // email:email,
                    age,
                    pin: newPin
                }
                console.log(finalObject, "final object");
                console.log(JSON.stringify(seletecedKid, null, 2), "final object");
                let { data: res } = await updateUserData(finalObject, seletecedKid.kidData._id)
                console.log(res);
                if (res.message) {
                    setToggleModal(true)
                    setMessage(res.message)
                    getUserData()
                    setSeletecedKid(kidArr[0].kidData)
                    setNewPin('')
                    this._carousel.snapToItem(0, animated = true, fireCallback = true)
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

    const handleKidSelection = (index) => {
        console.log(index)
        let tempObj = kidArr.filter((el, i) => {
            if (index == i) {
                return el
            }
        })
        tempObj = tempObj[0]
        console.log(tempObj)
        setSeletecedKid(tempObj)
        setName(tempObj.kidData.firstName)
        setAge(tempObj.kidData.age)
    }






    const renderItem = ({ item }) => {
        return (
            <View style={{ padding: Spacing.MARGIN_18 }}>
                <Text style={[styles.heading]}>Kid</Text>
                <Text style={[styles.label]}>Name:</Text>
                <TextInput placeholder='Enter name' value={name} onChangeText={(val) => setName(val)} style={[styles.input]} />
                <Text style={[styles.label]}>Age</Text>
                <TextInput placeholder='Enter Age' value={`${age}`} onChangeText={(val) => setAge(val.replace(/[^0-9]/g, '0'))} keyboardType={"number-pad"} style={[styles.input]} />
                <Text style={[styles.label]}>PIN:</Text>
                <TextInput placeholder='Enter 4-Digit PIN' secureTextEntry={true} keyboardType='number-pad' maxLength={4} value={newPin} onChangeText={(val) => setNewPin(val)} style={[styles.input]} />
                {/* <Text style={[styles.label]}>Confirm PIN:</Text>
                <TextInput placeholder='Enter 4-Digit PIN' value={confirmPin} onChangeText={(val) => setConfirmPin(val)} style={[styles.input]} /> */}
                <TouchableOpacity style={{ marginTop: Spacing.MARGIN_25, alignSelf: 'center' }} onPress={() => handleSubmit()}>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                        <Pressable onPress={() => { handleKidUpdate() }}>
                            <Text style={[commonStyle.btnText]}>Update</Text>
                        </Pressable>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        )
    }

    useEffect(() => {
        if (focused) {
            getUserData()
            if (kidArr.length > 0) {
                setSeletecedKid(kidArr[0].kidData)
                this._carousel.snapToItem(0, animated = true, fireCallback = true)
                setActiveItem(0)
            }
            this._carousel.snapToItem(0, animated = true, fireCallback = true)
            setActiveItem(0)
        }
    }, [focused])


    return (
        <ScrollView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ImageBackground source={require('../../images/bg2.png')} style={[commonStyle.fullSize]}>
                <Header logo={true} />
                <View style={{ height: hp(78) }}>
                    <View style={{ backgroundColor: "transparent" }}>

                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={kidArr}
                            enableSnap
                            renderItem={renderItem}
                            sliderWidth={wp(100)}
                            itemWidth={wp(100)}
                            onSnapToItem={(slideIndex) => { console.log(slideIndex); setActiveItem(slideIndex); handleKidSelection(slideIndex) }}
                        />
                    </View>
                    <Pagination
                        dotsLength={kidArr.length}
                        activeDotIndex={activeItem}
                        dotStyle={{ backgroundColor: Colors.PRIMARY, width: wp(4), borderColor: Colors.PRIMARY, borderWidth: 2, borderRadius: 20 }}
                        inactiveDotStyle={{ backgroundColor: "white", width: wp(5), borderColor: Colors.PRIMARY, borderWidth: 2, borderRadius: 20 }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />
                </View>

                <Image source={require('../../images/bonusTeady.png')} resizeMode='contain' style={[parentStyle.bottonPg]} />
            </ImageBackground>
            <Modal
                animationType="slide"
                transparent={true}
                visible={changePinModal}

            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <Text style={[commonStyle.modalText, { marginVertical: Spacing.MARGIN_50 }]}>PIN Changed!</Text>


                    </View>
                    <TouchableOpacity onPress={() => SetChangePinModal(false)}>
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
        fontSize: Typography.FONT_SIZE_20,
        color: Colors.LIGHT_BLACK,
        marginTop: 5
    },
    label: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_11,
        color: '#747474',
        marginTop: Spacing.PADDING_7,
        marginBottom: Spacing.PADDING_2
    },
    input: {
        borderWidth: 1,
        height: hp(5.2),
        borderRadius: 20,
        fontSize: Typography.FONT_SIZE_12,
        borderColor: '#9A9A9A',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: Spacing.MARGIN_15,
        justifyContent: 'center'
    }
})