import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Sound from "react-native-sound";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LoaderContext, toggleModalContext } from '../../App';
import { getKidDashboardBackgroundImg } from '../api/user';
import { BackgroundImageValContext } from '../Context/BackgroundContext';
import Achievement1 from '../images/svg/achievement1';
import BonusTeady from '../images/svg/bonusTeady';
import Cart from '../images/svg/cart';
import DashboardBlessing from '../images/svg/dashboardBlessing';
import DashboardCoin from '../images/svg/dashboardCoin';
import DashboardShare from '../images/svg/dashboardShare';
import DashboardStory from '../images/svg/dashboardStory';
import DashboardVideo from '../images/svg/dashboardVideo';
import Give from '../images/svg/give';
import Heart from '../images/svg/heart';
import Plant from '../images/svg/plant';
import Setting from '../images/svg/settings';
import SoundImg from '../images/svg/sound';
import Vault from '../images/svg/Vault';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing } from '../Styles/theme/index';

export default function Dashboard(props) {
    const navigation = useNavigation();
    let width = Dimensions.get("window").width;
    let height = Dimensions.get("window").height;
    const [trayIsOpen, setTrayIsOpen] = useState(false);
    const [loading, setLoading] = useContext(LoaderContext);
    const [backgroundImageVal, setBackgroundImageVal] = useContext(BackgroundImageValContext)
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [playing, setPlaying] = useState(true);
    var woosh = null
    const backgroundImages = [
        {
            id: 1,
            img: require('../images/kbg1.png'),
        },
        {
            id: 2,
            img: require('../images/kbg2.png'),
        },
        {
            id: 3,
            img: require('../images/kbg3.png'),
        },
        {
            id: 4,
            img: require('../images/kbg4.png'),
        },
        {
            id: 5,
            img: require('../images/kbg5.png'),
        },
    ]


    // Enable playback in silence mode
    Sound.setCategory('Playback');

    const focused = useIsFocused()



    const handlePlayBack = () => {
        if (playing) {
            whoosh = new Sound('cuteavalanche.mp3', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                // // loaded successfully
                // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

                // Play the sound with an onEnd callback
                whoosh.play();
            });
            whoosh.setVolume(1.0);

            // Position the sound to the full right in a stereo field
            whoosh.setPan(1);

            // Loop indefinitely until stop() is called
            whoosh.setNumberOfLoops(-1);
            setPlaying(true)
        }

    }




    useEffect(() => {
        if (focused) {
            handlePlayBack()
        }
        return () => handlePlayBackStop()
    }, [focused])



    const handleGetKidBgImage = async () => {
        let backgroundDash = await getKidDashboardBackgroundImg()
        if (backgroundDash) {
            backgroundDash = JSON.parse(backgroundDash)
            let obj = backgroundImages.find(el => el.id == backgroundDash.id)
            console.log(obj, "object")
            setBackgroundImageVal(obj);
        }
        else {

            setBackgroundImageVal(backgroundImages[0]);
        }


    }




    useEffect(() => {
        if (focused) {
            handleGetKidBgImage()
            // const backgroundDash = getKidDashboardBackgroundImg()
        }
    }, [focused])

    const handlePlayBackStop = () => {
        whoosh.stop();
    }

    const handleComingSoon = () => {
        setToggleModal(true)
        setMessage("Functionality coming soon")
    }

    const handleSetVolume = () => {
        if (playing) {
            whoosh.stop();
            setPlaying(false)
        }
        else {
            whoosh.play();
            setPlaying(true)
        }
    }
    return (

        <ImageBackground source={backgroundImageVal?.img}
            style={{
                width: wp(100),
                height: hp(100),
                backgroundColor: Colors.WHITE,
                // padding: 20,
                // paddingVertical: 40,
                position: 'absolute',
                bottom: 0
            }}
            imageStyle={{
                resizeMode: "cover",
                alignSelf: "flex-end"
            }}
        >
            <>

                <View style={[commonStyle.flexRow, { justifyContent: 'space-between', paddingHorizontal: Spacing.MARGIN_10, position: 'absolute', top: hp(5), width: wp(100) }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('Award')}>
                        {/* <TouchableOpacity style={{marginTop:90}} onPress={() => navigation.navigate('Award')}> */}
                        <Achievement1 height={hp(4)} width={wp(8)} />
                    </TouchableOpacity>
                    <View style={[commonStyle.flexRow]}>
                        <TouchableOpacity onPress={() => handleSetVolume()}>
                            {
                                playing ?
                                    <SoundImg height={hp(4)} width={wp(8)} style={{ marginRight: Spacing.MARGIN_15 }} />
                                    :
                                    <View style={{ backgroundColor: Colors.GRADIENT1, padding: 8, marginRight: 15, borderRadius: 50 }}>
                                        <Image style={{ height: 15, width: 15 }} source={require('../images/no-sound.png')} />
                                    </View>

                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}><Setting height={hp(4)} width={wp(8)} style={{ marginVertical: Spacing.MARGIN_15 }} /></TouchableOpacity>
                    </View>
                </View>
                <View style={[commonStyle.flexRow, { justifyContent: 'space-between', position: 'absolute', top: hp(40), width: wp(100) }]}>
                    <View style={{ backgroundColor: '#AA23AD', width: trayIsOpen ? wp(47) : wp(21), justifyContent: "space-between", borderTopRightRadius: Spacing.MARGIN_15, borderBottomRightRadius: Spacing.MARGIN_15, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ paddingLeft: Spacing.MARGIN_15, paddingRight: Spacing.PADDING_7, flexDirection: 'column' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Goals')}><Heart height={hp(4)} width={wp(8)} style={{ marginVertical: Spacing.MARGIN_15 }} /></TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Shop')}><Cart height={hp(4)} width={wp(8)} style={{ marginVertical: Spacing.MARGIN_15 }} /></TouchableOpacity>
                            <TouchableOpacity onPress={() => { handleComingSoon() }}><Plant height={hp(4)} width={wp(8)} style={{ marginVertical: Spacing.MARGIN_15 }} /></TouchableOpacity>
                            <TouchableOpacity onPress={() => { handleComingSoon() }}><Give height={hp(4)} width={wp(8)} style={{ marginVertical: Spacing.MARGIN_15 }} /></TouchableOpacity>
                        </View>
                        {
                            trayIsOpen &&
                            <View style={{ paddingLeft: Spacing.MARGIN_15, paddingRight: Spacing.PADDING_7, flexDirection: 'column', justifyContent: "space-between" }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Goals')}><Text style={{ color: "white", fontSize: 18, }}>Goals</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Shop')}><Text style={{ color: "white", marginTop: 35, fontSize: 18 }}>Shop</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => { handleComingSoon() }}><Text style={{ color: "white", marginTop: 35, fontSize: 18 }}>Grow</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => { handleComingSoon() }}><Text style={{ color: "white", marginTop: 35, fontSize: 18 }}>Donate</Text></TouchableOpacity>
                            </View>
                        }
                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => setTrayIsOpen(!trayIsOpen)}><AntDesign name={trayIsOpen ? 'left' : "right"} size={Spacing.SIZE_30} color={'#fff'} /></TouchableOpacity>
                    </View>
                    <View style={{ paddingRight: Spacing.MARGIN_15, paddingRight: Spacing.PADDING_7, flexDirection: 'column' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('DailyMission')}><Image source={require("../images/mission.png")} resizeMethod="resize" resizeMode="contain" style={{ marginVertical: Spacing.PADDING_7, height: hp(8), width: wp(15) }} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('VideoList')}><DashboardVideo height={hp(8)} width={wp(15)} style={{ marginVertical: Spacing.PADDING_7, }} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleComingSoon() }}><DashboardStory height={hp(8)} width={wp(15)} style={{ marginVertical: Spacing.PADDING_7, }} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleComingSoon() }}><DashboardShare height={hp(8)} width={wp(15)} style={{ marginVertical: Spacing.PADDING_7, }} /></TouchableOpacity>
                    </View>
                </View>


                <View style={[commonStyle.flexRow, {
                    justifyContent: 'space-between', position: 'absolute', width: wp(100), bottom: -Spacing.PADDING_7
                }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('EnterPin')}>< DashboardCoin height={hp(12)} width={wp(22)} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('PiggyBank')}><DashboardBlessing height={hp(12)} width={wp(22)} /></TouchableOpacity>
                </View>
            </>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    topBg: {
        width: wp(100),
        marginTop: -Spacing.MARGIN_48,
        height: hp(50),
    }
})