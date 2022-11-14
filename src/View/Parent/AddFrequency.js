import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList, Image, ImageBackground, Modal, ScrollView, StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View
} from 'react-native';
import CheckBox from 'react-native-check-box';
import DatePicker from 'react-native-date-picker';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { kidContext } from '../../Context/CurrentKidContext';
import { getActivitiesByCategoryId } from '../../api/activity';
import { createMissions } from '../../api/Missions';
import { getDecodedToken } from '../../api/user';
import Header from '../../Component/Header';
import { images } from '../../Constant/background';
import Add from '../../images/svg/parentsvg/add';
import Calendar from '../../images/svg/parentsvg/calendar';
import Dollar from '../../images/svg/parentsvg/dollar';
import Down from '../../images/svg/parentsvg/down';
import Minus from '../../images/svg/parentsvg/minus';
import MasterData from '../../MasterData';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme';
import { ANTDESIGN } from '../../Styles/theme/Icons';
import { PRIMARY } from '../../Styles/theme/Colors';
import { LoaderContext, toggleModalContext } from '../../../App';

export default function AddFrequency(props) {
  const navigation = useNavigation();
  const focused = useIsFocused()
  const [setupForAllKids, setSetupForAllKids] = useState(false);
  const [addVideoModal, setAddVideoModal] = useState(false);
  const [currentKid, setCurrentKid] = useContext(kidContext);
  const [checked, setChecked] = useState(false);
  const [catId, setCatId] = useState('');
  const [actArr, setActArr] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedMission, setSelectedMission] = useState({});
  const [date, setDate] = useState(new Date());
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
  const [saveModal, setSaveModal] = useState(false)
  const [modalValue, setModalValue] = useState('')
  const [loading, setLoading] = useContext(LoaderContext);
  const { toggleObj, messageObj } = useContext(toggleModalContext)
  const [toggleModal, setToggleModal] = toggleObj;
  const [message, setMessage] = messageObj;
  const handleGetActivity = async () => {
    setLoading(true)
    try {
      let { data: res } = await getActivitiesByCategoryId(props.route.params.data, currentKid._id);
      if (res.success) {
        let tempArr = res.data.map(el => {
          el.disabled = false
          el.attributesArr.map(ele => {
            if (`${ele.name}`.toLowerCase() == "Streak".toLowerCase()) {
              ele.disabled = true
            }
            else {
              ele.disabled = false
            }
            ele.frequencyAmount = 1
            ele.coinsAmount = 0
            return ele
          })

          el.timeAndDateObj = {
            stopOnActive: true,
            stopAfter: 1,
            stopOn: new Date(),
            daysArr: [
              {
                id: '1',
                day: 'SU',
                selected: false
              },
              {
                id: '2',
                day: 'MO',
                selected: false
              },
              {
                id: '3',
                day: 'TU',
                selected: false
              },
              {
                id: '4',
                day: 'WE',
                selected: false
              },
              {
                id: '5',
                day: 'TH',
                selected: false
              },
              {
                id: '6',
                day: 'FR',
                selected: false
              },
              {
                id: '7',
                day: 'SA',
                selected: false
              },
            ]
          }


          return el
        })
        setActArr(tempArr);
        console.log(JSON.stringify(tempArr, null, 2))
        let tempObj = actArr[0]
        setSelectedMission(tempArr[0])
      }
    }
    catch (error) {
      if (error?.response?.data?.message) {
        //console.error(error?.response?.data?.message)
        setToggleModal(true)
        setMessage(error.response.data.message)
      } else {
        setToggleModal(true)
        setMessage(error?.message)
        //console.error(error.message)
      }
    }
    setLoading(false)
  };

  useEffect(() => {
    if (focused) {
      handleGetActivity();
      setCatId(props.route.params.data);
    }
  }, [focused]);

  const handleAfteCountSet = (val) => {
    setSelectedItem(previousState => {
      previousState.timeAndDateObj.stopAfter = val.replace(/[^0-9]/g, '0')
      return { ...previousState }
    })
  }


  const handleDateAndTimeSave = () => {
    let index = actArr.findIndex(el => el._id == selectedItem._id)
    setActArr(previousState => {
      let innerIndex = previousState[index].attributesArr.findIndex(el => `${el.name}`.toLowerCase() == "Streak".toLowerCase())
      if (innerIndex != -1) {
        previousState[index].attributesArr[innerIndex].disabled = true
      }
      previousState[index] = selectedItem
      return [...previousState]
    })
    setAddVideoModal(false)
  }




  const handleMissionCreate = async () => {
    setLoading(true)
    try {
      let decoded = await getDecodedToken()
      let obj = {}
      // console.log(JSON.stringify(selectedMission, null, 2), "asd")
      // if (selectedMission) {
      if (selectedMission && selectedMission?.disabled) {
        // console.log("asd")
        obj.userId = decoded?.userId
        obj.kidId = currentKid?._id
        obj.categoryId = selectedMission?.categoryId
        obj.activityId = selectedMission?._id
        obj.setupForAllKids = checked
        obj.isStreakActive = true
        obj.attributeArr = selectedMission.attributesArr.map(el => {
          el.frequencyAmount = parseInt(el?.frequencyAmount)
          el.coinsAmount = parseInt(el?.coinsAmount)
          return el
        })
      }
      else {
        if (!selectedItem.timeAndDateObj) {
          setToggleModal(true)
          setMessage("Please add time and date")
          setLoading(false)
          return;
        }
        else {
          obj.userId = decoded?.userId
          obj.kidId = currentKid?._id
          obj.categoryId = selectedMission?.categoryId
          obj.activityId = selectedMission?._id
          obj.attributeArr = selectedMission?.attributesArr?.filter(el => `${el?.name}`.toLowerCase() != "Streak".toLowerCase()).map(el => {
            el.frequencyAmount = parseInt(el?.frequencyAmount)
            el.coinsAmount = parseInt(el?.coinsAmount)
            return el
          })
          obj.setupForAllKids = checked
          obj.timeAndDateObj = {}

          obj.timeAndDateObj.daysArr = selectedItem?.timeAndDateObj?.daysArr
          console.log(selectedItem?.timeAndDateObj?.stopOnActive, "selectedItem.stopOnActive")
          if (selectedItem?.timeAndDateObj?.stopOnActive) {
            obj.timeAndDateObj.stopOn = selectedItem?.timeAndDateObj?.stopOn
          }
          else {
            obj.timeAndDateObj.stopAfter = selectedItem?.timeAndDateObj?.stopAfter
          }

        }
      }
      if (selectedMission && selectedMission?.disabled == false && obj?.timeAndDateObj && obj?.timeAndDateObj?.daysArr.every(el => el.selected == false) || (obj?.timeAndDateObj?.stopAfter == 0)) {
        setToggleModal(true)
        setMessage("Please add 'Stop On' OR 'Stop After' frequency and select at least one Day from 'Repeat On' to set Time and Date")
        setLoading(false)
        return;
      }

      if (selectedMission && selectedMission?.attributesArr && selectedMission?.attributesArr.length > 0 && selectedMission?.attributesArr.some(el => el.name.toLowerCase() == "reward" && parseInt(el.coinsAmount) > 9999)) {
        setToggleModal(true)
        setMessage("Maximum 9999 is possible as reward")
        setLoading(false)
        return;
      }
      if (selectedMission && selectedMission?.attributesArr && selectedMission?.attributesArr.length > 0 && selectedMission?.attributesArr.some(el => el.name.toLowerCase() == "bonus" && parseInt(el.coinsAmount) > 9999)) {
        setToggleModal(true)
        setMessage("Maximum 9999 is possible as bonus")
        setLoading(false)
        return;
      }
      if (selectedMission && selectedMission?.attributesArr && selectedMission?.attributesArr.length > 0 && selectedMission?.attributesArr.some(el => el.name.toLowerCase() == "reward" && parseInt(el.coinsAmount) <= 0)) {
        setToggleModal(true)
        setMessage("Minimun 1 is possible as reward")
        setLoading(false)
        return;
      }


      if (selectedMission?.disabled) {
        let temp = obj.attributeArr.some(el => `${el?.name}`.toLowerCase() == "Streak".toLowerCase() && el.frequencyAmount == 0)
        if (temp) {
          setToggleModal(true)
          setMessage("Please add atleast one in frequency before adding a mission")
          setLoading(false)
          return;
        }

        // console.log("create")
        let { data: res } = await createMissions(obj)
        if (res) {
          setSelectedItem({})
          // setSaveModal(true)
          // setModalValue(res.message)
          setLoading(false)
          setToggleModal(true)
          setMessage(res?.message)
        }

      } else {
        // console.log("create")

        // obj.attributesArr = obj?.attributesArr?.filter(el => `${el?.name}`.toLowerCase() != "Streak".toLowerCase())

        // console.log(JSON.stringify(obj?.attributesArr?.filter(el => `${el?.name}`.toLowerCase() != "Streak".toLowerCase()), null, 2))
        // console.log(JSON.stringify(obj, null, 2))



        let { data: res } = await createMissions(obj)
        if (res) {
          setSelectedItem({})
          // setSaveModal(true)
          // setModalValue(res.message)
          setLoading(false)
          setToggleModal(true)
          setMessage(res?.message)
        }

      }



      // }
    }
    catch (error) {
      if (error?.response?.data?.message) {
        //console.error(error?.response?.data?.message)
        setToggleModal(true)
        setMessage(error.response.data.message)
      } else {
        setToggleModal(true)
        setMessage(error?.message)
        //console.error(error?.message)
      }
    }
    setLoading(false)
  }



  const handleOnDateSet = (val) => {
    setSelectedItem(previousState => {
      previousState.timeAndDateObj.stopOn = val
      return { ...previousState }
    })
  }



  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const coinsAmountAdd = (index, indexX) => {
    setActArr(previousState => {
      if (`${previousState[index].attributesArr[indexX].name}`.toLowerCase() == "Streak".toLowerCase()) {
        previousState[index].disabled = true
      }
      previousState[index].attributesArr[indexX].coinsAmount = `${parseInt(previousState[index].attributesArr[indexX].coinsAmount) + 1}`
      return [...previousState]
    })
    setSelectedMission(actArr[currentSliderIndex])
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const coinsAmountMinus = (index, indexX) => {
    setActArr(previousState => {
      if (`${previousState[index].attributesArr[indexX].name}`.toLowerCase() == "Streak".toLowerCase() && parseInt(previousState[index].attributesArr[indexX].coinsAmount) > 0 && parseInt(previousState[index].attributesArr[indexX].coinsAmount) == 1 && parseInt(previousState[index].attributesArr[indexX].frequencyAmount) == 0) {
        // previousState[index].disabled = false
        previousState[index].attributesArr[indexX].coinsAmount = `${parseInt(previousState[index].attributesArr[indexX].coinsAmount) - 1}`
      }
      else if (parseInt(previousState[index].attributesArr[indexX].coinsAmount) > 0) {
        previousState[index].attributesArr[indexX].coinsAmount = `${parseInt(previousState[index].attributesArr[indexX].coinsAmount) - 1}`
      }

      return [...previousState]
    })
    setSelectedMission(actArr[currentSliderIndex])
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSetCoinValue = (val, index, indexX) => {
    if (val[0] == 0) {
      val = `${val}`.slice(1)
    }

    setActArr(previousState => {
      if (val > 0 && `${previousState[index].attributesArr[indexX].name}`.toLowerCase() == "Streak".toLowerCase()) {
        previousState[index].attributesArr[indexX].coinsAmount = val
        previousState[index].disabled = true
      }
      else if (val > 0) {
        previousState[index].attributesArr[indexX].coinsAmount = `${val}`
      }
      else {
        if (previousState[index].attributesArr[indexX].frequencyAmount == 0) {
          previousState[index].disabled = false
        }
        previousState[index].attributesArr[indexX].coinsAmount = 1
      }
      return [...previousState]
    })
    setSelectedMission(actArr[currentSliderIndex])
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSetCoinValue1 = (val, index, indexX) => {
    if (val[0] == 0) {
      val = `${val}`.slice(1)
    }

    setActArr(previousState => {
      if (val > 0 && `${previousState[index].attributesArr[indexX].name}`.toLowerCase() == "Streak".toLowerCase()) {
        previousState[index].attributesArr[indexX].frequencyAmount = val
        previousState[index].disabled = true
      }
      else if (val > 0) {
        previousState[index].attributesArr[indexX].frequencyAmount = val
      }
      else {
        if (previousState[index].attributesArr[indexX].coinsAmount == 0) {
          previousState[index].disabled = false
        }
        previousState[index].attributesArr[indexX].frequencyAmount = 0
      }
      return [...previousState]
    })
    setSelectedMission(actArr[currentSliderIndex])
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const frequencyAmountAdd = (index, indexX) => {
    setActArr(previousState => {
      if (`${previousState[index].attributesArr[indexX].name}`.toLowerCase() == "Streak".toLowerCase() && `${parseInt(previousState[index].attributesArr[indexX].frequencyAmount) + 1}` > 0) {
        previousState[index].disabled = true
      }
      previousState[index].attributesArr[indexX].frequencyAmount = `${parseInt(previousState[index].attributesArr[indexX].frequencyAmount) + 1}`
      return [...previousState]
    })
    setSelectedMission(actArr[currentSliderIndex])
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const frequencyAmountMinus = (index, indexX) => {
    setActArr(previousState => {
      if (`${previousState[index].attributesArr[indexX].name}`.toLowerCase() == "Streak".toLowerCase() && parseInt(previousState[index].attributesArr[indexX].frequencyAmount) > 0 && parseInt(previousState[index].attributesArr[indexX].frequencyAmount) == 1 && parseInt(previousState[index].attributesArr[indexX].coinsAmount) == 0) {
        // previousState[index].disabled = false
        previousState[index].attributesArr[indexX].frequencyAmount = `${parseInt(previousState[index].attributesArr[indexX].frequencyAmount) - 1}`
      }
      else if (parseInt(previousState[index].attributesArr[indexX].frequencyAmount) > 0) {
        previousState[index].attributesArr[indexX].frequencyAmount = `${parseInt(previousState[index].attributesArr[indexX].frequencyAmount) - 1}`
      }
      return [...previousState]
    })
    setSelectedMission(actArr[currentSliderIndex])
  };


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const check = () => {
    setChecked(!checked);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const disableCheck = (index) => {
    let tempArr = actArr
    let innerIndex = tempArr[index].attributesArr.findIndex(el => `${el.name}`.toLowerCase() == "Streak".toLowerCase())
    if (innerIndex != -1) {
      if (tempArr[index].disabled) {
        tempArr[index].disabled = !tempArr[index].disabled;
        if (innerIndex != -1)
          tempArr[index].attributesArr[innerIndex].disabled = true
      }
      else {
        tempArr[index].disabled = !tempArr[index].disabled;
        tempArr[index].attributesArr[innerIndex].disabled = false
      }
      setActArr([...tempArr]);
      //   return [...previousState]
    }
    else {
      setToggleModal(true)
      setMessage("Cannot disable because there is no streak to disable")
    }
    // setActArr(previousState => {
    //   let innerIndex = previousState[index].attributesArr.findIndex(el => `${el.name}`.toLowerCase() == "Streak".toLowerCase())
    //   if (previousState[index].disabled) {
    //     previousState[index].disabled = !previousState[index].disabled;
    //     if (innerIndex != -1)
    //       previousState[index].attributesArr[innerIndex].disabled = true
    //   }
    //   else {
    //     previousState[index].disabled = !previousState[index].disabled;
    //     previousState[index].attributesArr[innerIndex].disabled = false
    //   }
    //   return [...previousState]
    // })
  };


  useEffect(() => {



  }, [actArr])


  const [data, setData] = useState([
    {
      id: '1',
      day: 'SU',
      selected: false
    },
    {
      id: '2',
      day: 'MO',
      selected: false
    },
    {
      id: '3',
      day: 'TU',
      selected: false
    },
    {
      id: '4',
      day: 'WE',
      selected: false
    },
    {
      id: '5',
      day: 'TH',
      selected: false
    },
    {
      id: '6',
      day: 'FR',
      selected: false
    },
    {
      id: '7',
      day: 'SU',
      selected: false
    },
  ]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleDaySeletion = (index) => {
    setSelectedItem(previousState => {
      previousState.timeAndDateObj.daysArr = selectedItem.timeAndDateObj.daysArr.map((el, i) => {
        if (i == index) {
          el.selected = !el.selected
        }
        return el
      })
      return { ...previousState }
    })
  }

  useEffect(() => {

  }, [selectedItem])



  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const daysRenderItem = ({ item, index }) => {
    return (
      <View style={{ marginTop: Spacing.PADDING_5 }}>
        <TouchableOpacity onPress={() => handleDaySeletion(index)} style={{ backgroundColor: item.selected ? Colors.PRIMARY : Colors.WHITE, height: hp(3), width: wp(6), justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
          <Text style={{ color: item.selected ? Colors.WHITE : Colors.LIGHT_BLACK }}>{item.day.slice(0, 2)}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const ActRenderItem = ({ item, index }) => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={[styles.whiteBg]}>
          <FlatList
            ListHeaderComponent={
              <>
                <View
                  style={[
                    commonStyle.flexRow,
                    styles.brush,
                    { marginTop: Spacing.MARGIN_10 },
                  ]}>
                  <Image
                    source={{ uri: item.thumbnailImage }}
                    style={[{ height: hp(12), width: wp(25) }, styles.brush]}
                  />
                  <Text style={[styles.heading, { width: wp(50) }]}>{item.name}</Text>
                </View>
                <Text style={[styles.title, { marginTop: Spacing.MARGIN_20 }]}>
                  Reminder
                </Text>
                <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                  <View style={[commonStyle.flexRow]}>
                    <Text style={[styles.contain]}>Disable Date</Text>
                    <CheckBox
                      onClick={() => disableCheck(index)}
                      isChecked={item.disabled}
                    />
                  </View>
                  <View style={[commonStyle.flexRow]}>
                    {/* <Text style={[styles.contain]}>Time and </Text> */}
                    <LinearGradient
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 2 }}
                      colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]}
                      style={[styles.linearSelect, { marginLeft: Spacing.MARGIN_5 }]}>
                      <TouchableOpacity onPress={() => { setSelectedItem(item); item.disabled == false && setAddVideoModal(true) }}>
                        <View style={[styles.selectWhiteBtn, { backgroundColor: item.disabled ? "#ccc" : "white" }]}>
                          <Text
                            style={{
                              fontSize: Typography.FONT_SIZE_10,
                              fontFamily: 'Montserrat-SemiBold',
                              color: '#9A9A9A',
                            }}>
                            Set Time and Date
                          </Text>
                          <Down
                            height={hp(4)}
                            width={wp(4)}
                            style={{ marginLeft: Spacing.PADDING_7 }}
                          />
                        </View>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </>
            }
            contentContainerStyle={{ paddingBottom: 50 }}
            data={item?.attributesArr}
            renderItem={({ item: itemX, index: indexX }) => {
              return (
                <>
                  <Text style={[styles.title, { marginVertical: itemX?.description ? 0 : Spacing.PADDING_10 }]}>{itemX?.name} </Text>
                  {
                    itemX?.description &&
                    <Text style={[styles.redTxt, { marginVertical: Spacing.PADDING_10 }]}>
                      ({itemX?.description})
                    </Text>
                  }
                  <View style={[commonStyle.flexRow, { justifyContent: 'space-between' }]}>
                    {
                      itemX?.frequency == true &&
                      <View style={[commonStyle.flexRow]}>
                        <LinearGradient
                          start={{ x: 1, y: 0 }}
                          end={{ x: 0, y: 2 }}
                          colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]}
                          style={[styles.linearAdd]}>
                          <TouchableOpacity
                            onPress={() => itemX.disabled ? console.log("Asd") : frequencyAmountAdd(index, indexX)}
                            disabled={itemX.disabled}
                            style={[
                              styles.whiteBtn,
                              { borderTopLeftRadius: 7, borderBottomLeftRadius: 7, backgroundColor: itemX.disabled ? "#ccc" : "white" },
                            ]}>
                            <Add height={hp(4)} width={wp(5)} />
                          </TouchableOpacity>
                          <View
                            style={[
                              styles.whiteBtn,
                              { marginHorizontal: Spacing.PADDING_2, width: wp(12), backgroundColor: itemX.disabled ? "#ccc" : "white" },
                            ]}>
                            <TextInput style={{
                              fontSize: Typography.FONT_SIZE_17,
                              fontFamily: 'Montserrat-SemiBold',
                              color: '#747474',
                              backgroundColor: itemX.disabled ? "#ccc" : "white"
                            }}
                              editable={!itemX.disabled}
                              keyboardType='numeric'
                              value={`${itemX.frequencyAmount}`}
                              onChangeText={(e) => handleSetCoinValue1(e, index, indexX)}
                            />
                          </View>
                          <TouchableOpacity
                            disabled={itemX.disabled}
                            onPress={() => itemX.disabled ? console.log("Asd") : frequencyAmountMinus(index, indexX)}
                            style={[
                              styles.whiteBtn,
                              { borderBottomRightRadius: 7, borderTopRightRadius: 7, backgroundColor: itemX.disabled ? "#ccc" : "white" },
                            ]}>
                            <Minus height={hp(4)} width={wp(5)} />
                          </TouchableOpacity>
                        </LinearGradient>
                        <Calendar
                          heading={hp(4)}
                          width={wp(7)}
                          style={{ marginLeft: Spacing.PADDING_7 }}
                        />
                      </View>
                    }
                    {
                      itemX?.willAddCoins == true &&
                      <View style={[commonStyle.flexRow]}>
                        <LinearGradient
                          start={{ x: 1, y: 0 }}
                          end={{ x: 0, y: 2 }}
                          colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]}
                          style={[styles.linearAdd]}>
                          <TouchableOpacity
                            onPress={() => itemX.disabled ? console.log("Asd") : coinsAmountAdd(index, indexX)}
                            disabled={itemX.disabled}
                            style={[
                              styles.whiteBtn,
                              { borderTopLeftRadius: 7, borderBottomLeftRadius: 7, backgroundColor: itemX.disabled ? "#ccc" : "white" },
                            ]}>
                            <Add height={hp(4)} width={wp(5)} />
                          </TouchableOpacity>
                          <View
                            style={[
                              styles.whiteBtn,
                              { marginHorizontal: Spacing.PADDING_2, width: wp(12), backgroundColor: itemX.disabled ? "#ccc" : "white" },
                            ]}>
                            <TextInput style={{
                              fontSize: Typography.FONT_SIZE_17,
                              fontFamily: 'Montserrat-SemiBold',
                              color: '#747474',
                              backgroundColor: itemX.disabled ? "#ccc" : "white"
                            }}
                              editable={!itemX.disabled}
                              keyboardType='numeric'
                              maxLength={4}
                              value={`${itemX.coinsAmount}`}
                              onChangeText={(e) => handleSetCoinValue(e, index, indexX)}
                            />
                          </View>
                          <TouchableOpacity
                            disabled={itemX.disabled}

                            onPress={() => itemX.disabled ? console.log("Asd") : coinsAmountMinus(index, indexX)}
                            style={[
                              styles.whiteBtn,
                              { borderBottomRightRadius: 7, borderTopRightRadius: 7, backgroundColor: itemX.disabled ? "#ccc" : "white" },
                            ]}>
                            <Minus height={hp(4)} width={wp(5)} />
                          </TouchableOpacity>
                        </LinearGradient>
                        <Dollar
                          heading={hp(4)}
                          width={wp(7)}
                          style={{ marginLeft: Spacing.PADDING_7 }}
                        />
                      </View>
                    }
                  </View>
                </>
              )
            }}
            keyExtractor={(itemX, index) => `${itemX._id}`}
            ListFooterComponent={
              <>
                <View style={[commonStyle.flexRow, { marginTop: Spacing.MARGIN_15, marginBottom: hp(4) }]}>
                  <Text
                    style={[
                      styles.title,
                      { marginTop: 0, marginRight: Spacing.MARGIN_5 },
                    ]}>
                    Set up for all kids
                  </Text>
                  <CheckBox onClick={() => check()} isChecked={checked} />
                </View>
                <Text style={[styles.contain]}>
                  Click to box to set the same mission for all your kids
                </Text>
              </>
            }
          />
        </View>
      </KeyboardAvoidingView>
    );
  };



  const [modal, setModal] = useState(false);
  const [after, setAfter] = useState('');
  const afterData = MasterData.frequency;

  const afterRenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setAfter(item.name);
          setModal(false);
          setAddVideoModal(true);
        }}
        style={[
          commonStyle.listdownView,
          { borderColor: '#DEDEDE', backgroundColor: Colors.WHITE },
        ]}>
        <Text style={[commonStyle.listdownTxt]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('AddFrequency', { data: item._id })}>
        <View style={[styles.listView]}>
          <Image
            source={{ uri: item.thumbnailImage }}
            resizeMode="contain"
            style={{ height: hp(12), width: wp(30) }}
          />
        </View>
        <Text style={[styles.listText]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header logo={true} />
      {/* <ScrollView
        contentContainerStyle={{ width: wp(100) }}> */}

      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 2 }}
        colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]}
        style={[styles.linearBg]}
      />
      <ImageBackground
        source={images.backGround}
        style={{ flex: 1 }}
      >
        <Text
          style={[
            commonStyle.title,
            {
              color: Colors.WHITE,
              marginBottom: Spacing.MARGIN_20,
              fontSize: Typography.FONT_SIZE_30,
              marginTop: -hp(30)
            },
          ]}>
          {props?.route?.params?.name}
        </Text>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={actArr}
          slideStyle={{ height: hp(60) }}
          containerCustomStyle={{ maxHeight: hp(60) }}
          scrollEnabled
          enableSnap
          renderItem={ActRenderItem}
          sliderWidth={wp(100)}
          itemWidth={wp(100)}
          onSnapToItem={slideIndex => {
            // console.log('this is slideIndex: ', slideIndex);
            setCurrentIndex(slideIndex);
            let tempObj = actArr[slideIndex]
            setSelectedMission(tempObj)
            setCurrentSliderIndex(slideIndex)
          }}
        />
        <Pagination
          dotsLength={actArr.length}
          activeDotIndex={currentIndex}
          containerStyle={{ backgroundColor: 'transparent' }}
          dotStyle={{
            backgroundColor: Colors.PRIMARY,
            width: wp(4),
            borderColor: Colors.PRIMARY,
            borderWidth: 2,
            borderRadius: 20,
          }}
          inactiveDotStyle={{
            backgroundColor: '#fff',
            width: wp(5),
            borderColor: Colors.PRIMARY,
            borderWidth: 2,
            borderRadius: 20,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />

        <View
          style={[
            commonStyle.flexRow,
            { alignSelf: 'center' },
          ]}>


          <TouchableOpacity
            style={{ width: wp(42), marginLeft: Spacing.MARGIN_10 }}
            onPress={() => handleMissionCreate()}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 2 }}
              colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]}
              style={[commonStyle.linearBtn]}>
              <View
                style={[
                  styles.btnView,
                  { backgroundColor: "transparent", width: '99%' },
                ]}>
                <Text style={[commonStyle.btnText, { color: "white" }]}>
                  Save
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <Modal animationType="slide" transparent={true} visible={addVideoModal}>
        <View style={[commonStyle.modalBackground]}>
          <View
            style={[
              commonStyle.whiteBg,
              { backgroundColor: Colors.OFF_YELLOW },
            ]}>
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 2 }}
              colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]}
              style={[commonStyle.linearModal]}>
              <Image
                source={require('../../images/modalTeady.png')}
                resizeMode="contain"
                style={[commonStyle.modalTeady]}
              />
            </LinearGradient>
            <View
              style={{
                paddingLeft: 20,
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "column"
                // paddingRight: Spacing.MARGIN_20,
              }}>
              <Text style={[styles.title, { marginTop: Spacing.MARGIN_30 }]}>
                Repeat On
              </Text>
              {
                selectedItem.timeAndDateObj &&
                <FlatList
                  data={selectedItem.timeAndDateObj.daysArr}
                  renderItem={daysRenderItem}
                  contentContainerStyle={{ justifyContent: "space-between", display: "flex", flexDirection: "row", flex: 1, paddingRight: 20 }}
                  horizontal={true}
                  keyExtractor={(item, index) => index}
                />
              }
              <Text
                style={[styles.title, { marginVertical: Spacing.MARGIN_10 }]}>
                Ends
              </Text>

              <View style={[styles.flexRow, { justifyContent: "space-between", paddingRight: 15, marginBottom: 15 }]}>

                <TouchableOpacity
                  onPress={() => setSelectedItem(previousState => {
                    previousState.timeAndDateObj.stopOnActive = true
                    return { ...previousState }
                  })}
                  style={{ width: '45%' }}>
                  <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 2 }}
                    colors={[
                      Colors.GRADIENT1,
                      Colors.GRADIENT2,
                      Colors.GRADIENT1,
                    ]}
                    style={[commonStyle.linearBtn]}>
                    <View
                      style={[
                        styles.btnView,
                        { backgroundColor: selectedItem?.timeAndDateObj?.stopOnActive ? Colors.WHITE : "transparent", width: '99%', borderRadius: 27 },
                      ]}>
                      <Text
                        style={[commonStyle.btnText, { color: selectedItem?.timeAndDateObj?.stopOnActive ? "black" : Colors.WHITE }]}>
                        On
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedItem(previousState => {
                    previousState.timeAndDateObj.stopOnActive = false
                    return { ...previousState }
                  })}
                  style={{ width: '45%' }}>
                  <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 2 }}
                    colors={[
                      Colors.GRADIENT1,
                      Colors.GRADIENT2,
                      Colors.GRADIENT1,
                    ]}
                    style={[commonStyle.linearBtn]}>
                    <View
                      style={[
                        styles.btnView,
                        { backgroundColor: !selectedItem?.timeAndDateObj?.stopOnActive ? Colors.WHITE : "transparent", width: '99%', borderRadius: 27 },
                      ]}>
                      <Text
                        style={[commonStyle.btnText, { color: !selectedItem?.timeAndDateObj?.stopOnActive ? "black" : Colors.WHITE }]}>
                        After
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>


              </View>
              {
                selectedItem && selectedItem?.timeAndDateObj?.stopOnActive ?
                  <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 2 }}
                    colors={[
                      Colors.GRADIENT1,
                      Colors.GRADIENT2,
                      Colors.GRADIENT1,
                    ]}
                    style={[
                      styles.linearSelect,
                      {
                        marginRight: 15
                      }
                    ]}>
                    <View
                      style={[
                        styles.selectWhiteBtn,
                        {
                          width: "90%",
                          paddingHorizontal: 0,
                          paddingVertical: 10
                        }
                      ]}>

                      <DatePicker
                        mode="date"
                        open={true}
                        date={new Date(selectedItem?.timeAndDateObj?.stopOn)}
                        minimumDate={new Date()}
                        style={{ width: wp(70), fontSize: 15, borderRadius: 10 }}
                        onDateChange={(date) => {
                          handleOnDateSet(date)
                        }}
                      />
                    </View>
                  </LinearGradient>
                  :
                  <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 2 }}
                    colors={[
                      Colors.GRADIENT1,
                      Colors.GRADIENT2,
                      Colors.GRADIENT1,
                    ]}
                    style={[
                      styles.linearSelect,
                      { width: '93%', marginRight: 2, padding: 2 },
                    ]}>
                    {/* <Text>{selectedItem?.timeAndDateObj?.stopAfter}</Text> */}
                    <TextInput
                      style={[
                        styles.selectWhiteBtn,
                        { justifyContent: 'space-between', color: "black", width: "100%" },
                      ]} value={`${selectedItem?.timeAndDateObj?.stopAfter}`} maxLength={3} keyboardType='number-pad' placeholder='Enter After Count' onChangeText={(val) => handleAfteCountSet(val[0] == 0 ? 1 : val)} />

                  </LinearGradient>

              }




            </View>
            <View
              style={[
                commonStyle.flexRow,
                { alignSelf: 'center', marginVertical: Spacing.MARGIN_25 },
              ]}>
              <TouchableOpacity
                onPress={() => setAddVideoModal(false)}
                style={{ width: '40%' }}>
                <LinearGradient
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 2 }}
                  colors={[
                    Colors.GRADIENT1,
                    Colors.GRADIENT2,
                    Colors.GRADIENT1,
                  ]}
                  style={[commonStyle.linearBtn]}>
                  <View
                    style={[
                      styles.btnView,
                      //  { backgroundColor: Colors.WHITE, width: '99%' },
                    ]}>
                    <Text
                      style={[commonStyle.btnText, { color: Colors.WHITE }]}>
                      Back
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // setAddVideoModal(false);
                  handleDateAndTimeSave();
                  // navigation.navigate('MissionSummary');
                }}
                style={{ width: '40%', marginLeft: Spacing.MARGIN_10 }}>
                <LinearGradient
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 2 }}
                  colors={[
                    Colors.GRADIENT1,
                    Colors.GRADIENT2,
                    Colors.GRADIENT1,
                  ]}
                  style={[commonStyle.linearBtn]}>
                  <View style={[styles.btnView, { width: '99%' }]}>
                    <Text
                      style={[commonStyle.btnText, { color: Colors.WHITE }]}>
                      Save
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => setAddVideoModal(false)}>
            <AntDesign
              name={ANTDESIGN.CIRCEL_CLOSE}
              color={Colors.WHITE}
              size={Spacing.SIZE_40}
            />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={[commonStyle.dopDownModal]}>
          <View style={[commonStyle.modalWhiteBg]}>
            <FlatList
              data={afterData}
              renderItem={afterRenderItem}
              keyExtractor={(item, index) => index}
            />
          </View>
          <TouchableOpacity onPress={() => setModal(false)}>
            <AntDesign
              name={ANTDESIGN.CIRCEL_CLOSE}
              color={Colors.WHITE}
              size={Spacing.SIZE_40}
            />
          </TouchableOpacity>
        </View>
      </Modal>


      {/* </ScrollView> */}
    </>
  );
}
const styles = StyleSheet.create({
  linearBg: {
    height: hp(35),
    width: '100%',
    // position: 'absolute',
    top: 0,
    left: 0,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row"
  },
  listTitle1: {
    color: Colors.PRIMARY,
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
  },
  whiteBg: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: Spacing.PADDING_10,
    padding: Spacing.PADDING_15,
    paddingBottom: Spacing.PADDING_30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: hp(60),
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  toggle: {
    borderWidth: 1,
    borderColor: '#AA23AD',
    width: wp(3),
    height: hp(1),
    marginHorizontal: Spacing.PADDING_7,
    borderRadius: 10,
  },
  btnView: {
    borderRadius: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 1,
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column"
  },
  heading: {
    fontFamily: 'Cookies',
    fontSize: Typography.FONT_SIZE_20,
    marginLeft: Typography.FONT_SIZE_15,
    color: Colors.LIGHT_BLACK,
  },
  brush: {
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.84,
    elevation: 3,
  },
  title: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.LIGHT_BLACK,
    marginTop: Spacing.PADDING_10,
  },
  contain: {
    fontSize: Typography.FONT_SIZE_11,
    color: Colors.LIGHT_BLACK,
    fontFamily: 'Montserrat-Regular',
  },
  linearAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    alignSelf: 'center',
    borderRadius: 7,
  },
  whiteBtn: {
    height: hp(6.1),
    width: wp(7),
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redTxt: {
    color: Colors.PRIMARY,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: Typography.FONT_SIZE_11,
  },
  linearSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    alignSelf: 'center',
    borderRadius: 15,
  },
  selectWhiteBtn: {
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.PADDING_7,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
