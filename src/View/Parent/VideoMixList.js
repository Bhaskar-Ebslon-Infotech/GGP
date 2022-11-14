import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { kidContext } from '../../Context/CurrentKidContext';
import { addVideoInFromAdminPlaylist, getAllUserPlaylistByKidId } from '../../api/UserPlaylist';
import Header from '../../Component/Header';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { LoaderContext, toggleModalContext } from '../../../App';


export default function VideoMixList(props) {
    const navigation = useNavigation();
    const [videoModal, setVideoModal] = useState(false);
    const [clicked, setClicked] = useState(false);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [loading, setLoading] = useContext(LoaderContext);
    const onBuffer = () => {

    }
    const videoError = () => {

    }

    const focused = useIsFocused()
    const [playlistArr, setPlaylistArr] = useState([]);


    const [currentKid, setCurrentKid] = useContext(kidContext);
    const getPlaylist = async () => {
        setLoading(true)
        try {
            let { data: res } = await getAllUserPlaylistByKidId(currentKid._id)
            if (res.data) {
                setPlaylistArr([...res.data])
                if (!(res.data.length > 0)) {
                    props.navigation.navigate("KidsVideoList", { redirectBack: true })
                }
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


    const handleOnint = () => {
        getPlaylist()
    }

    useEffect(() => {
        if (focused) {
            handleOnint()
        }
    }, [focused])

    const handleAddVideoToPlaylist = async (id) => {
        setLoading(true)
        try {
            let obj = {
                kidId: props?.route?.params?.data?.kidId,
                userId: props?.route?.params?.data.userId,
                videoId: props?.route?.params?.data?.videoId,
                userPlaylistId: id,
                reward: parseInt(props?.route?.params?.data?.reward),
                bonus: parseInt(props?.route?.params?.data?.bonus),
                timeAndDateObj: props?.route?.params?.data?.timeAndDateObj
            }
            console.log(JSON.stringify(obj, null, 2))
            console.log(props.route.params)
            let { data: res } = await addVideoInFromAdminPlaylist(obj);
            if (res.success) {
                setToggleModal(true)
                setMessage(res.message)
                navigation.navigate('KidsVideoList')
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
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleAddVideoToPlaylist(item._id)}>
                <ImageBackground imageStyle={{ borderRadius: 15, }} style={styles.video} source={require('../../images/dashboardCard.png')} >
                    <Text style={{ color: "white" }}>{item.name}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true} />
            <View style={{}}>

                <FlatList
                    data={playlistArr}
                    renderItem={renderItem}
                    numColumns={2}
                    ListHeaderComponent={
                        <View style={{ padding: Spacing.MARGIN_15 }}>
                            <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_25, color: '#353535' }]}>Choose VideoMix</Text>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>

        </View>
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
    }
})