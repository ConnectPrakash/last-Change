import React from "react";
import Sidebar from "./component/Sidebar";
import Topbar from "./component/Topbar";
// import ContentRow from "./component/ContentRow";
// import ContentRows from "./component/ContentRows";
// import ContentRowss from "./component/ContentRowss";
// import Illustrations from "./component/Illustrations";
import Footer from "./component/Footer";
import Container from "./component/Container";

function App() {
  return (
    <div>
      <div id="wrapper">
        <Sidebar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar /> 162 - 362
            {/* <div className="container-fluid">
              Page Heading
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <a
                  href="#"
                  className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                >
                  <i className="fas fa-download fa-sm text-white-50"></i>{" "}
                  Generate Report
                </a> */}
{/*                
              <ContentRows/> */}
              {/* <ContentRow /> 464 - 538 */}
              {/* <ContentRowss/> */}
              
             <Container/>
              {/* </div> */}
            {/* </div> */}
         
          </div>
     
            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2021</span>
                    </div>
                </div>
            </footer>
          {/* <Illustrations/> */}
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>

      {/* <!-- Logout Modal--> */}
      <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">Select Logout below if you are ready to end your current session.</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
              <a className="btn btn-primary" href="login.html">Logout</a>
            </div>
          </div>
        </div>
      </div>
        {/* <Footer/> */}
      </div>
    </div>
  );
}

export default App;
