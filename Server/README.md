# Single Layer Neural Network
### Server

This is a simple server that uses a single layer neural network to predict the language of a given text. The server is written in Python and uses `BaseHTTPRequestHandler` to serve API requests.

### Contents

1. [Setup](#setup)
2. [Usage](#usage)
3. [API](#api)
4. [License](#license)

### Setup

1. Configure your own Conda environment with Python 3.10 and install the dependencies from 'requirements.txt'.
2. Create `.env` file in the root directory and add the following environment variables:
    - `PORT`: The port number to run the server on.
    - `NEURAL_NETWORK_DATA_PATH`: The path to the neural network data folder.
    - `NEURAL_NETWORK_LEARNING_RATE`: The learning rate of the neural network's perceptrons.
    - `NEURAL_NETWORK_BIAS`: The bias of the neural network's perceptrons.
    - `NEURAL_NETWORK_EPOCHS`: The number of epochs to train the neural network for.
3. Run `main.py` to start the server.

### API

The server exposes the following API endpoints:

- `GET /?input=<user input>`: Returns the predicted language of the given user input.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
