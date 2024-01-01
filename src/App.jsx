import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Category from "./pages/Category";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:categoryName" element={<Category />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
