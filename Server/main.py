import sys
from http.server import HTTPServer
from server import RequestHandler
from rich import print as rprint
from neural_network import NeuralNetwork

server = None
program_neural_network = None

debug = False
server_port = None

neural_network_data_path = None
neural_network_learning_rate = None
neural_network_epochs = None
neural_network_bias = None


if __name__ == '__main__':
    # Wczytujemy argumenty z pliku .env
    rprint("[bold italic]Loading environment variables...[/bold italic]")
    with open('.env', 'r') as file:
        env = file.read().splitlines()
    for line in env:
        line_key, line_value = line.split('=')
        match line_key:
            case 'SERVER_PORT':
                server_port = int(line_value)
            case 'NEURAL_NETWORK_DATA_PATH':
                neural_network_data_path = line_value
            case 'NEURAL_NETWORK_LEARNING_RATE':
                neural_network_learning_rate = float(line_value)
            case 'NEURAL_NETWORK_MAX_EPOCHS':
                neural_network_epochs = int(line_value)
            case 'NEURAL_NETWORK_BIAS':
                neural_network_bias = float(line_value)
            case 'DEBUG':
                debug = bool(line_value)
    rprint("[bold green]Environment variables loaded![/bold green]")

    try:
        rprint("[italic]Generating neural network...[/italic]")

        if neural_network_data_path is None or neural_network_learning_rate is None or neural_network_bias is None:
            rprint("[bold red]Error: [/bold red]Missing environment variables!")
            sys.exit(1)

        if neural_network_epochs is None:
            program_neural_network = NeuralNetwork(neural_network_data_path, neural_network_learning_rate,
                                                   neural_network_bias, debug=debug)
        else:
            program_neural_network = NeuralNetwork(neural_network_data_path, neural_network_learning_rate,
                                                   neural_network_bias, neural_network_epochs, debug=debug)

        rprint("[bold green]Neural network generated![/bold green]")

        rprint("Running server on port: " + str(server_port))
        rprint("[bold]Link[/bold]: http://localhost:" + str(server_port) + "/")
        rprint("[bold yellow]Press Ctrl+C to stop server[/bold yellow]")
        requestHandler = RequestHandler(program_neural_network)
        server = HTTPServer(('localhost', int(server_port)), requestHandler)
        server.serve_forever()
    except KeyboardInterrupt:
        if server:
            server.server_close()
    # except Exception as e:
    #     rprint("Error: ", e)
    #     if server:
    #         server.server_close()
