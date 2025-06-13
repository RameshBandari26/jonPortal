import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SideDrawer from '../Recruiter/SideDrawer';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import { API_URL } from '@env'; // Ensure you have this set up in your .env file


const RecruiterHomePage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(-300)).current;
  const drawerRef = useRef(null);
  const searchInputRef = useRef(null);
  const [openJobsCount, setOpenJobsCount] = useState(0);
  const [hiredCount, setHiredCount] = useState(0);
  const [interviewsCount, setInterviewsCount] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

useEffect(() => {
  const fetchJobCount = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token from storage:', token);

      const response = await axios.get(`${API_URL}/api/jobs/my-jobs/count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log('Response from count API:', response.data);

      setOpenJobsCount(response.data.count);
    } catch (error) {
      console.error('Failed to fetch job count:', error.message);
    }
  };

  fetchJobCount();
}, []);



  const toggleDrawer = () => {
    if (isDrawerOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
    Animated.timing(drawerAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsDrawerOpen(false));
  };

  const handleOutsidePress = () => {
    if (isDrawerOpen) {
      closeDrawer();
    }
  };

  const handleSearchPress = () => {
    if (isDrawerOpen) {
      closeDrawer();
    } else {
      searchInputRef.current?.focus();
    }
  };

  const stats = [
    { id: '1', title: 'Open Positions', value: openJobsCount.toString(), color: '#FF6B6B' },
    { id: '2', title: 'Hired', value: '11', color: '#4ECDC4' },
    { id: '3', title: 'Interviews', value: '8', color: '#FFD166' },
    { id: '4', title: 'Pending', value: '5', color: '#A5A5A5' },
  ];

  const candidates = [
    { id: '1', name: 'John Doe', position: 'UX Designer', match: '85%' },
    { id: '2', name: 'Jane Smith', position: 'React Native Dev', match: '92%' },
    { id: '3', name: 'Alex Johnson', position: 'Product Manager', match: '78%' },
    { id: '4', name: 'Sarah Williams', position: 'iOS Developer', match: '88%' },
  ];

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Side Drawer */}
      {isDrawerOpen && (
        <SideDrawer 
          animation={drawerAnimation} 
          closeDrawer={closeDrawer}
          style={styles.drawer}
        />
      )}

      {/* Main Content */}
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.mainContent} ref={drawerRef}>
          {/* Top Navigation */}
          <View style={styles.topNav}>
            <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
              <MaterialIcons name="menu" size={28} color="#333" />
            </TouchableOpacity>
            <Text style={styles.header}>Recruiter Dashboard</Text>
            <TouchableOpacity>
              <MaterialIcons name="notifications" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
          >
            {/* Content */}
            <View style={styles.content}>
              {/* Stats Boxes */}
              <View style={styles.statsContainer}>
                {stats.map(stat => (
                  <View key={stat.id} style={[styles.statCard, { backgroundColor: stat.color }]}>
                    <Text style={styles.statTitle}>{stat.title}</Text>
                    <Text style={styles.statValue}>{stat.value}</Text>
                  </View>
                ))}
              </View>

              {/* Search Bar */}
              <TouchableWithoutFeedback onPress={handleSearchPress}>
                <View style={styles.searchContainer}>
                  <MaterialIcons name="search" size={22} color="#999" />
                  <TextInput
                    ref={searchInputRef}
                    style={styles.searchBar}
                    placeholder="Search candidates..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onFocus={() => setKeyboardVisible(true)}
                    onBlur={() => setKeyboardVisible(false)}
                  />
                </View>
              </TouchableWithoutFeedback>

              {/* Candidates */}
              <Text style={styles.sectionHeader}>Recommended Candidates</Text>
              <FlatList
                data={filteredCandidates}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.candidateCard}>
                    <View style={styles.candidateInfo}>
                      <Text style={styles.candidateName}>{item.name}</Text>
                      <Text style={styles.candidatePosition}>{item.position}</Text>
                    </View>
                    <View style={styles.matchBadge}>
                      <Text style={styles.matchText}>{item.match}</Text>
                    </View>
                  </View>
                )}
                contentContainerStyle={{ paddingBottom: 80 }}
              />
            </View>
          </KeyboardAvoidingView>

          {/* Bottom Navigation */}
          {!isKeyboardVisible && (
            <View style={styles.bottomNav}>
              <TouchableOpacity style={styles.navItem}>
                <MaterialIcons name="home" size={24} color="#4285F4" />
                <Text style={[styles.navText, { color: '#4285F4' }]}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.navItem}>
                <MaterialIcons name="event-note" size={24} color="#666" />
                <Text style={styles.navText}>Interviews</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('PostJobs')}
              >
                <MaterialIcons name="add" size={30} color="#FFF" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.navItem}>
                <MaterialIcons name="message" size={24} color="#666" />
                <Text style={styles.navText}>Messages</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.navItem}>
                <MaterialIcons name="person" size={24} color="#666" />
                <Text style={styles.navText}>Account</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F5F5',
  },
  mainContent: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    zIndex: 100,
    width: 300,
    height: '100%',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuButton: { 
    padding: 8,
    borderRadius: 20,
  },
  header: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statTitle: { 
    fontSize: 14, 
    color: '#FFF', 
    marginBottom: 5,
    fontWeight: '500',
  },
  statValue: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#FFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchBar: { 
    flex: 1, 
    height: 48, 
    fontSize: 16, 
    color: '#333', 
    marginLeft: 8,
    includeFontPadding: false,
  },
  sectionHeader: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    color: '#333',
  },
  candidateCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  candidateInfo: { 
    flex: 1,
  },
  candidateName: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#333',
  },
  candidatePosition: { 
    fontSize: 14, 
    color: '#666', 
    marginTop: 4,
  },
  matchBadge: {
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  matchText: { 
    color: '#FFF', 
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomNav: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { 
    alignItems: 'center', 
    paddingHorizontal: 10,
  },
  navText: { 
    fontSize: 12, 
    color: '#666', 
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#5A1EFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default RecruiterHomePage;