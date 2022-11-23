import Avatar from "../components/Avatar";

export default function Cards({ avatar, username, message, id }) {
  return (
    <article key={id}>
      <Avatar alt={username} src={avatar} />
      <div>
        <p className="text-xs w-80">{message}</p>
      </div>
    </article>
  )
}