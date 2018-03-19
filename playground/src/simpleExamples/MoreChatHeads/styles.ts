import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    color: "blue",
    fontSize: 24,
    marginBottom: 24,
  },
  markerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  marker: {
    width: 50,
    height: 50,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#dddddd",
    position: "relative",
  },
  head: {
    width: 70,
    height: 70,
    backgroundColor: "red",
    borderRadius: 35,
  },
});

export default styles;
