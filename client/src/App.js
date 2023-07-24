import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import PlaceOrder from "./screens/PlaceOrder";
import NonWovenBag from "./screens/NonWovenBag";
import NonWovenFabric from "./screens/NonWovenFabric";
import Register from "./screens/Auth/Register";
import { Toaster } from "react-hot-toast";
import Login from "./screens/Auth/Login";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./screens/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./screens/Admin/AdminDashboard";
import CreateProduct from "./screens/Admin/CreateProduct";
import AllUsers from "./screens/Admin/AllUsers";
import Profile from "./screens/user/Profile";
import CreateCategory from "./screens/Admin/CreateCategory";
import CreateColour from "./screens/Admin/CreateBagColour";
import BagSettings from "./screens/Admin/BagSettings";
import FabricSettings from "./screens/Admin/FabricSettings";
import CreateFabGSM from "./screens/Admin/CreateFabGSM";
import CreateFabSize from "./screens/Admin/CreateFabSize";
import MakeBagSize from "./screens/Admin/MakeBagSize";
import CreateFabColour from "./screens/Admin/CreateFabColour";
import OrderStatus from "./screens/user/OrderStatus";
import AdminProfile from "./screens/Admin/AdminProfile";
import PendingOrders from "./screens/user/PendingOrders";
import CompletedOrders from "./screens/user/CompletedOrders";
import BagOrderHistory from "./screens/user/BagOrderHistory";
import FabricOrderHistory from "./screens/user/FabricOrderHistory";
import OrderHistory from "./screens/user/OrderHistory";
import CancelOrders from "./screens/user/CancelOrders";
import NotProcessOrder from "./screens/user/NotProcessOrder";
import SelectOrders from "./screens/Admin/SelectOrders";
import BagUser from "./screens/Admin/BagUser";
import FabricUser from "./screens/Admin/FabricUser";
import UserFabricOrder from "./screens/Admin/UserFabricOrder";
import UserBagOrders from "./screens/Admin/UserBagOrders";
import WelcomePage from "./screens/WelcomePage";

function App() {
  return (
    <>
      <div className="container">
        <main className="mt-3 mb-3 p-2 bg-white rounded-4 shadow">
          <Toaster />
          <Router>
            <div>
              <Routes>
                <Route path="/" element={<WelcomePage />} />

                <Route path="/dash" element={<PrivateRoute />}>
                  <Route path="user/home" element={<Home />} />
                  <Route path="user/placeorder" element={<PlaceOrder />} />
                  <Route path="user/orderstatus" element={<OrderStatus />} />
                  <Route
                    path="user/bag-orders-history"
                    element={<BagOrderHistory />}
                  />
                  <Route
                    path="user/fabric-orders-history"
                    element={<FabricOrderHistory />}
                  />
                  <Route
                    path="user/orders-history"
                    element={<OrderHistory />}
                  />
                  <Route
                    path="user/completed-orders"
                    element={<CompletedOrders />}
                  />
                  <Route
                    path="user/pending-orders"
                    element={<PendingOrders />}
                  />
                  <Route path="user/cancel-orders" element={<CancelOrders />} />
                  <Route
                    path="user/not-process-orders"
                    element={<NotProcessOrder />}
                  />
                  <Route path="user/profile" element={<Profile />} />
                </Route>

                <Route path="/dash" element={<AdminRoute />}>
                  <Route path="admin" element={<AdminDashboard />} />
                  <Route path="admin/categories" element={<CreateCategory />} />
                  <Route path="admin/bag" element={<BagSettings />} />
                  <Route path="admin/bag-color" element={<CreateColour />} />
                  <Route
                    path="admin/admin-bag-size"
                    element={<MakeBagSize />}
                  />
                  <Route path="admin/fabric" element={<FabricSettings />} />
                  <Route path="admin/fabric-gsm" element={<CreateFabGSM />} />
                  <Route path="admin/fabric-size" element={<CreateFabSize />} />
                  <Route
                    path="admin/fabric-color"
                    element={<CreateFabColour />}
                  />
                  <Route path="admin-profile" element={<AdminProfile />} />
                  <Route
                    path="admin/create-product"
                    element={<CreateProduct />}
                  />
                  <Route
                    path="admin/select-orders-category"
                    element={<SelectOrders />}
                  />
                  <Route path="admin/orders/bag-orders" element={<BagUser />} />
                  <Route
                    path="admin/orders/fabric-orders"
                    element={<FabricUser />}
                  />
                  <Route
                    path="admin/user/bag-orders/:userName"
                    element={<UserBagOrders />}
                  />
                  <Route
                    path="admin/user/fabric-orders/:userName"
                    element={<UserFabricOrder />}
                  />
                  <Route path="admin/all-users" element={<AllUsers />} />
                </Route>

                <Route path="/placeorder" element={<PlaceOrder />} />
                <Route
                  path="/placeorder/non-woven-bag"
                  element={<NonWovenBag />}
                />
                <Route
                  path="/placeorder/non-woven-fabric"
                  element={<NonWovenFabric />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </Router>
        </main>
      </div>
    </>
  );
}

export default App;
