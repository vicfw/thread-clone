import axios from "axios";
import { Dispatch } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../../constants/URL";

// register user
export const registerUser =
  (name: string, email: string, password: string, avatar: string) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: "userRegisterRequest",
      });

      const config = { headers: { "Content-Type": "application/json" } };
      console.log(`${baseUrl}/registration`, "`${baseUrl}/registration`");

      const { data } = await axios.post(
        `${baseUrl}/registration`,
        { name, email, password, avatar },
        config
      );

      console.log(data, "data");

      dispatch({
        type: "userRegisterSuccess",
        payload: data.user,
      });
      await AsyncStorage.setItem("token", data.token);
    } catch (error: any) {
      console.log(error.message, "error");

      dispatch({
        type: "userRegisterFailed",
        payload: error.response?.data?.message,
      });
    }
  };

// load user
export const loadUser = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: "userLoadRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const { data } = await axios.get(`${baseUrl}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: "userLoadSuccess",
      payload: {
        user: data.user,
        token,
      },
    });
  } catch (error: any) {
    console.log(error, "e");

    dispatch({
      type: "userLoadFailed",
      payload: error.response.data.message,
    });
  }
};

// login user
export const loginUser =
  (email: string, password: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: "userLoginRequest",
      });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `${baseUrl}/login`,
        { email, password },
        config
      );
      dispatch({
        type: "userLoginSuccess",
        payload: data.user,
      });
      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
      }
    } catch (error: any) {
      console.log(error);

      dispatch({
        type: "userLoginFailed",
        payload: error.response.data.message,
      });
    }
  };

// log out user
export const logoutUser = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: "userLogoutRequest",
    });

    await AsyncStorage.removeItem("token");

    dispatch({
      type: "userLogoutSuccess",
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: "userLogoutFailed",
    });
  }
};

// get all users
export const getAllUsers = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: "getUsersRequest",
    });

    const token = await AsyncStorage.getItem("token");

    const { data } = await axios.get(`${baseUrl}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: "getUsersSuccess",
      payload: data.users,
    });
  } catch (error: any) {
    dispatch({
      type: "getUsersFailed",
      payload: error.response.data.message,
    });
  }
};

interface FollowUnfollowParams {
  userId: string;
  followUserId: string;
  users: any;
}

// follow user
export const followUserAction =
  ({ userId, users, followUserId }: FollowUnfollowParams) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const updatedUsers = users.map((userObj: any) =>
        userObj._id === followUserId
          ? {
              ...userObj,
              followers: [...userObj.followers, { userId }],
            }
          : userObj
      );

      // update our users state
      dispatch({
        type: "getUsersSuccess",
        payload: updatedUsers,
      });

      await axios.put(
        `${baseUrl}/add-user`,
        { followUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Error following user:", error);
    }
  };

// unfollow user
export const unfollowUserAction =
  ({ userId, users, followUserId }: FollowUnfollowParams) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const updatedUsers = users.map((userObj: any) =>
        userObj._id === followUserId
          ? {
              ...userObj,
              followers: userObj.followers.filter(
                (follower: any) => follower.userId !== userId
              ),
            }
          : userObj
      );

      // update our users state
      dispatch({
        type: "getUsersSuccess",
        payload: updatedUsers,
      });

      await axios.put(
        `${baseUrl}/add-user`,
        { followUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Error following user:", error);
    }
  };
