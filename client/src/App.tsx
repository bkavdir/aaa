import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ProductListing from "./pages/ProductListing";
import Contact from "./pages/Contact";
import SizeGuide from "./pages/SizeGuide";
import NotFound from "@/pages/not-found";
import { CartProvider } from "./context/CartContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product/:slug" component={ProductDetail} />
      <Route path="/category/:slug" component={ProductListing} />
      <Route path="/shop" component={() => <ProductListing />} />
      <Route path="/contact" component={Contact} />
      <Route path="/size-guide" component={SizeGuide} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <CartProvider>
      <MainLayout>
        <Router />
      </MainLayout>
      <Toaster />
    </CartProvider>
  );
}

export default App;
