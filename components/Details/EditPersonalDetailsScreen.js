import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
export function EditPersonalDetailsScreen({ route, navigation }) {
  const { experiences, location, ctc } = route.params;
  const [address, setAddress] = useState(experiences);
  const [disable, setDisable] = useState(location);
  const [languages, setLanguages] = useState(ctc);

  const handleSave = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Address</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} />

      <Text style={styles.label}>Disable</Text>
      <TextInput style={styles.input} value={disable} onChangeText={setDisable} />

      <Text style={styles.label}>Languages</Text>
      <TextInput style={styles.input} value={languages} onChangeText={setLanguages} />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
  },
});
