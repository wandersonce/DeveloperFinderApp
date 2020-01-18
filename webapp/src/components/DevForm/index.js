import React, {useState, useEffect} from 'react';
import './style.css'

function DevForm({onSubmit}) {

    const [github_username, setGithubUsername] = useState('')
    const [techs, setTechs] = useState('')
    
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {latitude, longitude} = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err)
          },
          {
            timeout: 30000,
          }
        );
          },[]);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });

        setGithubUsername('')
        setTechs('')

    }
  
    return(
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">User from Github</label>
            <input  name="github_username" 
                    id="github_username" 
                    required 
                    value={github_username}
                    onChange={e=> setGithubUsername(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Techs</label>
            <input  name="techs" 
                    id="techs" 
                    required
                    value={techs}
                    onChange={e=> setTechs(e.target.value)} 
                    />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latidute">Latitude</label>
              <input  
                      name="latidute" 
                      id="latidute" 
                      required  
                      value={latitude}
                      onChange={e => setLatitude(e.target.value)}
                      />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input  
                      name="longitude"
                      id="longitude" 
                      required 
                      value={longitude} 
                      onChange={e => setLongitude(e.target.value)}
                      />
            </div>
          </div>

          <button type="submit">Save</button>

        </form>
    )
}

export default DevForm