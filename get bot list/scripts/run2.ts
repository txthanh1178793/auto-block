import { base58 } from 'ethers/lib/utils';
import { ethers, hardhatArguments } from 'hardhat';
import { ownerAddress, tokenAddress } from '../config';
import { BigNumber } from 'ethers';
import { SpookyRabbit } from '../typechain-types';
const fs = require('fs');

let network = hardhatArguments.network;
async function blockBots(
    token: SpookyRabbit,
    pair: string,
    data: {
        from: string;
        to: string;
        value: string;
        eventData: any;
    }) {
    if ((data.from != ownerAddress) && (data.to != ownerAddress)) {
        if (data.from == pair) {
            // await token.blockBots([data.to]);
            // token.blockBots([data.to]);
            fs.appendFile('../bot_list.txt', data.to + "\n", function (err) {
                if (err) throw err;
                console.log('Error!', data.to);
            });
            console.log('Blocked: ', data.to);
        } else if (data.to == pair) {
            // await token.blockBots(data.from);
        } else { }

    }
}

async function run() {
    const abi = await ethers.getContractFactory("SpookyRabbit");
    const token = await abi.attach(tokenAddress);
    console.log('Token address: ', token.address);
    const uniswapV2Pair = await token.uniswapV2Pair();
    // console.log(uniswapV2Pair);
    token.on("Transfer", (from, to, value, event) => {
        let transferEvent = {
            from: from,
            to: to,
            value: value,
            eventData: event,
        }
        blockBots(token, uniswapV2Pair, transferEvent);
    })
}

run();