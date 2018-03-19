import * as React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

import realLifeExamples from "./realLifeExamples";
import simpleExamples from "./simpleExamples";

interface State {
  activeExample: any;
}

export default class App extends React.Component<undefined, State> {
  constructor(props) {
    super(props);
    this.state = {
      activeExample: undefined,
    };
  }

  private onExamplePress = (item, type) => {
    this.setState({
      activeExample: type[item],
    });
  };

  private renderExampleRow = (item, type) => {
    return (
      <TouchableOpacity
        key={item}
        onPress={() => this.onExamplePress(item, type)}
      >
        <View style={[styles.row, styles.sectionRow]}>
          <Text style={styles.sectionTitle}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  private onBack = () => {
    this.setState({activeExample: undefined});
  };

  private renderExample() {
    const {activeExample} = this.state;
    const Element = activeExample;

    return <Element />;
  }

  public render() {
    const {activeExample} = this.state;

    return (
      <React.Fragment>
        <View
          style={[styles.header, Platform.OS === "ios" && styles.headeriOS]}
        >
          {activeExample && (
            <TouchableOpacity onPress={this.onBack}>
              <Image
                style={styles.backIcon}
                source={require("../img/icon-back.png")}
              />
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle} numberOfLines={1}>
            React Native Interactions
          </Text>
        </View>
        {!activeExample && (
          <ScrollView style={styles.container}>
            <View style={[styles.row, styles.sectionHeader]}>
              <Text style={styles.sectionHeadline}>Simple Examples</Text>
            </View>
            {Object.keys(simpleExamples).map(item =>
              this.renderExampleRow(item, simpleExamples)
            )}

            <View style={[styles.row, styles.sectionHeader]}>
              <Text style={styles.sectionHeadline}>Real life Examples</Text>
            </View>
            {Object.keys(realLifeExamples).map(item =>
              this.renderExampleRow(item, realLifeExamples)
            )}
          </ScrollView>
        )}

        {activeExample && this.renderExample()}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  sectionHeadline: {
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionRow: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  sectionTitle: {
    fontSize: 14,
  },
  header: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    backgroundColor: "lightgrey",
    alignItems: "center",
    flexDirection: "row",
  },
  headeriOS: {
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  backIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  exampleContainer: {
    flex: 1,
  },
});
