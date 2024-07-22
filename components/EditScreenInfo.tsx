import { Image, ImageBackground } from 'react-native';
import { YStack, H4, Paragraph, XStack, TextArea, Text, View, H6, Button } from 'tamagui';

import { LinearGradient } from 'expo-linear-gradient';
import { Info, Play, Plus } from 'lucide-react-native';

export const HeroFeature = ({ data }: { data: any }) => {
  const image = { uri: data?.image?.original || 'https://via.placeholder.com/680x1000' };

  return (

    <View flex={1}>
      <ImageBackground source={image} style={{ width: "100%", resizeMode: "cover", aspectRatio: 0.8, display: "flex", alignItems: 'center', justifyContent: "space-between" }}>
        <LinearGradient
          colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0.3)']}
          style={{
            width: '100%',
            paddingVertical: '$4',
          }}
        >
          <XStack padding="$3" alignItems='center' width={"100%"} justifyContent='space-evenly'>
            <H6>TV Shows</H6>
            <H6>Movies</H6>
            <H6>Categories</H6>
          </XStack>
        </LinearGradient>
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,1)']}
          style={{
            width: '100%',
            paddingVertical: '$4',
          }}
        >
          <YStack padding="$3" alignItems='center' space="$3">
            <XStack space="$3">
              <Button backgroundColor="white" color="black" icon={<Play color="black" />}>
                Play
              </Button>
              <Button backgroundColor="rgba(255,255,255,0.3)" color="white" icon={<Info color="white" />}>
                More Info
              </Button>
            </XStack>
          </YStack>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};
