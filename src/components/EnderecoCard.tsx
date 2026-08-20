import { View, Text } from "react-native";
import  { styles }from "../style/enderecoCardStyle"

type EnderecoCardProps = {
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
};
export default function EnderecoCard({
    cep, logradouro, bairro, cidade, uf
}: EnderecoCardProps) {
    return (
        <View style={styles.card}>
            <Text>CEP: {cep}</Text>
            <Text>Rua: {logradouro}</Text>
            <Text>Bairro: {bairro}</Text>
            <Text>Cidade: {cidade}</Text>
            <Text>UF: {uf}</Text>
        </View>
    );
}