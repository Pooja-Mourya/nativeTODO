import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import CustomInput from './CustomInput';

export const CustomUpdate = ({ visible, onClose, onSubmit, titleValue, aboutValue }) => {
  const [updatedTitle, setUpdatedTitle] = React.useState(titleValue || '');
  const [updatedAbout, setUpdatedAbout] = React.useState(aboutValue || '');

  const handleSubmit = () => {
    onSubmit(updatedTitle, updatedAbout);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Update Todo</Text>
          <CustomInput
            style={styles.input}
            placeholder="Title"
            value={updatedTitle}
            onChangeText={setUpdatedTitle}
          />
          <CustomInput
            style={styles.input}
            placeholder="About"
            value={updatedAbout}
            onChangeText={setUpdatedAbout}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSubmit} style={styles.updateButton}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
