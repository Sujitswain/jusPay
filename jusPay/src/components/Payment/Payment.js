import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '@react-navigation/native';

import { firebase } from '../../configure/config';

const PaymentScreen = ({ route }) => {

  const { selectedAddress } = route.params;
  const { cartItems, getCurrentUserId, clearCart } = useCart();
  const navigation = useNavigation();

  const calculateTotalPriceForItem = (item) => {
    return item.price * item.quantity;
  };

  const calculateOverallTotal = () => {
    return cartItems.reduce((total, item) => total + calculateTotalPriceForItem(item), 0);
  };

  const payment = () => {

    return true;

    // if success true or false
  };

  const place_order = async () => {
    if (payment()) {
      try {
        const userId = getCurrentUserId();
        const orderDocRef = await firebase.firestore().collection('orders').add({
          userId,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          items: cartItems,
          totalPrice: calculateOverallTotal(),
          orderStatus: 'pending',
          address: selectedAddress,
        });

        clearCart();

        navigation.navigate('OrderStatus', { success: true });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigation.navigate('OrderStatus', { success: false });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Payment Section</Text>
        {cartItems.map((item) => (
          <View style={styles.itemContainer} key={item.id}>
            <Text style={styles.itemName}>Name: {item.name}</Text>
            <Text style={styles.itemPrice}>Price: ${item.price?.toFixed(2)}</Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.totalPrice}>Total Price: ${calculateTotalPriceForItem(item)?.toFixed(2)}</Text>
          </View>
        ))}
        <Text style={styles.overallTotal}>Overall Total: ${calculateOverallTotal().toFixed(2)}</Text>
        <TouchableOpacity onPress={() => place_order()} style={styles.paymentButton}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
            Pay Now {'$' + calculateOverallTotal().toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 14,
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  overallTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  paymentButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
});

export default PaymentScreen;
