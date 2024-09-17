import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from "./store/homeSlice"

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'
import Error404 from './pages/Error404/Error404'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  const dispatch = useDispatch()
  const url = useSelector((state) => state.home.url)

  // console.log('url', url)

  useEffect(() => {
    fethcApiConfig()
    genreCall()
  }, []);

  const fethcApiConfig = () => {
    FetchDataFromApi("/configuration")
      .then((res) => {
        // console.log(res)

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }

        dispatch(getApiConfiguration(url));
      })
  }

  async function genreCall() {
    let endPoints = ['tv', 'movie'];
    let allGenres = {};

    try {
      for (const url of endPoints) {
        const response = await FetchDataFromApi(`/genre/${url}/list`);
        // console.log(response);

        if (response && response.genres) {
          response.genres.forEach((item) => {
            allGenres[item.id] = item;
          });
        } else {
          console.error(`Response does not contain genres:`, response);
        }
      }
    } catch (error) {
      console.error('Error fetching genre data:', error);
    }
    dispatch(getGenres(allGenres))
  }


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />}></Route>
        <Route path='/search/:query' element={<SearchResult />}></Route>
        <Route path='/explore/:mediaType' element={<Explore />}></Route>
        <Route path='*' element={<Error404 />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
