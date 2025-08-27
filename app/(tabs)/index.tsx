// App.tsx
// Expo + NativeWind (Tailwind for React Native)
// One-file demo for a social media Home screen
// ------------------------------------------------------------
// ✅ What you get
// - Sticky header with search & messages button
// - "Stories" horizontal list
// - Composer (What's on your mind?)
// - Virtualized feed with posts (text + image grid)
// - Like / Comment / Share actions with optimistic UI
// - Pull-to-refresh & infinite scroll mock
// - TypeScript + @expo/vector-icons + expo-image
// - Clean, modern Tailwind classes via NativeWind
// ------------------------------------------------------------

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  RefreshControl,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { Feather, Ionicons } from "@expo/vector-icons";
import Stories from "@/components/social/common/Stories";
import Avatar from "@/components/social/common/Avatar";
import Header from "@/components/social/common/Header";
import PostCard from "@/components/social/common/PostCard";
import { GetAllPostByUserId } from "@/api/postService";
import { Filter, ItemPostProps } from "@/types/MainType";
import axios from "axios";
import { BaseResponse } from "@/api/BaseResponse";

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------

export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type Post = {
  id: string;
  user: User;
  createdAt: string; // ISO or humanized string
  text?: string;
  images?: string[]; // 0..n images
  liked: boolean;
  likeCount: number;
  commentCount: number;
  shareCount: number;
};

// ------------------------------------------------------------
// Mock data
// ------------------------------------------------------------

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

function makePost(i: number): Post {
  const u = stories[i % stories.length];
  const imagesPool = [
    "https://images.unsplash.com/photo-1520975659018-b3123d0a38f4?q=80&w=1200",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200",
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200",
  ];
  const imgCount = i % 4;
  return {
    id: `p${i}`,
    user: u,
    createdAt: `${1 + (i % 59)}m`,
    text:
      i % 2 === 0 ? "What a day! Loving this view and good vibes." : undefined,
    images: imgCount ? imagesPool.slice(0, imgCount) : undefined,
    liked: i % 5 === 0,
    likeCount: Math.floor(Math.random() * 900) + 20,
    commentCount: Math.floor(Math.random() * 200),
    shareCount: Math.floor(Math.random() * 50),
  };
}

const INITIAL_POSTS: Post[] = Array.from({ length: 12 }, (_, i) =>
  makePost(i + 1)
);

// ------------------------------------------------------------
// Home Screen
// ------------------------------------------------------------

export default function App() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // Prepend new posts demo
      const fresh = Array.from({ length: 3 }, (_, i) =>
        makePost(Date.now() + i)
      );
      setPosts((prev) => [...fresh, ...prev]);
      setRefreshing(false);
    }, 800);
  }, []);

  const onEndReached = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setPosts((prev) => [
        ...prev,
        ...Array.from({ length: 6 }, (_, i) => makePost(prev.length + i + 1)),
      ]);
      setLoadingMore(false);
    }, 900);
  }, [loadingMore]);

  const toggleLike = useCallback((id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likeCount: p.liked ? p.likeCount - 1 : p.likeCount + 1,
            }
          : p
      )
    );
  }, []);

  const ListHeader = useCallback(
    () => (
      <>
        {/* <Header /> */}
        <Stories />
      </>
    ),
    []
  );
  const filterInit: Filter = {
    keySearch: "",
    sort: {},
    page: 1,
    pageSize: 10,
    sessionCode: Math.random().toString(),
  };
  const [filterPage, setFilterPage] = useState<Filter>(filterInit);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ItemPostProps[]>([]);

  const [hasMore, setHasMore] = useState(true);
  const LoadData = (isLoadMore = false) => {
    // if (isLoading) return;
    // setIsLoading(true);
    // console.log(filterPage);

    GetAllPostByUserId(filterPage)
      .then((response) => {
        console.log("response", response);

        if (response.success) {
          const newData = response.data;

          if (isLoadMore) {
            setData((prev) => [...prev, ...newData]);
          } else {
            setData(newData);
          }

          if (newData.length < filterPage.pageSize) {
            setHasMore(false);
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    LoadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPage]);
  return (
    <SafeAreaView className="flex-1 ">
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={ListHeader}
        renderItem={({ item }) => (
          <PostCard post={item} onToggleLike={toggleLike} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loadingMore ? (
            <View className="py-4 items-center">
              <Text className="text-gray-500">Loading more…</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

// ------------------------------------------------------------
// Notes
// ------------------------------------------------------------
// Tailwind (NativeWind) setup for Expo (TS)
// 1) yarn add nativewind tailwindcss
// 2) npx tailwindcss init --config tailwind.config.js -p (postcss is optional in RN)
// 3) yarn add react-native-svg @expo/vector-icons expo-image
// 4) Update babel.config.js:
//    module.exports = { presets: ['babel-preset-expo'], plugins: ['nativewind/babel'] };
// 5) tailwind.config.js:
//    /** @type {import('tailwindcss').Config} */
//    module.exports = {
//      content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
//      theme: { extend: {} },
//      plugins: [],
//    };
// 6) Create global.d.ts for NativeWind (if TS):
//    declare module "nativewind/types" {
//      interface NativeWindStyleSheet { }
//    }
// 7) Use className on React Native components after installing NativeWind.
