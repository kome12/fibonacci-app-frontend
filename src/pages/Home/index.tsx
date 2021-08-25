import { SignIn } from '../../components/SignIn'
import { useUserState } from '../../store/user/useUserState'

export const Home = () => {
  const { userData } = useUserState()

  return (
    <div>
      <h2>Home</h2>
      {!userData && <SignIn />}
    </div>
  )
}
