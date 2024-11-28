import React, { useState,useEffect } from "react";
import "./App.css";

const App = () => {
  const ticketsData = [
    { id: "CAM-1", title: "Update User Profile Page UI", tag: ["Feature request"], userId: "usr-1", status: "Todo", priority: 4 },
    { id: "CAM-2", title: "Add Multi-Language Support", tag: ["Feature Request"], userId: "usr-2", status: "In progress", priority: 3 },
    { id: "CAM-3", title: "Optimize Database Queries for Performance", tag: ["Feature Request"], userId: "usr-2", status: "In progress", priority: 1 },
    { id: "CAM-4", title: "Implement Email Notification System", tag: ["Feature Request"], userId: "usr-1", status: "In progress", priority: 3 },
    { id: "CAM-5", title: "Enhance Search Functionality", tag: ["Feature Request"], userId: "usr-5", status: "In progress", priority: 0 },
    { id: "CAM-6", title: "Third-Party Payment Gateway", tag: ["Feature Request"], userId: "usr-2", status: "Todo", priority: 1 },
    { id: "CAM-7", title: "Create Onboarding Tutorial for New Users", tag: ["Feature Request"], userId: "usr-1", status: "Backlog", priority: 2 },
    { id: "CAM-8", title: "Implement Role-Based Access Control (RBAC)", tag: ["Feature Request"], userId: "usr-3", status: "In progress", priority: 3 },
    { id: "CAM-9", title: "Upgrade Server Infrastructure", tag: ["Feature Request"], userId: "usr-5", status: "Todo", priority: 2 },
    { id: "CAM-10", title: "Conduct Security Vulnerability Assessment", tag: ["Feature Request"], userId: "usr-4", status: "Backlog", priority: 1 },
  ];

  const users = [
    { id: "usr-1", name: "Anoop Sharma" },
    { id: "usr-2", name: "Yogesh" },
    { id: "usr-3", name: "Shankar Kumar" },
    { id: "usr-4", name: "Ramesh" },
    { id: "usr-5", name: "Suresh" },
  ];

  // State Management
  const [groupBy, setGroupBy] = useState(() => localStorage.getItem("groupBy") || "status");
  const [sortBy, setSortBy] = useState(() => localStorage.getItem("sortBy") || "priority");

  // Save preferences to localStorage when changed
  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);


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
  
    // If grouping by priority, reorder based on a custom order
    if (groupBy === "priority") {
      const priorityOrder = ["Priority 0", "Priority 4", "Priority 3", "Priority 2", "Priority 1"];
      return Object.fromEntries(
        priorityOrder
          .filter((key) => grouped[key]) // Only include groups that exist
          .map((key) => [key, grouped[key]])
      );
    }
  
    return grouped;
  };
  
  const handlename =(name)=>{
    switch(name){
      case "Priority 0": return "No priority";
      case "Priority 1": return "Low";
      case "Priority 2": return "Medium";
      case "Priority 3": return "High";
      case "Priority 4": return "Urgent";
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
    <div className="app-container">
      <div className="controls">
        <div className="dropdown">
          <button className="dropdown-btn">Grouping</button>
          <div className="dropdown-content">
            <div onClick={() => setGroupBy("status")}>Status</div>
            <div onClick={() => setGroupBy("user")}>User</div>
            <div onClick={() => setGroupBy("priority")}>Priority</div>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropdown-btn">Ordering</button>
          <div className="dropdown-content">
            <div onClick={() => setSortBy("priority")}>Priority</div>
            <div onClick={() => setSortBy("title")}>Title</div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default App;
