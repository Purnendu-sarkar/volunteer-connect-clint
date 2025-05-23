import { NavLink } from "react-router-dom";
import VolunteerNeedsNow from "../pages/AllPage/VolunteerNeedsNow";
import Slider from "./Home/Slider";
import UpcomingEvents from "./Home/UpcomingEvents";
import VolunteersChart from "./Home/VolunteersChart";
import { Helmet } from "react-helmet-async";
import Newsletter from "./Newsletter";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Volunteer</title>
      </Helmet>
      <Slider></Slider>
      <VolunteerNeedsNow></VolunteerNeedsNow>
      <div className="text-center mb-5">
        <NavLink to={"/all-volunteer"}>
          <button className="btn bg-secondary text-white px-9">See all</button>
        </NavLink>
      </div>
      <VolunteersChart></VolunteersChart>
      <UpcomingEvents></UpcomingEvents>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
