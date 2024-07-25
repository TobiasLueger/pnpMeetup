const Footer = () => {
  return (
    <footer className="flex items-center justify-center py-20 text-[#eee6e1]"> 
        © Copyright pnpMeetup {(new Date().getFullYear())}
    </footer>
  )
}

Footer.propTypes = {}

export default Footer