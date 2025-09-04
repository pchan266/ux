import "../styles/events.css"

export default function EventCard ({ type="upcoming", eventData }) {

    if (type == "upcoming") {
        return (
            <div className={`event-card w-[825px]`}>
                    <div className="event-upcoming-content">
                        <h3 className="event-title"> 
                            <span className="event-title-colour">{eventData?.title}</span> <br />
                            {eventData?.subtitle}
                        </h3>
                        <p className="event-description">
                            {eventData?.description}
                        </p>
                   
                    </div>
                    <img src="../Group 10.svg" className="h-[311px] w-[374px]" alt="Event" draggable={false} />
            </div>
        )
    }

    return (
        <div className={`event-card w-[433px] h-[529px]`}>
            <div className="event-prev-content">
                <h3 className="event-title"> 
                    <span className="event-title-colour">{eventData?.title}</span> <br />
                    {eventData?.subtitle}
                </h3>
                <p className="event-description">
                    {eventData?.description}
                </p>
            
                <img src="../Group 10.svg" className="h-[311px] w-[374px] mt-4 mb-4" alt="Event" draggable={false} />
                <button className="event-btn">View Gallery</button>
            </div>
            
        </div>
    )
}