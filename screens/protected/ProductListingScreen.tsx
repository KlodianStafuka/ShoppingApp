import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setProducts } from '../../redux/productSlice';
import { fetchProducts } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../redux/authSlice';

const ProductListingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { products, filteredProducts } = useSelector((state: RootState) => state.products);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
    } else {
      const loadProducts = async () => {
        try {
          const productData = await fetchProducts();
          dispatch(setProducts(productData));
        } catch (error) {
          console.error('Failed to load products:', error);
        }
      };

      loadProducts();
    }
  }, [dispatch, isAuthenticated, navigation]);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text>{item.brand}</Text>
      <Text>{item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Listing</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      
      {products.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredProducts.length > 0 ? filteredProducts : products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productCard: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
    borderRadius: 5,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductListingScreen;
