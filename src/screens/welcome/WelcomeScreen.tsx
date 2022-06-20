import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/themed";

const WelcomeScreen = ({ navigation }): React.ReactElement => (
  <View style={styles.container}>
    <Text>Welcome screen!</Text>
    <View style={styles.buttons}>
      <Button
        testID="signin"
        title="Sign in"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        testID="signup"
        title="Sign up"
        type="outline"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate("SignUp")}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  buttons: {
    flex: 1,
  },

  button: {
    marginTop: 10,
  },
});

export default WelcomeScreen;
