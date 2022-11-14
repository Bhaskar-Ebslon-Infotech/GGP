import React, { useEffect, useState, useContext } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image, Pressable, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Down from '../../images/svg/parentsvg/dropDown';
import Flag from '../../images/svg/parentsvg/flag';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import Header from '../../Component/Header';
import Plush from '../../images/svg/parentsvg/plus';
import Icon from "react-native-vector-icons/FontAwesome"
import { useIsFocused, useNavigation } from '@react-navigation/native';
import parentStyle from '../../Styles/parentStyle';
import { deleteaddress, getaddress } from '../../api/Address';
import { getAddress, setAddress } from '../../api/user';
import Trash from '../../images/svg/parentsvg/trash';
import { PRIMARY } from '../../Styles/theme/Colors';
import { LoaderContext, toggleModalContext } from '../../../App';


export default function AddSelection(props) {
    const navigation = useNavigation();
    const focused = useIsFocused()
    const [loading, setLoading] = useContext(LoaderContext);
    const [addressArr, setAddressArr] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({});
    const { toggleObj, messageObj } = useContext(toggleModalContext)
    const [toggleModal, setToggleModal] = toggleObj;
    const [message, setMessage] = messageObj;



    const handleGetAllAddresses = async () => {
        setLoading(true)
        try {
            let { data: res } = await getaddress();
            console.log(JSON.stringify(res, null, 2), "Data");
            if (res.data) {

                let tempSelectedAddress = await getAddress()
                if (tempSelectedAddress) {
                    tempSelectedAddress = JSON.parse(tempSelectedAddress)
                    setSelectedAddress(tempSelectedAddress)
                }

                setAddressArr(res.data)
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


    const handleDeleteAddress = async (id) => {
        setLoading(true)
        try {
            let { data: res } = await deleteaddress(id);
            if (res.message) {
                console.log(res.message, 'response')
                handleGetAllAddresses()
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
        if (focused) {
            handleGetAllAddresses()
            //console.log(JSON.stringify(props, null, 2), "id")
        }
    }, [focused])

    const handleGoBackToKidCart = async (obj) => {
        let temp = JSON.stringify(obj)
        console.log(temp)
        await setAddress(temp)
        props.navigation.navigate("KidCard", { data: props?.route?.params?.data })
    }


    const checkIsSelected = (id) => {
        if (selectedAddress.id == id) {
            return true
        }
        else {
            return false
        }
    }

    const renderItem = ({ item }) => {
        return (
            <Pressable style={[styles.listView, { borderColor: checkIsSelected(item.id) ? Colors.GRADIENT1 : "grey" }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(1) }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('EditNewAddress', { data: item }); }} style={{ position: 'absolute', right: hp(3.5), zIndex: 150 }}><Icon name='pencil' size={25} color={'black'} style={{ marginRight: hp(1) }} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteAddress(item.id)} style={{ position: 'absolute', right: hp(1), zIndex: 150 }}><Trash height={hp(3)} width={wp(5)} style={{ alignSelf: 'flex-end' }} /></TouchableOpacity>
                </View>
                {/* <Pressable style={{ zIndex: 0 }} onPress={() => { handleGoBackToKidCart(item) }}> */}
                <Pressable onPress={() => handleGoBackToKidCart(item)} style={{ zIndex: 0 }} >
                    <Text style={[styles.listText]}>{item.address_name}</Text>
                    <Text style={[styles.listText]}>{item.address_line_1} {item.address_line_2} {item.city} {item.state} {item.country} - {item.pincode}</Text>
                    <Text style={[styles.listText]}>{item.landmark}</Text>
                    <Text style={[styles.listText]}>{item.mobile}</Text>
                </Pressable>
            </Pressable>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
            <ImageBackground source={require('../../images/bg2.png')} style={[commonStyle.fullSize]}>
                <Header logo={true} />
                <View style={{ paddingHorizontal: Spacing.MARGIN_20, paddingTop: Spacing.MARGIN_20 }}>
                    <Text style={[styles.heading]}>Address Selection</Text>
                    <View style={[styles.input, { backgroundColor: Colors.GRADIENT1, }]}>
                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} onPress={() => navigation.navigate('AddAddress')}>
                            <Text style={[styles.heading, { color: "white", fontSize: 15, marginTop: 0, flex: 1, paddingLeft: 15 }]}>Enter new Address</Text>
                            <Icon name="plus" color="white" size={20} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={addressArr}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: hp(25) }}
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
        position: "relative",
        borderWidth: 1,
        padding: Spacing.MARGIN_10,
        borderColor: '#BFBFBF',
        marginTop: Spacing.MARGIN_10,
        backgroundColor: Colors.WHITE
    },
    listTitle1: {
        color: Colors.PRIMARY,
        fontSize: Typography.FONT_SIZE_20,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
        textAlign: 'center'
    },
})