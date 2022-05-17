import React from "react";
import { View } from "react-native";
import { Content } from "native-base";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Body } from "native-base";
import { ListItem } from "native-base";
import { Thumbnail } from "native-base";
import { Text } from "native-base";
import { Left } from "native-base";
var { width } = Dimensions.get("window");

const SearchedTreatments = (props) => {
  const { treatmentsFiltered } = props;

  return (
    <Content style={{ width: width }}>
      {treatmentsFiltered.length > 0 ? (
        treatmentsFiltered.map((item) => (
          <ListItem
            onPress={() => {
              props.navigation.navigate("Treatment Detail", { item: item });
            }}
            key={item._id.$oid}
            avatar
          >
            <Left>
              <Thumbnail
                source={{
                  uri: item.image
                    ? item.image
                    : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.description}</Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});

export default SearchedTreatments;
