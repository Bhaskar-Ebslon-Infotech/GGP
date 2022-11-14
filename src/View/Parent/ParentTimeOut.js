import { View, Text, ImageBackground, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import Header from '../../Component/CommonHeader'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { Colors, Typography } from '../../Styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import { PRIMARY } from '../../Styles/theme/Colors';
import { LoaderContext, toggleModalContext } from '../../../App';
import { getDecodedToken } from '../../api/user';
import { kidContext } from '../../Context/CurrentKidContext';
import { setTimeOut } from '../../api/timeOut';


export default function ParentTimeOut() {
    const [minutes, setMinutes] = useState('');
    const [loading, setLoading] = useContext(LoaderContext);

    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const handleSubmit = async () => {
        setLoading(true)
        try {
            parentId = await getDecodedToken()
            if (minutes == '') {
                setToggleModal(true)
                setMessage("Please enter timeout minutes")
            }
            else {
                let obj = {
                    time: minutes,
                    parentId: parentId.userId,
                    kidId: currentKid._id,
                }
                console.log(obj, 'obj')
                let res = await setTimeOut(obj)
                console.log(res,'response')
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

    console.log(minutes)
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <ImageBackground source={require('../../images/bg2.png')} style={{ height: '100%', width: '100%' }}>
                <Header />
                <View style={{ padding: 15, marginTop: hp(10) }}>
                    <Text style={{ fontSize: 25, color: PRIMARY, textAlign: 'center', marginBottom: hp(6) }}>Set TimeOut for Kids</Text>
                    {/* <TextInput placeholder='please enter timeout Hours' style={[styles.input]} /> */}
                    <TextInput placeholder='please enter timeout Minutes' keyboardType='numeric' onChangeText={(text) => setMinutes(text)} style={[styles.input, { marginTop: hp(5) }]} />

                    <TouchableOpacity style={{ paddingHorizontal: 10, marginTop: 30, width: '50%', alignSelf: 'center' }} onPress={() => handleSubmit()}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                            <Text style={[styles.btnText]}>Submit</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    input: {
        borderWidth: 1,
        height: hp(7),
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    linearBtn: {
        width: '100%',
        borderRadius: 30,
        padding: 2,
        paddingHorizontal: 4
    },
    btnText: {
        textAlign: 'center',
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_18,
        paddingVertical: 5,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold'
    },
})