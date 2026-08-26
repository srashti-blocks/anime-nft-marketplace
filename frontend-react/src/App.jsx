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
import { useEffect } from "react";

const CONTRACT_ADDRESS = "0x7372AE92618b8320561FDa9B2D367257F45F2bDa";
const CONTRACT_ABI = contractData.abi;


import yujiItadori from "./assets/images/yuji_itadori.png";
import megumiFushiguro from "./assets/images/megumi_Fushiguro.png";
import nobaraKugisaki from "./assets/images/nobara_kugisaki.png";
import satoruGojo from "./assets/images/Satoru_gojo.png";
import sukuna from "./assets/images/Sukuna.png";
import todoAoi from "./assets/images/Todo_aoi.png";

const characters = [
  { name: "Yuji Itadori", image: yujiItadori, metadataURI: "ipfs://bafkreifym2u2han27c6ggbrbd4473wnti5pedxvv7jqy7qp4am7lvw7kka", },
  { name: "Megumi Fushiguro", image: megumiFushiguro , metadataURI: "ipfs://bafkreie53lgkx27xedngzmobpwnyn7sxr7vapzhjrbw3mtkylkpw6vrzp4",},
  { name: "Nobara Kugisaki", image: nobaraKugisaki, metadataURI: "ipfs://bafkreiduwwbq2wwtzfjbnjfn23naodnijq5on4si5og3zewx2qpkvhxtnm", },
  { name: "Satoru Gojo", image: satoruGojo ,metadataURI: "ipfs://bafkreidaqmgvhemct372naobeaz355ncflwu2jpkztnggb6v7hhndic44q",},
  { name: "Sukuna", image: sukuna, metadataURI: "ipfs://bafkreiae5uxfkyoduirs5xeljodl5ewornls4quz2qg7jf2alol7uhh7y4",},
  { name: "Todo Aoi", image: todoAoi , metadataURI: "ipfs://bafkreicvkvykc4agqgre5si4xk6qhclilimdaohesrhemjah6o5ecap644",},
];

// const characters = [
//   { name: "Yuji Itadori", image: "/src/assets/images/yuji_itadori.png" },
//   { name: "Megumi Fushiguro", image: "/src/assets/images/megumi_Fushiguro.png" },
//   { name: "Nobara Kugisaki", image: "/src/assets/images/nobara_kugisaki.png" },
//   { name: "Satoru Gojo", image: "/src/assets/images/Satoru_gojo.png" },
//   { name: "Sukuna", image: "/src/assets/images/Sukuna.png" },
//   { name: "Todo Aoi", image: "/src/assets/images/Todo_aoi.png" },
// ];

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [minting, setMinting] = useState(null);
  const [ownedTokens, setOwnedTokens] = useState([]);
  const [mintedTokens, setMintedTokens] = useState([]);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const nftContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
     const address = await signer.getAddress();

    setWalletAddress(await signer.getAddress());
    setContract(nftContract);
    await loadOwnedTokens(nftContract, address);
  }

  async function loadOwnedTokens(nftContract, address) {
  const owned = [];
  for (let tokenId = 0; tokenId < characters.length; tokenId++) {
    try {
      const owner = await nftContract.ownerOf(tokenId);
      if (owner.toLowerCase() === address.toLowerCase()) {
        owned.push(tokenId);
      }
    } catch (err) {
      // token not minted yet - ownerOf reverts, that's expected, just skip it
    }
  }
  setOwnedTokens(owned);
}
async function checkMintedStatus(nftContract) {
  const minted = [];
  for (let tokenId = 0; tokenId < characters.length; tokenId++) {
    try {
      await nftContract.ownerOf(tokenId);
      minted.push(tokenId);
    } catch (err) {
      
    }
  }
  setMintedTokens(minted);
}
useEffect(() => {
  const readProvider = new ethers.BrowserProvider(window.ethereum || ethers.getDefaultProvider());
  const readContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, readProvider);
  checkMintedStatus(readContract);
}, []);
  async function mintCharacter(index, name) {
    if (!contract) {
      alert("Connect your wallet first");
      return;
    }
    setMinting(index);
    try {
      // const tempURI = `ipfs://placeholder-${index}`;
      const tx = await contract.mint(characters[index].metadataURI);
      await tx.wait();
      await loadOwnedTokens(contract, walletAddress);
      await checkMintedStatus(contract);
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
        {walletAddress && <p>Connected: user </p>}
      </header>

      <main className="main-content">
        {walletAddress && (
  <section className="my-collection">
    <h2>My Collection</h2>
    {ownedTokens.length === 0 ? (
      <p>You don't own any characters yet.</p>
    ) : (
      <div className="cards-grids">
        {ownedTokens.map((tokenId) => (
          <div className="card" key={`owned-${tokenId}`}>
            <img src={characters[tokenId].image} alt={characters[tokenId].name} />
            <h3>{characters[tokenId].name}</h3>
            <p>✅ Owned</p>
          </div>
        ))}
      </div>
    )}
  </section>
)}
{/* Filter out already owned characters before mapping */}
   <section className="available-nfts"><h2>Available to Mint</h2>
   <div className="cards-grids">
        {characters.map((char, index) => ({ char, index }))
    .filter(({ index }) => !ownedTokens.includes(index)).map(({char, index}) => (
          <div className="card" key={char.name}>
            <img src={char.image} alt={char.name} />
            <h3>{char.name}</h3>
            <button onClick={() => mintCharacter(index, char.name)} disabled={minting === index}>
              {minting === index ? "Minting..." : "Mint"}
            </button>
          </div>
        ))}
        </div>
      </section>
      </main>
    </div>
  
  );
}

export default App;