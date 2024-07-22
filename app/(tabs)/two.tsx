import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { Input, YStack, XStack, H4, Text, Button, Card } from 'tamagui';
import { Search, X } from 'lucide-react-native';
import { router } from 'expo-router';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;

    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const renderItem = ({ item }) => (
    <Card bordered onPress={() => { router.push({ pathname: "/details", params: { show: JSON.stringify(item.show) } }) }} marginTop="$2">
      <XStack padding="$2" gap="$2" alignItems="flex-start">
        <Image
          source={{ uri: item.show.image?.medium || 'https://via.placeholder.com/100x150' }}
          style={styles.poster}
        />
        <YStack marginLeft="$2" flex={1}>
          <H4>{item.show.name}</H4>
          <Text color={'white'} numberOfLines={2}>{item.show.summary?.replace(/<[^>]*>/g, '')}</Text>
        </YStack>
      </XStack>
    </Card>
  );

  return (
    <View style={styles.container}>
      <YStack padding="$3" space="$3">
        <XStack alignItems="center" space="$2">
          <Input
            flex={1}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for TV shows..."
            onSubmitEditing={handleSearch}
          />
          {searchQuery ? (
            <Button icon={<X />} circular onPress={clearSearch} />
          ) : (
            <Button icon={<Search />} circular onPress={handleSearch} />
          )}
        </XStack>

        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={(item) => item.show.id.toString()}
          />
        )}
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
});
