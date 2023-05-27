import { useNavigate } from 'react-router-dom';
import '../styles/enterprise-card-module.css';

export const EnterpriseCard = ({enterprise}) => {
  const navigate = useNavigate();
  const handleMore = (e) => {
    e.preventDefault();
    navigate(`/enterprises/${enterprise._id}`);
  }
  return (
    <div className="card__enterprise">
      <p className="card__name">{enterprise?.name}</p>
      <p className="card__adress">{enterprise?.adress}</p>
      <p className="card__phone">{enterprise?.phoneNumber}</p>
      <button className="button" onClick={handleMore}>Ver más<i className="gg-chevron-right"></i></button>
    </div>
  )
}