import { FlatList, Text, View } from "react-native";
import Avatar from "./Avatar";
import { User } from "@/app/(tabs)";

const Stories = () => {
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
  return (
    <View className="py-4">
      <FlatList
        data={stories}
        keyExtractor={(u) => u.id}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View className="w-3" />}
        renderItem={({ item }) => (
          <View className="items-center  w-32 h-36 border-4 border-blue-300 rounded-lg shadow-slate-300 overflow-hidden">
            <Avatar uri={item.avatar} size={140} />
          </View>
        )}
      />
    </View>
  );
};

export default Stories;
