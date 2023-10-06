import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

const Profile = () => {
  const [firstName, setFirstName] = useState("farid");
  const [lastName, setLastName] = useState("bigham");

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>
        Good morning {"farid"} {"bigham"}!
      </Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.inputField}
      />
      <Button
        onPress={() => {}}
        title="Update account"
        color={"#6c47ff"}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default Profile;
