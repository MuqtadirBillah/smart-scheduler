const utils = {
    handleError: (res, errorMsg, obj = {}) => {
        return res.send({
            success: false,
            status: "error",
            message: errorMsg ?? "Not Found!",
            ...obj,
        });
    },
    handleResponseWithStatus: (
        res,
        statusCode,
        success = true,
        errorMsg,
        obj = {}
    ) => {
        return res.status(statusCode).send({
            success: success,
            status: "error",
            message: errorMsg ?? "Not Found!",
            ...obj,
        });
    },
    generateErrorsMsg: (errors) => {
        if (utils.strictValidObjectWithKeys(errors)) {
            const { errors: errs, _message: message, name, ...rest } = errors;
            if (name === "CastError") {
                return {
                    message: `Invalid ${rest.path}: ${rest.value} ${rest.valueType === rest.kind ? "" : `required ${rest.kind}`
                        }`,
                };
            }
            if (name === "ValidationError") {
                let errors = {};
                Object.keys(errs).forEach((key) => {
                    if (errs[key].valueType)
                        errors[
                            key
                        ] = `Invalid ${errs[key].path}: ${errs[key].valueType} required ${errs[key].kind}`;
                    else errors[key] = errs[key].message;
                });
                return { errors };
            }
            if (utils.strictValidObjectWithKeys(errs)) {
                const errors = Object.keys(errs).map((key) => {
                    return { ...errs[key]?.properties };
                });
                return { errors, message };
            }
            return { message };
        }
    },
    strictValidObject: (obj) => {
        return (
            obj &&
            obj === Object(obj) &&
            Object.prototype.toString.call(obj) !== "[object Array]"
        );
    },
    strictValidObjectWithKeys: (obj) => {
        return utils.strictValidObject(obj) && !!Object.keys(obj).length;
    },
    strictValidArray: (arr) => arr && Array.isArray(arr),

    strictValidArrayWithMinLength: (arr, minLength) =>
        utils.strictValidArray(arr) && arr.length >= minLength,
};

module.exports = utils;