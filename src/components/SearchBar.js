import { useRef } from 'react'
import { SearchContext } from '../context/SearchContext'

const SearchBar = (props) => {
    const term = useRef('')

    return (
            <form>
                <input ref={term} type="text" placeholder="Search Here" />
                <button onClick={(e) => props.handleSearch(e, term.current.value)}>Submit</button>
            </form>
    )
}

export default SearchBar