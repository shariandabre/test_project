import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View, StatusBar } from 'react-native';
import { H5, H6, ScrollView, XStack, YStack, Text, Card } from 'tamagui';
import { HeroFeature } from '~/components/EditScreenInfo';

export default function Home() {
  const fetchShowData = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const [shows, setShows] = useState([]);

  useEffect(() => {
    const loadShows = async () => {
      const data = await fetchShowData();
      setShows(data);
    };
    loadShows();
  }, []);

  const renderShowList = (title, shows) => (
    <YStack padding="$3" gap="$3">
      <H5 color="white">{title}</H5>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$3">
          {shows.map((item) => (
            <Card backgroundColor={"$backgroundTransparent"} key={item.show.id} onPress={() => { router.push({ pathname: "/details", params: { show: JSON.stringify(item.show) } }) }} width={121}>
              <Image
                style={styles.posterImage}
                source={{ uri: item.show.image?.medium || "https://via.placeholder.com/210x295" }}
              />
              <Text color="white" numberOfLines={1} style={styles.showTitle}>{item.show.name}</Text>
            </Card>
          ))}
        </XStack>
      </ScrollView>
    </YStack>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView flex={1}>
        <YStack flex={1}>
          <HeroFeature data={shows[3]?.show} />
          {renderShowList("Trending Now", shows.slice(0, 6))}
          {renderShowList("Popular on Netflix", shows.slice(6, 12))}
        </YStack>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  posterImage: {
    width: 120,
    height: 180,
    borderRadius: 4,
    resizeMode: "cover",
  },
  showTitle: {
    fontSize: 12,
    marginTop: 4,
  },
});

// HeroFeature component
