import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Explore from './pages/Explore';

import AddProduct from './pages/AddProduct';
import EditProfile from './pages/EditProfile';

import Login from './pages/Login';
import Signup from './pages/Signup';
import SendEmail from './pages/SendEmail';
import ChangePassword from './pages/ChangePassword';
import Product from './pages/Product';
import EditProduct from './pages/EditProduct';
import ErrorPage from "./pages/404";

import VerifyEmail from './pages/VerifyEmail';
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Layout from "./Layout";
import MyTools from "./pages/MyTools";
;

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
                  <Route exact path="mytools" element={<><MyTools/></>}/>
                  <Route exact path="addProduct" element={<><AddProduct /> </>} />
                  <Route exact path="editProfile" element={<><EditProfile /> </>} />
                  <Route exact path="editProduct" element={<><EditProduct /> </>} />



                  {/* <Route exact path="queries" element={<><Queries /> </>} /> */}
                  {/* <Route exact path="assignproduct" element={<><AssignProduct /> </>} /> */}
                  {/* <Route exact path="enterOTP" element={<><OTP /></>} /> */}
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
