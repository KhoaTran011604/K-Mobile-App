import { useRouter } from "expo-router";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

export default function UserList() {
  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Hey, are you coming tonight?",
      online: true,
    },
    {
      id: 2,
      name: "David Kim",
      avatar: "https://i.pravatar.cc/150?img=2",
      lastMessage: "Sent you the files already!",
      online: false,
    },
    {
      id: 3,
      name: "Sophia Lee",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastMessage: "Let’s grab coffee later ☕",
      online: true,
    },
    {
      id: 4,
      name: "Ethan Brown",
      avatar: "https://i.pravatar.cc/150?img=4",
      lastMessage: "Call me when you're free",
      online: false,
    },
    {
      id: 5,
      name: "Chloe Nguyen",
      avatar: "https://i.pravatar.cc/150?img=5",
      lastMessage: "Where are you now?",
      online: true,
    },
    {
      id: 6,
      name: "Liam Tran",
      avatar: "https://i.pravatar.cc/150?img=6",
      lastMessage: "Typing...",
      online: true,
    },
  ];
  const router = useRouter();
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="flex-row items-center p-3 border-b border-gray-200"
          onPress={() => {
            router.push("/message/detail");
          }}
        >
          <View className="relative">
            <Image
              source={{ uri: item.avatar }}
              className=" rounded-full"
              style={{ width: 48, height: 48 }}
            />
            {item.online && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "green",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  borderRadius: "100%",
                }}
              />
            )}
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-base font-semibold text-gray-800">
              {item.name}
            </Text>
            <Text className="text-sm text-gray-500" numberOfLines={1}>
              {item.lastMessage}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
