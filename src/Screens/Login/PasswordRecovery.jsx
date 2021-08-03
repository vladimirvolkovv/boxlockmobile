import React, { useRef, useState } from "react";
import { TouchableOpacity, Text, TextInput, View, StyleSheet, Alert } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import firebase from "../../Helpers/firebase";

export default App = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current).then(setVerificationId);
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        console.log(result);
        alert("Успешно!");
      });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View>
        <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebase.app().options} />
        <TextInput placeholder="Номер телефона" onChangeText={setPhoneNumber} keyboardType="phone-pad" autoCompleteType="tel" style={styles.textInput} />
        <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
          <Text style={styles.buttonText}>Отправить смс</Text>
        </TouchableOpacity>
        <TextInput placeholder="Код подтверждения" onChangeText={setCode} keyboardType="number-pad" style={styles.textInput} />
        <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontSize: 24,
    borderBottomColor: "#7f8c8d33",
    borderBottomWidth: 2,
    marginBottom: 10,
    textAlign: "center",
  },
  sendVerification: {
    padding: 20,
    backgroundColor: "#3498db",
    borderRadius: 10,
  },
  sendCode: {
    padding: 20,
    backgroundColor: "#9b59b6",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
  },
});
