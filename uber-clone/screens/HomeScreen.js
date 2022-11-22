import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Button,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import * as Notifications from "expo-notifications";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavorites from "../components/NavFavorites";

const HomeScreen = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   async function configurePushNotifications() {
  //     const { status } = await Notifications.getPermissionsAsync();
  //     let finalStatus = status;
  //     if (finalStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       Alert.alert(
  //         "Permission required",
  //         "Push notifications need the appropriate permissions."
  //       );
  //       return;
  //     }
  //     const pushTokenData = await Notifications.getExpoPushTokenAsync();
  //     console.log(pushTokenData);

  //     if (Platform.OS === "android") {
  //       Notifications.setNotificationChannelAsync("default", {
  //         name: "default",
  //         importance: Notifications.AndroidImportance.DEFAULT,
  //       });
  //     }
  //   }

  //   configurePushNotifications();
  // }, []);

  return (
    // SafeAreaView Only works with iOS devices
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          placeholder="Where From?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
        <NavOptions />
        {/* <Button
          onPress={scheduleNotificationHandler}
          title="Schedule Notification"
        /> */}
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
