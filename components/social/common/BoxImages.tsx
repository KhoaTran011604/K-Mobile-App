import React, { useState } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { Image } from "expo-image";
import { imageProps } from "@/types/MainType";

type BoxImagesProps = {
  images: imageProps[];
};

const BoxImages: React.FC<BoxImagesProps> = ({ images }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const displayImages = images.slice(0, 2); // Hiển thị tối đa 2 ảnh trong feed
  const remaining = images.length - 2;
  const itemWidth = images.length === 1 ? "100%" : "48%";

  const openPreview = (index: number) => {
    setPreviewIndex(index);
    setPreviewVisible(true);
  };

  const showPrev = () => {
    setPreviewIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = () => {
    setPreviewIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Hiển thị trên feed */}
      <View className="flex-row flex-wrap justify-between mt-2">
        {displayImages.map((image, index) => (
          <Pressable
            key={index}
            onPress={() => openPreview(index)}
            style={{ width: itemWidth, aspectRatio: 1 }}
            className="rounded-xl overflow-hidden relative"
          >
            <Image
              source={{ uri: image.imageAbsolutePath }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={300}
            />
            {index === 1 && remaining > 0 && (
              <View className="absolute inset-0 bg-black/50 items-center justify-center">
                <Text className="text-white text-xl font-bold">
                  +{remaining}
                </Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      {/* Modal preview ảnh full */}
      <Modal visible={previewVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/90 items-center justify-center">
          {/* Ảnh full */}
          <Pressable
            className="absolute inset-0"
            onPress={() => setPreviewVisible(false)}
          />
          <Image
            source={{ uri: images[previewIndex].imageAbsolutePath }}
            style={{ width: "90%", height: "70%", borderRadius: 12 }}
            contentFit="contain"
            transition={300}
          />

          {/* Nút điều khiển chuyển ảnh */}
          {images.length > 1 && (
            <>
              <Pressable
                onPress={showPrev}
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full"
              >
                <Text className="text-white text-lg">‹</Text>
              </Pressable>
              <Pressable
                onPress={showNext}
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full"
              >
                <Text className="text-white text-lg">›</Text>
              </Pressable>
            </>
          )}
        </View>
      </Modal>
    </>
  );
};

export default BoxImages;
