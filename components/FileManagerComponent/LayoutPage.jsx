import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

const files = [
  { id: "1", name: "New Folder", type: "folder" },
  { id: "2", name: "New Folder 1", type: "folder" },
  { id: "3", name: "Fibromyalgia.pdf", type: "file" },
  { id: "4", name: "Farmer protest 1.txt", type: "file" },
];

const LayoutPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeItemId, setActiveItemId] = useState(null);

  const toggleItemSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleLongPress = (itemId) => {
    setActiveItemId(itemId);
  };

  const renderItem = ({ item }) => {
    const isFolder = item.type === "folder";
    const isSelected = selectedItems.includes(item.id);
    const isActive = activeItemId === item.id;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => toggleItemSelection(item.id)}
        onLongPress={() => handleLongPress(item.id)}
        delayLongPress={200} 
      >
        {isActive && (
          <View style={styles.checkbox}>
            {isSelected && (
              <AntDesign name="checksquare" size={24} color="green" />
            )}
            {!isSelected && (
              <AntDesign name="checksquareo" size={24} color="green" />
            )}
          </View>
        )}
        <View style={styles.itemIcon}>
          {isFolder ? (
            <AntDesign name="folder1" size={24} color="blue" />
          ) : (
            <Entypo name="document" size={24} color="red" />
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
  checkbox: {
    marginRight: 10,
  },
  itemIcon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
