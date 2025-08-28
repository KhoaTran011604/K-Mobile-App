import { ScrollView, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { Button } from "@/components/Button";
import UserList from "@/components/social/common/UserList";

export default function MessageScreen() {
  const router = useRouter();

  return (
    <View className=" flex-1 p-4">
      <View>
        <UserList />
      </View>
    </View>
  );
}

/**
 * /index
 * /second (stack)
 *   /second/index
 *   /second/nested
 *   /second/also-nested
 * /third
 * /fourth
 */
