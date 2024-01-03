
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"

function LandingPage({ user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);


  return (
    <div>calculator</div>

  )
}

export default LandingPage