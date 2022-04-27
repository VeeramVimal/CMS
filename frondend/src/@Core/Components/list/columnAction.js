import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical } from 'react-feather'
import Proptypes from 'prop-types'

const ColumnAction = (props) => {
    const { actionItems } = props
    return (
        <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm px-0'>
                <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu right>
                {actionItems.map((act, i) => {
                    return <DropdownItem key={i} onClick={act.action} className='w-100'>
                        {act.itemIcon}
                        <span className='align-middle'>{act.itemName}</span>
                    </DropdownItem>
                })}
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default ColumnAction

ColumnAction.PropTypes = {
    tabOptions: Proptypes.object
}