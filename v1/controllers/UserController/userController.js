const http = require("http-status-codes");
const { erc20 } = require("@openzeppelin/wizard");
const solc = require("solc");
const fs = require("fs");
const path = require("path");
const { newContractValidation } = require("../../../Utils/validation");
const { error_Object } = require("../../../Utils/hepler");

exports.getdata = getdata;
exports.CreateAndCompile = CreateAndCompile;

async function getdata(req, res) {
  res.send("hello user");
}

function findImports(relativePath) {
  //my imported sources are stored under the node_modules folder!
  const absolutePath = path.resolve(
    __dirname,
    "../../../node_modules",
    relativePath
  );
  const source = fs.readFileSync(absolutePath, "utf8");
  // console.log(source,"findimport  side");
  return { contents: source };
}

async function CreateAndCompile(req, res, next) {
  try {
    const formData = req.body;
    console.log(formData, "reqbody");
    const tokenName = formData.tokenName.trim().split(" ")
    console.log(tokenName,"token name slice");

    const tname1 = tokenName[0].charAt(0).toUpperCase() + tokenName[0].slice(1)
    const tname2 = tokenName[1].charAt(0).toUpperCase() + tokenName[1].slice(1)
    console.log(tname1,tname2,"tname1 and tname2");
    const finalTokenName = tname1+tname2
    console.log(finalTokenName,"final token name");
    // const finalTokenName =
    // tokenName.charAt(0).toUpperCase() + tokenName.slice(1);
    // Object.assign(formData, { tokenName: finalTokenName });
    // console.log(formData, "formdtata after capital");
    // console.log(finalTokenName,"final token");
    const options = {
      errors: {
        wrap: {
          label: ''
        }
      }
    };

    const { error, value } = newContractValidation.validate(formData,options);
    // console.log(error.message,"joi validation errors");
    if (error)
      throw new error_Object(
        error.message,
        http.StatusCodes.UNPROCESSABLE_ENTITY,
        error.context
      );

    const contract = erc20.print({
      name: formData.tokenName,
      symbol: formData.tokenSymbol,
      burnable: formData.burnable,
      mintable: formData.mintable,
      premint: formData.initialSupply.toString(),
      access: formData.accessType,
      pausable: formData.pausable,
      recoverable: formData.recoverable,
    });

    console.log(contract, "contractt");

    const input = {
      language: "Solidity",
      sources: {
        "NewToken.sol": {
          content: contract,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    };

    // console.log(input, "inputt");
    const tempFile = JSON.parse(
      solc.compile(JSON.stringify(input), { import: findImports })
    );

    // console.log(tempFile, "tempfilee");
    const contractFile = tempFile.contracts["NewToken.sol"][finalTokenName]
    // console.log(contractFile, "contractFilee ");

    // if (contractFile.abi && contractFile.evm.bytecode.object) {
    //   const contractData = {
    //     abi: contractFile.abi,
    //     bytecode: contractFile.evm.bytecode.object,
    //   };

      res.status(201).json({
        message: "Contract Compile Successfully ",
        statusCode: 201,
        result: contractFile,
      });
    // }else{
    //   throw new error_Object("Contract Compilation Failed ",http.StatusCodes.EXPECTATION_FAILED)
    // }
  } catch (error) {
    console.log(error, "errrr");
    // res.status(error.statusCode || 400).json({
    //   message: error.message ? error.message : error,
    //   statusCode: error.statusCode || 400,
    // });
    next(error)
  }
}
