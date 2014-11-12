
## Tessel Matrix Keypad

This library will allow your Tessel to read any matrix type keypad.

### About Matrix Keyboards

![Matrix Keypad Diagram](http://s2.electrodragon.com/wp-content/uploads/2012/01/keypad_diagram.jpg)

You can purchase such keypads [here](http://www.electrodragon.com/product/4x4-matrix-16-key-membrane-switch-keypad-keyboard-new-for-arduinoavrpicarm/#prettyPhoto), [here](http://www.amazon.com/Universial-Switch-Keypad-Keyboard-Arduino/dp/B008A30NW4) or [here](http://www.vetco.net/catalog/product_info.php?products_id=14280&gclid=CK3bvoev9MECFXELMgodEncA1w).

A really good write up on [how key matrices work](http://pcbheaven.com/wikipages/How_Key_Matrices_Works/)

The [arduino matrix keypad how-to](http://playground.arduino.cc/Main/KeypadTutorial) provides inspiration for this library.

### Install

```bash
  npm install tessel-matrix-keypad --save
```

### Usage

```js

  var tessel = require('tessel')
    , Keypad = require('tessel-matrix-keypad');
    , gpio = tessel.port['GPIO'].pin //shortcut for referencing Tessel pins
    , modD = tessel.port['D'].pin;

  var keypad = new Keypad({
    keys: [
      ['1', '2', '3', 'A'],
      ['4', '5', '6', 'B'],
      ['7', '8', '9', 'C'],
      ['*', '0', '#', 'D']]
  , rows: [gpio.G1, gpio.G2, gpio.G3, gpio.G4]
  , cols: [gpio.G5, gpio.G6, modD.G1, modD.G2]
  , scan: 'row' // 'col' or 'both'
  , poll: false // number sets for auto polling (integer)
  });

  keypad.on('change', function(key, val){

  });

  keypad.on('keydown', function(key){

  });

  keypad.on('keyup', function(key){

  });

```

### Create keypad instance

```js

var Keypad = require('tessel-matrix-keypad');

var keypad = new Keypad(options);

```

#### Options

* `keys`:  array of keys by row ex: [[1,2,3],[4,5,6],[7,8,9]] __required__
* `rows`:  array of digital pins on tessel associated with rows __required__
* `cols`:  array of digital pins on tessel associated with cols __required__
* `scan`:  direction to scan the keys __default__: `row`
  * `row`: row pins are pulled high to correspond with columns.
  * `col`: column pins are pulled high to correspond with row pins.
  * `both`: both rows and column are scanned. This helps to solve for ghosting with multiple keys. It is also slower.
* `poll`: how often to poll for key updates in ms. Relative to last poll. __default: `false`


### API methods

#### isPressed(key), isPressed(row, col)

Checks to see if key(s) are pressed. Valid argument is a string separated by spaces.

Returns a boolean.

```js
  keypad.isPressed('1 4 A');
```

In the example above the key `1`, `4` and `A` must be pressed to be true.

Alternative usage:

```js
  keypad.isPressed(0,0);
```

Check to see if the key at row 0, col 0 is pressed.

#### getPressed

returns an array of keys that are currently pressed.

#### stop

Stops polling the keypad for events.

#### start

Starts polling the keypad.

#### index(layout)

Index the keys. Allows for reassignment of the keys on a keypad instance. This will reset all key states to false.

### reset

Reset the all key states to false. Uses the existing key layout.

#### poll(ms)

Allows changing the polling of the keyboard.

#### scan(type)

Changes how the matrix is scanned. See options for valid arguments (`row`, `col`, `both`)


### Events

#### `keydown`

Emitted when a key is pressed and was previously not pressed. The key value is passed to the listener.

#### `keyup`

Emitted when a key that was pressed in a prior polling is no longer pressed. The key value is passed to the listener.

#### `change`

Anytime a key state changes `change` is emitted with two arguments.

* `key`: the key that has changed state.
* `type`: a boolean indicating the new state. `true` = pressed, `false` = notpressed

#### `stop`

When polling is stopped this is emitted.


### License

The MIT License (MIT)

Copyright (c) 2014 Nathan White

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
