const candidato = {
  nome: "Ana",
  area: "Front-End",
  habilidades: ["JavaScript", "GitHub", "Lógica de Programação", "Kanban"],
  experienciaMeses: 3,
};

class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa} (${this.modalidade})`;
  }
}

class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  exibirDetalhesDaVaga() {
    return `${this.exibirResumo()} - Nível: ${this.nivel} | Salário: R$ ${this.salario}`;
  }
}

const vagas = [
  new VagaFrontEnd(
    1,
    "TechStart",
    "Desenvolvedor Front-End Júnior",
    ["JavaScript", "GitHub", "Lógica de Programação"],
    2800,
    "Remoto",
    "Júnior",
  ),
  new VagaFrontEnd(
    2,
    "CodeLab",
    "Estágio Front-End",
    ["JavaScript", "Kanban", "GitHub"],
    1800,
    "Híbrido",
    "Estágio",
  ),
  new VagaFrontEnd(
    3,
    "WebSolutions",
    "Programador JavaScript Júnior",
    ["JavaScript", "Arrays", "Objetos", "Funções"],
    3000,
    "Presencial",
    "Júnior",
  ),
];

const obterHabilidadesFaltantes = (requisitosVaga, habilidadesCandidato) => {
  return requisitosVaga.filter(requisito => !habilidadesCandidato.includes(requisito));
};

const classificarCompatibilidade = (percentual) => {
  if (percentual >= 80) {
    return "Alta compatibilidade";
  } else if (percentual >= 50) {
    return "Média compatibilidade";
  } else {
    return "Baixa compatibilidade";
  }
};

const processarAnaliseVagas = (candidatoObj, listaVagas) => {
  return listaVagas.map(vaga => {
    const faltantes = obterHabilidadesFaltantes(vaga.requisitos, candidatoObj.habilidades);
    const qtdAtendidas = vaga.requisitos.length - faltantes.length;
    
    // RF03 - Cálculo da compatibilidade
    const percentual = Math.round((qtdAtendidas / vaga.requisitos.length) * 100);
    
    return {
      vagaInfo: vaga,
      empresa: vaga.empresa,
      cargo: vaga.cargo,
      compatibilidade: percentual,
      classificacao: classificarCompatibilidade(percentual),
      faltantes: faltantes
    };
  });
};

const encontrarMelhorVaga = (resultadosAnalise) => {
  return resultadosAnalise.reduce((melhor, atual) => {
    return (atual.compatibilidade > melhor.compatibilidade) ? atual : melhor;
  });
};

const gerarRecomendacaoEstudo = (resultadosAnalise) => {
  const todasFaltantes = resultadosAnalise.reduce((acumulador, resultado) => {
    resultado.faltantes.forEach(hab => {
      if (!acumulador.includes(hab)) {
        acumulador.push(hab);
      }
    });
    return acumulador;
  }, []);

  if (todasFaltantes.length === 0) {
    return "Parabéns! Você atende a todos os requisitos destas vagas.";
  }

  return `Priorize estudar: ${todasFaltantes.join(", ")}, pois esses conteúdos aparecem nas vagas analisadas.`;
};

const resultados = processarAnaliseVagas(candidato, vagas);
const melhorVaga = encontrarMelhorVaga(resultados);

console.log("=== Resultados da Análise ===");
console.log(resultados);
console.log("=== Melhor Vaga Encontrada ===");
console.log(`Vaga mais compatível: ${melhorVaga.empresa} - ${melhorVaga.cargo}`);
console.log(`Compatibilidade: ${melhorVaga.compatibilidade}%`);
console.log("=== Recomendação ===");
console.log(gerarRecomendacaoEstudo(resultados));