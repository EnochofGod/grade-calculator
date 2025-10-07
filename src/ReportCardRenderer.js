import React from 'react';
import { useNavigate } from 'react-router-dom';
// import PageLayout from './App';
import { Printer, Home } from 'lucide-react';
import ActionButton from './ActionButton';
import { handlePrint, getTemplateSpecificHeaders } from './reportCardUtils';
import Header from './Header';

const ReportCardRenderer = ({ schoolType, templateStyle, studentData, result, config, resetData }) => {
    const navigate = useNavigate();
    
    // Custom print function
    // handlePrint is now imported from reportCardUtils

    const isUniversity = schoolType === 'UNIVERSITY';
    const totalUnits = result.totalUnits || result.grades.reduce((sum, g) => sum + (g.units || 0), 0);
    const resultColor = isUniversity && result.gpa >= 3.5 ? 'text-green-600' : isUniversity && result.gpa >= 2.0 ? 'text-yellow-600' : 'text-red-600';

    // File: ReportCardGenerator.jsx - React Functional Component (Renderer Sub-component): Renders the main title and school name.
    const Header = ({ title, subtitle, className = '' }) => (
        <div className={`text-center mb-6 pb-4 border-b-2 border-indigo-200 ${className} print:hidden`}>
            <h2 className="text-4xl font-extrabold text-indigo-800 uppercase">{title}</h2>
            <p className="text-xl text-gray-600 mt-1">{subtitle}</p>
        </div>
    );

    // File: ReportCardGenerator.jsx - React Functional Component (Renderer Sub-component): Renders student details in a panel format.
    const StudentInfoPanel = ({ children, className = '' }) => (
        <div className={`grid grid-cols-2 gap-4 text-lg mb-8 p-4 bg-indigo-50 rounded-lg ${className} print:hidden`}>
            <div className="font-semibold text-gray-700">Name: <span className="font-normal text-gray-900 block">{studentData.name}</span></div>
            <div className="font-semibold text-gray-700">ID: <span className="font-normal text-gray-900 block">{studentData.studentId}</span></div>
            <div className="font-semibold text-gray-700">Academic Period: <span className="font-normal text-gray-900 block">{studentData.year}</span></div>
            {children}
        </div>
    );

    // File: ReportCardGenerator.jsx - React Functional Component (Renderer Sub-component): Renders the grades in a styled HTML table.
    const StandardGradesTable = ({ headers, grades, tableClass = '', headerClass = 'bg-indigo-700 text-white' }) => (
        <div className="overflow-x-auto mb-10">
            <table className={`min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden ${tableClass}`}>
                <thead className={headerClass}>
                    <tr>
                        {headers.map(h => (
                            <th key={h.key} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">{h.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {grades.map((g, index) => (
                        <tr key={g.id || index} className={`hover:bg-gray-50 transition duration-150 ${index % 2 === 1 && tableClass.includes('odd:bg-gray-100') ? 'odd:bg-gray-100' : ''}`}>
                            {headers.map(h => (
                                <td key={h.key} className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {g[h.key] !== undefined && g[h.key] !== '' ? g[h.key] : <span className="text-gray-400 italic">N/A</span>}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );


    // File: ReportCardGenerator.jsx - React Functional Component (Specific Template Sub-component): Formal & Official Style (Template 1)
    const Template1 = () => (
        <>
            <Header title={config.schoolName} subtitle="FORMAL ACADEMIC RESULT SHEET" />
            <StudentInfoPanel>
                 <div className="font-semibold text-gray-700">Overall Result: <span className={`font-extrabold ${resultColor} text-2xl block`}>
                    {isUniversity ? `CGPA: ${result.gpa}` : 'See Grades'}
                </span></div>
            </StudentInfoPanel>
            <h3 className="text-2xl font-bold text-indigo-700 mb-4">Course Performance</h3>
            <StandardGradesTable headers={getTemplateSpecificHeaders(schoolType, templateStyle, isUniversity)} grades={result.grades} />
            
            {isUniversity && (
                <div className="text-right font-bold text-lg p-2 border-t border-gray-300">
                    Total Units Registered: <span className="text-indigo-600">{totalUnits}</span>
                </div>
            )}
        </>
    );

    // File: ReportCardGenerator.jsx - React Functional Component (Specific Template Sub-component): Modern Summary Style (Template 2)
    const Template2 = () => (
        <div className="p-4">
            <Header title={config.schoolName} subtitle="MODERN ACADEMIC SUMMARY" className="border-blue-400" />
            
            {/* Summary Blocks */}
            <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                <div className="p-4 bg-blue-100 rounded-lg shadow-md border-b-4 border-blue-500">
                    <p className="text-sm text-blue-800 font-medium">Name</p>
                    <p className="text-xl font-bold text-gray-900 truncate">{studentData.name}</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-lg shadow-md border-b-4 border-blue-500">
                    <p className="text-sm text-blue-800 font-medium">ID</p>
                    <p className="text-xl font-bold text-gray-900">{studentData.studentId}</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-lg shadow-md border-b-4 border-blue-500">
                    <p className="text-sm text-blue-800 font-medium">{isUniversity ? 'CGPA' : 'Year'}</p>
                    <p className={`text-3xl font-extrabold ${isUniversity ? resultColor : 'text-gray-900'}`}>{isUniversity ? result.gpa : studentData.year}</p>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-blue-700 mb-4 border-l-4 border-blue-500 pl-2">Subject Performance</h3>
            
            {/* Condensed Grid/List for Grades */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.grades.map(g => (
                    <div key={g.id} className="p-4 bg-white border border-gray-200 rounded-md flex justify-between items-center shadow-sm">
                        <span className="font-semibold text-gray-800">{isUniversity ? g.course : g.subject}</span>
                        <span className={`text-lg font-bold ${g.grade.includes('Fail') || g.grade.includes('F') ? 'text-red-500' : 'text-green-600'}`}>
                            {g.grade} {isUniversity && `(${g.units} units)`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    // File: ReportCardGenerator.jsx - React Functional Component (Specific Template Sub-component): Detailed Breakdown Style (Template 3)
    const Template3 = () => (
        <div className="p-4">
            <Header title={config.schoolName} subtitle="DETAILED PERFORMANCE REPORT" className="border-green-400" />
            <StudentInfoPanel className="bg-green-50 border border-green-200">
                <div className="col-span-2 text-center text-xl font-extrabold text-green-700">
                    {isUniversity ? `Current CGPA: ${result.gpa}` : `Total Subjects: ${result.grades.length}`}
                </div>
            </StudentInfoPanel>
            
            <h3 className="text-2xl font-bold text-green-700 mb-4">Grade Analysis</h3>
            <StandardGradesTable 
                headers={getTemplateSpecificHeaders(schoolType, templateStyle, isUniversity)} 
                grades={result.grades} 
                tableClass="odd:bg-gray-100" 
                headerClass="bg-green-600 text-white" 
            />
             <div className="mt-6 p-4 border-t border-b border-green-300">
                <p className="font-bold text-lg text-gray-700">Principal/HOD Comment:</p>
                <p className="text-gray-600 italic mt-2">
                    {isUniversity ? 'This academic performance indicates a strong grasp of core subjects. Continue to maintain consistency in unit load and quality points.' : 'Overall performance is satisfactory. Ensure to focus on areas needing improvement and maintain excellent behavior and effort.'}
                </p>
            </div>
        </div>
    );
    
    // File: ReportCardGenerator.jsx - React Functional Component (Specific Template Sub-component): Minimalist Print Style (Template 4)
    const Template4 = () => (
        <div className="p-2">
            <Header title={config.schoolName} subtitle="ACADEMIC REPORT (PRINT OPTIMIZED)" className="border-gray-900" />
            
            <div className="grid grid-cols-3 gap-2 text-sm mb-6 pb-2 border-b border-gray-400">
                <p><strong>Name:</strong> {studentData.name}</p>
                <p><strong>ID:</strong> {studentData.studentId}</p>
                <p><strong>Period:</strong> {studentData.year}</p>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-3">Performance Record</h3>
            
            <StandardGradesTable 
                headers={getTemplateSpecificHeaders(schoolType, templateStyle, isUniversity)} 
                grades={result.grades} 
                tableClass="border border-gray-700"
                headerClass="bg-gray-200 text-gray-800 border-b border-gray-700"
            />
            
            {isUniversity && (
                <div className="flex justify-between mt-4 border-t border-gray-700 pt-2">
                    <p className="font-semibold">Total Units: {totalUnits}</p>
                    <p className={`font-extrabold text-lg`}>CGPA: {result.gpa}</p>
                </div>
            )}
            
            <div className="mt-8 pt-4 border-t border-dashed border-gray-500 flex justify-between text-sm">
                <p>Teacher's Signature: __________________</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
        </div>
    );


    let TemplateComponent = Template1;
    switch (templateStyle) {
        case 2: TemplateComponent = Template2; break;
        case 3: TemplateComponent = Template3; break;
        case 4: TemplateComponent = Template4; break;
        default: TemplateComponent = Template1;
    }

    return (
        <div className={`report-card-container p-6 rounded-xl shadow-2xl bg-white ${templateStyle === 1 ? 'border-4 border-indigo-700' : templateStyle === 2 ? 'border-4 border-blue-500' : templateStyle === 3 ? 'border-4 border-green-600' : 'border-2 border-gray-900'}`}>
            <TemplateComponent />
            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 print:hidden">
                <ActionButton onClick={handlePrint} Icon={Printer} className="bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow hover:bg-indigo-800 transition-all duration-200">
                    Print/Save as PDF
                </ActionButton>
                <button
                    onClick={() => { resetData(); navigate('/'); }}
                    className="flex items-center justify-center py-4 px-6 rounded-xl shadow-md text-lg font-bold text-white bg-indigo-700 hover:bg-indigo-800 transition-all duration-200"
                >
                    <Home size={24} className="mr-2" />
                    Start New Report
                </button>
            </div>
        </div>
    );
}

export default ReportCardRenderer;

