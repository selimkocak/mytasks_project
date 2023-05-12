// frontend/src/components/company/CompanyList.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './CompanyList.css'; // CompanyList.css dosyasını içe aktardık

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    api.listCompanies()
      .then(response => setCompanies(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="company-list-container"> {/* className ile stil sınıfını ekledik */}
      <h3>Companies</h3>
      {companies.map(company => (
        <div key={company.id}>
          <p>{company.name}</p>
        </div>
      ))}
    </div>
  );
}

export default CompanyList;
