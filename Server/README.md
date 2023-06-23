# Single Layer Neural Network

<div align="center">

<img src="../static/pjatk_logo.png" width="50%"></img>

</div>

### Server

This is a simple server that uses a single layer neural network to predict the language of a given text. The server is written in Python and uses `BaseHTTPRequestHandler` to serve API requests.

### Contents

1. [Setup](#setup)
2. [Usage](#usage)
3. [API](#api)
4. [License](#license)

### Setup

1. Configure your own Conda environment with Python 3.10 and install the dependencies from `requirements.txt` or with poetry.
2. Create `.env` file in the root directory and add the following environment variables (like in [.env.example](.env.example)):
   - `PORT`: The port number to run the server on.
   - `NEURAL_NETWORK_DATA_PATH`: The path to the neural network data folder.
   - `NEURAL_NETWORK_LEARNING_RATE`: The learning rate of the neural network's perceptrons.
   - `NEURAL_NETWORK_BIAS`: The starting bias / threshold of the neural network's perceptrons.
   - `NEURAL_NETWORK_EPOCHS`: The number of max epochs to train the neural network for.
   - `NEURAL_NETWORK_CONVERT_TO_ASCII`: Whether to convert non-standard latin characters to their ASCII equivalent with Unidecode library or to skip them.
3. (Optional) Remove all files from [Data](/Data) folder
4. (Optional) Edit the [wikipedia article titles to parse](wikipedia_articles_titles_to_parse.json) file to add or remove articles to parse with the Wikipedia API.
5. (Optional) Run [wikipedia_data_parser.py](wikipedia_data_parser.py) to parse the Wikipedia API and create the neural network training data files.
6. Run `main.py` to start neural network training and the server.

### API

The server exposes the following API endpoints:

- `GET /?input=<user input>`: Returns the predicted languages dot product values for the given input. The higher the value, the more likely the text is in that language. The response is in JSON format.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
