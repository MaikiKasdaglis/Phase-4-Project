import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function BreadCrumbs() {
  const location = useLocation();
  console.log("this is the loccation from bread crumbs", location);
  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink = +`/${crumb}`;
      return (
        <div className="crumb" key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </div>
      );
    });
  return <div>{crumbs}</div>;
}

// import Breadcrumb from "react-bootstrap/Breadcrumb";

// function BreadcrumbExample() {
//   return (
//     <Breadcrumb>
//       <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
//       <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
//         Library
//       </Breadcrumb.Item>
//       <Breadcrumb.Item active>Data</Breadcrumb.Item>
//     </Breadcrumb>
//   );
// }

// export default BreadcrumbExample;
