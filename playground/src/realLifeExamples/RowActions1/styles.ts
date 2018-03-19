import {StyleSheet, Dimensions} from "react-native";
const Screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  rowContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eeeeee",
  },
  rowIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#73d4e3",
    margin: 20,
  },
  rowTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  rowSubtitle: {
    fontSize: 18,
    color: "gray",
  },
  button: {
    width: 75,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    width: 40,
    height: 40,
  },
  playground: {
    marginTop: Screen.height <= 500 ? 0 : 80,
    padding: 20,
    width: Screen.width - 40,
    backgroundColor: "#5894f3",
    alignItems: "stretch",
    alignSelf: "center",
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
