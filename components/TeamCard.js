import Link from "next/link";
import Image from "next/image";

export default function TeamCard({ member, index }) {
  return (
    <Link href={`/team/${member.slug}`} className="team-card" id={`team-card-${member.slug}`}>
      <div className="team-card__image-wrap">
        <Image
          src={member.image}
          alt={member.name}
          width={280}
          height={320}
          className="team-card__image"
          loading={index < 3 ? "eager" : "lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
        />
        <div className="team-card__overlay">
          <span className="team-card__view">View Portfolio →</span>
        </div>
      </div>
      <div className="team-card__info">
        <h3 className="team-card__name">{member.name}</h3>
        <p className="team-card__role">{member.role}</p>
        <div className="team-card__stack">
          {member.stack.slice(0, 3).map((tech) => (
            <span key={tech} className="team-card__tag">{tech}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
