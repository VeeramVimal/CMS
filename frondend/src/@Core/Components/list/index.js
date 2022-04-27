import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ReactPaginate from "react-paginate"
import { ChevronDown, Plus } from "react-feather"
import DataTable from "react-data-table-component"
import {
  Button, Label, Input, CustomInput, Row, Col, Card,
  UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem
} from "reactstrap"
import Select from "react-select"
import Proptypes from 'prop-types'
import CustomCheckbox from "../customInputs/customCheckbox"
import { selectThemeColors } from "@utils"
import { searchFilter } from "../../../utility/listSearchFilter"
import Loader from "../loaders/Loading-spinner"
import '../../../Asserts/scss/react/apps/app-invoice.scss'
import '../../../Asserts/scss/react/libs/tables/react-dataTable-component.scss'

const ListPage = (props) => {
  const { columns, listData, statusOption, setIsColumnShow, handleColumns, pathName } = props
  const optionsList = [10, 25, 50]
  const [value, setValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [listValue, setListValue] = useState([])
  const [showColumn, setShowColumn] = useState([])
  const [isMultiSelect, setIsMultiSelect] = useState(false)

  useEffect(() => {
    setListValue(listData)
  }, [listData])

  useEffect(() => {
    const defaultColumns = columns.filter((name) => name.default === undefined || name.default)
    setShowColumn(defaultColumns)
    if (columns.length === defaultColumns.length) {
      setIsMultiSelect(true)
    } else {
      setIsMultiSelect(false)
    }
  }, [columns, isMultiSelect])

  const handleSelectAll = (val) => {
    if (!val) {
      setIsColumnShow({
        isJob: true,
        isCategory: true,
        isType: true,
        isApplication: true,
        isDate: true,
        isStatus: true,
        isName: true,
        isAppliedFor: true,
        isContact: true,
        isEmail: true,
        isExperience: true,
        isId: true,
        isMessage: true,
        isProject: true,
        isTask: true,
        isStartDate: true,
        isEndDate: true,
        isStartTime: true,
        isEndTime: true,
        isMemo: true,
        isTotalHours: true,
        isDesignation: true,
        isProfile: true,
        isFirstName: true,
        isAddress: true,
        isLastName: true,
        isPhoneNumber: true,
        isGender: true,
        isDOB: true,
        isSkill: true,
        isQualification: true,
        isLocation: true,
        isSkill: true,
        isCompany: true,
        isAssetPic: true,
        isIndustry: true,
        isJobExperience: true,
        isSalary: true,
        isJobWorkLevel: true,
        isEmploymentType: true,
        isJobCategory: true,
        isassets_name: true,
        isStartDate: true,
        isEndDate: true,
        isassets_id: true,
        isassets_picture: true,
        isassets_type: true,
        isassets_status: true,
        isassets_value: true,
        isassets_location: true,
        isassets_notes: true,
        isassets_serialno: true,
        isassets_dategiven: true,
        isassets_datereturn: true,
        isassets_lentto: true,
        isassets_picture: true,
        isDueDate: true,
        isAssigenedTo:true,
        isProjectId: true,
        isProjectName: true,
        isProjectcategory: true,
        isMembername: true,
        isStartdate: true,
        isHours: true,
        isClient: true,
        isStatus: true,
        isDeadline: true,
        isLeaveId: true,
        isEmployee: true,
        isDate: true,
        isStatus: true,
        isLeaveType: true,
        isReason: true, 
        isDurationType: true,
        isPrice: true,
        isExpenseCategory: true,
        isBillNumber: true,
        isEmployees: true,
        isPurchasedFrom: true,
        isPurchasedDate: true,
        isTicket_subject: true,
        isRequester: true,
        isRequested_on: true
      })
      setIsMultiSelect(!isMultiSelect)
    } else {
      setIsColumnShow({
        isJob: false,
        isCategory: false,
        isType: false,
        isApplication: false,
        isDate: false,
        isStatus: false,
        isName: false,
        isAppliedFor: false,
        isContact: false,
        isEmail: false,
        isExperience: false,
        isId: false,
        isMessage: false,
        isProject: false,
        isTask: false,
        isStartDate: false,
        isEndDate: false,
        isStartTime: false,
        isEndTime: false,
        isMemo: false,
        isTotalHours: false,
        isDesignation: false,
        isProfile: false,
        isFirstName: false,
        isAddress: false,
        isLastName: false,
        isPhoneNumber: false,
        isGender: false,
        isDOB: false,
        isSkill: false,
        isQualification: false,
        isLocation: false,
        isSkill: false,
        isCompany: false,
        isAssetPic: false,
        isIndustry: false,
        isJobExperience: false,
        isSalary: false,
        isJobWorkLevel: false,
        isEmploymentType: false,
        isJobCategory: false,
        isassets_id: false,
        isassets_picture: false,
        isassets_type: false,
        isassets_status: false,
        isassets_value: false,
        isassets_location: false,
        isassets_notes: false,
        isassets_serialno: false,
        isassets_dategiven: false,
        isassets_datereturn: false,
        isassets_lentto: false,
        isassets_picture: false,
        isassets_details: false,
        isDueDate: false,
        isAssigenedTo:false,
        isProjectId: false,
        isProjectName: false,
        isProjectcategory: false,
        isMembername: false,
        isDeadline: false,
        isStartdate: false,
        isHours: false,
        isClient: false,
        isStatus: false,
        isLeaveId: false,
        isEmployee: false,
        isDate: false,
        isStatus: false,
        isLeaveType: false,
        isReason: false, 
        isDurationType: false,
        isPrice: false,
        isExpenseCategory: false,
        isBillNumber: false,
        isEmployees: false,
        isPurchasedFrom: false,
        isPurchasedDate: false,
        isTicket_subject: false,
        isRequester: false,
        isRequested_on: false
      })
      setIsMultiSelect(!isMultiSelect)
    }
  }
  const handleStatusValue = (e) => {
    setStatusValue(e)
    if (e.value === "all") {
      setListValue(listData)
    } else if (e.value !== "all") {
      const filterStatus = columns.filter((sts) => sts.status === true).map((sel) => sel.selector).toString()
      const statusFilter = listData.filter((status) => status[filterStatus] === e.value)
      setListValue(statusFilter)
    } else {
      setListValue(statusFilter)
    }
  }

  const handleFilter = (val) => {
    setValue(val)
    setListValue(searchFilter(listData, val))
  }

  const handlePagination = ({ selected }) => setCurrentPage(selected + 1)

  const handleSingleColumns = (col) => {
    handleColumns(col)
    if (columns.length === showColumn.length) {
      setIsMultiSelect(false)
    } else {
      setIsMultiSelect(true)
    }
  }

  const Dropdown = ({ col, i }) => {
    return (
      (
        <DropdownItem key={i} header>
          <CustomCheckbox
            checked={col.default}
            value={col.default}
            onChange={() => handleSingleColumns(col)}
            label={col.name}
            labelStyle={{ fontSize: '13px' }}
          />
        </DropdownItem>
      )
    )
  }

  const SelectAllComponent = () => {
    return (
      <CustomCheckbox
        checked={isMultiSelect}
        value={isMultiSelect}
        onChange={() => handleSelectAll(isMultiSelect)}
        label={"Select all"}
        style={{ padding: "6px 0px 4px 18px", paddingBottom: '5px' }}
        labelStyle={{ fontSize: '13px' }}
      />
    )
  }

  const paginationData = () => listValue.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
  const count = Math.ceil(listValue.length / rowsPerPage)

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-table-header w-100 p-1">
          <Row>
            <Col lg="2" md="3" xs="12" sm="12" className="d-flex align-items-center">
              <Link to={pathName}>
                <Button.Ripple style={{ padding: '0.786rem 1rem' }} className='btn-icon' color='primary'>
                  <Plus size={16} />
                </Button.Ripple>
              </Link>
            </Col>
            <Col
              lg="4" md="3"
              className="my-md-0 my-1 actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-sm-3 mt-xs-3"
            >
              <div className="d-flex align-items-center w-100">
                <Label for="search-invoice">Search</Label>
                <Input
                  autoComplete='off'
                  id="search-invoice"
                  className="ml-50 w-100"
                  type="text"
                  value={value}
                  onChange={(e) => handleFilter(e.target.value)}
                  placeholder="Search..."
                />
              </div>
            </Col>
            <Col lg="4" md="3" className="my-md-0 my-1 actions-right align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-sm-3 mt-xs-3">
              <Select
                value={statusValue}
                onChange={handleStatusValue}
                isClearable={false}
                theme={selectThemeColors}
                options={statusOption}
                placeholder="Select status"
                className="react-select"
                classNamePrefix="select"
              />
            </Col>
            <Col lg="2" md="3">
              <UncontrolledDropdown className="nav-item">
                <DropdownToggle color="secondary" caret className='w-100 dropdown-user-link'>
                  Columns
                </DropdownToggle>
                <DropdownMenu>
                  <SelectAllComponent />
                  {columns.filter(val => val.name !== "Action").map((col, i) => (
                    <Dropdown col={col} i={i} />
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
        </div>
      </Card>
      <Card>
        {listData === [] ? <div className="mt-5 pt-5"> <Loader /></div> : <>
          <div className="invoice-list-dataTable">
            <DataTable
              noHeader
              pagination
              paginationServer
              subHeader={true}
              columns={showColumn}
              responsive={true}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              defaultSortField="invoiceId"
              data={paginationData()}
            />
          </div>
          <Row>
            <Col md="6" xs="12" sm="12" className="d-flex align-items-center">
              <div className="d-flex align-items-center mr-2 ml-1">
                <Label for="rows-per-page">Show</Label>
                <CustomInput
                  className="form-control ml-50 pr-3"
                  type="select"
                  id="rows-per-page"
                  value={rowsPerPage}
                  onChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setCurrentPage(1) }}
                >
                  {optionsList.map((item, index) => (
                    <option value={item} key={index}>{item}</option>
                  ))}
                </CustomInput>
              </div>
            </Col>
            <Col md="6" xs="12" sm="12">
              <ReactPaginate
                pageCount={count || 1}
                nextLabel=""
                breakLabel="..."
                previousLabel=""
                activeClassName="active"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={(page) => handlePagination(page)}
                pageClassName={"page-item"}
                nextLinkClassName={"page-link"}
                nextClassName={"page-item next"}
                previousClassName={"page-item prev"}
                previousLinkClassName={"page-link"}
                pageLinkClassName={"page-link"}
                containerClassName={
                  "pagination react-paginate justify-content-end p-1"
                }
              />
            </Col>
          </Row>
        </>}
      </Card>
    </div >
  )
}

export default ListPage

ListPage.PropTypes = {
  columns: Proptypes.object,
  listData: Proptypes.array,
  statusOption: Proptypes.object,
  toggleSidebar: Proptypes.func,
  setIsColumnShow: Proptypes.func,
  handleColumns: Proptypes.func
}