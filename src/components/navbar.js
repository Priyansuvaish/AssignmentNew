import React from 'react'

const navbar = ({groupBy,setGroupBy,sortBy,setSortBy}) => {
  return (
    <div className="controls">
        <div className="dropdown">
          <button className="dropdown-btn"><img src="/icons_FEtask/Display.svg" alt="Dropdown" className="dropdown-icon"/>Display<img src="/icons_FEtask/down.svg" alt="Dropdown" className="dropdown-icon"/></button>
          <div className="dropdown-content">
            <div className="sub-dropdown">
              <div className="sub-dropdown-content">
                <span>Grouping</span>
                <select value={groupBy} style={{
                  marginLeft: '3rem',
                  fontSize: '16px',
                  paddingRight: '30px',
                  paddingLeft: '10px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  borderRadius: '8px',
                  border: '1px solid #ccc'
                }} onChange={(event) => setGroupBy(event.target.value)}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>

              </div>


            </div>
            <div className="sub-dropdown">
              <div className="sub-dropdown-content">
                <span>Ordering</span>
                <select value={sortBy} style={{
                  marginLeft: '3rem',
                  fontSize: '16px',
                  paddingRight: '30px',
                  paddingLeft: '10px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  borderRadius: '8px',
                  border: '1px solid #ccc'
                }} onChange={(event) => setSortBy(event.target.value)}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>

              </div>
            </div>
          </div>
        </div>
      </div >
  )
}
export default navbar;
