import { useCallback, useEffect, useState } from 'react'
import { RiUserSearchLine } from 'react-icons/ri'
import { CgSearchLoading } from 'react-icons/cg'
import s from '../membersPage.module.css'
import debounce from 'lodash.debounce'
import { toast } from 'react-hot-toast'
import {
  getSearchResults,
  giveRequest,
} from '../../../../utils/firebase/common'

export default function InviteBox({
  checkInvite,
  checkMembers,
  teamCode,
  access,
  teamname,
}) {
  const [isSearching, setSearching] = useState(false)
  const [searchStr, setSearchStr] = useState('')
  const [results, setResults] = useState([])
  const [inviteLoading, setInviteLoading] = useState(false)

  // Functions
  const handleChange = (e) => {
    const value = e.target.value
    if (value.length < 3) {
      setSearchStr(value)
      setSearching(false)
      setResults([])
    } else {
      setSearchStr(value)
      setSearching(true)
    }
  }

  // Search Debounce Function
  const handleSearch = useCallback(
    debounce(async (value) => {
      if (value.length >= 3) {
        try {
          const res = await getSearchResults(value, 'username', 'users')
          setResults(res)
          setSearching(false)
        } catch (error) {
          console.error(error.message)
          setSearching(false)
        }
      }
      console.count('Search fxn')
    }, 700),
    []
  )

  // Giving Invite
  const giveInvite = async (user) => {
    try {
      setInviteLoading(true)
      if (access > 1) {
        await giveRequest(
          teamCode,
          teamname,
          user?.username,
          user?.uid,
          'invite'
        )
      } else {
        throw new Error('You dont have the access to do it!')
      }
    } catch (error) {
      console.log('Invite error ', error)
      toast.error(<b>{error.message}</b>)
    } finally {
      setInviteLoading(false)
    }
  }

  // Run every time search string change
  useEffect(() => {
    handleSearch(searchStr)
  }, [searchStr])

  return (
    <>
      <div className={s.inviteBox}>
        {isSearching ? <CgSearchLoading /> : <RiUserSearchLine />}
        <input
          value={searchStr}
          type="search"
          placeholder="Type username eg: ganesh"
          onChange={handleChange}
        />
      </div>
      {searchStr.length >= 3 ? (
        <div className={s.searchResultsWrapper}>
          {isSearching ? (
            <p className="noData low">Getting Users</p>
          ) : results.length ? (
            <div className={s.searchResults}>
              {results?.map((result, i) => (
                <div
                  key={i}
                  className={`${s.membersList_memberCard} flexBetween`}
                >
                  <div className={s.memberCard_info}>
                    <div className={s.memberCard_nameDiv}>
                      <p className={s.memberCard_name}>{result?.displayName}</p>
                      <p className={s.memberCard_username}>
                        @{result?.username}
                      </p>
                    </div>
                  </div>
                  {checkMembers(result?.username) ? null : checkInvite(
                      result?.username
                    ) ? (
                    <p>requested</p>
                  ) : (
                    <button
                      onClick={() => giveInvite(result)}
                      disabled={inviteLoading}
                    >
                      {inviteLoading ? 'Inviting' : 'Invite'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="noData low">No Users Found</p>
          )}
        </div>
      ) : null}
    </>
  )
}
