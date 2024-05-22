import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import IMAGES from '../asset/image';
import {useAppBaseContext} from '../context/AppBaseContext';
import {CardAnimationContext} from '@react-navigation/stack';

const CartScreen = ({navigation}) => {
  const {dispatch, state} = useAppBaseContext();
  const [finalCartData, setFinalCartData] = useState([]);

  const handleIncrement = itemId => {
    const updatedCartData = finalCartData.map(item => {
      if (item.id === itemId) {
        return {...item, count: item.count + 1};
      }
      return item;
    });
    setFinalCartData(updatedCartData);
  };

  const handleDecrement = itemId => {
    const updatedCartData = finalCartData.map(item => {
      if (item.id === itemId && item.count > 0) {
        return {...item, count: item.count - 1};
      }
      return item;
    });
    setFinalCartData(updatedCartData);
  };
  useEffect(() => {
    mergeCartData();
  }, []);

  const mergeCartData = () => {
    const mergedItems = {};
    state?.cartData.forEach(item => {
      if (mergedItems[item.id]) {
        mergedItems[item.id].count += item.count;
      } else {
        mergedItems[item.id] = {...item};
      }
    });
    setFinalCartData(Object.values(mergedItems));
    return Object.values(mergedItems);
  };
  const renderSubTotalAmount = () => {
    let amount = 0;
    finalCartData.forEach(item => {
      amount = amount + item.price * item?.count;
    });
    console.log('first', typeof amount);
    // setSubTotalAmount(amount);
    return amount;
  };
  const renderList = ({item}) => {
    return (
      <View style={styles.cartList}>
        <View style={styles.subContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={IMAGES.download}
              style={{width: 80, height: 80, resizeMode: 'center'}}
            />
            <View style={styles.countContainer}>
              <View style={{width: '35%'}}>
                <Text>{item?.name}</Text>
                <Text>₹{item?.price * item?.count}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleDecrement(item?.id)}>
                  <Text style={[styles.button, {borderWidth: 0}]}>-</Text>
                </TouchableOpacity>
                <Text style={styles.buttonText}>{item?.count}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleIncrement(item?.id)}>
                  <Text style={[styles.button, {borderWidth: 0}]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View>
          <FlatList
            data={finalCartData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderList}
          />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardSubContainer}>
            <Text>Items :</Text>
            <Text style={styles.amountText}>{finalCartData?.length}</Text>
          </View>
          <View style={styles.cardSubContainer}>
            <Text>Delivery Charges :</Text>
            <Text style={styles.amountText}>{'₹' + 50}</Text>
          </View>
          <View style={styles.cardSubContainer}>
            <Text>SubTotal :</Text>
            <Text style={styles.amountText}>
              {'₹' + renderSubTotalAmount()}
            </Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardSubContainer}>
            <Text>Total :</Text>
            <Text style={styles.amountText}>
              {'₹'} {Number(renderSubTotalAmount()) + 50}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.btnText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardContainer: {
    marginHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cardSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  cartList: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    borderRadius: 15,
  },
  countContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  buttonContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitBtn: {
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    padding: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'red',
  },
  button: {
    padding: 6,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'red',
    color: 'white',
    fontSize: 16,
  },
  buttonText: {
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'red',
    paddingVertical: 12,
    color: 'white',
    fontSize: 16,
  },
  amountText: {
    fontSize: 12,
    color: 'black',
  },
});
