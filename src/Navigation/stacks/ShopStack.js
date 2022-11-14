import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddAddress from '../../View/Parent/AddAddress';
import AddSelection from '../../View/Parent/AddSelection';
import AllCategories from '../../View/Parent/AllCategories';
import AllProducts from '../../View/Parent/AllProducts';
import AllSaleProducts from '../../View/Parent/AllSaleProducts';
import CategoryWiseProducts from '../../View/Parent/CategoryWiseProducts';
import Discount from '../../View/Parent/Discount';
import EditAddress from '../../View/Parent/EditAddress';
import GoalCart from '../../View/Parent/GoalCart';
import GoalCover from '../../View/Parent/GoalCover';
import GoalCoverBlessing from '../../View/Parent/GoalCoverBlessing';
import KidCard from '../../View/Parent/KidCard';
import KidCorner from '../../View/Parent/KidCorner';
import MyOrders from '../../View/Parent/MyOrders';
import OrderedProduct from '../../View/Parent/OrderedProduct';
import ProductDetails from '../../View/Parent/ProductDetails';
import Shop from '../../View/Parent/Shop';
import ThankuOrder from '../../View/Parent/ThankuOrder';
import Voucher from '../../View/Parent/Voucher';
import VoucherSelection from '../../View/Parent/VoucherSelection';
import EditNewAddress from '../../View/Parent/EditNewAddress';

export default function ShopStack() {

    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Shop'>
            <Stack.Screen options={{ headerShown: false }} name="Shop" component={Shop} />
            <Stack.Screen options={{ headerShown: false }} name="ProductDetails" component={ProductDetails} />
            <Stack.Screen options={{ headerShown: false }} name="KidCorner" component={KidCorner} />
            <Stack.Screen options={{ headerShown: false }} name="GoalCart" component={GoalCart} />
            <Stack.Screen options={{ headerShown: false }} name="GoalCoverBlessing" component={GoalCoverBlessing} />
            <Stack.Screen options={{ headerShown: false }} name="GoalCover" component={GoalCover} />
            <Stack.Screen options={{ headerShown: false }} name="KidCard" component={KidCard} />
            <Stack.Screen options={{ headerShown: false }} name="AddSelection" component={AddSelection} />
            <Stack.Screen options={{ headerShown: false }} name="AddAddress" component={AddAddress} />
            <Stack.Screen options={{ headerShown: false }} name="EditAddress" component={EditAddress} />
            <Stack.Screen options={{ headerShown: false }} name="VoucherSelection" component={VoucherSelection} />
            <Stack.Screen options={{ headerShown: false }} name="ThankuOrder" component={ThankuOrder} />
            <Stack.Screen options={{ headerShown: false }} name="Discount" component={Discount} />
            <Stack.Screen options={{ headerShown: false }} name="Voucher" component={Voucher} />
            <Stack.Screen options={{ headerShown: false }} name="AllProducts" component={AllProducts} />
            <Stack.Screen options={{ headerShown: false }} name="AllSaleProducts" component={AllSaleProducts} />
            <Stack.Screen options={{ headerShown: false }} name="AllCategories" component={AllCategories} />
            <Stack.Screen options={{ headerShown: false }} name="CategoryWiseProducts" component={CategoryWiseProducts} />
            <Stack.Screen options={{ headerShown: false }} name="MyOrders" component={MyOrders} />
            <Stack.Screen options={{ headerShown: false }} name="EditNewAddress" component={EditNewAddress} />
        </Stack.Navigator>
    )
}
