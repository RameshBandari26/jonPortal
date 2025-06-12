import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
export function EditSkillsDetailsScreen({ route, navigation }) {
  const { experiences, location, ctc } = route.params;
  const [skills, setSkills] = useState(`${experiences}, ${location}, ${ctc}`);

  const handleSave = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Skills</Text>
      <TextInput style={styles.input} value={skills} onChangeText={setSkills} />

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
