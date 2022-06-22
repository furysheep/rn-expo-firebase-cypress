import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import { Button } from "@rneui/themed";
import { signOut, getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { UserContext } from "../../contexts/userContext";
import Farm from "./Farm";
import { FarmProps } from "./types";

const EmptyListComponent = () => (
  <View style={styles.emptyListStyle}>
    <Text style={styles.emptyMessageStyle}>No Farms</Text>
  </View>
);

const FarmList = () => {
  const auth = getAuth();
  const { uid } = useContext(UserContext);
  const [farms, setFarms] = useState<FarmProps[]>([]);

  useEffect(() => {
    const q = query(collection(db, "farms"), where("uid", "==", uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newFarms = snapshot.docs.map((doc) => doc.data() as FarmProps);
      setFarms(newFarms);
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        accessibilityLabel="farms"
        data={farms}
        renderItem={({ item }: { item: FarmProps }) => (
          <Farm key={item.imgId} farm={item} />
        )}
        ListEmptyComponent={farms.length === 0 && <EmptyListComponent />}
      />
      <Button
        testID="signout"
        title="Sign Out"
        style={styles.button}
        onPress={() => signOut(auth)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  button: {
    marginTop: 10,
  },
  emptyListStyle: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
  },
  emptyMessageStyle: {
    textAlign: "center",
  },
});

export default FarmList;
