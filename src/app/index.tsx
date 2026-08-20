import { useState } from "react";
import axios from "axios";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../style/indexStyle";
import EnderecoCard from "../components/EnderecoCard"

type Endereco = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export default function Home() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState<Endereco | null>(null);

  async function buscarCep() {
    if (cep.length !== 8) {
      Alert.alert(
        "CEP inválido",
        "Digite um CEP com 8 números."
      );
      return;
    }

    const resposta = await axios.get(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    if (resposta.data.erro) {
      Alert.alert(
        "CEP não encontrado",
        "Verifique o CEP informado."
      );
      return;
    }

    setEndereco(resposta.data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consulta de CEP</Text>

      <TextInput
        value={cep}
        onChangeText={setCep}
      />

      <Pressable onPress={buscarCep}>
        <Text>Buscar CEP</Text>
      </Pressable>

      {endereco && (
        <EnderecoCard
          cep={endereco.cep}
          logradouro={endereco.logradouro}
          bairro={endereco.bairro}
          cidade={endereco.localidade}
          uf={endereco.uf}
        />
      )}
    </View>
  );
}