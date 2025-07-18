--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: caracteristicas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.caracteristicas (
    id integer NOT NULL,
    nome character varying(100) NOT NULL
);


ALTER TABLE public.caracteristicas OWNER TO postgres;

--
-- Name: caracteristicas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.caracteristicas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.caracteristicas_id_seq OWNER TO postgres;

--
-- Name: caracteristicas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.caracteristicas_id_seq OWNED BY public.caracteristicas.id;


--
-- Name: corretores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.corretores (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    creci character varying(20) NOT NULL,
    creci_uf character(2) NOT NULL,
    data_registro date NOT NULL,
    bio text,
    ativo boolean DEFAULT true,
    id_imobiliaria integer
);


ALTER TABLE public.corretores OWNER TO postgres;

--
-- Name: corretores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.corretores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.corretores_id_seq OWNER TO postgres;

--
-- Name: corretores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.corretores_id_seq OWNED BY public.corretores.id;


--
-- Name: estados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estados (
    id integer NOT NULL,
    sigla character(2) NOT NULL,
    nome character varying(30) NOT NULL,
    regiao_id integer NOT NULL
);


ALTER TABLE public.estados OWNER TO postgres;

--
-- Name: favoritos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favoritos (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    imovel_id integer NOT NULL,
    data_cadastro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.favoritos OWNER TO postgres;

--
-- Name: favoritos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favoritos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favoritos_id_seq OWNER TO postgres;

--
-- Name: favoritos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favoritos_id_seq OWNED BY public.favoritos.id;


--
-- Name: imobiliarias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.imobiliarias (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    cnpj character varying(18) NOT NULL,
    telefone character varying(20) NOT NULL,
    email character varying(100) NOT NULL,
    endereco text NOT NULL,
    data_cadastro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.imobiliarias OWNER TO postgres;

--
-- Name: imobiliarias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.imobiliarias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.imobiliarias_id_seq OWNER TO postgres;

--
-- Name: imobiliarias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.imobiliarias_id_seq OWNED BY public.imobiliarias.id;


--
-- Name: imoveis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.imoveis (
    id integer NOT NULL,
    titulo character varying(100) NOT NULL,
    descricao text,
    subtipo_id integer NOT NULL,
    tipoimovel_id integer NOT NULL,
    preco numeric(12,2) NOT NULL,
    area integer,
    quartos integer,
    banheiros integer,
    vagas_garagem integer,
    endereco character varying(200) NOT NULL,
    numero character varying(20),
    complemento character varying(100),
    bairro character varying(100) NOT NULL,
    cidade character varying(100) NOT NULL,
    estado character(2) NOT NULL,
    cep character varying(9),
    latitude numeric(10,8),
    longitude numeric(11,8),
    data_cadastro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    disponivel boolean DEFAULT true,
    destaque boolean DEFAULT false,
    imagens text[],
    id_proprietario integer,
    id_corretor integer,
    area_util_hectares numeric(10,2),
    area_total_hectares numeric(10,2),
    salas integer,
    andar integer,
    area_privativa numeric(10,2),
    area_comum numeric(10,2),
    suites integer,
    mobiliado boolean DEFAULT false,
    aceita_animais boolean DEFAULT false,
    views integer DEFAULT 0,
    estado_id integer,
    valor_iptu numeric(12,2),
    valor_condominio numeric(12,2)
);


ALTER TABLE public.imoveis OWNER TO postgres;

--
-- Name: imoveis_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.imoveis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.imoveis_id_seq OWNER TO postgres;

--
-- Name: imoveis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.imoveis_id_seq OWNED BY public.imoveis.id;


--
-- Name: imovel_caracteristicas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.imovel_caracteristicas (
    id integer NOT NULL,
    imovel_id integer NOT NULL,
    caracteristica_id integer NOT NULL
);


ALTER TABLE public.imovel_caracteristicas OWNER TO postgres;

--
-- Name: imovel_caracteristicas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.imovel_caracteristicas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.imovel_caracteristicas_id_seq OWNER TO postgres;

--
-- Name: imovel_caracteristicas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.imovel_caracteristicas_id_seq OWNED BY public.imovel_caracteristicas.id;


--
-- Name: regioes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.regioes (
    id integer NOT NULL,
    sigla character(2) NOT NULL,
    nome character varying(20) NOT NULL
);


ALTER TABLE public.regioes OWNER TO postgres;

--
-- Name: regioes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.regioes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.regioes_id_seq OWNER TO postgres;

--
-- Name: regioes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.regioes_id_seq OWNED BY public.regioes.id;


--
-- Name: subtipos_imovel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subtipos_imovel (
    id integer NOT NULL,
    tipo_id integer NOT NULL,
    nome character varying(30) NOT NULL,
    nome_exibicao character varying(50) NOT NULL
);


ALTER TABLE public.subtipos_imovel OWNER TO postgres;

--
-- Name: subtipos_imovel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subtipos_imovel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subtipos_imovel_id_seq OWNER TO postgres;

--
-- Name: subtipos_imovel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subtipos_imovel_id_seq OWNED BY public.subtipos_imovel.id;


--
-- Name: tipos_imovel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipos_imovel (
    id integer NOT NULL,
    nome character varying(20) NOT NULL
);


ALTER TABLE public.tipos_imovel OWNER TO postgres;

--
-- Name: tipos_imovel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipos_imovel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipos_imovel_id_seq OWNER TO postgres;

--
-- Name: tipos_imovel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipos_imovel_id_seq OWNED BY public.tipos_imovel.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    senha_hash character varying(255) NOT NULL,
    telefone character varying(20) NOT NULL,
    cpf character varying(14) NOT NULL,
    tipo character varying(20) NOT NULL,
    data_cadastro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    data_nascimento date,
    CONSTRAINT usuarios_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['particular'::character varying, 'corretor'::character varying, 'cliente'::character varying, 'admin'::character varying])::text[])))
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: caracteristicas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristicas ALTER COLUMN id SET DEFAULT nextval('public.caracteristicas_id_seq'::regclass);


--
-- Name: corretores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.corretores ALTER COLUMN id SET DEFAULT nextval('public.corretores_id_seq'::regclass);


--
-- Name: favoritos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos ALTER COLUMN id SET DEFAULT nextval('public.favoritos_id_seq'::regclass);


--
-- Name: imobiliarias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imobiliarias ALTER COLUMN id SET DEFAULT nextval('public.imobiliarias_id_seq'::regclass);


--
-- Name: imoveis id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imoveis ALTER COLUMN id SET DEFAULT nextval('public.imoveis_id_seq'::regclass);


--
-- Name: imovel_caracteristicas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imovel_caracteristicas ALTER COLUMN id SET DEFAULT nextval('public.imovel_caracteristicas_id_seq'::regclass);


--
-- Name: regioes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regioes ALTER COLUMN id SET DEFAULT nextval('public.regioes_id_seq'::regclass);


--
-- Name: subtipos_imovel id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipos_imovel ALTER COLUMN id SET DEFAULT nextval('public.subtipos_imovel_id_seq'::regclass);


--
-- Name: tipos_imovel id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_imovel ALTER COLUMN id SET DEFAULT nextval('public.tipos_imovel_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: caracteristicas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.caracteristicas (id, nome) FROM stdin;
1	Aceita financiamento
2	Aceita permuta
3	Água
4	Asfalto
5	Calçada
6	Elevador
7	Esgoto
8	Imóvel alugado com renda
9	Imóvel de Leilão
10	Muro
11	Piso tátil
12	Rampa de acessibilidade
13	Rede elétrica
14	WC adaptado
15	piscina
16	varanda
17	academia
\.


--
-- Data for Name: corretores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.corretores (id, usuario_id, creci, creci_uf, data_registro, bio, ativo, id_imobiliaria) FROM stdin;
1	40	12349F	MS	2025-07-18	Especialista em vendas de apartamentos na região central.	t	\N
20	32	C12345	SP	2025-07-18	Corretor experiente em imóveis residenciais.	t	\N
21	33	C12346	SP	2025-07-18	Especialista em imóveis comerciais.	t	\N
22	30	C12347	RJ	2025-07-18	Atuação focada na zona sul do Rio.	t	\N
23	36	C12348	MG	2025-07-18	Corretor rural e urbano.	t	\N
24	39	C12349	BA	2025-07-18	Ampla experiência em locação.	t	\N
\.


--
-- Data for Name: estados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estados (id, sigla, nome, regiao_id) FROM stdin;
1	RO	Rondônia	1
2	AC	Acre	1
3	AM	Amazonas	1
4	RR	Roraima	1
5	PA	Pará	1
6	AP	Amapá	1
7	TO	Tocantins	1
8	MA	Maranhão	2
9	PI	Piauí	2
10	CE	Ceará	2
11	RN	Rio Grande do Norte	2
12	PB	Paraíba	2
13	PE	Pernambuco	2
14	AL	Alagoas	2
16	SE	Sergipe	2
17	BA	Bahia	2
18	MG	Minas Gerais	3
19	ES	Espírito Santo	3
20	RJ	Rio de Janeiro	3
22	SP	São Paulo	3
23	PR	Paraná	4
24	SC	Santa Catarina	4
25	RS	Rio Grande do Sul	4
26	MS	Mato Grosso do Sul	5
27	MT	Mato Grosso	5
28	GO	Goiás	5
29	DF	Distrito Federal	5
\.


--
-- Data for Name: favoritos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favoritos (id, usuario_id, imovel_id, data_cadastro) FROM stdin;
\.


--
-- Data for Name: imobiliarias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.imobiliarias (id, nome, cnpj, telefone, email, endereco, data_cadastro) FROM stdin;
1	Imobiliária Nova Era	12.345.678/0001-01	1133445566	contato@novaera.com.br	Av. Brasil, 123 - Centro, São Paulo - SP	2025-03-31 13:36:44.063869
2	Imóveis Ideal	98.765.432/0001-02	1144556677	vendas@ideal.com.br	Rua das Palmeiras, 456 - Campinas - SP	2025-04-05 13:36:44.063869
3	Confiar Imóveis	23.456.789/0001-03	1155667788	contato@confiar.com.br	Av. Getúlio Vargas, 890 - BH - MG	2025-04-10 13:36:44.063869
4	Habitar Real	34.567.890/0001-04	1166778899	suporte@habitarreal.com	Rua do Comércio, 200 - Porto Alegre - RS	2025-04-15 13:36:44.063869
5	Casa & Cia	45.678.901/0001-05	1177889900	atendimento@casaecia.com.br	Rua Dom Pedro II, 33 - Curitiba - PR	2025-04-20 13:36:44.063869
6	Lopes Imobiliária	56.789.012/0001-06	1188990011	lopes@lopesimoveis.com	Rua XV de Novembro, 77 - Recife - PE	2025-04-25 13:36:44.063869
7	Morar Bem	67.890.123/0001-07	1199001122	contato@morarbem.com	Av. Paulista, 1000 - São Paulo - SP	2025-04-30 13:36:44.063869
8	Residencial Alpha	78.901.234/0001-08	1199112233	vendas@alpharesidencial.com	Rua das Flores, 150 - Salvador - BA	2025-05-05 13:36:44.063869
9	Prime Imóveis	89.012.345/0001-09	1199223344	prime@primeimoveis.com.br	Rua Augusta, 123 - São Paulo - SP	2025-05-10 13:36:44.063869
10	Top Lar	90.123.456/0001-10	1199334455	contato@toplar.com.br	Av. Atlântica, 2500 - RJ - RJ	2025-05-15 13:36:44.063869
11	Imóvel Certo	11.223.344/0001-11	1199445566	contato@imovelcerto.com.br	Rua Verde, 321 - Goiânia - GO	2025-05-20 13:36:44.063869
12	Realiza Imóveis	12.334.455/0001-12	1199556677	vendas@realiza.com	Av. Central, 654 - Florianópolis - SC	2025-05-25 13:36:44.063869
13	Jardins Imóveis	13.445.566/0001-13	1199667788	jardins@imoveis.com.br	Rua do Sol, 87 - Natal - RN	2025-05-30 13:36:44.063869
14	Sul Imobiliária	14.556.677/0001-14	1199778899	sul@sulimobiliaria.com	Av. Bento Gonçalves, 910 - Porto Alegre - RS	2025-06-04 13:36:44.063869
15	Centro Imóveis	15.667.788/0001-15	1199889900	centro@imoveis.com.br	Praça da Matriz, 44 - Belo Horizonte - MG	2025-06-09 13:36:44.063869
16	Alto Padrão Imóveis	16.778.899/0001-16	1199001122	contato@altopadrao.com	Rua da Paz, 55 - Brasília - DF	2025-06-14 13:36:44.063869
17	Sol Nascente Imobiliária	17.889.900/0001-17	1199112233	sol@solnascente.com	Rua Aurora, 88 - Fortaleza - CE	2025-06-19 13:36:44.063869
18	Boa Morada	18.990.011/0001-18	1199223344	vendas@boamorada.com.br	Rua das Mangueiras, 120 - Manaus - AM	2025-06-24 13:36:44.063869
19	Imóveis do Vale	19.101.122/0001-19	1199334455	atendimento@valeimoveis.com	Av. São João, 70 - São José dos Campos - SP	2025-06-29 13:36:44.063869
20	Estilo Lar	20.212.233/0001-20	1199445566	estilo@lar.com.br	Rua Harmonia, 99 - Santos - SP	2025-07-04 13:36:44.063869
\.


--
-- Data for Name: imoveis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.imoveis (id, titulo, descricao, subtipo_id, tipoimovel_id, preco, area, quartos, banheiros, vagas_garagem, endereco, numero, complemento, bairro, cidade, estado, cep, latitude, longitude, data_cadastro, data_atualizacao, disponivel, destaque, imagens, id_proprietario, id_corretor, area_util_hectares, area_total_hectares, salas, andar, area_privativa, area_comum, suites, mobiliado, aceita_animais, views, estado_id, valor_iptu, valor_condominio) FROM stdin;
49	Apartamento no Centro	Apartamento com ótima localização e área de lazer completa.	1	1	450000.00	85	3	2	1	Av. Afonso Pena	1200	Bloco B - Apto 202	Centro	Campo Grande	MS	79002000	-20.44850000	-54.62000000	2025-07-18 13:52:18.254499	2025-07-18 13:52:18.254499	t	f	{img1.jpg,img2.jpg}	31	21	\N	\N	1	2	85.50	20.00	1	t	t	0	\N	1200.00	650.00
\.


--
-- Data for Name: imovel_caracteristicas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.imovel_caracteristicas (id, imovel_id, caracteristica_id) FROM stdin;
\.


--
-- Data for Name: regioes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.regioes (id, sigla, nome) FROM stdin;
1	N 	Norte
2	NE	Nordeste
3	SE	Sudeste
4	S 	Sul
5	CO	Centro-Oeste
\.


--
-- Data for Name: subtipos_imovel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subtipos_imovel (id, tipo_id, nome, nome_exibicao) FROM stdin;
1	1	apart_hotel_flat_loft	Apart Hotel / Flat / Loft
2	1	apartamento	Apartamento
3	1	apto_cobertura_duplex	Apto. Cobertura / Duplex
4	1	casa_de_vila	Casa de Vila
5	1	casa_terrea	Casa-Térrea
6	1	casa_terrea_condominio	Casa-Térrea-Condomínio
7	1	kitnet	Kitnet
8	1	sobrado	Sobrado
9	1	sobrado_condominio	Sobrado-Condomínio
10	1	studio	Studio
11	1	terreno	Terreno
12	1	terreno_condominio	Terreno-Condomínio
13	2	area	Área
14	2	casa_comercial	Casa Comercial
15	2	galpao_deposito	Galpão / Depósito
16	2	imovel_comercial	Imóvel Comercial
17	2	industria_fabrica	Indústria / Fábrica
18	2	ponto_comercial_box	Ponto Comercial / Box
19	2	pousada_hotel_motel	Pousada / Hotel / Motel
20	2	sala_salao_loja	Sala / Salão / Loja
21	3	chacara	Chácara
22	3	fazenda	Fazenda
23	3	haras	Haras
24	3	pesqueiro	Pesqueiro
25	3	sitio	Sítio
\.


--
-- Data for Name: tipos_imovel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipos_imovel (id, nome) FROM stdin;
1	residencial
2	comercial
3	rural
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nome, email, senha_hash, telefone, cpf, tipo, data_cadastro, data_nascimento) FROM stdin;
32	Carlos Souza	carlos@email.com	hash123	11999990003	12345678903	corretor	2025-07-18 13:01:37.447623	1985-03-15
33	Daniela Lima	daniela@email.com	hash123	11999990004	12345678904	corretor	2025-07-18 13:01:37.447623	1992-01-30
34	Eduardo Rocha	eduardo@email.com	hash123	11999990005	12345678905	particular	2025-07-18 13:01:37.447623	1983-08-10
35	Fernanda Alves	fernanda@email.com	hash123	11999990006	12345678906	particular	2025-07-18 13:01:37.447623	1995-11-19
30	Ana Silva	ana@email.com	hash123	11999990001	12345678901	corretor	2025-07-18 13:01:37.447623	1990-05-12
31	Bruno Costa	bruno@email.com	hash123	11999990002	12345678902	particular	2025-07-18 13:01:37.447623	1988-07-23
36	Gabriel Torres	gabriel@email.com	hash123	11999990007	12345678907	corretor	2025-07-18 13:01:37.447623	1989-12-03
37	Helena Martins	helena@email.com	hash123	11999990008	12345678908	particular	2025-07-18 13:01:37.447623	1991-06-25
38	Igor Fernandes	igor@email.com	hash123	11999990009	12345678909	particular	2025-07-18 13:01:37.447623	1996-04-08
39	Juliana Ribeiro	juliana@email.com	hash123	11999990010	12345678910	corretor	2025-07-18 13:01:37.447623	1994-09-14
40	Erick Corretor	erickcorretor@email.com.br	$2b$10$evnO5y.3J.FPnvPtYdTCFuvXFpoALfjUUd1nN5zQ30ns1nGk9DR0W	11999990015	12345678915	corretor	2025-07-18 17:44:50.4	1985-03-15
\.


--
-- Name: caracteristicas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.caracteristicas_id_seq', 17, true);


--
-- Name: corretores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.corretores_id_seq', 24, true);


--
-- Name: favoritos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favoritos_id_seq', 11, true);


--
-- Name: imobiliarias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.imobiliarias_id_seq', 1, false);


--
-- Name: imoveis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.imoveis_id_seq', 49, true);


--
-- Name: imovel_caracteristicas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.imovel_caracteristicas_id_seq', 5, true);


--
-- Name: regioes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.regioes_id_seq', 1, false);


--
-- Name: subtipos_imovel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subtipos_imovel_id_seq', 25, true);


--
-- Name: tipos_imovel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_imovel_id_seq', 3, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 40, true);


--
-- Name: caracteristicas caracteristicas_nome_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristicas
    ADD CONSTRAINT caracteristicas_nome_key UNIQUE (nome);


--
-- Name: caracteristicas caracteristicas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristicas
    ADD CONSTRAINT caracteristicas_pkey PRIMARY KEY (id);


--
-- Name: corretores corretores_creci_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.corretores
    ADD CONSTRAINT corretores_creci_key UNIQUE (creci);


--
-- Name: corretores corretores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.corretores
    ADD CONSTRAINT corretores_pkey PRIMARY KEY (id);


--
-- Name: corretores corretores_usuario_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.corretores
    ADD CONSTRAINT corretores_usuario_id_key UNIQUE (usuario_id);


--
-- Name: estados estados_nome_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados
    ADD CONSTRAINT estados_nome_key UNIQUE (nome);


--
-- Name: estados estados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados
    ADD CONSTRAINT estados_pkey PRIMARY KEY (id);


--
-- Name: estados estados_sigla_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados
    ADD CONSTRAINT estados_sigla_key UNIQUE (sigla);


--
-- Name: favoritos favoritos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_pkey PRIMARY KEY (id);


--
-- Name: imobiliarias imobiliarias_cnpj_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imobiliarias
    ADD CONSTRAINT imobiliarias_cnpj_key UNIQUE (cnpj);


--
-- Name: imobiliarias imobiliarias_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imobiliarias
    ADD CONSTRAINT imobiliarias_email_key UNIQUE (email);


--
-- Name: imobiliarias imobiliarias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imobiliarias
    ADD CONSTRAINT imobiliarias_pkey PRIMARY KEY (id);


--
-- Name: imoveis imoveis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imoveis
    ADD CONSTRAINT imoveis_pkey PRIMARY KEY (id);


--
-- Name: imovel_caracteristicas imovel_caracteristicas_imovel_id_caracteristica_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imovel_caracteristicas
    ADD CONSTRAINT imovel_caracteristicas_imovel_id_caracteristica_id_key UNIQUE (imovel_id, caracteristica_id);


--
-- Name: imovel_caracteristicas imovel_caracteristicas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imovel_caracteristicas
    ADD CONSTRAINT imovel_caracteristicas_pkey PRIMARY KEY (id);


--
-- Name: regioes regioes_nome_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regioes
    ADD CONSTRAINT regioes_nome_key UNIQUE (nome);


--
-- Name: regioes regioes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regioes
    ADD CONSTRAINT regioes_pkey PRIMARY KEY (id);


--
-- Name: regioes regioes_sigla_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regioes
    ADD CONSTRAINT regioes_sigla_key UNIQUE (sigla);


--
-- Name: subtipos_imovel subtipos_imovel_nome_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipos_imovel
    ADD CONSTRAINT subtipos_imovel_nome_key UNIQUE (nome);


--
-- Name: subtipos_imovel subtipos_imovel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipos_imovel
    ADD CONSTRAINT subtipos_imovel_pkey PRIMARY KEY (id);


--
-- Name: subtipos_imovel subtipos_imovel_tipo_id_nome_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipos_imovel
    ADD CONSTRAINT subtipos_imovel_tipo_id_nome_key UNIQUE (tipo_id, nome);


--
-- Name: tipos_imovel tipos_imovel_nome_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_imovel
    ADD CONSTRAINT tipos_imovel_nome_key UNIQUE (nome);


--
-- Name: tipos_imovel tipos_imovel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_imovel
    ADD CONSTRAINT tipos_imovel_pkey PRIMARY KEY (id);


--
-- Name: favoritos unique_favorito; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT unique_favorito UNIQUE (usuario_id, imovel_id);


--
-- Name: usuarios usuarios_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_cpf_key UNIQUE (cpf);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: corretores corretores_id_imobiliaria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.corretores
    ADD CONSTRAINT corretores_id_imobiliaria_fkey FOREIGN KEY (id_imobiliaria) REFERENCES public.imobiliarias(id);


--
-- Name: corretores corretores_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.corretores
    ADD CONSTRAINT corretores_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: estados estados_regiao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados
    ADD CONSTRAINT estados_regiao_id_fkey FOREIGN KEY (regiao_id) REFERENCES public.regioes(id);


--
-- Name: favoritos favoritos_imovel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_imovel_id_fkey FOREIGN KEY (imovel_id) REFERENCES public.imoveis(id) ON DELETE CASCADE;


--
-- Name: favoritos favoritos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: imoveis imoveis_id_corretor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imoveis
    ADD CONSTRAINT imoveis_id_corretor_fkey FOREIGN KEY (id_corretor) REFERENCES public.corretores(id);


--
-- Name: imoveis imoveis_id_proprietario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imoveis
    ADD CONSTRAINT imoveis_id_proprietario_fkey FOREIGN KEY (id_proprietario) REFERENCES public.usuarios(id);


--
-- Name: imoveis imoveis_subtipo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imoveis
    ADD CONSTRAINT imoveis_subtipo_id_fkey FOREIGN KEY (subtipo_id) REFERENCES public.subtipos_imovel(id);


--
-- Name: imoveis imoveis_tipoimovel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imoveis
    ADD CONSTRAINT imoveis_tipoimovel_id_fkey FOREIGN KEY (tipoimovel_id) REFERENCES public.tipos_imovel(id);


--
-- Name: imovel_caracteristicas imovel_caracteristicas_caracteristica_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imovel_caracteristicas
    ADD CONSTRAINT imovel_caracteristicas_caracteristica_id_fkey FOREIGN KEY (caracteristica_id) REFERENCES public.caracteristicas(id) ON DELETE CASCADE;


--
-- Name: imovel_caracteristicas imovel_caracteristicas_imovel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imovel_caracteristicas
    ADD CONSTRAINT imovel_caracteristicas_imovel_id_fkey FOREIGN KEY (imovel_id) REFERENCES public.imoveis(id) ON DELETE CASCADE;


--
-- Name: subtipos_imovel subtipos_imovel_tipo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subtipos_imovel
    ADD CONSTRAINT subtipos_imovel_tipo_id_fkey FOREIGN KEY (tipo_id) REFERENCES public.tipos_imovel(id);


--
-- PostgreSQL database dump complete
--

