import "../styles/events.css"
import { useState } from "react"

export default function EventCard ({ eventData }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const eventImage = eventData?.imageGallery?.[0]

    const isPastEvent = new Date(eventData?.date) < new Date()
    const eventDescription = isPastEvent
        ? eventData?.descriptionPast
        : eventData?.descriptionPresent
    
    // Character threshold for showing "read more"
    const CHAR_THRESHOLD = 200
    
    // Function to get truncated text
    const getTruncatedText = (text) => {
        if (!text) return ""
        return text.length > CHAR_THRESHOLD ? text.substring(0, CHAR_THRESHOLD) + "..." : text
    }
    
    // Check if text needs truncation
    const needsTruncation = eventDescription && eventDescription.length > CHAR_THRESHOLD
    const displayText = isExpanded ? eventDescription : getTruncatedText(eventDescription)

    return (
        <div className={`event-card w-[300px] h-[450px]`}>
            <div className="flex flex-col h-full">
                {eventImage && (
                    <img src={`../${eventImage}`} className="event-image-mobile" alt="Event" draggable={false} />
                )}
                <h3 className="event-title !text-[20px] mt-4"> 
                    <span className="event-title-colour">{eventData?.title}</span> <br />
                    {eventData?.subtitle}
                </h3>
                <div className="event-description-container flex-1">
                    <div className={`event-description-scrollable-mobile ${isExpanded ? 'expanded' : 'collapsed'}`}>
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
            </div>
        </div>
    )
}
