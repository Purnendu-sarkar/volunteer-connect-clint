
import VolunteerNeedsNow from '../pages/AllPage/VolunteerNeedsNow';
import Slider from './Home/Slider';
import UpcomingEvents from './Home/UpcomingEvents';
import VolunteersChart from './Home/VolunteersChart';


const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <VolunteerNeedsNow></VolunteerNeedsNow>
            <VolunteersChart></VolunteersChart>
            <UpcomingEvents></UpcomingEvents>
        </div>
    );
};

export default Home;