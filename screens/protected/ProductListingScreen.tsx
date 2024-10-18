import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {setProducts, searchProducts} from '../../redux/productSlice';
import {fetchProducts} from '../../services/api';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/navigationTypes';
import {logout, loadAuthState} from '../../redux/authSlice';
import CategoryFilter from '../../components/CategoryFilter';
import Search from '../../components/Search';
import Button from '../../components/Button';
import {Logo} from '../../assets/images';
import { USERNAME } from '../../utils/constants';


type ProductListingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductListing'
>;

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
}

const ProductListingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ProductListingScreenNavigationProp>();
  const {products, filteredProducts} = useSelector(
    (state: RootState) => state.products,
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string>('');

  useEffect(() => {
    dispatch(loadAuthState());

    if (!isAuthenticated) {
      navigation.navigate('Login');
    } else {
      loadProducts();
    }
  }, [dispatch, isAuthenticated, navigation]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const productData = await fetchProducts();
      dispatch(setProducts(productData));
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    dispatch(searchProducts(text));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  const handleFilterChange = (filters: string) => {
    setSelectedFilters(filters);
  };

  const renderItem = ({item}: {item: Product}) => (
    <ImageBackground source={{uri: item.images[0]}} style={styles.productCard}>
      <View style={styles.productTextContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </ImageBackground>
  );

  const handleEndReached = () => {
    loadProducts();
  };

  const filteredProductsBySelection =
    filteredProducts.length > 0 ? filteredProducts : products;
  const filteredResults = filteredProductsBySelection.filter(product => {
    const selectedCategories = selectedFilters.match(/#(\w+)/g) || [];
    const selectedBrands = selectedFilters.match(/#(\w+)/g) || [];

    const isCategoryMatched =
      selectedCategories.length === 0 ||
      selectedCategories.some(category => `#${product.category}` === category);

    const isBrandMatched =
      selectedBrands.length === 0 ||
      selectedBrands.some(brand => `#${product.brand}` === brand);

    return isCategoryMatched || isBrandMatched;
  });

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />

      <View style={styles.goBack}>
        <Text style={styles.selectedFiltersText}>
          Welcome, {USERNAME}
        </Text>
        <Button title="Logout" onPress={handleLogout} variant="text" />
      </View>

      <View style={styles.header}>
        <Search
          placeholder="Search a product"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <CategoryFilter
          placeholder="Filter by Category/Brand"
          products={products}
          onChangeText={handleFilterChange}
        />
      </View>

      <View style={styles.selectedFiltersContainer}>
        <Text style={styles.selectedFiltersText}>
          Selected Filters: {selectedFilters || 'None'}
        </Text>
      </View>

      {loading && products.length === 0 ? (
        <ActivityIndicator
          size="large"
          color="#FFFFFF"
          style={styles.loadingIndicator}
        />
      ) : (
        <FlatList
          data={filteredResults}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 20,
    backgroundColor: '#1E3445',
  },
  logo: {
    width: '100%',
    height: 100,
    marginTop: 80,
    marginBottom: 30,
  },
  goBack: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',  
  },
  header: {
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedFiltersContainer: {
    marginTop: -10,
    padding: 10,
  },
  selectedFiltersText: {
    color: '#FFFFFF',
  },
  flatListContainer: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 8,
    borderRadius: 10,
    overflow: 'hidden',
    height: 150,
    width: 150,
    justifyContent: 'flex-end',
  },
  productTextContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  productPrice: {
    fontSize: 14,
    color: '#fff',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default ProductListingScreen;
