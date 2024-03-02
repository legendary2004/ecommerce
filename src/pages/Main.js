import Footer from "../components/footer/Footer";
import MainNav from "../components/navbar/MainNav";
import Categories from "../cards/main/Categories";
import { initFlowbite } from "flowbite";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/AuthContext";
import Jumbotron from "../components/jumbotron/Jumbotron";


export default function() {
    const user = useContext(UserContext)

    setTimeout(() => {
        initFlowbite()
    }, 500);
    return (
        <div className="h-screen">
            <MainNav />
            <div className="my-2 w-4/5 mx-auto">
                <Jumbotron />
                <div>
                    <Categories />
                </div>
            </div>
            <Footer />
        </div>
    )
}