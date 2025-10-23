import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import * as z from "zod";
import { eq } from 'drizzle-orm';

import { useTheme } from '@/hooks/useTheme'
import { db } from '@/db/init'
import { tests } from '@/db/schema';

type GradeModalProps = {
  gradeModalVisible: boolean;
  setGradeModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  testID: number;
}

export default function GradeModal({ gradeModalVisible, setGradeModalVisible, testID }: GradeModalProps) {
  const theme = useTheme()
  const [grade, setGrade] = useState('')

  const gradeString = z
    .string()
    .regex(/^\d+(\.\d+)?$/, {
      message: "String must contain only positive numbers (integers or decimals)"
    })
    .nullable();

  async function handleConfirm() {
    if (gradeString.safeParse(grade).success) {
      await db.update(tests).set({ grade: Number(grade) }).where(eq(tests.id, testID))
    }
    else {
      console.log('invalid grade')
    }
    setGradeModalVisible(!gradeModalVisible)
    setTimeout(() => setGrade(''), 1000) // So the grade doesn't disappear before the modal
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={gradeModalVisible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        // setGradeModalVisible(!gradeModalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add grade</Text>
          <TextInput
            placeholder={'e.g. 85%'}
            // style={[styles.text, { color: invalid ? 'red' : theme.grey500 }]}
            // placeholderTextColor={theme.grey500}
            returnKeyType='done'
            // blurOnSubmit
            value={grade}
            onChangeText={setGrade}
            keyboardType='decimal-pad'
            maxLength={4}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleConfirm}>
            <Text style={styles.textStyle}>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})