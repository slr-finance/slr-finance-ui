const testnetAddresses = {
  "SolarToken": "0x4A76Cb94B665306aB991A04220A07D474201AED8",
  "ReferralService": "0xa8aF92AA30d6565EA7b867085107ECc4b2224DcE",
  "PresaleService": "0xB76Fd76b9Cb70858333bc99ab0222DA43B34cb54",
  "StakingService": "0x9876944Aed4ac8e04F5316446B6102C9D74E4d79",
  "MilkyWay": "0xE6AD0d97c90E88a55De31Ad37AdD53a20C23fEA1",
  "SolarPair": "0x21f4E8bB78d3dF3d57C77cD40680fBA09BaC0E98",
  "BnbToken": "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
  "SwapRouter": "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
  "Multicall": "0x3D0B76704034A2E14e77B233800e74762448b33a",
  "NMX_INVEST": "0x18Cad2906e8B96d5Ee2D787B338d21c48FA278D7"
}

const mainnetAddresses = {
  "BnbToken": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  "SwapRouter": "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  "Factory": "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
  "SolarToken": "0x18f2e1f3378B56cFda6D5fb1735d97e3D6EF188b",
  "SolarPair": "0xC52B73F764C4b5FD509Bd2BBF7905747413844aa",
  "ReferralService": "0xd576a65eCA98E728F7aA1322f0228E217734525a",
  "PresaleService": "0x634fbDB11680ECe798Bd810b590D32F0FCd893E8",
  "StakingService": "0x7B05F54465fD77867042F866Bc51c33F5e3aAFEc",
  "Multicall": "0x4fF1824aaB53F62B19330c654703785C712e6ce1",
  "MilkyWay": "0x0000000000000000000000000000000000000000",
}

export default import.meta.env.VITE_CHAIN === 'TESTNET' 
  ? testnetAddresses
  : mainnetAddresses
