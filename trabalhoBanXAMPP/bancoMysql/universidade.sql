-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08/11/2023 às 02:36
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `universidade`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `curso`
--

CREATE TABLE `curso` (
  `cod_curso` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `nro_departamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `curso`
--

INSERT INTO `curso` (`cod_curso`, `nome`, `nro_departamento`) VALUES
(4, 'Ciencia da Computação', 1),
(5, 'Direito', 3),
(6, 'Engenharia Civil', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `departamento`
--

CREATE TABLE `departamento` (
  `nro_departamento` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `escritorio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `departamento`
--

INSERT INTO `departamento` (`nro_departamento`, `nome`, `escritorio`) VALUES
(1, 'Departamento de Tecnologias', 303),
(3, 'Departamento Direito', 301),
(4, 'Departamento Civil', 302);

-- --------------------------------------------------------

--
-- Estrutura para tabela `estudante`
--

CREATE TABLE `estudante` (
  `nro_matricula` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `idade` int(11) NOT NULL,
  `cod_curso` int(11) NOT NULL,
  `prof_supervisor` int(11) NOT NULL,
  `estudante_conselheiro` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `estudante`
--

INSERT INTO `estudante` (`nro_matricula`, `nome`, `idade`, `cod_curso`, `prof_supervisor`, `estudante_conselheiro`) VALUES
(1, 'Joao da Silva', 25, 4, 1, NULL),
(9, 'Jose Pinto', 45, 5, 2, 1),
(10, 'Guilherme ', 30, 6, 1, 9);

-- --------------------------------------------------------

--
-- Estrutura para tabela `professor`
--

CREATE TABLE `professor` (
  `nro_matricula` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `idade` int(11) NOT NULL,
  `sala` varchar(10) NOT NULL,
  `especialidade_pesquisa` varchar(50) NOT NULL,
  `prof_departamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `professor`
--

INSERT INTO `professor` (`nro_matricula`, `nome`, `idade`, `sala`, `especialidade_pesquisa`, `prof_departamento`) VALUES
(1, 'Andre Almeida', 45, '201', 'Banco de dados', 1),
(2, 'Joao Silveira', 55, '201', 'Direito Penal', 3),
(3, 'Pedro Ortiz', 60, '203', 'Construção', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `projeto`
--

CREATE TABLE `projeto` (
  `nro_projeto` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `orgao_financiador` varchar(50) NOT NULL,
  `data_ini` date NOT NULL,
  `data_fim` date NOT NULL,
  `orcamento` double NOT NULL,
  `professor_pesquisador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `projeto`
--

INSERT INTO `projeto` (`nro_projeto`, `nome`, `orgao_financiador`, `data_ini`, `data_fim`, `orcamento`, `professor_pesquisador`) VALUES
(1, 'Projeto S', 'UDESC', '2023-11-16', '2023-11-30', 1000, 1),
(3, 'Projeto T', 'UDESC', '2023-02-20', '2023-03-30', 30000, 2),
(4, 'Projeto H', 'Udesc', '2023-08-06', '2024-05-17', 10000, 3);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`cod_curso`),
  ADD KEY `fk_nro_departamento` (`nro_departamento`);

--
-- Índices de tabela `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`nro_departamento`);

--
-- Índices de tabela `estudante`
--
ALTER TABLE `estudante`
  ADD PRIMARY KEY (`nro_matricula`),
  ADD KEY `fk_cod_curso` (`cod_curso`),
  ADD KEY `fk_prof_supervisor` (`prof_supervisor`),
  ADD KEY `fk_estudante_conselheiro` (`estudante_conselheiro`);

--
-- Índices de tabela `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`nro_matricula`),
  ADD KEY `fk_prof_departamento` (`prof_departamento`);

--
-- Índices de tabela `projeto`
--
ALTER TABLE `projeto`
  ADD PRIMARY KEY (`nro_projeto`),
  ADD KEY `fk_professor_pesquisador` (`professor_pesquisador`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `curso`
--
ALTER TABLE `curso`
  MODIFY `cod_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `departamento`
--
ALTER TABLE `departamento`
  MODIFY `nro_departamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `estudante`
--
ALTER TABLE `estudante`
  MODIFY `nro_matricula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `professor`
--
ALTER TABLE `professor`
  MODIFY `nro_matricula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `projeto`
--
ALTER TABLE `projeto`
  MODIFY `nro_projeto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `curso`
--
ALTER TABLE `curso`
  ADD CONSTRAINT `fk_nro_departamento` FOREIGN KEY (`nro_departamento`) REFERENCES `departamento` (`nro_departamento`);

--
-- Restrições para tabelas `estudante`
--
ALTER TABLE `estudante`
  ADD CONSTRAINT `fk_cod_curso` FOREIGN KEY (`cod_curso`) REFERENCES `curso` (`cod_curso`),
  ADD CONSTRAINT `fk_estudante_conselheiro` FOREIGN KEY (`estudante_conselheiro`) REFERENCES `estudante` (`nro_matricula`),
  ADD CONSTRAINT `fk_prof_supervisor` FOREIGN KEY (`prof_supervisor`) REFERENCES `professor` (`nro_matricula`);

--
-- Restrições para tabelas `professor`
--
ALTER TABLE `professor`
  ADD CONSTRAINT `fk_prof_departamento` FOREIGN KEY (`prof_departamento`) REFERENCES `departamento` (`nro_departamento`);

--
-- Restrições para tabelas `projeto`
--
ALTER TABLE `projeto`
  ADD CONSTRAINT `fk_professor_pesquisador` FOREIGN KEY (`professor_pesquisador`) REFERENCES `professor` (`nro_matricula`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
