export var lowercaseKeys = function (obj) {
    return Object.keys(obj).reduce(function (acc, key) {
        if (key.includes("#'d")) {
            acc['serial_numbered'] = obj[key];
        }
        else {
            var formattedKey = key.split(' ').join('_').toLowerCase();
            acc[formattedKey] = obj[key];
        }
        return acc;
    }, {});
};
