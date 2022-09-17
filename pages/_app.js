import '../styles/globals.css'
import Link from 'next/link'
import { useEffect, useState } from "react";
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import Router from 'next/router'

function MyApp({ Component, pageProps }) {
  const adminsArr = [0x5FF97A06cb8FFbdc48eED225a32408feeC76625a, 0x563925491A8B3100c329d05292c059A84165dFB7];
  const [address, setAddress] = useState()
  const [exitOption, setExit] = useState(false);

  useEffect(() => {
    const ad = JSON.stringify(window.localStorage.getItem('address'));
    setAddress(JSON.parse(ad));
  }, []);

  useEffect(() => {
    if(address?.length)
      window.localStorage.setItem('address', address);
  }, [address]);

  useEffect(() => {
    if(exitOption){
      window.localStorage.setItem('address', "undefined");
      Router.reload(window.location.pathname)
    }
  }, [exitOption])

  function checkAdmin(user){
    for(let i = 0; i < adminsArr.length; i++){
    if(user!==undefined && user.toString() == adminsArr[i])
      return true;
    }
    return false;
  };
  
  async function load(){
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    setAddress( await signer.getAddress());
  }
  
  function exit(){
    setExit(true)
  }

  return (
    <div>
      { address!=="undefined"? (
        <div>
          {address}
        <nav className="border-b p-6">
          <p className="text-4xl font-bold">Metaverse Marketplace</p>
          {checkAdmin(address)? (
            <div className="flex mt-4">
            <Link href="/">
              <a className="mr-4 text-pink-500">
                Home
              </a>
            </Link>
            <Link href="/my-assets">
              <a className="mr-6 text-pink-500">
                My Digital Assets
              </a>
            </Link>
            <Link href="/create-item">
              <a className="mr-4 text-pink-500">
                Create asset
              </a>
            </Link>
          </div>
          ):(
            <div className="flex mt-4">
            <Link href="/">
              <a className="mr-4 text-pink-500">
                Home
              </a>
            </Link>
            <Link href="/my-assets">
              <a className="mr-6 text-pink-500">
                My Digital Assets
              </a>
            </Link>
          </div>
          )}
          <button onClick={() => setExit(true)}>EXIT</button>
        </nav>
        <Component {...pageProps} />
      </div>
      ):(
        <button
        className="px-4 py-2 rounded-md bg-purple-600 cursor-pointer hover:bg-purple-500 text-xl font-semibold duration-100 text-white"
        onClick={()=>load()}
      >
        Connect Wallet
      </button>
    )}
    
    </div>
  )
}

export default MyApp
