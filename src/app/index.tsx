import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import EnderecoCard from "../components/EnderecoCard";
import { apiCep } from "../services/apiCep";
import { styles } from "../style/indexStyle";

type Endereco = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
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

    try {
      const resposta = await apiCep.get<Endereco>(
        `/${cep}/json/`
      );

      if (resposta.data.erro) {
        Alert.alert(
          "CEP não encontrado",
          "Verifique o CEP informado."
        );
        return;
      }

      setEndereco(resposta.data);

    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível consultar o CEP."
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Consulta de CEP
      </Text>

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