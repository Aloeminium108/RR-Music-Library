import './App.css';
import { useState, useEffect, Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView';

function App() {
  let [search, setSearch] = useState('')
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')

  // const handleSearch = (e, term) => {
  //   e.preventDefault()
  //   fetch(`https://itunes.apple.com/search?term=${term}`)
  //   .then(response => response.json())
  //   .then(resData => {
  //     if (resData.results.length > 0) {
  //       return setData(resData.results)
  //     } else {
  //       return setMessage('Not Found.')
  //     }
  //   })
  //   .catch(err => setMessage('An Error has Occurred!'))
  // }

  const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
    if (search) {
      const fetchData = async () => {
        document.title = `${search} Music`
        const response = await fetch(API_URL + search)
        const resData = await response.json()
        if (resData.results.length > 0) {
          return setData(resData.results)
        } else {
          return setMessage('Not Found')
        }
      }
      fetchData()
    }
  }, [search])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  // return (
  //   <div className="App">
  //     <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
  //       <SearchBar />
  //     </SearchContext.Provider>
  //     {message}
  //     <DataContext.Provider value={data}>
  //       <Gallery />
  //     </DataContext.Provider>
  //   </div>
  // )

  return (
    <div>
      {message}
      <BrowserRouter >
        <Routes>
          <Route path='/' element={
            <>
              <SearchBar handleSearch={handleSearch} />
              <Gallery data={data} />
            </>
          } />
          <Route path='/album/:id' element={<AlbumView />} />
          <Route path='/artist/:id' element={<ArtistView />} />
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App;
