var EventEmitter = require('events').EventEmitter;

function Keypad (options) {

  this.index(options.keys);

  this.rows = options.rows;
  this.cols = options.cols;

  this._scan = options.scan || 'row';
  this._poll = options.poll || false;

  this.start();
}


Keypad.prototype = {

  __proto__: EventEmitter.prototype,

  index: function( layout ) {
    this.layout = layout;
    this.keys = {};
    layout.forEach(function(row){
      row.forEach(function(key){
        this.keys[key] = false;
      }, this)
    }, this)
  },

  reset: function() {
    this.index(this.layout);
  },

  poll: function( ms ) {
    this._poll = ms;
    clearInterval(this.pollID);
    this.start();
  },

  scan: function ( type ) {
    this._scan = type;
  },

  stop: function() {
    clearInterval(this.pollID);
    this.emit('stop');
  },

  start: function() {
    if(!this._poll) return;

    var self = this;

    this.pollID = setInterval(function(){
      self.getPressed();
    }, this._poll);

  },

  isPressed: function( key, col ){

    this.getPressed();

    if(!isNaN(key)) return this.keys[ this.layout[key][col] ];

    var keys = keys.split(' ');
    var matches = 0;

    keys.forEach(function(key){
      if(this.keys[key]) matches++;
    }, this);

    return (matches === keys.length);

  },

  getPressed: function() {
    var pressed = [];

    if(this._scan === 'row' || this._scan === 'both') {
      pressed = this.scanByRow();
    }

    if(this._scan === 'col' || this._scan === 'both') {
      this.scanByCol().forEach(function(key){
        if(pressed.indexOf(key) === -1) pressed.push(key);
      })
    }

    this.process(pressed);

    return pressed;

  },

  process: function( keys ) {

    Object.keys(this.keys).forEach(function(key){
      if(this.keys[key] && keys.indexOf(key) === -1) this.update(key, false);
    }, this);

    keys.forEach(function(key){
      if(!this.keys[key]) this.update(key, true);
    }, this);

  },

  update: function(key, type) {
    this.emit('change', key, type);
    this.emit(type ? 'keydown' : 'keyup', key);
    this.keys[key] = type;
  },

  scanByRow: function() {
    var m = [];

    this.rows.forEach(function(pin){
      pin.high();
    });

    this.cols.forEach(function(colpin, ci){
       colpin.output(0);

       this.rows.forEach(function(rowpin, ri){
         if(!rowpin.read()) m.push(this.layout[ri][ci]);
       }, this);

       colpin.high();
    }, this);

    return m;
  },

  scanByCol: function() {
    var m = [];

    this.cols.forEach(function(pin){
      pin.high();
    });

    this.rows.forEach(function(rowpin, ri){
       rowpin.output(0);

       this.cols.forEach(function(colpin, ci){
         if(!colpin.read()) m.push(this.layout[ri][ci]);
       }, this);

       rowpin.high();
    }, this);

    return m;
  }

}


module.exports = Keypad;
