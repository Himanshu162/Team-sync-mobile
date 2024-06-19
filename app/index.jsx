// // import React, { useEffect } from "react";
// // import { View, StyleSheet } from "react-native";
// // import LoginPage from "./(auth)/LoginPage/LoginPage";
// // import HomePage from "./(auth)/HomePage";
// // import { createStackNavigator } from "@react-navigation/stack";
// // import { useSafeAreaInsets } from "react-native-safe-area-context";

// // const Stack = createStackNavigator();

// // const App = () => {
// //   const insets = useSafeAreaInsets();

// //   return (
// //     <View
// //       style={[
// //         styles.container,
// //         {
// //           paddingTop: insets.top,
// //           paddingBottom: insets.bottom,
// //         },
// //       ]}
// //     >
// //       <Stack.Navigator>
// //         <Stack.Screen
// //           options={{
// //             headerShown: false,
// //           }}
// //           name="LoginPage"
// //           component={LoginPage}
// //         />
// //         <Stack.Screen
// //           options={{
// //             headerShown: false,
// //           }}
// //           name="HomePage"
// //           component={HomePage}
// //         />
// //       </Stack.Navigator>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   innerContainer: {
// //     flex: 1,
// //   },
// //   text: {
// //     fontSize: 24,
// //   },
// // });

// // export default App;

// import React, { useEffect, useState } from "react";
// import { Text, View, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const App = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const checkToken = async () => {
//       setLoading(true);
//       try {
//         const refreshToken = await AsyncStorage.getItem("refresh_token");
//         if (refreshToken) {
//           navigation.navigate("HomePage");
//         } else {
//           navigation.navigate("LoginPage");
//         }
//       } catch (error) {
//         console.error("Error retrieving token:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkToken();
//   }, [navigation]);

//   return (
//     <View style={styles.container}>{loading && <Text>Loading...</Text>}</View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default App;

import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginPage from "./(auth)/LoginPage";
import HomePage from "./HomePage";

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("LoginPage");

  useEffect(() => {
    const checkToken = async () => {
      try {
        const refreshToken = await AsyncStorage.getItem("refresh_token");
        if (refreshToken) {
          console.log("valid token");
          setInitialRoute("HomePage");
        } else {
          console.log(" Invalid valid token");
          setInitialRoute("LoginPage");
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
