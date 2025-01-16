// // import React, { Component } from 'react';

// // class Navbar extends Component {

// //   componentDidMount=async()=>{
// //     // console.clear();

// //   }

// //   logout = () =>{
// //     localStorage.clear();
// //     window.location.reload();
// //   }

// //   render() {
// //     return (
// //       <nav className="navbar navbar-expand-lg bg-body-tertiary">
// //         <div className="container">
// //           <a className="navbar-brand" href="#">
// //             <img
// //               src="logo.jpg"
// //               alt="Logo"
// //               width="30"
// //               height="24"
// //               className="d-inline-block align-text-top mx-2"
// //             />
// //             Academate
// //           </a>
// //           <button
// //             className="navbar-toggler"
// //             type="button"
// //             data-bs-toggle="collapse"
// //             data-bs-target="#navbarSupportedContent"
// //             aria-controls="navbarSupportedContent"
// //             aria-expanded="false"
// //             aria-label="Toggle navigation"
// //           >
// //             <span className="navbar-toggler-icon"></span>
// //           </button>
// //           <div className="collapse navbar-collapse" id="navbarSupportedContent">
// //             <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{width:'100%',justifyContent:'end'}}>
// //               <li className="nav-item">
// //                 <a className="nav-link active" aria-current="page" href="/dashboard">
// //                   Dashboard
// //                 </a>
// //               </li>
// //               <li className="nav-item dropdown">
// //                 <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
// //                   Expense
// //                 </a>
// //                 <ul className="dropdown-menu">
// //                   <li><a className="dropdown-item" href="/SalaryForm">Faculty Salary Structure</a></li>
// //                   <li><hr className="dropdown-divider"/></li>
// //                   <li><a className="dropdown-item" href="/SalarySlipMenu">Generate Salary Slip</a></li>
// //                   <li><hr className="dropdown-divider"/></li>
// //                   <li><a className="dropdown-item" href="/salaryPercetageComponets">Salary Component Mapping</a></li>
// //                 </ul>
// //               </li>

// //               <li className="nav-item">
// //                 <a className="nav-link active" aria-current="page" href="/CollectFee">
// //                   Collect Fee
// //                 </a>
// //               </li>
// //               <li className="nav-item">
// //                 <a className="nav-link active" aria-current="page" href="/receipts">
// //                   Receipts
// //                 </a>
// //               </li>

// //               <li className="nav-item dropdown">
// //                 <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
// //                   Reports
// //                 </a>
// //                 <ul className="dropdown-menu">
// //                   <li><a className="dropdown-item" href="/report">Daily Report</a></li>
// //                   <li><hr className="dropdown-divider"/></li>
// //                   <li><a className="dropdown-item" href="/BalReport">Balance Report</a></li>
// //                   <li><hr className="dropdown-divider"/></li>
// //                   <li><a className="dropdown-item" href="/StudentsWiseReport">Student Wise Reports</a></li>
// //                 </ul>
// //               </li>

// //               <li className="nav-item dropdown">
// //                 <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
// //                   Master
// //                 </a>
// //                 <ul className="dropdown-menu">
// //                   <li><a className="dropdown-item" href="/feeheadform">Add Fee Heads</a></li>
// //                   <li><hr className="dropdown-divider"/></li>
// //                   <li><a className="dropdown-item" href="/mapfeeheads">Map Fee Structure</a></li>
// //                 </ul>
// //               </li>

// //               <li className="nav-item dropdown">
// //                 <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
// //                   Bank Statements
// //                 </a>
// //                 <ul className="dropdown-menu">
// //                   <li><a className="dropdown-item" href="/BankStatement">Generate Bank Statement</a></li>
// //                   <li><hr className="dropdown-divider"/></li>
// //                   <li><a className="dropdown-item" href="/StatementPrint">Print Statement</a></li>
// //                 </ul>
// //               </li>

// //               <li className="nav-item">
// //                 <a className="nav-link active" onClick={()=>this.logout()} aria-current="page" href="#">
// //                   Logout
// //                 </a>
// //               </li>

// //             </ul>
// //           </div>
// //         </div>
// //       </nav>
// //     );
// //   }
// // }

// // export default Navbar;

// import React from 'react';
// import { Menu, Calendar } from "lucide-react";
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "../ui/sheet";
// import { Button } from "../ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "../ui/navigation-menu";
// import { cn } from "../../lib/utils";
// import '../../index.css';

// const ListItem = React.forwardRef(({ className, title, href, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           href={href}
//           className={cn(
//             "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-slate-900",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           {children && (
//             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//               {children}
//             </p>
//           )}
//         </a>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";

// const Navbar = () => {

//   const logout = () =>{
//     localStorage.clear();
//     window.location.reload();
//   }

//   const currentDate = new Date().toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: 'long',
//     year: 'numeric'
//   });

//   const navItems = [
//     { title: "Dashboard", href: "/dashboard" },
//     { title: "Expense",
//       items: [
//         { title: "Salary Form", href: "/SalaryForm" },
//         { title: "Salary Slip", href: "/SalarySlipMenu" },
//         { title: "Salary Component Mapping", href: "/salaryPercetageComponets" },
//       ]
//      },
//     {
//       title: "Collect Fee", href: "/CollectFee",
//     },
//     { title: "Receipts", href: "/receipts" },
//     { title: "Reports",
//       items: [
//         { title: "Daily Report", href: "/report" },
//         { title: "Balance Report", href: "/BalReport" },
//         { title: "Student Wise Reports", href: "/StudentsWiseReport" },
//       ]
//     },
//     { title: "Master",items: [
//       { title: "Add Fee Heads", href: "/addfeehead" },
//       { title: "Map Fee Structure", href: "/mapfeeheads" },
//     ] },
//     { title: "Bank Statements", items: [
//       { title: "Generate Bank Statement", href: "/BankStatement" },
//       { title: "Print Statement", href: "/StatementPrint" },
//     ] },

//   ];

//   return (
//     <div className='sticky top-0 z-10'>
//     <header className="border-b-2 bg-[#160747] mt-2 ml-3 mr-3 rounded-lg">
//       <nav className="flex h-16 items-center px-4 container mx-auto">
//         <div className="mr-8 flex items-center gap-2">
//           <img
//             src="images/sitelogo.png"
//             alt="Academate Logo"
//             className="h-8 w-8"
//           />
//           <a href="/" className="font-bold text-2xl text-white">
//             Academate
//           </a>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden lg:flex flex-1 relative">
//           <NavigationMenu className="relative">
//             <NavigationMenuList className="flex gap-2">
//               {navItems.map((item) => (
//                 <NavigationMenuItem key={item.title} className='relative group'>
//                   {item.items ? (
//                     <>
//                       <NavigationMenuTrigger className="bg-[#160747] hover:bg-[#2a1580] text-white text-base">
//                         {item.title}
//                       </NavigationMenuTrigger>
//                       <NavigationMenuContent>
//                         <ul className="absolute left-0 top-full hidden z-50 w-[400px] gap-3 p-4 bg-white text-black shadow-md group-hover:block md:w-[500px] md:grid md:grid-cols-2">
//                           {/* <li>ADMIN</li>
//                           <li>ADMIN</li>
//                           <li>ADMIN</li> */}
//                             <li className="row-span-3">
//                             {item.items.map((subItem) => (
//                             <ListItem
//                               key={subItem.title}
//                               title={subItem.title}
//                               href={subItem.href}
//                             />
//                           ))}
//                             </li>

//                         </ul>
//                       </NavigationMenuContent>
//                     </>
//                   ) : (
//                     <NavigationMenuLink
//                       href={item.href}
//                       className={cn(
//                         navigationMenuTriggerStyle(),
//                         "bg-[#160747] text-white hover:bg-[#2a1580] text-base"
//                       )}
//                     >
//                       {item.title}
//                     </NavigationMenuLink>
//                   )}
//                 </NavigationMenuItem>
//               ))}
//             </NavigationMenuList>
//           </NavigationMenu>

//           <Button
//             variant="destructive"
//             className="absolute mr-1 right-0 bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
//             onClick={logout}
//           >
//             Logout
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         <div className="lg:hidden ml-auto">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="default" className="bg-[#160747] text-white" size="icon">
//                 <Menu className="h-6 w-6" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right">
//               <nav className="flex flex-col space-y-4">
//                 {navItems.map((item) => (
//                   <div key={item.title}>
//                     {item.items ? (
//                       <div className="space-y-4">
//                         <div className="font-medium">{item.title}</div>
//                         <div className="pl-4 space-y-3">
//                           {item.items.map((subItem) => (
//                             <a
//                               key={subItem.title}
//                               href={subItem.href}
//                               className="block text-sm text-muted-foreground hover:text-primary"
//                             >
//                               {subItem.title}
//                             </a>
//                           ))}
//                         </div>
//                       </div>
//                     ) : (
//                       <a
//                         href={item.href}
//                         className="block text-sm font-medium hover:text-primary"
//                       >
//                         {item.title}
//                       </a>
//                     )}
//                   </div>
//                 ))}
//                 <Button
//                   variant="destructive"
//                   className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 mt-16"
//                   onClick={logout}
//                 >
//                   Logout
//                 </Button>
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </nav>
//       <div className="h-[1px] bg-slate-400" />
//       <div className="border-t border-slate-700">
//           <div className="container mx-auto px-4 py-2 flex items-center justify-between">
//              <div className="text-white text-lg">
//                Account
//              </div>
//              <div className="flex items-center gap-1 sm:gap-2 text-white text-xs sm:text-sm">
//                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
//                <span>{currentDate}</span>
//              </div>
//            </div>
//          </div>

//     </header>
//     </div>

//   );
// };

// export default Navbar;

// most optimal one..............................................................................
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { Menu } from "lucide-react";

// const Navbar = () => {
//   const logout = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   const NavLinks = () => (
//     <NavigationMenuList className="hidden lg:flex gap-6">
//       <NavigationMenuItem>
//         <Link to="/dashboard" className="text-sm font-medium">
//           Dashboard
//         </Link>
//       </NavigationMenuItem>

//       <NavigationMenuItem>
//         <NavigationMenuTrigger>Expense</NavigationMenuTrigger>
//         <NavigationMenuContent>
//           <div className="w-48 p-2">
//             <Link to="/SalaryForm" className="block p-2 hover:bg-gray-100 rounded">
//               Faculty Salary Structure
//             </Link>
//             <Link to="/SalarySlipMenu" className="block p-2 hover:bg-gray-100 rounded">
//               Generate Salary Slip
//             </Link>
//             <Link to="/salaryPercetageComponets" className="block p-2 hover:bg-gray-100 rounded">
//               Salary Component Mapping
//             </Link>
//           </div>
//         </NavigationMenuContent>
//       </NavigationMenuItem>

//       <NavigationMenuItem>
//         <Link to="/CollectFee" className="text-sm font-medium">
//           Collect Fee
//         </Link>
//       </NavigationMenuItem>

//       <NavigationMenuItem>
//         <Link to="/receipts" className="text-sm font-medium">
//           Receipts
//         </Link>
//       </NavigationMenuItem>

//       <NavigationMenuItem>
//         <NavigationMenuTrigger>Reports</NavigationMenuTrigger>
//         <NavigationMenuContent>
//           <div className="w-48 p-2">
//             <Link to="/report" className="block p-2 hover:bg-gray-100 rounded">
//               Daily Report
//             </Link>
//             <Link to="/BalReport" className="block p-2 hover:bg-gray-100 rounded">
//               Balance Report
//             </Link>
//             <Link to="/StudentsWiseReport" className="block p-2 hover:bg-gray-100 rounded">
//               Student Wise Reports
//             </Link>
//           </div>
//         </NavigationMenuContent>
//       </NavigationMenuItem>

//       <NavigationMenuItem>
//         <NavigationMenuTrigger>Master</NavigationMenuTrigger>
//         <NavigationMenuContent>
//           <div className="w-48 p-2">
//             <Link to="/feeheadform" className="block p-2 hover:bg-gray-100 rounded">
//               Add Fee Heads
//             </Link>
//             <Link to="/mapfeeheads" className="block p-2 hover:bg-gray-100 rounded">
//               Map Fee Structure
//             </Link>
//           </div>
//         </NavigationMenuContent>
//       </NavigationMenuItem>

//       <NavigationMenuItem>
//         <NavigationMenuTrigger>Bank Statements</NavigationMenuTrigger>
//         <NavigationMenuContent>
//           <div className="w-48 p-2">
//             <Link to="/BankStatement" className="block p-2 hover:bg-gray-100 rounded">
//               Generate Bank Statement
//             </Link>
//             <Link to="/StatementPrint" className="block p-2 hover:bg-gray-100 rounded">
//               Print Statement
//             </Link>
//           </div>
//         </NavigationMenuContent>
//       </NavigationMenuItem>

//       <NavigationMenuItem>
//         <Button
//           variant="ghost"
//           onClick={logout}
//           className="text-sm font-medium"
//         >
//           Logout
//         </Button>
//       </NavigationMenuItem>
//     </NavigationMenuList>
//   );

//   const MobileMenu = () => (
//     <div className="space-y-4 p-4">
//       <Link to="/dashboard" className="block py-2">Dashboard</Link>
//       <div className="space-y-2">
//         <h4 className="font-medium">Expense</h4>
//         <Link to="/SalaryForm" className="block pl-4 py-1">Faculty Salary Structure</Link>
//         <Link to="/SalarySlipMenu" className="block pl-4 py-1">Generate Salary Slip</Link>
//         <Link to="/salaryPercetageComponets" className="block pl-4 py-1">Salary Component Mapping</Link>
//       </div>
//       <Link to="/CollectFee" className="block py-2">Collect Fee</Link>
//       <Link to="/receipts" className="block py-2">Receipts</Link>
//       <div className="space-y-2">
//         <h4 className="font-medium">Reports</h4>
//         <Link to="/report" className="block pl-4 py-1">Daily Report</Link>
//         <Link to="/BalReport" className="block pl-4 py-1">Balance Report</Link>
//         <Link to="/StudentsWiseReport" className="block pl-4 py-1">Student Wise Reports</Link>
//       </div>
//       <div className="space-y-2">
//         <h4 className="font-medium">Master</h4>
//         <Link to="/feeheadform" className="block pl-4 py-1">Add Fee Heads</Link>
//         <Link to="/mapfeeheads" className="block pl-4 py-1">Map Fee Structure</Link>
//       </div>
//       <div className="space-y-2">
//         <h4 className="font-medium">Bank Statements</h4>
//         <Link to="/BankStatement" className="block pl-4 py-1">Generate Bank Statement</Link>
//         <Link to="/StatementPrint" className="block pl-4 py-1">Print Statement</Link>
//       </div>
//       <Button
//         variant="destructive"
//         onClick={logout}
//         className="w-full justify-start px-4"
//       >
//         Logout
//       </Button>
//     </div>
//   );

//   return (
//     // <div>
//     // <NavigationMenu className="w-full max-w-full px-4 lg:px-8 py-4 border-b-2 ml-2 mr-2 my-2 bg-[#160747] rounded-lg">
//     //   <div className="container mx-auto flex items-center justify-between">
//     //     <Link to="/" className="flex items-center space-x-2">
//     //       <img
//     //         src="logo.jpg"
//     //         alt="Logo"
//     //         className="w-8 h-6 object-contain"
//     //         />
//     //       <span className="font-medium">Academate</span>
//     //     </Link>

//     //     <NavLinks />

//     //     <Sheet>
//     //       <SheetTrigger asChild className="lg:hidden">
//     //         <Button variant="ghost" size="icon">
//     //           <Menu className="h-6 w-6" />
//     //         </Button>
//     //       </SheetTrigger>
//     //       <SheetContent side="right">
//     //         <MobileMenu />
//     //       </SheetContent>
//     //     </Sheet>
//     //   </div>
//     // </NavigationMenu>
//     // </div>
// //     <div className='sticky top-0 z-10'>
// //     <header className="border-b-2 bg-[#160747] mt-2 ml-3 mr-3 rounded-lg">
// //       <nav className="flex h-16 items-center px-4 container mx-auto">
// //         <div className="mr-8 flex items-center gap-2">
// //           <img
// //             src="images/sitelogo.png"
// //             alt="Academate Logo"
// //             className="h-8 w-8"
// //           />
// //           <a href="/" className="font-bold text-2xl text-white">
// //             Academate
// //           </a>
// //         </div>

// //         {/* Desktop Navigation */}
// //         <div className="hidden lg:flex flex-1 relative">
// //           <NavigationMenu className="relative">
// //             <NavigationMenuList className="flex gap-2">
// //               {navItems.map((item) => (
// //                 <NavigationMenuItem key={item.title} className='relative group'>
// //                   {item.items ? (
// //                     <>
// //                       <NavigationMenuTrigger className="bg-[#160747] hover:bg-[#2a1580] text-white text-base">
// //                         {item.title}
// //                       </NavigationMenuTrigger>
// //                       <NavigationMenuContent>
// //                         <ul className="absolute left-0 top-full hidden z-50 w-[400px] gap-3 p-4 bg-white text-black shadow-md group-hover:block md:w-[500px] md:grid md:grid-cols-2">
// //                           {/* <li>ADMIN</li>
// //                           <li>ADMIN</li>
// //                           <li>ADMIN</li> */}
// //                             <li className="row-span-3">
// //                             {item.items.map((subItem) => (
// //                             <ListItem
// //                               key={subItem.title}
// //                               title={subItem.title}
// //                               href={subItem.href}
// //                             />
// //                           ))}
// //                             </li>

// //                         </ul>
// //                       </NavigationMenuContent>
// //                     </>
// //                   ) : (
// //                     <NavigationMenuLink
// //                       href={item.href}
// //                       className={
// //                         cn(
// //                         navigationMenuTriggerStyle(),
// //                         "bg-[#160747] text-white hover:bg-[#2a1580] text-base"
// //                       )}
// //                     >
// //                       {item.title}
// //                     </NavigationMenuLink>
// //                   )}
// //                 </NavigationMenuItem>
// //               ))}
// //             </NavigationMenuList>
// //           </NavigationMenu>

// // {/* <NavigationMenu.Root className="NavigationMenuRoot relative">
// // 			<NavigationMenu.List className="NavigationMenuList">
// // 				<NavigationMenu.Item>
// // 					<NavigationMenu.Trigger className="NavigationMenuTrigger">
// // 						Learn <CaretDownIcon className="CaretDown" aria-hidden />
// // 					</NavigationMenu.Trigger>
// // 					<NavigationMenu.Content className="NavigationMenuContent">
// // 						<ul className="List one">
// // 							<li style={{ gridRow: "span 3" }}>
// // 								<NavigationMenu.Link asChild>
// // 									<a className="Callout" href="/">
// // 										<svg
// // 											aria-hidden
// // 											width="38"
// // 											height="38"
// // 											viewBox="0 0 25 25"
// // 											fill="white"
// // 										>
// // 											<path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
// // 											<path d="M12 0H4V8H12V0Z"></path>
// // 											<path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
// // 										</svg>
// // 										<div className="CalloutHeading">Radix Primitives</div>
// // 										<p className="CalloutText">
// // 											Unstyled, accessible components for React.
// // 										</p>
// // 									</a>
// // 								</NavigationMenu.Link>
// // 							</li>

// // 							<ListItem href="https://stitches.dev/" title="Stitches">
// // 								CSS-in-JS with best-in-class developer experience.
// // 							</ListItem>
// // 							<ListItem href="/colors" title="Colors">
// // 								Beautiful, thought-out palettes with auto dark mode.
// // 							</ListItem>
// // 							<ListItem href="https://icons.radix-ui.com/" title="Icons">
// // 								A crisp set of 15x15 icons, balanced and consistent.
// // 							</ListItem>
// // 						</ul>
// // 					</NavigationMenu.Content>
// // 				</NavigationMenu.Item>

// // 				<NavigationMenu.Item>
// // 					<NavigationMenu.Trigger className="NavigationMenuTrigger">
// // 						Overview <CaretDownIcon className="CaretDown" aria-hidden />
// // 					</NavigationMenu.Trigger>
// // 					<NavigationMenu.Content className="NavigationMenuContent">
// // 						<ul className="List two">
// // 							<ListItem
// // 								title="Introduction"
// // 								href="/primitives/docs/overview/introduction"
// // 							>
// // 								Build high-quality, accessible design systems and web apps.
// // 							</ListItem>
// // 							<ListItem
// // 								title="Getting started"
// // 								href="/primitives/docs/overview/getting-started"
// // 							>
// // 								A quick tutorial to get you up and running with Radix
// // 								Primitives.
// // 							</ListItem>
// // 							<ListItem title="Styling" href="/primitives/docs/guides/styling">
// // 								Unstyled and compatible with any styling solution.
// // 							</ListItem>
// // 							<ListItem
// // 								title="Animation"
// // 								href="/primitives/docs/guides/animation"
// // 							>
// // 								Use CSS keyframes or any animation library of your choice.
// // 							</ListItem>
// // 							<ListItem
// // 								title="Accessibility"
// // 								href="/primitives/docs/overview/accessibility"
// // 							>
// // 								Tested in a range of browsers and assistive technologies.
// // 							</ListItem>
// // 							<ListItem
// // 								title="Releases"
// // 								href="/primitives/docs/overview/releases"
// // 							>
// // 								Radix Primitives releases and their changelogs.
// // 							</ListItem>
// // 						</ul>
// // 					</NavigationMenu.Content>
// // 				</NavigationMenu.Item>

// // 				<NavigationMenu.Item>
// // 					<NavigationMenu.Link
// // 						className="NavigationMenuLink"
// // 						href="https://github.com/radix-ui"
// // 					>
// // 						Github
// // 					</NavigationMenu.Link>
// // 				</NavigationMenu.Item>

// // 				<NavigationMenu.Indicator className="NavigationMenuIndicator">
// // 					<div className="Arrow" />
// // 				</NavigationMenu.Indicator>
// // 			</NavigationMenu.List>

// // 			<div className="ViewportPosition">
// // 				<NavigationMenu.Viewport className="NavigationMenuViewport" />
// // 			</div>
// // 		</NavigationMenu.Root> */}

// //           <Button
// //             variant="destructive"
// //             className="absolute mr-1 right-0 bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
// //             onClick={logout}
// //           >
// //             Logout
// //           </Button>
// //         </div>

// //         {/* Mobile Navigation */}
// //         <div className="lg:hidden ml-auto">
// //           <Sheet>
// //             <SheetTrigger asChild>
// //               <Button variant="default" className="bg-[#160747] text-white" size="icon">
// //                 <Menu className="h-6 w-6" />
// //               </Button>
// //             </SheetTrigger>
// //             <SheetContent side="right">
// //               <nav className="flex flex-col space-y-4">
// //                 {navItems.map((item) => (
// //                   <div key={item.title}>
// //                     {item.items ? (
// //                       <div className="space-y-4">
// //                         <div className="font-medium">{item.title}</div>
// //                         <div className="pl-4 space-y-3">
// //                           {item.items.map((subItem) => (
// //                             <a
// //                               key={subItem.title}
// //                               href={subItem.href}
// //                               className="block text-sm text-muted-foreground hover:text-primary"
// //                             >
// //                               {subItem.title}
// //                             </a>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     ) : (
// //                       <a
// //                         href={item.href}
// //                         className="block text-sm font-medium hover:text-primary"
// //                       >
// //                         {item.title}
// //                       </a>
// //                     )}
// //                   </div>
// //                 ))}
// //                 <Button
// //                   variant="destructive"
// //                   className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 mt-16"
// //                   onClick={logout}
// //                 >
// //                   Logout
// //                 </Button>
// //               </nav>
// //             </SheetContent>
// //           </Sheet>
// //         </div>
// //       </nav>
// //       <div className="h-[1px] bg-slate-400" />
// //       <div className="border-t border-slate-700">
// //           <div className="container mx-auto px-4 py-2 flex items-center justify-between">
// //              <div className="text-white text-lg">
// //                Account
// //              </div>
// //              <div className="flex items-center gap-1 sm:gap-2 text-white text-xs sm:text-sm">
// //                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
// //                <span>{currentDate}</span>
// //              </div>
// //            </div>
// //          </div>
// //     </header>
// //     </div>

//   );
// };

// export default Navbar;

import React from "react";
import { Menu, Calendar } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href?: string;
  items?: {
    title: string;
    href: string;
    description?: string;
  }[];
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    children?: React.ReactNode;
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-slate-900",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Navbar = () => {
  const navItems: NavItem[] = [
    { title: "Dashboard", href: "/dashboard" },
    {
      title: "Expense",
      items: [
        { title: "Salary Form", href: "/SalaryForm" },
        { title: "Salary Slip", href: "/SalarySlipMenu" },
        {
          title: "Salary Component Mapping",
          href: "/salaryPercetageComponets",
        },
      ],
    },
    { title: "Collect Fee", href: "/CollectFee" },
    { title: "Receipts", href: "/receipts" },
    {
      title: "Reports",
      items: [
        { title: "Daily Report", href: "/report" },
        { title: "Balance Report", href: "/BalReport" },
        { title: "Student Wise Reports", href: "/StudentsWiseReport" },
      ],
    },
    {
      title: "Master",
      items: [
        { title: "Add Fee Heads", href: "/addfeehead" },
        { title: "Map Fee Structure", href: "/mapfeeheads" },
      ],
    },
    {
      title: "Bank Statements",
      items: [
        { title: "Generate Bank Statement", href: "/BankStatement" },
        { title: "Print Statement", href: "/StatementPrint" },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="sticky top-0 z-10">
      <header className="border-b-2 bg-[#160747] rounded-lg">
        <nav className="flex h-16 items-center px-4 container mx-auto">
          <div className="mr-8 flex items-center gap-2">
            <img
              src="images/sitelogo.png"
              alt="Academate Logo"
              className="h-8 w-8"
            />
            <a href="/" className="font-bold text-2xl text-white">
              Academate
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 relative">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger className="bg-[#160747] hover:bg-[#2a1580] text-white text-base">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[250px]">
                            <li className="row-span-3">
                              {item.items.map((subItem) => (
                                <ListItem
                                  key={subItem.title}
                                  title={subItem.title}
                                  href={subItem.href}
                                />
                              ))}
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-[#160747] text-white hover:bg-[#2a1580] text-base"
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <Button
              variant="destructive"
              className="absolute right-0 bg-red-600 hover:bg-red-700 text-white"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden ml-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="bg-[#160747] text-white hover:bg-[#2a1580]"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <div key={item.title}>
                      {item.items ? (
                        <div className="space-y-4">
                          <div className="font-medium">{item.title}</div>
                          <div className="pl-4 space-y-3">
                            {item.items.map((subItem) => (
                              <a
                                key={subItem.title}
                                href={subItem.href}
                                className="block text-sm text-muted-foreground hover:text-primary"
                              >
                                {subItem.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <a
                          href={item.href}
                          className="block text-sm font-medium hover:text-primary"
                        >
                          {item.title}
                        </a>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="destructive"
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-16"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>

        <div className="h-px bg-slate-400" />
        <div className="border-t border-slate-700">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="text-white text-lg">Account</div>
            <div className="flex items-center gap-1 sm:gap-2 text-white text-xs sm:text-sm">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{currentDate}</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
