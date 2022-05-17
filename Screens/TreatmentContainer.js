import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";

import { Container } from "native-base";
import { Header } from "native-base";
import { Icon } from "native-base";
import { Item } from "native-base";
import { Input } from "native-base";
import { Text } from "native-base";
import TreatmentList from "./TreatmentList";
import SearchedTreatments from "./SearchedTreatments";
import Banner from "./Banner";
import CategoryFilter from "./CategoryFilter";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import baseUrl from "../assets/common/baseUrl";

var { height } = Dimensions.get("window");

const TreatmentContainer = (props) => {
  const [treatment, setTreatments] = useState([]);
  const [treatmentsFiltered, setTreatmentsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [tretmentsCtg, setTreatmentsCtg] = useState([]);

  useEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // Products
      axios
        .get(`${baseURL}treatments`)
        .then((res) => {
          setTreatments(res.data);
          setTreatmentsFiltered(res.data);
          setTreatmentsCtg(res.data);
          setInitialState(res.data);
        })
        .catch((error) => {
          console.log("Api call error");
        });

      // Categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("Api call error");
        });

      return () => {
        setTreatments([]);
        setTreatmentsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  useEffect(() => {
    setTreatments(data); ///
    setTreatmentsFiltered(data);
    setFocus(false);
    setCategories(categories);
    setActive(-1);
    setInitialState(data);
    setTreatmentsCtg(data);
    return () => {
      setTreatments([]);
      setTreatmentsFiltered([]);
      setFocus();
      setCategories([]);
      active();
      initialState();
    };
  }, []);

  const searchTreatment = (text) => {
    setTreatmentsFiltered(
      treatment.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setTreatmentsCtg(initialState), setActive(true)]
        : [
            setTreatmentsCtg(
              treatments.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };
  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onFocus={openList}
            onChangeText={(text) => searchTreatment(text)}
          />
          {focus == true ? <icon onPress={onBlur} name="ios-close" /> : null}
        </Item>
      </Header>

      {focus == true ? (
        <SearchedTreatments
          navigation={props.navigation}
          treatmentsFiltered={setTreatmentsFiltered}
        />
      ) : (
        <ScrollView>
          <View>
            <View>
              <Banner />
            </View>
            <View>
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                tretmentsCtg={tretmentsCtg}
                active={active}
                setActive={setActive}
              />
            </View>
            {tretmentsCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {tretmentsCtg.map((item) => {
                  return (
                    <TreatmentList
                      navigation={props.navigation}
                      key={item.name}
                      item={item}
                    />
                  );
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: "40%" }]}>
                <Text>No treatments found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TreatmentContainer;
