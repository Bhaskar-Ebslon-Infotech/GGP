import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { kidContext } from '../../Context/CurrentKidContext';
import { deleteUserPlayList, getAllUserPlaylistByKidId } from '../../api/UserPlaylist';
import Header from '../../Component/Header';
import Remove from '../../images/svg/parentsvg/remove';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import { LoaderContext, toggleModalContext } from '../../../App';

export default function KidsVideoListEdit(props) {
    const [deleteVideoModal, setDeleteVideoModal] = useState(false)
    const [clicked, setClicked] = useState(false);
    const [playlistArr, setPlaylistArr] = useState([]);
    const [selectedObject, setSelectedObject] = useState({});
    const [modalValue, setModalValue] = useState('');
    const [alertModal, setAlertModal] = useState(false)
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [loading, setLoading] = useContext(LoaderContext);
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    // deleteUserPlayList
    const focused = useIsFocused()
    const onBuffer = () => {

    }
    const videoError = () => {

    }
    const [currentKid, setCurrentKid] = useContext(kidContext);


    const getPlaylist = async () => {
        setLoading(true)
        try {
            let { data: res } = await getAllUserPlaylistByKidId(currentKid._id)
            if (res.data) {
                setPlaylistArr([...res.data])
                console.log(JSON.stringify(res.data, null, 2), "response")
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


    const handlePlaylistDelete = async () => {
        setLoading(true)
        try {
            let { data: res } = await deleteUserPlayList(selectedObject._id)
            if (res.message) {
                setToggleModal(true)
                setMessage(res.message)

                setDeleteVideoModal(false)
                getPlaylist()
                console.log(JSON.stringify(res.data, null, 2), "response")
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


    const data = [
        {
            id: '1',
            url: require('../../images/sampleVideo.mp4'),
        },
        {
            id: '2',
            url: require('../../images/sampleVideo.mp4'),
        },
        {
            id: '3',
            url: require('../../images/sampleVideo.mp4'),
        },
        {
            id: '4',
            url: require('../../images/sampleVideo.mp4'),
        },
    ]
    const renderItem = ({ item }) => {
        return (
            <View>
                <ImageBackground imageStyle={{ borderRadius: 15, }} style={styles.video} source={require('../../images/dashboardCard.png')} >
                    <TouchableOpacity onPress={() => { setSelectedObject(item); setDeleteVideoModal(true) }} style={{ zIndex: 10, position: 'absolute', top: Spacing.MARGIN_10, right: Spacing.PADDING_3 }}>
                        <Remove height={hp(4)} width={wp(5)} />
                    </TouchableOpacity>

                    <Text style={{ color: "white", position: "absolute", bottom: 10, left: 10, zIndex: 10 }}>{item.name}</Text>
                </ImageBackground>
            </View>
        )
    }

    useEffect(() => {
        if (focused) {
            getPlaylist()
        }
    }, [focused])

    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true} />
            <View style={{}}>

                <FlatList
                    data={playlistArr}
                    renderItem={renderItem}
                    numColumns={2}
                    ListHeaderComponent={
                        <View style={{ padding: Spacing.MARGIN_15, marginTop: Spacing.MARGIN_20 }}>
                            <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_25, color: '#353535' }]}>Manage VideoMix</Text>

                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteVideoModal}
            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <Text style={[commonStyle.modalText, { marginVertical: Spacing.MARGIN_50 }]}>Are you sure you want to Delete Videomix?</Text>

                        <View style={[commonStyle.flexRow, { alignSelf: 'center', marginBottom: Spacing.MARGIN_30 }]}>
                            <TouchableOpacity style={{ width: '40%' }} onPress={() => handlePlaylistDelete()}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, { color: Colors.WHITE }]}>Yes</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: '40%', marginLeft: 10 }} onPress={() => setDeleteVideoModal(false)}>
                                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                    <View style={[styles.btnView, { width: '99%' }]}>
                                        <Text style={[commonStyle.btnText, {}]}>No</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => setDeleteVideoModal(false)}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_40} />
                    </TouchableOpacity>

                </View>
            </Modal>

        </View >
    )
}
const styles = StyleSheet.create({
    video: {
        borderWidth: 1,
        marginTop: Spacing.MARGIN_15,
        borderColor: Colors.WHITE,
        borderRadius: 15,
        width: wp(46),
        height: hp(25),
        marginHorizontal: Spacing.PADDING_7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE
    },
    topBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.SCALE_12,
        paddingVertical: Spacing.MARGIN_5,
        borderRadius: 20,
        shadowColor: "#000",
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    topBtnTxt: {
        fontSize: Typography.FONT_SIZE_12,
        fontFamily: 'Montserrat-SemiBold',
        color: '#747474',
    },
    modalVideo: {
        width: '100%',
        height: hp(25),
        borderColor: Colors.WHITE,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    box: {
        height: hp(2.5),
        width: hp(2.5),
        borderWidth: 1,
        marginRight: Spacing.MARGIN_10,
        marginStart: Spacing.MARGIN_10
    },
    modalText: {
        position: 'absolute',
        left: hp(6)
    },
    input: {
        paddingHorizontal: Spacing.MARGIN_15,
        width: '90%',
        height: hp(6),
        borderRadius: 20,
        borderRadius: 20,
        shadowColor: "#000",
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    btnView: {
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: Spacing.PADDING_2,
    },
})