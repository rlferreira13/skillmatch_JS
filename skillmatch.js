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
  return requisitosVaga.filter(
    (requisito) => !habilidadesCandidato.includes(requisito),
  );
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
  return listaVagas.map((vaga) => {
    const faltantes = obterHabilidadesFaltantes(
      vaga.requisitos,
      candidatoObj.habilidades,
    );
    const qtdAtendidas = vaga.requisitos.length - faltantes.length;
    const percentual = Math.round(
      (qtdAtendidas / vaga.requisitos.length) * 100,
    );

    return {
      vagaInfo: vaga,
      empresa: vaga.empresa,
      cargo: vaga.cargo,
      compatibilidade: percentual,
      classificacao: classificarCompatibilidade(percentual),
      faltantes: faltantes,
    };
  });
};

const encontrarMelhorVaga = (resultadosAnalise) => {
  return resultadosAnalise.reduce((melhor, atual) => {
    return atual.compatibilidade > melhor.compatibilidade ? atual : melhor;
  });
};

const gerarRecomendacaoEstudo = (resultadosAnalise) => {
  const todasFaltantes = resultadosAnalise.reduce((acumulador, resultado) => {
    resultado.faltantes.forEach((hab) => {
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

const criarContadorDeAnalises = () => {
  let total = 0;

  return () => {
    total++;
    return total;
  };
};

const contadorAnalises = criarContadorDeAnalises();

const buscarVagasSimuladas = () => {
  return new Promise((resolve) => {
    console.log("⏳ Conectando ao servidor e buscando vagas...");

    setTimeout(() => {
      resolve(vagas);
    }, 1500);
  });
};

const exibirMensagemFinal = (nome) => {
  console.log(
    `\n🚀 ${nome}, revise suas habilidades faltantes e bons estudos!`,
  );
};

const finalizarAnalise = (nomeCandidato, callback) => {
  const numeroDaAnalise = contadorAnalises();
  console.log(
    `\n--- Registro: Análise de nº ${numeroDaAnalise} gerada com sucesso ---`,
  );

  callback(nomeCandidato);
};

const iniciarSistema = async () => {
  try {
    console.log(`Bem-vindo(a) ao SkillMatch JS, ${candidato.nome}!`);

    const vagasCarregadas = await buscarVagasSimuladas();
    console.log("✅ Vagas carregadas com sucesso!\n");

    const resultados = processarAnaliseVagas(candidato, vagasCarregadas);
    const melhorVaga = encontrarMelhorVaga(resultados);
f
    console.log("==========================================");
    console.log("          RESULTADOS DA ANÁLISE           ");
    console.log("==========================================");

    resultados.forEach((res) => {
      console.log(`🏢 Empresa: ${res.empresa} | Cargo: ${res.cargo}`);
      console.log(
        `📊 Compatibilidade: ${res.compatibilidade}% -> ${res.classificacao}`,
      );
      console.log(
        `❌ Faltam: ${res.faltantes.length > 0 ? res.faltantes.join(", ") : "Nenhuma"}\n`,
      );
    });

    console.log("==========================================");
    console.log("           A VAGA PERFEITA                ");
    console.log("==========================================");
    console.log(
      `Vaga mais compatível: ${melhorVaga.empresa} - ${melhorVaga.cargo} com ${melhorVaga.compatibilidade}% de aderência.`,
    );

    console.log("\n==========================================");
    console.log("         RECOMENDAÇÃO DE ESTUDO           ");
    console.log("==========================================");
    console.log(gerarRecomendacaoEstudo(resultados));

    finalizarAnalise(candidato.nome, exibirMensagemFinal);
  } catch (erro) {
    console.error("❌ Erro ao iniciar o sistema:", erro);
  }
};

iniciarSistema();
