import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FileManagerComponent from "../FileManagerComponent/FileManagerComponent";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
  Image,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { useNavigation } from "expo-router";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const navigation = useNavigation();
  const roles = [
    {
      label: "CAD",
      value: "role 1",
    },
    {
      label: "HRC",
      value: "role 2",
    },
    {
      label: "IAF",
      value: "role 3",
    },
  ];
  const [selectedRole, setSelectedRole] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [logout, setLogout] = useState(false);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setModalVisible(false);
  };

  const redirectToLogin = () => {
    setLogout(false);
    navigation.navigate("LoginPage");
  };

  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor:
              "linear-gradient(90deg, rgb(20, 70, 107) 39%, rgb(30, 114, 141) 60%, rgb(31, 157, 183) 89%)",
          },
          headerTintColor: "#fff",
          headerRight: () => (
            <View style={styles.rightItem}>
              <Image
                source={require("../../assets/images/logooo.png")}
                style={styles.drawerIcon}
              />
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Avatar
                  rounded
                  icon={{ name: "user", type: "font-awesome" }}
                  size="small"
                  title="H"
                  overlayContainerStyle={{
                    backgroundColor: "#7b1fa2",
                    right: 10,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.dropIcon}>
                  <Icon
                    name="ellipsis-vertical-outline"
                    type="ionicon"
                    color="#fff"
                    onPress={() => setLogout(true)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        <Drawer.Screen
          name="Files"
          component={FileManagerComponent}
          options={{
            title: "",
          }}
        />
      </Drawer.Navigator>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <FlatList
            data={roles}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.roleItem}
                onPress={() => handleRoleSelection(item.value)}
              >
                <Text style={styles.roleText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType="slide"
        visible={logout}
        onRequestClose={() => setLogout(false)}
      >
        <TouchableWithoutFeedback onPress={() => setLogout(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={[styles.logoutModal, styles.modalPosition]}>
          <TouchableOpacity>
            <View style={styles.darkmode}>
              <Icon name="moon-sharp" type="ionicon" />
              <Text style={{ fontSize: 20 }}>DARK MODE</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={redirectToLogin}>
            <View style={styles.logout}>
              <Icon name="log-out-sharp" type="ionicon" />
              <Text style={{ fontSize: 20 }}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  rightItem: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropIcon: {
    paddingRight: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    position: "absolute",
    top: Platform.OS === "ios" ? 40 : 50,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  roleItem: {
    padding: 10,
  },
  roleText: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
  },
  drawerLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutModal: {
    backgroundColor: "white",
    padding: 25,
    maxWidth: "80%",
    width: "51%",
    position: "absolute",
    right: 5,
    top: Platform.OS === "ios" ? 40 : 50,
    height: "15%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  modalPosition: {
    justifyContent: "center",
  },
  drawerIcon: {
    height: 35,
    width: 250,
    marginRight: 25,
  },
  darkmode: {
    flexDirection: "row",
    textAlign: "center",
    gap: 20,
    padding: 0,
    top: -5,
  },
  logout: {
    flexDirection: "row",
    top: 10,
    gap: 20,
  },
});
