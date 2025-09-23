import "../styles/events.css"
import { useState } from "react"

export default function EventCard ({ type="upcoming", eventData }) {
    const [isExpanded, setIsExpanded] = useState(false)
    
    // Character threshold for showing "read more"
    const CHAR_THRESHOLD = 200
    
    // Function to get truncated text
    const getTruncatedText = (text) => {
        if (!text) return ""
        return text.length > CHAR_THRESHOLD ? text.substring(0, CHAR_THRESHOLD) + "..." : text
    }
    
    // Check if text needs truncation
    const needsTruncation = eventData?.description && eventData.description.length > CHAR_THRESHOLD
    const displayText = isExpanded ? eventData?.description : getTruncatedText(eventData?.description)

    return (
        <div className={`event-card w-[300px] h-[450px]`}>
            <div className="flex flex-col h-full">
                <img src={`../${eventData?.imageGallery?.[0] || "Group 10.svg"}`} className="w-[175px] rounded-2xl object-cover" alt="Event" draggable={false} />
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