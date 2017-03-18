<img src="http://i.imgur.com/ErA2GQo.gif" width=200 />&nbsp;&nbsp;&nbsp;&nbsp;
<img src="http://i.imgur.com/pH6oB5D.gif" width=200 />&nbsp;&nbsp;&nbsp;&nbsp;
<img src="http://i.imgur.com/J5l2Qvq.gif" width=200 />&nbsp;&nbsp;&nbsp;&nbsp;
<img src="http://i.imgur.com/dWFYZBG.gif" width=200 />

# Interactable
> react-native-interactable

* [Installation](#installation)
* [Example](#example)
* [Usage](#usage)
* [Implementation Details](#implementation-details)


This is an experimental implementation of a declarative API for handling fluid user interactions with views at 60 FPS in React Native. Here are some example use-cases for views that users can interact with:

* **Swipeable card** (a la Google Now) springing into place unless swiped away with enough force
* **Drawer** snapping between closed and open with buttons appearing gradually as it's being dragged
* **Collapsible header** that snaps to a smaller size as the content below is being scrolled
* **Chat heads** (a la Facebook Messenger) that can be dragged around but snap to corners of the screen

All of these use-cases have views that continuously interact with the user's gestures. These interactions are normally physical in nature, having properties like springiness, friction, elasticity and damping. In order to feel natural on a touch device they need to run at 60 FPS.

### Why is this challenging?

The async nature of the React Native bridge incurs an inherent performance penalty. This traditionally prevents JavaScript code from running at high framerates. One of the most noticeable challenges is animations in JavaScript, which aren't guaranteed to run at 60 FPS.

Modern animation libraries for React Native, like [Animated](https://facebook.github.io/react-native/docs/animated.html), tackle this challenge with a declarative approach. In order to minimize passes over the bridge, animations are only declared in JavaScript but executed by a native driver on the other side - in 60 FPS.

Fluid user interactions take this a step further than animations. Interactions require UI to continuously react to the user's gestures. This library is designed to support complex physical interactions with ease, using a full-fledged physics engine to drive the interaction on the native side.

### Why is it named interactable?

First off, we are aware that *interactable* isn't a real word. The correct form is *interactive* but this has connotation that isn't necessarily related to physical interactions. Similar to `Animated.View`, we wanted to have `Interactable.View` - meaning a view you can interact with. And hey, [Unity](https://docs.unity3d.com/ScriptReference/UI.Selectable-interactable.html) did it too.


## Installation

* Install the package from npm

```
npm install react-native-interactable --save
```

* Link the native library to your project

```
react-native link react-native-interactable
```

Note: instead of linking automatically you can also link manually according to these [instructions](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#manual-linking)

```
node_modules/react-native-interactable/ios/Interactable.xcodeproj
```


## Example

To see the library in action you have several options:

* **Build and run the example project on your computer**
The [example](example) project has 4 use-cases implemented: *swipeable card*, *drawer*, *collapsible header* and *chat heads*. It's simplistic but easy to learn from.
*Note: It's recommended to experience it on a [real device](http://facebook.github.io/react-native/docs/running-on-device.html) and not on a simulator. The simulator has poor performance so the framerate isn't like the real thing.*

To run the example, clone the repo and run from the root folder:
```
  cd example
  npm install
  react-native run-ios
```

* **Install and run the demo app from the App Store/Google Play on your phone**
If you don't want to mess with building yourself, you can play with a pre-built demo on your phone.
Download from [Apple App Store (iOS)](https://itunes.apple.com/us/app/react-native-interactions/id1209875831?ls=1&mt=8)Download from [Google Play Store (Android)](https://play.google.com/store/apps/details?id=com.wix.interactions&hl=en)

<img src="http://i.imgur.com/VpSsavS.gif" width=200 />&nbsp;&nbsp;&nbsp;&nbsp;
<img src="http://i.imgur.com/O7ulJa1.gif" width=200 />&nbsp;&nbsp;&nbsp;&nbsp;
<img src="http://i.imgur.com/2mrUNIM.gif" width=200 />



* **Build and run the demo app on your computer**
The [demo app](real-life-example) contains more complex demonstrations than the [example](example) project. They're harder to learn from, but they're cool to watch. More info about the [UX inspirations](https://github.com/wix/react-native-interactable/blob/master/UX-INSPIRATIONS.md) for the demo app.
*Note: It's recommended to experience it on a [real device](http://facebook.github.io/react-native/docs/running-on-device.html) and not on a simulator. The simulator has poor performance so the framerate isn't like the real thing.*

To run the demo app, clone the repo and run from the root folder:
```
  cd real-life-example
  npm install
  react-native run-ios
```


## Usage

The core of this library is the `Interactable.View` component, used to wrap views you want to interact with:

```jsx
import Interactable from 'react-native-interactable';

<Interactable.View
  horizontalOnly={true}
  snapPoints={[{x: 0}, {x: -200}]}
  onSnap={this.onDrawerSnap}>

  // the view that you wrap here will now support interactions

</Interactable.View>
```

### `Interactable.View` Props

[Click here for the full reference for all props](https://github.com/wix/react-native-interactable/blob/master/PROPS.md)

* [`snapPoints`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#snappoints-array-of-points) - a list of points the view will snap to after being dragged by the user

```jsx
snapPoints={[{x: 0}, {x: -200}]}
```

* [`springPoints`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#springpoints-array-of-points) - connect the view's center to a group of constant springs

```jsx
springPoints={[{x: 0, tension: 6000, damping: 0.5, influenceArea: {left: 0}}]}
```

* [`gravityPoints`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#gravitypoints-array-of-points) - attract/repel the view's center with a group of constant gravity wells

```jsx
gravityPoints={[{x: 0, y: 0, strength: 8000, falloff: 40, damping: 0.5}]}
```

* [`frictionAreas`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#frictionareas-array-of-areas) - add friction to the view's movement with a group of friction regions

```jsx
frictionAreas={[{damping: 0.5, influenceArea: {top: 0}}]}
```

* [`horizontalOnly`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#horizontalonly-boolean) - whether the view should be locked to horizontal movement only

```jsx
horizontalOnly={true}
```

* [`verticalOnly`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#verticalonly-boolean) - whether the view should be locked to vertical movement only

```jsx
verticalOnly={true}
```

* [`boundaries`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#boundaries-object) - limits to movement relative to the view's center (after initial layout)

```jsx
boundaries={{left: -100, right: 100, bounce: 0.5}}
```

* [`onSnap`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#onsnap-function) - a function called whenever the view snaps to a `snapPoints` point (after dragging)

```jsx
onSnap={this.onDrawerSnap}
```

* [`onStop`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#onstop-function) - a function called whenever the interaction stops (views freeze momentarily)

```jsx
onStop={this.onStopInteraction}
```

* [`dragWithSpring`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#dragwithspring-object) - specify to make dragging behavior of the view occur using a spring

```jsx
dragWithSpring={{tension: 2000, damping: 0.5}}
```

* [`dragToss`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#dragtoss-number) - time in seconds the view is allowed to be tossed before snapping to a point

```jsx
dragToss={0.1}
```

* [`animatedValueX`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#animatedvaluex-animatedvalue) - [`Animated.Value`](https://facebook.github.io/react-native/docs/animated.html#animatedvalue) that will contain the delta from the center as the view moves (x axis)

```jsx
animatedValueX={this._deltaX}
```

* [`animatedValueY`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#animatedvaluey-animatedvalue) - [`Animated.Value`](https://facebook.github.io/react-native/docs/animated.html#animatedvalue) that will contain the delta from the center as the view moves (y axis)

```jsx
animatedValueY={this._deltaY}
```

* [`animatedNativeDriver`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#animatednativedriver-boolean) - whether integration with [Animated](https://facebook.github.io/react-native/docs/animated.html) should use native driver

```jsx
animatedNativeDriver={false}
```

* [`initialPosition`](https://github.com/wix/react-native-interactable/blob/master/PROPS.md#initialposition-point) - used to initialize the view's position to a position different than it's original center

```jsx
initialPosition={{x: -140, y: -280}}
```

## Animating other views according to `Interactable.View` position

This library is integrated with the [Animated](https://facebook.github.io/react-native/docs/animated.html) library in order to support performant animations of other views according to the movement of the `Interactable.View`.

Consider the following use-cases:

* Buttons that appear using a fade & scale animation under a drawer as it's being dragged ([example](https://github.com/wix/react-native-interactable/blob/b72eff0649b48dd50548593e5ecfe4c42b026a02/example/src/IconDrawer.js#L44))
* Image in a collapsible header that scales as it's snapped between states ([example](https://github.com/wix/react-native-interactable/blob/b72eff0649b48dd50548593e5ecfe4c42b026a02/example/src/CollapsingHeader.js#L15))

In these use-cases, we have views different from the one the user is interacting with, that animate according to the interactive view's position. Since [Animated](https://facebook.github.io/react-native/docs/animated.html) library uses [`Animated.Value`](https://facebook.github.io/react-native/docs/animated.html#animatedvalue) to animate view properties, we support setting the value of an `Animated.Value` instance according to position of the interactable view. The `Animated.Value` will contain the delta between the `Interactable.View` original center and new center. This can be done separately on the X axis and Y axis.

After setting this up, use [Animated](https://facebook.github.io/react-native/docs/animated.html) to declaratively define [interpolations](https://facebook.github.io/react-native/docs/animated.html#interpolate) of the `Animated.Value` to various animatable view properties like opacity, scale, rotation, translateX and translateY:

```jsx
this._deltaY = new Animated.Value(0);

<Animated.View style={{
  transform: [{
    scale: this._deltaY.interpolate({
      inputRange: [-150, -150, 0, 0],
      outputRange: [0.3, 0.3, 1, 1]
    })
  }]
}}>
  ...
</Animated.View>

<Interactable.View
  verticalOnly={true}
  snapPoints={[{y: 0}, {y: -150}]}
  animatedValueY={this._deltaY}
>
  ...
</Interactable.View>
```



## Implementation Details

Originally, the iOS implementation relied on [UIKit Dynamics](https://developer.apple.com/reference/uikit/uidynamicanimator) - a powerful native animation engine for physical interactions. A physics engine is required in order to make the interaction life-like. Consider the action of tossing a view connected via a spring to a snap point. A simple native [spring animation](https://developer.apple.com/reference/uikit/uiview/1622594-animatewithduration) will not be enough to take the initial velocity vector into account.

At some point, UIKit Dynamics was dropped in favor of a home-brewed physics implementation in order to provide more control over the behaviors. This also paved the way for the Android port since there's no parallel to UIKit Dynamics for Android. The home-brewed physics engine was straightforward to port from Objective-C to Java and is now part of this library.

## Contributing

If you are interested in the project, have feedback or want to contribute don't hesitate to contact me. I'm particularly interested in ideas on how to expand the declarative API for more use-cases and suggestions on how to improve performance. PRs are always welcome.

## License

MIT
