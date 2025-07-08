import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import MyTools from './pages/MyTools';
import AddProduct from './pages/AddProduct';
import EditProfile from './pages/EditProfile';
import Queries from './pages/Queries';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SendEmail from './pages/SendEmail';
import ChangePassword from './pages/ChangePassword';
import Product from './pages/Product';
import EditProduct from './pages/EditProduct';
import ErrorPage from "./pages/404";
import AssignProduct from './pages/AssignProduct';
import VerifyEmail from './pages/VerifyEmail';
import AddReview from "./pages/AddReview";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Layout from "./Layout";
import ProductRequest from "./pages/ProductRequest";
import ActiveUsers from "./pages/ActiveUsers";

function App() {

  const queryClient = new QueryClient()
  const auth = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div className="App">


      <AnimatePresence exitBeforeEnter>
        <QueryClientProvider client={queryClient}>

          <Routes key={location.pathname} location={location}>





            {auth.isLoggedIn ? (
              <>

                <Route exact path='/' element={<Layout />}>
                  <Route index element={<><Home /> </>} />
                  <Route exact path="explore" element={<><Explore /> </>} />
                  <Route exact path="product/:id" element={<><Product /> </>} />
                  <Route exact path="mytools" element={<><MyTools /> </>} />
                  <Route exact path="addProduct" element={<><AddProduct /> </>} />
                  <Route exact path="editProfile" element={<><EditProfile /> </>} />
                  <Route exact path="editProduct" element={<><EditProduct /> </>} />
                  <Route exact path="addreview" element={<><AddReview /> </>} />
                  <Route exact path="requests" element={<><ProductRequest /> </>} />
                {auth.isAdmin && <Route exact path="/ActiveUsers" element={<><ActiveUsers /></>} />}


                  <Route exact path="queries" element={<><Queries /> </>} />
                  <Route exact path="assignproduct" element={<><AssignProduct /> </>} />
                </Route>

                <Route exact path='/emailverificationpage/:token' element={<><VerifyEmail /></>} />

              </>
            ) : (
              <>


                <Route exact path='/' element={<Layout />}>
                  <Route index element={<><Home /> </>} />
                  <Route exact path="explore" element={<><Explore /> </>} />
                  <Route exact path="product/:id" element={<><Product /> </>} />
                </Route>


                <Route exact path="/login" element={<><Login /></>} />
                <Route exact path="/signup" element={<><Signup /></>} />
                <Route exact path="/sendemail" element={<><SendEmail /></>} />
                <Route exact path="/changepassword/:token" element={<><ChangePassword /></>} />

              </>
            )}

            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </QueryClientProvider>

      </AnimatePresence>
    </div>
  );
}

export default App;
