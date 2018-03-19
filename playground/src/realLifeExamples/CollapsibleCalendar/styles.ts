import {StyleSheet, Dimensions} from "react-native";

const Screen = Dimensions.get("window");

export const Calendar = {
  width: Screen.width - 16,
  height: (Screen.width - 16) / 944 * 793,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  top: {
    backgroundColor: "white",
    width: Screen.width,
    alignItems: "center",
    zIndex: 1000,
  },
  header: {
    marginTop: 15,
    height: 40,
    width: Screen.width,
    paddingLeft: 20,
  },
  month: {
    position: "absolute",
    left: 20,
    color: "#e33534",
    fontSize: 24,
    fontWeight: "bold",
  },
  days: {
    width: Screen.width - 16,
    height: (Screen.width - 16) / 944 * 65,
  },
  calendar: {
    width: Calendar.width,
    height: Calendar.height,
  },
  content: {
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    width: Screen.width,
    borderBottomWidth: 1,
    borderColor: "#eeeeee",
    height: 80,
    alignItems: "center",
  },
  hour: {
    width: 80,
    textAlign: "center",
    color: "#b0b0b0",
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    flex: 1,
    fontSize: 24,
  },
});

export default styles;
