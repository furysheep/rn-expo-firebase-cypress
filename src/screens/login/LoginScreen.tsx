import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "@rneui/themed";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import * as yup from "yup";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const SignInScreen = () => {
  const auth = getAuth();

  async function signIn(value: any) {
    if (value.email === "" || value.password === "") {
      alert("Email or Password is Empty");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      alert("Email or Password is incorrect,Please try again");
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(value) => signIn(value)}
        validationSchema={loginValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.controls}>
            <Input
              testID="email"
              autoCompleteType="email"
              placeholder="email@address.com"
              containerStyle={styles.control}
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              leftIcon={<Icon name="envelope" size={16} />}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Input
              testID="password"
              autoCompleteType={"password"}
              placeholder="Password"
              containerStyle={styles.control}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry={true}
              leftIcon={<Icon name="key" size={16} />}
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Button
              testID="login"
              title="Sign in"
              buttonStyle={styles.control}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "white",
    justifyContent: "center",
  },
  controls: {
    flex: 1,
  },
  control: {
    marginTop: 10,
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
});

export default SignInScreen;
