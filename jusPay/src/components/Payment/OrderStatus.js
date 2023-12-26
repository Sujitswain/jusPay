import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderStatus = ({ route }) => {
  const { success } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    // Duration to display the GIF (in milliseconds)
    const gifDisplayDuration = 3000; // Increased duration for a longer display time

    // Play the animation for the specified duration
    const gifDisplayTimer = setTimeout(() => {
      navigation.navigate('Dashboard'); // Navigate to Dashboard screen after displaying GIF
    }, gifDisplayDuration);

    return () => clearTimeout(gifDisplayTimer); // Clear the timer when the component unmounts
  }, [navigation]);

  const gifSource = success
    ? require('../../../assets/payment_success.gif') // Update with the actual file name for success
    : require('../../../assets/payment_failure.gif'); // Update with the actual file name for failure

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{success ? 'Payment Successful!' : 'Payment Failed'}</Text>
      <Image
        source={gifSource}
        style={styles.gif}
        resizeMode="cover" // Adjust the resizeMode based on your preference
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: height * 0.04, // Responsive font size
    fontWeight: 'bold',
    marginBottom: height * 0.02, // Responsive margin
    textAlign: 'center',
  },
  gif: {
    width: width * 0.4, // Responsive width
    height: height * 0.2, // Responsive height
    borderRadius: height * 0.02, // Responsive border radius
  },
});

export default OrderStatus;
