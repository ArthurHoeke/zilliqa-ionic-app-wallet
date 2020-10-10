<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/ArthurHoeke/zilliqa-ionic-app-wallet">
    <img src="/src/assets/icon/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">zilliqa-ionic-app-wallet</h3>

  <p align="center">
    Zilliqa Wallet is a free open-source community managed app designed for safe storage of Zilliqa tokens.
    <br />
    <a href="https://github.com/ArthurHoeke/zilliqa-ionic-app-wallet/"><strong>Download Zilliqa Wallet on the play store »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ArthurHoeke/zilliqa-ionic-app-wallet/issues">Report Bug</a>
    ·
    <a href="https://github.com/ArthurHoeke/zilliqa-ionic-app-wallet/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project

[![mockup][product-screenshot]](https://i.imgur.com/j1t2ghI.png)

Zilliqa Wallet aims to provide users with a simple to use, lightweight and safe app for storing Zilliqa tokens. Currently there's hundreds of cryptocurrency apps available, all featuring an absolute ton of different tokens. This amount of features and options can be daunting for newcomers to crypto, by providing one simple app with a simple UI Zilliqa Wallet aims to break down the entry barrier for new Zilliqa users.

Currently Zilliqa Wallet provides;
* User-friendly minimalist UI
* Creation of wallets
* Import wallet
* Send Zilliqa
* Receive Zilliqa
* Recent transaction overview

### Built With
* [Ionic](https://ionicframework.com/)
* [Angular](https://angular.io/)
* [Zilliqa Javascript library](https://github.com/Zilliqa/Zilliqa-JavaScript-Library/)
* [Viewblock](https://www.npmjs.com/package/@zilliqa-js/viewblock)
* [Crypto JS](https://www.npmjs.com/package/crypto-js)

## Getting Started

### Prerequisites

Before setup make sure you have [Ionic CLI](https://ionicframework.com/docs/intro/cli) and [Node JS](https://nodejs.org/en/download/) installed.<br />
Follow the instructions on how to install these via the provided links.

### Installation

1. Get a free API key at [viewblock.io/api](https://viewblock.io/api)
2. Clone the repo
```sh
git clone https://github.com/ArthurHoeke/zilliqa-ionic-app-wallet.git
```
3. Install NPM packages
```sh
npm install
```
4. Enter your API key in `src/app/pages/home/home.page.ts`
```JS
const apiClient = zilliqaAPI({
  apiKey: 'ENTER YOUR VIEWBLOCK API KEY HERE',
})
```



<!-- USAGE EXAMPLES -->
## Usage

Zilliqa Wallet can be opened in your browser using the following command, keep in mind that all ionic plugins which require cordova will not run properly in your browser.
```sh
ionic serve
```

To build the app on your Android phone connect it to your PC, enable developer mode and use the following command
```sh
ionic cordova build android
```

Or add -live at the end for the app to automatically rebuild on code changes.
```sh
ionic cordova build android -l
```

<!-- ROADMAP -->
## Roadmap

Zilliqa Wallet is still in development and changes to encryption may be made at a later date.
</br>
Eventually when the Zilliqa Javascript Library supports Zilliqa Staking I aim to implement this in the app.

<!-- CONTRIBUTING -->
## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Arthur Hoeke - [LinkedIn](https://www.linkedin.com/in/arthur-hoeke-170691103/) - arthur.hoeke@gmal.com

[product-screenshot]: https://i.imgur.com/j1t2ghI.png
