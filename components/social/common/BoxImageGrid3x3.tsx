import { View, Text, Image, TouchableOpacity } from "react-native";

const Grid3x3 = ({
  images,
}: {
  images: { id: number; uri: string; span: number }[];
}) => {
  return (
    <View className="flex flex-row flex-wrap w-full">
      {images.slice(0, 9).map((img) => (
        <TouchableOpacity
          key={img.id}
          className={`p-1`}
          style={{
            width: img.span === 2 ? "66%" : "33%",
            height: img.span === 2 ? 200 : 100,
          }}
        >
          <Image
            source={{ uri: img.uri }}
            className="w-full h-full rounded-lg"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Grid3x3;
