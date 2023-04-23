"""
Server Rest-API dla sieci neuronowej
"""
import json
from http.server import BaseHTTPRequestHandler
from datetime import datetime
from neural_network import NeuralNetwork
from urllib.parse import unquote


class RequestHandler(BaseHTTPRequestHandler):

    def __init__(self, neural_network: NeuralNetwork):
        self.neural_network = neural_network

    def __call__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def get_request_params(self) -> dict:
        """
        Pobiera parametry z żądania
        """
        if not self.path.__contains__('?'):
            return {}

        params = self.path.split('?')[1]
        return_dict = {}
        for param in params.split('&'):
            key, value = param.split('=')
            if key not in return_dict:
                return_dict[key] = self.parse_param_value(value)

        return return_dict

    def do_GET(self):
        """
        Obsługa żądania GET
        """
        params = self.get_request_params()
        self.send_response(200)
        self.send_header('Content-type', 'text/json')
        self.end_headers()

        # sprawdzamy czy żądanie zawiera parametr 'input`
        if 'input' in params:
            # jeżeli tak to przekazujemy dane do sieci
            print('Input: ' + str(params['input']))
            wynik = self.neural_network.get_input_lang_dotproducts(params['input'])
            print('Wynik: ' + str(wynik))
            self.wfile.write(json.dumps(wynik).encode('utf-8'))
        else:
            self.wfile.write(json.dumps(params).encode('utf-8'))

    def parse_param_value(self, param: str):
        """
        Parsuje wartość parametru wartości
        :param param: wartość parametru
        :return: zwraca wartość parametru
        """

        param = unquote(param).replace("+", " ")

        if param.startswith('[') and param.endswith(']'):
            return [self.parse_param_value(x) for x in param[1:-1].split(',')]
        elif param.isnumeric():
            return int(param)
        elif param.isdecimal():
            return float(param)
        elif param == 'true':
            return True
        elif param == 'false':
            return False
        elif param == 'null':
            return None
        elif param == 'now':
            return datetime.now()
        else:
            return param.replace('%20', ' ')
