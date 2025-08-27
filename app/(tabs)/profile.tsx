import { Image } from "expo-image";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TabTwoScreen() {
  const styles = StyleSheet.create({
    image: {
      flex: 1,
      width: "auto",
      height: 24,
      objectFit: "contain",
      borderRadius: "full",
    },
  });

  return (
    <ScrollView>
      <View className="h-[14rem] bg-gray-700 p-4 flex items-center justify-center">
        <View className="w-full flex flex-row justify-between text-white">
          <View className=" flex">
            <Text className="text-white">@k_tran2001</Text>
          </View>
          <View className="">
            <Text className="text-white">Icon</Text>
          </View>
        </View>
      </View>

      <View className="rounded-t-[16px]  -mt-5 bg-white">
        <View className="flex-row items-end justify-between p-4 -mt-12">
          <View className="w-24 h-24  rounded-full overflow-hidden ">
            <Image
              style={styles.image}
              source="https://res.cloudinary.com/df4dqpvoz/image/upload/v1754452415/my_upload/mrof5rukwvfxmdiydhcc.jpg"
              contentFit="cover"
              transition={1000}
            />
          </View>

          <Text className="text-purple-500 text-sm py-2 px-4 border border-purple-500 rounded-full">
            Verify account
          </Text>
        </View>
        <View className="flex-1 p-4 ">
          <Text className="text-lg font-bold">Khoa Tran Van</Text>
          <Text className="text-gray-500">
            213 Following 781 Followers 3 Pages
          </Text>
          <Text className="text-gray-700 my-4">
            🚀 Passionate about turning cutting-edge AI research into real-world
            applications. Founder of NeuralFlow, a startup revolutionizing
            automated decision-making for business.
          </Text>
          <TouchableOpacity className="flex-1 py-2 rounded-lg border border-gray-300  ">
            <>
              <Text className="text-center text-gray-600">Edit profile</Text>
            </>
          </TouchableOpacity>
        </View>
      </View>
      <View className="pictures flex-1 h-[400px] bg-gray-300"></View>
    </ScrollView>
  );
}
