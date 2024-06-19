import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import {
  authRefreshAction,
  checkTokenValidtyAction,
  refreshData,
  refreshError,
  refreshIsError,
  refreshIsLoading,
  refreshIsSuccess,
} from "../redux/features/authSlice";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PersistLogin = ({ children }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const data = useSelector(refreshData);
  const isLoading = useSelector(refreshIsLoading);
  const isError = useSelector(refreshIsError);
  const error = useSelector(refreshError);
  const isSuccess = useSelector(refreshIsSuccess);

  const checkTokenValidityData = useSelector(
    (state) => state.auth.checkTokenValidityData
  );
  const checkTokenValidityIsLoading = useSelector(
    (state) => state.auth.checkTokenValidityIsLoading
  );
  const checkTokenValidityIsError = useSelector(
    (state) => state.auth.checkTokenValidityIsError
  );
  const checkTokenValidityError = useSelector(
    (state) => state.auth.checkTokenValidityError
  );
  const checkTokenValidityIsSuccess = useSelector(
    (state) => state.auth.checkTokenValidityIsSuccess
  );

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          dispatch(authRefreshAction());
        } else {
          dispatch(checkTokenValidtyAction());
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
        dispatch(authRefreshAction()); // Assuming fallback to refresh action on error
      } 
    };

    checkToken();
  }, [dispatch]);

  if (isLoading || checkTokenValidityIsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* Loading indicator or message */}
        <Text>Loading...</Text>
      </View>
    );
  } else if (isError || checkTokenValidityIsError) {
    // Redirect to login page
    navigation.navigate("LoginPage");
    return null;
  } else if (isSuccess || checkTokenValidityIsSuccess) {
    return children;
  }

  // Default return statement
  return null;
};

export default PersistLogin;
