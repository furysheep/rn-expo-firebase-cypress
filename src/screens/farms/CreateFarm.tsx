import React, { useState, useContext, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Input, Button, Text, Image, Dialog } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import {
  setDoc,
  doc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as yup from "yup";
import { Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../config/firebase";
import { UserContext } from "../../contexts/userContext";
import Loader from "../../components/Loader";

const farmValidationSchema = yup.object().shape({
  displayName: yup.string().required("Display name is required"),
  name: yup
    .string()
    .required("Farm name is required")
    .test(
      "checkDuplicatedName",
      "Farm name is already taken",
      async (value) => {
        return new Promise((resolve) => {
          if (!value) resolve(false);
          const q = query(collection(db, "farms"), where("name", "==", value));
          getDocs(q).then((querySnapshot) => {
            if (querySnapshot.docs.length > 0) {
              resolve(false);
            }
            resolve(true);
          });
        });
      }
    ),
  phoneNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Enter a valid phone number"
    )
    .optional(),
});

const CreateFarm = ({ navigation }): React.ReactElement => {
  const { uid } = useContext(UserContext);

  const [imgUri, setImgUri] = useState("");
  const [loading, setLoading] = useState(false);

  //TODO: Validate the imageID separately
  //      as long as it couldn't be included in Formik
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.canAskAgain || permission.status === "denied") {
      const granted = false;
    }
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImgUri(result.uri);
    }
  };
  const uploadImage = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const fileRef = ref(storage, uuidv4());
    const result = await uploadBytes(fileRef, blob);
    return result.metadata.fullPath;
  };

  const uploadToFirestore = async (value: any) => {
    setLoading(true);
    try {
      const requestBody = { ...value, uid };
      if (!!imgUri) {
        const imgId = await uploadImage(imgUri);
        requestBody.imgId = imgId;
      }
      const docId = requestBody.name;
      delete requestBody.name;
      await setDoc(doc(db, "farms", docId), requestBody);
      navigation.navigate("FarmList");
    } catch {
      Alert.alert("Error while talking to firebase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Loader isLoading={loading} />
      <Formik
        enableReinitialize
        initialValues={{
          displayName: "",
          name: "",
          phoneNumber: "",
          hours: "",
        }}
        validationSchema={farmValidationSchema}
        onSubmit={(value) => uploadToFirestore(value)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <Input
              testID="displayName"
              placeholder="Display Name (Required)"
              containerStyle={styles.control}
              value={values.displayName}
              onChangeText={handleChange("displayName")}
              onBlur={handleBlur("displayName")}
              leftIcon={<Icon name="user" size={16} />}
            />
            {errors.displayName && touched.displayName && (
              <Text style={styles.errorText}>{errors.displayName}</Text>
            )}
            <Input
              testID="name"
              placeholder="Name (Required)"
              containerStyle={styles.control}
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              leftIcon={<Icon name="users" size={16} />}
            />
            {errors.name && touched.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
            <Input
              testID="phoneNumber"
              placeholder="Phone (Optional)"
              containerStyle={styles.control}
              value={values.phoneNumber}
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              leftIcon={<Icon name="tablet" size={16} />}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
            <Input
              testID="hours"
              placeholder="Hours (Optional)"
              containerStyle={styles.control}
              value={values.hours}
              onChangeText={handleChange("hours")}
              onBlur={handleBlur("hours")}
            />
            {errors.hours && touched.hours && (
              <Text style={styles.errorText}>{errors.hours}</Text>
            )}
            <View style={styles.imageContainer}>
              {!!imgUri && (
                <Image source={{ uri: imgUri }} style={styles.image} />
              )}
              <Button
                testID="uploadimg"
                title="Choose Image"
                buttonStyle={styles.control}
                onPress={pickImage}
              />
            </View>
            <Button
              testID="submit"
              title="Submit"
              buttonStyle={styles.submit}
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
    padding: 20,
    backgroundColor: "white",
    justifyContent: "center",
  },
  errorText: {
    color: "red",
  },
  control: {
    marginTop: 10,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  submit: {
    width: 200,
    alignSelf: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default CreateFarm;
