import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createAxiosConfig = (
  token,
  currentUser,
  additionalHeaders = {}
) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    Rolename: currentUser?.roleName,
    ...additionalHeaders,
  },
});

// Separate function for token refresh
export const refreshAccessToken = async (thunkAPI) => {
  try {
    const refresh_token = await AsyncStorage.getItem("refresh_token");

    const refreshResponse = await axios.post(
      `/auth/refresh-token`,
      {
        refresh_token: refresh_token,
        grant_type: "refresh_token",
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    await AsyncStorage.setItem("token", refreshResponse.data.access_token);
    await AsyncStorage.setItem("sessionId", refreshResponse.data.session_state);

    return refreshResponse.data;
  } catch (refreshError) {
    return refreshError;
  }
};

// Create an async thunk with token refresh functionality
export const createAsyncThunkWithTokenRefresh = (type, requestFunction) =>
  createAsyncThunk(`${type}`, async (payload, thunkAPI) => {
    try {
      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem("token");
      const currentUser = thunkAPI.getState().user.currentUser;

      // Make the initial request using the provided function and token
      const response = await requestFunction(token, currentUser, payload);

      // Return the response data
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 504) {
        throw new Error("Gateway Timeout");
      } else if (error.response && error.response.status === 404) {
        throw new Error("Resource not found");
      } else if (
        error.response &&
        error.response.status === 500 &&
        !error.response.data.error
      ) {
        throw new Error(
          "There was an error with the internal server. Please contact your site administrator."
        );
      } else if (error.response && error.response.status === 401) {
        // Attempt to refresh the access token
        const refreshedToken = await refreshAccessToken(thunkAPI);

        if (refreshedToken.response && refreshedToken.response.status === 504) {
          throw new Error("Gateway Timeout");
        } else if (
          refreshedToken.response &&
          refreshedToken.response.status === 404
        ) {
          throw new Error("Resource not found");
        } else if (
          refreshedToken.response &&
          refreshedToken.response.status === 500 &&
          !refreshedToken.response.data.message
        ) {
          throw new Error(
            "There was an error with the internal server. Please contact your site administrator."
          );
        } else if (
          refreshedToken.response &&
          refreshedToken.response?.status === 401
        ) {
          if (
            refreshedToken.response?.data?.message == "Invalid Refresh Token!!"
          ) {
            throw new Error("Your login has been expired");
          } else {
            throw new Error(refreshedToken.response?.data?.message);
          }
        } else if (refreshedToken?.access_token) {
          // If token refresh is successful, retry the original request with the new access token
          try {
            const retryResponse = await requestFunction(
              refreshedToken?.access_token,
              payload
            );
            return retryResponse.data;
          } catch (error) {
            throw new Error(error.response?.data?.error || "An error occurred");
          }
        }
      } else if (error.message == "Network Error") {
        throw new Error(
          "There was an error with the internal server. Please contact your site administrator."
        );
      } else if (!error.response) {
        throw new Error(
          "There was an error with the internal server. Please contact your site administrator."
        );
      } else {
        throw new Error(error.response?.data?.error || "An error occurred");
      }
    }
  });
