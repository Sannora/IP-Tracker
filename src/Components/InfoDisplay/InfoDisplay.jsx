import { useContext } from 'react'
import './InfoDisplay.css'
import QueryContext from '../../Context/QueryContext'

function InfoDisplay(){

    const { clientData, responseData } = useContext(QueryContext);

    return(

        <div className="info-display">
            <div className="details-container">
                {/* soldaki operand true ise(truthy) o renderlanırken false ise(falsy) sağdaki operand'a bakılır */}
                <div className="details">
                    <h3 className="details-heading">IP Address</h3>
                    <p className="details-info">{responseData.ip || clientData.ip}</p>
                </div>
                <div className="details">
                    <h3 className="details-heading">Location</h3>
                    <p className="details-info">{responseData.location || clientData.location}</p>
                </div>
                <div className="details">
                    <h3 className="details-heading">Timezone</h3>
                    <p className="details-info">{responseData.timezone || clientData.timezone}</p>
                </div>
                <div className="details">
                    <h3 className="details-heading">ISP</h3>
                    <p className="details-info">{responseData.isp || clientData.isp}</p>
                </div>
            </div>
        </div>

    )

}

export default InfoDisplay