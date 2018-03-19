import {StyleSheet, Dimensions} from "react-native";

const Screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefef",
    width: Screen.width + 80,
    alignSelf: "center",
  },
  card: {
    width: Screen.width - 40,
    marginHorizontal: 20,
    borderColor: "white",
    borderWidth: 3,
  },
  image: {
    width: Screen.width - 40 - 6,
    height: Screen.width - 40 - 6,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    fontSize: 60,
    color: "white",
  },
  text: {
    textAlign: "center",
    marginTop: 4,
    fontSize: 18,
    fontWeight: "bold",
    color: "#aaaaaa",
  },
});

export default styles;
