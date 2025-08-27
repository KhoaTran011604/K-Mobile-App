import { Image } from "expo-image";

const Avatar = ({
  uri,
  size = 40,
  borderRadius = 0,
}: {
  uri: string;
  size?: number;
  borderRadius?: number;
}) => (
  <Image
    source={{ uri }}
    style={{ width: size, height: size, borderRadius }}
    className="rounded-full bg-gray-200"
    contentFit="cover"
    transition={300}
  />
);

export default Avatar;
