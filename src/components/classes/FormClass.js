import MainNav from "../navbar/MainNav";
import Footer from "../footer/Footer";

export default function({children}) {
    return (
        <div className="h-screen">
            <MainNav />
            <div className="grid grid-cols-1 place-items-center min-h-screen my-5">
                <div className="set-auth-width w-1/3 border-2 border-black rounded p-12">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}