import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateReplies from "./createReplies";
import EditProfile from "./editProfile";
import FollowerCard from "./followerCard";
import PostDetails from "./postDetails";
import PostLikeCard from "./postLikeCard";
import UserProfileScreen from "./userProfile";
import { Button } from "react-native";
import { router } from "expo-router";

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="createReplies" component={CreateReplies} />
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
        options={{
          headerLeft: () => (
            <Button
              onPress={() => router.replace("/profile")}
              title="sss"
              color="#fff"
            />
          ),
        }}
      />
      <Stack.Screen name="followerCard" component={FollowerCard} />
      <Stack.Screen name="postDetails" component={PostDetails} />
      <Stack.Screen name="postLikeCard" component={PostLikeCard} />
      <Stack.Screen name="userProfile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
}
