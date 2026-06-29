import "../styles/events.css"
import { useState } from "react"

export default function EventCard ({ type="upcoming", eventData }) {

    const [isExpanded, setIsExpanded] = useState(false)
    const eventImage = eventData?.imageGallery?.[0]

    // Automatically detect if event is in the past
    const isPastEvent = new Date(eventData?.date) < new Date()

    // Pick correct description
    const eventDescription = isPastEvent
        ? eventData?.descriptionPast
        : eventData?.descriptionPresent

    // Character threshold for showing "read more"
    const CHAR_THRESHOLD = 200

    // Helper: truncate text
    const getTruncatedText = (text) => {
        if (!text) return ""
        return text.length > CHAR_THRESHOLD
        ? text.substring(0, CHAR_THRESHOLD) + "..."
        : text
    }

    // Determine whether to truncate
    const needsTruncation = eventDescription && eventDescription.length > CHAR_THRESHOLD
    const displayText = isExpanded ? eventDescription : getTruncatedText(eventDescription)
   

    if (type == "upcoming") {
        return (
            <div className={`event-card w-[825px]`}>
                    <div className="event-upcoming-content">
                        <h3 className="event-title"> 
                            <span className="event-title-colour">{eventData?.title}</span> <br />
                            {eventData?.subtitle}
                        </h3>
                        <div className="event-description-container">
                            <div className={`event-description-scrollable ${isExpanded ? 'expanded' : 'collapsed'}`}>
                                <p className="event-description">
                                    {displayText}
                                </p>
                            </div>
                            {needsTruncation && (
                                <button 
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="read-more-btn"
                                >
                                    {isExpanded ? "Read less" : "Read more"}
                                </button>
                            )}
                        </div>
                        <a 
                            href={eventData?.signupLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="event-btn mt-4 inline-block text-center"
                        >
                            Sign up
                        </a>
                    </div>
                    {eventImage && (
                        <img src={`../${eventImage}`} className="event-image" alt="Event" draggable={false} />
                    )}
                    
            </div>
        )
    }

    return (
        <div className={`event-card w-[433px] h-[600px]`}>
            <div className="event-prev-content">
                <h3 className="event-title"> 
                    <span className="event-title-colour">{eventData?.title}</span> <br />
                    {eventData?.subtitle}
                </h3>
                <div className="event-description-container">
                    <div className={`event-description-scrollable ${isExpanded ? 'expanded' : 'collapsed'}`}>
                        <p className="event-description">
                            {displayText}
                        </p>
                    </div>
                    {needsTruncation && (
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="read-more-btn"
                        >
                            {isExpanded ? "Read less" : "Read more"}
                        </button>
                    )}
                </div>
            
                {eventImage && (
                    <img src={`../${eventImage}`} className="event-image mt-4 mb-4" alt="Event" draggable={false} />
                )}
            </div>
            
        </div>
    )
}
