--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6 (Debian 15.6-1.pgdg120+2)
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: yeticrab
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO yeticrab;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: yeticrab
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO yeticrab;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yeticrab
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: phones; Type: TABLE; Schema: public; Owner: yeticrab
--

CREATE TABLE public.phones (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    number character varying NOT NULL,
    "userId" uuid
);


ALTER TABLE public.phones OWNER TO yeticrab;

--
-- Name: users; Type: TABLE; Schema: public; Owner: yeticrab
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    surname character varying NOT NULL,
    patronymic character varying NOT NULL,
    city character varying NOT NULL,
    street character varying NOT NULL,
    house character varying NOT NULL,
    flat integer NOT NULL,
    avatar character varying
);


ALTER TABLE public.users OWNER TO yeticrab;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: yeticrab
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: yeticrab
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
14	1710960387480	AddUsersTable1710960387480
15	1710971674612	AddPhonesTable1710971674612
16	1711042602446	AddAvatarToUser1711042602446
\.


--
-- Data for Name: phones; Type: TABLE DATA; Schema: public; Owner: yeticrab
--

COPY public.phones (id, number, "userId") FROM stdin;
c1c9a588-45fa-4b33-9126-25ea8cd56eee	+70240709303	b01c7089-be74-41a4-a5df-9aaaef53e2e0
7725736c-7626-41c3-bdba-a861f1c951d4	+70878719884	f0a0de3a-fa50-4165-9a8e-f3e1a18c3658
d9e67875-6648-4ec4-aaf0-1e314d17daba	+70878769334	f0a0de3a-fa50-4165-9a8e-f3e1a18c3658
a94117b2-9f23-4098-9555-963c118a0596	+70584461663	d8ca8601-99a8-4794-af54-5a79fbbb6a5f
200f389b-ee1d-46e4-822c-98c275a617aa	+70654312563	b130ceeb-66eb-44a7-a497-4836a214f9d5
3fce98da-d2f0-41e6-9a13-3f304d3aa92e	+70564399563	b130ceeb-66eb-44a7-a497-4836a214f9d5
38695563-e21a-4354-ab80-14658849bcf6	+70571583602	92575b89-ff4b-4792-9623-7885b4c424cc
c0a875c2-1967-4b63-bf96-8d941b3705d0	+70753667437	506ef804-17e3-4941-a16e-4d2cea39fd1a
8340a02b-3cd2-43bb-bc6f-8bfea3223baf	+71231231215	\N
5e038416-d795-4bd6-80e2-4fc40f98b668	+78787873411	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: yeticrab
--

COPY public.users (id, name, surname, patronymic, city, street, house, flat, avatar) FROM stdin;
b01c7089-be74-41a4-a5df-9aaaef53e2e0	Hanna	Sampson	Sampsonov	Canton	Libero. St.	42	24	\N
f0a0de3a-fa50-4165-9a8e-f3e1a18c3658	Elizabeth	Henderson	Hendersonov	Pohang	Natoque St.	87-d	98	\N
d8ca8601-99a8-4794-af54-5a79fbbb6a5f	Miriam	Turner	Turnerov	Pohang	Ridiculus St.	986	3	\N
b130ceeb-66eb-44a7-a497-4836a214f9d5	Kieran	Kramer	Kramerov	Mjölby	Fermentum Avenue	43	32	\N
92575b89-ff4b-4792-9623-7885b4c424cc	Hadassah	Dunlap	Dunlapov	Kozhikode	Orci St.	123	8	\N
506ef804-17e3-4941-a16e-4d2cea39fd1a	Melodie	Molina	Molinava	Kozhikode	160 Id Av.	11	78	\N
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yeticrab
--

SELECT pg_catalog.setval('public.migrations_id_seq', 16, true);


--
-- Name: phones PK_30d7fc09a458d7a4d9471bda554; Type: CONSTRAINT; Schema: public; Owner: yeticrab
--

ALTER TABLE ONLY public.phones
    ADD CONSTRAINT "PK_30d7fc09a458d7a4d9471bda554" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: yeticrab
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: yeticrab
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: phones UQ_f6f7db95ce37aa48d13c1333ac6; Type: CONSTRAINT; Schema: public; Owner: yeticrab
--

ALTER TABLE ONLY public.phones
    ADD CONSTRAINT "UQ_f6f7db95ce37aa48d13c1333ac6" UNIQUE (number);


--
-- Name: phones FK_fa1d95d0c615b8f040ae4179955; Type: FK CONSTRAINT; Schema: public; Owner: yeticrab
--

ALTER TABLE ONLY public.phones
    ADD CONSTRAINT "FK_fa1d95d0c615b8f040ae4179955" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

