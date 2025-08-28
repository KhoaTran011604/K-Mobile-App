import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image as RNImage,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { EvilIcons } from "@expo/vector-icons";

type Message = {
  id: string;
  text?: string;
  images?: string[]; // uris
  fromMe?: boolean;
  createdAt: number;
};

const FAKE_MESSAGES: Message[] = [
  {
    id: "m1",
    text: "Hey! How's it going?",
    fromMe: false,
    createdAt: Date.now() - 1000 * 60 * 60,
  },
  {
    id: "m2",
    text: "All good — working on the project. You?",
    fromMe: true,
    createdAt: Date.now() - 1000 * 60 * 55,
  },
  {
    id: "m3",
    text: "I found a bug in the grid layout. Can you check?",
    fromMe: false,
    createdAt: Date.now() - 1000 * 60 * 50,
  },
  {
    id: "m4",
    text: "Yep — I'll take a look and push a fix.",
    fromMe: true,
    createdAt: Date.now() - 1000 * 60 * 20,
  },
  {
    id: "m5",
    text: "Nice. Also sending some screenshots.",
    images: [
      "https://picsum.photos/seed/1/600/400",
      "https://picsum.photos/seed/2/600/800",
    ],
    fromMe: false,
    createdAt: Date.now() - 1000 * 60 * 10,
  },
  {
    id: "m6",
    text: "Got them — thanks!",
    fromMe: true,
    createdAt: Date.now() - 1000 * 60 * 5,
  },
];

export default function MessageDetailScreen() {
  const [messages, setMessages] = useState<Message[]>(FAKE_MESSAGES);
  const [text, setText] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        // Not fatal — user can still type messages
        console.warn("Media library permission not granted");
      }
    })();
  }, []);

  useEffect(() => {
    // auto scroll to bottom when messages change
    setTimeout(() => listRef.current?.scrollToEnd?.({ animated: true }), 50);
  }, [messages]);

  const handlePickImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.7,
        selectionLimit: 12, // iOS & Android behavior may differ
      } as any);

      if (!res?.canceled) {
        // expo-image-picker V13 returns different shapes between single/multiple
        if ((res as any).selected) {
          const uris = (res as any).selected.map((i: any) => i.uri);
          setSelectedImages((s) => [...s, ...uris].slice(0, 12));
        } else if ((res as any).assets) {
          const uris = (res as any).assets.map((a: any) => a.uri);
          setSelectedImages((s) => [...s, ...uris].slice(0, 12));
        } else {
          // older shape
          setSelectedImages((s) => [...s, (res as any).uri].slice(0, 12));
        }
      }
    } catch (err) {
      console.warn("pick image error", err);
    }
  };

  const handleSend = () => {
    if (!text.trim() && selectedImages.length === 0) return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      text: text.trim() || undefined,
      images: selectedImages.length ? selectedImages : undefined,
      fromMe: true,
      createdAt: Date.now(),
    };

    setMessages((m) => [...m, newMsg]);
    setText("");
    setSelectedImages([]);
  };

  const removePreview = (uri: string) => {
    setSelectedImages((s) => s.filter((u) => u !== uri));
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const bubbleClass = item.fromMe
      ? "bg-blue-500 self-end"
      : "bg-gray-100 self-start";
    const textClass = item.fromMe ? "text-white" : "text-gray-800";

    return (
      <View
        className={`max-w-3/4 my-2 ${item.fromMe ? "items-end" : "items-start"}`}
      >
        <View
          className={`p-3 rounded-2xl ${item.fromMe ? "rounded-br-none" : "rounded-bl-none"} ${bubbleClass}`}
        >
          {item.text ? (
            <Text className={`${textClass}`}>{item.text}</Text>
          ) : null}

          {item.images && (
            <View className="flex-row flex-wrap mt-2">
              {item.images.map((uri, i) => (
                <View
                  key={uri + i}
                  className="mr-2 mb-2 overflow-hidden rounded-lg"
                  style={{ width: 160, height: 120 }}
                >
                  <Image
                    source={{ uri }}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                  />
                </View>
              ))}
            </View>
          )}

          <Text
            className={`text-xs mt-1 ${item.fromMe ? "text-white/80" : "text-gray-500"}`}
          >
            {new Date(item.createdAt).toLocaleTimeString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(i) => i.id}
          renderItem={renderMessage}
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        />

        {/* Selected image previews (limit 12). thumbnails sized 48x48 for clear preview. */}
        {selectedImages.length > 0 && (
          <View className="px-4 mb-2">
            <FlatList
              data={selectedImages}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(u) => u}
              renderItem={({ item }) => (
                <View className="mr-2 relative">
                  <Pressable
                    onPress={() => removePreview(item)}
                    className="absolute z-10 right-0 top-0 bg-black/50 rounded-full p-0.5"
                  >
                    <Text className="text-white text-[10px]">×</Text>
                  </Pressable>
                  <RNImage
                    source={{ uri: item }}
                    style={{ width: 48, height: 48, borderRadius: 8 }}
                  />
                </View>
              )}
            />
          </View>
        )}

        {/* Input area */}
        <View className="px-4 pb-4 pt-2">
          <View className="flex-row items-center gap-2">
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Type a message"
              className="flex-1 border border-gray-200 rounded-l-lg px-4 py-3"
              multiline
              numberOfLines={1}
              style={{ maxHeight: 120 }}
            />
            <TouchableOpacity
              onPress={handlePickImage}
              className="p-3   bg-gray-100"
            >
              <EvilIcons name="image" size={24} color="green" />
            </TouchableOpacity>
            <Pressable
              onPress={handleSend}
              className=" bg-blue-500 p-3 rounded-r-lg"
            >
              <Text className="text-white font-bold">Send</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
