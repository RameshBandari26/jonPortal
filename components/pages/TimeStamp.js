import React from 'react';
import { Text } from 'react-native';
import moment from 'moment'; // You can also use other date libraries

const TimeStamp = ({ date }) => {
  const formattedDate = moment(date).fromNow(); // e.g., "3 hours ago"
  return <Text style={{ color: 'gray', fontSize: 12 }}>{formattedDate}</Text>;
};

export default TimeStamp;
