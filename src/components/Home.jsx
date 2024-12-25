
import VolunteerNeedsNow from '../pages/AllPage/VolunteerNeedsNow';
import Slider from './Home/Slider';
import UpcomingEvents from './Home/UpcomingEvents';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <VolunteerNeedsNow></VolunteerNeedsNow>
            <UpcomingEvents></UpcomingEvents>
        </div>
    );
};

export default Home;