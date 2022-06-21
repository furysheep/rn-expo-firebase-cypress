import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Asset, useAssets } from "expo-asset";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { FarmProps } from "./types";
import { Avatar, ListItem } from "@rneui/themed";

const Farm = ({ farm }: { farm: FarmProps }) => {
  const [uri, setUri] = useState("");
  const [assets, error] = useAssets([
    require("../../assets/no-image-icon.png"),
  ]);

  useEffect(() => {
    if (!farm.imgId) return;
    const fileRef = ref(getStorage(), farm.imgId);
    getDownloadURL(fileRef).then(setUri);
  }, [farm]);

  return (
    <ListItem bottomDivider>
      <Avatar source={uri ? { uri } : assets?.[0] || {}} size={80} />
      <ListItem.Content>
        <ListItem.Title testID="displayName_list">
          {farm.displayName}
        </ListItem.Title>
        <ListItem.Subtitle>{`${farm.phoneNumber} ${farm.hours}`}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  titles: {
    fontSize: 32,
  },
});

export default Farm;
