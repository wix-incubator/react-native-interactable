# Props Reference

## `Interactable.View` Props

#### `snapPoints` (array of points)

```jsx
snapPoints={[{x: 0}, {x: -200}]}
```

A list of points the view will snap to after being dragged by the user. To implement a a drawer for example, provide 2 points - one for the open state and one for the closed state. Points are relative to the view's center (after initial layout). Every element in the array is an object with the following properties:

* `x` - The horizontal position (relative to the center). Optional if a single dimension is needed.
* `y` - The vertical position (relative to the center). Optional if a single dimension is needed.
* `damping` - Amount of damping on the spring connected to this point. Default is `0.7`.
* `tension` - Tension of the spring connected to this point. Default is `300`.
* `id` - An optional string name for the point to identify it in the `onSnap` event.

Examples for [chat heads](https://github.com/wix/react-native-interactable/blob/b72eff0649b48dd50548593e5ecfe4c42b026a02/example/src/ChatHeads.js#L10), [drawer](https://github.com/wix/react-native-interactable/blob/b72eff0649b48dd50548593e5ecfe4c42b026a02/example/src/IconDrawer.js#L62) and [swipeable card](https://github.com/wix/react-native-interactable/blob/b72eff0649b48dd50548593e5ecfe4c42b026a02/example/src/SwipeableCard.js#L25).

#### `springPoints` (array of points)

```jsx
springPoints={[{x: 0, tension: 6000, damping: 0.5, influenceArea: {left: 0}}]}
```

Connect the view's center to a group of constant springs. Every element in the array is an object with the following properties:

* `x` - The horizontal anchor position of the spring (relative to the center). Default is `0.0`.
* `y` - The vertical anchor position of the spring (relative to the center). Default is `0.0`.
* `tension` - Tension of the spring. Default is `300`.
* `damping` - Amount of damping on the spring. Default is `0.0`.
* `influenceArea` - Limit the spring influence to a specific area. Optional. An object with the following properties:
  * `left` - The minimum horizontal influence point (relative to the center). Optional.
  * `right` - The maximum horizontal influence point (relative to the center). Optional.
  * `top` - The minimum vertical influence point (relative to the center). Optional.
  * `bottom` - The maximum vertical influence point (relative to the center). Optional.  
* `haptics` - Whether to enable haptic feedback on springs with influence area. Default `false`.

Note: For the springs to affect the view while dragging, make sure dragging is performed via a spring using the `dragWithSpring` prop.

#### `gravityPoints` (array of points)

```jsx
gravityPoints={[{x: 0, y: 0, strength: 8000, falloff: 40, damping: 0.5}]}
```

Attract/repel the view's center with a group of constant gravity wells. Every element in the array is an object with the following properties:

* `x` - The horizontal position of the well (relative to the center). Default is `0.0`.
* `y` - The vertical position of the well (relative to the center). Default is `0.0`.
* `strength` - Strength of the field (positive attracts, negative repels). Default is `400`.
* `falloff` - Distance of decay for the field strength. Default is `40`.
* `damping` - Amount of damping on the field strength. Default is `0.0`.
* `influenceArea` - Limit the field influence to a specific area. Optional. An object with the following properties:
  * `left` - The minimum horizontal influence point (relative to the center). Optional.
  * `right` - The maximum horizontal influence point (relative to the center). Optional.
  * `top` - The minimum vertical influence point (relative to the center). Optional.
  * `bottom` - The maximum vertical influence point (relative to the center). Optional.  
* `haptics` - Whether to enable haptic feedback on fields with influence area. Default `false`.

Note: For the gravity to affect the view while dragging, make sure dragging is performed via a spring using the `dragWithSpring` prop.

#### `frictionAreas` (array of areas)

```jsx
frictionAreas={[{damping: 0.5, influenceArea: {top: 0}}]}
```

Add friction to the view's movement with a group of friction regions. Every element in the array is an object with the following properties:

* `damping` - Amount of friction (`0.0`-`1.0`). Default is `0.0`.
* `influenceArea` - Limit the friction influence to a specific area. Optional. An object with the following properties:
  * `left` - The minimum horizontal influence point (relative to the center). Optional.
  * `right` - The maximum horizontal influence point (relative to the center). Optional.
  * `top` - The minimum vertical influence point (relative to the center). Optional.
  * `bottom` - The maximum vertical influence point (relative to the center). Optional.  
* `haptics` - Whether to enable haptic feedback on regions with influence area. Default `false`.

Note: For the friction to affect the view while dragging, make sure dragging is performed via a spring using the `dragWithSpring` prop.

#### `alertAreas` (array of areas)

```jsx
alertAreas={[{id: 'myArea', influenceArea: {top: 0}}]}
```

Send alert event when the view's center enters/leaves any region within the group. Every element in the array is an object with the following properties:

* `id` - A required string name for the area to identify it in the `onAlert` event.
* `influenceArea` - Limit the alert to a specific area. Optional. An object with the following properties:
  * `left` - The minimum horizontal alert point (relative to the center). Optional.
  * `right` - The maximum horizontal alert point (relative to the center). Optional.
  * `top` - The minimum vertical alert point (relative to the center). Optional.
  * `bottom` - The maximum vertical alert point (relative to the center). Optional.  

#### `horizontalOnly` (boolean)

```jsx
horizontalOnly={true}
```

Optional, whether the view should be locked to horizontal movement only. Default `false`.

#### `startOnFront` (boolean) **[Android Only]**

```jsx
startOnFront
```

Optional, whether the view should call `view.bringToFront()` when the view is first loaded.
*Usually using zIndex does the trick. Use this in cases it doesn't*

#### `verticalOnly` (boolean)

```jsx
verticalOnly={true}
```

Optional, whether the view should be locked to vertical movement only. Default `false`.

#### `boundaries` (object)

```jsx
boundaries={{left: -100, right: 100, bounce: 0.5}}
```

Optional, an object providing limits to movement relative to the view's center (after initial layout). Contains following properties:

* `left` - The minimum horizontal position (relative to the center). Optional.
* `right` - The maximum horizontal position (relative to the center). Optional.
* `top` - The minimum vertical position (relative to the center). Optional.
* `bottom` - The maximum vertical position (relative to the center). Optional.
* `bounce` - The amount of bounce when hitting the limit (`0.0`-`1.0`). Optional.
* `haptics` - Whether to enable haptic feedback on bounce. Default `false`.

#### `onSnap` (function)

```jsx
onSnap={this.onDrawerSnap}
```

Optional, a function called whenever the view finishes snapping to a `snapPoints` point (after being dragged). Example for [drawer](https://github.com/wix/react-native-interactable/blob/b72eff0649b48dd50548593e5ecfe4c42b026a02/example/src/IconDrawer.js#L63). When the function is called, an event object is passed as argument, containing the following properties:

* `index` - The zero-based index of the point in the `snapPoints` array.
* `id` - The string `id` of the point in the `snapPoints` array (assuming it was provided).

#### `onSnapStart` (function)

```jsx
onSnapStart={this.onDrawerSnapStart}
```

Optional, a function called whenever the view starts snapping to a `snapPoints` point (after being dragged). When the function is called, an event object is passed as argument, containing the following properties:

* `index` - The zero-based index of the point in the `snapPoints` array.
* `id` - The string `id` of the point in the `snapPoints` array (assuming it was provided).

#### `onStop` (function)

```jsx
onStop={this.onStopInteraction}
```

Optional, a function called whenever the interaction stops (views freeze momentarily). When the function is called, an event object is passed as argument, containing the following properties:

* `x` - The horizontal position of the view (relative to the center).
* `y` - The vertical position of the view (relative to the center).

#### `onDrag` (function)

```jsx
onDrag={this.onDragEvent}
```

Optional, a function called whenever the user starts or stops dragging the view. When the function is called, an event object is passed as argument, containing the following properties:

* `state` - `start` or `end`, whether the user started or finished dragging.
* `x` - The horizontal position of the view (relative to the center).
* `y` - The vertical position of the view (relative to the center).
* `targetSnapPointId` - For `end` state, the string `id` of the target point in the `snapPoints` array (assuming it was provided).

#### `onAlert` (function)

```jsx
onAlert={this.onAlertEvent}
```

Optional, a function called whenever the view's center enters/leaves an alert area (see `alertAreas`). When the function is called, an event object is passed as argument, containing the following properties:

* key: `id` - The string name of the area that was entered/left.
* value: `enter` or `leave` (depending if entering or leaving the area).

#### `dragEnabled` (boolean)

```jsx
dragEnabled={true}
```

Optional, whether the user can drag the view or not. Default `true`.

#### `dragWithSpring` (object)

```jsx
dragWithSpring={{tension: 2000, damping: 0.5}}
```

Optional, specify in order to make dragging behavior of the view occur using a spring. If not given, drag will be done using a pinned anchor point. Contains following properties:

* `tension` - Tension of the spring.
* `damping` - Amount of damping on the spring used for dragging. Optional.

#### `dragToss` (number)

```jsx
dragToss={0.1}
```

Time in seconds the view is allowed to be tossed before snapping to a point. Default is `0.1`.

#### `animatedValueX` (Animated.Value)

```jsx
animatedValueX={this._deltaX}
```

[`Animated.Value`](https://facebook.github.io/react-native/docs/animated.html#animatedvalue) that will contain the delta from the center as the view moves (x axis). See [this](README.md#animating-other-views-according-to-interactableview-position) for more details on how to animate other views according to the movement of this view.

#### `animatedValueY` (Animated.Value)

```jsx
animatedValueY={this._deltaY}
```

[`Animated.Value`](https://facebook.github.io/react-native/docs/animated.html#animatedvalue) that will contain the delta from the center as the view moves (y axis). See [this](README.md#animating-other-views-according-to-interactableview-position) for more details on how to animate other views according to the movement of this view.

#### `animatedNativeDriver` (boolean)

```jsx
animatedNativeDriver={false}
```

Whether integration with [Animated](https://facebook.github.io/react-native/docs/animated.html) should use native driver. Default `false` since Animated native driver is still a bit experimental. Try it out as eventually the quirks will be resolved and then we'll have a 100% native driver end to end with 60 FPS on derived animations as well.

#### `initialPosition` (point)

```jsx
initialPosition={{x: -140, y: -280}}
```

Optional, used to initialize the view's position to a position different than it's original center. This is mostly useful when you want to provide `snapPoints` points relative to the center calculated by React Native layout, but want the view itself to start from a different position. See [chat heads](https://github.com/wix/react-native-interactable/blob/b72eff0649b48dd50548593e5ecfe4c42b026a02/example/src/ChatHeads.js#L22) example.
