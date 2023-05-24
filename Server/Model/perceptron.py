import random
from rich import print as rprint
from datetime import datetime


class Perceptron:
    def __init__(self, vector_size: int, learning_rate: float, threshold: float, decisive_attribute: str,
                 debug: bool = False):
        """
        Perceptron służący do klasyfikacji języków
        :param vector_size: ilość wejść
        :param learning_rate: współczynnik uczenia
        :param threshold: próg / bias
        :param decisive_attribute: atrybut decyzyjny
        :param debug: czy wypisywać informacje w trybie debug
        """
        self.weights = [random.random() for _ in range(vector_size)]
        self.learning_rate = learning_rate
        self.decisive_attribute = decisive_attribute
        self.threshold = threshold
        self.debug = debug
        self.is_trained = False
        if self.debug:
            rprint(
                f"({datetime.now()})(Perceptron {decisive_attribute}) Perceptron for language: {decisive_attribute} created")

    def dot_product(self, inputs):
        """
        Oblicza iloczyn skalarny wektorów
        :param inputs: wektor wejściowy
        :return: iloczyn skalarny wektorów
        """
        if len(inputs) != len(self.weights):
            # dodajemy bias do wag, gdy chcemy uzyskać dotproduct poza etapem uczenia
            return sum([x * y for x, y in zip(inputs, self.weights + [self.threshold])])
        return sum([x * y for x, y in zip(inputs, self.weights)])

    def get_net(self, inputs):
        """
        Funkcja interpretująca wynik iloczynu skalarnego
        :param inputs: wektor wejściowy
        :return: 1 jeśli iloczyn skalarny >= threshold, 0 w przeciwnym wypadku
        """
        return 1 if self.dot_product(inputs) >= self.threshold else 0

    def train(self, inputs, expected_language):
        """
        Funkcja ucząca perceptron
        :param inputs: wektor wejściowy
        :param expected_language: oczekiwany język (atrybut decyzyjny)
        """
        if self.is_trained:
            return

        self.weights.append(self.threshold)
        d = 1 if expected_language == self.decisive_attribute else 0
        y = self.get_net(inputs)

        # dodajemy bias do wektora wejściowego
        inputs.append(-1)
        for i in range(len(self.weights)):
            self.weights[i] = self.weights[i] + self.learning_rate * (d - y) * inputs[i]

        inputs.pop()
        self.threshold = self.weights.pop()

    def __str__(self):
        weights_with_letters = [(chr(i + 97), round(self.weights[i], 2)) for i in range(self.weights.__len__()-1)]
        return f"Perceptron for language: {self.decisive_attribute}, with final threshold / bias: {round(self.threshold, 2)}" \
               f" and with weights: {weights_with_letters}"
