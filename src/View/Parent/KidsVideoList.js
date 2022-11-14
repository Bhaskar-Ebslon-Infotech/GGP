import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TextInput, Image, TouchableOpacity, View, Modal } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { kidContext } from '../../Context/CurrentKidContext';
import { getDecodedToken } from '../../api/user';
import { getAllUserPlaylistByKidId, newUserPlaylist } from '../../api/UserPlaylist';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Component/Header';
import Setting from '../../images/svg/parentsvg/settings';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { LoaderContext, toggleModalContext } from '../../../App';

export default function KidsVideoList(props) {
    const navigation = useNavigation();
    const [videoModal, setVideoModal] = useState(false);
    const [clicked, setClicked] = useState(false);

    const [playlistArr, setPlaylistArr] = useState([]);

    const [playlistName, setPlaylistName] = useState('');

    const focused = useIsFocused()
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [currentKid, setCurrentKid] = useContext(kidContext);
    const [alertModal, setAlertModal] = useState(false)
    const [modalValue, setModalValue] = useState('')





    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('MissionVideoStack', { screen: 'IndivisualVideo', params: { data: item._id, playlistName: item.name } })}>
                <ImageBackground imageStyle={{ borderRadius: 15, }} style={styles.video} source={require('../../images/dashboardCard.png')} >
                    <Text style={{ color: "white" }}>{item.name}</Text>
                </ImageBackground>
            </TouchableOpacity >
        )
    }

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

    const addNewPlaylist = async () => {
        setLoading(true)
        try {
            if (playlistName != "") {

                let tokenObj = await getDecodedToken();
                let obj = {
                    parentId: tokenObj.userId,
                    kidId: currentKid._id,
                    name: playlistName
                }
                let { data: res } = await newUserPlaylist(obj);
                if (res.success) {
                    setPlaylistName("")
                    handleOnint()
                    if (props.route.params.redirectBack) {
                        navigation.goBack()
                    }
                }
            }
            else {
                setAlertModal(true)
                setModalValue("Please Enter a Video Mix Name")

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

    const handleOnint = () => {
        getPlaylist()
    }

    useEffect(() => {
        if (focused) {
            handleOnint()
        }
    }, [focused])



    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true} />
            <View>

                <FlatList
                    data={playlistArr}
                    renderItem={renderItem}
                    numColumns={2}
                    contentContainerStyle={{ paddingBottom: hp(10) }}
                    ListEmptyComponent={
                        <Text style={{ flex: 1, textAlign: "center" }}>No Playlist found</Text>
                    }
                    ListHeaderComponent={
                        <View style={{ padding: Spacing.MARGIN_15 }}>
                            <View style={[commonStyle.flexRow, { alignSelf: 'center' }]}>
                                <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_25, color: '#353535' }]}>My Kid’s VideoMix</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('MissionVideoStack', { screen: 'VideoMixSettings' })}>
                                    <Setting height={hp(3)} width={wp(5)} style={{ marginLeft: 5 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_25 }]}>
                                <TextInput value={playlistName} onChangeText={(val) => setPlaylistName(val)} placeholder='Enter name of new VideoMix' style={[styles.input]} />

                            </View>
                            <TouchableOpacity style={[styles.inputBorder,]} onPress={() => addNewPlaylist()}>
                                <Text>Add Video Mix</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={item => item._id}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={alertModal}
            >
                <View style={[commonStyle.modalBackground]}>
                    <View style={[commonStyle.whiteBg, { backgroundColor: Colors.OFF_YELLOW, }]}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearModal]} >
                            <Image source={require('../../images/modalTeady.png')} resizeMode='contain' style={[commonStyle.modalTeady]} />
                        </LinearGradient>
                        <View style={{ width: '100%' }}>
                            <Text style={[styles.listTitle1, { color: Colors.LIGHT_BLACK, width: '90%', alignSelf: 'center', marginVertical: Spacing.MARGIN_30 }]}>{modalValue}</Text>

                        </View>
                        <TouchableOpacity onPress={() => setAlertModal(false)} style={{ alignSelf: 'center', marginBottom: hp(2) }} >
                            <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[commonStyle.linearBtn]} >
                                <View style={[styles.btnView, { margin: 1, borderRadius: 30, width: '99%' }]}>
                                    <Text style={[commonStyle.btnText,]}>Ok</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
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
        borderRadius: 30,
        backgroundColor: Colors.WHITE,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    inputBorder: {
        borderWidth: 1,
        borderColor: '#9A9A9A',
        borderRadius: 20,
        paddingVertical: 7,
        paddingHorizontal: 10,
        paddingHorizontal: Spacing.PADDING_10,
        marginTop: hp(2),
        alignSelf: 'center'
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
        width: '100%',
        height: hp(5.5),
        borderRadius: 20,
        borderRadius: 20,
        shadowColor: "#000",
        borderRadius: 20,
        backgroundColor: Colors.WHITE,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    listTitle1: {
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_20,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
        textAlign: 'center'
    },
})