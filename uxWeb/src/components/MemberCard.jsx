export default function MemberCard({ name, role, headshot }) {
    return (
        <div className="member-container">
            <div className="member-border">
                <div className={`member-card ${headshot ? 'cofounder-card' : ''}`}>
                    {headshot && (
                        <img
                            className="cofounder-headshot"
                            src={headshot}
                            alt="Cofounder"
                            loading="lazy"
                        />
                    )}
                </div>
            </div>
            <div className="member-textbox"> 
                <h3 className="text-[20px] font-[600] h-[27px]">{name}</h3>
                <p className="member-role">{role}</p>
            </div>
        </div>
    )
}