import debounce from 'lodash.debounce'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import useLogout from '../../hooks/useLogout'
import { checkUsernameExist, createUser } from '../../utils/firebase'
import Button from '../button'
import s from './usernamePage.module.css'

export default function UsernamePage({ user }) {
  // States
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [isFormLoading, setIsFormLoading] = useState(false)

  // Imports
  const { logout } = useLogout()
  const router = useRouter()

  // Functions
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase()

    // Regular Expression for Username
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.]/

    // If username is less than 3
    if (value?.length < 3) {
      setUsername(value)
      setIsValid(false)
      setIsLoading(false)
    }
    // If it pass the regex test
    if (re.test(value)) {
      setUsername(value)
      setIsValid(false)
      setIsLoading(true)
    }
  }

  const checkUsername = useCallback(
    debounce(async (value) => {
      if (value?.length >= 3) {
        try {
          const res = await checkUsernameExist(value)
          setIsValid(!res) // If there is no username
          setIsLoading(false)
        } catch (error) {
          console.log(error.message)
          setIsLoading(false)
        }
      }
    }, 700),
    []
  )

  // Submit username and user info
  const handleSubmit = async () => {
    setIsFormLoading(true)
    const id = toast.loading(<b>Please wait uploading...</b>)
    try {
      const { uid, displayName, photoURL } = user
      await createUser(uid, displayName, photoURL, username)
      setIsFormLoading(false)
      toast.success(<b>Data added to db</b>, { id })
      router.push('/')
    } catch (error) {
      console.log(error.message)
      setIsFormLoading(false)
      toast.error(<b>{error.message}</b>, { id })
    }
  }

  // Will run every time when username value change
  useEffect(() => {
    checkUsername(username)
  }, [username])

  return (
    <div className={s.usernameWrapper}>
      <div className={`${s.usernameContent} wrapper`}>
        <label>Choose your username:</label>
        <input
          onChange={handleChange}
          value={username}
          type="search"
          placeholder="Eg: golamRabbani"
        />
        {username.length >= 3 ? (
          isLoading ? (
            <p className={s.checking}>Checking username...</p>
          ) : isValid ? (
            <p className={s.valid}>
              <strong>{username}</strong> is available
            </p>
          ) : (
            <p className={s.invalid}>
              <strong>{username}</strong> already exist
            </p>
          )
        ) : null}
        <div className={s.btnDiv}>
          <Button
            disabled={!isValid || isFormLoading}
            onClick={handleSubmit}
            variant="primary"
          >
            {isFormLoading ? 'Loading..' : 'Next'}
          </Button>
          <Button
            onClick={logout}
            disabled={isLoading || isFormLoading}
            variant="grey"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
