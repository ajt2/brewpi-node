var BrewPiInterface = function(options) {

  this.brewPi = options.brewPi;

  this.create();
};

BrewPiInterface.prototype.create = function() {

  this.brewPi.on('ardTemp', function(tempData) {

  });

  this.brewPi.on('ardDebug', function(debugData) {

  });

  this.brewPi.on('ardLCD', function(lcdData) {

  });

  this.brewPi.on('ardCC', function(ccData) {

  });

  this.brewPi.on('ardCS', function(csData) {
    var dataObj = convertArduinoOutput(csData);
    this.settings.controlSettings = dataObj;
    console.log(dataObj);

    this.emit('controlSettingsUpdated');
  });

  this.brewPi.on('ardCV', function(cvData) {

  });

  this.brewPi.on('ardInvalid', function(invalidData) {

  });

};

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
