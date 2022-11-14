import { StyleSheet, Dimensions } from "react-native";
import { Colors, Spacing, Typography } from './theme/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const window = Dimensions.get("screen");
const width = window.width;
const height = window.height;
export default StyleSheet.create({

    fullSize: {
        height: hp(90),
        width: wp(100),
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Typography.FONT_SIZE_35,
        color: Colors.PRIMARY,
        textAlign: 'center',
        // fontWeight: '600'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    // modal
    modalBackground: {
        position: "relative",
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
        height: hp(100),
        width: wp(100),
        backgroundColor: "rgba(0,0,0,0.75)",
        alignItems: "center",
        justifyContent: "center"
    },
    whiteBg: {
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        marginVertical: Spacing.MARGIN_20,
        width: width - 40,
    },
    modalTitle: {
        // fontFamily: 'MontserratH3-Bold',
        fontSize: Typography.FONT_SIZE_24,
        color: '#747474',
        // fontWeight: '600',
        textAlign: 'center',
        width: wp(65),
        alignSelf: 'center',
        marginVertical: Spacing.MARGIN_15,
    },
    // btn
    btnText: {
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.PRIMARY,
        fontSize: 16,
        fontWeight: '600',
        paddingVertical: Spacing.PADDING_7,
        color: Colors.WHITE,
        fontSize: Typography.FONT_SIZE_16,
        paddingHorizontal: 30
    },
    // linearBtn: {
    //     borderRadius: 7,
    //     padding: 1,
    //     height: 40,
    //     borderRadius: 25
    // },
    linearBtn: {
        borderRadius: 7,
        padding: 1,
        //  height: 40,
        //  paddingVertical:10,
        borderRadius: 25
    },
    linearModal: {
        width: '100%',
        borderRadius: 10,
        padding: Spacing.PADDING_2,
        height: hp(16),
        justifyContent: 'flex-end'
    },
    modalTeady: {
        height: hp(14.2),
        width: wp(35),
        alignSelf: 'center'
    },
    modalText: {
        color: Colors.LIGHT_BLACK,
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        width: '70%',
        alignSelf: 'center',
        marginVertical: Spacing.MARGIN_35
    },
    bottonPg: {
        position: 'absolute',
        bottom: 37,
        right: 20,
        zIndex: -10,
        height: hp(20),
        width: wp(36),
        //backgroundColor:'red'
    },
    dopDownModal: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.75)",
        alignItems: "center",
        justifyContent: "center"
    },
    modalWhiteBg: {
        backgroundColor: Colors.WHITE,
        padding: Spacing.PADDING_20,
        borderRadius: 10,
        marginVertical: Spacing.MARGIN_40,
        width: width - 40,
        minHeight: '20%',
        maxHeight: '70%'
    },
    listdownView: {
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listdownTxt: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: '#747474'
    },
    listTitle1: {
        fontSize: Typography.FONT_SIZE_20,
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.LIGHT_BLACK,
        width: '90%',
        alignSelf: 'center',
        marginVertical: Spacing.MARGIN_25
    },
    btnView: {
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
    },
})