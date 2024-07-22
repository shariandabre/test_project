import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { H1, H3, Paragraph, Button, XStack, YStack, Text } from 'tamagui';
import { Play, Plus, ThumbsUp, Share2, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function Details() {
  const { show: serializedShow } = useLocalSearchParams();
  const show = JSON.parse(serializedShow);
  const [expanded, setExpanded] = useState(false);

  const summary = show.summary?.replace(/<[^>]*>/g, '');
  const shortenedSummary = summary?.slice(0, 100) + '...';

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerTitle: show.name, headerStyle: { backgroundColor: "#000" } }} />
      <ImageBackground
        source={{ uri: show.image?.original || 'https://via.placeholder.com/680x1000' }}
        style={styles.heroImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent', 'rgba(0,0,0,1)']}
          style={styles.gradient}
        >
          <YStack space="$3" style={styles.heroContent}>
            <H1 color="white">{show.name}</H1>
            <XStack space="$3">
              <Button backgroundColor="white" color="black" icon={<Play color="black" />}>
                Play
              </Button>
              <Button backgroundColor="rgba(255,255,255,0.3)" icon={<Plus color="white" />}>
                My List
              </Button>
            </XStack>
          </YStack>
        </LinearGradient>
      </ImageBackground>

      <YStack space="$4" style={styles.content}>
        <YStack>
          <XStack space="$2" alignItems="center">
            <Text color="green">98% Match</Text>
            <Text color="gray">{show.premiered?.split('-')[0]}</Text>
            <Text color="gray">{show.runtime} min</Text>
            <Text color="white" backgroundColor="red" paddingHorizontal={4} borderRadius={2}>
              HD
            </Text>
          </XStack>
        </YStack>

        <YStack>
          <Paragraph color="white">
            {expanded ? summary : shortenedSummary}
          </Paragraph>
          {summary && summary.length > 100 && (
            <Button
              backgroundColor="transparent"
              onPress={() => setExpanded(!expanded)}
              icon={expanded ? <ChevronUp color="white" /> : <ChevronDown color="white" />}
            >
              <Text color="white">{expanded ? 'Read Less' : 'Read More'}</Text>
            </Button>
          )}
        </YStack>

        <YStack space="$2">
          <Text color="gray">Starring: [Cast]</Text>
          <Text color="gray">Genres: {show.genres?.join(', ')}</Text>
        </YStack>

        <XStack justifyContent="space-between">
          <YStack alignItems="center">
            <Button icon={<Plus color="white" />} backgroundColor="transparent">
              <Text color="white">My List</Text>
            </Button>
          </YStack>
          <YStack alignItems="center">
            <Button icon={<ThumbsUp color="white" />} backgroundColor="transparent">
              <Text color="white">Rate</Text>
            </Button>
          </YStack>
          <YStack alignItems="center">
            <Button icon={<Share2 color="white" />} backgroundColor="transparent">
              <Text color="white">Share</Text>
            </Button>
          </YStack>
        </XStack>

        <YStack space="$3">
          <H3 color="white">More Like This</H3>
          <XStack space="$2">
            <Image
              source={{ uri: 'https://via.placeholder.com/150x225' }}
              style={styles.relatedShowImage}
            />
            <Image
              source={{ uri: 'https://via.placeholder.com/150x225' }}
              style={styles.relatedShowImage}
            />
            <Image
              source={{ uri: 'https://via.placeholder.com/150x225' }}
              style={styles.relatedShowImage}
            />
          </XStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  heroImage: {
    height: 500,
    width: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  content: {
    padding: 16,
  },
  relatedShowImage: {
    width: 150,
    height: 225,
    borderRadius: 8,
  },
});
