import "../styles/events.css"

export default function EventCard ({ type="upcoming", eventData }) {

    return (
        <div className={`event-card w-[300px]`}>
            <div className="flex flex-col">
                <img src="../Group 10.svg" className=" w-[175px]" alt="Event" draggable={false} />
                <h3 className="event-title !text-[20px] mt-4"> 
                    <span className="event-title-colour">{eventData?.title}</span> <br />
                    {eventData?.subtitle}
                </h3>
                <p className="event-description mb-4">
                    {eventData?.description}
                </p>
            
                
                <button className="event-btn">View Gallery</button>
            </div>
            
        </div>
    )
}