import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const CustomInput = ({ placeholder, onChangeText, value, secureTextEntry }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.focused]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#FF8303",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: "100%", // Ensure the container takes up full width
    color: 'white', // Background color
  },
  focused: {
    borderColor: "#A35709",
  },
  input: {
    fontSize: 16,
    color: '#FF8303',
    width: 250, // Ensure the input takes up full width
  },
});

export default CustomInput;
