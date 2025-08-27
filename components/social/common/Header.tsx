import { Feather, Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, Text, View } from "react-native";

const Header = () => {
  const IconButton = ({
    onPress,
    children,
  }: {
    onPress?: () => void;
    children: React.ReactNode;
  }) => (
    <Pressable
      onPress={onPress}
      className="h-10 w-10 items-center justify-center rounded-2xl bg-white/70"
    >
      {children}
    </Pressable>
  );
  return (
    <View className="px-4 pb-3 pt-2 bg-white">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-bold">Social</Text>
        <View className="flex-row gap-2">
          <IconButton onPress={() => Alert.alert("Search")}>
            <Feather name="search" size={20} />
          </IconButton>
          <IconButton onPress={() => Alert.alert("Messages")}>
            <Ionicons name="chatbubble-outline" size={20} />
          </IconButton>
        </View>
      </View>
    </View>
  );
};

export default Header;
