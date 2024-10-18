import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

interface CategoryFilterProps {
  placeholder: string;
  products: Array<{
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    brand: string;
  }>;
  onChangeText: (text: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  placeholder,
  products,
  onChangeText,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  const uniqueCategories = Array.from(
    new Set(products.map(product => product.category)),
  );
  const uniqueBrands = Array.from(
    new Set(products.map(product => product.brand)),
  );

  const handleCategorySelect = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category],
    );
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(br => br !== brand) : [...prev, brand],
    );
  };

  const handleApplyFilters = () => {
    const filters = [
      ...selectedCategories.map(cat => `#${cat}`),
      ...selectedBrands.map(br => `#${br}`),
    ].join(' ');
    onChangeText(filters);
    setModalVisible(false);
    setShowCategoryDropdown(false);
    setShowBrandDropdown(false);
  };

  const isCategorySelected = (category: string) =>
    selectedCategories.includes(category);
  const isBrandSelected = (brand: string) => selectedBrands.includes(brand);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.button}>
        <Text style={styles.buttonText}>{placeholder}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalSelectionsContainer}>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => {
                  setShowCategoryDropdown(prev => !prev);
                  setShowBrandDropdown(false);
                }}>
                <Text style={styles.dropdownButtonText}>
                  Filter by Category
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => {
                  setShowBrandDropdown(prev => !prev);
                  setShowCategoryDropdown(false);
                }}>
                <Text style={styles.dropdownButtonText}>Filter by Brand</Text>
              </TouchableOpacity>
            </View>

            {showCategoryDropdown && (
              <View style={styles.dropdownContainer}>
                <Text style={styles.filterTitle}>Categories</Text>
                <FlatList
                  data={uniqueCategories}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => handleCategorySelect(item)}>
                      <Text
                        style={[
                          styles.optionText,
                          isCategorySelected(item) && styles.selectedOptionText,
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item}
                />
              </View>
            )}

            {showBrandDropdown && (
              <View style={styles.dropdownContainer}>
                <Text style={styles.filterTitle}>Brands</Text>
                <FlatList
                  data={uniqueBrands}
                  renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleBrandSelect(item)}>
                      <Text
                        style={[
                          styles.optionText,
                          isBrandSelected(item) && styles.selectedOptionText,
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item}
                />
              </View>
            )}

            <Text style={styles.selectedValuesText}>
              Selected:{' '}
              {[
                ...selectedCategories.map(cat => `#${cat}`),
                ...selectedBrands.map(br => `#${br}`),
              ].join(' ')}
            </Text>

            <TouchableOpacity
              onPress={handleApplyFilters}
              style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#1E3445',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    height: 400,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  modalSelectionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  dropdownButtonText: {
    textAlign: 'center',
  },
  dropdownContainer: {
    marginVertical: 10,
  },
  filterTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  optionText: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    color: '#1E3445',
  },
  selectedOptionText: {
    color: '#FF6347',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
  },
  applyButton: {
    backgroundColor: '#1E3445',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  applyButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  selectedValuesText: {
    marginVertical: 10,
    fontSize: 14,
    color: '#1E3445',
  },
});

export default CategoryFilter;
