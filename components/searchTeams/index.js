import debounce from 'lodash.debounce'
import { useCallback, useEffect, useState } from 'react'
import { RiLoaderFill, RiSearch2Line } from 'react-icons/ri'
import { getSearchResults } from '../../utils/firebase/common'
import s from './searchTeams.module.css'
import TeamCardSearch from '../teamCard/teamCardSearch'

export default function SearchTeams() {
  // Local States
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [teamsList, setTeamsList] = useState([])

  // Clear Saerch
  const handleClearSearch = () => setSearchTerm('')

  const handleChange = (e) => {
    const value = e.target.value
    if (value.length < 3) {
      setIsLoading(false)
      setSearchTerm(value)
      setTeamsList([])
    } else {
      setIsLoading(true)
      setSearchTerm(value)
    }
  }

  const handleSearch = useCallback(
    debounce(async (value) => {
      if (value.length >= 3) {
        try {
          const res = await getSearchResults(value, 'name', 'teams')
          setTeamsList(res)
          setIsLoading(false)
        } catch (error) {
          console.error(error.message)
          setIsLoading(false)
        }
      }
    }, 700),
    []
  )

  // Use Effect will run every time search term changes
  useEffect(() => {
    handleSearch(searchTerm)
  }, [searchTerm])

  return (
    <div className={s.searchTeamsWrapper}>
      <div className={s.searchBox}>
        <input
          value={searchTerm}
          onChange={handleChange}
          type="search"
          placeholder="Search For Teams"
        />
        {isLoading ? <RiLoaderFill /> : <RiSearch2Line />}
      </div>
      {searchTerm.length >= 3 ? (
        <div className={s.searchResultsWrapper}>
          <div className={s.headerDiv}>
            <h3 className="header2">Results for : {searchTerm}</h3>
          </div>

          {isLoading ? (
            <p className="noData low pb2">Getting Teams...</p>
          ) : teamsList?.length ? (
            <div className={s.teamWrapper}>
              {teamsList?.map((team) => (
                <TeamCardSearch
                  key={team?.teamcode}
                  teamData={team}
                  handleClearSearch={handleClearSearch}
                />
              ))}
            </div>
          ) : (
            <p className="noData low pb2">No Team Found</p>
          )}
        </div>
      ) : null}
    </div>
  )
}
