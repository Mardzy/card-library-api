type GenericObjectType = { [key: string]: string | number };
export const lowercaseKeys = (obj: GenericObjectType) => {
    return Object.keys(obj).reduce((acc: GenericObjectType, key) => {
        if (key.includes("#'d")) {
            acc['serial_numbered'] = obj[key];
        } else {
            const formattedKey = key.split(' ').join('_').toLowerCase();

            acc[formattedKey] = obj[key];
        }

        return acc;
    }, {});
};
