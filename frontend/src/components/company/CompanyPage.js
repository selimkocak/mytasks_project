// frontend/src/components/company/CompanyPage.js
import React from 'react';
import CompanyList from './CompanyList';
import CreateCompany from './CreateCompany';
import './CompanyPage.css'; // CompanyPage.css dosyasını içe aktardık

function CompanyPage() {
  return (
    <div className="company-page-container"> {/* className ile stil sınıfını ekledik */}
      <h2>Company Page</h2>
      <CreateCompany />
      <CompanyList />
    </div>
  );
}

export default CompanyPage;
