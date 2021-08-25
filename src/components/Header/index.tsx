import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useCallback, useState } from 'react'
import SunflowerLogo from '../../assets/sunflowerlogo.png'
import { useFirebaseAuth } from '../SignIn/useFirebaseAuth'
import { ReactComponent as Hamburger } from './assets/hamburger.svg'
import './Header.css'

export const Header = () => {
  const { logout } = useFirebaseAuth()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = useCallback(async () => {
    handleClose()
    logout()
  }, [])

  return (
    <div className='header-container'>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <div style={{ color: '#ff7f27' }}>
          <Hamburger />
        </div>
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <img
        className='sunflower-logo'
        src={SunflowerLogo}
        alt='fibonacci logo'
      ></img>
    </div>
  )
}
