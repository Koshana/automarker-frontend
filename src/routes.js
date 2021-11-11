import Index from "views/Index";
// import LectureDashborad from "views/examples/LectureDashborad";
// import StudentDashborad from "views/examples/StudentDashborad";
import Dashborad from "views/examples/Dashborad";
import Login from "views/examples/Login";
import CustomizeFeatureVector from "views/examples/CustomizeFeatureVector"
import GenerateFeatureVector from "views/examples/GenerateFeatureVector";
import GenerateMarks from "views/examples/GenerateMarks"
import ViewMarks from "views/examples/ViewMarks"
import Feedback from "views/examples/Feedback"
import PlagiarismReport from "views/examples/PlagiarismReport"

export function routes () {
  if (sessionStorage.getItem("user") == "stu") {
    return [
      {
        path: "/index",
        name: "Module",
        icon: "ni ni-align-center text-blue",
        component: Dashborad,
        layout: "/admin",
      },
      {
        path: "/view-marks",
        name: "Marks",
        icon: "ni ni-badge text-blue",
        component: ViewMarks,
        layout: "/admin",
      },
      {
        path: "/feedback",
        name: "Feedback",
        icon: "ni ni-ruler-pencil text-blue",
        component: Feedback,
        layout: "/admin",
      },
      {
        path: "/plagiarism-report",
        name: "Plagiarism Report",
        icon: "ni ni-paper-diploma text-blue",
        component: PlagiarismReport,
        layout: "/admin",
      },
      {
        path: "/login",
        component: Login,
        layout: "/auth",
      },
    ];
  } else {
    return [
      {
        path: "/index",
        name: "Module",
        icon: "ni ni-align-center text-primary",
        component: Dashborad,
        layout: "/admin",
      },
      // {
      //   path: "/customize-feature-vector",
      //   name: "Customize Feature Vector",
      //   icon: "ni ni-single-copy-04 text-primary",
      //   component: CustomizeFeatureVector,
      //   layout: "/admin",
      // },
      {
        path: "/generate-feature-vector",
        name: "Generate Feature Vector",
        icon: "ni ni-single-copy-04 text-primary",
        component: GenerateFeatureVector,
        layout: "/admin",
      },
      {
        path: "/generate-marks",
        name: "Marks Generation",
        icon: "ni ni-collection text-primary",
        component: GenerateMarks,
        layout: "/admin",
      },
      {
        path: "/generate-marks",
        name: "Marks",
        icon: "ni ni-badge text-primary",
        component: GenerateMarks,
        layout: "/admin",
      },
      {
        path: "/generate-marks",
        name: "Plagiarism Checker",
        icon: "ni ni-check-bold text-primary",
        component: GenerateMarks,
        layout: "/admin",
      },
      {
        path: "/login",
        component: Login,
        layout: "/auth",
      },
    ];
  }
} 
