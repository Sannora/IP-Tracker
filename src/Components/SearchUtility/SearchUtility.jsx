import { useContext } from 'react'
import './SearchUtility.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import desktopBg from '../../assets/pattern-bg-desktop.png'
import QueryContext from '../../Context/QueryContext'

function SearchUtility(){

    const {inputData, changeInputHandler, getIp, error } = useContext(QueryContext);

    return(

        <div className="utility-container" style={{ backgroundImage: `url(${desktopBg})` }}>
            <h1 className="tracker-heading">IP Address Tracker</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder='Search for any IP address or domain'
                    className='trackerInput'
                    value={inputData}
                    onChange={changeInputHandler}
                />
                <button className="tracker-button" onClick={getIp}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            {error && (
                <div className={`error-bar ${error ? 'visible' : ''}`}>
                    {error}
                </div>
            )}

        </div>

    )

}

export default SearchUtility