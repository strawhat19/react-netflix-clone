import * as React from 'react'
import { Suspense } from 'react'
import Header from '../Header/header';
import TopButton from '../TopButton/topbutton';
import Banner from '../Banner/banner';
import List from '../List/list';
import Row from '../Row/row';
import Footer from '../Footer/footer';
import { movieURLS, randomMovieURL } from '../../App';

const Home: React.FC<State> = ({user, setUser, movie, setMovie}) => {

    return (
        <>
            <Header user={user} setUser={setUser} />
            <TopButton />
            <Suspense fallback={<>Banner Loading</>}>
                <Banner user={user} setUser={setUser} fetchMovie={randomMovieURL} movie={movie} setMovie={setMovie} />
            </Suspense>
            <Suspense fallback={<main>Movies Loading...</main>}>
                <main className="movieRows">
                    <List user={user} setUser={setUser} />
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Netflix Originals" movieURL={movieURLS.netflixOriginals} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Trending Now" movieURL={movieURLS.trending} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="In Theaters" movieURL={movieURLS.inTheaters} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Top Rated" movieURL={movieURLS.topRated} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Action" movieURL={movieURLS.action} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Comedies" movieURL={movieURLS.comedy} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Horror" movieURL={movieURLS.horror} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>   
                        <Row title="Romance" movieURL={movieURLS.romance} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Documentaries" movieURL={movieURLS.documentaries} />
                    </Suspense>
                </main>
            </Suspense>
            <Footer />
          </>
    )
}

export default Home