const joi = require("joi")

newContractValidation = joi.object({
    tokenName : joi.string().min(3).required(),
    tokenSymbol : joi.string().min(3).required(),
    initialSupply : joi.number().min(1).required(),
    accessType : joi.string().required(),
    pausable : joi.bool().required(),
    burnable : joi.bool().required(),
    mintable : joi.bool().required(),
    recoverable : joi.bool().required(),
})

module.exports = {newContractValidation}
 