import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const JobResultsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [skills, setSkills] = useState(route.params?.skills || '');
  const [location, setLocation] = useState(route.params?.location || '');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const queryParams = [];
      if (skills) queryParams.push(`skills=${encodeURIComponent(skills)}`);
      if (location) queryParams.push(`location=${encodeURIComponent(location)}`);
      const queryString = queryParams.join('&');

      const response = await fetch(`http://192.168.30.231:5000/api/jobs/search?${queryString}`);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = () => {
    Keyboard.dismiss();
    fetchJobs();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('JobCard', { job: item })}
    >
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.jobTitle}>{item.jobTitle}</Text>
          <Text style={styles.companyName}>{item.companyName}</Text>
          <View style={styles.locationRow}>
            <Icon name="location-outline" size={14} color="#888" />
            <Text style={styles.locationText}>{item.location || 'Not mentioned'}</Text>
          </View>
        </View>
        <Image
          source={{ uri: item.companyLogo || 'https://placehold.co/60x60' }}
          style={styles.companyLogo}
        />
      </View>

      <Text style={styles.desc}>{item.description?.slice(0, 90)}...</Text>

      <View style={styles.skillsRow}>
        {(item.skills || []).slice(0, 3).map((skill, index) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.postedText}>Posted recently</Text>
        <TouchableOpacity>
          <Icon name="bookmark-outline" size={20} color="#888" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.searchBarWrapper}>
        <View style={styles.inputBox}>
          <Icon name="search" size={20} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search skills..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={skills}
            onChangeText={setSkills}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>
        <View style={styles.inputBox}>
          <Icon name="location-outline" size={20} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Location..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={location}
            onChangeText={setLocation}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Icon name="search" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563FF" />
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={<Text>No jobs found.</Text>}
        />
      )}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
  searchBtn: {
    backgroundColor: '#2563FF',
    borderRadius: 12,
    padding: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  companyName: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#6b7280',
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginLeft: 12,
  },
  desc: {
    fontSize: 13,
    color: '#6b7280',
    marginVertical: 8,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  skillTag: {
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginTop: 4,
  },
  skillText: {
    fontSize: 12,
    color: '#374151',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postedText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default JobResultsScreen;
