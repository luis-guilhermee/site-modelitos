const params = new URLSearchParams(window.location.search);

const tela = document.getElementById("tela");
const nomeFilme = document.getElementById("nomeFilme");
const tipoSala = document.getElementById("tipoSala");
const mes = document.getElementById("mes");
const ano = document.getElementById("ano");
const sala = document.getElementById("sala");

// Nome do modelo
nomeFilme.textContent = params.get("modelo") || "Agenda de Modelos";
tipoSala.textContent = "Disponibilidade";

// Preenche a seleção de anos
const anoAtual = new Date().getFullYear();

for (let i = anoAtual; i <= anoAtual + 5; i++) {
  const opcao = document.createElement("option");
  opcao.value = i;
  opcao.textContent = i;
  ano.appendChild(opcao);
}

// Seleciona o mês e o ano atuais
mes.value = new Date().getMonth();
ano.value = anoAtual;

// Datas que já possuem agendamento
// Formato: AAAA-MM-DD
const indisponiveis = [
  // Novembro 2026
  "2026-11-03",
  "2026-11-07",
  "2026-11-12",
  "2026-11-15",
  "2026-11-19",
  "2026-11-22",
  "2026-11-26",
  "2026-11-29",

  // Dezembro 2026
  "2026-12-02",
  "2026-12-05",
  "2026-12-10",
  "2026-12-11",
  "2026-12-16",
  "2026-12-20",
  "2026-12-23",
  "2026-12-28",

  // Janeiro 2027
  "2027-01-05",
  "2027-01-09",
  "2027-01-12",
  "2027-01-18",
  "2027-01-21",
  "2027-01-25",
  "2027-01-29",

  // Fevereiro 2027
  "2027-02-03",
  "2027-02-08",
  "2027-02-14",
  "2027-02-19",
  "2027-02-23",

  // Março 2027
  "2027-03-04",
  "2027-03-08",
  "2027-03-13",
  "2027-03-20",
  "2027-03-23",
  "2027-03-27",

  // Abril 2027
  "2027-04-02",
  "2027-04-07",
  "2027-04-11",
  "2027-04-16",
  "2027-04-22",
  "2027-04-27",

  // Maio 2027
  "2027-05-03",
  "2027-05-08",
  "2027-05-14",
  "2027-05-19",
  "2027-05-25",
  "2027-05-30",

  // Junho 2027
  "2027-06-04",
  "2027-06-10",
  "2027-06-15",
  "2027-06-20",
  "2027-06-24",
  "2027-06-28",

  // Julho 2027
  "2027-07-02",
  "2027-07-07",
  "2027-07-13",
  "2027-07-18",
  "2027-07-23",
  "2027-07-29",

  // Agosto 2027
  "2027-08-03",
  "2027-08-08",
  "2027-08-14",
  "2027-08-19",
  "2027-08-25",
  "2027-08-30",

  // Setembro 2027
  "2027-09-02",
  "2027-09-08",
  "2027-09-14",
  "2027-09-19",
  "2027-09-24",
  "2027-09-28",

  // Outubro 2027
  "2027-10-03",
  "2027-10-09",
  "2027-10-14",
  "2027-10-20",
  "2027-10-25",

  // Novembro 2027
  "2027-11-02",
  "2027-11-07",
  "2027-11-13",
  "2027-11-18",
  "2027-11-24",
  "2027-11-29",

  // Dezembro 2027
  "2027-12-04",
  "2027-12-09",
  "2027-12-15",
  "2027-12-20",
  "2027-12-26",

  // Fevereiro 2028
  "2028-02-05",
  "2028-02-10",
  "2028-02-11",
  "2028-02-16",
  "2028-02-19",
  "2028-02-24",
  "2028-02-28",

  // Maio 2028
  "2028-05-02",
  "2028-05-06",
  "2028-05-12",
  "2028-05-17",
  "2028-05-21",
  "2028-05-25",
  "2028-05-30",

  // Agosto 2028
  "2028-08-03",
  "2028-08-08",
  "2028-08-14",
  "2028-08-18",
  "2028-08-22",
  "2028-08-27",

  // Abril 2029
  "2029-04-04",
  "2029-04-09",
  "2029-04-14",
  "2029-04-18",
  "2029-04-23",
  "2029-04-29",

  // Outubro 2029
  "2029-10-03",
  "2029-10-08",
  "2029-10-12",
  "2029-10-16",
  "2029-10-20",
  "2029-10-25",

  // Janeiro 2030
  "2030-01-03",
  "2030-01-07",
  "2030-01-12",
  "2030-01-19",
  "2030-01-24",
  "2030-01-29",

  // Julho 2030
  "2030-07-04",
  "2030-07-09",
  "2030-07-14",
  "2030-07-19",
  "2030-07-24",
  "2030-07-29",
];

// Cria o calendário
function criarCalendario() {
  sala.innerHTML = "";

  const mesEscolhido = Number(mes.value);
  const anoEscolhido = Number(ano.value);

  // Quantidade de dias do mês
  const quantidadeDias = new Date(anoEscolhido, mesEscolhido + 1, 0).getDate();

  // Dia da semana em que o mês começa
  const primeiroDia = new Date(anoEscolhido, mesEscolhido, 1).getDay();

  // Mostra o mês e o ano
  const nomeMes = new Date(anoEscolhido, mesEscolhido, 1).toLocaleDateString(
    "pt-BR",
    {
      month: "long",
      year: "numeric",
    },
  );

  tela.textContent = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

  let diaAtual = 1;

  // Cria as semanas
  for (let semana = 0; diaAtual <= quantidadeDias; semana++) {
    const divSemana = document.createElement("div");
    divSemana.classList.add("fileira");

    // Cria os sete dias da semana
    for (let coluna = 0; coluna < 7; coluna++) {
      // Espaços antes do primeiro dia
      if (semana === 0 && coluna < primeiroDia) {
        const vazio = document.createElement("div");
        vazio.classList.add("dia-vazio");
        divSemana.appendChild(vazio);
        continue;
      }

      // Para quando os dias terminarem
      if (diaAtual > quantidadeDias) {
        break;
      }

      const numero = diaAtual;

      const label = document.createElement("div");
      label.classList.add("assento");

      const span = document.createElement("span");
      span.textContent = numero;

      // Monta a data completa
      const dataCompleta = `${anoEscolhido}-${String(mesEscolhido + 1).padStart(2, "0")}-${String(numero).padStart(2, "0")}`;

      // Verifica se já existe agendamento
      if (indisponiveis.includes(dataCompleta)) {
        label.classList.add("ocupado");
        span.title = "Dia com agendamento";
      } else {
        span.title = "Dia disponível";
      }

      label.appendChild(span);
      divSemana.appendChild(label);

      diaAtual++;
    }

    sala.appendChild(divSemana);
  }
}

// Atualiza ao mudar o mês ou o ano
mes.addEventListener("change", criarCalendario);
ano.addEventListener("change", criarCalendario);

// Exibe o calendário ao abrir a página
criarCalendario();
