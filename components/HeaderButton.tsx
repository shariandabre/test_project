import { forwardRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';

export const HeaderButton = forwardRef<typeof Pressable, { onPress?: () => void; }>(({ onPress }, ref) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Search style={styles.headerRight} size={25} color={"gray"} />
      )}
    </Pressable>
  );
});

export const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
});
