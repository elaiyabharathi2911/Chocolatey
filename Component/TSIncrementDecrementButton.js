import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TSIncrementDecrementButton = ({
  add,
  addButtonColor,
  addButtonTextColor,
  incrementDecrementContainerColor,
  incrementDecrementButtonColor,
  countTextColor,
  count,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <View style={[styles.container, incrementDecrementContainerColor]}>
      {count === 0 ? (
        <TouchableOpacity
          style={[styles.addButton, addButtonColor]}
          onPress={handleIncrement}>
          <Text style={[styles.addButtonText, addButtonTextColor]}>{add}</Text>
        </TouchableOpacity>
      ) : (
        <View style={[styles.incrementDecrementContainer, incrementDecrementContainerColor]}>
          <TouchableOpacity
            style={[styles.button, incrementDecrementButtonColor]}
            onPress={handleDecrement}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.countText, countTextColor]}>{count}</Text>
          <TouchableOpacity
            style={[styles.button, incrementDecrementButtonColor,{justifyContent:"flex-end"}]}
            onPress={handleIncrement}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
    width:"27%",
    alignItems:"center",
    paddingVertical:14,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  incrementDecrementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: 'red',
  
    paddingHorizontal: 0,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  
  },
  buttonText: {
    fontSize: 20,
    color:"#fff",
  },
  countText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default TSIncrementDecrementButton;
 