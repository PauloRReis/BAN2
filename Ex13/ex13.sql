-- 1) Recupere o CPF e o nome dos mecânicos que trabalham nos setores maiores que 100 e menores que 200.

create index id_mec_cods on mecanico using btree(cods);
drop index id_mec_cods;

explain analyse select cpf, nome from mecanico
where cods between 100 and 200;

-- 2) Recupere o CPF e nome dos mecânicos que atenderam no dia 13/06/2018.

explain analyse select cpf, nome from mecanico join conserto using(codm)
where data = '13/06/2018';

create index idx_con_data on conserto using hash(data);
drop index idx_con_data;

-- 3) Recupere o nome do mecânico, o nome do cliente e a hora do conserto
-- para os consertos realizados de 12/06/2018 à 25/09/2018.

explain analyse select m.nome, cli.nome, c.hora from mecanico m join conserto c
using (codm) join veiculo v using (codv) join cliente cli using (codc)
where c.data between '12/06/2018' and '25/09/2018';

create index idx_con_data on conserto using btree(data);
drop index idx_con_data;

-- 4) Recupere o nome e a função de todos os mecânicos, e o número e
-- o nome dos setores para os mecânicos que tenham essa informação.

explain analyse select m.nome, m.funcao, s.cods, s.nome
from mecanico m left join setor s using (cods);

create index id_mec_cods on mecanico using hash(cods);
drop index id_mec_cods;

-- 5) Recupere o nome de todos os mecânicos, e as datas dos consertos para os
-- mecânicos que têm consertos feitos (deve aparecer apenas um registro de
-- nome de mecânico para cada data de conserto).

explain analyse select distinct m.nome, c.data from mecanico m join conserto c
using (codm);

-- 6)  Recupere a média da quilometragem de todos os veículos dos clientes.

EXPLAIN ANALYSE SELECT AVG(v.quilometragem) AS media_quilometragem FROM veiculo v
JOIN cliente c ON v.codc = c.codc;


-- 7) Recupere a soma da quilometragem dos veículos de cada cidade onde
-- residem seus proprietários.

explain analyse select cidade, sum(quilometragem) from cliente join veiculo using(codc)
group by cidade;

create index idx_cli_cidade on cliente using btree(codc);
drop index idx_cli_cidade;

-- 8) Recupere a quantidade de consertos feitos por cada mecânico durante o período de 12/06/2018 até 19/010/2018

EXPLAIN ANALYSE SELECT m.nome AS nome_mecanico, COUNT(c.codm) AS quantidade_consertos FROM mecanico m 
LEFT JOIN conserto c ON m.codm = c.codm
WHERE c.data BETWEEN '2018-06-12' AND '2018-10-19' 
GROUP BY m.nome, m.codm ORDER BY quantidade_consertos DESC;

CREATE INDEX idx_mecanico_codm ON mecanico (codm);
DROP INDEX idx_mecanico_codm;

CREATE INDEX idx_conserto_codm_data ON conserto (codm, data);
DROP INDEX idx_conserto_codm_data;

-- 9) Recupere a quantidade de consertos feitos agrupada pela marca do veículo.

EXPLAIN ANALYSE SELECT v.marca, COUNT(c.codv) AS quantidade_consertos FROM veiculo v
LEFT JOIN conserto c ON v.codv = c.codv
GROUP BY v.marca ORDER BY quantidade_consertos DESC;

CREATE INDEX idx_veiculo_marca ON veiculo (marca);

CREATE INDEX idx_conserto_codv ON conserto (codv);





