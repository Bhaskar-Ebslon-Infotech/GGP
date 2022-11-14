import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Down from '../../images/svg/parentsvg/dropDown';
import Flag from '../../images/svg/parentsvg/flag';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import Header from '../../Component/Header';
import Plush from '../../images/svg/parentsvg/plus';
import { useNavigation } from '@react-navigation/native';
import parentStyle from '../../Styles/parentStyle';

export default function EditAddress() {
    const navigation = useNavigation();
    const data = [
        {
            id: 1,
            name: 'Purva Agrawal',
            address: '123 Tier 1 Mumbai, India',
            phone: '+1234567',
        },
        {
            id: 2,
            name: 'Purva Agrawal',
            address: '123 Tier 1 Mumbai, India',
            phone: '+1234567',
        }
    ]
    const renderItem = ({ item }) => {
        return (
            <View style={[styles.listView]}>
                <Text style={[styles.listText]}>{item.name}</Text>
                <Text style={[styles.listText]}>{item.address}</Text>
                <Text style={[styles.listText]}>{item.phone}</Text>
            </View>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ImageBackground source={require('../../images/bg2.png')} style={[commonStyle.fullSize]}>
                <Header logo={true} />
                <View style={{ paddingHorizontal: Spacing.MARGIN_20, paddingTop: Spacing.MARGIN_20 }}>
                    <Text style={[styles.heading]}>Address Selection</Text>
                    <View style={[styles.input]}>
                        <TextInput placeholder='Edit address' />
                        <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
                            <Plush height={hp(3)} width={wp(5)} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index}
                    />
                </View>
                <Image source={require('../../images/bonusTeady.png')} resizeMode='contain' style={[parentStyle.bottonPg]} />
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    heading: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_22,
        color: Colors.LIGHT_BLACK,
        marginTop: Spacing.MARGIN_15,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        height: hp(5.8),
        borderRadius: 30,
        borderColor: '#9A9A9A',
        backgroundColor: Colors.WHITE,
        paddingHorizontal: Spacing.MARGIN_15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Spacing.MARGIN_15
    },
    listText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.LIGHT_BLACK,
    },
    listView: {
        borderWidth: 1,
        padding: Spacing.MARGIN_10,
        borderColor: '#BFBFBF',
        marginTop: Spacing.MARGIN_10,
        backgroundColor: Colors.WHITE
    }
})