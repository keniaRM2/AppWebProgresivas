--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Debian 14.6-1.pgdg110+1)
-- Dumped by pg_dump version 15.0

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
-- Name: reports; Type: DATABASE; Schema: -; Owner: postgres
--


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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: academic_divisions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.academic_divisions (
    id integer NOT NULL,
    name text NOT NULL,
    abbreviation text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    status_id integer NOT NULL
);


ALTER TABLE public.academic_divisions OWNER TO postgres;

--
-- Name: academic_divisions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.academic_divisions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.academic_divisions_id_seq OWNER TO postgres;

--
-- Name: academic_divisions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.academic_divisions_id_seq OWNED BY public.academic_divisions.id;


--
-- Name: annexes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.annexes (
    id bigint NOT NULL,
    name text NOT NULL,
    mime_type text NOT NULL,
    file text NOT NULL,
    incidence_id integer NOT NULL
);


ALTER TABLE public.annexes OWNER TO postgres;

--
-- Name: annexes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.annexes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.annexes_id_seq OWNER TO postgres;

--
-- Name: annexes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.annexes_id_seq OWNED BY public.annexes.id;


--
-- Name: areas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.areas (
    id bigint NOT NULL,
    name text NOT NULL,
    academic_division_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    status_id integer NOT NULL
);


ALTER TABLE public.areas OWNER TO postgres;

--
-- Name: areas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.areas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.areas_id_seq OWNER TO postgres;

--
-- Name: areas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.areas_id_seq OWNED BY public.areas.id;


--
-- Name: incidences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.incidences (
    id bigint NOT NULL,
    title text NOT NULL,
    incidence_date timestamp without time zone NOT NULL,
    location JSON,
    type text NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    user_reports_id integer NOT NULL,
    status_id integer NOT NULL
);


ALTER TABLE public.incidences OWNER TO postgres;

--
-- Name: incidences_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.incidences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.incidences_id_seq OWNER TO postgres;

--
-- Name: incidences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.incidences_id_seq OWNED BY public.incidences.id;


--
-- Name: people; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.people (
    id bigint NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    lastname text NOT NULL,
    birthdate timestamp without time zone NOT NULL,
    curp text NOT NULL,
    rfc text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.people OWNER TO postgres;

--
-- Name: people_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.people_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.people_id_seq OWNER TO postgres;

--
-- Name: people_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.people_id_seq OWNED BY public.people.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    role text NOT NULL,
    status_id integer NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: statuses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.statuses (
    id integer NOT NULL,
    status text NOT NULL
);


ALTER TABLE public.statuses OWNER TO postgres;

--
-- Name: statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.statuses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.statuses_id_seq OWNER TO postgres;

--
-- Name: statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.statuses_id_seq OWNED BY public.statuses.id;


--
-- Name: user_academic_division; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_academic_division (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    academic_division_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    status_id integer NOT NULL
);


ALTER TABLE public.user_academic_division OWNER TO postgres;

--
-- Name: user_academic_division_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_academic_division_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_academic_division_id_seq OWNER TO postgres;

--
-- Name: user_academic_division_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_academic_division_id_seq OWNED BY public.user_academic_division.id;


--
-- Name: user_area; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_area (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    area_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    status_id integer NOT NULL
);


ALTER TABLE public.user_area OWNER TO postgres;

--
-- Name: user_area_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_area_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_area_id_seq OWNER TO postgres;

--
-- Name: user_area_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_area_id_seq OWNED BY public.user_area.id;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: user_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_roles_id_seq OWNER TO postgres;

--
-- Name: user_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_roles_id_seq OWNED BY public.user_roles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    user_details json,
    type integer DEFAULT 1 NOT NULL,
    status_id integer NOT NULL,
    person_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: academic_divisions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_divisions ALTER COLUMN id SET DEFAULT nextval('public.academic_divisions_id_seq'::regclass);


--
-- Name: annexes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.annexes ALTER COLUMN id SET DEFAULT nextval('public.annexes_id_seq'::regclass);


--
-- Name: areas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.areas ALTER COLUMN id SET DEFAULT nextval('public.areas_id_seq'::regclass);


--
-- Name: incidences id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.incidences ALTER COLUMN id SET DEFAULT nextval('public.incidences_id_seq'::regclass);


--
-- Name: people id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people ALTER COLUMN id SET DEFAULT nextval('public.people_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: statuses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.statuses ALTER COLUMN id SET DEFAULT nextval('public.statuses_id_seq'::regclass);


--
-- Name: user_academic_division id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_academic_division ALTER COLUMN id SET DEFAULT nextval('public.user_academic_division_id_seq'::regclass);


--
-- Name: user_area id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_area ALTER COLUMN id SET DEFAULT nextval('public.user_area_id_seq'::regclass);


--
-- Name: user_roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles ALTER COLUMN id SET DEFAULT nextval('public.user_roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: academic_divisions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.academic_divisions (id, name, abbreviation, created_at, status_id) VALUES (1, 'Divisón Académica de Tecnologías de la Información y Diseño', 'DATID', '2023-10-11 00:18:52.271302', 1);
INSERT INTO public.academic_divisions (id, name, abbreviation, created_at, status_id) VALUES (2, 'División Académica Económico Administrativa', 'DACEA', '2023-10-11 00:18:52.271302', 1);


--
-- Data for Name: annexes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: areas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.areas (id, name, academic_division_id, created_at, status_id) VALUES (2, 'Centro de Desarrollo de Software', 1, '2023-10-11 00:20:19.132561', 1);
INSERT INTO public.areas (id, name, academic_division_id, created_at, status_id) VALUES (1, 'Tecnologías de la Información Oficinas', 1, '2023-10-11 00:20:19.132561', 1);


--
-- Data for Name: incidences; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: people; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.people (id, name, surname, lastname, birthdate, curp, rfc, created_at) VALUES (DEFAULT, 'Angel', 'Moreno', 'Velasquez', '1998-01-19 00:00:00', 'MOVM9810191', 'MOVM9810191213', '2023-10-17 18:50:05.285661');
INSERT INTO public.people (id, name, surname, lastname, birthdate, curp, rfc, created_at) VALUES (DEFAULT, 'Angel', 'Moreno', 'Velasquez', '1998-01-19 00:00:00', 'MOVM9810192', 'MOVM9810191214', '2023-10-17 18:50:05.285661');
INSERT INTO public.people (id, name, surname, lastname, birthdate, curp, rfc, created_at) VALUES (DEFAULT, 'Angel', 'Moreno', 'Velasquez', '1998-01-19 00:00:00', 'MOVM9810193', 'MOVM9810191215', '2023-10-17 18:50:05.285661');


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles (id, role, status_id) VALUES (1, 'DIRECTOR', 1);
INSERT INTO public.roles (id, role, status_id) VALUES (2, 'ENCARGADO', 1);
INSERT INTO public.roles (id, role, status_id) VALUES (3, 'EMPLEADO', 1);


--
-- Data for Name: statuses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.statuses (id, status) VALUES (1, 'Activo');
INSERT INTO public.statuses (id, status) VALUES (2, 'Inactivo');


--
-- Data for Name: user_academic_division; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_area; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_roles (id, created_at, user_id, role_id) VALUES (1, '2023-10-17 18:50:05.285661', 1, 2);
INSERT INTO public.user_roles (id, created_at, user_id, role_id) VALUES (2, '2023-10-17 18:50:05.285661', 2, 3);
INSERT INTO public.user_roles (id, created_at, user_id, role_id) VALUES (3, '2023-10-17 18:50:05.285661', 3, 1);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, username, password, user_details, type, status_id, person_id) VALUES (DEFAULT, 'erielit', '$2a$15$uXmm.x6BstopTwO6MarTe.seIaJOhWalM4W6EnsLr8.9GeKz5VcUq', NULL, 2, 1, 1);
INSERT INTO public.users (id, username, password, user_details, type, status_id, person_id) VALUES (DEFAULT, 'docent', '$2a$15$uXmm.x6BstopTwO6MarTe.seIaJOhWalM4W6EnsLr8.9GeKz5VcUq', NULL, 2, 1, 2);
INSERT INTO public.users (id, username, password, user_details, type, status_id, person_id) VALUES (DEFAULT, 'director', '$2a$15$uXmm.x6BstopTwO6MarTe.seIaJOhWalM4W6EnsLr8.9GeKz5VcUq', NULL, 2, 1, 3);


--
-- Name: academic_divisions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.academic_divisions_id_seq', 2, true);


--
-- Name: annexes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.annexes_id_seq', 1, false);


--
-- Name: areas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.areas_id_seq', 2, true);


--
-- Name: incidences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.incidences_id_seq', 1, false);


--
-- Name: people_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.people_id_seq', 7, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.statuses_id_seq', 2, true);


--
-- Name: user_academic_division_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_academic_division_id_seq', 1, false);


--
-- Name: user_area_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_area_id_seq', 1, false);


--
-- Name: user_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_roles_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: academic_divisions academic_divisions_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_divisions
    ADD CONSTRAINT academic_divisions_name_key UNIQUE (name);


--
-- Name: academic_divisions academic_divisions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_divisions
    ADD CONSTRAINT academic_divisions_pkey PRIMARY KEY (id);


--
-- Name: annexes annexes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.annexes
    ADD CONSTRAINT annexes_pkey PRIMARY KEY (id);


--
-- Name: areas areas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.areas
    ADD CONSTRAINT areas_pkey PRIMARY KEY (id);


--
-- Name: incidences incidences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.incidences
    ADD CONSTRAINT incidences_pkey PRIMARY KEY (id);


--
-- Name: people people_curp_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_curp_key UNIQUE (curp);


--
-- Name: people people_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_pkey PRIMARY KEY (id);


--
-- Name: people people_rfc_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_rfc_key UNIQUE (rfc);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: statuses statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (id);


--
-- Name: user_academic_division user_academic_division_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_academic_division
    ADD CONSTRAINT user_academic_division_pkey PRIMARY KEY (id);


--
-- Name: user_area user_area_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_area
    ADD CONSTRAINT user_area_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: academic_divisions fk_academic_division_status; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.academic_divisions
    ADD CONSTRAINT fk_academic_division_status FOREIGN KEY (status_id) REFERENCES public.statuses(id);


--
-- Name: annexes fk_annexe_incidence; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.annexes
    ADD CONSTRAINT fk_annexe_incidence FOREIGN KEY (incidence_id) REFERENCES public.incidences(id);


--
-- Name: areas fk_area_academic_division; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.areas
    ADD CONSTRAINT fk_area_academic_division FOREIGN KEY (academic_division_id) REFERENCES public.academic_divisions(id);


--
-- Name: areas fk_area_status; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.areas
    ADD CONSTRAINT fk_area_status FOREIGN KEY (status_id) REFERENCES public.statuses(id);


--
-- Name: incidences fk_incidence_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.incidences
    ADD CONSTRAINT fk_incidence_area_user FOREIGN KEY (user_reports_id) REFERENCES public.user_area(id);


--
-- Name: roles fk_roles_status; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT fk_roles_status FOREIGN KEY (status_id) REFERENCES public.statuses(id);


--
-- Name: user_academic_division fk_user_academic_division; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_academic_division
    ADD CONSTRAINT fk_user_academic_division FOREIGN KEY (academic_division_id) REFERENCES public.academic_divisions(id);


--
-- Name: user_area fk_user_area_areas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_area
    ADD CONSTRAINT fk_user_area_areas FOREIGN KEY (area_id) REFERENCES public.areas(id);


--
-- Name: user_roles fk_user_role_roles; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fk_user_role_roles FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: user_roles fk_user_role_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fk_user_role_users FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_academic_division fk_user_status; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_academic_division
    ADD CONSTRAINT fk_user_status FOREIGN KEY (status_id) REFERENCES public.statuses(id);


--
-- Name: user_area fk_user_status; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_area
    ADD CONSTRAINT fk_user_status FOREIGN KEY (status_id) REFERENCES public.statuses(id);


--
-- Name: users fk_users_people; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_users_people FOREIGN KEY (person_id) REFERENCES public.people(id);


--
-- Name: users fk_users_status; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_users_status FOREIGN KEY (status_id) REFERENCES public.statuses(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
INSERT INTO public.statuses (id, status)
VALUES (DEFAULT, 'Pendiente');

INSERT INTO public.statuses (id, status)
VALUES (DEFAULT, 'Aceptada');

INSERT INTO public.statuses (id, status)
VALUES (DEFAULT, 'Aprobada');

INSERT INTO public.statuses (id, status)
VALUES (DEFAULT, 'Rechazada');

INSERT INTO public.user_area (id, user_id, area_id, created_at, status_id) VALUES (DEFAULT, 2, 2, DEFAULT, 1);
INSERT INTO public.incidences (id, title, incidence_date, location, type, description, created_at, user_reports_id, status_id)VALUES (DEFAULT, 'Incidencia prueba', '2023-12-05 08:30:00.000000', '"{}"', 'Justificante', 'Desc', DEFAULT, 1, 1);

