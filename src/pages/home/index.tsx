// ** Table Columns
import { useState } from "react"

// React Imports
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

// ** Third Party Components

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from "reactstrap"

import CustomSpinner from "../../components/customSpinner"
import CustomTable from "../../components/table/index"
import { useDispatch, useSelector } from "react-redux"
import { Eye } from "react-feather"
import { reposList } from "../../redux/github/slice"
import { AppDispatch } from "../../redux/store"
import { useAuth0 } from "@auth0/auth0-react"
export const useAppDispatch: () => AppDispatch = useDispatch

const Clubs = () => {
  const [perPage, setPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useAppDispatch();
  const { data, totalCount, loading } = useSelector((store: any) => store.github);
  const { logout } = useAuth0();

  useEffect(() => {
    dispatch(reposList({ page: 1, limit: 10 }))
  }, [])

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
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
    </>
  )

  const handlePerPageChange = (page: number) => {
    setPerPage(page)
    setCurrentPage(1)
    dispatch(reposList({ page: 1, limit: page }))
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    dispatch(reposList({ page: pageNumber, limit: perPage }))
  }

  return (
    <>
      {loading && <CustomSpinner />}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle tag="h4" className="text-2xl mb-5 font-bold">Repisotory List</CardTitle>
        </CardHeader>
        <div className="react-dataTable name-width club-table">
          <CustomTable
            columnHeaders={<ColumnHeaders />}
            dataRows={<DataRows />}
            pageNumber={currentPage}
            perPage={perPage}
            isPerPageChange={true}
            totalCount={totalCount}
            // getSearchValue={setSearch}
            // isSearch={true}
            handlePageChange={handlePageChange}
            handlePerPageChangeValue={handlePerPageChange}
          />
        </div>
      </Card>
    </>
  )
}

export default Clubs