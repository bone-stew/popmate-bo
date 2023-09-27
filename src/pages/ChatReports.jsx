import React, { useState } from 'react';
import styles from '../features/report/ChatReports.module.css';
import ReportTable from '../features/report/ReportTable';
import ReportTableDetail from '../features/report/ReportTableDetail';

function ChatReports() {
  const [selectedUser, _selectedUser] = useState();
  return (
    <div className={styles.container}>
      <ReportTable _selectedUser={_selectedUser} />
      <ReportTableDetail selectedUser={selectedUser} />
    </div>
  );
}

export default ChatReports;
