import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import IMAGES from '../asset/image';
import {ApiCall} from '../services/apiServices';

const ProductList = ({navigation}) => {
  const [productList, setList] = useState([]);
  useEffect(() => {
    getDetails();
  }, [getDetails]);

  const getDetails = useCallback(async () => {
    const data = {
      page: '1',
      pageSize: '10',
      sort: {
        creationDateSortOption: 'DESC',
      },
    };
    try {
      const list = await ApiCall(
        'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/filter/product',
        'POST',
        data,
      );
      console.log('list', list?.data?.products);
      setList(list?.data?.products);
    } catch (error) {}
  }, []);
  const renderProduct = ({item, index}) => (
    <TouchableOpacity
      style={styles.product}
      onPress={() =>
        navigation.navigate('ProductDetails', {product: {...item, pId: index}})
      }>
      <Image source={IMAGES.download} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{'₹' + item.mrp?.mrp}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            product: {...item, pId: index},
          })
        }>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderProduct}
        numColumns={2}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  product: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
    width: '45%',
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#EE3823',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
