import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
export function EditEducationDetailsScreen({ route, navigation }) {
  const { experiences, location, ctc } = route.params;
  const [education, setEducation] = useState(`${experiences}, ${location}, ${ctc}`);

  const handleSave = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Education</Text>
      <TextInput style={styles.input} value={education} onChangeText={setEducation} multiline />

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
