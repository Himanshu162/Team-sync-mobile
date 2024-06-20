import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ToolBarComponent = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <FontAwesome
          name="folder"
          size={24}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome
          name="cloud-upload"
          size={24}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome
          name="refresh"
          size={24}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome
          name="tag"
          size={24}
          color="black"
          style={[styles.icon, styles.rotatedIcon]}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome
          name="text-width"
          size={24}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome
          name="clipboard"
          size={24}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ToolBarComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f0f2f4",
  },
  icon: {
    marginHorizontal: 5,
  },
  rotatedIcon: {
    transform: [{ rotate: "135deg" }],
  },
});
