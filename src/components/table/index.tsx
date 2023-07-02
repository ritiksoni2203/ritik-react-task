import PropTypes from "prop-types"
import { Button, Col, Row } from "reactstrap"
import Pagination from "react-js-pagination";
import Select from "react-select";

const CustomTable = (props: any) => {
  const Show = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" }
  ]

  return (
    <div>
      <div className="flex justify-between">
        {props?.isFilterByPlan ? (
          <div className="search-box me-2 d-inline-block">
            <div className="flex items-center">
              <input
                type="text"
                className="form-control"
                placeholder="Search plan name"
                onChange={(e) => props.getFilterValue(e.target.value)}
              />
            </div>
          </div>
        ) : (
          ""
        )}

        {props?.isSearch ? (
          <div className="search-box me-2 d-inline-block">
            <div className="table-search">
              <i className="bx bx-search-alt search-icon" />
              <input
                placeholder="Search"
                className="form-control"
                onChange={(e) => {
                  setTimeout(() => props.getSearchValue(e.target.value), 1000)
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {props?.isButton ? (
          <Button color="info" onClick={props.clickOnButton}>
            {props?.isButton}
          </Button>
        ) : (
          ""
        )}
        {props?.isField ? <div>{props?.field}</div> : ""}
      </div>
      <div className="table-responsive shadow-[0_0_22px_-8px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden data-table">
        <table className="table table-auto w-full items-center mb-0 table-striped">
          {/* column headers */}
          <thead className="table-head bg-slate-200">
            <tr className="leading-[3rem] text-left">{props?.columnHeaders}</tr>
          </thead>

          {/* table body */}
          <tbody>{props?.dataRows}</tbody>
        </table>
        {props?.totalCount === 0 && (
          <div className="mt-4 d-flex justify-content-center">
            <p>No Data Found</p>
          </div>
        )}
      </div>
      {props?.isPerPageChange && (
        <div className="flex w-full justify-between items-center mt-5 d-inline-block table-filter">
          <Select
            className="React"
            classNamePrefix="select"
            defaultValue={Show[0]}
            name="color"
            options={Show}
            onChange={(e: any) => props?.handlePerPageChangeValue(e.value)}
          />
          <Row className="align-items-md-center mt-2">
            <Col className="w-fit pagination-rounded justify-content-end mb-2">
              <Pagination
                hideFirstLastPages={true}
                activePage={props?.pageNumber}
                totalItemsCount={props?.totalCount}
                itemsCountPerPage={props?.perPage}
                pageRangeDisplayed={5}
                itemClass="page-item font-bold py-2 px-4 rounded"
                hideDisabled
                linkClass="page-link"
                onChange={props?.handlePageChange}
                itemClassFirst="hidden"
                itemClassNext="font-bold py-2 px-4 rounded"
                itemClassLast="hidden"
              />
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

// component props validation
CustomTable.propTypes = {
  columnHeaders: PropTypes.object,
  totalCount: PropTypes.number,
  dataRows: PropTypes.object,
  isSearch: PropTypes.bool,
  isPerPageChange: PropTypes.bool,
  perPage: PropTypes.number,
  pageNumber: PropTypes.number,
  isFilterByPlan: PropTypes.bool,
  getSearchValue: PropTypes.func,
  handlePerPageChangeValue: PropTypes.func,
  handlePageChange: PropTypes.func,
  getFilterValue: PropTypes.func,
  clickOnButton: PropTypes.func,
  isButton: PropTypes.any,
  isField: PropTypes.bool,
  field: PropTypes.any
}

export default CustomTable