import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import Video from 'react-native-video';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import VideoPlay from '../images/svg/videoPlay';
import { getAllUserPlaylistByKidId } from '../api/UserPlaylist';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { LoaderContext, toggleModalContext } from '../../App';
import { getDecodedToken } from '../api/user';


export default function PlayList() {
    const focused = useIsFocused()
    const navigation = useNavigation()
    const onBuffer = () => {

    }
    const videoError = () => {

    }
    const [loading, setLoading] = useContext(LoaderContext);
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const data = [
        {
            id: '1',
            videoUrl: require('../images/sampleVideo.mp4'),
        },
        {
            id: '2',
            videoUrl: require('../images/sampleVideo.mp4'),
        },
        {
            id: '3',
            videoUrl: require('../images/sampleVideo.mp4'),
        },
        {
            id: '4',
            videoUrl: require('../images/sampleVideo.mp4'),
        },
        {
            id: '5',
            videoUrl: require('../images/sampleVideo.mp4'),
        },
        {
            id: '6',
            videoUrl: require('../images/sampleVideo.mp4'),
        },
        {
            id: '7',
            videoUrl: require('../images/sampleVideo.mp4'),
        },
        {
            id: '8',
            videoUrl: require('../images/sampleVideo.mp4'),
        },
        {
            id: '9',
            videoUrl: require('../images/sampleVideo.mp4'),
        },

    ]
    const [playlistArr, setPlaylistArr] = useState([]);

    const getPlaylist = async () => {
        setLoading(true)
        try {
            let decode = await getDecodedToken()
            console.log(decode.userId, 'decode')
            let { data: res } = await getAllUserPlaylistByKidId(decode.userId)
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

    const handleOnint = () => {
        getPlaylist()
    }

    useEffect(() => {
        if (focused) {
            handleOnint()
        }
    }, [focused])

    const renderItem = ({ item }) => {
        console.log(item, 'item43435')
        return (
            <TouchableOpacity onPress={() => navigation.navigate('KidIndivisualVideo', { data: item._id, playlistName: item.name })}>
                <ImageBackground imageStyle={{ borderRadius: 15, }} style={styles.video} source={require('../images/dashboardCard.png')} >
                    <Text style={{ color: "white" }}>{item.name}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
    return (
        <View>
            {/* <Header /> */}

            <View style={{ marginBottom: Spacing.MARGIN_5 }}>



                <FlatList
                    data={[]}
                    renderItem={renderItem}
                    numColumns={2}
                    contentContainerStyle={{ paddingBottom: hp(10) }}
                    ListEmptyComponent={
                        <Text style={{ flex: 1, textAlign: "center" }}>No Playlist found</Text>
                    }
                    ListHeaderComponent={
                        <>
                            <Image source={require('../images/watch.png')} resizeMode='stretch' style={styles.img} />
                            <View style={[commonStyle.flexRow, { alignSelf: 'center', marginVertical: Spacing.MARGIN_30, }]}>
                                <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK, fontSize: Typography.FONT_SIZE_22 }]}>My VideoMix</Text>
                                <VideoPlay height={hp(4)} width={wp(10)} style={{ alignSelf: 'center', marginLeft: Spacing.MARGIN_10 }} />
                            </View>
                        </>
                    }
                    keyExtractor={item => item._id}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    img: {
        width: wp(90),
        height: hp(27),
        alignSelf: 'center',
        marginTop: Spacing.MARGIN_40
    },
    // video: {
    //     width: wp(90),
    //     height: hp(27),
    //     marginTop: Spacing.MARGIN_30
    // },
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
    inr: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_25,
        fontWeight: '700',
        color: Colors.PRIMARY,
        textAlign: 'center',
        marginLeft: Spacing.PADDING_7,
    },
    listVideo: {
        width: wp('45%'),
        height: hp(20),
        alignSelf: 'center',
    },
})