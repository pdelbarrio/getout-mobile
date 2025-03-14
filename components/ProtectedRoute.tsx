import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";

type ProtectedRouteProps = {
  children: React.ReactNode;
  authRequired?: boolean;
};

export default function ProtectedRoute({
  children,
  authRequired = true,
}: ProtectedRouteProps) {
  const { session, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (authRequired && !session) {
        // Not logged in, trying to access protected route (like Add Spot) -> go to login
        router.replace("/login");
      } else if (!authRequired && session) {
        // Already logged in, trying to access login/signup -> go to index
        router.replace("/");
      }
    }
  }, [session, isLoading, authRequired]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (authRequired && !session) {
    return null;
  }

  if (!authRequired && session) {
    return null;
  }

  return <>{children}</>;
}
