import { useEffect, useState } from 'react';

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(()=>{
    fetch("http://localhost:5000/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    ).catch(
      error => console.error("Error fetching data:", error)
    );
  }, []);

  return (
    <div>
      {(typeof backendData.users === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => {
          return <p key={i}>{user}</p>
        })
      )}
    </div>
  )
}

export default App
