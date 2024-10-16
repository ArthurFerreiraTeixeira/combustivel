import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';

const App = () => {
  const [precoAlcool, setPrecoAlcool] = useState('');
  const [precoGasolina, setPrecoGasolina] = useState('');
  const [mediaAlcool, setMediaAlcool] = useState('');
  const [mediaGasolina, setMediaGasolina] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularVantagem = () => {
    const alcool = parseFloat(precoAlcool);
    const gasolina = parseFloat(precoGasolina);
    const mediaA = parseFloat(mediaAlcool);
    const mediaG = parseFloat(mediaGasolina);

    if (!alcool || !gasolina || !mediaA || !mediaG || alcool <= 0 || gasolina <= 0 || mediaA <= 0 || mediaG <= 0) {
      setResultado('Por favor, insira valores válidos.');
      return;
    }

    Keyboard.dismiss(); // Fechar o teclado após calcular

    // Cálculo do custo por quilômetro
    const custoAlcool = alcool / mediaA;
    const custoGasolina = gasolina / mediaG;

    // Comparar custo por quilômetro
    setResultado(custoAlcool < custoGasolina ? 'Abasteça com Álcool' : 'Abasteça com Gasolina');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Comparação de Combustível</Text>

        <Image source={require('./assets/combustivel.png')} style={styles.image} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Preço do Álcool (R$)"
            keyboardType="numeric"
            value={precoAlcool}
            onChangeText={setPrecoAlcool}
          />

          <TextInput
            style={styles.input}
            placeholder="Preço da Gasolina (R$)"
            keyboardType="numeric"
            value={precoGasolina}
            onChangeText={setPrecoGasolina}
          />

          <TextInput
            style={styles.input}
            placeholder="Média de Álcool (km/l)"
            keyboardType="numeric"
            value={mediaAlcool}
            onChangeText={setMediaAlcool}
          />

          <TextInput
            style={styles.input}
            placeholder="Média de Gasolina (km/l)"
            keyboardType="numeric"
            value={mediaGasolina}
            onChangeText={setMediaGasolina}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={calcularVantagem}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        {resultado && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{resultado}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#005580',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#005580',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0099cc',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004d4d',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
});

export default App;
