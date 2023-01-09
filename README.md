# Fantium Test App

The is the repository of the App connecting with the [Fantium Test Contract](https://github.com/tonythom/fantium-test-contract). Note that this app was written in a couple of days in full "hackathon" mode. Therefore, it might have bugs and unresolved errors. Use with caution and only on testnets.

## Frameworks Used

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The Next.js framework was chosen mainly for its speed-to-production approach and, in particular, for its very simple approach to deployment through the [Vercel.com](https://vercel.com/) deployment platform. Our app gets deployed automatically to:

https://fantium-test-app.vercel.app/

every time there is a push to the `main` branch. 

Moreover, we use [Chakra UI]("https://chakra-ui.com/"), which is a library providing components for React applications.

## Using the App

Navigation happens through the header menu buttons. Those remain disabled until an account is connected through Metamask. The App needs [MetaMask](https://metamask.io/) to be installed to work and will produce a warning message when one tries to connect without having MetaMask. The available buttons are:

* Mint. Opens the form for minting an NFT. It will display a message if the connected address is in the allowlist or not. Transactions sent from non-allowed addresses will revert and a relevant error message will be displayed. Transaction submitted correctly will display a success message with the transaction hash. The latter is clickable and takes you to the explorer. 
* My Tokens. This is an extra page that was not part of the exercise. It allows the connected user to see the tokens they own. Each token is displayed in a card. The Metadata gets resolved every time through a public IPFS gateway (no relevant data is stored or cached).
* Admin. This is a page for managing the allowlist. It will display the contract owner's address when loaded. It can take a list of address to either allow or revoke. Displays relevant messages on transaction error/revert and success.

The pages are reactive on MetaMask changes. They will reload on connected account changes or chain changes. Connected to a chain other than Goerli prints a relevant message.

## IPFS integration

The App uploads data to the IPFS and also resolves IPFS addresses to the corresponding (in this case) JSON files. 

For uploading to IPFS a free account of [Pinata Cloud](https://www.pinata.cloud/) is used.

To resolve IPFS addresses (which is relevant in the My Tokens page) the free and public gateway of [NFT Storage](https://nft.storage/) is used. 

## Possible improvements

* There is a couple of clear code improvements (note that this was no completed due to the timelines):
    * There is code repetitions that could be refactored. This would minimize code repetition and increase re-usability.
    * The use of React hooks can be improved. In particular, some of the contract read methods are called multiple times a page is loading. This, of course, affects the performance of the page.
* Make use of NextJS' [Api Routes](https://nextjs.org/docs/api-routes/introduction). This would allow for certain operations to be run exclusively on the server-side. A good example here, would be uploading to IPFS through Pinata. This would also allow better security for the API secret of this service (it is stored as an env variable which would then not be exposed to the frontend app).
* Currently, the App uses no storage or cache. This was done on purpose as we wanted this App to serve as a frontened to the Smart Contract and IPFS. In a production environment, caching (of e.g. the NFTData), would be in order to improve performance and usability. 

___
### Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

