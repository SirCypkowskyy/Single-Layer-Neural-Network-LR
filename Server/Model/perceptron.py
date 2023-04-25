import random
from rich import print as rprint
from datetime import datetime


class Perceptron:
    def __init__(self, vector_size: int, learning_rate: float, threshold: float, decisive_attribute: str, debug: bool = False):
        self.weights = [random.random() for _ in range(vector_size)]
        self.learning_rate = learning_rate
        self.decisive_attribute = decisive_attribute
        self.threshold = threshold
        self.weights.append(threshold)
        self.debug = debug
        self.is_trained = False
        if self.debug:
            rprint(f"({datetime.now()})(Perceptron {decisive_attribute}) Perceptron for language: {decisive_attribute} created")

    def dot_product(self, inputs):
        return sum([x * y for x, y in zip(inputs, self.weights)])

    def get_net(self, inputs):
        return 1 if self.dot_product(inputs) >= self.threshold else 0

    def train(self, inputs, expected_language):
        if self.is_trained:
            return
        d = 1 if expected_language == self.decisive_attribute else 0
        y = self.get_net(inputs)

        self.weights[-1] = self.weights[-1] - (d - y) * self.learning_rate
        self.threshold = self.weights[-1]
        inputs.append(self.weights[-1])
        # nowy bias = stary bias - (d - y) * learning_rate
        for i in range(len(self.weights)):
            self.weights[i] = self.weights[i] + self.learning_rate * (d - y) * inputs[i]

    def __str__(self):
        weights_with_letters = []
        # ignorujemy ostatnią wagę, bo jest to bias
        for i in range(self.weights.__len__() - 2):
            weights_with_letters.append((chr(i + 97), round(self.weights[i], 2)))
        return f"Perceptron for language: {self.decisive_attribute}, with final bias: {round(self.weights[-1], 2)}" \
               f" and with weights: {weights_with_letters}"
