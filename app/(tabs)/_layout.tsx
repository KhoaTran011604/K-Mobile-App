import { Tabs } from "expo-router";
import React from "react";
import { Platform, StatusBar, Text, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CustomTabBar } from "@/components/CustomTabBar";
import {
  AntDesign,
  EvilIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import Avatar from "@/components/social/common/Avatar";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        header: () => {
          return (
            <>
              <StatusBar
                translucent
                backgroundColor={"transparent"}
                barStyle={"light-content"}
              />
              <View className="absolute">
                <Text className="bg-red-400">{`< Home`}</Text>
              </View>
            </>
          );
        },
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <AntDesign name="plussquareo" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Message",
          tabBarIcon: ({ color }) => (
            <AntDesign name="message1" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <View className="border-2 border-blue-300 rounded-full">
              <Avatar
                uri={
                  "https://res.cloudinary.com/df4dqpvoz/image/upload/v1754452415/my_upload/mrof5rukwvfxmdiydhcc.jpg"
                }
                size={34}
                borderRadius={100}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
