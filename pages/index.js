import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

function ProfileSidebar(propriedades) {
    return (
        <Box as="aside">
            <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
            <hr />

            <p>
                <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
                    @{propriedades.githubUser}
                </a>

            </p>

            <hr />

            <AlurakutProfileSidebarMenuDefault />

        </Box>
    )
}



function ProfileRelationsBox(propriedades) {
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                {propriedades.title} ({propriedades.items.length})
            </h2>
            <ul>
                {propriedades.items.slice(0, 6).map((itemAtual) => {
                    return (
                        <li key={itemAtual.id}>
                            <a href={`https://github.com/${itemAtual.title}`}>
                                <img src={itemAtual.imageUrl} />
                                <span>{itemAtual.title}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </ProfileRelationsBoxWrapper>
    )
}



export default function Home(props) {


    const githubUser = props.githubUser;
    const [comunidades, setComunidades] = React.useState([]);



    // 0 - Pegar o array de dados do github

    const [seguidores, setSeguidores] = React.useState([]);
    const [seguindo, setSeguindo] = React.useState([]);

    const people = [
        {
            id: 1,
            title: 'DevonCrawford',
            imageUrl: 'http://github.com/DevonCrawford.png'
        },
        {
            id: 2,
            title: 'johnvictorfs',
            imageUrl: 'http://github.com/johnvictorfs.png'
        },
        {
            id: 3,
            title: 'torvalds',
            imageUrl: 'http://github.com/torvalds.png'
        },
        {
            id: 4,
            title: 'GuilhermeBartasson',
            imageUrl: 'http://github.com/GuilhermeBartasson.png'
        },
        {
            id: 5,
            title: 'tornellihenrique',
            imageUrl: 'http://github.com/tornellihenrique.png'
        },
        {
            id: 6,
            title: 'egoist',
            imageUrl: 'http://github.com/egoist.png'
        },

    ]

    // 0 - Pegar o array de dados do github 
    React.useEffect(() => {

        // GET seguidores
        fetch(`https://api.github.com/users/${githubUser}/followers`)
            .then(function (response) {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Problema ao fazer requisição na api do GitHub' + response.status);

            })
            .then(function (responseJson) {
                setSeguidores(responseJson);
            })
            .catch(function (error) {
                console.error(error)
            })

        // GET seguindo
        fetch(`https://api.github.com/users/${githubUser}/following`)
            .then(function (response) {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Problema ao fazer requisição na api do GitHub' + response.status);

            })
            .then(function (responseJson) {
                setSeguindo(responseJson);
            })
            .catch(function (error) {
                console.error(error)
            })

        // API GraphQL
        fetch('https://graphql.datocms.com/', {
            method: 'POST',
            headers: {
                'Authorization': 'dd6576b0790e68d85c1c47b11e862c',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "query": `query {
            allCommunities {
            id 
            title
            imageUrl
            creatorSlug
            }
        }` })
        })
            .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
            .then((completeResponse) => {
                const comunidadesVindasDoDato = completeResponse.data.allCommunities;
                console.log(comunidadesVindasDoDato)
                setComunidades(comunidadesVindasDoDato)
            })

    }, [])


    const amigos = seguidores.map((item, i) => {
        return {
            id: i,
            title: item.login,
            imageUrl: `https://github.com/${item.login}.png`
        }
    })

    const sigo = seguindo.map((item, i) => {
        return {
            id: i,
            title: item.login,
            imageUrl: `https://github.com/${item.login}.png`
        }
    })

    return (
        <>
            <AlurakutMenu githubUser={githubUser} />
            <MainGrid>
                {/* <Box style="grid-area: profileArea;"> */}
                <div className="profileArea" style={{ gridArea: 'profileArea' }}>
                    <ProfileSidebar githubUser={githubUser} />
                </div>
                <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
                    <Box>
                        <h1 className="title">
                            Bem vindo(a)
                        </h1>

                        <OrkutNostalgicIconSet />
                    </Box>
                    <Box>
                        <h2 className="subTitle">O que você deseja fazer?</h2>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);

                            const comunidade = {
                                title: formData.get('title'),
                                imageUrl: formData.get('image'),
                                creatorSlug: githubUser,

                            }

                            fetch('/api/communities', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(comunidade),
                            })
                                .then(async (response) => {
                                    const dados = await response.json();
                                    console.log(dados.registroCriado);
                                    const comunidade = dados.registroCriado;
                                    const comunidadesAtualizadas = [...comunidades, comunidade];
                                    setComunidades(comunidadesAtualizadas)
                                })


                        }}>
                            <div>
                                <input placeholder="Qual vai ser o nome da sua comunidade?"
                                    name="title"
                                    aria-label="Qual vai ser o nome da sua comunidade?"
                                    type="text"
                                />
                            </div>
                            <div>
                                <input placeholder="Coloque uma URL para usarmos de capa"
                                    name="image"
                                    aria-label="Coloque uma URL para usarmos de capa"
                                    type="text"
                                />
                                {/* <input placeholder="Coloque uma URL para usarmos de capa" 
                                type="file" 
                                name="image" 
                                accept="image/*" 
                                aria-label="Coloque uma URL para usarmos de capa"></input> */}
                            </div>
                            <button>
                                Criar comunidade
                            </button>

                        </form>
                    </Box>
                </div>
                <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

                    {/* <ProfileRelationsBox title='Comunidades' items={comunidades} />   */}
                    <ProfileRelationsBoxWrapper>
                        <h2 className="smallTitle">
                            Comunidades ({comunidades.length})
                        </h2>
                        <ul>
                            {comunidades.slice(-6).map((itemAtual) => {
                                return (
                                    <li key={itemAtual.id}>

                                        {/* <a href={`/communities/${itemAtual.id}`}> */}
                                        <a href={`https://www.google.com/search?q=${itemAtual.title.split(' ').join('+')}`}>
                                            <img src={itemAtual.imageUrl} />
                                            <span>{itemAtual.title}</span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </ProfileRelationsBoxWrapper>

                    <ProfileRelationsBox title='Seguindo' items={sigo} />
                    <ProfileRelationsBox title="Seguidores" items={amigos} />






                </div>
            </MainGrid>
        </>
    )
}


export async function getServerSideProps(context) {
    const cookies = nookies.get(context);
    const token = cookies.USER_TOKEN;

    const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
        headers: {
            Authorization: token,
        }
    })
    .then((response) => response.json())

    if (!isAuthenticated) {
        console.log("not authenticated")
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }


    const { githubUser } = jwt.decode(token); // destructuring(githubuser atrelado ao githubuser la embaixo)



    return {
        props: {
            githubUser
        }, // vai ser passado para a página como props
    }
}