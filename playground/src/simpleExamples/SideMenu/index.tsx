import * as React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Button,
  Dimensions,
} from "react-native";
import Interactable from "react-native-interactable";

import styles, {SideMenuWidth, RemainingWidth} from "./styles";

export default class SideMenu extends React.PureComponent {
  private menuInstanceRef: any;

  private onMenuPress = () => {
    this.menuInstanceRef.setVelocity({x: 2000});
  };

  private onClosePress = () => {
    this.menuInstanceRef.setVelocity({x: -2000});
  };

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.sideMenuContainer} pointerEvents="box-none">
          <Interactable.View
            ref={ref => (this.menuInstanceRef = ref)}
            horizontalOnly={true}
            snapPoints={[{x: 0}, {x: -SideMenuWidth}]}
            boundaries={{right: RemainingWidth / 2}}
            initialPosition={{x: -SideMenuWidth}}
          >
            <View style={styles.sideMenu}>
              <Text style={styles.sideMenuTitle}>Menu</Text>
              <Button
                title="Button 1"
                onPress={() => alert("Button 1 pressed")}
              />
              <Button
                title="Button 2"
                onPress={() => alert("Button 2 pressed")}
              />
              <Button
                title="Button 3"
                onPress={() => alert("Button 3 pressed")}
              />
              <Button title="Close" onPress={this.onClosePress} />
            </View>
          </Interactable.View>
        </View>

        <View style={styles.header}>
          <TouchableOpacity onPress={this.onMenuPress}>
            <Image
              style={styles.menuIcon}
              source={require("../../../img/icon-menu.png")}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Side Menu Example</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.content}>Some Content Here</Text>
        </View>
      </View>
    );
  }
}
