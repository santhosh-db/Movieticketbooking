'use strict';

const USER_TYPE = {
	USER: 'user',
	ADMIN: 'admin',
    SUPERADMIN:'superadmin'
};
const STATUS = {
	ACTIVE: 'active',
	INACTIVE: 'inactive'
};
const OPTIONS = {
    basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true
    },
    array: {
        abortEarly: false,
        convert: true,
        allowUnknown: true,
        stripUnknown: {
            objects: true
        }
    }
};

module.exports = {
	USER_TYPE,
    STATUS,
    OPTIONS,
};