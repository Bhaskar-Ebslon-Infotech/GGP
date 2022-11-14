import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/Ionicons";
import { kidContext } from '../Context/CurrentKidContext';
import {
  removeRole,
  userData
} from '../api/user';
import Menu from '../images/svg/menu';
import Back from '../images/svg/parentsvg/back';
import Boy from '../images/svg/parentsvg/cardBoy';
import commonStyle from '../Styles/commonStyle';
import { Colors, Spacing, Typography } from '../Styles/theme';
import { LoaderContext, toggleModalContext } from '../../App';

export default function Header(props) {
  const navigation = useNavigation();
  const [currentKid, setCurrentKid] = useContext(kidContext);
  const [userObj, setUserObj] = useState({});
  const [kidArr, setKidArr] = useState([]);
  const focused = useIsFocused()
  const [initials, setInitials] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useContext(LoaderContext);
  const { toggleObj, messageObj } = useContext(toggleModalContext)
  const [toggleModal, setToggleModal] = toggleObj;
  const [message, setMessage] = messageObj;



  useEffect(() => {
    if (focused) {
      handleGetUserData()
    }
  }, [focused, currentKid]);



  const SetHeaderInitials = () => {
    if (currentKid) {
      let str = ""
      if (currentKid.firstName) {
        let letter1 = currentKid?.firstName?.charAt(0)
        let letter2 = currentKid?.firstName?.charAt(1)
        str = `${letter1}${letter2}`
        setInitials(str)
      }
    }
  }



  const handleGetUserData = async () => {
    setLoading(true)
    try {
      const { data: res } = await userData();
      if (res.success) {
        setUserObj(res.data);
        SetHeaderInitials()
        let tempArr = res?.data?.familyObj?.kidIdArr.map(el => {
          if (el?.kidId == currentKid?._id) {
            el.checked = true
          }
          else {
            el.checked = false
          }
          return el
        })
        setKidArr([...tempArr]);
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
  };

  // const logoutUser = async () => {
  //   await removeFavcyAuthToken();
  //   await removeAuthToken();
  //   await removePhoneNumber();
  //   setIsAuthorised(false);

  // };

  const handleSetCurentKidFromHeader = (kidId) => {
    let tempObj = kidArr.find(el => el.kidData._id == kidId)
    setCurrentKid(tempObj.kidData)
  }


  const renderItem = ({ item, index }) => {
    return (
      <View style={{ marginTop: hp(3), width: '100%' }}>
        <Pressable onPress={() => handleSetCurentKidFromHeader(item.kidData._id)} style={[styles.card, { backgroundColor: item.checked ? "white" : "transparent", borderColor: "white", borderWidth: 1, borderRadius: 20 }]}>
          <View style={[commonStyle.flexRow]}>
            <Boy height={hp(8)} width={wp(14)} />
            <Text style={[styles.cardTitle, { flex: 1, flexWrap: "wrap", color: item.checked ? "black" : "white" }]}>
              {item?.kidData?.firstName}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };


  return (
    <View style={[styles.bg]}>
      <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
        {props.menu == true && (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Menu height={hp(5)} width={wp(8)} />
          </TouchableOpacity>
        )}
        {props.logo == true &&
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <Back height={hp(5)} width={wp(8)} />
          </TouchableOpacity>
        }
        <Pressable onPress={() => { setModalVisible(true) }} style={[styles.mainView]}>
          <View style={[styles.view]}>
            <Text style={[styles.text]}>
              {initials}
            </Text>
          </View>
        </Pressable>
      </View>



      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>

          <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.modalView, { padding: 2, borderRadius: 5 }]} >
            <Pressable onPress={() => setModalVisible(false)} style={{ position: "absolute", right: 15, top: 15, paddingLeft: 20, zIndex: 150, paddingBottom: 20 }}>
              <Icon name="close-circle-outline" size={35} color="white" />
            </Pressable>
            <Text style={styles.modalText}>{userObj.firstName}'s Children</Text>
            <FlatList
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item._id}`}
              data={kidArr}
            />
          </LinearGradient>
        </View>
      </Modal>



    </View>
  );
}
const styles = StyleSheet.create({

  bg: {
    backgroundColor: Colors.WHITE,
    padding: Spacing.MARGIN_5,
    paddingHorizontal: Spacing.MARGIN_15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalView: {
    position: "relative",
    margin: 20,
    // backgroundColor: Colors.GRADIENT2,
    borderRadius: 20,
    padding: 35,
    width: wp(90),
    minHeight: hp(80),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  modalText: {
    fontFamily: 'Montserrat-Regular',
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: '600',
  },


  card: {
    width: wp(70),
    marginRight: hp(3),
    padding: Spacing.PADDING_15,
  },
  cardTitle: {
    fontFamily: 'Cookies',
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: '600',
    marginLeft: Spacing.MARGIN_20,
  },
  mainView: {
    backgroundColor: Colors.SECONDARY,
    height: hp(6),
    width: hp(6),
    borderRadius: 40,
    padding: Spacing.PADDING_4,
  },
  view: {
    backgroundColor: Colors.PRIMARY,
    height: '100%',
    width: '100%',
    borderRadius: 30,
    borderColor: Colors.WHITE,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Typography.FONT_SIZE_15,
    fontFamily: 'Cookies',
    color: Colors.WHITE,
  },


});
