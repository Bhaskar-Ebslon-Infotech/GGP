import React, { useState, useContext } from 'react'
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { ANTDESIGN } from '../Styles/theme/Icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../Component/Header';
import { LoaderContext, toggleModalContext } from '../../App';


export default function KidChangePin() {
    const [changePinModal, SetChangePinModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [oldPin, setOldPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;

    const handleSubmit = () => {
        setLoading(true)
        try {
            if (name == '') {
                //  alert('Please Fill name')
                setToggleModal(true)
                setMessage('Please Fill name')
            }
            else if (email == '') {
                //  alert('Please Fill email')
                setToggleModal(true)
                setMessage('Please Fill email')
            }
            else if (pin == '') {
                setToggleModal(true)
                setMessage('Please Fill pin')
                //  alert('Please Fill pin')
            }
            else if (oldPin == '') {
                setToggleModal(true)
                setMessage('Please Fill old pin')
                //   alert('Please Fill old pin')
            }
            else if (newPin == '') {
                setToggleModal(true)
                setMessage('Please Fill new pin')
                //  alert('Please Fill new pin')
            }
            else {
                let obj = {
                    name,
                    email,
                    pin,
                    oldPin,
                    newPin,
                }
                console.log(obj)
                // SetChangePinModal(true)
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
            <ImageBackground source={require('../images/pigBg.png')} style={[commonStyle.fullSize]}>
                <Header />
                <View style={{ padding: Spacing.PADDING_20 }}>
                    <Text style={[styles.heading]}>Kid</Text>
                    <Text style={[styles.label]}>Name:</Text>
                    <TextInput placeholder='enter name' value={name} onChangeText={(val) => setName(val)} style={[styles.input]} />
                    <Text style={[styles.label]}>Email:</Text>
                    <TextInput placeholder='enter email' value={email} onChangeText={(val) => setEmail(val)} style={[styles.input]} />
                    <Text style={[styles.label]}>PIN:</Text>
                    <TextInput placeholder='enter pin' value={pin} secureTextEntry={true} onChangeText={(val) => setPin(val)} style={[styles.input]} />
                    <Text style={[styles.label]}>Old PIN:</Text>
                    <TextInput placeholder='enter old Pin' value={oldPin} secureTextEntry={true} onChangeText={(val) => setOldPin(val)} style={[styles.input]} />
                    <Text style={[styles.label]}>New PIN:</Text>
                    <TextInput placeholder='enter new Pin' value={newPin} secureTextEntry={true} onChangeText={(val) => setNewPin(val)} style={[styles.input]} />
                    <TouchableOpacity style={{ marginTop: Spacing.MARGIN_30 }} onPress={() => handleSubmit()}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                            <Text style={[commonStyle.btnText]}>Update</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
            <Modal
                animationType="slide"
                transparent={true}
                visible={changePinModal}

            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
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
        borderRadius: 20,
        borderColor: '#9A9A9A',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: Spacing.MARGIN_15
    }
})