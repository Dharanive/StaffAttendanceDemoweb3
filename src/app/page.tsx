'use client';

import { useEffect, useState } from 'react';
import { connectToContract } from './client';
import { ethers } from 'ethers';

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [staffName, setStaffName] = useState('');
  const [staffAddress, setStaffAddress] = useState('');
  const [staffAttendance, setStaffAttendance] = useState<any>(null);

  // Connect to MetaMask and Smart Contract
  useEffect(() => {
    async function connectWallet() {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
        setConnected(true);

        const contractInstance = await connectToContract();
        setContract(contractInstance);
      }
    }

    connectWallet();
  }, []);

  // Add a new staff member
  const addStaff = async () => {
    if (contract && account) {
      try {
        const tx = await contract.call('addStaff', staffAddress, staffName);
        await tx.wait();
        alert('Staff added successfully');
      } catch (error) {
        console.error('Failed to add staff:', error);
      }
    }
  };

  // Record entry for the staff member
  const recordEntry = async () => {
    if (contract && account) {
      try {
        const tx = await contract.call('recordEntry');
        await tx.wait();
        alert('Entry recorded successfully');
      } catch (error) {
        console.error('Failed to record entry:', error);
      }
    }
  };

  // Record exit for the staff member
  const recordExit = async () => {
    if (contract && account) {
      try {
        const tx = await contract.call('recordExit');
        await tx.wait();
        alert('Exit recorded successfully');
      } catch (error) {
        console.error('Failed to record exit:', error);
      }
    }
  };

  // Get attendance of a staff member
  const getAttendance = async () => {
    if (contract && account) {
      try {
        const attendance = await contract.call('getAttendance', staffAddress);
        setStaffAttendance(attendance);
      } catch (error) {
        console.error('Failed to get attendance:', error);
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Staff Attendance Management</h1>

      {connected ? (
        <div>
          <p className="mt-4">Connected as: {account}</p>

          <div className="mt-6">
            <h2 className="text-xl font-bold">Add Staff</h2>
            <input
              className="border p-2 mt-2"
              type="text"
              placeholder="Staff Name"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
            />
            <input
              className="border p-2 mt-2"
              type="text"
              placeholder="Staff Address"
              value={staffAddress}
              onChange={(e) => setStaffAddress(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 mt-2"
              onClick={addStaff}
            >
              Add Staff
            </button>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold">Record Entry/Exit</h2>
            <button
              className="bg-green-500 text-white py-2 px-4 mt-2"
              onClick={recordEntry}
            >
              Record Entry
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 mt-2"
              onClick={recordExit}
            >
              Record Exit
            </button>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold">Get Attendance</h2>
            <input
              className="border p-2 mt-2"
              type="text"
              placeholder="Staff Address"
              value={staffAddress}
              onChange={(e) => setStaffAddress(e.target.value)}
            />
            <button
              className="bg-gray-500 text-white py-2 px-4 mt-2"
              onClick={getAttendance}
            >
              Get Attendance
            </button>
            {staffAttendance && (
              <div className="mt-4">
                <h3 className="font-bold">Attendance</h3>
                <p>Entry Times: {staffAttendance[0].join(', ')}</p>
                <p>Exit Times: {staffAttendance[1].join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
}
