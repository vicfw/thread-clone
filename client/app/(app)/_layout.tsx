import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

export const LogoutButton = () => {
  return (
    <Pressable style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={"#fff"} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  console.log(isAuthenticated, "isAuthenticated");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",

          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
        redirect={!isAuthenticated}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerTitle: "search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
          tabBarLabel: "Search",
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isAuthenticated}
      />
      <Tabs.Screen
        name="post"
        options={{
          headerTitle: "post",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
          tabBarLabel: "Post",
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isAuthenticated}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          headerTitle: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alarm-outline" size={size} color={color} />
          ),
          tabBarLabel: "Notifications",
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isAuthenticated}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          tabBarLabel: "Profile",
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isAuthenticated}
      />
    </Tabs>
  );
};

export default TabsPage;
