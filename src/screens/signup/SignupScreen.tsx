import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import * as yup from "yup";

const signUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .min(6, ({ min }) => `Passowrd must be at least ${min} characters`)
    .required("Password is required"),
});

const SignUpScreen = (): React.ReactElement => {
  const auth = getAuth();

  const signUp = async (value: any) => {
    if (value.email === "" || value.password === "") {
      alert("Email or Password is Empty");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      alert("it has been already logged in");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(value) => signUp(value)}
        validationSchema={signUpValidationSchema}
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
              autoCompleteType={"email"}
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
              testID="submit"
              title="Sign up"
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
    marginHorizontal: 10,
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

export default SignUpScreen;
