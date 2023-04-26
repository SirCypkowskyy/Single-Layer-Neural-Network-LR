# Single Layer Neural Network

<div align="center">

<img src="../static/pjatk_logo.png" width="50%"></img>

</div>

### Client

This is a simple Vite.js application that allows the user to input a text and send it to the server for language recognition. The client also displays the results of the recognition with Apexcharts graph.

### Contents

1. [Setup](#setup)
2. [Usage](#usage)

### Setup

1. Make sure you have [Node.js](https://nodejs.org/en/) installed.
2. Type `npm install` in the client's root directory to install the dependencies.
3. Make sure server is running and finished training the neural network.
4. Run `npm run dev` to start the client.
5. Viola! Your client should now be running on the port specified in the terminal.

### Usage

1. Type in the text you want to recognize the language of.
2. Choose between allowed mods:
   - `live mode` off - the neural network will make predictions only when the user clicks the `Check this text` button.
   - `live mode` on - the neural network will make predictions every time ~3 seconds after the user types a character. The `Check this text` button will be disabled.
3. Choose between allowed options:
   - `Show % bar chart` off - the neural network will display languages with their dotproduct values sorted in descending order. The first language is the most probable one.
   - `Show % bar chart` on - the neural network will display languages with % values sorted in descending order. The first language is the most probable one. 100% is the highest dotproduct value from all language perceptrons, while 0% is the lowest one.
4. (If `live mode` is off) Click the `Check this text` button to make the neural network make a prediction.
5. (If `live mode` is on) Wait for the neural network to make a prediction.
6. Enjoy the results!
