const http = require("http-status-codes");
const { erc20 } = require("@openzeppelin/wizard");
const solc = require("solc");
const fs = require("fs");
const path = require("path");

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

async function CreateAndCompile(req, res ,next ) {
  try {
    const formData = req.body;
    // console.log(req.body, "reqbody");
    if (!req.body) throw "Body Cannot Be Empty";
    const contract = erc20.print({
      name: req.body.tokenName,
      symbol: req.body.tokenSymbol,
      burnable: req.body.burnable,
      mintable: req.body.mintable,
      premint: req.body.initialSupply.toString(),
      access: req.body.accessType,
      pausable: req.body.pausable,
      recoverable: req.body.recoverable,
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
    const contractFile = tempFile.contracts["NewToken.sol"][req.body.tokenName];
    //   console.log(contractFile,"contractFilee ");
    const contractData = {
      abi: contractFile.abi,
      bytecode: contractFile.evm.bytecode.object,
    };

    res.send({
      message: "Contract Compile Successfully ",
      statusCode: 201,
      result: contractData,
    });
  } catch (error) {
    console.log(error, "errrr");
    next(error)
  }
}
