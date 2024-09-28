import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';

// Import the smart contract address and the chain ID from environment variables
const contractAddress ="0x8096C7B7B7583C46b7bB823F00d1373140e330d7";
const chainId ="11155111";

// Example ABI (replace with your actual contract's ABI)
const contractAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "staffAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "EntryRecorded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "staffAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "ExitRecorded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "staffAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "StaffAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_staffAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "addStaff",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_staffAddress",
        "type": "address"
      }
    ],
    "name": "getAttendance",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "recordEntry",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "recordExit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "staffList",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Function to connect to the smart contract
export const connectToContract = async () => {
  // Wait for MetaMask to inject its provider
  if (!(window as any).ethereum) {
    alert('Please install MetaMask to interact with the blockchain');
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    await provider.send("eth_requestAccounts", []); // Request account access
    const signer = provider.getSigner();

    // Initialize the SDK with the signer
    const sdk = ThirdwebSDK.fromSigner(signer, chainId); 

    // Ensure contractAddress is defined
    if (!contractAddress) {
      throw new Error("Contract address is not defined. Please check your environment variables.");
    }

    // Fetch the contract using the ABI and contract address
    const contract = await sdk.getContractFromAbi(contractAddress as string, contractAbi);

    return contract;
  } catch (error) {
    console.error("Failed to connect to contract:", error);
    throw error; // Re-throw error for further handling
  }
};
