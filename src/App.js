import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar.js";
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

console.log("data from api",ticketsData)
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

  const handlename = (name) => {
    switch (name) {
      case "Priority 0": return "No priority";
      case "Priority 1": return "Low";
      case "Priority 2": return "Medium";
      case "Priority 3": return "High";
      case "Priority 4": return "Urgent";
      case "In progress": return "In Progress";

      default: return name;
    }
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
              <h2>{handlename(group)}</h2>
              {sortedTickets(tickets).map((ticket) => (
                <div className="task-card" key={ticket.id}>
                  <h3>{ticket.title}</h3>
                  <p>{ticket.tag.join(", ")}</p>
                  <p>Priority: {ticket.priority}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div >
    </>

  );
};

export default App;