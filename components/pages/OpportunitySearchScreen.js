// OpportunitySearchScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

const OpportunitySearchScreen = () => {
  const [type, setType] = useState(''); // or "job"

  const isInternship = type === 'internship';
   const navigation = useNavigation();

  return (
    

    <View style={styles.container}>
      {/* Back arrow (replace with your navigation handler) */}
      <Pressable
        hitSlop={10}
        onPress={() => {
          navigation.navigate('Drawer', { screen: 'HomePage' })// Navigate to HomePage on back press
        }}>
       
        <View style={styles.backArrow}>
            <Icon name="arrow-back" size={24} color="#000" />
        </View>
      </Pressable>

      <Text style={styles.title}>Find opportunities for you</Text>

      {/* Toggle: Internships / Jobs */}
      <View style={styles.toggleRow}>
        <RadioOption
          label="Internships"
          selected={isInternship}
          onPress={() => setType('internship')}
        />
        <RadioOption
          label="Jobs"
          selected={!isInternship}
          onPress={() => setType('job')}
        />
      </View>

      {/* Search fields */}
      <TextInput
        style={styles.input}
        placeholder="Designation, skill and company"
        placeholderTextColor="#8E8E93"
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor="#8E8E93"
      />

      {/* Primary button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          {isInternship ? 'Show internships' : 'Show jobs'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const RadioOption = ({label, selected, onPress}) => (
  <Pressable style={styles.radioOption} onPress={onPress}>
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  backArrow: {
    fontSize: 24,
    color: '#1A1A1A',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 24,
  },
  toggleRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 32,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8E8E93',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioOuterSelected: {
    borderColor: '#2563FF', // blue border when selected
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563FF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    height: 56,
    backgroundColor: '#2563FF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OpportunitySearchScreen;
