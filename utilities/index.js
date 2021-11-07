//Res errors wrapper
exports.errorResponseHandler = ( error ) => {
    const errors = [];
    if(error.message.indexOf("11000") != -1)
    {
        errors.push('Email address is already taken')
    }
    for (const i in error.errors){
        errors.push(error.errors[i].message);
    }    
    return errors;
}
//Res validation errors wrapper
exports.errorValidationHandler = ( error ) => {
    const errors = [];    
    for (const i in error.errors){
        errors.push(error.errors[i].msg);
    }
    return errors
}