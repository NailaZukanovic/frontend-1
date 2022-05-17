import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Dimensions } from "react-native";
import TreatmentCard from "./TreatmentCard";

var { width } = Dimensions.get("window");

const TreatmentList = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity style={{ width: "50%" }}>
      <View style={{ width: width / 2, backgroundColor: "gainsboro" }}>
        <TreatmentCard {...item} />
      </View>
    </TouchableOpacity>
  );
};
export default TreatmentList;
