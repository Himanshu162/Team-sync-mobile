import React from "react";
import { View, StyleSheet } from "react-native";
import ToolBarComponent from "./ToolBarComponent";
import LayoutPage from "./LayoutPage";

const FileManagerComponent = () => {
  return (
    <View style={styles.container}>
      <ToolBarComponent />
      <LayoutPage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default FileManagerComponent;
