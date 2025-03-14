import { Button } from "react-native-elements";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";

export default function LogoutButton() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
  };

  return <Button title="Logout" type="clear" onPress={handleLogout} />;
}
