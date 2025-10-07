// Helper functions for ReportCardRenderer

export const handlePrint = () => {
  document.body.classList.add('print-mode');
  window.print();
  setTimeout(() => {
    document.body.classList.remove('print-mode');
  }, 500);
};

export const getTemplateSpecificHeaders = (schoolType, style, isUniversity) => {
  let headers = [
    { key: isUniversity ? 'course' : 'subject', label: isUniversity ? 'Course Code & Title' : 'Subject' },
    { key: 'score', label: 'Score' },
  ];
  if (isUniversity) {
    headers.push({ key: 'units', label: 'Units' });
    headers.push({ key: 'grade', label: 'Grade' });
    headers.push({ key: 'qualityPoint', label: 'QP' });
  } else {
    headers.push({ key: 'grade', label: 'Grade/Remark' });
    if (schoolType === 'SECONDARY' && (style === 3 || style === 4)) {
      headers.push({ key: 'teacherComment', label: "Teacher's Comment" });
    } else if (schoolType === 'PRIMARY' && (style === 3 || style === 4)) {
      headers.push({ key: 'effort', label: "Effort" });
      headers.push({ key: 'behavior', label: "Behavior" });
    }
  }
  return headers;
};
