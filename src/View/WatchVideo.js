import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import WebView from 'react-native-webview';
import { LoaderContext, toggleModalContext } from '../../App';
import { getVideoByid } from '../api/UserPlaylistVideo';
import Mission from '../images/svg/mission';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';

export default function WatchVideo(props) {

    const focused = useIsFocused()

    const [videoObj, setVideoObj] = useState({});
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [videoIsLoading, setVideoIsLoading] = useState(null);
    const [loading, setLoading] = useContext(LoaderContext);

    const GetAllVideosForKid = async () => {
        setLoading(true)
        try {
            let { data: res } = await getVideoByid(props.route.params.data)
            if (res.data) {
                let tempobj = res.data;

                if (tempobj.videoUrl.includes('youtube') || tempobj.videoUrl.includes('you')) {
                    if (tempobj.videoUrl.includes("watch?v=")) {
                        let textArr = tempobj.videoUrl.split('/')
                        let tempText = textArr[textArr.length - 1].split("watch?v=")
                        tempobj.videoUrl = `https://www.youtube.com/embed/${tempText[tempText.length - 1]}`
                    }
                    else {
                        let textArr = tempobj.videoUrl.split('/')
                        console.log(textArr)
                        tempobj.videoUrl = `https://www.youtube.com/embed/${textArr[textArr.length - 1]}`
                    }
                }
                console.log(tempobj.videoUrl)
                setVideoObj(tempobj)
                // setVideoArr(res.data)
            }
            console.log(JSON.stringify(res.data, null, 2))
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

    useEffect(() => {
        if (focused) {
            GetAllVideosForKid()
        }
    }, [focused])


    const videoError = (e) => {
        console.log(e)
    }
    const onBuffer = (e) => {
        console.log(e)
    }
    if (!focused) {
        return null
    }

    // return (
    //     <View style={{ display: 'flex', flex: 1 }}>


    //         <WebView
    //             // onLoadStart={() => { setVideoIsLoading(true); alert("load start") }}
    //             // onLoad={() => setVideoIsLoading(false)}
    //             style={[styles.video, { opacity: 0.99 }]}
    //             originWhitelist={['*']}
    //             allowsInlineMediaPlayback
    //             allowFileAccess
    //             androidLayerType="software"
    //             allowFileAccessFromFileURLs
    //             javaScriptEnabled={true}
    //             androidHardwareAccelerationDisabled={true}
    //             source={{ uri: "https://www.google.com" }}
    //         // source={{ uri: videoObj.videoUrl }}
    //         />
    //     </View>
    // )
    // getVideoByid
    return (
        <View style={{ flex: 1, display: 'flex', }}>
            {/* <Header /> */}
            <Image source={require('../images/watch.png')} resizeMode='stretch' style={styles.img} />
            <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK, marginTop: Spacing.MARGIN_30 }]}>Watch and Earn</Text>
            <Text style={[styles.inr]}>{videoObj?.reward} INR</Text>
            <View style={[commonStyle.flexRow, { alignSelf: 'center' }]}>
                <Text style={[styles.inr, { color: 'red', fontSize: Typography.FONT_SIZE_20 }]}>+{videoObj?.bonus} INR</Text>
                <View style={{ backgroundColor: '#CCBDFF', padding: Spacing.MARGIN_5, borderRadius: 15, marginLeft: Spacing.MARGIN_15 }}>
                    <Mission height={hp(3)} width={wp(6)} />
                </View>
            </View>
            <View style={{ flex: 1, display: 'flex', }}>
                {
                    focused &&
                    <WebView
                        // onLoadStart={() => { setVideoIsLoading(true); alert("load start") }}
                        // onLoad={() => setVideoIsLoading(false)}
                        style={[styles.video, { opacity: 0.99 }]}
                        originWhitelist={['*']}
                        allowsInlineMediaPlayback
                        allowFileAccess
                        allowFileAccessFromFileURLs
                        javaScriptEnabled={true}
                        scrollEnabled={false}
                        androidHardwareAccelerationDisabled={true}
                        // source={{ uri: "https://www.google.com" }}
                        source={{ uri: videoObj.videoUrl }}
                    />

                }
            </View>

            <TouchableOpacity onPress={() => props.navigation.navigate('TimeOut')}>
                <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK, marginTop: Spacing.MARGIN_15, fontSize: Typography.FONT_SIZE_20 }]}>{videoObj?.videoHeading}</Text>
            </TouchableOpacity>
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
    video: {
        width: "100%",
        height: hp(27),
        overflow: "hidden",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    inr: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_25,
        fontWeight: '700',
        color: Colors.PRIMARY,
        textAlign: 'center',
        marginLeft: Spacing.PADDING_7,
    }
})