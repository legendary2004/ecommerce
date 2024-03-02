import TableAccordion from "../components/accordion/TableAccordion";
import MainNav from "../components/navbar/MainNav";
import Footer from "../components/footer/Footer";
import { initFlowbite } from "flowbite";


export default function() {
    setTimeout(() => {
        initFlowbite()
    }, 500)
    return (
        <div>
            <MainNav />
            <div id="accordion-open" data-accordion="open">
                <TableAccordion>
                    
                </TableAccordion>
            </div>
            <Footer />
        </div>
    )
}