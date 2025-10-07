import { Routes, Route } from 'react-router-dom';
import SchoolTypeSelection from './SchoolTypeSelection';
import TemplateStyleSelection from './TemplateStyleSelection';
import StudentInformationInput from './StudentInformationInput';
import GradeInputForm from './GradeInputForm';
import ReportCard from './ReportCard';
import Missing from './Missing';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex flex-col">
  <header className="w-full py-6 px-4 bg-indigo-700 shadow-lg flex items-center justify-center mb-8 print:hidden">
  <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Report Card Generator</h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <Routes>
         <Route path="/" element={<SchoolTypeSelection />} />
         <Route path="/templatestyle" element={<TemplateStyleSelection />} />
         <Route path="/studentinfo" element={<StudentInformationInput />} />
         <Route path="/gradeinput" element={<GradeInputForm />} />
         <Route path="/reportcard" element={<ReportCard />} />
         <Route path="*" element={<Missing />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
