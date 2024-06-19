import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import {
  loginAction,
  loginData,
  loginError,
  loginIsError,
  loginIsLoading,
  loginIsSuccess,
  resetCheckTokenValidtyAction,
  resetLoginAction,
  resetRefreshction,
} from "../../../redux/features/authSlice";
import CryptoJS from "crypto-js";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetailsAction,
  resetgetUserDetailsAction,
} from "../../../redux/features/userSlice";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const image = require("../../../assets/images/dmsbg.jpg");

const LoginPage = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(loginData);
  const isLoading = useSelector(loginIsLoading);
  const isError = useSelector(loginIsError);
  const error = useSelector(loginError);
  const isSuccess = useSelector(loginIsSuccess);

  const userData = useSelector((state) => state.user.userData);
  const userDataIsLoading = useSelector(
    (state) => state.user.userDataIsLoading
  );
  const userDataIsError = useSelector((state) => state.user.userDataIsError);
  const userDataError = useSelector((state) => state.user.userDataError);
  const userDataIsSuccess = useSelector(
    (state) => state.user.userDataIsSuccess
  );

  useEffect(() => {
    const clearStorage = async () => {
      try {
        await AsyncStorage.clear();
      } catch (error) {
        console.error("Error clearing AsyncStorage:", error);
      }
    };

    clearStorage();
    dispatch(resetRefreshction());
    dispatch(resetCheckTokenValidtyAction());
    dispatch(resetgetUserDetailsAction());
  }, [dispatch]);

  useEffect(() => {
    const storeData = async () => {
      if (isSuccess) {
        try {
          await AsyncStorage.setItem("token", data?.access_token);
          await AsyncStorage.setItem("sessionId", data?.session_state);
          await AsyncStorage.setItem("username", username);
          await AsyncStorage.setItem("refresh_token", data.refresh_token);
          dispatch(resetLoginAction());
          dispatch(getUserDetailsAction());
        } catch (error) {
          console.error("Error storing data:", error);
        }
      } else if (isError) {
        Toast.show({
          type: "error",
          text1: error,
        });
        dispatch(resetLoginAction());
      }

      if (userDataIsSuccess) {
        try {
          await AsyncStorage.setItem("userData", JSON.stringify(userData));
          dispatch(resetgetUserDetailsAction());
          navigation.navigate("HomePage");
        } catch (error) {
          console.error("Error storing user data:", error);
        }
      } else if (userDataIsError) {
        Toast.show({
          type: "error",
          text1: userDataError,
        });
        dispatch(resetgetUserDetailsAction());
      }
    };

    storeData();
  }, [
    dispatch,
    isSuccess,
    isError,
    userDataIsError,
    userDataIsSuccess,
    username,
    data,
    userData,
    error,
    userDataError,
    navigation,
  ]);

  function encryptFun(password, username) {
    var keybefore = username + "appolocomputers";
    var ivbefore = username + "costacloud012014";
    var key = CryptoJS.enc.Latin1.parse(keybefore.substring(0, 16));
    var iv = CryptoJS.enc.Latin1.parse(ivbefore.substring(0, 16));

    var ciphertext = CryptoJS.AES.encrypt(password, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    }).toString();

    return ciphertext;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = () => {
    console.log("password, username", encryptFun(password, username));

    dispatch(
      loginAction({ username, password: encryptFun(password, username) })
    );
  };

  return (
    <ImageBackground source={image} style={styles.background}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.box}>
          <View style={styles.lockIconContainer}>
            <Icon name="lock" size={30} color="#fff" style={styles.lockIcon} />
          </View>
          <Image
            source={require("../../../assets/images/teamlogo.png")}
            style={styles.teamlogo}
          />
          <Text style={styles.subTitle}>
            Solutions Designed for Your Business eOffice for Government,
            Procurement Automation, Health Records and may more.
          </Text>
          <Text style={styles.sign_in}> Sign In </Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            placeholderTextColor="#000"
            value={username}
            onChangeText={setUsername}
            keyboardType="username"
            autoCapitalize="none"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#000"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconContainer}
            >
              <Icon
                name={showPassword ? "eye" : "eye-slash"}
                size={24}
                color="#000"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  box: {
    width: "100%",
    padding: 20,
    backgroundColor: "hsla(0, 0%, 100%, .3)",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
  },
  lockIconContainer: {
    width: 60,
    position: "absolute",
    top: -30,
    height: 60,
    backgroundColor: "#fe9832",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    padding: 10,
    top: 10,
  },
  subTitle: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  sign_in: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "#000",
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
    color: "#000",
  },
  iconContainer: {
    padding: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#fe9832",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  teamlogo:{
    width:300,
    height:40,
    marginTop:30,
    marginBottom:10
  }
});
