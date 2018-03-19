import {StyleSheet, Dimensions} from "react-native";

const Screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefef",
  },
  card: {
    width: Screen.width - 40,
    backgroundColor: "white",
    borderRadius: 6,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#7f7f7f",
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 4,
  },
  image: {
    width: Screen.width - 40,
    height: Screen.height <= 500 ? 70 : 150,
  },
  header: {
    marginTop: 8,
    marginLeft: 20,
    height: 22,
    fontSize: 12,
    color: "#7b7b7b",
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 15,
  },
  body: {
    marginBottom: 20,
    fontSize: 15,
    marginLeft: 15,
    color: "#7f7f7f",
  },
  playground: {
    marginTop: Screen.height <= 500 ? 10 : 40,
    padding: 20,
    width: Screen.width - 40,
    backgroundColor: "#5894f3",
    alignItems: "stretch",
  },
  playgroundLabel: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
  },
  slider: {
    height: 40,
  },
});

export default styles;
