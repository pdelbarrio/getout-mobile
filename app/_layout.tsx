import { createDrawerNavigator } from "@react-navigation/drawer";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import Signup from "./signup.js";
import { AuthProvider } from "../contexts/AuthContext";

const Drawer = createDrawerNavigator();

import Index from "./index.js";
import Login from "./login.js";
import AddSpot from "./add-spot.js";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={DarkTheme}>
          <Drawer.Navigator
            screenOptions={({ navigation }) => ({
              headerStyle: {
                backgroundColor: "#000000",
              },
              headerTintColor: "#ffffff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              drawerStyle: {
                backgroundColor: "#1E1E1E",
              },
              drawerLabelStyle: {
                color: "#ffffff",
              },
              drawerActiveBackgroundColor: "#333333",
              drawerPosition: "right",
              headerLeft: () => null,
              headerRight: () => (
                <Pressable
                  onPress={() => navigation.openDrawer()}
                  style={{ marginRight: 15 }}
                >
                  <Ionicons name="menu" size={24} color="white" />
                </Pressable>
              ),
            })}
          >
            <Drawer.Screen
              name="index"
              component={Index}
              options={{
                title: "GetOutBCN",
                drawerLabel: "Home",
              }}
            />
            <Drawer.Screen
              name="login"
              component={Login} // Now using the Login component instead of Index
              options={{
                title: "Login",
                drawerLabel: "Login",
              }}
            />
            <Drawer.Screen
              name="add-spot"
              component={AddSpot}
              options={{
                title: "Add Spot",
                drawerLabel: "Add Spot",
              }}
            />
            <Drawer.Screen
              name="signup"
              component={Signup}
              options={{
                title: "Sign Up",
                drawerLabel: "Sign Up",
              }}
            />
          </Drawer.Navigator>
          <StatusBar style="light" />
        </ThemeProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
