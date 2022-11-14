import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import Header from '../../Component/Header';
import Plus from '../../images/svg/parentsvg/circlePlus';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { useNavigation } from '@react-navigation/native';

export default function CreateVideoMix() {
    const navigation = useNavigation();
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
            <TouchableOpacity onPress={() => navigation.navigate('BottomTabBar', { screen: 'KidsVideoList' })}>
                <Video source={item.url}
                    onBuffer={onBuffer}
                    onError={videoError}
                    resizeMode="cover"
                    style={styles.topVideoList}
                    paused={false}
                />
            </TouchableOpacity>
        )
    }

    const educationData = [
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
    const educationRenderItem = ({ item }) => {
        return (
            <TouchableOpacity >
                <Video source={item.url}
                    onBuffer={onBuffer}
                    onError={videoError}
                    resizeMode="cover"
                    style={styles.educationList}
                    paused={false}
                />
            </TouchableOpacity>
        )
    }

    const artData = [
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
    const artRenderItem = ({ item }) => {
        return (
            <TouchableOpacity >
                <Video source={item.url}
                    onBuffer={onBuffer}
                    onError={videoError}
                    resizeMode="cover"
                    style={styles.educationList}
                    paused={false}
                />
            </TouchableOpacity>
        )
    }

    const cookingData = [
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
    const cookingRenderItem = ({ item }) => {
        return (
            <TouchableOpacity >
                <Video source={item.url}
                    onBuffer={onBuffer}
                    onError={videoError}
                    resizeMode="cover"
                    style={styles.educationList}
                    paused={false}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <Header logo={true} />
            <ScrollView contentContainerStyle={{ padding: Spacing.MARGIN_15, paddingBottom: Spacing.MARGIN_20 }}>
                <View style={[commonStyle.flexRow, { alignSelf: 'center' }]}>
                    <Text style={[commonStyle.title, { fontSize: Typography.FONT_SIZE_25, color: '#353535' }]}>Create VideoMix</Text>
                </View>
                <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_25 }]}>
                    <TextInput placeholder='Create New VideoMix' style={[styles.input]} />
                    <Plus height={hp(4)} width={wp(7)} style={{ marginLeft: Spacing.PADDING_7 }} />
                </View>
                <Text style={[styles.title, { marginTop: Spacing.MARGIN_10 }]}>Recomended Videos</Text>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: Spacing.MARGIN_15,
        width: '90%',
        height: hp(6),
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
    title: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: 'Montserrat-SemiBold',
        marginVertical: Spacing.MARGIN_5,
        color: Colors.LIGHT_BLACK
    },
    topVideoList: {
        borderWidth: 1,
        borderRadius: 15,
        marginTop: Spacing.MARGIN_5,
        borderColor: Colors.WHITE,
        borderRadius: 5,
        height: hp(15),
        width: hp(15),
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        marginRight: Spacing.PADDING_7
    },
    head: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_22,
        color: Colors.PRIMARY,
        marginTop: Spacing.PADDING_20
    },
    educationList: {
        borderWidth: 1,
        borderRadius: 15,
        marginTop: Spacing.MARGIN_5,
        borderColor: Colors.WHITE,
        borderRadius: 5,
        height: hp(22),
        width: hp(22),
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        marginRight: Spacing.PADDING_7
    },
})
