// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AnimeNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    uint256 public constant MAX_SUPPLY = 6;
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("JJK Anime NFT", "JJKNFT") Ownable(msg.sender) {}

    function mint(string memory metadataURI) public {
        require(nextTokenId < MAX_SUPPLY, "All characters minted");
        uint256 tokenId = nextTokenId;
        _safeMint(msg.sender, tokenId);
        _tokenURIs[tokenId] = metadataURI;
        nextTokenId++;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }
}