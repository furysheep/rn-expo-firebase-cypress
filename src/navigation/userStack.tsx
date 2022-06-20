import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "@rneui/themed";
import CreateFarm from "../screens/farms/CreateFarm";
import FarmList from "../screens/farms/FarmList";

const Stack = createStackNavigator();

const UserStack = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="FarmList"
        component={FarmList}
        options={({ navigation }) => ({
          title: "Farms",
          headerRight: () => (
            <Button
              testID="addButton"
              onPress={() => navigation.navigate("CreateFarm")}
              title="Add"
              style={{ marginRight: 20, padding: 10 }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CreateFarm"
        component={CreateFarm}
        options={{ title: "Create Farm" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default UserStack;
