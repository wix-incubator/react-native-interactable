import * as React from "react";
import {View, Dimensions, Image, Text, Platform} from "react-native";
import Interactable from "react-native-interactable";

import styles, {Screen} from "./styles";

interface NotificationProps {
  title: string;
  body: string;
}
class Notification extends React.PureComponent<NotificationProps> {
  public render() {
    return (
      <View style={styles.notificationContainer}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{this.props.title}</Text>
        </View>
        <Text style={styles.notificationBody}>{this.props.body}</Text>
      </View>
    );
  }
}

export default class NotifPanel extends React.PureComponent {
  public render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.contentTitle}>Content Title</Text>
          <Image
            style={styles.contentImage}
            source={require("../../../img/tinder-photo.jpg")}
          />
          <Text style={styles.contentBody}>This is the content body</Text>
        </View>

        <View style={styles.panelContainer}>
          <Interactable.View
            verticalOnly={true}
            snapPoints={[
              {y: 0, tension: 0, damping: 1},
              {y: -Screen.height + 80},
            ]}
            gravityPoints={[
              {
                y: 0,
                strength: 220,
                falloff: Screen.height * 8,
                damping: 0.7,
                influenceArea: {top: (-Screen.height + 80) * 0.5},
              },
            ]}
            initialPosition={{y: -Screen.height + 80}}
            boundaries={{
              top: -Screen.height,
              bottom: 0,
              bounce: 2,
              haptics: true,
            }}
          >
            <View style={styles.panel}>
              <Text style={styles.panelHeader}>Today</Text>
              <Notification
                title="First Notification"
                body="This is the body of the first notification"
              />
              <Notification
                title="Second Notification"
                body="This is the body of the 2nd notification"
              />
              <Notification
                title="Third Notification"
                body="This is the body of the 3rd notification"
              />
              {Screen.height <= 500 - 75 ? (
                false
              ) : (
                <View>
                  <Text style={styles.panelHeader}>Yesterday</Text>
                  <Notification
                    title="Fourth Notification"
                    body="This is the body of the 4th notification"
                  />
                </View>
              )}
              <View
                style={
                  Platform.OS === "android"
                    ? styles.panelFooterAndroid
                    : styles.panelFooterIos
                }
              >
                <Text style={styles.panelFooterText}>4 NOTIFICATIONS</Text>
                <View style={styles.panelHandle} />
              </View>
            </View>
          </Interactable.View>
        </View>
      </View>
    );
  }
}
