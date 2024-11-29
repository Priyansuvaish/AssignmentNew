import React from 'react'

const card = ({ ticket, groupBy, handlename }) => {
    return (
        <>
            {groupBy === "status" && <div className="task-card" key={ticket.id}>
                <div style={{ color: 'grey' }}>{ticket.id}</div>
                <h3>{ticket.title}</h3>
                <br />
                <p style={{ color: 'grey', display: 'flex', alignItems: 'center' }}>
                    <img src={handlename(`Priority ${ticket.priority}`).url} alt="Icon" className="card-icon" />
                    <span style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        backgroundColor: 'grey',
                        borderRadius: '50%',
                        marginLeft: '15px'

                    }}></span>
                    <span style={{ marginLeft: '8px' }}>{ticket.tag.join(", ")}</span>
                </p>
            </div>}
            {groupBy === "user" && <div className="task-card" key={ticket.id}>
                <div style={{ color: 'grey' }}>{ticket.id}</div>
                <h3 style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={handlename(ticket.status).url} alt="Icon" className="card-icon" />
                    <span style={{ marginLeft: '8px' }}>{ticket.title}</span>
                </h3>
                <br />
                <p style={{ color: 'grey', display: 'flex', alignItems: 'center' }}>
                    <img src={handlename(`Priority ${ticket.priority}`).url} alt="Icon" className="card-icon" />
                    <span style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        backgroundColor: 'grey',
                        borderRadius: '50%',
                        marginLeft: '15px'

                    }}></span>
                    <span style={{ marginLeft: '8px' }}>{ticket.tag.join(", ")}</span>
                </p>
            </div>}
            {groupBy === "priority" && <div className="task-card" key={ticket.id}>
                <div style={{ color: 'grey' }}>{ticket.id}</div>
                <h3 style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={handlename(ticket.status).url} alt="Icon" className="card-icon" />
                    <span style={{ marginLeft: '8px' }}>{ticket.title}</span>
                </h3>
                <br />
                <p style={{ color: 'grey', display: 'flex', alignItems: 'center' }}>
                    <span style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        backgroundColor: 'grey',
                        borderRadius: '50%',
                        marginRight: '2px'
                    }}></span><span style={{ marginLeft: '8px' }}>{ticket.tag.join(", ")}</span>
                </p>
            </div>}
        </>
    )
}
export default card;
