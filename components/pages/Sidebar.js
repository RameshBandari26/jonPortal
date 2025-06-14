import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sidebar = (props) => {
  const navigation = useNavigation();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [user, setUser] = useState(null); // state to store user data

  const handleExpand = (index) => {
    setExpandedMenu(expandedMenu === index ? null : index);
  };

  // ✅ Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('http://192.168.30.231:5000/api/users/userdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const menuItems = [
    { title: 'Home', icon: 'home', submenu: [], screen: 'HomePage' },
    {
      title: 'Prepare',
      icon: 'school',
      submenu: [
        { label: 'Mock Interviews', screen: 'MockInterviews' },
        { label: 'Tutorials', screen: 'Tutorials' },
      ],
    },
    {
      title: 'Participate',
      icon: 'emoji-events',
      submenu: [
        { label: 'Contests', screen: 'Contests' },
        { label: 'All India NCAT', screen: 'NCAT' },
        { label: 'Young Turks', screen: 'YoungTurks' },
        { label: 'Campus Squad', screen: 'CampusSquad' },
        { label: 'Ring of Honour', screen: 'RingOfHonour' },
      ],
    },
    {
      title: 'Opportunities',
      icon: 'work',
      submenu: [
        { label: 'Search', screen: 'Search' },
        { label: 'Applied Jobs', screen: 'AppliedJobs' },
        { label: 'Recruiter Messages', screen: 'RecruiterMessages' },
        { label: 'Recommended Jobs', screen: 'RecommendedJobs' },
        { label: 'Saved Jobs', screen: 'SavedJobs' },
      ],
    },
    {
      title: 'Profile Performance',
      icon: 'insights',
      submenu: [
        { label: 'Resume Score', screen: 'ResumeScore' },
        { label: 'Insights', screen: 'Insights' },
      ],
    },
    {
      title: 'Settings',
      icon: 'settings',
      submenu: [
        { label: 'Account Settings', screen: 'AccountSettings' },
        { label: 'Notifications', screen: 'Notifications' },
        { label: 'Privacy Policy', screen: 'PrivacyPolicy' },
        { label: 'Terms of Service', screen: 'TermsOfService' },
      ],
    },
    { title: 'Feedback', icon: 'feedback', submenu: [], screen: 'Feedback' },
    { title: 'Help', icon: 'help', submenu: [], screen: 'Help' },
    { title: 'Logout', icon: 'logout', submenu: [], screen: 'Login' },
    { title: 'About Us', icon: 'info', submenu: [], screen: 'AboutUs' },
  ];

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/60' }} // You can use user.profileImage if available
          style={styles.profilePic}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{user?.fullName || 'Loading...'}</Text>
          <Text style={styles.userDetail}>{user?.graduation || 'B.Tech Graduate'}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.updateProfile}>View & update profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <Text style={styles.updateProfile}>DashboardScreen</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      {menuItems.map((item, index) => (
        <View key={index}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              if (item.submenu.length > 0) {
                handleExpand(index);
              } else {
                navigation.navigate(item.screen);
              }
            }}
          >
            <Icon name={item.icon} size={22} color="#555" />
            <Text style={styles.menuText}>{item.title}</Text>
            {item.submenu.length > 0 && (
              <Icon
                name={expandedMenu === index ? 'expand-less' : 'expand-more'}
                size={22}
                color="#555"
                style={styles.expandIcon}
              />
            )}
          </TouchableOpacity>

          {expandedMenu === index &&
            item.submenu.map((subItem, subIndex) => (
              <TouchableOpacity
                key={subIndex}
                onPress={() => navigation.navigate(subItem.screen)}
                style={styles.subMenuButton}
              >
                <Text style={styles.subMenuButtonText}>{subItem.label}</Text>
              </TouchableOpacity>
            ))}
        </View>
      ))}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f1f1f1',
  },
  profilePic: { width: 55, height: 55, borderRadius: 30, marginRight: 12 },
  profileInfo: { flex: 1 },
  userName: { fontWeight: '700', fontSize: 16, color: '#222' },
  userDetail: { fontSize: 12, color: '#666', marginTop: 2 },
  updateProfile: { fontSize: 13, color: '#007bff', marginTop: 6 },
  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 10 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuText: { fontSize: 16, fontWeight: '600', color: '#333', marginLeft: 12, flex: 1 },
  expandIcon: { marginLeft: 'auto' },
  subMenuButton: {
    paddingLeft: 50,
    paddingVertical: 8,
    backgroundColor: '#fafafa',
  },
  subMenuButtonText: { fontSize: 14, color: '#555' },
});

export default Sidebar;
