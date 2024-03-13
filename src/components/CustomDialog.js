import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';

export const CustomDialog = ({ visible, onClose, onDelete }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure you want to delete?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  deleteButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Todos;
