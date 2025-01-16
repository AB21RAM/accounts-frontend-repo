// import axios from "axios";
// import React, { Component } from "react";

// interface Faculty {
//   faculty_id: string;
//   name: string;
// }

// interface State {
//   facultyList: Faculty[];
//   formated_date: string;
//   selected_faculty: string;
// }

// class GenerateSalarySlip extends Component<{}, State> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       facultyList: [],
//       formated_date: '',
//       selected_faculty: ''
//     };
//   }

//   componentDidMount = async () => {
//     const date = new Date();
//     date.setDate(1);
//     date.setMonth(date.getMonth() - 1);

//     const formattedDate = date.toLocaleDateString('en-GB', {
//       month: 'long',
//       year: 'numeric'
//     }).replace(/ /g, ' ');

//     await this.setState({ formated_date: formattedDate });
//     this.fetchALLFaculty();
//   }

//   fetchALLFaculty = async () => {
//     const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/fetchAllFaculty`, {
//       headers: { Authorization: localStorage.getItem('token') }
//     });
//     if (data.msg) console.log(data.msg);
//     else {
//       this.setState({ facultyList: data.facultyList });
//     }
//   }

//   handleFacultySelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
//     await this.setState({ selected_faculty: e.target.value });
//   }

//   handleSelectedFacultyClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     const { selected_faculty } = this.state;

//     if (selected_faculty === '') {
//       alert('Please Select Faculty First!');
//     } else {
//       window.open(`/SalarySlip?faculty_id=${selected_faculty}`, '_blank');
//     }
//   }

//   handleGenerateSalarySlipClick = async () => {
//     try {
//       const { data } = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/generateSalarySlip`, {}, {
//         headers: { Authorization: localStorage.getItem('token') }
//       });
//       if (data.msg) {
//         alert(data.msg);
//       }
//     } catch {
//       alert('Something Went Wrong!');
//     }
//   }

//   render() {
//     const { facultyList, formated_date } = this.state;

//     return (
//       <div className="container mt-3">
//         <div className="card">
//           <div className="card-body">
//             <h5 className="card-title mb-3">View Salary Slip</h5>
//             <hr />

//             <select
//               className="form-select"
//               id="floatingSelect"
//               aria-label="Floating label select example"
//               onChange={this.handleFacultySelect}
//             >
//               <option value="">Select Faculty</option>
//               {facultyList.length > 0 &&
//                 facultyList.map(faculty => (
//                   <option key={faculty.faculty_id} value={faculty.faculty_id}>
//                     {faculty.name}
//                   </option>
//                 ))
//               }
//             </select>

//             <div className="btn-container d-flex justify-content-between mt-3">
//               <a
//                 target="_blank"
//                 className="btn btn-primary"
//                 onClick={this.handleSelectedFacultyClick}
//               >
//                 View Selected Faculty's Salary Slip
//               </a>
//               <a
//                 href="/SalarySlip"
//                 target="_blank"
//                 className="btn btn-primary"
//               >
//                 View All Salary Slips
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="card mt-3">
//           <div className="card-body">
//             <h5 className="card-title mb-3">Generate Salary Slip</h5>
//             <hr />

//             <div className="btn-container d-flex justify-content-between mt-3">
//               <button
//                 className="btn btn-primary"
//                 onClick={this.handleGenerateSalarySlipClick}
//               >
//                 Generate Salary Slip For {formated_date}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default GenerateSalarySlip;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, FileText, Users, CalendarDays } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface Faculty {
  faculty_id: string;
  name: string;
}

interface Month {
  year: number;
  month: string;
}

const GenerateSalarySlip = () => {
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [yearMonthList, setYearMonthList] = useState<Month[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeComponent = async () => {
      const date = new Date();
      date.setDate(1);
      date.setMonth(date.getMonth() - 1);

      const formatted = date
        .toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        })
        .replace(/ /g, " ");

      setFormattedDate(formatted);
      fetchAllFaculty();
      generateYearMonthList();
    };

    initializeComponent();
  }, []);

  const fetchAllFaculty = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/fetchAllFaculty`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      if (data.msg) {
        toast({
          title: "Information",
          description: data.msg,
        });
      } else {
        setFacultyList(data.facultyList);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch faculty list",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateYearMonthList = () => {
    const currentYear = new Date().getFullYear();
    const yearRange = 5; // How many years back
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const list: Month[] = [];
    for (let year = currentYear; year >= currentYear - yearRange; year--) {
      months.forEach((month) => {
        list.push({ year, month });
      });
    }

    setYearMonthList(list);
  };

  const handleFacultySelect = (value: string) => {
    setSelectedFaculty(value);
  };

  const handleMonthSelect = (value: string) => {
    console.log(value.replace(/\s+/g, ""));
    setSelectedMonth(value);
  };

  const handleSelectedFacultyClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (selectedFaculty === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a faculty member first",
      });
      console.log("Please select a faculty member first");
      return;
    }

    const month = selectedMonth.replace(/\s+/g, "");
    window.open(
      `/SalarySlip?faculty_id=${selectedFaculty}&month=${month}`,
      "_blank"
    );
  };

  const handleGenerateSalarySlipClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/generateSalarySlip`,
        {},
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      if (data.msg) {
        toast({
          title: "Success",
          description: data.msg,
        });
        console.log(data.msg);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate salary slip",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            View Salary Slip
          </CardTitle>
          <CardDescription>
            Select a faculty member to view their salary slip or view all salary
            slips
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Select
              disabled={isLoading}
              onValueChange={handleFacultySelect}
              value={selectedFaculty}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Faculty" />
              </SelectTrigger>
              <SelectContent>
                {facultyList.map((faculty) => (
                  <SelectItem
                    key={faculty.faculty_id}
                    value={faculty.faculty_id}
                  >
                    {faculty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              disabled={isLoading}
              onValueChange={handleMonthSelect}
              value={selectedMonth}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {yearMonthList.map((item, index) => (
                  <SelectItem
                    key={`${item.year}-${item.month}-${index}`}
                    value={`${item.month} ${item.year}`}
                  >
                    {item.month} {item.year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button
              variant="outline"
              onClick={handleSelectedFacultyClick}
              disabled={!selectedFaculty || isLoading}
              className="flex-1"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Selected Faculty's Slip
            </Button>

            <Button
              // variant="outline"
              variant={"myBtn"}
              onClick={() => window.open("/SalarySlip", "_blank")}
              disabled={isLoading}
              className="flex-1"
            >
              <Users className="mr-2 h-4 w-4" />
              View All Salary Slips
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Generate Salary Slip
          </CardTitle>
          <CardDescription>
            Generate salary slips for all faculty members
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Alert>
            <AlertTitle>Current Processing Period</AlertTitle>
            <AlertDescription>
              Generating salary slips for {formattedDate}
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleGenerateSalarySlipClick}
            disabled={isLoading}
            variant={"myBtn"}
            className="w-full"
          >
            {isLoading ? (
              "Generating..."
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate Salary Slips
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GenerateSalarySlip;
