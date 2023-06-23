import os
import random
import json
import unidecode
from Model.perceptron import Perceptron
from rich import print as rprint
from datetime import datetime


class NeuralNetwork:
    def __init__(self, folder_path: os.path, learning_rate, starting_threshold, neural_network_convert_to_ascii : bool, max_epochs=1000, debug: bool = False):
        """
        Sieć neuronowa, która składa się z perceptronów, które są odpowiedzialne za rozpoznawanie języka.

        :param folder_path: ścieżka do folderu z danymi do uczenia sieci
        :param learning_rate: współczynnik uczenia
        :param starting_threshold: początkowy próg / bias
        :param neural_network_convert_to_ascii: czy zmieniać znaki specjalne danego języka na znaki ASCII (jeśli False, to znaki specjalne są pomijane)
        :param max_epochs: maksymalna liczba epok uczenia
        :param debug: czy wypisywać informacje w trybie debug
        """
        self.neural_network_convert_to_ascii = False
        if neural_network_convert_to_ascii is not None:
            self.neural_network_convert_to_ascii = neural_network_convert_to_ascii
        self.perceptrons = []
        self.debug = debug
        self.langs_with_files = []

        if self.debug:
            rprint(f"({datetime.now()})(Neural Network) Learning rate: {learning_rate}")
            rprint(f"({datetime.now()})(Neural Network) Starting threshold / bias: {starting_threshold}")
            rprint(f"({datetime.now()})(Neural Network) Max epochs: {max_epochs}")

        folders = os.listdir(folder_path)

        for folder in folders:
            folder_name = os.path.basename(folder)
            self.perceptrons.append(Perceptron(27, learning_rate, starting_threshold, folder_name, debug))
            files_in_folder = os.listdir(os.path.join(folder_path, folder))
            for file in files_in_folder:
                file_path = os.path.join(os.path.join(folder_path, folder), file)
                self.langs_with_files.append((folder_name, file_path))

        with open('testing_sentence.json', 'r', encoding='utf-8') as f:
            proper_lang_sentences = json.load(f)

        last_epoch_when_number_of_correct_tests_changed = 0
        previous_number_of_correct_tests = 0
        max_epochs_without_improvement = 25
        for i in range(max_epochs):
            if self.debug:
                rprint(f"({datetime.now()})(Neural Network) Epoch: {i}")

            for perceptron in self.perceptrons:
                self.train_perceptron(perceptron)

            # sprawdzamy czy sieć się nauczyła
            number_of_tests = 0
            number_of_correct_tests = 0
            for lang in proper_lang_sentences:
                for sentence in proper_lang_sentences[lang]:
                    number_of_tests += 1
                    suspected_langs = self.get_input_lang_dotproducts(sentence)
                    dot_product_of_proper_lang = suspected_langs[lang]
                    if dot_product_of_proper_lang == max(suspected_langs.values()):
                        number_of_correct_tests += 1

            if number_of_correct_tests != previous_number_of_correct_tests:
                last_epoch_when_number_of_correct_tests_changed = i
                previous_number_of_correct_tests = number_of_correct_tests

            if self.debug:
                rprint(
                    f"({datetime.now()})(Neural Network) Number of correct tests: "
                    f"{number_of_correct_tests} / {number_of_tests}")
                rprint(
                    f"({datetime.now()})(Neural Network) Accuracy: "
                    f"{round(number_of_correct_tests / number_of_tests * 100, 2)}%")

            if i - last_epoch_when_number_of_correct_tests_changed > max_epochs_without_improvement:
                if self.debug:
                    rprint(f"({datetime.now()})(Neural Network) Network didn't learn in "
                           f"{max_epochs_without_improvement} epochs, stopping learning")
                break

            if number_of_tests == number_of_correct_tests:
                if self.debug:
                    rprint(f"({datetime.now()})(Neural Network) Network learned in {i} epochs")
                break

        if self.debug:
            rprint(f"({datetime.now()})(Neural Network) Learning finished")
            rprint(f"({datetime.now()})(Neural Network) Perceptrons: ")
            for perceptron in self.perceptrons:
                rprint('\t-' + str(perceptron))

    def train_perceptron(self, perceptron: Perceptron):
        """
        Funkcja ucząca sieć z podanego folderu

        :param perceptron: perceptron do nauki
        """
        random.shuffle(self.langs_with_files)
        for lang, file_path in self.langs_with_files:
            if lang == perceptron.decisive_attribute:
                perceptron.train(self.read_file(file_path), lang)
            else:
                perceptron.train(self.read_file(file_path), lang)

    def read_file(self, file_path: os.path) -> list[float]:
        """
        Funkcja odczytująca plik i zwracająca wektor występowania liter w pliku

        :param file_path: ścieżka do pliku
        """
        char_map = {}
        char_count = 0
        for i in range(97, 123):
            char_map[chr(i)] = 0
        result = [0.0 for _ in range(27)]
        with open(file_path, 'r', encoding='utf-8') as file_content:
            for line in file_content:
                for char in line:
                    # check if char is a special char
                    if char not in char_map:
                        if not self.neural_network_convert_to_ascii:
                            continue
                        else:
                            char = unidecode.unidecode(char)
                            if char not in char_map:
                                continue
                    char_map[char] += 1
                    char_count += 1
        for i in range(97, 123):
            current_index = int(i - 97)
            if char_count != 0:
                result[current_index] = char_map[chr(i)] / char_count
            else:
                result[current_index] = 0.0
        result.append(-1.0)
        return result

    def get_attributues_values_for_string(self, input_string: str):
        """
        Funkcja zwracająca wektor występowania liter w stringu

        :param input_string: string do testowania
        :return: wektor występowania liter w stringu
        """
        result = [0.0 for _ in range(27)]
        char_map = {}
        char_count = 0
        for i in range(97, 123):
            char_map[chr(i)] = 0.0

        for char in input_string:
            if char_map.__contains__(char):
                char_map[char] += 1
                char_count += 1
            elif self.neural_network_convert_to_ascii:
                char = unidecode.unidecode(char)
                if char_map.__contains__(char):
                    char_map[char] += 1
                    char_count += 1
        for i in range(97, 123):
            current_index = int(i - 97)
            result[current_index] = char_map[chr(i)] / char_count
        result.append(-1.0)
        return result

    def get_input_lang_dotproducts(self, input_string: str) -> []:
        """
        Funkcja zwracająca dotproduct dla testu dla każdego perceptronu

        :param input_string: string do sprawdzenia
        :return: słownik z wartościami dotproduct dla każdego perceptronu w postaci {lang: dotproduct}
        """
        result_from_testing = self.get_attributues_values_for_string(input_string)
        langs_with_nets = {}

        for perceptron in self.perceptrons:
            net_value = perceptron.dot_product(result_from_testing)
            langs_with_nets[perceptron.decisive_attribute] = net_value

        return langs_with_nets
