import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PersistLogin from "../../components/PersistLogin";
import LayoutTopBar from "../../components/LayoutTopbar/LayoutTopBar";

const HomePage = () => {
  return (
    <>
      <PersistLogin>
        <LayoutTopBar />
      </PersistLogin>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
