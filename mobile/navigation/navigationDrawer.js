import React from "react"
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer"
import navigationStack from "./navigationStack"
import Articles from "../screens/Articles"
import Cart from "../screens/Cart"
import SignIn from "../screens/SignIn"
import SignUp from "../screens/SignUp"
import LogOut from "../screens/LogOut"
import NotWishList from "../screens/NotWishlist"
import WishList from "../screens/WishList"
import { connect, useSelector } from "react-redux"
import { useLoginLS } from "../hooks/usersHooks"
import { Image, ImageBackground, StyleSheet } from "react-native"
import NavigationBottom from "./navigationBottom"
import Stripe from "../screens/Stripe"
const Drawer = createDrawerNavigator()

const Navigator = (props) => {
  useLoginLS()
  const user = useSelector((state) => state.users.user)
  function LogoTitle() {
    return (
      <Image
        style={{ width: 130, height: 90, resizeMode: "contain" }}
        source={require("../assets/ludotech.png")}
      />
    )
  }

  const CustomDrawerContent = (props) => {
    return (
      <ImageBackground
        source={{ uri: "https://i.postimg.cc/g07bvLSL/drawer-Test.png" }}
        style={styles.drawerCustom}
      >
        <DrawerContentScrollView {...props}>
          <Image
            source={require("../assets/rubik_solo.png")}
            style={{
              width: 90,
              height: 90,
              alignSelf: "center",
              marginVertical: 15,
            }}
          />
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </ImageBackground>
    )
  }
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerLabelStyle: {
          fontFamily: "Poppins_700Bold",
          fontSize: 20,
          marginTop: 15,
        },
        drawerActiveBackgroundColor: "#3fced341",
        drawerActiveTintColor: "#2ab6bb",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={navigationStack}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
      <Drawer.Screen
        name="Articles"
        component={Articles}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
      {user && <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />}
      {user && <Drawer.Screen
        name="Wish List"
        component={WishList}
        option={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />}
      {!user && <Drawer.Screen
        name="Wish List"
        component={NotWishList}
        option={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />}
      {!user && (
        <>
          <Drawer.Screen
            name="Sign In"
            component={SignIn}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Drawer.Screen
            name="Sign Up"
            component={SignUp}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
        </>
      )}
      {user && <Drawer.Screen name="Log Out" component={LogOut} />}
      <Drawer.Screen name="Stripe" component={Stripe} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  drawerCustom: {
    flex: 1,
  },
})

export default Navigator
