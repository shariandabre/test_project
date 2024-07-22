




import React, { useEffect, useState } from "react";
import { TamaguiProvider } from 'tamagui'
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

import config from '../tamagui.config'
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import AnimatedSplashScreen from "~/components/AnimatedSplashScreen";

//SplashScreen.preventAutoHideAsync();




export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
  const schema = useColorScheme()
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf")
  });

  useEffect(() => {
    if (loaded) {
      // SplashScreen.hideAsync();
      setAppReady(true);
    }
  }, [loaded]);

  if (!loaded) return null;

  const showAnimatedSplash = !appReady || !splashAnimationFinished;
  if (showAnimatedSplash) {
    return (
      <AnimatedSplashScreen
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled) {
            setSplashAnimationFinished(true);
          }
        }}
      />
    );
  }
  return (
    <ThemeProvider value={DarkTheme}>
      <TamaguiProvider config={config}>

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="details" options={{ presentation: "modal" }} />
        </Stack>

      </TamaguiProvider>
    </ThemeProvider>
  );
}
