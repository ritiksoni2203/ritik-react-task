// React Imports
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// ** Third Party Components
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from "reactstrap"

import CustomSpinner from "../../components/customSpinner"
import CustomTable from "../../components/table/index"
import { useDispatch, useSelector } from "react-redux"
import { Eye } from "react-feather"
import { fetchLanguages, reposList } from "../../redux/github/slice"
import { AppDispatch } from "../../redux/store"
export const useAppDispatch: () => AppDispatch = useDispatch

const Repository = () => {
  const [perPage, setPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dispatch = useAppDispatch();
  const { data, totalCount, loading, languages } = useSelector((store: any) => store.github);
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    dispatch(fetchLanguages())
  }, [])

  useEffect(() => {
    dispatch(reposList({ page: 1, limit: 10, language: selectedLanguage, startDate, endDate }));
  }, [startDate, endDate, selectedLanguage]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }

  const ColumnHeaders = () => (
    <>
      <th className="px-5">No.</th>
      <th className="max-w-[150px] px-5">Name</th>
      <th className="max-w-[150px] px-5">Author</th>
      <th className="px-5">Stars</th>
      <th className="px-5">Forks</th>
      <th className="px-5">Action</th>
    </>
  )

  const DataRows = () => (
    <>
      {data.map((row: any, index: number) => (
        <tr key={index} className="even:bg-slate-100 leading-10 text-left">
          <td className="px-5">
            <p>{(currentPage - 1) * perPage + index + 1}</p>
          </td>
          <td className="max-w-[150px] px-5">{row?.name}</td>
          <td className="max-w-[150px] px-5">
            <p className="mb-0">{row?.owner.login}</p>
          </td>
          <td className="px-5">
            {row?.stargazers_count}
          </td>
          <td className="px-5">
            {row?.forks_count}
          </td>
          <td className="px-5">
            <div className="d-flex align-items-center gap-1">
              <Link to={`/repos/${row.owner.login}/${row.name.split('.')[0]}`} className="cursor-pointer" >
                <Eye color="gray" size={15} />
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </>
  )

  const handlePerPageChange = (page: number) => {
    setPerPage(page)
    setCurrentPage(1)
    dispatch(reposList({ page: 1, limit: page, language: selectedLanguage, startDate, endDate }));
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    dispatch(reposList({ page: pageNumber, language: selectedLanguage, limit: perPage }))
  }

  const handleLanguageChange = (selectedOption: any) => {
    setSelectedLanguage(selectedOption.value);
  };

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      {loading && <CustomSpinner />}
      <Card className={`overflow-hidden container app ${darkMode ? 'dark' : ''}`}>
        <CardHeader className="card-header mb-5">
          <CardTitle tag="h4" className="text-2xl font-bold">Repisotory List</CardTitle>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </CardHeader>
        <div className="react-dataTable name-width club-table">
          <div className="filter-options flex justify-between mb-5 items-center">
            <Select
              className="filter-select w-[200px]"
              placeholder="Language"
              options={languages}
              onChange={handleLanguageChange}
            />
            <div>
              <DatePicker
                className="filter-datepicker"
                placeholderText="Start Date"
                selected={startDate}
                onChange={handleStartDateChange}
                isClearable
                dateFormat="dd/MM/yyyy"
                maxDate={endDate}
              />
              <DatePicker
                className="filter-datepicker"
                placeholderText="End Date"
                selected={endDate}
                onChange={handleEndDateChange}
                isClearable
                dateFormat="dd/MM/yyyy"
                minDate={startDate}
              />
            </div>
          </div>
          <CustomTable
            columnHeaders={<ColumnHeaders />}
            dataRows={<DataRows />}
            pageNumber={currentPage}
            perPage={perPage}
            isPerPageChange={true}
            totalCount={totalCount}
            handlePageChange={handlePageChange}
            handlePerPageChangeValue={handlePerPageChange}
          />
        </div>
      </Card>
    </>
  )
}

export default Repository