import {StyleSheet, Dimensions} from "react-native";

const Screen = Dimensions.get("window");
export const SideMenuWidth = 280;
export const RemainingWidth = Screen.width - SideMenuWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "white",
  },
  sideMenuContainer: {
    position: "absolute",
    top: 0,
    left: -RemainingWidth,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    zIndex: 1002,
  },
  sideMenu: {
    left: 0,
    width: Screen.width,
    paddingLeft: RemainingWidth,
    flex: 1,
    backgroundColor: "#aaa",
    paddingTop: 80,
  },
  sideMenuTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  header: {
    height: 60,
    paddingLeft: 20,
    flexDirection: "row",
    backgroundColor: "red",
    alignItems: "center",
    zIndex: 1001,
  },
  body: {
    flex: 1,
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  headerTitle: {
    marginLeft: 30,
    color: "white",
    fontSize: 20,
  },
  content: {
    fontSize: 18,
  },
});

export default styles;
