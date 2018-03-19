import {StyleSheet, Dimensions} from "react-native";

export const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height - 75,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efefef",
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: Screen.height + 2,
    backgroundColor: "#182e43f0",
    padding: 15,
    paddingTop: 30,
    flexDirection: "column",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  contentImage: {
    width: Screen.width - 50,
    height: Screen.width - 50,
  },
  contentBody: {
    fontSize: 18,
    color: "gray",
    marginTop: 10,
  },
  panelHeader: {
    fontSize: 24,
    color: "white",
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 10,
    justifyContent: "flex-start",
  },
  panelFooterIos: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  panelFooterAndroid: {
    flex: 1,
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  panelFooterText: {
    fontSize: 13,
    color: "#ffffff80",
    marginBottom: 10,
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff80",
  },
  notificationContainer: {
    backgroundColor: "#b0cbdd",
    borderRadius: 14,
    marginBottom: 10,
  },
  notificationHeader: {
    height: 30,
    backgroundColor: "#c3d6e1",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingHorizontal: 20,
  },
  notificationTitle: {
    marginTop: 5,
    fontSize: 16,
    color: "#1c5675",
  },
  notificationBody: {
    marginVertical: 14,
    marginHorizontal: 20,
  },
});

export default styles;
