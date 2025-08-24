export default function MemberCard({ name, role, headshot }) {
    return (
        <div className="member-container">
            <div className="member-border">
                <div className={`member-card`}>
                    {headshot && (
                        <img
                            className="headshot"
                            src={headshot}
                            loading="lazy"
                        />
                    )}
                </div>
            </div>
            <div className="member-textbox "> 
                <h3 className="text-[20px] font-[600] h-[27px] whitespace-nowrap text-clip">{name}</h3>
                <p className="member-role">{role}</p>
            </div>
        </div>
    )
}