import { SeachUser } from "@/api/userService";
import BoxImageGrid3x3 from "@/components/social/common/BoxImageGrid3x3";
import { imageProps } from "@/types/MainType";
import { useAuthStore } from "@/utils/authStore";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const dataInit = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  status: "Active",
  role: "User",
  old_password: "",
  password_again: "",
};
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
  const auth = useAuthStore();

  const [images, setImages] = useState<imageProps[]>([]);

  const [request, setRequest] = useState(dataInit);

  const LoadData = async () => {
    SeachUser("68a69e0a3421bf7bb3b6aa3a", {}).then((response) => {
      if (response.success) {
        setRequest({ ...request, ...response.data });
        setImages(response.data.images);
      }
    });
  };
  useEffect(() => {
    LoadData();
  }, []);
  const fakeImages = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    uri: `https://picsum.photos/seed/${i}/300`,
    span: Math.random() > 0.7 ? 2 : 1, // 30% ảnh sẽ to gấp đôi
  }));

  return (
    <ScrollView>
      <View className="h-[14rem] bg-gray-700 p-4 flex items-center justify-center">
        <View className="w-full flex flex-row justify-between text-white">
          <View className=" flex">
            <Text className="text-white">{`@${request.email}`}</Text>
          </View>
          <View className="">
            <TouchableOpacity
              onPress={() => {
                auth.logOut();
              }}
            >
              <AntDesign name="home" size={24} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="rounded-t-[16px]  -mt-5 bg-white">
        <View className="flex-row items-end justify-between p-4 -mt-12">
          <View className="w-24 h-24  rounded-full overflow-hidden ">
            <Image
              style={styles.image}
              source={
                images.length > 0
                  ? images[0].imageAbsolutePath
                  : "https://res.cloudinary.com/df4dqpvoz/image/upload/v1754452415/my_upload/mrof5rukwvfxmdiydhcc.jpg"
              }
              contentFit="cover"
              transition={1000}
            />
          </View>

          <Text className="text-purple-500 text-sm py-2 px-4 border border-purple-500 rounded-full">
            Verify account
          </Text>
        </View>
        <View className="flex-1 p-4 ">
          <Text className="text-lg font-bold">{request.fullName}</Text>
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
      <View className="pictures flex-1 h-[400px] p-4">
        <BoxImageGrid3x3 images={fakeImages} />
      </View>
    </ScrollView>
  );
}
