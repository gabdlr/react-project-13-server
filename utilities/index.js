//Res errors wrapper
exports.errorResponseHandler = ( error ) => {
    const errors = [];
    if(error.errors[0].nestedErrors) {
        for (const i in error.errors[0].nestedErrors){
            errors.push(error.errors[0].nestedErrors[i].msg);
        }
        return errors;
    }
    for (const i in error.errors){
        errors.push(error.errors[i].message);
    }    
    return errors;
}

//Res validation errors wrapper
exports.errorValidationHandler = ( error ) => {
    const errors = [];
    if(error.errors[0].nestedErrors) {
        for (const i in error.errors[0].nestedErrors){
            errors.push(error.errors[0].nestedErrors[i].msg);
        }
        return errors;
    }
    for (const i in error.errors){
        errors.push(error.errors[i].msg);
    }
    return errors
}