import React, { useContext } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import { toggleModalContext } from '../../App';
import CommonStyle from '../Styles/parentStyle';
import { Colors } from '../Styles/theme';
export default function ModalComponent(props) {
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={toggleModal}
        >
            <View style={[CommonStyle.modalBackground]}>
                <View style={[CommonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[CommonStyle.linearModal]} >
                        <Image source={require('../images/modalTeady.png')} resizeMode='contain' style={[CommonStyle.modalTeady]} />
                    </LinearGradient>
                    <View style={{ width: '100%' }}>
                        <Text style={[CommonStyle.listTitle1]}>{message}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setToggleModal(!toggleModal)} style={{ alignSelf: 'center', marginBottom: hp(2) }} >
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={{ paddingHorizontal: 25, borderRadius: 30, paddingVertical: 5 }} >
                            <View style={[CommonStyle.btnView, { margin: 1, borderRadius: 30, width: '99%' }]}>
                                <Text style={[CommonStyle.btnText,]}>Ok</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}