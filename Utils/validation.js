const joi = require("joi")

newContractValidation = joi.object({
    tokenName : joi.string().min(3).required(),
    tokenSymbol : joi.string().min(2).required(),
    initialSupply : joi.number(),
    accessType : joi.string().required(),
    pausable : joi.bool().required(),
    burnable : joi.bool().required(),
    mintable : joi.bool().required(),
    recoverable : joi.bool().required(),
    tokenType : joi.string(),
    decimals: joi.number().min(6).max(21).required(),
    supplyType:joi.string(),
    maximumSupply:joi.number(),
    conforms:joi.bool(),
    verified:joi.bool(),
    noCopyrightLink:joi.bool(),
    network:joi.any(),
    agreement:joi.bool(),
    commissionFee:joi.any(),


})

module.exports = {newContractValidation}
 