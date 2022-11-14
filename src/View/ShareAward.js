import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, Pressable, PermissionsAndroid, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LoaderContext, toggleModalContext } from '../../App';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { getKidWalletData } from '../api/user';
import { images } from '../Constant/background';
import Coin from '../images/svg/coin';
import Prize from '../images/svg/prize';
import PrizeBg from '../images/svg/prizeBg';
import Teady from '../images/svg/teady';
import commonStyle from '../Styles/commonStyle';
import { ANTDESIGN } from "../Styles/theme/Icons";
import RNFetchBlob from "rn-fetch-blob";
import { Colors, Spacing, Typography } from '../Styles/theme/index';
import ViewShot from "react-native-view-shot";
export default function ShareAward(props) {
    const [collectModal, setCollectModal] = useState(false);
    const [loading, setLoading] = useContext(LoaderContext);
    const [kidObj, setKidObj] = useState({});
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;
    const [shouldDownload, setShouldDownload] = useState(false);
    const focused = useIsFocused();
    const navigation = useNavigation();
    const getUserData = async () => {
        setLoading(true)
        try {
            let { data: res } = await getKidWalletData();
            if (res.data) {
                setKidObj(res.data)
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

    useEffect(() => {
        if (focused)
            getUserData();
    }, [focused])



    const DownloadToStorage = (data) => {
        let dirs = RNFetchBlob.fs.dirs

        RNFetchBlob
            .config({
                // response data will be saved to this path if it has access right.
                path: dirs.DocumentDir + '/award.jpeg'
            })
            .fetch('GET', data, {
                //some headers ..
            })
            .then((res) => {
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path())
            })
        // RNFS.downloadFile({
        //     fromUrl: data,            // URL to download file from
        //     toFile: string,           // Local filesystem path to save the file to
        //     headers?: Headers,        // An object of headers to be passed to the server
        //     background?: boolean,
        //     progressDivider?: number,
        //     begin?: (res: DownloadBeginCallbackResult) => void;
        //     progress?: (res: DownloadProgressCallbackResult) => void;
        //   }
    }

    const onCapture = async (data) => {
        try {

            console.log(data)
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Cool Photo App Camera Permission",
                        message:
                            "Cool Photo App needs access to your camera " +
                            "so you can take awesome pictures.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    if (shouldDownload == true) {
                        console.log("SAVING")

                        const extension = (Platform.OS === 'android') ? 'file://' : ''

                        const folderName = `${extension}${RNFS.DownloadDirectoryPath}`;
                        const fileName = `ggp${new Date().toISOString()}.jpeg`.replace(/:/g, '-');
                        const imagePath = `${folderName}/${fileName}`;
                        console.log(folderName, "folder")
                        console.log(imagePath)
                        console.log(data)
                        RNFS.exists(data).then((success) => {
                            RNFS.copyFile(data, imagePath)
                                .then((success) => {
                                    console.log('file moved!');
                                    setToggleModal(true)
                                    setMessage("Saved in your downloads folder !!!")
                                    setCollectModal(false)
                                })
                                .catch((err) => {
                                    console.log("Error: " + err.message); // <--- but copyFile returns "doesn't exists" error for temp.jpg
                                });

                            console.log('File Exists!'); // <--- here RNFS can read the file and returns this
                        })
                            .catch((err) => {
                                console.log("Exists Error: " + err.message);
                            });

                    }
                    else {
                        RNFS.readFile(data, 'base64').then((res) => {
                            let urlString = 'data:image/jpeg;base64,' + res;
                            let options = {
                                title: `${kidObj?.firstName} unlocked an award !`,
                                message: `${props?.route?.params?.data?.name}`,
                                url: urlString,
                                type: 'image/jpeg',
                            };
                            Share.open(options)
                                .then((res) => {
                                    console.log(res);
                                })
                                .catch((err) => {
                                    err && console.log(err);
                                });
                        });
                    }
                }
            } else {
                // iOS here, so you can go to your Save flow directly
            }
        }

        catch (err) {
            //console.error(err)
        }

    }


    return (
        <View style={{ backgroundColor: "white" }}>
            <ImageBackground source={images.backGround} style={[commonStyle.fullSize]}>
                <ScrollView style={{ paddingTop: Spacing.MARGIN_40, padding: Spacing.PADDING_20, }}>
                    <Text style={[commonStyle.title, { color: Colors.PRIMARY }]}>Share your Award</Text>
                    <Pressable onPress={() => setCollectModal(true)} style={[styles.border]}>
                        {/* <Award height={hp(18)} width={wp(35)} style={[styles.awardImg]} /> */}
                        <Image source={{ uri: props?.route?.params?.data?.imageUrl }} resizeMode='contain' style={[styles.awardImg]} />
                        <Text style={[styles.headTxt]}>{props?.route?.params?.data?.name}</Text>
                    </Pressable>
                    <TouchableOpacity onPress={() => { setShouldDownload(true); setCollectModal(true); }} style={{ paddingHorizontal: Spacing.PADDING_10, marginTop: Spacing.MARGIN_60,zIndex:100 }}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBtn]} >
                            <Text style={[styles.btnText]}>Save</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={[styles.bottomTeadyView]}>
                        <Teady height={hp(30)} width={wp(50)} style={[styles.bottomImg]} />
                        {/* <Image source={require('../images/teady.png')} resizeMode='contain' style={[styles.bottomImg]} /> */}
                        <ImageBackground source={require('../images/shareAward2.png')} resizeMode='contain' style={{ width: wp(35), height: hp(20), alignItems: 'center', }}>
                            <Pressable onPress={() => { setShouldDownload(false); setCollectModal(true) }}>
                                <Image source={require('../images/shareAward1.png')} resizeMode='contain' style={{ width: wp(27), height: hp(10), alignItems: 'center', marginTop: Spacing.MARGIN_22 }} />
                            </Pressable>
                        </ImageBackground>

                    </View>

                </ScrollView>
            </ImageBackground>


            <Modal
                animationType="slide"
                transparent={true}
                visible={collectModal}
            >
                <View style={[commonStyle.modalBackground]}>
                    <ViewShot onCapture={onCapture} captureMode="mount" options={{ format: "jpg", quality: 0.9 }}>
                        <View style={[commonStyle.whiteBg]}>
                            <PrizeBg style={[styles.prizeBg]} height={hp(31)} width={'100%'} />
                            <Prize style={[styles.modalPrize]} height={hp(17)} width={wp(24)} />
                            {/* <ImageBackground source={require('../images/prizeBg.png')} style={[styles.prizeBg]}>
                            <Image source={require('../images/prize.png')} resizeMode="contain" style={[styles.modalPrize]} />
                        </ImageBackground> */}
                            <Text style={[commonStyle.modalTitle]}>{kidObj.firstName} has Unlocked </Text>
                            <Text style={[commonStyle.title, { color: Colors.LIGHT_BLACK }]}> {props?.route?.params?.data?.name}</Text>
                            <Image source={require('../images/teadyPrize1.png')} resizeMode='cover' style={[commonStyle.modalTeady]} />
                        </View>
                    </ViewShot>
                    <TouchableOpacity onPress={() => { setCollectModal(false); }} style={{ marginTop: Spacing.MARGIN_15 }}>
                        <AntDesign name={ANTDESIGN.CIRCEL_CLOSE} color={Colors.WHITE} size={Spacing.SIZE_35} />
                    </TouchableOpacity>
                </View>
            </Modal >





        </View>
    )
}
const styles = StyleSheet.create({
    border: {
        borderWidth: 2,
        padding: Spacing.PADDING_20,
        borderRadius: 20,
        borderColor: Colors.SECONDARY,
        marginTop: Spacing.MARGIN_30,
        backgroundColor: 'white'
    },
    headTxt: {
        fontFamily: 'Cookies',
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.LIGHT_BLACK,
        textAlign: 'center',
    },
    awardImg: {
        // height: hp(18),
        // width: wp(35),
        height: hp(18),
        width: wp(35),
        alignSelf: 'center',
        marginBottom: Spacing.MARGIN_15
    },
    linearBtn: {
        width: '100%',
        borderRadius: 30,
        padding: Spacing.PADDING_2,
        paddingHorizontal: Spacing.PADDING_4
    },
    btnText: {
        textAlign: 'center',
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_18,
        paddingVertical: Spacing.PADDING_5,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold'
    },
    bottomImg: {
        alignSelf: 'flex-end',
        // height: hp(27),
        // width: wp(50),
        // marginRight: Spacing.MARGIN_10,
        marginTop: Spacing.SIZE_170,
    },
    bottomTeadyView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.MARGIN_40,
        marginTop: -Spacing.MARGIN_40

    },
    modalPrize: {
        height: hp(12),
        width: wp(22),
        position: 'absolute',
        alignSelf: 'center',
        top: hp(7)

    },
    modalTeady: {
        position: 'absolute',
        bottom: -10,
        left: -12,
        padding: 0,
        // backgroundColor:"red",
        height: hp(18),
        width: hp(20)
    }

})