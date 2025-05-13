import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // load logs if user is admin
  useEffect(() => {
    if (!token || role?.toLowerCase() !== "admin") {
      return;
    }

    axios
      .get("http://localhost:3001/api/logs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        setLogs(response.data);
      })
      .catch(function (error) {
        console.error("failed to fetch logs", error);
        setErrorMessage("Failed to load logs.");
      });
  }, [token, role]);

  // block non-admin users
  if (role?.toLowerCase() !== "admin") {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          Access restricted to administrators only
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 logs-page">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "1200px", width: "100%" }}>
        <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2 className="mb-4 text-center activity-heading">Activity Logs</h2>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        {logs.length === 0 ? (
          <p className="text-muted text-center">No log entries found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(function (log) {
                  return (
                    <tr key={log.id}>
                      <td>{new Date(log.createdAt).toLocaleString()}</td>
                      <td>{log.User?.username || log.username || "—"}</td>
                      <td>{log.action}</td>
                      <td>{log.details || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityLogs;
