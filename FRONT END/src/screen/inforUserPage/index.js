import React, { useState, useEffect } from 'react';
import NavBar from '../../component/navbar/navbar';
import InforUserContent from '../../component/inforUserContent/inforUser';
import Footer from '../../component/footer/footer';
const InforUserPage = () => {
  return (
    <div className="infor-user-page-container">
      <NavBar info_check />
      <InforUserContent />
      <Footer />
    </div>
  );
};

export default InforUserPage;
