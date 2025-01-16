// import axios from 'axios';
// import React, { Component } from 'react';

// interface FeeHead {
//     fh_id: number;
//     head_name: string;
// }

// interface State {
//     collection: number;
//     total: number;
//     balance: number;
//     collectionH: number;
//     totalH: number;
//     balanceH: number;
//     allFee: FeeHead[];
//     fh_id: number;
//     ay: string; // Add ay if needed, since you're fetching based on ay
// }

// class Dashboard extends Component<{}, State> {
//     constructor(props: {}) {
//         super(props);
//         this.state = {
//             collection: 0,
//             total: 0,
//             balance: 0,
//             collectionH: 0,
//             totalH: 0,
//             balanceH: 0,
//             allFee: [],
//             fh_id: 1,
//             ay: '' // Initialize 'ay' if needed
//         };
//     }

//     componentDidMount() {
//         this.FetchDashBoardOver();
//         this.FetchDashBoardHead();
//         this.FetchAllFh();
//     }

//     FetchDashBoardOver = async () => {
//         try {
//             const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/overview`, {
//                 headers: { Authorization: localStorage.getItem('token') }
//             });
//             this.setState({ collection: data.collection });
//             this.setState({ total: data.total });
//             this.setState({ balance: data.balance });
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     FetchDashBoardHead = async () => {
//         try {
//             const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/headwiseOverview?ay=${this.state.ay}&fh_id=${this.state.fh_id}`, {
//                 headers: { Authorization: localStorage.getItem('token') }
//             });
//             this.setState({ collectionH: data.collection });
//             this.setState({ totalH: data.total });
//             this.setState({ balanceH: data.balance });
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     FetchAllFh = async () => {
//         try {
//             const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/fetchAllFh`, {
//                 headers: { Authorization: localStorage.getItem('token') }
//             });
//             if (!data.found) {
//                 console.log(data.error);
//             } else {
//                 this.setState({ allFee: data.result });
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     handleInputChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
//         await this.setState({ fh_id: parseInt(e.target.value, 10) });
//         this.FetchDashBoardHead();
//     };

//     render() {
//         const { allFee, collection, total, balance, collectionH, totalH, balanceH } = this.state;
//         return (
//             <>
//                 <div className="container">
//                     <div className="card mt-3">
//                         <div className="card-body">
//                             <h5 className="card-title">Overall Collection</h5>
//                             <div className="row justify-content-around">
//                                 <div className="card m-3 col-lg-3">
//                                     <div className="card-body">
//                                         <h5 className="card-title">Total</h5>
//                                         <h6>{total}</h6>
//                                     </div>
//                                 </div>
//                                 <div className="card m-3 col-lg-3">
//                                     <div className="card-body">
//                                         <h5 className="card-title">Collected</h5>
//                                         <h6>{collection}</h6>
//                                     </div>
//                                 </div>
//                                 <div className="card m-3 col-lg-3">
//                                     <div className="card-body">
//                                         <h5 className="card-title">Balance</h5>
//                                         <h6>{balance}</h6>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="card mt-3">
//                         <div className="card-body">
//                             <select className="form-select mb-3" aria-label="Default select example" name="feeHeads" onChange={this.handleInputChange}>
//                                 {allFee.length > 0 &&
//                                     allFee.map((fee) => (
//                                         <option key={fee.fh_id} value={fee.fh_id}>
//                                             {fee.head_name}
//                                         </option>
//                                     ))}
//                             </select>
//                             <div className="row justify-content-around">
//                                 <div className="card m-3 col-lg-3">
//                                     <div className="card-body">
//                                         <h5 className="card-title">Total</h5>
//                                         <h6>{totalH}</h6>
//                                     </div>
//                                 </div>
//                                 <div className="card m-3 col-lg-3">
//                                     <div className="card-body">
//                                         <h5 className="card-title">Collected</h5>
//                                         <h6>{collectionH}</h6>
//                                     </div>
//                                 </div>
//                                 <div className="card m-3 col-lg-3">
//                                     <div className="card-body">
//                                         <h5 className="card-title">Balance</h5>
//                                         <h6>{balanceH}</h6>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

// export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ArrowUpIcon, ArrowDownIcon, DollarSign } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";

// interface FeeHead {
//   fh_id: number;
//   head_name: string;
// }

// // interface DashboardStats {
// //   collection: number;
// //   total: number;
// //   balance: number;
// // }

// // interface FeeHead {
// //     fh_id: number;
// //     head_name: string;
// // }

// interface DashboardStats {
//     collection: number;
//     total: number;
//     balance: number;
//     collectionH: number;
//     totalH: number;
//     balanceH: number;
//     allFee: FeeHead[];
//     fh_id: number;
//     ay: string; // Add ay if needed, since you're fetching based on ay
// }

// const Dashboard: React.FC = () => {
//   const [overviewStats, setOverviewStats] = useState<DashboardStats>({
//     collection: 0,
//     total: 0,
//     balance: 0,
//   });
//   const [headwiseStats, setHeadwiseStats] = useState<DashboardStats>({
//     collection: 0,
//     total: 0,
//     balance: 0
//   });
//   const [feeHeads, setFeeHeads] = useState<FeeHead[]>([]);
//   const [selectedFeeHead, setSelectedFeeHead] = useState<string>("1");
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         await Promise.all([
//           fetchDashboardOverview(),
//           fetchAllFeeHeads()
//         ]);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching initial data:", error);
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   useEffect(() => {
//     fetchHeadwiseOverview();
//   }, [selectedFeeHead]);

//   const fetchDashboardOverview = async () => {
//     try {
//       const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/overview`, {
//         headers: { Authorization: localStorage.getItem('token') }
//       });
//       setOverviewStats(data);
//     } catch (error) {
//       console.error("Error fetching overview:", error);
//     }
//   };

//   const fetchHeadwiseOverview = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/headwiseOverview?fh_id=${selectedFeeHead}`,
//         {
//           headers: { Authorization: localStorage.getItem('token') }
//         }
//       );
//       setHeadwiseStats(data);
//     } catch (error) {
//       console.error("Error fetching headwise overview:", error);
//     }
//   };

//   const fetchAllFeeHeads = async () => {
//     try {
//       const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/fetchAllFh`, {
//         headers: { Authorization: localStorage.getItem('token') }
//       });
//       if (data.found) {
//         setFeeHeads(data.result);
//       }
//     } catch (error) {
//       console.error("Error fetching fee heads:", error);
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   const calculatePercentage = (value: number, total: number) => {
//     return total > 0 ? ((value / total) * 100).toFixed(1) : '0';
//   };

//   const StatCard: React.FC<{
//     title: string;
//     value: number;
//     total?: number;
//     type: 'positive' | 'negative' | 'neutral';
//   }> = ({ title, value, total, type }) => (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">{title}</CardTitle>
//         <DollarSign className="h-4 w-4 text-muted-foreground" />
//       </CardHeader>
//       <CardContent>
//         <div className="flex flex-col space-y-1">
//           <span className="text-2xl font-bold">{formatCurrency(value)}</span>
//           {total && (
//             <div className="flex items-center text-xs text-muted-foreground">
//               {type === 'positive' && <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />}
//               {type === 'negative' && <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />}
//               <span className={`${
//                 type === 'positive' ? 'text-green-500' :
//                 type === 'negative' ? 'text-red-500' :
//                 'text-muted-foreground'
//               }`}>
//                 {calculatePercentage(value, total)}% of total
//               </span>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );

//   if (loading) {
//     return (
//       <div className="container mx-auto p-8 space-y-8">
//         <div className="grid gap-4 md:grid-cols-3">
//           {[1, 2, 3].map((i) => (
//             <Card key={i}>
//               <CardHeader>
//                 <Skeleton className="h-4 w-[150px]" />
//               </CardHeader>
//               <CardContent>
//                 <Skeleton className="h-8 w-[200px]" />
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-8 space-y-8">
//       <div>
//         <h2 className="text-3xl font-bold tracking-tight mb-4">Overall Collection</h2>
//         <div className="grid gap-4 md:grid-cols-3">
//           <StatCard
//             title="Total Amount"
//             value={overviewStats.total}
//             type="neutral"
//           />
//           <StatCard
//             title="Collected Amount"
//             value={overviewStats.collection}
//             total={overviewStats.total}
//             type="positive"
//           />
//           <StatCard
//             title="Balance Amount"
//             value={overviewStats.balance}
//             total={overviewStats.total}
//             type="negative"
//           />
//         </div>
//       </div>

//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-3xl font-bold tracking-tight">Fee Head Analysis</h2>
//           <Select
//             value={selectedFeeHead}
//             onValueChange={setSelectedFeeHead}
//           >
//             <SelectTrigger className="w-[200px]">
//               <SelectValue placeholder="Select Fee Head" />
//             </SelectTrigger>
//             <SelectContent>
//               {feeHeads.map((fee) => (
//                 <SelectItem key={fee.fh_id} value={fee.fh_id.toString()}>
//                   {fee.head_name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="grid gap-4 md:grid-cols-3">
//           <StatCard
//             title="Total Amount"
//             value={headwiseStats.total}
//             type="neutral"
//           />
//           <StatCard
//             title="Collected Amount"
//             value={headwiseStats.collection}
//             total={headwiseStats.total}
//             type="positive"
//           />
//           <StatCard
//             title="Balance Amount"
//             value={headwiseStats.balance}
//             total={headwiseStats.total}
//             type="negative"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { IndianRupee, TrendingDown, TrendingUp } from "lucide-react";

// Types from your existing code
interface FeeHead {
  fh_id: number;
  head_name: string;
}

interface DashboardStats {
  collection: number;
  total: number;
  balance: number;
}

interface ApiResponse {
  found?: boolean;
  error?: string;
  result?: FeeHead[];
  collection?: number;
  total?: number;
  balance?: number;
}

const Dashboard = () => {
  // State management
  const [overallStats, setOverallStats] = useState<DashboardStats>({
    collection: 0,
    total: 0,
    balance: 0,
  });

  const [headwiseStats, setHeadwiseStats] = useState<DashboardStats>({
    collection: 0,
    total: 0,
    balance: 0,
  });

  const [feeHeads, setFeeHeads] = useState<FeeHead[]>([]);
  const [selectedFeeHead, setSelectedFeeHead] = useState<string>("1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const initializeDashboard = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchOverallStats(), fetchFeeHeads()]);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  // Fetch headwise stats when fee head changes
  useEffect(() => {
    if (selectedFeeHead) {
      fetchHeadwiseStats();
    }
  }, [selectedFeeHead]);

  const fetchOverallStats = async () => {
    try {
      const { data } = await axios.get<ApiResponse>(
        `${import.meta.env.VITE_APP_BASE_URL}/overview`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      setOverallStats({
        collection: data.collection || 0,
        total: data.total || 0,
        balance: data.balance || 0,
      });
    } catch (error) {
      console.error("Error fetching overall stats:", error);
      throw error;
    }
  };

  const fetchHeadwiseStats = async () => {
    try {
      const { data } = await axios.get<ApiResponse>(
        `${import.meta.env.VITE_APP_BASE_URL}/headwiseOverview`,
        {
          params: {
            fh_id: selectedFeeHead,
          },
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      setHeadwiseStats({
        collection: data.collection || 0,
        total: data.total || 0,
        balance: data.balance || 0,
      });
    } catch (error) {
      console.error("Error fetching headwise stats:", error);
      setError("Failed to load fee head details");
    }
  };

  const fetchFeeHeads = async () => {
    try {
      const { data } = await axios.get<ApiResponse>(
        `${import.meta.env.VITE_APP_BASE_URL}/fetchAllFh`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      if (data.found && data.result) {
        setFeeHeads(data.result);
      } else {
        setError("No fee heads found");
      }
    } catch (error) {
      console.error("Error fetching fee heads:", error);
      throw error;
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const StatCard: React.FC<{
    title: string;
    amount: number;
    type?: "total" | "collected" | "balance";
  }> = ({ title, amount, type = "total" }) => (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {type === "collected" && (
          <TrendingUp className="h-4 w-4 text-green-500" />
        )}
        {type === "balance" && (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
        {type === "total" && <IndianRupee className="h-4 w-4 text-primary" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(amount)}</div>
        {type !== "total" && (
          <p className="text-xs text-muted-foreground mt-1">
            {((amount / (overallStats.total || 1)) * 100).toFixed(1)}% of total
          </p>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="container p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-[150px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[200px]" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container p-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container p-6 space-y-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">Overall Collection</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Total Amount"
            amount={overallStats.total}
            type="total"
          />
          <StatCard
            title="Collected Amount"
            amount={overallStats.collection}
            type="collected"
          />
          <StatCard
            title="Balance Amount"
            amount={overallStats.balance}
            type="balance"
          />
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Fee Head Analysis</h2>
          <Select value={selectedFeeHead} onValueChange={setSelectedFeeHead}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Fee Head" />
            </SelectTrigger>
            <SelectContent>
              {feeHeads.map((fee) => (
                <SelectItem key={fee.fh_id} value={fee.fh_id.toString()}>
                  {fee.head_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Total Amount"
            amount={headwiseStats.total}
            type="total"
          />
          <StatCard
            title="Collected Amount"
            amount={headwiseStats.collection}
            type="collected"
          />
          <StatCard
            title="Balance Amount"
            amount={headwiseStats.balance}
            type="balance"
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
