import { Post } from "@/app/(tabs)";
import { useMemo } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import Avatar from "./Avatar";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ItemPostProps } from "@/types/MainType";
import { formatMessageTime } from "@/libs/format-message-time";

const PostCard = ({
  post,
}: {
  post: ItemPostProps;
  onToggleLike: (id: string) => void;
}) => {
  const grid = useMemo(() => buildGrid(post.images ?? []), [post.images]);
  function buildGrid(imgs: string[]): string[][] {
    // Return up to 2 rows, first row 1-2 images, second row remaining
    if (!imgs.length) return [];
    if (imgs.length === 1) return [[imgs[0]]];
    if (imgs.length === 2) return [[imgs[0], imgs[1]]];
    if (imgs.length === 3) return [[imgs[0]], [imgs[1], imgs[2]]];
    return [
      [imgs[0], imgs[1]],
      [imgs[2], imgs[3]],
    ];
  }
  // const ActionButton = ({
  //   icon,
  //   label,
  //   onPress,
  //   active,
  // }: {
  //   icon: React.ReactNode;
  //   label: string;
  //   onPress?: () => void;
  //   active?: boolean;
  // }) => (
  //   <Pressable
  //     onPress={onPress}
  //     className="flex-1 flex-row items-center justify-center gap-2 rounded-xl py-2 active:opacity-70"
  //   >
  //     {icon}
  //     <Text
  //       className={active ? "font-semibold text-indigo-600" : "text-gray-700"}
  //     >
  //       {label}
  //     </Text>
  //   </Pressable>
  // );

  return (
    <View className=" mb-4  bg-white p-4  shadow-slate-400">
      {/* Header */}
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <Avatar
            uri={post.userId.images[0].imageAbsolutePath}
            size={40}
            borderRadius={100}
          />
          <View>
            <Text className="font-semibold">{post.userId.fullName}</Text>
            <Text className="text-xs text-gray-500">
              {formatMessageTime(post.createdAt)} · Public
            </Text>
          </View>
        </View>
        <Feather name="more-horizontal" size={20} />
      </View>

      {/* Text */}
      {!!post.content && (
        <Text className="my-3 text-[15px] leading-5 text-gray-800">
          {post.content}
        </Text>
      )}

      {/* Images */}
      {/* {!!grid.length && (
        <View className="overflow-hidden rounded-2xl">
          <View className="flex-row">
            {grid[0].map((uri, idx) => (
              <Image
                key={`r0-${idx}`}
                source={{ uri }}
                className="flex-1 aspect-square"
                contentFit="cover"
                transition={300}
              />
            ))}
          </View>
          {grid[1] && (
            <View className="mt-1 flex-row">
              {grid[1].map((uri, idx) => (
                <Image
                  key={`r1-${idx}`}
                  source={{ uri }}
                  className="flex-1 aspect-square"
                  contentFit="cover"
                  transition={300}
                />
              ))}
            </View>
          )}
        </View>
      )} */}

      {/* Stats */}
      <View className="mt-3 flex-row items-center justify-between">
        <Text className="text-xs text-gray-500">{post.likeCount} likes</Text>
        <Text className="text-xs text-gray-500">
          {post.commentCount} comments · {"0"} shares
        </Text>
      </View>

      {/* Actions */}
      <View className="mt-2 h-px bg-gray-100" />
      <View className="mt-1 flex-row justify-between">
        {/* <ActionButton
          active={post.liked}
          onPress={() => onToggleLike(post.id)}
          icon={
            post.liked ? (
              <Feather name="heart" size={18} color={"gray"} />
            ) : (
              <Feather name="heart" size={18} color={"gray"} />
            )
          }
          label={post.liked ? "Liked" : "Like"}
        />
        <ActionButton
          icon={<Feather name="message-circle" size={18} color={"gray"} />}
          label="Comment"
          onPress={() => Alert.alert("Comments")}
        />
        <ActionButton
          icon={<Feather name="share-2" size={18} color={"gray"} />}
          label="Share"
          onPress={() => Alert.alert("Share")}
        /> */}
      </View>
    </View>
  );
};

export default PostCard;
