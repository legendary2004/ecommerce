import { initFlowbite } from "flowbite";
import Card from "../cards/about/Card";
import Footer from "../components/footer/Footer";
import MainNav from "../components/navbar/MainNav";

export default function() {
    setTimeout(() => {
        initFlowbite()
    }, 500);
    return (
        <div className="h-screen">
            <MainNav />
            <div className="grid grid-cols-1 gap-y-2 place-items-center py-2">
                <h1 className="font-bold text-3xl mt-2">Who we are</h1>
                <div className="flex justify-center items-start flex-wrap gap-2">
                    <Card img={require("../images/img1.png")} title="Our mission & values" desc="With an aim to become one of the most ethical companies in the world, Samsung continues to train its employees and operate monitoring systems, while practicing fair and transparent corporate management."/>
                    <Card img={require("../images/img2.png")} title="Our mission & approach" desc="Samsung follows a simple business philosophy: to devote its talent and technology to creating superior products and services that contribute to a better global society. To achieve this, Samsung sets a high value on its people and technologies."/>
                    <Card img={require("../images/img3.png")} title="The values that define Samsung's spirit" desc="Samsung believes that living by strong values is the key to good business. That’s why these core values, along with a rigorous code of conduct, are at the heart of every decision the company makes."/>
                    <Card img={require("../images/img4.png")} title="Taking the lead in tech innovation" desc="Samsung Electronics constantly reinvents the future. We explore the unknown to discover technologies to help people all over the world lead happier, healthier lives."/>
                </div>
                <h1 className="font-bold text-3xl mt-2">What we stand for</h1>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-center items-start flex-wrap gap-2">
                        <Card img={require("../images/img5.jpeg")} title="Human experience" desc="Our basic principle is that a company is its people. We’re guided by our desire to create an environment where individuals can flourish and achieve the impossible." />
                        <Card img={require("../images/img6.jpg")} title="Defiant optimism" desc="We exist where passion and brilliance collide, always pushing ourselves and our colleagues to be – and do – our best." />
                        <Card img={require("../images/img7.png")} title="Progressive innovation" desc="We welcome and anticipate the future, greeting change with agility and creativity. Constant innovation is our key to strength and success." />
                    </div>
                    <div className="flex justify-center items-start flex-wrap gap-2">
                        <Card img={require("../images/img8.jpg")} title="Transparency" desc="Operating ethically is the foundation of our business. Everything we do is guided by a moral compass of fairness, respect and openness." />
                        <Card img={require("../images/img9.png")} title="Social betterment" desc="As an upstanding corporate citizen, we embrace the pursuit of co-prosperity with our communities and global neighbors, to which diversity and inclusion are central." />
                    </div>
                </div>
                
                <h1 className="font-bold text-3xl mt-2">Our teams</h1>
                <div className="flex flex-col flex-wrap gap-2">
                    <div className="flex flex-wrap justify-center items-start gap-2">
                        <Card img={require("../images/img10.png")} title="Marketing" desc="Our Marketing teams bring our technology to life in the marketplace, shaping our brand through strong storytelling in partnership with the best creative and strategy agencies in the world." />
                        <Card img={require("../images/img11.png")} title="Sales" desc="First to get their hands on our new devices, the Consumer, Enterprise and Retail Sales teams bring our innovations to the world by driving strong relationships with our customers and understanding how our technology empowers them." />
                        <Card img={require("../images/img12.png")} title="Corporate support" desc="Our Corporate Support teams provide expertise to ensure success across the company, serving as the central nervous system of Samsung culture and systems. These teams include Human Resources, Legal, Finance, Communications and Corporate Citizenship." />
                    </div>
                    <div className="flex flex-wrap justify-center items-start gap-2">
                        <Card img={require("../images/img13.png")} title="Technology" desc="Our legacy is rooted in innovation, and our Networks and eCommerce teams drive that heritage forward by pioneering to impact the globe and introducing groundbreaking technology and solutions to our consumers." />
                        <Card img={require("../images/img14.png")} title="Customer solutions" desc="The North Star for our Customer Care, Logistics and Supply Chain teams is to ensure that our customers are cared for and fully empowered, protecting and supporting the invaluable core components of our brand." />
                        <Card img={require("../images/img15.png")} title="Public affairs" desc="Our commitment to social betterment is the guiding force behind our Government Affairs team which focuses on opportunities to engage and support government customers, policy makers and technology leaders. Our sustainability and global and US government relations teams ensure that everything we do moves the world forward." />
                    </div>
                </div>
                <h1 className="font-bold text-3xl mt-2">Where we work</h1>
                <div className="flex justify-center w-full px-3">
                    <a href={require("../images/img16.png")} target="_blank"><img src={require("../images/img16.png")} /></a>
                </div>
            </div>
            <Footer />
        </div>
    )
}