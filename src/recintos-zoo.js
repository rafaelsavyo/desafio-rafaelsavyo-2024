const recintos = [
    { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: [{ tipo: 'MACACO', quantidade: 3 }] },
    { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
    { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: [{ tipo: 'GAZELA', quantidade: 1 }] },
    { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
    { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: [{ tipo: 'LEAO', quantidade: 1 }] }
];

const animais = {
    'LEAO': { tamanho: 3, bioma: 'savana' },
    'LEOPARDO': { tamanho: 2, bioma: 'savana' },
    'CROCODILO': { tamanho: 3, bioma: 'rio' },
    'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'] },
    'GAZELA': { tamanho: 2, bioma: 'savana' },
    'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'] }
};

class RecintosZoo {
    analisaRecintos(tipo, quantidade) {
        if (!animais[tipo]) {
            return {erro: 'Animal inválido'}
        }
        
        if (typeof quantidade !== 'number' || quantidade <= 0) {
            return {erro: 'Quantidade inválida'}
        }
        
        let recintosViaveis = []
        for (let c = 0; c < recintos.length; c += 1) {
            let recinto = recintos[c]
            let biomaAnimal = animais[tipo].bioma
            let biomaValido = Array.isArray(biomaAnimal) ? biomaAnimal.includes(recinto.bioma) : biomaAnimal === recinto.bioma
            
            if (biomaValido) {
                let espaçoOcupado = quantidade * animais[tipo].tamanho
                let espaçoLivre = recinto.tamanhoTotal
                
                for (let cont = 0; cont < recinto.animaisExistentes.length; cont += 1) {
                    let animalExistente = recinto.animaisExistentes[cont]
                    espaçoLivre -= animalExistente.quantidade * animais[animalExistente.tipo].tamanho
                }
                if (espaçoOcupado <= espaçoLivre) {
                    let podeHospedar = true
                    if (tipo === 'MACACO' && recinto.animaisExistentes.length === 0) {
                        podeHospedar = false
                    }
                    
                    if (tipo === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
                        podeHospedar = false
                    }
                    
                    if (podeHospedar) {
                        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espaçoLivre - espaçoOcupado} total: ${recinto.tamanhoTotal})`)
                    }
                }
            }
        }
        
        if (recintosViaveis.length === 0) {
            return{erro: 'Não há recinto viável'}
        }
        return {recintosViaveis: recintosViaveis.sort()}
    }
}
export { RecintosZoo as RecintosZoo };
