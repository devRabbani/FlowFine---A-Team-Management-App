import debounce from 'lodash.debounce'
import { useCallback, useEffect, useState } from 'react'
import { RiLoaderFill, RiSearch2Line } from 'react-icons/ri'
import { getSearchResults } from '../../utils/firebase/common'
import TeamCard from '../teamCard'
import s from './searchTeams.module.css'

export default function SearchTeams({ uid }) {
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [teamsList, setTeamsList] = useState([])

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
      console.count('Search fxn')
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
          <div className={s.teamWrapper}>
            {isLoading ? (
              <p className={s.loading}>Getting Teamlist..</p>
            ) : teamsList?.length ? (
              teamsList?.map((item) => (
                <TeamCard
                  key={item?.teamcode}
                  teamcode={item?.teamcode}
                  isSearch={true}
                  teamname={item?.name}
                  joined={item?.members?.includes(uid)}
                  request={item?.invitation?.includes(uid)}
                />
              ))
            ) : (
              <p className={s.loading}>No Team Found</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
