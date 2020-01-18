import React, {useState, useEffect }from 'react';
import './Global.css';
import './App.css';
import './aside.css';
import './Main.css';
import api from './services/api.js'
import DevItem from './components/DevItem/index.js'
import DevForm from './components/DevForm/index.js'


function App() {
  const [devs, setDevs] = useState([]);
    
      useEffect(()=>{
        async function loadDevs(){
          const res =await api.get('/devs');

          setDevs(res.data)
        }
        
        loadDevs();
      },[])

      async function handleAddDev(data){
        const res = await api.post('/devs' , data)
        
        setDevs([...devs, res.data])
      }

  return (
    <div id="app">
      <aside>
        <strong>Register</strong>
        <DevForm onSubmit={handleAddDev} />
        
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem  key={dev._id} dev={dev} />
          ))}

        </ul>
      </main>
    </div>
  );
}

export default App;
