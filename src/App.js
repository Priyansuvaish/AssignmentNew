import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar.js";
import Card from "./components/cards.js";
import "./App.css";

const App = () => {
  const [ticketsData, setticketsData] = useState([]);
  const [users, setusers] = useState([]);

  const apiEndpoint = "https://api.quicksell.co/v1/internal/frontend-assignment";

  async function fetchData() {
    try {
      const response = await fetch(apiEndpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setticketsData(data.tickets);
      setusers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [groupBy, setGroupBy] = useState(() => localStorage.getItem("groupBy") || "status");
  const [sortBy, setSortBy] = useState(() => localStorage.getItem("sortBy") || "priority");

  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);

  console.log("data from api", ticketsData)
  const groupTickets = () => {
    const grouped = ticketsData.reduce((acc, ticket) => {
      let key;
      if (groupBy === "status") key = ticket.status;
      else if (groupBy === "user") key = users.find((u) => u.id === ticket.userId)?.name || "Unassigned";
      else if (groupBy === "priority") key = `Priority ${ticket.priority}`;
      else key = "Uncategorized";

      if (!acc[key]) acc[key] = [];
      acc[key].push(ticket);
      return acc;
    }, {});
    if (groupBy === "status") {
      const statusOrder = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];
      statusOrder.forEach((status) => {
        if (!grouped[status]) grouped[status] = [];
      });
      return Object.fromEntries(
        statusOrder
          .map((status) => [status, grouped[status]])
      );
    }
    if (groupBy === "priority") {
      const priorityOrder = ["Priority 0", "Priority 4", "Priority 3", "Priority 2", "Priority 1"];
      return Object.fromEntries(
        priorityOrder
          .filter((key) => grouped[key])
          .map((key) => [key, grouped[key]])
      );
    }

    return grouped;
  };
  const priorities = {
    "Priority 0": { name: "No priority", url: "/icons_FEtask/No-priority.svg" },
    "Priority 1": { name: "Low", url: "/icons_FEtask/Img - Low Priority.svg" },
    "Priority 2": { name: "Medium", url: "/icons_FEtask/Img - Medium Priority.svg" },
    "Priority 3": { name: "High", url: "/icons_FEtask/Img - High Priority.svg" },
    "Priority 4": { name: "Urgent", url: "/icons_FEtask/SVG - Urgent Priority colour.svg" },
    "In progress": { name: "In Progress", url: "/icons_FEtask/in-progress.svg" },
    "Backlog": { name: "Backlog", url: "/icons_FEtask/Backlog.svg" },
    "Cancelled": { name: "Cancelled", url: "/icons_FEtask/Cancelled.svg" },
    "Done": { name: "Done", url: "/icons_FEtask/Done.svg" },
    "Todo": { name: "Todo", url: "/icons_FEtask/To-do.svg" },
  };

  const handlename = (name) => {
    const t = priorities[name];
    console.log(t);
    return t;
  }



  const sortedTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortBy === "priority") return b.priority - a.priority;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  };

  const groupedTickets = groupTickets();
  console.log(groupedTickets);



  return (
    <>
      <Navbar groupBy={groupBy}
        sortBy={sortBy}
        setGroupBy={setGroupBy}
        setSortBy={setSortBy}
      />
      <div className="app-container">
        <div className="board">
          {Object.entries(groupedTickets).map(([group, tickets]) => (
            <div className="column" key={group}>
              {groupBy !== "user" ?
                <h2>
                  <div className="icon-container">
                    <img src={handlename(group).url} alt="Dropdown" className="heading-icon" />
                    <span>

                      {handlename(group).name}
                    </span>
                    <span style={{ marginLeft: '8px' }}>{tickets.length}</span>
                  </div>

                  <div className="icon-container">

                    <img src="/icons_FEtask/add.svg" alt="Dropdown" className="heading-icon" />
                    <img src="/icons_FEtask/3 dot menu.svg" alt="Dropdown" className="heading-icon" />
                  </div>
                </h2> :
                <h2>
                  <div className="icon-container">

                    <span>{group}</span>
                    <span style={{ marginLeft: '2px' }}>{tickets.length}</span>
                  </div>
                  <div className="icon-container">
                    <img src="/icons_FEtask/add.svg" alt="Dropdown" className="heading-icon" />
                    <img src="/icons_FEtask/3 dot menu.svg" alt="Dropdown" className="heading-icon" />
                  </div>
                </h2>
              }
              {sortedTickets(tickets).map((ticket) => (
                <Card ticket={ticket} groupBy={groupBy} handlename={handlename} />
              ))}
            </div>
          ))}
        </div>
      </div >
    </>

  );
};

export default App;