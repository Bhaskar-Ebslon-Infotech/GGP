import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View ,Image,ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CommonHeader from '../../Component/CommonHeader';
import GoPremium from '../../images/svg/parentsvg/goPremium';
import Kid from '../../images/svg/parentsvg/kid';
import Personal from '../../images/svg/parentsvg/personal';
import Logo from '../../images/svg/headLogo';
import Time from '../../images/svg/parentsvg/time';
import Menu from '../../images/svg/menu';
import parentStyle from '../../Styles/parentStyle';
import commonStyle from '../../Styles/parentStyle';
import { Colors, Spacing, Typography } from '../../Styles/theme/index';
import { useNavigation } from '@react-navigation/native';


export default function Plans() {
    const navigation =useNavigation();
    return (
        <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
             {/* <CommonHeader /> */}
             <View style={[styles.head]}>
                <Logo height={hp(7)} width={wp(45)} />
                <TouchableOpacity><Menu height={hp(5)} width={wp(8)} /></TouchableOpacity>
            </View>
             <ScrollView>
            <ImageBackground source={require('../../images/bg2.png')} style={[commonStyle.fullSize,{height:hp(95)}]}>
         
                <View style={{ padding: Spacing.MARGIN_20 }}>
                <Text style={[commonStyle.title, {  fontSize: Typography.FONT_SIZE_30,marginTop:Spacing.MARGIN_10 }]}>Pricing</Text>
                <Text style={{marginTop:Spacing.MARGIN_5,fontSize:Typography.FONT_SIZE_13,color:'#747474',textAlign:'center',width:'90%',alignSelf:'center',fontFamily:'Montserrat-Regular'}}>Go Premium and have a lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euultrices eros, sed consequat arcu.</Text>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 2 }} colors={[Colors.GRADIENT1, Colors.GRADIENT2, Colors.GRADIENT1]} style={[styles.linearBg]} >
                       <View style={{paddingVertical:Spacing.MARGIN_15}}>
                        <TouchableOpacity onPress={() => navigation.navigate('BottomTabBar', { screen: 'Premium' })} style={[styles.btn,{marginBottom:Spacing.MARGIN_15}]}>
                            <Text style={[styles.btnText]}>15 Day Free Trial</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,{marginBottom:Spacing.MARGIN_15}]}>
                            <Text style={[styles.btnText]}>Semi-Annual 12000 1200 90% off</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn]}>
                            <Text style={[styles.btnText]}>Annual 24000 2400 90% off</Text>
                        </TouchableOpacity>
                    </View>
                    </LinearGradient>
                </View>
                <Image source={require('../../images/bonusTeady.png')} resizeMode='contain' style={[parentStyle.bottonPg]}/>
           
            </ImageBackground>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    linearBg: {
        paddingHorizontal: Spacing.MARGIN_20,
        paddingVertical: Spacing.MARGIN_15,
        borderRadius: 10,
        marginTop: Spacing.MARGIN_30
    },
    whiteBg: {
        backgroundColor: Colors.WHITE,
        borderRadius: 20,
        paddingVertical: Spacing.PADDING_7,
        paddingHorizontal: Spacing.MARGIN_15,
        marginTop: Spacing.MARGIN_20
    },
    btn:{
borderColor:Colors.WHITE,
borderWidth:1,
paddingVertical:7,
borderRadius:7,
height:hp(10),
justifyContent:'center'
    },
    btnText:{
        color:Colors.WHITE,
        fontFamily:'Montserrat-SemiBold',
        fontSize:Typography.FONT_SIZE_16,
        textAlign:'center',
        width:'70%',
        alignSelf:'center'
    },
    head: {
        backgroundColor: Colors.WHITE,
        padding: Spacing.MARGIN_5,
        paddingHorizontal: Spacing.MARGIN_15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
