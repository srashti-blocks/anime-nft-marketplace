// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App


import { useState } from "react";
import { ethers } from "ethers";
import contractData from "./AnimeNFT.json";
import "./App.css";

const CONTRACT_ADDRESS = "0x7372AE92618b8320561FDa9B2D367257F45F2bDa";
const CONTRACT_ABI = contractData.abi;

const characters = [
  { name: "Yuji Itadori", image: "/src/assets/images/yuji.png" },
  { name: "Megumi Fushiguro", image: "/src/assets/images/megumi.png" },
  { name: "Nobara Kugisaki", image: "/src/assets/images/nobara.png" },
  { name: "Satoru Gojo", image: "/src/assets/images/gojo.png" },
  { name: "Sukuna", image: "/src/assets/images/sukuna.png" },
  { name: "Todo Aoi", image: "/src/assets/images/todo.png" },
];

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [minting, setMinting] = useState(null);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const nftContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    setWalletAddress(await signer.getAddress());
    setContract(nftContract);
  }

  async function mintCharacter(index, name) {
    if (!contract) {
      alert("Connect your wallet first");
      return;
    }
    setMinting(index);
    try {
      const tempURI = `ipfs://placeholder-${index}`;
      const tx = await contract.mint(tempURI);
      await tx.wait();
      alert(`${name} minted!`);
    } catch (err) {
      console.error(err);
      alert("Mint failed: " + (err.reason || err.message));
    } finally {
      setMinting(null);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>JJK Anime NFT Collection</h1>
        <button onClick={connectWallet}>Connect Wallet</button>
        {walletAddress && <p>Connected: {walletAddress}</p>}
      </header>

      <main className="gallery">
        {characters.map((char, index) => (
          <div className="card" key={char.name}>
            <img src={char.image} alt={char.name} />
            <h3>{char.name}</h3>
            <button onClick={() => mintCharacter(index, char.name)} disabled={minting === index}>
              {minting === index ? "Minting..." : "Mint"}
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;