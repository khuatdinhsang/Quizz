import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";
import PublicRoute from "@components/routes/PublicRoute";
import { isObjEmpty } from "@utils";
import Login from "@views/pages/authentication/using/Login";
import Register from "@views/pages/authentication/using/Register";
import ResetPasswordBasic from "@views/pages/authentication/using/ResetPasswordBasic";
import Error from "@views/pages/authentication/using/Error";
import HomeComponent from "@views/pages/apps/HomeComponent";
import HomeUserComponent from "@views/pages/apps/HomeComponent/tableData/HomeUser";
import NotAuthorized from "@views/pages/authentication/using/NotAuthorized";
import ListTest from "@views/pages/apps/ListTest";
import QuestionBank from "@views/pages/apps/QuestionBank";
import ExamBank from "@views/pages/apps/ExamBank";
import CategoryManagement from "@views/pages/apps/CategoryManagement";
import CreateExamAutomatic from "@views/pages/apps/CreateExamAutomatic";
import CreateExamManual from "@views/pages/apps/CreateExamManual";
import ViewExamAutomatic from "@views/pages/apps/CreateExamAutomatic/viewExamAutomatic";
import CreateQuizzPage from "@views/pages/apps/ListTest/createQuizzPage";
import ListTestUser from "@views/pages/apps/ListTest/tableData/ListTestUser";
import ExamInfo from "@views/pages/apps/ListTest/tableData/ExamInfo";
import ExamResult from "@views/pages/apps/ListTest/tableData/ExamResult";
import UserDoExam from "@views/pages/apps/ListTest/tableData/UserDoExam";
const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
};

// ** Document title
export const TemplateTitle = "%s - AIS React Admin Template";

// ** Default Route
export const defaultRoute = () => {
  const isLoggedIn = localStorage.getItem("userData");
  if (isLoggedIn && isLoggedIn !== null) {
    return "/home";
  } else {
    return "/login";
  }
  // return "/home"
};

// ** Merge Routes
export const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={defaultRoute()} />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ResetPasswordBasic />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/home",
    element: <HomeComponent />,
  },
  {
    path: "/home-user",
    element: <HomeUserComponent />,
  },
  {
    path: "/exam-bank",
    element: <ExamBank />,
  },
  {
    path: "/list-test",
    element: <ListTest />,
  },
  {
    path: "/list-test-user",
    element: <ListTestUser />,
  },
  {
    path: "/list-test-user/exam-info",
    element: <ExamInfo />,
  },
  {
    path: "/list-test-user/exam-result",
    element: <ExamResult />,
  },
  {
    path: "/question-bank",
    element: <QuestionBank />,
  },
  {
    path: "/topic-management",
    element: <CategoryManagement />,
  },
  {
    path: "/exam-bank/tao-bai-tu-dong",
    element: <CreateExamAutomatic />,
  },
  {
    path: "/exam-bank/tao-bai-thu-cong",
    element: <CreateExamManual />,
  },
  {
    path: "/view-exam-automatic",
    element: <ViewExamAutomatic />,
  },
  {
    path: "/list-test/create-test",
    element: <CreateQuizzPage />,
  },
  {
    path: "/list-test-user/do-exam",
    element: <UserDoExam />,
  },
  //errors
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  //not authorized
  {
    path: "/not-authorized",
    element: <NotAuthorized />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

export const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};
