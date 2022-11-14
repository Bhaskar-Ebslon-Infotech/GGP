import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import Header from '../../Component/Header';
import Plus from '../../images/svg/parentsvg/circlePlus';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { useNavigation } from '@react-navigation/native';

export default function ChooseVideoMixList() {
    const navigation = useNavigation();
    const [videoModal, setVideoModal] = useState(false);
    const [clicked, setClicked] = useState(false);
    const onBuffer = () => {

    }
    const videoError = () => {

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
            <TouchableOpacity onPress={() => navigation.navigate('BottomTabBar', { screen: 'CreateVideoMix' })}>
                <Video source={item.url}
                    onBuffer={onBuffer}
                    onError={videoError}
                    resizeMode="cover"
                    style={styles.video}
                    paused={false}
                />
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true} />
            <View style={{}}>

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    numColumns={2}
                    ListHeaderComponent={
                        <View style={{ padding: Spacing.PADDING_15 }}>
                            <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_25, color: '#353535' }]}>Choose VideoMix</Text>
                            <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_25 }]}>
                                <TextInput placeholder='Or Create and Type New VideoMix' style={[styles.input]} />
                                <Plus height={hp(4)} width={wp(7)} style={{ marginLeft: Spacing.PADDING_7 }} />
                            </View>
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
        marginTop: Spacing.PADDING_15,
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
        paddingVertical: Spacing.PADDING_5,
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
        marginRight: Spacing.PADDING_10,
        marginStart: Spacing.PADDING_10
    },
    modalText: {
        position: 'absolute',
        left: hp(6)
    },
    input: {
        paddingHorizontal: Spacing.PADDING_15,
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
    }
})