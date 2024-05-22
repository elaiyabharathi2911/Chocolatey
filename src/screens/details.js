// import React, { useState } from 'react';
// import {
//   View,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from 'react-native';
// import IMAGES from '../asset/image';
// import TSIncrementDecrementButton from '../../Component/TSIncrementDecrementButton';

// const ProductDetails = ({navigation, route,index }) => {
//   const details = route?.params?.product;
//   const [totalCount, setTotalCount] = useState(0);
//   const [items, setItems] = useState([]);
//   const handleIncrement = (index) => {
//     let updatedItems = [...items];
//     const currentCount = updatedItems[index].count;
//     const totalQuantity = selectedItem[index]?.totalQuantity;

//     if (currentCount < totalQuantity) {
//       updatedItems[index].count = currentCount + 10; // Assuming increment by 5
//       setItems(updatedItems);

//       // Calculate the total count and update the state
//       const newTotalCount = calculateTotalCount(updatedItems);
//       setTotalCount(newTotalCount);
//     } else {
//       Toast.showMessage(strings.Cannot_increment_above_total_quantity);
//     }
//   };

//   const handleDecrement = (index) => {
//     let updatedItems = [...items];
//     if (updatedItems[index].count > 0) {
//       updatedItems[index].count = Number(updatedItems[index].count) - 1;
//       setItems(updatedItems);
//     }
//     // Calculate the total count and update the state
//     const newTotalCount = calculateTotalCount(updatedItems);
//     setTotalCount(newTotalCount);
//   };
//   const customHeader = () => {
//     return (
//       <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
//         <Image source={IMAGES.downloadIcon} style={{width: 100, height: 40}} />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {customHeader()}
//       <View style={styles.product}>
//         <View style={styles.imageBox}>
//           <Image source={IMAGES.download} style={styles.productImage} />
//         </View>

//         <Text style={styles.productName}>{details.name}</Text>
//         <Text style={styles.productPrice}>{'₹' + details.mrp?.mrp}</Text>
//         <View style={styles.button}>
//           <Text style={styles.buttonText}>View Details</Text>
//         </View>
//         <TouchableOpacity
//           style={[styles.button, styles.addButton]}
//           onPress={() => navigation.navigate('CartScreen')}>
//          <TSIncrementDecrementButton
//               add={"ADD"}
//               addButtonContainerColor={styles.addButtonContainer}
//               addButtonColor={styles.addButton}
//               addButtonTextColor={styles.addButtonText}
//               incrementDecrementContainerColor={
//                 styles.incrementDecrementContainer
//               }
//               incrementDecrementButtonColor={styles.incrementDecrementButton}
//               countTextColor={styles.countText}
//               count={items[index]?.count}
//               handleIncrement={handleIncrement}
//               handleDecrement={handleDecrement}
//               setTotalCount={setTotalCount}
//             />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ProductDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   product: {
//     flex: 1,
//     marginBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     alignItems: 'center',
//   },
//   productImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 5,
//   },
//   productPrice: {
//     fontSize: 16,
//     color: '#888',
//     marginBottom: 10,
//   },
//   button: {
//     padding: 10,
//     borderRadius: 5,
//     marginVertical: 5,
//     alignItems: 'center',
//     width: '80%',
//   },
//   addButton: {
//     backgroundColor: 'gray',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   imageBox: {
//     width: '90%',
//     height: '40%',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginVertical: 15,
//   },
//   addButtonContainer: {
//     backgroundColor: "red",
//     borderColor: "white",
//   },

//   addButton: {
//     backgroundColor: "red",
//     borderColor: "black",
//   },
//   addButtonText: {
//    fontSize:16,
//   },
//   incrementDecrementContainer: {
//     backgroundColor:"#fff",
//     borderColor:"red",
//     width: "90%",
//     marginLeft: 10,
//   },
//   incrementDecrementButton: {
//     backgroundColor: "#fff",
//     borderColor:"red",
//   },
//   countText: {

//       FontSize:16,
    
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import IMAGES from '../asset/image';
import TSIncrementDecrementButton from '../../Component/TSIncrementDecrementButton';
import { DispatchActionType, useAppBaseContext } from '../context/AppBaseContext';

const ProductDetails = ({ navigation, route }) => {
  const {state, dispatch} = useAppBaseContext();
  const details = route?.params?.product;
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
// console.log("Cart",details)
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    const newItem = {
      name: details?.name,
      price: details?.mrp?.mrp,
      count: count,
      id:details?.pId
    };
    setCart([...cart, newItem]);
    dispatch({
      type: DispatchActionType.cartData,
      cartData: [...state.cartData, newItem],
    });
    // Optionally navigate to CartScreen
    navigation.navigate('CartScreen', {
      cart: [...cart, newItem],
    });
  };

  // const customHeader = () => {
  //   return (
  //     <TouchableOpacity style={styles.customContainer} onPress={() => navigation.navigate('CartScreen')}>
  //       <Image source={IMAGES.trolley} style={{ width: 40, height: 40 }} />
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <View style={styles.container}>
      {/* {customHeader()} */}
      <View style={styles.product}>
        <View style={styles.imageBox}>
          <Image source={IMAGES.download} style={styles.productImage} />
        </View>
        <Text style={styles.productName}>{details?.name}</Text>
        <Text style={styles.productPrice}>{'₹' + details?.mrp?.mrp}</Text>
        <View style={styles.button}>
          <Text style={styles.buttonText}>View Details</Text>
        </View>
        <TSIncrementDecrementButton
          add="ADD"
          addButtonContainerColor={styles.addButtonContainer}
          addButtonColor={styles.addButton}
          addButtonTextColor={styles.addButtonText}
          incrementDecrementContainerColor={styles.incrementDecrementContainer}
          incrementDecrementButtonColor={styles.incrementDecrementButton}
          countTextColor={styles.countText}
          count={count}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={handleAddToCart}
        >
          <Image source={IMAGES.trolley} style={{width:30,height:30}}/>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  customContainer:{
    alignSelf: 'flex-end',
    margin: 10,
  },
  product: {
    flex: 1,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
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
    flexDirection:"row",
    justifyContent:"center"
  },
  addButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageBox: {
    width: '90%',
    height: '40%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 15,
  },
  addButtonContainer: {
    backgroundColor: 'red',
    borderColor: 'white',
  },
  addButton: {
    backgroundColor: 'red',
    borderColor: 'black',
  },
  addButtonText: {
    fontSize: 16,
    color:"#fff",
  },
  incrementDecrementContainer: {
    backgroundColor: 'red',
    borderColor: 'red',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
  //  marginLeft: 10,
  },
  incrementDecrementButton: {
    backgroundColor: 'red',
    borderColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    
  },
  countText: {
    fontSize: 16,
    marginHorizontal: 10,
    color:"#fff",
  },
});
