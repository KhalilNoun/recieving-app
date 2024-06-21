import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
export default function DetailsScreen() {
  const params = useLocalSearchParams();
 
  
  
  
  return (
    <View style={styles.container}>
      <Text>Details </Text>
      {params.id ? <Text>{params.id}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});