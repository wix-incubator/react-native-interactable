import {StyleSheet, Dimensions} from "react-native";

const Screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "white",
  },
  filterContainer: {
    backgroundColor: "#278485",
    paddingTop: 10,
  },
  filterTop: {
    height: 36,
  },
  filterUp: {
    marginLeft: 24,
    width: 26,
    height: 26,
  },
  filterField: {
    height: 40,
    backgroundColor: "#3a969a",
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 4,
    justifyContent: "center",
  },
  filterFieldText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 30,
  },
  content: {
    padding: 20,
    backgroundColor: "white",
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#de6d77",
    alignItems: "center",
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  photo: {
    width: Screen.width - 40,
    height: 190,
    marginBottom: 20,
  },
});

export default styles;
