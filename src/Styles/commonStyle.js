import { StyleSheet, Dimensions } from "react-native";
import { Colors, Spacing, Typography } from './theme/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const window = Dimensions.get("screen");
const width = window.width;
const height = window.height;
export default StyleSheet.create({

    fullSize: {
        height: hp(100),
        width: wp(100),
    },
    title: {
        fontFamily: 'Cookies',
        fontSize: Typography.FONT_SIZE_30,
        color: Colors.WHITE,
        textAlign: 'center',
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
        width: width - 40,
        height: hp(70),
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
    modalTeady: {
        position: 'absolute',
        bottom: -10,
        left: -12,
        padding: 0,
        // backgroundColor:"red",
        height: hp(18),
        width: hp(20)
    },
    bottonPg: {
        position: 'absolute',
        bottom: 37,
        right: 20,
        zIndex: -10,
        height: hp(20),
        width: wp(36),
        //backgroundColor:'red'
    }

})