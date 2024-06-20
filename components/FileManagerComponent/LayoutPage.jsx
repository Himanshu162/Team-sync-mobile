import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

const files = [
  { id: "1", name: "inner", type: "folder" },
  { id: "2", name: "new folder", type: "folder" },
  { id: "3", name: "fibromyalgia.pdf", type: "file" },
  { id: "4", name: "farmer protest 1.txt", type: "file" },
];

const LayoutPage = () => {
  const renderItem = ({ item }) => {
    const isFolder = item.type === "folder";
    return (
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemIcon}>
          {isFolder ? (
            <AntDesign name="folder1" size={24} color="blue" />
          ) : (
            <Entypo name="document" size={24} color="black" />
          )}
        </View>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={files}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default LayoutPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  itemIcon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
