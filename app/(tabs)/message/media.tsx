import { ScrollView } from "react-native";
import Grid3x3 from "@/components/social/common/BoxImageGrid3x3";

export default function MediaScreen() {
  const fakeImages = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    uri: `https://picsum.photos/seed/${i}/300`,
    span: Math.random() > 0.7 ? 2 : 1, // 30% ảnh sẽ to gấp đôi
  }));
  return (
    <ScrollView>
      <Grid3x3 images={fakeImages} />
    </ScrollView>
  );
}
