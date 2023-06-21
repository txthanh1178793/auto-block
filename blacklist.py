from web3 import Web3, HTTPProvider
import json
import time
import requests

from config  import ownerAddress, privateKey, tokenAddress, rpc, abi 

blocked=[]



w3 = Web3(HTTPProvider(rpc))
chain_id = w3.eth.chain_id
caller = w3.eth.account.from_key(privateKey).address
contract = w3.eth.contract(address= tokenAddress, abi=abi)
function_name = "blockBots"
function = getattr(contract.functions, function_name)

def blacklist_call(input_addresses):
    nonce = w3.eth.get_transaction_count(caller)
    gas = w3.eth.gas_price*2  
    function_detail = function(input_addresses).build_transaction({"chainId": chain_id, "from": caller, "nonce": nonce, "gasPrice": gas})
    signed_tx = w3.eth.account.sign_transaction(function_detail, private_key=privateKey)
    send_tx = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(send_tx)



while True:
    addresses = open("bot_list.txt","r").readlines()
    bot_list = []
    for address in addresses:
        address = address.replace("\n","")
        if ((address != "") & (address not in blocked)):
            bot_list.append(address)
    if (len(bot_list) > 0):
        try:
            print(bot_list)
            blacklist_call(bot_list)
            blocked += bot_list
        except:
            pass



