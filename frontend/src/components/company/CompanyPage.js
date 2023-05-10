// frontend/src/components/company/CompanyPage.js
import React from 'react';
import CompanyList from './CompanyList';
import CreateCompany from './CreateCompany';

function CompanyPage() {
  return (
    <div>
      <h2>Company Page</h2>
      <CreateCompany />
      <CompanyList />
    </div>
  );
}

export default CompanyPage;
