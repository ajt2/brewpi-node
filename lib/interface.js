var BrewPiInterface = function(options) {

  this.brewPi = options.brewPi;

  this.create();
};

BrewPiInterface.prototype.create = function() {
  var self = this;

  this.brewPi.on('ardTemp', function(tempData) {
    self.storeNewTemperatures(tempData);
  });

  this.brewPi.on('ardDebug', function(debugData) {
    // Hmmm
  });

  this.brewPi.on('ardLCD', function(lcdData) {
    self.updateLCD(lcdData);
  });

  this.brewPi.on('ardCC', function(ccData) {
    self.updateControlConstants(ccData);
  });

  this.brewPi.on('ardCS', function(csData) {
    self.updateControlSettings(csData);
  });

  this.brewPi.on('ardCV', function(cvData) {
    self.updateControlVariables(cvData);
  });

  this.brewPi.on('ardInvalid', function(invalidData) {
    console.log('Invalid data from Arduino: ', invalidData);
    this.emit('invalidArduinoData');
  });

};

/**
 * Update Temperature
 */

BrewPiInterface.prototype.storeNewTemperatures = function(temperatureData) {
  var dataObj = convertArduinoOutput(temperatureData);
  console.log('Temperature data: ', dataObj);

  // Do something with this
  this.brewPi.emit('newTemperatureData');
};

/**
 * Update LCD
 */

BrewPiInterface.prototype.updateLCD = function(lcdData) {
  var dataString = stripKey(lcdData);
  console.log('LCD data: ', dataString);

  // Do something with this

  this.brewPi.emit('newLCDData');
};

/**
 * Update Settings
 */

BrewPiInterface.prototype.updateControlConstants = function(controlConstants) {
  var dataObj = convertArduinoOutput(controlConstants);
  this.settings.controlConstants = dataObj;
  console.log(dataObj);

  this.brewPi.emit('controlConstantsUpdated');
};

BrewPiInterface.prototype.updateControlSettings = function(controlSettings) {
  var dataObj = convertArduinoOutput(controlSettings);
  this.settings.controlSettings = dataObj;
  console.log(dataObj);

  this.brewPi.emit('controlSettingsUpdated');
};

BrewPiInterface.prototype.updateControlVariables = function(controlVariables) {
  var dataObj = convertArduinoOutput(controlVariables);
  this.settings.controlVariables = dataObj;
  console.log(dataObj);

  this.brewPi.emit('controlVariablesUpdated');
};

/**
 * Arduino Data Utilities
 */

function stripKey(string) {
  return string.substring(2);
}

function convertArduinoOutput(rawData) {
  return JSON.parse(stripKey(rawData));
}

/**
 * Expose constructor.
 */

exports = module.exports = BrewPiInterface;
