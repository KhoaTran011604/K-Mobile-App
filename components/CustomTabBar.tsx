import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View className="flex-row bg-white h-24 border-t border-gray-200">
      {state.routes.map((route, index) => {
        let iconElement = null;
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;
        if (options.tabBarIcon) {
          iconElement = options.tabBarIcon({
            focused: true,
            color: isFocused ? "#33A1E0" : "gray", // màu active vs màu inactive
            size: 16,
          });
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            className="flex-1 justify-center items-center -mt-4"
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
          >
            {/* <Text className={isFocused ? "text-blue-600" : "text-gray-400"}>
              {options.title || route.name}
            </Text>
            <Text>Icon</Text> */}
            {iconElement}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
