import { Slot } from "expo-router";
import Toast from "react-native-toast-message";
import Providers from "../redux/Providers";

const RootLayout = () => {
  return (
    <>
      <Providers>
        <Slot />
        <Toast />
      </Providers>
    </>
  );
};

export default RootLayout;
