import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import TimeStamp from './TimeStamp.js';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';


export default function HomePage() {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [openJobs, setOpenJobs] = useState(0);
  const [latestJobs, setLatestJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [appliedCount, setAppliedCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('token');
      const userObject = JSON.parse(storedUser);

      if (userObject?.email) {
        const response = await fetch('http://192.168.30.231:5000/api/users/userdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({ email: userObject.email }),
        });

        const data = await response.json();
        setUser(data);
      }
    } catch (e) {
      console.log('Error fetching user data:', e);
    }
  };
  

  const fetchJobStats = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const [userJobsRes, totalJobsRes] = await Promise.all([
        axios.get('http://192.168.30.231:5000/api/jobs/my-jobs/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://192.168.30.231:5000/api/jobs/count'),
      ]);
      setOpenJobs(userJobsRes.data.count);
      setTotalJobs(totalJobsRes.data.total);
    } catch (error) {
      console.error('Failed to fetch job stats:', error.message);
    }
  };

  const fetchLatestJobs = async () => {
    try {
      const res = await axios.get('http://192.168.30.231:5000/api/jobs/latest');
      setLatestJobs(res.data);
    } catch (error) {
      console.error('Failed to fetch latest jobs:', error.message);
    }
  };

  const fetchAppliedCount = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.error("No token found in AsyncStorage");
        return;
      }

      const res = await fetch('http://192.168.30.231:5000/api/jobs/applied/count', {

        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setAppliedCount(data.count);
    } catch (err) {
      console.error('Error fetching applied count:', err.message);
    }
  };


  const fetchData = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      fetchUserData(),
      fetchJobStats(),
      fetchLatestJobs(),
      fetchAppliedCount(),
    ]);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setRecommendedJobs([...latestJobs.slice(0, 5)]);
  }, [latestJobs]);

  const username = user?.fullName || 'Guest';

  const renderJobCard = (job) => (
    <TouchableOpacity
      key={job._id}
      onPress={() => navigation.navigate('JobCard', { job })}
      style={styles.jobCardWrapper}
    >
      <View style={styles.jobCardContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.jobTitle}>{job.jobTitle}</Text>
          <Text style={styles.companyInfo}>
            {job.companyName} <Text style={styles.rating}>★ 3.8</Text> • 22 Reviews
          </Text>
          <View style={styles.rowInfo}>
            <Ionicons name="briefcase-outline" size={16} color="#6B7280" />
            <Text style={styles.rowText}> {job.experience || '1-3 Yrs'}</Text>
            <Ionicons name="location-outline" size={16} color="#6B7280" style={{ marginLeft: 12 }} />
            <Text style={styles.rowText}>{job.location}</Text>
          </View>
          <Text style={styles.description}>{job.description?.slice(0, 70)}...</Text>
          <View style={styles.skillsContainer}>
            {(job.Skills || ['React', 'Node']).map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <TimeStamp date={job.createdAt} />
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={{ uri: job.companyLogo || 'https://placehold.co/48x48' }}
          style={styles.logoImage}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Sidebar')}>
              <MaterialIcons name="menu" size={30} color="red" />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu-outline" size={30} color="black" />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.username}>{username}</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {username.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.avatar}>
              <TouchableOpacity style={styles.avatarText} onPress={() => navigation.navigate('Notifications')}>
                <Ionicons name="notifications-outline" size={24} color="black" style={{ marginRight: 10 }} />

              </TouchableOpacity>
            </View>
          </View>

          {/* Search */}
          <View style={styles.searchBox}>
            
            <TextInput placeholder="Search job here..." placeholderTextColor="#888" style={styles.searchInput} />
            <Ionicons name="search" size={20} color="gray" 
          onPress={() => navigation.navigate('Search')}/>
          </View>

          {/* Stats */}
          <View style={styles.jobStats}>
            <View style={styles.statCardPurple}>
              <Text style={styles.statLabel}>Jobs Applied</Text>
              <Text style={styles.statValue}>{appliedCount}</Text>
            </View>
            <View style={styles.statCardBlue}>
              <Text style={styles.statLabel}>Total Jobs</Text>
              <Text style={styles.statValue}>{totalJobs}</Text>
            </View>
          </View>

          {/* Status */}
          <View style={styles.statusCard}>
            <View>
              <Text style={styles.statLabel}>Pending</Text>
              <Text style={styles.statValue}>5</Text>
            </View>
            <View>
              <Text style={styles.statLabel}>Declined</Text>
              <Text style={styles.statValue}>6</Text>
            </View>
          </View>

          {/* Recommended */}
          <Text style={styles.sectionTitle}>Recommended Jobs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recommendedJobs.map((job) => (
              <View key={job._id} style={{ marginRight: 12, width: 280 }}>
                {renderJobCard(job)}
              </View>
            ))}
          </ScrollView>

          {/* Recent */}
          <View style={styles.recentHeader}>
            <Text style={styles.sectionTitle}>Recent Jobs</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>More</Text>
            </TouchableOpacity>
          </View>
          {latestJobs.map(renderJobCard)}
        </ScrollView>

        {/* Bottom Nav */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color="#7c3aed" />
            <Text style={styles.navTextActive}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <MaterialIcons name="interpreter-mode" size={24} color="gray" />
            <Text style={styles.navText}>Interviews</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="chatbubble" size={24} color="gray" />
            <Text style={styles.navText}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <FontAwesome name="user" size={24} color="gray" />
            <Text style={styles.navText}>Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scrollContent: { padding: 16, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  username: { color: '#6b21a8', fontSize: 20, fontWeight: 'bold' },
  avatar: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#6b21a8', fontWeight: 'bold' },
  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
    elevation: 2,
  },
  searchInput: { marginLeft: 10, flex: 1, },
  jobStats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  statCardPurple: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    width: '48%',
    padding: 16,
  },
  statCardBlue: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    width: '48%',
    padding: 16,
  },
  statLabel: { color: 'white', fontSize: 14 },
  statValue: { color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 8 },
  statusCard: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    marginTop: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#1f2937' },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 8,
  },
  linkText: { color: '#7c3aed' },
  jobCardWrapper: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jobCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  companyInfo: {
    color: '#6B7280',
    marginVertical: 4,
  },
  rating: {
    color: '#fbbf24',
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  rowText: {
    color: '#4B5563',
    fontSize: 13,
  },
  description: {
    color: '#6B7280',
    fontSize: 13,
    marginVertical: 4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  skillTag: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 12,
    color: '#374151',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  logoImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginLeft: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    elevation: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, color: 'gray' },
  navTextActive: { fontSize: 12, color: '#7c3aed' },
});
