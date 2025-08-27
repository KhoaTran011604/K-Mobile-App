import { User } from "@/app/(tabs)";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import Avatar from "./Avatar";

const NewPost = () => {
  const stories: User[] = [
    {
      id: "u1",
      name: "Alex",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300",
    },
    {
      id: "u2",
      name: "Mina",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300",
    },
    {
      id: "u3",
      name: "Phong",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300",
    },
    {
      id: "u4",
      name: "Ankita",
      avatar:
        "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=300",
    },
    {
      id: "u5",
      name: "Diego",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300",
    },
    {
      id: "u6",
      name: "Linh",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=300",
    },
  ];

  const [value, setValue] = useState("");
  const submit = () => {
    if (!value.trim()) return;
    Alert.alert("Post", `Posted: ${value}`);
    setValue("");
  };
  const ComposerAction = ({
    icon,
    label,
  }: {
    icon: React.ReactNode;
    label: string;
  }) => (
    <Pressable className="flex-row items-center gap-2 rounded-xl px-2 py-1">
      {icon}
      <Text className="text-gray-700 text-xs">{label}</Text>
    </Pressable>
  );
  return (
    <View className="mx-4 mb-3 rounded-2xl bg-white p-3 shadow">
      <View className="flex-row items-center gap-3">
        <Avatar uri={stories[0].avatar} size={36} />
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="What's on your mind?"
          className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-[15px]"
          placeholderTextColor="#9CA3AF"
          returnKeyType="send"
          onSubmitEditing={submit}
        />
        <Pressable
          onPress={submit}
          className="rounded-xl bg-indigo-600 px-3 py-2"
        >
          <Text className="text-white font-semibold">Post</Text>
        </Pressable>
      </View>
      <View className="mt-3 flex-row justify-between">
        <ComposerAction
          icon={<Feather name="image" size={18} />}
          label="Photo"
        />
        <ComposerAction
          icon={<Feather name="map-pin" size={18} />}
          label="Check in"
        />
        <ComposerAction
          icon={<Feather name="user-plus" size={18} />}
          label="Tag"
        />
      </View>
    </View>
  );
};

export default NewPost;
