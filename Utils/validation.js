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
    tokenType : joi.string().required(),
    decimals: joi.number().min(1).required(),
    supplyType:joi.string(),
    maximumSupply:joi.number(),
    conforms:joi.bool(),
    verified:joi.bool(),
    noCopyrightLink:joi.bool(),
    network:joi.string(),
    agreement:joi.bool(),
    commissionFee:joi.any,


})

module.exports = {newContractValidation}
 