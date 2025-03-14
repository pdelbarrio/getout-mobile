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
import EmailLogin from "./email-login.js";

const Drawer = createDrawerNavigator();

import Index from "./index.js";
import Login from "./login.js";
import AddSpot from "./add-spot.js";
import { useAuth } from "../contexts/AuthContext";

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
      <RootLayoutContent />
    </AuthProvider>
  );
}

function RootLayoutContent() {
  const { session, signOut } = useAuth();

  // Add this useEffect for debugging
  useEffect(() => {
    console.log("Current session state:", {
      isAuthenticated: !!session,
      sessionDetails: session,
    });
  }, [session]);

  return (
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
            name="add-spot"
            component={AddSpot}
            options={{
              title: "Add Spot",
              drawerLabel: "Add Spot",
            }}
          />
          <Drawer.Screen
            name="email-login"
            component={EmailLogin}
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />

          {!session ? (
            <>
              <Drawer.Screen
                name="login"
                component={Login}
                options={{
                  title: "Login",
                  drawerLabel: "Login",
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
            </>
          ) : (
            <>
              <Drawer.Screen
                name="logout"
                component={EmptyComponent}
                options={{
                  drawerLabel: "Logout",
                }}
                listeners={({ navigation }) => ({
                  drawerItemPress: () => {
                    signOut();
                    navigation.closeDrawer();
                    navigation.navigate("index");
                  },
                })}
              />
            </>
          )}
        </Drawer.Navigator>
        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

// Add this at the bottom of the file
const EmptyComponent = () => null;
