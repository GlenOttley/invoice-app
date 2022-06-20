import React, { useState } from 'react'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import {
  FormControlLabel,
  FormControlLabelProps,
  Button,
  Menu,
  MenuList,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  selectFilters,
  setStatus,
  Status,
} from '../features/filters/filtersSlice'

// styles
const FilterMenuControlLabel = styled(FormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    marginBottom: '4px',
    marginTop: '4px',
    '& .MuiFormControlLabel-label': {
      fontSize: '1.2rem',
      fontWeight: '600',
      lineHeight: '1.5rem',
      letterSpacing: '0.25px',
    },
  })
)

const FilterCheckbox = styled(Checkbox)<CheckboxProps>(({ theme }) => ({
  color: '#7c5dfa',
  marginRight: '5px',
  '&.MuiCheckbox-root': {
    padding: '0',
  },
  '&.Mui-checked': {
    color: '#7c5dfa',
  },
  '&.MuiSvgIcon-root': {
    fontSize: '21px',
  },
}))

const FilterMenu = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const select = useAppSelector
  const theme = useTheme()

  const { status } = select(selectFilters)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuButton = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleFilterCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnchorEl(null)
    dispatch(setStatus(e.target.value as Status))
  }

  return (
    <>
      <Button
        aria-controls={open ? 'filter-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        className={open ? 'btn--dropdown active' : 'btn--dropdown'}
        onClick={handleMenuButton}
        variant='text'
        disableRipple
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        Filter
        {!useMediaQuery(theme.breakpoints.down('sm')) && (
          <span>&nbsp;by status</span>
        )}
      </Button>

      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        className='filter-form'
      >
        <MenuList>
          <MenuItem>
            <FilterMenuControlLabel
              control={
                <FilterCheckbox
                  value='draft'
                  checked={status === 'draft'}
                  onChange={handleFilterCheckbox}
                />
              }
              label='Draft'
            />
          </MenuItem>

          <MenuItem>
            <FilterMenuControlLabel
              control={
                <FilterCheckbox
                  value='pending'
                  checked={status === 'pending'}
                  onChange={handleFilterCheckbox}
                />
              }
              label='Pending'
            />
          </MenuItem>

          <MenuItem>
            <FilterMenuControlLabel
              control={
                <FilterCheckbox
                  value='paid'
                  checked={status === 'paid'}
                  onChange={handleFilterCheckbox}
                />
              }
              label='Paid'
            />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default FilterMenu
