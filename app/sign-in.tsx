import { Alert, TextInput, View } from "react-native";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { useAuthStore } from "@/utils/authStore";
import { useState } from "react";
import { LoginProps } from "@/types/MainType";

export default function SignInScreen() {
  const { logIn } = useAuthStore();
  const [request, setRequest] = useState<LoginProps>({
    email: "khoa@gmail.com",
    password: "123456",
  });
  const handleLogin = () => {
    const response = logIn(request);
    if (!response) {
      alert("Something Wrongs!");
    }
  };

  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading">
        Sign In Screen
      </AppText>
      <View className="gap-4">
        <TextInput
          className="border border-gray-300 p-4 rounded-lg"
          value={request.email}
          onChangeText={(text) => setRequest({ ...request, email: text })}
        />
        <TextInput
          className="border border-gray-300 p-4 rounded-lg"
          value={request.password}
          onChangeText={(text) => setRequest({ ...request, password: text })}
        />
      </View>
      <Button style={{ marginTop: 12 }} title="Sign in" onPress={handleLogin} />
    </View>
  );
}
