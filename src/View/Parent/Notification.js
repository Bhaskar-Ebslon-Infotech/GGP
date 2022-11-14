import { View, Text, ImageBackground, FlatList, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../Component/CommonHeader';
import { useIsFocused } from '@react-navigation/native';
import { getAllNotificationsByUserId } from '../../api/Notification';
import { LoaderContext, toggleModalContext } from '../../../App';
import { Colors } from '../../Styles/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { kidContext } from '../../Context/CurrentKidContext';

export default function Notification(props) {
  const [currentKid, setCurrentKid] = useContext(kidContext);
  const focused = useIsFocused()
  const [notificationArr, setNotificationArr] = useState([]);
  const [loading, setLoading] = useContext(LoaderContext);
  const { toggleObj, messageObj } = useContext(toggleModalContext)
  const [toggleModal, setToggleModal] = toggleObj;
  const [message, setMessage] = messageObj;
  const renderNotification = ({ item, index }) => {
    return (

      <View style={[styles.view]}>
        <Text style={[styles.text]}>{item.text}</Text>
        <Text style={{ fontSize: 12, alignSelf: 'flex-end', }}>{new Date(item?.createdAt).toDateString()}</Text>
      </View>

    )
  }

  const getAllNotifications = async () => {
    setLoading(true)
    try {

      let { data: res } = await getAllNotificationsByUserId(currentKid._id)
      if (res?.data) {
        setNotificationArr(res.data)
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
      getAllNotifications()
    }
  }, [focused])

  return (
    // <View style={{ backgroundColor: '#fff', flex: 1 }}>
    <ImageBackground source={require('../../images/bg2.png')} style={{ height: '100%', width: '100%' }}>
      <Header />
      <FlatList
        data={notificationArr}
        //data={data}
        renderItem={renderNotification}
        keyExtractor={item => item._id}
        contentContainerStyle={{ padding: 15 }}
        ListHeaderComponent={

          <Text style={{ fontFamily: 'Cookies', fontSize: 22, alignSelf: 'center', marginTop: hp(3), marginBottom: hp(2) }}>Notifications</Text>
        }
      />
    </ImageBackground>

    // </View >
  )
}
const styles = StyleSheet.create({
  view: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    borderColor: Colors.GRADIENT1,
    marginTop: hp(2),
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 15,
    color: 'black',
    fontFamily: 'Montserrat-Regular'
  }
})